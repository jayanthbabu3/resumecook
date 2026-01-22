import { useState, useEffect } from 'react';

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
 * Hook to provide app stats
 * Currently returns static values - can be updated to fetch from API later
 */
export const useAppStats = (): UseAppStatsReturn => {
  const [stats, setStats] = useState<AppStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Return static stats for now
    // These can be updated to fetch from an API endpoint
    const timer = setTimeout(() => {
      setStats({
        usersCount: 10000,
        downloadsCount: 25000,
        lastUpdated: new Date(),
      });
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { stats, loading, error: null };
};
