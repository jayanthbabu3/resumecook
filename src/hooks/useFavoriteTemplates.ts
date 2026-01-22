import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { USER_LIMITS } from '@/config/limits';

const FAVORITES_STORAGE_KEY = 'resumecook_favorite_templates';

/**
 * Custom hook for managing favorite templates
 * Uses localStorage for persistence (favorites API to be added later)
 */
export const useFavoriteTemplates = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<Record<string, boolean>>({});

  // Load favorites from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const stored = localStorage.getItem(`${FAVORITES_STORAGE_KEY}_${user.id}`);
        if (stored) {
          setFavorites(JSON.parse(stored));
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  // Save favorites to localStorage
  const saveFavorites = useCallback((newFavorites: string[]) => {
    if (!user) return;
    try {
      localStorage.setItem(`${FAVORITES_STORAGE_KEY}_${user.id}`, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [user]);

  /**
   * Check if a template is favorited
   */
  const isFavorited = useCallback(
    (templateId: string) => {
      return favorites.includes(templateId);
    },
    [favorites]
  );

  /**
   * Toggle favorite status for a template
   */
  const toggleFavorite = useCallback(
    async (templateId: string) => {
      if (!user) {
        toast.error('Please sign in to save favorites');
        return;
      }

      if (toggling[templateId]) {
        return;
      }

      try {
        setToggling(prev => ({ ...prev, [templateId]: true }));

        const wasFavorited = favorites.includes(templateId);

        // Check limit before adding
        if (!wasFavorited && favorites.length >= USER_LIMITS.MAX_FAVORITES) {
          toast.error(`You can only have up to ${USER_LIMITS.MAX_FAVORITES} favorite templates.`);
          return;
        }

        let newFavorites: string[];
        if (wasFavorited) {
          newFavorites = favorites.filter(id => id !== templateId);
        } else {
          newFavorites = [...favorites, templateId];
        }

        setFavorites(newFavorites);
        saveFavorites(newFavorites);
      } finally {
        setToggling(prev => ({ ...prev, [templateId]: false }));
      }
    },
    [user, favorites, toggling, saveFavorites]
  );

  /**
   * Add template to favorites
   */
  const addFavorite = useCallback(
    async (templateId: string) => {
      if (!user) {
        toast.error('Please sign in to save favorites');
        return;
      }

      if (favorites.includes(templateId)) {
        return;
      }

      if (favorites.length >= USER_LIMITS.MAX_FAVORITES) {
        toast.error(`You can only have up to ${USER_LIMITS.MAX_FAVORITES} favorite templates.`);
        return;
      }

      const newFavorites = [...favorites, templateId];
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
    },
    [user, favorites, saveFavorites]
  );

  /**
   * Remove template from favorites
   */
  const removeFavorite = useCallback(
    async (templateId: string) => {
      if (!user) {
        toast.error('Please sign in to manage favorites');
        return;
      }

      if (!favorites.includes(templateId)) {
        return;
      }

      const newFavorites = favorites.filter(id => id !== templateId);
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
    },
    [user, favorites, saveFavorites]
  );

  /**
   * Refresh favorites
   */
  const refreshFavorites = useCallback(async () => {
    if (!user) return;
    const stored = localStorage.getItem(`${FAVORITES_STORAGE_KEY}_${user.id}`);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, [user]);

  const canAddFavorite = favorites.length < USER_LIMITS.MAX_FAVORITES;
  const favoritesLimit = USER_LIMITS.MAX_FAVORITES;
  const favoritesCount = favorites.length;

  return {
    favorites,
    loading,
    toggling,
    isFavorited,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    refreshFavorites,
    canAddFavorite,
    favoritesLimit,
    favoritesCount,
  };
};
