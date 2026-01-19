/**
 * ATS Score Panel - Comprehensive Resume Analysis
 *
 * Shows detailed breakdown like Enhancv:
 * - Content (quantifiable achievements, action verbs, repetition)
 * - Sections (completeness check)
 * - ATS Essentials (formatting, parsing)
 * - Tailoring (keywords, skills matching)
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  Target,
  Check,
  RefreshCw,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  ListChecks,
  Settings,
  Crosshair,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Wand2,
  ArrowRight,
  TrendingUp,
  Hash,
  Type,
  Repeat,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { V2ResumeData } from '../types/resumeData';
import {
  ATSScoreResponse,
  getScoreLabel,
} from '../types/ats';
import { analyzeATSScore } from '../services/atsService';

interface ATSScorePanelProps {
  resumeData: V2ResumeData;
  isOpen: boolean;
  onClose: () => void;
  onFixResume?: (improvements: ResumeImprovements) => void;
  className?: string;
}

interface ResumeImprovements {
  bullets: { original: string; improved: string; section: string }[];
  keywords: string[];
  sections: string[];
}

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  icon: React.ReactNode;
  color: string;
  items: CategoryItem[];
}

interface CategoryItem {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'unknown';
  description?: string;
  examples?: { bad: string; good: string }[];
  issues?: string[];
  suggestions?: string[];
}

export function ATSScorePanel({
  resumeData,
  isOpen,
  onClose,
  onFixResume,
}: ATSScorePanelProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [result, setResult] = useState<ATSScoreResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('content');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Animate score
  useEffect(() => {
    if (result?.score) {
      setAnimatedScore(0);
      const duration = 1000;
      const steps = 50;
      const increment = result.score / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= result.score) {
          setAnimatedScore(result.score);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.round(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [result?.score]);

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await analyzeATSScore({
        resumeData,
        jobDescription: jobDescription.trim() || undefined,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  }, [resumeData, jobDescription]);

  // Auto-analyze on open
  useEffect(() => {
    if (isOpen && !result && !isAnalyzing) {
      handleAnalyze();
    }
  }, [isOpen]);

  // Analyze resume content to get detailed categories
  const analyzeCategories = useCallback((): CategoryScore[] => {
    if (!result) return [];

    const categories: CategoryScore[] = [];

    // 1. CONTENT Category
    const contentItems: CategoryItem[] = [];

    // Check for quantifiable achievements
    const allBullets = resumeData.experience?.flatMap(exp => exp.bulletPoints || []) || [];
    const bulletsWithNumbers = allBullets.filter(b => /\d+%|\d+\+|\$\d+|\d+ (users|customers|projects|people|team)/i.test(b));
    const quantifyScore = allBullets.length > 0 ? Math.round((bulletsWithNumbers.length / allBullets.length) * 100) : 0;

    contentItems.push({
      name: 'Quantifiable Achievements',
      status: quantifyScore >= 50 ? 'pass' : quantifyScore >= 25 ? 'warning' : 'fail',
      description: quantifyScore >= 50
        ? `${bulletsWithNumbers.length} of ${allBullets.length} bullet points include metrics`
        : `Only ${bulletsWithNumbers.length} of ${allBullets.length} bullet points include measurable results`,
      issues: quantifyScore < 50 ? allBullets.filter(b => !/\d+/.test(b)).slice(0, 3) : [],
      suggestions: quantifyScore < 50 ? [
        'Add percentages: "Increased sales by 25%"',
        'Include numbers: "Managed team of 8 developers"',
        'Show scale: "Handled 500+ customer inquiries daily"'
      ] : [],
      examples: quantifyScore < 50 ? [
        { bad: 'Improved team productivity', good: 'Improved team productivity by 40% through process automation' },
        { bad: 'Managed customer accounts', good: 'Managed 150+ enterprise customer accounts worth $2M ARR' }
      ] : []
    });

    // Check for action verbs
    const actionVerbs = ['achieved', 'implemented', 'developed', 'created', 'led', 'managed', 'increased', 'reduced', 'launched', 'built', 'designed', 'optimized', 'streamlined', 'spearheaded', 'executed'];
    const bulletsWithActionVerbs = allBullets.filter(b =>
      actionVerbs.some(verb => b.toLowerCase().startsWith(verb) || new RegExp(`^\\w*\\s*${verb}`, 'i').test(b))
    );
    const actionVerbScore = allBullets.length > 0 ? Math.round((bulletsWithActionVerbs.length / allBullets.length) * 100) : 0;

    contentItems.push({
      name: 'Action Verbs',
      status: actionVerbScore >= 70 ? 'pass' : actionVerbScore >= 40 ? 'warning' : 'fail',
      description: actionVerbScore >= 70
        ? 'Good use of strong action verbs'
        : `${allBullets.length - bulletsWithActionVerbs.length} bullet points don't start with action verbs`,
      suggestions: actionVerbScore < 70 ? [
        'Start bullets with: Achieved, Implemented, Developed, Led, Managed',
        'Avoid weak verbs: Helped, Assisted, Worked on, Was responsible for'
      ] : [],
      examples: actionVerbScore < 70 ? [
        { bad: 'Was responsible for managing the team', good: 'Led a cross-functional team of 12 engineers' },
        { bad: 'Helped with customer support', good: 'Resolved 50+ customer issues daily with 98% satisfaction rate' }
      ] : []
    });

    // Check for word repetition
    const wordFrequency: Record<string, number> = {};
    allBullets.forEach(bullet => {
      bullet.toLowerCase().split(/\s+/).forEach(word => {
        if (word.length > 4) {
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
      });
    });
    const repeatedWords = Object.entries(wordFrequency)
      .filter(([_, count]) => count >= 3)
      .map(([word, count]) => ({ word, count }));

    contentItems.push({
      name: 'Word Variety',
      status: repeatedWords.length === 0 ? 'pass' : repeatedWords.length <= 2 ? 'warning' : 'fail',
      description: repeatedWords.length === 0
        ? 'Good variety in word choice'
        : `Found ${repeatedWords.length} words repeated 3+ times`,
      issues: repeatedWords.slice(0, 5).map(r => `"${r.word}" used ${r.count} times`),
      suggestions: repeatedWords.length > 0 ? [
        'Use synonyms to avoid repetition',
        'Vary your action verbs throughout'
      ] : []
    });

    const contentScore = Math.round((quantifyScore + actionVerbScore + (repeatedWords.length === 0 ? 100 : repeatedWords.length <= 2 ? 70 : 40)) / 3);

    categories.push({
      name: 'CONTENT',
      score: contentScore,
      maxScore: 100,
      icon: <FileText className="w-5 h-5" />,
      color: contentScore >= 70 ? '#22c55e' : contentScore >= 50 ? '#f59e0b' : '#ef4444',
      items: contentItems
    });

    // 2. SECTIONS Category
    const sectionItems: CategoryItem[] = [];
    const sections = result.format.sections;

    const requiredSections = [
      { key: 'hasContact', name: 'Contact Information', required: true },
      { key: 'hasSummary', name: 'Professional Summary', required: true },
      { key: 'hasExperience', name: 'Work Experience', required: true },
      { key: 'hasEducation', name: 'Education', required: true },
      { key: 'hasSkills', name: 'Skills', required: true },
    ];

    const optionalSections = [
      { key: 'hasCertifications', name: 'Certifications', required: false },
      { key: 'hasProjects', name: 'Projects', required: false },
      { key: 'hasAchievements', name: 'Achievements', required: false },
    ];

    const presentRequired = requiredSections.filter(s => sections[s.key as keyof typeof sections]).length;
    const presentOptional = optionalSections.filter(s => sections[s.key as keyof typeof sections]).length;

    [...requiredSections, ...optionalSections].forEach(section => {
      const exists = sections[section.key as keyof typeof sections];
      sectionItems.push({
        name: section.name,
        status: exists ? 'pass' : section.required ? 'fail' : 'warning',
        description: exists
          ? 'Present in resume'
          : section.required
            ? 'Missing - Required for ATS'
            : 'Missing - Recommended to add'
      });
    });

    const sectionsScore = Math.round(((presentRequired / requiredSections.length) * 70) + ((presentOptional / optionalSections.length) * 30));

    categories.push({
      name: 'SECTIONS',
      score: sectionsScore,
      maxScore: 100,
      icon: <ListChecks className="w-5 h-5" />,
      color: sectionsScore >= 80 ? '#22c55e' : sectionsScore >= 60 ? '#f59e0b' : '#ef4444',
      items: sectionItems
    });

    // 3. ATS ESSENTIALS Category
    const essentialsItems: CategoryItem[] = [];

    // Check summary length
    const summaryLength = resumeData.personalInfo?.summary?.split(/\s+/).length || 0;
    essentialsItems.push({
      name: 'Summary Length',
      status: summaryLength >= 30 && summaryLength <= 75 ? 'pass' : summaryLength > 0 ? 'warning' : 'fail',
      description: summaryLength === 0
        ? 'No summary found'
        : summaryLength < 30
          ? `Summary is too short (${summaryLength} words). Aim for 30-75 words.`
          : summaryLength > 75
            ? `Summary is too long (${summaryLength} words). Keep it under 75 words.`
            : `Summary is ${summaryLength} words - optimal length`,
      suggestions: summaryLength < 30 || summaryLength > 75 ? ['Optimal summary length is 30-75 words for ATS readability'] : []
    });

    // Check bullet point length
    const longBullets = allBullets.filter(b => b.split(/\s+/).length > 25);
    const shortBullets = allBullets.filter(b => b.split(/\s+/).length < 8);
    essentialsItems.push({
      name: 'Bullet Point Length',
      status: longBullets.length === 0 && shortBullets.length <= 2 ? 'pass' : 'warning',
      description: longBullets.length > 0
        ? `${longBullets.length} bullets are too long (>25 words)`
        : shortBullets.length > 2
          ? `${shortBullets.length} bullets are too short (<8 words)`
          : 'Bullet points are well-sized',
      issues: longBullets.slice(0, 2),
      suggestions: longBullets.length > 0 || shortBullets.length > 2
        ? ['Keep bullet points between 10-25 words for optimal readability']
        : []
    });

    // Check for email and phone
    const hasEmail = !!resumeData.personalInfo?.email;
    const hasPhone = !!resumeData.personalInfo?.phone;
    essentialsItems.push({
      name: 'Contact Details',
      status: hasEmail && hasPhone ? 'pass' : hasEmail || hasPhone ? 'warning' : 'fail',
      description: hasEmail && hasPhone
        ? 'Email and phone number present'
        : !hasEmail && !hasPhone
          ? 'Missing both email and phone number'
          : !hasEmail ? 'Missing email address' : 'Missing phone number'
    });

    // Check for dates format
    const experiences = resumeData.experience || [];
    const hasProperDates = experiences.every(exp => exp.startDate || exp.endDate);
    essentialsItems.push({
      name: 'Date Formatting',
      status: hasProperDates ? 'pass' : 'warning',
      description: hasProperDates
        ? 'All positions have dates'
        : 'Some positions are missing dates'
    });

    const essentialsScore = Math.round(
      (essentialsItems.filter(i => i.status === 'pass').length / essentialsItems.length) * 100
    );

    categories.push({
      name: 'ATS ESSENTIALS',
      score: essentialsScore,
      maxScore: 100,
      icon: <Settings className="w-5 h-5" />,
      color: essentialsScore >= 80 ? '#22c55e' : essentialsScore >= 60 ? '#f59e0b' : '#ef4444',
      items: essentialsItems
    });

    // 4. TAILORING Category (if job description provided)
    if (result.keywords) {
      const tailoringItems: CategoryItem[] = [];

      // Hard Skills
      const hardSkillsMatch = result.keywords.matched.hardSkills?.length || 0;
      const hardSkillsMissing = result.keywords.missing.hardSkills?.length || 0;
      const hardSkillsTotal = hardSkillsMatch + hardSkillsMissing;

      if (hardSkillsTotal > 0) {
        tailoringItems.push({
          name: 'Hard Skills',
          status: hardSkillsMatch >= hardSkillsMissing ? 'pass' : hardSkillsMatch > 0 ? 'warning' : 'fail',
          description: `${hardSkillsMatch} of ${hardSkillsTotal} required hard skills found`,
          issues: result.keywords.missing.hardSkills?.slice(0, 5),
          suggestions: hardSkillsMissing > 0 ? ['Add missing skills if you have them'] : []
        });
      }

      // Soft Skills
      const softSkillsMatch = result.keywords.matched.softSkills?.length || 0;
      const softSkillsMissing = result.keywords.missing.softSkills?.length || 0;
      const softSkillsTotal = softSkillsMatch + softSkillsMissing;

      if (softSkillsTotal > 0) {
        tailoringItems.push({
          name: 'Soft Skills',
          status: softSkillsMatch >= softSkillsMissing ? 'pass' : softSkillsMatch > 0 ? 'warning' : 'fail',
          description: `${softSkillsMatch} of ${softSkillsTotal} soft skills mentioned`,
          issues: result.keywords.missing.softSkills?.slice(0, 5),
          suggestions: softSkillsMissing > 0 ? ['Incorporate these skills naturally into your experience'] : []
        });
      }

      // Tools & Technologies
      const toolsMatch = result.keywords.matched.tools?.length || 0;
      const toolsMissing = result.keywords.missing.tools?.length || 0;
      const toolsTotal = toolsMatch + toolsMissing;

      if (toolsTotal > 0) {
        tailoringItems.push({
          name: 'Tools & Technologies',
          status: toolsMatch >= toolsMissing ? 'pass' : toolsMatch > 0 ? 'warning' : 'fail',
          description: `${toolsMatch} of ${toolsTotal} required tools/technologies found`,
          issues: result.keywords.missing.tools?.slice(0, 5),
          suggestions: toolsMissing > 0 ? ['Add these to your skills section if you know them'] : []
        });
      }

      // Job Title Match
      const titleMatch = resumeData.experience?.some(exp =>
        jobDescription.toLowerCase().includes(exp.title?.toLowerCase() || '')
      );
      tailoringItems.push({
        name: 'Job Title Alignment',
        status: titleMatch ? 'pass' : 'warning',
        description: titleMatch
          ? 'Your job titles align with the target role'
          : 'Consider adjusting job titles to match industry standards',
        suggestions: !titleMatch ? ['Use industry-standard job titles that ATS systems recognize'] : []
      });

      const tailoringScore = result.keywords.matchPercentage;

      categories.push({
        name: 'TAILORING',
        score: tailoringScore,
        maxScore: 100,
        icon: <Crosshair className="w-5 h-5" />,
        color: tailoringScore >= 70 ? '#22c55e' : tailoringScore >= 50 ? '#f59e0b' : '#ef4444',
        items: tailoringItems
      });
    } else {
      categories.push({
        name: 'TAILORING',
        score: 0,
        maxScore: 100,
        icon: <Crosshair className="w-5 h-5" />,
        color: '#9ca3af',
        items: [{
          name: 'Job Description Required',
          status: 'unknown',
          description: 'Add a job description to see keyword matching analysis'
        }]
      });
    }

    return categories;
  }, [result, resumeData, jobDescription]);

  const handleFixResume = async () => {
    if (!onFixResume || !result) return;

    setIsFixing(true);

    // Collect improvements needed
    const improvements: ResumeImprovements = {
      bullets: [],
      keywords: result.keywords?.missing.hardSkills || [],
      sections: []
    };

    // Find bullets that need improvement (no numbers, weak verbs)
    const allBullets = resumeData.experience?.flatMap((exp, expIdx) =>
      (exp.bulletPoints || []).map((b, bIdx) => ({
        text: b,
        expIdx,
        bIdx,
        section: exp.company || 'Experience'
      }))
    ) || [];

    allBullets.forEach(bullet => {
      if (!/\d+/.test(bullet.text)) {
        improvements.bullets.push({
          original: bullet.text,
          improved: '', // Will be filled by AI
          section: bullet.section
        });
      }
    });

    // Check missing sections
    const sections = result.format.sections;
    if (!sections.hasSummary) improvements.sections.push('summary');
    if (!sections.hasSkills) improvements.sections.push('skills');

    onFixResume(improvements);
    setIsFixing(false);
  };

  const toggleItem = (itemName: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  if (!isOpen) return null;

  const categories = analyzeCategories();
  const totalIssues = result?.format.issues?.length || 0;

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">ATS Resume Checker</h1>
                <p className="text-xs text-gray-500">Detailed analysis of your resume</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {result && onFixResume && (
                <Button
                  onClick={handleFixResume}
                  disabled={isFixing}
                  className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  {isFixing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4" />
                  )}
                  Fix Resume
                </Button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto h-[calc(100vh-64px)]">
        {/* Loading State */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500" />
              <div className="absolute inset-0 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl">
                <Target className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Resume</h3>
            <p className="text-gray-500">Checking ATS compatibility...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isAnalyzing && (
          <div className="max-w-md mx-auto py-20">
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Analysis Failed</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={handleAnalyze} className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isAnalyzing && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Score + Categories */}
            <div className="lg:col-span-1 space-y-4">
              {/* Score Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Your Score</h2>

                {/* Gauge */}
                <div className="relative w-48 h-28 mx-auto mb-4">
                  <svg className="w-full h-full" viewBox="0 0 200 120">
                    {/* Background arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Score arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke={getScoreColor(animatedScore)}
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeDasharray={`${(animatedScore / 100) * 251.2} 251.2`}
                      className="transition-all duration-1000 ease-out"
                    />
                    {/* Needle */}
                    <circle
                      cx={100 + 70 * Math.cos((Math.PI * (1 - animatedScore / 100)) + Math.PI)}
                      cy={100 + 70 * Math.sin((Math.PI * (1 - animatedScore / 100)) + Math.PI)}
                      r="6"
                      fill="#374151"
                    />
                  </svg>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold" style={{ color: getScoreColor(animatedScore) }}>
                    {animatedScore}/100
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{totalIssues} Issues</div>
                </div>

                <div className="border-t border-gray-100 mt-6 pt-4 space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setExpandedCategory(expandedCategory === cat.name.toLowerCase() ? null : cat.name.toLowerCase())}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                        expandedCategory === cat.name.toLowerCase()
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      )}
                    >
                      <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                        {cat.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${cat.color}20`,
                            color: cat.color
                          }}
                        >
                          {cat.score}%
                        </span>
                        {expandedCategory === cat.name.toLowerCase() ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Description Input */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Job Description</span>
                  {result.keywords && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Analyzing
                    </span>
                  )}
                </div>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job description for keyword analysis..."
                  className="w-full h-24 p-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none resize-none text-sm"
                />
                <Button
                  onClick={handleAnalyze}
                  size="sm"
                  className="w-full mt-2 gap-1.5 bg-indigo-600 hover:bg-indigo-700"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Re-analyze
                </Button>
              </div>
            </div>

            {/* Right Column - Detailed Analysis */}
            <div className="lg:col-span-2 space-y-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={cn(
                    "bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all",
                    expandedCategory === category.name.toLowerCase() ? "ring-2 ring-indigo-200" : ""
                  )}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category.name.toLowerCase() ? null : category.name.toLowerCase())}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}15`, color: category.color }}
                      >
                        {category.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-500">
                          {category.items.filter(i => i.status === 'pass').length} of {category.items.length} checks passed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">
                        {category.items.filter(i => i.status === 'fail').length} issues found
                      </span>
                      {expandedCategory === category.name.toLowerCase() ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Category Items */}
                  {expandedCategory === category.name.toLowerCase() && (
                    <div className="border-t border-gray-100">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="border-b border-gray-50 last:border-0">
                          <button
                            onClick={() => toggleItem(`${category.name}-${item.name}`)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(item.status)}
                              <div className="text-left">
                                <span className="font-medium text-gray-900">{item.name}</span>
                                {item.description && (
                                  <p className="text-sm text-gray-500">{item.description}</p>
                                )}
                              </div>
                            </div>
                            {(item.issues?.length || item.suggestions?.length || item.examples?.length) && (
                              expandedItems.has(`${category.name}-${item.name}`) ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              )
                            )}
                          </button>

                          {/* Expanded Details */}
                          {expandedItems.has(`${category.name}-${item.name}`) && (
                            <div className="px-4 pb-4 space-y-4">
                              {/* Issues from resume */}
                              {item.issues && item.issues.length > 0 && (
                                <div className="bg-red-50 rounded-xl p-4">
                                  <h4 className="text-sm font-medium text-red-800 mb-2 flex items-center gap-2">
                                    <XCircle className="w-4 h-4" />
                                    Issues Found in Your Resume
                                  </h4>
                                  <ul className="space-y-2">
                                    {item.issues.map((issue, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                                        <span className="text-red-400 mt-1">•</span>
                                        <span className="italic">"{issue}"</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Examples */}
                              {item.examples && item.examples.length > 0 && (
                                <div className="bg-gray-50 rounded-xl p-4">
                                  <h4 className="text-sm font-medium text-gray-800 mb-3">Examples</h4>
                                  <div className="space-y-3">
                                    {item.examples.map((ex, i) => (
                                      <div key={i} className="space-y-2">
                                        <div className="flex items-start gap-2">
                                          <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                          <span className="text-sm text-red-600">{ex.bad}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                          <span className="text-sm text-green-700">{ex.good}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Suggestions */}
                              {item.suggestions && item.suggestions.length > 0 && (
                                <div className="bg-blue-50 rounded-xl p-4">
                                  <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    How to Fix
                                  </h4>
                                  <ul className="space-y-1">
                                    {item.suggestions.map((suggestion, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                                        <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                                        {suggestion}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSScorePanel;
