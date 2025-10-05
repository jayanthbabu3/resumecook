import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const isEditor = location.pathname.startsWith("/editor");

  const navItems = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "Templates", to: "/dashboard?focus=templates&category=software" },
      { label: "Features", to: "/#features" },
    ],
    []
  );

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Go to home"
          >
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">
              ResumeFlow
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 text-sm font-medium">
              {navItems.map(({ label, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-1.5 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/40",
                      isActive && "text-foreground bg-muted/60"
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {!isEditor && (
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-primary hover:bg-primary-hover"
              >
                {isDashboard ? "Choose Template" : "Create Your Resume"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
