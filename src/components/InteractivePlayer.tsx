import React, { useState, useRef, useEffect } from 'react';
import { Titbit, InteractiveOption } from '../types';
import { X, Play, RotateCcw, Settings, Gauge, Lock, Heart, List, Share2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SpeedSelector, SettingsSelector, EpisodeSelector } from './PlayerControls';

interface InteractivePlayerProps {
  titbit: Titbit;
  onClose: () => void;
  onSubscribe: () => void;
}

export const InteractivePlayer: React.FC<InteractivePlayerProps> = ({ titbit, onClose, onSubscribe }) => {
  const [currentVideoUrl, setCurrentVideoUrl] = useState(titbit.videoUrl || '');
  const [showOptions, setShowOptions] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showEpisodesPanel, setShowEpisodesPanel] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const uiTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const resetUITimer = () => {
    setShowUI(true);
    if (uiTimerRef.current) clearTimeout(uiTimerRef.current);
    uiTimerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowUI(false);
      }
    }, 3000);
  };

  useEffect(() => {
    resetUITimer();
    return () => {
      if (uiTimerRef.current) clearTimeout(uiTimerRef.current);
    };
  }, [currentVideoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [currentVideoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleVideoEnd = () => {
    if (titbit.isInteractive && titbit.options && !isEnded) {
      setShowOptions(true);
    } else {
      setIsEnded(true);
    }
  };

  const handleOptionSelect = (option: InteractiveOption) => {
    if (option.isVip) {
      onSubscribe();
      return;
    }
    setCurrentVideoUrl(option.nextVideoUrl);
    setShowOptions(false);
    setIsEnded(false); 
  };

  const restart = () => {
    setCurrentVideoUrl(titbit.videoUrl || '');
    setShowOptions(false);
    setIsEnded(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Top Header Overlay */}
      <AnimatePresence>
        {showUI && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 z-[110] px-4 pt-12 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/40 to-transparent pb-16"
          >
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-all"
            >
              <X size={24} />
            </button>
            <div className="flex gap-6">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSpeedMenu(true);
                  resetUITimer();
                }}
                className="text-white/80 hover:text-white flex flex-col items-center gap-0.5 transition-colors"
              >
                <Gauge size={22} />
                <span className="text-[10px] font-bold tracking-wider">{playbackSpeed}x</span>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettingsMenu(true);
                  resetUITimer();
                }}
                className="text-white/80 hover:text-white flex flex-col items-center gap-0.5 transition-colors"
              >
                <Settings size={22} />
                <span className="text-[10px] font-bold tracking-wider">SETTING</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex-1 bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={currentVideoUrl}
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          playsInline
          autoPlay
          onClick={() => {
            setShowInfo(!showInfo);
            resetUITimer();
          }}
        />

        {/* Right Side Actions (Synced with VideoItem) */}
        <AnimatePresence>
          {showUI && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-[110]"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                  resetUITimer();
                }} 
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 group-active:scale-90 transition-transform">
                  <Heart size={28} className={isLiked ? "text-red-500 fill-red-500" : "text-white"} />
                </div>
                <span className="text-white text-[10px] font-bold text-shadow-premium">1.2M</span>
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEpisodesPanel(true);
                  resetUITimer();
                }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 group-active:scale-90 transition-transform">
                  <List size={28} className="text-white" />
                </div>
                <span className="text-white text-[10px] font-bold text-shadow-premium">EPISODES</span>
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  resetUITimer();
                }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 group-active:scale-90 transition-transform">
                  <Share2 size={28} className="text-white" />
                </div>
                <span className="text-white text-[10px] font-bold text-shadow-premium">SHARE</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Info (Synced with VideoItem) */}
        <AnimatePresence>
          {showUI && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute left-4 right-20 bottom-24 z-[110] pointer-events-none"
            >
              <div className="pointer-events-auto">
                <div className="flex items-center gap-2">
                  <h2 className="text-white font-display italic text-2xl text-shadow-premium">
                    @{titbit.title}
                  </h2>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInfo(true);
                      resetUITimer();
                    }}
                    className="p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-colors"
                  >
                    <Info size={14} />
                  </button>
                </div>
                <p className="text-white/80 text-sm mt-2 line-clamp-2 max-w-sm text-shadow-premium leading-relaxed">
                  Experience the next level of interactive storytelling. Every choice matters in this high-stakes drama.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-md text-[10px] font-bold border border-white/10 uppercase tracking-widest">
                    {titbit.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 backdrop-blur-md text-[10px] font-bold border border-purple-500/20 uppercase tracking-widest text-purple-300">
                    Interactive
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl"
            >
              <div className="bg-[#1A1A1A] rounded-[32px] p-8 max-w-sm border border-white/10 relative">
                <button 
                  onClick={() => setShowInfo(false)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white"
                >
                  <X size={24} />
                </button>
                <h3 className="text-white font-display italic text-2xl mb-4">Drama Introduction</h3>
                <div className="space-y-4">
                  <p className="text-white/60 text-sm leading-relaxed">
                    This is a groundbreaking interactive short drama where your decisions shape the narrative. Follow the journey of our protagonist as they navigate a world of mystery and intrigue.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Director</p>
                      <p className="text-white text-xs font-bold">Christopher Nolan</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Release</p>
                      <p className="text-white text-xs font-bold">2026.03.22</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="w-full mt-8 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          )}
          {showOptions && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6"
            >
              <h3 className="text-white text-2xl font-bold mb-8 text-center italic">What will you choose?</h3>
              <div className="flex flex-col gap-4 w-full max-w-xs">
                {titbit.options?.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2 ${
                      option.isVip 
                        ? 'bg-gradient-to-r from-yellow-200 to-yellow-500 text-black' 
                        : 'bg-white text-black hover:bg-yellow-400'
                    }`}
                  >
                    {option.text}
                    {option.isVip && <Lock size={18} />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {isEnded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-6"
            >
              <h3 className="text-white text-2xl font-bold mb-8">The End</h3>
              <button
                onClick={restart}
                className="flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors"
              >
                <RotateCcw size={20} /> Watch Again
              </button>
            </motion.div>
          )}

          {showSpeedMenu && (
            <SpeedSelector 
              currentSpeed={playbackSpeed} 
              onSelect={setPlaybackSpeed} 
              onClose={() => setShowSpeedMenu(false)} 
            />
          )}

          {showSettingsMenu && (
            <SettingsSelector 
              onClose={() => setShowSettingsMenu(false)} 
            />
          )}

          {showEpisodesPanel && (
            <EpisodeSelector 
              totalEpisodes={15} 
              currentEpisode={1} 
              onSelect={(ep) => {
                // Mock episode change
                restart();
                setShowEpisodesPanel(false);
              }} 
              onClose={() => setShowEpisodesPanel(false)}
              onSubscribe={onSubscribe}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-white/10 w-full">
        <motion.div 
          className="h-full bg-yellow-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 10, ease: "linear" }} // Mock progress
          key={currentVideoUrl}
        />
      </div>
    </div>
  );
};
