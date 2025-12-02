import React, { useState } from 'react';
import { 
  useStyleOptions, 
  HeaderCase, 
  BulletStyle, 
  DividerStyle, 
  FontSizeScale,
  DateFormat 
} from '@/contexts/StyleOptionsContext';
import { 
  Settings2, 
  ChevronDown, 
  ChevronUp,
  Type,
  List,
  Minus,
  ZoomIn,
  Calendar,
  Eye,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StyleOptionsPanelProps {
  className?: string;
  collapsed?: boolean;
  inPopover?: boolean;
}

export const StyleOptionsPanel: React.FC<StyleOptionsPanelProps> = ({ 
  className,
  collapsed: initialCollapsed = false,
  inPopover = false
}) => {
  const styleContext = useStyleOptions();
  const [isCollapsed, setIsCollapsed] = useState(inPopover ? false : initialCollapsed);
  const [activeSection, setActiveSection] = useState<string | null>('typography');

  if (!styleContext) return null;

  const { styleOptions, updateStyleOption, resetStyleOptions } = styleContext;

  const headerCaseOptions: { value: HeaderCase; label: string; preview: string }[] = [
    { value: 'uppercase', label: 'AA', preview: 'EXPERIENCE' },
    { value: 'capitalize', label: 'Aa', preview: 'Experience' },
    { value: 'lowercase', label: 'aa', preview: 'experience' },
  ];

  const bulletOptions: { value: BulletStyle; label: string }[] = [
    { value: '•', label: '•' },
    { value: '◦', label: '◦' },
    { value: '▪', label: '▪' },
    { value: '–', label: '–' },
    { value: '▸', label: '▸' },
    { value: 'none', label: '∅' },
  ];

  const dividerOptions: { value: DividerStyle; label: string; style: React.CSSProperties }[] = [
    { value: 'line', label: '—', style: { borderBottom: '2px solid currentColor', width: '20px' } },
    { value: 'dotted', label: '···', style: { borderBottom: '2px dotted currentColor', width: '20px' } },
    { value: 'double', label: '═', style: { borderBottom: '3px double currentColor', width: '20px' } },
    { value: 'none', label: '∅', style: {} },
  ];

  const fontSizeOptions: { value: FontSizeScale; label: string }[] = [
    { value: 'compact', label: 'Compact' },
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Large' },
  ];

  const dateFormatOptions: { value: DateFormat; label: string; example: string }[] = [
    { value: 'short', label: 'Short', example: 'Jan 2024' },
    { value: 'medium', label: 'Medium', example: 'January 2024' },
    { value: 'long', label: 'Numeric', example: '01/2024' },
  ];

  const visibilityOptions: { key: keyof typeof styleOptions; label: string }[] = [
    { key: 'showPhoto', label: 'Photo' },
    { key: 'showSummary', label: 'Summary' },
    { key: 'showExperience', label: 'Experience' },
    { key: 'showEducation', label: 'Education' },
    { key: 'showSkills', label: 'Skills' },
    { key: 'showSections', label: 'Custom Sections' },
  ];

  const sections = [
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'bullets', label: 'Bullets & Dividers', icon: List },
    { id: 'visibility', label: 'Show/Hide', icon: Eye },
  ];

  return (
    <div className={cn(inPopover ? "bg-white" : "bg-white border rounded-lg shadow-sm", className)}>
      {/* Header */}
      <div 
        className={cn(
          "flex items-center justify-between p-3 border-b",
          !inPopover && "cursor-pointer hover:bg-gray-50 transition-colors"
        )}
        onClick={() => !inPopover && setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-sm">Style Options</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              resetStyleOptions();
            }}
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
          {!inPopover && (
            isCollapsed ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            )
          )}
        </div>
      </div>

      {/* Content */}
      {(inPopover || !isCollapsed) && (
        <div className="p-3 space-y-4">
          {/* Section Tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-colors",
                  activeSection === section.id
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <section.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Typography Section */}
          {activeSection === 'typography' && (
            <div className="space-y-4">
              {/* Header Case */}
              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Section Header Case
                </label>
                <div className="flex gap-1">
                  {headerCaseOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateStyleOption('headerCase', option.value)}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-md text-sm font-medium border transition-all",
                        styleOptions.headerCase === option.value
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      )}
                      title={option.preview}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Preview: <span className="font-medium">{headerCaseOptions.find(o => o.value === styleOptions.headerCase)?.preview}</span>
                </p>
              </div>

              {/* Font Size Scale */}
              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Font Size
                </label>
                <div className="flex gap-1">
                  {fontSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateStyleOption('fontSizeScale', option.value)}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-md text-sm font-medium border transition-all",
                        styleOptions.fontSizeScale === option.value
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Format - Coming Soon */}
              <div className="opacity-50">
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Date Format <span className="text-gray-400">(Coming Soon)</span>
                </label>
                <div className="flex gap-1">
                  {dateFormatOptions.map((option) => (
                    <button
                      key={option.value}
                      disabled
                      className="flex-1 py-2 px-2 rounded-md text-xs font-medium border bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                      title={option.example}
                    >
                      {option.example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bullets & Dividers Section */}
          {activeSection === 'bullets' && (
            <div className="space-y-4">
              {/* Bullet Style - Coming Soon */}
              <div className="opacity-50">
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Bullet Style <span className="text-gray-400">(Coming Soon)</span>
                </label>
                <div className="flex gap-1">
                  {bulletOptions.map((option) => (
                    <button
                      key={option.value}
                      disabled
                      className="flex-1 py-2 px-3 rounded-md text-lg font-medium border bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider Style */}
              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Section Dividers
                </label>
                <div className="flex gap-1">
                  {dividerOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateStyleOption('dividerStyle', option.value)}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-md text-sm font-medium border transition-all flex items-center justify-center",
                        styleOptions.dividerStyle === option.value
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      )}
                    >
                      {option.value === 'none' ? (
                        option.label
                      ) : (
                        <span style={option.style} className="inline-block" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Visibility Section */}
          {activeSection === 'visibility' && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 mb-2 block">
                Show/Hide Sections
              </label>
              <div className="grid grid-cols-2 gap-2">
                {visibilityOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => updateStyleOption(option.key, !styleOptions[option.key])}
                    className={cn(
                      "py-2 px-3 rounded-md text-xs font-medium border transition-all flex items-center gap-2",
                      styleOptions[option.key]
                        ? "bg-green-50 border-green-500 text-green-700"
                        : "bg-gray-50 border-gray-200 text-gray-400"
                    )}
                  >
                    <div className={cn(
                      "w-3 h-3 rounded-sm border-2 flex items-center justify-center",
                      styleOptions[option.key]
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    )}>
                      {styleOptions[option.key] && (
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                      )}
                    </div>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StyleOptionsPanel;
