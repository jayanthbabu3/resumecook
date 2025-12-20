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
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import MyResumes from "./pages/MyResumes";

// V2 Builder Pages
import { DashboardV2, BuilderV2, ProfessionTemplatesV2 } from "./v2/pages";

const queryClient = new QueryClient();

// Redirect components for V1 to V2 migration
const RedirectDashboard = () => <Navigate to="/v2" replace />;
const RedirectProfessionTemplates = () => {
  const { professionId } = useParams<{ professionId: string }>();
  return <Navigate to={`/v2/${professionId}`} replace />;
};
const RedirectEditor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  // Map V1 template IDs to V2 template IDs
  const v2TemplateId = templateId?.endsWith('-v2') ? templateId : `${templateId}-v2`;
  return <Navigate to={`/v2/builder?template=${v2TemplateId}`} replace />;
};
const RedirectLiveEditor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  // Map V1 template IDs to V2 template IDs
  const v2TemplateId = templateId?.endsWith('-v2') ? templateId : `${templateId}-v2`;
  return <Navigate to={`/v2/builder?template=${v2TemplateId}`} replace />;
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
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            {/* Temporarily removed ProtectedRoute for easier development - TODO: Re-enable before production */}
            <Route path="/profile-completion" element={<ProfileCompletion />} />
            
            {/* Redirect all V1 routes to V2 */}
            <Route path="/dashboard" element={<RedirectDashboard />} />
            <Route path="/dashboard/:professionId" element={<RedirectProfessionTemplates />} />
            <Route path="/dashboard/:professionId/editor/:templateId" element={<RedirectEditor />} />
            <Route path="/dashboard/:professionId/live-editor/:templateId" element={<RedirectLiveEditor />} />
            
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-resumes" element={<MyResumes />} />
            <Route path="/builder/scratch" element={<ScratchBuilder />} />

            {/* V2 Builder Routes - Default resume builder */}
            <Route path="/v2" element={<DashboardV2 />} />
            <Route path="/v2/:professionId" element={<ProfessionTemplatesV2 />} />
            <Route path="/v2/builder" element={<BuilderV2 />} />

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
