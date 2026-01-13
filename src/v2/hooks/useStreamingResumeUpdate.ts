/**
 * Streaming Resume Update Hook
 *
 * Creates a ChatGPT-like typing/streaming effect when resume data is updated.
 * Text fields are revealed character by character, creating a smooth typing animation.
 *
 * IMPORTANT UPDATE (2025):
 * - For EXPERIENCE, EDUCATION, PROJECTS: The AI now returns COMPLETE arrays.
 *   The hook will REPLACE the entire array with the AI's response (already chronologically sorted).
 * - For other sections (skills, certifications, etc.): The AI returns only NEW items,
 *   which are APPENDED to existing arrays.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { V2ResumeData } from '../types/resumeData';
import { ResumeUpdates, ChatResumeUpdatePayload } from '../types/chat';

interface StreamingState {
  isStreaming: boolean;
  currentField: string | null;
  progress: number; // 0-100
}

interface UseStreamingResumeUpdateOptions {
  /** Base resume data */
  baseData: V2ResumeData;
  /** Callback when streaming updates should be applied - includes section info */
  onUpdate: (payload: ChatResumeUpdatePayload) => void;
  /** Typing speed in ms per character (default: 15) */
  typingSpeed?: number;
  /** Delay between fields in ms (default: 100) */
  fieldDelay?: number;
}

interface UseStreamingResumeUpdateReturn {
  /** Current streaming state */
  streamingState: StreamingState;
  /** Start streaming updates to the resume */
  streamUpdates: (updates: ResumeUpdates, updatedSections: string[]) => Promise<void>;
  /** Stop any ongoing streaming */
  stopStreaming: () => void;
  /** Whether currently streaming */
  isStreaming: boolean;
}

// Helper to sleep for a given time
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function useStreamingResumeUpdate({
  baseData,
  onUpdate,
  typingSpeed = 15,
  fieldDelay = 100,
}: UseStreamingResumeUpdateOptions): UseStreamingResumeUpdateReturn {
  const [streamingState, setStreamingState] = useState<StreamingState>({
    isStreaming: false,
    currentField: null,
    progress: 0,
  });

  const abortRef = useRef(false);
  const currentDataRef = useRef(baseData);

  // Keep ref in sync with base data
  useEffect(() => {
    currentDataRef.current = baseData;
  }, [baseData]);

  const stopStreaming = useCallback(() => {
    abortRef.current = true;
    setStreamingState({
      isStreaming: false,
      currentField: null,
      progress: 0,
    });
  }, []);

  /**
   * Stream a single text field with typewriter effect
   */
  const streamTextField = useCallback(
    async (
      fullText: string,
      onPartialUpdate: (partial: string) => void,
      fieldName: string
    ): Promise<boolean> => {
      if (!fullText || abortRef.current) return !abortRef.current;

      setStreamingState((prev) => ({
        ...prev,
        currentField: fieldName,
      }));

      const length = fullText.length;

      for (let i = 0; i <= length; i++) {
        if (abortRef.current) return false;

        const partial = fullText.substring(0, i);
        onPartialUpdate(partial);

        // Update progress
        setStreamingState((prev) => ({
          ...prev,
          progress: Math.round((i / length) * 100),
        }));

        // Variable delay - faster for spaces/punctuation
        const char = fullText[i];
        const delay =
          char === ' ' || char === ',' || char === '.'
            ? typingSpeed * 0.3
            : typingSpeed;

        await sleep(delay);
      }

      return true;
    },
    [typingSpeed]
  );

  /**
   * Main function to stream all updates
   * NEW items are APPENDED to existing arrays
   * @param updates - The resume updates from AI
   * @param updatedSections - List of section keys that were updated (passed through to callback)
   */
  const streamUpdates = useCallback(
    async (updates: ResumeUpdates, updatedSections: string[] = []) => {
      if (!updates || Object.keys(updates).length === 0) return;

      abortRef.current = false;
      setStreamingState({
        isStreaming: true,
        currentField: null,
        progress: 0,
      });

      // Start with current data - we will APPEND to it, not replace
      let currentData = { ...currentDataRef.current };

      // Helper to call onUpdate with section info
      const emitUpdate = (data: V2ResumeData) => {
        onUpdate({
          data,
          updatedSections,
          updates,
        });
      };

      try {
        // Stream personal info updates (these are always updates, not additions)
        if (updates.personalInfo) {
          const personalFields = ['fullName', 'title', 'email', 'phone', 'location', 'summary'] as const;

          for (const field of personalFields) {
            if (abortRef.current) break;

            const value = updates.personalInfo[field];
            if (value && typeof value === 'string') {
              await streamTextField(
                value,
                (partial) => {
                  currentData = {
                    ...currentData,
                    personalInfo: {
                      ...currentData.personalInfo,
                      [field]: partial,
                    },
                  };
                  emitUpdate(currentData);
                },
                `personalInfo.${field}`
              );
              await sleep(fieldDelay);
            }
          }

          // Set other personal info fields immediately (links)
          const linkFields = ['linkedin', 'github', 'portfolio', 'website'] as const;
          for (const field of linkFields) {
            const value = updates.personalInfo[field];
            if (value && typeof value === 'string') {
              currentData = {
                ...currentData,
                personalInfo: {
                  ...currentData.personalInfo,
                  [field]: value,
                },
              };
            }
          }
          if (linkFields.some(f => updates.personalInfo?.[f])) {
            emitUpdate(currentData);
          }
        }

        // Stream experience updates - AI returns COMPLETE array, already chronologically sorted
        // We REPLACE the entire experience array with AI's response
        if (updates.experience && updates.experience.length > 0) {
          // The AI returns the COMPLETE experience array in correct order
          // We stream items for visual effect, then use the final array as-is
          const finalExperiences: typeof updates.experience = [];

          for (let i = 0; i < updates.experience.length; i++) {
            if (abortRef.current) break;

            const exp = updates.experience[i];

            // Check if this item already exists in current data (by ID)
            const existingExp = (currentData.experience || []).find(e => e.id === exp.id);

            if (existingExp) {
              // Existing item - add immediately without streaming animation
              finalExperiences.push(exp);
              currentData = { ...currentData, experience: [...finalExperiences] };
              emitUpdate(currentData);
              console.log(`[Streaming] Preserved existing experience: ${exp.company}`);
            } else {
              // NEW experience - stream with animation
              let expData = {
                ...exp,
                id: exp.id || `exp-new-${Date.now()}-${i}`,
                company: '',
                position: '',
                description: '',
                bulletPoints: [] as string[],
              };

              // Add placeholder
              finalExperiences.push(expData);

              // Stream company
              if (exp.company) {
                await streamTextField(
                  exp.company,
                  (partial) => {
                    expData = { ...expData, company: partial };
                    finalExperiences[finalExperiences.length - 1] = expData;
                    currentData = { ...currentData, experience: [...finalExperiences] };
                    emitUpdate(currentData);
                  },
                  `experience[${i}].company`
                );
                await sleep(fieldDelay);
              }

              // Stream position
              if (exp.position) {
                await streamTextField(
                  exp.position,
                  (partial) => {
                    expData = { ...expData, position: partial };
                    finalExperiences[finalExperiences.length - 1] = expData;
                    currentData = { ...currentData, experience: [...finalExperiences] };
                    emitUpdate(currentData);
                  },
                  `experience[${i}].position`
                );
                await sleep(fieldDelay);
              }

              // Set dates immediately
              expData = {
                ...expData,
                startDate: exp.startDate || '',
                endDate: exp.endDate || '',
                current: exp.current ?? false,
                location: exp.location || '',
              };
              finalExperiences[finalExperiences.length - 1] = expData;
              currentData = { ...currentData, experience: [...finalExperiences] };
              emitUpdate(currentData);

              // Stream description
              if (exp.description) {
                await streamTextField(
                  exp.description,
                  (partial) => {
                    expData = { ...expData, description: partial };
                    finalExperiences[finalExperiences.length - 1] = expData;
                    currentData = { ...currentData, experience: [...finalExperiences] };
                    emitUpdate(currentData);
                  },
                  `experience[${i}].description`
                );
                await sleep(fieldDelay);
              }

              // Stream bullet points one by one
              if (exp.bulletPoints && exp.bulletPoints.length > 0) {
                const streamedBullets: string[] = [];

                for (let j = 0; j < exp.bulletPoints.length; j++) {
                  if (abortRef.current) break;

                  await streamTextField(
                    exp.bulletPoints[j],
                    (partial) => {
                      const bullets = [...streamedBullets, partial];
                      expData = { ...expData, bulletPoints: bullets };
                      finalExperiences[finalExperiences.length - 1] = expData;
                      currentData = { ...currentData, experience: [...finalExperiences] };
                      emitUpdate(currentData);
                    },
                    `experience[${i}].bulletPoints[${j}]`
                  );

                  streamedBullets.push(exp.bulletPoints[j]);
                  await sleep(fieldDelay);
                }
              }

              // Finalize with complete data
              finalExperiences[finalExperiences.length - 1] = exp;
              currentData = { ...currentData, experience: [...finalExperiences] };
              emitUpdate(currentData);

              console.log(`[Streaming] Added new experience: ${exp.company}`);
            }
          }

          // Final state: use the complete array from AI (already in correct order)
          currentData = { ...currentData, experience: [...finalExperiences] };
          emitUpdate(currentData);
        }

        // Stream education updates - AI returns COMPLETE array, already sorted
        // We REPLACE the entire education array with AI's response
        if (updates.education && updates.education.length > 0) {
          const finalEducation: typeof updates.education = [];

          for (let i = 0; i < updates.education.length; i++) {
            if (abortRef.current) break;

            const edu = updates.education[i];

            // Check if this item already exists (by ID)
            const existingEdu = (currentData.education || []).find(e => e.id === edu.id);

            if (existingEdu) {
              // Existing item - add immediately without streaming
              finalEducation.push(edu);
              currentData = { ...currentData, education: [...finalEducation] };
              emitUpdate(currentData);
              console.log(`[Streaming] Preserved existing education: ${edu.school}`);
            } else {
              // NEW education - stream with animation
              let eduData = { ...edu, school: '', degree: '', field: '' };
              finalEducation.push(eduData);

              // Stream school
              if (edu.school) {
                await streamTextField(
                  edu.school,
                  (partial) => {
                    eduData = { ...eduData, school: partial };
                    finalEducation[finalEducation.length - 1] = eduData;
                    currentData = { ...currentData, education: [...finalEducation] };
                    emitUpdate(currentData);
                  },
                  `education[${i}].school`
                );
                await sleep(fieldDelay);
              }

              // Stream degree
              if (edu.degree) {
                await streamTextField(
                  edu.degree,
                  (partial) => {
                    eduData = { ...eduData, degree: partial };
                    finalEducation[finalEducation.length - 1] = eduData;
                    currentData = { ...currentData, education: [...finalEducation] };
                    emitUpdate(currentData);
                  },
                  `education[${i}].degree`
                );
                await sleep(fieldDelay);
              }

              // Stream field
              if (edu.field) {
                await streamTextField(
                  edu.field,
                  (partial) => {
                    eduData = { ...eduData, field: partial };
                    finalEducation[finalEducation.length - 1] = eduData;
                    currentData = { ...currentData, education: [...finalEducation] };
                    emitUpdate(currentData);
                  },
                  `education[${i}].field`
                );
                await sleep(fieldDelay);
              }

              // Set other fields immediately and finalize
              finalEducation[finalEducation.length - 1] = edu;
              currentData = { ...currentData, education: [...finalEducation] };
              emitUpdate(currentData);
              console.log(`[Streaming] Added new education: ${edu.school}`);
            }
          }

          // Final state: use the complete array from AI
          currentData = { ...currentData, education: [...finalEducation] };
          emitUpdate(currentData);
        }

        // Stream skills - APPEND new skills (skip duplicates)
        if (updates.skills && updates.skills.length > 0) {
          const existingSkillNames = new Set(
            (currentData.skills || []).map((s) => s.name.toLowerCase())
          );

          for (const skill of updates.skills) {
            if (abortRef.current) break;
            if (existingSkillNames.has(skill.name.toLowerCase())) continue;

            await streamTextField(
              skill.name,
              (partial) => {
                const tempSkills = [
                  ...(currentData.skills || []),
                  { ...skill, name: partial },
                ];
                emitUpdate({ ...currentData, skills: tempSkills });
              },
              `skills.${skill.name}`
            );

            currentData = {
              ...currentData,
              skills: [...(currentData.skills || []), skill],
            };
            existingSkillNames.add(skill.name.toLowerCase());
            await sleep(fieldDelay * 0.5);
          }
        }

        // Stream languages - APPEND new languages (skip duplicates)
        if (updates.languages && updates.languages.length > 0) {
          const existingLangs = new Set(
            (currentData.languages || []).map((l) => l.language.toLowerCase())
          );

          for (const lang of updates.languages) {
            if (abortRef.current) break;
            if (existingLangs.has(lang.language.toLowerCase())) continue;

            await streamTextField(
              lang.language,
              (partial) => {
                const tempLangs = [
                  ...(currentData.languages || []),
                  { ...lang, language: partial },
                ];
                emitUpdate({ ...currentData, languages: tempLangs });
              },
              `languages.${lang.language}`
            );

            currentData = {
              ...currentData,
              languages: [...(currentData.languages || []), lang],
            };
            existingLangs.add(lang.language.toLowerCase());
            await sleep(fieldDelay);
          }
        }

        // Handle projects - AI returns COMPLETE array, REPLACE entirely
        if (updates.projects && updates.projects.length > 0) {
          const finalProjects: typeof updates.projects = [];

          for (let i = 0; i < updates.projects.length; i++) {
            if (abortRef.current) break;

            const proj = updates.projects[i];

            // Check if this item already exists (by ID)
            const existingProj = (currentData.projects || []).find(p => p.id === proj.id);

            if (existingProj) {
              // Existing item - add immediately
              finalProjects.push(proj);
              currentData = { ...currentData, projects: [...finalProjects] };
              emitUpdate(currentData);
              console.log(`[Streaming] Preserved existing project: ${proj.name}`);
            } else {
              // NEW project - add with brief animation
              finalProjects.push(proj);
              currentData = { ...currentData, projects: [...finalProjects] };
              emitUpdate(currentData);
              await sleep(fieldDelay);
              console.log(`[Streaming] Added new project: ${proj.name}`);
            }
          }

          currentData = { ...currentData, projects: [...finalProjects] };
          emitUpdate(currentData);
        }

        // Handle other sections (NOT experience/education/projects) - APPEND with brief animation
        const appendSections: (keyof ResumeUpdates)[] = [
          'certifications', 'achievements', 'awards',
          'publications', 'volunteer', 'speaking', 'patents',
          'interests', 'references', 'courses', 'strengths'
        ];

        for (const section of appendSections) {
          const items = updates[section] as any[] | undefined;
          if (!items || items.length === 0) continue;

          for (const item of items) {
            if (abortRef.current) break;

            // APPEND to existing array
            currentData = {
              ...currentData,
              [section]: [...((currentData as any)[section] || []), item],
            };
            emitUpdate(currentData);
            await sleep(fieldDelay);
          }
        }

        // Handle customSections - REPLACE or APPEND based on ID
        if (updates.customSections && updates.customSections.length > 0) {
          console.log('[Streaming] Processing customSections:', updates.customSections);
          const existingCustomSections = [...(currentData.customSections || [])];

          for (const newSection of updates.customSections) {
            if (abortRef.current) break;

            // Check if section with same ID exists
            const existingIdx = existingCustomSections.findIndex(s => s.id === newSection.id);

            if (existingIdx !== -1) {
              // Replace existing section
              existingCustomSections[existingIdx] = newSection;
              console.log(`[Streaming] Replaced existing customSection: ${newSection.id}`);
            } else {
              // Append new section
              existingCustomSections.push(newSection);
              console.log(`[Streaming] Added new customSection: ${newSection.id}, title: ${newSection.title}`);
            }

            currentData = { ...currentData, customSections: [...existingCustomSections] };
            console.log('[Streaming] Updated currentData.customSections:', currentData.customSections);
            emitUpdate(currentData);
            await sleep(fieldDelay);
          }
        }

        // NOTE: No frontend sorting needed - AI returns arrays already in correct chronological order
      } catch (error) {
        console.error('Streaming error:', error);
      } finally {
        setStreamingState({
          isStreaming: false,
          currentField: null,
          progress: 100,
        });
      }
    },
    [streamTextField, fieldDelay, onUpdate]
  );

  return {
    streamingState,
    streamUpdates,
    stopStreaming,
    isStreaming: streamingState.isStreaming,
  };
}

// NOTE: Frontend sorting functions removed - AI now returns arrays already in correct chronological order
