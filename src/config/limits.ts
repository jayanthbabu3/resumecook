/**
 * User Limits Configuration
 *
 * Defines limits for user resources to prevent excessive storage usage.
 */

export const USER_LIMITS = {
  /**
   * Maximum number of saved resumes per user
   */
  MAX_RESUMES: 5,

  /**
   * Maximum number of favorite templates per user
   */
  MAX_FAVORITES: 5,
};

/**
 * Error messages for limit violations
 */
export const LIMIT_ERRORS = {
  RESUMES_LIMIT_REACHED: `You can only save up to ${USER_LIMITS.MAX_RESUMES} resumes. Please delete an existing resume to create a new one.`,
  FAVORITES_LIMIT_REACHED: `You can only have up to ${USER_LIMITS.MAX_FAVORITES} favorite templates. Please remove a favorite to add a new one.`,
};
