import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Briefcase, GraduationCap, Code, FileText } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { ResumeData } from "@/pages/Editor";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export const ResumeForm = ({ resumeData, setResumeData }: ResumeFormProps) => {
  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          current: false
        }
      ]
    });
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: ""
        }
      ]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, ""]
    });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    });
  };

  const addCustomSection = () => {
    setResumeData({
      ...resumeData,
      sections: [
        ...resumeData.sections,
        {
          id: Date.now().toString(),
          title: "New Section",
          content: ""
        }
      ]
    });
  };

  const updateCustomSection = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      sections: resumeData.sections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    });
  };

  const removeCustomSection = (id: string) => {
    setResumeData({
      ...resumeData,
      sections: resumeData.sections.filter(section => section.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Personal Information
          </CardTitle>
          <CardDescription>Your basic contact details and professional title</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={resumeData.personalInfo.title}
                onChange={(e) => updatePersonalInfo("title", e.target.value)}
                placeholder="Senior Software Engineer"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={resumeData.personalInfo.location}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={resumeData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              placeholder="Brief overview of your professional background and key achievements..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Work Experience
              </CardTitle>
              <CardDescription>Your professional work history</CardDescription>
            </div>
            <Button onClick={addExperience} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="space-y-4 p-4 border border-border rounded-lg relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperience(exp.id, "current", checked as boolean)}
                />
                <label
                  htmlFor={`current-${exp.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I currently work here
                </label>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))}
          {resumeData.experience.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No experience added yet. Click "Add Experience" to get started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </CardTitle>
              <CardDescription>Your academic background</CardDescription>
            </div>
            <Button onClick={addEducation} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="space-y-4 p-4 border border-border rounded-lg relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>School/University</Label>
                  <Input
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                  placeholder="Computer Science, Business, etc."
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          {resumeData.education.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No education added yet. Click "Add Education" to get started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Skills
              </CardTitle>
              <CardDescription>Your technical and soft skills</CardDescription>
            </div>
            <Button onClick={addSkill} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                placeholder="e.g., JavaScript, Project Management, Communication"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          {resumeData.skills.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No skills added yet. Click "Add Skill" to get started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Custom Sections */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Custom Sections</CardTitle>
              <CardDescription>Add additional sections like certifications, projects, etc.</CardDescription>
            </div>
            <Button onClick={addCustomSection} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.sections.map((section) => (
            <div key={section.id} className="space-y-4 p-4 border border-border rounded-lg relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => removeCustomSection(section.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <div className="space-y-2">
                <Label>Section Title</Label>
                <Input
                  value={section.title}
                  onChange={(e) => updateCustomSection(section.id, "title", e.target.value)}
                  placeholder="e.g., Certifications, Projects, Awards"
                />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateCustomSection(section.id, "content", e.target.value)}
                  placeholder="Describe the details for this section..."
                  rows={4}
                />
              </div>
            </div>
          ))}
          {resumeData.sections.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No custom sections yet. Click "Add Section" to create one.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
