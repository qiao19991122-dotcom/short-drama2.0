import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Lock, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SpeedSelectorProps {
  currentSpeed: number;
  onSelect: (speed: number) => void;
  onClose: () => void;
}

export const SpeedSelector: React.FC<SpeedSelectorProps> = ({ currentSpeed, onSelect, onClose }) => {
  const { t } = useLanguage();
  const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="absolute inset-x-0 bottom-0 z-[100] bg-[#1A1A1A] rounded-t-[32px] p-8 pb-12 shadow-2xl border-t border-white/5"
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-white text-xl font-bold tracking-tight">{t('player.speed')}</h3>
        <button onClick={onClose} className="text-white/40 hover:text-white">
          <X size={24} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {speeds.map((speed) => (
          <button
            key={speed}
            onClick={() => {
              onSelect(speed);
              onClose();
            }}
            className={`py-4 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border ${
              currentSpeed === speed
                ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10'
            }`}
          >
            <span className="text-lg font-black">{speed}x</span>
            {currentSpeed === speed && <Check size={14} />}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

interface SettingsSelectorProps {
  onClose: () => void;
}

export const SettingsSelector: React.FC<SettingsSelectorProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const settings = [
    { label: t('player.quality'), value: '1080p' },
    { label: t('player.subtitle'), value: 'English' },
    { label: t('player.audio'), value: 'Original' },
    { label: t('player.autoPlay'), value: t('general.on') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="absolute inset-x-0 bottom-0 z-[100] bg-[#1A1A1A] rounded-t-[32px] p-8 pb-12 shadow-2xl border-t border-white/5"
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-white text-xl font-bold tracking-tight">{t('player.settings')}</h3>
        <button onClick={onClose} className="text-white/40 hover:text-white">
          <X size={24} />
        </button>
      </div>
      <div className="space-y-4">
        {settings.map((setting) => (
          <button
            key={setting.label}
            className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="text-white/60 font-medium">{setting.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{setting.value}</span>
              <Play size={10} className="text-white/20 fill-white/20" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

interface EpisodeSelectorProps {
  totalEpisodes: number;
  currentEpisode: number;
  onSelect: (episode: number) => void;
  onClose: () => void;
  onSubscribe: () => void;
}

export const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({ 
  totalEpisodes, 
  currentEpisode, 
  onSelect, 
  onClose,
  onSubscribe
}) => {
  const { t } = useLanguage();
  const episodes = Array.from({ length: totalEpisodes }, (_, i) => i + 1);
  const vipStart = 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="absolute inset-x-0 bottom-0 z-[100] bg-[#1A1A1A] rounded-t-[32px] p-8 pb-12 shadow-2xl border-t border-white/5 max-h-[80vh] overflow-y-auto no-scrollbar"
    >
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#1A1A1A] py-2 z-10">
        <div>
          <h3 className="text-white text-xl font-bold tracking-tight">Episodes</h3>
          <p className="text-white/40 text-xs mt-1">1-{totalEpisodes}</p>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white">
          <X size={24} />
        </button>
      </div>
      
      <div className="grid grid-cols-5 gap-3">
        <button className="aspect-square rounded-xl bg-white/5 text-white/40 text-xs font-bold border border-white/5">
          Trailer
        </button>
        {episodes.map((ep) => (
          <button
            key={ep}
            onClick={() => onSelect(ep)}
            className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all border relative overflow-hidden ${
              currentEpisode === ep
                ? 'bg-[#333333] text-white border-white/20'
                : 'bg-[#262626] text-white/60 border-transparent'
            }`}
          >
            <span className="text-sm font-bold">{ep}</span>
            {ep > vipStart && (
              <div className="absolute top-1 right-1 bg-red-500 rounded-sm p-0.5">
                <Lock size={8} className="text-white" />
              </div>
            )}
            {currentEpisode === ep && (
              <div className="absolute bottom-1 right-1">
                <div className="flex gap-0.5 items-end h-2">
                  <div className="w-0.5 bg-white animate-[bounce_1s_infinite_0ms]" style={{ height: '40%' }} />
                  <div className="w-0.5 bg-white animate-[bounce_1s_infinite_200ms]" style={{ height: '100%' }} />
                  <div className="w-0.5 bg-white animate-[bounce_1s_infinite_400ms]" style={{ height: '60%' }} />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
