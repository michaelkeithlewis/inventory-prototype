import { useState, useMemo } from 'react';
import type { CaseItem, Tag } from '../types/case';
import { initialTags, initialCases } from '../data/mockCases';
import { CaseBrowser } from './CaseBrowser';
import { AllTagsModal } from './AllTagsModal';
import { RotateCw } from 'lucide-react';

export function PacksPage() {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [cases, setCases] = useState<CaseItem[]>(initialCases);
  const [filterTagIds, setFilterTagIds] = useState<string[]>([]);
  const [manageTagsOpen, setManageTagsOpen] = useState(false);
  const [addedToPackIds, setAddedToPackIds] = useState<Set<string>>(new Set());

  const onAddAllFiltered = (caseIds: string[]) => {
    setAddedToPackIds((prev) => new Set([...prev, ...caseIds]));
  };

  const tagsById = useMemo(() => new Map(tags.map((t) => [t.id, t])), [tags]);

  const filteredCases = useMemo(() => {
    if (filterTagIds.length === 0) return cases;
    return cases.filter((c) => c.tagIds.some((id) => filterTagIds.includes(id)));
  }, [cases, filterTagIds]);

  const onRenameTag = (tagId: string, newName: string) => {
    setTags((prev) => prev.map((t) => (t.id === tagId ? { ...t, name: newName } : t)));
  };

  const onTagColorChange = (tagId: string, color: Tag['color']) => {
    setTags((prev) => prev.map((t) => (t.id === tagId ? { ...t, color } : t)));
  };

  const onAddTag = (name: string, color: Tag['color']) => {
    const max = tags.reduce((acc, t) => {
      const m = t.id.match(/^t(\d+)$/);
      return m ? Math.max(acc, parseInt(m[1], 10)) : acc;
    }, 0);
    setTags((prev) => [...prev, { id: `t${max + 1}`, name, color }]);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Top bar: menus + title */}
      <header className="shrink-0 flex items-center gap-6 px-4 py-2 border-b border-gray-200 bg-gray-50">
        <nav className="flex items-center gap-1 text-sm text-gray-600">
          <button type="button" className="px-2 py-1 rounded hover:bg-gray-200">File</button>
          <button type="button" className="px-2 py-1 rounded hover:bg-gray-200">Add</button>
          <button type="button" className="px-2 py-1 rounded hover:bg-gray-200">Edit</button>
          <button type="button" className="px-2 py-1 rounded hover:bg-gray-200">View</button>
        </nav>
        <h1 className="text-base font-semibold text-gray-900">Top Layer</h1>
        <span className="text-xs text-gray-500">Edited 3 hours ago</span>
      </header>

      {/* Main: Case Browser left, 3D center, Container bottom-right overlay */}
      <div className="flex flex-1 min-h-0 relative">
        <CaseBrowser
          tags={tags}
          cases={filteredCases}
          filterTagIds={filterTagIds}
          onFilterTagIdsChange={setFilterTagIds}
          tagsById={tagsById}
          onRenameTag={onRenameTag}
          onTagColorChange={onTagColorChange}
          onOpenManageTags={() => setManageTagsOpen(true)}
          onAddAllFiltered={onAddAllFiltered}
        />

        {/* 3D view placeholder */}
        <div className="flex-1 min-w-0 bg-gray-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400 text-sm">
              <div className="w-32 h-24 mx-auto mb-2 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50/80">
                3D view
              </div>
              <p>Packing view placeholder</p>
            </div>
          </div>
          {/* Simple grid floor effect */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        {/* Container panel (bottom-right) */}
        <div className="absolute bottom-4 right-4 w-72 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
            <span className="font-semibold text-gray-900">Container</span>
            <button type="button" className="p-1 rounded hover:bg-gray-100 text-gray-500" aria-label="Close">
              ×
            </button>
          </div>
          <div className="p-3 text-sm text-gray-600">
            <p>Size Length 624 × Width 102 × Height 96 in</p>
          </div>
          <div className="p-3 pt-0">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium text-sm"
            >
              <RotateCw className="w-4 h-4" />
              AutoPack
            </button>
          </div>
        </div>
      </div>

      {manageTagsOpen && (
        <AllTagsModal
          tags={tags}
          onRename={onRenameTag}
          onColorChange={onTagColorChange}
          onAdd={onAddTag}
          onClose={() => setManageTagsOpen(false)}
        />
      )}
    </div>
  );
}
