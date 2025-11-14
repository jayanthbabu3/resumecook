import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import {
  Download,
  Save,
  ArrowLeft,
  Loader2,
  Plus,
  GripVertical,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { resumeService } from "@/lib/firestore/resumeService";
import type { ResumeSection, SectionType, SectionData } from "@/types/resume";
import { toast } from "sonner";
import { HELPER_SECTIONS, SECTION_DEFAULT_TITLES } from "@/constants/helperSections";
import { pdf } from "@react-pdf/renderer";
import { ScratchBuilderPDF } from "@/components/resume/pdf/ScratchBuilderPDF";
import { registerPDFFonts } from "@/lib/pdfFonts";

// Simple ID generator
const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;


// Helper section card in the right panel
interface HelperSectionCardProps {
  type: SectionType;
  icon: string;
  title: string;
  description: string;
}

function HelperSectionCard({ type, icon, title, description }: HelperSectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `helper-${type}`,
    data: { type, source: "helper" },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-white to-gray-50/50 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md hover:border-primary/30"
      data-section-type={type}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-0.5 flex-shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
              {title}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
          </div>
          <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

// Draggable resume section in the canvas
interface ResumeSectionCardProps {
  section: ResumeSection;
  onUpdate: (id: string, updates: Partial<ResumeSection>) => void;
  onDelete: (id: string) => void;
}

function ResumeSectionCard({ section, onUpdate, onDelete }: ResumeSectionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderSectionContent = () => {
    switch (section.data.type) {
      case "summary":
        return (
          <textarea
            className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={section.data.content || ""}
            onChange={(e) =>
              onUpdate(section.id, {
                data: { ...section.data, content: e.target.value },
              })
            }
            placeholder="Write a brief professional summary..."
          />
        );

      case "experience":
        return (
          <div className="space-y-3">
            {section.data.items?.map((exp, index) => (
              <div key={exp.id} className="p-3 border rounded-md bg-gray-50">
                <input
                  type="text"
                  className="w-full font-semibold mb-1 bg-transparent border-none focus:outline-none"
                  value={exp.position}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...exp, position: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Position"
                />
                <input
                  type="text"
                  className="w-full text-sm mb-2 bg-transparent border-none focus:outline-none"
                  value={exp.company}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...exp, company: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Company"
                />
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 text-xs bg-transparent border rounded px-2 py-1 focus:outline-none"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index] = { ...exp, startDate: e.target.value };
                      onUpdate(section.id, {
                        data: { ...section.data, items: newItems },
                      });
                    }}
                    placeholder="Start Date"
                  />
                  <input
                    type="text"
                    className="flex-1 text-xs bg-transparent border rounded px-2 py-1 focus:outline-none"
                    value={exp.endDate}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index] = { ...exp, endDate: e.target.value };
                      onUpdate(section.id, {
                        data: { ...section.data, items: newItems },
                      });
                    }}
                    placeholder="End Date"
                  />
                </div>
                <textarea
                  className="w-full text-sm bg-transparent border rounded px-2 py-1 resize-none focus:outline-none"
                  rows={3}
                  value={exp.description}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...exp, description: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Description"
                />
              </div>
            )) || []}
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => {
                const newItem = {
                  id: generateId(),
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  current: false,
                };
                onUpdate(section.id, {
                  data: {
                    ...section.data,
                    items: [...(section.data.items || []), newItem],
                  },
                });
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Experience
            </Button>
          </div>
        );

      case "education":
        return (
          <div className="space-y-3">
            {section.data.items?.map((edu, index) => (
              <div key={edu.id} className="p-3 border rounded-md bg-gray-50">
                <input
                  type="text"
                  className="w-full font-semibold mb-1 bg-transparent border-none focus:outline-none"
                  value={edu.degree}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...edu, degree: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Degree"
                />
                <input
                  type="text"
                  className="w-full text-sm mb-2 bg-transparent border-none focus:outline-none"
                  value={edu.school}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...edu, school: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="School"
                />
                <input
                  type="text"
                  className="w-full text-sm mb-2 bg-transparent border-none focus:outline-none"
                  value={edu.field}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...edu, field: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Field of Study"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 text-xs bg-transparent border rounded px-2 py-1 focus:outline-none"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index] = { ...edu, startDate: e.target.value };
                      onUpdate(section.id, {
                        data: { ...section.data, items: newItems },
                      });
                    }}
                    placeholder="Start Date"
                  />
                  <input
                    type="text"
                    className="flex-1 text-xs bg-transparent border rounded px-2 py-1 focus:outline-none"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index] = { ...edu, endDate: e.target.value };
                      onUpdate(section.id, {
                        data: { ...section.data, items: newItems },
                      });
                    }}
                    placeholder="End Date"
                  />
                </div>
              </div>
            )) || []}
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => {
                const newItem = {
                  id: generateId(),
                  school: "",
                  degree: "",
                  field: "",
                  startDate: "",
                  endDate: "",
                };
                onUpdate(section.id, {
                  data: {
                    ...section.data,
                    items: [...(section.data.items || []), newItem],
                  },
                });
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Education
            </Button>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {section.data.items?.map((skill, index) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  <input
                    type="text"
                    className="bg-transparent border-none focus:outline-none w-20"
                    value={skill.name}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index] = { ...skill, name: e.target.value };
                      onUpdate(section.id, {
                        data: { ...section.data, items: newItems },
                      });
                    }}
                    placeholder="Skill"
                  />
                  <button
                    onClick={() => {
                      const newItems = section.data.items.filter(
                        (_, i) => i !== index
                      );
                      onUpdate(section.id, {
                        data: { ...section.data, items: newItems },
                      });
                    }}
                    className="text-primary/60 hover:text-primary"
                  >
                    ×
                  </button>
                </div>
              )) || []}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => {
                const newItem = {
                  id: generateId(),
                  name: "",
                };
                onUpdate(section.id, {
                  data: {
                    ...section.data,
                    items: [...(section.data.items || []), newItem],
                  },
                });
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Skill
            </Button>
          </div>
        );

      case "certifications":
        return (
          <div className="space-y-3">
            {section.data.items?.map((cert, index) => (
              <div key={cert.id} className="p-3 border rounded-md bg-gray-50">
                <input
                  type="text"
                  className="w-full font-semibold mb-1 bg-transparent border-none focus:outline-none"
                  value={cert.name}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...cert, name: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Certification Name"
                />
                <input
                  type="text"
                  className="w-full text-sm mb-2 bg-transparent border-none focus:outline-none"
                  value={cert.issuer}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...cert, issuer: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Issuing Organization"
                />
                <input
                  type="text"
                  className="w-full text-xs bg-transparent border rounded px-2 py-1 focus:outline-none"
                  value={cert.date}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...cert, date: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Date"
                />
              </div>
            )) || []}
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => {
                const newItem = {
                  id: generateId(),
                  name: "",
                  issuer: "",
                  date: "",
                };
                onUpdate(section.id, {
                  data: {
                    ...section.data,
                    items: [...(section.data.items || []), newItem],
                  },
                });
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Certification
            </Button>
          </div>
        );

      case "languages":
        return (
          <div className="space-y-3">
            {section.data.items?.map((lang, index) => (
              <div key={lang.id} className="p-3 border rounded-md bg-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 font-semibold bg-transparent border-none focus:outline-none"
                    value={lang.language}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index] = { ...lang, language: e.target.value };
                      onUpdate(section.id, {
                        data: { ...section.data, items: newItems },
                      });
                    }}
                    placeholder="Language"
                  />
                  <select
                    className="text-sm bg-transparent border rounded px-2 py-1 focus:outline-none"
                    value={lang.proficiency}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index] = {
                        ...lang,
                        proficiency: e.target.value as any,
                      };
                      onUpdate(section.id, {
                        data: { ...section.data, items: newItems },
                      });
                    }}
                  >
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional">Professional</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
              </div>
            )) || []}
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => {
                const newItem = {
                  id: generateId(),
                  language: "",
                  proficiency: "Professional" as any,
                };
                onUpdate(section.id, {
                  data: {
                    ...section.data,
                    items: [...(section.data.items || []), newItem],
                  },
                });
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Language
            </Button>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-3">
            {section.data.items?.map((project, index) => (
              <div key={project.id} className="p-3 border rounded-md bg-gray-50">
                <input
                  type="text"
                  className="w-full font-semibold mb-2 bg-transparent border-none focus:outline-none"
                  value={project.name}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...project, name: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Project Name"
                />
                <textarea
                  className="w-full text-sm mb-2 bg-transparent border rounded px-2 py-1 resize-none focus:outline-none"
                  rows={2}
                  value={project.description}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...project, description: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Project Description"
                />
                <input
                  type="text"
                  className="w-full text-xs bg-transparent border rounded px-2 py-1 focus:outline-none"
                  value={project.techStack?.join(", ") || ""}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = {
                      ...project,
                      techStack: e.target.value.split(",").map((s) => s.trim()),
                    };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Tech Stack (comma separated)"
                />
              </div>
            )) || []}
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => {
                const newItem = {
                  id: generateId(),
                  name: "",
                  description: "",
                  techStack: [],
                };
                onUpdate(section.id, {
                  data: {
                    ...section.data,
                    items: [...(section.data.items || []), newItem],
                  },
                });
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Project
            </Button>
          </div>
        );

      case "awards":
        return (
          <div className="space-y-3">
            {section.data.items?.map((award, index) => (
              <div key={award.id} className="p-3 border rounded-md bg-gray-50">
                <input
                  type="text"
                  className="w-full font-semibold mb-1 bg-transparent border-none focus:outline-none"
                  value={award.title}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[index] = { ...award, title: e.target.value };
                    onUpdate(section.id, {
                      data: { ...section.data, items: newItems },
                    });
                  }}
                  placeholder="Award Title"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 text-sm bg-transparent border-none focus:outline-none"
                    value={award.issuer}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index] = { ...award, issuer: e.target.value };
                      onUpdate(section.id, {
                        data: { ...section.data, items: newItems },
                      });
                    }}
                    placeholder="Issuer"
                  />
                  <input
                    type="text"
                    className="w-24 text-xs bg-transparent border rounded px-2 py-1 focus:outline-none"
                    value={award.date}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index] = { ...award, date: e.target.value };
                      onUpdate(section.id, {
                        data: { ...section.data, items: newItems },
                      });
                    }}
                    placeholder="Date"
                  />
                </div>
              </div>
            )) || []}
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => {
                const newItem = {
                  id: generateId(),
                  title: "",
                  issuer: "",
                  date: "",
                };
                onUpdate(section.id, {
                  data: {
                    ...section.data,
                    items: [...(section.data.items || []), newItem],
                  },
                });
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Award
            </Button>
          </div>
        );

      case "custom":
        return (
          <textarea
            className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={section.data.content || ""}
            onChange={(e) =>
              onUpdate(section.id, {
                data: { ...section.data, content: e.target.value },
              })
            }
            placeholder="Enter custom section content..."
          />
        );

      default:
        return (
          <div className="text-sm text-gray-500 p-3 border rounded-md bg-gray-50">
            <p className="font-medium mb-1">Section type: {section.data.type}</p>
            <p className="text-xs">
              This section type can be edited but inline editing is not fully implemented yet.
              You can still save and export it.
            </p>
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b">
        <input
          type="text"
          className="flex-1 font-semibold text-lg bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 -mx-2"
          value={section.title}
          onChange={(e) => onUpdate(section.id, { title: e.target.value })}
          placeholder="Section Title"
        />
        <div className="flex items-center gap-1">
          <button
            {...listeners}
            {...attributes}
            className="p-1.5 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </button>
          <button
            onClick={() =>
              onUpdate(section.id, { enabled: !section.enabled })
            }
            className="p-1.5 hover:bg-gray-100 rounded"
            title={section.enabled ? "Hide section" : "Show section"}
          >
            {section.enabled ? (
              <Eye className="h-4 w-4 text-gray-600" />
            ) : (
              <EyeOff className="h-4 w-4 text-gray-400" />
            )}
          </button>
          <button
            onClick={() => onDelete(section.id)}
            className="p-1.5 hover:bg-red-50 rounded text-red-600"
            title="Delete section"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {section.enabled && <div>{renderSectionContent()}</div>}
    </div>
  );
}

const ScratchBuilder = () => {
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();
  const [sections, setSections] = useState<ResumeSection[]>([]);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Create a new section with default data
  const createSection = useCallback((type: SectionType): ResumeSection => {
    const id = generateId();
    const order = sections.length;
    const title = SECTION_DEFAULT_TITLES[type];

    let data: SectionData;

    switch (type) {
      case "summary":
        data = { type: "summary", content: "" };
        break;
      case "experience":
        data = {
          type: "experience",
          items: [
            {
              id: generateId(),
              position: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
              current: false,
            },
          ],
        };
        break;
      case "education":
        data = {
          type: "education",
          items: [
            {
              id: generateId(),
              school: "",
              degree: "",
              field: "",
              startDate: "",
              endDate: "",
            },
          ],
        };
        break;
      case "skills":
        data = {
          type: "skills",
          items: [{ id: generateId(), name: "" }],
        };
        break;
      case "certifications":
        data = {
          type: "certifications",
          items: [
            {
              id: generateId(),
              name: "",
              issuer: "",
              date: "",
            },
          ],
        };
        break;
      case "languages":
        data = {
          type: "languages",
          items: [
            {
              id: generateId(),
              language: "",
              proficiency: "Professional",
            },
          ],
        };
        break;
      case "projects":
        data = {
          type: "projects",
          items: [
            {
              id: generateId(),
              name: "",
              description: "",
              techStack: [],
            },
          ],
        };
        break;
      case "awards":
        data = {
          type: "awards",
          items: [
            {
              id: generateId(),
              title: "",
              issuer: "",
              date: "",
            },
          ],
        };
        break;
      case "publications":
        data = {
          type: "publications",
          items: [
            {
              id: generateId(),
              title: "",
              publisher: "",
              date: "",
            },
          ],
        };
        break;
      case "volunteer":
        data = {
          type: "volunteer",
          items: [
            {
              id: generateId(),
              organization: "",
              role: "",
              startDate: "",
              endDate: "",
              current: false,
              description: "",
            },
          ],
        };
        break;
      case "speaking":
        data = {
          type: "speaking",
          items: [
            {
              id: generateId(),
              event: "",
              topic: "",
              date: "",
              location: "",
            },
          ],
        };
        break;
      case "patents":
        data = {
          type: "patents",
          items: [
            {
              id: generateId(),
              title: "",
              patentNumber: "",
              date: "",
              status: "Granted",
            },
          ],
        };
        break;
      case "portfolio":
        data = {
          type: "portfolio",
          items: [
            {
              id: generateId(),
              platform: "",
              url: "",
            },
          ],
        };
        break;
      case "custom":
        data = { type: "custom", content: "" };
        break;
      default:
        data = { type: "custom", content: "" };
    }

    return {
      id,
      type,
      order,
      enabled: true,
      title,
      data,
    };
  }, [sections.length]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    // Check if dragging from helper sections
    const activeData = active.data.current;
    if (activeData?.source === "helper") {
      const sectionType = activeData.type as SectionType;
      const newSection = createSection(sectionType);
      setSections((prev) => [...prev, newSection]);
      toast.success(`${newSection.title} section added!`);
    }
    // Reordering existing sections
    else if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return items;
        const newItems = arrayMove(items, oldIndex, newIndex);
        // Update order
        return newItems.map((item, index) => ({ ...item, order: index }));
      });
    }

    setActiveId(null);
  };

  const handleUpdateSection = (id: string, updates: Partial<ResumeSection>) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      )
    );
  };

  const handleDeleteSection = (id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
    toast.success("Section deleted");
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to save your resume");
      return;
    }

    setIsSaving(true);
    try {
      const resumeData = {
        personalInfo: {
          ...personalInfo,
          summary: "",
          photo: "",
        },
        experience: [],
        education: [],
        skills: [],
        sections: [],
        dynamicSections: sections,
      };

      await resumeService.createResume(user.uid, resumeData, {
        title: "Scratch Resume",
        themeColor: "#2563eb",
      });

      toast.success("Resume saved successfully!");
      navigate("/my-resumes");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await registerPDFFonts();

      const resumeData = {
        personalInfo: {
          ...personalInfo,
          summary: "",
          photo: "",
        },
        experience: [],
        education: [],
        skills: [],
        sections: [],
        dynamicSections: sections,
      };

      const pdfDoc = pdf(
        <ScratchBuilderPDF resumeData={resumeData} themeColor="#2563eb" />
      );
      const blob = await pdfDoc.toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      link.click();

      toast.success("Resume exported successfully!");
    } catch (error) {
      console.error("Error exporting resume:", error);
      toast.error("Failed to export resume");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Top Bar */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Create Resume from Scratch</h1>
                <p className="text-xs text-muted-foreground">
                  Drag sections from the right panel to build your resume
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={isExporting || sections.length === 0}
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-1" />
                )}
                Export PDF
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving || sections.length === 0}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Blank Canvas */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border shadow-sm p-6 min-h-[600px]">
                {/* Personal Info Header */}
                <div className="mb-6 pb-6 border-b">
                  <input
                    type="text"
                    className="w-full text-3xl font-bold mb-2 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 -mx-2"
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    placeholder="Your Name"
                  />
                  <input
                    type="text"
                    className="w-full text-lg text-gray-600 mb-3 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 -mx-2"
                    value={personalInfo.title}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Professional Title"
                  />
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <input
                      type="email"
                      className="flex-1 min-w-[200px] bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary px-1 py-1"
                      value={personalInfo.email}
                      onChange={(e) =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="email@example.com"
                    />
                    <input
                      type="tel"
                      className="flex-1 min-w-[150px] bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary px-1 py-1"
                      value={personalInfo.phone}
                      onChange={(e) =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="Phone"
                    />
                    <input
                      type="text"
                      className="flex-1 min-w-[150px] bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary px-1 py-1"
                      value={personalInfo.location}
                      onChange={(e) =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      placeholder="Location"
                    />
                  </div>
                </div>

                {/* Sections Drop Zone */}
                {sections.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Plus className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Start Building Your Resume
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Drag sections from the helper panel on the right to add them to
                      your resume. You can add sections in any order you prefer.
                    </p>
                  </div>
                ) : (
                  <SortableContext
                    items={sections.map((s) => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {sections.map((section) => (
                        <ResumeSectionCard
                          key={section.id}
                          section={section}
                          onUpdate={handleUpdateSection}
                          onDelete={handleDeleteSection}
                        />
                      ))}
                    </div>
                  </SortableContext>
                )}
              </div>
            </div>

            {/* Right Side - Helper Sections */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border shadow-sm p-4 sticky top-20">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-1">Helper Sections</h2>
                  <p className="text-xs text-muted-foreground">
                    Drag these sections to your resume
                  </p>
                </div>

                <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  {HELPER_SECTIONS.map((section) => (
                    <HelperSectionCard
                      key={section.type}
                      type={section.type}
                      icon={section.icon}
                      title={section.title}
                      description={section.description}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId && activeId.toString().startsWith("helper-") ? (
            <div className="bg-white border-2 border-primary rounded-lg p-3 shadow-xl">
              <div className="font-semibold text-sm">Adding section...</div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default ScratchBuilder;
