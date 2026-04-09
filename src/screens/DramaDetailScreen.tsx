import React from 'react';
import { Drama } from '../types';
import { ChevronLeft, Share2, Check, Lock } from 'lucide-react';
import { DramaCard } from '../components/DramaCard';
import { DRAMAS } from '../mockData';
import { useLanguage } from '../context/LanguageContext';

interface DramaDetailScreenProps {
  drama: Drama;
  onBack: () => void;
  onPlay: () => void;
  onSubscribe: () => void;
}

export const DramaDetailScreen: React.FC<DramaDetailScreenProps> = ({ drama, onBack, onPlay, onSubscribe }) => {
  const { t } = useLanguage();
  const episodes = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-[150] bg-[#050505] overflow-y-auto no-scrollbar pb-32">
      {/* Hero Header */}
      <div className="relative h-[50vh]">
        <img src={drama.image} className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        
        <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center z-10">
          <button 
            onClick={onBack} 
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-all">
            <Share2 size={20} />
          </button>
        </div>

        <div className="absolute bottom-8 left-6 right-6 flex gap-8 items-end">
          <div className="w-32 aspect-[3/4] rounded-[24px] overflow-hidden shadow-2xl border border-white/10 flex-shrink-0 animate-float">
            <img src={drama.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded bg-purple-500 text-[9px] font-black uppercase tracking-widest">{t('player.hot')}</span>
              <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-md text-[9px] font-black uppercase tracking-widest border border-white/10">{drama.category}</span>
            </div>
            <h1 className="text-white text-4xl font-display italic text-shadow-premium leading-tight">{drama.title}</h1>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-3 font-bold">{t('player.release')} <span className="text-white/80 ml-2">{drama.releaseDate || '2025.08.25'}</span></p>
            <div className="flex gap-3 mt-6">
              <button className="bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/10 hover:bg-white/20 transition-all">
                <Check size={14} /> {t('detail.notified')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-6 space-y-12 mt-8">
        {/* Synopsis */}
        <section>
          <h2 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-4">{t('detail.synopsis')}</h2>
          <p className="text-white/60 text-sm leading-relaxed font-medium">
            {drama.description || "The series follows a young, talented football player from a small town who gets a chance to play for a top league club. As he climbs the ranks, he faces intense competition, locker room politics, and the weight of expectations from his family and fans."}
          </p>
        </section>

        {/* Cast & Crew */}
        <section>
          <h2 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-6">{t('detail.cast')}</h2>
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            {/* Director First */}
            {drama.director && (
              <div className="flex flex-col items-center gap-3 w-20 flex-shrink-0">
                <div className="w-20 h-24 rounded-[20px] overflow-hidden border border-white/10 shadow-xl">
                  <img src={drama.director.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-[10px] truncate w-20">{drama.director.name}</p>
                  <p className="text-white/40 text-[8px] uppercase tracking-widest mt-0.5">{t('player.director')}</p>
                </div>
              </div>
            )}
            {/* Actors */}
            {(drama.actors || []).map((actor, i) => (
              <div key={i} className="flex flex-col items-center gap-3 w-20 flex-shrink-0">
                <div className="w-20 h-24 rounded-[20px] overflow-hidden border border-white/10 shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
                  <img src={actor.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-[10px] truncate w-20">{actor.name}</p>
                  <p className="text-white/40 text-[8px] uppercase tracking-widest mt-0.5">{t('detail.actor')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Episodes */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-white text-xs font-black uppercase tracking-[0.2em]">{t('player.episodes')}</h2>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
              <span className="text-white border-b-2 border-purple-500 pb-1">1 - 20</span>
              <span className="text-white/20">21 - 50</span>
              <span className="text-white/20">51 - 70</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {episodes.map((ep) => (
              <button 
                key={ep}
                onClick={ep > 12 ? onSubscribe : onPlay}
                className={`aspect-square rounded-2xl flex items-center justify-center font-black text-xs transition-all border relative overflow-hidden ${
                  ep === 1 
                    ? 'bg-white text-black border-white shadow-lg shadow-white/10' 
                    : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {ep > 12 ? (
                  <div className="flex flex-col items-center gap-1">
                    <Lock size={12} className="text-white/20" />
                    <span className="text-[8px]">{ep}</span>
                  </div>
                ) : ep}
              </button>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="pb-12">
          <h2 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">{t('detail.recommendations')}</h2>
          <div className="grid grid-cols-2 gap-6">
            {DRAMAS.slice(0, 4).map(d => (
              <DramaCard key={d.id} drama={d} />
            ))}
          </div>
        </section>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-[160]">
        <button 
          onClick={onPlay}
          className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-white/90 transition-all active:scale-[0.98]"
        >
          {t('detail.continueWatching')}
        </button>
      </div>
    </div>
  );
};
