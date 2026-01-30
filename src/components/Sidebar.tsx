import { NavLink } from 'react-router-dom';
import { Package, Monitor, FileText, Map, ChevronDown } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-[22%] min-w-[200px] bg-gray-100 border-r border-gray-200 flex flex-col h-full">
      <div className="p-5 flex items-center gap-2">
        <Package className="w-6 h-6 text-gray-700" />
        <span className="font-semibold text-gray-800">TRUCK PACKER</span>
      </div>
      <div className="px-5 pb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Personal Account</p>
        <button type="button" className="flex items-center gap-2 w-full text-left rounded-lg hover:bg-gray-200/80 p-2 -m-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">ML</div>
          <span className="text-sm font-medium text-gray-800">Michael Lewis</span>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-auto" />
        </button>
      </div>
      <nav className="flex-1 px-3">
        <p className="text-xs text-gray-500 uppercase tracking-wide px-2 mb-2">Platform</p>
        <NavLink to="/packs" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 ${isActive ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-200/80'}`}>
          <Monitor className="w-4 h-4" />
          <span>Packs</span>
        </NavLink>
        <NavLink to="/cases" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 ${isActive ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-200/80'}`}>
          <Package className="w-4 h-4" />
          <span>Cases</span>
        </NavLink>
        <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-200/80 mb-0.5">
          <FileText className="w-4 h-4" />
          <span>Product Updates</span>
        </a>
        <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-200/80">
          <Map className="w-4 h-4" />
          <span>Roadmap</span>
        </a>
      </nav>
      <div className="p-5 border-t border-gray-200 text-xs text-gray-500">
        <p>A product by BACKLINE LOGIC</p>
        <p className="mt-1">v0.8.2</p>
      </div>
    </aside>
  );
}
