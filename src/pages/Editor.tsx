import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { pdf } from "@react-pdf/renderer";
import { ProfessionalPDF } from "@/components/resume/pdf/ProfessionalPDF";
import { ModernPDF } from "@/components/resume/pdf/ModernPDF";
import { MinimalPDF } from "@/components/resume/pdf/MinimalPDF";
import { ExecutivePDF } from "@/components/resume/pdf/ExecutivePDF";
import { FrontendPDF } from "@/components/resume/pdf/FrontendPDF";
import { FullstackPDF } from "@/components/resume/pdf/FullstackPDF";
import { registerPDFFonts } from "@/lib/pdfFonts";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
  sections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

const getTemplateDefaults = (templateId: string): ResumeData => {
  const templates: Record<string, ResumeData> = {
    professional: {
      personalInfo: {
        fullName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        title: "Senior Financial Analyst",
        summary: "Results-driven financial analyst with 8+ years of experience in corporate finance, financial modeling, and strategic planning. Proven track record of delivering actionable insights that drive business growth and operational efficiency."
      },
      experience: [
        {
          id: "1",
          company: "Goldman Sachs",
          position: "Senior Financial Analyst",
          startDate: "2020-03",
          endDate: "",
          current: true,
          description: "• Lead financial planning and analysis for $500M portfolio\n• Develop complex financial models to support strategic decision-making\n• Present quarterly business reviews to C-suite executives\n• Manage team of 3 junior analysts"
        },
        {
          id: "2",
          company: "JPMorgan Chase",
          position: "Financial Analyst",
          startDate: "2016-06",
          endDate: "2020-02",
          current: false,
          description: "• Conducted financial analysis and forecasting for multiple business units\n• Streamlined reporting processes, reducing monthly close time by 30%\n• Collaborated with cross-functional teams on budgeting initiatives"
        }
      ],
      education: [
        {
          id: "1",
          school: "Columbia University",
          degree: "Master of Business Administration",
          field: "Finance",
          startDate: "2014-09",
          endDate: "2016-05"
        },
        {
          id: "2",
          school: "University of Pennsylvania",
          degree: "Bachelor of Science",
          field: "Economics",
          startDate: "2010-09",
          endDate: "2014-05"
        }
      ],
      skills: ["Financial Modeling", "Excel & VBA", "SQL", "Tableau", "Budget Planning", "Risk Analysis", "Bloomberg Terminal", "Financial Reporting"],
      sections: [
        {
          id: "1",
          title: "Certifications",
          content: "Chartered Financial Analyst (CFA) - Level III Candidate\nFinancial Risk Manager (FRM) Certified"
        }
      ]
    },
    modern: {
      personalInfo: {
        fullName: "Alex Chen",
        email: "alex.chen@email.com",
        phone: "+1 (555) 987-6543",
        location: "San Francisco, CA",
        title: "Full Stack Developer",
        summary: "Passionate full-stack developer with 5+ years building scalable web applications. Specialized in React, Node.js, and cloud technologies. Love creating elegant solutions to complex problems and collaborating with creative teams."
      },
      experience: [
        {
          id: "1",
          company: "Tech Startup Inc",
          position: "Senior Full Stack Developer",
          startDate: "2021-01",
          endDate: "",
          current: true,
          description: "• Architected and deployed microservices handling 1M+ daily active users\n• Led migration from monolith to serverless architecture on AWS\n• Mentored 5 junior developers and conducted code reviews\n• Improved application performance by 60% through optimization"
        },
        {
          id: "2",
          company: "Digital Agency Co",
          position: "Frontend Developer",
          startDate: "2019-03",
          endDate: "2020-12",
          current: false,
          description: "• Built responsive web applications using React and TypeScript\n• Implemented CI/CD pipelines reducing deployment time by 40%\n• Collaborated with designers to create pixel-perfect UIs"
        }
      ],
      education: [
        {
          id: "1",
          school: "Stanford University",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05"
        }
      ],
      skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "GraphQL", "Git", "Agile/Scrum"],
      sections: [
        {
          id: "1",
          title: "Projects",
          content: "E-Commerce Platform - Built scalable e-commerce solution serving 50K+ users\nOpen Source Contributor - Active contributor to React ecosystem with 500+ GitHub stars"
        }
      ]
    },
    minimal: {
      personalInfo: {
        fullName: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        phone: "+1 (555) 234-5678",
        location: "Austin, TX",
        title: "UX Designer",
        summary: "Creative UX designer with a keen eye for detail and user-centered design principles. 6+ years of experience crafting intuitive digital experiences for web and mobile platforms."
      },
      experience: [
        {
          id: "1",
          company: "Design Studio",
          position: "Senior UX Designer",
          startDate: "2020-08",
          endDate: "",
          current: true,
          description: "• Lead UX strategy for client projects ranging from startups to Fortune 500\n• Conduct user research, usability testing, and data analysis\n• Design wireframes, prototypes, and high-fidelity mockups\n• Collaborate with developers to ensure design implementation"
        },
        {
          id: "2",
          company: "Tech Company",
          position: "UX Designer",
          startDate: "2018-01",
          endDate: "2020-07",
          current: false,
          description: "• Redesigned mobile app resulting in 45% increase in user engagement\n• Created and maintained design system used across product teams\n• Facilitated design workshops with stakeholders"
        }
      ],
      education: [
        {
          id: "1",
          school: "Rhode Island School of Design",
          degree: "Bachelor of Fine Arts",
          field: "Graphic Design",
          startDate: "2014-09",
          endDate: "2018-05"
        }
      ],
      skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Design Systems", "HTML/CSS"],
      sections: [
        {
          id: "1",
          title: "Awards",
          content: "Awwwards - Site of the Day (2023)\nRed Dot Design Award - UX Category (2022)"
        }
      ]
    },
    executive: {
      personalInfo: {
        fullName: "Michael Thompson",
        email: "michael.thompson@email.com",
        phone: "+1 (555) 345-6789",
        location: "Chicago, IL",
        title: "Chief Technology Officer",
        summary: "Visionary technology executive with 15+ years leading digital transformation initiatives. Proven track record of building high-performing engineering teams and delivering innovative solutions that drive business growth and competitive advantage."
      },
      experience: [
        {
          id: "1",
          company: "Global Tech Corp",
          position: "Chief Technology Officer",
          startDate: "2019-01",
          endDate: "",
          current: true,
          description: "• Lead technology strategy and innovation for organization with 2,000+ employees\n• Built engineering team from 50 to 200+ across multiple locations\n• Spearheaded cloud migration initiative saving $5M annually\n• Drive product roadmap and architecture decisions for flagship products"
        },
        {
          id: "2",
          company: "Enterprise Solutions Inc",
          position: "VP of Engineering",
          startDate: "2015-03",
          endDate: "2018-12",
          current: false,
          description: "• Managed 80+ person engineering organization across 6 product teams\n• Established technical standards and best practices company-wide\n• Led successful IPO preparation and technical due diligence\n• Reduced infrastructure costs by 40% through strategic optimization"
        }
      ],
      education: [
        {
          id: "1",
          school: "MIT",
          degree: "Master of Science",
          field: "Computer Science",
          startDate: "2006-09",
          endDate: "2008-05"
        },
        {
          id: "2",
          school: "University of Illinois",
          degree: "Bachelor of Science",
          field: "Computer Engineering",
          startDate: "2002-09",
          endDate: "2006-05"
        }
      ],
      skills: ["Strategic Planning", "Technology Leadership", "Cloud Architecture", "Team Building", "Product Strategy", "Vendor Management", "Board Presentations", "P&L Management"],
      sections: [
        {
          id: "1",
          title: "Board Positions",
          content: "Board Member - Tech Industry Association (2021-Present)\nAdvisor - Multiple Early-Stage Startups"
        }
      ]
    },
    frontend: {
      personalInfo: {
        fullName: "Jordan Martinez",
        email: "jordan.martinez@email.com",
        phone: "+1 (555) 456-7890",
        location: "Seattle, WA",
        title: "Frontend Developer",
        summary: "Creative and detail-oriented frontend developer with 4+ years of experience building beautiful, responsive web applications. Passionate about user experience, modern JavaScript frameworks, and clean code. Thrive in collaborative environments and love bringing designs to life."
      },
      experience: [
        {
          id: "1",
          company: "Innovative Web Solutions",
          position: "Senior Frontend Developer",
          startDate: "2022-06",
          endDate: "",
          current: true,
          description: "• Developed and maintained high-performance React applications serving 500K+ monthly users\n• Collaborated with UX designers to implement pixel-perfect, responsive interfaces\n• Optimized web vitals resulting in 40% faster load times and improved SEO rankings\n• Mentored junior developers and conducted code reviews\n• Integrated REST and GraphQL APIs with modern state management solutions"
        },
        {
          id: "2",
          company: "Creative Digital Agency",
          position: "Frontend Developer",
          startDate: "2020-08",
          endDate: "2022-05",
          current: false,
          description: "• Built interactive web experiences for clients across various industries\n• Implemented animations and transitions using CSS3 and JavaScript libraries\n• Worked in Agile environment with daily standups and bi-weekly sprints\n• Ensured cross-browser compatibility and mobile responsiveness\n• Contributed to component library used across multiple projects"
        }
      ],
      education: [
        {
          id: "1",
          school: "University of Washington",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2016-09",
          endDate: "2020-05"
        }
      ],
      skills: ["React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3/Sass", "Tailwind CSS", "Vue.js", "Next.js", "Redux", "Git", "Webpack", "Responsive Design", "REST APIs", "GraphQL"],
      sections: [
        {
          id: "1",
          title: "Projects",
          content: "Portfolio Website - Built personal portfolio with React and Framer Motion showcasing interactive animations\nWeather Dashboard - Created real-time weather app using React, TypeScript, and OpenWeather API\nOpen Source - Contributor to popular UI component libraries with 200+ GitHub stars"
        }
      ]
    },
    fullstack: {
      personalInfo: {
        fullName: "David Anderson",
        email: "david.anderson@email.com",
        phone: "+1 (555) 789-0123",
        location: "Austin, TX",
        title: "Full Stack Engineer",
        summary: "Versatile full stack engineer with 6+ years of experience building end-to-end web applications. Expert in both frontend and backend technologies, cloud infrastructure, and database design. Passionate about creating scalable solutions and optimizing performance across the entire stack."
      },
      experience: [
        {
          id: "1",
          company: "Cloud Tech Solutions",
          position: "Senior Full Stack Engineer",
          startDate: "2021-09",
          endDate: "",
          current: true,
          description: "• Architected and deployed microservices-based applications using Node.js, React, and PostgreSQL\n• Built RESTful APIs and GraphQL endpoints serving 2M+ requests daily\n• Implemented CI/CD pipelines with Docker and Kubernetes, reducing deployment time by 70%\n• Led team of 4 developers in agile sprint planning and code reviews\n• Optimized database queries resulting in 50% reduction in response times"
        },
        {
          id: "2",
          company: "StartupHub Inc",
          position: "Full Stack Developer",
          startDate: "2018-06",
          endDate: "2021-08",
          current: false,
          description: "• Developed full stack web applications using React, Express.js, and MongoDB\n• Created real-time features using WebSocket and Socket.io\n• Integrated third-party APIs including Stripe, SendGrid, and AWS S3\n• Implemented authentication and authorization using JWT and OAuth 2.0\n• Collaborated with designers to create responsive, mobile-first interfaces"
        }
      ],
      education: [
        {
          id: "1",
          school: "University of Texas at Austin",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2014-09",
          endDate: "2018-05"
        }
      ],
      skills: ["JavaScript/TypeScript", "React/Next.js", "Node.js/Express", "Python/Django", "PostgreSQL/MongoDB", "Docker/Kubernetes", "AWS/Azure", "GraphQL/REST API", "Redis/RabbitMQ", "Git/CI-CD", "Microservices", "Testing (Jest/Cypress)"],
      sections: [
        {
          id: "1",
          title: "Projects & Achievements",
          content: "E-Commerce Platform - Built scalable marketplace handling 100K+ daily transactions\nReal-time Chat Application - Developed WebSocket-based chat with 10K concurrent users\nAWS Certified Solutions Architect - Associate Level\nContributed to open-source projects with 1K+ GitHub stars"
        }
      ]
    }
  };

  return templates[templateId] || templates.professional;
};

const Editor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState<ResumeData>(() => getTemplateDefaults(templateId || "professional"));
  const [themeColor, setThemeColor] = useState<string>(() => {
    const saved = localStorage.getItem(`theme-${templateId}`);
    return saved || "#7c3aed"; // default purple
  });

  // Register fonts for PDF generation
  useEffect(() => {
    registerPDFFonts();
  }, []);

  // Load from local storage on mount
  useEffect(() => {
    if (templateId) {
      const savedData = localStorage.getItem(`resume-${templateId}`);
      if (savedData) {
        try {
          setResumeData(JSON.parse(savedData));
          toast.success("Previous resume data loaded");
        } catch (error) {
          console.error("Error loading resume data:", error);
          setResumeData(getTemplateDefaults(templateId));
        }
      } else {
        // Set template defaults if no saved data
        setResumeData(getTemplateDefaults(templateId));
      }
    }
  }, [templateId]);

  // Save to local storage whenever data changes
  useEffect(() => {
    if (templateId && resumeData.personalInfo.fullName) {
      localStorage.setItem(`resume-${templateId}`, JSON.stringify(resumeData));
    }
  }, [resumeData, templateId]);

  // Save theme color to local storage
  useEffect(() => {
    if (templateId) {
      localStorage.setItem(`theme-${templateId}`, themeColor);
    }
  }, [themeColor, templateId]);

  const handleDownload = async () => {
    try {
      // Select the appropriate PDF template
      const pdfTemplates = {
        professional: ProfessionalPDF,
        modern: ModernPDF,
        minimal: MinimalPDF,
        executive: ExecutivePDF,
        frontend: FrontendPDF,
        fullstack: FullstackPDF,
      };

      const PDFTemplate = pdfTemplates[templateId as keyof typeof pdfTemplates] || ProfessionalPDF;

      // Generate PDF blob
      const blob = await pdf(<PDFTemplate resumeData={resumeData} themeColor={themeColor} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
      link.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
      
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download resume");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Editor Toolbar */}
      <div className="border-b border-border/50 bg-card shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              Template: <span className="font-semibold text-foreground">{templateId}</span>
            </span>
            
            <Button
              onClick={handleDownload}
              className="gap-2 bg-primary hover:bg-primary-hover"
              size="sm"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[35%,65%] gap-8 max-w-8xl mx-auto">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Edit Your Resume</h2>
              <p className="text-muted-foreground">
                Fill in your information and watch your resume update in real-time
              </p>
            </div>
            <ResumeForm 
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Live Preview</h2>
                
                {/* Color Theme Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Theme:</span>
                  <div className="flex gap-2">
                    {[
                      { name: "Purple", color: "#7c3aed" },
                      { name: "Blue", color: "#2563eb" },
                      { name: "Emerald", color: "#059669" },
                      { name: "Rose", color: "#e11d48" },
                      { name: "Orange", color: "#ea580c" },
                      { name: "Teal", color: "#0d9488" },
                    ].map((theme) => (
                      <button
                        key={theme.color}
                        onClick={() => setThemeColor(theme.color)}
                        className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${
                          themeColor === theme.color ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: theme.color }}
                        title={theme.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-2 border-border rounded-xl overflow-hidden shadow-premium bg-white">
                <ResumePreview 
                  resumeData={resumeData}
                  templateId={templateId || "professional"}
                  themeColor={themeColor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
