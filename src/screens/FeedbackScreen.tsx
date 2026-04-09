import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface FeedbackScreenProps {
  onBack: () => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [feedback, setFeedback] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 z-[250] bg-[#050505] flex flex-col"
    >
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="text-white/60 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white font-display italic text-2xl">{t('feedback.title')}</h2>
      </div>

      <div className="flex-1 p-6">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-2">
                  {t('feedback.title')}
                </label>
                <textarea
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={t('feedback.placeholder')}
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-3xl p-5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-2">
                  {t('feedback.contact')}
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t('feedback.contactPlaceholder')}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!feedback.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black py-5 rounded-3xl flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                <Send size={20} />
                {t('feedback.submit')}
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-white text-xl font-black">{t('feedback.success')}</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
