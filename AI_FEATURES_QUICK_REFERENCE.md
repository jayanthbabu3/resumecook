# ResumeCook AI Features - Quick Reference

## Key Files by Feature

### Core AI Services
- **Primary AI Service:** `/src/services/aiService.ts`
  - enhance, chat, tailor, parse, analyze operations
  
### Chat & Conversation
- **Chat V2 (Production):** `/src/v2/services/chatServiceV2.ts`
  - Action-based, validated responses, retry logic
  
- **Chat V1 (Legacy):** `/src/v2/services/chatService.ts`
  - Data-based updates, merge strategy
  
- **Chat Hook:** `/src/v2/hooks/useChatWithResumeV2.ts`
  - React integration, state management
  
- **Chat Component:** `/src/v2/components/ChatWithResume.tsx`
  - UI implementation

### Action System
- **Action Types:** `/src/v2/types/chatActions.ts`
  - 25+ action definitions, variants list
  
- **Action Validator:** `/src/v2/services/actionValidator.ts`
  - Request/response validation
  
- **Action Executor:** `/src/v2/services/actionExecutor.ts`
  - Atomic execution, ID generation

### Resume Analysis
- **Resume Parser:** `/src/v2/services/resumeParserService.ts`
  - Parse PDF/DOCX/TXT files
  
- **ATS Service:** `/src/v2/services/atsService.ts`
  - ATS score calculation
  
- **Chat Types:** `/src/v2/types/chat.ts`
  - Resume updates, variant changes

### Interview & Voice
- **Interview Service:** `/src/v2/services/interviewService.ts`
  - Mock interview generation & feedback
  
- **Voice Hook:** `/src/v2/hooks/useDeepgramVoice.ts`
  - Speech-to-text via Deepgram WebSocket
  
- **Interview Component:** `/src/v2/components/MockInterviewModal.tsx`
  - Interview UI

### Integrations
- **LinkedIn Service:** `/src/v2/services/linkedinService.ts`
  - LinkedIn profile import
  
- **Streaming Hook:** `/src/v2/hooks/useStreamingResumeUpdate.ts`
  - Real-time updates

### Configuration
- **API Config:** `/src/config/api.ts`
  - All endpoints, token management, headers

---

## Quick API Reference

### Main Endpoints
```
Resume Enhancement
POST /api/ai/enhance-resume
POST /api/enhance-sections/stream
POST /api/enhance-sections/batch

Chat
POST /api/ai/chat-v2 (Production)
POST /api/ai/chat (Legacy)

Parsing & Analysis
POST /api/ai/parse-resume
POST /api/ai/ats-score
POST /api/ai/analyze

Job Operations
POST /api/ai/generate-resume-from-job
POST /api/ai/tailor-resume-for-job
POST /api/tailor-sections/analyze-job
POST /api/tailor-sections/section
POST /api/tailor-sections/suggest-skills
POST /api/tailor-sections/match-score
POST /api/tailor-sections/full

Interview
POST /api/interview/generate-questions
POST /api/interview/analyze-answer
POST /api/interview/generate-report

Voice & Integration
WS /api/speech/stream
POST /api/linkedin/import

Content Generation
POST /api/ai/generate-bullets
POST /api/ai/generate-summary
```

---

## Feature Ownership

| Feature | Main Files | Type |
|---------|-----------|------|
| Chat Enhancement | chatServiceV2, actionValidator, actionExecutor | Action-based |
| Resume Parsing | resumeParserService | File upload |
| Interview Prep | interviewService, MockInterviewModal | Q&A |
| Voice Input | useDeepgramVoice, VoiceInputBar | Speech-to-text |
| ATS Scoring | atsService | Analysis |
| Job Matching | tailor endpoints | Job analysis |
| LinkedIn Import | linkedinService | Data import |

---

## Action Types (25+)

**Section Management (5):** toggleSection, reorderSections, changeSectionVariant, renameSection, moveSectionToColumn

**Personal Info (2):** updatePersonalInfo, updatePersonalInfoBulk

**Content Arrays (5):** addItem, updateItem, removeItem, reorderItems, replaceAllItems

**Bullets (4):** addBullet, updateBullet, removeBullet, replaceBullets

**Settings (4):** updateSetting, updateThemeColor, updateBackgroundColor, updateHeaderConfig

**Config (1):** updateSectionConfig

**Custom Sections (4):** addCustomSection, updateCustomSectionTitle, addCustomSectionItem, removeCustomSection

**Batch (1):** batch

---

## Content Sections (17)

personalInfo, experience, education, skills, languages, certifications, projects, achievements, awards, publications, volunteer, speaking, patents, interests, references, courses, strengths, customSections

---

## Section Variants (50+)

**Header (9):** left-aligned, centered, split, banner, minimal, photo-left, photo-right, compact, modern-minimal

**Skills (16):** pills, tags, list, grouped, bars, dots, columns, inline, compact, modern, table, category-lines, bordered-tags, pills-accent, inline-dots, boxed

**Experience (11):** standard, compact, detailed, timeline, card, minimal, modern, academic, icon-accent, icon-clean, dots-timeline

**Education (8):** standard, compact, detailed, timeline, card, minimal, academic, modern

**Projects (8):** standard, cards, compact, grid, timeline, showcase, minimal, detailed

---

## Important TypeScript Interfaces

```typescript
// Main resume data structure
V2ResumeData {
  personalInfo, experience, education, skills, languages,
  certifications, projects, achievements, awards, publications,
  volunteer, speaking, patents, interests, references, courses,
  strengths, customSections, settings, config
}

// Chat action (25+ types)
ChatAction {
  type: string,
  ...actionSpecificFields
}

// Chat response
ChatActionResponse {
  message: string,
  actions: ChatAction[],
  followUpQuestion?: string,
  suggestedQuestions?: string[]
}

// Interview feedback
AnswerFeedback {
  overallScore: number,
  scores: { specificity, structure, relevance, completeness, impact },
  strengths: string[],
  improvements: string[],
  suggestedAnswer?: string,
  followUpQuestion?: string
}

// Voice transcript callback
onTranscript(transcript: string, isFinal: boolean)
```

---

## Key Configuration

**Environment Variables:**
- `VITE_API_BASE_URL` - Backend URL (required)
- `VITE_API_KEY` - Optional API key
- `GROQ_API_KEY` - Groq LLM (primary)
- `OPENAI_API_KEY` - OpenAI LLM (fallback)
- `APIFY_API_KEY` - LinkedIn scraping

**Token Management:**
- AccessToken (short-lived JWT)
- RefreshToken (long-lived)
- Auto-refresh on 401 Unauthorized

**Retry Logic:**
- Chat V2: 2 retries, 1.5s delay
- Chat V1: 2 retries, 1s delay
- Parser: Single attempt
- Interview: Single attempt per question

---

## Common Patterns

### Using Chat V2 (Production)
```typescript
import { sendChatMessageV2 } from '@/v2/services/chatServiceV2';

const response = await sendChatMessageV2(
  message,
  conversationHistory,
  context
);

if (response.success) {
  // Execute actions
  const result = executeChatActions(response.actions, context);
}
```

### Parsing Resume File
```typescript
import { parseResumeFile } from '@/v2/services/resumeParserService';

const result = await parseResumeFile(file);
if (result.success) {
  const resumeData = result.data;
}
```

### Interview Generation
```typescript
import { generateInterviewQuestions } from '@/v2/services/interviewService';

const { success, questions } = await generateInterviewQuestions(
  resumeData,
  {
    interviewType: 'mixed',
    jobDescription: 'optional',
    questionCount: 8
  }
);
```

### Voice Input
```typescript
import { useDeepgramVoice } from '@/v2/hooks/useDeepgramVoice';

const voice = useDeepgramVoice({
  onTranscript: (text, isFinal) => console.log(text),
  onError: (err) => console.error(err),
  onAudioLevel: (level) => updateVisualization(level)
});

await voice.startListening();
```

---

## Subscription Requirements

- **Free Tier:** Basic editing, template selection, resume upload
- **Pro Tier:** Chat V2, Interview prep, Advanced ATS analysis, Job tailoring
- Features require checking subscription status before execution

---

## Data Flow

1. **User Input** → Chat/Voice/Upload
2. **Frontend Validation** → Type checking, file validation
3. **API Call** → Send to Cloud Run backend
4. **Backend Processing** → LLM (Groq/OpenAI)
5. **Response Validation** → Action validator
6. **Action Execution** → Action executor
7. **State Update** → Parent component callbacks
8. **UI Render** → Section highlighting, animations

---

## Error Handling Strategy

1. **Client Validation:** Type checking, format validation
2. **API Errors:** Network retry, 401 token refresh, 429 rate limiting
3. **Validation Errors:** Automatic retry with error feedback
4. **Execution Errors:** Partial success (some actions succeed)
5. **User Messaging:** Friendly error messages with context

---

## Performance Notes

- Chat messages are limited to last 6 for context window
- Resume updates use replace strategy (not merge) for arrays
- Audio streaming uses PCM Int16 encoding at 16kHz
- Action validation happens client-side before execution
- Section highlighting auto-clears after 3 seconds

---

## Deployment

**Frontend:** Vercel (https://resumecook.com)
**Backend:** Cloud Run (us-central1)
**Database:** MongoDB Atlas
**Storage:** Cloud Storage
**Logging:** Better Stack (Logtail)

