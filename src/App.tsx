/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { MyListScreen } from './screens/MyListScreen';
import { TitbitsScreen } from './screens/TitbitsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { DramaDetailScreen } from './screens/DramaDetailScreen';
import { SubscribeScreen } from './screens/SubscribeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { FeedbackScreen } from './screens/FeedbackScreen';
import { BottomNav } from './components/BottomNav';
import { Drama } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { ChevronLeft } from 'lucide-react';
import { VideoItem } from './components/VideoItem';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);
  const [playingDrama, setPlayingDrama] = useState<Drama | null>(null);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDramaClick = (drama: Drama) => {
    setPlayingDrama(drama);
  };

  const renderScreen = () => {
    if (playingDrama) {
      return (
        <div className="h-full w-full bg-black relative">
          <VideoItem 
            drama={playingDrama} 
            isActive={true} 
            onBack={() => setPlayingDrama(null)}
            onSubscribe={() => setShowSubscribe(true)}
          />
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomeScreen onDramaClick={handleDramaClick} onSubscribe={() => setShowSubscribe(true)} onSearch={() => setShowSearch(true)} />;
      case 'discover':
        return <DiscoverScreen onTitleClick={handleDramaClick} onSubscribe={() => setShowSubscribe(true)} />;
      case 'titbits':
        return <TitbitsScreen onSubscribe={() => setShowSubscribe(true)} onDramaClick={handleDramaClick} onSearch={() => setShowSearch(true)} />;
      case 'mylist':
        return <MyListScreen onDramaClick={handleDramaClick} />;
      case 'profile':
        return <ProfileScreen onSettings={() => setShowSettings(true)} onHistory={() => setActiveTab('mylist')} onSubscribe={() => setShowSubscribe(true)} onFeedback={() => setShowFeedback(true)} />;
      default:
        return <HomeScreen onDramaClick={handleDramaClick} onSubscribe={() => setShowSubscribe(true)} onSearch={() => setShowSearch(true)} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-yellow-500/30">
        <main className="max-w-md mx-auto h-screen relative shadow-2xl shadow-black overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {renderScreen()}
          </div>
          {!playingDrama && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}

          {selectedDrama && (
            <DramaDetailScreen 
              drama={selectedDrama} 
              onBack={() => setSelectedDrama(null)}
              onPlay={() => {
                setPlayingDrama(selectedDrama);
                setSelectedDrama(null);
              }}
              onSubscribe={() => setShowSubscribe(true)}
            />
          )}

          {showSubscribe && (
            <SubscribeScreen onBack={() => setShowSubscribe(false)} />
          )}

          {showSearch && (
            <SearchScreen onBack={() => setShowSearch(false)} onDramaClick={handleDramaClick} />
          )}

          {showSettings && (
            <SettingsScreen onBack={() => setShowSettings(false)} />
          )}

          {showFeedback && (
            <FeedbackScreen onBack={() => setShowFeedback(false)} />
          )}
        </main>
      </div>
    </LanguageProvider>
  );
}
