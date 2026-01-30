import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Tag } from '../types/case';
import { TAG_COLOR_CLASSES, TAG_COLORS } from '../utils/tagColors';

interface TagPillProps {
  tag: Tag;
  onRename: (tagId: string, newName: string) => void;
  onColorChange: (tagId: string, color: Tag['color']) => void;
  onRemove?: () => void;
}

export function TagPill({ tag, onRename, onColorChange, onRemove }: TagPillProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(tag.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const styles = TAG_COLOR_CLASSES[tag.color];

  useEffect(() => {
    setDraftName(tag.name);
  }, [tag.name]);

  useEffect(() => {
    if (editingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingName]);

  useEffect(() => {
    if (!showPopover) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopover]);

  const handleRenameSubmit = () => {
    const trimmed = draftName.trim();
    if (trimmed && trimmed !== tag.name) {
      onRename(tag.id, trimmed);
    }
    setDraftName(tag.name);
    setEditingName(false);
  };

  return (
    <span ref={containerRef} className="relative inline-flex">
      <span
        role="button"
        tabIndex={0}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer ${styles.bg} ${styles.text}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!editingName) setShowPopover((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!editingName) setShowPopover((v) => !v);
          }
        }}
      >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`} />
      {editingName ? (
        <input
          ref={inputRef}
          type="text"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={handleRenameSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRenameSubmit();
            if (e.key === 'Escape') {
              setDraftName(tag.name);
              setEditingName(false);
              inputRef.current?.blur();
            }
          }}
          className="bg-transparent border-none outline-none min-w-[60px] max-w-[120px] py-0"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span>{tag.name}</span>
      )}
      {onRemove && (
        <button
          type="button"
          className="ml-0.5 p-0.5 rounded hover:bg-black/10 -mr-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove tag"
        >
          <X className="w-3 h-3" />
        </button>
      )}
      </span>
      {showPopover && !editingName && (
        <div className="absolute z-20 mt-1 left-0 top-full rounded-lg border border-gray-200 bg-white shadow-lg py-2 px-3 min-w-[140px]">
          <div className="flex flex-wrap gap-1 mb-2">
            {TAG_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                title={c}
                className={`w-5 h-5 rounded-full ${TAG_COLOR_CLASSES[c].dot} border-2 ${tag.color === c ? 'border-gray-900 ring-1 ring-gray-400' : 'border-transparent hover:ring-1 hover:ring-gray-300'}`}
                onClick={() => onColorChange(tag.id, c)}
              />
            ))}
          </div>
          <button
            type="button"
            className="text-xs text-gray-600 hover:text-gray-900 w-full text-left"
            onClick={() => setEditingName(true)}
          >
            Rename
          </button>
        </div>
      )}
    </span>
  );
}
