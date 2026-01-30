import { Plus, FileText, ArrowRight } from 'lucide-react';

export function CasesHeader() {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cases</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage case inventory</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New case
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          <FileText className="w-4 h-4" />
          Template
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          Import
        </button>
      </div>
    </div>
  );
}
