import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onSeeAll }) => {
  return (
    <div className="flex justify-between items-end mb-4">
      <h2 className="text-white text-lg font-black tracking-tight">{title}</h2>
      {onSeeAll && (
        <button 
          onClick={onSeeAll}
          className="text-white/30 text-[11px] font-bold lowercase tracking-wider hover:text-white transition-all"
        >
          {onSeeAll.name === 'seeAll' ? 'see all' : 'view all'}
        </button>
      )}
    </div>
  );
};
