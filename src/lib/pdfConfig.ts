/**
 * Shared PDF configuration for consistent page layout across all resume templates
 * This ensures proper pagination, consistent margins, and no empty pages
 */

/**
 * Standard page margins for A4 PDF documents
 * These values ensure consistent spacing on all pages
 */
export const PDF_PAGE_MARGINS = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40,
} as const;

/**
 * Standard page style for all PDF templates
 * Use this as the base style for the Page component
 */
export const getStandardPageStyle = (additionalStyles?: Record<string, any>) => ({
  paddingTop: PDF_PAGE_MARGINS.top,
  paddingRight: PDF_PAGE_MARGINS.right,
  paddingBottom: PDF_PAGE_MARGINS.bottom,
  paddingLeft: PDF_PAGE_MARGINS.left,
  fontSize: 10,
  fontFamily: 'Inter',
  ...additionalStyles,
});

/**
 * Utility to check if a section has content and should be rendered
 * Prevents empty sections from creating unnecessary space or pages
 */
export const hasContent = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Utility to filter out empty array items
 */
export const filterNonEmpty = <T,>(array: T[], checkField?: keyof T): T[] => {
  if (!checkField) {
    return array.filter(item => item !== null && item !== undefined);
  }
  return array.filter(item => hasContent(item[checkField]));
};
