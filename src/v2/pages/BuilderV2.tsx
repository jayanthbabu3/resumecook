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
  LayoutGrid,
  GripVertical,
  Edit2,
  Check,
  X,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { generatePDFFromPreview } from '@/lib/pdfGenerator';
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
  const templateDefinition = getTemplate(templateId);

  const initialResumeData = React.useMemo(
    () => templateDefinition?.mockData || MOCK_RESUME_DATA,
    [templateDefinition?.mockData],
  );

  // State
  const [resumeData, setResumeData] = useState<V2ResumeData>(initialResumeData);
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
  // Toggle between old form and new dynamic form (for testing)
  const [useNewForm, setUseNewForm] = useState(true);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Smart header hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const scrolledPastThreshold = currentScrollY > 80;
      
      if (scrollingDown && scrolledPastThreshold) {
        setHeaderVisible(false);
      } else if (!scrollingDown) {
        setHeaderVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Update section label
  const handleUpdateLabel = useCallback((sectionId: string, newLabel: string) => {
    setSectionLabels(prev => ({
      ...prev,
      [sectionId]: newLabel,
    }));
    setEditingLabelId(null);
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
          "min-h-screen pb-8 transition-all duration-300",
          headerVisible ? "pt-[72px]" : "pt-4"
        )}>
          
          {/* Main Content Grid */}
          <div className={cn(
            "container mx-auto py-6 px-4 sm:px-6 lg:px-8",
            editorMode === 'form' 
              ? "flex gap-0" 
              : "flex justify-center"
          )}>
            
            {/* Form Panel - Only in form mode */}
            {editorMode === 'form' && (
              <div className="hidden lg:block w-[380px] flex-shrink-0">
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <FileEdit className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold">Edit Content</h2>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Changes sync in real-time</p>
                  </div>
                  <div className="p-4">
                    {useNewForm ? (
                      <ElegantForm
                        resumeData={resumeData}
                        onResumeDataChange={setResumeData}
                        enabledSections={config.sections}
                        sectionTitles={sectionLabels}
                        templateConfig={config}
                        accentColor="#2563eb"
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
            )}

            {/* Resume Preview with Toolbars */}
            <TooltipProvider delayDuration={100}>
              <div className={cn(
                "relative flex items-start",
                editorMode === 'form' ? "flex-1 pl-6" : "justify-center w-full"
              )}>
                {/* Resume Column: Toolbar + Resume */}
                <div className="flex flex-col">
                  {/* Top Toolbar - Minimal: Back, Mode Toggle (centered), Color, Download */}
                  <div 
                    className="mb-4 flex items-center px-3 py-2 rounded-2xl backdrop-blur-sm" 
                    style={{ 
                      width: '210mm',
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

                    {/* Center: Mode Toggle or Customize Button */}
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

                    {/* Spacer to push right content */}
                    <div className="flex-1" />

                    {/* Right: Color Picker + Download */}
                    <div className="flex items-center gap-2">
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
                        <PopoverContent align="end" className="w-auto p-2 rounded-xl shadow-xl">
                          {/* Simple color grid - one click to select */}
                          <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                            {[
                              '#2563eb', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6',
                              '#10b981', '#22c55e', '#84cc16', '#eab308', '#f59e0b',
                              '#f97316', '#ef4444', '#dc2626', '#e11d48', '#ec4899',
                              '#d946ef', '#a855f7', '#8b5cf6', '#6366f1', '#64748b',
                              '#1e293b', '#0f172a', '#374151', '#4b5563', '#6b7280',
                            ].map((color) => (
                              <button
                                key={color}
                                onClick={() => {
                                  setThemeColor(color);
                                  setThemeColors({ ...themeColors, primary: color });
                                }}
                                className={cn(
                                  "w-7 h-7 rounded-lg transition-all duration-150 hover:scale-110",
                                  (themeColors.primary || themeColor) === color && "ring-2 ring-offset-2 ring-gray-900"
                                )}
                                style={{ backgroundColor: color }}
                              />
                            ))}
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
                  <div className="relative">
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
                          />
                        </InlineEditProvider>
                      </div>
                    </StyleOptionsWrapper>
                  </div>
                </div>
                
                {/* Side Toolbar - Always visible: Sections, Add, Settings, Save */}
                {editorMode !== 'preview' && (
                  <div 
                    className="ml-4 flex flex-col gap-1.5 sticky top-20 self-start p-2 rounded-2xl backdrop-blur-sm"
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
                          onClick={handleAddCustomSection}
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
                          onClick={() => toast.success('Saved!')}
                          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="bg-gray-900 text-white border-0">
                        Save Progress
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </div>
            </TooltipProvider>
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
    </div>
  );
};

export default BuilderV2;
