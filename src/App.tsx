import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
// Using new JWT-based auth context (exports FirebaseAuthProvider as alias for backward compatibility)
import { FirebaseAuthProvider } from "@/contexts/AuthContext";
import { ResumeDataProvider } from "@/contexts/ResumeDataContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Hero from "./pages/Hero";
import ScratchBuilder from "./pages/ScratchBuilder";
import Auth from "./pages/Auth";
import ProfileCompletion from "./pages/ProfileCompletion";
import VerifyEmail from "./pages/VerifyEmail";
import ATSGuidelines from "./pages/ATSGuidelines";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import MyResumes from "./pages/MyResumes";

// Resume Builder Pages
import { DashboardV2, BuilderV2, ProfessionTemplatesV2, FresherTemplatesV2, TemplatesPageV2, ProfilePageV2 } from "./v2/pages";
import LayoutSelectionScreen from "./v2/pages/LayoutSelectionScreen";
import ScratchBuilderV2 from "./v2/pages/ScratchBuilderV2";
import GridCanvasBuilder from "./v2/pages/GridCanvasBuilder";
import GridLayoutSelectionScreen from "./v2/pages/GridLayoutSelectionScreen";
import AccountSettings from "./v2/pages/AccountSettings";

// Feedback Pages
import FeedbackPage from "./v2/pages/FeedbackPage";
import MyFeedbackPage from "./v2/pages/MyFeedbackPage";
import FeedbackDetailPage from "./v2/pages/FeedbackDetailPage";

// Admin Pages
import { AdminRoute } from "./components/AdminRoute";
import { AdminDashboard, AdminFeedbackPage, AdminFeedbackDetailPage, AdminUsersPage } from "./v2/pages/admin";

const queryClient = new QueryClient();

// Redirect components for legacy routes
const RedirectDashboard = () => <Navigate to="/dashboard" replace />;
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
  <ErrorBoundary>
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
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/profile-completion" element={<ProfileCompletion />} />
            
            {/* Redirect legacy routes */}
            <Route path="/dashboard/:professionId" element={<RedirectProfessionTemplates />} />
            <Route path="/dashboard/:professionId/editor/:templateId" element={<RedirectEditor />} />
            <Route path="/dashboard/:professionId/live-editor/:templateId" element={<RedirectLiveEditor />} />
            <Route path="/v2" element={<RedirectDashboard />} />
            <Route path="/v2/:professionId" element={<RedirectProfessionTemplates />} />
            <Route path="/v2/builder" element={<RedirectEditor />} />
            
            <Route path="/profile" element={<ProfilePageV2 />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/my-resumes" element={<MyResumes />} />
            <Route path="/builder/scratch" element={<ScratchBuilder />} />

            {/* Main Resume Builder Routes */}
            <Route path="/dashboard" element={<DashboardV2 />} />
            <Route path="/templates" element={<TemplatesPageV2 />} />
            <Route path="/templates/fresher" element={<Navigate to="/templates?category=fresher" replace />} />
            <Route path="/templates/:professionId" element={<ProfessionTemplatesV2 />} />
            <Route path="/builder" element={<BuilderV2 />} />
            <Route path="/builder/scratch-v2/select-layout" element={<LayoutSelectionScreen />} />
            <Route path="/builder/scratch-v2" element={<ScratchBuilderV2 />} />
            {/* Grid Canvas Builder Routes (new feature, separate from scratch-v2) */}
            <Route path="/builder/grid-canvas/select-layout" element={<GridLayoutSelectionScreen />} />
            <Route path="/builder/grid-canvas" element={<GridCanvasBuilder />} />

            {/* Feedback Routes */}
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/my-feedback" element={<MyFeedbackPage />} />
            <Route path="/feedback/:id" element={<FeedbackDetailPage />} />

            {/* Admin Routes (Protected) */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/feedback" element={<AdminRoute><AdminFeedbackPage /></AdminRoute>} />
            <Route path="/admin/feedback/:id" element={<AdminRoute><AdminFeedbackDetailPage /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </ResumeDataProvider>
          </FirebaseAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
