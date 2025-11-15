import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseAuthProvider } from "@/hooks/useFirebaseAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MigrationHandler } from "@/components/MigrationHandler";
import Hero from "./pages/Hero";
import Dashboard from "./pages/Dashboard";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FirebaseAuthProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/ats-guidelines" element={<ATSGuidelines />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            {/* Temporarily removed ProtectedRoute for easier development - TODO: Re-enable before production */}
            <Route path="/profile-completion" element={<ProfileCompletion />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-resumes" element={<MyResumes />} />
            <Route path="/editor/:templateId" element={<Editor />} />
            <Route path="/live-editor/:templateId" element={<LiveEditor />} />
            <Route path="/builder/scratch" element={<ScratchBuilder />} />

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
        </FirebaseAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
