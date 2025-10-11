import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If user is already verified and logged in, redirect to profile completion
    if (user) {
      navigate('/profile-completion');
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Check Your Email</CardTitle>
          <CardDescription className="text-base">
            We've sent a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1">Email Sent</p>
                {email && (
                  <p className="text-sm text-muted-foreground">
                    Verification link sent to <strong className="text-foreground">{email}</strong>
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1">Next Steps</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Open your email inbox
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Click the verification link we sent you
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    You'll be automatically redirected to complete your profile
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              <strong className="font-medium">Didn't receive the email?</strong> Check your spam folder or try signing up again.
            </p>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/auth')}
          >
            Back to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
