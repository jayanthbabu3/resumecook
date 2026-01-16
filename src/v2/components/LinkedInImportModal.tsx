import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Linkedin,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  RefreshCw,
  Database,
} from 'lucide-react';
import { importLinkedInProfile, isValidLinkedInUrl } from '../services/linkedinService';
import { profileService, UserProfile } from '../services/profileService';
import { getAllTemplates } from '../config/templates';
import { TemplatePreviewV2 } from './TemplatePreviewV2';
import { V2ResumeData } from '../types/resumeData';
import { TemplateConfig } from '../types';

interface LinkedInImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'checking' | 'profile-exists' | 'input' | 'loading' | 'select-template' | 'error';

interface ImportedProfile {
  name: string;
  photoUrl?: string;
  linkedInUrl?: string;
}

interface ExistingProfileInfo {
  name: string;
  experienceCount: number;
  educationCount: number;
  skillsCount: number;
  linkedinImportedAt?: Date;
}

export const LinkedInImportModal: React.FC<LinkedInImportModalProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('checking');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [error, setError] = useState('');
  const [importedData, setImportedData] = useState<V2ResumeData | null>(null);
  const [importedProfile, setImportedProfile] = useState<ImportedProfile | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [existingProfile, setExistingProfile] = useState<ExistingProfileInfo | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const templates = getAllTemplates();
  const defaultColors = ['#2563eb', '#7c3aed', '#059669', '#e11d48', '#f59e0b', '#0891b2'];

  // Check for existing profile when modal opens
  useEffect(() => {
    if (open) {
      checkExistingProfile();
    }
  }, [open]);

  const checkExistingProfile = async () => {
    setStep('checking');
    try {
      const profile = await profileService.getProfile();
      if (profile && profile.personalInfo?.fullName) {
        setExistingProfile({
          name: profile.personalInfo.fullName,
          experienceCount: profile.experience?.length || 0,
          educationCount: profile.education?.length || 0,
          skillsCount: profile.skills?.length || 0,
          linkedinImportedAt: profile.linkedinImportedAt instanceof Date
            ? profile.linkedinImportedAt
            : undefined,
        });
        setStep('profile-exists');
      } else {
        setStep('input');
      }
    } catch (err) {
      // No profile exists or error, show input
      setStep('input');
    }
  };

  const resetModal = () => {
    setStep('checking');
    setLinkedinUrl('');
    setError('');
    setImportedData(null);
    setImportedProfile(null);
    setSelectedTemplate('');
    setExistingProfile(null);
    setIsSaving(false);
  };

  // Use existing profile - go directly to template selection
  const handleUseExistingProfile = async () => {
    setStep('loading');
    try {
      const profile = await profileService.getProfile();
      if (profile) {
        const resumeData = profileService.profileToResumeData(profile);
        setImportedData(resumeData);
        setImportedProfile({
          name: profile.personalInfo.fullName,
          photoUrl: profile.personalInfo.photo,
          linkedInUrl: profile.personalInfo.linkedin,
        });
        setStep('select-template');
      }
    } catch (err) {
      setError('Failed to load profile');
      setStep('error');
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      resetModal();
    }
    onOpenChange(open);
  };

  const handleImport = async () => {
    if (!linkedinUrl.trim()) {
      setError('Please enter your LinkedIn profile URL');
      return;
    }

    if (!isValidLinkedInUrl(linkedinUrl)) {
      setError('Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)');
      return;
    }

    setError('');
    setStep('loading');

    try {
      const response = await importLinkedInProfile(linkedinUrl);

      // Try to save to profile in Firebase (non-blocking)
      try {
        await profileService.importFromLinkedIn(response.data, linkedinUrl);
      } catch (saveErr) {
        console.error('Failed to save profile to Firebase:', saveErr);
        // Continue even if save fails - user can still create resume
      }

      setImportedData(response.data);
      setImportedProfile(response.linkedinProfile);
      setStep('select-template');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import profile');
      setStep('error');
    }
  };

  const handleCreateResume = () => {
    if (!selectedTemplate || !importedData) return;

    // Store the imported data in sessionStorage for the builder to pick up
    sessionStorage.setItem('linkedin-import-data', JSON.stringify(importedData));
    sessionStorage.setItem('template-referrer', '/dashboard');
    sessionStorage.setItem('selected-template', selectedTemplate);

    handleClose(false);
    navigate(`/builder?template=${selectedTemplate}&source=linkedin`);
  };

  const getDataSummary = () => {
    if (!importedData) return null;

    return {
      experience: importedData.experience?.length || 0,
      education: importedData.education?.length || 0,
      skills: importedData.skills?.length || 0,
      certifications: importedData.certifications?.length || 0,
    };
  };

  const summary = getDataSummary();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden h-auto max-h-[100dvh] sm:max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4 bg-gradient-to-r from-[#0A66C2]/5 to-[#0A66C2]/10 border-b">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center flex-shrink-0">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                Import from LinkedIn
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-gray-500 truncate">
                {step === 'checking' && 'Checking your profile...'}
                {step === 'profile-exists' && 'You already have a profile saved'}
                {step === 'input' && 'Enter your LinkedIn profile URL to get started'}
                {step === 'loading' && 'Fetching your profile data...'}
                {step === 'select-template' && 'Choose a template for your resume'}
                {step === 'error' && 'Something went wrong'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-4 py-4 sm:px-6 sm:py-5 overflow-y-auto flex-1">
          {/* Checking step - loading spinner */}
          {step === 'checking' && (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
              <Loader2 className="w-8 h-8 text-[#0A66C2] animate-spin" />
              <p className="mt-3 sm:mt-4 text-sm text-gray-500">Checking for existing profile...</p>
            </div>
          )}

          {/* Profile Exists step - show options */}
          {step === 'profile-exists' && existingProfile && (
            <div className="space-y-4 sm:space-y-5">
              {/* Existing profile info */}
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-blue-800">Profile found!</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-0.5 truncate">{existingProfile.name}</p>
                </div>
              </div>

              {/* Profile summary */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="flex flex-col items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mb-1" />
                  <span className="text-base sm:text-lg font-semibold text-gray-900">{existingProfile.experienceCount}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500">Experience</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1" />
                  <span className="text-base sm:text-lg font-semibold text-gray-900">{existingProfile.educationCount}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500">Education</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 mb-1" />
                  <span className="text-base sm:text-lg font-semibold text-gray-900">{existingProfile.skillsCount}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500">Skills</span>
                </div>
              </div>

              {existingProfile.linkedinImportedAt && (
                <p className="text-xs text-gray-500 text-center">
                  Last imported from LinkedIn: {existingProfile.linkedinImportedAt.toLocaleDateString()}
                </p>
              )}

              {/* Options */}
              <div className="space-y-2.5 sm:space-y-3">
                <Button
                  onClick={handleUseExistingProfile}
                  className="w-full h-10 sm:h-11 bg-[#0A66C2] hover:bg-[#004182] gap-2 text-sm sm:text-base"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Use Existing Profile
                </Button>

                <Button
                  onClick={() => setStep('input')}
                  variant="outline"
                  className="w-full h-9 sm:h-10 gap-2 text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Re-import from LinkedIn
                </Button>

                <p className="text-[10px] sm:text-xs text-gray-400 text-center">
                  Re-importing will update your profile with new data from LinkedIn
                </p>
              </div>
            </div>
          )}

          {/* Input URL step */}
          {step === 'input' && (
            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="linkedin-url" className="text-sm font-medium text-gray-700">
                  LinkedIn Profile URL
                </Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A66C2]" />
                  <Input
                    id="linkedin-url"
                    type="url"
                    placeholder="https://www.linkedin.com/in/your-profile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="pl-10 h-10 sm:h-11 text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleImport()}
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Make sure your LinkedIn profile is set to public for best results
                </p>
              </div>

              {error && (
                <Alert variant="destructive" className="py-2 sm:py-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">What we'll import:</h4>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                    Work Experience
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                    Education
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                    Skills
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                    Certifications
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                    Languages
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                    Publications
                  </div>
                </div>
              </div>

              <Button
                onClick={handleImport}
                className="w-full h-10 sm:h-11 bg-[#0A66C2] hover:bg-[#004182] gap-2 text-sm sm:text-base"
              >
                Import Profile
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Loading */}
          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0A66C2]/10 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#0A66C2] animate-spin" />
                </div>
              </div>
              <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">Importing your profile</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 text-center max-w-sm px-4">
                We're fetching your LinkedIn data. This usually takes 10-30 seconds.
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-6 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0A66C2] animate-pulse" />
                  Connecting to LinkedIn
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Select Template */}
          {step === 'select-template' && (
            <div className="space-y-3 sm:space-y-5">
              {/* Profile Summary */}
              {importedProfile && (
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {importedProfile.photoUrl ? (
                      <img
                        src={importedProfile.photoUrl}
                        alt={importedProfile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-green-800">Profile imported!</span>
                    </div>
                    <p className="text-xs sm:text-sm text-green-700 mt-0.5 truncate">{importedProfile.name}</p>
                  </div>
                </div>
              )}

              {/* Data Summary */}
              {summary && (
                <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
                  <div className="flex flex-col items-center p-1.5 sm:p-3 bg-gray-50 rounded-lg">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mb-0.5 sm:mb-1" />
                    <span className="text-sm sm:text-lg font-semibold text-gray-900">{summary.experience}</span>
                    <span className="text-[9px] sm:text-xs text-gray-500">Exp</span>
                  </div>
                  <div className="flex flex-col items-center p-1.5 sm:p-3 bg-gray-50 rounded-lg">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-0.5 sm:mb-1" />
                    <span className="text-sm sm:text-lg font-semibold text-gray-900">{summary.education}</span>
                    <span className="text-[9px] sm:text-xs text-gray-500">Edu</span>
                  </div>
                  <div className="flex flex-col items-center p-1.5 sm:p-3 bg-gray-50 rounded-lg">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 mb-0.5 sm:mb-1" />
                    <span className="text-sm sm:text-lg font-semibold text-gray-900">{summary.skills}</span>
                    <span className="text-[9px] sm:text-xs text-gray-500">Skills</span>
                  </div>
                  <div className="flex flex-col items-center p-1.5 sm:p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mb-0.5 sm:mb-1" />
                    <span className="text-sm sm:text-lg font-semibold text-gray-900">{summary.certifications}</span>
                    <span className="text-[9px] sm:text-xs text-gray-500">Certs</span>
                  </div>
                </div>
              )}

              {/* Template Selection */}
              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 block">
                  Choose a template to continue
                </Label>
                <ScrollArea className="h-[200px] sm:h-[280px] rounded-xl border border-gray-200 p-2 sm:p-3">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {templates.slice(0, 12).map((template: TemplateConfig, index: number) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`group relative rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                          selectedTemplate === template.id
                            ? 'border-[#0A66C2] ring-2 ring-[#0A66C2]/20'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="aspect-[8.5/11] bg-white overflow-hidden">
                          <TemplatePreviewV2
                            templateId={template.id}
                            themeColor={template.colors?.primary || defaultColors[index % defaultColors.length]}
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5 sm:p-2">
                          <p className="text-[10px] sm:text-xs font-medium text-white truncate">{template.name}</p>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#0A66C2] rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('input')}
                  className="gap-1.5 sm:gap-2 h-9 sm:h-10 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={handleCreateResume}
                  disabled={!selectedTemplate}
                  className="flex-1 h-9 sm:h-11 bg-[#0A66C2] hover:bg-[#004182] gap-1.5 sm:gap-2 text-sm sm:text-base"
                >
                  Create Resume
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Error */}
          {step === 'error' && (
            <div className="flex flex-col items-center justify-center py-6 sm:py-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
              </div>
              <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">Import Failed</h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500 text-center max-w-sm px-4">{error}</p>
              <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
                <Button variant="outline" onClick={resetModal} className="h-9 sm:h-10 text-sm">
                  Try Again
                </Button>
                <Button onClick={() => handleClose(false)} className="h-9 sm:h-10 text-sm">Close</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInImportModal;
