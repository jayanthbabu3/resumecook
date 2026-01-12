import React, { useState, useEffect, useRef } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, Eye, EyeOff, FileText, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Auth = () => {
  const { signIn, signInWithGoogle, signUp, resetPassword, loading, user } = useFirebaseAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showEmailExistsDialog, setShowEmailExistsDialog] = useState(false);
  const [existingEmail, setExistingEmail] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const [signUpPassword, setSignUpPassword] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && user) {
      navigate('/templates', { replace: true });
    }
  }, [user, loading, navigate]);

  const getFirebaseErrorMessage = (error: any): string => {
    const errorCode = error.code || '';
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up first.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'auth/email-not-verified':
        return 'Please verify your email first. A new verification link has been sent to your inbox.';
      default:
        return error.message || 'An error occurred. Please try again.';
    }
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSignInError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('signin-email') as string;
    const password = formData.get('signin-password') as string;

    try {
      await signIn(email, password);
    } catch (error: any) {
      setSignInError(getFirebaseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setForgotPasswordError('');

    try {
      await resetPassword(forgotPasswordEmail);
      setForgotPasswordSent(true);
    } catch (error: any) {
      setForgotPasswordError(getFirebaseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSignUpError('');
    setConfirmPasswordError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const fullName = formData.get('fullName') as string;

    // Validate passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    // Validate password strength
    if (passwordStrength < 2) {
      setSignUpError('Please create a stronger password.');
      setIsSubmitting(false);
      return;
    }

    try {
      await signUp(email, password, { fullName });
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      // Check if email already exists - show dialog instead of just error
      if (error.code === 'auth/email-already-in-use') {
        setExistingEmail(email);
        setShowEmailExistsDialog(true);
        setSignUpError('');
      } else {
        setSignUpError(getFirebaseErrorMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      await signInWithGoogle();
    } catch (error: any) {
      setSignInError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-[#0a0a0f] overflow-hidden">
        {/* Mesh gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.3),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_0%_100%,rgba(139,92,246,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_100%_0%,rgba(6,182,212,0.1),transparent)]" />
        </div>

        {/* Floating elements */}
        <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-blue-500/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-72 h-72 rounded-full bg-violet-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Content container */}
        <div className="relative z-10 flex flex-col justify-between w-full p-10 xl:p-14">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 w-fit">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/25">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">ResumeCook</span>
          </Link>

          {/* Center content */}
          <div className="flex-1 flex flex-col justify-center max-w-lg py-12">
            {/* Main heading */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                Free to use
              </div>

              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                Create your
                <span className="relative mx-3">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                    perfect
                  </span>
                </span>
                resume
              </h1>

              <p className="text-base xl:text-lg text-white/50 leading-relaxed max-w-md">
                Professional templates, ATS-optimized formatting. Build your resume in minutes.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10 pt-10 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-sm text-white/40">Templates</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-white/40">Free</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-white">ATS</div>
                <div className="text-sm text-white/40">Optimized</div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-white/30">
            <span>&copy; {new Date().getFullYear()} ResumeCook</span>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-background dark:to-blue-950/20 relative overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3),transparent_70%)]" />
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b relative z-10 bg-background/80 backdrop-blur-sm">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-foreground">ResumeCook</span>
          </Link>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 relative z-10">
          <div className="w-full max-w-[380px] space-y-6">
            {/* Forgot Password View */}
            {showForgotPassword ? (
              <>
                {forgotPasswordSent ? (
                  <div className="space-y-6 text-center">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-foreground">Check your email</h2>
                      <p className="text-sm text-muted-foreground">
                        We've sent a password reset link to <strong>{forgotPasswordEmail}</strong>
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setForgotPasswordSent(false);
                        setForgotPasswordEmail('');
                      }}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Sign In
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(false)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                      <h2 className="text-2xl font-bold text-foreground">Reset password</h2>
                      <p className="text-sm text-muted-foreground">
                        Enter your email and we'll send you a reset link
                      </p>
                    </div>

                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      {forgotPasswordError && (
                        <Alert variant="destructive" className="text-sm py-3">
                          <AlertDescription>{forgotPasswordError}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="forgot-email" className="text-sm font-medium">
                          Email address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                          <Input
                            id="forgot-email"
                            type="email"
                            placeholder="you@example.com"
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            className="h-11 pl-10 bg-muted/30 border-border/60 focus:bg-background transition-colors"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-11 font-medium bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          'Send Reset Link'
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </>
            ) : (
              <>
                {/* Header */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    Welcome back
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Enter your credentials to access your account
                  </p>
                </div>

                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 gap-3 font-medium border-border/60 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-border hover:text-foreground transition-all"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs text-muted-foreground uppercase tracking-wider">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value);
              // Reset password fields when switching tabs
              if (value === 'signup') {
                setSignUpPassword('');
                setPasswordStrength(0);
                setConfirmPasswordError('');
                setSignUpError('');
              } else {
                setSignInError('');
              }
            }} className="w-full" ref={tabsRef}>
              <TabsList className="grid w-full grid-cols-2 h-11 p-1 bg-muted/40">
                <TabsTrigger
                  value="signin"
                  className="text-sm font-medium rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="text-sm font-medium rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Sign In Form */}
              <TabsContent value="signin" className="mt-6 space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  {signInError && (
                    <Alert variant="destructive" className="text-sm py-3">
                      <AlertDescription>{signInError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-sm font-medium">
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <Input
                        id="signin-email"
                        name="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-11 pl-10 bg-muted/30 border-border/60 focus:bg-background transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password" className="text-sm font-medium">
                        Password
                      </Label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <Input
                        id="signin-password"
                        name="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="h-11 pl-10 pr-10 bg-muted/30 border-border/60 focus:bg-background transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 font-medium bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup" className="mt-6 space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  {signUpError && (
                    <Alert variant="destructive" className="text-sm py-3">
                      <AlertDescription>{signUpError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        className="h-11 pl-10 bg-muted/30 border-border/60 focus:bg-background transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-11 pl-10 bg-muted/30 border-border/60 focus:bg-background transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <Input
                        id="password"
                        name="password"
                        type={showSignUpPassword ? 'text' : 'password'}
                        placeholder="Min. 6 characters"
                        className="h-11 pl-10 pr-10 bg-muted/30 border-border/60 focus:bg-background transition-colors"
                        minLength={6}
                        required
                        value={signUpPassword}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSignUpPassword(value);
                          setPasswordStrength(calculatePasswordStrength(value));
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                      >
                        {showSignUpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {/* Password strength indicator */}
                    <div className="space-y-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              passwordStrength >= level
                                ? passwordStrength <= 2
                                  ? 'bg-red-500'
                                  : passwordStrength <= 3
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {passwordStrength === 0 && 'Enter a password'}
                        {passwordStrength === 1 && 'Weak - add more characters'}
                        {passwordStrength === 2 && 'Fair - try adding numbers'}
                        {passwordStrength === 3 && 'Good - try adding symbols'}
                        {passwordStrength === 4 && 'Strong password'}
                        {passwordStrength === 5 && 'Very strong password'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        className={`h-11 pl-10 pr-10 bg-muted/30 border-border/60 focus:bg-background transition-colors ${
                          confirmPasswordError ? 'border-red-500' : ''
                        }`}
                        minLength={6}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {confirmPasswordError && (
                      <p className="text-xs text-red-500">{confirmPasswordError}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 font-medium bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Create Account
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground pt-2">
                    By signing up, you agree to our{' '}
                    <Link to="/terms" className="text-foreground hover:underline">Terms</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-foreground hover:underline">Privacy Policy</Link>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
              </>
            )}
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden p-4 text-center border-t">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ResumeCook. All rights reserved.
          </p>
        </div>
      </div>

      {/* Email Already Exists Dialog */}
      <Dialog open={showEmailExistsDialog} onOpenChange={setShowEmailExistsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <AlertCircle className="h-7 w-7 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Account Already Exists</DialogTitle>
            <DialogDescription className="text-center pt-2">
              An account with <strong className="text-foreground">{existingEmail}</strong> already exists. Would you like to sign in instead?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={() => {
                setShowEmailExistsDialog(false);
                setActiveTab('signin');
                setSignUpError('');
              }}
              className="w-full h-11 font-medium bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
            >
              Sign In to Existing Account
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowEmailExistsDialog(false);
                setExistingEmail('');
              }}
              className="w-full h-11"
            >
              Use Different Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
