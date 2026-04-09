import React, { useRef, useState, useEffect } from 'react';
import { Drama, StorySegment } from '../types';
import { Heart, Share2, MoreHorizontal, ChevronRight, ChevronUp, Maximize2, ChevronLeft, Play, Map as MapIcon, X } from 'lucide-react';
import { SpeedSelector, EpisodeSelector, SettingsSelector } from './PlayerControls';
import { StorylineMap } from './StorylineMap';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface VideoItemProps {
  drama: Drama;
  isActive: boolean;
  onBack?: () => void;
  onSubscribe: () => void;
}

export const VideoItem: React.FC<VideoItemProps> = ({ drama, isActive, onBack, onSubscribe }) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showEpisodesPanel, setShowEpisodesPanel] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showMap, setShowMap] = useState(false);
  
  // Interactive Logic State
  const [currentSegmentId, setCurrentSegmentId] = useState('s1');
  const [watchedSegmentIds, setWatchedSegmentIds] = useState<string[]>(['s1']);
  const [showChoicePopup, setShowChoicePopup] = useState(false);
  const [lastChoices, setLastChoices] = useState<Record<string, string>>({});
  
  // Confirmation Popups
  const [showLockPopup, setShowLockPopup] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [showSceneResetPopup, setShowSceneResetPopup] = useState(false);
  const [targetEpisode, setTargetEpisode] = useState<number | null>(null);
  const [targetSegmentId, setTargetSegmentId] = useState<string | null>(null);

  const uiTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentEpisodeSegments = drama.storyline?.[currentEpisode] || [];
  const currentSegment = currentEpisodeSegments.find(s => s.id === currentSegmentId);

  const resetUITimer = () => {
    setShowUI(true);
    if (uiTimerRef.current) clearTimeout(uiTimerRef.current);
    uiTimerRef.current = setTimeout(() => {
      if (isPlaying && isActive && !showChoicePopup) {
        setShowUI(false);
      }
    }, 5000);
  };

  useEffect(() => {
    if (isActive && isPlaying && !showChoicePopup) {
      resetUITimer();
    } else {
      setShowUI(true);
      if (uiTimerRef.current) clearTimeout(uiTimerRef.current);
    }
    return () => {
      if (uiTimerRef.current) clearTimeout(uiTimerRef.current);
    };
  }, [isActive, isPlaying, showChoicePopup]);

  useEffect(() => {
    const controller = new AbortController();
    
    const playVideo = async () => {
      if (!isActive || !videoRef.current || !(currentSegment?.videoUrl || drama.videoUrl)) {
        return;
      }

      try {
        // Ensure the video element is still in the document
        if (videoRef.current.isConnected) {
          await videoRef.current.play();
          if (!controller.signal.aborted) {
            setIsPlaying(true);
          }
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.log("Autoplay blocked or interrupted", err);
        }
      }
    };

    if (isActive) {
      playVideo();
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    return () => {
      controller.abort();
    };
  }, [isActive, currentSegmentId, currentEpisode]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
        
        // Show choice popup when segment ends
        if (current >= duration - 0.5 && currentSegment?.choices && !showChoicePopup) {
          setShowChoicePopup(true);
          setIsPlaying(false);
          videoRef.current.pause();
        } else if (current >= duration - 0.5 && currentSegment?.isEnd && !showChoicePopup) {
          // Auto next episode if end of segments
          if (currentEpisode < (drama.episodes?.total || 1)) {
            setCurrentEpisode(prev => prev + 1);
            setCurrentSegmentId('s1');
            setWatchedSegmentIds(['s1']);
          }
        }
      }
    }
  };

  const handleChoice = (optionId: string, nextSegmentId: string) => {
    setLastChoices(prev => ({ ...prev, [currentSegmentId]: optionId }));
    setCurrentSegmentId(nextSegmentId);
    setWatchedSegmentIds(prev => [...prev, nextSegmentId]);
    setShowChoicePopup(false);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleEpisodeSelect = (ep: number) => {
    if (ep > currentEpisode) {
      setShowLockPopup(true);
    } else if (ep < currentEpisode) {
      setTargetEpisode(ep);
      setShowResetPopup(true);
    } else {
      setShowEpisodesPanel(false);
    }
  };

  const confirmEpisodeReset = () => {
    if (targetEpisode !== null) {
      setCurrentEpisode(targetEpisode);
      setCurrentSegmentId('s1');
      setWatchedSegmentIds(['s1']);
      setLastChoices({});
      setShowResetPopup(false);
      setShowEpisodesPanel(false);
    }
  };

  const handleSegmentClick = (segmentId: string) => {
    setTargetSegmentId(segmentId);
    setShowSceneResetPopup(true);
  };

  const confirmSceneReset = () => {
    if (targetSegmentId) {
      setCurrentSegmentId(targetSegmentId);
      // Reset watched segments after this one
      const index = watchedSegmentIds.indexOf(targetSegmentId);
      setWatchedSegmentIds(watchedSegmentIds.slice(0, index + 1));
      setShowSceneResetPopup(false);
      setShowMap(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current && !showChoicePopup) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-full bg-black snap-start overflow-hidden font-sans">
      {/* Video Element */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="relative w-full aspect-[9/16] max-h-full overflow-hidden">
          {(currentSegment?.videoUrl || drama.videoUrl) ? (
            <video
              ref={videoRef}
              src={currentSegment?.videoUrl || drama.videoUrl}
              className="w-full h-full object-cover"
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={() => {
                togglePlay();
                resetUITimer();
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
              <p className="text-white/40 text-sm">Video source not available</p>
            </div>
          )}
        </div>
      </div>

      {/* iOS Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 ios-status-bar px-6 pt-2">
        <span className="text-white font-semibold text-[15px]">12:48</span>
        <div className="flex items-center gap-1.5">
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 10H2.5V1M1 10H1V10ZM4.5 10H6V3M4.5 10H4.5V10ZM8 10H9.5V5M8 10H8V10ZM11.5 10H13V7M11.5 10H11.5V10Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 10.5L14.5 3.5C12.5 1.5 10 0.5 7.5 0.5C5 0.5 2.5 1.5 0.5 3.5L7.5 10.5Z" fill="white"/>
          </svg>
          <div className="w-6 h-3 border border-white/40 rounded-[3px] p-[1px] flex items-center">
            <div className="w-full h-full bg-white rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-12 left-0 right-0 z-40 px-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button onClick={onBack} className="text-white -ml-2">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <span className="text-white font-bold text-lg tracking-tight">EP.{currentEpisode}</span>
        </div>
        <button 
          onClick={() => setShowMap(true)}
          className="pointer-events-auto text-white"
        >
          <MapIcon size={24} />
        </button>
      </div>

      {/* Choice Popup */}
      <AnimatePresence>
        {showChoicePopup && currentSegment?.choices && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/60 flex items-center justify-center px-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-[320px] bg-[#0A0A0A] rounded-[24px] p-8 shadow-2xl border border-white/5"
            >
              <h3 className="text-white font-bold text-xl text-center mb-8 tracking-tight">
                {currentSegment.choices.question}
              </h3>
              
              <div className="space-y-4">
                {currentSegment.choices.options.map((opt, index) => (
                  <button
                    key={opt.id}
                    onClick={() => handleChoice(opt.id, opt.nextSegmentId)}
                    className="w-full bg-[#1A1A1A] border border-white/10 py-5 px-6 rounded-[16px] text-white font-medium text-base hover:bg-[#252525] transition-all flex items-center justify-between group relative"
                  >
                    <span className="truncate pr-4">{opt.text}</span>
                    {lastChoices[currentSegmentId] === opt.id && (
                      <span className="shrink-0 bg-white/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-widest font-bold text-white/40">
                        Last
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play/Pause Indicator Overlay */}
      {!isPlaying && !showChoicePopup && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="bg-white/10 backdrop-blur-xl p-7 rounded-full border border-white/20 shadow-2xl">
            <Play size={40} className="text-white fill-white translate-x-0.5" />
          </div>
        </div>
      )}

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-44 flex flex-col items-center gap-7 z-40">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
            resetUITimer();
          }} 
          className="flex flex-col items-center gap-1 group"
        >
          <Heart size={32} strokeWidth={2} className={isLiked ? "text-red-500 fill-red-500" : "text-white"} />
          <span className="text-white text-[11px] font-bold text-shadow-premium">100K</span>
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            resetUITimer();
          }}
          className="flex flex-col items-center gap-1 group"
        >
          <Share2 size={32} strokeWidth={2} className="text-white" />
          <span className="text-white text-[11px] font-bold text-shadow-premium">Share</span>
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowSettingsMenu(true);
            resetUITimer();
          }}
          className="flex flex-col items-center gap-1 group"
        >
          <MoreHorizontal size={32} strokeWidth={2} className="text-white" />
          <span className="text-white text-[11px] font-bold text-shadow-premium">More</span>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute left-6 right-20 bottom-32 z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              resetUITimer();
            }}
            className="flex items-center gap-2 group"
          >
            <span className="text-white font-black text-xl tracking-tight uppercase text-shadow-premium">
              {drama.title}
            </span>
            <ChevronRight size={20} className="text-white" />
          </button>
          <p className="text-white/60 text-[13px] mt-1 line-clamp-1 max-w-sm text-shadow-premium font-medium">
            {drama.description || "Film description film description film description"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-28 left-6 right-6 h-[1.5px] bg-white/20 rounded-full z-40">
        <div 
          className="h-full bg-white rounded-full transition-all duration-100" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom Controls Panel */}
      <div className="absolute bottom-10 left-6 right-6 flex gap-2 z-40">
        <button 
          onClick={() => setShowEpisodesPanel(true)}
          className="flex-1 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 flex items-center justify-between"
        >
          <span className="text-white font-bold text-sm">Full 32 EP</span>
          <ChevronUp size={20} className="text-white/60" />
        </button>
        <button 
          onClick={() => setShowSpeedMenu(true)}
          className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center"
        >
          <Maximize2 size={20} className="text-white" />
        </button>
      </div>

      {/* Confirmation Popups */}
      <AnimatePresence>
        {showLockPopup && (
          <div className="absolute inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-8">
            <div className="bg-[#2A2A2A] rounded-2xl p-8 w-full max-w-xs text-center border border-white/10">
              <p className="text-white text-sm font-medium leading-relaxed">Please complete the current episode first</p>
              <button 
                onClick={() => setShowLockPopup(false)}
                className="mt-8 w-full py-3 bg-white/10 rounded-xl text-white font-bold text-sm"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {showResetPopup && (
          <div className="absolute inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-8">
            <div className="bg-[#2A2A2A] rounded-3xl p-8 w-full max-w-xs border border-white/10">
              <h3 className="text-white text-center font-bold text-lg mb-4">Prompt</h3>
              <p className="text-white/80 text-sm text-center leading-relaxed mb-8">
                Restarting the previous episode will reset your progress. Do you want to continue?
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={confirmEpisodeReset}
                  className="py-3 bg-white/10 rounded-xl text-white font-bold text-sm"
                >
                  Yes
                </button>
                <button 
                  onClick={() => setShowResetPopup(false)}
                  className="py-3 bg-white/10 rounded-xl text-white font-bold text-sm"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {showSceneResetPopup && (
          <div className="absolute inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-8">
            <div className="bg-[#2A2A2A] rounded-3xl p-8 w-full max-w-xs border border-white/10">
              <h3 className="text-white text-center font-bold text-lg mb-4">Prompt</h3>
              <p className="text-white/80 text-sm text-center leading-relaxed mb-8">
                Returning to the previous scene will affect the direction of the plot. Are you sure you want to continue?
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={confirmSceneReset}
                  className="py-3 bg-white/10 rounded-xl text-white font-bold text-sm"
                >
                  Yes
                </button>
                <button 
                  onClick={() => setShowSceneResetPopup(false)}
                  className="py-3 bg-white/10 rounded-xl text-white font-bold text-sm"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {showMap && (
          <StorylineMap 
            segments={currentEpisodeSegments}
            activeSegmentIds={watchedSegmentIds}
            onSegmentClick={handleSegmentClick}
            onClose={() => setShowMap(false)}
          />
        )}
      </AnimatePresence>

      {/* Overlays */}
      <AnimatePresence>
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
            totalEpisodes={32} 
            currentEpisode={currentEpisode} 
            onSelect={handleEpisodeSelect} 
            onClose={() => setShowEpisodesPanel(false)}
            onSubscribe={onSubscribe}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

