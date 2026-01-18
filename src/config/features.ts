/**
 * Feature Flags Configuration
 *
 * Central place to enable/disable features.
 * After 1000 trial users, set TRIAL_SYSTEM_ENABLED to false.
 */

export const FEATURES = {
  /**
   * Trial System - First 1000 users get 7 days free Pro
   * Set to false after reaching 1000 users to disable all trial UI
   */
  TRIAL_SYSTEM_ENABLED: true,
};
