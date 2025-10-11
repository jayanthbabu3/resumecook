import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/Header';

const ProfileCompletion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Check if profile already exists
    const checkProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data && (data.phone || data.location || data.professional_title)) {
        // Profile has optional data, redirect to dashboard
        setProfileExists(true);
        navigate('/dashboard');
      }
    };

    checkProfile();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          phone: formData.get('phone') as string || null,
          location: formData.get('location') as string || null,
          linkedin_url: formData.get('linkedinUrl') as string || null,
          github_url: formData.get('githubUrl') as string || null,
          portfolio_url: formData.get('portfolioUrl') as string || null,
          professional_title: formData.get('professionalTitle') as string || null,
          bio: formData.get('bio') as string || null,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile completed successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  if (profileExists) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)] p-4">
        <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Add more details to enhance your resume experience. You can skip and add these later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Optional Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="New York, NY"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="professionalTitle">Professional Title</Label>
                <Input
                  id="professionalTitle"
                  name="professionalTitle"
                  type="text"
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  placeholder="https://github.com/yourusername"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={handleSkip}
              >
                Skip for Now
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Complete Profile'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default ProfileCompletion;
