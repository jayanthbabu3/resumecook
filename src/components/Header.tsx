import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, LayoutDashboard, Home, FileText, Sparkles, BookOpen } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isDashboard = location.pathname === "/dashboard";
  const isEditor = location.pathname.startsWith("/editor");
  const isProfile = location.pathname === "/profile";

  const navItems = useMemo(() => [
    { label: "Home", to: "/" },
    { label: "ATS Guide", to: "/ats-guidelines" },
    ...(user ? [{ label: "Dashboard", to: "/dashboard" }] : [])
  ], [user]);

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.split('@')[0].slice(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between gap-6">
          {/* Logo Section */}
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 rounded-xl px-2 py-1 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
            aria-label="Resume Cook home"
          >
            <div className="relative flex h-12 w-12 items-center justify-center">
              {/* Background glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 opacity-80 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-md" />
              
              {/* Main logo container */}
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-background via-background/80 to-background/50 shadow-[0_8px_25px_-8px_rgba(124,58,237,0.4)] transition-all duration-300 group-hover:shadow-[0_12px_35px_-12px_rgba(124,58,237,0.6)]">
                {/* Resume document icon */}
                <div className="relative">
                  <FileText className="h-6 w-6 text-primary transition-all duration-300 group-hover:scale-110" strokeWidth={2} />
                  
                  {/* Sparkle effect overlay */}
                  <div className="absolute -top-1 -right-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" fill="currentColor" />
                  </div>
                  
                  {/* Success checkmark overlay */}
                  <div className="absolute -bottom-1 -left-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating particles effect */}
              <div className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-primary/30 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:animate-ping"></div>
              <div className="absolute -bottom-1 -right-1 h-1.5 w-1.5 rounded-full bg-emerald-400/40 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:animate-pulse"></div>
            </div>
            
            <div className="flex flex-col text-left leading-none">
              <span className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                Resume<span className="text-primary group-hover:text-primary/80">Cook</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground transition-colors duration-300 group-hover:text-primary/70">
                Craft Your Career
              </span>
            </div>
          </button>

          {/* Navigation Section */}
          <div className="flex items-center gap-6">
            {/* Navigation Links */}
            <div className="hidden sm:flex items-center gap-1 text-sm font-medium">
              {navItems.map(({ label, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-1.5 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/40 flex items-center gap-2",
                      isActive && "text-foreground bg-muted/60"
                    )
                  }
                >
                  {label === "Home" && <Home className="h-4 w-4" />}
                  {label === "ATS Guide" && <BookOpen className="h-4 w-4" />}
                  {label === "Dashboard" && <LayoutDashboard className="h-4 w-4" />}
                  {label}
                </NavLink>
              ))}
            </div>

            {/* User Actions */}
            {!isEditor && !user && (
              <Button
                onClick={() => navigate("/auth")}
                className="bg-primary hover:bg-primary-hover"
              >
                Sign In
              </Button>
            )}
            
            {!isEditor && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full hover:bg-muted/50 transition-colors duration-200"
                  >
                    <Avatar className="h-8 w-8 ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200">
                      <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 text-primary font-medium hover:from-primary/20 hover:to-primary/10 transition-all duration-200">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Account</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
