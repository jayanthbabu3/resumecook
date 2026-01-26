import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Trash2,
  Plus,
  Loader2,
  Heart,
  MoreVertical,
  Copy,
  Star,
  Clock,
  AlertCircle,
  LogIn,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { resumeService, type Resume } from "@/services";
import { useAuth } from "@/contexts/AuthContext";
import { templateMetaMap } from "@/constants/templateMeta";
import { useToast } from "@/hooks/use-toast";
import { CircularScoreIndicator } from "@/components/CircularScoreIndicator";
import { FavoriteTemplates } from "@/components/FavoriteTemplates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplatePreviewV2 } from "@/v2/components/TemplatePreviewV2";
import { useFavoriteTemplates } from "@/hooks/useFavoriteTemplates";
import { USER_LIMITS } from "@/config/limits";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const MyResumes = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { favoritesLimit, favoritesCount, canAddFavorite } = useFavoriteTemplates();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

  // Check if user can create more resumes
  const canCreateResume = resumes.length < USER_LIMITS.MAX_RESUMES;
  const resumesLimit = USER_LIMITS.MAX_RESUMES;

  useEffect(() => {
    // If auth is still loading, wait
    if (authLoading) return;
    
    // If no user, stop loading state
    if (!user) {
      setLoading(false);
      return;
    }
    
    loadResumes();
  }, [user, authLoading]);

  const loadResumes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userResumes = await resumeService.getAll();
      setResumes(userResumes);
    } catch (error) {
      console.error("Error loading resumes:", error);
      toast({
        title: "Error",
        description: "Failed to load your resumes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resumeId: string) => {
    try {
      await resumeService.delete(resumeId);
      setResumes(resumes.filter((r) => r.id !== resumeId));
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast({
        title: "Error",
        description: "Failed to delete resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setResumeToDelete(null);
    }
  };

  const handleDuplicate = async (resumeId: string) => {
    // Check limit before duplicating
    if (!canCreateResume) {
      toast({
        title: "Resume limit reached",
        description: `You can only save up to ${resumesLimit} resumes. Please delete an existing resume to duplicate.`,
        variant: "destructive",
      });
      return;
    }

    try {
      await resumeService.duplicate(resumeId);
      await loadResumes();
      toast({
        title: "Success",
        description: "Resume duplicated successfully",
      });
    } catch (error) {
      console.error("Error duplicating resume:", error);
      toast({
        title: "Error",
        description: "Failed to duplicate resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Unknown date";
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRelativeTime = (date: Date | undefined) => {
    if (!date) return "";
    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return formatDate(date);
  };

  const getTemplateName = (templateId: string) => {
    return templateMetaMap[templateId]?.name || formatTemplateId(templateId);
  };

  const getTemplateCategory = (templateId: string) => {
    return templateMetaMap[templateId]?.category || "Template";
  };

  const formatTemplateId = (templateId: string) => {
    // Convert template-id-v2 to "Template Id" format
    return templateId
      .replace(/-v2$/, "")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Show loading state only while auth is loading or fetching resumes
  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Loading your resumes...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show sign-in prompt for unauthenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex items-center justify-center min-h-[70vh] p-4">
          <div className="max-w-md w-full text-center">
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-blue-500/15 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Sign in to view your resumes
              </h2>
              <p className="text-gray-500 text-sm">
                Save and manage your resumes from anywhere
              </p>
            </div>

            {/* Features List */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-8 text-left shadow-sm">
              <p className="text-sm font-medium text-gray-700 mb-3">With an account you can:</p>
              <ul className="space-y-2.5">
                {[
                  "Save unlimited resume drafts",
                  "Access your resumes from any device",
                  "Track your ATS scores",
                  "Use AI-powered enhancements",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 shadow-lg shadow-primary/25"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8"
                onClick={() => navigate("/templates")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Browse Templates
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Compact Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6 py-5 md:py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                My Resumes
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage and edit your saved resumes
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Tabs */}
        <Tabs defaultValue="resumes" className="w-full">
          {/* Tab Navigation - Always in one row */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 mb-6 sm:mb-8">
            <TabsList className="bg-white border shadow-sm h-9 sm:h-10">
              <TabsTrigger value="resumes" className="gap-1.5 sm:gap-2 px-2.5 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">My Resumes</span>
                <span className="sm:hidden">Resumes</span>
                <Badge variant="secondary" className={`ml-0.5 sm:ml-1 h-4 sm:h-5 px-1 sm:px-1.5 text-[9px] sm:text-[10px] data-[state=active]:bg-white/20 data-[state=active]:text-white ${!canCreateResume ? 'bg-amber-100 text-amber-700' : ''}`}>
                  {resumes.length}/{resumesLimit}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="gap-1.5 sm:gap-2 px-2.5 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Favorites</span>
                <span className="sm:hidden">Favs</span>
                <Badge variant="secondary" className={`ml-0.5 sm:ml-1 h-4 sm:h-5 px-1 sm:px-1.5 text-[9px] sm:text-[10px] data-[state=active]:bg-white/20 data-[state=active]:text-white ${!canAddFavorite ? 'bg-amber-100 text-amber-700' : ''}`}>
                  {favoritesCount}/{favoritesLimit}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {/* Create New Resume Button */}
            <Button
              size="sm"
              onClick={() => {
                if (!canCreateResume) {
                  toast({
                    title: "Resume limit reached",
                    description: `You can only save up to ${resumesLimit} resumes. Please delete an existing resume to create a new one.`,
                    variant: "destructive",
                  });
                  return;
                }
                navigate("/templates");
              }}
              className={`gap-1.5 sm:gap-2 h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm transition-all ${
                canCreateResume
                  ? "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                  : "opacity-60 cursor-not-allowed"
              }`}
              disabled={!canCreateResume}
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="sm:hidden">New</span>
              <span className="hidden sm:inline">Create New Resume</span>
            </Button>
          </div>

          {/* Limit Warning Banner */}
          {!canCreateResume && (
            <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                You've reached the maximum of {resumesLimit} resumes. Delete an existing resume to create a new one.
              </p>
            </div>
          )}

          {/* My Resumes Tab */}
          <TabsContent value="resumes" className="mt-0">
            {resumes.length === 0 ? (
              <Card className="p-12 text-center border-dashed border-2">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-primary" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <Plus className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">No resumes yet</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Start building your professional resume from our collection of beautiful templates
                    </p>
                  </div>
                  <Button size="lg" onClick={() => navigate("/templates")} className="gap-2">
                    <Plus className="h-5 w-5" />
                    Browse Templates
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {resumes.map((resume) => (
                  <Card
                    key={resume.id}
                    className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card rounded-xl"
                    onClick={() => navigate(`/builder?template=${resume.templateId}&resumeId=${resume.id}`)}
                  >
                    {/* Menu Button - Top Right */}
                    <div className="absolute top-2 right-2 z-20">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-white/90 hover:bg-white shadow-md rounded-full"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicate(resume.id!);
                            }}
                            disabled={!canCreateResume}
                            className={!canCreateResume ? "opacity-50 cursor-not-allowed" : ""}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                            {!canCreateResume && <span className="ml-1 text-xs text-muted-foreground">(limit)</span>}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              setResumeToDelete(resume.id!);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Primary Badge - Top Left */}
                    {resume.isPrimary && (
                      <div className="absolute top-2 left-2 z-20">
                        <Badge className="text-[10px] bg-amber-100 text-amber-700 hover:bg-amber-100 shadow-sm">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Primary
                        </Badge>
                      </div>
                    )}

                    {/* Template Preview */}
                    <div className="relative aspect-[8.5/11] bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden border-b border-border/20 group-hover:border-primary/20 transition-colors duration-300">
                      {/* Preview container */}
                      <div className="absolute inset-2 rounded-lg overflow-hidden shadow-inner bg-white border border-border/20 group-hover:border-primary/30 transition-all duration-300">
                        <TemplatePreviewV2
                          templateId={resume.templateId}
                          themeColor={resume.themeColor || "#2563eb"}
                          sampleData={resume.data}
                          className="h-full"
                        />
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-1.5 p-2 md:p-3 z-10">
                        <Button
                          size="sm"
                          className="shadow-lg text-[10px] md:text-xs px-3 py-1 h-7 md:h-8 bg-primary hover:bg-primary/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/builder?template=${resume.templateId}&resumeId=${resume.id}`);
                          }}
                        >
                          Edit Resume
                        </Button>
                      </div>

                      {/* ATS Score Badge */}
                      {resume.atsScore && resume.atsScore > 0 && (
                        <div className="absolute bottom-2 right-2 z-10">
                          <CircularScoreIndicator
                            score={resume.atsScore}
                            size="sm"
                            showLabel={false}
                          />
                        </div>
                      )}
                    </div>

                    {/* Resume Info */}
                    <div className="p-2 md:p-3 border-t border-border/30">
                      <h3 className="font-semibold text-[10px] md:text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
                        {resume.title || "Untitled Resume"}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-muted-foreground mb-1">
                        <FileText className="h-3 w-3" />
                        <span className="line-clamp-1">{getTemplateName(resume.templateId)}</span>
                        {resume.wordCount && (
                          <>
                            <span>•</span>
                            <span>{resume.wordCount}w</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[8px] md:text-[9px] text-muted-foreground/70">
                        <Clock className="h-2.5 w-2.5" />
                        <span>
                          {getRelativeTime(
                            resume.updatedAt instanceof Date
                              ? resume.updatedAt
                              : (resume.updatedAt as any)?.toDate?.()
                          )}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Favorite Templates Tab */}
          <TabsContent value="favorites" className="mt-0">
            <FavoriteTemplates />
          </TabsContent>
        </Tabs>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              resume and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => resumeToDelete && handleDelete(resumeToDelete)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyResumes;
