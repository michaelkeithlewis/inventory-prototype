import { Search } from 'lucide-react';

export function SearchFilterBar() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
        />
      </div>
    </div>
  );
}
