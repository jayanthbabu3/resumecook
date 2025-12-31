import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LinkedInImportDialog } from "./LinkedInImportDialog";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkedInHeroCTAProps {
  className?: string;
}

/**
 * LinkedIn Hero CTA Component
 *
 * A prominent call-to-action section for the homepage hero area.
 * Encourages users to import their LinkedIn profile for a quick start.
 */
export function LinkedInHeroCTA({ className }: LinkedInHeroCTAProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <section
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-[#0A66C2]/5 via-[#0077B5]/5 to-[#00A0DC]/5",
          "border border-[#0A66C2]/10",
          className
        )}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#0A66C2]/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#0077B5]/5 blur-3xl" />
        </div>

        <div className="relative px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* LinkedIn Icon */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0A66C2] to-[#004182] flex items-center justify-center shadow-xl shadow-[#0A66C2]/20">
                <span className="text-white text-2xl sm:text-3xl font-bold">in</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Already have a LinkedIn profile?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-lg">
                Import your profile and create a professional resume in seconds.
                No manual data entry required.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>Instant import</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>Secure & private</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>Takes 30 seconds</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Button
                onClick={() => setShowDialog(true)}
                className={cn(
                  "h-12 px-6 rounded-xl text-base font-medium",
                  "bg-[#0A66C2] hover:bg-[#004182]",
                  "text-white shadow-lg shadow-[#0A66C2]/20",
                  "transition-all duration-200 hover:scale-[1.02]"
                )}
              >
                Import from LinkedIn
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Import Dialog */}
      <LinkedInImportDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  );
}

export default LinkedInHeroCTA;
