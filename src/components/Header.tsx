import React, { useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, LayoutDashboard, FileText, BookOpen, Menu, FolderOpen, ChevronDown, Sparkles, GraduationCap } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useFirebaseAuth();

  // Check if we're on builder/editor pages
  const isBuilderPage = useMemo(() =>
    location.pathname.startsWith("/builder") ||
    location.pathname.startsWith("/editor"),
    [location.pathname]
  );

  // Memoize user-related values to prevent recalculation
  const userInfo = useMemo(() => {
    if (!user) return { initials: "U", displayName: "User", email: "", photoURL: undefined };

    let initials = "U";
    if (user.displayName) {
      initials = user.displayName.split(' ').map(name => name[0]).join('').slice(0, 2).toUpperCase();
    } else if (user.email) {
      initials = user.email.split('@')[0].slice(0, 2).toUpperCase();
    }

    let displayName = "User";
    if (user.displayName) {
      displayName = user.displayName;
    } else if (user.email) {
      displayName = user.email.split('@')[0];
    }

    return {
      initials,
      displayName,
      email: user.email || "",
      photoURL: user.photoURL || undefined
    };
  }, [user?.displayName, user?.email, user?.photoURL]);

  // Navigation items based on auth state
  const navItems = useMemo(() => {
    const baseItems = [
      { label: "Templates", to: "/templates", icon: LayoutDashboard },
      { label: "Fresher", to: "/templates/fresher", icon: GraduationCap },
      { label: "ATS Guide", to: "/ats-guidelines", icon: BookOpen },
    ];

    if (user) {
      return [
        ...baseItems,
        { label: "My Resumes", to: "/my-resumes", icon: FolderOpen },
      ];
    }

    return baseItems;
  }, [!!user]);

  // Quick action for creating resume
  const showCreateButton = !isBuilderPage;

  // Memoize navigation callbacks
  const handleNavigateHome = useCallback(() => navigate("/templates"), [navigate]);
  const handleNavigateCreate = useCallback(() => navigate("/builder/scratch-v2/select-layout"), [navigate]);
  const handleNavigateAuth = useCallback(() => navigate("/auth"), [navigate]);
  const handleNavigateTemplates = useCallback(() => navigate("/templates"), [navigate]);
  const handleNavigateMyResumes = useCallback(() => navigate("/my-resumes"), [navigate]);
  const handleNavigateProfile = useCallback(() => navigate("/profile"), [navigate]);
  const handleSignOut = useCallback(() => signOut(), [signOut]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white supports-[backdrop-filter]:bg-white/95 supports-[backdrop-filter]:backdrop-blur-xl will-change-transform">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4">

          {/* Logo Section */}
          <button
            onClick={handleNavigateHome}
            className="group flex items-center gap-2.5 sm:gap-3 -ml-1 px-1 py-1 rounded-xl transition-all duration-200 hover:bg-gray-50 flex-shrink-0"
            aria-label="Resume Cook home"
          >
            {/* Logo Icon */}
            <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 transition-all duration-200 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-105">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" strokeWidth={2.5} />
            </div>

            {/* Brand Text */}
            <div className="hidden sm:flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-gray-900">
                Resume<span className="text-primary">Cook</span>
              </span>
            </div>
          </button>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Create Resume Button - Desktop */}
            {showCreateButton && (
              <Button
                onClick={handleNavigateCreate}
                size="sm"
                className="hidden md:inline-flex h-9 px-4 rounded-lg font-medium shadow-sm gap-2"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden lg:inline">Create Resume</span>
                <span className="lg:hidden">Create</span>
              </Button>
            )}

            {/* Sign In Button - Not logged in */}
            {!user && (
              <Button
                onClick={handleNavigateAuth}
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex h-9 px-4 rounded-lg font-medium"
              >
                Sign In
              </Button>
            )}

            {/* User Menu - Logged in (Desktop) */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden md:flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <Avatar className="h-8 w-8 ring-2 ring-gray-100">
                      <AvatarImage src={userInfo.photoURL} alt={userInfo.displayName} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white text-sm font-semibold">
                        {userInfo.initials}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-xl shadow-lg border-gray-100" align="end">
                  {/* User Info */}
                  <div className="px-3 py-3 border-b border-gray-100">
                    <p className="font-semibold text-sm text-gray-900">{userInfo.displayName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{userInfo.email}</p>
                  </div>

                  <div className="py-1">
                    <DropdownMenuItem
                      onClick={handleNavigateTemplates}
                      className="px-3 py-2 cursor-pointer rounded-lg mx-1"
                    >
                      <LayoutDashboard className="mr-2.5 h-4 w-4 text-gray-500" />
                      <span>Templates</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleNavigateMyResumes}
                      className="px-3 py-2 cursor-pointer rounded-lg mx-1"
                    >
                      <FolderOpen className="mr-2.5 h-4 w-4 text-gray-500" />
                      <span>My Resumes</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleNavigateProfile}
                      className="px-3 py-2 cursor-pointer rounded-lg mx-1"
                    >
                      <User className="mr-2.5 h-4 w-4 text-gray-500" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="bg-gray-100" />

                  <div className="py-1">
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="px-3 py-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg mx-1"
                    >
                      <LogOut className="mr-2.5 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu */}
            <div className="flex lg:hidden items-center gap-2">
              {user && (
                <Avatar className="h-8 w-8 ring-2 ring-gray-100 hidden sm:flex">
                  <AvatarImage src={userInfo.photoURL} alt={userInfo.displayName} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white text-sm font-semibold">
                    {userInfo.initials}
                  </AvatarFallback>
                </Avatar>
              )}

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  {/* Mobile Menu Header */}
                  <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          Resume<span className="text-primary">Cook</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action - Mobile */}
                  {showCreateButton && (
                    <div className="p-4 border-b border-gray-100">
                      <SheetClose asChild>
                        <Button
                          onClick={handleNavigateCreate}
                          className="w-full h-11 rounded-xl font-medium gap-2"
                        >
                          <Sparkles className="h-4 w-4" />
                          Create New Resume
                        </Button>
                      </SheetClose>
                    </div>
                  )}

                  {/* Mobile Navigation */}
                  <div className="p-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">
                      Navigation
                    </p>
                    <nav className="space-y-1">
                      {navItems.map(({ label, to, icon: Icon }) => (
                        <SheetClose asChild key={label}>
                          <NavLink
                            to={to}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                              )
                            }
                          >
                            <Icon className="h-5 w-5" />
                            {label}
                          </NavLink>
                        </SheetClose>
                      ))}
                    </nav>

                    {/* User Section in Mobile */}
                    {user && (
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">
                          Account
                        </p>
                        <div className="px-4 py-3 mb-2 rounded-xl bg-gray-50">
                          <p className="font-semibold text-sm text-gray-900">{userInfo.displayName}</p>
                          <p className="text-xs text-gray-500">{userInfo.email}</p>
                        </div>
                        <SheetClose asChild>
                          <button
                            onClick={handleNavigateProfile}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                          >
                            <User className="h-5 w-5" />
                            Profile Settings
                          </button>
                        </SheetClose>
                        <SheetClose asChild>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-5 w-5" />
                            Log out
                          </button>
                        </SheetClose>
                      </div>
                    )}

                    {/* Sign In for Mobile */}
                    {!user && (
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <SheetClose asChild>
                          <Button
                            onClick={handleNavigateAuth}
                            className="w-full h-11 rounded-xl font-medium"
                          >
                            Sign In
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Header = React.memo(HeaderComponent);
