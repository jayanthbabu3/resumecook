/**
 * Stats Service
 * Tracks application statistics via the backend API
 */

import { API_BASE_URL } from '@/config/api';

export interface AppStats {
  usersCount: number;
  downloadsCount: number;
  lastUpdated: Date;
}

/**
 * Initialize stats - no-op
 */
export const initializeStats = async (): Promise<void> => {
  // No-op - stats are managed by backend
};

/**
 * Get current stats from backend
 */
export const getStats = async (): Promise<AppStats | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public-stats`);
    const data = await response.json();
    if (data.success && data.data) {
      return {
        usersCount: data.data.usersCount || 0,
        downloadsCount: data.data.downloadsCount || 0,
        lastUpdated: new Date(),
      };
    }
  } catch (error) {
    console.error('[Stats] Failed to fetch stats:', error);
  }
  return null;
};

/**
 * Increment users count - no-op (tracked by backend on signup)
 */
export const incrementUsersCount = async (): Promise<void> => {
  // No-op - tracked by backend on user signup
};

/**
 * Increment downloads count - calls backend API
 */
export const incrementDownloadsCount = async (): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/api/public-stats/increment-download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Silently fail - don't block the download
    console.error('[Stats] Failed to increment download count:', error);
  }
};

/**
 * Format count for display (e.g., 2400 -> 2.4k)
 */
export const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};
