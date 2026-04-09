export interface Actor {
  name: string;
  image: string;
}

export interface Director {
  name: string;
  image: string;
}

export interface StorySegment {
  id: string;
  title: string;
  videoUrl: string;
  choices?: {
    question: string;
    options: {
      id: string;
      text: string;
      nextSegmentId: string;
    }[];
  };
  isEnd?: boolean;
}

export interface Drama {
  id: string;
  title: string;
  image: string;
  category: string;
  videoUrl?: string;
  views?: string;
  description?: string;
  releaseDate?: string;
  actors?: Actor[];
  director?: Director;
  episodes?: {
    current: number;
    total: number;
  };
  tag?: 'Hot' | 'New' | 'Trending';
  isExclusive?: boolean;
  rank?: number;
  comingSoonDate?: string;
  tags?: string[];
  storyline?: Record<number, StorySegment[]>; // episode number -> segments
}

export interface Category {
  id: string;
  name: string;
}

export interface InteractiveOption {
  id: string;
  text: string;
  nextVideoUrl: string;
  isVip?: boolean;
}

export interface Titbit {
  id: string;
  title: string;
  image: string;
  tag?: string;
  isInteractive?: boolean;
  videoUrl?: string;
  options?: InteractiveOption[];
}
