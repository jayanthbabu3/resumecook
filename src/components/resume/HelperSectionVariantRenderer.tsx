import React from 'react';
import { ResumeSection } from '@/types/resume';
import { Star } from 'lucide-react';

interface HelperSectionVariantRendererProps {
  section: ResumeSection;
  formatDate: (date: string) => string;
}

export const HelperSectionVariantRenderer: React.FC<HelperSectionVariantRendererProps> = ({
  section,
  formatDate,
}) => {
  const { data: sectionData, title } = section;

  // Safety check - ensure section data exists
  if (!sectionData) {
    console.warn('Section data is missing for section:', section.id);
    return null;
  }

  const variantId = sectionData.variantId || 'classic'; // Default to classic if no variant selected

  // Extract style name from variant ID (e.g., 'lang-classic' => 'classic')
  const style = variantId.split('-').slice(1).join('-') || 'classic';

  // Ensure items array exists for item-based sections
  if (['languages', 'projects', 'awards', 'publications', 'volunteer', 'speaking', 'patents', 'portfolio', 'certifications'].includes(sectionData.type)) {
    if (!sectionData.items || !Array.isArray(sectionData.items)) {
      console.warn(`Section ${section.id} (${sectionData.type}) has no items array or items is not an array:`, sectionData);
      return null;
    }
  }

  switch (sectionData.type) {
    case 'languages':
      return renderLanguagesVariant(sectionData, title, style, formatDate);
    case 'projects':
      return renderProjectsVariant(sectionData, title, style, formatDate);
    case 'awards':
      return renderAwardsVariant(sectionData, title, style, formatDate);
    case 'publications':
      return renderPublicationsVariant(sectionData, title, style, formatDate);
    case 'volunteer':
      return renderVolunteerVariant(sectionData, title, style, formatDate);
    case 'speaking':
      return renderSpeakingVariant(sectionData, title, style, formatDate);
    case 'patents':
      return renderPatentsVariant(sectionData, title, style, formatDate);
    case 'portfolio':
      return renderPortfolioVariant(sectionData, title, style);
    case 'certifications':
      return renderCertificationsVariant(sectionData, title, style, formatDate);
    case 'custom':
      return renderCustomSection(sectionData, title);
    default:
      console.warn('Unknown section type:', sectionData.type);
      return null;
  }
};

// ==================== LANGUAGES VARIANTS ====================
function renderLanguagesVariant(data: any, title: string, style: string, formatDate: (date: string) => string) {
  const { items } = data;
  if (!items || items.length === 0) return null;

  const containerClass = "mb-8";
  const titleClass = getTitleClass(style);

  if (style === 'classic') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-2">
          {items.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-800 font-medium">{item.language}</span>
              <span className="text-gray-600">{item.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'bars') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((item: any) => {
            const level = item.level || getProficiencyLevel(item.proficiency);
            return (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-800 font-medium">{item.language}</span>
                  <span className="text-xs text-gray-600">{item.proficiency}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-900 rounded-full"
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (style === 'minimal') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-base font-semibold text-gray-900 mb-3">{title}</h2>
        <div className="text-sm text-gray-700">
          {items.map((item: any, idx: number) => (
            <span key={item.id}>
              {item.language}
              {idx < items.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'inline') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <p className="text-sm text-gray-700">
          {items.map((item: any, idx: number) => (
            <span key={item.id}>
              {item.language} ({item.proficiency})
              {idx < items.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>
    );
  }

  if (style === 'rating') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-2">
          {items.map((item: any) => {
            const rating = item.rating || Math.ceil(getProficiencyLevel(item.proficiency) / 20);
            return (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-800 font-medium">{item.language}</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rating ? 'fill-gray-900 text-gray-900' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-2">
          {items.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-800 font-medium">{item.language}</span>
              <span className="text-gray-600">
                {item.proficiency}
                {item.cefr && ` (${item.cefr})`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'pills') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="flex flex-wrap gap-2">
          {items.map((item: any) => (
            <span
              key={item.id}
              className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full font-medium"
            >
              {item.language}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'two-column' || style === 'twocolumn') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="grid grid-cols-2 gap-3">
          {items.map((item: any) => (
            <div key={item.id} className="text-sm text-gray-800">
              {item.language} - <span className="text-gray-600">{item.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'compact') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-base font-semibold text-gray-900 mb-2">{title}</h2>
        <div className="space-y-1">
          {items.map((item: any) => (
            <div key={item.id} className="text-sm text-gray-700">
              {item.language} ({item.proficiency})
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'flag') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-2">
          {items.map((item: any) => (
            <div key={item.id} className="flex items-center gap-2 text-sm">
              {item.flag && <span className="text-base">{item.flag}</span>}
              <span className="text-gray-800 font-medium">{item.language}</span>
              <span className="text-gray-600">({item.proficiency})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default to classic
  return renderLanguagesVariant(data, title, 'classic', formatDate);
}

// ==================== PROJECTS VARIANTS ====================
function renderProjectsVariant(data: any, title: string, style: string, formatDate: (date: string) => string) {
  const { items } = data;
  if (!items || items.length === 0) return null;

  const containerClass = "mb-8";
  const titleClass = getTitleClass(style);

  if (style === 'classic') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((project: any) => (
            <div key={project.id} style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-gray-700 leading-relaxed mt-1">{project.description}</p>
              )}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.techStack.map((tech: string, idx: number) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {(project.url || project.githubUrl) && (
                <div className="text-xs text-gray-600 mt-1">
                  {project.url && <span>Demo: {project.url}</span>}
                  {project.url && project.githubUrl && <span> | </span>}
                  {project.githubUrl && <span>Code: {project.githubUrl}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'card') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((project: any) => (
            <div key={project.id} className="bg-gray-50 p-4 rounded" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-gray-700 mt-2">{project.description}</p>
              )}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.techStack.map((tech: string, idx: number) => (
                    <span key={idx} className="text-xs bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'minimal') {
    return (
      <div className={containerClass}>
        <h2 className="text-base font-semibold text-gray-900 mb-3">{title}</h2>
        <div className="space-y-3">
          {items.map((project: any) => (
            <div key={project.id} style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-sm font-semibold text-gray-900">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-gray-700">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((project: any) => (
            <div key={project.id} style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
                {(project.startDate || project.endDate) && (
                  <span className="text-xs text-gray-600">
                    {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="text-sm text-gray-700 leading-relaxed mt-1">{project.description}</p>
              )}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.techStack.map((tech: string, idx: number) => (
                    <span key={idx} className="text-xs bg-gray-900 text-white px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {(project.url || project.githubUrl) && (
                <div className="text-xs text-gray-600 mt-2">
                  {project.url && <div>🔗 {project.url}</div>}
                  {project.githubUrl && <div>💻 {project.githubUrl}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'grid') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="grid grid-cols-2 gap-4">
          {items.map((project: any) => (
            <div key={project.id} style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-sm font-bold text-gray-900">{project.name}</h3>
              {project.description && (
                <p className="text-xs text-gray-700 mt-1">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'timeline') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((project: any) => (
            <div key={project.id} className="flex gap-3" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                <div className="w-0.5 h-full bg-gray-300 min-h-[40px]"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
                {(project.startDate || project.endDate) && (
                  <p className="text-xs text-gray-600">
                    {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
                  </p>
                )}
                {project.description && (
                  <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'impact') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((project: any) => (
            <div key={project.id} style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              )}
              {project.impact && project.impact.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.impact.map((imp: string, idx: number) => (
                    <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                      {imp}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'boxed') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((project: any) => (
            <div key={project.id} className="border border-gray-300 p-3 rounded" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'compact') {
    return (
      <div className={containerClass}>
        <h2 className="text-base font-semibold text-gray-900 mb-2">{title}</h2>
        <div className="space-y-2">
          {items.map((project: any) => (
            <div key={project.id} className="text-sm">
              <span className="font-semibold text-gray-900">{project.name}</span>: {project.description}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'showcase') {
    return (
      <div className={containerClass}>
        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-900 pb-2">
          {title}
        </h2>
        <div className="space-y-4">
          {items.map((project: any) => (
            <div key={project.id} style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              )}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.techStack.map((tech: string, idx: number) => (
                    <span key={idx} className="text-xs bg-gray-900 text-white px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.url && (
                <div className="text-sm text-gray-900 mt-2 font-medium">→ {project.url}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default to classic
  return renderProjectsVariant(data, title, 'classic', formatDate);
}

// Continue with remaining section renderers in next part...
// (Due to file size, I'll split the implementation)

// ==================== HELPER FUNCTIONS ====================
function getTitleClass(style: string): string {
  const executiveStyles = ['executive', 'showcase', 'professional', 'highlight', 'academic', 'formal'];
  const minimalStyles = ['minimal', 'compact'];

  if (executiveStyles.includes(style)) {
    return 'text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-900 pb-2';
  }

  if (minimalStyles.includes(style)) {
    return 'text-base font-semibold text-gray-900 mb-3';
  }

  // Default/classic style
  return 'text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2';
}

function getProficiencyLevel(proficiency: string): number {
  const levels: Record<string, number> = {
    'Native': 100,
    'Fluent': 90,
    'Professional': 80,
    'Advanced': 75,
    'Intermediate': 60,
    'Basic': 40,
    'Beginner': 25,
  };
  return levels[proficiency] || 50;
}

// ==================== AWARDS VARIANTS ====================
function renderAwardsVariant(data: any, title: string, style: string, formatDate: (date: string) => string) {
  const { items } = data;
  if (!items || items.length === 0) return null;

  const containerClass = "mb-8";
  const titleClass = getTitleClass(style);

  if (style === 'classic' || style === 'modern' || style === 'minimal') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className={`space-y-3 ${style === 'modern' ? 'space-y-4' : ''}`}>
          {items.map((award: any) => (
            <div
              key={award.id}
              className={style === 'modern' ? 'bg-gray-50 p-3 rounded' : ''}
              style={{ pageBreakInside: 'avoid' }}
            >
              <div className="flex justify-between items-baseline">
                <h3 className={`font-bold text-gray-900 ${style === 'minimal' ? 'text-sm' : 'text-base'}`}>
                  {award.title}
                </h3>
                <span className="text-xs text-gray-600">{formatDate(award.date)}</span>
              </div>
              <p className={`text-gray-700 ${style === 'minimal' ? 'text-xs' : 'text-sm'}`}>{award.issuer}</p>
              {award.description && style !== 'minimal' && (
                <p className="text-sm text-gray-600 mt-1">{award.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'timeline') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((award: any) => (
            <div key={award.id} className="flex gap-3" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                <div className="w-0.5 h-full bg-gray-300 min-h-[30px]"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900">{award.title}</h3>
                <p className="text-sm text-gray-700">{award.issuer} • {formatDate(award.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((award: any) => (
            <div key={award.id} style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-bold text-gray-900">{award.title}</h3>
                <span className="text-xs text-gray-600">{formatDate(award.date)}</span>
              </div>
              <p className="text-sm text-gray-700 font-medium">{award.issuer}</p>
              {award.description && (
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{award.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'icon') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((award: any) => (
            <div key={award.id} className="flex items-start gap-3">
              <span className="text-xl">🏆</span>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900">{award.title}</h3>
                <p className="text-sm text-gray-700">{award.issuer} • {formatDate(award.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'compact') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-base font-semibold text-gray-900 mb-2">{title}</h2>
        <div className="space-y-1">
          {items.map((award: any) => (
            <div key={award.id} className="text-sm text-gray-700">
              {award.title} • {formatDate(award.date)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'boxed') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((award: any) => (
            <div key={award.id} className="border border-gray-300 p-3 rounded" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-base font-bold text-gray-900">{award.title}</h3>
              <p className="text-sm text-gray-700">{award.issuer} • {formatDate(award.date)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'two-column' || style === 'twocolumn') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="grid grid-cols-2 gap-3">
          {items.map((award: any) => (
            <div key={award.id}>
              <div className="text-sm font-bold text-gray-900">{award.title}</div>
              <div className="text-xs text-gray-600 text-right">{award.issuer}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'highlight') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-900 pb-2">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((award: any) => (
            <div key={award.id} style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-base font-bold text-gray-900">{award.title}</h3>
              <p className="text-sm text-gray-800">{award.issuer} • {formatDate(award.date)}</p>
              {award.description && (
                <p className="text-sm text-gray-900 italic mt-1">{award.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return renderAwardsVariant(data, title, 'classic', formatDate);
}

// ==================== PUBLICATIONS VARIANTS ====================
function renderPublicationsVariant(data: any, title: string, style: string, formatDate: (date: string) => string) {
  const { items } = data;
  if (!items || items.length === 0) return null;

  const containerClass = "mb-8";
  const titleClass = getTitleClass(style);

  if (style === 'classic' || style === 'modern' || style === 'minimal') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((pub: any) => (
            <div key={pub.id} className={style === 'modern' ? 'bg-gray-50 p-3 rounded' : ''}>
              <h3 className={`font-bold text-gray-900 italic ${style === 'minimal' ? 'text-sm' : 'text-base'}`}>
                {pub.title}
              </h3>
              <p className={`text-gray-700 ${style === 'minimal' ? 'text-xs' : 'text-sm'}`}>
                {pub.publisher} ({formatDate(pub.date)})
              </p>
              {pub.url && style !== 'minimal' && (
                <p className="text-xs text-gray-600 mt-1">{pub.url}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((pub: any) => (
            <div key={pub.id}>
              <h3 className="text-base font-bold text-gray-900 italic">{pub.title}</h3>
              <p className="text-sm text-gray-700">{pub.publisher}, {formatDate(pub.date)}</p>
              {pub.description && (
                <p className="text-sm text-gray-600 mt-1">{pub.description}</p>
              )}
              {pub.url && (
                <p className="text-xs text-gray-600 mt-1">DOI: {pub.url}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'timeline' || style === 'compact' || style === 'boxed') {
    return renderAwardsVariant(data, title, style, formatDate); // Reuse similar layout
  }

  if (style === 'apa') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-2">
          {items.map((pub: any) => (
            <p key={pub.id} className="text-sm text-gray-700 leading-relaxed">
              {pub.authors && pub.authors.join(', ')} ({formatDate(pub.date).split(' ')[1]}).{' '}
              <em>{pub.title}</em>. {pub.publisher}.
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'academic') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-900 pb-2">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((pub: any) => (
            <div key={pub.id}>
              <h3 className="text-base font-bold text-gray-900 italic">{pub.title}</h3>
              <p className="text-sm text-gray-700">{pub.publisher}, {formatDate(pub.date)}</p>
              {pub.url && (
                <p className="text-xs text-gray-600 mt-1">{pub.url}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'link') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-2">
          {items.map((pub: any) => (
            <div key={pub.id}>
              <h3 className="text-sm font-bold text-gray-900 italic">{pub.title}</h3>
              <p className="text-xs text-gray-700">{pub.publisher}, {formatDate(pub.date)}</p>
              {pub.url && (
                <a href={pub.url} className="text-xs text-blue-700 underline">→ {pub.url}</a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return renderPublicationsVariant(data, title, 'classic', formatDate);
}

// ==================== VOLUNTEER VARIANTS ====================
function renderVolunteerVariant(data: any, title: string, style: string, formatDate: (date: string) => string) {
  const { items } = data;
  if (!items || items.length === 0) return null;

  const containerClass = "mb-8";
  const titleClass = getTitleClass(style);

  if (style === 'classic' || style === 'modern' || style === 'minimal') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((vol: any) => (
            <div
              key={vol.id}
              className={style === 'modern' ? 'bg-gray-50 p-3 rounded' : ''}
              style={{ pageBreakInside: 'avoid' }}
            >
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <h3 className={`font-bold text-gray-900 ${style === 'minimal' ? 'text-sm' : 'text-base'}`}>
                    {vol.role}
                  </h3>
                  <p className={`text-gray-700 font-medium ${style === 'minimal' ? 'text-xs' : 'text-sm'}`}>
                    {vol.organization}
                  </p>
                </div>
                <span className="text-xs text-gray-600">
                  {formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}
                </span>
              </div>
              {vol.description && style !== 'minimal' && (
                <p className="text-sm text-gray-700 leading-relaxed">{vol.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((vol: any) => (
            <div key={vol.id} style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="text-base font-bold text-gray-900">{vol.role}</h3>
                  <p className="text-sm text-gray-700 font-semibold">{vol.organization}</p>
                </div>
                <span className="text-xs text-gray-600">
                  {formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}
                </span>
              </div>
              {vol.description && (
                <p className="text-sm text-gray-700 leading-relaxed">{vol.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'timeline' || style === 'compact' || style === 'boxed') {
    return renderAwardsVariant(data, title, style, formatDate); // Reuse similar layout
  }

  if (style === 'impact') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((vol: any) => (
            <div key={vol.id} style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-base font-bold text-gray-900">{vol.role}</h3>
              <p className="text-sm text-gray-700">{vol.organization}</p>
              {vol.impact && vol.impact.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {vol.impact.map((imp: string, idx: number) => (
                    <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                      {imp}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'cause') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((vol: any) => (
            <div key={vol.id}>
              <h3 className="text-base font-bold text-gray-900">{vol.role}</h3>
              <p className="text-sm text-gray-700">{vol.organization}</p>
              {vol.cause && (
                <p className="text-xs text-gray-600 italic">Cause: {vol.cause}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'achievement') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((vol: any) => (
            <div key={vol.id}>
              <h3 className="text-base font-bold text-gray-900">{vol.role}</h3>
              <p className="text-sm text-gray-700">{vol.organization} • {formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}</p>
              {vol.achievements && vol.achievements.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {vol.achievements.map((achievement: string, idx: number) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return renderVolunteerVariant(data, title, 'classic', formatDate);
}

// ==================== SPEAKING VARIANTS ====================
function renderSpeakingVariant(data: any, title: string, style: string, formatDate: (date: string) => string) {
  const { items } = data;
  if (!items || items.length === 0) return null;

  const containerClass = "mb-8";
  const titleClass = getTitleClass(style);

  if (style === 'classic' || style === 'modern' || style === 'minimal') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((talk: any) => (
            <div
              key={talk.id}
              className={style === 'modern' ? 'bg-gray-50 p-3 rounded' : ''}
            >
              <h3 className={`font-bold text-gray-900 ${style === 'minimal' ? 'text-sm' : 'text-base'}`}>
                {talk.topic}
              </h3>
              <p className={`text-gray-700 ${style === 'minimal' ? 'text-xs' : 'text-sm'}`}>
                {talk.event} • {formatDate(talk.date)}
              </p>
              {talk.location && style !== 'minimal' && (
                <p className="text-xs text-gray-600">{talk.location}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((talk: any) => (
            <div key={talk.id}>
              <h3 className="text-base font-bold text-gray-900">{talk.topic}</h3>
              <p className="text-sm text-gray-700">{talk.event}, {formatDate(talk.date)}</p>
              {talk.location && <p className="text-sm text-gray-600">{talk.location}</p>}
              {talk.audience && <p className="text-xs text-gray-600">Audience: {talk.audience}</p>}
              {talk.url && <p className="text-xs text-blue-700">🔗 {talk.url}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'featured') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((talk: any) => (
            <div key={talk.id}>
              <h3 className="text-base font-bold text-gray-900">{talk.topic}</h3>
              <p className="text-sm text-gray-700">
                {talk.type && <span className="font-semibold">{talk.type}: </span>}
                {talk.event} • {formatDate(talk.date)}
              </p>
              {talk.location && <p className="text-xs text-gray-600">{talk.location}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'professional') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-900 pb-2">
          {title}
        </h2>
        <div className="space-y-4">
          {items.map((talk: any) => (
            <div key={talk.id}>
              <h3 className="text-base font-bold text-gray-900">{talk.topic}</h3>
              <p className="text-sm text-gray-800">
                {talk.type && <span className="font-semibold">{talk.type} • </span>}
                {talk.event}, {formatDate(talk.date)}
              </p>
              {talk.location && <p className="text-sm text-gray-700">{talk.location}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'impact') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((talk: any) => (
            <div key={talk.id}>
              <h3 className="text-base font-bold text-gray-900">{talk.topic}</h3>
              <p className="text-sm text-gray-700">{talk.event} • {formatDate(talk.date)}</p>
              {talk.impact && talk.impact.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {talk.impact.map((imp: string, idx: number) => (
                    <span key={idx} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">
                      {imp}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'timeline' || style === 'compact' || style === 'boxed') {
    return renderAwardsVariant(data, title, style, formatDate); // Reuse similar layout
  }

  return renderSpeakingVariant(data, title, 'classic', formatDate);
}

// ==================== PATENTS VARIANTS ====================
function renderPatentsVariant(data: any, title: string, style: string, formatDate: (date: string) => string) {
  const { items, granted, pending } = data;

  if (style === 'status' && (granted || pending)) {
    return (
      <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
        <h2 className={getTitleClass(style)}>{title}</h2>
        <div className="space-y-3">
          {granted && granted.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Granted</h3>
              {granted.map((patent: any) => (
                <div key={patent.id || patent.patentNumber} className="text-sm text-gray-700 ml-4">
                  {patent.title} ({patent.patentNumber})
                </div>
              ))}
            </div>
          )}
          {pending && pending.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Pending</h3>
              {pending.map((patent: any) => (
                <div key={patent.id || patent.patentNumber} className="text-sm text-gray-700 ml-4">
                  {patent.title} ({patent.patentNumber})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  const containerClass = "mb-8";
  const titleClass = getTitleClass(style);

  if (style === 'classic' || style === 'modern' || style === 'minimal') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((patent: any) => (
            <div
              key={patent.id}
              className={style === 'modern' ? 'bg-gray-50 p-3 rounded' : ''}
            >
              <h3 className={`font-bold text-gray-900 ${style === 'minimal' ? 'text-sm' : 'text-base'}`}>
                {patent.title}
              </h3>
              <p className={`text-gray-700 ${style === 'minimal' ? 'text-xs' : 'text-sm'}`}>
                {patent.patentNumber} • {patent.status}
              </p>
              {patent.date && style !== 'minimal' && (
                <p className="text-xs text-gray-600">{formatDate(patent.date)}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((patent: any) => (
            <div key={patent.id}>
              <h3 className="text-base font-bold text-gray-900">{patent.title}</h3>
              <p className="text-sm text-gray-700">{patent.patentNumber} • {patent.status}</p>
              {patent.date && <p className="text-sm text-gray-600">{formatDate(patent.date)}</p>}
              {patent.description && <p className="text-sm text-gray-600 mt-1">{patent.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'formal') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-900 pb-2">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((patent: any) => (
            <div key={patent.id}>
              <h3 className="text-base font-bold text-gray-900">{patent.title}</h3>
              <p className="text-sm text-gray-700">
                {patent.patentNumber}. {patent.status}. {patent.date && `Issued: ${formatDate(patent.date)}`}
              </p>
              {patent.url && <p className="text-xs text-blue-700">{patent.url}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'inventor') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((patent: any) => (
            <div key={patent.id}>
              <h3 className="text-base font-bold text-gray-900">{patent.title}</h3>
              <p className="text-sm text-gray-700">
                {patent.role && <span className="font-semibold">{patent.role} • </span>}
                {patent.patentNumber} • {patent.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'timeline' || style === 'compact' || style === 'boxed') {
    return renderAwardsVariant(data, title, style, formatDate); // Reuse similar layout
  }

  return renderPatentsVariant(data, title, 'classic', formatDate);
}

// ==================== PORTFOLIO VARIANTS ====================
function renderPortfolioVariant(data: any, title: string, style: string) {
  const { items, groups } = data;

  if (style === 'grouped' && groups) {
    return (
      <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
        <h2 className={getTitleClass(style)}>{title}</h2>
        <div className="space-y-3">
          {groups.map((group: any, idx: number) => (
            <div key={idx}>
              <h3 className="text-sm font-bold text-gray-900">{group.category}</h3>
              <div className="ml-4 space-y-1">
                {group.links.map((link: string, linkIdx: number) => (
                  <div key={linkIdx} className="text-sm text-gray-700">
                    {link}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'inline' && Array.isArray(items)) {
    return (
      <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-base font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-700">{items.join(' • ')}</p>
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  const containerClass = "mb-8";
  const titleClass = getTitleClass(style);

  if (style === 'classic' || style === 'modern' || style === 'minimal') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-2">
          {items.map((item: any) => (
            <div key={item.id} className={`text-sm ${style === 'modern' ? 'flex items-center gap-2' : ''}`}>
              <span className="font-semibold text-gray-900">{item.platform}:</span>{' '}
              <span className="text-gray-700">{item.url}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'cards') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((item: any) => (
            <div key={item.id} className="bg-gray-50 p-3 rounded">
              <h3 className="text-sm font-bold text-gray-900">{item.platform}</h3>
              <p className="text-xs text-gray-700">{item.url}</p>
              {item.description && <p className="text-xs text-gray-600 mt-1">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'badges') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="flex flex-wrap gap-2">
          {items.map((item: any) => (
            <span
              key={item.id}
              className="px-3 py-1 bg-gray-900 text-white text-sm rounded font-medium"
            >
              {item.platform}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((item: any) => (
            <div key={item.id}>
              <h3 className="text-sm font-bold text-gray-900">{item.platform}</h3>
              <p className="text-xs text-gray-700">{item.url}</p>
              {item.description && <p className="text-xs text-gray-600">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'social') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-2">
          {items.map((item: any) => (
            <div key={item.id} className="flex items-center gap-2 text-sm">
              {item.icon && <span>{item.icon}</span>}
              <span className="font-semibold text-gray-900">{item.platform}:</span>
              <span className="text-gray-700">{item.url}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'compact') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-base font-semibold text-gray-900 mb-2">{title}</h2>
        <div className="space-y-1">
          {items.map((item: any) => (
            <div key={item.id} className="text-sm text-gray-700">
              {item.platform}: {item.url}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return renderPortfolioVariant(data, title, 'classic');
}

// ==================== CERTIFICATIONS VARIANTS ====================
function renderCertificationsVariant(data: any, title: string, style: string, formatDate: (date: string) => string) {
  const { items, groups } = data;

  if (style === 'grouped' && groups) {
    return (
      <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
        <h2 className={getTitleClass(style)}>{title}</h2>
        <div className="space-y-3">
          {groups.map((group: any, idx: number) => (
            <div key={idx}>
              <h3 className="text-sm font-bold text-gray-900">{group.provider}</h3>
              <div className="ml-4 text-sm text-gray-700">
                {group.certs.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  const containerClass = "mb-8";
  const titleClass = getTitleClass(style);

  if (style === 'classic' || style === 'modern' || style === 'minimal') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((cert: any) => (
            <div
              key={cert.id}
              className={style === 'modern' ? 'bg-gray-50 p-3 rounded' : ''}
              style={{ pageBreakInside: 'avoid' }}
            >
              <h3 className={`font-bold text-gray-900 ${style === 'minimal' ? 'text-sm' : 'text-base'}`}>
                {cert.name}
              </h3>
              <p className={`text-gray-700 ${style === 'minimal' ? 'text-xs' : 'text-sm'}`}>
                {cert.issuer}
              </p>
              <p className="text-xs text-gray-600">{formatDate(cert.date)}</p>
              {cert.credentialId && style !== 'minimal' && (
                <p className="text-xs text-gray-600">ID: {cert.credentialId}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((cert: any) => (
            <div key={cert.id} style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-base font-bold text-gray-900">{cert.name}</h3>
              <p className="text-sm text-gray-700 font-medium">{cert.issuer}</p>
              <p className="text-xs text-gray-600">Issued: {formatDate(cert.date)}</p>
              {cert.credentialId && (
                <p className="text-xs text-gray-600">Credential ID: {cert.credentialId}</p>
              )}
              {cert.expiryDate && (
                <p className="text-xs text-gray-600">Expires: {formatDate(cert.expiryDate)}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'timeline') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-4">
          {items.map((cert: any) => (
            <div key={cert.id} className="flex gap-3" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                <div className="w-0.5 h-full bg-gray-300 min-h-[30px]"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900">{cert.name}</h3>
                <p className="text-sm text-gray-700">{cert.issuer} • {formatDate(cert.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'badges') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="flex flex-wrap gap-2">
          {items.map((cert: any) => (
            <span
              key={cert.id}
              className="px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded font-medium"
            >
              {cert.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'compact') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-base font-semibold text-gray-900 mb-2">{title}</h2>
        <div className="space-y-1">
          {items.map((cert: any) => (
            <div key={cert.id} className="text-sm text-gray-700">
              {cert.name} • {formatDate(cert.date)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'two-column' || style === 'twocolumn') {
    return (
      <div className={containerClass} style={{ pageBreakInside: 'avoid' }}>
        <h2 className={titleClass}>{title}</h2>
        <div className="grid grid-cols-2 gap-3">
          {items.map((cert: any) => (
            <div key={cert.id}>
              <div className="text-sm font-bold text-gray-900">{cert.name}</div>
              <div className="text-xs text-gray-600 text-right">{cert.issuer}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'boxed') {
    return (
      <div className={containerClass}>
        <h2 className={titleClass}>{title}</h2>
        <div className="space-y-3">
          {items.map((cert: any) => (
            <div key={cert.id} className="border border-gray-300 p-3 rounded" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-base font-bold text-gray-900">{cert.name}</h3>
              <p className="text-sm text-gray-700">{cert.issuer} • {formatDate(cert.date)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return renderCertificationsVariant(data, title, 'classic', formatDate);
}

function renderCustomSection(data: any, title: string) {
  if (!data.content) return null;

  return (
    <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
      <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-2">
        {title}
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {data.content}
      </p>
    </div>
  );
}
