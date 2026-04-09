import React, { useState } from 'react';
import { ArrowLeft, Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DRAMAS } from '../mockData';
import { Drama } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SearchScreenProps {
  onBack: () => void;
  onDramaClick: (drama: Drama) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onDramaClick }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  
  const filteredDramas = DRAMAS.filter(d => 
    d.title.toLowerCase().includes(query.toLowerCase()) ||
    d.category.toLowerCase().includes(query.toLowerCase())
  );

  const popularSearches = [
    { id: 'Action', label: t('search.action') },
    { id: 'Romance', label: t('search.romance') },
    { id: 'Thriller', label: t('search.thriller') },
    { id: 'Comedy', label: t('search.comedy') },
    { id: 'Trending', label: t('search.trending') },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col"
    >
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="text-white/60 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 relative">
          <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-10 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {query ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredDramas.map(drama => (
              <motion.div 
                key={drama.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-[3/4.5] rounded-2xl overflow-hidden relative group cursor-pointer"
                onClick={() => onDramaClick(drama)}
              >
                <img src={drama.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs font-bold line-clamp-1">{drama.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            <h3 className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold mb-6">{t('search.popular')}</h3>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map(tag => (
                <button 
                  key={tag.id}
                  onClick={() => setQuery(tag.id)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 hover:text-white transition-all"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
