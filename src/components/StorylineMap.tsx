import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { StorySegment } from '../types';

interface StorylineMapProps {
  segments: StorySegment[];
  activeSegmentIds: string[];
  onSegmentClick: (segmentId: string) => void;
  onClose: () => void;
}

export const StorylineMap: React.FC<StorylineMapProps> = ({ 
  segments, 
  activeSegmentIds, 
  onSegmentClick, 
  onClose 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
    >
      <div className="bg-[#1A1A1A] w-full max-w-sm rounded-[32px] overflow-hidden border border-white/10 flex flex-col max-h-[80vh]">
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <h3 className="text-white text-xl font-bold tracking-tight">Storyline</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="px-6 py-2 rounded-full border border-orange-500 text-orange-500 text-sm font-bold">
                Start
              </div>
              <div className="w-px h-6 bg-orange-500" />
            </div>

            {segments.map((segment, index) => {
              const isActive = activeSegmentIds.includes(segment.id);
              const isLast = index === segments.length - 1;

              return (
                <React.Fragment key={segment.id}>
                  <button
                    disabled={!isActive}
                    onClick={() => onSegmentClick(segment.id)}
                    className={`px-8 py-3 rounded-2xl border transition-all ${
                      isActive 
                        ? 'border-orange-500 text-orange-500 bg-orange-500/10' 
                        : 'border-white/10 text-white/20'
                    }`}
                  >
                    <span className="text-sm font-bold uppercase tracking-widest">{segment.title}</span>
                  </button>
                  
                  {!isLast && (
                    <div className={`w-px h-6 ${isActive ? 'bg-orange-500' : 'bg-white/10'}`} />
                  )}
                  
                  {segment.choices && (
                    <div className="flex flex-col items-center">
                      <div className="grid grid-cols-2 gap-4 w-full">
                        {segment.choices.options.map(opt => {
                          const isOptActive = activeSegmentIds.includes(opt.nextSegmentId);
                          return (
                            <div 
                              key={opt.id}
                              className={`p-3 rounded-xl border text-center text-[10px] font-bold uppercase tracking-tighter ${
                                isOptActive ? 'border-orange-500 text-orange-500' : 'border-white/10 text-white/20'
                              }`}
                            >
                              {opt.text.split('.')[0]}
                            </div>
                          );
                        })}
                      </div>
                      <div className={`w-px h-6 ${isActive ? 'bg-orange-500' : 'bg-white/10'}`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-white/10" />
              <div className="px-6 py-2 rounded-full border border-white/10 text-white/20 text-sm font-bold">
                End
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
