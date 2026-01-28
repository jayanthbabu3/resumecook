# ResumeCook AI Features - Comprehensive Analysis

## Overview
ResumeCook is a resume builder with extensive AI/LLM integration for intelligent resume enhancement, job matching, interview preparation, and conversational resume building. All AI endpoints are hosted on a Cloud Run backend at `https://resumecook-api-70255328091.us-central1.run.app`.

---

## 1. CORE AI SERVICES

### 1.1 Primary AI Service (`src/services/aiService.ts`)
Main client-side AI service providing high-level API interfaces:

**Key Functions:**
- `enhanceResume()` - AI-powered resume enhancement with multiple styling options
- `getATSScore()` - ATS compatibility analysis with keyword detection
- `chat()` - Conversational chat with resume context
- `generateFromJob()` - Generate resume from job description
- `tailorForJob()` - Tailor resume to specific job
- `enhanceSection()` - Enhance individual resume sections
- `generateBulletPoints()` - Generate professional bullet points from description
- `generateSummary()` - Generate professional summary based on profile
- `analyzeResume()` - Comprehensive resume analysis with strengths/weaknesses

**API Endpoints:**
```
/api/ai/enhance-resume
/api/ai/ats-score
/api/ai/chat
/api/ai/generate-resume-from-job
/api/ai/tailor-resume-for-job
/api/ai/enhance-section
/api/ai/generate-bullets
/api/ai/generate-summary
/api/ai/analyze
```

---

## 2. CHAT WITH RESUME - ACTION-BASED ARCHITECTURE

### 2.1 Chat Service V2 (`src/v2/services/chatServiceV2.ts`) - Production Implementation
**Advanced action-based chat system for 100% reliable execution:**

**Core Features:**
- Action-based responses (not free-form data updates)
- Automatic retry with validation error feedback
- 2 retry attempts with 1.5s delay between retries
- Response validation and partial failure handling
- Returns validated actions + suggested questions + follow-up prompts

**API Endpoint:**
```
POST /api/ai/chat-v2
```

**Request Body:**
```json
{
  "message": "user message",
  "conversationHistory": [
    { "role": "user|assistant", "content": "..." }
  ],
  "currentResumeData": { /* V2ResumeData */ },
  "retryWithErrors": "error feedback from validation"
}
```

**Response Structure:**
```typescript
{
  success: boolean,
  response: string | ChatActionResponse,  // AI response with actions
  message?: string
}
```

### 2.2 Chat Service V1 (`src/v2/services/chatService.ts`) - Legacy
Original chat service with data-based updates (replaced by V2):
- Sends message + resume context
- Returns resume data updates directly
- Data validation and sanitization
- Supports variant changes for section styling

**API Endpoint:**
```
POST /api/ai/chat
```

**Functions:**
- `sendChatMessage()` - Send message and get resume updates
- `mergeResumeUpdates()` - Merge AI updates into current data
- `mergeConfigUpdates()` - Apply config changes
- `validateAndSanitizeUpdates()` - Ensure data integrity

---

## 3. ACTION-BASED CHAT SYSTEM

### 3.1 Chat Actions Types (`src/v2/types/chatActions.ts`)
**Comprehensive action system for atomic, reliable resume modifications:**

**Action Categories:**

#### Section Management
- `toggleSection` - Show/hide sections
- `reorderSections` - Change section order
- `changeSectionVariant` - Change display style (50+ variants available)
- `renameSection` - Rename/relabel sections
- `moveSectionToColumn` - Two-column layout management

#### Personal Info
- `updatePersonalInfo` - Single field update
- `updatePersonalInfoBulk` - Batch personal info updates

#### Content Array Operations
- `addItem` - Add experience, education, skills, etc.
- `updateItem` - Update existing items
- `removeItem` - Delete items
- `reorderItems` - Reorder items within section
- `replaceAllItems` - Bulk replace entire section

#### Experience-Specific
- `addBullet` - Add bullet point
- `updateBullet` - Update bullet
- `removeBullet` - Remove bullet
- `replaceBullets` - Replace all bullets

#### Settings & Config
- `updateSetting` - Resume-level settings (socialLinks, photo, dateFormat)
- `updateThemeColor` - Change colors (primary, secondary, backgrounds)
- `updateHeaderConfig` - Header customization
- `updateSectionConfig` - Section display options

#### Custom Sections
- `addCustomSection` - Create new sections
- `updateCustomSectionTitle` - Rename custom section
- `addCustomSectionItem` - Add items to custom section
- `removeCustomSection` - Delete custom section

#### Batch Operations
- `batch` - Execute multiple actions sequentially

### 3.2 Action Validator (`src/v2/services/actionValidator.ts`)
**Robust validation ensuring 100% reliable action execution:**

**Validation Features:**
- Type checking for all action fields
- Content section validation (15+ section types)
- Personal info field validation (16 fields)
- Variant name validation (50+ variants per section)
- Hex color validation for theme updates
- Recursive batch action validation
- Detailed error messages with paths

**Key Functions:**
- `validateChatResponse()` - Validate complete AI response
- `parseAndValidateResponse()` - Parse JSON + validate
- `createRetryPrompt()` - Generate error feedback for retry

### 3.3 Action Executor (`src/v2/services/actionExecutor.ts`)
**Atomic execution engine with automatic ID generation and conflict prevention:**

Executes validated actions on resume data:
- Generates unique IDs for new items
- Prevents duplicate ID conflicts
- Maintains data integrity
- Returns execution results with modification tracking
- Supports two-column layout management

---

## 4. CHAT UI COMPONENTS

### 4.1 Chat Hook V2 (`src/v2/hooks/useChatWithResumeV2.ts`)
**Production-ready React hook for action-based chat:**

Features:
- Action validation and execution
- Section highlighting on updates
- Automatic highlight clearing (3s timeout)
- Error handling with user-friendly messages
- Subscription check (Pro required)
- Rate limiting awareness (429 handling)
- Network error detection
- Last execution result tracking

**State Management:**
- Messages with typing indicators
- Loading states
- Error messages
- Highlighted sections
- Suggested questions
- Last actions/execution results

### 4.2 Chat Component (`src/v2/components/ChatWithResume.tsx`)
Visual chat interface with:
- Message history display
- Input area with formatting
- Suggested questions
- Loading indicators
- Error messages
- Quick action buttons

---

## 5. RESUME PARSING

### 5.1 Resume Parser Service (`src/v2/services/resumeParserService.ts`)
**Parse resume files (PDF, DOCX, TXT) into structured V2ResumeData:**

**Features:**
- File type validation (PDF, DOCX, TXT)
- File size validation (max 10MB)
- Base64 encoding for upload
- Automatic ID generation with `ensureUniqueIds()`
- Merge strategy for parsed data

**API Endpoint:**
```
POST /api/ai/parse-resume
```

**Functions:**
- `parseResumeFile()` - Parse resume file to resume data
- `mergeResumeData()` - Smart merge of parsed data into existing resume
- `fileToBase64()` - Convert file to base64

---

## 6. INTERVIEW PREPARATION

### 6.1 Interview Service (`src/v2/services/interviewService.ts`)
**Mock interview simulator with AI-powered feedback:**

**Interview Types:** behavioral, technical, mixed

**Core Functions:**
- `generateInterviewQuestions()` - Generate personalized questions (8 by default)
- `analyzeAnswer()` - Get feedback on a single answer
- `generateInterviewReport()` - Comprehensive report after interview

**Question Types:** behavioral, technical, experience, situational, skills

**Feedback Scores:** (0-10 scale)
- Specificity
- Structure
- Relevance
- Completeness
- Impact

**Report Metrics:**
- Overall score
- Category scores (behavioral, technical, experience, communication)
- Strengths
- Areas for improvement
- Recommendations
- Readiness level (not_ready, needs_practice, almost_ready, interview_ready)

**API Endpoints:**
```
POST /api/interview/generate-questions
POST /api/interview/analyze-answer
POST /api/interview/generate-report
```

### 6.2 Mock Interview Component (`src/v2/components/MockInterviewModal.tsx`)
Features:
- 3 interview difficulty levels (easy, medium, hard)
- Optional job description input
- Real-time answer input
- Transcription display
- Score visualization
- Timer tracking
- Comprehensive report generation

---

## 7. VOICE INPUT & SPEECH-TO-TEXT

### 7.1 Deepgram Voice Service (`src/v2/hooks/useDeepgramVoice.ts`)
**Real-time speech-to-text using Deepgram WebSocket API:**

**Features:**
- Real-time transcription streaming
- Interim & final transcript support
- Nova-2 model for high accuracy
- Audio level monitoring (0-1 scale)
- Smart formatting (punctuation, capitalization)
- Echo cancellation, noise suppression
- Auto-gain control
- Automatic keepalive (every 8 seconds)
- Cross-browser support

**Audio Configuration:**
- Sample rate: 16kHz
- Channels: 1 (mono)
- Buffer size: 4096 bytes
- PCM encoding (Int16)

**WebSocket Connection:**
```
ws://API_BASE_URL/api/speech/stream?token=ACCESS_TOKEN
```

**Callbacks:**
- `onTranscript(text, isFinal)` - Transcript update
- `onStart()` / `onEnd()` - Recording lifecycle
- `onError(message)` - Error handling
- `onAudioLevel(level)` - Audio visualization
- `onSpeechStart()` / `onUtteranceEnd()` - Speech detection

### 7.2 Voice Input Component (`src/v2/components/VoiceInputBar.tsx`)
Visual voice input interface with:
- Microphone button
- Real-time transcript display
- Confidence indicators
- Recording status
- Error messages

---

## 8. ATS ANALYSIS

### 8.1 ATS Service (`src/v2/services/atsService.ts`)
**ATS (Applicant Tracking System) compatibility scoring:**

**API Endpoint:**
```
POST /api/ai/ats-score
```

**Response Structure:**
```typescript
{
  score: number (0-100),
  breakdown: {
    keywords: number,
    formatting: number,
    sections: number,
    experience: number,
    education: number,
    skills: number
  },
  suggestions: [{
    category: string,
    issue: string,
    recommendation: string,
    priority: 'high' | 'medium' | 'low'
  }],
  keywords: {
    found: string[],
    missing: string[],
    recommended: string[]
  },
  overallFeedback: string
}
```

---

## 9. JOB MATCHING & TAILORING

### 9.1 Job Matching Endpoints
**Section-by-section job tailoring (reliable, no timeouts):**

```
POST /api/tailor-sections/analyze-job
POST /api/tailor-sections/section
POST /api/tailor-sections/suggest-skills
POST /api/tailor-sections/match-score
POST /api/tailor-sections/full
```

**Streaming Endpoints (for real-time updates):**
```
POST /api/enhance-sections/stream
POST /api/enhance-sections/batch
POST /api/enhance-sections/enhance
```

---

## 10. LINKEDIN IMPORT

### 10.1 LinkedIn Service (`src/v2/services/linkedinService.ts`)
**Import LinkedIn profile and convert to resume data:**

**Features:**
- URL validation with regex
- Username extraction
- Full profile parsing
- Automatic resume data conversion

**API Endpoint:**
```
POST /api/linkedin/import
```

**Request:**
```json
{
  "linkedinUrl": "https://www.linkedin.com/in/username"
}
```

**Response:**
```typescript
{
  success: boolean,
  data: V2ResumeData,
  linkedinProfile: {
    name: string,
    photoUrl?: string,
    linkedInUrl?: string
  }
}
```

---

## 11. STREAMING RESUME UPDATES

### 11.1 Streaming Hook (`src/v2/hooks/useStreamingResumeUpdate.ts`)
**Real-time streaming updates for large operations:**

Used for:
- Large batch enhancements
- Progressive resume generation
- Real-time feedback during long operations

**Stream Events:**
- Progress updates
- Partial results
- Completion indicators

---

## 12. AI CONFIGURATION

### 12.1 API Configuration (`src/config/api.ts`)
**Central configuration for all AI API calls:**

**Key Settings:**
- Cloud Run Base URL: `${VITE_API_BASE_URL}`
- API Key header: `X-API-Key`
- Authorization: Bearer token refresh
- Automatic token refresh on 401

**Environment Variables:**
```
VITE_API_BASE_URL=http://localhost:8080
VITE_API_KEY=optional_key
```

**Token Management:**
- AccessToken refresh on 401
- Automatic retry with new token
- RefreshToken stored in localStorage
- Dual request prevention

---

## 13. CONTENT SECTIONS (AI-Aware)

### Section Types
All can be AI-enhanced and modified via chat:
- Personal Info (10+ fields)
- Experience (bullet points, dates, descriptions)
- Education (degree, field, honors, GPA)
- Skills (categories, proficiency levels)
- Languages (language, proficiency)
- Projects (name, tech stack, highlights, URL)
- Certifications (name, issuer, date)
- Achievements (various achievement types)
- Awards (award name, trophy display)
- Publications (publications with links)
- Volunteer (volunteer experience)
- Speaking (speaking engagements)
- Patents (patent information)
- Interests (personal interests)
- References (references with contact)
- Courses (courses taken)
- Strengths (key strengths)
- Custom Sections (user-defined sections)

---

## 14. AVAILABLE SECTION VARIANTS (50+)

### Variant Examples by Section
**Header:** left-aligned, centered, split, banner, minimal, photo-left, photo-right, compact, modern-minimal (9)

**Skills:** pills, tags, list, grouped, bars, dots, columns, inline, compact, modern, table, category-lines, bordered-tags, pills-accent, inline-dots, boxed (16)

**Experience:** standard, compact, detailed, timeline, card, minimal, modern, academic, icon-accent, icon-clean, dots-timeline (11)

**Education:** standard, compact, detailed, timeline, card, minimal, academic, modern (8)

**Projects:** standard, cards, compact, grid, timeline, showcase, minimal, detailed (8)

**Achievement:** standard, list, bullets, cards, numbered, timeline, minimal, compact, badges, metrics, boxed (11)

---

## 15. BACKEND AI PROVIDERS

### Environment Variables
```
GROQ_API_KEY - Groq AI (primary)
OPENAI_API_KEY - OpenAI (fallback)
APIFY_API_KEY - LinkedIn import
RAZORPAY_* - Payments (not AI)
MONGODB_URI - Database (not AI)
LOGTAIL_SOURCE_TOKEN - Logging
```

---

## 16. ERROR HANDLING & RETRY LOGIC

### Retry Strategies

**Chat V2 (Validation-based Retries):**
- Max retries: 2
- Delay: 1.5s * (attempt + 1)
- Retry condition: Validation errors in response
- Partial success handling: Returns valid actions even on failure

**Chat V1:**
- Max retries: 2
- Delay: 1s * (attempt + 1)
- Network error recovery
- Response validation

**Resume Parser:**
- Single attempt (no retry)
- File validation before upload
- Detailed error messages

**Interview Service:**
- Single attempt per question
- Async feedback generation
- Per-answer timeout handling

---

## 17. DATA TYPES & INTERFACES

### V2ResumeData Structure
```typescript
{
  personalInfo: {
    fullName, email, phone, location, title, summary,
    linkedin, github, portfolio, website, twitter,
    address, city, state, country, zipCode, photo
  },
  experience: [{
    id, company, position, location, startDate, endDate, current,
    description, bulletPoints
  }],
  education: [{
    id, school, degree, field, startDate, endDate, gpa, location
  }],
  skills: [{ id, name, category, proficiency }],
  languages: [{ id, language, proficiency }],
  certifications: [{ id, name, issuer, date, url }],
  projects: [{ id, name, description, technologies, url, highlights }],
  achievements: [{ ... }],
  awards: [{ ... }],
  publications: [{ ... }],
  volunteer: [{ ... }],
  speaking: [{ ... }],
  patents: [{ ... }],
  interests: [{ ... }],
  references: [{ ... }],
  courses: [{ ... }],
  strengths: [{ ... }],
  customSections: [{
    id, title, items: [{ id, title, content, date, url }]
  }],
  settings: {
    includeSocialLinks: boolean,
    includePhoto: boolean,
    dateFormat: string
  },
  config: {
    sections: [{ type, id, title, enabled, order, column, variant }],
    header: { ... },
    skills: { ... },
    experience: { ... },
    education: { ... },
    layout: { ... },
    colors: { ... },
    sectionHeading: { ... }
  }
}
```

---

## 18. SECURITY & AUTHENTICATION

### Token Management
- AccessToken: Short-lived JWT
- RefreshToken: Long-lived refresh token
- Auto-refresh on 401 Unauthorized
- Stored in localStorage
- Sent in Authorization header

### Rate Limiting
- 429 Too Many Requests handling
- User-friendly error messages
- Exponential backoff on retry

---

## 19. FEATURE SUMMARY TABLE

| Feature | Type | Status | Location |
|---------|------|--------|----------|
| Resume Enhancement | AI | Prod | `/api/ai/enhance-resume` |
| Chat V2 (Action-based) | AI | Prod | `/api/ai/chat-v2` |
| Chat V1 (Legacy) | AI | Legacy | `/api/ai/chat` |
| ATS Scoring | AI | Prod | `/api/ai/ats-score` |
| Resume Parsing | AI | Prod | `/api/ai/parse-resume` |
| Job Generation | AI | Prod | `/api/ai/generate-resume-from-job` |
| Job Tailoring | AI | Prod | `/api/ai/tailor-resume-for-job` |
| Job Matching | AI | Prod | `/api/tailor-sections/*` |
| Interview Q Generation | AI | Prod | `/api/interview/generate-questions` |
| Answer Feedback | AI | Prod | `/api/interview/analyze-answer` |
| Interview Report | AI | Prod | `/api/interview/generate-report` |
| Voice Input | AI | Prod | `/api/speech/stream` |
| LinkedIn Import | AI | Prod | `/api/linkedin/import` |
| Bullet Generation | AI | Prod | `/api/ai/generate-bullets` |
| Summary Generation | AI | Prod | `/api/ai/generate-summary` |

---

## 20. KEY INSIGHTS

1. **Dual Chat Architecture:** V1 (legacy) sends data updates, V2 (production) sends validated actions for 100% reliability
2. **Action System:** 25+ atomic action types ensure reliable execution with automatic ID generation
3. **Retry with Feedback:** Failed validations trigger automatic retries with error messages
4. **Streaming Support:** Real-time updates for long operations (enhancement, tailoring)
5. **Multi-Provider:** Groq (primary), OpenAI (fallback) for LLM operations
6. **Voice Integration:** Deepgram WebSocket for real-time speech-to-text
7. **Comprehensive Validation:** Every AI response is validated before execution
8. **Profile-Based Architecture:** LinkedIn import and resume upload both save to User.profile
9. **Subscription Gating:** Chat V2 requires Pro subscription
10. **Error Recovery:** Graceful degradation with detailed user-friendly error messages

