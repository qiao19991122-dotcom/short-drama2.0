import React, { useState } from 'react';
import { DRAMAS, TITBITS } from '../mockData';
import { DramaCard } from '../components/DramaCard';
import { SectionHeader } from '../components/SectionHeader';
import { InteractivePlayer } from '../components/InteractivePlayer';
import { Titbit, Drama } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TitbitsScreenProps {
  onSubscribe: () => void;
  onDramaClick: (drama: Drama) => void;
  onSearch: () => void;
}

export const TitbitsScreen: React.FC<TitbitsScreenProps> = ({ onSubscribe, onDramaClick, onSearch }) => {
  const { t } = useLanguage();
  const [selectedTitbit, setSelectedTitbit] = useState<Titbit | null>(null);

  return (
    <div className="pb-32 bg-[#0A0A0A]">
      {selectedTitbit && (
        <InteractivePlayer 
          titbit={selectedTitbit} 
          onClose={() => setSelectedTitbit(null)} 
          onSubscribe={onSubscribe}
        />
      )}

      {/* Header Section */}
      <div className="px-6 pt-12">
        <span className="text-[10px] uppercase tracking-[0.4em] text-purple-500 font-bold mb-2 block">{t('titbits.exclusive')}</span>
        <h1 className="text-white font-display italic text-4xl leading-tight">{t('titbits.title')}</h1>
      </div>

      {/* Featured Spotlight */}
      <div className="mt-8 px-6">
        <div 
          onClick={() => onDramaClick(DRAMAS[4])} 
          className="relative aspect-[16/9] rounded-[32px] overflow-hidden cursor-pointer group shadow-2xl border border-white/5"
        >
          <img src={DRAMAS[4].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{t('titbits.spotlight')}</span>
            </div>
            <h2 className="text-white font-display italic text-2xl">{DRAMAS[4].title}</h2>
          </div>
        </div>
      </div>

      {/* Interactive Highlights */}
      <div className="mt-16">
        <div className="px-6 flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-2 block">01</span>
            <h2 className="text-white font-display italic text-3xl">{t('titbits.interactive')}</h2>
          </div>
          <button 
            onClick={onSearch}
            className="text-white/40 text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors"
          >
            {t('titbits.explore')}
          </button>
        </div>
        
        <div className="flex gap-6 overflow-x-auto no-scrollbar px-6">
          {TITBITS.map((item) => (
            <div 
              key={item.id} 
              className="w-48 flex-shrink-0 group cursor-pointer"
              onClick={() => item.isInteractive && setSelectedTitbit(item)}
            >
              <div className="relative aspect-[3/4] rounded-[28px] overflow-hidden border border-white/10 bg-white/5">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                {item.tag && (
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/20 ${
                      item.tag === 'Interactive' ? 'bg-purple-600/80' : 'bg-red-600/80'
                    }`}>
                      {item.tag === 'Interactive' ? t('titbits.interactive') : item.tag}
                    </span>
                  </div>
                )}
                {item.isInteractive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1.5" />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h4 className="text-white text-sm font-bold truncate">{item.title}</h4>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{t('titbits.exclusiveClip')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actor Life - Grid Style */}
      <div className="mt-20 px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-2 block">02</span>
            <h2 className="text-white font-display italic text-3xl">{t('titbits.actorLife')}</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {TITBITS.slice(0, 4).map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative aspect-square rounded-[32px] overflow-hidden border border-white/5">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 rounded-lg bg-red-600 text-white text-[8px] font-bold uppercase tracking-widest">{t('titbits.new')}</span>
                </div>
              </div>
              <h4 className="text-white text-xs font-bold mt-4 truncate">{item.title}</h4>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{t('titbits.dailyVlog')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
