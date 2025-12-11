/**
 * Social Links Form Component
 * 
 * Handles LinkedIn, GitHub, and Portfolio links.
 */

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Share2 } from 'lucide-react';

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

interface SocialLinksFormProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
  includeSocialLinks: boolean;
  onIncludeSocialLinksChange: (include: boolean) => void;
  disabled?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const SocialLinksForm: React.FC<SocialLinksFormProps> = ({
  personalInfo,
  onChange,
  includeSocialLinks,
  onIncludeSocialLinksChange,
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
      value="social-links"
      className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
    >
      <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
        <span className="flex items-center gap-3 text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
            <Share2 className="h-4 w-4" />
          </span>
          Social Links
        </span>
        <span className="ml-auto flex items-center">
          <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
            {includeSocialLinks ? 'Included' : 'Hidden'}
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-0 pb-6 pt-0">
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="pb-4">
            <CardDescription>Add your professional social media and portfolio links</CardDescription>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="include-social-links"
                checked={includeSocialLinks}
                onCheckedChange={(checked) => onIncludeSocialLinksChange(checked as boolean)}
                disabled={disabled}
              />
              <Label htmlFor="include-social-links" className="text-sm font-medium cursor-pointer">
                Include Social Links section in resume
              </Label>
            </div>
          </CardHeader>
          {includeSocialLinks && (
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="linkedin" className="text-sm font-medium">
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={personalInfo.linkedin || ''}
                    onChange={(e) => updateField('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/johndoe"
                    disabled={disabled}
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="portfolio" className="text-sm font-medium">
                    Portfolio/Website
                  </Label>
                  <Input
                    id="portfolio"
                    type="url"
                    value={personalInfo.portfolio || ''}
                    onChange={(e) => updateField('portfolio', e.target.value)}
                    placeholder="https://johndoe-portfolio.com"
                    disabled={disabled}
                    className="h-9"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="github" className="text-sm font-medium">
                  GitHub Profile
                </Label>
                <Input
                  id="github"
                  type="url"
                  value={personalInfo.github || ''}
                  onChange={(e) => updateField('github', e.target.value)}
                  placeholder="https://github.com/johndoe"
                  disabled={disabled}
                  className="h-9"
                />
              </div>
            </CardContent>
          )}
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SocialLinksForm;
