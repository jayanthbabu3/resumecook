import { Loader2, Check, AlertCircle, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AutoSaveStatusProps } from '@/hooks/useAutoSave';
import { getAutoSaveStatus } from '@/hooks/useAutoSave';

interface AutoSaveIndicatorProps extends AutoSaveStatusProps {
  className?: string;
}

export function AutoSaveIndicator({
  isSaving,
  lastSaved,
  error,
  className,
}: AutoSaveIndicatorProps) {
  const status = getAutoSaveStatus({ isSaving, lastSaved, error });

  const variants = {
    saving: {
      icon: Loader2,
      className: 'text-blue-600',
      iconClassName: 'animate-spin',
    },
    saved: {
      icon: Check,
      className: 'text-green-600',
      iconClassName: '',
    },
    error: {
      icon: AlertCircle,
      className: 'text-red-600',
      iconClassName: '',
    },
    idle: {
      icon: Cloud,
      className: 'text-gray-400',
      iconClassName: '',
    },
  };

  const variant = variants[status.variant];
  const Icon = variant.icon;

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-sm font-medium transition-colors',
        variant.className,
        className
      )}
    >
      <Icon className={cn('h-4 w-4', variant.iconClassName)} />
      <span>{status.message}</span>
    </div>
  );
}

/**
 * Compact version for toolbar
 */
export function AutoSaveIndicatorCompact({
  isSaving,
  lastSaved,
  error,
  className,
}: AutoSaveIndicatorProps) {
  if (error) {
    return (
      <div
        className={cn(
          'flex items-center gap-1.5 text-xs font-medium text-red-600',
          className
        )}
        title={error.message}
      >
        <AlertCircle className="h-3.5 w-3.5" />
        <span>Failed</span>
      </div>
    );
  }

  if (isSaving) {
    return (
      <div
        className={cn(
          'flex items-center gap-1.5 text-xs font-medium text-blue-600',
          className
        )}
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        <span>Saving...</span>
      </div>
    );
  }

  if (lastSaved) {
    return (
      <div
        className={cn(
          'flex items-center gap-1.5 text-xs font-medium text-green-600',
          className
        )}
        title={lastSaved.toLocaleString()}
      >
        <Check className="h-3.5 w-3.5" />
        <span>Saved</span>
      </div>
    );
  }

  return null;
}
