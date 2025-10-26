import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { CheckCircle2, Phone, MapPin, Briefcase, Linkedin, Github, Globe, User } from 'lucide-react';
import { Header } from '@/components/Header';

const ProfileCompletion = () => {
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Check local profile
    const key = `profile_${user.uid}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const data = JSON.parse(raw) as Record<string, any>;
        if (data && (data.phone || data.location || data.professional_title)) {
          setProfileExists(true);
          navigate('/dashboard');
        }
      } catch {
        // ignore
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const key = `profile_${user.uid}`;
    const data = {
      phone: (formData.get('phone') as string) || '',
      location: (formData.get('location') as string) || '',
      linkedin_url: (formData.get('linkedinUrl') as string) || '',
      github_url: (formData.get('githubUrl') as string) || '',
      portfolio_url: (formData.get('portfolioUrl') as string) || '',
      professional_title: (formData.get('professionalTitle') as string) || '',
      bio: (formData.get('bio') as string) || '',
    };
    localStorage.setItem(key, JSON.stringify(data));
    toast.success('Profile completed (local)');
    navigate('/dashboard');
    setIsSubmitting(false);
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
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Complete Your Profile</CardTitle>
            <CardDescription className="text-sm">
              Add optional details to enhance your resume experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-xs">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="New York, NY"
                      className="h-9"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Professional Information
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="professionalTitle" className="text-xs">Professional Title</Label>
                    <Input
                      id="professionalTitle"
                      name="professionalTitle"
                      type="text"
                      placeholder="Senior Software Engineer"
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-xs">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Social Links
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl" className="text-xs">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      name="linkedinUrl"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="githubUrl" className="text-xs">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      name="githubUrl"
                      type="url"
                      placeholder="https://github.com/yourusername"
                      className="h-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl" className="text-xs">Portfolio URL</Label>
                  <Input
                    id="portfolioUrl"
                    name="portfolioUrl"
                    type="url"
                    placeholder="https://yourportfolio.com"
                    className="h-9"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={handleSkip}
                >
                  Skip for Now
                </Button>
                <Button 
                  type="submit" 
                  size="sm"
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
