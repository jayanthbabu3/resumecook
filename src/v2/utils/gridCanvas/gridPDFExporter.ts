import type { GridResumeState } from "../../types/gridBuilder";

/**
 * Placeholder PDF exporter for grid canvas.
 * Later this will integrate with the existing Puppeteer-based exporter.
 */
export async function exportGridPDF(_state: GridResumeState): Promise<void> {
  // TODO: Implement grid-aware PDF export
  return Promise.resolve();
}


