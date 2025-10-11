import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  professional_title: string;
  bio: string;
}

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    github_url: '',
    portfolio_url: '',
    professional_title: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfileData({
            full_name: data.full_name || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            linkedin_url: data.linkedin_url || '',
            github_url: data.github_url || '',
            portfolio_url: data.portfolio_url || '',
            professional_title: data.professional_title || '',
            bio: data.bio || '',
          });
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          phone: profileData.phone,
          location: profileData.location,
          linkedin_url: profileData.linkedin_url,
          github_url: profileData.github_url,
          portfolio_url: profileData.portfolio_url,
          professional_title: profileData.professional_title,
          bio: profileData.bio,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
          <div className="text-center">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <div className="max-w-3xl mx-auto py-8 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">My Profile</CardTitle>
            <CardDescription>
              Manage your personal information. These details will be used to prefill your resumes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={profileData.full_name}
                    onChange={(e) => handleChange('full_name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="New York, NY"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="professional_title">Professional Title</Label>
                  <Input
                    id="professional_title"
                    value={profileData.professional_title}
                    onChange={(e) => handleChange('professional_title', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={profileData.linkedin_url}
                    onChange={(e) => handleChange('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    type="url"
                    value={profileData.github_url}
                    onChange={(e) => handleChange('github_url', e.target.value)}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="portfolio_url">Portfolio URL</Label>
                  <Input
                    id="portfolio_url"
                    type="url"
                    value={profileData.portfolio_url}
                    onChange={(e) => handleChange('portfolio_url', e.target.value)}
                    placeholder="https://yourportfolio.com"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    placeholder="Brief professional summary..."
                    rows={4}
                  />
                </div>
              </div>

              <Button type="submit" disabled={saving} className="w-full md:w-auto">
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
