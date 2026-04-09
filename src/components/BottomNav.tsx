import React from 'react';
import { Home, Compass, PlaySquare, Bookmark, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const tabs = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'discover', label: 'DISCOVER', icon: Compass },
    { id: 'titbits', label: 'TITBITS', icon: PlaySquare },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-[#1A1A1A]/90 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-2 flex justify-between items-center z-50 shadow-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 transition-all px-4 py-2 rounded-full ${
              isActive ? 'bg-white text-black' : 'text-white/60'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            {isActive && <span className="text-[11px] font-black tracking-wider">{tab.label}</span>}
          </button>
        );
      })}
    </div>
  );
};
