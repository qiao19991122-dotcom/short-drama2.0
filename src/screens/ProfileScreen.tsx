import React from 'react';
import { ChevronRight, Settings, MessageSquare, CreditCard, Globe, Star, Wallet, ShoppingBag, Headset, ShieldCheck, Info, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProfileScreenProps {
  onSettings: () => void;
  onHistory: () => void;
  onSubscribe: () => void;
  onFeedback: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onSettings, onHistory, onSubscribe, onFeedback }) => {
  const { t, language } = useLanguage();

  const mainSections = [
    { icon: Wallet, label: t('profile.wallet'), value: '0.00', color: 'text-yellow-500', onClick: () => {} },
    { icon: ShoppingBag, label: t('profile.orders'), value: '0', color: 'text-blue-500', onClick: () => {} },
    { icon: Star, label: t('profile.favorites'), value: '12', color: 'text-pink-500', onClick: onHistory },
  ];

  const menuGroups = [
    {
      title: t('profile.services'),
      items: [
        { icon: Globe, label: t('profile.language'), id: 'lang', extra: language === 'en' ? 'English' : '中文', onClick: onSettings },
        { icon: MessageSquare, label: t('profile.messages'), id: 'msg', badge: 2, onClick: () => {} },
        { icon: Headset, label: t('profile.customerService'), id: 'support', onClick: onFeedback },
      ]
    },
    {
      title: t('profile.account'),
      items: [
        { icon: ShieldCheck, label: t('profile.privacy'), id: 'privacy', onClick: onSettings },
        { icon: CreditCard, label: t('profile.billing'), id: 'bill', onClick: () => {} },
        { icon: Info, label: t('profile.about'), id: 'about', onClick: () => {} },
      ]
    }
  ];

  return (
    <div className="pb-32 bg-[#0A0A0A] min-h-full">
      {/* User Header */}
      <div className="relative pt-16 pb-10 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-600/20 to-transparent pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 p-1 shadow-xl shadow-purple-500/20">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-2 border-black">
                   <img src="https://picsum.photos/seed/avatar/200/200" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 p-1.5 rounded-full border-2 border-black">
                <Star size={12} fill="black" className="text-black" />
              </div>
            </div>
            <div>
              <h2 className="text-white text-2xl font-black tracking-tight">Alex Rivera</h2>
              <p className="text-white/40 text-[10px] mt-1 font-mono tracking-widest uppercase">Premium Member • ID: 43310879</p>
            </div>
          </div>
          <button 
            onClick={onSettings}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Stats/Wallet */}
      <div className="px-6 grid grid-cols-3 gap-4">
        {mainSections.map((section) => (
          <button 
            key={section.label} 
            onClick={section.onClick}
            className="bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 transition-all active:scale-95"
          >
            <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center ${section.color}`}>
              <section.icon size={20} />
            </div>
            <span className="text-white text-lg font-black">{section.value}</span>
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{section.label}</span>
          </button>
        ))}
      </div>

      {/* VIP Banner */}
      <div className="mt-8 px-6">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 rounded-3xl p-6 flex items-center justify-between shadow-2xl">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="bg-black text-yellow-500 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">Pro Plan</span>
                <h3 className="text-black text-xl font-black italic tracking-tighter uppercase">{t('profile.vip.title')}</h3>
              </div>
              <p className="text-black/70 text-xs mt-2 font-bold leading-tight">
                {t('profile.vip.desc')}
              </p>
            </div>
            <button 
              onClick={onSubscribe}
              className="bg-black text-white px-6 py-3 rounded-2xl text-sm font-black hover:bg-black/80 transition-all active:scale-95 shadow-xl shadow-black/20"
            >
              {t('profile.vip.upgrade')}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Groups */}
      <div className="mt-10 px-6 space-y-8">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <h4 className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-4 ml-2">{group.title}</h4>
            <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
              {group.items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors group ${
                    index !== group.items.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                      <item.icon size={22} />
                    </div>
                    <span className="text-white font-bold tracking-tight">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.extra && <span className="text-white/30 text-xs font-medium">{item.extra}</span>}
                    {item.badge && (
                      <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={18} className="text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full bg-red-500/10 border border-red-500/20 rounded-[32px] p-5 flex items-center justify-center gap-3 hover:bg-red-500/20 transition-colors group">
          <LogOut size={20} className="text-red-500" />
          <span className="text-red-500 font-black uppercase tracking-widest text-xs">{t('profile.logout')}</span>
        </button>
      </div>
    </div>
  );
};
