/**
 * AI Disclaimer Component
 *
 * Displays a simple, unobtrusive message informing users that AI can make mistakes.
 * Use this wherever AI-generated content is displayed.
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIDisclaimerProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export const AIDisclaimer: React.FC<AIDisclaimerProps> = ({
  className,
  variant = 'default'
}) => {
  if (variant === 'compact') {
    return (
      <div className={cn(
        "flex items-center gap-1.5 text-xs text-amber-600",
        className
      )}>
        <AlertCircle className="h-3 w-3 flex-shrink-0" />
        <span>AI can make mistakes</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200",
      className
    )}>
      <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-800 leading-relaxed">
        AI-generated content may contain errors. Please review and verify all information.
      </p>
    </div>
  );
};

export default AIDisclaimer;
