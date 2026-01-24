/**
 * Resume Builder V2 - Builder Page
 * 
 * New builder page with config-driven templates.
 * Matches the existing LiveEditor styling and functionality.
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Download,
  Loader2,
  ArrowLeft,
  Settings,
  PanelsTopLeft,
  Eye,
  Edit3,
  FileEdit,
  FileText,
  Save,
  GripVertical,
  Edit2,
  Check,
  X,
  Plus,
  Layers,
  SeparatorHorizontal,
  Palette,
  ChevronDown,
  LayoutGrid,
  Type,
  Layout,
  Sparkles,
  RefreshCw,
  User,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { resumeServiceV2, type V2Resume } from '../services/resumeServiceV2';
import { profileService } from '../services/profileService';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { generatePDFFromPreview } from '@/lib/pdfGenerator';
import { PDF_STYLES } from '@/lib/pdfStyles';
import { incrementDownloadsCount } from '@/lib/firestore/statsService';
import { InlineEditProvider } from '@/contexts/InlineEditContext';
import { StyleOptionsProvider, updateStyleOptionExternal } from '@/contexts/StyleOptionsContext';
import { StyleOptionsWrapper } from '@/components/resume/StyleOptionsWrapper';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { StyleOptionsPanelV2 } from '../components/StyleOptionsPanelV2';
import SectionReorderDialog from '../components/SectionReorderDialog';
import { AddSectionModal, ADDABLE_SECTIONS } from '../components/AddSectionModal';
import { ManageSectionsModal } from '../components/ManageSectionsModal';
import { FontSelector, RESUME_FONTS } from '../components/FontSelector';

import { ResumeRenderer } from '../components/ResumeRenderer';
import { useTemplateConfig } from '../hooks/useTemplateConfig';
import { getTemplateConfig } from '../config/templates';
import { MOCK_RESUME_DATA } from '../data/mockData';
import type { V2ResumeData, SectionType } from '../types';
import { getTemplate } from '../templates';
import { getSectionsWithData } from '../utils/dataConverter';

// V2 Dynamic Form (config-driven)
import { DynamicForm, ElegantForm, EnhancedForm } from '../components/form';

// Onboarding Tour for first-time users
import { OnboardingTour } from '../components/OnboardingTour';

// Template Selector Modal
import { TemplateSelectorModal } from '../components/TemplateSelectorModal';

// AI Enhancement Modal
import { EnhanceWithAIModal } from '../components/EnhanceWithAIModal';

// Job Tailor Modal
import { JobTailorModal } from '../components/JobTailorModal';
import { Target } from 'lucide-react';

// Pro Feature Modal
import { ProFeatureModal } from '../components/ProFeatureModal';
import { useSubscription } from '@/hooks/useSubscriptionNew';

// ATS Score Panel - Hidden for refinement
// import { ATSScorePanel } from '../components/ATSScorePanel';
import { FileCheck } from 'lucide-react';

// Chat With Resume - Conversational Resume Builder
import { ChatWithResume } from '../components/ChatWithResume';

// Mock Interview Modal
import { MockInterviewModal } from '../components/MockInterviewModal';
import { MessageSquare } from 'lucide-react';
import { ResumeAnimationProvider } from '../contexts/ResumeAnimationContext';
import type { ChatResumeUpdatePayload } from '../types/chat';

// Save Options Dialog
import { SaveOptionsDialog } from '../components/SaveOptionsDialog';

export const BuilderV2: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'executive-split-v2';
  const resumeId = searchParams.get('resumeId');
  const templateDefinition = getTemplate(templateId);
  const { user } = useAuth();
  const { isPro } = useSubscription();

  const initialResumeData = React.useMemo(
    () => templateDefinition?.mockData || MOCK_RESUME_DATA,
    [templateDefinition?.mockData],
  );

  // State
  const [resumeData, setResumeData] = useState<V2ResumeData>(initialResumeData);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(resumeId);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!!resumeId);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loadedResume, setLoadedResume] = useState<V2Resume | null>(null);
  const [themeColor, setThemeColor] = useState('#0891b2');
  const [themeColors, setThemeColors] = useState<{ primary?: string; secondary?: string }>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSyncingProfile, setIsSyncingProfile] = useState(false);
  const [sectionLabels, setSectionLabels] = useState<Record<string, string>>({});
  const [enabledSections, setEnabledSections] = useState<string[]>(['header', 'summary', 'experience', 'education', 'strengths', 'skills', 'achievements']);
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editingLabelValue, setEditingLabelValue] = useState('');
  const [editorMode, setEditorMode] = useState<'preview' | 'live' | 'form'>('form');
  const [sectionOverrides, setSectionOverrides] = useState<Record<string, any>>({});
  const [showReorder, setShowReorder] = useState(false);
  // Manage Sections Modal state (unified section management)
  const [showManageSections, setShowManageSections] = useState(false);
  // Add Section Modal state
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [addSectionTargetColumn, setAddSectionTargetColumn] = useState<'main' | 'sidebar'>('main');
  // Toggle between old form and new dynamic form (for testing)
  const [useNewForm, setUseNewForm] = useState(true);
  // Mobile view state: 'form', 'preview', or 'live'
  const [mobileView, setMobileView] = useState<'form' | 'preview' | 'live'>('preview');
  // Mobile resume scale factor
  const [mobileScale, setMobileScale] = useState(0.5);
  // Mobile resume actual height (for dynamic container sizing)
  const [mobileResumeHeight, setMobileResumeHeight] = useState(1123); // Default A4 height in px
  // Font family selector state
  const [selectedFont, setSelectedFont] = useState<string>(RESUME_FONTS[0].family);
  // Template selector modal state
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  // AI Enhancement modal state
  const [showEnhanceModal, setShowEnhanceModal] = useState(false);
  // Job Tailor modal state
  const [showJobTailorModal, setShowJobTailorModal] = useState(false);
  // Pro Feature modal state
  const [showProModal, setShowProModal] = useState(false);
  const [proModalFeature, setProModalFeature] = useState({ name: '', description: '' });
  // Save Options dialog state
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  // ATS Score panel state - Hidden for refinement
  // const [showATSPanel, setShowATSPanel] = useState(false);

  // Mock Interview modal state
  const [showMockInterview, setShowMockInterview] = useState(false);

  // Chat mode state - when true, shows chat panel instead of form
  const [isChatMode, setIsChatMode] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileResumeRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Track if external data was imported (to prevent template effect from overwriting)
  const externalDataImportedRef = useRef(false);

  // Check for LinkedIn imported data on mount
  useEffect(() => {
    const linkedInData = sessionStorage.getItem('linkedin-import-data');
    const source = searchParams.get('source');

    if (linkedInData && source === 'linkedin') {
      try {
        const parsedData = JSON.parse(linkedInData);
        externalDataImportedRef.current = true;
        setResumeData(parsedData);

        // Dynamically enable sections based on LinkedIn data
        const sectionsToEnable: string[] = ['header'];
        if (parsedData.personalInfo?.summary) sectionsToEnable.push('summary');
        if (parsedData.experience?.length > 0) sectionsToEnable.push('experience');
        if (parsedData.education?.length > 0) sectionsToEnable.push('education');
        if (parsedData.skills?.length > 0) sectionsToEnable.push('skills');
        if (parsedData.languages?.length > 0) sectionsToEnable.push('languages');
        if (parsedData.certifications?.length > 0) sectionsToEnable.push('certifications');
        if (parsedData.projects?.length > 0) sectionsToEnable.push('projects');
        if (parsedData.volunteer?.length > 0) sectionsToEnable.push('volunteer');
        if (parsedData.publications?.length > 0) sectionsToEnable.push('publications');

        setEnabledSections(sectionsToEnable);

        // Clear the sessionStorage to prevent re-loading on refresh
        sessionStorage.removeItem('linkedin-import-data');
        toast.success('LinkedIn profile imported! You can now edit your resume.');
      } catch (error) {
        console.error('Failed to parse LinkedIn data:', error);
      }
    }
  }, [searchParams]);

  // Check for uploaded resume data on mount
  useEffect(() => {
    const uploadedResumeData = sessionStorage.getItem('resume-upload-data');
    const source = searchParams.get('source');

    if (uploadedResumeData && source === 'upload') {
      try {
        const parsedData = JSON.parse(uploadedResumeData);
        externalDataImportedRef.current = true;
        setResumeData(parsedData);

        // Dynamically enable sections based on parsed data
        // This ensures all sections from the uploaded resume are visible
        const sectionsToEnable: string[] = ['header']; // Always include header

        if (parsedData.personalInfo?.summary) sectionsToEnable.push('summary');
        if (parsedData.experience?.length > 0) sectionsToEnable.push('experience');
        if (parsedData.education?.length > 0) sectionsToEnable.push('education');
        if (parsedData.skills?.length > 0) sectionsToEnable.push('skills');
        if (parsedData.languages?.length > 0) sectionsToEnable.push('languages');
        if (parsedData.certifications?.length > 0) sectionsToEnable.push('certifications');
        if (parsedData.projects?.length > 0) sectionsToEnable.push('projects');
        if (parsedData.awards?.length > 0) sectionsToEnable.push('awards');
        if (parsedData.achievements?.length > 0) sectionsToEnable.push('achievements');
        if (parsedData.strengths?.length > 0) sectionsToEnable.push('strengths');
        if (parsedData.volunteer?.length > 0) sectionsToEnable.push('volunteer');
        if (parsedData.publications?.length > 0) sectionsToEnable.push('publications');
        if (parsedData.speaking?.length > 0) sectionsToEnable.push('speaking');
        if (parsedData.patents?.length > 0) sectionsToEnable.push('patents');
        if (parsedData.interests?.length > 0) sectionsToEnable.push('interests');
        if (parsedData.references?.length > 0) sectionsToEnable.push('references');
        if (parsedData.courses?.length > 0) sectionsToEnable.push('courses');

        // Handle custom sections
        if (parsedData.customSections?.length > 0) {
          parsedData.customSections.forEach((section: { id: string }) => {
            sectionsToEnable.push(section.id);
          });
        }

        setEnabledSections(sectionsToEnable);

        // Clear the sessionStorage to prevent re-loading on refresh
        sessionStorage.removeItem('resume-upload-data');

        const sectionCount = sectionsToEnable.length - 1; // Exclude header
        toast.success(`Resume parsed successfully! Found ${sectionCount} sections.`);
      } catch (error) {
        console.error('Failed to parse uploaded resume data:', error);
      }
    }
  }, [searchParams]);

  // Check for job-tailored resume data on mount
  useEffect(() => {
    const jobTailorData = sessionStorage.getItem('job-tailor-data');
    const source = searchParams.get('source');

    if (jobTailorData && source === 'job-tailor') {
      try {
        const { resumeData: tailoredData, analysis } = JSON.parse(jobTailorData);
        externalDataImportedRef.current = true;
        setResumeData(tailoredData);

        // Dynamically enable sections based on tailored data
        const sectionsToEnable: string[] = ['header'];

        if (tailoredData.personalInfo?.summary) sectionsToEnable.push('summary');
        if (tailoredData.experience?.length > 0) sectionsToEnable.push('experience');
        if (tailoredData.education?.length > 0) sectionsToEnable.push('education');
        if (tailoredData.skills?.length > 0) sectionsToEnable.push('skills');
        if (tailoredData.languages?.length > 0) sectionsToEnable.push('languages');
        if (tailoredData.certifications?.length > 0) sectionsToEnable.push('certifications');
        if (tailoredData.projects?.length > 0) sectionsToEnable.push('projects');
        if (tailoredData.awards?.length > 0) sectionsToEnable.push('awards');
        if (tailoredData.achievements?.length > 0) sectionsToEnable.push('achievements');
        if (tailoredData.strengths?.length > 0) sectionsToEnable.push('strengths');
        if (tailoredData.volunteer?.length > 0) sectionsToEnable.push('volunteer');
        if (tailoredData.publications?.length > 0) sectionsToEnable.push('publications');
        if (tailoredData.speaking?.length > 0) sectionsToEnable.push('speaking');
        if (tailoredData.patents?.length > 0) sectionsToEnable.push('patents');
        if (tailoredData.interests?.length > 0) sectionsToEnable.push('interests');
        if (tailoredData.references?.length > 0) sectionsToEnable.push('references');
        if (tailoredData.courses?.length > 0) sectionsToEnable.push('courses');

        // Handle custom sections
        if (tailoredData.customSections?.length > 0) {
          tailoredData.customSections.forEach((section: { id: string }) => {
            sectionsToEnable.push(section.id);
          });
        }

        setEnabledSections(sectionsToEnable);

        // Clear the sessionStorage to prevent re-loading on refresh
        sessionStorage.removeItem('job-tailor-data');

        // Show success toast with match score
        const matchScore = analysis?.matchScore || 0;
        const keywordsAdded = analysis?.keywordsAdded?.length || 0;
        toast.success(`Resume tailored for job! Match score: ${matchScore}%`, {
          description: keywordsAdded > 0 ? `Added ${keywordsAdded} relevant keywords` : 'Your resume has been optimized',
        });
      } catch (error) {
        console.error('Failed to parse job-tailored resume data:', error);
      }
    }
  }, [searchParams]);

  // Load sample data for new resumes (no resumeId)
  // Profile data is only loaded when user clicks "Sync from Profile"
  useEffect(() => {
    const loadSampleData = () => {
      // Skip if we're loading an existing resume or external data is pending
      if (resumeId) return;
      const source = searchParams.get('source');
      if (source === 'linkedin' || source === 'upload' || source === 'job-tailor') return;

      // Load sample data to show how template looks
      // User can click "Sync from Profile" to load their profile data
      externalDataImportedRef.current = true; // Prevent template effect from overwriting
      setResumeData(MOCK_RESUME_DATA);

      // Enable common sections to showcase the template
      setEnabledSections([
        'header',
        'summary',
        'experience',
        'education',
        'skills',
        'certifications',
        'projects',
        'achievements',
      ]);

      toast.info('Sample data loaded. Click "Sync from Profile" to use your profile data.', {
        duration: 4000,
      });
    };

    loadSampleData();
  }, [resumeId, searchParams]);

  // Load resume from URL param if present
  useEffect(() => {
    const loadResumeFromUrl = async () => {
      if (!resumeId || !user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const resume = await resumeServiceV2.getResume(resumeId);
        if (resume) {
          setLoadedResume(resume);
          setResumeData(resume.data);
          setCurrentResumeId(resume.id);

          // Restore saved settings
          if (resume.themeColor) {
            setThemeColor(resume.themeColor);
          }
          if (resume.themeColors) {
            setThemeColors(resume.themeColors);
          }
          if (resume.sectionLabels) {
            setSectionLabels(resume.sectionLabels);
          }
          if (resume.sectionOverrides) {
            setSectionOverrides(resume.sectionOverrides);
          }

          // Restore enabledSections, but also auto-enable sections that have data
          // This handles cases where resume data has sections that weren't enabled when saved
          const savedEnabledSections = resume.enabledSections || ['header', 'summary', 'experience', 'education', 'skills'];
          const sectionsWithData: string[] = ['header']; // Always include header

          if (resume.data.personalInfo?.summary) sectionsWithData.push('summary');
          if (resume.data.experience?.length > 0) sectionsWithData.push('experience');
          if (resume.data.education?.length > 0) sectionsWithData.push('education');
          if (resume.data.skills?.length > 0) sectionsWithData.push('skills');
          if (resume.data.languages?.length > 0) sectionsWithData.push('languages');
          if (resume.data.certifications?.length > 0) sectionsWithData.push('certifications');
          if (resume.data.projects?.length > 0) sectionsWithData.push('projects');
          if (resume.data.awards?.length > 0) sectionsWithData.push('awards');
          if (resume.data.achievements?.length > 0) sectionsWithData.push('achievements');
          if (resume.data.strengths?.length > 0) sectionsWithData.push('strengths');
          if (resume.data.volunteer?.length > 0) sectionsWithData.push('volunteer');
          if (resume.data.publications?.length > 0) sectionsWithData.push('publications');
          if (resume.data.speaking?.length > 0) sectionsWithData.push('speaking');
          if (resume.data.patents?.length > 0) sectionsWithData.push('patents');
          if (resume.data.interests?.length > 0) sectionsWithData.push('interests');
          if (resume.data.references?.length > 0) sectionsWithData.push('references');
          if (resume.data.courses?.length > 0) sectionsWithData.push('courses');

          // Merge saved enabled sections with sections that have data
          const mergedSections = [...new Set([...savedEnabledSections, ...sectionsWithData])];
          setEnabledSections(mergedSections);

          toast.success('Resume loaded');
        } else {
          toast.error('Resume not found');
        }
      } catch (error) {
        console.error('Error loading resume:', error);
        toast.error('Failed to load resume');
      } finally {
        setIsLoading(false);
      }
    };

    loadResumeFromUrl();
  }, [resumeId, user]);

  // Track unsaved changes
  useEffect(() => {
    if (loadedResume) {
      // Compare current data with loaded data
      const hasChanges = JSON.stringify(resumeData) !== JSON.stringify(loadedResume.data);
      setHasUnsavedChanges(hasChanges);
    }
  }, [resumeData, loadedResume]);

  // Open save options dialog
  const handleSaveClick = useCallback(() => {
    if (!user) {
      toast.error('Please sign in to save your resume');
      return;
    }
    setShowSaveOptions(true);
  }, [user]);

  // Sync from profile - load user's profile data into resume
  const handleSyncFromProfile = useCallback(async () => {
    if (!user) {
      toast.error('Please sign in to sync from profile');
      return;
    }

    setIsSyncingProfile(true);
    try {
      const profile = await profileService.getProfile();

      // Check if profile has any meaningful data
      const hasExperience = (profile?.experience?.length ?? 0) > 0;
      const hasEducation = (profile?.education?.length ?? 0) > 0;
      const hasSkills = (profile?.skills?.length ?? 0) > 0;
      const hasSummary = !!profile?.personalInfo?.summary?.trim();
      const hasProjects = (profile?.projects?.length ?? 0) > 0;
      const hasCertifications = (profile?.certifications?.length ?? 0) > 0;

      if (!hasExperience && !hasEducation && !hasSkills && !hasSummary && !hasProjects && !hasCertifications) {
        toast.info('Your profile is empty. Import from LinkedIn or add data to your profile first.', {
          duration: 5000,
          action: {
            label: 'Go to Profile',
            onClick: () => window.open('/profile', '_blank'),
          },
        });
        return;
      }

      // Convert profile to resume data
      const profileResumeData = profileService.profileToResumeData(profile);
      setResumeData(profileResumeData);

      // Enable sections based on profile data
      const sectionsToEnable: string[] = ['header'];
      if (profileResumeData.personalInfo?.summary) sectionsToEnable.push('summary');
      if (profileResumeData.experience?.length > 0) sectionsToEnable.push('experience');
      if (profileResumeData.education?.length > 0) sectionsToEnable.push('education');
      if (profileResumeData.skills?.length > 0) sectionsToEnable.push('skills');
      if (profileResumeData.languages?.length > 0) sectionsToEnable.push('languages');
      if (profileResumeData.certifications?.length > 0) sectionsToEnable.push('certifications');
      if (profileResumeData.projects?.length > 0) sectionsToEnable.push('projects');
      if (profileResumeData.awards?.length > 0) sectionsToEnable.push('awards');
      if (profileResumeData.achievements?.length > 0) sectionsToEnable.push('achievements');
      if (profileResumeData.strengths?.length > 0) sectionsToEnable.push('strengths');
      if (profileResumeData.volunteer?.length > 0) sectionsToEnable.push('volunteer');
      if (profileResumeData.publications?.length > 0) sectionsToEnable.push('publications');
      if (profileResumeData.interests?.length > 0) sectionsToEnable.push('interests');

      setEnabledSections(sectionsToEnable);
      setHasUnsavedChanges(true);

      toast.success('Profile data synced successfully!');
    } catch (error) {
      console.error('Error syncing from profile:', error);
      toast.error('Failed to sync profile data');
    } finally {
      setIsSyncingProfile(false);
    }
  }, [user]);

  // Core save function (without profile sync)
  const saveResumeCore = useCallback(async (): Promise<boolean> => {
    try {
      if (currentResumeId) {
        // Update existing resume
        await resumeServiceV2.saveResume(currentResumeId, resumeData, templateId, {
          themeColor,
          themeColors,
          sectionOverrides,
          enabledSections,
          sectionLabels,
        });
        setHasUnsavedChanges(false);
      } else {
        // Create new resume
        const newResumeId = await resumeServiceV2.createResume(templateId, resumeData, {
          themeColor,
          themeColors,
          sectionOverrides,
          enabledSections,
          sectionLabels,
          title: resumeData.personalInfo?.fullName
            ? `${resumeData.personalInfo.fullName}'s Resume`
            : undefined,
        });
        setCurrentResumeId(newResumeId);
        setHasUnsavedChanges(false);

        // Update URL with new resumeId
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('resumeId', newResumeId);
        window.history.replaceState({}, '', newUrl.toString());
      }
      return true;
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume');
      return false;
    }
  }, [currentResumeId, resumeData, templateId, themeColor, themeColors, sectionOverrides, enabledSections, sectionLabels]);

  // Save resume only (without updating profile)
  const handleSaveResumeOnly = useCallback(async () => {
    setIsSaving(true);
    try {
      const success = await saveResumeCore();
      if (success) {
        toast.success('Resume saved successfully');
        setShowSaveOptions(false);
      }
    } finally {
      setIsSaving(false);
    }
  }, [saveResumeCore]);

  // Save resume and update profile
  const handleSaveAndUpdateProfile = useCallback(async () => {
    setIsSaving(true);
    try {
      const success = await saveResumeCore();
      if (success) {
        // Sync resume data back to user profile (master data)
        try {
          await profileService.syncFromResumeData(resumeData);
          toast.success('Resume saved and profile updated');
        } catch (syncError) {
          console.error('Error syncing to profile:', syncError);
          toast.success('Resume saved (profile sync failed)');
        }
        setShowSaveOptions(false);
      }
    } finally {
      setIsSaving(false);
    }
  }, [saveResumeCore, resumeData]);

  // Legacy handler for backward compatibility (used by auto-save etc.)
  const handleSaveResume = handleSaveAndUpdateProfile;

  // Smart header hide on scroll down, show on scroll up (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      // Only hide header on desktop (lg breakpoint = 1024px)
      if (window.innerWidth < 1024) {
        setHeaderVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const scrolledPastThreshold = currentScrollY > 100;

      // Only toggle if scroll delta is significant (prevents jitter)
      if (Math.abs(scrollDelta) < 10) {
        lastScrollY.current = currentScrollY;
        return;
      }

      if (scrollDelta > 0 && scrolledPastThreshold) {
        setHeaderVisible(false);
      } else if (scrollDelta < 0) {
        setHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate mobile scale to fit resume in viewport width
  useEffect(() => {
    const calculateScale = () => {
      // A4 width in pixels (210mm at 96dpi ≈ 794px)
      const a4WidthPx = 794;
      // Available width (viewport - padding)
      const availableWidth = window.innerWidth - 24; // 12px padding on each side
      const scale = Math.min(availableWidth / a4WidthPx, 1);
      setMobileScale(scale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // Measure actual resume height for mobile container
  useEffect(() => {
    const measureHeight = () => {
      if (mobileResumeRef.current) {
        const height = mobileResumeRef.current.scrollHeight;
        setMobileResumeHeight(height);
      }
    };

    // Measure after render and on resize
    const timeoutId = setTimeout(measureHeight, 100);
    window.addEventListener('resize', measureHeight);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', measureHeight);
    };
  }, [resumeData, templateId, enabledSections]); // Re-measure when content changes

  // Get base template config (without theme overrides) for color slots
  const baseConfig = React.useMemo(() => {
    return getTemplateConfig(templateId) || null;
  }, [templateId]);

  // Get color slots from base template or create default
  const colorSlots = React.useMemo(() => {
    if (baseConfig?.colorSlots) {
      return baseConfig.colorSlots.slice(0, 2); // Max 2 colors
    }
    return [
      {
        name: 'primary' as const,
        label: 'Primary Color',
        defaultColor: baseConfig?.colors.primary || '#0891b2',
        description: 'Main accent color for headings and highlights',
      },
    ];
  }, [baseConfig]);

  // Initialize themeColors from template defaults on first load only
  const initializedRef = React.useRef(false);
  React.useEffect(() => {
    if (!initializedRef.current && colorSlots.length > 0) {
      const initialColors: { primary?: string; secondary?: string } = {};
      colorSlots.forEach(slot => {
        initialColors[slot.name] = slot.defaultColor;
      });
      setThemeColors(initialColors);
      initializedRef.current = true;
    }
  }, [colorSlots]);

  // Get template config with theme colors applied
  const { config: templateConfig } = useTemplateConfig({
    templateId,
    themeColors,
    sectionOverrides
  });

  // Apply custom font selection to config
  const config = React.useMemo(() => {
    const newConfig = {
      ...templateConfig,
      fontFamily: {
        ...templateConfig.fontFamily,
        primary: selectedFont,
      }
    };
    return newConfig;
  }, [templateConfig, selectedFont]);

  // Apply reorder from dialog
  const handleApplyReorder = (mainIds: string[], sidebarIds: string[], pageBreaks: Record<string, boolean>) => {
    setSectionOverrides((prev) => {
      const next = { ...prev };
      let orderMain = 1;
      mainIds.forEach((id) => {
        next[id] = { ...(next[id] || {}), order: orderMain++, column: 'main', enabled: true, pageBreakBefore: pageBreaks[id] ?? false };
      });
      let orderSidebar = 1;
      sidebarIds.forEach((id) => {
        next[id] = { ...(next[id] || {}), order: orderSidebar++, column: 'sidebar', enabled: true, pageBreakBefore: pageBreaks[id] ?? false };
      });
      // also persist pageBreak for any section not present (disabled) if provided
      Object.keys(pageBreaks).forEach((id) => {
        if (!next[id]) next[id] = {};
        next[id] = { ...next[id], pageBreakBefore: pageBreaks[id] };
      });
      return next;
    });
  };

  // Initialize enabled sections from config
  // Skip if external data was just imported (to preserve imported sections)
  React.useEffect(() => {
    // Check if we have pending external data that will set its own sections
    const source = searchParams.get('source');
    const hasLinkedInData = sessionStorage.getItem('linkedin-import-data');
    const hasUploadedResumeData = sessionStorage.getItem('resume-upload-data');
    const hasJobTailorData = sessionStorage.getItem('job-tailor-data');
    const hasPendingImport = (source === 'linkedin' && hasLinkedInData) ||
                             (source === 'upload' && hasUploadedResumeData) ||
                             (source === 'job-tailor' && hasJobTailorData);

    // Don't reset sections if:
    // 1. External data import is pending (storage still has data)
    // 2. External data was just imported (ref is set)
    if (config && !hasPendingImport && !externalDataImportedRef.current) {
      const configEnabledSections = config.sections.filter(s => s.enabled).map(s => s.id);
      setEnabledSections(configEnabledSections);
    }
  }, [config.id, searchParams]);

  // Swap in template-specific mock data when changing templates
  // Skip if external data is pending import (to preserve imported data)
  React.useEffect(() => {
    const source = searchParams.get('source');
    const hasLinkedInData = sessionStorage.getItem('linkedin-import-data');
    const hasUploadedResumeData = sessionStorage.getItem('resume-upload-data');
    const hasJobTailorData = sessionStorage.getItem('job-tailor-data');

    // Don't reset to mock data if we're importing from LinkedIn
    if (source === 'linkedin' && hasLinkedInData) {
      return;
    }

    // Don't reset to mock data if we're importing from uploaded resume
    if (source === 'upload' && hasUploadedResumeData) {
      return;
    }

    // Don't reset to mock data if we're importing from job tailor
    if (source === 'job-tailor' && hasJobTailorData) {
      return;
    }

    // Also skip if external data was just imported (ref flag set)
    // Don't reset the ref here - let it persist so other effects can check it
    if (externalDataImportedRef.current) {
      return;
    }

    setResumeData(templateDefinition?.mockData || MOCK_RESUME_DATA);
  }, [templateDefinition, searchParams]);

  // Reset external import flag after initial render effects have completed
  // This prevents future template changes from being blocked
  React.useEffect(() => {
    if (externalDataImportedRef.current) {
      // Use a small timeout to ensure all initial effects have run
      const timer = setTimeout(() => {
        externalDataImportedRef.current = false;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle resume data updates from inline editing
  const handleResumeUpdate = useCallback((updater: V2ResumeData | ((prev: V2ResumeData) => V2ResumeData)) => {
    if (typeof updater === 'function') {
      setResumeData(updater);
    } else {
      setResumeData(updater);
    }
  }, []);

  // Add bullet point
  const handleAddBulletPoint = useCallback((expId: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          return {
            ...exp,
            bulletPoints: [...(exp.bulletPoints || []), 'New achievement or responsibility'],
          };
        }
        return exp;
      }),
    }));
  }, []);

  // Remove bullet point
  const handleRemoveBulletPoint = useCallback((expId: string, bulletIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          return {
            ...exp,
            bulletPoints: (exp.bulletPoints || []).filter((_, i) => i !== bulletIndex),
          };
        }
        return exp;
      }),
    }));
  }, []);

  // Add new experience
  const handleAddExperience = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: 'Company Name',
          position: 'Position Title',
          startDate: '',
          endDate: '',
          description: '',
          current: false,
          bulletPoints: ['Add your achievements and responsibilities here'],
        },
      ],
    }));
    toast.success('New experience added');
  }, []);

  // Remove experience
  const handleRemoveExperience = useCallback((expId: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== expId),
    }));
    toast.success('Experience removed');
  }, []);

  // Add new education
  const handleAddEducation = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          school: 'University Name',
          degree: 'Degree',
          field: 'Field of Study',
          startDate: '',
          endDate: '',
          gpa: '',
        },
      ],
    }));
    toast.success('New education added');
  }, []);

  // Remove education
  const handleRemoveEducation = useCallback((eduId: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== eduId),
    }));
    toast.success('Education removed');
  }, []);

  // Add new language
  const handleAddLanguage = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      languages: [
        ...(prev.languages || []),
        {
          id: Date.now().toString(),
          language: 'New Language',
          proficiency: 'Intermediate' as const,
        },
      ],
    }));
    toast.success('Language added');
  }, []);

  // Remove language
  const handleRemoveLanguage = useCallback((langId: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: (prev.languages || []).filter(lang => lang.id !== langId),
    }));
    toast.success('Language removed');
  }, []);

  // Update language
  const handleUpdateLanguage = useCallback((langId: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: (prev.languages || []).map(lang =>
        lang.id === langId ? { ...lang, [field]: value } : lang
      ),
    }));
  }, []);

  // Add new strength
  const handleAddStrength = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      strengths: [
        ...(prev.strengths || []),
        {
          id: Date.now().toString(),
          title: 'New Strength',
          description: 'Description of this strength',
        },
      ],
    }));
    toast.success('New strength added');
  }, []);

  // Remove strength
  const handleRemoveStrength = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      strengths: (prev.strengths || []).filter(item => item.id !== id),
    }));
    toast.success('Strength removed');
  }, []);

  // Add new achievement
  const handleAddAchievement = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      achievements: [
        ...(prev.achievements || []),
        {
          id: Date.now().toString(),
          title: 'New Achievement',
          description: 'Description of this achievement',
        },
      ],
    }));
    toast.success('New achievement added');
  }, []);

  // Remove achievement
  const handleRemoveAchievement = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      achievements: (prev.achievements || []).filter(item => item.id !== id),
    }));
    toast.success('Achievement removed');
  }, []);

  // Add/Remove handlers for all other sections
  const handleAddProject = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          id: Date.now().toString(),
          name: 'New Project',
          role: 'Owner',
          description: 'Project description',
          techStack: ['Tech'],
          technologies: ['Tech'],
          highlights: ['Describe an accomplishment or outcome'],
          url: '',
          githubUrl: '',
        },
      ],
    }));
  }, []);

  const handleRemoveProject = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, projects: (prev.projects || []).filter(item => item.id !== id) }));
  }, []);

  const handleAddCertification = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), { id: Date.now().toString(), name: 'New Certification', issuer: 'Issuing Organization', date: '' }],
    }));
  }, []);

  const handleRemoveCertification = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, certifications: (prev.certifications || []).filter(item => item.id !== id) }));
  }, []);

  const handleAddAward = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      awards: [...(prev.awards || []), { id: Date.now().toString(), title: 'New Award', issuer: 'Issuing Organization', date: '' }],
    }));
  }, []);

  const handleRemoveAward = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, awards: (prev.awards || []).filter(item => item.id !== id) }));
  }, []);

  const handleAddPublication = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      publications: [...(prev.publications || []), { id: Date.now().toString(), title: 'New Publication', publisher: 'Publisher', date: '' }],
    }));
  }, []);

  const handleRemovePublication = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, publications: (prev.publications || []).filter(item => item.id !== id) }));
  }, []);

  const handleAddVolunteer = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      volunteer: [...(prev.volunteer || []), { id: Date.now().toString(), organization: 'Organization', role: 'Role', startDate: '', endDate: '', current: false }],
    }));
  }, []);

  const handleRemoveVolunteer = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, volunteer: (prev.volunteer || []).filter(item => item.id !== id) }));
  }, []);

  const handleAddSpeaking = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      speaking: [...(prev.speaking || []), { id: Date.now().toString(), event: 'Event Name', topic: 'Talk Topic', date: '' }],
    }));
  }, []);

  const handleRemoveSpeaking = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, speaking: (prev.speaking || []).filter(item => item.id !== id) }));
  }, []);

  const handleAddPatent = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      patents: [...(prev.patents || []), { id: Date.now().toString(), title: 'New Patent', patentNumber: 'Patent #', date: '', status: 'Pending' as const }],
    }));
  }, []);

  const handleRemovePatent = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, patents: (prev.patents || []).filter(item => item.id !== id) }));
  }, []);

  const handleAddInterest = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      interests: [...(prev.interests || []), { id: Date.now().toString(), name: 'New Interest' }],
    }));
  }, []);

  const handleRemoveInterest = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, interests: (prev.interests || []).filter(item => item.id !== id) }));
  }, []);

  const handleAddReference = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      references: [...(prev.references || []), { id: Date.now().toString(), name: 'Reference Name', title: 'Title', company: 'Company', relationship: 'Relationship' }],
    }));
  }, []);

  const handleRemoveReference = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, references: (prev.references || []).filter(item => item.id !== id) }));
  }, []);

  const handleAddCourse = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      courses: [...(prev.courses || []), { id: Date.now().toString(), name: 'New Course', provider: 'Provider', date: '' }],
    }));
  }, []);

  const handleRemoveCourse = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, courses: (prev.courses || []).filter(item => item.id !== id) }));
  }, []);

  const handleAddSkill = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      skills: [...(prev.skills || []), { id: Date.now().toString(), name: 'New Skill' }],
    }));
  }, []);

  const handleRemoveSkill = useCallback((id: string) => {
    setResumeData(prev => ({ ...prev, skills: (prev.skills || []).filter(item => item.id !== id) }));
  }, []);

  const handleUpdateSkill = useCallback((id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: (prev.skills || []).map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  }, []);

  const handleAddCustomSection = useCallback(() => {
    const newId = `section-${Date.now()}`;

    setResumeData(prev => ({
      ...prev,
      customSections: [
        ...(prev.customSections || []),
        {
          id: newId,
          title: 'New Section',
          items: [{ id: `item-${Date.now()}`, content: 'New item' }],
        },
      ],
    }));

    setSectionOverrides(prev => {
      // Determine next order after all existing sections (config + overrides)
      const overrideOrders = Object.values(prev)
        .map(o => o.order)
        .filter((o): o is number => typeof o === 'number');
      const configOrders = config.sections.map(s => s.order ?? 0);
      const maxOrder = Math.max(...overrideOrders, ...configOrders, 0);
      const nextOrder = maxOrder + 1;
      return {
        ...prev,
        [newId]: {
          type: 'custom',
          title: 'New Section',
          defaultTitle: 'New Section',
          enabled: true,
          order: nextOrder,
          column: 'main',
        },
      };
    });

    setEnabledSections(prev => (prev.includes(newId) ? prev : [...prev, newId]));

    toast.success('Custom section added');
  }, []);

  // Generic handler for adding custom section items
  const handleAddCustomSectionItem = useCallback((sectionIndex: number) => {
    setResumeData(prev => {
      const newSections = [...(prev.customSections || [])];
      if (newSections[sectionIndex]) {
        newSections[sectionIndex] = {
          ...newSections[sectionIndex],
          items: [...(newSections[sectionIndex].items || []), { id: `item-${Date.now()}`, content: 'New item' }],
        };
      }
      return { ...prev, customSections: newSections };
    });
  }, []);

  // Generic handler for removing custom section items
  const handleRemoveCustomSectionItem = useCallback((sectionIndex: number, itemIndex: number) => {
    setResumeData(prev => {
      const newSections = [...(prev.customSections || [])];
      if (newSections[sectionIndex]) {
        newSections[sectionIndex] = {
          ...newSections[sectionIndex],
          items: (newSections[sectionIndex].items || []).filter((_, i) => i !== itemIndex),
        };
      }
      return { ...prev, customSections: newSections };
    });
  }, []);

  // Toggle section
  const handleToggleSection = useCallback((sectionId: string) => {
    setEnabledSections(prev => {
      if (prev.includes(sectionId)) {
        return prev.filter(id => id !== sectionId);
      }
      return [...prev, sectionId];
    });
  }, []);

  // Open add section modal
  const handleOpenAddSection = useCallback((column: 'main' | 'sidebar') => {
    setAddSectionTargetColumn(column);
    setShowAddSectionModal(true);
  }, []);

  // Handle adding a new section from the modal
  const handleAddSection = useCallback((sectionType: string, variant: string, column: 'main' | 'sidebar') => {
    // Generate unique section ID
    const sectionId = sectionType === 'custom'
      ? `custom-${Date.now()}`
      : sectionType;

    // Determine next order after all existing sections
    const overrideOrders = Object.values(sectionOverrides)
      .map((o: any) => o.order)
      .filter((o): o is number => typeof o === 'number');
    const configOrders = config.sections.map(s => s.order ?? 0);
    const maxOrder = Math.max(...overrideOrders, ...configOrders, 0);
    const nextOrder = maxOrder + 1;

    // Add default data for the new section
    if (sectionType === 'custom') {
      setResumeData(prev => ({
        ...prev,
        customSections: [
          ...(prev.customSections || []),
          {
            id: sectionId,
            title: 'New Section',
            items: [{ id: `item-${Date.now()}`, content: 'New item' }],
          },
        ],
      }));
    } else if (sectionType === 'interests') {
      setResumeData(prev => ({
        ...prev,
        interests: [
          ...(prev.interests || []),
          { id: `interest-${Date.now()}`, name: 'New Interest' },
        ],
      }));
    } else if (sectionType === 'awards') {
      setResumeData(prev => ({
        ...prev,
        awards: [
          ...(prev.awards || []),
          { id: `award-${Date.now()}`, title: 'Award Title', issuer: 'Organization', date: '' },
        ],
      }));
    } else if (sectionType === 'publications') {
      setResumeData(prev => ({
        ...prev,
        publications: [
          ...(prev.publications || []),
          { id: `pub-${Date.now()}`, title: 'Publication Title', publisher: 'Publisher', date: '' },
        ],
      }));
    } else if (sectionType === 'volunteer') {
      setResumeData(prev => ({
        ...prev,
        volunteer: [
          ...(prev.volunteer || []),
          { id: `vol-${Date.now()}`, organization: 'Organization', role: 'Role', startDate: '', endDate: '', current: false },
        ],
      }));
    } else if (sectionType === 'speaking') {
      setResumeData(prev => ({
        ...prev,
        speaking: [
          ...(prev.speaking || []),
          { id: `speak-${Date.now()}`, event: 'Conference', topic: 'Topic', date: '' },
        ],
      }));
    } else if (sectionType === 'patents') {
      setResumeData(prev => ({
        ...prev,
        patents: [
          ...(prev.patents || []),
          { id: `patent-${Date.now()}`, title: 'Patent Title', patentNumber: '', date: '', status: 'Pending' as const },
        ],
      }));
    } else if (sectionType === 'references') {
      setResumeData(prev => ({
        ...prev,
        references: [
          ...(prev.references || []),
          { id: `ref-${Date.now()}`, name: 'Reference Name', title: 'Title', company: 'Company', relationship: 'Colleague' },
        ],
      }));
    } else if (sectionType === 'courses') {
      setResumeData(prev => ({
        ...prev,
        courses: [
          ...(prev.courses || []),
          { id: `course-${Date.now()}`, name: 'Course Name', provider: 'Provider', date: '' },
        ],
      }));
    } else if (sectionType === 'projects') {
      setResumeData(prev => ({
        ...prev,
        projects: [
          ...(prev.projects || []),
          { id: `proj-${Date.now()}`, name: 'Project Name', description: 'Description', techStack: [], technologies: [] },
        ],
      }));
    } else if (sectionType === 'certifications') {
      setResumeData(prev => ({
        ...prev,
        certifications: [
          ...(prev.certifications || []),
          { id: `cert-${Date.now()}`, name: 'Certification Name', issuer: 'Issuer', date: '' },
        ],
      }));
    } else if (sectionType === 'languages') {
      setResumeData(prev => ({
        ...prev,
        languages: [
          ...(prev.languages || []),
          { id: `lang-${Date.now()}`, language: 'Language', proficiency: 'Intermediate' as const },
        ],
      }));
    } else if (sectionType === 'achievements') {
      setResumeData(prev => ({
        ...prev,
        achievements: [
          ...(prev.achievements || []),
          { id: `ach-${Date.now()}`, title: 'Achievement', description: '' },
        ],
      }));
    } else if (sectionType === 'strengths') {
      setResumeData(prev => ({
        ...prev,
        strengths: [
          ...(prev.strengths || []),
          { id: `str-${Date.now()}`, title: 'Strength', description: '' },
        ],
      }));
    }

    // Add section override with variant and column
    setSectionOverrides(prev => ({
      ...prev,
      [sectionId]: {
        type: sectionType,
        title: sectionType === 'custom' ? 'New Section' : sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
        defaultTitle: sectionType === 'custom' ? 'New Section' : sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
        enabled: true,
        order: nextOrder,
        column,
        variant,
      },
    }));

    // Enable the section
    setEnabledSections(prev => (prev.includes(sectionId) ? prev : [...prev, sectionId]));

    toast.success(`${sectionType === 'custom' ? 'Custom section' : sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} added!`);
  }, [config.sections, sectionOverrides]);

  // Update section label
  const handleUpdateLabel = useCallback((sectionId: string, newLabel: string) => {
    setSectionLabels(prev => ({
      ...prev,
      [sectionId]: newLabel,
    }));
    setEditingLabelId(null);
  }, []);

  // Change section variant
  const handleChangeSectionVariant = useCallback((sectionId: string, variantId: string) => {
    // Map of section IDs to their proper titles (for dynamic sections not in base config)
    const sectionTitles: Record<string, string> = {
      projects: 'Projects',
      certifications: 'Certifications',
      awards: 'Awards',
      publications: 'Publications',
      volunteer: 'Volunteer Experience',
      speaking: 'Speaking Engagements',
      patents: 'Patents',
      interests: 'Interests',
      references: 'References',
      courses: 'Courses',
      languages: 'Languages',
      strengths: 'Core Strengths',
      achievements: 'Achievements',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      summary: 'Summary',
    };

    // Update section override with new variant, type, title, and ensure enabled
    // This is critical for dynamic sections that aren't in the base template config
    setSectionOverrides(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        type: sectionId, // Ensure type matches section ID for proper rendering
        title: prev[sectionId]?.title || sectionTitles[sectionId] || sectionId,
        variant: variantId,
        enabled: true, // Ensure section stays enabled
      },
    }));

    // Also ensure the section is in enabledSections (for dynamic sections)
    setEnabledSections(prev => {
      if (!prev.includes(sectionId)) {
        return [...prev, sectionId];
      }
      return prev;
    });

    toast.success('Section style updated!');
  }, []);

  // Remove/delete section
  const handleRemoveSection = useCallback((sectionId: string) => {
    // Remove from enabled sections
    setEnabledSections(prev => prev.filter(id => id !== sectionId));

    // Remove from section overrides
    setSectionOverrides(prev => {
      const next = { ...prev };
      delete next[sectionId];
      return next;
    });

    // Remove from section labels
    setSectionLabels(prev => {
      const next = { ...prev };
      delete next[sectionId];
      return next;
    });

    toast.success('Section removed');
  }, []);

  // Extract current section variants from sectionOverrides for chat context
  const currentSectionVariants = React.useMemo(() => {
    const variants: Record<string, string> = {};
    for (const [sectionId, override] of Object.entries(sectionOverrides)) {
      if (override?.variant) {
        variants[sectionId] = override.variant;
      }
    }
    return variants;
  }, [sectionOverrides]);

  /**
   * Handle resume updates from the AI chat
   * Uses a robust approach to:
   * 1. Update the resume data
   * 2. ONLY enable sections that were actually modified by the AI (not all sections with data)
   *
   * This ensures that when the user asks to add "cricket" to interests,
   * only the interests section is enabled - not all other sections.
   */
  const handleChatResumeUpdate = useCallback((payload: ChatResumeUpdatePayload) => {
    const { data, updatedSections, updates, variantChanges } = payload;

    // Update the resume data
    setResumeData(data);
    setHasUnsavedChanges(true);

    // Handle settings.includePhoto changes (hide/show photo via settings path)
    if (updates?.settings && typeof updates.settings.includePhoto === 'boolean') {
      updateStyleOptionExternal('showPhoto', updates.settings.includePhoto);
    }

    // Handle config updates (section visibility, ordering, variants, etc.)
    if (updates?.config) {
      const configUpdates = updates.config;

      // Handle section visibility/ordering from config.sections
      if (configUpdates.sections && Array.isArray(configUpdates.sections)) {
        // Build a map of section type to enabled state
        const sectionEnabledMap = new Map<string, boolean>();
        for (const section of configUpdates.sections) {
          if (section.type && typeof section.enabled === 'boolean') {
            sectionEnabledMap.set(section.type, section.enabled);
          }
        }

        // Apply enabled/disabled state to sections
        // The AI returns a full config with ALL sections, but we only want to process CHANGES:
        // - For sections being disabled (enabled: false), remove them
        // - For sections being enabled (enabled: true) that are currently disabled, add them
        //   ONLY if there's evidence the user explicitly asked to show that section
        //
        // To detect explicit "show" requests, we check if the section was previously disabled
        // and is now enabled. We need to be conservative to avoid enabling all sections.
        if (sectionEnabledMap.size > 0) {
          setEnabledSections(prev => {
            let newSections = [...prev];

            // Count how many sections are being disabled vs enabled
            let disabledCount = 0;
            let enabledNotCurrentlyCount = 0;
            for (const [sectionType, enabled] of sectionEnabledMap) {
              if (!enabled) disabledCount++;
              else if (!prev.includes(sectionType)) enabledNotCurrentlyCount++;
            }

            // If we're only disabling sections (hide request), process only those
            // If we're enabling sections AND the count is small (1-2), it's likely explicit
            const isLikelyHideRequest = disabledCount > 0 && enabledNotCurrentlyCount > 3;
            const isLikelyShowRequest = enabledNotCurrentlyCount > 0 && enabledNotCurrentlyCount <= 3 && disabledCount === 0;

            for (const [sectionType, enabled] of sectionEnabledMap) {
              const isCurrentlyEnabled = prev.includes(sectionType);

              if (!enabled && isCurrentlyEnabled) {
                // Section should be disabled - always process this
                newSections = newSections.filter(s => s !== sectionType);
              } else if (enabled && !isCurrentlyEnabled) {
                // Section should be enabled but isn't
                // Only enable if this is likely an explicit "show" request (few sections)
                if (isLikelyShowRequest || enabledNotCurrentlyCount <= 2) {
                  newSections.push(sectionType);
                }
                // Otherwise skip - this is likely AI returning full config
              }
            }

            return newSections;
          });
        }
      }

      // Handle section ordering from config.sections
      // Apply order changes to sectionOverrides
      if (configUpdates.sections && Array.isArray(configUpdates.sections)) {
        setSectionOverrides(prev => {
          const newOverrides = { ...prev };

          for (const section of configUpdates.sections!) {
            const sectionId = section.type; // Use type as the section ID
            if (!sectionId) continue;

            // Initialize override if not exists
            if (!newOverrides[sectionId]) {
              newOverrides[sectionId] = {};
            }

            // Apply order if provided
            if (typeof section.order === 'number') {
              newOverrides[sectionId] = {
                ...newOverrides[sectionId],
                order: section.order,
              };
            }

            // Apply column if provided
            if (section.column === 'main' || section.column === 'sidebar') {
              newOverrides[sectionId] = {
                ...newOverrides[sectionId],
                column: section.column,
              };
            }

            // Apply variant if provided
            if (section.variant) {
              newOverrides[sectionId] = {
                ...newOverrides[sectionId],
                variant: section.variant,
              };
            }
          }

          return newOverrides;
        });
      }

      // Handle color changes
      if (configUpdates.colors) {
        setThemeColors(prev => ({
          ...prev,
          ...(configUpdates.colors!.primary && { primary: configUpdates.colors!.primary }),
          ...(configUpdates.colors!.secondary && { secondary: configUpdates.colors!.secondary }),
        }));
      }

      // Handle header showPhoto changes (hide/show profile picture)
      if (configUpdates.header && typeof configUpdates.header.showPhoto === 'boolean') {
        updateStyleOptionExternal('showPhoto', configUpdates.header.showPhoto);
      }

      // Handle component-level config changes (header, skills, experience variants, etc.)
      if (configUpdates.header || configUpdates.skills || configUpdates.experience ||
          configUpdates.education || configUpdates.layout) {
        setSectionOverrides(prev => {
          const newOverrides = { ...prev };

          // Apply header config
          if (configUpdates.header?.variant) {
            newOverrides['header'] = { ...(prev['header'] || {}), variant: configUpdates.header.variant };
          }
          // Apply skills config
          if (configUpdates.skills?.variant) {
            newOverrides['skills'] = { ...(prev['skills'] || {}), variant: configUpdates.skills.variant };
          }
          // Apply experience config
          if (configUpdates.experience?.variant) {
            newOverrides['experience'] = { ...(prev['experience'] || {}), variant: configUpdates.experience.variant };
          }
          // Apply education config
          if (configUpdates.education?.variant) {
            newOverrides['education'] = { ...(prev['education'] || {}), variant: configUpdates.education.variant };
          }

          return newOverrides;
        });
      }

      // Config was handled, we can return if no other sections were updated
      if (!updatedSections || updatedSections.length === 0 ||
          (updatedSections.length === 1 && updatedSections[0] === 'config')) {
        return;
      }
    }

    // Apply variant changes if any (legacy support)
    if (variantChanges && variantChanges.length > 0) {
      setSectionOverrides(prev => {
        const newOverrides = { ...prev };
        for (const change of variantChanges) {
          // Update the section override with new variant
          newOverrides[change.section] = {
            ...(prev[change.section] || {}),
            variant: change.variant,
          };
        }
        return newOverrides;
      });
    }

    // Only process sections that were ACTUALLY updated by the AI
    if (!updatedSections || updatedSections.length === 0) {
      return;
    }

    // Map AI section names to our internal section IDs
    // Using switch-case for robustness and explicit handling
    const sectionsToEnable: string[] = [];

    for (const section of updatedSections) {
      switch (section) {
        // Personal info related sections
        case 'personalInfo':
          // Personal info doesn't need enabling, it's always visible
          // But if summary was updated, enable the summary section
          if (payload.updates.personalInfo?.summary) {
            sectionsToEnable.push('summary');
          }
          break;
        case 'summary':
          sectionsToEnable.push('summary');
          break;

        // Core resume sections
        case 'experience':
          sectionsToEnable.push('experience');
          break;
        case 'education':
          sectionsToEnable.push('education');
          break;
        case 'skills':
          sectionsToEnable.push('skills');
          break;
        case 'languages':
          sectionsToEnable.push('languages');
          break;
        case 'certifications':
          sectionsToEnable.push('certifications');
          break;
        case 'projects':
          sectionsToEnable.push('projects');
          break;

        // Additional sections
        case 'achievements':
          sectionsToEnable.push('achievements');
          break;
        case 'strengths':
          sectionsToEnable.push('strengths');
          break;
        case 'awards':
          sectionsToEnable.push('awards');
          break;
        case 'publications':
          sectionsToEnable.push('publications');
          break;
        case 'volunteer':
          sectionsToEnable.push('volunteer');
          break;
        case 'speaking':
          sectionsToEnable.push('speaking');
          break;
        case 'patents':
          sectionsToEnable.push('patents');
          break;
        case 'interests':
          sectionsToEnable.push('interests');
          break;
        case 'references':
          sectionsToEnable.push('references');
          break;
        case 'courses':
          sectionsToEnable.push('courses');
          break;

        // Custom sections - enable each by their individual ID
        case 'customSections':
          // Custom sections have dynamic IDs, enable each one
          if (data.customSections && data.customSections.length > 0) {
            data.customSections.forEach((customSection: { id: string; title?: string }) => {
              sectionsToEnable.push(customSection.id);
            });
          }
          break;

        default:
          // Unknown section - skip
          break;
      }
    }

    // Enable only the sections that were actually updated
    if (sectionsToEnable.length > 0) {
      setEnabledSections(prev => {
        const newSections = sectionsToEnable.filter(s => !prev.includes(s));
        if (newSections.length > 0) {
          return [...prev, ...newSections];
        }
        return prev;
      });
    }
  }, []);

  // Download PDF - uses hidden clean preview (form editor mode) for PDF generation
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Use the hidden PDF preview element which always renders with editable={false}
      // This ensures clean output without editing UI or placeholders
      // Create custom PDF config for this template
      const pdfConfig = PDF_STYLES.merge({
        skills: {
          label: {
            family: 'inherit',
            size: '13px',
            weight: 500,
            lineHeight: 1.4,
            color: '#191d24',
          },
          tag: {
            family: 'inherit',
            size: '11px',
            weight: 500,
            lineHeight: 1.4,
            color: '#4b5563',
            padding: '3px 10px', // Match template config
            borderRadius: '0', // Match template config
            background: 'transparent', // Match template config
          },
        },
      });

      await generatePDFFromPreview(
        'resume-preview-pdf-v2',
        `${resumeData.personalInfo.fullName || 'Resume'}.pdf`,
        { themeColor, config: pdfConfig }
      );

      // Increment download count in stats
      incrementDownloadsCount().catch(console.error);

      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download resume');
    } finally {
      setIsDownloading(false);
    }
  };

  // Get all sections for reorder dialog (config sections + dynamic sections from resumeData)
  // Only returns enabled sections with correct order and column from sectionOverrides
  const getAllSectionsForReorder = useCallback(() => {
    // Apply enabled state and sectionOverrides to config sections
    const configSections = config.sections.map(s => {
      const override = sectionOverrides[s.id];
      return {
        ...s,
        enabled: enabledSections.includes(s.id),
        order: override?.order ?? s.order,
        column: override?.column ?? s.column,
        pageBreakBefore: override?.pageBreakBefore ?? false,
      };
    });

    const configIds = new Set(configSections.map(s => s.id));
    const configTitles = new Set(configSections.map(s => (s.title || s.id).toLowerCase()));

    // Add dynamic sections from resumeData that aren't in config
    const dynamicSections: typeof configSections = [];
    (resumeData.customSections || []).forEach((s, idx) => {
      const titleLower = (s.title || s.id || '').toLowerCase();
      if (configIds.has(s.id)) return;
      if (configTitles.has(titleLower)) return;

      // Infer column based on title
      const inferredColumn: 'main' | 'sidebar' =
        (titleLower.includes('strength') || titleLower.includes('achievement'))
          ? 'sidebar'
          : 'main';

      // Get order from overrides or append after existing
      const existingOrder = sectionOverrides[s.id]?.order;
      const maxOrder = Math.max(...configSections.map(cs => cs.order ?? 0), 0);

      dynamicSections.push({
        type: 'custom',
        id: s.id,
        title: s.title || s.id,
        defaultTitle: s.title || s.id,
        enabled: enabledSections.includes(s.id),
        order: existingOrder ?? maxOrder + idx + 1,
        column: sectionOverrides[s.id]?.column || inferredColumn,
        pageBreakBefore: sectionOverrides[s.id]?.pageBreakBefore ?? false,
      });
    });

    // Return only enabled sections, sorted by order
    return [...configSections, ...dynamicSections]
      .filter(s => s.enabled)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [config.sections, resumeData.customSections, sectionOverrides, enabledSections]);

  // Get all sections for ManageSectionsModal (includes both enabled and disabled)
  const getAllSectionsForManage = useCallback(() => {
    // Apply enabled state and sectionOverrides to config sections
    const configSections = config.sections
      .filter(s => s.type !== 'header') // Exclude header from management
      .map(s => {
        const override = sectionOverrides[s.id];
        return {
          ...s,
          enabled: enabledSections.includes(s.id),
          order: override?.order ?? s.order,
          column: override?.column ?? s.column,
          variant: override?.variant ?? s.variant,
        };
      });

    const configIds = new Set(configSections.map(s => s.id));
    const configTitles = new Set(configSections.map(s => (s.title || s.id).toLowerCase()));

    // Add dynamic/custom sections from resumeData
    const dynamicSections: typeof configSections = [];
    (resumeData.customSections || []).forEach((s, idx) => {
      const titleLower = (s.title || s.id || '').toLowerCase();
      if (configIds.has(s.id)) return;
      if (configTitles.has(titleLower)) return;

      const maxOrder = Math.max(...configSections.map(cs => cs.order ?? 0), 0);
      dynamicSections.push({
        type: 'custom',
        id: s.id,
        title: s.title || s.id,
        defaultTitle: s.title || s.id,
        enabled: enabledSections.includes(s.id),
        order: sectionOverrides[s.id]?.order ?? maxOrder + idx + 1,
        column: sectionOverrides[s.id]?.column || 'main',
        variant: sectionOverrides[s.id]?.variant,
      });
    });

    // Return all sections sorted by order
    return [...configSections, ...dynamicSections]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [config.sections, resumeData.customSections, sectionOverrides, enabledSections]);

  // Get all sections for the form - includes both config sections AND dynamic sections from resumeData
  // This ensures sections like projects, publications, languages etc. show in the form when they have data
  const sectionsForForm = React.useMemo(() => {
    // Start with config sections, but mark them as enabled based on enabledSections state
    const baseSections = config.sections.map(s => ({
      ...s,
      enabled: enabledSections.includes(s.id),
    }));
    const existingIds = new Set(baseSections.map(s => s.id));
    const existingTypes = new Set(baseSections.map(s => s.type));

    // Standard section types that can be dynamically added if they have data
    const standardSectionTypes: Array<{
      type: string;
      id: string;
      title: string;
      hasData: () => boolean;
      defaultColumn: 'main' | 'sidebar';
    }> = [
      { type: 'projects', id: 'projects', title: 'Projects', hasData: () => (resumeData.projects?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'certifications', id: 'certifications', title: 'Certifications', hasData: () => (resumeData.certifications?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'awards', id: 'awards', title: 'Awards', hasData: () => (resumeData.awards?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'publications', id: 'publications', title: 'Publications', hasData: () => (resumeData.publications?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'volunteer', id: 'volunteer', title: 'Volunteer Experience', hasData: () => (resumeData.volunteer?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'speaking', id: 'speaking', title: 'Speaking Engagements', hasData: () => (resumeData.speaking?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'patents', id: 'patents', title: 'Patents', hasData: () => (resumeData.patents?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'interests', id: 'interests', title: 'Interests', hasData: () => (resumeData.interests?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'references', id: 'references', title: 'References', hasData: () => (resumeData.references?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'courses', id: 'courses', title: 'Courses', hasData: () => (resumeData.courses?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'languages', id: 'languages', title: 'Languages', hasData: () => (resumeData.languages?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'strengths', id: 'strengths', title: 'Core Strengths', hasData: () => (resumeData.strengths?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'achievements', id: 'achievements', title: 'Achievements', hasData: () => (resumeData.achievements?.length || 0) > 0, defaultColumn: 'sidebar' },
    ];

    // Add dynamic standard sections that have data but aren't in template config
    const dynamicSections: typeof baseSections = [];
    const maxOrder = Math.max(...baseSections.map(s => s.order ?? 0), 0);

    standardSectionTypes.forEach((sectionDef, idx) => {
      // Skip if already in config (either by id or type)
      if (existingIds.has(sectionDef.id) || existingTypes.has(sectionDef.type as SectionType)) {
        return;
      }

      // Skip if no data
      if (!sectionDef.hasData()) {
        return;
      }

      // Skip if not in enabledSections
      if (!enabledSections.includes(sectionDef.id)) {
        return;
      }

      dynamicSections.push({
        type: sectionDef.type as any,
        id: sectionDef.id,
        title: sectionDef.title,
        defaultTitle: sectionDef.title,
        enabled: true,
        order: maxOrder + idx + 1,
        column: sectionDef.defaultColumn,
      });
    });

    // Also add custom sections that have data
    (resumeData.customSections || []).forEach((s: { id: string; title: string }, idx: number) => {
      if (existingIds.has(s.id)) return;
      if (!enabledSections.includes(s.id)) return;

      dynamicSections.push({
        type: 'custom' as any,
        id: s.id,
        title: s.title || s.id,
        defaultTitle: s.title || s.id,
        enabled: true,
        order: maxOrder + standardSectionTypes.length + idx + 1,
        column: 'main',
      });
    });

    const result = [...baseSections, ...dynamicSections];
    return result;
  }, [config.sections, resumeData, enabledSections]);

  // Build section variants map from ADDABLE_SECTIONS for use in form editor
  // ADDABLE_SECTIONS includes CORE_SECTIONS (experience, education, skills) + all addable sections
  const sectionVariantsMap = React.useMemo(() => {
    const map: Record<string, { id: string; name: string; description: string }[]> = {};
    ADDABLE_SECTIONS.forEach(section => {
      if (section.variants && section.variants.length > 0) {
        map[section.id] = section.variants;
      }
    });
    return map;
  }, []);

  // Section management panel
  const renderSectionManager = () => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">Sections</h3>
      <p className="text-xs text-gray-500">Toggle sections on/off and edit their titles</p>
      
      <div className="space-y-2 mt-3">
        {config.sections
          .filter(s => s.type !== 'header')
          .sort((a, b) => a.order - b.order)
          .map(section => (
            <div
              key={section.id}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg border transition-colors",
                enabledSections.includes(section.id)
                  ? "bg-white border-gray-200"
                  : "bg-gray-50 border-gray-100 opacity-60"
              )}
            >
              <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
              
              <Switch
                checked={enabledSections.includes(section.id)}
                onCheckedChange={() => handleToggleSection(section.id)}
                className="data-[state=checked]:bg-cyan-600"
              />
              
              {editingLabelId === section.id ? (
                <div className="flex-1 flex items-center gap-1">
                  <Input
                    value={editingLabelValue}
                    onChange={(e) => setEditingLabelValue(e.target.value)}
                    className="h-7 text-sm"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateLabel(section.id, editingLabelValue);
                      } else if (e.key === 'Escape') {
                        setEditingLabelId(null);
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => handleUpdateLabel(section.id, editingLabelValue)}
                  >
                    <Check className="w-3 h-3 text-green-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => setEditingLabelId(null)}
                  >
                    <X className="w-3 h-3 text-red-600" />
                  </Button>
                </div>
              ) : (
                <>
                  <span className="flex-1 text-sm font-medium">
                    {sectionLabels[section.id] || section.title}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100"
                    onClick={() => {
                      setEditingLabelId(section.id);
                      setEditingLabelValue(sectionLabels[section.id] || section.title);
                    }}
                  >
                    <Edit2 className="w-3 h-3 text-gray-500" />
                  </Button>
                </>
              )}
              
              <span className="text-xs text-gray-400 capitalize">
                {section.column || 'main'}
              </span>
            </div>
          ))}
      </div>
    </div>
  );

  // Show loading state while fetching resume
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading your resume...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Smart Header - Hides on scroll down, shows on scroll up */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-transform duration-300",
          headerVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <Header />
      </div>

      <StyleOptionsProvider>
        {/* Main Content */}
        <div className={cn(
          "min-h-screen transition-all duration-300 overflow-x-hidden",
          "pt-0 lg:pt-[72px]", // No top padding on mobile (fixed elements handle it), desktop needs space for header
          "pb-0 lg:pb-8" // No bottom padding on mobile, only on desktop
        )}>

          {/* Mobile Header with Back, Tabs, and Actions - Fixed below main header */}
          <div className="lg:hidden fixed top-[56px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
            {/* Top row: Back + AI buttons + Download */}
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-gray-100">
              {/* Back Button */}
              <button
                onClick={() => {
                  const referrer = sessionStorage.getItem('template-referrer') || '/templates';
                  const selectedTemplate = sessionStorage.getItem('selected-template');
                  if (selectedTemplate) {
                    navigate(`${referrer}?highlight=${selectedTemplate}`);
                  } else {
                    navigate(referrer);
                  }
                }}
                className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Center: AI Buttons */}
              <div className="flex items-center gap-1.5">
                {/* TODO: Re-enable when AI Enhancement is fixed
                <button
                  data-tour="mobile-ai-btn"
                  onClick={() => setShowEnhanceModal(true)}
                  className="h-7 px-2.5 flex items-center gap-1 rounded-lg text-white font-medium text-xs shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)',
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI</span>
                </button>
                */}
                <button
                  onClick={() => setShowJobTailorModal(true)}
                  className="h-7 px-2.5 flex items-center gap-1 rounded-lg text-white font-medium text-xs shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  }}
                >
                  <Target className="w-3 h-3" />
                  <span>Job</span>
                </button>
{/* ATS Button - Hidden for refinement */}
                {/* TODO: Re-enable when ATS checker is refined
                <button
                  onClick={() => setShowATSPanel(true)}
                  className="h-7 px-2.5 flex items-center gap-1 rounded-lg text-white font-medium text-xs shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  }}
                >
                  <FileCheck className="w-3 h-3" />
                  <span>ATS</span>
                </button>
                */}
              </div>

              {/* Right: Color + Download */}
              <div className="flex items-center gap-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all duration-200">
                      <div
                        className="w-5 h-5 rounded-full shadow-sm ring-1 ring-gray-200"
                        style={{ backgroundColor: themeColors.primary || themeColor }}
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-auto p-3 rounded-xl shadow-xl">
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        '#1a365d', '#1e40af', '#2563eb', '#0891b2', '#0284c7',
                        '#0f766e', '#0d9488', '#059669', '#16a34a', '#15803d',
                        '#7c2d12', '#b45309', '#9f1239', '#be185d', '#a21caf',
                        '#6d28d9', '#7c3aed', '#4338ca', '#4f46e5', '#6366f1',
                      ].map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            setThemeColor(color);
                            setThemeColors({ ...themeColors, primary: color });
                          }}
                          className={cn(
                            "w-8 h-8 rounded-full transition-all duration-150 hover:scale-110",
                            (themeColors.primary || themeColor) === color
                              ? "ring-2 ring-offset-2 ring-gray-900 shadow-lg"
                              : "shadow-sm hover:shadow-md"
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  data-tour="mobile-download-btn"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                >
                  {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Bottom row: Tabs */}
            <div className="flex items-center px-2 py-1.5 gap-1 bg-gray-50">
              <button
                data-tour="mobile-form-tab"
                onClick={() => setMobileView('form')}
                className={cn(
                  "flex-1 h-8 flex items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  mobileView === 'form'
                    ? "bg-white shadow-sm text-primary"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                )}
              >
                <FileEdit className="h-3.5 w-3.5" />
                Form
              </button>
              <button
                data-tour="mobile-live-tab"
                onClick={() => setMobileView('live')}
                className={cn(
                  "flex-1 h-8 flex items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  mobileView === 'live'
                    ? "bg-white shadow-sm text-primary"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                )}
              >
                <Edit3 className="h-3.5 w-3.5" />
                Live Edit
              </button>
              <button
                data-tour="mobile-preview-tab"
                onClick={() => setMobileView('preview')}
                className={cn(
                  "flex-1 h-8 flex items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  mobileView === 'preview'
                    ? "bg-white shadow-sm text-primary"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                )}
              >
                <Eye className="h-3.5 w-3.5" />
                Preview
              </button>
            </div>
          </div>

          {/* Desktop Unified Toolbar - Fixed at top, adjusts position based on header visibility */}
          <TooltipProvider delayDuration={100}>
            <div
              className={cn(
                "hidden lg:block fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300",
                headerVisible ? "top-[72px]" : "top-0 shadow-md"
              )}
            >
              <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between py-2 gap-4">
                  {/* Left Section: Back + Mode Toggle */}
                  <div className="flex items-center gap-3">
                    {/* Logo when header is hidden */}
                    {!headerVisible && (
                      <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-900 hover:opacity-80 transition-opacity"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                      </button>
                    )}

                    {/* Back Button */}
                    <button
                      onClick={() => {
                        const referrer = sessionStorage.getItem('template-referrer') || '/templates';
                        const selectedTemplate = sessionStorage.getItem('selected-template');
                        if (selectedTemplate) {
                          navigate(`${referrer}?highlight=${selectedTemplate}`);
                        } else {
                          navigate(referrer);
                        }
                      }}
                      className="h-9 px-3 flex items-center gap-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="text-sm font-medium">Back</span>
                    </button>

                    {/* Separator */}
                    <div className="h-5 w-px bg-gray-200" />

                    {/* Mode Toggle - Primary action */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                      <button
                        data-tour="form-mode"
                        onClick={() => setEditorMode('form')}
                        className={cn(
                          "h-8 px-4 flex items-center gap-1.5 rounded-md text-sm font-medium transition-all duration-200",
                          editorMode === 'form'
                            ? "bg-white shadow-sm text-primary"
                            : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        <FileEdit className="h-3.5 w-3.5" />
                        Form
                      </button>
                      <button
                        data-tour="live-mode"
                        onClick={() => setEditorMode('live')}
                        className={cn(
                          "h-8 px-4 flex items-center gap-1.5 rounded-md text-sm font-medium transition-all duration-200",
                          editorMode === 'live'
                            ? "bg-white shadow-sm text-primary"
                            : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        Live
                      </button>
                    </div>
                  </div>

                  {/* Center Section: AI Features (most prominent) */}
                  <div className="flex items-center gap-2">
                    {/* TODO: Re-enable when AI Enhancement is fixed
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          data-tour="enhance-ai"
                          onClick={() => {
                            if (!user || !isPro) {
                              setProModalFeature({
                                name: 'AI Enhancement',
                                description: 'AI-powered resume improvement to make your resume stand out',
                              });
                              setShowProModal(true);
                            } else {
                              setShowEnhanceModal(true);
                            }
                          }}
                          className="h-9 px-4 flex items-center gap-2 rounded-lg text-white font-medium text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shadow-md hover:shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)',
                          }}
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Enhance with AI</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-gray-900 text-white border-0">
                        <p>AI-powered resume improvement</p>
                      </TooltipContent>
                    </Tooltip>
                    */}

                    {/* Tailor for Job Button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          data-tour="tailor-job"
                          onClick={() => {
                            if (!user || !isPro) {
                              setProModalFeature({
                                name: 'Job Tailoring',
                                description: 'Optimize your resume for specific job descriptions',
                              });
                              setShowProModal(true);
                            } else {
                              setShowJobTailorModal(true);
                            }
                          }}
                          className="h-9 px-4 flex items-center gap-2 rounded-lg text-white font-medium text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shadow-md hover:shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          }}
                        >
                          <Target className="w-4 h-4" />
                          <span>Tailor for Job</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-gray-900 text-white border-0">
                        <p>Optimize resume for a specific job</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Practice Interview Button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          data-tour="mock-interview"
                          onClick={() => {
                            if (!user || !isPro) {
                              setProModalFeature({
                                name: 'Practice Interview',
                                description: 'AI-generated interview questions based on your resume with real-time feedback',
                              });
                              setShowProModal(true);
                            } else {
                              setShowMockInterview(true);
                            }
                          }}
                          className="h-9 px-4 flex items-center gap-2 rounded-lg text-white font-medium text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shadow-md hover:shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Practice Interview</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-gray-900 text-white border-0">
                        <p>Practice with AI-generated interview questions</p>
                      </TooltipContent>
                    </Tooltip>

{/* ATS Score Button - Hidden for refinement */}
                    {/* TODO: Re-enable when ATS checker is refined
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          data-tour="ats-score"
                          onClick={() => {
                            if (!user || !isPro) {
                              setProModalFeature({
                                name: 'ATS Score Checker',
                                description: 'Analyze your resume for ATS compatibility and get improvement tips',
                              });
                              setShowProModal(true);
                            } else {
                              setShowATSPanel(true);
                            }
                          }}
                          className="h-9 px-4 flex items-center gap-2 rounded-lg text-white font-medium text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shadow-md hover:shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          }}
                        >
                          <FileCheck className="w-4 h-4" />
                          <span>ATS Score</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-gray-900 text-white border-0">
                        <p>Check ATS compatibility score</p>
                      </TooltipContent>
                    </Tooltip>
                    */}

                  </div>

                  {/* Right Section: Customization + Actions */}
                  <div className="flex items-center gap-2">
                    {/* Font Selector - Directly visible */}
                    <div className="w-32" data-tour="font-selector">
                      <FontSelector
                        selectedFont={selectedFont}
                        onFontChange={setSelectedFont}
                      />
                    </div>

                    {/* Color Picker - Quick access */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <button data-tour="color-picker" className="h-9 px-2.5 flex items-center gap-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 transition-all duration-200">
                          <div
                            className="w-5 h-5 rounded-full shadow-sm ring-1 ring-gray-200"
                            style={{ backgroundColor: themeColors.primary || themeColor }}
                          />
                          <ChevronDown className="h-3 w-3 text-gray-400" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-auto p-3 rounded-xl shadow-xl">
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            '#1a365d', '#1e40af', '#2563eb', '#0891b2', '#0284c7',
                            '#0f766e', '#0d9488', '#059669', '#16a34a', '#15803d',
                            '#7c2d12', '#b45309', '#9f1239', '#be185d', '#a21caf',
                            '#6d28d9', '#7c3aed', '#4338ca', '#4f46e5', '#6366f1',
                          ].map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                setThemeColor(color);
                                setThemeColors({ ...themeColors, primary: color });
                              }}
                              className={cn(
                                "w-7 h-7 rounded-full transition-all duration-150 hover:scale-110",
                                (themeColors.primary || themeColor) === color
                                  ? "ring-2 ring-offset-2 ring-gray-900"
                                  : "hover:ring-1 hover:ring-gray-300"
                              )}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                          <input
                            type="color"
                            value={themeColors.primary || themeColor}
                            onChange={(e) => {
                              setThemeColor(e.target.value);
                              setThemeColors({ ...themeColors, primary: e.target.value });
                            }}
                            className="w-7 h-7 rounded cursor-pointer border-0 p-0"
                          />
                          <Input
                            type="text"
                            value={themeColors.primary || themeColor}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                                setThemeColor(val);
                                setThemeColors({ ...themeColors, primary: val });
                              }
                            }}
                            placeholder="#1a365d"
                            className="h-7 text-xs font-mono w-20"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Separator */}
                    <div className="h-5 w-px bg-gray-200" />

                    {/* Template Button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          data-tour="template-btn"
                          onClick={() => setShowTemplateSelector(true)}
                          className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 transition-all duration-200"
                        >
                          <Layout className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Change template</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Sections Button - Opens Manage Sections Modal */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          data-tour="sections-menu"
                          onClick={() => setShowManageSections(true)}
                          className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 transition-all duration-200"
                          title="Manage sections"
                        >
                          <Layers className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Manage sections</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Styling Button */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          data-tour="styling-menu"
                          className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 transition-all duration-200"
                          title="Advanced styling"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="end" side="bottom" className="w-96 p-0 shadow-xl rounded-xl max-h-[80vh] overflow-y-auto">
                        <StyleOptionsPanelV2
                          inPopover={true}
                          resumeData={resumeData}
                          enabledSections={enabledSections}
                          onToggleSection={handleToggleSection}
                        />
                      </PopoverContent>
                    </Popover>

                    {/* Sync from Profile Button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleSyncFromProfile}
                          disabled={isSyncingProfile}
                          className="h-9 px-3 flex items-center gap-1.5 rounded-lg text-purple-600 border border-purple-200 bg-purple-50 hover:bg-purple-100 transition-all duration-200 disabled:opacity-50"
                        >
                          {isSyncingProfile ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">Sync Profile</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Load data from your profile</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Separator before actions */}
                    <div className="h-5 w-px bg-gray-200" />

                    {/* Save Button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          data-tour="save-btn"
                          onClick={() => {
                            if (!user) {
                              setProModalFeature({
                                name: 'Save Resume',
                                description: 'Sign in to save your resume and access it from anywhere',
                              });
                              setShowProModal(true);
                            } else {
                              handleSaveClick();
                            }
                          }}
                          disabled={isSaving}
                          className={cn(
                            "h-9 px-3 flex items-center gap-1.5 rounded-lg border transition-all duration-200",
                            hasUnsavedChanges
                              ? "text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100"
                              : "text-gray-600 border-gray-200 hover:bg-gray-100"
                          )}
                        >
                          {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">Save</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-gray-900 text-white border-0">
                        {user ? (hasUnsavedChanges ? 'Save Changes' : 'Saved') : 'Sign in to Save'}
                      </TooltipContent>
                    </Tooltip>

                    {/* Download Button */}
                    <Button
                      data-tour="download-btn"
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="h-9 px-4 gap-2 rounded-lg bg-primary hover:bg-primary/90"
                    >
                      {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                      <span className="text-sm font-medium">Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>

          {/* Main Content Grid - Add top margin for fixed headers */}
          <div className={cn(
            // When chat is open, use full width with justified content
            isChatMode
              ? "w-full px-4 lg:px-6"
              : "container mx-auto px-3 sm:px-4 lg:px-4",
            "pt-2 pb-2 lg:pt-3 lg:pb-4", // Padding top/bottom
            "mt-[136px] lg:mt-[56px]", // Space for fixed elements (mobile: 56px header + 80px toolbar = 136px, desktop: 56px for toolbar - parent handles header)
            editorMode === 'form'
              ? "flex lg:gap-4 items-start"
              : "flex justify-center",
            // When chat is open, center the content and use tighter gap
            isChatMode && "lg:justify-center lg:gap-5"
          )}>

            {/* Form Panel - Hidden when chat mode is open */}
            {/* Sticky so form stays visible while scrolling resume preview */}
            {!isChatMode && (
              <div className={cn(
                "w-full lg:w-[480px] xl:w-[520px] flex-shrink-0",
                // Height: 100vh minus toolbar and header
                headerVisible ? "lg:h-[calc(100vh-140px)]" : "lg:h-[calc(100vh-80px)]",
                "h-auto",
                // Sticky positioning - stays below the fixed toolbar
                "lg:sticky",
                headerVisible ? "lg:top-[132px]" : "lg:top-[68px]",
                // Combined visibility logic
                // Desktop: only show when editorMode is 'form'
                // Mobile: only show when mobileView is 'form'
                editorMode === 'form'
                  ? (mobileView === 'form' ? "block" : "hidden lg:block")
                  : (mobileView === 'form' ? "block lg:hidden" : "hidden")
              )}>
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm h-full flex flex-col overflow-hidden">
                  {useNewForm ? (
                    <EnhancedForm
                      resumeData={resumeData}
                      onResumeDataChange={setResumeData}
                      enabledSections={sectionsForForm}
                      sectionTitles={sectionLabels}
                      templateConfig={config}
                      accentColor="#0891b2"
                      onOpenAddSection={() => setShowAddSectionModal(true)}
                      hideHeader={true}
                      sectionOverrides={sectionOverrides}
                      onChangeSectionVariant={handleChangeSectionVariant}
                      sectionVariants={sectionVariantsMap}
                    />
                  ) : (
                    <div className="flex-1 overflow-hidden">
                      <div className="p-3 lg:p-4 h-full overflow-y-auto">
                        <ResumeForm
                          resumeData={resumeData as any}
                          setResumeData={setResumeData as any}
                          templateId={templateId}
                          enabledSections={enabledSections}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Resume Preview */}
            <TooltipProvider delayDuration={100}>
              <div className={cn(
                "relative flex items-start",
                // When chat is open, don't use flex-1 so it stays compact
                isChatMode
                  ? "lg:justify-start"
                  : editorMode === 'form' ? "flex-1 lg:justify-start" : "w-full justify-center",
                // Hide on mobile when form view is active (show for live and preview)
                mobileView === 'form' ? "hidden lg:flex" : "flex justify-center",
                // Keep centered in live mode on desktop
                editorMode !== 'form' && !isChatMode && "lg:justify-center",
                // Match the form panel's height and overflow behavior
                "lg:overflow-y-auto lg:overflow-x-hidden",
                headerVisible ? "lg:h-[calc(100vh-140px)]" : "lg:h-[calc(100vh-80px)]"
              )}>
                {/* Resume Column */}
                <div className="flex flex-col w-full lg:w-auto">
                  {/* Resume Document */}
                  <div className="relative w-full overflow-visible">
                    {/* Mobile: Scale container to fit screen width */}
                    <div
                      className="lg:hidden w-full mb-20"
                      ref={mobileContainerRef}
                      style={{
                        // Set container height to match scaled resume height dynamically
                        height: `${mobileResumeHeight * mobileScale}px`,
                      }}
                    >
                      <div
                        className="origin-top-left"
                        style={{
                          transform: `scale(${mobileScale})`,
                          transformOrigin: 'top left',
                          width: '210mm',
                        }}
                      >
                        <StyleOptionsWrapper>
                          <div
                            id="resume-preview-v2-mobile"
                            ref={mobileResumeRef}
                            className="bg-white shadow-xl rounded-lg overflow-visible ring-1 ring-gray-200"
                            style={{
                              width: '210mm',
                            }}
                          >
                            <InlineEditProvider
                              resumeData={resumeData as any}
                              setResumeData={setResumeData as any}
                            >
                              <ResumeRenderer
                                resumeData={resumeData}
                                templateId={templateId}
                                themeColors={themeColors}
                                sectionOverrides={sectionOverrides}
                                editable={mobileView === 'live'}
                                sectionLabels={sectionLabels}
                                enabledSections={enabledSections}
                                fontFamily={selectedFont}
                                onAddBulletPoint={handleAddBulletPoint}
                                onRemoveBulletPoint={handleRemoveBulletPoint}
                                onAddExperience={handleAddExperience}
                                onRemoveExperience={handleRemoveExperience}
                                onAddEducation={handleAddEducation}
                                onRemoveEducation={handleRemoveEducation}
                                onAddCustomSectionItem={handleAddCustomSectionItem}
                                onRemoveCustomSectionItem={handleRemoveCustomSectionItem}
                                onAddLanguage={handleAddLanguage}
                                onRemoveLanguage={handleRemoveLanguage}
                                onUpdateLanguage={handleUpdateLanguage}
                                onAddStrength={handleAddStrength}
                                onRemoveStrength={handleRemoveStrength}
                                onAddAchievement={handleAddAchievement}
                                onRemoveAchievement={handleRemoveAchievement}
                                onAddProject={handleAddProject}
                                onRemoveProject={handleRemoveProject}
                                onAddCertification={handleAddCertification}
                                onRemoveCertification={handleRemoveCertification}
                                onAddAward={handleAddAward}
                                onRemoveAward={handleRemoveAward}
                                onAddPublication={handleAddPublication}
                                onRemovePublication={handleRemovePublication}
                                onAddVolunteer={handleAddVolunteer}
                                onRemoveVolunteer={handleRemoveVolunteer}
                                onAddSpeaking={handleAddSpeaking}
                                onRemoveSpeaking={handleRemoveSpeaking}
                                onAddPatent={handleAddPatent}
                                onRemovePatent={handleRemovePatent}
                                onAddInterest={handleAddInterest}
                                onRemoveInterest={handleRemoveInterest}
                                onAddReference={handleAddReference}
                                onRemoveReference={handleRemoveReference}
                                onAddCourse={handleAddCourse}
                                onRemoveCourse={handleRemoveCourse}
                                onAddSkill={handleAddSkill}
                                onRemoveSkill={handleRemoveSkill}
                                onUpdateSkill={handleUpdateSkill}
                                onRemoveSection={handleRemoveSection}
                                onChangeSectionVariant={handleChangeSectionVariant}
                                onOpenAddSection={handleOpenAddSection}
                              />
                            </InlineEditProvider>
                          </div>
                        </StyleOptionsWrapper>
                      </div>
                    </div>

                    {/* Desktop: Full size */}
                    <div className="hidden lg:block">
                      <StyleOptionsWrapper>
                        <div
                          id="resume-preview-v2"
                          ref={previewRef}
                          className="bg-white shadow-xl rounded-lg overflow-visible ring-1 ring-gray-200"
                          style={{
                            width: '210mm',
                            minHeight: '297mm',
                            minWidth: '210mm',
                          }}
                        >
                        <InlineEditProvider
                          resumeData={resumeData as any}
                          setResumeData={setResumeData as any}
                        >
                          <ResumeRenderer
                            resumeData={resumeData}
                            templateId={templateId}
                            themeColors={themeColors}
                            sectionOverrides={sectionOverrides}
                            editable={editorMode === 'live'}
                            sectionLabels={sectionLabels}
                            enabledSections={enabledSections}
                            fontFamily={selectedFont}
                            onAddBulletPoint={handleAddBulletPoint}
                            onRemoveBulletPoint={handleRemoveBulletPoint}
                            onAddExperience={handleAddExperience}
                            onRemoveExperience={handleRemoveExperience}
                            onAddEducation={handleAddEducation}
                            onRemoveEducation={handleRemoveEducation}
                            onAddCustomSectionItem={handleAddCustomSectionItem}
                            onRemoveCustomSectionItem={handleRemoveCustomSectionItem}
                            onAddLanguage={handleAddLanguage}
                            onRemoveLanguage={handleRemoveLanguage}
                            onUpdateLanguage={handleUpdateLanguage}
                            onAddStrength={handleAddStrength}
                            onRemoveStrength={handleRemoveStrength}
                            onAddAchievement={handleAddAchievement}
                            onRemoveAchievement={handleRemoveAchievement}
                            onAddProject={handleAddProject}
                            onRemoveProject={handleRemoveProject}
                            onAddCertification={handleAddCertification}
                            onRemoveCertification={handleRemoveCertification}
                            onAddAward={handleAddAward}
                            onRemoveAward={handleRemoveAward}
                            onAddPublication={handleAddPublication}
                            onRemovePublication={handleRemovePublication}
                            onAddVolunteer={handleAddVolunteer}
                            onRemoveVolunteer={handleRemoveVolunteer}
                            onAddSpeaking={handleAddSpeaking}
                            onRemoveSpeaking={handleRemoveSpeaking}
                            onAddPatent={handleAddPatent}
                            onRemovePatent={handleRemovePatent}
                            onAddInterest={handleAddInterest}
                            onRemoveInterest={handleRemoveInterest}
                            onAddReference={handleAddReference}
                            onRemoveReference={handleRemoveReference}
                            onAddCourse={handleAddCourse}
                            onRemoveCourse={handleRemoveCourse}
                            onAddSkill={handleAddSkill}
                            onRemoveSkill={handleRemoveSkill}
                            onUpdateSkill={handleUpdateSkill}
                            onRemoveSection={handleRemoveSection}
                            onChangeSectionVariant={handleChangeSectionVariant}
                            onOpenAddSection={handleOpenAddSection}
                          />
                          </InlineEditProvider>
                        </div>
                      </StyleOptionsWrapper>
                    </div>
                  </div>
                </div>

                {/* Side toolbar removed - all features now in top toolbar for better discoverability */}
              </div>
            </TooltipProvider>

            {/* Chat Panel - Shows on right side when chat is open (desktop) */}
            {isChatMode && (
              <div className={cn(
                "w-[380px] xl:w-[420px] flex-shrink-0",
                // Height: 100vh minus toolbar and header
                headerVisible ? "lg:h-[calc(100vh-140px)]" : "lg:h-[calc(100vh-80px)]",
                "h-auto",
                // Sticky positioning - stays below the fixed toolbar
                "lg:sticky",
                headerVisible ? "lg:top-[132px]" : "lg:top-[68px]",
                // Hide on mobile - we show full screen overlay instead
                "hidden lg:block"
              )}>
                <ResumeAnimationProvider>
                  <ChatWithResume
                    resumeData={resumeData}
                    config={config as Record<string, unknown>}
                    sectionOverrides={sectionOverrides}
                    enabledSections={enabledSections}
                    sectionLabels={sectionLabels}
                    onResumeDataUpdate={(data) => {
                      setResumeData(data);
                      setHasUnsavedChanges(true);
                    }}
                    onConfigUpdate={(newConfig) => {
                      // Handle theme color changes
                      if (newConfig.colors) {
                        setThemeColors(prev => ({
                          ...prev,
                          ...(newConfig.colors as Record<string, string>)
                        }));
                      }
                      setHasUnsavedChanges(true);
                    }}
                    onSectionOverridesUpdate={(overrides) => {
                      setSectionOverrides(overrides);
                      setHasUnsavedChanges(true);
                    }}
                    onEnabledSectionsUpdate={(sections) => {
                      setEnabledSections(sections);
                      setHasUnsavedChanges(true);
                    }}
                    onSectionLabelsUpdate={(labels) => {
                      setSectionLabels(labels);
                      setHasUnsavedChanges(true);
                    }}
                    onHighlightSections={(sections) => {
                      // Add a visual pulse to the resume preview when sections are updated
                      const previewElement = document.getElementById('resume-preview-v2');
                      if (previewElement && sections.length > 0) {
                        previewElement.classList.add('animate-pulse');
                        previewElement.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.3)';
                        setTimeout(() => {
                          previewElement.classList.remove('animate-pulse');
                          previewElement.style.boxShadow = '';
                        }, 2000);
                      }
                    }}
                    mode="panel"
                    onClose={() => setIsChatMode(false)}
                  />
                </ResumeAnimationProvider>
              </div>
            )}
          </div>

          {/* Mobile Chat Overlay - Floating panel with dimmed backdrop */}
          {isChatMode && (
            <>
              {/* Backdrop - dimmed so resume is visible behind */}
              <div
                className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
                onClick={() => setIsChatMode(false)}
              />
              {/* Chat panel floats on top */}
              <div className="lg:hidden fixed inset-0 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                  <ResumeAnimationProvider>
                    <ChatWithResume
                      resumeData={resumeData}
                      config={config as Record<string, unknown>}
                      sectionOverrides={sectionOverrides}
                      enabledSections={enabledSections}
                      sectionLabels={sectionLabels}
                      onResumeDataUpdate={(data) => {
                        setResumeData(data);
                        setHasUnsavedChanges(true);
                      }}
                      onConfigUpdate={(newConfig) => {
                        // Handle theme color changes
                        if (newConfig.colors) {
                          setThemeColors(prev => ({
                            ...prev,
                            ...(newConfig.colors as Record<string, string>)
                          }));
                        }
                        setHasUnsavedChanges(true);
                      }}
                      onSectionOverridesUpdate={(overrides) => {
                        setSectionOverrides(overrides);
                        setHasUnsavedChanges(true);
                      }}
                      onEnabledSectionsUpdate={(sections) => {
                        setEnabledSections(sections);
                        setHasUnsavedChanges(true);
                      }}
                      onSectionLabelsUpdate={(labels) => {
                        setSectionLabels(labels);
                        setHasUnsavedChanges(true);
                      }}
                      onHighlightSections={(sections) => {
                        const previewElement = document.getElementById('resume-preview-v2-mobile');
                        if (previewElement && sections.length > 0) {
                          previewElement.classList.add('animate-pulse');
                          previewElement.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.3)';
                          setTimeout(() => {
                            previewElement.classList.remove('animate-pulse');
                            previewElement.style.boxShadow = '';
                          }, 2000);
                        }
                      }}
                      mode="panel"
                      onClose={() => setIsChatMode(false)}
                    />
                  </ResumeAnimationProvider>
                </div>
              </div>
            </>
          )}

          {/* Mobile Bottom Bar - Fixed at bottom */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-2 safe-area-inset-bottom">
            <div className="flex items-center justify-between gap-1">
              {/* Template */}
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-200"
                title="Change template"
              >
                <Layout className="h-5 w-5 text-gray-600" />
              </button>

              {/* Font Selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-200"
                    title="Change font"
                  >
                    <Type className="h-5 w-5 text-gray-600" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" side="top" className="w-48 p-2 shadow-xl rounded-xl mb-2">
                  <div className="text-xs font-medium text-gray-500 mb-2 px-2">Font Family</div>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {RESUME_FONTS.map((font) => (
                      <button
                        key={font.family}
                        onClick={() => setSelectedFont(font.family)}
                        className={cn(
                          "w-full px-2 py-1.5 text-left text-sm rounded-lg transition-colors",
                          selectedFont === font.family
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                        style={{ fontFamily: font.family }}
                      >
                        {font.name}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Sections - Opens Manage Sections Modal */}
              <button
                onClick={() => setShowManageSections(true)}
                className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-200"
                title="Manage sections"
              >
                <Layers className="h-5 w-5 text-gray-600" />
              </button>

              {/* Sync from Profile */}
              <button
                onClick={handleSyncFromProfile}
                disabled={isSyncingProfile}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all duration-200 disabled:opacity-50"
                title="Sync from Profile"
              >
                {isSyncingProfile ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <RefreshCw className="h-5 w-5" />
                )}
              </button>

              {/* Settings/Styling */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-200"
                    title="Styling options"
                  >
                    <Settings className="h-5 w-5 text-gray-600" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="center" side="top" className="w-80 p-0 shadow-xl rounded-xl max-h-[60vh] overflow-y-auto mb-2">
                  <StyleOptionsPanelV2
                    inPopover={true}
                    resumeData={resumeData}
                    enabledSections={enabledSections}
                    onToggleSection={handleToggleSection}
                  />
                </PopoverContent>
              </Popover>

              {/* Save */}
              <button
                onClick={() => {
                  if (!user) {
                    setProModalFeature({
                      name: 'Save Resume',
                      description: 'Sign in to save your resume and access it from anywhere',
                    });
                    setShowProModal(true);
                  } else {
                    handleSaveClick();
                  }
                }}
                disabled={isSaving}
                className={cn(
                  "h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-200",
                  hasUnsavedChanges
                    ? "bg-amber-50 text-amber-600"
                    : "hover:bg-gray-100 text-gray-600"
                )}
                title={hasUnsavedChanges ? "Save changes" : "Saved"}
              >
                {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              </button>

              {/* Download */}
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                size="icon"
                className="h-10 w-10 rounded-xl"
                title="Download PDF"
              >
                {isDownloading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Hidden PDF Preview */}
        <div className="hidden">
          <StyleOptionsWrapper>
            <div 
              id="resume-preview-pdf-v2" 
              className="bg-white"
              style={{ width: '210mm', minHeight: '297mm' }}
            >
              <InlineEditProvider
                resumeData={resumeData as any}
                setResumeData={setResumeData as any}
              >
                <ResumeRenderer
                  resumeData={resumeData}
                  templateId={templateId}
                  themeColors={themeColors}
                  sectionOverrides={sectionOverrides}
                  editable={false}
                  sectionLabels={sectionLabels}
                  enabledSections={enabledSections}
                  fontFamily={selectedFont}
                />
              </InlineEditProvider>
            </div>
          </StyleOptionsWrapper>
        </div>
      </StyleOptionsProvider>
      
      <SectionReorderDialog
        open={showReorder}
        onOpenChange={setShowReorder}
        sections={getAllSectionsForReorder()}
        onApply={handleApplyReorder}
      />

      <ManageSectionsModal
        isOpen={showManageSections}
        onClose={() => setShowManageSections(false)}
        sections={getAllSectionsForManage()}
        enabledSections={enabledSections}
        sectionLabels={sectionLabels}
        sectionOverrides={sectionOverrides}
        onToggleSection={handleToggleSection}
        onReorderSections={handleApplyReorder}
        onUpdateLabel={handleUpdateLabel}
        onChangeVariant={handleChangeSectionVariant}
        onAddSection={handleAddSection}
        themeColor={themeColors.primary || '#0891b2'}
        layoutType={config.layout.type}
      />

      <AddSectionModal
        isOpen={showAddSectionModal}
        onClose={() => setShowAddSectionModal(false)}
        onAddSection={handleAddSection}
        existingSections={enabledSections}
        layoutType={config.layout.type}
        targetColumn={addSectionTargetColumn}
        themeColor={themeColors.primary || '#0891b2'}
      />

      {/* Onboarding Tour for first-time users */}
      <OnboardingTour />

      {/* Template Selector Modal */}
      <TemplateSelectorModal
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelect={(newTemplateId) => {
          // Navigate to the same builder with the new template
          // Preserve the resume data by keeping it in state (no page reload)
          navigate(`/builder?template=${newTemplateId}`, { replace: true });
          setShowTemplateSelector(false);
          toast.success('Template changed successfully!');
        }}
        currentTemplateId={templateId}
        themeColor={themeColors.primary || '#0891b2'}
      />

      {/* AI Enhancement Modal */}
      <EnhanceWithAIModal
        isOpen={showEnhanceModal}
        onClose={() => setShowEnhanceModal(false)}
        resumeData={resumeData}
        templateId={templateId}
        themeColors={themeColors}
        enabledSections={enabledSections}
        onApplyEnhancements={(enhancedData, animate) => {
          if (animate) {
            // Add a brief visual pulse to the resume preview
            const previewElement = document.getElementById('resume-preview-v2');
            if (previewElement) {
              previewElement.classList.add('animate-pulse');
              previewElement.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.3)';
              setTimeout(() => {
                previewElement.classList.remove('animate-pulse');
                previewElement.style.boxShadow = '';
              }, 1500);
            }
          }
          setResumeData(enhancedData);

          // Auto-enable all sections that have data in the enhanced resume
          const sectionsWithData = getSectionsWithData(enhancedData);
          setEnabledSections(prev => {
            const merged = [...new Set([...prev, 'header', ...sectionsWithData])];
            return merged;
          });

          setHasUnsavedChanges(true);
          toast.success('AI enhancements applied successfully!', {
            description: 'Your resume has been transformed with powerful improvements.',
            icon: '✨',
          });
        }}
      />

      {/* Job Tailor Modal */}
      <JobTailorModal
        isOpen={showJobTailorModal}
        onClose={() => setShowJobTailorModal(false)}
        templateId={templateId}
        themeColors={themeColors}
        onComplete={(tailoredData, analysis) => {
          // Add a visual pulse to the resume preview
          const previewElement = document.getElementById('resume-preview-v2');
          if (previewElement) {
            previewElement.classList.add('animate-pulse');
            previewElement.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.3)';
            setTimeout(() => {
              previewElement.classList.remove('animate-pulse');
              previewElement.style.boxShadow = '';
            }, 1500);
          }
          setResumeData(tailoredData);

          // Auto-enable all sections that have data in the tailored resume
          const sectionsWithData = getSectionsWithData(tailoredData);
          setEnabledSections(prev => {
            const merged = [...new Set([...prev, 'header', ...sectionsWithData])];
            return merged;
          });

          setHasUnsavedChanges(true);
          toast.success('Resume tailored successfully!', {
            description: `Match score: ${analysis.matchScore}% - Your resume is now optimized for this job.`,
            icon: '🎯',
          });
        }}
      />

      {/* Pro Feature Modal */}
      <ProFeatureModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        featureName={proModalFeature.name}
        featureDescription={proModalFeature.description}
      />

      {/* Save Options Dialog */}
      <SaveOptionsDialog
        open={showSaveOptions}
        onOpenChange={setShowSaveOptions}
        onSaveResumeOnly={handleSaveResumeOnly}
        onSaveAndUpdateProfile={handleSaveAndUpdateProfile}
        isSaving={isSaving}
        isNewResume={!currentResumeId}
      />

      {/* Mock Interview Modal */}
      <MockInterviewModal
        open={showMockInterview}
        onClose={() => setShowMockInterview(false)}
        resumeData={resumeData}
      />

{/* ATS Score Panel - Hidden for refinement */}
      {/* TODO: Re-enable when ATS checker is refined
      <ATSScorePanel
        resumeData={resumeData}
        isOpen={showATSPanel}
        onClose={() => setShowATSPanel(false)}
      />
      */}

      {/* Floating Chat Button - Opens chat panel on the right */}
      {!isChatMode && (
        <button
          onClick={() => setIsChatMode(true)}
          className={cn(
            'fixed z-50',
            // Desktop: bottom right with full text
            'lg:bottom-6 lg:right-6',
            // Mobile: above the bottom bar, centered
            'bottom-20 right-4',
            'flex items-center gap-2 rounded-full',
            // Desktop: larger with text
            'lg:px-5 lg:py-3.5',
            // Mobile: compact icon-only or smaller
            'px-4 py-3',
            'bg-gradient-to-r from-primary via-blue-600 to-indigo-600',
            'text-white font-medium shadow-lg shadow-primary/30',
            'hover:shadow-xl hover:shadow-primary/40',
            'active:scale-95',
            'transition-all duration-200'
          )}
        >
          <Sparkles className="w-5 h-5" />
          <span className="hidden sm:inline">Talk with Resume</span>
        </button>
      )}
    </div>
  );
};

export default BuilderV2;
