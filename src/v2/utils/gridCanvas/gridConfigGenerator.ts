import type { GridBasedSection, GridResumeState } from "../../types/gridBuilder";

/**
 * Placeholder grid config generator.
 * In later phases this will map grid sections to a template config
 * that the PDF exporter can use.
 */
export function generateGridConfig(state: GridResumeState): {
  sections: GridBasedSection[];
} {
  return {
    sections: state.sections,
  };
}


