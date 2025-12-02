import React from 'react';
import { SectionVariant } from '@/constants/sectionVariants';
import { Star } from 'lucide-react';

interface SectionVariantPreviewProps {
  variant: SectionVariant;
}

export const SectionVariantPreview: React.FC<SectionVariantPreviewProps> = ({ variant }) => {
  const { previewData, type } = variant;

  if (type === 'summary') {
    return <SummaryPreview data={previewData} />;
  }

  if (type === 'skills') {
    return <SkillsPreview data={previewData} />;
  }

  if (type === 'experience') {
    return <ExperiencePreview data={previewData} />;
  }

  if (type === 'education') {
    return <EducationPreview data={previewData} />;
  }

  if (type === 'projects') {
    return <ProjectsPreview data={previewData} />;
  }

  if (type === 'certifications') {
    return <CertificationsPreview data={previewData} />;
  }

  if (type === 'languages') {
    return <LanguagesPreview data={previewData} />;
  }

  if (type === 'awards') {
    return <AwardsPreview data={previewData} />;
  }

  if (type === 'publications') {
    return <PublicationsPreview data={previewData} />;
  }

  if (type === 'volunteer') {
    return <VolunteerPreview data={previewData} />;
  }

  if (type === 'speaking') {
    return <SpeakingPreview data={previewData} />;
  }

  if (type === 'patents') {
    return <PatentsPreview data={previewData} />;
  }

  if (type === 'portfolio') {
    return <PortfolioPreview data={previewData} />;
  }

  return null;
};

// ==================== SUMMARY PREVIEWS ====================
const SummaryPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, content, style, stats, tags } = data;

  if (style === 'executive') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="text-center font-bold text-sm uppercase tracking-wider text-gray-800">
          {title}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed text-center">
          {content}
        </p>
      </div>
    );
  }

  if (style === 'profile') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <ul className="space-y-1">
          {content.map((item: string, index: number) => (
            <li key={index} className="text-xs text-gray-600 flex items-start">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (style === 'objective') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm italic text-gray-800">{title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          {content}
        </p>
      </div>
    );
  }

  if (style === 'casual') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed italic">
          {content}
        </p>
      </div>
    );
  }

  if (style === 'highlighted') {
    return (
      <div className="p-4 space-y-2">
        <div className="border-l-2 border-primary pl-3">
          <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
          <p className="text-xs text-gray-600 leading-relaxed mt-1">
            {content}
          </p>
        </div>
      </div>
    );
  }

  if (style === 'two-column') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="flex gap-3">
          <div className="flex gap-1.5">
            {stats.map((stat: string, i: number) => (
              <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded">
                {stat}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {content}
        </p>
      </div>
    );
  }

  if (style === 'minimal') {
    return (
      <div className="p-4 space-y-1.5">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          {content}
        </p>
      </div>
    );
  }

  if (style === 'achievement') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <ul className="space-y-1">
          {content.map((item: string, index: number) => (
            <li key={index} className="text-xs text-gray-600 flex items-start">
              <span className="mr-2 text-primary">↗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (style === 'expertise') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          {content}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((tag: string, i: number) => (
            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // classic style (default)
  return (
    <div className="p-4 space-y-2">
      <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">
        {title}
      </h3>
      <p className="text-xs text-gray-600 leading-relaxed">
        {content}
      </p>
    </div>
  );
};

// ==================== SKILLS PREVIEWS ====================
const SkillsPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, skills, skillGroups, style, technical, soft } = data;

  if (style === 'pills') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 6).map((skill: string, index: number) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'list') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-1">
          {skills.slice(0, 4).map((skill: any, index: number) => (
            <div key={index} className="flex justify-between items-center text-xs">
              <span className="text-gray-700">{skill.name}</span>
              <span className="text-gray-500 text-[10px]">{skill.level}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'inline') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          {typeof skills === 'string' ? skills.split(',').slice(0, 8).join(',') : skills.join(', ')}
        </p>
      </div>
    );
  }

  if (style === 'grouped') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-2">
          {skillGroups.slice(0, 2).map((group: any, index: number) => (
            <div key={index}>
              <p className="text-xs font-medium text-gray-700">{group.category}:</p>
              <p className="text-xs text-gray-600 ml-2">
                {group.skills.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'bars') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-1.5">
          {skills.slice(0, 4).map((skill: any, index: number) => (
            <div key={index} className="space-y-0.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">{skill.name}</span>
                <span className="text-[10px] text-gray-500">{skill.level}%</span>
              </div>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'grid') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="grid grid-cols-2 gap-1.5">
          {skills.slice(0, 6).map((skill: string, index: number) => (
            <div key={index} className="text-xs text-gray-600">
              • {skill}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'rating') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-1.5">
          {skills.slice(0, 4).map((skill: any, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-xs text-gray-700">{skill.name}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 ${
                      i < skill.rating ? 'fill-primary text-primary' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'two-column') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-medium text-gray-700 mb-1">Technical</p>
            <div className="space-y-0.5">
              {technical.slice(0, 3).map((skill: string, i: number) => (
                <div key={i} className="text-xs text-gray-600">• {skill}</div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-700 mb-1">Soft Skills</p>
            <div className="space-y-0.5">
              {soft.slice(0, 3).map((skill: string, i: number) => (
                <div key={i} className="text-xs text-gray-600">• {skill}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'minimal') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="space-y-0.5">
          {skills.slice(0, 5).map((skill: string, index: number) => (
            <div key={index} className="text-xs text-gray-600">
              • {skill}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'badges') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 6).map((skill: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 border border-primary/30 text-primary text-xs rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// ==================== EXPERIENCE PREVIEWS ====================
const ExperiencePreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style } = data;
  const item = items[0];

  if (style === 'classic') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.company}</div>
          <div className="text-xs text-gray-600">{item.position}</div>
          <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
          {item.description && (
            <ul className="mt-1 space-y-0.5">
              {item.description.slice(0, 2).map((desc: string, i: number) => (
                <li key={i} className="text-xs text-gray-600 flex items-start">
                  <span className="mr-1">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  if (style === 'modern') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="bg-gray-50 p-2 rounded space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.position}</div>
          <div className="text-xs text-gray-600">{item.company}</div>
          <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
        </div>
      </div>
    );
  }

  if (style === 'minimal') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="space-y-0.5">
          <div className="text-xs text-gray-800">{item.position} • {item.company}</div>
          <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.position}</div>
          <div className="text-xs text-gray-600">{item.company} • {item.location}</div>
          <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
          {item.description && (
            <ul className="mt-1 space-y-0.5">
              {item.description.slice(0, 2).map((desc: string, i: number) => (
                <li key={i} className="text-xs text-gray-600 flex items-start">
                  <span className="mr-1">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  if (style === 'timeline') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-0.5 h-8 bg-primary/30"></div>
          </div>
          <div className="flex-1 space-y-0.5">
            <div className="font-medium text-xs text-gray-800">{item.position}</div>
            <div className="text-xs text-gray-600">{item.company}</div>
            <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'compact') {
    return (
      <div className="p-4 space-y-1.5">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="text-xs text-gray-700">
          <span className="font-medium">{item.position}</span> | {item.company} | {item.startDate}-{item.endDate}
        </div>
      </div>
    );
  }

  if (style === 'boxed') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="border border-gray-200 p-2 rounded space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.position}</div>
          <div className="text-xs text-gray-600">{item.company}</div>
          <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
        </div>
      </div>
    );
  }

  if (style === 'achievement') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.position} • {item.company}</div>
          <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
          {item.description && (
            <ul className="mt-1 space-y-0.5">
              {item.description.slice(0, 2).map((desc: string, i: number) => (
                <li key={i} className="text-xs text-gray-600 flex items-start">
                  <span className="mr-1">★</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  if (style === 'sidebar') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="flex gap-3">
          <div className="text-[10px] text-gray-500 w-12">{item.startDate}</div>
          <div className="flex-1 border-l-2 border-primary/30 pl-2 space-y-0.5">
            <div className="font-medium text-xs text-gray-800">{item.position}</div>
            <div className="text-xs text-gray-600">{item.company}</div>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'executive') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wide border-b-2 border-gray-300 pb-1">{title}</h3>
        <div className="space-y-1">
          <div className="font-semibold text-xs text-gray-800">{item.position}</div>
          <div className="text-xs text-gray-700">{item.company} | {item.location}</div>
          <div className="text-[10px] text-gray-500 uppercase">{item.startDate} - {item.endDate}</div>
          {item.description && (
            <ul className="mt-1 space-y-0.5">
              {item.description.slice(0, 2).map((desc: string, i: number) => (
                <li key={i} className="text-xs text-gray-600 flex items-start">
                  <span className="mr-1">▸</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return null;
};

// ==================== EDUCATION PREVIEWS ====================
const EducationPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style } = data;
  const item = items[0];

  if (style === 'classic') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.school}</div>
          <div className="text-xs text-gray-600">{item.degree} in {item.field}</div>
          <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
          {item.gpa && <div className="text-xs text-gray-600">GPA: {item.gpa}</div>}
        </div>
      </div>
    );
  }

  if (style === 'modern') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="bg-gray-50 p-2 rounded space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.degree} in {item.field}</div>
          <div className="text-xs text-gray-600">{item.school}</div>
          <div className="text-[10px] text-gray-500">{item.endDate}</div>
        </div>
      </div>
    );
  }

  if (style === 'minimal') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="space-y-0.5">
          <div className="text-xs text-gray-800">{item.degree} • {item.school}</div>
          <div className="text-[10px] text-gray-500">{item.endDate}</div>
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.school}</div>
          <div className="text-xs text-gray-600">{item.degree} in {item.field}</div>
          <div className="text-[10px] text-gray-500">{item.endDate}</div>
          {item.gpa && <div className="text-xs text-gray-600">GPA: {item.gpa}</div>}
          {item.coursework && (
            <div className="text-xs text-gray-600">
              Coursework: {item.coursework.slice(0, 2).join(', ')}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (style === 'timeline') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-0.5 h-8 bg-primary/30"></div>
          </div>
          <div className="flex-1 space-y-0.5">
            <div className="font-medium text-xs text-gray-800">{item.degree}</div>
            <div className="text-xs text-gray-600">{item.school}</div>
            <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'compact') {
    return (
      <div className="p-4 space-y-1.5">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="text-xs text-gray-700">
          {item.degree} | {item.school} | {item.endDate}
        </div>
      </div>
    );
  }

  if (style === 'honors') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.school}</div>
          <div className="text-xs text-gray-600">{item.degree} in {item.field}</div>
          {item.gpa && <div className="text-xs text-primary font-medium">GPA: {item.gpa}</div>}
          {item.honors && (
            <div className="text-xs text-gray-600 italic">
              {item.honors.join(', ')}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (style === 'boxed') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="border border-gray-200 p-2 rounded space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.degree}</div>
          <div className="text-xs text-gray-600">{item.school}</div>
          <div className="text-[10px] text-gray-500">{item.endDate}</div>
        </div>
      </div>
    );
  }

  if (style === 'two-column') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-xs text-gray-800">{item.school}</div>
          <div className="text-xs text-gray-600 text-right">{item.degree}</div>
        </div>
      </div>
    );
  }

  if (style === 'achievement') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.school}</div>
          <div className="text-xs text-gray-600">{item.degree}</div>
          {item.achievements && (
            <ul className="mt-1 space-y-0.5">
              {item.achievements.slice(0, 2).map((achievement: string, i: number) => (
                <li key={i} className="text-xs text-gray-600 flex items-start">
                  <span className="mr-1">✓</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return null;
};

// ==================== PROJECTS PREVIEWS ====================
const ProjectsPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style } = data;
  const item = items[0];

  if (style === 'classic') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-600">{item.description}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.techStack && item.techStack.slice(0, 3).map((tech: string, i: number) => (
              <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (style === 'card') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="bg-gray-50 p-2 rounded space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-600">{item.description}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.techStack && item.techStack.slice(0, 3).map((tech: string, i: number) => (
              <span key={i} className="text-[10px] bg-white text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (style === 'minimal') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="space-y-0.5">
          <div className="text-xs text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-600">{item.description}</div>
        </div>
      </div>
    );
  }

  if (style === 'detailed') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.name}</div>
          <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
          <div className="text-xs text-gray-600">{item.description}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.techStack && item.techStack.slice(0, 3).map((tech: string, i: number) => (
              <span key={i} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (style === 'grid') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="grid grid-cols-1 gap-2">
          <div className="space-y-0.5">
            <div className="font-medium text-xs text-gray-800">{item.name}</div>
            <div className="text-xs text-gray-600">{item.description}</div>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'timeline') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-0.5 h-8 bg-primary/30"></div>
          </div>
          <div className="flex-1 space-y-0.5">
            <div className="font-medium text-xs text-gray-800">{item.name}</div>
            <div className="text-xs text-gray-600">{item.description}</div>
            <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'impact') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-600">{item.description}</div>
          {item.impact && (
            <div className="flex flex-wrap gap-1 mt-1">
              {item.impact.map((imp: string, i: number) => (
                <span key={i} className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                  {imp}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (style === 'boxed') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="border border-gray-200 p-2 rounded space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-600">{item.description}</div>
        </div>
      </div>
    );
  }

  if (style === 'compact') {
    return (
      <div className="p-4 space-y-1.5">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="text-xs text-gray-700">
          <span className="font-medium">{item.name}</span>: {item.description}
        </div>
      </div>
    );
  }

  if (style === 'showcase') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wide border-b-2 border-gray-300 pb-1">{title}</h3>
        <div className="space-y-1">
          <div className="font-semibold text-xs text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-600">{item.description}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.techStack && item.techStack.slice(0, 3).map((tech: string, i: number) => (
              <span key={i} className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// ==================== CERTIFICATIONS PREVIEWS ====================
const CertificationsPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style, groups } = data;

  if (style === 'classic' || style === 'modern' || style === 'minimal' || style === 'detailed') {
    const item = items?.[0];
    if (!item) return null;

    return (
      <div className="p-4 space-y-2">
        <h3 className={`text-sm text-gray-800 ${style === 'classic' || style === 'detailed' ? 'font-semibold border-b border-gray-200 pb-1' : 'font-medium'}`}>{title}</h3>
        <div className={`space-y-1 ${style === 'modern' ? 'bg-gray-50 p-2 rounded' : ''}`}>
          <div className="font-medium text-xs text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-600">{item.issuer}</div>
          <div className="text-[10px] text-gray-500">{item.date}</div>
          {style === 'detailed' && item.credentialId && (
            <div className="text-[10px] text-gray-500">ID: {item.credentialId}</div>
          )}
        </div>
      </div>
    );
  }

  if (style === 'timeline' || style === 'compact' || style === 'two-column' || style === 'boxed' || style === 'badges') {
    const item = items?.[0];
    if (!item) return null;

    if (style === 'timeline') {
      return (
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
          <div className="flex gap-2">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-0.5 h-6 bg-primary/30"></div>
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="font-medium text-xs text-gray-800">{item.name}</div>
              <div className="text-xs text-gray-600">{item.issuer}</div>
            </div>
          </div>
        </div>
      );
    }

    if (style === 'compact') {
      return (
        <div className="p-4 space-y-1.5">
          <h3 className="font-medium text-sm text-gray-800">{title}</h3>
          <div className="text-xs text-gray-700">{item.name} • {item.date}</div>
        </div>
      );
    }

    if (style === 'boxed') {
      return (
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
          <div className="border border-gray-200 p-2 rounded space-y-0.5">
            <div className="font-medium text-xs text-gray-800">{item.name}</div>
            <div className="text-xs text-gray-600">{item.issuer}</div>
          </div>
        </div>
      );
    }

    if (style === 'badges') {
      return (
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/30">
              {item.name}
            </span>
          </div>
        </div>
      );
    }

    if (style === 'two-column') {
      return (
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-sm text-gray-800">{title}</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-xs text-gray-800">{item.name}</div>
            <div className="text-xs text-gray-600 text-right">{item.issuer}</div>
          </div>
        </div>
      );
    }
  }

  if (style === 'grouped' && groups) {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-1.5">
          {groups.slice(0, 1).map((group: any, i: number) => (
            <div key={i}>
              <div className="text-xs font-medium text-gray-700">{group.provider}</div>
              <div className="text-xs text-gray-600 ml-2">{group.certs.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// ==================== LANGUAGES PREVIEWS ====================
const LanguagesPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style, content } = data;

  if (style === 'classic' || style === 'pills' || style === 'two-column' || style === 'compact' || style === 'flag') {
    if (!items || items.length === 0) return null;

    if (style === 'classic') {
      return (
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
          <div className="space-y-1">
            {items.slice(0, 2).map((item: any, i: number) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-gray-700">{item.language}</span>
                <span className="text-gray-500">{item.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (style === 'pills') {
      return (
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {items.slice(0, 3).map((item: any, i: number) => (
              <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                {item.language}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (style === 'two-column') {
      return (
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-sm text-gray-800">{title}</h3>
          <div className="grid grid-cols-2 gap-2">
            {items.slice(0, 2).map((item: any, i: number) => (
              <div key={i} className="text-xs text-gray-700">{item.language} - {item.proficiency}</div>
            ))}
          </div>
        </div>
      );
    }

    if (style === 'compact') {
      return (
        <div className="p-4 space-y-1.5">
          <h3 className="font-medium text-sm text-gray-800">{title}</h3>
          <div className="text-xs text-gray-700">{items[0].language} ({items[0].proficiency})</div>
        </div>
      );
    }

    if (style === 'flag') {
      return (
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
          <div className="space-y-1">
            {items.slice(0, 2).map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span>{item.flag}</span>
                <span className="text-gray-700">{item.language}</span>
                <span className="text-gray-500">({item.proficiency})</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  if (style === 'bars' && items) {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-1.5">
          {items.slice(0, 2).map((item: any, i: number) => (
            <div key={i} className="space-y-0.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">{item.language}</span>
                <span className="text-[10px] text-gray-500">{item.level}%</span>
              </div>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${item.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'minimal' && Array.isArray(items)) {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="text-xs text-gray-600">{items.slice(0, 3).join(', ')}</div>
      </div>
    );
  }

  if (style === 'inline') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="text-xs text-gray-600">{content}</div>
      </div>
    );
  }

  if (style === 'rating' && items) {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-1.5">
          {items.slice(0, 2).map((item: any, i: number) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-xs text-gray-700">{item.language}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-2.5 h-2.5 ${idx < item.rating ? 'fill-primary text-primary' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'detailed' && items) {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
        <div className="space-y-1">
          {items.slice(0, 2).map((item: any, i: number) => (
            <div key={i} className="flex justify-between text-xs">
              <span className="text-gray-700">{item.language}</span>
              <span className="text-gray-500">{item.proficiency} ({item.cefr})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// ==================== AWARDS PREVIEWS ====================
const AwardsPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style } = data;
  if (!items || items.length === 0) return null;
  const item = items[0];

  const baseStyles = {
    classic: 'p-4 space-y-2',
    modern: 'p-4 space-y-2',
    minimal: 'p-4 space-y-2',
    timeline: 'p-4 space-y-2',
    detailed: 'p-4 space-y-2',
    icon: 'p-4 space-y-2',
    compact: 'p-4 space-y-1.5',
    boxed: 'p-4 space-y-2',
    'two-column': 'p-4 space-y-2',
    highlight: 'p-4 space-y-2'
  };

  const titleStyles: any = {
    classic: 'font-semibold text-sm text-gray-800 border-b border-gray-200 pb-1',
    highlight: 'font-bold text-sm text-gray-800 uppercase tracking-wide border-b-2 border-gray-300 pb-1',
    minimal: 'font-medium text-sm text-gray-800',
    default: 'font-semibold text-sm text-gray-800'
  };

  return (
    <div className={baseStyles[style as keyof typeof baseStyles] || 'p-4 space-y-2'}>
      <h3 className={titleStyles[style] || titleStyles.default}>{title}</h3>
      {style === 'modern' && (
        <div className="bg-gray-50 p-2 rounded space-y-0.5">
          <div className="font-medium text-xs text-gray-800">{item.title}</div>
          <div className="text-xs text-gray-600">{item.issuer}</div>
          <div className="text-[10px] text-gray-500">{item.date}</div>
        </div>
      )}
      {style === 'timeline' && (
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-0.5 h-6 bg-primary/30"></div>
          </div>
          <div className="flex-1 space-y-0.5">
            <div className="font-medium text-xs text-gray-800">{item.title}</div>
            <div className="text-xs text-gray-600">{item.issuer} • {item.date}</div>
          </div>
        </div>
      )}
      {style === 'boxed' && (
        <div className="border border-gray-200 p-2 rounded space-y-0.5">
          <div className="font-medium text-xs text-gray-800">{item.title}</div>
          <div className="text-xs text-gray-600">{item.issuer} • {item.date}</div>
        </div>
      )}
      {style === 'icon' && (
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <span className="text-sm">🏆</span>
            <div className="flex-1">
              <div className="font-medium text-xs text-gray-800">{item.title}</div>
              <div className="text-xs text-gray-600">{item.issuer} • {item.date}</div>
            </div>
          </div>
        </div>
      )}
      {(style === 'classic' || style === 'minimal' || style === 'detailed') && (
        <div className="space-y-1">
          <div className="font-medium text-xs text-gray-800">{item.title}</div>
          <div className="text-xs text-gray-600">{item.issuer} • {item.date}</div>
          {style === 'detailed' && item.description && (
            <div className="text-xs text-gray-600">{item.description}</div>
          )}
        </div>
      )}
      {style === 'compact' && (
        <div className="text-xs text-gray-700">{item.title} • {item.date}</div>
      )}
      {style === 'two-column' && (
        <div className="grid grid-cols-2 gap-2">
          <div className="text-xs text-gray-800">{item.title}</div>
          <div className="text-xs text-gray-600 text-right">{item.issuer}</div>
        </div>
      )}
      {style === 'highlight' && (
        <div className="space-y-1">
          <div className="font-semibold text-xs text-gray-800">{item.title}</div>
          <div className="text-xs text-gray-700">{item.issuer} • {item.date}</div>
          {item.description && (
            <div className="text-xs text-primary italic">{item.description}</div>
          )}
        </div>
      )}
    </div>
  );
};

// Similar preview components for Publications, Volunteer, Speaking, Patents, and Portfolio
// Due to length, I'll create simplified versions that follow the same pattern

const PublicationsPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style } = data;
  if (!items || items.length === 0) return null;
  const item = items[0];

  return (
    <div className="p-4 space-y-2">
      <h3 className={`text-sm text-gray-800 ${style === 'academic' ? 'font-bold uppercase tracking-wide border-b-2 border-gray-300 pb-1' : style === 'minimal' || style === 'compact' ? 'font-medium' : 'font-semibold border-b border-gray-200 pb-1'}`}>
        {title}
      </h3>
      <div className={`space-y-1 ${style === 'boxed' ? 'border border-gray-200 p-2 rounded' : ''}`}>
        <div className="font-medium text-xs text-gray-800 italic">{item.title}</div>
        <div className="text-xs text-gray-600">{item.publisher} ({item.date})</div>
        {style === 'detailed' && item.description && (
          <div className="text-xs text-gray-600">{item.description}</div>
        )}
      </div>
    </div>
  );
};

const VolunteerPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style } = data;
  if (!items || items.length === 0) return null;
  const item = items[0];

  return (
    <div className="p-4 space-y-2">
      <h3 className={`text-sm text-gray-800 ${style === 'minimal' || style === 'compact' ? 'font-medium' : 'font-semibold'} ${style === 'classic' || style === 'detailed' ? 'border-b border-gray-200 pb-1' : ''}`}>
        {title}
      </h3>
      <div className={`space-y-1 ${style === 'modern' ? 'bg-gray-50 p-2 rounded' : style === 'boxed' ? 'border border-gray-200 p-2 rounded' : ''}`}>
        <div className="font-medium text-xs text-gray-800">{item.role}</div>
        <div className="text-xs text-gray-600">{item.organization}</div>
        <div className="text-[10px] text-gray-500">{item.startDate} - {item.endDate}</div>
      </div>
    </div>
  );
};

const SpeakingPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style } = data;
  if (!items || items.length === 0) return null;
  const item = items[0];

  return (
    <div className="p-4 space-y-2">
      <h3 className={`text-sm text-gray-800 ${style === 'professional' ? 'font-bold uppercase tracking-wide border-b-2 border-gray-300 pb-1' : style === 'minimal' || style === 'compact' ? 'font-medium' : 'font-semibold'}`}>
        {title}
      </h3>
      <div className={`space-y-1 ${style === 'modern' ? 'bg-gray-50 p-2 rounded' : style === 'boxed' ? 'border border-gray-200 p-2 rounded' : ''}`}>
        <div className="font-medium text-xs text-gray-800">{item.topic}</div>
        <div className="text-xs text-gray-600">{item.event} • {item.date}</div>
        {item.location && <div className="text-[10px] text-gray-500">{item.location}</div>}
      </div>
    </div>
  );
};

const PatentsPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style, granted, pending } = data;

  if (style === 'status' && granted) {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-700">Granted</div>
          {granted.map((item: any, i: number) => (
            <div key={i} className="text-xs text-gray-600 ml-2">{item.title} ({item.patentNumber})</div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) return null;
  const item = items[0];

  return (
    <div className="p-4 space-y-2">
      <h3 className={`text-sm text-gray-800 ${style === 'formal' ? 'font-bold uppercase tracking-wide border-b-2 border-gray-300 pb-1' : style === 'minimal' || style === 'compact' ? 'font-medium' : 'font-semibold'} ${style === 'classic' || style === 'detailed' ? 'border-b border-gray-200 pb-1' : ''}`}>
        {title}
      </h3>
      <div className={`space-y-1 ${style === 'boxed' ? 'border border-gray-200 p-2 rounded' : ''}`}>
        <div className="font-medium text-xs text-gray-800">{item.title}</div>
        <div className="text-xs text-gray-600">{item.patentNumber} • {item.status}</div>
        {item.date && <div className="text-[10px] text-gray-500">{item.date}</div>}
      </div>
    </div>
  );
};

const PortfolioPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, items, style, groups } = data;

  if (style === 'grouped' && groups) {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="space-y-1.5">
          {groups.map((group: any, i: number) => (
            <div key={i}>
              <div className="text-xs font-medium text-gray-700">{group.category}</div>
              <div className="text-xs text-gray-600 ml-2">{group.links.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'inline' && Array.isArray(items)) {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm text-gray-800">{title}</h3>
        <div className="text-xs text-gray-600">{items.join(' • ')}</div>
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  if (style === 'badges') {
    return (
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {items.slice(0, 3).map((item: any, i: number) => (
            <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/30">
              {item.platform}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <h3 className={`text-sm text-gray-800 ${style === 'minimal' || style === 'compact' ? 'font-medium' : 'font-semibold'} ${style === 'classic' || style === 'detailed' ? 'border-b border-gray-200 pb-1' : ''}`}>
        {title}
      </h3>
      <div className="space-y-1">
        {items.slice(0, 2).map((item: any, i: number) => (
          <div key={i} className={`text-xs ${style === 'cards' ? 'bg-gray-50 p-2 rounded' : ''}`}>
            <span className="font-medium text-gray-700">{item.platform}</span>
            <span className="text-gray-500"> - {item.url}</span>
            {item.description && style === 'detailed' && (
              <div className="text-gray-600 mt-0.5">{item.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
