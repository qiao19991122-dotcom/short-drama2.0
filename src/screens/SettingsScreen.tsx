import React from 'react';
import { ArrowLeft, ChevronRight, User, Bell, Shield, HelpCircle, LogOut, Globe, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const settingsGroups = [
    {
      title: t('settings.account'),
      items: [
        { icon: <User size={20} />, label: t('settings.editProfile'), value: 'John Doe' },
        { icon: <Shield size={20} />, label: t('settings.security'), value: '' },
        { 
          icon: <Globe size={20} />, 
          label: t('settings.language'), 
          value: language === 'en' ? 'English' : '中文',
          onClick: toggleLanguage
        },
      ]
    },
    {
      title: t('settings.preferences'),
      items: [
        { icon: <Bell size={20} />, label: t('settings.notifications'), value: t('general.on') },
      ]
    },
    {
      title: t('settings.support'),
      items: [
        { icon: <HelpCircle size={20} />, label: t('settings.helpCenter'), value: '' },
        { icon: <Trash2 size={20} />, label: t('settings.clearCache'), value: '1.2 GB' },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col"
    >
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="text-white/60 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white font-display italic text-2xl">{t('settings.title')}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <h3 className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold mb-4">{group.title}</h3>
            <div className="space-y-2">
              {group.items.map((item, iIdx) => (
                <button 
                  key={iIdx}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-white/40 group-hover:text-purple-500 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-white text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-white/30 text-xs">{item.value}</span>}
                    <ChevronRight size={16} className="text-white/20" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm hover:bg-red-500/20 transition-all mt-10">
          <LogOut size={20} />
          {t('profile.logout')}
        </button>

        <div className="text-center pb-10">
          <p className="text-white/10 text-[10px] uppercase tracking-widest">{t('settings.version')} 2.4.0 (Build 1025)</p>
        </div>
      </div>
    </motion.div>
  );
};
