import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you use ResumeCook, we collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Account information (name, email address) when you sign up</li>
                <li>Resume content you create and save on our platform</li>
                <li>Usage data to improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Provide, maintain, and improve our resume building services</li>
                <li>Save and sync your resumes across devices</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Storage and Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data is stored securely using Firebase/Google Cloud infrastructure. We implement
                appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. Your resume
                content is private and only accessible to you unless you explicitly choose to share it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Access and download your personal data</li>
                <li>Delete your account and associated data</li>
                <li>Update or correct your information</li>
                <li>Opt out of promotional communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use essential cookies to maintain your session and preferences. These are necessary
                for the proper functioning of the application.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:support@resumecook.com" className="text-primary hover:underline">
                  support@resumecook.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/60 bg-muted/20 mt-12">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-5">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 text-center text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>&copy; {new Date().getFullYear()} ResumeCook. Crafted to help you land your next role.</div>
            <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-wide">
              <button onClick={() => navigate("/privacy")} className="hover:text-foreground transition-colors">Privacy</button>
              <button onClick={() => navigate("/terms")} className="hover:text-foreground transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
