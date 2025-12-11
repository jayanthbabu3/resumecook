/**
 * Personal Info Form Component
 * 
 * Handles personal information and professional summary.
 * This is always shown at the top of the form.
 */

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  photo?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
  disabled?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  personalInfo,
  onChange,
  disabled = false,
}) => {
  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <AccordionItem
      value="personal"
      className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
    >
      <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
        <span className="flex items-center gap-3 text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
            <FileText className="h-4 w-4" />
          </span>
          Personal Information
        </span>
        <span className="ml-auto flex items-center">
          <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
            Basics
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-0 pb-6 pt-0">
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="pb-3">
            <CardDescription>Your basic contact details and professional title</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name and Title */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={personalInfo.fullName || ''}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="John Doe"
                  disabled={disabled}
                  className="h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="title" className="text-sm font-medium">
                  Professional Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={personalInfo.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Senior Software Engineer"
                  disabled={disabled}
                  className="h-9"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="john@example.com"
                  disabled={disabled}
                  className="h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={personalInfo.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  disabled={disabled}
                  className="h-9"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={personalInfo.location || ''}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="San Francisco, CA"
                disabled={disabled}
                className="h-9"
              />
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <Label htmlFor="summary" className="text-sm font-medium">
                Professional Summary
              </Label>
              <Textarea
                id="summary"
                value={personalInfo.summary || ''}
                onChange={(e) => updateField('summary', e.target.value)}
                placeholder="Brief overview of your professional background and key achievements..."
                rows={4}
                disabled={disabled}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PersonalInfoForm;
