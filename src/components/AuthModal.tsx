import React, { useState } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, User, Chrome, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

/**
 * Reusable authentication modal component
 * Shows sign in / sign up forms in a modal dialog
 */
export const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const { signIn, signInWithGoogle, signUp } = useFirebaseAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [signUpError, setSignUpError] = useState('');

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSignInError('');
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('signin-email') as string;
    const password = formData.get('signin-password') as string;

    try {
      await signIn(email, password);
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      setSignInError(error.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSignUpError('');
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    try {
      await signUp(email, password, { fullName });
      onOpenChange(false);
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      if (error.message === 'User already exists') {
        setSignUpError('An account with this email already exists. Please sign in instead.');
      } else {
        setSignUpError(error.message || 'Failed to sign up. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      await signInWithGoogle();
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      setSignInError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-primary/5 to-primary/10">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome to ResumeCook
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to save your favorites and access all features
          </p>
        </DialogHeader>
        
        <div className="px-6 pb-6 pt-4">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-5 h-10">
              <TabsTrigger value="signin" className="text-sm">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4 mt-0">
              <Button
                type="button"
                variant="outline"
                className="w-full h-10 gap-2 hover:bg-accent transition-colors"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
              >
                <Chrome className="h-4 w-4" />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSignIn} className="space-y-3">
                {signInError && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-xs">{signInError}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-1.5">
                  <Label htmlFor="modal-signin-email" className="flex items-center gap-2 text-xs">
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </Label>
                  <Input
                    id="modal-signin-email"
                    name="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-9"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="modal-signin-password" className="flex items-center gap-2 text-xs">
                    <Lock className="h-3.5 w-3.5" />
                    Password
                  </Label>
                  <Input
                    id="modal-signin-password"
                    name="signin-password"
                    type="password"
                    placeholder="••••••••"
                    className="h-9"
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-9" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-0">
              <Button
                type="button"
                variant="outline"
                className="w-full h-10 gap-2 hover:bg-accent transition-colors"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
              >
                <Chrome className="h-4 w-4" />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or sign up with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSignUp} className="space-y-3">
                {signUpError && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-xs">{signUpError}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-1.5">
                  <Label htmlFor="modal-fullName" className="flex items-center gap-2 text-xs">
                    <User className="h-3.5 w-3.5" />
                    Full Name
                  </Label>
                  <Input
                    id="modal-fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="h-9"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="modal-email" className="flex items-center gap-2 text-xs">
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </Label>
                  <Input
                    id="modal-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-9"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="modal-password" className="flex items-center gap-2 text-xs">
                    <Lock className="h-3.5 w-3.5" />
                    Password
                  </Label>
                  <Input
                    id="modal-password"
                    name="password"
                    type="password"
                    placeholder="At least 6 characters"
                    className="h-9"
                    minLength={6}
                    required
                  />
                </div>
                <p className="text-[10px] text-muted-foreground text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
                <Button type="submit" className="w-full h-9" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
