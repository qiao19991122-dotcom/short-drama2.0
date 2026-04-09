import React, { useState } from 'react';
import { DRAMAS } from '../mockData';
import { DramaCard } from '../components/DramaCard';
import { Download } from 'lucide-react';
import { Drama } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MyListScreenProps {
  onDramaClick: (drama: Drama) => void;
}

export const MyListScreen: React.FC<MyListScreenProps> = ({ onDramaClick }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('following');

  const tabs = [
    { id: 'following', label: t('mylist.following') },
    { id: 'history', label: t('mylist.history') },
    { id: 'notify', label: t('mylist.notify') },
  ];

  return (
    <div className="pb-24">
      <div className="px-4 pt-6 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">{t('mylist.title')}</h1>
        <button className="text-white/60 hover:text-white transition-colors">
          <Download size={24} />
        </button>
      </div>

      <div className="mt-8 px-4 flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id ? 'text-white' : 'text-white/40'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 px-4 grid grid-cols-2 gap-x-4 gap-y-8">
        {DRAMAS.map((drama) => (
          <div key={drama.id} className="relative cursor-pointer" onClick={() => onDramaClick(drama)}>
            <DramaCard drama={drama} />
            <div className="absolute top-2 left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <div className="text-white text-[10px]">❤️</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
