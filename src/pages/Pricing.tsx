/**
 * Pricing Page - Minimal & Professional
 *
 * Clean, straightforward pricing page where:
 * - Pricing cards are visible immediately on landing
 * - No fake content (testimonials, reviews, stats)
 * - Real, helpful FAQs
 * - Elegant, minimal design following website theme
 */

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription, useTrialStatus } from "@/hooks/useSubscriptionNew";
import { useCountry, type Currency } from "@/hooks/useCountry";
import { FEATURES as FEATURE_FLAGS } from "@/config/features";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Check,
  X,
  Zap,
  ArrowRight,
  Crown,
  Loader2,
  Shield,
  Wand2,
  MessageSquare,
  FileText,
  Linkedin,
  Target,
  FileUp,
  Gift,
  Timer,
  Mic,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Pricing configuration by currency
const PRICING_CONFIG = {
  INR: {
    currency: "INR",
    symbol: "₹",
    amount: 169,
    period: "month",
  },
  USD: {
    currency: "USD",
    symbol: "$",
    amount: 9,
    period: "month",
  },
};

// Feature comparison data
const FEATURES = [
  { name: "All Professional Templates", free: true, pro: true },
  { name: "Live Editor & Form Editor", free: true, pro: true },
  { name: "Unlimited PDF Downloads", free: true, pro: true },
  { name: "Custom Colors & Fonts", free: true, pro: true },
  { name: "Section Reordering", free: true, pro: true },
  { name: "LinkedIn Profile Import", free: false, pro: true },
  { name: "AI Resume Enhancement", free: false, pro: true },
  { name: "Match to Job", free: false, pro: true },
  { name: "Resume Upload & Parse", free: false, pro: true },
  { name: "AI Chat Assistant", free: false, pro: true },
  { name: "AI Mock Interview", free: false, pro: true },
  { name: "Unlimited Resume Versions", free: false, pro: true },
];

// Real, helpful FAQs
const FAQS = [
  {
    q: "Is the free plan really free?",
    a: "Yes! The free plan includes all templates, both editors (live and form), and unlimited PDF downloads. No credit card required, no time limits.",
  },
  {
    q: "What do I get with Pro?",
    a: "Pro unlocks AI-powered features: import your LinkedIn profile, enhance your resume with AI suggestions, tailor your resume for specific jobs, upload existing resumes, and get help from our AI chat assistant.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel with one click from your account settings. You'll keep Pro access until the end of your billing period.",
  },
  {
    q: "Is my payment secure?",
    a: "We use Razorpay, India's leading payment gateway with bank-grade security. Your card details are encrypted and never stored on our servers.",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, signInWithGoogle } = useAuth();
  const {
    isPro,
    isTrial,
    trialDaysRemaining,
    startCheckout,
    claimTrial,
    isLoading: subscriptionLoading,
    isCheckoutLoading,
    isClaimingTrial,
  } = useSubscription();
  const { currency, isIndia, loading: countryLoading } = useCountry();
  // Get real trial status from API
  const { data: trialStatus } = useTrialStatus();
  const trialLoading = isClaimingTrial;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [pendingTrialClaim, setPendingTrialClaim] = useState(false);

  // Get pricing based on detected country
  const PRICING = PRICING_CONFIG[currency] || PRICING_CONFIG.INR;

  // Handle subscription callback messages
  useEffect(() => {
    const subscriptionStatus = searchParams.get("subscription");
    if (subscriptionStatus === "cancelled") {
      toast.info("Checkout was cancelled. You can upgrade anytime.");
    } else if (subscriptionStatus === "success") {
      toast.success("Welcome to Pro! Your subscription is now active.");
    }
  }, [searchParams]);

  // Check if user came from trial banner (trial=true param) - only run once on mount
  useEffect(() => {
    const wantsTrial = searchParams.get("trial") === "true";
    if (wantsTrial && !user) {
      // User came from trial banner but not logged in - show login modal
      setShowLoginModal(true);
      setPendingTrialClaim(true);
      // Clear the trial param from URL to prevent reopening on close
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Auto-claim trial after login if user came from trial banner
  useEffect(() => {
    if (pendingTrialClaim && user && !isPro && !isTrial) {
      setPendingTrialClaim(false);
      claimTrial();
      // The trial welcome modal will show and let user choose where to go
    }
  }, [pendingTrialClaim, user, isPro, isTrial, claimTrial]);

  const handleGetStarted = () => {
    navigate("/templates");
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      setShowLoginModal(false);
      // If pending trial claim, the useEffect will handle trial claim and navigation
      // Otherwise, just stay on pricing page for the user to continue
      if (!pendingTrialClaim) {
        toast.success("Signed in successfully! You can now upgrade to Pro.");
      }
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
      setPendingTrialClaim(false);
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
      navigate("/account");
      return;
    }

    // Pass the detected currency to initiate subscription with correct plan
    await startCheckout(currency);
  };

  const handleClaimTrial = () => {
    if (!user) {
      setPendingTrialClaim(true);
      setShowLoginModal(true);
      return;
    }

    if (isPro) {
      toast.info("You already have Pro access!");
      return;
    }

    claimTrial();
    // The trial welcome modal will show and let user choose where to go
  };

  const isLoading = subscriptionLoading || isCheckoutLoading;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Trial Banner - Only show if trial system is enabled */}
      {FEATURE_FLAGS.TRIAL_SYSTEM_ENABLED && trialStatus?.trialsAvailable && !isPro && !isTrial && (
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white py-2.5 px-4">
          <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span className="font-medium text-sm">
                <strong>{trialStatus.trialsRemaining}</strong> free 21-day Pro trials remaining
              </span>
            </div>
            {!user && (
              <Button
                size="sm"
                className="bg-white text-purple-700 hover:bg-white/90 text-xs h-7 font-semibold"
                onClick={() => {
                  setPendingTrialClaim(true);
                  setShowLoginModal(true);
                }}
              >
                Claim Yours
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Active Trial Banner - Only show if trial system is enabled */}
      {FEATURE_FLAGS.TRIAL_SYSTEM_ENABLED && isTrial && trialDaysRemaining !== null && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2.5 px-4">
          <div className="container mx-auto max-w-5xl flex items-center justify-center gap-3 text-center">
            <Timer className="h-4 w-4" />
            <span className="text-sm">
              <strong>Pro Trial Active!</strong> {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} remaining
            </span>
            <Button
              size="sm"
              className="bg-white text-emerald-700 hover:bg-white/90 text-xs h-7 font-semibold"
              onClick={handleUpgrade}
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      )}

      {/* Main Content - Pricing cards immediately visible */}
      <main className="container mx-auto max-w-5xl px-4 py-10 sm:py-14">

        {/* Header - Compact */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Start free with all the essentials. Upgrade to Pro for AI-powered features that make your resume stand out.
          </p>
        </div>

        {/* Pricing Cards - Immediately visible */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">

          {/* Free Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:border-gray-300 transition-colors">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Free</h2>
              <p className="text-sm text-gray-500">Everything you need to get started</p>
            </div>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-gray-900">{PRICING.symbol}0</span>
              <span className="text-gray-500">/{PRICING.period}</span>
            </div>

            <Button
              variant="outline"
              className="w-full h-11 font-semibold rounded-xl border-2 mb-6"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Includes</p>
              {FEATURES.filter(f => f.free).map((feature, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-r from-primary to-blue-500 rounded-2xl" />
            <div className="relative bg-white rounded-2xl p-6 sm:p-8">

              {/* Badge */}
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1 text-xs font-semibold">
                <Crown className="h-3 w-3 mr-1" />
                Recommended
              </Badge>

              <div className="mb-6 pt-2">
                <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  Pro
                  <Zap className="h-4 w-4 text-primary" />
                </h2>
                <p className="text-sm text-gray-500">AI-powered resume building</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-gray-900">{PRICING.symbol}{PRICING.amount}</span>
                <span className="text-gray-500">/{PRICING.period}</span>
              </div>

              <Button
                className={cn(
                  "w-full h-11 font-semibold rounded-xl",
                  "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90",
                  "shadow-lg shadow-primary/20"
                )}
                onClick={handleUpgrade}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : isPro && !isTrial ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    You're on Pro
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </>
                )}
              </Button>

              {/* Trial Option - Show when trials available and user not on Pro */}
              {FEATURE_FLAGS.TRIAL_SYSTEM_ENABLED && trialStatus?.trialsAvailable && !isPro && !isTrial && (
                <Button
                  variant="outline"
                  className="w-full h-10 mt-3 font-medium rounded-xl border-violet-200 text-violet-700 hover:bg-violet-50"
                  onClick={handleClaimTrial}
                  disabled={trialLoading}
                >
                  {trialLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    <>
                      <Gift className="mr-2 h-4 w-4" />
                      Try Free for 21 Days
                    </>
                  )}
                </Button>
              )}

              <p className="text-xs text-center text-gray-500 mt-3 mb-6">
                {FEATURE_FLAGS.TRIAL_SYSTEM_ENABLED && trialStatus?.trialsAvailable && !isPro && !isTrial
                  ? `No credit card required • ${trialStatus.trialsRemaining} trials left`
                  : "Cancel anytime"
                }
              </p>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Everything in Free, plus</p>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 mt-0.5">
                    <Linkedin className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">LinkedIn Import</span>
                    <p className="text-xs text-gray-500">Import your profile in seconds</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 mt-0.5">
                    <Wand2 className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">AI Enhancement</span>
                    <p className="text-xs text-gray-500">Smart suggestions to improve content</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 mt-0.5">
                    <Target className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Match to Job</span>
                    <p className="text-xs text-gray-500">Match your resume to any job posting</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-gray-100 mt-0.5">
                    <FileUp className="h-3.5 w-3.5 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-700">Resume Upload & Parse</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-gray-100 mt-0.5">
                    <MessageSquare className="h-3.5 w-3.5 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-700">AI Chat Assistant</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 mt-0.5">
                    <Mic className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">AI Mock Interview</span>
                    <p className="text-xs text-gray-500">Practice with AI-generated questions</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-gray-100 mt-0.5">
                    <FileText className="h-3.5 w-3.5 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-700">Unlimited Resume Versions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            Compare Plans
          </h2>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="p-4">
                <span className="text-sm font-semibold text-gray-700">Features</span>
              </div>
              <div className="p-4 text-center border-l border-gray-200">
                <span className="text-sm font-semibold text-gray-700">Free</span>
              </div>
              <div className="p-4 text-center border-l border-gray-200">
                <span className="text-sm font-semibold text-primary flex items-center justify-center gap-1">
                  <Crown className="h-3.5 w-3.5" />
                  Pro
                </span>
              </div>
            </div>

            {/* Features */}
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "grid grid-cols-3 border-b border-gray-100 last:border-b-0",
                  "hover:bg-gray-50/50 transition-colors"
                )}
              >
                <div className="p-4 text-sm text-gray-700">{feature.name}</div>
                <div className="p-4 text-center border-l border-gray-100">
                  {feature.free ? (
                    <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-gray-300 mx-auto" />
                  )}
                </div>
                <div className="p-4 text-center border-l border-gray-100">
                  <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 rounded-xl border border-gray-200 px-5 data-[state=open]:bg-white data-[state=open]:shadow-sm transition-all"
              >
                <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline py-4 text-sm">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Security Badge */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Shield className="h-4 w-4 text-emerald-500" />
            Secure payments powered by Razorpay
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-3 text-center text-sm text-gray-500 sm:flex-row sm:justify-between sm:items-center">
            <div>&copy; {new Date().getFullYear()} ResumeCook. All rights reserved.</div>
            <div className="flex items-center justify-center gap-6">
              <button onClick={() => navigate("/privacy")} className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => navigate("/terms")} className="hover:text-gray-900 transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal - Different design for trial vs upgrade */}
      <Dialog
        open={showLoginModal}
        onOpenChange={(open) => {
          setShowLoginModal(open);
          if (!open) setPendingTrialClaim(false);
        }}
        modal={true}
      >
        <DialogContent
          className="sm:max-w-[400px] p-0 gap-0 overflow-hidden border-0 shadow-xl rounded-2xl [&>button:last-child]:hidden"
          onInteractOutside={() => {
            setShowLoginModal(false);
            setPendingTrialClaim(false);
          }}
          onEscapeKeyDown={() => {
            setShowLoginModal(false);
            setPendingTrialClaim(false);
          }}
        >
          {/* Close Button - Custom styled for visibility on colored headers */}
          <button
            type="button"
            onClick={() => { setShowLoginModal(false); setPendingTrialClaim(false); }}
            className={cn(
              "absolute right-3 top-3 z-50 p-2 rounded-full transition-colors",
              pendingTrialClaim
                ? "bg-white/30 hover:bg-white/50 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
            )}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {pendingTrialClaim ? (
            /* Trial Claim Modal - Using website's blue theme */
            <>
              {/* Header - Blue gradient matching website theme */}
              <div className="bg-gradient-to-br from-primary to-blue-600 px-6 pt-10 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Start Your Free Trial
                  </h2>
                  <p className="text-white/90 text-sm">
                    21 days of Pro features, completely free
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Price comparison */}
                <div className="text-center mb-5 p-4 bg-gradient-to-br from-primary/5 to-blue-50 rounded-xl border border-primary/10">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-xl text-gray-400 line-through">{PRICING.symbol}{PRICING.amount}/mo</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="text-3xl font-bold text-primary">{PRICING.symbol}0</span>
                  </div>
                  <p className="text-sm text-primary font-medium">
                    Free for 21 days • No credit card required
                  </p>
                </div>

                {/* What's included */}
                <div className="mb-5 space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">What you'll get</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>LinkedIn Import</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>AI Enhancement</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Match to Job</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>AI Chat</span>
                    </div>
                  </div>
                </div>

                {/* Google Sign In - White button with colored Google logo */}
                <Button
                  className="w-full h-12 font-semibold bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 rounded-xl shadow-sm"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                >
                  {isSigningIn ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Starting your trial...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>

                {trialStatus && (
                  <p className="text-xs text-center text-primary mt-3 font-medium">
                    {trialStatus.trialsRemaining?.toLocaleString()} of {trialStatus.maxTrials?.toLocaleString()} free trials remaining
                  </p>
                )}

                <p className="text-xs text-center text-gray-500 mt-3">
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
            </>
          ) : (
            /* Regular Upgrade Modal */
            <>
              {/* Header */}
              <div className="bg-gradient-to-br from-primary/10 to-blue-50 px-6 pt-10 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 rounded-2xl bg-white shadow-md">
                    <Crown className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Upgrade to Pro
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Sign in to unlock AI-powered features
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Price */}
                <div className="text-center mb-5 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-gray-900">{PRICING.symbol}{PRICING.amount}</span>
                    <span className="text-gray-500">/{PRICING.period}</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <Button
                  className="w-full h-12 font-semibold bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 rounded-xl"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                >
                  {isSigningIn ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pricing;
