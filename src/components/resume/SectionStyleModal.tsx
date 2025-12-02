import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SectionVariant, getSectionVariants } from '@/constants/sectionVariants';
import { SectionVariantPreview } from './SectionVariantPreview';
import { Check } from 'lucide-react';

interface SectionStyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionType: string;
  sectionTitle: string;
  onSelectVariant: (variant: SectionVariant) => void;
}

export const SectionStyleModal: React.FC<SectionStyleModalProps> = ({
  isOpen,
  onClose,
  sectionType,
  sectionTitle,
  onSelectVariant,
}) => {
  const variants = getSectionVariants(sectionType);
  const [selectedVariant, setSelectedVariant] = React.useState<string | null>(null);

  const handleVariantClick = (variant: SectionVariant) => {
    setSelectedVariant(variant.id);
    // Add a small delay for visual feedback before closing
    setTimeout(() => {
      onSelectVariant(variant);
      onClose();
      setSelectedVariant(null);
    }, 200);
  };

  if (variants.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Choose {sectionTitle} Style
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Select a style variant for your {sectionTitle.toLowerCase()} section. Click on any card to add it to your resume.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {variants.map((variant) => (
            <div
              key={variant.id}
              onClick={() => handleVariantClick(variant)}
              className={`
                group relative cursor-pointer rounded-lg border-2 transition-all duration-200
                ${
                  selectedVariant === variant.id
                    ? 'border-primary shadow-lg scale-[1.02]'
                    : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                }
                bg-white overflow-hidden
              `}
            >
              {/* Selection indicator */}
              {selectedVariant === variant.id && (
                <div className="absolute top-2 right-2 z-10 bg-primary text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}

              {/* Header */}
              <div className="px-4 pt-4 pb-2 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent">
                <h3 className="font-semibold text-base text-gray-900 mb-1">
                  {variant.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {variant.description}
                </p>
              </div>

              {/* Preview */}
              <div className="bg-gray-50/50 min-h-[140px] flex items-center justify-center">
                <div className="w-full">
                  <SectionVariantPreview variant={variant} />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-200 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            You can always edit the content after adding the section to your resume
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
