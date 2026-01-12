import { resumeService } from './resumeService';
import type { ResumeData } from '@/types/resume';
import { toast } from 'sonner';

interface LocalStorageResume {
  templateId: string;
  data: ResumeData;
  themeColor?: string;
  timestamp?: number;
}

/**
 * Migrate resumes from localStorage to Firestore
 */
export async function migrateLocalStorageToFirestore(): Promise<void> {
  try {
    // Check if migration already completed
    const migrated = localStorage.getItem('firestore_migration_completed');
    if (migrated === 'true') {
      console.log('Migration already completed');
      return;
    }

    console.log('Starting localStorage to Firestore migration...');

    const localResumes: Array<{
      key: string;
      resume: LocalStorageResume;
    }> = [];

    // Scan localStorage for resume data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      // Look for resume data keys (common patterns)
      if (
        key.startsWith('resume_') ||
        key.startsWith('resumeData_') ||
        key === 'currentResume' ||
        key === 'resumeData'
      ) {
        try {
          const value = localStorage.getItem(key);
          if (!value) continue;

          const parsed = JSON.parse(value);

          // Validate that it looks like resume data
          if (isValidResumeData(parsed)) {
            localResumes.push({
              key,
              resume: parsed,
            });
          }
        } catch (e) {
          console.error(`Failed to parse localStorage key "${key}":`, e);
        }
      }
    }

    if (localResumes.length === 0) {
      console.log('No resumes found in localStorage');
      localStorage.setItem('firestore_migration_completed', 'true');
      return;
    }

    console.log(`Found ${localResumes.length} resume(s) in localStorage`);
    toast.info(`Migrating ${localResumes.length} resume(s) to cloud...`);

    // Migrate each resume to Firestore
    let successCount = 0;
    let failCount = 0;

    for (const { key, resume } of localResumes) {
      try {
        const title = generateTitleFromKey(key);
        await resumeService.createResume(
          resume.templateId || 'professional',
          resume.data,
          {
            title,
            themeColor: resume.themeColor || '#2563eb',
          }
        );

        console.log(`✓ Migrated resume: ${title}`);
        successCount++;

        // Keep localStorage data for now (don't delete until successful)
        // We'll clear it after all migrations succeed
      } catch (error) {
        console.error(`✗ Failed to migrate resume from key "${key}":`, error);
        failCount++;
      }
    }

    // Mark migration as complete
    if (successCount > 0) {
      localStorage.setItem('firestore_migration_completed', 'true');
      localStorage.setItem(
        'firestore_migration_summary',
        JSON.stringify({
          date: new Date().toISOString(),
          migrated: successCount,
          failed: failCount,
        })
      );

      toast.success(
        `Successfully migrated ${successCount} resume(s) to cloud!`
      );

      // Optionally clear old localStorage data
      // Commented out for safety - users can clear manually
      // clearOldResumeData();

      console.log(`Migration complete: ${successCount} succeeded, ${failCount} failed`);
    } else {
      toast.error('Migration failed. Please try again.');
    }
  } catch (error) {
    console.error('Migration error:', error);
    toast.error('Failed to migrate resumes. Your data is safe in localStorage.');
  }
}

/**
 * Validate that data looks like resume data
 */
function isValidResumeData(data: any): boolean {
  if (!data || typeof data !== 'object') return false;

  // Check for ResumeData structure
  if (data.data && typeof data.data === 'object') {
    const resumeData = data.data;
    return (
      resumeData.personalInfo &&
      typeof resumeData.personalInfo === 'object' &&
      Array.isArray(resumeData.experience) &&
      Array.isArray(resumeData.education) &&
      Array.isArray(resumeData.skills)
    );
  }

  // Check for direct ResumeData structure
  if (
    data.personalInfo &&
    typeof data.personalInfo === 'object' &&
    Array.isArray(data.experience) &&
    Array.isArray(data.education) &&
    Array.isArray(data.skills)
  ) {
    // Wrap in expected format
    return true;
  }

  return false;
}

/**
 * Generate a title from localStorage key
 */
function generateTitleFromKey(key: string): string {
  // Remove common prefixes
  let title = key
    .replace(/^resume_/, '')
    .replace(/^resumeData_/, '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ');

  // Handle special cases
  if (title === 'currentResume' || title === 'resumeData') {
    title = 'My Resume';
  }

  // Capitalize
  title = title
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Add timestamp to make unique
  const date = new Date().toLocaleDateString();
  return `${title} (${date})`;
}

/**
 * Clear old resume data from localStorage (use with caution)
 */
export function clearOldResumeData(): void {
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    if (
      key.startsWith('resume_') ||
      key.startsWith('resumeData_') ||
      key === 'currentResume' ||
      key === 'resumeData'
    ) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));

  console.log(`Cleared ${keysToRemove.length} old resume keys from localStorage`);
}

/**
 * Get migration status
 */
export function getMigrationStatus(): {
  completed: boolean;
  summary?: {
    date: string;
    migrated: number;
    failed: number;
  };
} {
  const completed = localStorage.getItem('firestore_migration_completed') === 'true';
  const summaryJson = localStorage.getItem('firestore_migration_summary');

  return {
    completed,
    summary: summaryJson ? JSON.parse(summaryJson) : undefined,
  };
}
