import React, { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavoriteTemplates } from '@/hooks/useFavoriteTemplates';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';

interface FavoriteButtonProps {
  templateId: string;
  variant?: 'icon' | 'button';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Reusable favorite button component
 * Can be displayed as icon-only or full button with label
 * Shows auth modal if user is not logged in
 */
export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  templateId,
  variant = 'icon',
  size = 'md',
  className,
  showLabel = false,
  onClick,
}) => {
  const { user } = useFirebaseAuth();
  const { isFavorited, toggleFavorite, toggling } = useFavoriteTemplates();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const favorited = isFavorited(templateId);
  const isToggling = toggling[templateId];

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClick) {
      onClick(e);
    }

    // Show auth modal if user is not logged in
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    await toggleFavorite(templateId);
  };

  // Handle successful auth - automatically add to favorites
  const handleAuthSuccess = async () => {
    await toggleFavorite(templateId);
  };

  // Icon size classes
  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  // Icon-only variant (for cards, overlays)
  if (variant === 'icon') {
    return (
      <>
        <AuthModal 
          open={showAuthModal} 
          onOpenChange={setShowAuthModal} 
          onSuccess={handleAuthSuccess}
        />
        <button
        onClick={handleClick}
        disabled={isToggling}
        className={cn(
          'group relative flex items-center justify-center rounded-full transition-all duration-200',
          'hover:scale-110 active:scale-95',
          'focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2',
          size === 'sm' && 'h-8 w-8',
          size === 'md' && 'h-10 w-10',
          size === 'lg' && 'h-12 w-12',
          favorited
            ? 'bg-red-50 hover:bg-red-100'
            : 'bg-white/90 hover:bg-white backdrop-blur-sm',
          'shadow-md hover:shadow-lg',
          isToggling && 'cursor-not-allowed opacity-60',
          className
        )}
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        title={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isToggling ? (
          <Loader2 className={cn(iconSizeClasses[size], 'animate-spin text-gray-400')} />
        ) : (
          <Heart
            className={cn(
              iconSizeClasses[size],
              'transition-all duration-200',
              favorited
                ? 'fill-red-500 text-red-500 scale-100'
                : 'text-gray-600 group-hover:text-red-500 group-hover:scale-110'
            )}
          />
        )}
      </button>
      </>
    );
  }

  // Button variant (for toolbars, navigation)
  return (
    <>
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
        onSuccess={handleAuthSuccess}
      />
      <Button
      onClick={handleClick}
      disabled={isToggling}
      variant={favorited ? 'default' : 'outline'}
      size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'}
      className={cn(
        'gap-2 transition-all duration-200',
        favorited
          ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
          : 'border-gray-300 hover:border-red-400 hover:text-red-600',
        className
      )}
    >
      {isToggling ? (
        <Loader2 className={cn(iconSizeClasses[size], 'animate-spin')} />
      ) : (
        <Heart
          className={cn(
            iconSizeClasses[size],
            'transition-all duration-200',
            favorited && 'fill-current'
          )}
        />
      )}
      {showLabel && (
        <span className="font-medium">
          {favorited ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </Button>
    </>
  );
};
