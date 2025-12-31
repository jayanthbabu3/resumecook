import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LinkedInUrlInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string;
  label?: string;
}

/**
 * LinkedIn URL Input Component
 *
 * A styled input field specifically for LinkedIn profile URLs.
 * Features the LinkedIn "in" icon as a prefix and validation styling.
 */
export const LinkedInUrlInput = forwardRef<HTMLInputElement, LinkedInUrlInputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const inputId = id || "linkedin-url-input";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {/* LinkedIn "in" icon prefix */}
          <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pointer-events-none">
            <div className="w-6 h-6 rounded bg-[#0A66C2] flex items-center justify-center">
              <span className="text-white text-xs font-bold">in</span>
            </div>
          </div>

          <input
            ref={ref}
            id={inputId}
            type="url"
            inputMode="url"
            autoComplete="url"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="linkedin.com/in/your-profile"
            className={cn(
              // Base styles
              "flex h-12 w-full rounded-xl border bg-white pl-12 pr-4 py-3",
              "text-base text-gray-900 placeholder:text-gray-400",
              // Focus styles
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              // Transition
              "transition-all duration-200",
              // Default border
              !error && "border-gray-200 hover:border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]/20",
              // Error state
              error && "border-red-300 focus:border-red-500 focus:ring-red-500/20",
              // Disabled state
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

LinkedInUrlInput.displayName = "LinkedInUrlInput";

export default LinkedInUrlInput;
