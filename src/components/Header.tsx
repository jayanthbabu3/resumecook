import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const isEditor = location.pathname.startsWith("/editor");

  const navItems = useMemo(() => [{ label: "Home", to: "/" }], []);

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 rounded-xl px-2 py-1 transition-transform hover:-translate-y-0.5 hover:opacity-90"
            aria-label="Resume Cook home"
          >
            <div className="relative flex h-11 w-11 items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 opacity-80 blur-sm transition-opacity group-hover:opacity-100" />
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-background via-background/60 to-background/30 shadow-[0_12px_30px_-12px_rgba(124,58,237,0.5)] text-primary">
                <ChefHat className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-xl font-semibold tracking-tight text-foreground">
                Resume<span className="text-primary">Cook</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                Craft Your Career
              </span>
            </div>
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
