export interface TemplateMeta {
  name: string;
  description: string;
  category: string;
  categorySlug: string;
}

export const templateMetaMap: Record<string, TemplateMeta> = {
  professional: {
    name: "Classic Professional",
    description:
      "Traditional single-column layout optimized for corporate roles.",
    category: "Corporate",
    categorySlug: "all",
  },
  modern: {
    name: "Contemporary",
    description:
      "Contemporary two-column design for creative and product teams.",
    category: "Creative",
    categorySlug: "all",
  },
  minimal: {
    name: "Elegant Minimal",
    description: "Sophisticated whitespace-focused template for easy scanning.",
    category: "Universal",
    categorySlug: "all",
  },
  executive: {
    name: "Executive Leadership",
    description: "Bold leadership-focused layout for senior candidates.",
    category: "Leadership",
    categorySlug: "all",
  },
  frontend: {
    name: "Technical Grid",
    description:
      "Balanced UI-focused resume with skill grids and project highlights.",
    category: "Engineering",
    categorySlug: "software",
  },
  fullstack: {
    name: "Comprehensive Pro",
    description:
      "Complete coverage with plenty of space for technical impact.",
    category: "Engineering",
    categorySlug: "software",
  },
  backend: {
    name: "Systems Focus",
    description:
      "API-centric template emphasizing scalability and system design.",
    category: "Engineering",
    categorySlug: "software",
  },
  software: {
    name: "Impact Metrics",
    description:
      "Bold two-column layout with impact metrics, achievements, and career highlights.",
    category: "Engineering",
    categorySlug: "software",
  },
  graduate: {
    name: "Fresh Graduate",
    description:
      "Education-forward layout highlighting projects and internships.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  starter: {
    name: "Career Starter",
    description:
      "Entry-level friendly template with skills and achievements spotlight.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  fresher: {
    name: "Modern Entry",
    description:
      "ATS-optimized premium template with elegant design for fresh graduates and entry-level professionals.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "premium-fresher": {
    name: "Graduate Plus",
    description:
      "Modern premium template with gradient design, skill levels, and ATS-friendly layout for fresh graduates.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  senior: {
    name: "Achievement Driven",
    description: "Achievement-driven layout tailored for senior professionals.",
    category: "Engineering",
    categorySlug: "software",
  },
  "senior-frontend": {
    name: "Vibrant Professional",
    description: "Vibrant two-column experience with data-driven highlights.",
    category: "Design & Engineering",
    categorySlug: "software",
  },
  "senior-backend": {
    name: "Architecture Pro",
    description:
      "Robust template highlighting scalable architecture, reliability, and leadership impact.",
    category: "Engineering",
    categorySlug: "software",
  },
  "premium-universal": {
    name: "Universal Pro",
    description:
      "Elegant and simple ATS-friendly template suitable for all industries and experience levels.",
    category: "Universal",
    categorySlug: "all",
  },
  "premium-pro": {
    name: "Accent Panel",
    description:
      "Modern premium design with side accent panel and sophisticated typography for all professions.",
    category: "Universal",
    categorySlug: "all",
  },
  "fresher-elite": {
    name: "Elite Entry",
    description:
      "Modern premium design with colored header and timeline layout, perfect for fresh graduates.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  analyst: {
    name: "Corporate Blue",
    description:
      "Clean blue-themed design with photo, ideal for corporate professionals.",
    category: "Corporate",
    categorySlug: "all",
  },
  elite: {
    name: "Elite Professional",
    description:
      "Premium elegant template with left accent bar and sophisticated typography for all professions.",
    category: "Universal",
    categorySlug: "all",
  },
  "corporate-executive": {
    name: "Corporate Executive",
    description:
      "Premium ATS-friendly template with sophisticated layout and elegant typography for senior professionals.",
    category: "Corporate",
    categorySlug: "all",
  },
  refined: {
    name: "Refined Elegance",
    description:
      "Beautiful minimalist design with exceptional typography, timeline accents, and sophisticated spacing for all professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "premium-elite": {
    name: "Premium Elite",
    description:
      "Stunning gradient header design with modern typography, timeline elements, and visual hierarchy for all professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "sapphire-executive": {
    name: "Sapphire Executive",
    description:
      "Elegant professional template with diagonal accent, timeline experience markers, and sophisticated typography for executives.",
    category: "Leadership",
    categorySlug: "all",
  },
  "creative-accent": {
    name: "Creative Accent",
    description:
      "Modern sidebar template with gradient accent panel, skill bars, and creative two-column layout for all professionals.",
    category: "Creative",
    categorySlug: "all",
  },
  "modern-sidebar": {
    name: "Modern Sidebar",
    description:
      "Contemporary template with left sidebar, clean grid layout, and modern design perfect for all industries.",
    category: "Universal",
    categorySlug: "all",
  },
  "minimalist-geometric": {
    name: "Minimalist Geometric",
    description:
      "Clean minimalist design with geometric accents, light typography, and exceptional white space for modern professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "bold-headline": {
    name: "Bold Headline",
    description:
      "Powerful dark header template with bold typography, strong visual hierarchy, and impactful design for all roles.",
    category: "Universal",
    categorySlug: "all",
  },
  "dual-tone": {
    name: "Dual Tone",
    description:
      "Modern two-tone template with accent sidebar, card-style skills, and clean sectioning for contemporary professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "elegant-serif": {
    name: "Elegant Serif",
    description:
      "Sophisticated serif typography template with ornamental dividers, centered layout, and classic elegance for all fields.",
    category: "Universal",
    categorySlug: "all",
  },
  "tech-grid": {
    name: "Tech Grid",
    description:
      "Technical template with gradient header, 3-column skill grid, and card-style layout for technology professionals.",
    category: "Engineering",
    categorySlug: "software",
  },
  "contemporary-split": {
    name: "Contemporary Split",
    description:
      "Bold 50/50 split design with dark sidebar, high contrast layout, and modern aesthetic for all professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "luxury-timeline": {
    name: "Luxury Timeline",
    description:
      "Premium template with golden timeline, elegant typography, ample white space, and luxury feel for senior professionals.",
    category: "Leadership",
    categorySlug: "all",
  },
  "fresher-minimal-grid": {
    name: "Minimal Grid",
    description:
      "Clean 3-column grid layout with side border accent, perfect for showcasing education, skills, and early experience systematically.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-dark-professional": {
    name: "Dark Professional",
    description:
      "Modern template with dark gradient header, white skills badges, and side accent bars for a sophisticated fresh graduate look.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-color-accent": {
    name: "Color Accent Sidebar",
    description:
      "Eye-catching colored sidebar with profile photo, contact info, and skills, paired with clean white content area.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-timeline": {
    name: "Timeline Journey",
    description:
      "Vertical timeline design with connecting lines and timeline dots showing your educational and professional journey chronologically.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-skills-first": {
    name: "Skills Showcase",
    description:
      "Skills-prominent layout with large skill cards at the top, ideal for freshers with strong technical capabilities.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-card-based": {
    name: "Card Design",
    description:
      "Modern card-based layout with shadow effects and gray background, creating depth and visual hierarchy for all sections.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-two-tone": {
    name: "Two-Tone Split",
    description:
      "Bold 50/50 split design with colored left half featuring white text and clean white right content area.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-centered-elegant": {
    name: "Centered Elegance",
    description:
      "Sophisticated center-aligned layout with elegant typography, decorative line elements, and refined styling.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-geometric": {
    name: "Geometric Shapes",
    description:
      "Creative template with geometric accent shapes (hexagons, circles) as decorative elements throughout the design.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-achievement": {
    name: "Achievement Focus",
    description:
      "Achievement-focused layout with highlighted sections and award icons, perfect for emphasizing accomplishments and metrics.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-modern-two-column": {
    name: "Modern Two-Column",
    description:
      "Contemporary two-column design with clean sections and modern typography, ideal for showcasing skills and education side-by-side.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-professional-sidebar": {
    name: "Professional Sidebar",
    description:
      "Professional layout with left sidebar for contact and skills, providing a clean, organized structure for fresh graduates.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-clean-modern": {
    name: "Clean Modern",
    description:
      "Minimalist modern design with exceptional readability and clean spacing, perfect for entry-level professionals.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-tech-split": {
    name: "Tech Split",
    description:
      "Technical split-layout design optimized for tech freshers with emphasis on skills and projects.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-executive-style": {
    name: "Executive Style",
    description:
      "Sophisticated executive-inspired design for ambitious fresh graduates targeting leadership programs.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-bold-header": {
    name: "Bold Header",
    description:
      "Eye-catching bold header design with strong visual impact and clear section hierarchy for fresh talent.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-minimalist-two-column": {
    name: "Minimalist Two-Column",
    description:
      "Ultra-clean two-column minimalist layout emphasizing content clarity and professional simplicity.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-creative-edge": {
    name: "Creative Edge",
    description:
      "Creative design with unique visual elements while maintaining professional standards for innovative freshers.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-professional-grid": {
    name: "Professional Grid",
    description:
      "Grid-based professional layout providing organized structure for education, skills, and early experience.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-modern-classic": {
    name: "Modern Classic",
    description:
      "Perfect blend of modern aesthetics and classic professionalism for versatile entry-level applications.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-split-layout": {
    name: "Split Layout",
    description:
      "Distinctive split-screen design creating visual interest while maintaining ATS compatibility for freshers.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-compact-pro": {
    name: "Compact Professional",
    description:
      "Space-efficient professional design maximizing content density while maintaining readability for graduates.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-elegant-sidebar": {
    name: "Elegant Sidebar",
    description:
      "Elegant sidebar template with refined typography and sophisticated layout for polished fresh graduates.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-tech-modern": {
    name: "Tech Modern",
    description:
      "Modern technical design with tech-forward styling perfect for engineering and IT fresh graduates.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-professional-minimal": {
    name: "Professional Minimal",
    description:
      "Clean professional minimalist approach with focus on content over decoration for entry-level roles.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  // Healthcare & Medical Templates
  "medical-professional": {
    name: "Medical Professional",
    description:
      "Clean professional layout with prominent certifications section and patient care metrics for healthcare professionals.",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "healthcare-two-column": {
    name: "Healthcare Two-Column",
    description:
      "Modern two-column design optimized for healthcare workers with licenses and clinical experience sections.",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "nurse-specialist": {
    name: "Nurse Specialist",
    description:
      "Focused template for nursing and clinical roles emphasizing certifications, licenses, and patient outcomes.",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "medical-executive": {
    name: "Medical Executive",
    description:
      "Executive-level design for healthcare administrators with leadership achievements and organizational metrics.",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "clinical-minimal": {
    name: "Clinical Minimal",
    description:
      "Minimal clean design for clinical staff with emphasis on credentials and clinical competencies.",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  // Education & Teaching Templates
  "teacher-professional": {
    name: "Teacher Professional",
    description:
      "Traditional teacher resume with education credentials prominent and student achievement metrics.",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "academic-scholar": {
    name: "Academic Scholar",
    description:
      "Scholarly template for professors and researchers with publications, research, and academic achievements.",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "educator-modern": {
    name: "Educator Modern",
    description:
      "Modern design for educators with teaching certifications and classroom management accomplishments.",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "teaching-certified": {
    name: "Teaching Certified",
    description:
      "Certification-focused template highlighting teaching credentials, licenses, and professional development.",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "student-educator": {
    name: "Student Educator",
    description:
      "For student teachers and new educators with field experience and practicum highlights.",
    category: "Education",
    categorySlug: "education-teaching",
  },
  // Finance & Accounting Templates
  "cpa-professional": {
    name: "CPA Professional",
    description:
      "CPA-focused template with professional certifications prominent and quantifiable financial achievements.",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "finance-analyst": {
    name: "Finance Analyst",
    description:
      "Clean layout for financial analysts emphasizing analytical skills, financial modeling, and data-driven results.",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "accounting-executive": {
    name: "Accounting Executive",
    description:
      "Executive template for senior accounting roles with leadership achievements and financial oversight.",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "auditor": {
    name: "Auditor Professional",
    description:
      "Focused on audit experience with compliance achievements and risk management expertise.",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "finance-two-column": {
    name: "Finance Two-Column",
    description:
      "Two-column finance layout with skills sidebar and detailed experience section for financial professionals.",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  // Sales & Marketing Templates
  "sales-executive": {
    name: "Sales Executive",
    description:
      "Results-driven sales resume emphasizing revenue generated, quota achievement, and client acquisition.",
    category: "Sales",
    categorySlug: "sales-marketing",
  },
  "marketing-professional": {
    name: "Marketing Professional",
    description:
      "Marketing-focused layout showcasing campaign results, brand growth, and digital marketing expertise.",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  "sales-marketing-hybrid": {
    name: "Sales & Marketing Hybrid",
    description:
      "Combined template for sales and marketing professionals with metrics-driven achievements.",
    category: "Sales & Marketing",
    categorySlug: "sales-marketing",
  },
  "digital-marketer": {
    name: "Digital Marketer",
    description:
      "Modern design for digital marketing roles highlighting SEO, PPC, social media, and analytics expertise.",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  "sales-manager": {
    name: "Sales Manager",
    description:
      "Management-focused sales template emphasizing team leadership, sales process optimization, and territory growth.",
    category: "Sales",
    categorySlug: "sales-marketing",
  },
  // Legal & Consulting Templates
  "attorney-professional": {
    name: "Attorney Professional",
    description:
      "Traditional professional format for attorneys with practice areas, case results, and legal expertise.",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  "legal-counsel": {
    name: "Legal Counsel",
    description:
      "For in-house counsel positions emphasizing corporate law, compliance, and risk management.",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  "consultant": {
    name: "Management Consultant",
    description:
      "Consulting resume format highlighting client projects, business impact, and industry expertise.",
    category: "Consulting",
    categorySlug: "legal-consulting",
  },
  "legal-executive": {
    name: "Legal Executive",
    description:
      "For legal executives and partners emphasizing firm leadership, client development, and legal strategy.",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  "paralegal": {
    name: "Paralegal Professional",
    description:
      "For paralegals and legal assistants with legal research, case management, and administrative expertise.",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  // Operations & Project Management Templates
  "project-manager-pmp": {
    name: "Project Manager PMP",
    description:
      "PMP-certified PM resume with certifications prominent, project metrics, and stakeholder management.",
    category: "Project Management",
    categorySlug: "operations-management",
  },
  "operations-manager": {
    name: "Operations Manager",
    description:
      "Operations management focus with process improvements, cost savings, and efficiency metrics.",
    category: "Operations",
    categorySlug: "operations-management",
  },
  "pm-executive": {
    name: "PM Executive",
    description:
      "Executive PM template for program managers with portfolio oversight and strategic initiative leadership.",
    category: "Project Management",
    categorySlug: "operations-management",
  },
  "agile-scrum": {
    name: "Agile Scrum Master",
    description:
      "For Agile/Scrum masters highlighting sprint management, team velocity, and agile transformation.",
    category: "Project Management",
    categorySlug: "operations-management",
  },
  "operations-two-column": {
    name: "Operations Two-Column",
    description:
      "Two-column operations layout with skills and certifications sidebar, process improvement highlights.",
    category: "Operations",
    categorySlug: "operations-management",
  },
  // New Software Development Templates
  "java-developer": {
    name: "Java Professional",
    description:
      "Enterprise Java template with Spring Boot focus, highlighting microservices and API development expertise.",
    category: "Engineering",
    categorySlug: "software",
  },
  "dotnet-developer": {
    name: ".NET Professional",
    description:
      "Microsoft-inspired clean design for .NET developers with ASP.NET Core and Azure cloud experience.",
    category: "Engineering",
    categorySlug: "software",
  },
  "devops-engineer": {
    name: "DevOps Specialist",
    description:
      "Tech-forward template for DevOps engineers emphasizing CI/CD, containerization, and cloud automation.",
    category: "Engineering",
    categorySlug: "software",
  },
  "cloud-architect": {
    name: "Cloud Solutions Architect",
    description:
      "Executive-level template for cloud architects highlighting multi-cloud expertise and infrastructure design.",
    category: "Engineering",
    categorySlug: "software",
  },
  "mobile-developer": {
    name: "Mobile Developer",
    description:
      "Modern mobile-focused template for iOS/Android developers with native and cross-platform experience.",
    category: "Engineering",
    categorySlug: "software",
  },
  "react-native-developer": {
    name: "React Native Developer",
    description:
      "Cross-platform mobile development template emphasizing React Native and JavaScript expertise.",
    category: "Engineering",
    categorySlug: "software",
  },
  "data-engineer": {
    name: "Data Engineer",
    description:
      "Data-driven template for engineers building ETL pipelines, data warehouses, and big data solutions.",
    category: "Engineering",
    categorySlug: "software",
  },
  "machine-learning-engineer": {
    name: "ML Engineer",
    description:
      "AI/ML focused template highlighting deep learning, model deployment, and MLOps expertise.",
    category: "Engineering",
    categorySlug: "software",
  },
  "qa-automation-engineer": {
    name: "QA Automation Engineer",
    description:
      "Test automation template emphasizing frameworks, CI/CD integration, and quality assurance expertise.",
    category: "Engineering",
    categorySlug: "software",
  },
  "security-engineer": {
    name: "Security Engineer",
    description:
      "Cybersecurity template for engineers specializing in penetration testing, SIEM, and compliance.",
    category: "Engineering",
    categorySlug: "software",
  },
  "python-developer": {
    name: "Python Developer",
    description:
      "Python-focused template for developers working with Django, Flask, FastAPI, and data processing.",
    category: "Engineering",
    categorySlug: "software",
  },
  "nodejs-developer": {
    name: "Node.js Developer",
    description:
      "Backend Node.js template emphasizing Express, NestJS, microservices, and event-driven architecture.",
    category: "Engineering",
    categorySlug: "software",
  },
  "react-developer": {
    name: "React Developer",
    description:
      "Frontend React template highlighting component architecture, TypeScript, and modern state management.",
    category: "Engineering",
    categorySlug: "software",
  },
  "go-developer": {
    name: "Go Developer",
    description:
      "Minimalist Go/Golang template for developers building high-performance systems and microservices.",
    category: "Engineering",
    categorySlug: "software",
  },
  "kubernetes-engineer": {
    name: "Kubernetes Engineer",
    description:
      "Container orchestration template for K8s specialists focusing on cloud-native and DevOps practices.",
    category: "Engineering",
    categorySlug: "software",
  },
  // Senior/Lead Software Engineering Templates
  "senior-java-developer": {
    name: "Senior Java Developer",
    description:
      "Executive-level Java template highlighting enterprise architecture, Spring ecosystem, and team leadership in large-scale systems.",
    category: "Engineering",
    categorySlug: "software",
  },
  "senior-dotnet-developer": {
    name: "Senior .NET Developer",
    description:
      "Leadership-focused .NET template emphasizing solution architecture, Azure cloud expertise, and mentorship in enterprise development.",
    category: "Engineering",
    categorySlug: "software",
  },
  "senior-devops-engineer": {
    name: "Senior DevOps Engineer",
    description:
      "Advanced DevOps template showcasing infrastructure automation, CI/CD pipelines, and platform engineering leadership.",
    category: "Engineering",
    categorySlug: "software",
  },
  "lead-backend-engineer": {
    name: "Lead Backend Engineer",
    description:
      "Technical leadership template for backend engineers emphasizing distributed systems, API design, and engineering team management.",
    category: "Engineering",
    categorySlug: "software",
  },
  "lead-frontend-engineer": {
    name: "Lead Frontend Engineer",
    description:
      "Frontend leadership template highlighting modern frameworks, design systems, performance optimization, and cross-functional collaboration.",
    category: "Engineering",
    categorySlug: "software",
  },
  "senior-fullstack-developer": {
    name: "Senior Full Stack Developer",
    description:
      "Comprehensive full-stack template emphasizing end-to-end architecture, technology stack mastery, and product development leadership.",
    category: "Engineering",
    categorySlug: "software",
  },
  "principal-software-engineer": {
    name: "Principal Software Engineer",
    description:
      "Staff-level template for principal engineers showcasing technical vision, architecture decisions, and organization-wide impact.",
    category: "Engineering",
    categorySlug: "software",
  },
  "staff-engineer": {
    name: "Staff Engineer",
    description:
      "IC leadership template highlighting technical strategy, cross-team influence, and high-impact projects for staff-level engineers.",
    category: "Engineering",
    categorySlug: "software",
  },
  "engineering-manager": {
    name: "Engineering Manager",
    description:
      "Engineering management template emphasizing people leadership, technical direction, team growth, and delivery excellence.",
    category: "Engineering",
    categorySlug: "software",
  },
  "solutions-architect": {
    name: "Solutions Architect",
    description:
      "Enterprise solutions template for architects designing complex systems, client-facing solutions, and technical consulting.",
    category: "Engineering",
    categorySlug: "software",
  },
  "senior-mobile-engineer": {
    name: "Senior Mobile Engineer",
    description:
      "Mobile leadership template showcasing iOS/Android expertise, app architecture, performance optimization, and mobile platform strategy.",
    category: "Engineering",
    categorySlug: "software",
  },
  "platform-engineer": {
    name: "Platform Engineer",
    description:
      "Platform engineering template highlighting developer experience, infrastructure platforms, and internal tooling leadership.",
    category: "Engineering",
    categorySlug: "software",
  },
  "site-reliability-engineer": {
    name: "Site Reliability Engineer",
    description:
      "SRE template emphasizing system reliability, incident management, monitoring, and production operations at scale.",
    category: "Engineering",
    categorySlug: "software",
  },
  "backend-api-specialist": {
    name: "Backend API Specialist",
    description:
      "API-focused template highlighting RESTful/GraphQL design, microservices architecture, and backend systems expertise.",
    category: "Engineering",
    categorySlug: "software",
  },
  "frontend-architect": {
    name: "Frontend Architect",
    description:
      "Frontend architecture template showcasing component libraries, performance engineering, build tooling, and frontend strategy.",
    category: "Engineering",
    categorySlug: "software",
  },
  // New Universal Professional Templates
  "executive-modern": {
    name: "Executive Modern",
    description:
      "Clean modern executive design with two-column layout and professional timeline for experience.",
    category: "Universal",
    categorySlug: "all",
  },
  "corporate-blue": {
    name: "Corporate Blue",
    description:
      "Classic corporate style with blue accents and emphasis on achievements and metrics.",
    category: "Universal",
    categorySlug: "all",
  },
  "professional-sidebar": {
    name: "Professional Sidebar",
    description:
      "Modern two-column design with left sidebar for skills and contact information.",
    category: "Universal",
    categorySlug: "all",
  },
  "minimalist-pro": {
    name: "Minimalist Pro",
    description:
      "Ultra-clean minimal design with lots of white space and subtle professional accents.",
    category: "Universal",
    categorySlug: "all",
  },
  "classic-elegant": {
    name: "Classic Elegant",
    description:
      "Timeless elegant design with serif-inspired headers and classic professional layout.",
    category: "Universal",
    categorySlug: "all",
  },
  "business-modern": {
    name: "Business Modern",
    description:
      "Contemporary business style with grid-based skill display and modern typography.",
    category: "Universal",
    categorySlug: "all",
  },
  "professional-timeline": {
    name: "Professional Timeline",
    description:
      "Timeline-based experience section with vertical line connecting positions.",
    category: "Universal",
    categorySlug: "all",
  },
  "clean-corporate": {
    name: "Clean Corporate",
    description:
      "Clean lines and structure with corporate professional styling and organized sections.",
    category: "Universal",
    categorySlug: "all",
  },
  "modern-professional": {
    name: "Modern Professional",
    description:
      "Modern design with accent colors, card-style sections, and contemporary layout.",
    category: "Universal",
    categorySlug: "all",
  },
  "elegant-professional": {
    name: "Elegant Professional",
    description:
      "Sophisticated elegant design with refined typography and premium professional look.",
    category: "Universal",
    categorySlug: "all",
  },
  "professional-grid": {
    name: "Professional Grid",
    description:
      "Grid-based layout with organized sections and modern structured design.",
    category: "Universal",
    categorySlug: "all",
  },
  "business-elite": {
    name: "Business Elite",
    description:
      "High-end professional design with premium styling and executive presence.",
    category: "Universal",
    categorySlug: "all",
  },
  "corporate-clean": {
    name: "Corporate Clean",
    description:
      "Clean corporate aesthetic with professional hierarchy and structured layout.",
    category: "Universal",
    categorySlug: "all",
  },
  "professional-classic": {
    name: "Professional Classic",
    description:
      "Classic timeless design with traditional professional layout and ATS-friendly structure.",
    category: "Universal",
    categorySlug: "all",
  },
  "modern-business": {
    name: "Modern Business",
    description:
      "Modern business styling with fresh contemporary design and professional polish.",
    category: "Universal",
    categorySlug: "all",
  },

  // New Universal Templates
  "sidebar-accent": {
    name: "Sidebar Accent",
    description:
      "Professional left sidebar layout with bold accent colors and organized information hierarchy.",
    category: "Universal",
    categorySlug: "all",
  },
  "geometric-modern": {
    name: "Geometric Modern",
    description:
      "Contemporary design featuring geometric shapes and clean lines for a modern professional look.",
    category: "Universal",
    categorySlug: "all",
  },
  "two-tone-classic": {
    name: "Two-Tone Classic",
    description:
      "Elegant two-tone color scheme with classic typography and sophisticated styling.",
    category: "Universal",
    categorySlug: "all",
  },
  "bordered-elegance": {
    name: "Bordered Elegance",
    description:
      "Refined design with decorative borders and elegant details for distinguished professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "column-divide": {
    name: "Column Divide",
    description:
      "Balanced 50/50 column layout with clear vertical separator and organized content sections.",
    category: "Universal",
    categorySlug: "all",
  },
  "compact-professional": {
    name: "Compact Professional",
    description:
      "Space-efficient professional design that maximizes content while maintaining readability.",
    category: "Universal",
    categorySlug: "all",
  },

  // New Software Engineering Templates
  "code-minimal": {
    name: "Code Minimal",
    description:
      "Minimal tech-focused design with monospace accents perfect for software developers.",
    category: "Engineering",
    categorySlug: "software",
  },
  "tech-stack-pro": {
    name: "Tech Stack Pro",
    description:
      "Showcase your technology stack prominently with organized skill categorization.",
    category: "Engineering",
    categorySlug: "software",
  },
  "github-style": {
    name: "GitHub Style",
    description:
      "GitHub-inspired clean design familiar to developers with contribution-focused layout.",
    category: "Engineering",
    categorySlug: "software",
  },
  "developer-grid": {
    name: "Developer Grid",
    description:
      "Grid-based layout optimized for showcasing projects and technical skills effectively.",
    category: "Engineering",
    categorySlug: "software",
  },
  "terminal-theme": {
    name: "Terminal Theme",
    description:
      "Terminal/CLI inspired design with dark accents appealing to command-line enthusiasts.",
    category: "Engineering",
    categorySlug: "software",
  },
  "algo-engineer": {
    name: "Algo Engineer",
    description:
      "Algorithm and problem-solving focused layout ideal for competitive programmers.",
    category: "Engineering",
    categorySlug: "software",
  },
  "fullstack-modern": {
    name: "Full-Stack Modern",
    description:
      "Modern template designed for full-stack developers showcasing both frontend and backend skills.",
    category: "Engineering",
    categorySlug: "software",
  },
  "devops-pro": {
    name: "DevOps Pro",
    description:
      "DevOps and SRE specialized template emphasizing automation and reliability engineering.",
    category: "Engineering",
    categorySlug: "software",
  },
  "ml-engineer": {
    name: "ML Engineer",
    description:
      "Machine Learning engineer focused template with data science and AI project highlights.",
    category: "Engineering",
    categorySlug: "software",
  },

  // New Creative Templates
  "artistic-bold": {
    name: "Artistic Bold",
    description:
      "Bold artistic design with creative typography and unique visual elements for creatives.",
    category: "Creative",
    categorySlug: "all",
  },
  "designer-showcase": {
    name: "Designer Showcase",
    description:
      "Portfolio-style showcase layout perfect for designers displaying their creative work.",
    category: "Creative",
    categorySlug: "all",
  },
  "creative-timeline": {
    name: "Creative Timeline",
    description:
      "Visual timeline design with artistic elements and creative career progression display.",
    category: "Creative",
    categorySlug: "all",
  },
  "colorful-modern": {
    name: "Colorful Modern",
    description:
      "Vibrant colors and modern design elements for creative professionals who stand out.",
    category: "Creative",
    categorySlug: "all",
  },
  "asymmetric-creative": {
    name: "Asymmetric Creative",
    description:
      "Asymmetric layout with creative sections breaking traditional resume conventions.",
    category: "Creative",
    categorySlug: "all",
  },
  "code-craftsman": {
    name: "Code Craftsman",
    description: "Dark-themed code-style template with developer-focused design and terminal aesthetics.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "tech-pioneer": {
    name: "Tech Pioneer",
    description: "Modern tech template with innovative design for technology pioneers.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "dev-architecture": {
    name: "Dev Architecture",
    description: "Architectural layout emphasizing system design and development skills.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "software-master": {
    name: "Software Master",
    description: "Master-level software engineering template with comprehensive technical focus.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "tech-vanguard": {
    name: "Tech Vanguard",
    description: "Vanguard design for cutting-edge technology professionals.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "code-sphere": {
    name: "Code Sphere",
    description: "Circular design elements with coding focus and modern tech presentation.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "dev-elite": {
    name: "Dev Elite",
    description: "Elite developer template with premium design and technical excellence showcase.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "tech-horizon": {
    name: "Tech Horizon",
    description: "Horizon-oriented tech template for forward-thinking developers.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "software-craftsman": {
    name: "Software Craftsman",
    description: "Craftsmanship-focused template emphasizing quality software development.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "code-vision": {
    name: "Code Vision",
    description: "Vision-driven template for developers with forward-looking career goals.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "dev-prime": {
    name: "Dev Prime",
    description: "Prime developer template with premium features and modern tech design.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "tech-crafted": {
    name: "Tech Crafted",
    description: "Carefully crafted template for detail-oriented tech professionals.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "software-vision": {
    name: "Software Vision",
    description: "Vision-oriented software engineering template with elegant presentation.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "code-pinnacle": {
    name: "Code Pinnacle",
    description: "Peak achievement template for top-tier software developers.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "dev-momentum": {
    name: "Dev Momentum",
    description: "Dynamic momentum-driven template for progressive developers.",
    category: "Engineering",
    categorySlug: "software-technology",
  },
  "creative-canvas": {
    name: "Creative Canvas",
    description: "Artistic canvas-style template for creative professionals and designers.",
    category: "Creative & Design",
    categorySlug: "creative-design",
  },
  "design-maestro": {
    name: "Design Maestro",
    description: "Maestro-level design template for expert designers and creative leaders.",
    category: "Creative & Design",
    categorySlug: "creative-design",
  },
  "artistic-vision": {
    name: "Artistic Vision",
    description: "Vision-focused artistic template with creative expression emphasis.",
    category: "Creative & Design",
    categorySlug: "creative-design",
  },
  "creative-pulse": {
    name: "Creative Pulse",
    description: "Pulsating design elements for energetic creative professionals.",
    category: "Creative & Design",
    categorySlug: "creative-design",
  },
  "design-pinnacle": {
    name: "Design Pinnacle",
    description: "Peak design template showcasing excellence in creative work.",
    category: "Creative & Design",
    categorySlug: "creative-design",
  },
  "artistic-horizon": {
    name: "Artistic Horizon",
    description: "Horizon-oriented artistic layout for forward-thinking creatives.",
    category: "Creative & Design",
    categorySlug: "creative-design",
  },
  "creative-crafted": {
    name: "Creative Crafted",
    description: "Handcrafted design template emphasizing creative attention to detail.",
    category: "Creative & Design",
    categorySlug: "creative-design",
  },
  "design-sphere": {
    name: "Design Sphere",
    description: "Circular design elements perfect for modern designers.",
    category: "Creative & Design",
    categorySlug: "creative-design",
  },
  "artistic-momentum": {
    name: "Artistic Momentum",
    description: "Dynamic momentum-driven template for progressive artists.",
    category: "Creative & Design",
    categorySlug: "creative-design",
  },
  "creative-horizon": {
    name: "Creative Horizon",
    description: "Horizon-focused creative template with modern artistic elements.",
    category: "Creative & Design",
    categorySlug: "creative-design",
  },
  "graduate-momentum": {
    name: "Graduate Momentum",
    description: "Momentum-driven template for fresh graduates starting their career journey.",
    category: "Early Career",
    categorySlug: "fresh-graduates",
  },
  "entry-elite": {
    name: "Entry Elite",
    description: "Elite entry-level template with professional design for new graduates.",
    category: "Early Career",
    categorySlug: "fresh-graduates",
  },
  "freshers-vision": {
    name: "Freshers Vision",
    description: "Vision-oriented template helping freshers present their career aspirations.",
    category: "Early Career",
    categorySlug: "fresh-graduates",
  },
  "graduate-prime": {
    name: "Graduate Prime",
    description: "Prime template for graduates with premium design and modern layout.",
    category: "Early Career",
    categorySlug: "fresh-graduates",
  },
  "entry-horizon": {
    name: "Entry Horizon",
    description: "Horizon-focused entry-level template for career starters.",
    category: "Early Career",
    categorySlug: "fresh-graduates",
  },
  "freshers-crafted": {
    name: "Freshers Crafted",
    description: "Carefully crafted template for detail-oriented fresh graduates.",
    category: "Early Career",
    categorySlug: "fresh-graduates",
  },
  "graduate-zenith": {
    name: "Graduate Zenith",
    description: "Peak achievement template for top-performing fresh graduates.",
    category: "Early Career",
    categorySlug: "fresh-graduates",
  },
  "entry-sphere": {
    name: "Entry Sphere",
    description: "Circular design elements perfect for modern entry-level professionals.",
    category: "Early Career",
    categorySlug: "fresh-graduates",
  },
  // Missing Universal Professional Templates
  "timeline-elegance": {
    name: "Timeline Elegance",
    description: "Elegant timeline-based professional template with refined aesthetics.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "executive-minimal": {
    name: "Executive Minimal",
    description: "Minimalist executive template focusing on leadership achievements.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  // 2025 Universal Profile Templates - Batch 1
  "sidebar-professional-universal": {
    name: "Professional Sidebar",
    description: "Clean sidebar layout with professional structure for any industry.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "metro-modern-universal": {
    name: "Metro Modern",
    description: "Contemporary metro-inspired design with clean lines and modern typography.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "swiss-style-universal": {
    name: "Swiss Style",
    description: "Swiss design principles with grid-based layout and minimalist aesthetic.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "executive-letterhead-universal": {
    name: "Executive Letterhead",
    description: "Letterhead-inspired professional template with executive presence.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "diagonal-accent-universal": {
    name: "Diagonal Accent",
    description: "Dynamic diagonal accents adding visual interest to professional content.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "border-frame-universal": {
    name: "Border Frame",
    description: "Elegant border frame design creating a polished, contained look.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "centered-minimal-universal": {
    name: "Centered Minimal",
    description: "Center-aligned minimalist design for maximum readability.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "left-aligned-pro-universal": {
    name: "Left Aligned Pro",
    description: "Traditional left-aligned professional layout with modern touches.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "dual-column-modern-universal": {
    name: "Dual Column Modern",
    description: "Modern dual-column layout balancing content and visual appeal.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "timeline-vertical-universal": {
    name: "Vertical Timeline",
    description: "Vertical timeline showcasing career progression chronologically.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "badge-style-universal": {
    name: "Badge Style",
    description: "Badge and label elements highlighting key achievements.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "underline-accent-universal": {
    name: "Underline Accent",
    description: "Subtle underline accents emphasizing important sections.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "circle-icon-universal": {
    name: "Circle Icon",
    description: "Circular icons and elements adding visual rhythm to content.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "linear-progress-universal": {
    name: "Linear Progress",
    description: "Linear progress bars visualizing skills and competencies.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "card-layout-universal": {
    name: "Card Layout",
    description: "Card-based layout with modern sectioning and spacing.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "ribbon-header-universal": {
    name: "Ribbon Header",
    description: "Distinctive ribbon-style header creating strong first impression.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "boxed-sections-universal": {
    name: "Boxed Sections",
    description: "Boxed sections clearly delineating different content areas.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "left-border-universal": {
    name: "Left Border",
    description: "Left border accent providing visual structure and hierarchy.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "floating-header-universal": {
    name: "Floating Header",
    description: "Floating header design with modern spacing and elevation.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "monochrome-elegant-universal": {
    name: "Monochrome Elegant",
    description: "Monochromatic color scheme with elegant typography.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  // 2025 Universal Profile Templates - Batch 2
  "gradient-header-universal": {
    name: "Gradient Header",
    description: "Gradient header adding modern visual appeal to professional resume.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "split-pane-universal": {
    name: "Split Pane",
    description: "Split-pane layout dividing content into distinct visual zones.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "icon-bar-universal": {
    name: "Icon Bar",
    description: "Icon bar navigation making sections easily identifiable.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "modern-minimalist-universal": {
    name: "Modern Minimalist",
    description: "Contemporary minimalist approach to professional resume design.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "bold-typography-universal": {
    name: "Bold Typography",
    description: "Bold typographic choices creating strong visual hierarchy.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "geometric-shapes-universal": {
    name: "Geometric Shapes",
    description: "Geometric shape accents adding modern design elements.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "color-block-universal": {
    name: "Color Block",
    description: "Color block sections creating vibrant yet professional layout.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "thin-border-universal": {
    name: "Thin Border",
    description: "Thin border lines providing subtle structure and elegance.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "asymmetric-layout-universal": {
    name: "Asymmetric Layout",
    description: "Asymmetric layout breaking traditional resume conventions creatively.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "classic-serif-universal": {
    name: "Classic Serif",
    description: "Classic serif typography conveying traditional professionalism.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-compact-universal": {
    name: "Professional Compact",
    description: "Compact layout maximizing content without compromising readability.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "wide-margin-universal": {
    name: "Wide Margin",
    description: "Wide margins creating breathing room and elegant whitespace.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "top-bar-universal": {
    name: "Top Bar",
    description: "Top bar header with streamlined professional information.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "corner-accent-universal": {
    name: "Corner Accent",
    description: "Corner accent details adding subtle visual interest.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "striped-background-universal": {
    name: "Striped Background",
    description: "Striped background elements creating modern texture.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "circular-elements-universal": {
    name: "Circular Elements",
    description: "Circular design elements adding softness to professional layout.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "minimal-lines-universal": {
    name: "Minimal Lines",
    description: "Minimal line work creating clean, uncluttered design.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "bold-section-headers-universal": {
    name: "Bold Section Headers",
    description: "Bold section headers ensuring clear content organization.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "two-tone-split-universal": {
    name: "Two Tone Split",
    description: "Two-tone color split creating distinct visual areas.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "clean-modern-universal": {
    name: "Clean Modern",
    description: "Clean modern design suitable for all professional contexts.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  // 2025 Universal Profile Templates - Batch 3
  "watermark-style-universal": {
    name: "Watermark Style",
    description: "Watermark design elements adding subtle brand identity.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "magazine-layout-universal": {
    name: "Magazine Layout",
    description: "Magazine-inspired editorial layout for professional resumes.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "hexagonal-pattern-universal": {
    name: "Hexagonal Pattern",
    description: "Hexagonal pattern accents creating geometric visual interest.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "compact-elite-universal": {
    name: "Compact Elite",
    description: "Compact yet elite template with premium feel.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "diamond-accent-universal": {
    name: "Diamond Accent",
    description: "Diamond-shaped accents adding sophisticated details.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "zigzag-border-universal": {
    name: "Zigzag Border",
    description: "Zigzag border pattern creating unique visual signature.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "stacked-sections-universal": {
    name: "Stacked Sections",
    description: "Stacked section layout with clear vertical hierarchy.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "dotted-grid-universal": {
    name: "Dotted Grid",
    description: "Dotted grid pattern providing subtle structure.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "wave-pattern-universal": {
    name: "Wave Pattern",
    description: "Wave pattern elements adding fluid, organic feel.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "chevron-accent-universal": {
    name: "Chevron Accent",
    description: "Chevron accents directing attention through content.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "spotlight-header-universal": {
    name: "Spotlight Header",
    description: "Spotlight header drawing focus to key information.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "layered-cards-universal": {
    name: "Layered Cards",
    description: "Layered card design creating depth and dimension.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "angular-modern-universal": {
    name: "Angular Modern",
    description: "Angular design language with sharp, contemporary edges.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "rounded-corners-universal": {
    name: "Rounded Corners",
    description: "Rounded corners throughout creating approachable feel.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "retro-professional-universal": {
    name: "Retro Professional",
    description: "Retro-inspired design with timeless professional appeal.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "newspaper-style-universal": {
    name: "Newspaper Style",
    description: "Newspaper column layout for content-rich resumes.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "triangular-elements-universal": {
    name: "Triangular Elements",
    description: "Triangular design elements adding geometric sophistication.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "parallax-style-universal": {
    name: "Parallax Style",
    description: "Parallax-inspired layered depth in static format.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "vertical-timeline-universal": {
    name: "Vertical Timeline Pro",
    description: "Professional vertical timeline showcasing career journey.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "infinity-loop-universal": {
    name: "Infinity Loop",
    description: "Infinity loop design representing continuous growth.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  // 2025 Universal Professional Templates - Batch 5
  "executive-corner-accent": {
    name: "Executive Corner Accent",
    description: "Executive template with distinctive corner accent details.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "minimal-elegance-universal": {
    name: "Minimal Elegance",
    description: "Minimally elegant design with refined professional touches.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-divider": {
    name: "Professional Divider",
    description: "Strategic divider lines organizing content professionally.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "modern-corporate-grid": {
    name: "Modern Corporate Grid",
    description: "Grid-based corporate template with modern sensibility.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "business-sidebar-pro": {
    name: "Business Sidebar Pro",
    description: "Professional sidebar business template for all industries.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "clean-two-column-universal": {
    name: "Clean Two Column",
    description: "Clean two-column universal design with balanced layout.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-header-banner": {
    name: "Professional Header Banner",
    description: "Prominent header banner establishing professional presence.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "executive-timeline-modern": {
    name: "Executive Timeline Modern",
    description: "Modern executive timeline highlighting leadership progression.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "corporate-border-frame": {
    name: "Corporate Border Frame",
    description: "Corporate border frame design with polished appearance.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "minimalist-modern-pro": {
    name: "Minimalist Modern Pro",
    description: "Professional minimalist approach with modern execution.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-accent-bar": {
    name: "Professional Accent Bar",
    description: "Accent bar highlighting professional information elegantly.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "business-clean-layout": {
    name: "Business Clean Layout",
    description: "Clean business layout suitable for any professional field.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "executive-split-design": {
    name: "Executive Split Design",
    description: "Split design template emphasizing executive experience.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "modern-professional-box": {
    name: "Modern Professional Box",
    description: "Boxed sections with modern professional styling.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "corporate-minimalist-pro": {
    name: "Corporate Minimalist Pro",
    description: "Minimalist corporate template with professional clarity.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-vertical-line": {
    name: "Professional Vertical Line",
    description: "Vertical line accents organizing professional content.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "business-modern-grid": {
    name: "Business Modern Grid",
    description: "Modern grid system for organized business resumes.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "executive-clean-split": {
    name: "Executive Clean Split",
    description: "Clean split layout for executive-level professionals.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "minimal-corporate-pro": {
    name: "Minimal Corporate Pro",
    description: "Minimal yet corporate-ready professional template.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-modern-edge": {
    name: "Professional Modern Edge",
    description: "Modern edge design with professional sophistication.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  // 2025 Simple Universal Professional Templates - Batch 6
  "clean-professional-simple": {
    name: "Clean Professional Simple",
    description: "Simple, clean professional template with ATS optimization.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "simple-executive-layout": {
    name: "Simple Executive Layout",
    description: "Straightforward executive layout focusing on content.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "minimal-pro-layout": {
    name: "Minimal Pro Layout",
    description: "Minimally styled professional layout for easy customization.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-clean-simple": {
    name: "Professional Clean Simple",
    description: "Clean and simple professional design for all industries.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "corporate-simple-template": {
    name: "Corporate Simple Template",
    description: "Simple corporate template with no-frills approach.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "modern-simple-pro": {
    name: "Modern Simple Pro",
    description: "Modern simplicity with professional credibility.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "executive-simple-clean": {
    name: "Executive Simple Clean",
    description: "Clean executive template focusing on achievements.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "business-simple-modern": {
    name: "Business Simple Modern",
    description: "Modern business template with simple, effective design.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-easy-read": {
    name: "Professional Easy Read",
    description: "Easy-to-read professional format optimized for ATS.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "clean-corporate-simple": {
    name: "Clean Corporate Simple",
    description: "Simple corporate design with clean presentation.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "simple-modern-executive": {
    name: "Simple Modern Executive",
    description: "Modern executive template with simplified layout.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "minimalist-pro-simple": {
    name: "Minimalist Pro Simple",
    description: "Minimalist professional with simple structure.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-straightforward": {
    name: "Professional Straightforward",
    description: "Straightforward professional template for direct communication.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "executive-direct-layout": {
    name: "Executive Direct Layout",
    description: "Direct executive layout highlighting leadership clearly.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "business-clear-template": {
    name: "Business Clear Template",
    description: "Clear business template with excellent readability.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "simple-professional-clean": {
    name: "Simple Professional Clean",
    description: "Simple and clean professional approach for any role.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "corporate-easy-layout": {
    name: "Corporate Easy Layout",
    description: "Easy-to-use corporate layout for quick resume creation.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "modern-clear-pro": {
    name: "Modern Clear Pro",
    description: "Clear modern professional template with strong structure.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-plain-simple": {
    name: "Professional Plain Simple",
    description: "Plain and simple professional design emphasizing content.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "executive-plain-layout": {
    name: "Executive Plain Layout",
    description: "Plain executive layout letting achievements speak.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "simple-business-clean": {
    name: "Simple Business Clean",
    description: "Clean business template with simple, effective structure.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "minimal-direct-template": {
    name: "Minimal Direct Template",
    description: "Direct and minimal template for straightforward resumes.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-basic-modern": {
    name: "Professional Basic Modern",
    description: "Basic modern professional template with timeless appeal.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "clean-basic-executive": {
    name: "Clean Basic Executive",
    description: "Basic executive template with clean, professional appearance.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "simple-clear-business": {
    name: "Simple Clear Business",
    description: "Clear business template with simple organization.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "modern-plain-pro": {
    name: "Modern Plain Pro",
    description: "Plain modern professional without unnecessary decoration.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "executive-easy-template": {
    name: "Executive Easy Template",
    description: "Easy-to-customize executive template for leaders.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "professional-readable-layout": {
    name: "Professional Readable Layout",
    description: "Highly readable professional layout optimized for scanning.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "clean-readable-pro": {
    name: "Clean Readable Pro",
    description: "Clean and readable professional template for any career.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  "simple-structured-template": {
    name: "Simple Structured Template",
    description: "Simple yet well-structured professional template.",
    category: "Universal Professional",
    categorySlug: "universal-professional",
  },
  // 2025 New Templates (100 templates)
  "strategic-leadership": {
    name: "StrategicLeadership",
    description: "Executive leadership template with strategic focus and premium design",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "corporate-excellence": {
    name: "CorporateExcellence",
    description: "Corporate excellence template with professional two-column layout",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "executive-prestige": {
    name: "ExecutivePrestige",
    description: "Prestigious executive template with elegant serif typography",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "global-executive-pro": {
    name: "GlobalExecutivePro",
    description: "Global executive template with international appeal",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "premium-corporate-edge": {
    name: "PremiumCorporateEdge",
    description: "Premium corporate template with modern edge and sharp lines",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "enterprise-leader": {
    name: "EnterpriseLeader",
    description: "Enterprise leadership template with clean corporate design",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "boardroom-ready": {
    name: "BoardroomReady",
    description: "Boardroom-ready executive template with authoritative presence",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "c-suite-modern": {
    name: "CSuiteModern",
    description: "C-suite modern template with contemporary sophistication",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "executive-impact": {
    name: "ExecutiveImpact",
    description: "High-impact executive template with bold section headers",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "corporate-visionary": {
    name: "CorporateVisionary",
    description: "Visionary corporate template with forward-thinking design",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "platinum-executive": {
    name: "PlatinumExecutive",
    description: "Platinum-tier executive template with luxury feel",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "global-leadership": {
    name: "GlobalLeadership",
    description: "Global leadership template for international executives",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "senior-executive-pro": {
    name: "SeniorExecutivePro",
    description: "Senior executive professional template with gravitas",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "corporate-elite-plus": {
    name: "CorporateElitePlus",
    description: "Elite corporate template with premium styling",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "executive-pinnacle": {
    name: "ExecutivePinnacle",
    description: "Peak executive template for top-tier professionals",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "corporate-distinction": {
    name: "CorporateDistinction",
    description: "Distinguished corporate template with refined aesthetics",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "leadership-summit": {
    name: "LeadershipSummit",
    description: "Summit-level leadership template for executives",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "executive-authority": {
    name: "ExecutiveAuthority",
    description: "Authoritative executive template with commanding presence",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "corporate-premier": {
    name: "CorporatePremier",
    description: "Premier corporate template with first-class design",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "global-enterprise": {
    name: "GlobalEnterprise",
    description: "Global enterprise template for multinational leaders",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "executive-signature": {
    name: "ExecutiveSignature",
    description: "Signature executive template with unique branding",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "corporate-apex": {
    name: "CorporateApex",
    description: "Apex corporate template for peak professionals",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "strategic-executive-plus": {
    name: "StrategicExecutivePlus",
    description: "Enhanced strategic executive template",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "corporate-paradigm": {
    name: "CorporateParadigm",
    description: "Paradigm-shifting corporate template",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "executive-magnitude": {
    name: "ExecutiveMagnitude",
    description: "High-magnitude executive template",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "corporate-sovereign": {
    name: "CorporateSovereign",
    description: "Sovereign corporate template with regal design",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "leadership-zenith": {
    name: "LeadershipZenith",
    description: "Zenith leadership template for top executives",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "executive-nexus": {
    name: "ExecutiveNexus",
    description: "Nexus executive template connecting all achievements",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "corporate-vanguard": {
    name: "CorporateVanguard",
    description: "Vanguard corporate template leading the way",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "executive-ascendancy": {
    name: "ExecutiveAscendancy",
    description: "Ascendant executive template showing career growth",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "vue-specialist": {
    name: "VueSpecialist",
    description: "Vue.js specialist template with modern green theme",
    category: "Software",
    categorySlug: "software-technology",
  },
  "svelte-developer": {
    name: "SvelteDeveloper",
    description: "Svelte developer template with orange accent",
    category: "Software",
    categorySlug: "software-technology",
  },
  "flutter-engineer": {
    name: "FlutterEngineer",
    description: "Flutter engineer template with blue gradient",
    category: "Software",
    categorySlug: "software-technology",
  },
  "swift-ios-developer": {
    name: "SwiftIOSDeveloper",
    description: "Swift iOS developer template with Apple-inspired design",
    category: "Software",
    categorySlug: "software-technology",
  },
  "rust-systems-engineer": {
    name: "RustSystemsEngineer",
    description: "Rust systems engineer template with performance focus",
    category: "Software",
    categorySlug: "software-technology",
  },
  "scala-backend-engineer": {
    name: "ScalaBackendEngineer",
    description: "Scala backend engineer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "elixir-developer": {
    name: "ElixirDeveloper",
    description: "Elixir developer template with functional programming focus",
    category: "Software",
    categorySlug: "software-technology",
  },
  "graphql-architect": {
    name: "GraphQLArchitect",
    description: "GraphQL architect template with API-first design",
    category: "Software",
    categorySlug: "software-technology",
  },
  "typescript-expert": {
    name: "TypeScriptExpert",
    description: "TypeScript expert template with type-safe emphasis",
    category: "Software",
    categorySlug: "software-technology",
  },
  "nextjs-fullstack": {
    name: "NextJSFullstack",
    description: "Next.js fullstack developer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "nestjs-backend": {
    name: "NestJSBackend",
    description: "NestJS backend developer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "django-fullstack": {
    name: "DjangoFullstack",
    description: "Django fullstack developer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "spring-boot-developer": {
    name: "SpringBootDeveloper",
    description: "Spring Boot developer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "postgresql-dba": {
    name: "PostgreSQLDBA",
    description: "PostgreSQL database administrator template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "mongodb-specialist": {
    name: "MongoDBSpecialist",
    description: "MongoDB specialist template with NoSQL focus",
    category: "Software",
    categorySlug: "software-technology",
  },
  "redis-engineer": {
    name: "RedisEngineer",
    description: "Redis engineer template with caching expertise",
    category: "Software",
    categorySlug: "software-technology",
  },
  "elasticsearch-expert": {
    name: "ElasticsearchExpert",
    description: "Elasticsearch expert template with search focus",
    category: "Software",
    categorySlug: "software-technology",
  },
  "terraform-devops": {
    name: "TerraformDevOps",
    description: "Terraform DevOps template with IaC emphasis",
    category: "Software",
    categorySlug: "software-technology",
  },
  "ansible-automation": {
    name: "AnsibleAutomation",
    description: "Ansible automation engineer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "jenkins-cicd": {
    name: "JenkinsCICD",
    description: "Jenkins CI/CD specialist template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "kafka-streaming": {
    name: "KafkaStreaming",
    description: "Kafka streaming engineer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "rabbitmq-specialist": {
    name: "RabbitMQSpecialist",
    description: "RabbitMQ messaging specialist template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "grpc-developer": {
    name: "GRPCDeveloper",
    description: "gRPC developer template with microservices focus",
    category: "Software",
    categorySlug: "software-technology",
  },
  "webassembly-engineer": {
    name: "WebAssemblyEngineer",
    description: "WebAssembly engineer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "unity-game-developer": {
    name: "UnityGameDeveloper",
    description: "Unity game developer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "academic-achiever": {
    name: "AcademicAchiever",
    description: "Academic achiever template highlighting education excellence",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "graduate-innovator": {
    name: "GraduateInnovator",
    description: "Innovative graduate template with project showcase",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "campus-leader": {
    name: "CampusLeader",
    description: "Campus leadership template for student leaders",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "scholarship-graduate": {
    name: "ScholarshipGraduate",
    description: "Scholarship graduate template highlighting achievements",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "honors-student": {
    name: "HonorsStudent",
    description: "Honors student template with academic distinction",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "stem-graduate": {
    name: "STEMGraduate",
    description: "STEM graduate template with technical emphasis",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "internship-ready": {
    name: "InternshipReady",
    description: "Internship-ready template for entry-level seekers",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "research-graduate": {
    name: "ResearchGraduate",
    description: "Research-focused graduate template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "entrepreneurial-graduate": {
    name: "EntrepreneurialGraduate",
    description: "Entrepreneurial graduate template with startup experience",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "volunteer-leader": {
    name: "VolunteerLeader",
    description: "Volunteer leadership template for community-focused grads",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "coding-bootcamp-grad": {
    name: "CodingBootcampGrad",
    description: "Coding bootcamp graduate template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "liberal-arts-graduate": {
    name: "LiberalArtsGraduate",
    description: "Liberal arts graduate template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "business-graduate": {
    name: "BusinessGraduate",
    description: "Business school graduate template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "engineering-fresher": {
    name: "EngineeringFresher",
    description: "Engineering fresher template with technical projects",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "design-school-grad": {
    name: "DesignSchoolGrad",
    description: "Design school graduate template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "masters-graduate": {
    name: "MastersGraduate",
    description: "Master's degree graduate template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "phd-candidate": {
    name: "PhDCandidate",
    description: "PhD candidate template for doctoral graduates",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "student-athlete": {
    name: "StudentAthlete",
    description: "Student athlete template balancing sports and academics",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "study-abroad-graduate": {
    name: "StudyAbroadGraduate",
    description: "Study abroad graduate with international experience",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "dual-degree-graduate": {
    name: "DualDegreeGraduate",
    description: "Dual degree graduate template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "portfolio-artist": {
    name: "PortfolioArtist",
    description: "Portfolio-focused artist template with visual showcase",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "motion-designer": {
    name: "MotionDesigner",
    description: "Motion designer template with dynamic layouts",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "brand-strategist": {
    name: "BrandStrategist",
    description: "Brand strategist template with identity focus",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "content-creator": {
    name: "ContentCreator",
    description: "Content creator template for digital creators",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "illustrator-artist": {
    name: "IllustratorArtist",
    description: "Illustrator artist template with artwork showcase",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "video-producer": {
    name: "VideoProducer",
    description: "Video producer template with filmmaking focus",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "copywriter-creative": {
    name: "CopywriterCreative",
    description: "Creative copywriter template with writing samples",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "art-director-pro": {
    name: "ArtDirectorPro",
    description: "Professional art director template",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "photographer-pro": {
    name: "PhotographerPro",
    description: "Professional photographer template",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "typographer-specialist": {
    name: "TypographerSpecialist",
    description: "Typography specialist template with font showcase",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "digital-artist": {
    name: "DigitalArtist",
    description: "Digital artist template for digital creators",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "creative-director-elite": {
    name: "CreativeDirectorElite",
    description: "Elite creative director template",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "social-media-creative": {
    name: "SocialMediaCreative",
    description: "Social media creative template",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "animation-artist": {
    name: "AnimationArtist",
    description: "Animation artist template",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "multimedia-designer": {
    name: "MultimediaDesigner",
    description: "Multimedia designer template",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "ux-researcher": {
    name: "UXResearcher",
    description: "UX researcher template with research methodology focus",
    category: "Design",
    categorySlug: "creative-design",
  },
  "ui-specialist": {
    name: "UISpecialist",
    description: "UI specialist template with interface design showcase",
    category: "Design",
    categorySlug: "creative-design",
  },
  "product-designer-pro": {
    name: "ProductDesignerPro",
    description: "Professional product designer template",
    category: "Design",
    categorySlug: "creative-design",
  },
  "interaction-designer": {
    name: "InteractionDesigner",
    description: "Interaction designer template",
    category: "Design",
    categorySlug: "creative-design",
  },
  "service-designer": {
    name: "ServiceDesigner",
    description: "Service designer template with systems thinking",
    category: "Design",
    categorySlug: "creative-design",
  },
  "design-systems-architect": {
    name: "DesignSystemsArchitect",
    description: "Design systems architect template",
    category: "Design",
    categorySlug: "creative-design",
  },
  "accessibility-designer": {
    name: "AccessibilityDesigner",
    description: "Accessibility-focused designer template",
    category: "Design",
    categorySlug: "creative-design",
  },
  "design-lead": {
    name: "DesignLead",
    description: "Design lead template for leadership roles",
    category: "Design",
    categorySlug: "creative-design",
  },
  "design-strategist": {
    name: "DesignStrategist",
    description: "Design strategist template with strategic focus",
    category: "Design",
    categorySlug: "creative-design",
  },
  "visual-designer-pro": {
    name: "VisualDesignerPro",
    description: "Professional visual designer template",
    category: "Design",
    categorySlug: "creative-design",
  },
  // 2025 Batch 2 - Universal Professional Templates (30 templates)
  "sapphire-professional": {
    name: "SapphireProfessional",
    description: "Elegant sapphire-themed professional template with social integration",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "emerald-executive": {
    name: "EmeraldExecutive",
    description: "Sophisticated emerald executive template with LinkedIn emphasis",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "ruby-corporate": {
    name: "RubyCorporate",
    description: "Bold ruby corporate template with comprehensive social presence",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "onyx-leadership": {
    name: "OnyxLeadership",
    description: "Sleek onyx leadership template with minimal design",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "platinum-prestige": {
    name: "PlatinumPrestige",
    description: "Prestigious platinum template with elegant social section",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "azure-professional": {
    name: "AzureProfessional",
    description: "Modern azure professional with integrated online presence",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "amber-executive": {
    name: "AmberExecutive",
    description: "Warm amber executive template with portfolio links",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "violet-corporate": {
    name: "VioletCorporate",
    description: "Creative violet corporate with strong social media presence",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "jade-professional": {
    name: "JadeProfessional",
    description: "Balanced jade professional with networking focus",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "crimson-leadership": {
    name: "CrimsonLeadership",
    description: "Powerful crimson leadership with executive links",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "slate-minimalist": {
    name: "SlateMinimalist",
    description: "Clean slate minimalist with subtle social integration",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "teal-modern": {
    name: "TealModern",
    description: "Fresh teal modern template with prominent GitHub",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "indigo-executive": {
    name: "IndigoExecutive",
    description: "Deep indigo executive with professional network links",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "rose-professional": {
    name: "RoseProfessional",
    description: "Elegant rose professional with balanced social presence",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "navy-corporate": {
    name: "NavyCorporate",
    description: "Classic navy corporate with LinkedIn integration",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "gold-prestige": {
    name: "GoldPrestige",
    description: "Luxurious gold prestige with premium social section",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "charcoal-professional": {
    name: "CharcoalProfessional",
    description: "Modern charcoal professional with sleek social links",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "coral-executive": {
    name: "CoralExecutive",
    description: "Vibrant coral executive with visible portfolio",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "pewter-minimalist": {
    name: "PewterMinimalist",
    description: "Refined pewter minimalist with integrated socials",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "forest-professional": {
    name: "ForestProfessional",
    description: "Natural forest professional with eco-conscious design",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "burgundy-executive": {
    name: "BurgundyExecutive",
    description: "Rich burgundy executive with mature presence",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "sky-modern": {
    name: "SkyModern",
    description: "Bright sky modern with open social approach",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "plum-professional": {
    name: "PlumProfessional",
    description: "Sophisticated plum professional with elegant links",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "bronze-corporate": {
    name: "BronzeCorporate",
    description: "Warm bronze corporate with traditional values",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "mint-professional": {
    name: "MintProfessional",
    description: "Fresh mint professional with modern social icons",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "obsidian-executive": {
    name: "ObsidianExecutive",
    description: "Powerful obsidian executive with commanding presence",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "tangerine-modern": {
    name: "TangerineModern",
    description: "Energetic tangerine modern with vibrant socials",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "steel-professional": {
    name: "SteelProfessional",
    description: "Industrial steel professional with strong structure",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "lavender-executive": {
    name: "LavenderExecutive",
    description: "Calming lavender executive with balanced approach",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  "cobalt-professional": {
    name: "CobaltProfessional",
    description: "Bold cobalt professional with striking presence",
    category: "Universal",
    categorySlug: "universal-professional",
  },
  // 2025 Batch 2 - Software & Technology Templates (25 templates)
  "github-developer": {
    name: "GitHubDeveloper",
    description: "GitHub-focused developer template with contribution showcase",
    category: "Software",
    categorySlug: "software-technology",
  },
  "linkedin-tech-pro": {
    name: "LinkedInTechPro",
    description: "LinkedIn-optimized tech professional template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "laravel-artisan": {
    name: "LaravelArtisan",
    description: "Laravel artisan template for PHP developers",
    category: "Software",
    categorySlug: "software-technology",
  },
  "rails-developer": {
    name: "RailsDeveloper",
    description: "Ruby on Rails developer with clean design",
    category: "Software",
    categorySlug: "software-technology",
  },
  "angular-specialist": {
    name: "AngularSpecialist",
    description: "Angular specialist with component-focused layout",
    category: "Software",
    categorySlug: "software-technology",
  },
  "vue-master": {
    name: "VueMaster",
    description: "Vue.js master template with reactive design",
    category: "Software",
    categorySlug: "software-technology",
  },
  "kotlin-android-dev": {
    name: "KotlinAndroidDev",
    description: "Kotlin Android developer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "ios-swift-engineer": {
    name: "iOSSwiftEngineer",
    description: "iOS Swift engineer with Apple aesthetics",
    category: "Software",
    categorySlug: "software-technology",
  },
  "docker-specialist": {
    name: "DockerSpecialist",
    description: "Docker containerization specialist template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "aws-solutions-architect": {
    name: "AWSSolutionsArchitect",
    description: "AWS solutions architect with cloud focus",
    category: "Software",
    categorySlug: "software-technology",
  },
  "gcp-cloud-engineer": {
    name: "GCPCloudEngineer",
    description: "Google Cloud Platform engineer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "azure-devops-pro": {
    name: "AzureDevOpsPro",
    description: "Azure DevOps professional template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "react-native-dev": {
    name: "ReactNativeDev",
    description: "React Native cross-platform developer",
    category: "Software",
    categorySlug: "software-technology",
  },
  "flutter-ui-specialist": {
    name: "FlutterUISpecialist",
    description: "Flutter UI specialist with beautiful layouts",
    category: "Software",
    categorySlug: "software-technology",
  },
  "dotnet-core-developer": {
    name: "DotNetCoreDeveloper",
    description: ".NET Core developer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "golang-backend-engineer": {
    name: "GolangBackendEngineer",
    description: "Go (Golang) backend engineer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "python-ml-engineer": {
    name: "PythonMLEngineer",
    description: "Python machine learning engineer",
    category: "Software",
    categorySlug: "software-technology",
  },
  "data-scientist-pro": {
    name: "DataScientistPro",
    description: "Professional data scientist template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "blockchain-engineer": {
    name: "BlockchainEngineer",
    description: "Blockchain engineer with Web3 focus",
    category: "Software",
    categorySlug: "software-technology",
  },
  "solidity-developer": {
    name: "SolidityDeveloper",
    description: "Solidity smart contract developer",
    category: "Software",
    categorySlug: "software-technology",
  },
  "cybersecurity-analyst": {
    name: "CybersecurityAnalyst",
    description: "Cybersecurity analyst template",
    category: "Software",
    categorySlug: "software-technology",
  },
  "devsecops-engineer": {
    name: "DevSecOpsEngineer",
    description: "DevSecOps engineer with security focus",
    category: "Software",
    categorySlug: "software-technology",
  },
  "fullstack-javascript": {
    name: "FullstackJavaScript",
    description: "Full-stack JavaScript developer (MERN/MEAN)",
    category: "Software",
    categorySlug: "software-technology",
  },
  "jamstack-developer": {
    name: "JAMStackDeveloper",
    description: "JAMStack developer with modern architecture",
    category: "Software",
    categorySlug: "software-technology",
  },
  "headless-cms-developer": {
    name: "HeadlessCMSDeveloper",
    description: "Headless CMS developer template",
    category: "Software",
    categorySlug: "software-technology",
  },
  // 2025 Batch 2 - Fresh Graduates Templates (20 templates)
  "digital-native-graduate": {
    name: "DigitalNativeGraduate",
    description: "Digital native graduate with strong social presence",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "tech-savvy-fresher": {
    name: "TechSavvyFresher",
    description: "Tech-savvy fresher with GitHub portfolio",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "linkedin-ready-graduate": {
    name: "LinkedInReadyGraduate",
    description: "LinkedIn-ready graduate template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "github-student-developer": {
    name: "GitHubStudentDeveloper",
    description: "GitHub student developer with open-source contributions",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "portfolio-first-graduate": {
    name: "PortfolioFirstGraduate",
    description: "Portfolio-first graduate with project showcase",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "connected-graduate": {
    name: "ConnectedGraduate",
    description: "Well-connected graduate with networking emphasis",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "social-media-savvy-grad": {
    name: "SocialMediaSavvyGrad",
    description: "Social media savvy graduate template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "open-source-contributor": {
    name: "OpenSourceContributor",
    description: "Open source contributor graduate",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "hackathon-winner": {
    name: "HackathonWinner",
    description: "Hackathon winner with achievement focus",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "coding-challenge-champion": {
    name: "CodingChallengeChampion",
    description: "Coding challenge champion template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "capstone-showcase": {
    name: "CapstoneShowcase",
    description: "Capstone project showcase graduate",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "research-publication-grad": {
    name: "ResearchPublicationGrad",
    description: "Graduate with research publications",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "conference-presenter": {
    name: "ConferencePresenter",
    description: "Conference presenter graduate",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "startup-intern": {
    name: "StartupIntern",
    description: "Startup intern with entrepreneurial spirit",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "faang-aspirant": {
    name: "FAANGAspirant",
    description: "FAANG company aspirant template",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "bootcamp-success-story": {
    name: "BootcampSuccessStory",
    description: "Bootcamp success story graduate",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "remote-work-ready": {
    name: "RemoteWorkReady",
    description: "Remote work ready graduate",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "community-builder": {
    name: "CommunityBuilder",
    description: "Community builder graduate",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "tech-blogger-graduate": {
    name: "TechBloggerGraduate",
    description: "Tech blogger graduate with online presence",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  "youtube-educator": {
    name: "YouTubeEducator",
    description: "YouTube educator graduate",
    category: "Fresher",
    categorySlug: "fresh-graduates",
  },
  // 2025 Batch 2 - Creative Templates (15 templates)
  "behance-designer": {
    name: "BehanceDesigner",
    description: "Behance-focused designer with portfolio links",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "dribbble-creative": {
    name: "DribbbleCreative",
    description: "Dribbble creative with shot showcase",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "instagram-influencer": {
    name: "InstagramInfluencer",
    description: "Instagram influencer creator template",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "pinterest-curator": {
    name: "PinterestCurator",
    description: "Pinterest curator creative",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "vimeo-videographer": {
    name: "VimeoVideographer",
    description: "Vimeo videographer with reel links",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "medium-writer": {
    name: "MediumWriter",
    description: "Medium writer with publication links",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "tiktok-creator": {
    name: "TikTokCreator",
    description: "TikTok creator with viral content",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "twitch-streamer": {
    name: "TwitchStreamer",
    description: "Twitch streamer creative professional",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "soundcloud-producer": {
    name: "SoundCloudProducer",
    description: "SoundCloud music producer",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "spotify-artist": {
    name: "SpotifyArtist",
    description: "Spotify artist template",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "artstation-artist": {
    name: "ArtStationArtist",
    description: "ArtStation digital artist",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "deviantart-creator": {
    name: "DeviantArtCreator",
    description: "DeviantArt creator template",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "patreon-creator": {
    name: "PatreonCreator",
    description: "Patreon creator with supporter focus",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "substack-writer": {
    name: "SubstackWriter",
    description: "Substack newsletter writer",
    category: "Creative",
    categorySlug: "creative-design",
  },
  "clubhouse-moderator": {
    name: "ClubhouseModerator",
    description: "Clubhouse room moderator",
    category: "Creative",
    categorySlug: "creative-design",
  },
  // 2025 Batch 2 - Design Templates (10 templates)
  "figma-expert": {
    name: "FigmaExpert",
    description: "Figma expert with design system focus",
    category: "Design",
    categorySlug: "creative-design",
  },
  "sketch-specialist": {
    name: "SketchSpecialist",
    description: "Sketch specialist template",
    category: "Design",
    categorySlug: "creative-design",
  },
  "adobe-xd-designer": {
    name: "AdobeXDDesigner",
    description: "Adobe XD designer template",
    category: "Design",
    categorySlug: "creative-design",
  },
  "framer-designer": {
    name: "FramerDesigner",
    description: "Framer interactive designer",
    category: "Design",
    categorySlug: "creative-design",
  },
  "webflow-developer": {
    name: "WebflowDeveloper",
    description: "Webflow no-code developer",
    category: "Design",
    categorySlug: "creative-design",
  },
  "principle-animator": {
    name: "PrincipleAnimator",
    description: "Principle animation designer",
    category: "Design",
    categorySlug: "creative-design",
  },
  "invision-prototyper": {
    name: "InVisionPrototyper",
    description: "InVision prototyping specialist",
    category: "Design",
    categorySlug: "creative-design",
  },
  "marvel-app-designer": {
    name: "MarvelAppDesigner",
    description: "Marvel app designer",
    category: "Design",
    categorySlug: "creative-design",
  },
  "zeplin-handoff-specialist": {
    name: "ZeplinHandoffSpecialist",
    description: "Zeplin handoff specialist",
    category: "Design",
    categorySlug: "creative-design",
  },
  "abstract-version-designer": {
    name: "AbstractVersionDesigner",
    description: "Abstract version control designer",
    category: "Design",
    categorySlug: "creative-design",
  },
  // 2025 Batch 3 - Healthcare & Medical (15 templates)
  "registered-nurse-pro": {
    name: "RegisteredNursePro",
    description: "Professional registered nurse template with clinical focus",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "physician-specialist": {
    name: "PhysicianSpecialist",
    description: "Physician specialist template with credentials emphasis",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "dental-professional": {
    name: "DentalProfessional",
    description: "Dental professional template with practice details",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "pharmacist-clinical": {
    name: "PharmacistClinical",
    description: "Clinical pharmacist template with certification focus",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "physical-therapist": {
    name: "PhysicalTherapist",
    description: "Physical therapist template with patient care focus",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "medical-technologist": {
    name: "MedicalTechnologist",
    description: "Medical lab technologist template",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "radiology-technician": {
    name: "RadiologyTechnician",
    description: "Radiology technician with imaging expertise",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "healthcare-administrator": {
    name: "HealthcareAdministrator",
    description: "Healthcare administration executive template",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "mental-health-counselor": {
    name: "MentalHealthCounselor",
    description: "Mental health counselor with therapy focus",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "occupational-therapist": {
    name: "OccupationalTherapist",
    description: "Occupational therapy professional template",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "speech-pathologist": {
    name: "SpeechPathologist",
    description: "Speech-language pathologist template",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "veterinary-doctor": {
    name: "VeterinaryDoctor",
    description: "Veterinarian professional template",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "nutritionist-dietitian": {
    name: "NutritionistDietitian",
    description: "Registered dietitian nutritionist template",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "medical-assistant": {
    name: "MedicalAssistant",
    description: "Certified medical assistant template",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  "paramedic-emt": {
    name: "ParamedicEMT",
    description: "Paramedic and EMT professional template",
    category: "Healthcare",
    categorySlug: "healthcare-medical",
  },
  // 2025 Batch 3 - Engineering (15 templates)
  "mechanical-engineer-pro": {
    name: "MechanicalEngineerPro",
    description: "Mechanical engineering professional template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "civil-engineer-pe": {
    name: "CivilEngineerPE",
    description: "Licensed civil engineer template with PE credentials",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "electrical-engineer": {
    name: "ElectricalEngineer",
    description: "Electrical engineering specialist template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "chemical-engineer-pro": {
    name: "ChemicalEngineerPro",
    description: "Chemical process engineer template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "aerospace-engineer": {
    name: "AerospaceEngineer",
    description: "Aerospace engineering professional template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "biomedical-engineer": {
    name: "BiomedicalEngineer",
    description: "Biomedical engineering specialist template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "industrial-engineer": {
    name: "IndustrialEngineer",
    description: "Industrial and systems engineer template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "environmental-engineer": {
    name: "EnvironmentalEngineer",
    description: "Environmental engineering professional",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "petroleum-engineer": {
    name: "PetroleumEngineer",
    description: "Petroleum and energy engineer template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "structural-engineer": {
    name: "StructuralEngineer",
    description: "Structural engineering specialist template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "manufacturing-engineer": {
    name: "ManufacturingEngineer",
    description: "Manufacturing process engineer template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "quality-assurance-engineer": {
    name: "QualityAssuranceEngineer",
    description: "QA and quality control engineer template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "automation-engineer": {
    name: "AutomationEngineer",
    description: "Industrial automation engineer template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "robotics-engineer": {
    name: "RoboticsEngineer",
    description: "Robotics and mechatronics engineer template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  "hvac-engineer": {
    name: "HVACEngineer",
    description: "HVAC and building systems engineer template",
    category: "Engineering",
    categorySlug: "engineering",
  },
  // 2025 Batch 3 - Sales & Marketing (15 templates)
  "sales-executive-pro": {
    name: "SalesExecutivePro",
    description: "Sales executive with achievement focus",
    category: "Sales",
    categorySlug: "sales-marketing",
  },
  "account-manager-enterprise": {
    name: "AccountManagerEnterprise",
    description: "Enterprise account manager template",
    category: "Sales",
    categorySlug: "sales-marketing",
  },
  "digital-marketing-specialist": {
    name: "DigitalMarketingSpecialist",
    description: "Digital marketing specialist with ROI focus",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  "brand-manager-strategic": {
    name: "BrandManagerStrategic",
    description: "Strategic brand manager template",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  "seo-specialist-pro": {
    name: "SEOSpecialistPro",
    description: "SEO and SEM specialist template",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  "growth-marketing-manager": {
    name: "GrowthMarketingManager",
    description: "Growth marketing and acquisition manager",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  "email-marketing-specialist": {
    name: "EmailMarketingSpecialist",
    description: "Email marketing automation specialist",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  "product-marketing-manager": {
    name: "ProductMarketingManager",
    description: "Product marketing manager template",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  "business-development-manager": {
    name: "BusinessDevelopmentManager",
    description: "Business development executive template",
    category: "Sales",
    categorySlug: "sales-marketing",
  },
  "inside-sales-representative": {
    name: "InsideSalesRepresentative",
    description: "Inside sales rep with metrics focus",
    category: "Sales",
    categorySlug: "sales-marketing",
  },
  "field-sales-specialist": {
    name: "FieldSalesSpecialist",
    description: "Field sales territory manager template",
    category: "Sales",
    categorySlug: "sales-marketing",
  },
  "customer-success-manager": {
    name: "CustomerSuccessManager",
    description: "Customer success and retention manager",
    category: "Sales",
    categorySlug: "sales-marketing",
  },
  "marketing-analytics-manager": {
    name: "MarketingAnalyticsManager",
    description: "Marketing analytics and data manager",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  "ecommerce-manager": {
    name: "EcommerceManager",
    description: "E-commerce and online retail manager",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  "affiliate-marketing-manager": {
    name: "AffiliateMarketingManager",
    description: "Affiliate and partnership marketing manager",
    category: "Marketing",
    categorySlug: "sales-marketing",
  },
  // 2025 Batch 3 - Finance & Accounting (12 templates)
  "financial-analyst-cfa": {
    name: "FinancialAnalystCFA",
    description: "Financial analyst with CFA credentials",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "investment-banker": {
    name: "InvestmentBanker",
    description: "Investment banking professional template",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "certified-public-accountant": {
    name: "CertifiedPublicAccountant",
    description: "CPA certified accountant template",
    category: "Accounting",
    categorySlug: "finance-accounting",
  },
  "tax-specialist-pro": {
    name: "TaxSpecialistPro",
    description: "Tax specialist and consultant template",
    category: "Accounting",
    categorySlug: "finance-accounting",
  },
  "financial-controller": {
    name: "FinancialController",
    description: "Financial controller and comptroller template",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "portfolio-manager": {
    name: "PortfolioManager",
    description: "Investment portfolio manager template",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "risk-management-analyst": {
    name: "RiskManagementAnalyst",
    description: "Risk management and compliance analyst",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "treasury-analyst": {
    name: "TreasuryAnalyst",
    description: "Treasury and cash management analyst",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "forensic-accountant": {
    name: "ForensicAccountant",
    description: "Forensic accounting specialist template",
    category: "Accounting",
    categorySlug: "finance-accounting",
  },
  "internal-auditor": {
    name: "InternalAuditor",
    description: "Internal audit professional template",
    category: "Accounting",
    categorySlug: "finance-accounting",
  },
  "budget-analyst": {
    name: "BudgetAnalyst",
    description: "Budget and financial planning analyst",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  "equity-research-analyst": {
    name: "EquityResearchAnalyst",
    description: "Equity research and analysis professional",
    category: "Finance",
    categorySlug: "finance-accounting",
  },
  // 2025 Batch 3 - Education & Teaching (10 templates)
  "university-professor": {
    name: "UniversityProfessor",
    description: "University professor with research focus",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "elementary-teacher": {
    name: "ElementaryTeacher",
    description: "Elementary school teacher template",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "high-school-teacher": {
    name: "HighSchoolTeacher",
    description: "Secondary education teacher template",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "special-education-teacher": {
    name: "SpecialEducationTeacher",
    description: "Special education specialist template",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "esl-teacher-certified": {
    name: "ESLTeacherCertified",
    description: "ESL/TESOL certified teacher template",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "curriculum-developer": {
    name: "CurriculumDeveloper",
    description: "Curriculum development specialist",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "instructional-designer": {
    name: "InstructionalDesigner",
    description: "Instructional design professional template",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "academic-advisor": {
    name: "AcademicAdvisor",
    description: "Academic advisor and counselor template",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "online-course-instructor": {
    name: "OnlineCourseInstructor",
    description: "Online education instructor template",
    category: "Education",
    categorySlug: "education-teaching",
  },
  "private-tutor-specialist": {
    name: "PrivateTutorSpecialist",
    description: "Private tutoring specialist template",
    category: "Education",
    categorySlug: "education-teaching",
  },
  // 2025 Batch 3 - Legal (8 templates)
  "corporate-attorney": {
    name: "CorporateAttorney",
    description: "Corporate law attorney template",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  "litigation-attorney": {
    name: "LitigationAttorney",
    description: "Litigation and trial attorney template",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  "paralegal-certified": {
    name: "ParalegalCertified",
    description: "Certified paralegal professional template",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  "legal-consultant": {
    name: "LegalConsultant",
    description: "Legal consulting professional template",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  "compliance-officer-legal": {
    name: "ComplianceOfficerLegal",
    description: "Legal compliance officer template",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  "contract-specialist": {
    name: "ContractSpecialist",
    description: "Contract management specialist template",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  "intellectual-property-attorney": {
    name: "IntellectualPropertyAttorney",
    description: "IP and patent attorney template",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  "legal-operations-manager": {
    name: "LegalOperationsManager",
    description: "Legal operations manager template",
    category: "Legal",
    categorySlug: "legal-consulting",
  },
  // 2025 Batch 3 - Human Resources (8 templates)
  "hr-business-partner": {
    name: "HRBusinessPartner",
    description: "HR business partner strategic template",
    category: "HR",
    categorySlug: "human-resources",
  },
  "talent-acquisition-specialist": {
    name: "TalentAcquisitionSpecialist",
    description: "Talent acquisition and recruiting specialist",
    category: "HR",
    categorySlug: "human-resources",
  },
  "compensation-benefits-manager": {
    name: "CompensationBenefitsManager",
    description: "Compensation and benefits manager template",
    category: "HR",
    categorySlug: "human-resources",
  },
  "learning-development-manager": {
    name: "LearningDevelopmentManager",
    description: "L&D and training manager template",
    category: "HR",
    categorySlug: "human-resources",
  },
  "employee-relations-specialist": {
    name: "EmployeeRelationsSpecialist",
    description: "Employee relations specialist template",
    category: "HR",
    categorySlug: "human-resources",
  },
  "hr-analytics-manager": {
    name: "HRAnalyticsManager",
    description: "HR analytics and data manager template",
    category: "HR",
    categorySlug: "human-resources",
  },
  "organizational-development": {
    name: "OrganizationalDevelopment",
    description: "Organizational development consultant",
    category: "HR",
    categorySlug: "human-resources",
  },
  "diversity-inclusion-manager": {
    name: "DiversityInclusionManager",
    description: "Diversity and inclusion manager template",
    category: "HR",
    categorySlug: "human-resources",
  },
  // 2025 Batch 3 - Hospitality & Culinary (7 templates)
  "executive-chef": {
    name: "ExecutiveChef",
    description: "Executive chef professional template",
    category: "Hospitality",
    categorySlug: "hospitality-culinary",
  },
  "hotel-manager-operations": {
    name: "HotelManagerOperations",
    description: "Hotel operations manager template",
    category: "Hospitality",
    categorySlug: "hospitality-culinary",
  },
  "restaurant-manager": {
    name: "RestaurantManager",
    description: "Restaurant manager professional template",
    category: "Hospitality",
    categorySlug: "hospitality-culinary",
  },
  "event-planner-coordinator": {
    name: "EventPlannerCoordinator",
    description: "Event planning coordinator template",
    category: "Hospitality",
    categorySlug: "hospitality-culinary",
  },
  "sommelier-wine-specialist": {
    name: "SommelierWineSpecialist",
    description: "Sommelier and wine specialist template",
    category: "Hospitality",
    categorySlug: "hospitality-culinary",
  },
  "pastry-chef": {
    name: "PastryChef",
    description: "Pastry chef professional template",
    category: "Hospitality",
    categorySlug: "hospitality-culinary",
  },
  "hospitality-director": {
    name: "HospitalityDirector",
    description: "Hospitality director executive template",
    category: "Hospitality",
    categorySlug: "hospitality-culinary",
  },
  // 2025 Batch 3 - Real Estate & Construction (7 templates)
  "real-estate-broker": {
    name: "RealEstateBroker",
    description: "Licensed real estate broker template",
    category: "RealEstate",
    categorySlug: "real-estate-construction",
  },
  "property-manager-commercial": {
    name: "PropertyManagerCommercial",
    description: "Commercial property manager template",
    category: "RealEstate",
    categorySlug: "real-estate-construction",
  },
  "construction-project-manager": {
    name: "ConstructionProjectManager",
    description: "Construction PM professional template",
    category: "Construction",
    categorySlug: "real-estate-construction",
  },
  "architect-registered": {
    name: "ArchitectRegistered",
    description: "Licensed architect professional template",
    category: "Construction",
    categorySlug: "real-estate-construction",
  },
  "general-contractor": {
    name: "GeneralContractor",
    description: "General contractor professional template",
    category: "Construction",
    categorySlug: "real-estate-construction",
  },
  "estimator-cost-analyst": {
    name: "EstimatorCostAnalyst",
    description: "Construction estimator template",
    category: "Construction",
    categorySlug: "real-estate-construction",
  },
  "real-estate-appraiser": {
    name: "RealEstateAppraiser",
    description: "Real estate appraiser professional template",
    category: "RealEstate",
    categorySlug: "real-estate-construction",
  },
  // 2025 Batch 3 - Operations & Logistics (3 templates)
  "supply-chain-manager": {
    name: "SupplyChainManager",
    description: "Supply chain operations manager template",
    category: "Operations",
    categorySlug: "operations-management",
  },
  "logistics-coordinator": {
    name: "LogisticsCoordinator",
    description: "Logistics and distribution coordinator",
    category: "Operations",
    categorySlug: "operations-management",
  },
  "procurement-specialist": {
    name: "ProcurementSpecialist",
    description: "Procurement and sourcing specialist template",
    category: "Operations",
    categorySlug: "operations-management",
  },
};

export const categoryLabelMap: Record<string, string> = {
  software: "Software Development",
  freshers: "Freshers & Entry Level",
  accountants: "Accounting & Finance",
  teaching: "Teaching & Education",
  all: "All Professions",
};
