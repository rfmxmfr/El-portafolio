import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Shirt, 
  PenTool, 
  Settings, 
  Users, 
  LogOut,
  Search,
  UserCircle,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children, activeSection, setActiveSection }) {
  const { t } = useTranslation();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'collections', label: 'Collections', icon: Shirt },
    { id: 'about', label: 'About', icon: UserCircle },
    { id: 'designs', label: 'Designs', icon: PenTool },
    { id: 'ai', label: 'AI & ML', icon: Sparkles },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    // Clear local storage for demo logout
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-neutral-200 flex flex-col">
        <div className="p-4 border-b border-neutral-200">
          <h1 className="text-xl font-bold text-neutral-900">{t('ATELIER ADMIN')}</h1>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {t(item.label)}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-neutral-200">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            {t('Logout')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-neutral-900">
              {activeSection === 'collections' && t('Collections Management')}
              {activeSection === 'dashboard' && t('Dashboard Overview')}
              {activeSection === 'about' && t('About the Designer')}
              {activeSection === 'designs' && t('Design Library')}
              {activeSection === 'ai' && t('AI & ML Tools')}
              {activeSection === 'users' && t('User Management')}
              {activeSection === 'settings' && t('System Settings')}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
                <input
                  type="text"
                  placeholder={t('Search...')}
                  className="pl-10 pr-4 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-700 font-medium">
                  A
                </div>
                <span className="text-sm font-medium text-neutral-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-neutral-50">
          {children}
        </main>
      </div>
    </div>
  );
}