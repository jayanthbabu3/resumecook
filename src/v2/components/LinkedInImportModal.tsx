import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
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
  X,
} from 'lucide-react';
import { importLinkedInProfile, isValidLinkedInUrl } from '../services/linkedinService';
import { profileService, UserProfile } from '../services/profileService';
import { getAllTemplates } from '../config/templates';
import { TemplatePreviewV2 } from './TemplatePreviewV2';
import { V2ResumeData } from '../types/resumeData';
import { TemplateConfig } from '../types';

// LinkedIn brand color
const LINKEDIN_BLUE = '#0A66C2';

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

  if (!open) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex justify-center",
      step === 'select-template' ? "items-center p-2 sm:p-4" : "items-end sm:items-center sm:p-4"
    )}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={step === 'loading' ? undefined : () => handleClose(false)}
      />

      {/* Modal */}
      <div className={cn(
        "relative bg-white shadow-2xl overflow-hidden animate-in fade-in-0 duration-200 flex flex-col",
        step === 'select-template'
          ? "w-[calc(100%-1rem)] sm:w-full sm:max-w-2xl h-[calc(100%-1rem)] sm:h-auto sm:max-h-[85vh] rounded-2xl sm:rounded-3xl zoom-in-95"
          : "w-full sm:max-w-lg max-h-[90vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl slide-in-from-bottom-4 sm:zoom-in-95"
      )}>
        {/* Mobile drag handle */}
        {step !== 'select-template' && (
          <div className="sm:hidden flex justify-center py-2 flex-shrink-0" style={{ backgroundColor: `${LINKEDIN_BLUE}08` }}>
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between border-b flex-shrink-0",
            step === 'select-template' ? "px-4 py-3 sm:px-6 sm:py-4" : "px-4 py-3 sm:px-6 sm:py-4"
          )}
          style={{
            background: `linear-gradient(135deg, ${LINKEDIN_BLUE}08 0%, ${LINKEDIN_BLUE}15 100%)`,
            borderColor: `${LINKEDIN_BLUE}20`
          }}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
              style={{ backgroundColor: LINKEDIN_BLUE }}
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                Import from LinkedIn
              </h2>
              <p className="text-[11px] sm:text-sm text-gray-500 mt-0.5 truncate">
                {step === 'checking' && 'Checking your profile...'}
                {step === 'profile-exists' && 'You already have a profile saved'}
                {step === 'input' && 'Enter your LinkedIn profile URL'}
                {step === 'loading' && 'Fetching your profile data...'}
                {step === 'select-template' && 'Choose a template for your resume'}
                {step === 'error' && 'Something went wrong'}
              </p>
            </div>
          </div>
          {step !== 'loading' && (
            <button
              onClick={() => handleClose(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-gray-400 hover:text-gray-600 transition-colors border border-transparent hover:border-gray-200 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
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
              {/* Existing profile info card */}
              <div
                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border"
                style={{
                  background: `linear-gradient(135deg, ${LINKEDIN_BLUE}08 0%, ${LINKEDIN_BLUE}15 100%)`,
                  borderColor: `${LINKEDIN_BLUE}25`
                }}
              >
                <div
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${LINKEDIN_BLUE}20 0%, ${LINKEDIN_BLUE}30 100%)` }}
                >
                  <Database className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: LINKEDIN_BLUE }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-semibold" style={{ color: LINKEDIN_BLUE }}>Profile found!</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-gray-800 mt-0.5 truncate">{existingProfile.name}</p>
                </div>
              </div>

              {/* Profile summary - improved stats grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="flex flex-col items-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/60">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-1.5 sm:mb-2">
                    <Briefcase className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">{existingProfile.experienceCount}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Experience</span>
                </div>
                <div className="flex flex-col items-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/60">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-1.5 sm:mb-2">
                    <GraduationCap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">{existingProfile.educationCount}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Education</span>
                </div>
                <div className="flex flex-col items-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/60">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 flex items-center justify-center mb-1.5 sm:mb-2">
                    <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">{existingProfile.skillsCount}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Skills</span>
                </div>
              </div>

              {/* Options buttons */}
              <div className="space-y-2.5 sm:space-y-3 pt-1">
                <Button
                  onClick={handleUseExistingProfile}
                  className="w-full h-11 sm:h-12 gap-2 text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-all hover:shadow-xl"
                  style={{ backgroundColor: LINKEDIN_BLUE }}
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Use Existing Profile
                </Button>

                <Button
                  onClick={() => setStep('input')}
                  variant="outline"
                  className="w-full h-10 sm:h-11 gap-2 text-sm rounded-xl border-gray-300 hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4" />
                  Re-import from LinkedIn
                </Button>

                <p className="text-[10px] sm:text-xs text-gray-400 text-center pb-safe">
                  Re-importing will update your profile with new data from LinkedIn
                </p>
              </div>
            </div>
          )}

          {/* Input URL step */}
          {step === 'input' && (
            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="linkedin-url" className="text-sm font-semibold text-gray-800">
                  LinkedIn Profile URL
                </Label>
                <div className="relative">
                  <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" style={{ color: LINKEDIN_BLUE }} />
                  <Input
                    id="linkedin-url"
                    type="url"
                    placeholder="https://www.linkedin.com/in/your-profile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="pl-11 sm:pl-12 h-11 sm:h-12 text-sm rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    onKeyDown={(e) => e.key === 'Enter' && handleImport()}
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Make sure your LinkedIn profile is set to public for best results
                </p>
              </div>

              {error && (
                <Alert variant="destructive" className="py-2.5 sm:py-3 rounded-xl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-3.5 sm:p-4 border border-gray-200/60">
                <h4 className="text-sm font-semibold text-gray-900 mb-2.5 sm:mb-3">What we'll import:</h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    Work Experience
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    Education
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    Skills
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    Certifications
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    Languages
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    Publications
                  </div>
                </div>
              </div>

              <Button
                onClick={handleImport}
                className="w-full h-11 sm:h-12 gap-2 text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-all hover:shadow-xl pb-safe"
                style={{ backgroundColor: LINKEDIN_BLUE }}
              >
                Import Profile
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Loading */}
          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-10 sm:py-16">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                {/* Animated rings */}
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-15"
                  style={{ backgroundColor: LINKEDIN_BLUE }}
                />
                <div
                  className="absolute inset-2 rounded-full animate-pulse opacity-20"
                  style={{ backgroundColor: LINKEDIN_BLUE }}
                />
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center shadow-xl"
                  style={{ backgroundColor: LINKEDIN_BLUE }}
                >
                  <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 text-white animate-spin" />
                </div>
              </div>
              <h3 className="mt-4 sm:mt-5 text-base sm:text-lg font-bold text-gray-900">Importing your profile</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-gray-500 text-center max-w-sm px-4">
                We're fetching your LinkedIn data. This usually takes 10-30 seconds.
              </p>
              <div className="mt-5 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: LINKEDIN_BLUE }} />
                Connecting to LinkedIn
              </div>
            </div>
          )}

          {/* Step 3: Select Template */}
          {step === 'select-template' && (
            <div className="space-y-3 sm:space-y-4">
              {/* Profile Summary */}
              {importedProfile && (
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200/60">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden flex-shrink-0 ring-2 ring-emerald-200">
                    {importedProfile.photoUrl ? (
                      <img
                        src={importedProfile.photoUrl}
                        alt={importedProfile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-emerald-700">Profile imported!</span>
                    </div>
                    <p className="text-sm sm:text-base font-medium text-gray-800 mt-0.5 truncate">{importedProfile.name}</p>
                  </div>
                </div>
              )}

              {/* Data Summary - compact on mobile */}
              {summary && (
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  <div className="flex flex-col items-center p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg sm:rounded-xl border border-gray-200/60">
                    <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mb-0.5" />
                    <span className="text-sm sm:text-base font-bold text-gray-900">{summary.experience}</span>
                    <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium">Exp</span>
                  </div>
                  <div className="flex flex-col items-center p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg sm:rounded-xl border border-gray-200/60">
                    <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mb-0.5" />
                    <span className="text-sm sm:text-base font-bold text-gray-900">{summary.education}</span>
                    <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium">Edu</span>
                  </div>
                  <div className="flex flex-col items-center p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg sm:rounded-xl border border-gray-200/60">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 mb-0.5" />
                    <span className="text-sm sm:text-base font-bold text-gray-900">{summary.skills}</span>
                    <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium">Skills</span>
                  </div>
                  <div className="flex flex-col items-center p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg sm:rounded-xl border border-gray-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mb-0.5" />
                    <span className="text-sm sm:text-base font-bold text-gray-900">{summary.certifications}</span>
                    <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium">Certs</span>
                  </div>
                </div>
              )}

              {/* Template Selection */}
              <div>
                <Label className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3 block">
                  Choose a template to continue
                </Label>
                <ScrollArea className="h-[180px] sm:h-[260px] rounded-xl border border-gray-200 p-2 sm:p-3 bg-gray-50/50">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {templates.slice(0, 12).map((template: TemplateConfig, index: number) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={cn(
                          "group relative rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all",
                          selectedTemplate === template.id
                            ? "border-primary ring-2 ring-primary/20 shadow-md"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        )}
                      >
                        <div className="aspect-[8.5/11] bg-white overflow-hidden">
                          <TemplatePreviewV2
                            templateId={template.id}
                            themeColor={template.colors?.primary || defaultColors[index % defaultColors.length]}
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-1.5 sm:p-2">
                          <p className="text-[9px] sm:text-xs font-medium text-white truncate">{template.name}</p>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center shadow-md">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-1 pb-safe">
                <Button
                  variant="outline"
                  onClick={() => setStep('input')}
                  className="gap-2 h-10 sm:h-11 text-sm rounded-xl w-full sm:w-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={handleCreateResume}
                  disabled={!selectedTemplate}
                  className={cn(
                    "flex-1 h-11 sm:h-12 gap-2 text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-all",
                    selectedTemplate ? "hover:shadow-xl" : "opacity-50"
                  )}
                  style={{ backgroundColor: selectedTemplate ? LINKEDIN_BLUE : '#9ca3af' }}
                >
                  Create Resume
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Error */}
          {step === 'error' && (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
              </div>
              <h3 className="mt-4 sm:mt-5 text-base sm:text-lg font-bold text-gray-900">Import Failed</h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-600 text-center max-w-sm px-4">{error}</p>
              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto px-4 sm:px-0 pb-safe">
                <Button
                  variant="outline"
                  onClick={resetModal}
                  className="h-10 sm:h-11 text-sm rounded-xl w-full sm:w-auto"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => handleClose(false)}
                  className="h-10 sm:h-11 text-sm rounded-xl w-full sm:w-auto bg-gray-900 hover:bg-gray-800"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedInImportModal;
