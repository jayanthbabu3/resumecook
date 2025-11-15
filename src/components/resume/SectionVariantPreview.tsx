import React from 'react';
import { SectionVariant } from '@/constants/sectionVariants';

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

  return null;
};

const SummaryPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, content, style } = data;

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

  // classic style
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

const SkillsPreview: React.FC<{ data: any }> = ({ data }) => {
  const { title, skills, skillGroups, style } = data;

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

  return null;
};
