/**
 * Resume Builder V2 - Builder Page
 * 
 * New builder page with config-driven templates.
 * Matches the existing LiveEditor styling and functionality.
 */

import React, { useState, useCallback, useRef } from 'react';
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
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { StyleOptionsPanelV2 } from '../components/StyleOptionsPanelV2';
import SectionReorderDialog from '../components/SectionReorderDialog';

import { ResumeRenderer } from '../components/ResumeRenderer';
import { useTemplateConfig } from '../hooks/useTemplateConfig';
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [sectionLabels, setSectionLabels] = useState<Record<string, string>>({});
  const [enabledSections, setEnabledSections] = useState<string[]>(['header', 'summary', 'experience', 'education', 'strengths', 'skills', 'achievements']);
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editingLabelValue, setEditingLabelValue] = useState('');
  const [editorMode, setEditorMode] = useState<'live' | 'form'>('live');
  const [sectionOverrides, setSectionOverrides] = useState<Record<string, any>>({});
  const [showReorder, setShowReorder] = useState(false);
  // Toggle between old form and new dynamic form (for testing)
  const [useNewForm, setUseNewForm] = useState(true);
  
  const previewRef = useRef<HTMLDivElement>(null);

  // Get template config
  const { config } = useTemplateConfig({ templateId, themeColor, sectionOverrides });

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
    (resumeData.sections || []).forEach((s, idx) => {
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
  }, [config.sections, resumeData.sections, sectionOverrides, enabledSections]);

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
    <div className="flex h-screen flex-col bg-gradient-to-br from-background via-muted/5 to-background">
      <Header />

      {/* Toolbar - matches LiveEditor */}
      <div className="border-b bg-card/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3">
          {/* Desktop Layout - 3 Column Grid */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Left Section - Back + Template Name */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/v2')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <span className="font-medium text-gray-900">{config.name}</span>
              <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                V2
              </span>
            </div>

            {/* Center Section - Tabs */}
            <div className="flex justify-center">
              <Tabs value={editorMode} onValueChange={(v) => setEditorMode(v as 'live' | 'form')}>
                <TabsList className="bg-muted/50 border">
                  <TabsTrigger value="live" className="gap-2 text-sm">
                    <Edit3 className="h-4 w-4" />
                    Live Editor
                  </TabsTrigger>
                  <TabsTrigger value="form" className="gap-2 text-sm">
                    <FileEdit className="h-4 w-4" />
                    Form Editor
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Right Section - Controls */}
            <div className="flex items-center justify-end gap-2">
              {/* Theme Color */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border">
                <label htmlFor="themeColor" className="text-sm font-medium whitespace-nowrap">
                  Theme:
                </label>
                <input
                  id="themeColor"
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="h-7 w-10 cursor-pointer rounded border border-border"
                />
              </div>

              {/* Sections Manager */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    Sections
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  {renderSectionManager()}
                </PopoverContent>
              </Popover>

              {/* Save Button */}
              <Button
                onClick={() => toast.success('Resume saved!')}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>

              {/* Download */}
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                size="sm"
                className="gap-2"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <StyleOptionsProvider>
        {/* Main Content Area - Matches V1 Editor Layout */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-6">
            <div className={cn(
              "grid gap-4 max-w-8xl mx-auto lg:gap-6",
              editorMode === 'form' ? "lg:grid-cols-[37%,63%]" : "lg:grid-cols-1 max-w-[900px]"
            )}>
              {/* Form Section - Only in form mode */}
              {editorMode === 'form' && (
                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto space-y-4 rounded-2xl border border-border/50 bg-background px-4 py-5 shadow-sm sm:px-6 sm:py-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileEdit className="w-5 h-5 text-cyan-600" />
                        <h2 className="text-lg font-bold">Form Editor</h2>
                      </div>
                      {/* Toggle for new form (dev only) */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {useNewForm ? 'V2 Form' : 'Legacy Form'}
                        </span>
                        <Switch
                          checked={useNewForm}
                          onCheckedChange={setUseNewForm}
                          className="data-[state=checked]:bg-cyan-600"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Changes sync with preview in real-time</p>
                  </div>
                  
                  {useNewForm ? (
                    <ElegantForm
                      resumeData={resumeData}
                      onResumeDataChange={setResumeData}
                      enabledSections={config.sections}
                      sectionTitles={sectionLabels}
                      templateConfig={config}
                      accentColor={themeColor}
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
              )}

              {/* Preview Section */}
              <div className={cn(
                "overflow-y-auto",
                editorMode === 'form' ? "lg:sticky lg:top-32 max-h-[calc(100vh-8rem)]" : ""
              )}>
                <div 
                  className="rounded-2xl p-4 sm:p-6"
                  style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
                  }}
                >
                  {/* Dot pattern overlay */}
                  <div 
                    className="space-y-4 flex flex-col items-center"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 0.5px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  >
                    {/* Live Preview Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg shadow-gray-200/50 w-full max-w-[210mm]">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-9 w-1.5 rounded-full shadow-sm"
                          style={{ background: themeColor }}
                        />
                        <div className="flex items-center gap-2.5">
                          <div
                            className="p-1.5 rounded-lg"
                            style={{ backgroundColor: `${themeColor}1a` }}
                          >
                            <Eye className="h-4 w-4" style={{ color: themeColor }} />
                          </div>
                          <span className="font-semibold text-gray-800 tracking-tight">Live Preview</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 gap-2 border-gray-200 text-gray-700 hover:border-[var(--primary-color,rgba(0,0,0,0.2))] hover:text-[var(--primary-color,rgba(0,0,0,0.8))] hover:bg-[var(--primary-color,rgba(0,0,0,0.05))]"
                          style={{ ['--primary-color' as any]: themeColor }}
                          onClick={() => setShowReorder(true)}
                        >
                          <PanelsTopLeft className="h-4 w-4" />
                          Rearrange
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 gap-2 border-gray-200 text-gray-700 hover:border-[var(--primary-color,rgba(0,0,0,0.2))] hover:text-[var(--primary-color,rgba(0,0,0,0.8))] hover:bg-[var(--primary-color,rgba(0,0,0,0.05))]"
                          style={{ ['--primary-color' as any]: themeColor }}
                          onClick={handleAddCustomSection}
                        >
                          <Plus className="h-4 w-4" />
                          Add Custom Section
                        </Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-9 w-9 p-0 hover:bg-gray-100 rounded-xl transition-all hover:shadow-sm border border-transparent hover:border-gray-200 group relative"
                            >
                              <Settings className="h-4 w-4 animate-spin" style={{ animationDuration: '3s', color: themeColor }} />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="end" className="w-96 p-0 shadow-xl border-gray-200 max-h-[85vh] overflow-y-auto">
                            <StyleOptionsPanelV2 
                              inPopover={true} 
                              resumeData={resumeData}
                              enabledSections={enabledSections}
                              onToggleSection={handleToggleSection}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Resume Preview Container */}
                    <div className="relative w-full max-w-[210mm]">
                      {/* Decorative corner elements */}
                      <div className="absolute -top-2 -left-2 w-5 h-5 border-l-2 border-t-2 border-cyan-300/50 rounded-tl-lg" />
                      <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-cyan-300/50 rounded-tr-lg" />
                      <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-cyan-300/50 rounded-bl-lg" />
                      <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r-2 border-b-2 border-cyan-300/50 rounded-br-lg" />
                      
                      <StyleOptionsWrapper>
                        <div 
                          id="resume-preview-v2" 
                          ref={previewRef}
                          className="bg-white shadow-2xl shadow-gray-300/50 rounded-xl overflow-hidden ring-1 ring-gray-200/50"
                          style={{ 
                            width: '210mm', 
                            minHeight: '297mm',
                            maxWidth: '100%',
                          }}
                        >
                          <InlineEditProvider
                            resumeData={resumeData as any}
                            setResumeData={setResumeData as any}
                          >
                            <ResumeRenderer
                              resumeData={resumeData}
                              templateId={templateId}
                              themeColor={themeColor}
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
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hidden PDF Preview - Always renders with editable={false} for clean PDF output */}
        {/* This ensures PDF generation uses clean output without editing UI or placeholders */}
        <div className="hidden">
          <StyleOptionsWrapper>
            <div 
              id="resume-preview-pdf-v2" 
              className="bg-white"
              style={{ 
                width: '210mm', 
                minHeight: '297mm',
              }}
            >
              <InlineEditProvider
                resumeData={resumeData as any}
                setResumeData={setResumeData as any}
              >
                <ResumeRenderer
                  resumeData={resumeData}
                  templateId={templateId}
                  themeColor={themeColor}
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
