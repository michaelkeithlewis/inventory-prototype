// Gaff tape + resistor color coding palette
export type TagColor =
  | 'black'
  | 'brown'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'violet'
  | 'gray'
  | 'white';

export interface Tag {
  id: string;
  name: string;
  color: TagColor;
}

export interface CaseItem {
  id: string;
  name: string;
  lengthIn: number;
  widthIn: number;
  heightIn: number;
  weightLb: number | null;
  tagIds: string[];
  /** Flip over horizontal axis (top/bottom) */
  flipHorizontal: boolean;
  /** Spin around vertical axis */
  flipVertical: boolean;
}
