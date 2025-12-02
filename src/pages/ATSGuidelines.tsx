import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  LayoutList,
  Search,
  Sparkles,
  TrendingUp,
  Type,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

type SimpleChecklistItem = {
  title: string;
  description: string;
  helper?: string;
};

type ChecklistExample = {
  label: string;
  summary: string;
  points: string[];
};

type ChecklistItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  good: ChecklistExample;
  bad: ChecklistExample;
};

const checklistItems: ChecklistItem[] = [
  {
    title: "Choose ATS-Friendly Formats",
    description:
      "Export your resume as a clean .pdf or .docx so scanners can read every line without breaking the structure.",
    icon: FileText,
    good: {
      label: "ATS Approved",
      summary: "Professional template exported as PDF with selectable text.",
      points: [
        "Saved as .pdf and .docx versions",
        "Standard fonts like Inter, Arial, Calibri",
        "All contact info typed, not embedded in graphics",
      ],
    },
    bad: {
      label: "Needs Fix",
      summary: "Graphic-heavy exports stop scanners from reading content.",
      points: [
        "Uploaded as a screenshot or image file",
        "Icons hold critical info (phone, email, links)",
        "Layout built with text boxes that shift on export",
      ],
    },
  },
  {
    title: "Keep Section Labels Standard",
    description:
      "Name every section with simple, familiar headings so ATS can map your experience correctly.",
    icon: LayoutList,
    good: {
      label: "ATS Approved",
      summary: "Clear hierarchy that matches ATS expectations.",
      points: [
        "Headings read 'Professional Summary', 'Work Experience', 'Education'",
        "Employment listed in reverse chronological order",
        "Contact block sits at the top with clean spacing",
      ],
    },
    bad: {
      label: "Needs Fix",
      summary: "Creative labels confuse parsers and hide key details.",
      points: [
        "Sections titled 'The Journey' or 'Things I'm Proud Of'",
        "Experience split into multiple columns and tables",
        "Contact info buried in footer graphics",
      ],
    },
  },
  {
    title: "Mirror Job Description Keywords",
    description:
      "Blend keywords and phrases from the job post into your bullet points so ATS sees a strong match.",
    icon: Search,
    good: {
      label: "ATS Approved",
      summary: "Targeted keywords woven into natural language.",
      points: [
        "Uses role-specific skills straight from job ad",
        "Mix of hard skills, tools, and soft skills",
        "Keywords grounded in measurable accomplishments",
      ],
    },
    bad: {
      label: "Needs Fix",
      summary: "Missing or overstuffed keywords trigger low scores.",
      points: [
        "Generic bullets with no job-specific language",
        "Keyword stuffing in a single 'Skills' paragraph",
        "Buzzwords appear without context or proof",
      ],
    },
  },
  {
    title: "Quantify Your Impact",
    description:
      "Back every achievement with metrics so humans and ATS understand the scale of your results.",
    icon: TrendingUp,
    good: {
      label: "ATS Approved",
      summary: "Action verbs paired with outcomes and numbers.",
      points: [
        "Leads with verbs like 'Increased', 'Reduced', 'Delivered'",
        "Shows % lift, revenue, users, or time saved",
        "Highlights scope (team size, budget, platforms)",
      ],
    },
    bad: {
      label: "Needs Fix",
      summary: "Vague bullets leave impact up to interpretation.",
      points: [
        "Uses responsibilities instead of achievements",
        "No numbers or measurable improvements",
        "Passive wording like 'Responsible for'",
      ],
    },
  },
  {
    title: "Prioritize Readability",
    description:
      "Choose a single-column layout with consistent spacing so scanners follow the flow without guesswork.",
    icon: Type,
    good: {
      label: "ATS Approved",
      summary: "Minimal styling keeps the focus on content.",
      points: [
        "11–12pt body text with 1.15 line spacing",
        "Bullet lists under 2–3 lines each",
        "No columns, borders, or decorative icons near text",
      ],
    },
    bad: {
      label: "Needs Fix",
      summary: "Visual noise hides the information recruiters need.",
      points: [
        "Two-column grids with asymmetrical spacing",
        "Paragraph bullets longer than three lines",
        "Heavy use of icons, color blocks, or timelines",
      ],
    },
  },
];

const simpleChecklist: SimpleChecklistItem[] = [
  {
    title: "Export a Clean PDF (Named With Your Full Name)",
    description:
      "Submit resumes as selectable-text PDFs or .docx files only. Rename the file to follow the “FirstName LastName.pdf” format before you upload.",
    helper: "Hiring teams at Google, McKinsey, and Goldman Sachs expect polished naming conventions.",
  },
  {
    title: "Keep Every Required Section",
    description:
      "Do not delete core areas such as Summary, Work Experience, Education, and Skills. ATS relies on these labels to map your information correctly.",
  },
  {
    title: "Surface Contact Details Upfront",
    description:
      "Include your phone, email, location, and an active LinkedIn URL at the top. Avoid hiding contact info in footers or icons.",
  },
  {
    title: "List Only Role-Relevant Skills",
    description:
      "Skip unrelated tools or hobbies. Screening software scores you against the required skills—extra fluff can lower your relevance.",
  },
  {
    title: "Mirror Date Formats Everywhere",
    description:
      "Choose one format, such as “Jan 2022 – Present”, and stick to it for every position and education entry.",
  },
  {
    title: "Avoid Tables, Text Boxes, and Multi-Column Tricks",
    description:
      "Complex layouts often break when ATS parsers read the file. Stick to a clean, single-column structure with bullet lists.",
  },
  {
    title: "Skip Photos and Decorative Graphics",
    description:
      "Images, diagrams, timelines, and icons aren’t read by scanners and can hide valuable keywords from recruiters.",
  },
  {
    title: "Never Upload Scanned Documents",
    description:
      "Make sure your text can be highlighted and copied. OCR conversions miss characters and can block your resume entirely.",
  },
  {
    title: "Align With the Job Description",
    description:
      "Blend relevant keywords into your Summary and Work Experience bullets. Highlight the company or location you’re targeting to boost search visibility.",
    helper: "If you need help tailoring quickly, our builder suggests keywords straight from any JD.",
  },
  {
    title: "Stay Within Proven Template Standards",
    description:
      "Use ATS-tested templates with balanced whitespace, standard fonts, and clear headings—exactly what top employers already approve.",
  },
];

const ATSGuidelines = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-100/20" />
        <div className="absolute -top-32 right-1/2 h-64 w-64 translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
              <BookOpen className="h-4 w-4" />
              <span>ATS Resume Playbook</span>
            </span>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                Create a Resume That{" "}
                <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                  Beats the ATS
                </span>
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                Follow this modern checklist to make sure your resume reaches recruiters with the polish of a premium design and the structure that Applicant Tracking Systems love.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="sm"
                className="group h-10 px-6 text-sm font-semibold shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                onClick={() => navigate("/dashboard")}
              >
                Start an ATS-Friendly Resume
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-6 text-sm font-semibold backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/60"
              >
                Explore Templates
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>100% ATS Scanner Safe</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Premium Design Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              Essential Checklist
            </span>
            <h2 className="text-2xl font-semibold text-foreground leading-tight">
              Nail the Basics Before You Export
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Walk through each checkpoint to make sure your resume is clear, scannable, and keyword-rich without sacrificing style—exactly what elite recruiters are looking for.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative md:pl-8">
              <div className="pointer-events-none absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-border/60 md:block" />
              <div className="space-y-5">
                {simpleChecklist.map((item, index) => {
                  const isLast = index === simpleChecklist.length - 1;
                  return (
                    <div key={item.title} className="relative flex gap-4 md:gap-6">
                      <div className="relative flex w-8 flex-shrink-0 justify-center">
                        <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-emerald-300 bg-white text-[11px] font-semibold text-emerald-600">
                          {index + 1}
                        </span>
                        {!isLast && (
                          <>
                            <span
                              className="pointer-events-none absolute top-7 w-[2px] bg-primary/30"
                              style={{ height: "calc(100% + 20px)" }}
                            />
                            <span className="pointer-events-none absolute bottom-[-1.25rem] h-1.5 w-1.5 rounded-full bg-primary/40" />
                          </>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-semibold text-foreground leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                        {item.helper && (
                          <p className="text-xs font-medium text-primary">
                            {item.helper}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              Bring It To Life
            </span>
            <h2 className="text-2xl font-semibold text-foreground leading-tight sm:text-3xl">
              See the Difference Between “Needs Work” and “ATS Ready”
            </h2>
            <p className="text-sm text-muted-foreground">
              Compare how each checklist item looks in practice so you can course-correct instantly.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {checklistItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/60 bg-white/90 p-6 shadow-sm"
                >
                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">
                        Checklist Focus
                      </p>
                      <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-4 rounded-xl border border-rose-200 bg-rose-50/80 p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-rose-500 shadow-sm">
                          ✕
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                            {item.bad.label}
                          </span>
                          <p className="mt-1 text-sm font-medium text-rose-700">
                            {item.bad.summary}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-rose-700">
                        {item.bad.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                            {item.good.label}
                          </span>
                          <p className="mt-1 text-sm font-medium text-emerald-700">
                            {item.good.summary}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-emerald-700">
                        {item.good.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-200/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/10 to-transparent" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/40 bg-white/70 p-8 text-center shadow-xl backdrop-blur">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                Finish Strong
              </span>
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                Ready to Launch Your ATS-Optimized Resume?
              </h2>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Use the checklist above inside our editor to build a premium resume that passes every scan and delights human reviewers.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="sm"
                className="group h-10 px-6 text-sm font-semibold shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                onClick={() => navigate("/dashboard")}
              >
                Build My Resume Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-6 text-sm font-semibold backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/60"
              >
                View Sample Templates
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-5">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <div>© {new Date().getFullYear()} ResumeCook. Crafted to help you land your next role.</div>
            <div className="flex items-center justify-center gap-4 text-[11px] uppercase tracking-wide sm:text-xs">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ATSGuidelines;
