import { useState } from 'react';
import { X } from 'lucide-react';

interface FlipDialogueProps {
  caseName: string;
  flipHorizontal: boolean;
  flipVertical: boolean;
  onSave: (flipHorizontal: boolean, flipVertical: boolean) => void;
  onClose: () => void;
}

/** SVG: case (rectangle + feet) with optional flip arrows. idPrefix avoids duplicate marker IDs when multiple instances exist. */
export function CaseFlipSvg({
  flipHorizontal,
  flipVertical,
  className,
  idPrefix = 'flip',
}: {
  flipHorizontal: boolean;
  flipVertical: boolean;
  className?: string;
  idPrefix?: string;
}) {
  const w = 120;
  const h = 100;
  const caseX = 25;
  const caseY = 35;
  const caseW = 70;
  const caseH = 35;
  const footY = 78;
  const footR = 4;

  const idH = `${idPrefix}-arrowH`;
  const idV = `${idPrefix}-arrowV`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      aria-hidden
    >
      <defs>
        <marker id={idH} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" className="text-gray-600" />
        </marker>
        <marker id={idV} markerWidth="8" markerHeight="8" refX="4" refY="0" orient="auto">
          <path d="M4 0 L0 6 L8 6 Z" fill="#ef4444" />
        </marker>
      </defs>
      {/* Horizontal flip: curved arrow over the top (flip over horizontal axis) */}
      {flipHorizontal && (
        <path
          d="M 18 22 Q 60 2 102 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd={`url(#${idH})`}
          className="text-gray-600"
        />
      )}
      {/* Case: rectangle with two horizontal divisions (three sections) - drawn before vertical arrow so arrow goes over */}
      <rect
        x={caseX}
        y={caseY}
        width={caseW}
        height={caseH}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-gray-700"
      />
      <line x1={caseX} y1={caseY + caseH / 3} x2={caseX + caseW} y2={caseY + caseH / 3} stroke="currentColor" strokeWidth="1.5" className="text-gray-600" />
      <line x1={caseX} y1={caseY + (2 * caseH) / 3} x2={caseX + caseW} y2={caseY + (2 * caseH) / 3} stroke="currentColor" strokeWidth="1.5" className="text-gray-600" />
      {/* Feet */}
      <circle cx={caseX + 12} cy={footY} r={footR} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600" />
      <circle cx={caseX + caseW - 12} cy={footY} r={footR} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600" />
      {/* Vertical flip: long curved arrow over the case (right side, bottom-right to top-right) */}
      {flipVertical && (
        <path
          d="M 95 70 Q 110 52 95 35"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd={`url(#${idV})`}
          className="text-red-500"
        />
      )}
    </svg>
  );
}

export function FlipDialogue({
  caseName,
  flipHorizontal: initialHorizontal,
  flipVertical: initialVertical,
  onSave,
  onClose,
}: FlipDialogueProps) {
  const [flipHorizontal, setFlipHorizontal] = useState(initialHorizontal);
  const [flipVertical, setFlipVertical] = useState(initialVertical);

  const handleSave = () => {
    onSave(flipHorizontal, flipVertical);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Flip options</h2>
          <button
            type="button"
            className="p-1 rounded hover:bg-gray-100 text-gray-500"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {caseName && (
          <p className="px-4 pt-2 text-sm text-gray-500">{caseName}</p>
        )}
        <div className="p-4 flex flex-col items-center gap-4">
          <div className="w-32 h-28 flex items-center justify-center text-gray-700">
            <CaseFlipSvg
              flipHorizontal={flipHorizontal}
              flipVertical={flipVertical}
              idPrefix="flip-dialogue"
              className="w-full h-full"
            />
          </div>
          <div className="w-full space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={flipHorizontal}
                onChange={(e) => setFlipHorizontal(e.target.checked)}
                className="rounded border-gray-300 text-gray-600 focus:ring-gray-400"
              />
              <span className="text-sm text-gray-700">Flip horizontal (over top/bottom)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={flipVertical}
                onChange={(e) => setFlipVertical(e.target.checked)}
                className="rounded border-gray-300 text-gray-600 focus:ring-gray-400"
              />
              <span className="text-sm text-gray-700">Flip vertical (up)</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-2 px-4 pb-4">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
