import { useState, useMemo } from 'react';
import { CasesHeader } from './CasesHeader';
import { SearchFilterBar } from './SearchFilterBar';
import { CasesTable } from './CasesTable';
import type { CaseItem, Tag } from '../types/case';
import { initialTags, initialCases } from '../data/mockCases';

function nextTagId(tags: Tag[]): string {
  const max = tags.reduce((acc, t) => {
    const m = t.id.match(/^t(\d+)$/);
    return m ? Math.max(acc, parseInt(m[1], 10)) : acc;
  }, 0);
  return `t${max + 1}`;
}

export function CasesPage() {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [cases, setCases] = useState<CaseItem[]>(initialCases);
  const [filterTagIds, setFilterTagIds] = useState<string[]>([]);

  const tagsById = useMemo(() => new Map(tags.map((t) => [t.id, t])), [tags]);

  const filteredCases = useMemo(() => {
    if (filterTagIds.length === 0) return cases;
    return cases.filter((c) => c.tagIds.some((id) => filterTagIds.includes(id)));
  }, [cases, filterTagIds]);

  const onRenameTag = (tagId: string, newName: string) => {
    setTags((prev) =>
      prev.map((t) => (t.id === tagId ? { ...t, name: newName } : t))
    );
  };

  const onTagColorChange = (tagId: string, color: Tag['color']) => {
    setTags((prev) =>
      prev.map((t) => (t.id === tagId ? { ...t, color } : t))
    );
  };

  const onAddTagToCase = (caseId: string, tagId: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId && !c.tagIds.includes(tagId)
          ? { ...c, tagIds: [...c.tagIds, tagId] }
          : c
      )
    );
  };

  const onCreateTagAndAddToCase = (
    caseId: string,
    name: string,
    color: Tag['color']
  ) => {
    const id = nextTagId(tags);
    const newTag: Tag = { id, name, color };
    setTags((prev) => [...prev, newTag]);
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId ? { ...c, tagIds: [...c.tagIds, id] } : c
      )
    );
  };

  const onRemoveTagFromCase = (caseId: string, tagId: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId ? { ...c, tagIds: c.tagIds.filter((id) => id !== tagId) } : c
      )
    );
  };

  const onAddTag = (name: string, color: Tag['color']) => {
    const id = nextTagId(tags);
    setTags((prev) => [...prev, { id, name, color }]);
  };

  const onFlipChange = (caseId: string, flipHorizontal: boolean, flipVertical: boolean) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId ? { ...c, flipHorizontal, flipVertical } : c
      )
    );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 p-6">
      <CasesHeader />
      <SearchFilterBar />
      <div className="flex-1 min-h-0 flex flex-col mt-4">
        <CasesTable
        tags={tags}
        cases={filteredCases}
        filterTagIds={filterTagIds}
        onFilterTagIdsChange={setFilterTagIds}
        tagsById={tagsById}
        onRenameTag={onRenameTag}
        onTagColorChange={onTagColorChange}
        onAddTagToCase={onAddTagToCase}
        onCreateTagAndAddToCase={onCreateTagAndAddToCase}
        onRemoveTagFromCase={onRemoveTagFromCase}
        onAddTag={onAddTag}
        onFlipChange={onFlipChange}
      />
      </div>
    </div>
  );
}
