/**
 * Photo Upload Form Component
 * 
 * Handles profile photo upload via file or URL.
 */

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Camera, Trash2, Upload, EyeOff, Eye } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

interface PhotoUploadFormProps {
  photo?: string;
  onChange: (photo: string | undefined) => void;
  disabled?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const PhotoUploadForm: React.FC<PhotoUploadFormProps> = ({
  photo,
  onChange,
  disabled = false,
}) => {
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const styleOptionsContext = useStyleOptions();
  const showPhoto = styleOptionsContext?.styleOptions?.showPhoto ?? true;
  const updateStyleOption = styleOptionsContext?.updateStyleOption;

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        onChange(result);
        setPhotoUrlInput('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoRemove = () => {
    onChange(undefined);
    setPhotoUrlInput('');
  };

  const applyPhotoUrl = () => {
    const trimmed = photoUrlInput.trim();
    if (trimmed) {
      onChange(trimmed);
    } else {
      handlePhotoRemove();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePhotoUpload(file);
    }
  };

  return (
    <AccordionItem
      value="photo"
      className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
    >
      <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
        <span className="flex items-center gap-3 text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
            <Camera className="h-4 w-4" />
          </span>
          Profile Photo
        </span>
        <span className="ml-auto flex items-center gap-2">
          {/* Quick Hide/Show Button - Always Visible */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (updateStyleOption) {
                updateStyleOption('showPhoto', !showPhoto);
              }
            }}
            disabled={disabled || !updateStyleOption}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm",
              showPhoto
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-400 text-white hover:bg-gray-500"
            )}
            title={showPhoto ? "Click to hide photo" : "Click to show photo"}
          >
            {showPhoto ? (
              <>
                <Eye className="h-3.5 w-3.5" />
                <span>Visible</span>
              </>
            ) : (
              <>
                <EyeOff className="h-3.5 w-3.5" />
                <span>Hidden</span>
              </>
            )}
          </button>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-0 pb-4 pt-0">
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="pb-3">
            <CardDescription className="text-sm">Add a professional photo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Hide Photo from Resume Button - VERY Prominent */}
            <div className={cn(
              "relative p-5 rounded-2xl border-3 transition-all",
              showPhoto
                ? "border-emerald-500 bg-emerald-50"
                : "border-red-500 bg-red-50"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {showPhoto ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 shadow-md">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 shadow-md">
                      <EyeOff className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div>
                    <p className={cn(
                      "text-base font-bold",
                      showPhoto ? "text-emerald-800" : "text-red-800"
                    )}>
                      {showPhoto ? '✅ Photo is VISIBLE' : '❌ Photo is HIDDEN'}
                    </p>
                    <p className={cn(
                      "text-sm mt-1",
                      showPhoto ? "text-emerald-700" : "text-red-700"
                    )}>
                      {showPhoto ? 'Your photo will appear on the resume' : 'No photo or placeholder will be shown'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (updateStyleOption) {
                      updateStyleOption('showPhoto', !showPhoto);
                    }
                  }}
                  disabled={disabled || !updateStyleOption}
                  className={cn(
                    "flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-base transition-all transform hover:scale-105 shadow-lg",
                    showPhoto
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-emerald-500 hover:bg-emerald-600 text-white"
                  )}
                >
                  {showPhoto ? (
                    <>
                      <EyeOff className="h-5 w-5" />
                      HIDE PHOTO
                    </>
                  ) : (
                    <>
                      <Eye className="h-5 w-5" />
                      SHOW PHOTO
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Photo Preview - Only show if photo is visible */}
            {showPhoto && (
              <>
                <div className="flex justify-center">
                  <div className="h-24 w-24 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted/20 relative">
                    {photo ? (
                      <>
                        <img
                          src={photo}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handlePhotoRemove}
                            disabled={disabled}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl text-muted-foreground mb-1">📷</div>
                        <div className="text-xs text-muted-foreground">No photo</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* Upload Options */}
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-8">
                    <TabsTrigger value="upload" className="text-xs">Upload File</TabsTrigger>
                    <TabsTrigger value="url" className="text-xs">From URL</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-2 mt-3">
                    <div className="text-center">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={disabled}
                        className="gap-2 h-8 text-xs"
                      >
                        <Upload className="h-3 w-3" />
                        Choose File
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="url" className="space-y-2 mt-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Image URL..."
                        value={photoUrlInput}
                        onChange={(e) => setPhotoUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && photoUrlInput.trim()) {
                            applyPhotoUrl();
                          }
                        }}
                        disabled={disabled}
                        className="h-8 text-xs"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant={photoUrlInput.trim() ? 'default' : 'outline'}
                        onClick={applyPhotoUrl}
                        disabled={disabled || !photoUrlInput.trim()}
                        className="h-8 text-xs"
                      >
                        Apply
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PhotoUploadForm;
