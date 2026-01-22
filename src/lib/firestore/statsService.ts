/**
 * Stats Service - Stub implementation
 * These functions are kept for backwards compatibility
 * Stats are now managed by the backend
 */

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
 * Get current stats - returns static values
 */
export const getStats = async (): Promise<AppStats | null> => {
  return {
    usersCount: 10000,
    downloadsCount: 25000,
    lastUpdated: new Date(),
  };
};

/**
 * Increment users count - no-op (tracked by backend)
 */
export const incrementUsersCount = async (): Promise<void> => {
  // No-op - tracked by backend
};

/**
 * Increment downloads count - no-op (tracked by backend)
 */
export const incrementDownloadsCount = async (): Promise<void> => {
  // No-op - tracked by backend
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
