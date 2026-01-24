/**
 * Trial Welcome Modal
 *
 * Shown after user successfully claims their free Pro trial.
 * Explains what features they now have access to.
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import {
  Linkedin,
  Wand2,
  Target,
  FileUp,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Check,
  Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrialWelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

const PRO_FEATURES = [
  {
    icon: Linkedin,
    title: 'LinkedIn Import',
    description: 'Import your profile in one click',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Wand2,
    title: 'AI Enhancement',
    description: 'Smart suggestions to improve your content',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Target,
    title: 'Job Tailoring',
    description: 'Optimize your resume for any job',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: FileUp,
    title: 'Resume Upload',
    description: 'Import and parse existing resumes',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    description: 'Get personalized resume advice',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
];

export const TrialWelcomeModal = ({ open, onClose }: TrialWelcomeModalProps) => {
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    onClose();
    navigate('/dashboard');
  };

  const handleImportLinkedIn = () => {
    onClose();
    navigate('/dashboard?action=linkedin-import');
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary via-blue-600 to-indigo-600 px-6 pt-8 pb-6 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome to Pro!
            </h2>
            <p className="text-white/90 text-sm">
              Your 21-day free trial is now active
            </p>
          </div>
        </div>

        {/* Features list */}
        <div className="px-6 py-5">
          <p className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            You now have access to:
          </p>

          <div className="space-y-3">
            {PRO_FEATURES.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={cn('p-2 rounded-lg', feature.bgColor)}>
                  <feature.icon className={cn('h-4 w-4', feature.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{feature.title}</p>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
                <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-6 space-y-3">
          <Button
            className="w-full h-11 font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 rounded-xl shadow-lg shadow-primary/20"
            onClick={handleImportLinkedIn}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            Import from LinkedIn
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="w-full h-10 font-medium rounded-xl"
            onClick={handleStartBuilding}
          >
            Go to Dashboard
          </Button>

          <p className="text-xs text-center text-gray-500">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrialWelcomeModal;
