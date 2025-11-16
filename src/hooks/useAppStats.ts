import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AppStats, initializeStats } from '../lib/firestore/statsService';

const STATS_COLLECTION = 'app_stats';
const STATS_DOC_ID = 'global_stats';

interface UseAppStatsReturn {
  stats: AppStats | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch and listen to real-time app stats from Firestore
 */
export const useAppStats = (): UseAppStatsReturn => {
  const [stats, setStats] = useState<AppStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupStatsListener = async () => {
      try {
        // Initialize stats if they don't exist
        await initializeStats();

        // Set up real-time listener
        const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_ID);

        unsubscribe = onSnapshot(
          statsRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              setStats({
                usersCount: data.usersCount || 0,
                downloadsCount: data.downloadsCount || 0,
                lastUpdated: data.lastUpdated?.toDate() || new Date(),
              });
            } else {
              setStats({
                usersCount: 0,
                downloadsCount: 0,
                lastUpdated: new Date(),
              });
            }
            setLoading(false);
            setError(null);
          },
          (err) => {
            console.error('Error listening to stats:', err);
            setError(err as Error);
            setLoading(false);
          }
        );
      } catch (err) {
        console.error('Error setting up stats listener:', err);
        setError(err as Error);
        setLoading(false);
      }
    };

    setupStatsListener();

    // Cleanup listener on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return { stats, loading, error };
};
