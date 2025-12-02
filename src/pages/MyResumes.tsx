import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Edit,
  Trash2,
  Plus,
  Loader2,
  Calendar,
  Download,
  Heart,
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

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Unknown date";
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTemplateName = (templateId: string) => {
    return templateMetaMap[templateId]?.name || "Unknown Template";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading your resumes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <div className="border-b border-border/30 bg-gradient-to-br from-muted/5 via-muted/10 to-muted/5">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-12">
          <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-4">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground">
                My Resumes
              </h1>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
              Manage and edit your saved resumes
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Tabs */}
        <Tabs defaultValue="resumes" className="w-full">
          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <TabsList className="bg-muted/50 border">
              <TabsTrigger value="resumes" className="gap-2 text-sm md:text-base px-4 md:px-6">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">My Resumes</span>
                <span className="sm:hidden">Resumes</span>
                {resumes.length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-primary/10 text-primary">
                    {resumes.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="favorites" className="gap-2 text-sm md:text-base px-4 md:px-6">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Favorites</span>
                <span className="sm:hidden">Favs</span>
              </TabsTrigger>
            </TabsList>

            {/* Create New Resume Button */}
            <Button
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create New Resume</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>

          {/* My Resumes Tab */}
          <TabsContent value="resumes" className="mt-0">
            {resumes.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create your first resume from our template library
                    </p>
                    <Button onClick={() => navigate("/dashboard")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Browse Templates
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {resumes.map((resume) => (
                  <Card
                    key={resume.id}
                    className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card"
                  >
                    {/* ATS Score Badge - Top Right */}
                    {resume.atsScore && resume.atsScore > 0 && (
                      <div className="absolute top-4 right-4 z-10">
                        <CircularScoreIndicator
                          score={resume.atsScore}
                          size="sm"
                          showLabel={false}
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Resume Info */}
                      <div className="mb-4 pr-16">
                        <h3 className="font-semibold text-lg mb-1 truncate">
                          {resume.title || "Untitled Resume"}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {getTemplateName(resume.templateId)}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Updated {formatDate(resume.updatedAt instanceof Date ? resume.updatedAt : resume.updatedAt.toDate())}</span>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="mb-4 space-y-1 text-xs text-muted-foreground">
                        {resume.isPrimary && (
                          <p className="truncate font-medium text-primary">Primary Resume</p>
                        )}
                        {resume.wordCount && (
                          <p className="truncate">{resume.wordCount} words</p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          className="flex-1 gap-2"
                          onClick={() => navigate(`/editor/${resume.templateId}?resumeId=${resume.id}`)}
                        >
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/live-editor/${resume.templateId}?resumeId=${resume.id}`)}
                        >
                          <FileText className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setResumeToDelete(resume.id!);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
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
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              resume.
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
