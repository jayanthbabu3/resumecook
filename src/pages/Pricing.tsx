/**
 * Pricing Page
 *
 * Displays pricing plans with free vs pro tier comparison.
 * Supports regional pricing (India vs US).
 */

import React, { useState, useEffect } from "react";
// Note: Region detection removed - using INR only (Stripe India regulations)
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import {
  Check,
  X,
  Sparkles,
  Zap,
  ArrowRight,
  Crown,
  Gift,
  Loader2
} from "lucide-react";

// Pricing configuration
// Note: Using INR only due to Stripe India regulations
const PRICING = {
  currency: "₹",
  amount: 149,
  period: "mo",
};

// Compact feature lists
const FREE_FEATURES = [
  "Resume Builder",
  "All Templates",
  "Style Customization",
  "PDF Download",
  "Manual Editing",
];

const PRO_FEATURES = [
  "LinkedIn Import",
  "Resume Upload & Parse",
  "AI Resume Enhancement",
  "Job Tailoring",
  "Generate from Job Description",
  "Multiple Resumes",
];

const Pricing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useFirebaseAuth();
  const { isPro, createCheckoutSession, loading: subscriptionLoading } = useSubscription();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Handle subscription callback messages
  useEffect(() => {
    const subscriptionStatus = searchParams.get("subscription");
    if (subscriptionStatus === "cancelled") {
      toast.info("Checkout was cancelled. You can upgrade anytime.");
    }
  }, [searchParams]);

  const handleGetStarted = () => {
    navigate("/templates");
  };

  const handleUpgrade = async () => {
    if (!user) {
      toast.info("Please sign in to upgrade to Pro");
      navigate("/auth");
      return;
    }

    if (isPro) {
      toast.info("You already have a Pro subscription!");
      navigate("/profile");
      return;
    }

    setIsCheckoutLoading(true);
    try {
      // Using "india" for INR pricing (Stripe India account limitation)
      const checkoutUrl = await createCheckoutSession("india");
      if (checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = checkoutUrl;
      } else {
        toast.error("Failed to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const isLoading = subscriptionLoading || isCheckoutLoading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-50/30 to-background">
      <Header />

      {/* Main Content */}
      <section className="pt-8 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">

          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <Badge variant="outline" className="px-3 py-1 text-xs font-medium border-primary/20 bg-primary/5">
              <Sparkles className="h-3 w-3 mr-1 text-primary" />
              Pricing
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Simple,{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                transparent pricing
              </span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              Start free, upgrade when you need AI superpowers
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* Free Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300" />
              <div className="relative rounded-2xl border border-border/60 bg-white p-6 shadow-sm">

                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Free</h3>
                    <p className="text-xs text-muted-foreground">Forever free</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Gift className="h-5 w-5 text-gray-600" />
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-foreground">{PRICING.currency}0</span>
                  <span className="text-sm text-muted-foreground">/{PRICING.period}</span>
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full h-10 text-sm font-semibold mb-5"
                  onClick={handleGetStarted}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Features */}
                <div className="space-y-2.5">
                  {FREE_FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                      <div className="h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-emerald-600" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}

                  {/* Divider */}
                  <div className="border-t border-dashed border-border/60 my-3" />

                  {/* Not included */}
                  {PRO_FEATURES.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2.5 opacity-50">
                      <div className="h-4 w-4 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <X className="h-2.5 w-2.5 text-gray-400" />
                      </div>
                      <span className="text-sm text-muted-foreground line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300 blur-sm" />
              <div className="relative rounded-2xl border-2 border-primary bg-white p-6 shadow-xl">

                {/* Popular Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white px-3 py-0.5 text-xs font-semibold shadow-lg">
                    <Crown className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                </div>

                {/* Header Row */}
                <div className="flex items-center justify-between mb-4 pt-1">
                  <div>
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-1.5">
                      Pro
                      <Sparkles className="h-4 w-4 text-primary" />
                    </h3>
                    <p className="text-xs text-muted-foreground">AI-powered features</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-foreground">
                    {PRICING.currency}{PRICING.amount}
                  </span>
                  <span className="text-sm text-muted-foreground">/{PRICING.period}</span>
                </div>

                {/* CTA */}
                <Button
                  className="w-full h-10 text-sm font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/20 mb-5"
                  onClick={handleUpgrade}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : isPro ? (
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

                {/* Features */}
                <p className="text-xs text-muted-foreground mb-2.5">Everything in Free, plus:</p>
                <div className="space-y-2.5">
                  {PRO_FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                      <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Comparison - Compact */}
          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-6">Compare Plans</h2>

            <div className="bg-white rounded-xl border border-border/60 overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 border-b border-border/60">
                <div className="text-sm font-semibold text-foreground">Feature</div>
                <div className="text-sm font-semibold text-center text-foreground">Free</div>
                <div className="text-sm font-semibold text-center text-primary">Pro</div>
              </div>

              {[...FREE_FEATURES, ...PRO_FEATURES].map((feature, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 p-3 border-b border-border/40 last:border-b-0">
                  <div className="text-sm text-foreground">{feature}</div>
                  <div className="text-center">
                    {index < FREE_FEATURES.length ? (
                      <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300 mx-auto" />
                    )}
                  </div>
                  <div className="text-center">
                    <Check className="h-4 w-4 text-primary mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ - Compact */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-6">FAQ</h2>

            <div className="grid gap-3">
              {[
                { q: "Is the free plan really free?", a: "Yes! Create unlimited resumes, use all templates, and download PDFs - forever free." },
                { q: "Can I cancel anytime?", a: "Absolutely. Cancel your Pro subscription anytime, no questions asked." },
                { q: "What payment methods?", a: "We accept all major cards and UPI (India) through Stripe." },
              ].map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white border border-border/60">
                  <h3 className="font-semibold text-sm text-foreground">{faq.q}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Ready to build your perfect resume?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" className="h-10 px-6 text-sm" onClick={handleGetStarted}>
                Start Free
              </Button>
              <Button
                className="h-10 px-6 text-sm bg-gradient-to-r from-primary to-blue-600"
                onClick={handleUpgrade}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : isPro ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    You're Pro
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Get Pro
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between">
            <div>&copy; {new Date().getFullYear()} ResumeCook</div>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => navigate("/privacy")} className="hover:text-foreground">Privacy</button>
              <button onClick={() => navigate("/terms")} className="hover:text-foreground">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
