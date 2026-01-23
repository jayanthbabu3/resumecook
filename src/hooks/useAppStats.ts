import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';

export interface AppStats {
  usersCount: number;
  downloadsCount: number;
  lastUpdated: Date;
}

interface UseAppStatsReturn {
  stats: AppStats | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch app stats from the backend
 * Returns real user and download counts from the database
 */
export const useAppStats = (): UseAppStatsReturn => {
  const [stats, setStats] = useState<AppStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/public-stats`);
        const data = await response.json();

        if (data.success && data.data) {
          setStats({
            usersCount: data.data.usersCount || 0,
            downloadsCount: data.data.downloadsCount || 0,
            lastUpdated: new Date(),
          });
        } else {
          // Fallback to 0 if API fails
          setStats({
            usersCount: 0,
            downloadsCount: 0,
            lastUpdated: new Date(),
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch stats'));
        // Still set stats to 0 to avoid showing loading forever
        setStats({
          usersCount: 0,
          downloadsCount: 0,
          lastUpdated: new Date(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
