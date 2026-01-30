import { useState, useRef, useMemo, useEffect } from 'react';
import { Search, Plus, X } from 'lucide-react';
import type { CaseItem, Tag } from '../types/case';
import { TAG_COLOR_CLASSES } from '../utils/tagColors';
import { TagFilterDropdown } from './TagFilterDropdown';
import { TagPill } from './TagPill';

interface CaseBrowserProps {
  tags: Tag[];
  cases: CaseItem[];
  filterTagIds: string[];
  onFilterTagIdsChange: (tagIds: string[]) => void;
  tagsById: Map<string, Tag>;
  onRenameTag: (tagId: string, newName: string) => void;
  onTagColorChange: (tagId: string, color: Tag['color']) => void;
  onOpenManageTags: () => void;
  onAddAllFiltered?: (caseIds: string[]) => void;
}

function CaseRow({
  caseItem,
  tagsById,
  onRenameTag,
  onTagColorChange,
}: {
  caseItem: CaseItem;
  tagsById: Map<string, Tag>;
  onRenameTag: (tagId: string, newName: string) => void;
  onTagColorChange: (tagId: string, color: Tag['color']) => void;
}) {
  const caseTags = caseItem.tagIds.map((id) => tagsById.get(id)).filter(Boolean) as Tag[];
  return (
    <div className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-100 rounded text-sm">
      <span className="w-4 h-4 rounded-sm bg-gray-300 shrink-0" aria-hidden />
      <span className="flex-1 min-w-0 font-medium text-gray-900 truncate">{caseItem.name}</span>
      <div className="flex flex-wrap gap-1 shrink-0 max-w-[140px] justify-end">
        {caseTags.map((tag) => (
          <TagPill
            key={tag.id}
            tag={tag}
            onRename={onRenameTag}
            onColorChange={onTagColorChange}
          />
        ))}
      </div>
    </div>
  );
}

const DEFAULT_LEFT = 16;
const DEFAULT_TOP = 16;

export function CaseBrowser({
  tags,
  cases,
  filterTagIds,
  onFilterTagIdsChange,
  tagsById,
  onRenameTag,
  onTagColorChange,
  onOpenManageTags,
  onAddAllFiltered,
}: CaseBrowserProps) {
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [position, setPosition] = useState({ left: DEFAULT_LEFT, top: DEFAULT_TOP });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, left: 0, top: 0 });
  const filterAnchorRef = useRef<HTMLDivElement>(null);

  const searchLower = search.trim().toLowerCase();
  const listCases = useMemo(
    () =>
      searchLower
        ? cases.filter((c) => c.name.toLowerCase().includes(searchLower))
        : cases,
    [cases, searchLower]
  );

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      left: position.left,
      top: position.top,
    };
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      setPosition({
        left: dragStart.current.left + e.clientX - dragStart.current.x,
        top: dragStart.current.top + e.clientY - dragStart.current.y,
      });
    };
    const onUp = () => setIsDragging(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  const selectedFilterTags = filterTagIds.map((id) => tags.find((t) => t.id === id)).filter(Boolean) as Tag[];

  return (
    <div
      className="absolute flex flex-col w-[280px] max-h-[calc(100%-32px)] bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-10"
      style={{ left: position.left, top: position.top }}
    >
      <div
        className="shrink-0 flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleTitleMouseDown}
      >
        <span className="font-semibold text-gray-900">Case Browser</span>
        <button type="button" className="p-1 rounded hover:bg-gray-200 text-gray-500" aria-label="Close panel">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="shrink-0 p-2 border-b border-gray-100">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <button
            type="button"
            className="text-xs font-medium text-gray-600 hover:text-gray-900"
            onClick={onOpenManageTags}
          >
            Tag
          </button>
          <div className="relative" ref={filterAnchorRef} data-filter-anchor>
            <button
              type="button"
              className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${
                filterTagIds.length > 0 ? 'border-orange-300 bg-orange-50 text-orange-800' : 'border-gray-300 bg-white text-gray-600'
              }`}
              onClick={() => setFilterOpen((o) => !o)}
            >
              <Plus className="w-3 h-3" />
              Filter
              {filterTagIds.length > 0 && ` (${filterTagIds.length})`}
            </button>
            <TagFilterDropdown
              tags={tags}
              selectedTagIds={filterTagIds}
              onSelectionChange={onFilterTagIdsChange}
              isOpen={filterOpen}
              onClose={() => setFilterOpen(false)}
            />
          </div>
          {selectedFilterTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedFilterTags.map((tag) => {
                const styles = TAG_COLOR_CLASSES[tag.color];
                return (
                  <span
                    key={tag.id}
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}
                  >
                    <span className={`w-1 h-1 rounded-full ${styles.dot}`} />
                    {tag.name}
                  </span>
                );
              })}
            </div>
          )}
          {filterTagIds.length > 0 && listCases.length > 0 && onAddAllFiltered && (
            <button
              type="button"
              className="inline-flex items-center gap-1 px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50 mt-2"
              onClick={() => onAddAllFiltered(listCases.map((c) => c.id))}
              title={`Add all ${listCases.length} filtered cases`}
            >
              <Plus className="w-3 h-3" />
              Add all ({listCases.length})
            </button>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="search"
            placeholder="Search cases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        {listCases.map((c) => (
          <CaseRow
            key={c.id}
            caseItem={c}
            tagsById={tagsById}
            onRenameTag={onRenameTag}
            onTagColorChange={onTagColorChange}
          />
        ))}
        {listCases.length === 0 && (
          <div className="p-4 text-sm text-gray-500 text-center">No cases match.</div>
        )}
      </div>
    </div>
  );
}
