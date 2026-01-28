# ResumeCook AI/LLM Features - Complete Documentation Index

This repository contains comprehensive AI/LLM integration for intelligent resume building, job matching, interview preparation, and conversational enhancement.

## Documentation Files

1. **AI_FEATURES_ANALYSIS.md** (651 lines, 18KB)
   - Complete technical analysis of all AI features
   - 20 major sections with detailed implementation details
   - All API endpoints and response structures
   - Data types and interfaces
   - Security and error handling strategies

2. **AI_FEATURES_QUICK_REFERENCE.md** (330 lines, 8.6KB)
   - Quick lookup guide by feature
   - File locations and code examples
   - Common usage patterns
   - API endpoint cheat sheet
   - Configuration and deployment info

## Key AI Features Implemented

### 1. Chat with Resume (Production-Ready)
- **Chat V2 (Action-Based):** `/src/v2/services/chatServiceV2.ts`
  - 25+ atomic action types
  - Automatic validation and retry
  - 100% reliable execution
  - Requires Pro subscription

- **Legacy Chat V1:** `/src/v2/services/chatService.ts`
  - Data-based updates
  - For backward compatibility

### 2. Resume Content Analysis
- **ATS Scoring:** Applicant Tracking System compatibility analysis
- **Resume Parsing:** PDF/DOCX/TXT file parsing to structured data
- **Resume Analysis:** Strengths, weaknesses, recommendations

### 3. Job Matching & Tailoring
- **Job Description Analysis:** Extract job requirements
- **Resume-to-Job Matching:** Match score and gap analysis
- **Skill Suggestions:** Recommend missing skills
- **Section-by-Section Tailoring:** Modify specific sections for jobs

### 4. Interview Preparation
- **Question Generation:** Behavioral, technical, experience-based
- **Answer Feedback:** Scored on specificity, structure, relevance, completeness, impact
- **Interview Report:** Readiness assessment (not_ready → interview_ready)
- **Mock Interview UI:** Full interview simulation with timer and scoring

### 5. Content Generation
- **Bullet Point Generation:** Professional bullets from descriptions
- **Summary Generation:** Professional summary from profile
- **Resume Enhancement:** Full resume enhancement with styling options

### 6. Voice & Speech-to-Text
- **Deepgram Integration:** Real-time speech-to-text via WebSocket
- **Nova-2 Model:** High-accuracy transcription
- **Audio Visualization:** Real-time audio level monitoring
- **Used in:** Interview practice, voice resume input

### 7. LinkedIn Integration
- **Profile Import:** LinkedIn URL → resume data conversion
- **URL Validation:** Regex-based validation
- **Automatic Parsing:** Extract experience, education, skills

### 8. Streaming & Real-Time Updates
- **Progress Streaming:** Real-time feedback during long operations
- **Batch Enhancements:** Multiple section updates simultaneously
- **Partial Results:** Progressive updates as available

## Architecture Highlights

### Action-Based Chat System (Innovation)
- AI returns **25+ validated action types** instead of raw data
- Each action is atomic and deterministic
- Client-side validation before execution
- Automatic retry with error feedback
- Partial success handling

### Content Sections (17 types)
personalInfo, experience, education, skills, languages, certifications, projects, achievements, awards, publications, volunteer, speaking, patents, interests, references, courses, strengths, customSections

### Section Display Variants (50+)
- **Header:** 9 variants (aligned, centered, split, banner, minimal, photo positions, compact, modern)
- **Skills:** 16 variants (pills, tags, list, grouped, bars, dots, columns, inline, table, badges, etc.)
- **Experience:** 11 variants (standard, compact, detailed, timeline, card, minimal, modern, academic, icon styles)
- **Education:** 8 variants
- **Projects:** 8 variants
- **Achievements:** 11 variants

### Validation System
- **Client-side:** Type checking, format validation, required fields
- **Server-side:** LLM response validation, JSON parsing
- **Smart Retry:** Failed validation triggers retry with error feedback
- **Partial Success:** Returns valid actions even on partial failure

## API Endpoints Summary

### AI Enhancement (3)
- `POST /api/ai/enhance-resume` - Full resume enhancement
- `POST /api/enhance-sections/stream` - Streaming updates
- `POST /api/enhance-sections/batch` - Batch processing

### Chat (2)
- `POST /api/ai/chat-v2` - Production (action-based)
- `POST /api/ai/chat` - Legacy (data-based)

### Analysis (3)
- `POST /api/ai/parse-resume` - Parse resume files
- `POST /api/ai/ats-score` - ATS compatibility
- `POST /api/ai/analyze` - Comprehensive analysis

### Job Operations (6)
- `POST /api/ai/generate-resume-from-job` - Generate from job description
- `POST /api/ai/tailor-resume-for-job` - Tailor to specific job
- `POST /api/tailor-sections/analyze-job` - Analyze job requirements
- `POST /api/tailor-sections/section` - Tailor specific section
- `POST /api/tailor-sections/suggest-skills` - Recommend skills
- `POST /api/tailor-sections/full` - Full tailoring

### Interview (3)
- `POST /api/interview/generate-questions` - Generate questions (8 default)
- `POST /api/interview/analyze-answer` - Score and feedback
- `POST /api/interview/generate-report` - Full report

### Voice & Integration (2)
- `WS /api/speech/stream` - Deepgram speech-to-text
- `POST /api/linkedin/import` - LinkedIn profile import

### Content Generation (2)
- `POST /api/ai/generate-bullets` - Bullet points
- `POST /api/ai/generate-summary` - Professional summary

## Backend Configuration

### LLM Providers
- **Groq API:** Primary LLM (GROQ_API_KEY)
- **OpenAI API:** Fallback provider (OPENAI_API_KEY)

### External Services
- **LinkedIn:** APIFY_API_KEY (for profile scraping)
- **Deepgram:** Speech-to-text (configured server-side)
- **MongoDB:** User data and resume storage
- **Cloud Storage:** Resume files and assets

### Deployment
- **Frontend:** Vercel (https://resumecook.com)
- **Backend:** Google Cloud Run (us-central1)
- **Database:** MongoDB Atlas
- **Logging:** Better Stack (Logtail)

## Security & Authentication

### Token Management
- **AccessToken:** Short-lived JWT (auto-refresh on 401)
- **RefreshToken:** Long-lived token (stored in localStorage)
- **Token Refresh:** Automatic on 401 Unauthorized
- **Header:** `Authorization: Bearer {token}`

### Rate Limiting
- **Chat V2:** 2 retries, 1.5s delay
- **Chat V1:** 2 retries, 1s delay
- **429 Handling:** Exponential backoff
- **User Messaging:** Friendly error messages

### Subscription Gating
- **Free:** Basic editing, templates, resume upload
- **Pro:** Chat V2, Interview prep, Job tailoring, Advanced ATS

## Development Guide

### Chat V2 Integration (Recommended)
```typescript
import { sendChatMessageV2 } from '@/v2/services/chatServiceV2';
import { executeChatActions } from '@/v2/services/chatServiceV2';

const response = await sendChatMessageV2(message, history, context);
if (response.success && response.actions.length > 0) {
  const result = executeChatActions(response.actions, context);
}
```

### Resume Parsing
```typescript
import { parseResumeFile } from '@/v2/services/resumeParserService';

const result = await parseResumeFile(file);
if (result.success) {
  const resumeData = result.data; // V2ResumeData
}
```

### Interview Generation
```typescript
import { generateInterviewQuestions, analyzeAnswer } from '@/v2/services/interviewService';

const { questions } = await generateInterviewQuestions(resumeData);
const { feedback } = await analyzeAnswer(question, answer);
```

### Voice Input
```typescript
import { useDeepgramVoice } from '@/v2/hooks/useDeepgramVoice';

const voice = useDeepgramVoice({
  onTranscript: (text, isFinal) => {},
  onError: (err) => {},
  onAudioLevel: (level) => {}
});
await voice.startListening();
```

## File Structure

```
src/
├── services/
│   └── aiService.ts              # Primary AI service facade
├── v2/
│   ├── services/
│   │   ├── chatServiceV2.ts       # Production chat (action-based)
│   │   ├── chatService.ts         # Legacy chat (data-based)
│   │   ├── actionValidator.ts     # Response validation
│   │   ├── actionExecutor.ts      # Action execution
│   │   ├── resumeParserService.ts # Resume parsing
│   │   ├── atsService.ts          # ATS scoring
│   │   ├── interviewService.ts    # Mock interview
│   │   └── linkedinService.ts     # LinkedIn import
│   ├── hooks/
│   │   ├── useChatWithResumeV2.ts # Chat state management
│   │   ├── useDeepgramVoice.ts    # Voice input
│   │   └── useStreamingResumeUpdate.ts # Streaming updates
│   ├── types/
│   │   ├── chat.ts                # Chat interfaces
│   │   ├── chatActions.ts         # Action definitions
│   │   ├── ats.ts                 # ATS types
│   │   └── resumeData.ts          # Resume data structure
│   └── components/
│       ├── ChatWithResume.tsx      # Chat UI
│       ├── MockInterviewModal.tsx  # Interview UI
│       └── VoiceInputBar.tsx       # Voice UI
└── config/
    └── api.ts                      # API configuration & endpoints
```

## Common Questions

**Q: When should I use Chat V2 vs Chat V1?**
A: Always use Chat V2 in production. It's more reliable with automatic validation and retry logic.

**Q: How do actions work?**
A: Chat returns validated action objects (25+ types) that modify resume atomically. Much safer than raw data updates.

**Q: What's the difference between resume parsing and LinkedIn import?**
A: Parsing = file upload (PDF/DOCX/TXT), LinkedIn = URL import from LinkedIn profile.

**Q: How is voice input used?**
A: Deepgram WebSocket for real-time transcription in interview practice and voice resume input.

**Q: How do I add a new feature?**
A: 1) Add action type to chatActions.ts, 2) Add validator in actionValidator.ts, 3) Add executor in actionExecutor.ts, 4) Update chat prompts in backend.

## Performance & Optimization

- Chat message history limited to last 6 for context window
- Resume array updates use replace (not merge) strategy
- Section highlights auto-clear after 3 seconds
- Audio streaming uses 4KB buffers at 16kHz sample rate
- Action validation happens client-side before execution
- Automatic token refresh prevents auth failures

## Monitoring & Logging

- **Better Stack (Logtail):** Cloud-based log aggregation
- **Local Logs:** `/logs/` directory (error.log, combined.log, http.log)
- **Chat Debugging:** Console logs with [Chat V2] prefix
- **Interview Debugging:** Console logs with [InterviewService] prefix
- **Voice Debugging:** Console logs with [Deepgram] prefix

## Next Steps

1. Read **AI_FEATURES_ANALYSIS.md** for comprehensive technical details
2. Use **AI_FEATURES_QUICK_REFERENCE.md** for quick lookups
3. Review `/src/v2/services/chatServiceV2.ts` for action-based chat implementation
4. Check `/src/config/api.ts` for all endpoints
5. Run `npm run dev` to test features locally

---

Created: January 28, 2025
Last Updated: January 28, 2025
Version: 1.0 (Complete Analysis)
