import React, { useState } from 'react';
import { Search, Play, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { DRAMAS } from '../mockData';
import { DramaCard } from '../components/DramaCard';
import { SectionHeader } from '../components/SectionHeader';
import { Drama } from '../types';

interface HomeScreenProps {
  onDramaClick: (drama: Drama) => void;
  onSubscribe: () => void;
  onSearch: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onDramaClick, onSubscribe, onSearch }) => {
  const [activeTab, setActiveTab] = useState('POPULAR');
  const tabs = ['POPULAR', 'INTERACTION', 'CATEGORY'];

  const bannerDrama = DRAMAS[0];
  const exclusiveDramas = DRAMAS.filter(d => d.isExclusive);
  const top1 = DRAMAS.find(d => d.rank === 1);
  const topOthers = DRAMAS.filter(d => d.rank && d.rank > 1).sort((a, b) => (a.rank || 0) - (b.rank || 0));
  const continueDramas = DRAMAS.filter(d => d.id.startsWith('continue-'));
  const comingSoonDrama = DRAMAS.find(d => d.comingSoonDate);
  const newShorts = DRAMAS.filter(d => d.id.startsWith('continue-')); // Using same for demo
  const mostPopular = DRAMAS.filter(d => d.id.startsWith('popular-'));

  const renderContent = () => {
    if (activeTab === 'INTERACTION') {
      const interactiveDramas = DRAMAS.filter(d => d.storyline);
      return (
        <div className="px-6 grid grid-cols-2 gap-4 mt-6">
          {interactiveDramas.map(drama => (
            <div key={drama.id} onClick={() => onDramaClick(drama)}>
              <DramaCard drama={drama} />
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'CATEGORY') {
      return (
        <div className="px-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            {['Action', 'Romance', 'Sci-Fi', 'Fantasy', 'Mystery'].map(cat => (
              <div key={cat} className="bg-[#1A1A1A] h-24 rounded-2xl flex items-center justify-center border border-white/5">
                <span className="text-white font-black">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Banner */}
        <div className="relative w-full aspect-[9/12] overflow-hidden">
          <img src={bannerDrama.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
          <div className="absolute bottom-16 left-6 right-6">
            <h1 className="text-white font-black text-6xl leading-[0.9] tracking-tighter mb-8 max-w-[200px]">
              VOID HEART EXILE
            </h1>
            <div className="flex items-center justify-between">
              <button 
                onClick={() => onDramaClick(bannerDrama)}
                className="bg-short-orange text-black px-6 py-2.5 rounded-lg font-black text-sm flex items-center gap-2 shadow-xl"
              >
                <Play size={16} fill="black" stroke="none" />
                Watch Now
              </button>
              <div className="flex gap-1.5">
                <div className="w-8 h-1.5 bg-white rounded-full" />
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Exclusive interaction */}
        <div className="mt-10">
          <div className="px-6 mb-4">
            <h2 className="text-white text-lg font-black tracking-tight">Exclusive interaction</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-6">
            {exclusiveDramas.map(drama => (
              <div key={drama.id} className="w-44 flex-shrink-0" onClick={() => onDramaClick(drama)}>
                <DramaCard drama={drama} variant="large" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Ranking */}
        <div className="mt-12 px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-black tracking-tight">Top</h2>
            <div className="flex gap-1">
               <div className="w-6 h-1 bg-white rounded-full" />
               <div className="w-1 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7" onClick={() => top1 && onDramaClick(top1)}>
              {top1 && <DramaCard drama={top1} />}
            </div>
            <div className="col-span-5 flex flex-col gap-4">
              {topOthers.map(drama => (
                <div key={drama.id} className="flex gap-3 items-center" onClick={() => onDramaClick(drama)}>
                  <div className="w-16 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img src={drama.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-1 left-1">
                       <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-short-orange italic font-black text-sm leading-none mb-1">{drama.rank}</span>
                    <h4 className="text-white text-[11px] font-bold line-clamp-2 leading-tight">{drama.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continue watching */}
        <div className="mt-12">
          <div className="px-6">
            <SectionHeader title="Continue watching" onSeeAll={() => {}} />
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-6">
            {continueDramas.map(drama => (
              <div key={drama.id} className="w-32 flex-shrink-0" onClick={() => onDramaClick(drama)}>
                <DramaCard drama={drama} />
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-12 px-6">
          <SectionHeader title="Coming Soon" onSeeAll={() => {}} />
          {comingSoonDrama && (
            <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden flex h-48 border border-white/5">
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-short-orange text-[10px] font-black uppercase tracking-wider mb-2 block">Coming {comingSoonDrama.comingSoonDate}</span>
                  <h3 className="text-white text-2xl font-black mb-1">{comingSoonDrama.title}</h3>
                  <p className="text-white/40 text-[10px] leading-tight line-clamp-3">{comingSoonDrama.description}</p>
                </div>
                <button className="w-full border border-white/20 py-2 rounded-lg text-white text-[11px] font-black flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                  <Bell size={14} />
                  Notify
                </button>
              </div>
              <div className="w-40 h-full">
                <img src={comingSoonDrama.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          )}
        </div>

        {/* New Shorts */}
        <div className="mt-12">
          <div className="px-6">
            <SectionHeader title="New Shorts" />
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-6">
            {newShorts.map(drama => (
              <div key={drama.id} className="w-32 flex-shrink-0" onClick={() => onDramaClick(drama)}>
                <DramaCard drama={drama} />
              </div>
            ))}
          </div>
        </div>

        {/* Most popular */}
        <div className="mt-12 px-6">
          <SectionHeader title="Most popular" />
          <div className="flex flex-col">
            {mostPopular.map(drama => (
              <div key={drama.id} onClick={() => onDramaClick(drama)}>
                <DramaCard drama={drama} variant="horizontal" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="pb-40 bg-black">
      {/* iOS Status Bar */}
      <div className="ios-status-bar">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zM11 7h2v2h-2zM11 11h2v6h-2z"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2c-3.86-3.86-10.13-3.86-14 0z"/></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 20H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2zm6-11v6l2 1V8l-2 1z"/></svg>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-short-yellow rounded-md flex items-center justify-center">
              <Play size={14} fill="black" stroke="none" />
           </div>
           <span className="text-short-yellow font-black text-xl tracking-tight">Short</span>
        </div>
        <div className="flex items-center gap-5">
           <button onClick={onSearch} className="text-white/80 hover:text-white transition-colors">
             <Search size={22} strokeWidth={2.5} />
           </button>
           <button onClick={onSubscribe} className="text-short-yellow hover:scale-110 transition-transform">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 7l11 5 11-5-11-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 flex gap-8 items-center mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[13px] font-black tracking-wider transition-all relative py-1 ${
              activeTab === tab ? 'text-black bg-white px-4 rounded-md' : 'text-white/40'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};
