/**
 * Resume Builder V2 - Style Options Panel
 *
 * Modern, compact style options with intuitive UX.
 * Elegant design with visual previews and smooth interactions.
 */

import React from 'react';
import { useStyleOptions, type HeaderCase, type FontSizeScale, type DividerStyle, type DateFormat, type BulletStyle } from '@/contexts/StyleOptionsContext';
import { Switch } from '@/components/ui/switch';
import {
  Type,
  Calendar,
  List,
  Image,
  FileText,
  Briefcase,
  GraduationCap,
  Lightbulb,
  LayoutGrid,
  Target,
  Trophy,
  Award,
  Star,
  Zap,
  CheckCircle2,
  Heart,
  Globe,
  Code,
  FolderOpen,
  LucideIcon,
  ChevronRight,
  RotateCcw,
  Minus,
  Eye,
  EyeOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { V2ResumeData } from '../types';

// Icon mapping for different section types
const SECTION_ICONS: Record<string, LucideIcon> = {
  strengths: Target,
  achievements: Trophy,
  awards: Award,
  highlights: Star,
  competencies: Zap,
  qualifications: CheckCircle2,
  interests: Heart,
  languages: Globe,
  projects: FolderOpen,
  certifications: Award,
  skills: Lightbulb,
  technical: Code,
};

const getSectionIcon = (sectionId: string, title: string): LucideIcon => {
  const idLower = sectionId.toLowerCase();
  const titleLower = title.toLowerCase();
  for (const [key, icon] of Object.entries(SECTION_ICONS)) {
    if (idLower.includes(key) || titleLower.includes(key)) return icon;
  }
  return LayoutGrid;
};

interface StyleOptionsPanelV2Props {
  inPopover?: boolean;
  className?: string;
  resumeData?: V2ResumeData;
  enabledSections?: string[];
  onToggleSection?: (sectionId: string) => void;
}

// Segment Control Component - Apple-style pill selector
const SegmentControl: React.FC<{
  options: { value: string; label: React.ReactNode; title?: string }[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
}> = ({ options, value, onChange, size = 'md' }) => {
  const selectedIndex = options.findIndex(o => o.value === value);

  return (
    <div className="relative inline-flex p-0.5 bg-gray-100 rounded-lg">
      {/* Sliding background */}
      <div
        className="absolute top-0.5 bottom-0.5 bg-white rounded-md shadow-sm transition-all duration-200 ease-out"
        style={{
          left: `calc(${selectedIndex * (100 / options.length)}% + 2px)`,
          width: `calc(${100 / options.length}% - 4px)`,
        }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          title={option.title}
          className={cn(
            "relative z-10 flex-1 px-3 py-1.5 text-center transition-colors duration-200",
            size === 'sm' ? 'text-xs min-w-[40px]' : 'text-sm min-w-[52px]',
            value === option.value ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Visual Selector for dividers with preview
const DividerSelector: React.FC<{
  value: DividerStyle;
  onChange: (value: DividerStyle) => void;
}> = ({ value, onChange }) => {
  const dividers: { value: DividerStyle; preview: React.ReactNode }[] = [
    { value: 'none', preview: <span className="text-[10px] text-gray-400">None</span> },
    { value: 'thin', preview: <div className="w-full h-px bg-gray-300" /> },
    { value: 'line', preview: <div className="w-full h-0.5 bg-gray-500" /> },
    { value: 'dotted', preview: <div className="w-full border-b border-dotted border-gray-400" /> },
    { value: 'double', preview: <div className="w-full border-b-2 border-double border-gray-400" /> },
  ];

  return (
    <div className="flex gap-1.5">
      {dividers.map((d) => (
        <button
          key={d.value}
          onClick={() => onChange(d.value)}
          className={cn(
            "flex-1 h-10 flex items-center justify-center px-2 rounded-lg border transition-all duration-150",
            value === d.value
              ? "border-blue-500 bg-blue-50/80 shadow-sm"
              : "border-gray-200 bg-white hover:border-gray-300"
          )}
        >
          <div className="w-full">{d.preview}</div>
        </button>
      ))}
    </div>
  );
};

// Bullet Style Selector
const BulletSelector: React.FC<{
  value: BulletStyle;
  onChange: (value: BulletStyle) => void;
}> = ({ value, onChange }) => {
  const bullets: { value: BulletStyle; label: string }[] = [
    { value: '•', label: '•' },
    { value: '◦', label: '◦' },
    { value: '▪', label: '▪' },
    { value: '▸', label: '▸' },
    { value: '–', label: '–' },
    { value: 'none', label: '—' },
  ];

  return (
    <div className="flex gap-1">
      {bullets.map((b) => (
        <button
          key={b.value}
          onClick={() => onChange(b.value)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-md text-base transition-all duration-150",
            value === b.value
              ? "bg-blue-500 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
};

// Compact Row Component
const OptionRow: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className }) => (
  <div className={cn("flex items-center justify-between gap-4", className)}>
    <span className="text-xs font-medium text-gray-500 whitespace-nowrap">{label}</span>
    {children}
  </div>
);

// Expandable Section
const ExpandableSection: React.FC<{
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  badge?: number;
}> = ({ title, icon: Icon, children, defaultExpanded = false, badge }) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-gray-50/50 transition-colors"
      >
        <div className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
          expanded ? "bg-blue-100" : "bg-gray-100"
        )}>
          <Icon className={cn("w-3.5 h-3.5", expanded ? "text-blue-600" : "text-gray-500")} />
        </div>
        <span className="flex-1 text-left text-sm font-medium text-gray-800">{title}</span>
        {badge !== undefined && (
          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded">
            {badge}
          </span>
        )}
        <ChevronRight className={cn(
          "w-4 h-4 text-gray-400 transition-transform duration-200",
          expanded && "rotate-90"
        )} />
      </button>
      <div className={cn(
        "grid transition-all duration-200 ease-out",
        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}>
        <div className="overflow-hidden">
          <div className="px-3.5 pb-3.5 pt-1 space-y-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Toggle Item for sections
const ToggleItem: React.FC<{
  icon: LucideIcon;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ icon: Icon, label, checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    className={cn(
      "flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150",
      checked
        ? "bg-gray-50 border border-gray-200"
        : "hover:bg-gray-50"
    )}
  >
    <Icon className={cn("w-4 h-4", checked ? "text-blue-500" : "text-gray-400")} />
    <span className={cn("flex-1 text-sm", checked ? "text-gray-800" : "text-gray-500")}>{label}</span>
    <Switch
      checked={checked}
      onCheckedChange={onChange}
      onClick={(e) => e.stopPropagation()}
      className="scale-90"
    />
  </div>
);

export const StyleOptionsPanelV2: React.FC<StyleOptionsPanelV2Props> = ({
  className,
  resumeData,
  enabledSections = [],
  onToggleSection,
}) => {
  const { styleOptions, updateStyleOption, resetStyleOptions } = useStyleOptions() || {
    styleOptions: {
      headerCase: 'uppercase' as HeaderCase,
      fontSizeScale: 'normal' as FontSizeScale,
      dividerStyle: 'thin' as DividerStyle,
      dateFormat: 'short' as DateFormat,
      bulletStyle: '•' as BulletStyle,
      showPhoto: true,
      showSummary: true,
      showExperience: true,
      showEducation: true,
      showSkills: true,
      showAchievements: true,
      showStrengths: true,
      showSections: true,
    },
    updateStyleOption: () => {},
    resetStyleOptions: () => {},
  };

  const customSections = resumeData?.sections || [];

  // Count visible sections
  const visibleCount = [
    styleOptions.showPhoto,
    styleOptions.showSummary,
    styleOptions.showExperience,
    styleOptions.showEducation,
    styleOptions.showSkills,
    styleOptions.showAchievements,
    styleOptions.showStrengths,
  ].filter(Boolean).length;

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header - Minimal */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
        <h3 className="text-sm font-semibold text-gray-900">Customize</h3>
        <button
          onClick={resetStyleOptions}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-gray-50/50">

        {/* Typography - Compact inline options */}
        <ExpandableSection title="Typography" icon={Type} defaultExpanded>
          <OptionRow label="Header Case">
            <SegmentControl
              options={[
                { value: 'uppercase', label: 'ABC' },
                { value: 'capitalize', label: 'Abc' },
                { value: 'lowercase', label: 'abc' },
              ]}
              value={styleOptions.headerCase}
              onChange={(v) => updateStyleOption('headerCase', v as HeaderCase)}
              size="sm"
            />
          </OptionRow>
          <OptionRow label="Font Size">
            <SegmentControl
              options={[
                { value: 'compact', label: 'S', title: 'Compact' },
                { value: 'normal', label: 'M', title: 'Normal' },
                { value: 'large', label: 'L', title: 'Large' },
              ]}
              value={styleOptions.fontSizeScale}
              onChange={(v) => updateStyleOption('fontSizeScale', v as FontSizeScale)}
              size="sm"
            />
          </OptionRow>
        </ExpandableSection>

        {/* Dividers - Visual selector */}
        <ExpandableSection title="Dividers" icon={Minus} defaultExpanded>
          <DividerSelector
            value={styleOptions.dividerStyle}
            onChange={(v) => updateStyleOption('dividerStyle', v)}
          />
        </ExpandableSection>

        {/* Date & Bullets - Combined for efficiency */}
        <ExpandableSection title="Formatting" icon={List} defaultExpanded>
          <OptionRow label="Date Format">
            <SegmentControl
              options={[
                { value: 'short', label: 'Jan \'24' },
                { value: 'long', label: 'January' },
                { value: 'medium', label: '01/24' },
              ]}
              value={styleOptions.dateFormat}
              onChange={(v) => updateStyleOption('dateFormat', v as DateFormat)}
              size="sm"
            />
          </OptionRow>
          <OptionRow label="Bullets">
            <BulletSelector
              value={styleOptions.bulletStyle}
              onChange={(v) => updateStyleOption('bulletStyle', v)}
            />
          </OptionRow>
        </ExpandableSection>

        {/* Sections Visibility */}
        <ExpandableSection
          title="Sections"
          icon={visibleCount === 7 ? Eye : EyeOff}
          badge={visibleCount}
        >
          <div className="space-y-1">
            <ToggleItem
              icon={Image}
              label="Photo"
              checked={styleOptions.showPhoto as boolean}
              onChange={(checked) => updateStyleOption('showPhoto', checked)}
            />
            <ToggleItem
              icon={FileText}
              label="Summary"
              checked={styleOptions.showSummary as boolean}
              onChange={(checked) => updateStyleOption('showSummary', checked)}
            />
            <ToggleItem
              icon={Briefcase}
              label="Experience"
              checked={styleOptions.showExperience as boolean}
              onChange={(checked) => updateStyleOption('showExperience', checked)}
            />
            <ToggleItem
              icon={GraduationCap}
              label="Education"
              checked={styleOptions.showEducation as boolean}
              onChange={(checked) => updateStyleOption('showEducation', checked)}
            />
            <ToggleItem
              icon={Lightbulb}
              label="Skills"
              checked={styleOptions.showSkills as boolean}
              onChange={(checked) => updateStyleOption('showSkills', checked)}
            />
            <ToggleItem
              icon={Trophy}
              label="Achievements"
              checked={styleOptions.showAchievements as boolean}
              onChange={(checked) => updateStyleOption('showAchievements', checked)}
            />
            <ToggleItem
              icon={Target}
              label="Strengths"
              checked={styleOptions.showStrengths as boolean}
              onChange={(checked) => updateStyleOption('showStrengths', checked)}
            />
          </div>

          {/* Custom Sections */}
          {customSections.length > 0 && (
            <>
              <div className="my-2 border-t border-gray-100" />
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-1.5">Custom</p>
              <div className="space-y-1">
                {customSections.map((section) => (
                  <ToggleItem
                    key={section.id}
                    icon={getSectionIcon(section.id, section.title)}
                    label={section.title}
                    checked={enabledSections.includes(section.id)}
                    onChange={() => onToggleSection?.(section.id)}
                  />
                ))}
              </div>
            </>
          )}
        </ExpandableSection>
      </div>
    </div>
  );
};

export default StyleOptionsPanelV2;
