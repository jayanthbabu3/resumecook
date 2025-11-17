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
  "minimalist-pro": {
    name: "Minimalist Pro",
    description:
      "Ultra-clean minimalist design with subtle accents and maximum whitespace for modern professionals.",
    category: "Universal",
    categorySlug: "all",
  },
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
  "cloud-architect": {
    name: "Cloud Architect",
    description:
      "Cloud and architecture focused design highlighting infrastructure and system design expertise.",
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
};

export const categoryLabelMap: Record<string, string> = {
  software: "Software Development",
  freshers: "Freshers & Entry Level",
  accountants: "Accounting & Finance",
  teaching: "Teaching & Education",
  all: "All Professions",
};
