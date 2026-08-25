import React from 'react';
import {
  Home,
  Bot,
  Compass,
  Sparkles,
  Building2,
  MapPin,
  FolderLock,
  ClipboardList,
  User,
  Settings,
  HelpCircle,
  LogOut,
  LogIn
} from 'lucide-react';
import { useAuth, ViewType } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { currentView, navigate, userRole, logout } = useAuth();

  const navItems: { label: string; view: ViewType; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { label: 'Home / Dashboard', view: 'dashboard', icon: Home },
    { label: 'Ask Aazhi AI', view: 'assistant', icon: Bot, badge: 'AI' },
    { label: 'Discover Schemes', view: 'schemes', icon: Compass },
    { label: 'Recommendations', view: 'recommendations', icon: Sparkles, badge: '95% Match' },
    { label: 'Gov Services', view: 'services', icon: Building2 },
    { label: 'Nearby Centres', view: 'centres', icon: MapPin },
    { label: 'Document Vault', view: 'documents', icon: FolderLock, badge: '4/5 Ready' },
    { label: 'My Applications', view: 'tracking', icon: ClipboardList, badge: '1 Active' },
    { label: 'Citizen Profile', view: 'profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden lg:flex border-r border-slate-800 shrink-0">
      <div className="space-y-6">
        {/* Profile Card Header */}
        <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-saffron-600 text-white font-bold flex items-center justify-center text-base shadow">
              {userRole === 'guest' ? 'G' : 'RK'}
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">
                {userRole === 'guest' ? 'Guest Visitor' : 'Ramesh Kumar'}
              </p>
              <p className="text-xs text-slate-400">
                {userRole === 'guest' ? 'Limited access' : '1st Graduate Student'}
              </p>
            </div>
          </div>
          {userRole === 'citizen' && (
            <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">Profile Completeness</span>
              <span className="text-emerald-400 font-bold">80%</span>
            </div>
          )}
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Main Portal
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => navigate(item.view)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge.includes('Match')
                        ? 'bg-saffron-500/20 text-saffron-400 border border-saffron-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Secondary Links */}
      <div className="pt-4 border-t border-slate-800 space-y-1">
        <button
          onClick={() => navigate('settings')}
          className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition ${
            currentView === 'settings' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
          }`}
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings & Privacy</span>
        </button>

        <button
          onClick={() => navigate('settings')}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 transition"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Help & Accessibility</span>
        </button>

        {userRole === 'citizen' ? (
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-950/40 transition"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Switch to Guest Mode</span>
          </button>
        ) : (
          <button
            onClick={() => navigate('auth')}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-emerald-400 hover:bg-emerald-950/40 transition"
          >
            <LogIn className="w-4 h-4 text-emerald-400" />
            <span>Citizen Login / Register</span>
          </button>
        )}
      </div>
    </aside>
  );
};
