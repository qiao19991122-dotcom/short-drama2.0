import React from 'react';
import { ChevronLeft, Gift } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SubscribeScreenProps {
  onBack: () => void;
}

export const SubscribeScreen: React.FC<SubscribeScreenProps> = ({ onBack }) => {
  const { t } = useLanguage();
  
  const plans = [
    { id: 'weekly', title: t('subscribe.weekly'), duration: `7 ${t('subscribe.days')}`, price: '$39', oldPrice: '$49', discount: '-20%', bonus: `300 ${t('subscribe.bonus')}`, active: true },
    { id: 'monthly', title: t('subscribe.monthly'), duration: `30 ${t('subscribe.days')}`, price: '$99', oldPrice: '', discount: '', bonus: `300 ${t('subscribe.bonus')}` },
    { id: 'yearly', title: t('subscribe.yearly'), duration: `365 ${t('subscribe.days')}`, price: '$99', oldPrice: '', discount: '', bonus: `300 ${t('subscribe.bonus')}` },
  ];

  const privileges = [
    { icon: '▶', label: t('subscribe.unlimited') },
    { icon: 'FHD', label: t('subscribe.quality') },
    { icon: '●', label: t('subscribe.dailyReward') },
    { icon: '▤', label: t('subscribe.adFree') },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-black overflow-y-auto no-scrollbar pb-24">
      <div className="px-4 pt-12 flex justify-between items-center">
        <button onClick={onBack} className="text-white">
          <ChevronLeft size={28} />
        </button>
        <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
          <Gift size={18} />
          <span>{t('subscribe.redeem')}</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h1 className="text-white text-4xl font-black italic tracking-tight">{t('subscribe.title')}</h1>
        <div className="flex items-center justify-center gap-4 mt-4 text-white/40 text-xs uppercase tracking-widest">
          <div className="w-8 h-px bg-white/20" />
          <span>{t('subscribe.watchMore')}</span>
          <div className="w-8 h-px bg-white/20" />
        </div>
      </div>

      <div className="mt-10 px-4 space-y-4">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`rounded-3xl p-6 relative overflow-hidden ${
              plan.active 
                ? 'bg-gradient-to-br from-purple-600 to-blue-600 border-2 border-white/20' 
                : 'bg-white/5 border border-white/10'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white text-xl font-bold">{plan.title}</h3>
                <p className="text-white/70 text-sm mt-1">{t('subscribe.unlockAll')} {plan.duration}</p>
                <p className="text-white/50 text-xs mt-4 italic">{t('subscribe.unlockReceive')} {plan.bonus}</p>
              </div>
              <div className="text-right">
                {plan.discount && (
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{plan.discount}</span>
                    <span className="text-white/40 text-xs line-through">{plan.oldPrice}</span>
                  </div>
                )}
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-red-500 text-3xl font-black">{plan.price}</span>
                  <span className="text-white/40 text-xs">/{plan.duration.split(' ')[0]}{t('subscribe.days')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 px-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-yellow-500 text-xl">👑</span>
          <h3 className="text-white font-bold">4 {t('subscribe.privileges')}</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {privileges.map((p, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                {p.icon}
              </div>
              <span className="text-white/80 text-xs font-medium">{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 px-6">
        <h3 className="text-white font-bold mb-4">{t('subscribe.tips')}</h3>
        <div className="bg-white/5 rounded-2xl p-6 text-white/60 text-xs leading-relaxed space-y-2">
          <p>{t('subscribe.vipPrivileges')}</p>
          <p>• {t('subscribe.adFreeDesc')}</p>
          <p>• {t('subscribe.earlyAccess')}</p>
          <p>• {t('subscribe.exclusive')}</p>
          <p>• {t('subscribe.hdStreaming')}</p>
          <p>• {t('subscribe.offline')}</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-purple-500/20">
          {t('subscribe.now')}
        </button>
      </div>
    </div>
  );
};
