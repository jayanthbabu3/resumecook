import { useState, useEffect, useCallback } from 'react';
import { resumeService } from '@/lib/firestore/resumeService';
import type {
  Resume,
  ResumeData,
  ResumeMetadata,
  CreateResumeOptions,
  ResumeVersion,
} from '@/types/resume';
import { toast } from 'sonner';

/**
 * Hook for managing a single resume
 */
export function useResume(resumeId?: string) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadResume = useCallback(async () => {
    if (!resumeId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await resumeService.getResume(resumeId);
      setResume(data);
    } catch (e) {
      const error = e as Error;
      setError(error);
      console.error('Failed to load resume:', error);
      toast.error('Failed to load resume');
    } finally {
      setLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  const updateData = useCallback(
    async (data: ResumeData) => {
      if (!resumeId) return;

      try {
        await resumeService.updateResumeData(resumeId, data);
        setResume((prev) => (prev ? { ...prev, data } : null));
      } catch (e) {
        console.error('Failed to save resume:', e);
        toast.error('Failed to save changes');
        throw e;
      }
    },
    [resumeId]
  );

  const changeTemplate = useCallback(
    async (templateId: string) => {
      if (!resumeId) return;

      try {
        await resumeService.changeTemplate(resumeId, templateId);
        setResume((prev) => (prev ? { ...prev, templateId } : null));
      } catch (e) {
        console.error('Failed to change template:', e);
        toast.error('Failed to change template');
        throw e;
      }
    },
    [resumeId]
  );

  const changeThemeColor = useCallback(
    async (themeColor: string) => {
      if (!resumeId) return;

      try {
        await resumeService.changeThemeColor(resumeId, themeColor);
        setResume((prev) => (prev ? { ...prev, themeColor } : null));
      } catch (e) {
        console.error('Failed to change theme color:', e);
        throw e;
      }
    },
    [resumeId]
  );

  const updateTitle = useCallback(
    async (title: string) => {
      if (!resumeId) return;

      try {
        await resumeService.updateTitle(resumeId, title);
        setResume((prev) => (prev ? { ...prev, title } : null));
      } catch (e) {
        console.error('Failed to update title:', e);
        toast.error('Failed to update title');
        throw e;
      }
    },
    [resumeId]
  );

  const makePublic = useCallback(
    async (slug?: string) => {
      if (!resumeId) return;

      try {
        const shareSlug = await resumeService.makePublic(resumeId, slug);
        setResume((prev) =>
          prev ? { ...prev, isPublic: true, shareSlug } : null
        );
        return shareSlug;
      } catch (e) {
        console.error('Failed to make public:', e);
        toast.error('Failed to make resume public');
        throw e;
      }
    },
    [resumeId]
  );

  const makePrivate = useCallback(async () => {
    if (!resumeId) return;

    try {
      await resumeService.makePrivate(resumeId);
      setResume((prev) =>
        prev ? { ...prev, isPublic: false, shareSlug: undefined } : null
      );
    } catch (e) {
      console.error('Failed to make private:', e);
      toast.error('Failed to make resume private');
      throw e;
    }
  }, [resumeId]);

  const incrementDownloadCount = useCallback(async () => {
    if (!resumeId) return;

    try {
      await resumeService.incrementDownloadCount(resumeId);
    } catch (e) {
      console.error('Failed to increment download count:', e);
    }
  }, [resumeId]);

  return {
    resume,
    loading,
    error,
    updateData,
    changeTemplate,
    changeThemeColor,
    updateTitle,
    makePublic,
    makePrivate,
    incrementDownloadCount,
    reload: loadResume,
  };
}

/**
 * Hook for managing user's resume collection
 */
export function useUserResumes() {
  const [resumes, setResumes] = useState<ResumeMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadResumes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await resumeService.getUserResumes();
      setResumes(data);
    } catch (e) {
      const error = e as Error;
      setError(error);
      console.error('Failed to load resumes:', error);
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  const createResume = useCallback(
    async (
      templateId: string,
      data: ResumeData,
      options?: CreateResumeOptions
    ) => {
      try {
        const id = await resumeService.createResume(templateId, data, options);
        await loadResumes();
        return id;
      } catch (e) {
        console.error('Failed to create resume:', e);
        toast.error('Failed to create resume');
        throw e;
      }
    },
    [loadResumes]
  );

  const deleteResume = useCallback(
    async (id: string) => {
      try {
        await resumeService.deleteResume(id);
        await loadResumes();
      } catch (e) {
        console.error('Failed to delete resume:', e);
        toast.error('Failed to delete resume');
        throw e;
      }
    },
    [loadResumes]
  );

  const duplicateResume = useCallback(
    async (id: string) => {
      try {
        const newId = await resumeService.duplicateResume(id);
        await loadResumes();
        return newId;
      } catch (e) {
        console.error('Failed to duplicate resume:', e);
        toast.error('Failed to duplicate resume');
        throw e;
      }
    },
    [loadResumes]
  );

  const setPrimaryResume = useCallback(
    async (id: string) => {
      try {
        await resumeService.setPrimaryResume(id);
        await loadResumes();
      } catch (e) {
        console.error('Failed to set primary resume:', e);
        toast.error('Failed to set primary resume');
        throw e;
      }
    },
    [loadResumes]
  );

  return {
    resumes,
    loading,
    error,
    createResume,
    deleteResume,
    duplicateResume,
    setPrimaryResume,
    reload: loadResumes,
  };
}

/**
 * Hook for managing resume version history
 */
export function useResumeVersions(resumeId?: string) {
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadVersions = useCallback(async () => {
    if (!resumeId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await resumeService.getVersionHistory(resumeId);
      setVersions(data);
    } catch (e) {
      const error = e as Error;
      setError(error);
      console.error('Failed to load versions:', error);
    } finally {
      setLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    loadVersions();
  }, [loadVersions]);

  const createVersion = useCallback(
    async (
      data: ResumeData,
      templateId: string,
      themeColor: string,
      description?: string
    ) => {
      if (!resumeId) return;

      try {
        await resumeService.createVersion(
          resumeId,
          data,
          templateId,
          themeColor,
          description
        );
        await loadVersions();
        toast.success('Version saved');
      } catch (e) {
        console.error('Failed to create version:', e);
        toast.error('Failed to save version');
        throw e;
      }
    },
    [resumeId, loadVersions]
  );

  const restoreVersion = useCallback(
    async (versionId: string) => {
      if (!resumeId) return;

      try {
        await resumeService.restoreVersion(resumeId, versionId);
        await loadVersions();
      } catch (e) {
        console.error('Failed to restore version:', e);
        toast.error('Failed to restore version');
        throw e;
      }
    },
    [resumeId, loadVersions]
  );

  return {
    versions,
    loading,
    error,
    createVersion,
    restoreVersion,
    reload: loadVersions,
  };
}
