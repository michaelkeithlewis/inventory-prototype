import { useState, useRef } from 'react';
import { ChevronsUpDown, MoreHorizontal, Plus } from 'lucide-react';
import type { CaseItem, Tag } from '../types/case';
import { TAG_COLOR_CLASSES } from '../utils/tagColors';
import { TagCell } from './TagCell';
import { AllTagsModal } from './AllTagsModal';
import { TagFilterDropdown } from './TagFilterDropdown';
import { FlipDialogue, CaseFlipSvg } from './FlipDialogue';

function SortableHeader({ label }: { label: string }) {
  return (
    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
      <span className="inline-flex items-center gap-1">
        {label}
        <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
      </span>
    </th>
  );
}

interface CasesTableProps {
  tags: Tag[];
  cases: CaseItem[];
  tagsById: Map<string, Tag>;
  filterTagIds: string[];
  onFilterTagIdsChange: (tagIds: string[]) => void;
  onRenameTag: (tagId: string, newName: string) => void;
  onTagColorChange: (tagId: string, color: Tag['color']) => void;
  onAddTagToCase: (caseId: string, tagId: string) => void;
  onCreateTagAndAddToCase: (caseId: string, name: string, color: Tag['color']) => void;
  onRemoveTagFromCase: (caseId: string, tagId: string) => void;
  onAddTag: (name: string, color: Tag['color']) => void;
  onFlipChange: (caseId: string, flipHorizontal: boolean, flipVertical: boolean) => void;
}

function flipLabel(row: CaseItem): string {
  const h = row.flipHorizontal;
  const v = row.flipVertical;
  if (h && v) return 'Both';
  if (h) return 'Horizontal';
  if (v) return 'Vertical';
  return 'None';
}

function TableRow({
  row,
  tagsById,
  onRenameTag,
  onTagColorChange,
  onAddTagToCase,
  onCreateTagAndAddToCase,
  onRemoveTagFromCase,
  onOpenFlipDialogue,
}: {
  row: CaseItem;
  tagsById: Map<string, Tag>;
  onRenameTag: (tagId: string, newName: string) => void;
  onTagColorChange: (tagId: string, color: Tag['color']) => void;
  onAddTagToCase: (caseId: string, tagId: string) => void;
  onCreateTagAndAddToCase: (caseId: string, name: string, color: Tag['color']) => void;
  onRemoveTagFromCase: (caseId: string, tagId: string) => void;
  onOpenFlipDialogue: (row: CaseItem) => void;
}) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50">
      <td className="py-3 px-4 w-10">
        <input type="checkbox" className="rounded border-gray-300 text-gray-600 focus:ring-gray-400" />
      </td>
      <td className="py-3 px-4 text-sm font-medium text-gray-900">{row.name}</td>
      <td className="py-3 px-4 text-sm text-gray-600">{row.lengthIn} in</td>
      <td className="py-3 px-4 text-sm text-gray-600">{row.widthIn} in</td>
      <td className="py-3 px-4 text-sm text-gray-600">{row.heightIn} in</td>
      <td className="py-3 px-4 text-sm text-gray-600">{row.weightLb != null ? `${row.weightLb} lb` : '--'}</td>
      <TagCell
        caseId={row.id}
        tagIds={row.tagIds}
        tagsById={tagsById}
        onRenameTag={onRenameTag}
        onTagColorChange={onTagColorChange}
        onAddTag={onAddTagToCase}
        onCreateTag={onCreateTagAndAddToCase}
        onRemoveTag={onRemoveTagFromCase}
      />
      <td className="py-3 px-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 min-h-[28px]"
          onClick={() => onOpenFlipDialogue(row)}
          title={flipLabel(row)}
        >
          <span className="w-9 h-8 flex items-center justify-center shrink-0 text-gray-500">
            <CaseFlipSvg
              flipHorizontal={row.flipHorizontal}
              flipVertical={row.flipVertical}
              idPrefix={`flip-row-${row.id}`}
              className="w-full h-full"
            />
          </span>
          <span className="sr-only">{flipLabel(row)}</span>
        </button>
      </td>
      <td className="py-3 px-4">
        <button type="button" className="p-1 rounded hover:bg-gray-200 text-gray-500">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

export function CasesTable({
  tags,
  cases,
  tagsById,
  filterTagIds,
  onFilterTagIdsChange,
  onRenameTag,
  onTagColorChange,
  onAddTagToCase,
  onCreateTagAndAddToCase,
  onRemoveTagFromCase,
  onAddTag,
  onFlipChange,
}: CasesTableProps) {
  const [allTagsOpen, setAllTagsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [flipDialogueCase, setFlipDialogueCase] = useState<CaseItem | null>(null);
  const filterAnchorRef = useRef<HTMLDivElement>(null);
  const tagsByIdObj = Object.fromEntries(tagsById);
  const selectedFilterTags = filterTagIds.map((id) => tagsByIdObj[id]).filter(Boolean) as Tag[];

  return (
    <>
      <div className="flex-1 min-h-0 flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex-1 min-h-0 overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
            <tr>
              <th className="py-3 px-4 w-10">
                <input type="checkbox" className="rounded border-gray-300 text-gray-600 focus:ring-gray-400" />
              </th>
              <SortableHeader label="Name" />
              <SortableHeader label="Length" />
              <SortableHeader label="Width" />
              <SortableHeader label="Height" />
              <SortableHeader label="Weight" />
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-top">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 hover:text-gray-700"
                    onClick={() => setAllTagsOpen(true)}
                  >
                    Tag
                    <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  <div className="relative inline-flex" ref={filterAnchorRef} data-filter-anchor>
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-medium transition-colors ${
                        filterTagIds.length > 0
                          ? 'border-orange-300 bg-orange-50 text-orange-800 hover:bg-orange-100'
                          : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setFilterOpen((o) => !o)}
                    >
                      <Plus className="w-3 h-3" />
                      Filter
                      {filterTagIds.length > 0 && (
                        <span className="font-normal">({filterTagIds.length})</span>
                      )}
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
                    <div className="flex flex-wrap items-center gap-1">
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
                </div>
              </th>
              <SortableHeader label="Flip" />
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-12" />
            </tr>
          </thead>
          <tbody>
            {cases.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                tagsById={tagsById}
                onRenameTag={onRenameTag}
                onTagColorChange={onTagColorChange}
                onAddTagToCase={onAddTagToCase}
                onCreateTagAndAddToCase={onCreateTagAndAddToCase}
                onRemoveTagFromCase={onRemoveTagFromCase}
                onOpenFlipDialogue={setFlipDialogueCase}
              />
            ))}
          </tbody>
        </table>
        </div>
      </div>
      {allTagsOpen && (
        <AllTagsModal
          tags={tags}
          onRename={onRenameTag}
          onColorChange={onTagColorChange}
          onAdd={onAddTag}
          onClose={() => setAllTagsOpen(false)}
        />
      )}
      {flipDialogueCase && (
        <FlipDialogue
          caseName={flipDialogueCase.name}
          flipHorizontal={flipDialogueCase.flipHorizontal}
          flipVertical={flipDialogueCase.flipVertical}
          onSave={(h, v) => {
            onFlipChange(flipDialogueCase.id, h, v);
            setFlipDialogueCase(null);
          }}
          onClose={() => setFlipDialogueCase(null)}
        />
      )}
    </>
  );
}
