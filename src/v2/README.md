# Resume Builder V2 - Config-Driven Architecture

## Overview

V2 is a complete redesign of the resume builder with a **config-driven architecture** that enables:

1. **Universal Data Model** - Same data structure for all templates
2. **Template-Specific Visualization** - Each template renders data uniquely
3. **Dynamic Form Generation** - Forms generated from section registry
4. **AI-Ready** - Configs can be generated from screenshots
5. **Future Scalability** - Easy to add new templates, sections, and variants

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USER                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           BuilderV2 Page                                 │
│  ┌─────────────────────────┐    ┌─────────────────────────────────────┐ │
│  │     DynamicForm         │    │      Template Component             │ │
│  │  (Config-Driven)        │◄──►│   (e.g., ExecutiveSplit)           │ │
│  │                         │    │                                     │ │
│  │  Reads: SECTION_REGISTRY│    │  Reads: TemplateConfig              │ │
│  │  Writes: V2ResumeData   │    │  Renders: V2ResumeData              │ │
│  └─────────────────────────┘    └─────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            ┌───────────┐   ┌───────────┐   ┌───────────┐
            │ V2Resume  │   │ Template  │   │  Section  │
            │   Data    │   │  Config   │   │ Registry  │
            └───────────┘   └───────────┘   └───────────┘
```

## Directory Structure

```
src/v2/
├── types/
│   ├── resumeData.ts      # Universal data model (V2ResumeData)
│   ├── templateConfig.ts  # Template configuration types
│   ├── config.ts          # Legacy types (deprecated)
│   └── index.ts           # Type exports
│
├── registry/
│   ├── sectionRegistry.ts # All section definitions
│   └── index.ts
│
├── utils/
│   ├── dataConverter.ts   # V1 ↔ V2 conversion
│   └── index.ts
│
├── config/
│   ├── defaultConfig.ts   # Default template config
│   └── templates/         # Individual template configs
│       ├── executive-split.ts
│       ├── minimal.ts
│       └── index.ts
│
├── templates/             # (Future) Template components
│   ├── executive-split/
│   │   ├── config.ts
│   │   ├── Template.tsx
│   │   └── index.ts
│   └── index.ts
│
├── components/
│   ├── form/              # (Future) Config-driven form
│   │   ├── DynamicForm.tsx
│   │   └── sections/
│   ├── preview/           # Section renderers
│   │   └── sections/
│   └── shared/
│
├── hooks/
│   ├── useTemplateConfig.ts
│   └── useResumeData.ts   # (Future)
│
├── pages/
│   ├── BuilderV2.tsx
│   └── DashboardV2.tsx
│
├── data/
│   ├── mockData.ts        # V1 format mock data
│   └── sampleData.ts      # V2 format sample data
│
└── index.ts               # Main exports
```

## Core Concepts

### 1. V2ResumeData (Universal Data Model)

All resumes use the same data structure. Templates only change visualization.

```typescript
interface V2ResumeData {
  version: '2.0';
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages?: LanguageItem[];
  achievements?: AchievementItem[];
  strengths?: StrengthItem[];
  certifications?: CertificationItem[];
  projects?: ProjectItem[];
  // ... more sections
  customSections?: CustomSection[];
  settings?: ResumeSettings;
}
```

### 2. Section Registry

Defines all available sections with their form fields and variants.

```typescript
const SECTION_REGISTRY = {
  experience: {
    type: 'experience',
    defaultTitle: 'Experience',
    dataKey: 'experience',
    formFields: [
      { key: 'position', label: 'Job Title', type: 'text', required: true },
      { key: 'company', label: 'Company', type: 'text', required: true },
      { key: 'bulletPoints', label: 'Achievements', type: 'array' },
      // ...
    ],
    variants: [
      { id: 'standard', name: 'Standard' },
      { id: 'timeline', name: 'Timeline' },
      { id: 'compact', name: 'Compact' },
    ],
  },
  languages: {
    type: 'languages',
    defaultTitle: 'Languages',
    dataKey: 'languages',
    formFields: [
      { key: 'language', label: 'Language', type: 'text', required: true },
      { key: 'proficiency', label: 'Proficiency', type: 'select', options: [...] },
    ],
    variants: [
      { id: 'list', name: 'List' },
      { id: 'bars', name: 'Progress Bars' },
    ],
  },
  // ... all other sections
};
```

### 3. Template Config

Each template has a configuration that defines its appearance.

```typescript
interface V2TemplateConfig {
  id: string;
  name: string;
  
  // Styling
  typography: TypographyConfig;
  spacing: SpacingConfig;
  layout: LayoutConfig;
  colors: ColorConfig;
  
  // Section configs
  header: HeaderConfig;
  skills: SkillsConfig;
  experience: ExperienceConfig;
  education: EducationConfig;
  
  // Section order & visibility
  sections: TemplateSectionConfig[];
}
```

### 4. Template Component

Each template has its own React component that uses the config.

```tsx
// templates/executive-split/Template.tsx
export const ExecutiveSplitTemplate: React.FC<TemplateProps> = ({
  resumeData,
  config,
  editable,
}) => {
  return (
    <div style={getContainerStyles(config)}>
      <HeaderRenderer config={config} data={resumeData.personalInfo} />
      
      {config.layout.type === 'two-column-right' && (
        <TwoColumnLayout config={config}>
          <MainColumn>
            <ExperienceRenderer 
              items={resumeData.experience}
              variant={config.experience.variant}
              editable={editable}
            />
          </MainColumn>
          <Sidebar>
            <SkillsRenderer 
              items={resumeData.skills}
              variant={config.skills.variant}
              editable={editable}
            />
          </Sidebar>
        </TwoColumnLayout>
      )}
    </div>
  );
};
```

## How Form & Preview Stay in Sync

```
┌─────────────────────────────────────────────────────────────────┐
│                     Template Config                              │
│  sections: [                                                     │
│    { type: 'experience', enabled: true, variant: 'standard' },  │
│    { type: 'skills', enabled: true, variant: 'pills' },         │
│    { type: 'languages', enabled: true, variant: 'bars' },       │
│  ]                                                               │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│      DynamicForm        │     │   Template Component    │
│                         │     │                         │
│  for each enabled       │     │  for each enabled       │
│  section in config:     │     │  section in config:     │
│    render form fields   │     │    render with variant  │
│    from SECTION_REGISTRY│     │    from config          │
└─────────────────────────┘     └─────────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              ▼
                    ┌─────────────────┐
                    │   V2ResumeData  │
                    │   (shared)      │
                    └─────────────────┘
```

## Adding a New Section Type

1. **Add to resumeData.ts**:
```typescript
export interface NewSectionItem {
  id: string;
  // ... fields
}

export interface V2ResumeData {
  // ...
  newSection?: NewSectionItem[];
}
```

2. **Add to sectionRegistry.ts**:
```typescript
newSection: {
  type: 'newSection',
  defaultTitle: 'New Section',
  dataKey: 'newSection',
  formFields: [...],
  variants: [...],
}
```

3. **Create form component** (optional, can use generic):
```typescript
// components/form/sections/NewSectionForm.tsx
```

4. **Create renderer component**:
```typescript
// components/preview/sections/NewSectionRenderer.tsx
```

5. **Add to template configs** that should include it.

## Adding a New Template

1. **Create template folder**:
```
templates/new-template/
├── config.ts
├── Template.tsx
└── index.ts
```

2. **Define config**:
```typescript
// config.ts
export const newTemplateConfig: V2TemplateConfig = {
  id: 'new-template',
  name: 'New Template',
  layout: { type: 'single-column' },
  sections: [
    { type: 'header', enabled: true },
    { type: 'experience', enabled: true, variant: 'timeline' },
    // ...
  ],
  // ...
};
```

3. **Create component**:
```typescript
// Template.tsx
export const NewTemplate: React.FC<TemplateProps> = ({ resumeData, config }) => {
  // Render using config
};
```

4. **Register in template registry**.

## AI Integration (Future)

AI can generate template configs from screenshots:

```typescript
// AI analyzes screenshot and generates:
const aiConfig: AITemplateConfig = {
  layout: 'two-column-right',
  primaryColor: '#0891b2',
  headerVariant: 'left-aligned',
  sections: [
    { type: 'experience', variant: 'timeline' },
    { type: 'skills', variant: 'pills' },
  ],
};

// System expands to full config:
const fullConfig = expandAIConfig(aiConfig);
```

## Migration from V1

Use the data converter:

```typescript
import { convertV1ToV2, convertV2ToV1 } from '@/v2/utils';

// Convert v1 data to v2
const v2Data = convertV1ToV2(v1ResumeData);

// Convert back if needed
const v1Data = convertV2ToV1(v2Data);
```

## Next Steps

1. **Phase 2**: Create form section components
2. **Phase 3**: Make section renderers variant-aware
3. **Phase 4**: Create template component pattern
4. **Phase 5**: Integrate into builder
5. **Phase 6**: AI config generation
