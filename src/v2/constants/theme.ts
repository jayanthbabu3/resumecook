/**
 * Website Theme Constants
 *
 * Centralized theme colors for the website UI (not resume templates).
 * Use these constants across all components for consistency.
 */

// Primary website theme color - Blue
export const WEBSITE_THEME = {
  // Primary color and variants
  primary: '#4A90E2',
  primaryDark: '#3A7BC8',
  primaryLight: '#6BA3E8',

  // Background variants using primary color
  primaryBg: '#4A90E210', // 6% opacity
  primaryBgLight: '#4A90E208', // 3% opacity
  primaryBgMedium: '#4A90E215', // 8% opacity
  primaryBgStrong: '#4A90E220', // 12% opacity

  // Border variants
  primaryBorder: '#4A90E230', // 19% opacity
  primaryBorderLight: '#4A90E220', // 12% opacity
  primaryBorderStrong: '#4A90E240', // 25% opacity

  // Gradient
  primaryGradient: 'linear-gradient(135deg, #4A90E2, #4A90E2dd)',
  primaryGradientHover: 'linear-gradient(135deg, #3A7BC8, #4A90E2)',
} as const;

// Shorthand for the most common use case
export const WEBSITE_PRIMARY_COLOR = WEBSITE_THEME.primary;

// Helper function to get color with custom opacity
export const withOpacity = (color: string, opacity: number): string => {
  // Convert opacity (0-100) to hex
  const hex = Math.round((opacity / 100) * 255).toString(16).padStart(2, '0');
  return `${color}${hex}`;
};
