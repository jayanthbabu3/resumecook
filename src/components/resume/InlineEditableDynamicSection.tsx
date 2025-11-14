import { useInlineEdit } from "@/contexts/InlineEditContext";
import { InlineEditableText } from "./InlineEditableText";
import { InlineEditableDate } from "./InlineEditableDate";
import { InlineEditableList } from "./InlineEditableList";
import type { ResumeSection } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface InlineEditableDynamicSectionProps {
  section: ResumeSection;
  sectionIndex: number;
  formatDate: (date: string) => string;
  renderNonEditable: () => React.ReactNode;
}

export function InlineEditableDynamicSection({
  section,
  sectionIndex,
  formatDate,
  renderNonEditable,
}: InlineEditableDynamicSectionProps) {
  const { addArrayItem, removeArrayItem } = useInlineEdit();
  const basePath = `dynamicSections[${sectionIndex}]`;

  const sectionData = section.data;

  // Helper function to add a new item based on section type
  const handleAddItem = () => {
    const defaultItems: Record<string, any> = {
      certifications: {
        id: Date.now().toString(),
        name: "Certification Name",
        issuer: "Issuing Organization",
        date: new Date().toISOString().slice(0, 7),
        credentialId: "",
        expiryDate: "",
        url: "",
      },
      languages: {
        id: Date.now().toString(),
        language: "Language",
        proficiency: "Intermediate",
      },
      projects: {
        id: Date.now().toString(),
        name: "Project Name",
        description: "Project description",
        techStack: [],
        startDate: "",
        endDate: "",
        url: "",
        githubUrl: "",
      },
      awards: {
        id: Date.now().toString(),
        title: "Award Title",
        issuer: "Issuing Organization",
        date: new Date().toISOString().slice(0, 7),
        description: "",
      },
      publications: {
        id: Date.now().toString(),
        title: "Publication Title",
        publisher: "Publisher",
        date: new Date().toISOString().slice(0, 7),
        url: "",
        description: "",
      },
      volunteer: {
        id: Date.now().toString(),
        organization: "Organization Name",
        role: "Role",
        startDate: new Date().toISOString().slice(0, 7),
        endDate: new Date().toISOString().slice(0, 7),
        current: false,
        description: "Description of volunteer work",
      },
      speaking: {
        id: Date.now().toString(),
        event: "Event Name",
        topic: "Talk Topic",
        date: new Date().toISOString().slice(0, 7),
        location: "Location",
        url: "",
      },
      patents: {
        id: Date.now().toString(),
        title: "Patent Title",
        patentNumber: "US-XXXXXXX",
        date: new Date().toISOString().slice(0, 7),
        status: "Pending",
        description: "",
        url: "",
      },
      portfolio: {
        id: Date.now().toString(),
        platform: "Platform Name",
        url: "https://",
        description: "",
      },
    };

    const defaultItem = defaultItems[section.type];
    if (defaultItem) {
      addArrayItem(`${basePath}.data.items`, defaultItem);
    }
  };

  // Render based on section type
  switch (sectionData.type) {
    case 'certifications':
      return (
        <InlineEditableList
          path={`${basePath}.data.items`}
          items={sectionData.items}
          defaultItem={{
            id: Date.now().toString(),
            name: "Certification Name",
            issuer: "Issuing Organization",
            date: new Date().toISOString().slice(0, 7),
          }}
          addButtonLabel="Add Certification"
          renderItem={(cert, index) => (
            <div style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <InlineEditableText
                    path={`${basePath}.data.items[${index}].name`}
                    value={cert.name}
                    className="text-base font-bold text-gray-900 block"
                    as="h3"
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${index}].issuer`}
                    value={cert.issuer}
                    className="text-sm text-gray-700 font-semibold block"
                    as="p"
                  />
                </div>
                <InlineEditableDate
                  path={`${basePath}.data.items[${index}].date`}
                  value={cert.date}
                  formatDisplay={formatDate}
                  className="text-xs text-gray-600"
                />
              </div>
              {cert.credentialId && (
                <InlineEditableText
                  path={`${basePath}.data.items[${index}].credentialId`}
                  value={cert.credentialId}
                  className="text-xs text-gray-600 block"
                  as="p"
                />
              )}
            </div>
          )}
        />
      );

    case 'languages':
      return (
        <InlineEditableList
          path={`${basePath}.data.items`}
          items={sectionData.items}
          defaultItem={{
            id: Date.now().toString(),
            language: "Language",
            proficiency: "Intermediate",
          }}
          addButtonLabel="Add Language"
          renderItem={(lang, index) => (
            <div className="text-sm text-gray-700">
              <InlineEditableText
                path={`${basePath}.data.items[${index}].language`}
                value={lang.language}
                className="font-semibold inline-block"
              />
              <span> - </span>
              <InlineEditableText
                path={`${basePath}.data.items[${index}].proficiency`}
                value={lang.proficiency}
                className="text-gray-600 inline-block"
              />
            </div>
          )}
        />
      );

    case 'projects':
      return (
        <InlineEditableList
          path={`${basePath}.data.items`}
          items={sectionData.items}
          defaultItem={{
            id: Date.now().toString(),
            name: "Project Name",
            description: "Project description",
            techStack: [],
          }}
          addButtonLabel="Add Project"
          renderItem={(project, index) => (
            <div style={{ pageBreakInside: 'avoid' }}>
              <InlineEditableText
                path={`${basePath}.data.items[${index}].name`}
                value={project.name}
                className="text-base font-bold text-gray-900 block"
                as="h3"
              />
              {project.description && (
                <InlineEditableText
                  path={`${basePath}.data.items[${index}].description`}
                  value={project.description}
                  className="text-sm text-gray-700 leading-relaxed mt-1 block"
                  multiline
                  as="p"
                />
              )}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs text-gray-600">Tech:</span>
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="text-xs text-gray-700 font-medium">
                      {tech}{idx < project.techStack.length - 1 ? "," : ""}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        />
      );

    case 'awards':
      return (
        <InlineEditableList
          path={`${basePath}.data.items`}
          items={sectionData.items}
          defaultItem={{
            id: Date.now().toString(),
            title: "Award Title",
            issuer: "Issuing Organization",
            date: new Date().toISOString().slice(0, 7),
          }}
          addButtonLabel="Add Award"
          renderItem={(award, index) => (
            <div style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between items-baseline">
                <InlineEditableText
                  path={`${basePath}.data.items[${index}].title`}
                  value={award.title}
                  className="text-base font-bold text-gray-900"
                  as="h3"
                />
                <InlineEditableDate
                  path={`${basePath}.data.items[${index}].date`}
                  value={award.date}
                  formatDisplay={formatDate}
                  className="text-xs text-gray-600"
                />
              </div>
              <InlineEditableText
                path={`${basePath}.data.items[${index}].issuer`}
                value={award.issuer}
                className="text-sm text-gray-700 block"
                as="p"
              />
              {award.description && (
                <InlineEditableText
                  path={`${basePath}.data.items[${index}].description`}
                  value={award.description}
                  className="text-sm text-gray-600 mt-1 block"
                  multiline
                  as="p"
                />
              )}
            </div>
          )}
        />
      );

    case 'volunteer':
      return (
        <InlineEditableList
          path={`${basePath}.data.items`}
          items={sectionData.items}
          defaultItem={{
            id: Date.now().toString(),
            organization: "Organization Name",
            role: "Role",
            startDate: new Date().toISOString().slice(0, 7),
            endDate: new Date().toISOString().slice(0, 7),
            current: false,
            description: "Description",
          }}
          addButtonLabel="Add Volunteer Experience"
          renderItem={(vol, index) => (
            <div style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <InlineEditableText
                    path={`${basePath}.data.items[${index}].role`}
                    value={vol.role}
                    className="text-base font-bold text-gray-900 block"
                    as="h3"
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${index}].organization`}
                    value={vol.organization}
                    className="text-sm text-gray-700 font-semibold block"
                    as="p"
                  />
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-1">
                  <InlineEditableDate
                    path={`${basePath}.data.items[${index}].startDate`}
                    value={vol.startDate}
                    formatDisplay={formatDate}
                    className="inline-block"
                  />
                  <span> - </span>
                  {vol.current ? (
                    <span>Present</span>
                  ) : (
                    <InlineEditableDate
                      path={`${basePath}.data.items[${index}].endDate`}
                      value={vol.endDate}
                      formatDisplay={formatDate}
                      className="inline-block"
                    />
                  )}
                </div>
              </div>
              {vol.description && (
                <InlineEditableText
                  path={`${basePath}.data.items[${index}].description`}
                  value={vol.description}
                  className="text-sm text-gray-700 leading-relaxed block"
                  multiline
                  as="p"
                />
              )}
            </div>
          )}
        />
      );

    case 'portfolio':
      return (
        <InlineEditableList
          path={`${basePath}.data.items`}
          items={sectionData.items}
          defaultItem={{
            id: Date.now().toString(),
            platform: "Platform Name",
            url: "https://",
          }}
          addButtonLabel="Add Portfolio Link"
          renderItem={(item, index) => (
            <div className="text-sm">
              <InlineEditableText
                path={`${basePath}.data.items[${index}].platform`}
                value={item.platform}
                className="font-semibold text-gray-900 inline-block"
              />
              <span>: </span>
              <InlineEditableText
                path={`${basePath}.data.items[${index}].url`}
                value={item.url}
                className="text-gray-700 inline-block"
              />
            </div>
          )}
        />
      );

    case 'custom':
      return (
        <InlineEditableText
          path={`${basePath}.data.content`}
          value={sectionData.content || ""}
          className="text-sm text-gray-700 leading-relaxed whitespace-pre-line block"
          multiline
          as="p"
        />
      );

    default:
      return renderNonEditable();
  }
}
