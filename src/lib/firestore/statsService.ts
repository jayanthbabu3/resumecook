import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

const STATS_COLLECTION = 'app_stats';
const STATS_DOC_ID = 'global_stats';

export interface AppStats {
  usersCount: number;
  downloadsCount: number;
  lastUpdated: Date;
}

/**
 * Initialize stats document if it doesn't exist
 */
export const initializeStats = async (): Promise<void> => {
  try {
    const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_ID);
    const statsDoc = await getDoc(statsRef);

    if (!statsDoc.exists()) {
      const initialStats: AppStats = {
        usersCount: 0,
        downloadsCount: 0,
        lastUpdated: new Date(),
      };
      await setDoc(statsRef, initialStats);
      console.log('Stats document initialized');
    }
  } catch (error) {
    console.error('Error initializing stats:', error);
    throw error;
  }
};

/**
 * Get current stats from Firestore
 */
export const getStats = async (): Promise<AppStats | null> => {
  try {
    const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_ID);
    const statsDoc = await getDoc(statsRef);

    if (statsDoc.exists()) {
      const data = statsDoc.data();
      return {
        usersCount: data.usersCount || 0,
        downloadsCount: data.downloadsCount || 0,
        lastUpdated: data.lastUpdated?.toDate() || new Date(),
      };
    }

    // Initialize if doesn't exist
    await initializeStats();
    return {
      usersCount: 0,
      downloadsCount: 0,
      lastUpdated: new Date(),
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return null;
  }
};

/**
 * Increment users count
 */
export const incrementUsersCount = async (): Promise<void> => {
  try {
    const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_ID);
    await updateDoc(statsRef, {
      usersCount: increment(1),
      lastUpdated: new Date(),
    });
  } catch (error) {
    console.error('Error incrementing users count:', error);
    throw error;
  }
};

/**
 * Increment downloads count
 */
export const incrementDownloadsCount = async (): Promise<void> => {
  try {
    const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_ID);
    await updateDoc(statsRef, {
      downloadsCount: increment(1),
      lastUpdated: new Date(),
    });
  } catch (error) {
    console.error('Error incrementing downloads count:', error);
    throw error;
  }
};

/**
 * Format count for display (e.g., 2400 -> 2.4k+)
 */
export const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M+`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k+`;
  }
  return count.toString();
};
