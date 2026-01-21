import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Check, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SaveOptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveResumeOnly: () => void;
  onSaveAndUpdateProfile: () => void;
  isSaving: boolean;
  isNewResume?: boolean;
}

export const SaveOptionsDialog: React.FC<SaveOptionsDialogProps> = ({
  open,
  onOpenChange,
  onSaveResumeOnly,
  onSaveAndUpdateProfile,
  isSaving,
}) => {
  const [selectedOption, setSelectedOption] = useState<'resume' | 'profile'>('profile');
  const [savingOption, setSavingOption] = useState<'resume' | 'profile' | null>(null);

  const handleSave = () => {
    if (selectedOption === 'resume') {
      setSavingOption('resume');
      onSaveResumeOnly();
    } else {
      setSavingOption('profile');
      onSaveAndUpdateProfile();
    }
  };

  // Reset state when dialog opens or closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset all state when dialog closes
      setSavingOption(null);
      setSelectedOption('profile'); // Reset to default
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[380px] p-0 gap-0 overflow-hidden">
        {/* Gradient Header */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-primary/5 via-blue-50/50 to-indigo-50/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-primary/10 shadow-sm mb-3">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Save Options</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              How would you like to save?
            </h2>
          </div>
        </div>

        {/* Options */}
        <div className="p-4 space-y-2">
          {/* Save Resume Only */}
          <button
            onClick={() => setSelectedOption('resume')}
            disabled={isSaving}
            className={cn(
              "w-full p-3.5 rounded-xl text-left transition-all duration-200 group",
              "border-2",
              selectedOption === 'resume'
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center transition-colors",
                selectedOption === 'resume'
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <Zap className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-medium transition-colors",
                    selectedOption === 'resume' ? "text-gray-900" : "text-gray-700"
                  )}>
                    Resume Only
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
                    Quick
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Save without syncing to profile
                </p>
              </div>
              <div className={cn(
                "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
                selectedOption === 'resume'
                  ? "border-primary bg-primary"
                  : "border-gray-300"
              )}>
                {selectedOption === 'resume' && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
            </div>
          </button>

          {/* Save & Update Profile */}
          <button
            onClick={() => setSelectedOption('profile')}
            disabled={isSaving}
            className={cn(
              "w-full p-3.5 rounded-xl text-left transition-all duration-200 group relative overflow-hidden",
              "border-2",
              selectedOption === 'profile'
                ? "border-primary bg-gradient-to-r from-primary/5 to-blue-50/50 shadow-sm"
                : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
            )}
          >
            {selectedOption === 'profile' && (
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-gradient-to-r from-primary to-blue-600 text-white text-[9px] font-semibold rounded-bl-lg">
                RECOMMENDED
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center transition-colors",
                selectedOption === 'profile'
                  ? "bg-gradient-to-br from-primary to-blue-600 text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className={cn(
                  "font-medium transition-colors",
                  selectedOption === 'profile' ? "text-gray-900" : "text-gray-700"
                )}>
                  Save & Update Profile
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Sync to profile for future resumes
                </p>
              </div>
              <div className={cn(
                "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
                selectedOption === 'profile'
                  ? "border-primary bg-primary"
                  : "border-gray-300"
              )}>
                {selectedOption === 'profile' && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 pt-1">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
              "w-full h-11 rounded-xl font-medium transition-all duration-200",
              "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90",
              "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            )}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {selectedOption === 'resume' ? 'Saving Resume...' : 'Saving & Updating Profile...'}
              </>
            ) : (
              <>
                {selectedOption === 'resume' ? 'Save Resume Only' : 'Save & Update Profile'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>

          <p className="text-[11px] text-gray-400 text-center mt-3">
            Profile data auto-fills when you create new resumes
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
