import { useState, useEffect, useCallback } from 'react';
import { resumeService } from '@/lib/firestore/resumeService';
import { useFirebaseAuth } from './useFirebaseAuth';

/**
 * Custom hook for managing favorite templates
 * Provides real-time favorite state and toggle functionality
 */
export const useFavoriteTemplates = () => {
  const { user } = useFirebaseAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<Record<string, boolean>>({});

  // Load favorites when user changes
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const favoriteIds = await resumeService.getFavoriteTemplates();
        setFavorites(favoriteIds);
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
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
        return;
      }

      // Prevent multiple simultaneous toggles
      if (toggling[templateId]) {
        return;
      }

      try {
        setToggling(prev => ({ ...prev, [templateId]: true }));

        const wasFavorited = favorites.includes(templateId);

        // Optimistically update UI
        if (wasFavorited) {
          setFavorites(prev => prev.filter(id => id !== templateId));
        } else {
          setFavorites(prev => [...prev, templateId]);
        }

        // Update in Firestore
        if (wasFavorited) {
          await resumeService.removeFavoriteTemplate(templateId);
        } else {
          await resumeService.addFavoriteTemplate(templateId);
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
        // Revert optimistic update on error
        const currentFavorites = await resumeService.getFavoriteTemplates();
        setFavorites(currentFavorites);
      } finally {
        setToggling(prev => ({ ...prev, [templateId]: false }));
      }
    },
    [user, favorites]
  );

  /**
   * Add template to favorites
   */
  const addFavorite = useCallback(
    async (templateId: string) => {
      if (!user || favorites.includes(templateId)) {
        return;
      }

      try {
        setToggling(prev => ({ ...prev, [templateId]: true }));
        setFavorites(prev => [...prev, templateId]);
        await resumeService.addFavoriteTemplate(templateId);
      } catch (error) {
        console.error('Error adding favorite:', error);
        const currentFavorites = await resumeService.getFavoriteTemplates();
        setFavorites(currentFavorites);
      } finally {
        setToggling(prev => ({ ...prev, [templateId]: false }));
      }
    },
    [user, favorites]
  );

  /**
   * Remove template from favorites
   */
  const removeFavorite = useCallback(
    async (templateId: string) => {
      if (!user || !favorites.includes(templateId)) {
        return;
      }

      try {
        setToggling(prev => ({ ...prev, [templateId]: true }));
        setFavorites(prev => prev.filter(id => id !== templateId));
        await resumeService.removeFavoriteTemplate(templateId);
      } catch (error) {
        console.error('Error removing favorite:', error);
        const currentFavorites = await resumeService.getFavoriteTemplates();
        setFavorites(currentFavorites);
      } finally {
        setToggling(prev => ({ ...prev, [templateId]: false }));
      }
    },
    [user, favorites]
  );

  /**
   * Refresh favorites from Firestore
   */
  const refreshFavorites = useCallback(async () => {
    if (!user) return;

    try {
      const favoriteIds = await resumeService.getFavoriteTemplates();
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error refreshing favorites:', error);
    }
  }, [user]);

  return {
    favorites,
    loading,
    toggling,
    isFavorited,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    refreshFavorites,
  };
};
