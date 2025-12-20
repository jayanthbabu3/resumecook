import React, { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

/**
 * LiveEditor - V1 component (deprecated)
 * Redirects to V2 builder
 */
const LiveEditor = () => {
  const { templateId } = useParams<{ templateId: string; professionId?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  
  // Redirect to V2 builder immediately
  useEffect(() => {
    if (templateId) {
      const v2TemplateId = templateId.endsWith('-v2') ? templateId : `${templateId}-v2`;
      const redirectUrl = resumeId 
        ? `/v2/builder?template=${v2TemplateId}&resumeId=${resumeId}`
        : `/v2/builder?template=${v2TemplateId}`;
      navigate(redirectUrl, { replace: true });
    } else {
      navigate("/v2", { replace: true });
    }
  }, [templateId, resumeId, navigate]);
  
  return null;
};

export default LiveEditor;
