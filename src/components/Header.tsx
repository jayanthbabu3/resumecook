import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";
  const isEditor = location.pathname.startsWith("/editor");

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Back button */}
          <div className="flex items-center gap-4">
            {!isHomePage && (
              <Button
                variant="ghost"
                onClick={() => {
                  if (isEditor) {
                    navigate("/dashboard");
                  } else {
                    navigate("/");
                  }
                }}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">
                ResumeFlow
              </span>
            </button>
          </div>

          {/* Right side - CTA Button */}
          {!isEditor && (
            <Button
              onClick={() => navigate(isHomePage ? "/dashboard" : "/dashboard")}
              className="bg-primary hover:bg-primary-hover"
            >
              {isDashboard ? "Choose Template" : "Create Your Resume"}
            </Button>
          )}

          {/* Editor specific right side */}
          {isEditor && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Auto-saving...
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
