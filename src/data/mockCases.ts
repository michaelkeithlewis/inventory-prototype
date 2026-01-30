import type { CaseItem } from '../types/case';
import type { Tag } from '../types/case';

export const initialTags: Tag[] = [
  { id: 't1', name: 'Default', color: 'gray' },
  { id: 't2', name: 'Peli', color: 'yellow' },
  { id: 't3', name: 'Cart', color: 'red' },
  { id: 't4', name: 'Audio', color: 'orange' },
  { id: 't5', name: 'Pelican', color: 'blue' },
  { id: 't6', name: 'Rack', color: 'violet' },
];

export const initialCases: CaseItem[] = [
  { id: '1', name: '1/4 Pack', lengthIn: 24, widthIn: 24, heightIn: 32, weightLb: null, tagIds: ['t1'], flipHorizontal: false, flipVertical: false },
  { id: '2', name: '1510', lengthIn: 22, widthIn: 14, heightIn: 9, weightLb: 14, tagIds: ['t2', 't5'], flipHorizontal: false, flipVertical: false },
  { id: '3', name: '1637 Air', lengthIn: 61, widthIn: 30, heightIn: 76, weightLb: 92, tagIds: ['t2', 't5'], flipHorizontal: true, flipVertical: true },
  { id: '4', name: "9 Bar Lamp Rack, 5'", lengthIn: 61, widthIn: 30, heightIn: 76, weightLb: 92, tagIds: ['t3', 't6'], flipHorizontal: false, flipVertical: false },
  { id: '5', name: 'AC6 (single)', lengthIn: 24, widthIn: 14, heightIn: 9, weightLb: 14, tagIds: ['t4'], flipHorizontal: false, flipVertical: false },
  { id: '6', name: 'ADAPTive Distro', lengthIn: 22, widthIn: 14, heightIn: 9, weightLb: 14, tagIds: ['t4'], flipHorizontal: true, flipVertical: false },
  { id: '7', name: 'Adjustable Lamp Rack', lengthIn: 61, widthIn: 30, heightIn: 76, weightLb: 92, tagIds: ['t3', 't6'], flipHorizontal: false, flipVertical: false },
  { id: '8', name: '1700', lengthIn: 24, widthIn: 24, heightIn: 32, weightLb: null, tagIds: ['t2', 't5'], flipHorizontal: false, flipVertical: false },
];
