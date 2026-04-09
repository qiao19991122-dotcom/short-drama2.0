import { Drama, Category, Titbit } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'ALL' },
  { id: 'drama', name: 'Drama' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'action', name: 'Action' },
  { id: 'romance', name: 'Romance' },
];

export const DRAMAS: Drama[] = [
  {
    id: 'banner-1',
    title: 'VOID HEART EXILE',
    image: 'https://picsum.photos/seed/voidheart/1080/1920',
    category: 'Action',
    description: 'An epic journey of love and destiny that will capture your heart.',
    tag: 'Hot',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    storyline: {
      1: [
        {
          id: 's1',
          title: 'The Beginning',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          choices: {
            question: 'Choose',
            options: [
              { id: 'a', text: 'This is option A', nextSegmentId: 's2' },
              { id: 'b', text: 'This is option B', nextSegmentId: 's3' }
            ]
          }
        },
        {
          id: 's2',
          title: 'Path A',
          videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
          isEnd: true
        },
        {
          id: 's3',
          title: 'Path B',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isEnd: true
        }
      ]
    }
  },
  {
    id: 'exclusive-1',
    title: 'Vengeance Gold',
    image: 'https://picsum.photos/seed/vengeance/800/1200',
    category: 'Action',
    isExclusive: true,
    rank: 1,
    episodes: { current: 24, total: 60 },
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
    storyline: {
      1: [
        {
          id: 's1',
          title: 'The Beginning',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          choices: {
            question: 'Choose',
            options: [
              { id: 'a', text: 'This is option A', nextSegmentId: 's2' },
              { id: 'b', text: 'This is option B', nextSegmentId: 's3' }
            ]
          }
        },
        {
          id: 's2',
          title: 'Path A',
          videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
          isEnd: true
        },
        {
          id: 's3',
          title: 'Path B',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isEnd: true
        }
      ]
    }
  },
  {
    id: 'exclusive-2',
    title: 'Mechanical Warfare Terminator',
    image: 'https://picsum.photos/seed/mecha/800/1200',
    category: 'Sci-Fi',
    isExclusive: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    storyline: {
      1: [
        {
          id: 's1',
          title: 'The Beginning',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          choices: {
            question: 'Choose',
            options: [
              { id: 'a', text: 'This is option A', nextSegmentId: 's2' },
              { id: 'b', text: 'This is option B', nextSegmentId: 's3' }
            ]
          }
        },
        {
          id: 's2',
          title: 'Path A',
          videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
          isEnd: true
        },
        {
          id: 's3',
          title: 'Path B',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isEnd: true
        }
      ]
    }
  },
  {
    id: 'top-2',
    title: 'Revenge: The Unknown',
    image: 'https://picsum.photos/seed/revenge/400/600',
    category: 'Mystery',
    rank: 2,
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  },
  {
    id: 'top-3',
    title: 'Cultivate Immortality',
    image: 'https://picsum.photos/seed/cultivate/400/600',
    category: 'Fantasy',
    rank: 3,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 'top-4',
    title: 'Necromancer',
    image: 'https://picsum.photos/seed/necro/400/600',
    category: 'Fantasy',
    rank: 4,
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  },
  {
    id: 'continue-1',
    title: 'Midnight heiress',
    image: 'https://picsum.photos/seed/midnight/800/1200',
    category: 'Romance',
    episodes: { current: 24, total: 60 },
    tag: 'New',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 'continue-2',
    title: "Hero's twilight",
    image: 'https://picsum.photos/seed/hero/800/1200',
    category: 'Action',
    episodes: { current: 24, total: 60 },
    tag: 'Hot',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  },
  {
    id: 'continue-3',
    title: 'Before Tomorrow',
    image: 'https://picsum.photos/seed/tomorrow/800/1200',
    category: 'Sci-Fi',
    episodes: { current: 24, total: 60 },
    tag: 'Hot',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 'coming-1',
    title: 'Mulan',
    image: 'https://picsum.photos/seed/mulan/800/1200',
    category: 'Action',
    comingSoonDate: 'April 15th',
    description: 'An epic journey of love and destinythat wili capture your hear',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  },
  {
    id: 'popular-1',
    title: 'Iron Angel:Rebirth',
    image: 'https://picsum.photos/seed/ironangel/800/1200',
    category: 'Sci-Fi',
    tags: ['Cyber', 'Mecha', 'Dystopian'],
    episodes: { current: 120, total: 120 },
    views: '2.2M',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  }
];

export const TITBITS: Titbit[] = [
  { 
    id: 't1', 
    title: 'Interactive: The Choice', 
    image: 'https://picsum.photos/seed/city/800/1200', 
    tag: 'Interactive',
    isInteractive: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    options: [
      { id: 'o1', text: 'Go Left (Action)', nextVideoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4' },
      { id: 'o2', text: 'Go Right (Mystery)', nextVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isVip: true }
    ]
  },
  { 
    id: 't4', 
    title: 'Interactive: The Escape', 
    image: 'https://picsum.photos/seed/landscape/800/1200', 
    tag: 'Interactive',
    isInteractive: true,
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
    options: [
      { id: 'o3', text: 'Fight Back', nextVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'o4', text: 'Run Away', nextVideoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', isVip: true }
    ]
  },
  { id: 't2', title: 'Kill Bill Highlights', image: 'https://picsum.photos/seed/action2/800/1200', tag: 'Hot', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 't3', title: 'Actor Life: Shyraq', image: 'https://picsum.photos/seed/bts/800/1200', tag: 'New', videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4' }
];
