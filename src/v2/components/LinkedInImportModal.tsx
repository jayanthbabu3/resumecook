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
  FlaskConical,
  RefreshCw,
  Database,
} from 'lucide-react';
import { importLinkedInProfile, isValidLinkedInUrl } from '../services/linkedinService';
import { profileService, UserProfile } from '../services/profileService';
import { getAllTemplates } from '../config/templates';
import { TemplatePreviewV2 } from './TemplatePreviewV2';
import { V2ResumeData } from '../types/resumeData';
import { TemplateConfig } from '../types';

// Sample test data for development - avoid API calls during testing
const TEST_LINKEDIN_DATA: V2ResumeData = {
  version: "2.0",
  personalInfo: {
    fullName: "Jayanth babu Somineni",
    email: "",
    phone: "",
    location: "Hyderabad, Telangana, India",
    title: "React Js Trainer | Full Stack JavaScript Developer @ Servicenow | Certified in JavaScript, React, Angular",
    summary: "As a Full Stack Developer at Morgan Stanley, I apply my JavaScript expertise and web technologies skills to build scalable and robust web applications for the global financial firm. I work with a diverse and collaborative team of developers, designers, and analysts to deliver solutions that meet the needs and expectations of the clients and stakeholders.\n\nI have a passion for learning and sharing my knowledge of programming, especially in the areas of React, Angular, and NodeJs. I write blogs and articles for online platforms such as Level Up Coding and Analytics Vidhya, where I share tips, tricks, and best practices on various topics related to web development. I also hold certifications in JavaScript and Angular, which demonstrate my proficiency and commitment to continuous improvement. I graduated with a BTech in Mechanical Engineering from QIS College of Engineering & Technology in 2015, where I learned the fundamentals of problem-solving, design, and innovation.",
    photo: "https://media.licdn.com/dms/image/v2/C5103AQE_spKjw4XomQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1585635440546?e=1769644800&v=beta&t=B2V4Al0r91MXWzL1tbA-0KOWtocn4aYsfOYCvIxRYrc",
    linkedin: "https://www.linkedin.com/in/jayanth-babu-somineni",
    github: "",
    portfolio: "https://programwithjayanth.com",
    twitter: "",
    website: "https://programwithjayanth.com"
  },
  experience: [
    {
      id: "exp-1767989306418-bxmgy54wp",
      company: "ServiceNow",
      position: "Senior Software Engineer",
      location: "Hyderabad, Telangana, India",
      startDate: "May 2024",
      endDate: "Present",
      current: true,
      description: "",
      bulletPoints: [],
    },
    {
      id: "exp-1767989306418-h2620ptpq",
      company: "Morgan Stanley",
      position: "Full Stack Developer",
      location: "Greater Bengaluru Area",
      startDate: "Sep 2019",
      endDate: "May 2024",
      current: false,
      description: "",
      bulletPoints: [],
    },
    {
      id: "exp-1767989306418-ajsamgrno",
      company: "Capgemini",
      position: "Frontend Web Developer",
      location: "Bengaluru, Karnataka, India",
      startDate: "Oct 2018",
      endDate: "Sep 2019",
      current: false,
      description: "",
      bulletPoints: [],
    },
    {
      id: "exp-1767989306418-pixm4yeox",
      company: "InnovaPath, INC.",
      position: "Web Developer",
      location: "Hyderabad, Telangana, India",
      startDate: "Dec 2015",
      endDate: "Sep 2018",
      current: false,
      description: "",
      bulletPoints: [],
    }
  ],
  education: [
    {
      id: "edu-1767989306418-6yd6xhkng",
      school: "QIS College of Engineering & Technology",
      degree: "BTech - Bachelor of Technology",
      field: "Mechanical Engineering",
      location: "",
      startDate: "2011",
      endDate: "2015",
      current: false,
      gpa: "",
      honors: [],
      coursework: [],
      activities: [],
      description: ""
    },
    {
      id: "edu-1767989306418-tfsi70cb2",
      school: "Vikas Public Residential School - India",
      degree: "Intermediate",
      field: "MPC",
      location: "",
      startDate: "2009",
      endDate: "2011",
      current: false,
      gpa: "A",
      honors: [],
      coursework: [],
      activities: [],
      description: ""
    }
  ],
  skills: [
    { id: "skill-1", name: "TypeScript", category: "Technical" },
    { id: "skill-2", name: "React.js", category: "Technical" },
    { id: "skill-3", name: "Node.js", category: "Technical" },
    { id: "skill-4", name: "JavaScript", category: "Technical" },
    { id: "skill-5", name: "Angular", category: "Technical" },
    { id: "skill-6", name: "MongoDB", category: "Technical" },
    { id: "skill-7", name: "GraphQL", category: "Technical" },
    { id: "skill-8", name: "Next.js", category: "Technical" },
    { id: "skill-9", name: "Redux.js", category: "Technical" },
    { id: "skill-10", name: "HTML5", category: "Technical" },
    { id: "skill-11", name: "CSS", category: "Technical" },
    { id: "skill-12", name: "Git", category: "Technical" },
  ],
  languages: [],
  certifications: [
    {
      id: "cert-1",
      name: "Angular Certificate",
      issuer: "HackerRank",
      date: "Apr 2021",
      expiryDate: "",
      credentialId: "",
      url: ""
    },
    {
      id: "cert-2",
      name: "JavaScript",
      issuer: "TestDome",
      date: "Nov 2019",
      expiryDate: "Nov 2022",
      credentialId: "",
      url: ""
    }
  ],
  publications: [
    {
      id: "pub-1",
      title: "Complete guide on Python modules",
      publisher: "Analytics Vidhya",
      date: "Mar 10, 2020",
      url: "https://medium.com/analytics-vidhya/complete-guide-on-python-modules-d82d6c09fac9",
      description: "Complete guide on Python modules"
    },
    {
      id: "pub-2",
      title: "A Complete Guide to the Math Object in JavaScript",
      publisher: "Level Up Coding",
      date: "Feb 1, 2020",
      url: "https://levelup.gitconnected.com/complete-guide-on-math-object-in-javascript-5c641254f288",
      description: "A Complete Guide to the Math Object in JavaScript"
    },
    {
      id: "pub-3",
      title: "How to generate PDF invoices with JavaScript",
      publisher: "Level Up Coding",
      date: "Jan 9, 2020",
      url: "https://levelup.gitconnected.com/how-to-generate-pdf-invoices-with-javascript-159279f9243e",
      description: "generate PDF invoices with JavaScript"
    }
  ],
  volunteer: [],
  awards: [],
  projects: [
    {
      id: "proj-1",
      name: "Team Opinion",
      description: "Created own full stack project during lockdown to play fun game with team members.",
      startDate: "Mar 2020",
      endDate: "Apr 2020",
      url: "http://fun-quiz.now.sh",
      technologies: [],
      highlights: []
    },
    {
      id: "proj-2",
      name: "Talentscreen",
      description: "",
      startDate: "Jan 2016",
      endDate: "Jul 2018",
      url: "http://talentscreen.io",
      technologies: [],
      highlights: []
    }
  ],
  courses: [],
  settings: {
    includeSocialLinks: true,
    includePhoto: true,
    dateFormat: "MMM YYYY"
  }
};

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
  const [isTestMode, setIsTestMode] = useState(false);
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
    setIsTestMode(false);
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

  // Test mode - use sample data without API call
  const handleTestImport = async () => {
    setIsTestMode(true);
    setIsSaving(true);

    try {
      // Save test data to profile
      await profileService.importFromLinkedIn(
        TEST_LINKEDIN_DATA,
        TEST_LINKEDIN_DATA.personalInfo.linkedin
      );

      setImportedData(TEST_LINKEDIN_DATA);
      setImportedProfile({
        name: TEST_LINKEDIN_DATA.personalInfo.fullName,
        photoUrl: TEST_LINKEDIN_DATA.personalInfo.photo,
        linkedInUrl: TEST_LINKEDIN_DATA.personalInfo.linkedin,
      });
      setStep('select-template');
    } catch (err) {
      console.error('Failed to save test profile:', err);
      // Still proceed even if save fails
      setImportedData(TEST_LINKEDIN_DATA);
      setImportedProfile({
        name: TEST_LINKEDIN_DATA.personalInfo.fullName,
        photoUrl: TEST_LINKEDIN_DATA.personalInfo.photo,
        linkedInUrl: TEST_LINKEDIN_DATA.personalInfo.linkedin,
      });
      setStep('select-template');
    } finally {
      setIsSaving(false);
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
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-[#0A66C2]/5 to-[#0A66C2]/10 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Import from LinkedIn
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
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
        <div className="px-6 py-5">
          {/* Checking step - loading spinner */}
          {step === 'checking' && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#0A66C2] animate-spin" />
              <p className="mt-4 text-sm text-gray-500">Checking for existing profile...</p>
            </div>
          )}

          {/* Profile Exists step - show options */}
          {step === 'profile-exists' && existingProfile && (
            <div className="space-y-5">
              {/* Existing profile info */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Profile found!</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-0.5">{existingProfile.name}</p>
                </div>
              </div>

              {/* Profile summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-blue-500 mb-1" />
                  <span className="text-lg font-semibold text-gray-900">{existingProfile.experienceCount}</span>
                  <span className="text-xs text-gray-500">Experience</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-purple-500 mb-1" />
                  <span className="text-lg font-semibold text-gray-900">{existingProfile.educationCount}</span>
                  <span className="text-xs text-gray-500">Education</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-amber-500 mb-1" />
                  <span className="text-lg font-semibold text-gray-900">{existingProfile.skillsCount}</span>
                  <span className="text-xs text-gray-500">Skills</span>
                </div>
              </div>

              {existingProfile.linkedinImportedAt && (
                <p className="text-xs text-gray-500 text-center">
                  Last imported from LinkedIn: {existingProfile.linkedinImportedAt.toLocaleDateString()}
                </p>
              )}

              {/* Options */}
              <div className="space-y-3">
                <Button
                  onClick={handleUseExistingProfile}
                  className="w-full h-11 bg-[#0A66C2] hover:bg-[#004182] gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Use Existing Profile
                </Button>

                <Button
                  onClick={() => setStep('input')}
                  variant="outline"
                  className="w-full h-10 gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Re-import from LinkedIn
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  Re-importing will update your profile with new data from LinkedIn
                </p>
              </div>
            </div>
          )}

          {/* Input URL step */}
          {step === 'input' && (
            <div className="space-y-5">
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
                    className="pl-10 h-11"
                    onKeyDown={(e) => e.key === 'Enter' && handleImport()}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Make sure your LinkedIn profile is set to public for best results
                </p>
              </div>

              {error && (
                <Alert variant="destructive" className="py-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">What we'll import:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Work Experience
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Education
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Skills
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Certifications
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Languages
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Publications
                  </div>
                </div>
              </div>

              <Button
                onClick={handleImport}
                className="w-full h-11 bg-[#0A66C2] hover:bg-[#004182] gap-2"
              >
                Import Profile
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Test button for development - uses sample data without API call */}
              <div className="pt-3 border-t border-gray-100">
                <Button
                  onClick={handleTestImport}
                  variant="outline"
                  className="w-full h-10 gap-2 text-amber-600 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                >
                  <FlaskConical className="w-4 h-4" />
                  Test with Sample Data (Dev Mode)
                </Button>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Skip API call and use pre-loaded sample data for testing
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Loading */}
          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#0A66C2]/10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-[#0A66C2] animate-spin" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Importing your profile</h3>
              <p className="mt-1 text-sm text-gray-500 text-center max-w-sm">
                We're fetching your LinkedIn data. This usually takes 10-30 seconds.
              </p>
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0A66C2] animate-pulse" />
                  Connecting to LinkedIn
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Select Template */}
          {step === 'select-template' && (
            <div className="space-y-5">
              {/* Test Mode Badge */}
              {isTestMode && (
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                  <FlaskConical className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700">Test Mode - Using sample data</span>
                </div>
              )}

              {/* Profile Summary */}
              {importedProfile && (
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                    {importedProfile.photoUrl ? (
                      <img
                        src={importedProfile.photoUrl}
                        alt={importedProfile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Profile imported successfully!</span>
                    </div>
                    <p className="text-sm text-green-700 mt-0.5">{importedProfile.name}</p>
                  </div>
                </div>
              )}

              {/* Data Summary */}
              {summary && (
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Briefcase className="w-5 h-5 text-blue-500 mb-1" />
                    <span className="text-lg font-semibold text-gray-900">{summary.experience}</span>
                    <span className="text-xs text-gray-500">Experience</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-purple-500 mb-1" />
                    <span className="text-lg font-semibold text-gray-900">{summary.education}</span>
                    <span className="text-xs text-gray-500">Education</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Sparkles className="w-5 h-5 text-amber-500 mb-1" />
                    <span className="text-lg font-semibold text-gray-900">{summary.skills}</span>
                    <span className="text-xs text-gray-500">Skills</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mb-1" />
                    <span className="text-lg font-semibold text-gray-900">{summary.certifications}</span>
                    <span className="text-xs text-gray-500">Certs</span>
                  </div>
                </div>
              )}

              {/* Template Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Choose a template to continue
                </Label>
                <ScrollArea className="h-[280px] rounded-xl border border-gray-200 p-3">
                  <div className="grid grid-cols-3 gap-3">
                    {templates.slice(0, 12).map((template: TemplateConfig, index: number) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`group relative rounded-xl overflow-hidden border-2 transition-all ${
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
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                          <p className="text-xs font-medium text-white truncate">{template.name}</p>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-[#0A66C2] rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('input')}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={handleCreateResume}
                  disabled={!selectedTemplate}
                  className="flex-1 h-11 bg-[#0A66C2] hover:bg-[#004182] gap-2"
                >
                  Create Resume
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Error */}
          {step === 'error' && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Import Failed</h3>
              <p className="mt-2 text-sm text-gray-500 text-center max-w-sm">{error}</p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={resetModal}>
                  Try Again
                </Button>
                <Button onClick={() => handleClose(false)}>Close</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInImportModal;
