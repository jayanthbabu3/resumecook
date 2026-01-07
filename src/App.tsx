import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { FirebaseAuthProvider } from "@/hooks/useFirebaseAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MigrationHandler } from "@/components/MigrationHandler";
import { ResumeDataProvider } from "@/contexts/ResumeDataContext";
import Hero from "./pages/Hero";
import Dashboard from "./pages/Dashboard";
import ProfessionTemplates from "./pages/ProfessionTemplates";
import Editor from "./pages/Editor";
import LiveEditor from "./pages/LiveEditor";
import ScratchBuilder from "./pages/ScratchBuilder";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ProfileCompletion from "./pages/ProfileCompletion";
import VerifyEmail from "./pages/VerifyEmail";
import ATSGuidelines from "./pages/ATSGuidelines";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import MyResumes from "./pages/MyResumes";

// Resume Builder Pages
import { DashboardV2, BuilderV2, ProfessionTemplatesV2, FresherTemplatesV2 } from "./v2/pages";
import LayoutSelectionScreen from "./v2/pages/LayoutSelectionScreen";
import ScratchBuilderV2 from "./v2/pages/ScratchBuilderV2";
import GridCanvasBuilder from "./v2/pages/GridCanvasBuilder";
import GridLayoutSelectionScreen from "./v2/pages/GridLayoutSelectionScreen";

const queryClient = new QueryClient();

// Redirect components for legacy routes
const RedirectDashboard = () => <Navigate to="/templates" replace />;
const RedirectProfessionTemplates = () => {
  const { professionId } = useParams<{ professionId: string }>();
  return <Navigate to={`/templates/${professionId}`} replace />;
};
const RedirectEditor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  // Map legacy template IDs to new template IDs
  const newTemplateId = templateId?.endsWith('-v2') ? templateId : `${templateId}-v2`;
  return <Navigate to={`/builder?template=${newTemplateId}`} replace />;
};
const RedirectLiveEditor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  // Map legacy template IDs to new template IDs
  const newTemplateId = templateId?.endsWith('-v2') ? templateId : `${templateId}-v2`;
  return <Navigate to={`/builder?template=${newTemplateId}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FirebaseAuthProvider>
          <ResumeDataProvider>
            <Routes>
              <Route path="/" element={<Hero />} />
            <Route path="/ats-guidelines" element={<ATSGuidelines />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            {/* Temporarily removed ProtectedRoute for easier development - TODO: Re-enable before production */}
            <Route path="/profile-completion" element={<ProfileCompletion />} />
            
            {/* Redirect legacy routes */}
            <Route path="/dashboard" element={<RedirectDashboard />} />
            <Route path="/dashboard/:professionId" element={<RedirectProfessionTemplates />} />
            <Route path="/dashboard/:professionId/editor/:templateId" element={<RedirectEditor />} />
            <Route path="/dashboard/:professionId/live-editor/:templateId" element={<RedirectLiveEditor />} />
            <Route path="/v2" element={<RedirectDashboard />} />
            <Route path="/v2/:professionId" element={<RedirectProfessionTemplates />} />
            <Route path="/v2/builder" element={<RedirectEditor />} />
            
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-resumes" element={<MyResumes />} />
            <Route path="/builder/scratch" element={<ScratchBuilder />} />

            {/* Main Resume Builder Routes */}
            <Route path="/templates" element={<DashboardV2 />} />
            <Route path="/templates/fresher" element={<FresherTemplatesV2 />} />
            <Route path="/templates/:professionId" element={<ProfessionTemplatesV2 />} />
            <Route path="/builder" element={<BuilderV2 />} />
            <Route path="/builder/scratch-v2/select-layout" element={<LayoutSelectionScreen />} />
            <Route path="/builder/scratch-v2" element={<ScratchBuilderV2 />} />
            {/* Grid Canvas Builder Routes (new feature, separate from scratch-v2) */}
            <Route path="/builder/grid-canvas/select-layout" element={<GridLayoutSelectionScreen />} />
            <Route path="/builder/grid-canvas" element={<GridCanvasBuilder />} />

            {/* Original protected routes (commented out for development):
            <Route
              path="/profile-completion"
              element={
                <ProtectedRoute>
                  <ProfileCompletion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-resumes"
              element={
                <ProtectedRoute>
                  <MyResumes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editor/:templateId"
              element={
                <ProtectedRoute>
                  <Editor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/builder/scratch"
              element={
                <ProtectedRoute>
                  <ScratchBuilder />
                </ProtectedRoute>
              }
            />
            */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </ResumeDataProvider>
        </FirebaseAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
