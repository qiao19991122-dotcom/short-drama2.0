import React from 'react';
import { Drama } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DramaCardProps {
  drama: Drama;
  variant?: 'vertical' | 'horizontal' | 'large';
}

export const DramaCard: React.FC<DramaCardProps> = ({ drama, variant = 'vertical' }) => {
  const { t } = useLanguage();

  if (variant === 'large') {
    return (
      <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden group cursor-pointer shadow-2xl border border-white/5">
        <img 
          src={drama.image} 
          alt={drama.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-xl font-black text-white text-shadow-premium uppercase tracking-wider">{drama.title}</h3>
        </div>
        <div className="absolute top-4 left-4">
          <div className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="flex gap-4 items-center group cursor-pointer py-3 border-b border-white/5 last:border-0">
        <div className="w-20 aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0 shadow-xl relative">
          <img 
            src={drama.image} 
            alt={drama.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-1 left-1">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1">
          <h4 className="text-white font-bold text-sm mb-1">{drama.title}</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {drama.tags?.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white/40 font-bold tracking-wider">{tag}</span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-short-yellow text-[10px] font-black uppercase tracking-widest">{drama.episodes?.current} Ep</span>
            <div className="flex items-center gap-1 text-white/30">
               <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white/30 border-b-[4px] border-b-transparent" />
               <span className="text-[10px] font-bold">{drama.views} views</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 group cursor-pointer w-full">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5 shadow-lg">
        <img 
          src={drama.image} 
          alt={drama.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {drama.tag && (
          <div className={`absolute top-2 right-2 text-white text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest shadow-lg ${drama.tag === 'New' ? 'bg-orange-500' : 'bg-red-500'}`}>
            {drama.tag}
          </div>
        )}
        {drama.episodes && (
          <div className="absolute bottom-2 left-2 text-white text-[9px] font-black bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-white/60">EP.{drama.episodes.current}/{drama.episodes.total}</span>
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent" />
          </div>
        )}
        {drama.rank === 1 && (
          <div className="absolute bottom-0 left-2 text-short-yellow font-display italic text-6xl font-black leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">1</div>
        )}
      </div>
      <div className="px-1">
        <h4 className="text-white text-[11px] font-bold line-clamp-2 leading-tight group-hover:text-short-yellow transition-colors">{drama.title}</h4>
      </div>
    </div>
  );
};
