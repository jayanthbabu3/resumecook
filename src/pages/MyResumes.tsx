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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { resumeService } from "@/lib/firestore/resumeService";
import type { ResumeMetadata } from "@/types/resume";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { templateMetaMap } from "@/constants/templateMeta";
import { useToast } from "@/hooks/use-toast";
import { CircularScoreIndicator } from "@/components/CircularScoreIndicator";
import { FavoriteTemplates } from "@/components/FavoriteTemplates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplatePreviewV2 } from "@/v2/components/TemplatePreviewV2";
import { useFavoriteTemplates } from "@/hooks/useFavoriteTemplates";
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
  const { user } = useFirebaseAuth();
  const { toast } = useToast();
  const { favorites } = useFavoriteTemplates();
  const [resumes, setResumes] = useState<ResumeMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadResumes();
  }, [user]);

  const loadResumes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userResumes = await resumeService.getUserResumes();
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
      await resumeService.deleteResume(resumeId);
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
    try {
      await resumeService.duplicateResume(resumeId);
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

  if (loading) {
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
                {resumes.length > 0 && (
                  <Badge variant="secondary" className="ml-0.5 sm:ml-1 h-4 sm:h-5 px-1 sm:px-1.5 text-[9px] sm:text-[10px] data-[state=active]:bg-white/20 data-[state=active]:text-white">
                    {resumes.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="favorites" className="gap-1.5 sm:gap-2 px-2.5 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Favorites</span>
                <span className="sm:hidden">Favs</span>
                {favorites.length > 0 && (
                  <Badge variant="secondary" className="ml-0.5 sm:ml-1 h-4 sm:h-5 px-1 sm:px-1.5 text-[9px] sm:text-[10px] data-[state=active]:bg-white/20 data-[state=active]:text-white">
                    {favorites.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Create New Resume Button */}
            <Button
              size="sm"
              onClick={() => navigate("/templates")}
              className="gap-1.5 sm:gap-2 h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="sm:hidden">New</span>
              <span className="hidden sm:inline">Create New Resume</span>
            </Button>
          </div>

          {/* My Resumes Tab */}
          <TabsContent value="resumes" className="mt-0">
            {resumes.length === 0 ? (
              <Card className="p-12 text-center border-dashed border-2">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
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
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicate(resume.id!);
                          }}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
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
                          themeColor="#2563eb"
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
