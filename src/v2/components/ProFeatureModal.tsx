/**
 * Pro Feature Modal
 *
 * Shows when a user tries to access a Pro feature without being logged in or subscribed.
 * Provides options to sign in or upgrade to Pro.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useSubscription } from '@/hooks/useSubscription';
import {
  Sparkles,
  Crown,
  LogIn,
  Zap,
  Check,
  Loader2,
  Target,
  FileUp,
  Linkedin,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

interface ProFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  featureDescription?: string;
}

export const ProFeatureModal: React.FC<ProFeatureModalProps> = ({
  isOpen,
  onClose,
  featureName = 'AI Features',
}) => {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useFirebaseAuth();
  const { createCheckoutSession } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      onClose();
      toast.success('Signed in successfully!');
    } catch (error) {
      toast.error('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const url = await createCheckoutSession('india');
      if (url) {
        window.location.href = url;
      } else {
        toast.error('Failed to start checkout. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPricing = () => {
    onClose();
    navigate('/pricing');
  };

  const proFeatures = [
    { icon: Sparkles, label: 'AI Resume Enhancement' },
    { icon: Target, label: 'Job-specific Tailoring' },
    { icon: Linkedin, label: 'LinkedIn Import' },
    { icon: FileUp, label: 'Resume Upload & Parse' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] p-0 gap-0 overflow-hidden border-0 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-700 transition-colors shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header with gradient background using theme primary color */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-cyan-500/10 px-8 pt-8 pb-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-4 rounded-2xl bg-white shadow-lg shadow-primary/10">
              <Crown className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {user ? 'Upgrade to Pro' : 'Sign In Required'}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-[280px]">
              {user
                ? `${featureName} is a Pro feature. Upgrade to unlock all AI-powered tools.`
                : `Sign in to access ${featureName} and unlock premium features.`
              }
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {/* Features List */}
          <div className="bg-primary/5 rounded-2xl p-5 mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-4">Pro features include:</p>
            <div className="space-y-3">
              {proFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 rounded-xl bg-white shadow-sm">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium flex-1">{feature.label}</span>
                  <div className="p-1 rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price - Only for logged in users */}
          {user && (
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">₹149</span>
                <span className="text-gray-500 text-lg">/month</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Cancel anytime, no questions asked</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {user ? (
              <>
                <Button
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-xl"
                  onClick={handleUpgrade}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Upgrade to Pro
                    </>
                  )}
                </Button>
                <button
                  onClick={handleViewPricing}
                  className="w-full text-center text-sm text-gray-500 hover:text-primary transition-colors py-2 font-medium"
                >
                  View full pricing details
                </button>
              </>
            ) : (
              <>
                <Button
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-xl"
                  onClick={handleSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign In with Google
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-gray-500 pt-1">
                  Free users can access basic features. Sign in to unlock Pro.
                </p>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProFeatureModal;
