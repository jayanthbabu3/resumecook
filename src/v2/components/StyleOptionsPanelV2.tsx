/**
 * Resume Builder V2 - Style Options Panel
 * 
 * Production-ready, industry-standard UX with tab-based interface.
 * Compact design with rich interactions and smooth animations.
 */

import React, { useState } from 'react';
import { useStyleOptions, type HeaderCase, type FontSizeScale, type DividerStyle, type DateFormat, type BulletStyle } from '@/contexts/StyleOptionsContext';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Minus, 
  Eye, 
  RotateCcw,
  Calendar,
  List,
  Palette,
  Settings2,
  Image,
  FileText,
  Briefcase,
  GraduationCap,
  Lightbulb,
  LayoutGrid,
  AlignLeft,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StyleOptionsPanelV2Props {
  inPopover?: boolean;
  className?: string;
}

export const StyleOptionsPanelV2: React.FC<StyleOptionsPanelV2Props> = ({
  inPopover = false,
  className,
}) => {
  const { styleOptions, updateStyleOption, resetStyleOptions } = useStyleOptions();
  const [activeTab, setActiveTab] = useState('style');

  const containerClass = inPopover 
    ? 'p-0 bg-white' 
    : 'p-0 bg-white rounded-lg border shadow-sm';

  return (
    <div className={cn(containerClass, className)}>
      {/* Premium Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-primary/5 via-white to-cyan-50/30 border-b px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-gradient-to-br from-primary to-cyan-600 rounded shadow-sm">
            <Settings2 className="w-3 h-3 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 text-xs">Style Options</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetStyleOptions}
          className="h-6 px-2 text-xs text-gray-600 hover:text-primary hover:bg-primary/5 transition-all"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </div>

      {/* Modern Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-auto bg-white p-0 rounded-none border-b-2 border-gray-100">
          <TabsTrigger 
            value="style" 
            className="relative text-xs font-medium py-2.5 px-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-primary/5 transition-all hover:bg-gray-50"
          >
            <Palette className="w-3.5 h-3.5 mr-1.5" />
            Style
          </TabsTrigger>
          <TabsTrigger 
            value="format" 
            className="relative text-xs font-medium py-2.5 px-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-primary/5 transition-all hover:bg-gray-50"
          >
            <Settings2 className="w-3.5 h-3.5 mr-1.5" />
            Format
          </TabsTrigger>
          <TabsTrigger 
            value="visibility" 
            className="relative text-xs font-medium py-2.5 px-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-primary/5 transition-all hover:bg-gray-50"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            Sections
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <div className="max-h-[calc(85vh-100px)] overflow-y-auto">
          {/* Style Tab */}
          <TabsContent value="style" className="p-3 space-y-4 m-0">
            {/* Typography Section */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 pb-1">
                <Type className="w-3.5 h-3.5 text-primary" />
                <Label className="text-xs font-semibold text-gray-800">Typography</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-600">Header Case</Label>
                  <Select
                    value={styleOptions.headerCase}
                    onValueChange={(value) => updateStyleOption('headerCase', value as HeaderCase)}
                  >
                    <SelectTrigger className="h-8 text-xs bg-white hover:bg-gray-50 border-gray-200 hover:border-primary/40 transition-all">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uppercase" className="text-xs">UPPERCASE</SelectItem>
                      <SelectItem value="capitalize" className="text-xs">Capitalize</SelectItem>
                      <SelectItem value="lowercase" className="text-xs">lowercase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-600">Font Size</Label>
                  <Select
                    value={styleOptions.fontSizeScale}
                    onValueChange={(value) => updateStyleOption('fontSizeScale', value as FontSizeScale)}
                  >
                    <SelectTrigger className="h-8 text-xs bg-white hover:bg-gray-50 border-gray-200 hover:border-primary/40 transition-all">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact" className="text-xs">Compact</SelectItem>
                      <SelectItem value="normal" className="text-xs">Normal</SelectItem>
                      <SelectItem value="large" className="text-xs">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Section Dividers */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 pb-1">
                <Minus className="w-3.5 h-3.5 text-primary" />
                <Label className="text-xs font-semibold text-gray-800">Section Dividers</Label>
              </div>
              
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { value: 'line', label: 'Line', preview: 'border-b border-gray-400' },
                  { value: 'dotted', label: 'Dotted', preview: 'border-b-2 border-dotted border-gray-400' },
                  { value: 'double', label: 'Double', preview: 'border-b-4 border-double border-gray-400' },
                  { value: 'thin', label: 'Thin', preview: 'border-b border-gray-300' },
                ].map((style) => (
                  <button
                    key={style.value}
                    onClick={() => updateStyleOption('dividerStyle', style.value as DividerStyle)}
                    className={cn(
                      'p-2 rounded-lg border transition-all duration-200 flex flex-col items-center gap-1.5 group',
                      styleOptions.dividerStyle === style.value
                        ? 'border-primary bg-gradient-to-br from-primary/5 to-cyan-50/50 shadow-sm ring-1 ring-primary/20'
                        : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50 hover:shadow-sm'
                    )}
                  >
                    <div className={cn('w-full h-0.5', style.preview)} />
                    <span className={cn(
                      'text-xs font-medium transition-colors',
                      styleOptions.dividerStyle === style.value ? 'text-primary' : 'text-gray-600 group-hover:text-gray-900'
                    )}>
                      {style.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Text Alignment - New Addition */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 pb-1">
                <AlignLeft className="w-3.5 h-3.5 text-primary" />
                <Label className="text-xs font-semibold text-gray-800">Layout</Label>
              </div>
              
              <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-600">
                  Additional layout options coming soon
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Format Tab */}
          <TabsContent value="format" className="p-3 space-y-4 m-0">
            {/* Date Format */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 pb-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                <Label className="text-xs font-semibold text-gray-800">Date Format</Label>
              </div>
              
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: 'short', label: 'Jan 2024' },
                  { value: 'long', label: 'January 2024' },
                  { value: 'medium', label: '01/2024' },
                ].map((format) => (
                  <button
                    key={format.value}
                    onClick={() => updateStyleOption('dateFormat', format.value as DateFormat)}
                    className={cn(
                      'px-2 py-2 rounded-lg border text-xs font-medium transition-all duration-200 group',
                      styleOptions.dateFormat === format.value
                        ? 'border-primary bg-gradient-to-br from-primary/5 to-cyan-50/50 text-primary shadow-sm ring-1 ring-primary/20'
                        : 'border-gray-200 text-gray-700 hover:border-primary/30 hover:bg-gray-50 hover:shadow-sm hover:text-gray-900'
                    )}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Bullet Style */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 pb-1">
                <List className="w-3.5 h-3.5 text-cyan-600" />
                <Label className="text-xs font-semibold text-gray-800">Bullet Style</Label>
              </div>
              
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { value: '•', label: '•', name: 'Disc' },
                  { value: '◦', label: '◦', name: 'Circle' },
                  { value: '▪', label: '▪', name: 'Square' },
                  { value: '–', label: '–', name: 'Dash' },
                  { value: '▸', label: '▸', name: 'Arrow' },
                ].map((bullet) => (
                  <button
                    key={bullet.value}
                    onClick={() => updateStyleOption('bulletStyle', bullet.value as BulletStyle)}
                    className={cn(
                      'p-2 rounded-lg border transition-all duration-200 flex items-center justify-center aspect-square group',
                      styleOptions.bulletStyle === bullet.value
                        ? 'border-primary bg-gradient-to-br from-primary/5 to-cyan-50/50 shadow-sm ring-1 ring-primary/20'
                        : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50 hover:shadow-sm'
                    )}
                    title={bullet.name}
                  >
                    <span className={cn(
                      'text-sm transition-all',
                      styleOptions.bulletStyle === bullet.value ? 'text-primary scale-110' : 'text-gray-600 group-hover:text-gray-900 group-hover:scale-110'
                    )}>
                      {bullet.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Visibility Tab */}
          <TabsContent value="visibility" className="p-3 m-0">
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 pb-1">
                <Eye className="w-3.5 h-3.5 text-primary" />
                <Label className="text-xs font-semibold text-gray-800">Content Sections</Label>
              </div>
              
              <div className="space-y-0.5 bg-gray-50/50 rounded-lg p-1.5 border border-gray-100">
                {[
                  { key: 'showPhoto', label: 'Photo', icon: Image },
                  { key: 'showSummary', label: 'Summary', icon: FileText },
                  { key: 'showExperience', label: 'Experience', icon: Briefcase },
                  { key: 'showEducation', label: 'Education', icon: GraduationCap },
                  { key: 'showSkills', label: 'Skills', icon: Lightbulb },
                  { key: 'showStrengths', label: 'Strengths', icon: Target },
                  { key: 'showSections', label: 'Custom Sections', icon: LayoutGrid },
                ].map((item) => {
                  const Icon = item.icon;
                  const isChecked = styleOptions[item.key as keyof typeof styleOptions] as boolean;
                  return (
                    <div 
                      key={item.key} 
                      className={cn(
                        "flex items-center justify-between py-2 px-2.5 rounded-md transition-all duration-200 group cursor-pointer",
                        isChecked ? "bg-white shadow-sm" : "hover:bg-white/50"
                      )}
                      onClick={() => updateStyleOption(item.key as any, !isChecked)}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={cn(
                          "w-3.5 h-3.5 transition-colors duration-200",
                          isChecked ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                        )} />
                        <Label className={cn(
                          "text-xs font-medium cursor-pointer transition-colors",
                          isChecked ? "text-gray-900" : "text-gray-600 group-hover:text-gray-800"
                        )}>
                          {item.label}
                        </Label>
                      </div>
                      <Switch
                        checked={isChecked}
                        onCheckedChange={(checked) => updateStyleOption(item.key as any, checked)}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-cyan-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default StyleOptionsPanelV2;
