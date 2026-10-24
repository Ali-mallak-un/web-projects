// src/components/Header.jsx
import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800 w-96">
        <Search size={18} className="text-neutral-500" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-sm text-neutral-200 w-full placeholder:text-neutral-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="text-neutral-400 hover:text-neutral-100 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}