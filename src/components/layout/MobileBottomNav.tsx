import React from 'react';
import { Home, Bot, Compass, Building2, User } from 'lucide-react';
import { useAuth, ViewType } from '../../context/AuthContext';

export const MobileBottomNav: React.FC = () => {
  const { currentView, navigate } = useAuth();

  const items: { label: string; view: ViewType; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Home', view: 'dashboard', icon: Home },
    { label: 'Ask Aazhi', view: 'assistant', icon: Bot },
    { label: 'Schemes', view: 'schemes', icon: Compass },
    { label: 'Services', view: 'services', icon: Building2 },
    { label: 'Profile', view: 'profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around z-40 shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => navigate(item.view)}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
              isActive ? 'text-brand-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-brand-700 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
