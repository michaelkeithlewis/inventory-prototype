import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Tag } from '../types/case';
import { TAG_COLOR_CLASSES, TAG_COLORS } from '../utils/tagColors';

interface AllTagsModalProps {
  tags: Tag[];
  onRename: (tagId: string, newName: string) => void;
  onColorChange: (tagId: string, color: Tag['color']) => void;
  onAdd: (name: string, color: Tag['color']) => void;
  onClose: () => void;
}

export function AllTagsModal({
  tags,
  onRename,
  onColorChange,
  onAdd,
  onClose,
}: AllTagsModalProps) {
  const [newTagName, setNewTagName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId) {
      const tag = tags.find((t) => t.id === editingId);
      if (tag) setDraftName(tag.name);
      inputRef.current?.focus();
    }
  }, [editingId, tags]);

  const handleRenameSubmit = (tagId: string) => {
    const trimmed = draftName.trim();
    if (trimmed) onRename(tagId, trimmed);
    setEditingId(null);
  };

  const handleAdd = () => {
    const name = newTagName.trim();
    if (name) {
      onAdd(name, 'gray');
      setNewTagName('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Manage tags</h2>
          <button
            type="button"
            className="p-1 rounded hover:bg-gray-100 text-gray-500"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 border-b border-gray-100 flex gap-2">
          <input
            type="text"
            placeholder="New tag name..."
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
            onClick={handleAdd}
          >
            Add tag
          </button>
        </div>
        <div className="overflow-y-auto p-4 flex flex-col gap-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-100 hover:bg-gray-50/50"
            >
              <div className="flex gap-1.5 shrink-0">
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
              {editingId === tag.id ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  onBlur={() => handleRenameSubmit(tag.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRenameSubmit(tag.id);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  className="flex-1 min-w-0 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              ) : (
                <span className={`flex-1 text-sm font-medium ${TAG_COLOR_CLASSES[tag.color].text}`}>
                  {tag.name}
                </span>
              )}
              <button
                type="button"
                className="text-xs text-gray-500 hover:text-gray-700 shrink-0"
                onClick={() => setEditingId(tag.id)}
              >
                Rename
              </button>
            </div>
          ))}
          {tags.length === 0 && (
            <p className="text-sm text-gray-500 py-4">No tags yet. Add one above.</p>
          )}
        </div>
      </div>
    </div>
  );
}
