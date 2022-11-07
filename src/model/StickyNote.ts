export const StickyNoteThemeColors = {
  yellow: "#ffee93",
  green: "#adf7b6",
  blue: "#a0ced9",
  red: "#ffc09f",
};

export type PositionType = {
  x: number;
  y: number;
};

export type StickyNoteType = {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  z?: number;
  color?: keyof typeof StickyNoteThemeColors;
  text?: string;
};
