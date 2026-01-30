import { useState, useRef, useEffect } from 'react';
import type { Tag } from '../types/case';
import { TAG_COLOR_CLASSES } from '../utils/tagColors';

interface TagSelectDropdownProps {
  tags: Tag[];
  caseTagIds: string[];
  onAdd: (tagId: string) => void;
  onCreateAndAdd: (name: string, color: Tag['color']) => void;
  onClose: () => void;
}

const DEFAULT_NEW_TAG_COLOR: Tag['color'] = 'gray';

export function TagSelectDropdown({
  tags,
  caseTagIds,
  onAdd,
  onCreateAndAdd,
  onClose,
}: TagSelectDropdownProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const availableTags = tags.filter((t) => !caseTagIds.includes(t.id));
  const queryLower = query.trim().toLowerCase();
  const matchingTags = queryLower
    ? availableTags.filter((t) => t.name.toLowerCase().includes(queryLower))
    : availableTags;
  const exactMatch = queryLower && availableTags.some((t) => t.name.toLowerCase() === queryLower);
  const canCreate = query.trim().length > 0 && !exactMatch;
  const options = canCreate
    ? [...matchingTags, { id: '__create__', name: `Create "${query.trim()}"`, isCreate: true } as const]
    : matchingTags;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const selected = el.querySelector('[data-selected="true"]');
    selected?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex, options.length]);

  const handleSelect = (opt: (typeof options)[number]) => {
    if ('isCreate' in opt && opt.isCreate) {
      onCreateAndAdd(query.trim(), DEFAULT_NEW_TAG_COLOR);
    } else {
      onAdd(opt.id);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (options[selectedIndex]) handleSelect(options[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="absolute z-30 left-0 top-full mt-1 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden min-w-[200px] max-w-[280px]">
      <div className="p-2 border-b border-gray-100">
        <input
          type="text"
          placeholder="Search or type to create..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
          autoFocus
        />
      </div>
      <div ref={listRef} className="max-h-[220px] overflow-y-auto py-1">
        {options.length === 0 && !canCreate ? (
          <div className="px-3 py-2 text-sm text-gray-500">No tags yet. Type a name to create one.</div>
        ) : (
          options.map((opt, i) => {
            if ('isCreate' in opt && opt.isCreate) {
              return (
                <button
                  key="__create__"
                  type="button"
                  data-selected={i === selectedIndex}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 ${i === selectedIndex ? 'bg-gray-100' : ''}`}
                  onClick={() => handleSelect(opt)}
                >
                  <span className="text-gray-500">+ Create</span>
                  <span className="font-medium">"{query.trim()}"</span>
                </button>
              );
            }
            const tag = opt as Tag;
            const styles = TAG_COLOR_CLASSES[tag.color];
            return (
              <button
                key={tag.id}
                type="button"
                data-selected={i === selectedIndex}
                className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 ${i === selectedIndex ? 'bg-gray-100' : ''}`}
                onClick={() => handleSelect(opt)}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${styles.dot}`} />
                <span>{tag.name}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
