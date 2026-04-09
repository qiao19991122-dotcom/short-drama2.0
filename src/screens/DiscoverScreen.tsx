import React, { useState, useRef } from 'react';
import { DRAMAS } from '../mockData';
import { VideoItem } from '../components/VideoItem';
import { Drama } from '../types';

interface DiscoverScreenProps {
  onTitleClick: (drama: Drama) => void;
  onSubscribe: () => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ onTitleClick, onSubscribe }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
      setActiveIndex(index);
    }
  };

  return (
    <div className="h-full w-full bg-black relative">
      {/* Vertical Scroll Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {DRAMAS.filter(d => d.videoUrl).map((drama, index) => (
          <div key={drama.id} className="h-full w-full snap-start">
            <VideoItem 
              drama={drama} 
              isActive={index === activeIndex} 
              onTitleClick={onTitleClick}
              onSubscribe={onSubscribe}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
