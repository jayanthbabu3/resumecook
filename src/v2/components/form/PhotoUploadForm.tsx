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
import { Camera, Trash2, Upload } from 'lucide-react';

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
        <span className="ml-auto flex items-center">
          <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
            {photo ? 'Photo Added' : 'No Photo'}
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-0 pb-4 pt-0">
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="pb-3">
            <CardDescription className="text-sm">Add a professional photo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Photo Preview */}
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
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PhotoUploadForm;
