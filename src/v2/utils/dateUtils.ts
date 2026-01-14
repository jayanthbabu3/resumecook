/**
 * Date formatting utilities for resume dates
 */

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Fallback date formatter that handles multiple date formats:
 * - YYYY-MM (e.g., "2024-01") -> "Jan 2024"
 * - YYYY (e.g., "2024") -> "Jan 2024"
 * - Mon YYYY (e.g., "Jan 2024") -> "Jan 2024" (passthrough)
 * - Present/Current -> "Present"
 */
export function formatDateFallback(date: string): string {
  if (!date) return '';

  // Handle "Present" or "Current"
  const lowerDate = date.toLowerCase().trim();
  if (lowerDate === 'present' || lowerDate === 'current') {
    return 'Present';
  }

  // Handle year-only format (e.g., "2024")
  if (/^\d{4}$/.test(date)) {
    return `Jan ${date}`;
  }

  // Handle YYYY-MM format (e.g., "2024-01")
  const isoMatch = date.match(/^(\d{4})-(\d{2})$/);
  if (isoMatch) {
    const year = isoMatch[1];
    const monthIndex = parseInt(isoMatch[2]) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${MONTHS_SHORT[monthIndex]} ${year}`;
    }
  }

  // Handle Mon YYYY format - passthrough
  if (/^[A-Za-z]+\s*\d{4}$/.test(date)) {
    return date;
  }

  // Return as-is if unrecognized
  return date;
}

/**
 * Parse a date string into month and year
 * Returns null values if the format is unrecognized
 */
export function parseDate(value: string): { month: number | null; year: number | null } {
  if (!value) return { month: null, year: null };

  // Try "Mon YYYY" format (e.g., "Jan 2024", "January 2024")
  const displayMatch = value.match(/^([A-Za-z]+)\s*(\d{4})$/);
  if (displayMatch) {
    const monthStr = displayMatch[1].toLowerCase().slice(0, 3);
    const monthIndex = MONTHS_SHORT.findIndex(m => m.toLowerCase() === monthStr);
    if (monthIndex !== -1) {
      return { month: monthIndex, year: parseInt(displayMatch[2]) };
    }
  }

  // Try "YYYY-MM" format (e.g., "2024-01")
  const isoMatch = value.match(/^(\d{4})-(\d{2})$/);
  if (isoMatch) {
    const month = parseInt(isoMatch[2]) - 1;
    const year = parseInt(isoMatch[1]);
    if (month >= 0 && month < 12) {
      return { month, year };
    }
  }

  // Try year-only format (e.g., "2024") - default to January
  const yearOnlyMatch = value.match(/^(\d{4})$/);
  if (yearOnlyMatch) {
    return { month: 0, year: parseInt(yearOnlyMatch[1]) };
  }

  return { month: null, year: null };
}
