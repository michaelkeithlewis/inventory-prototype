import { useState, useRef, useEffect } from 'react';
import type { Tag } from '../types/case';
import { TagPill } from './TagPill';
import { TagSelectDropdown } from './TagSelectDropdown';

interface TagCellProps {
  caseId: string;
  tagIds: string[];
  tagsById: Map<string, Tag>;
  onRenameTag: (tagId: string, newName: string) => void;
  onTagColorChange: (tagId: string, color: Tag['color']) => void;
  onAddTag: (caseId: string, tagId: string) => void;
  onCreateTag: (caseId: string, name: string, color: Tag['color']) => void;
  onRemoveTag: (caseId: string, tagId: string) => void;
}

export function TagCell({
  caseId,
  tagIds,
  tagsById,
  onRenameTag,
  onTagColorChange,
  onAddTag,
  onCreateTag,
  onRemoveTag,
}: TagCellProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const addZoneRef = useRef<HTMLDivElement>(null);

  const caseTags = tagIds.map((id) => tagsById.get(id)).filter(Boolean) as Tag[];

  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        addZoneRef.current &&
        !addZoneRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest('[data-tag-dropdown]')
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <td className="py-3 px-4 align-top">
      <div className="flex flex-wrap items-center gap-1.5 min-h-[28px]">
        {caseTags.map((tag) => (
          <TagPill
            key={tag.id}
            tag={tag}
            onRename={onRenameTag}
            onColorChange={onTagColorChange}
            onRemove={() => onRemoveTag(caseId, tag.id)}
          />
        ))}
        <div className="relative inline-flex" ref={addZoneRef}>
          <div
            role="button"
            tabIndex={0}
            className="inline-flex items-center justify-center min-w-[24px] h-6 px-1 rounded border border-dashed border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-600 cursor-pointer text-xs"
            onClick={() => setShowDropdown((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowDropdown((v) => !v);
              }
            }}
          >
            +
          </div>
          {showDropdown && (
            <div data-tag-dropdown>
              <TagSelectDropdown
                tags={Array.from(tagsById.values())}
                caseTagIds={tagIds}
                onAdd={(tagId) => {
                  onAddTag(caseId, tagId);
                  setShowDropdown(false);
                }}
                onCreateAndAdd={(name, color) => {
                  onCreateTag(caseId, name, color);
                  setShowDropdown(false);
                }}
                onClose={() => setShowDropdown(false)}
              />
            </div>
          )}
        </div>
      </div>
    </td>
  );
}
