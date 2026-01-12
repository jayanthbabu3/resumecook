import React, { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

/**
 * LiveEditor - Legacy component (deprecated)
 * Redirects to new builder
 */
const LiveEditor = () => {
  const { templateId } = useParams<{ templateId: string; professionId?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  
  // Redirect to new builder immediately
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

export default LiveEditor;
