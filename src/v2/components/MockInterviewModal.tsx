/**
 * Mock Interview Modal
 *
 * A comprehensive interview simulator that generates personalized questions
 * from the user's resume and provides AI-powered feedback.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  Mic,
  Send,
  ArrowRight,
  Loader2,
  MessageSquare,
  Brain,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  RotateCcw,
  X,
  ChevronDown,
  Sparkles,
  Trophy,
  TrendingUp,
  Lightbulb,
  FileText,
  Award,
} from 'lucide-react';
import type { V2ResumeData } from '../types/resumeData';
import { useDeepgramVoice } from '../hooks/useDeepgramVoice';
import { VoiceInputBar } from './VoiceInputBar';
import {
  type InterviewType,
  type InterviewSession,
  generateInterviewQuestions,
  analyzeAnswer,
  generateInterviewReport,
  createInterviewSession,
  updateSessionAnswer,
  updateSessionFeedback,
  completeSession,
  getReadinessInfo,
  formatDuration,
} from '../services/interviewService';

// ============================================================================
// TYPES
// ============================================================================

interface MockInterviewModalProps {
  open: boolean;
  onClose: () => void;
  resumeData: V2ResumeData;
}

type InterviewStage = 'setup' | 'loading' | 'interview' | 'feedback' | 'report';

// ============================================================================
// SCORE RING COMPONENT
// ============================================================================

function ScoreRing({ score, maxScore = 10, size = 100, strokeWidth = 8 }: {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (score / maxScore) * 100;
  const offset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#3b82f6';
    if (percentage >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: getColor() }}>
          {score}
        </span>
        <span className="text-xs text-gray-400">/{maxScore}</span>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MockInterviewModal({
  open,
  onClose,
  resumeData,
}: MockInterviewModalProps) {
  // State
  const [stage, setStage] = useState<InterviewStage>('setup');
  const [interviewType, setInterviewType] = useState<InterviewType>('mixed');
  const [jobDescription, setJobDescription] = useState('');
  const [showJobInput, setShowJobInput] = useState(false);
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const voiceTranscriptRef = useRef('');

  // Voice input hook
  const {
    isAvailable: isVoiceAvailable,
    isListening,
    isConnected: isVoiceConnected,
    transcript: voiceTranscript,
    interimTranscript,
    startListening,
    stopListening,
    clearTranscript,
    error: voiceError,
    audioLevel,
  } = useDeepgramVoice({
    onTranscript: (text, isFinal) => {
      if (isFinal) {
        voiceTranscriptRef.current = (voiceTranscriptRef.current + ' ' + text).trim();
      }
    },
    onEnd: () => {
      if (voiceTranscriptRef.current) {
        setCurrentAnswer(prev => {
          const newAnswer = prev ? prev + ' ' + voiceTranscriptRef.current : voiceTranscriptRef.current;
          return newAnswer.trim();
        });
      }
      voiceTranscriptRef.current = '';
      clearTranscript();
    },
  });

  const handleVoiceCancel = useCallback(() => {
    voiceTranscriptRef.current = '';
    stopListening();
    clearTranscript();
  }, [stopListening, clearTranscript]);

  const handleVoiceConfirm = useCallback(() => {
    const completeTranscript = (voiceTranscript + ' ' + interimTranscript).trim();
    if (completeTranscript) {
      setCurrentAnswer(prev => {
        const newAnswer = prev ? prev + ' ' + completeTranscript : completeTranscript;
        return newAnswer.trim();
      });
    }
    voiceTranscriptRef.current = '';
    stopListening();
    clearTranscript();
  }, [voiceTranscript, interimTranscript, stopListening, clearTranscript]);

  const handleStartVoice = useCallback(() => {
    voiceTranscriptRef.current = '';
    startListening();
  }, [startListening]);

  // Timer effect
  useEffect(() => {
    if (stage === 'interview' && session) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - session.startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage, session]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setStage('setup');
      setSession(null);
      setCurrentAnswer('');
      setError(null);
      setElapsedTime(0);
    }
  }, [open]);

  // Start interview
  const handleStartInterview = useCallback(async () => {
    setStage('loading');
    setError(null);

    const result = await generateInterviewQuestions(resumeData, {
      interviewType,
      jobDescription: showJobInput ? jobDescription : undefined,
      questionCount: 8,
    });

    if (!result.success || result.questions.length === 0) {
      setError(result.error || 'Failed to generate questions. Please try again.');
      setStage('setup');
      return;
    }

    const newSession = createInterviewSession(result.questions, interviewType);
    setSession(newSession);
    setStage('interview');
  }, [resumeData, interviewType, jobDescription, showJobInput]);

  // Submit answer
  const handleSubmitAnswer = useCallback(async () => {
    if (!session || !currentAnswer.trim()) return;

    const questionIndex = session.currentQuestionIndex;
    const question = session.questions[questionIndex];

    let updatedSession = updateSessionAnswer(session, questionIndex, currentAnswer);
    setSession(updatedSession);

    setIsAnalyzing(true);
    const result = await analyzeAnswer(question, currentAnswer, resumeData);
    setIsAnalyzing(false);

    if (result.success && result.feedback) {
      updatedSession = updateSessionFeedback(updatedSession, questionIndex, result.feedback);
      setSession(updatedSession);
    }
    setStage('feedback');
    setCurrentAnswer('');
  }, [session, currentAnswer, resumeData]);

  // Move to next question
  const handleNextQuestion = useCallback(() => {
    if (!session) return;

    const nextIndex = session.currentQuestionIndex + 1;

    if (nextIndex >= session.questions.length) {
      handleGenerateReport();
    } else {
      setSession({ ...session, currentQuestionIndex: nextIndex });
      setStage('interview');
    }
  }, [session]);

  // Generate final report
  const handleGenerateReport = useCallback(async () => {
    if (!session) return;

    setIsGeneratingReport(true);
    setStage('report');

    const result = await generateInterviewReport(
      session.questions,
      session.answers,
      session.feedbacks,
      resumeData
    );

    setIsGeneratingReport(false);

    if (result.success && result.report) {
      const completedSession = completeSession(session, result.report);
      setSession(completedSession);
    } else {
      setError(result.error || 'Failed to generate report');
    }
  }, [session, resumeData]);

  // Restart
  const handleRestart = useCallback(() => {
    setStage('setup');
    setSession(null);
    setCurrentAnswer('');
    setError(null);
    setElapsedTime(0);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = session?.questions[session.currentQuestionIndex];
  const currentFeedback = session?.feedbacks[session.currentQuestionIndex];
  const progress = session ? ((session.currentQuestionIndex + 1) / session.questions.length) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0 gap-0 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-2xl [&>button]:hidden">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {stage === 'setup' && 'Practice Interview'}
                {stage === 'loading' && 'Preparing Your Interview'}
                {stage === 'interview' && 'Mock Interview'}
                {stage === 'feedback' && 'Answer Feedback'}
                {stage === 'report' && 'Interview Results'}
              </h2>
              {stage === 'setup' && (
                <p className="text-sm text-gray-500">AI-powered practice based on your resume</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer on right side */}
            {(stage === 'interview' || stage === 'feedback') && session && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 tabular-nums">{formatTime(elapsedTime)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Progress Bar - Thin line */}
        {(stage === 'interview' || stage === 'feedback') && session && (
          <div className="flex-shrink-0 h-0.5 bg-gray-100">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Content - Scrollable Body Only */}
        <div className="px-6 pt-6 pb-4 overflow-y-auto flex-1">
          {/* ============== SETUP STAGE ============== */}
          {stage === 'setup' && (
            <div className="space-y-5">
              {/* Compact Description */}
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    Practice with AI-generated questions tailored to your resume. Get real-time feedback and improve your interview skills.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                    8 Questions
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                    AI Feedback
                  </span>
                </div>
              </div>

              {/* Interview Type Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Interview Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: 'mixed' as InterviewType, icon: Brain, label: 'Comprehensive', desc: 'All question types' },
                    { type: 'behavioral' as InterviewType, icon: MessageSquare, label: 'Behavioral', desc: 'STAR method focus' },
                    { type: 'technical' as InterviewType, icon: Target, label: 'Technical', desc: 'Skills validation' },
                  ].map(({ type, icon: Icon, label, desc }) => (
                    <button
                      key={type}
                      onClick={() => setInterviewType(type)}
                      className={cn(
                        'relative p-4 rounded-xl border-2 transition-all text-left',
                        interviewType === type
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      {interviewType === type && (
                        <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />
                      )}
                      <Icon className={cn('h-5 w-5 mb-2', interviewType === type ? 'text-primary' : 'text-gray-400')} />
                      <span className="font-medium text-gray-900 block text-sm">{label}</span>
                      <span className="text-xs text-gray-500">{desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Job Description - Collapsed by default */}
              <div className="border border-gray-200 rounded-xl">
                <button
                  onClick={() => setShowJobInput(!showJobInput)}
                  className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Add Job Description</span>
                    <span className="text-xs text-gray-400">(optional)</span>
                  </div>
                  <ChevronDown className={cn('h-4 w-4 text-gray-400 transition-transform', showJobInput && 'rotate-180')} />
                </button>
                {showJobInput && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <Textarea
                      placeholder="Paste job description for tailored questions..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="min-h-[80px] mt-3 resize-none text-sm border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          )}

          {/* ============== LOADING STAGE ============== */}
          {stage === 'loading' && (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-primary animate-pulse" />
              </div>
              <p className="text-gray-700 font-medium">Analyzing your resume...</p>
              <p className="text-gray-500 text-sm mt-1">Generating personalized questions</p>
            </div>
          )}

          {/* ============== INTERVIEW STAGE ============== */}
          {stage === 'interview' && session && currentQuestion && (
            <div className="space-y-5">
              {/* Question Header - Centered */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Question {session.currentQuestionIndex + 1} of {session.questions.length}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-medium text-gray-500 capitalize">{currentQuestion.type}</span>
                  <span className={cn(
                    'text-xs font-medium capitalize px-2 py-0.5 rounded-full',
                    currentQuestion.difficulty === 'easy' && 'text-emerald-600 bg-emerald-50',
                    currentQuestion.difficulty === 'medium' && 'text-amber-600 bg-amber-50',
                    currentQuestion.difficulty === 'hard' && 'text-red-600 bg-red-50',
                  )}>{currentQuestion.difficulty}</span>
                </div>

                {/* Step Dots */}
                <div className="flex items-center justify-center gap-1.5">
                  {Array.from({ length: session.questions.length }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1.5 rounded-full transition-all',
                        i < session.currentQuestionIndex && 'w-1.5 bg-emerald-500',
                        i === session.currentQuestionIndex && 'w-8 bg-primary',
                        i > session.currentQuestionIndex && 'w-1.5 bg-gray-200'
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Question Card - Clean & Prominent */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6">
                <p className="text-lg text-gray-900 font-medium leading-relaxed">{currentQuestion.question}</p>
                {currentQuestion.context && (
                  <div className="mt-4 flex items-start gap-2 text-sm text-amber-600">
                    <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{currentQuestion.context}</span>
                  </div>
                )}
              </div>

              {/* Answer Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Your Answer</label>
                  <div className="flex items-center gap-2">
                    {isVoiceAvailable && !isListening && (
                      <button
                        onClick={handleStartVoice}
                        disabled={isAnalyzing}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
                      >
                        <Mic className="h-3.5 w-3.5" />
                        Use Voice
                      </button>
                    )}
                  </div>
                </div>

                {isListening ? (
                  <VoiceInputBar
                    isRecording={isListening}
                    isConnected={isVoiceConnected}
                    transcript={voiceTranscript}
                    interimTranscript={interimTranscript}
                    audioLevel={audioLevel}
                    onCancel={handleVoiceCancel}
                    onConfirm={handleVoiceConfirm}
                  />
                ) : (
                  <div className="relative">
                    <Textarea
                      ref={textareaRef}
                      placeholder="Type your answer here... Consider using the STAR method (Situation, Task, Action, Result)"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      className="min-h-[120px] resize-none border-gray-200 rounded-xl focus:ring-primary focus:border-primary bg-white"
                      disabled={isAnalyzing}
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-gray-300">{currentAnswer.length} chars</span>
                  </div>
                )}
                {voiceError && <p className="mt-2 text-xs text-red-500">{voiceError}</p>}
              </div>
            </div>
          )}

          {/* ============== FEEDBACK STAGE ============== */}
          {stage === 'feedback' && session && currentQuestion && (
            <div className="space-y-4">
              {/* Score and Summary - Horizontal Layout */}
              {currentFeedback && (
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                  <ScoreRing score={currentFeedback.overallScore} maxScore={10} size={80} strokeWidth={6} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {currentFeedback.overallScore >= 8 ? 'Excellent!' : currentFeedback.overallScore >= 6 ? 'Good' : currentFeedback.overallScore >= 4 ? 'Fair' : 'Needs Work'}
                      </h3>
                      <span className="text-xs text-gray-400">Q{session.currentQuestionIndex + 1} of {session.questions.length}</span>
                    </div>
                    {/* Score Bars */}
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(currentFeedback.scores).map(([key, value]) => (
                        <div key={key}>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className={cn('h-full rounded-full', value >= 7 ? 'bg-emerald-500' : value >= 5 ? 'bg-blue-500' : 'bg-amber-500')} style={{ width: `${value * 10}%` }} />
                          </div>
                          <span className="text-[10px] text-gray-400 capitalize">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Cards - Full Width */}
              {currentFeedback && (
                <div className="space-y-3">
                  {currentFeedback.strengths.length > 0 && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium text-emerald-800 text-sm">Strengths</span>
                      </div>
                      <ul className="space-y-1">
                        {currentFeedback.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-emerald-700">• {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentFeedback.improvements.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-amber-600" />
                        <span className="font-medium text-amber-800 text-sm">Areas to Improve</span>
                      </div>
                      <ul className="space-y-1">
                        {currentFeedback.improvements.map((s, i) => (
                          <li key={i} className="text-sm text-amber-700">• {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentFeedback.suggestedAnswer && (
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800 text-sm">Suggested Approach</span>
                      </div>
                      <p className="text-sm text-blue-700">{currentFeedback.suggestedAnswer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============== REPORT STAGE ============== */}
          {stage === 'report' && session && (
            <div className="space-y-5">
              {isGeneratingReport ? (
                <div className="py-12 flex flex-col items-center justify-center">
                  <div className="relative mb-5">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <Award className="absolute inset-0 m-auto h-6 w-6 text-primary" />
                  </div>
                  <p className="text-gray-700 font-medium">Generating your report...</p>
                </div>
              ) : session.report ? (
                <>
                  {/* Overall Score - Compact */}
                  <div className="flex items-center gap-6 p-5 rounded-xl bg-gray-50 border border-gray-100">
                    <ScoreRing score={session.report.overallScore} maxScore={100} size={100} strokeWidth={8} />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Interview Complete</h3>
                      {(() => {
                        const readiness = getReadinessInfo(session.report.readinessLevel);
                        return (
                          <span className={cn(
                            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
                            session.report.readinessLevel === 'interview_ready' && 'bg-emerald-100 text-emerald-700',
                            session.report.readinessLevel === 'almost_ready' && 'bg-blue-100 text-blue-700',
                            session.report.readinessLevel === 'needs_practice' && 'bg-amber-100 text-amber-700',
                            session.report.readinessLevel === 'not_ready' && 'bg-red-100 text-red-700',
                          )}>
                            {session.report.readinessLevel === 'interview_ready' && <Trophy className="h-3.5 w-3.5" />}
                            {session.report.readinessLevel === 'almost_ready' && <TrendingUp className="h-3.5 w-3.5" />}
                            {readiness.label}
                          </span>
                        );
                      })()}
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{session.questions.length} questions</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatDuration(session.startTime, session.endTime)}</span>
                      </div>
                    </div>
                    {/* Category Scores */}
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(session.report.categoryScores).map(([key, value]) => (
                        <div key={key} className="text-center px-3 py-1.5 bg-white rounded-lg border border-gray-100">
                          <div className={cn('text-lg font-bold', value >= 70 ? 'text-emerald-600' : value >= 50 ? 'text-blue-600' : 'text-amber-600')}>{value}</div>
                          <div className="text-[10px] text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Improvements - Side by Side */}
                  <div className="grid grid-cols-2 gap-3">
                    {session.report.strengths.length > 0 && (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span className="font-medium text-emerald-800 text-sm">Strengths</span>
                        </div>
                        <ul className="space-y-1">
                          {session.report.strengths.slice(0, 3).map((s, i) => (
                            <li key={i} className="text-sm text-emerald-700">• {s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {session.report.areasForImprovement.length > 0 && (
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-amber-600" />
                          <span className="font-medium text-amber-800 text-sm">Improve</span>
                        </div>
                        <ul className="space-y-1">
                          {session.report.areasForImprovement.slice(0, 3).map((s, i) => (
                            <li key={i} className="text-sm text-amber-700">• {s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Recommendations */}
                  {session.report.recommendations.length > 0 && (
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800 text-sm">Recommendations</span>
                      </div>
                      <ul className="space-y-1">
                        {session.report.recommendations.slice(0, 3).map((s, i) => (
                          <li key={i} className="text-sm text-blue-700">{i + 1}. {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-8 text-center">
                  <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
                  <p className="text-gray-600">{error || 'Failed to generate report.'}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed Footer - Action Buttons */}
        {stage !== 'loading' && (
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
            {/* Left Side */}
            <div>
              {stage === 'setup' && (
                <Button variant="outline" onClick={onClose}>Cancel</Button>
              )}
              {(stage === 'interview' || stage === 'feedback') && (
                <Button variant="ghost" size="sm" onClick={handleRestart} className="text-gray-400 hover:text-gray-600">
                  <RotateCcw className="h-4 w-4 mr-1.5" />Start Over
                </Button>
              )}
              {stage === 'report' && !isGeneratingReport && (
                <Button variant="outline" size="sm" onClick={handleRestart}>
                  <RotateCcw className="h-4 w-4 mr-1.5" />Practice Again
                </Button>
              )}
            </div>

            {/* Right Side */}
            <div>
              {stage === 'setup' && (
                <Button
                  onClick={handleStartInterview}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Interview
                </Button>
              )}
              {stage === 'interview' && !isListening && (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!currentAnswer.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md"
                >
                  {isAnalyzing ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Analyzing...</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" />Submit Answer</>
                  )}
                </Button>
              )}
              {stage === 'feedback' && session && (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                >
                  {session.currentQuestionIndex + 1 >= session.questions.length ? (
                    <><Trophy className="h-4 w-4 mr-2" />View Results</>
                  ) : (
                    <>Next Question<ArrowRight className="h-4 w-4 ml-2" /></>
                  )}
                </Button>
              )}
              {stage === 'report' && !isGeneratingReport && (
                <Button onClick={onClose} className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  Done
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default MockInterviewModal;
