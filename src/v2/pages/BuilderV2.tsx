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
  Save,
  GripVertical,
  Edit2,
  Check,
  X,
  Plus,
} from 'lucide-react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { resumeServiceV2, type V2Resume } from '../services/resumeServiceV2';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { generatePDFFromPreview } from '@/lib/pdfGenerator';
import { incrementDownloadsCount } from '@/lib/firestore/statsService';
import { PDF_STYLES } from '@/lib/pdfStyles';
import { InlineEditProvider } from '@/contexts/InlineEditContext';
import { StyleOptionsProvider } from '@/contexts/StyleOptionsContext';
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
import { AddSectionModal } from '../components/AddSectionModal';

import { ResumeRenderer } from '../components/ResumeRenderer';
import { useTemplateConfig } from '../hooks/useTemplateConfig';
import { getTemplateConfig } from '../config/templates';
import { MOCK_RESUME_DATA } from '../data/mockData';
import type { V2ResumeData } from '../types';
import { getTemplate } from '../templates';

// V2 Dynamic Form (config-driven)
import { DynamicForm, ElegantForm } from '../components/form';

export const BuilderV2: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'executive-split-v2';
  const resumeId = searchParams.get('resumeId');
  const templateDefinition = getTemplate(templateId);
  const { user } = useFirebaseAuth();

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
  const [sectionLabels, setSectionLabels] = useState<Record<string, string>>({});
  const [enabledSections, setEnabledSections] = useState<string[]>(['header', 'summary', 'experience', 'education', 'strengths', 'skills', 'achievements']);
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editingLabelValue, setEditingLabelValue] = useState('');
  const [editorMode, setEditorMode] = useState<'preview' | 'live' | 'form'>('preview');
  const [sectionOverrides, setSectionOverrides] = useState<Record<string, any>>({});
  const [showReorder, setShowReorder] = useState(false);
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

  const previewRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileResumeRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

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
          if (resume.enabledSections) {
            setEnabledSections(resume.enabledSections);
          }

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

  // Save resume handler
  const handleSaveResume = useCallback(async () => {
    if (!user) {
      toast.error('Please sign in to save your resume');
      return;
    }

    setIsSaving(true);
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
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  }, [user, currentResumeId, resumeData, templateId, themeColor, themeColors, sectionOverrides, enabledSections, sectionLabels]);

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
  const { config } = useTemplateConfig({ 
    templateId, 
    themeColors,
    sectionOverrides 
  });

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
  React.useEffect(() => {
    if (config) {
      const configEnabledSections = config.sections.filter(s => s.enabled).map(s => s.id);
      setEnabledSections(configEnabledSections);
    }
  }, [config.id]);

  // Swap in template-specific mock data when changing templates
  React.useEffect(() => {
    setResumeData(templateDefinition?.mockData || MOCK_RESUME_DATA);
  }, [templateDefinition]);

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
    setSectionOverrides(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        variant: variantId,
      },
    }));
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
  const getAllSectionsForReorder = useCallback(() => {
    const configSections = [...config.sections];
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
      });
    });
    
    return [...configSections, ...dynamicSections];
  }, [config.sections, resumeData.customSections, sectionOverrides, enabledSections]);

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
    <div className="min-h-screen bg-gray-100">
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
          "min-h-screen transition-all duration-300",
          headerVisible ? "pt-[72px]" : "pt-4",
          "pb-0 lg:pb-8" // No bottom padding on mobile, only on desktop
        )}>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden sticky top-[56px] z-40 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center justify-center p-2 gap-1">
              <button
                onClick={() => setMobileView('form')}
                className={cn(
                  "flex-1 h-9 flex items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  mobileView === 'form'
                    ? "bg-white shadow-sm text-primary"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                )}
              >
                <FileEdit className="h-3.5 w-3.5" />
                Form
              </button>
              <button
                onClick={() => setMobileView('live')}
                className={cn(
                  "flex-1 h-9 flex items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  mobileView === 'live'
                    ? "bg-white shadow-sm text-primary"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                )}
              >
                <Edit3 className="h-3.5 w-3.5" />
                Live Edit
              </button>
              <button
                onClick={() => setMobileView('preview')}
                className={cn(
                  "flex-1 h-9 flex items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-200",
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

          {/* Main Content Grid */}
          <div className={cn(
            "container mx-auto py-4 lg:py-6 px-3 sm:px-4 lg:px-8",
            editorMode === 'form'
              ? "flex lg:gap-6"
              : "flex justify-center"
          )}>
            
            {/* Form Panel - Desktop: only in form mode, Mobile: when mobileView is 'form' */}
            <div className={cn(
              "w-full lg:w-[380px] flex-shrink-0",
              // Combined visibility logic
              // Desktop: only show when editorMode is 'form'
              // Mobile: only show when mobileView is 'form'
              editorMode === 'form'
                ? (mobileView === 'form' ? "block" : "hidden lg:block")
                : (mobileView === 'form' ? "block lg:hidden" : "hidden")
            )}>
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="p-4 border-b border-gray-100 hidden lg:block">
                  <div className="flex items-center gap-2">
                    <FileEdit className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Edit Content</h2>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Changes sync in real-time</p>
                </div>
                <div className="p-3 lg:p-4">
                  {useNewForm ? (
                    <ElegantForm
                      resumeData={resumeData}
                      onResumeDataChange={setResumeData}
                      enabledSections={config.sections}
                      sectionTitles={sectionLabels}
                      templateConfig={config}
                      accentColor="#2563eb"
                      onOpenAddSection={() => setShowAddSectionModal(true)}
                    />
                  ) : (
                    <ResumeForm
                      resumeData={resumeData as any}
                      setResumeData={setResumeData as any}
                      templateId={templateId}
                      enabledSections={enabledSections}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Resume Preview with Toolbars */}
            <TooltipProvider delayDuration={100}>
              <div className={cn(
                "relative flex items-start",
                editorMode === 'form' ? "flex-1" : "justify-center w-full",
                // Hide on mobile when form view is active (show for live and preview)
                mobileView === 'form' ? "hidden lg:flex" : "flex"
              )}>
                {/* Resume Column: Toolbar + Resume */}
                <div className="flex flex-col w-full lg:w-auto">
                  {/* Top Toolbar - Minimal: Back, Mode Toggle (centered), Color, Download */}
                  <div
                    className="mb-3 lg:mb-4 flex items-center px-2 lg:px-3 py-2 rounded-xl lg:rounded-2xl backdrop-blur-sm w-full lg:w-[210mm]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                      boxShadow: '0 2px 12px -2px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Left: Back Button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            // Get the referrer page and selected template from sessionStorage
                            const referrer = sessionStorage.getItem('template-referrer') || '/templates';
                            const selectedTemplate = sessionStorage.getItem('selected-template');

                            // Navigate back with highlight parameter if template was selected
                            if (selectedTemplate) {
                              navigate(`${referrer}?highlight=${selectedTemplate}`);
                            } else {
                              navigate(referrer);
                            }
                          }}
                          className="h-9 px-3 flex items-center gap-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 group"
                        >
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                          <span className="text-sm font-medium">Back</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-gray-900 text-white border-0">
                        Back to Templates
                      </TooltipContent>
                    </Tooltip>

                    {/* Spacer to push center content */}
                    <div className="flex-1" />

                    {/* Center: Mode Toggle or Customize Button - Hidden on mobile */}
                    <div className="hidden lg:block">
                      {editorMode === 'preview' ? (
                        <Button
                          onClick={() => setEditorMode('live')}
                          size="sm"
                          className="h-9 px-4 gap-2 rounded-xl"
                        >
                          <Edit3 className="h-4 w-4" />
                          <span className="font-medium">Customize</span>
                        </Button>
                      ) : (
                        <div className="flex items-center bg-gray-100 rounded-xl p-0.5">
                          <button
                            onClick={() => setEditorMode('live')}
                            className={cn(
                              "h-8 px-3.5 flex items-center gap-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                              editorMode === 'live'
                                ? "bg-white shadow-sm text-primary"
                                : "text-gray-500 hover:text-gray-700"
                            )}
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            Live
                          </button>
                          <button
                            onClick={() => setEditorMode('form')}
                            className={cn(
                              "h-8 px-3.5 flex items-center gap-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                              editorMode === 'form'
                                ? "bg-white shadow-sm text-primary"
                                : "text-gray-500 hover:text-gray-700"
                            )}
                          >
                            <FileEdit className="h-3.5 w-3.5" />
                            Form
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Spacer to push right content */}
                    <div className="flex-1" />

                    {/* Right: Style Settings + Color Picker + Download */}
                    <div className="flex items-center gap-2">
                      {/* Style Settings - Always visible */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-gray-100/80 transition-all duration-200 border border-gray-200">
                            <Settings className="h-4 w-4 text-gray-600" />
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

                      {/* Color Picker - Direct color selection */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-gray-100/80 transition-all duration-200">
                            <div 
                              className="w-6 h-6 rounded-full shadow-md ring-2 ring-white cursor-pointer hover:scale-110 transition-transform" 
                              style={{ backgroundColor: themeColors.primary || themeColor }}
                            />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-auto p-3 rounded-xl shadow-xl">
                          {/* Professional resume color palette */}
                          <div className="grid grid-cols-5 gap-2">
                            {[
                              // Row 1: Blues & Cyan
                              '#1a365d', '#1e40af', '#2563eb', '#0891b2', '#0284c7',
                              // Row 2: Teal & Green
                              '#0f766e', '#0d9488', '#059669', '#16a34a', '#15803d',
                              // Row 3: Warm & Executive
                              '#7c2d12', '#b45309', '#9f1239', '#be185d', '#a21caf',
                              // Row 4: Purple & Indigo
                              '#6d28d9', '#7c3aed', '#4338ca', '#4f46e5', '#6366f1',
                              // Row 5: Neutral & Minimal
                              '#0f172a', '#1e293b', '#334155', '#475569', '#64748b',
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

                          {/* Custom color input */}
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={themeColors.primary || themeColor}
                                onChange={(e) => {
                                  setThemeColor(e.target.value);
                                  setThemeColors({ ...themeColors, primary: e.target.value });
                                }}
                                className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
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
                                className="h-8 text-xs font-mono w-24"
                              />
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      {/* Download Icon */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            onClick={handleDownload} 
                            disabled={isDownloading} 
                            size="icon"
                            className="h-9 w-9 rounded-xl"
                          >
                            {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-gray-900 text-white border-0">
                          Download PDF
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

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

                {/* Side Toolbar - Hidden on mobile, visible on desktop */}
                {editorMode !== 'preview' && (
                  <div
                    className="hidden lg:flex ml-4 flex-col gap-1.5 sticky top-20 self-start p-2 rounded-2xl backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                      boxShadow: '0 2px 12px -2px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Rearrange Sections */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={() => setShowReorder(true)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white/80 transition-all duration-200"
                        >
                          <PanelsTopLeft className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="bg-gray-900 text-white border-0">
                        Rearrange Sections
                      </TooltipContent>
                    </Tooltip>

                    {/* Add Section */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setShowAddSectionModal(true)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white/80 transition-all duration-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="bg-gray-900 text-white border-0">
                        Add Section
                      </TooltipContent>
                    </Tooltip>

                    {/* Settings */}
                    <Popover>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white/80 transition-all duration-200">
                              <Settings className="h-4 w-4" />
                            </button>
                          </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="bg-gray-900 text-white border-0">
                          Style Settings
                        </TooltipContent>
                      </Tooltip>
                      <PopoverContent align="start" side="left" className="w-96 p-0 shadow-xl rounded-xl max-h-[80vh] overflow-y-auto">
                        <StyleOptionsPanelV2 
                          inPopover={true} 
                          resumeData={resumeData}
                          enabledSections={enabledSections}
                          onToggleSection={handleToggleSection}
                        />
                      </PopoverContent>
                    </Popover>

                    <div className="h-px bg-gray-200/50 mx-1 my-0.5" />

                    {/* Save */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleSaveResume}
                          disabled={isSaving}
                          className={cn(
                            "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200",
                            hasUnsavedChanges
                              ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                              : "text-gray-500 hover:text-green-600 hover:bg-green-50"
                          )}
                        >
                          {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="bg-gray-900 text-white border-0">
                        {user ? (hasUnsavedChanges ? 'Save Changes' : 'Saved') : 'Sign in to Save'}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </div>
            </TooltipProvider>
          </div>

          {/* Mobile Bottom Bar - Fixed at bottom */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-3 py-2 safe-area-inset-bottom">
            <div className="flex items-center justify-around gap-2">
              {/* Color Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-200">
                    <div
                      className="w-6 h-6 rounded-full shadow-md ring-2 ring-white"
                      style={{ backgroundColor: themeColors.primary || themeColor }}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="center" side="top" className="w-auto p-3 rounded-xl shadow-xl mb-2">
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      '#1a365d', '#1e40af', '#2563eb', '#0891b2', '#0284c7',
                      '#0f766e', '#0d9488', '#059669', '#16a34a', '#15803d',
                      '#7c2d12', '#b45309', '#9f1239', '#be185d', '#a21caf',
                      '#6d28d9', '#7c3aed', '#4338ca', '#4f46e5', '#6366f1',
                      '#0f172a', '#1e293b', '#334155', '#475569', '#64748b',
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setThemeColor(color);
                          setThemeColors({ ...themeColors, primary: color });
                        }}
                        className={cn(
                          "w-8 h-8 rounded-full transition-all duration-150",
                          (themeColors.primary || themeColor) === color
                            ? "ring-2 ring-offset-2 ring-gray-900 shadow-lg"
                            : "shadow-sm"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Settings */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-200">
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

              {/* Rearrange Sections */}
              <button
                onClick={() => setShowReorder(true)}
                className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <PanelsTopLeft className="h-5 w-5 text-gray-600" />
              </button>

              {/* Add Section */}
              <button
                onClick={() => setShowAddSectionModal(true)}
                className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <Plus className="h-5 w-5 text-gray-600" />
              </button>

              {/* Save */}
              <button
                onClick={handleSaveResume}
                disabled={isSaving}
                className={cn(
                  "h-11 w-11 flex items-center justify-center rounded-xl transition-all duration-200",
                  hasUnsavedChanges
                    ? "bg-amber-50 text-amber-600"
                    : "hover:bg-gray-100 text-gray-600"
                )}
              >
                {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              </button>

              {/* Download */}
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                size="icon"
                className="h-11 w-11 rounded-xl"
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

      <AddSectionModal
        isOpen={showAddSectionModal}
        onClose={() => setShowAddSectionModal(false)}
        onAddSection={handleAddSection}
        existingSections={enabledSections}
        layoutType={config.layout.type}
        targetColumn={addSectionTargetColumn}
        themeColor={themeColors.primary || '#0891b2'}
      />
    </div>
  );
};

export default BuilderV2;
