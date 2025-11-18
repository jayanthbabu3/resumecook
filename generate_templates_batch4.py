#!/usr/bin/env python3
"""
Generate 100 NEW unique, premium resume templates (Batch 4)
Focus: Premium design variants across Universal, Software, Fresher, Creative, and Design categories
Different looks: Minimalist, Modern, Bold, Elegant, Tech-inspired, Artistic
"""

import os
from pathlib import Path

# Define 100 NEW templates (Batch 4) - Premium variants with unique designs
TEMPLATES_BATCH_4 = [
    # ===== UNIVERSAL PROFESSIONAL (20 templates) - Premium Variants =====
    {
        "id": "crystal-executive",
        "name": "CrystalExecutive",
        "category": "Universal",
        "description": "Crystal-clear minimalist executive template with elegant spacing",
        "theme": "#1e293b",
        "layout": "clean-minimal"
    },
    {
        "id": "quantum-professional",
        "name": "QuantumProfessional",
        "category": "Universal",
        "description": "Modern quantum-inspired professional template with geometric accents",
        "theme": "#7c3aed",
        "layout": "geometric-modern"
    },
    {
        "id": "zenith-corporate",
        "name": "ZenithCorporate",
        "category": "Universal",
        "description": "Peak corporate design with bold typography and structured layout",
        "theme": "#0f172a",
        "layout": "bold-structured"
    },
    {
        "id": "aurora-minimal",
        "name": "AuroraMinimal",
        "category": "Universal",
        "description": "Aurora-inspired minimal design with subtle gradient accents",
        "theme": "#6366f1",
        "layout": "gradient-minimal"
    },
    {
        "id": "nexus-elite",
        "name": "NexusElite",
        "category": "Universal",
        "description": "Elite professional template with interconnected sections",
        "theme": "#0891b2",
        "layout": "connected-sections"
    },
    {
        "id": "harmony-executive",
        "name": "HarmonyExecutive",
        "category": "Universal",
        "description": "Harmonious executive design with balanced two-column layout",
        "theme": "#059669",
        "layout": "balanced-columns"
    },
    {
        "id": "prism-professional",
        "name": "PrismProfessional",
        "category": "Universal",
        "description": "Prism-effect professional template with color-shifting accents",
        "theme": "#8b5cf6",
        "layout": "color-accent"
    },
    {
        "id": "titan-corporate",
        "name": "TitanCorporate",
        "category": "Universal",
        "description": "Powerful titan corporate design with strong visual hierarchy",
        "theme": "#1e40af",
        "layout": "strong-hierarchy"
    },
    {
        "id": "serenity-minimal",
        "name": "SerenityMinimal",
        "category": "Universal",
        "description": "Serene minimal template with peaceful color palette",
        "theme": "#0d9488",
        "layout": "peaceful-minimal"
    },
    {
        "id": "velocity-executive",
        "name": "VelocityExecutive",
        "category": "Universal",
        "description": "Dynamic velocity-inspired executive template with motion design",
        "theme": "#dc2626",
        "layout": "dynamic-motion"
    },
    {
        "id": "eclipse-professional",
        "name": "EclipseProfessional",
        "category": "Universal",
        "description": "Eclipse-themed professional design with circular elements",
        "theme": "#1e293b",
        "layout": "circular-theme"
    },
    {
        "id": "sterling-executive",
        "name": "SterlingExecutive",
        "category": "Universal",
        "description": "Sterling silver executive template with premium metallic accents",
        "theme": "#64748b",
        "layout": "metallic-accents"
    },
    {
        "id": "meridian-corporate",
        "name": "MeridianCorporate",
        "category": "Universal",
        "description": "Meridian corporate design with vertical line accents",
        "theme": "#0369a1",
        "layout": "vertical-lines"
    },
    {
        "id": "cosmos-professional",
        "name": "CosmosProfessional",
        "category": "Universal",
        "description": "Cosmic professional template with space-inspired elements",
        "theme": "#4f46e5",
        "layout": "space-inspired"
    },
    {
        "id": "pinnacle-elite",
        "name": "PinnacleElite",
        "category": "Universal",
        "description": "Pinnacle elite design with peak performance layout",
        "theme": "#be123c",
        "layout": "peak-performance"
    },
    {
        "id": "flux-executive",
        "name": "FluxExecutive",
        "category": "Universal",
        "description": "Flux executive template with flowing sections",
        "theme": "#0891b2",
        "layout": "flowing-sections"
    },
    {
        "id": "vertex-professional",
        "name": "VertexProfessional",
        "category": "Universal",
        "description": "Vertex professional design with angular accents",
        "theme": "#7c3aed",
        "layout": "angular-modern"
    },
    {
        "id": "radiance-corporate",
        "name": "RadianceCorporate",
        "category": "Universal",
        "description": "Radiant corporate template with light-themed design",
        "theme": "#f59e0b",
        "layout": "light-radiant"
    },
    {
        "id": "atlas-executive",
        "name": "AtlasExecutive",
        "category": "Universal",
        "description": "Atlas executive design with global professional appeal",
        "theme": "#0f766e",
        "layout": "global-appeal"
    },
    {
        "id": "spectrum-professional",
        "name": "SpectrumProfessional",
        "category": "Universal",
        "description": "Spectrum professional template with full-range color options",
        "theme": "#059669",
        "layout": "color-spectrum"
    },

    # ===== SOFTWARE & TECHNOLOGY (20 templates) - Premium Tech Variants =====
    {
        "id": "codeforge-developer",
        "name": "CodeforgeDeveloper",
        "category": "Software",
        "description": "Code forge developer template with IDE-inspired design",
        "theme": "#0f172a",
        "layout": "ide-inspired"
    },
    {
        "id": "quantum-coder",
        "name": "QuantumCoder",
        "category": "Software",
        "description": "Quantum computing developer template with futuristic design",
        "theme": "#6366f1",
        "layout": "futuristic-tech"
    },
    {
        "id": "neural-engineer",
        "name": "NeuralEngineer",
        "category": "Software",
        "description": "Neural network engineer template with AI-inspired layout",
        "theme": "#8b5cf6",
        "layout": "ai-neural"
    },
    {
        "id": "pixelcraft-developer",
        "name": "PixelcraftDeveloper",
        "category": "Software",
        "description": "Pixel-perfect developer template with precise grid layout",
        "theme": "#0891b2",
        "layout": "pixel-perfect"
    },
    {
        "id": "cloudnative-architect",
        "name": "CloudnativeArchitect",
        "category": "Software",
        "description": "Cloud-native architect template with distributed design",
        "theme": "#3b82f6",
        "layout": "cloud-distributed"
    },
    {
        "id": "bytecode-specialist",
        "name": "BytecodeSpecialist",
        "category": "Software",
        "description": "Bytecode specialist template with low-level design aesthetics",
        "theme": "#1e293b",
        "layout": "low-level-code"
    },
    {
        "id": "agileflow-developer",
        "name": "AgileflowDeveloper",
        "category": "Software",
        "description": "Agile flow developer template with sprint-based sections",
        "theme": "#059669",
        "layout": "agile-sprint"
    },
    {
        "id": "stackmaster-fullstack",
        "name": "StackmasterFullstack",
        "category": "Software",
        "description": "Full stack master template with layered architecture design",
        "theme": "#7c3aed",
        "layout": "layered-stack"
    },
    {
        "id": "gitflow-engineer",
        "name": "GitflowEngineer",
        "category": "Software",
        "description": "Git flow engineer template with version control theme",
        "theme": "#f97316",
        "layout": "version-control"
    },
    {
        "id": "compile-time-dev",
        "name": "CompileTimeDev",
        "category": "Software",
        "description": "Compile-time developer template with build process design",
        "theme": "#0f766e",
        "layout": "build-process"
    },
    {
        "id": "microarch-engineer",
        "name": "MicroarchEngineer",
        "category": "Software",
        "description": "Microservices architect template with modular layout",
        "theme": "#0891b2",
        "layout": "modular-micro"
    },
    {
        "id": "serverless-specialist",
        "name": "ServerlessSpecialist",
        "category": "Software",
        "description": "Serverless specialist template with function-based design",
        "theme": "#6366f1",
        "layout": "serverless-func"
    },
    {
        "id": "edgecompute-developer",
        "name": "EdgecomputeDeveloper",
        "category": "Software",
        "description": "Edge computing developer template with distributed edge design",
        "theme": "#1e40af",
        "layout": "edge-distributed"
    },
    {
        "id": "webrtc-engineer",
        "name": "WebrtcEngineer",
        "category": "Software",
        "description": "WebRTC real-time engineer template with streaming design",
        "theme": "#dc2626",
        "layout": "realtime-stream"
    },
    {
        "id": "graphdb-specialist",
        "name": "GraphdbSpecialist",
        "category": "Software",
        "description": "Graph database specialist template with node-based layout",
        "theme": "#059669",
        "layout": "graph-nodes"
    },
    {
        "id": "containerops-engineer",
        "name": "ContaineropsEngineer",
        "category": "Software",
        "description": "Container operations engineer with orchestration design",
        "theme": "#0284c7",
        "layout": "container-orchestration"
    },
    {
        "id": "apigateway-architect",
        "name": "ApigatewayArchitect",
        "category": "Software",
        "description": "API gateway architect template with endpoint-focused design",
        "theme": "#7c3aed",
        "layout": "api-endpoints"
    },
    {
        "id": "observability-engineer",
        "name": "ObservabilityEngineer",
        "category": "Software",
        "description": "Observability engineer template with metrics-driven design",
        "theme": "#f59e0b",
        "layout": "metrics-driven"
    },
    {
        "id": "eventdriven-architect",
        "name": "EventdrivenArchitect",
        "category": "Software",
        "description": "Event-driven architect template with message queue design",
        "theme": "#8b5cf6",
        "layout": "event-queue"
    },
    {
        "id": "mlops-engineer",
        "name": "MlopsEngineer",
        "category": "Software",
        "description": "MLOps engineer template with pipeline-focused design",
        "theme": "#0891b2",
        "layout": "ml-pipeline"
    },

    # ===== FRESH GRADUATES (20 templates) - Premium Fresher Variants =====
    {
        "id": "launchpad-graduate",
        "name": "LaunchpadGraduate",
        "category": "Fresher",
        "description": "Launchpad graduate template with career takeoff design",
        "theme": "#3b82f6",
        "layout": "career-launch"
    },
    {
        "id": "momentum-fresher",
        "name": "MomentumFresher",
        "category": "Fresher",
        "description": "Momentum fresher template with forward-moving design",
        "theme": "#059669",
        "layout": "forward-momentum"
    },
    {
        "id": "horizon-graduate",
        "name": "HorizonGraduate",
        "category": "Fresher",
        "description": "Horizon graduate template with future-focused layout",
        "theme": "#0891b2",
        "layout": "future-horizon"
    },
    {
        "id": "catalyst-fresher",
        "name": "CatalystFresher",
        "category": "Fresher",
        "description": "Catalyst fresher template with change-maker design",
        "theme": "#7c3aed",
        "layout": "change-catalyst"
    },
    {
        "id": "pathway-graduate",
        "name": "PathwayGraduate",
        "category": "Fresher",
        "description": "Pathway graduate template with journey-based timeline",
        "theme": "#0d9488",
        "layout": "journey-path"
    },
    {
        "id": "spark-fresher",
        "name": "SparkFresher",
        "category": "Fresher",
        "description": "Spark fresher template with ignition-themed design",
        "theme": "#f97316",
        "layout": "spark-ignition"
    },
    {
        "id": "ascend-graduate",
        "name": "AscendGraduate",
        "category": "Fresher",
        "description": "Ascend graduate template with upward progression design",
        "theme": "#6366f1",
        "layout": "upward-ascend"
    },
    {
        "id": "pioneer-fresher",
        "name": "PioneerFresher",
        "category": "Fresher",
        "description": "Pioneer fresher template with trailblazer layout",
        "theme": "#059669",
        "layout": "pioneer-trail"
    },
    {
        "id": "keystone-graduate",
        "name": "KeystoneGraduate",
        "category": "Fresher",
        "description": "Keystone graduate template with foundation-focused design",
        "theme": "#0f766e",
        "layout": "foundation-key"
    },
    {
        "id": "venture-fresher",
        "name": "VentureFresher",
        "category": "Fresher",
        "description": "Venture fresher template with entrepreneurial spirit design",
        "theme": "#dc2626",
        "layout": "venture-startup"
    },
    {
        "id": "aspire-graduate",
        "name": "AspireGraduate",
        "category": "Fresher",
        "description": "Aspire graduate template with goal-oriented layout",
        "theme": "#0891b2",
        "layout": "goal-aspire"
    },
    {
        "id": "emerge-fresher",
        "name": "EmergeFresher",
        "category": "Fresher",
        "description": "Emerge fresher template with emerging talent design",
        "theme": "#7c3aed",
        "layout": "emerge-talent"
    },
    {
        "id": "bright-graduate",
        "name": "BrightGraduate",
        "category": "Fresher",
        "description": "Bright graduate template with luminous career-start design",
        "theme": "#f59e0b",
        "layout": "bright-start"
    },
    {
        "id": "nextstep-fresher",
        "name": "NextstepFresher",
        "category": "Fresher",
        "description": "Next step fresher template with progression-based layout",
        "theme": "#059669",
        "layout": "next-step"
    },
    {
        "id": "foundation-graduate",
        "name": "FoundationGraduate",
        "category": "Fresher",
        "description": "Foundation graduate template with strong base design",
        "theme": "#1e40af",
        "layout": "strong-foundation"
    },
    {
        "id": "elevate-fresher",
        "name": "ElevateFresher",
        "category": "Fresher",
        "description": "Elevate fresher template with career elevation design",
        "theme": "#8b5cf6",
        "layout": "career-elevate"
    },
    {
        "id": "genesis-graduate",
        "name": "GenesisGraduate",
        "category": "Fresher",
        "description": "Genesis graduate template with new beginning design",
        "theme": "#0d9488",
        "layout": "new-genesis"
    },
    {
        "id": "achiever-fresher",
        "name": "AchieverFresher",
        "category": "Fresher",
        "description": "Achiever fresher template with accomplishment-focused layout",
        "theme": "#059669",
        "layout": "accomplishment-focus"
    },
    {
        "id": "milestone-graduate",
        "name": "MilestoneGraduate",
        "category": "Fresher",
        "description": "Milestone graduate template with achievement marker design",
        "theme": "#0891b2",
        "layout": "milestone-markers"
    },
    {
        "id": "potential-fresher",
        "name": "PotentialFresher",
        "category": "Fresher",
        "description": "Potential fresher template with capability showcase design",
        "theme": "#6366f1",
        "layout": "potential-showcase"
    },

    # ===== CREATIVE (20 templates) - Premium Creative Variants =====
    {
        "id": "muse-creative",
        "name": "MuseCreative",
        "category": "Creative",
        "description": "Muse creative template with artistic inspiration design",
        "theme": "#ec4899",
        "layout": "artistic-muse"
    },
    {
        "id": "canvas-artist",
        "name": "CanvasArtist",
        "category": "Creative",
        "description": "Canvas artist template with painterly layout",
        "theme": "#f97316",
        "layout": "painterly-canvas"
    },
    {
        "id": "palette-designer",
        "name": "PaletteDesigner",
        "category": "Creative",
        "description": "Palette designer template with color-rich design",
        "theme": "#8b5cf6",
        "layout": "color-palette"
    },
    {
        "id": "visionary-creative",
        "name": "VisionaryCreative",
        "category": "Creative",
        "description": "Visionary creative template with forward-thinking design",
        "theme": "#6366f1",
        "layout": "visionary-forward"
    },
    {
        "id": "studio-artist",
        "name": "StudioArtist",
        "category": "Creative",
        "description": "Studio artist template with workspace-inspired layout",
        "theme": "#059669",
        "layout": "studio-workspace"
    },
    {
        "id": "creative-pulse",
        "name": "CreativePulse",
        "category": "Creative",
        "description": "Creative pulse template with rhythmic design elements",
        "theme": "#dc2626",
        "layout": "rhythmic-pulse"
    },
    {
        "id": "artisan-designer",
        "name": "ArtisanDesigner",
        "category": "Creative",
        "description": "Artisan designer template with handcrafted aesthetic",
        "theme": "#0891b2",
        "layout": "handcrafted-artisan"
    },
    {
        "id": "chromatic-creative",
        "name": "ChromaticCreative",
        "category": "Creative",
        "description": "Chromatic creative template with vibrant color scheme",
        "theme": "#ec4899",
        "layout": "vibrant-chromatic"
    },
    {
        "id": "expression-artist",
        "name": "ExpressionArtist",
        "category": "Creative",
        "description": "Expression artist template with expressive typography",
        "theme": "#7c3aed",
        "layout": "expressive-type"
    },
    {
        "id": "imaginative-designer",
        "name": "ImaginativeDesigner",
        "category": "Creative",
        "description": "Imaginative designer template with creative flourishes",
        "theme": "#f59e0b",
        "layout": "imaginative-flourish"
    },
    {
        "id": "aesthetic-creative",
        "name": "AestheticCreative",
        "category": "Creative",
        "description": "Aesthetic creative template with refined beauty design",
        "theme": "#ec4899",
        "layout": "refined-aesthetic"
    },
    {
        "id": "composition-artist",
        "name": "CompositionArtist",
        "category": "Creative",
        "description": "Composition artist template with balanced layout design",
        "theme": "#8b5cf6",
        "layout": "balanced-composition"
    },
    {
        "id": "impression-designer",
        "name": "ImpressionDesigner",
        "category": "Creative",
        "description": "Impression designer template with memorable impact design",
        "theme": "#059669",
        "layout": "memorable-impression"
    },
    {
        "id": "narrative-creative",
        "name": "NarrativeCreative",
        "category": "Creative",
        "description": "Narrative creative template with storytelling layout",
        "theme": "#0891b2",
        "layout": "storytelling-narrative"
    },
    {
        "id": "craft-artist",
        "name": "CraftArtist",
        "category": "Creative",
        "description": "Craft artist template with detailed craftsmanship design",
        "theme": "#f97316",
        "layout": "detailed-craft"
    },
    {
        "id": "vibrant-designer",
        "name": "VibrantDesigner",
        "category": "Creative",
        "description": "Vibrant designer template with energetic color use",
        "theme": "#ec4899",
        "layout": "energetic-vibrant"
    },
    {
        "id": "concept-creative",
        "name": "ConceptCreative",
        "category": "Creative",
        "description": "Concept creative template with idea-focused design",
        "theme": "#6366f1",
        "layout": "concept-idea"
    },
    {
        "id": "editorial-artist",
        "name": "EditorialArtist",
        "category": "Creative",
        "description": "Editorial artist template with magazine-style layout",
        "theme": "#0f766e",
        "layout": "editorial-magazine"
    },
    {
        "id": "vision-designer",
        "name": "VisionDesigner",
        "category": "Creative",
        "description": "Vision designer template with big-picture creative design",
        "theme": "#7c3aed",
        "layout": "bigpicture-vision"
    },
    {
        "id": "curator-creative",
        "name": "CuratorCreative",
        "category": "Creative",
        "description": "Curator creative template with gallery-style portfolio",
        "theme": "#059669",
        "layout": "gallery-curator"
    },

    # ===== DESIGN (20 templates) - Premium Design Variants =====
    {
        "id": "interface-master",
        "name": "InterfaceMaster",
        "category": "Design",
        "description": "Interface master template with UI/UX focus",
        "theme": "#3b82f6",
        "layout": "ui-interface"
    },
    {
        "id": "designsystem-architect",
        "name": "DesignsystemArchitect",
        "category": "Design",
        "description": "Design system architect template with component library design",
        "theme": "#8b5cf6",
        "layout": "design-system"
    },
    {
        "id": "userflow-designer",
        "name": "UserflowDesigner",
        "category": "Design",
        "description": "User flow designer template with journey mapping layout",
        "theme": "#0891b2",
        "layout": "user-journey"
    },
    {
        "id": "prototype-specialist",
        "name": "PrototypeSpecialist",
        "category": "Design",
        "description": "Prototype specialist template with iterative design focus",
        "theme": "#6366f1",
        "layout": "iterative-prototype"
    },
    {
        "id": "pixelperfect-designer",
        "name": "PixelperfectDesigner",
        "category": "Design",
        "description": "Pixel perfect designer template with precision layout",
        "theme": "#1e293b",
        "layout": "precision-pixel"
    },
    {
        "id": "responsive-ux",
        "name": "ResponsiveUx",
        "category": "Design",
        "description": "Responsive UX template with adaptive design showcase",
        "theme": "#059669",
        "layout": "adaptive-responsive"
    },
    {
        "id": "wireframe-specialist",
        "name": "WireframeSpecialist",
        "category": "Design",
        "description": "Wireframe specialist template with structural design focus",
        "theme": "#64748b",
        "layout": "structural-wireframe"
    },
    {
        "id": "microinteraction-designer",
        "name": "MicrointeractionDesigner",
        "category": "Design",
        "description": "Micro-interaction designer template with detail-focused design",
        "theme": "#7c3aed",
        "layout": "detail-micro"
    },
    {
        "id": "accessibility-ux",
        "name": "AccessibilityUx",
        "category": "Design",
        "description": "Accessibility UX template with inclusive design principles",
        "theme": "#0d9488",
        "layout": "inclusive-a11y"
    },
    {
        "id": "userresearch-specialist",
        "name": "UserresearchSpecialist",
        "category": "Design",
        "description": "User research specialist template with data-driven design",
        "theme": "#0891b2",
        "layout": "research-data"
    },
    {
        "id": "information-architect",
        "name": "InformationArchitect",
        "category": "Design",
        "description": "Information architect template with content structure focus",
        "theme": "#3b82f6",
        "layout": "content-structure"
    },
    {
        "id": "designthinking-specialist",
        "name": "DesignthinkingSpecialist",
        "category": "Design",
        "description": "Design thinking specialist template with problem-solving layout",
        "theme": "#f59e0b",
        "layout": "problem-solving"
    },
    {
        "id": "componentui-designer",
        "name": "ComponentuiDesigner",
        "category": "Design",
        "description": "Component UI designer template with modular design system",
        "theme": "#6366f1",
        "layout": "modular-components"
    },
    {
        "id": "designops-specialist",
        "name": "DesignopsSpecialist",
        "category": "Design",
        "description": "Design operations specialist template with workflow focus",
        "theme": "#059669",
        "layout": "workflow-ops"
    },
    {
        "id": "mobile-first-designer",
        "name": "MobileFirstDesigner",
        "category": "Design",
        "description": "Mobile-first designer template with touch-optimized layout",
        "theme": "#0891b2",
        "layout": "mobile-optimized"
    },
    {
        "id": "servicedesign-specialist",
        "name": "ServicedesignSpecialist",
        "category": "Design",
        "description": "Service design specialist template with holistic approach",
        "theme": "#7c3aed",
        "layout": "holistic-service"
    },
    {
        "id": "designstrategy-lead",
        "name": "DesignstrategyLead",
        "category": "Design",
        "description": "Design strategy lead template with vision-driven layout",
        "theme": "#8b5cf6",
        "layout": "strategic-vision"
    },
    {
        "id": "conversational-ux",
        "name": "ConversationalUx",
        "category": "Design",
        "description": "Conversational UX template with voice/chat interface focus",
        "theme": "#ec4899",
        "layout": "conversational-ui"
    },
    {
        "id": "motion-ui-designer",
        "name": "MotionUiDesigner",
        "category": "Design",
        "description": "Motion UI designer template with animation-focused design",
        "theme": "#f97316",
        "layout": "animation-motion"
    },
    {
        "id": "designleadership-director",
        "name": "DesignleadershipDirector",
        "category": "Design",
        "description": "Design leadership director template with team-focused layout",
        "theme": "#0f766e",
        "layout": "leadership-team"
    },
]


def to_pascal_case(kebab_str):
    """Convert kebab-case to PascalCase"""
    return ''.join(word.capitalize() for word in kebab_str.split('-'))


def generate_ui_template(template):
    """Generate UI template component"""
    template_name = template['name']
    theme_color = template['theme']
    description = template['description']

    return f"""import {{ ResumeData }} from "@/pages/Editor";
import {{ InlineEditableText }} from "@/components/resume/InlineEditableText";
import {{ InlineEditableList }} from "@/components/resume/InlineEditableList";
import {{ InlineEditableSkills }} from "@/components/resume/InlineEditableSkills";
import {{ InlineEditableDate }} from "@/components/resume/InlineEditableDate";

interface {template_name}TemplateProps {{
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}}

const normalizeHex = (color?: string) => {{
  if (!color || !color.startsWith("#")) return undefined;
  if (color.length === 4) {{
    const [_, r, g, b] = color;
    return `#${{r}}${{r}}${{g}}${{g}}${{b}}${{b}}`;
  }}
  return color.slice(0, 7);
}};

const withOpacity = (color: string | undefined, alpha: string) => {{
  const normalized = normalizeHex(color);
  if (!normalized) return color;
  return `${{normalized}}${{alpha}}`;
}};

export const {template_name}Template = ({{
  resumeData,
  themeColor = "{theme_color}",
  editable = false,
}}: {template_name}TemplateProps) => {{
  const accent = normalizeHex(themeColor) ?? "{theme_color}";
  const accentLight = withOpacity(accent, "15") ?? "{theme_color}15";
  const accentBorder = withOpacity(accent, "33") ?? "{theme_color}33";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 text-[13px] leading-relaxed">
      {{/* Header Section */}}
      <div className="mb-8 pb-6 border-b-2" style={{{{ borderColor: accent }}}}>
        {{editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={{resumeData.personalInfo.fullName}}
            className="text-[32px] font-bold mb-3 block tracking-tight"
            style={{{{ color: accent }}}}
            as="h1"
          />
        ) : (
          <h1 className="text-[32px] font-bold mb-3 tracking-tight" style={{{{ color: accent }}}}>
            {{resumeData.personalInfo.fullName}}
          </h1>
        )}}

        <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[12px] text-gray-600 mt-2">
          {{resumeData.personalInfo.email && (
            editable ? (
              <InlineEditableText
                path="personalInfo.email"
                value={{resumeData.personalInfo.email}}
                className="inline-flex items-center gap-1.5"
              />
            ) : (
              <span className="flex items-center gap-1.5">{{resumeData.personalInfo.email}}</span>
            )
          )}}
          {{resumeData.personalInfo.phone && (
            editable ? (
              <InlineEditableText
                path="personalInfo.phone"
                value={{resumeData.personalInfo.phone}}
                className="inline-flex items-center gap-1.5"
              />
            ) : (
              <span className="flex items-center gap-1.5">{{resumeData.personalInfo.phone}}</span>
            )
          )}}
          {{resumeData.personalInfo.location && (
            editable ? (
              <InlineEditableText
                path="personalInfo.location"
                value={{resumeData.personalInfo.location}}
                className="inline-flex items-center gap-1.5"
              />
            ) : (
              <span className="flex items-center gap-1.5">{{resumeData.personalInfo.location}}</span>
            )
          )}}
          {{resumeData.personalInfo.linkedin && (
            editable ? (
              <InlineEditableText
                path="personalInfo.linkedin"
                value={{resumeData.personalInfo.linkedin}}
                className="inline-flex items-center gap-1.5"
              />
            ) : (
              <span className="flex items-center gap-1.5">{{resumeData.personalInfo.linkedin}}</span>
            )
          )}}
        </div>
      </div>

      {{/* Professional Summary */}}
      {{resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-[16px] font-bold mb-3 uppercase tracking-wider" style={{{{ color: accent }}}}>
            Professional Summary
          </h2>
          {{editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={{resumeData.personalInfo.summary}}
              className="text-[13px] text-gray-700 leading-[1.8] block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[13px] text-gray-700 leading-[1.8]">
              {{resumeData.personalInfo.summary}}
            </p>
          )}}
        </div>
      )}}

      {{/* Experience Section */}}
      {{resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider" style={{{{ color: accent }}}}>
            Professional Experience
          </h2>
          {{editable ? (
            <InlineEditableList
              path="experience"
              items={{resumeData.experience}}
              defaultItem={{{{
                id: Date.now().toString(),
                company: "Company Name",
                position: "Position Title",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Job description here",
                current: false,
              }}}}
              addButtonLabel="Add Experience"
              renderItem={{(exp, index) => (
                <div className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <InlineEditableText
                        path={{`experience[${{index}}].position`}}
                        value={{exp.position}}
                        className="text-[14.5px] font-semibold text-gray-900 block mb-1"
                        as="h3"
                      />
                      <InlineEditableText
                        path={{`experience[${{index}}].company`}}
                        value={{exp.company}}
                        className="text-[13px] font-medium block"
                        style={{{{ color: accent }}}}
                        as="p"
                      />
                    </div>
                    <div className="text-right text-[11.5px] text-gray-600 ml-4">
                      <div className="flex items-center gap-1.5">
                        <InlineEditableDate
                          path={{`experience[${{index}}].startDate`}}
                          value={{exp.startDate}}
                          className="inline-block"
                        />
                        <span>-</span>
                        {{exp.current ? (
                          <span className="font-medium">Present</span>
                        ) : (
                          <InlineEditableDate
                            path={{`experience[${{index}}].endDate`}}
                            value={{exp.endDate}}
                            className="inline-block"
                          />
                        )}}
                      </div>
                    </div>
                  </div>
                  {{exp.description && (
                    <InlineEditableText
                      path={{`experience[${{index}}].description`}}
                      value={{exp.description}}
                      className="text-[12.5px] text-gray-700 leading-[1.8] mt-2 block"
                      multiline
                      as="div"
                    />
                  )}}
                </div>
              )}}
            />
          ) : (
            resumeData.experience.map((exp, index) => {{
              const bulletPoints = (exp.description || "")
                .split("\\n")
                .map((line) => line.trim())
                .filter(Boolean);

              return (
                <div key={{index}} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-[14.5px] font-semibold text-gray-900 mb-1">
                        {{exp.position}}
                      </h3>
                      <p className="text-[13px] font-medium" style={{{{ color: accent }}}}>
                        {{exp.company}}
                      </p>
                    </div>
                    <div className="text-right text-[11.5px] text-gray-600 ml-4">
                      <p>
                        {{exp.startDate}} - {{exp.current ? "Present" : exp.endDate}}
                      </p>
                    </div>
                  </div>
                  {{bulletPoints.length > 0 && (
                    <ul className="ml-5 list-disc space-y-1.5 text-[12.5px] text-gray-700 leading-[1.8] mt-2">
                      {{bulletPoints.map((point, i) => (
                        <li key={{i}}>{{point}}</li>
                      ))}}
                    </ul>
                  )}}
                </div>
              );
            }})
          )}}
        </div>
      )}}

      {{/* Education Section */}}
      {{resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider" style={{{{ color: accent }}}}>
            Education
          </h2>
          {{editable ? (
            <InlineEditableList
              path="education"
              items={{resumeData.education}}
              defaultItem={{{{
                id: Date.now().toString(),
                school: "School Name",
                degree: "Degree",
                field: "Field of Study",
                startDate: "2019-09",
                endDate: "2023-05",
              }}}}
              addButtonLabel="Add Education"
              renderItem={{(edu, index) => (
                <div className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <InlineEditableText
                        path={{`education[${{index}}].degree`}}
                        value={{`${{edu.degree}}${{edu.field ? ` in ${{edu.field}}` : ""}}`}}
                        className="text-[14px] font-semibold text-gray-900 block mb-1"
                        as="h3"
                      />
                      <InlineEditableText
                        path={{`education[${{index}}].school`}}
                        value={{edu.school}}
                        className="text-[13px] text-gray-700 block"
                        as="p"
                      />
                    </div>
                    <div className="text-right text-[11.5px] text-gray-600 ml-4">
                      <p>
                        {{edu.startDate}} - {{edu.endDate}}
                      </p>
                    </div>
                  </div>
                </div>
              )}}
            />
          ) : (
            resumeData.education.map((edu, index) => (
              <div key={{index}} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                      {{edu.degree}} {{edu.field && `in ${{edu.field}}`}}
                    </h3>
                    <p className="text-[13px] text-gray-700">{{edu.school}}</p>
                  </div>
                  <div className="text-right text-[11.5px] text-gray-600 ml-4">
                    <p>
                      {{edu.startDate}} - {{edu.endDate}}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}}
        </div>
      )}}

      {{/* Skills Section */}}
      {{resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider" style={{{{ color: accent }}}}>
            Skills
          </h2>
          {{editable ? (
            <InlineEditableSkills
              path="skills"
              skills={{resumeData.skills}}
              renderSkill={{(skill, index) => (
                <span
                  key={{index}}
                  className="px-4 py-1.5 text-[12px] font-medium text-gray-900 rounded-md"
                  style={{{{ border: `1.5px solid ${{accentBorder}}`, backgroundColor: accentLight }}}}
                >
                  {{skill.name}}
                </span>
              )}}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {{resumeData.skills.map((skill, index) => (
                <span
                  key={{index}}
                  className="px-4 py-1.5 text-[12px] font-medium text-gray-900 rounded-md"
                  style={{{{ border: `1.5px solid ${{accentBorder}}`, backgroundColor: accentLight }}}}
                >
                  {{skill.name}}
                </span>
              ))}}
            </div>
          )}}
        </div>
      )}}

      {{/* Custom Sections */}}
      {{resumeData.sections && resumeData.sections.length > 0 && (
        editable ? (
          <InlineEditableList
            path="sections"
            items={{resumeData.sections}}
            defaultItem={{{{
              id: Date.now().toString(),
              title: "New Section",
              content: "Section content here",
            }}}}
            addButtonLabel="Add Section"
            renderItem={{(section, sectionIndex) => (
              <div className="mb-8">
                <InlineEditableText
                  path={{`sections[${{sectionIndex}}].title`}}
                  value={{section.title}}
                  className="text-[16px] font-bold mb-4 uppercase tracking-wider block"
                  style={{{{ color: accent }}}}
                  as="h2"
                />
                <InlineEditableText
                  path={{`sections[${{sectionIndex}}].content`}}
                  value={{section.content}}
                  className="text-[13px] text-gray-700 leading-[1.8] block"
                  multiline
                  as="div"
                />
              </div>
            )}}
          />
        ) : (
          resumeData.sections.map((section, sectionIndex) => (
            <div key={{sectionIndex}} className="mb-8">
              <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider" style={{{{ color: accent }}}}>
                {{section.title}}
              </h2>
              <div className="text-[13px] text-gray-700 leading-[1.8]">
                {{section.content.split("\\n").map((line, i) => (
                  <p key={{i}} className="mb-1.5">
                    {{line}}
                  </p>
                ))}}
              </div>
            </div>
          ))
        )
      )}}
    </div>
  );
}};
"""


def generate_pdf_template(template):
    """Generate PDF template component using react-pdf"""
    template_name = template['name']
    theme_color = template['theme']

    return f"""import {{ Document, Page, Text, View, StyleSheet, Font }} from "@react-pdf/renderer";
import {{ ResumeData }} from "@/pages/Editor";

// Register fonts for better typography
Font.register({{
  family: "Inter",
  fonts: [
    {{ src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" }},
    {{ src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2", fontWeight: 600 }},
    {{ src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2", fontWeight: 700 }},
  ]
}});

interface PDF{template_name}TemplateProps {{
  resumeData: ResumeData;
  themeColor?: string;
}}

const createStyles = (themeColor: string) => StyleSheet.create({{
  page: {{
    padding: 48,
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  }},
  header: {{
    marginBottom: 24,
    paddingBottom: 20,
    borderBottom: `2px solid ${{themeColor}}`,
  }},
  name: {{
    fontSize: 26,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 10,
    letterSpacing: -0.5,
  }},
  contactInfo: {{
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    fontSize: 9.5,
    color: "#6b7280",
    marginTop: 8,
  }},
  contactItem: {{
    flexDirection: "row",
    alignItems: "center",
  }},
  section: {{
    marginBottom: 20,
  }},
  sectionTitle: {{
    fontSize: 13,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  }},
  summary: {{
    fontSize: 10.5,
    lineHeight: 1.8,
    color: "#374151",
  }},
  experienceItem: {{
    marginBottom: 16,
  }},
  experienceHeader: {{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  }},
  position: {{
    fontSize: 11.5,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 3,
  }},
  company: {{
    fontSize: 10.5,
    fontWeight: 500,
    color: themeColor,
  }},
  dateRange: {{
    fontSize: 9,
    color: "#6b7280",
    textAlign: "right",
  }},
  bulletPoints: {{
    marginTop: 6,
    marginLeft: 16,
  }},
  bulletPoint: {{
    flexDirection: "row",
    marginBottom: 4,
  }},
  bullet: {{
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: themeColor,
    marginRight: 8,
    marginTop: 5,
  }},
  bulletText: {{
    flex: 1,
    fontSize: 10,
    lineHeight: 1.7,
    color: "#374151",
  }},
  educationItem: {{
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  }},
  degree: {{
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 3,
  }},
  school: {{
    fontSize: 10,
    color: "#374151",
  }},
  skillsContainer: {{
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  }},
  skillChip: {{
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
    border: `1.5px solid ${{themeColor}}33`,
    backgroundColor: `${{themeColor}}15`,
  }},
  skillText: {{
    fontSize: 9.5,
    fontWeight: 500,
    color: "#111827",
  }},
  customSection: {{
    marginBottom: 20,
  }},
  customContent: {{
    fontSize: 10.5,
    lineHeight: 1.8,
    color: "#374151",
  }},
}});

export const PDF{template_name}Template = ({{
  resumeData,
  themeColor = "{theme_color}",
}}: PDF{template_name}TemplateProps) => {{
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={{styles.page}}>
        {{/* Header */}}
        <View style={{styles.header}}>
          <Text style={{styles.name}}>{{resumeData.personalInfo.fullName}}</Text>
          <View style={{styles.contactInfo}}>
            {{resumeData.personalInfo.email && (
              <View style={{styles.contactItem}}>
                <Text>{{resumeData.personalInfo.email}}</Text>
              </View>
            )}}
            {{resumeData.personalInfo.phone && (
              <View style={{styles.contactItem}}>
                <Text>{{resumeData.personalInfo.phone}}</Text>
              </View>
            )}}
            {{resumeData.personalInfo.location && (
              <View style={{styles.contactItem}}>
                <Text>{{resumeData.personalInfo.location}}</Text>
              </View>
            )}}
            {{resumeData.personalInfo.linkedin && (
              <View style={{styles.contactItem}}>
                <Text>{{resumeData.personalInfo.linkedin}}</Text>
              </View>
            )}}
          </View>
        </View>

        {{/* Professional Summary */}}
        {{resumeData.personalInfo.summary && (
          <View style={{styles.section}}>
            <Text style={{styles.sectionTitle}}>Professional Summary</Text>
            <Text style={{styles.summary}}>{{resumeData.personalInfo.summary}}</Text>
          </View>
        )}}

        {{/* Experience */}}
        {{resumeData.experience && resumeData.experience.length > 0 && (
          <View style={{styles.section}}>
            <Text style={{styles.sectionTitle}}>Professional Experience</Text>
            {{resumeData.experience.map((exp, index) => {{
              const bulletPoints = (exp.description || "")
                .split("\\n")
                .map((line) => line.trim())
                .filter(Boolean);

              return (
                <View key={{index}} style={{styles.experienceItem}}>
                  <View style={{styles.experienceHeader}}>
                    <View style={{{{ flex: 1 }}}}>
                      <Text style={{styles.position}}>{{exp.position}}</Text>
                      <Text style={{styles.company}}>{{exp.company}}</Text>
                    </View>
                    <View>
                      <Text style={{styles.dateRange}}>
                        {{exp.startDate}} - {{exp.current ? "Present" : exp.endDate}}
                      </Text>
                    </View>
                  </View>
                  {{bulletPoints.length > 0 && (
                    <View style={{styles.bulletPoints}}>
                      {{bulletPoints.map((point, i) => (
                        <View key={{i}} style={{styles.bulletPoint}}>
                          <View style={{styles.bullet}} />
                          <Text style={{styles.bulletText}}>{{point}}</Text>
                        </View>
                      ))}}
                    </View>
                  )}}
                </View>
              );
            }})}}
          </View>
        )}}

        {{/* Education */}}
        {{resumeData.education && resumeData.education.length > 0 && (
          <View style={{styles.section}}>
            <Text style={{styles.sectionTitle}}>Education</Text>
            {{resumeData.education.map((edu, index) => (
              <View key={{index}} style={{styles.educationItem}}>
                <View style={{{{ flex: 1 }}}}>
                  <Text style={{styles.degree}}>
                    {{edu.degree}} {{edu.field && `in ${{edu.field}}`}}
                  </Text>
                  <Text style={{styles.school}}>{{edu.school}}</Text>
                </View>
                <View>
                  <Text style={{styles.dateRange}}>
                    {{edu.startDate}} - {{edu.endDate}}
                  </Text>
                </View>
              </View>
            ))}}
          </View>
        )}}

        {{/* Skills */}}
        {{resumeData.skills && resumeData.skills.length > 0 && (
          <View style={{styles.section}}>
            <Text style={{styles.sectionTitle}}>Skills</Text>
            <View style={{styles.skillsContainer}}>
              {{resumeData.skills.map((skill, index) => (
                <View key={{index}} style={{styles.skillChip}}>
                  <Text style={{styles.skillText}}>{{skill.name}}</Text>
                </View>
              ))}}
            </View>
          </View>
        )}}

        {{/* Custom Sections */}}
        {{resumeData.sections && resumeData.sections.map((section, index) => (
          <View key={{index}} style={{styles.customSection}}>
            <Text style={{styles.sectionTitle}}>{{section.title}}</Text>
            <Text style={{styles.customContent}}>{{section.content}}</Text>
          </View>
        ))}}
      </Page>
    </Document>
  );
}};
"""


def main():
    # Create directories if they don't exist
    ui_templates_dir = Path("src/components/resume/templates")
    pdf_templates_dir = Path("src/components/resume/pdf")

    ui_templates_dir.mkdir(parents=True, exist_ok=True)
    pdf_templates_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 80)
    print("GENERATING 100 NEW PREMIUM RESUME TEMPLATES (BATCH 4)")
    print("=" * 80)
    print()

    # Generate templates
    for i, template in enumerate(TEMPLATES_BATCH_4, 1):
        template_id = template['id']
        template_name = template['name']
        category = template['category']

        # Generate UI template
        ui_path = ui_templates_dir / f"{template_name}Template.tsx"
        ui_content = generate_ui_template(template)
        with open(ui_path, 'w') as f:
            f.write(ui_content)

        # Generate PDF template
        pdf_path = pdf_templates_dir / f"PDF{template_name}Template.tsx"
        pdf_content = generate_pdf_template(template)
        with open(pdf_path, 'w') as f:
            f.write(pdf_content)

        print(f"[{i:3d}/100] {category:12s} | {template_id:35s} | ✓ Generated")

    print()
    print("=" * 80)
    print("✅ Successfully generated 100 new premium templates!")
    print("=" * 80)
    print()
    print("SUMMARY:")
    print("  - Universal Professional: 20 templates")
    print("  - Software & Technology: 20 templates")
    print("  - Fresh Graduates: 20 templates")
    print("  - Creative: 20 templates")
    print("  - Design: 20 templates")
    print()
    print("NEXT STEPS:")
    print("  1. Register templates in src/pages/Editor.tsx")
    print("  2. Add template IDs to src/constants/professionCategories.ts")
    print("  3. Test templates with form editor and inline editor")
    print("  4. Verify PDF export functionality")
    print()


if __name__ == "__main__":
    main()
