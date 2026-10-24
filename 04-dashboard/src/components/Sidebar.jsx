// src/components/Sidebar.jsx
import { LayoutDashboard, ShoppingCart, Users, Settings, PieChart } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-neutral-800 bg-neutral-950 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-800">
        <span className="text-xl font-bold text-indigo-500">NovaDash</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Profile (Bottom) */}
      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">
            AM
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-100">Ali Mallak</p>
            <p className="text-xs text-neutral-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}