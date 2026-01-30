import type { TagColor } from '../types/case';

// Gaff tape + resistor color coding (resistor order: 0–9)
export const TAG_COLOR_CLASSES: Record<TagColor, { bg: string; text: string; dot: string }> = {
  black: { bg: 'bg-gray-800', text: 'text-gray-100', dot: 'bg-gray-900' },
  brown: { bg: 'bg-amber-900', text: 'text-amber-100', dot: 'bg-amber-950' },
  red: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' },
  yellow: { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
  green: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-800', dot: 'bg-violet-500' },
  gray: { bg: 'bg-gray-200', text: 'text-gray-800', dot: 'bg-gray-500' },
  white: { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-400' },
};

export const TAG_COLORS: TagColor[] = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'gray',
  'white',
];
