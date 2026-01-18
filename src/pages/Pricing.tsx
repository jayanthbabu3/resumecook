/**
 * Pricing Page
 *
 * Displays pricing plans with free vs pro tier comparison.
 * Uses Razorpay for payments (INR only).
 * Includes login modal for non-authenticated users.
 */

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useTrial } from "@/hooks/useTrial";
import { toast } from "sonner";
import {
  Check,
  X,
  Sparkles,
  Zap,
  ArrowRight,
  Crown,
  Gift,
  Loader2,
  Clock,
  Users,
  Shield,
  Star,
  FileUp,
  Target,
  Wand2,
  MessageSquare,
  FileText,
  LogIn,
} from "lucide-react";
import { LinkedinIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

// Pricing configuration (INR only - Razorpay)
const PRICING = {
  currency: "₹",
  amount: 169,
  period: "mo",
};

// Feature lists
const FREE_FEATURES = [
  "Resume Builder",
  "All Templates",
  "Style Customization",
  "PDF Download",
  "Manual Editing",
];

const PRO_FEATURES_DISPLAY = [
  { name: "LinkedIn Import", description: "Import your profile instantly", icon: LinkedinIcon },
  { name: "Resume Upload & Parse", description: "Upload existing resume", icon: FileUp },
  { name: "AI Resume Enhancement", description: "Smart content suggestions", icon: Wand2 },
  { name: "Job Tailoring", description: "Match any job description", icon: Target },
  { name: "AI Chat Assistant", description: "Get personalized help", icon: MessageSquare },
  { name: "Unlimited Resumes", description: "Create as many as you need", icon: FileText },
];

const PRO_FEATURES = PRO_FEATURES_DISPLAY.map(f => f.name);

const Pricing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, signInWithGoogle } = useFirebaseAuth();
  const { isPro, isTrial, trialDaysRemaining, initiateSubscription, loading: subscriptionLoading, error: subscriptionError } = useSubscription();
  const { trialStatus } = useTrial();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Handle subscription callback messages
  useEffect(() => {
    const subscriptionStatus = searchParams.get("subscription");
    if (subscriptionStatus === "cancelled") {
      toast.info("Checkout was cancelled. You can upgrade anytime.");
    } else if (subscriptionStatus === "success") {
      toast.success("Welcome to Pro! Your subscription is now active.");
    }
  }, [searchParams]);

  // Show error toast when subscription error occurs
  useEffect(() => {
    if (subscriptionError) {
      toast.error(subscriptionError);
    }
  }, [subscriptionError]);

  // Calculate urgency level for countdown display
  const getUrgencyColor = (remaining: number) => {
    if (remaining < 100) return "from-red-500 to-orange-500";
    if (remaining < 300) return "from-orange-500 to-yellow-500";
    return "from-primary to-blue-600";
  };

  const handleGetStarted = () => {
    navigate("/templates");
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      setShowLoginModal(false);
      toast.success("Signed in successfully! You can now upgrade to Pro.");
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleUpgrade = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (isPro && !isTrial) {
      toast.info("You already have a Pro subscription!");
      navigate("/profile");
      return;
    }

    // Initiate Razorpay checkout (opens modal)
    await initiateSubscription();
  };

  const isLoading = subscriptionLoading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-50/30 to-background">
      <Header />

      {/* Trial Countdown Banner - Show only if trials are available and user doesn't have one */}
      {trialStatus?.trialsAvailable && !isPro && !isTrial && (
        <div className={`bg-gradient-to-r ${getUrgencyColor(trialStatus.trialsRemaining)} text-white py-3 px-4`}>
          <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 animate-pulse" />
              <span className="font-semibold text-sm">Limited Time Offer!</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">
                <strong>{trialStatus.trialsRemaining}</strong> of {trialStatus.maxTrials} free 7-day Pro trials remaining!
              </span>
            </div>
            {!user && (
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs h-7"
                onClick={() => setShowLoginModal(true)}
              >
                Sign up to claim yours
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Active Trial Banner */}
      {isTrial && trialDaysRemaining !== null && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-4">
          <div className="container mx-auto max-w-5xl flex items-center justify-center gap-3 text-center">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">
              <strong>Your free trial is active!</strong> {trialDaysRemaining} {trialDaysRemaining === 1 ? 'day' : 'days'} remaining.
              {trialDaysRemaining <= 2 && " Subscribe now to keep your Pro features!"}
            </span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="pt-10 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/30 bg-primary/5">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
              Simple Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Unlock your{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                career potential
              </span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              {trialStatus?.trialsAvailable && !isPro && !isTrial
                ? "Start with a 7-day free Pro trial. No credit card required."
                : "Create stunning resumes for free. Upgrade to unlock AI superpowers."}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* Free Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-300" />
              <div className="relative rounded-3xl border border-border/60 bg-white p-8 shadow-sm h-full flex flex-col">

                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Free</h3>
                    <p className="text-sm text-muted-foreground mt-1">Forever free, no card needed</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Gift className="h-6 w-6 text-gray-600" />
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-bold text-foreground">{PRICING.currency}0</span>
                  <span className="text-lg text-muted-foreground">/{PRICING.period}</span>
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-semibold mb-8 rounded-xl"
                  onClick={handleGetStarted}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Features */}
                <div className="space-y-4 flex-1">
                  <p className="text-sm font-medium text-muted-foreground">What's included:</p>
                  {FREE_FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-emerald-600" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary via-blue-500 to-cyan-500 rounded-[28px] opacity-75 blur group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative rounded-3xl border-2 border-primary/50 bg-white p-8 shadow-2xl h-full flex flex-col">

                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1.5 text-sm font-semibold shadow-lg rounded-full">
                    <Crown className="h-4 w-4 mr-1.5" />
                    Most Popular
                  </Badge>
                </div>

                {/* Header Row */}
                <div className="flex items-center justify-between mb-6 pt-2">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      Pro
                      <Sparkles className="h-5 w-5 text-primary" />
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">AI-powered features</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-bold text-foreground">
                    {PRICING.currency}{PRICING.amount}
                  </span>
                  <span className="text-lg text-muted-foreground">/{PRICING.period}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">Cancel anytime, no questions asked</p>

                {/* CTA */}
                <Button
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/30 mb-8 rounded-xl"
                  onClick={handleUpgrade}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : isPro && !isTrial ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      You're on Pro
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      {user ? "Upgrade to Pro" : "Get Pro Now"}
                    </>
                  )}
                </Button>

                {/* Features */}
                <div className="space-y-4 flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Everything in Free, plus:</p>
                  {PRO_FEATURES_DISPLAY.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <feature.icon className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">{feature.name}</span>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-border/40 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    Secure payment
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-500" />
                    4.9/5 rating
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Comparison */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Compare Plans</h2>

            <div className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 border-b border-border/60">
                <div className="text-sm font-semibold text-foreground">Feature</div>
                <div className="text-sm font-semibold text-center text-foreground">Free</div>
                <div className="text-sm font-semibold text-center text-primary flex items-center justify-center gap-1">
                  <Crown className="h-3.5 w-3.5" />
                  Pro
                </div>
              </div>

              {[...FREE_FEATURES, ...PRO_FEATURES].map((feature, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 p-4 border-b border-border/40 last:border-b-0 hover:bg-muted/20 transition-colors">
                  <div className="text-sm text-foreground">{feature}</div>
                  <div className="text-center">
                    {index < FREE_FEATURES.length ? (
                      <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 mx-auto" />
                    )}
                  </div>
                  <div className="text-center">
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

            <div className="grid gap-4">
              {[
                { q: "Is the free plan really free?", a: "Yes! Create unlimited resumes, use all templates, and download PDFs - forever free. No credit card required." },
                { q: "Can I cancel anytime?", a: "Absolutely. Cancel your Pro subscription anytime from your profile. No questions asked, no hidden fees." },
                { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, and netbanking through our secure Razorpay integration." },
                { q: "Is my payment information secure?", a: "100% secure. We use Razorpay, a PCI-DSS compliant payment processor. Your card details never touch our servers." },
              ].map((faq, index) => (
                <div key={index} className="p-5 rounded-xl bg-white border border-border/60 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold text-foreground">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center bg-gradient-to-br from-primary/5 via-blue-50 to-cyan-50/50 rounded-3xl p-10 border border-primary/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {isPro && !isTrial ? "You're all set!" : "Ready to build your perfect resume?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              {isPro && !isTrial
                ? "You have full access to all Pro features. Start creating amazing resumes!"
                : "Join thousands of professionals who landed their dream jobs with ResumeCook"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isPro && !isTrial ? (
                <Button
                  className="h-12 px-8 text-base bg-gradient-to-r from-primary to-blue-600 rounded-xl shadow-lg shadow-primary/25"
                  onClick={() => navigate("/templates")}
                >
                  <Crown className="mr-2 h-5 w-5" />
                  Start Building
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="h-12 px-8 text-base rounded-xl"
                    onClick={handleGetStarted}
                  >
                    Start Free
                  </Button>
                  <Button
                    className="h-12 px-8 text-base bg-gradient-to-r from-primary to-blue-600 rounded-xl shadow-lg shadow-primary/25"
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
                        Get Pro Now
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-3 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between">
            <div>&copy; {new Date().getFullYear()} ResumeCook. All rights reserved.</div>
            <div className="flex items-center justify-center gap-6">
              <button onClick={() => navigate("/privacy")} className="hover:text-foreground transition-colors">Privacy Policy</button>
              <button onClick={() => navigate("/terms")} className="hover:text-foreground transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal for Non-Authenticated Users */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-[420px] p-0 gap-0 overflow-hidden border-0 shadow-2xl rounded-3xl">
          {/* Close Button */}
          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute right-4 top-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header with gradient background */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-blue-500/10 px-8 pt-10 pb-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 p-5 rounded-3xl bg-white shadow-lg shadow-primary/10">
                <Crown className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Upgrade to Pro
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-[300px]">
                Sign in with Google to unlock AI-powered features and supercharge your resume
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            {/* Price highlight */}
            <div className="text-center mb-6 p-4 bg-primary/5 rounded-2xl">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">{PRICING.currency}{PRICING.amount}</span>
                <span className="text-gray-500 text-lg">/{PRICING.period}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Cancel anytime, no questions asked</p>
            </div>

            {/* Features Preview */}
            <div className="space-y-3 mb-8">
              {PRO_FEATURES_DISPLAY.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{feature.name}</span>
                </div>
              ))}
            </div>

            {/* Google Sign In Button */}
            <Button
              className="w-full h-14 text-base font-semibold bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 rounded-xl shadow-sm"
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4">
              By continuing, you agree to our{' '}
              <button onClick={() => { setShowLoginModal(false); navigate('/terms'); }} className="text-primary hover:underline">
                Terms
              </button>
              {' '}and{' '}
              <button onClick={() => { setShowLoginModal(false); navigate('/privacy'); }} className="text-primary hover:underline">
                Privacy Policy
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pricing;
