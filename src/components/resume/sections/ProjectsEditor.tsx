import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, X, ExternalLink } from 'lucide-react';
import type { ProjectItem } from '@/types/resume';

interface ProjectsEditorProps {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}

export function ProjectsEditor({ items, onChange }: ProjectsEditorProps) {
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id || null);
  const [newTech, setNewTech] = useState<Record<string, string>>({});

  const addProject = () => {
    const newProject: ProjectItem = {
      id: `project-${Date.now()}`,
      name: '',
      description: '',
      techStack: [],
    };
    onChange([...items, newProject]);
    setExpanded(newProject.id);
  };

  const updateProject = (id: string, field: keyof ProjectItem, value: any) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeProject = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const addTechToStack = (projectId: string) => {
    const tech = newTech[projectId]?.trim();
    if (!tech) return;

    const project = items.find((p) => p.id === projectId);
    if (project && !project.techStack.includes(tech)) {
      updateProject(projectId, 'techStack', [...project.techStack, tech]);
      setNewTech({ ...newTech, [projectId]: '' });
    }
  };

  const removeTechFromStack = (projectId: string, tech: string) => {
    const project = items.find((p) => p.id === projectId);
    if (project) {
      updateProject(
        projectId,
        'techStack',
        project.techStack.filter((t) => t !== tech)
      );
    }
  };

  return (
    <div className="space-y-4">
      {items.map((project) => (
        <Card key={project.id} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                className="text-sm font-medium text-left flex-1 hover:text-primary transition-colors"
              >
                {project.name || 'Untitled Project'}
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            {expanded === project.id && (
              <div className="space-y-3 pt-2 border-t">
                <div>
                  <Label>Project Name *</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    placeholder="E-commerce Platform"
                  />
                </div>

                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder="Developed a full-stack e-commerce platform with payment integration..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={project.startDate || ''}
                      onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={project.endDate || ''}
                      onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Project URL</Label>
                    <Input
                      type="url"
                      value={project.url || ''}
                      onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <Label>GitHub URL</Label>
                    <Input
                      type="url"
                      value={project.githubUrl || ''}
                      onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div>
                  <Label>Tech Stack</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTech[project.id] || ''}
                      onChange={(e) =>
                        setNewTech({ ...newTech, [project.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTechToStack(project.id);
                        }
                      }}
                      placeholder="React, Node.js, etc."
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addTechToStack(project.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="gap-1">
                        {tech}
                        <button
                          onClick={() => removeTechFromStack(project.id, tech)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}

      <Button onClick={addProject} variant="outline" className="w-full" size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
