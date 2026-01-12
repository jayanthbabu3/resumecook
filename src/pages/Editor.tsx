import React, { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

/**
 * Editor - V1 component (deprecated)
 * Redirects to V2 builder
 */
export interface EditorProps {
  initialTemplateId?: string;
  initialData?: any;
  initialThemeColor?: string;
  resumeId?: string;
  onDataChange?: (data: any) => void;
  onThemeColorChange?: (color: string) => void;
}

const Editor = (props: EditorProps = {}) => {
  const { templateId: routeTemplateId } = useParams<{ templateId: string; professionId?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const routeResumeId = searchParams.get("resumeId");
  
  const templateId = props.initialTemplateId || routeTemplateId;
  const resumeId = props.resumeId || routeResumeId;
  
  // Redirect to V2 builder immediately
  useEffect(() => {
    if (templateId) {
      const v2TemplateId = templateId.endsWith('-v2') ? templateId : `${templateId}-v2`;
      const redirectUrl = resumeId 
        ? `/builder?template=${v2TemplateId}&resumeId=${resumeId}`
        : `/builder?template=${v2TemplateId}`;
      navigate(redirectUrl, { replace: true });
    } else {
      navigate("/templates", { replace: true });
    }
  }, [templateId, resumeId, navigate]);
  
  return null;
};

export default Editor;
