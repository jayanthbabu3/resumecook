/**
 * Generic Variant Preview Component
 * 
 * Renders unique visual previews for all section types.
 * Each variant has a distinct visual style.
 */

import React from 'react';
import type { SectionVariant } from '@/constants/sectionVariants';
import type { V2SectionType } from '../../../types/resumeData';

interface GenericVariantPreviewProps {
  variant: SectionVariant;
  sectionType: V2SectionType;
}

export const GenericVariantPreview: React.FC<GenericVariantPreviewProps> = ({ variant, sectionType }) => {
  // Route to section-specific previews
  switch (sectionType) {
    case 'projects':
      return <ProjectsVariantPreview variantId={variant.id} />;
    case 'certifications':
      return <CertificationsVariantPreview variantId={variant.id} />;
    case 'languages':
      return <LanguagesVariantPreview variantId={variant.id} />;
    case 'awards':
      return <AwardsVariantPreview variantId={variant.id} />;
    case 'publications':
      return <PublicationsVariantPreview variantId={variant.id} />;
    case 'volunteer':
      return <VolunteerVariantPreview variantId={variant.id} />;
    case 'speaking':
      return <SpeakingVariantPreview variantId={variant.id} />;
    case 'achievements':
      return <AchievementsVariantPreview variantId={variant.id} />;
    case 'interests':
      return <InterestsVariantPreview variantId={variant.id} />;
    case 'references':
      return <ReferencesVariantPreview variantId={variant.id} />;
    case 'courses':
      return <CoursesVariantPreview variantId={variant.id} />;
    default:
      return <DefaultPreview title={variant.name} />;
  }
};

// ==================== DEFAULT PREVIEW ====================
const DefaultPreview: React.FC<{ title: string }> = ({ title }) => (
  <div className="w-full space-y-1.5">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">{title}</div>
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-primary"></div>
        <span className="text-[9px] text-gray-700">Sample item content</span>
      </div>
    </div>
  </div>
);

// ==================== PROJECTS VARIANTS ====================
const ProjectsVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'projects-classic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Projects</div>
          <div className="space-y-1">
            <div className="text-[10px] font-semibold text-gray-900">E-Commerce Platform</div>
            <div className="text-[9px] text-gray-600">Full-stack solution with React and Node.js</div>
            <div className="flex gap-1 mt-1">
              <span className="text-[7px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">React</span>
              <span className="text-[7px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">Node.js</span>
            </div>
          </div>
        </div>
      );
    case 'projects-card':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Featured Projects</div>
          <div className="p-2 rounded-lg border border-gray-200 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="text-[10px] font-bold text-gray-900">E-Commerce Platform</div>
            <div className="text-[9px] text-gray-600">Scalable platform serving 10K+ users</div>
            <div className="flex gap-1 mt-1">
              <span className="text-[7px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-full">React</span>
              <span className="text-[7px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-full">AWS</span>
            </div>
          </div>
        </div>
      );
    case 'projects-minimal':
      return (
        <div className="w-full space-y-1.5">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Projects</div>
          <div>
            <div className="text-[10px] font-medium text-gray-900">E-Commerce Platform</div>
            <div className="text-[9px] text-gray-500">React, Node.js • 2023</div>
          </div>
        </div>
      );
    case 'projects-timeline':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Project Timeline</div>
          <div className="relative pl-4 border-l-2 border-primary/40">
            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary"></div>
            <div className="text-[8px] text-gray-500">2022 - 2023</div>
            <div className="text-[10px] font-semibold text-gray-900">E-Commerce Platform</div>
            <div className="text-[9px] text-gray-600">Full-stack e-commerce solution</div>
          </div>
        </div>
      );
    case 'projects-grid':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Key Projects</div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="p-1.5 bg-gray-50 rounded border border-gray-100">
              <div className="text-[9px] font-medium text-gray-900">E-Commerce</div>
              <div className="text-[7px] text-gray-500">React, Node</div>
            </div>
            <div className="p-1.5 bg-gray-50 rounded border border-gray-100">
              <div className="text-[9px] font-medium text-gray-900">Analytics</div>
              <div className="text-[7px] text-gray-500">Python, ML</div>
            </div>
          </div>
        </div>
      );
    case 'projects-impact':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">High-Impact Projects</div>
          <div className="space-y-1">
            <div className="text-[10px] font-semibold text-gray-900">E-Commerce Platform</div>
            <div className="flex gap-1.5 mt-1">
              <span className="text-[7px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded">10K+ Users</span>
              <span className="text-[7px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">99.9% Uptime</span>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Projects</div>
          <div className="text-[10px] font-semibold text-gray-900">E-Commerce Platform</div>
          <div className="text-[9px] text-gray-600">Full-stack solution</div>
        </div>
      );
  }
};

// ==================== CERTIFICATIONS VARIANTS ====================
const CertificationsVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'cert-classic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Certifications</div>
          <div className="space-y-1">
            <div className="text-[10px] font-semibold text-gray-900">AWS Solutions Architect</div>
            <div className="text-[9px] text-primary">Amazon Web Services</div>
            <div className="text-[8px] text-gray-500">Issued: 2023 • ID: ABC123</div>
          </div>
        </div>
      );
    case 'cert-modern':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Professional Certifications</div>
          <div className="p-2 rounded-lg border-l-3 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center text-[8px] font-bold text-orange-600">AWS</div>
              <div>
                <div className="text-[10px] font-bold text-gray-900">Solutions Architect</div>
                <div className="text-[8px] text-gray-500">2023</div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'cert-badges':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Professional Badges</div>
          <div className="flex gap-2">
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[7px] font-bold text-orange-600 mx-auto">AWS</div>
              <div className="text-[7px] text-gray-600 mt-0.5">Architect</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[7px] font-bold text-blue-600 mx-auto">GCP</div>
              <div className="text-[7px] text-gray-600 mt-0.5">Engineer</div>
            </div>
          </div>
        </div>
      );
    case 'cert-timeline':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Certification Timeline</div>
          <div className="relative pl-4 border-l-2 border-primary/40">
            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary"></div>
            <div className="text-[8px] text-gray-500">2023</div>
            <div className="text-[10px] font-semibold text-gray-900">AWS Solutions Architect</div>
          </div>
        </div>
      );
    case 'cert-compact':
      return (
        <div className="w-full space-y-1.5">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Certifications</div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-1">
            <span className="text-[9px] font-medium text-gray-900">AWS Solutions Architect</span>
            <span className="text-[8px] text-gray-500">2023</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Certifications</div>
          <div className="text-[10px] font-semibold text-gray-900">AWS Solutions Architect</div>
          <div className="text-[9px] text-gray-600">Amazon Web Services • 2023</div>
        </div>
      );
  }
};

// ==================== LANGUAGES VARIANTS ====================
const LanguagesVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'lang-classic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Languages</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-[9px] text-gray-900">English</span>
              <span className="text-[8px] text-gray-500">Native</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[9px] text-gray-900">Spanish</span>
              <span className="text-[8px] text-gray-500">Professional</span>
            </div>
          </div>
        </div>
      );
    case 'lang-bars':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Language Proficiency</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-gray-700 w-12">English</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-full bg-primary rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-gray-700 w-12">Spanish</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'lang-pills':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Languages</div>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] rounded-full">English (Native)</span>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] rounded-full">Spanish (B2)</span>
          </div>
        </div>
      );
    case 'lang-flag':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Languages</div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <span className="text-[12px]">🇺🇸</span>
              <span className="text-[9px] text-gray-700">English</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[12px]">🇪🇸</span>
              <span className="text-[9px] text-gray-700">Spanish</span>
            </div>
          </div>
        </div>
      );
    case 'lang-rating':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Language Skills</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-gray-700 w-14">English</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-primary"></div>)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-gray-700 w-14">Spanish</span>
              <div className="flex gap-0.5">
                {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-primary"></div>)}
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Languages</div>
          <div className="text-[9px] text-gray-700">English (Native) • Spanish (Professional)</div>
        </div>
      );
  }
};

// ==================== AWARDS VARIANTS ====================
const AwardsVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'awards-classic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Awards & Honors</div>
          <div className="space-y-1">
            <div className="text-[10px] font-semibold text-gray-900">Employee of the Year</div>
            <div className="text-[9px] text-primary">Tech Corp • 2023</div>
            <div className="text-[8px] text-gray-500">Recognized for outstanding contributions</div>
          </div>
        </div>
      );
    case 'awards-modern':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Achievements & Recognition</div>
          <div className="p-2 rounded-lg bg-gradient-to-r from-amber-50 to-transparent border-l-3 border-l-amber-400">
            <div className="flex items-center gap-2">
              <span className="text-[14px]">🏆</span>
              <div>
                <div className="text-[10px] font-bold text-gray-900">Employee of the Year</div>
                <div className="text-[8px] text-gray-500">Tech Corp • 2023</div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'awards-icon':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Honors & Awards</div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-[10px]">🏆</span>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-gray-900">Employee of the Year</div>
              <div className="text-[8px] text-gray-500">Tech Corp • 2023</div>
            </div>
          </div>
        </div>
      );
    case 'awards-timeline':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Achievement Timeline</div>
          <div className="relative pl-4 border-l-2 border-amber-400">
            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-amber-400"></div>
            <div className="text-[8px] text-gray-500">2023</div>
            <div className="text-[10px] font-semibold text-gray-900">Employee of the Year</div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Awards</div>
          <div className="text-[10px] font-semibold text-gray-900">Employee of the Year</div>
          <div className="text-[9px] text-gray-600">Tech Corp • 2023</div>
        </div>
      );
  }
};

// ==================== PUBLICATIONS VARIANTS ====================
const PublicationsVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'pub-classic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Publications</div>
          <div className="space-y-1">
            <div className="text-[10px] font-semibold text-gray-900 italic">"Machine Learning in Cloud Computing"</div>
            <div className="text-[9px] text-gray-600">IEEE Transactions • 2023</div>
          </div>
        </div>
      );
    case 'pub-academic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Scholarly Publications</div>
          <div className="p-2 bg-gray-50 rounded border-l-2 border-primary">
            <div className="text-[10px] font-semibold text-gray-900">"Machine Learning in Cloud Computing"</div>
            <div className="text-[9px] text-primary">IEEE Transactions on Cloud Computing</div>
            <div className="text-[8px] text-gray-500">DOI: 10.1109/example • 2023</div>
          </div>
        </div>
      );
    case 'pub-modern':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Research & Publications</div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-[10px]">📄</div>
            <div>
              <div className="text-[10px] font-semibold text-gray-900">Machine Learning in Cloud</div>
              <div className="text-[8px] text-gray-500">IEEE • 2023</div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Publications</div>
          <div className="text-[10px] font-semibold text-gray-900">"Machine Learning in Cloud Computing"</div>
          <div className="text-[9px] text-gray-600">IEEE • 2023</div>
        </div>
      );
  }
};

// ==================== VOLUNTEER VARIANTS ====================
const VolunteerVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'volunteer-classic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Volunteer Experience</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <div className="text-[10px] font-semibold text-gray-900">Volunteer Developer</div>
              <div className="text-[8px] text-gray-500">2020 - Present</div>
            </div>
            <div className="text-[9px] text-primary">Code for Good</div>
            <div className="text-[8px] text-gray-600">Build websites for non-profits</div>
          </div>
        </div>
      );
    case 'volunteer-modern':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Community Service</div>
          <div className="p-2 rounded-lg bg-gradient-to-r from-green-50 to-transparent border-l-3 border-l-green-400">
            <div className="text-[10px] font-bold text-gray-900">Volunteer Developer</div>
            <div className="text-[9px] text-green-600">Code for Good</div>
            <div className="text-[8px] text-gray-500">2020 - Present</div>
          </div>
        </div>
      );
    case 'volunteer-impact':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Community Impact</div>
          <div className="space-y-1">
            <div className="text-[10px] font-semibold text-gray-900">Code for Good</div>
            <div className="flex gap-1.5 mt-1">
              <span className="text-[7px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded">5 Websites</span>
              <span className="text-[7px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">10K+ Reached</span>
            </div>
          </div>
        </div>
      );
    case 'volunteer-timeline':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Volunteer Timeline</div>
          <div className="relative pl-4 border-l-2 border-green-400">
            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-green-400"></div>
            <div className="text-[8px] text-gray-500">2020 - Present</div>
            <div className="text-[10px] font-semibold text-gray-900">Volunteer Developer</div>
            <div className="text-[9px] text-green-600">Code for Good</div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Volunteer</div>
          <div className="text-[10px] font-semibold text-gray-900">Volunteer Developer</div>
          <div className="text-[9px] text-gray-600">Code for Good • 2020 - Present</div>
        </div>
      );
  }
};

// ==================== SPEAKING VARIANTS ====================
const SpeakingVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'speaking-classic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Speaking Engagements</div>
          <div className="space-y-1">
            <div className="text-[10px] font-semibold text-gray-900">"Scaling Microservices"</div>
            <div className="text-[9px] text-primary">TechConf 2023</div>
            <div className="text-[8px] text-gray-500">San Francisco, CA</div>
          </div>
        </div>
      );
    case 'speaking-modern':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Conference Talks</div>
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-50 to-transparent border-l-3 border-l-purple-400">
            <div className="flex items-center gap-2">
              <span className="text-[14px]">🎤</span>
              <div>
                <div className="text-[10px] font-bold text-gray-900">Scaling Microservices</div>
                <div className="text-[8px] text-gray-500">TechConf 2023 • San Francisco</div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'speaking-featured':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Featured Talks</div>
          <div className="p-2 bg-purple-50 rounded-lg">
            <div className="text-[10px] font-bold text-purple-700">"Scaling Microservices"</div>
            <div className="text-[9px] text-gray-700">TechConf 2023</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[7px] px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded">Keynote</span>
              <span className="text-[7px] text-gray-500">500+ attendees</span>
            </div>
          </div>
        </div>
      );
    case 'speaking-timeline':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Speaking Timeline</div>
          <div className="relative pl-4 border-l-2 border-purple-400">
            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-purple-400"></div>
            <div className="text-[8px] text-gray-500">2023</div>
            <div className="text-[10px] font-semibold text-gray-900">Scaling Microservices</div>
            <div className="text-[9px] text-purple-600">TechConf</div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Speaking</div>
          <div className="text-[10px] font-semibold text-gray-900">"Scaling Microservices"</div>
          <div className="text-[9px] text-gray-600">TechConf 2023</div>
        </div>
      );
  }
};

// ==================== ACHIEVEMENTS VARIANTS ====================
const AchievementsVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'achievements-classic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Key Achievements</div>
          <div className="space-y-1">
            <div className="flex items-start gap-1.5">
              <div className="w-1 h-1 rounded-full bg-primary mt-1.5"></div>
              <span className="text-[9px] text-gray-700">Increased revenue by 40% through strategic initiatives</span>
            </div>
            <div className="flex items-start gap-1.5">
              <div className="w-1 h-1 rounded-full bg-primary mt-1.5"></div>
              <span className="text-[9px] text-gray-700">Led product launch reaching 100K users</span>
            </div>
          </div>
        </div>
      );
    case 'achievements-metrics':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Achievements</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-green-600 font-bold">↗ 40%</span>
              <span className="text-[9px] text-gray-700">Revenue Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-blue-600 font-bold">100K+</span>
              <span className="text-[9px] text-gray-700">Users Acquired</span>
            </div>
          </div>
        </div>
      );
    case 'achievements-cards':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Notable Achievements</div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="p-1.5 bg-green-50 rounded text-center">
              <div className="text-[10px] font-bold text-green-700">40%</div>
              <div className="text-[7px] text-gray-600">Revenue</div>
            </div>
            <div className="p-1.5 bg-blue-50 rounded text-center">
              <div className="text-[10px] font-bold text-blue-700">100K</div>
              <div className="text-[7px] text-gray-600">Users</div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Achievements</div>
          <div className="text-[9px] text-gray-700">• Increased revenue by 40%</div>
          <div className="text-[9px] text-gray-700">• Led product launch reaching 100K users</div>
        </div>
      );
  }
};

// ==================== INTERESTS VARIANTS ====================
const InterestsVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'interests-pills':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Interests</div>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] rounded-full">Open Source</span>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] rounded-full">Photography</span>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] rounded-full">Hiking</span>
          </div>
        </div>
      );
    case 'interests-icons':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Hobbies & Interests</div>
          <div className="flex gap-3">
            <div className="text-center">
              <span className="text-[14px]">📷</span>
              <div className="text-[7px] text-gray-600">Photo</div>
            </div>
            <div className="text-center">
              <span className="text-[14px]">🥾</span>
              <div className="text-[7px] text-gray-600">Hiking</div>
            </div>
            <div className="text-center">
              <span className="text-[14px]">📚</span>
              <div className="text-[7px] text-gray-600">Reading</div>
            </div>
          </div>
        </div>
      );
    case 'interests-inline':
      return (
        <div className="w-full space-y-1.5">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Interests</div>
          <div className="text-[9px] text-gray-700">Open Source • Photography • Hiking • Reading • Chess</div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Interests</div>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[8px] rounded">Open Source</span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[8px] rounded">Photography</span>
          </div>
        </div>
      );
  }
};

// ==================== REFERENCES VARIANTS ====================
const ReferencesVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'references-classic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">References</div>
          <div className="space-y-1">
            <div className="text-[10px] font-semibold text-gray-900">John Smith</div>
            <div className="text-[9px] text-primary">Engineering Director, Tech Corp</div>
            <div className="text-[8px] text-gray-500">john.smith@techcorp.com</div>
          </div>
        </div>
      );
    case 'references-cards':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Professional References</div>
          <div className="p-2 rounded-lg border border-gray-200 bg-gray-50">
            <div className="text-[10px] font-semibold text-gray-900">John Smith</div>
            <div className="text-[9px] text-primary">Engineering Director</div>
            <div className="text-[8px] text-gray-500">Tech Corp</div>
          </div>
        </div>
      );
    case 'references-available':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">References</div>
          <div className="p-2 bg-gray-50 rounded text-center">
            <div className="text-[9px] text-gray-600 italic">Available upon request</div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">References</div>
          <div className="text-[10px] font-semibold text-gray-900">John Smith</div>
          <div className="text-[9px] text-gray-600">Engineering Director, Tech Corp</div>
        </div>
      );
  }
};

// ==================== COURSES VARIANTS ====================
const CoursesVariantPreview: React.FC<{ variantId: string }> = ({ variantId }) => {
  switch (variantId) {
    case 'courses-classic':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Professional Development</div>
          <div className="space-y-1">
            <div className="text-[10px] font-semibold text-gray-900">AWS Solutions Architect</div>
            <div className="text-[9px] text-primary">Amazon Web Services</div>
            <div className="text-[8px] text-gray-500">Completed: 2023</div>
          </div>
        </div>
      );
    case 'courses-cards':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Courses & Training</div>
          <div className="p-2 rounded-lg border border-gray-200 bg-gradient-to-r from-blue-50 to-transparent">
            <div className="text-[10px] font-bold text-gray-900">AWS Solutions Architect</div>
            <div className="text-[9px] text-blue-600">Amazon Web Services</div>
            <div className="text-[8px] text-gray-500">2023</div>
          </div>
        </div>
      );
    case 'courses-timeline':
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Learning Journey</div>
          <div className="relative pl-4 border-l-2 border-blue-400">
            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-blue-400"></div>
            <div className="text-[8px] text-gray-500">2023</div>
            <div className="text-[10px] font-semibold text-gray-900">AWS Solutions Architect</div>
            <div className="text-[9px] text-blue-600">AWS</div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full space-y-2">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Courses</div>
          <div className="text-[10px] font-semibold text-gray-900">AWS Solutions Architect</div>
          <div className="text-[9px] text-gray-600">Amazon Web Services • 2023</div>
        </div>
      );
  }
};
