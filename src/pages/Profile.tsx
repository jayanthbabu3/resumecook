import React, { useState, useEffect } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  professionalTitle: string;
  bio: string;
  profilePhoto: string;
}

const Profile = () => {
  const { user, userProfile, updateUserProfile } = useFirebaseAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    professionalTitle: '',
    bio: '',
    profilePhoto: '',
  });

  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // First, try to get data from userProfile (already loaded in auth context)
        if (userProfile) {
          setProfileData({
            fullName: userProfile.fullName || '',
            email: userProfile.email || user.email || '',
            phone: userProfile.phone || '',
            location: userProfile.location || '',
            linkedinUrl: userProfile.linkedinUrl || '',
            githubUrl: userProfile.githubUrl || '',
            portfolioUrl: userProfile.portfolioUrl || '',
            professionalTitle: userProfile.professionalTitle || '',
            bio: userProfile.bio || '',
            profilePhoto: userProfile.profilePhoto || user.photoURL || '',
          });
        } else {
          // Fallback: load directly from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setProfileData({
              fullName: data.fullName || '',
              email: data.email || user.email || '',
              phone: data.phone || '',
              location: data.location || '',
              linkedinUrl: data.linkedinUrl || '',
              githubUrl: data.githubUrl || '',
              portfolioUrl: data.portfolioUrl || '',
              professionalTitle: data.professionalTitle || '',
              bio: data.bio || '',
              profilePhoto: data.profilePhoto || user.photoURL || '',
            });
          } else {
            // Initialize with user data from Firebase Auth
            setProfileData({
              fullName: user.displayName || '',
              email: user.email || '',
              phone: '',
              location: '',
              linkedinUrl: '',
              githubUrl: '',
              portfolioUrl: '',
              professionalTitle: '',
              bio: '',
              profilePhoto: user.photoURL || '',
            });
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user, userProfile, navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      // Update profile in Firestore using the updateUserProfile function
      await updateUserProfile({
        fullName: profileData.fullName,
        phone: profileData.phone,
        location: profileData.location,
        linkedinUrl: profileData.linkedinUrl,
        githubUrl: profileData.githubUrl,
        portfolioUrl: profileData.portfolioUrl,
        professionalTitle: profileData.professionalTitle,
        bio: profileData.bio,
        profilePhoto: profileData.profilePhoto,
      });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
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
              {/* Profile Photo Section */}
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profileData.profilePhoto} alt={profileData.fullName} />
                  <AvatarFallback className="text-lg">
                    {getUserInitials(profileData.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="profilePhoto" className="text-sm font-medium">Profile Photo URL</Label>
                  <Input
                    id="profilePhoto"
                    type="url"
                    value={profileData.profilePhoto}
                    onChange={(e) => handleChange('profilePhoto', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter a direct link to an image (https://...)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
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
                  <Label htmlFor="professionalTitle">Professional Title</Label>
                  <Input
                    id="professionalTitle"
                    value={profileData.professionalTitle}
                    onChange={(e) => handleChange('professionalTitle', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    value={profileData.linkedinUrl}
                    onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    value={profileData.githubUrl}
                    onChange={(e) => handleChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                  <Input
                    id="portfolioUrl"
                    type="url"
                    value={profileData.portfolioUrl}
                    onChange={(e) => handleChange('portfolioUrl', e.target.value)}
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
