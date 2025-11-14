import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Camera, Trash2 } from "lucide-react";
import type { ResumeData } from "@/pages/Editor";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export const ResumeForm = ({ resumeData, setResumeData }: ResumeFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrlInput, setPhotoUrlInput] = useState("");

  useEffect(() => {
    const currentPhoto = resumeData.personalInfo.photo || "";
    if (!currentPhoto || currentPhoto.startsWith("data")) {
      setPhotoUrlInput("");
    } else {
      setPhotoUrlInput(currentPhoto);
    }
  }, [resumeData.personalInfo.photo]);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    });
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        updatePersonalInfo("photo", result);
        setPhotoUrlInput("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoRemove = () => {
    updatePersonalInfo("photo", "");
    setPhotoUrlInput("");
  };

  const applyPhotoUrl = () => {
    const trimmed = photoUrlInput.trim();
    if (trimmed) {
      updatePersonalInfo("photo", trimmed);
    } else {
      handlePhotoRemove();
    }
  };

  return (
    <Accordion type="multiple" defaultValue={["personal", "photo"]} className="space-y-4">
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
              <CardHeader className="pb-4">
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="photo"
          className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
        >
          <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
            <span className="flex items-center gap-3 text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
                <Camera className="h-4 w-4" />
              </span>
              Profile Photo
            </span>
            <span className="ml-auto flex items-center">
              <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
                {resumeData.personalInfo.photo ? "Photo Added" : "No Photo"}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-6 pt-0">
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="pb-4">
                <CardDescription>Add a professional photo to personalize your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="h-32 w-32 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted/20 relative">
                    {resumeData.personalInfo.photo ? (
                      <>
                        <img
                          src={resumeData.personalInfo.photo}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handlePhotoRemove}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="text-3xl text-muted-foreground mb-2">📷</div>
                        <div className="text-sm text-muted-foreground">No photo</div>
                      </div>
                    )}
                  </div>
                </div>

                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                    <TabsTrigger value="url">From URL</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-3 mt-4">
                    <div className="text-center space-y-3">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="gap-2"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Choose File
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Select an image file from your device
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="url" className="space-y-3 mt-4">
                    <div className="space-y-3">
                      <Input
                        placeholder="Paste image URL here..."
                        value={photoUrlInput}
                        onChange={(e) => setPhotoUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && photoUrlInput.trim()) {
                            applyPhotoUrl();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant={photoUrlInput.trim() ? "default" : "outline"}
                        onClick={applyPhotoUrl}
                        disabled={!photoUrlInput.trim()}
                        className="w-full"
                      >
                        Add Photo from URL
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <p className="text-xs text-muted-foreground text-center">
                  Square images work best. Photos are stored locally in your browser.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      handlePhotoUpload(file);
                    }
                    if (event.target) {
                      event.target.value = "";
                    }
                  }}
                />
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  );
};
