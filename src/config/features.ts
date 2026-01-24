/**
 * Feature Flags Configuration
 *
 * Central place to enable/disable features.
 * Trial count is managed dynamically via the backend (maxTrialUsers in TRIAL_CONFIG).
 */

export const FEATURES = {
  /**
   * Trial System - Users get 21 days free Pro
   * The max trial count is configured in the backend (TRIAL_CONFIG.maxTrialUsers)
   * Set to false to disable all trial UI when trials are exhausted
   */
  TRIAL_SYSTEM_ENABLED: true,
};
