import { useRef, useEffect } from 'react';
import type { Tag } from '../types/case';
import { TAG_COLOR_CLASSES } from '../utils/tagColors';

interface TagFilterDropdownProps {
  tags: Tag[];
  selectedTagIds: string[];
  onSelectionChange: (tagIds: string[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function TagFilterDropdown({
  tags,
  selectedTagIds,
  onSelectionChange,
  isOpen,
  onClose,
}: TagFilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest('[data-filter-anchor]')
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const toggle = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      onSelectionChange(selectedTagIds.filter((id) => id !== tagId));
    } else {
      onSelectionChange([...selectedTagIds, tagId]);
    }
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute z-30 left-0 top-full mt-1 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden min-w-[220px] max-w-[280px]"
    >
      <div className="p-2 border-b border-gray-100">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-1">
          Filter by tag
        </p>
        <p className="text-xs text-gray-400 px-2">
          Show cases with any selected tag
        </p>
      </div>
      <div className="max-h-[260px] overflow-y-auto py-1">
        {tags.map((tag) => {
          const checked = selectedTagIds.includes(tag.id);
          const styles = TAG_COLOR_CLASSES[tag.color];
          return (
            <label
              key={tag.id}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(tag.id)}
                className="rounded border-gray-300 text-gray-600 focus:ring-gray-400"
              />
              <span className={`w-2 h-2 rounded-full shrink-0 ${styles.dot}`} />
              <span className="text-sm text-gray-800">{tag.name}</span>
            </label>
          );
        })}
      </div>
      {selectedTagIds.length > 0 && (
        <div className="p-2 border-t border-gray-100">
          <button
            type="button"
            className="w-full text-sm text-gray-600 hover:text-gray-900 py-1.5"
            onClick={clearAll}
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
