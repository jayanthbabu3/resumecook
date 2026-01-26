import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, FileText, HelpCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Decorative Background Element */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl" />
          </div>
          
          {/* 404 Number with Gradient */}
          <h1 className="relative text-[140px] sm:text-[180px] font-bold leading-none bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent select-none">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Page not found
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          
          {/* Show attempted path */}
          <p className="text-sm text-gray-400 font-mono bg-gray-100 inline-block px-3 py-1.5 rounded-lg">
            {location.pathname}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Button
            asChild
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-6"
            size="lg"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button
            variant="outline"
            asChild
            className="w-full sm:w-auto px-6"
            size="lg"
            onClick={() => window.history.back()}
          >
            <button type="button" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 mb-4">Or try one of these pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/my-resumes" 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <FileText className="w-4 h-4" />
              My Resumes
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/pricing" 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
