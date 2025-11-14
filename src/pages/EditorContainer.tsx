import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '@/hooks/useResume';
import { use

AutoSave } from '@/hooks/useAutoSave';
import { AutoSaveIndicatorCompact } from '@/components/AutoSaveIndicator';
import { getTemplateDefaults, type ResumeData } from './Editor';
import Editor from './Editor';
import { Loader2 } from 'lucide-react';
import { resumeService } from '@/lib/firestore/resumeService';
import { toast } from 'sonner';

/**
 * Container component that handles Firestore integration for Editor
 *
 * Routes:
 * - /editor/new/:templateId - Create new resume from template
 * - /editor/:resumeId - Edit existing resume from Firestore
 */
export default function EditorContainer() {
  const { templateId, resumeId } = useParams<{ templateId?: string; resumeId?: string }>();
  const navigate = useNavigate();

  // Determine if we're creating new or editing existing
  const isNewResume = templateId && templateId !== 'undefined';
  const existingResumeId = !isNewResume ? (templateId || resumeId) : undefined;

  // Load existing resume if editing
  const {
    resume,
    loading: loadingResume,
    updateData,
    changeTemplate,
    changeThemeColor,
  } = useResume(existingResumeId);

  // Local state for editing
  const [resumeData, setResumeData] = useState<ResumeData>(() =>
    isNewResume ? getTemplateDefaults(templateId) : ({} as ResumeData)
  );
  const [currentTemplateId, setCurrentTemplateId] = useState(
    isNewResume ? templateId : ''
  );
  const [themeColor, setThemeColor] = useState('#7c3aed');
  const [hasCreatedResume, setHasCreatedResume] = useState(false);

  // Sync resume from Firestore to local state
  useEffect(() => {
    if (resume && !isNewResume) {
      setResumeData(resume.data);
      setCurrentTemplateId(resume.templateId);
      setThemeColor(resume.themeColor);
    }
  }, [resume, isNewResume]);

  // Auto-create resume when user starts editing a new template
  useEffect(() => {
    if (isNewResume && !hasCreatedResume && resumeData) {
      // Create resume in Firestore after a short delay (so we don't create on every template click)
      const timer = setTimeout(async () => {
        try {
          const newResumeId = await resumeService.createResume(
            templateId,
            resumeData,
            {
              title: `${templateId} Resume - ${new Date().toLocaleDateString()}`,
              themeColor,
            }
          );

          setHasCreatedResume(true);

          // Redirect to the edit route
          navigate(`/editor/${newResumeId}`, { replace: true });
        } catch (error) {
          console.error('Failed to create resume:', error);
          toast.error('Failed to create resume');
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isNewResume, hasCreatedResume, resumeData, templateId, themeColor, navigate]);

  // Auto-save
  const { isSaving, lastSaved, error: saveError } = useAutoSave(
    existingResumeId,
    resumeData,
    updateData,
    {
      enabled: !isNewResume && !!existingResumeId,
      delay: 2000,
    }
  );

  // Handle theme color change
  const handleThemeColorChange = async (color: string) => {
    setThemeColor(color);
    if (existingResumeId && !isNewResume) {
      await changeThemeColor(color);
    }
  };

  // Handle template change
  const handleTemplateChange = async (newTemplateId: string) => {
    setCurrentTemplateId(newTemplateId);
    if (existingResumeId && !isNewResume) {
      await changeTemplate(newTemplateId);
    }
  };

  // Loading state
  if (loadingResume && !isNewResume) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading resume...</p>
        </div>
      </div>
    );
  }

  // Resume not found
  if (!loadingResume && !resume && !isNewResume && existingResumeId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Resume Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The resume you're looking for doesn't exist or you don't have access to it.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary underline"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Auto-save indicator */}
      {!isNewResume && existingResumeId && (
        <div className="fixed top-20 right-6 z-50 bg-white rounded-full shadow-lg px-4 py-2 border">
          <AutoSaveIndicatorCompact
            isSaving={isSaving}
            lastSaved={lastSaved}
            error={saveError}
          />
        </div>
      )}

      {/* Existing Editor component */}
      <Editor
        initialData={resumeData}
        initialTemplateId={currentTemplateId}
        initialThemeColor={themeColor}
        onDataChange={setResumeData}
        onTemplateChange={handleTemplateChange}
        onThemeColorChange={handleThemeColorChange}
        resumeId={existingResumeId}
        isNew={isNewResume}
      />
    </div>
  );
}
