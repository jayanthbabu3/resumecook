/**
 * Inline Editable Photo Component
 * 
 * Allows users to click on a photo placeholder/image to directly upload or select an image file.
 * Works similar to InlineEditableText but for image file uploads.
 */

import React, { useState, useRef } from 'react';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { cn } from '@/lib/utils';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface InlineEditablePhotoProps {
  /** Path to the photo field in resumeData (e.g., "personalInfo.photo") */
  path?: string;
  /** Current photo URL or data URL */
  value?: string;
  /** Photo display size */
  size?: string;
  /** Photo shape */
  shape?: 'circle' | 'square' | 'rounded';
  /** Border color */
  borderColor?: string;
  /** Background color for placeholder */
  backgroundColor?: string;
  /** Text color for placeholder */
  textColor?: string;
  /** Border width */
  borderWidth?: string;
  /** Box shadow for the photo */
  boxShadow?: string;
  /** Whether editing is enabled */
  editable?: boolean;
  /** Initials to display when no photo */
  initials?: string;
  /** Custom update handler (optional) */
  onCustomUpdate?: (value: string | undefined) => void;
  /** Hide button handler - shows X button to hide photo */
  onHide?: () => void;
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

export const InlineEditablePhoto: React.FC<InlineEditablePhotoProps> = ({
  path,
  value,
  size = '70px',
  shape = 'circle',
  borderColor = '#0891b2',
  backgroundColor = '#0891b215',
  textColor = '#0891b2',
  borderWidth = '2px',
  boxShadow,
  editable = true,
  initials = 'AB',
  onCustomUpdate,
  onHide,
  className,
  style,
}) => {
  const resolvedPath = path?.replace(/^resumeData\./, '');
  const canEdit = editable && Boolean(resolvedPath || onCustomUpdate);
  const { updateField } = useInlineEdit() || {};
  
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const borderRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? '12px' : '4px';

  const handlePhotoUpload = (file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        if (onCustomUpdate) {
          onCustomUpdate(result);
        } else if (resolvedPath && updateField) {
          updateField(resolvedPath, result);
        }
      }
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setIsProcessing(false);
      console.error('Error reading file');
    };
    reader.readAsDataURL(file);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!canEdit) return;
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      handlePhotoUpload(file);
    }
    // Reset input so same file can be selected again
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    if (!canEdit) return;
    e.stopPropagation();
    if (onCustomUpdate) {
      onCustomUpdate(undefined);
    } else if (resolvedPath && updateField) {
      updateField(resolvedPath, undefined);
    }
  };

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius,
    overflow: 'hidden',
    border: `${borderWidth} solid ${borderColor}`,
    boxShadow: boxShadow || '0 4px 12px rgba(0, 0, 0, 0.1)',
    flexShrink: 0,
    position: 'relative',
    ...style,
  };

  const placeholderStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: textColor,
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.02em',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isHovered && canEdit ? 1 : 0,
    transition: 'opacity 0.2s',
    cursor: canEdit ? 'pointer' : 'default',
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={!canEdit || isProcessing}
      />
      <div
        className={cn(
          'resume-photo',
          canEdit && 'cursor-pointer',
          className
        )}
        style={containerStyle}
        onClick={handleClick}
        onMouseEnter={() => canEdit && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={canEdit ? 'Click to change photo' : undefined}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Profile photo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {canEdit && (
              <div style={overlayStyle}>
                <div className="flex flex-col items-center gap-1 text-white">
                  <Upload className="h-4 w-4" />
                  <span className="text-xs font-medium">Change</span>
                </div>
              </div>
            )}
            {/* Hide button - top right corner - LARGER */}
            {onHide && isHovered && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onHide();
                }}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-xl transition-all z-50 transform hover:scale-110"
                title="Click to hide photo completely"
              >
                <X className="h-4 w-4" strokeWidth={3} />
              </button>
            )}
          </>
        ) : (
          <div style={placeholderStyle}>
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
              </div>
            ) : canEdit ? (
              <div className="flex flex-col items-center gap-1">
                <ImageIcon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{initials}</span>
              </div>
            ) : (
              <span>{initials}</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InlineEditablePhoto;
