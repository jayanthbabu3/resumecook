export type RgbColor = { r: number; g: number; b: number };

const parseHexColor = (value: string): RgbColor | null => {
  const hex = value.replace('#', '').trim();
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    return { r, g, b };
  }
  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
};

const parseRgbColor = (value: string): RgbColor | null => {
  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;
  const parts = match[1].split(',').map(part => parseFloat(part.trim()));
  if (parts.length < 3 || parts.some(part => Number.isNaN(part))) return null;
  const [r, g, b] = parts;
  return { r, g, b };
};

const parseColor = (value: string): RgbColor | null => {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'transparent') return null;
  if (normalized.startsWith('#')) return parseHexColor(normalized);
  if (normalized.startsWith('rgb')) return parseRgbColor(normalized);
  return null;
};

export const getPillTextColor = (backgroundColor: string | undefined, fallback: string): string => {
  if (!backgroundColor) return fallback;
  const rgb = parseColor(backgroundColor);
  if (!rgb) return fallback;
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return luminance < 0.55 ? '#ffffff' : fallback;
};
