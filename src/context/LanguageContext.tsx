import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface Translations {
  [key: string]: {
    en: string;
    zh: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', zh: '首页' },
  'nav.titbits': { en: 'Titbits', zh: '花絮' },
  'nav.mylist': { en: 'My List', zh: '我的' },
  'nav.profile': { en: 'Profile', zh: '个人中心' },
  'nav.discover': { en: 'Discover', zh: '发现' },

  // Profile
  'profile.wallet': { en: 'My Wallet', zh: '我的钱包' },
  'profile.orders': { en: 'My Orders', zh: '我的订单' },
  'profile.favorites': { en: 'My Favorites', zh: '我的收藏' },
  'profile.services': { en: 'Services', zh: '服务' },
  'profile.language': { en: 'Language', zh: '语言设置' },
  'profile.messages': { en: 'Messages', zh: '消息中心' },
  'profile.customerService': { en: 'Customer Service', zh: '客户服务' },
  'profile.account': { en: 'Account', zh: '账号设置' },
  'profile.privacy': { en: 'Privacy & Security', zh: '隐私与安全' },
  'profile.billing': { en: 'Billing Details', zh: '账单详情' },
  'profile.about': { en: 'About Us', zh: '关于我们' },
  'profile.logout': { en: 'Log Out', zh: '退出登录' },
  'profile.vip.title': { en: 'Become a VIP', zh: '成为VIP会员' },
  'profile.vip.desc': { en: 'Unlock 10,000+ episodes & exclusive interactive stories', zh: '解锁10,000+集精彩内容及独家互动故事' },
  'profile.vip.upgrade': { en: 'UPGRADE', zh: '立即升级' },

  // Settings
  'settings.title': { en: 'Settings', zh: '设置' },
  'settings.account': { en: 'Account', zh: '账号' },
  'settings.editProfile': { en: 'Edit Profile', zh: '编辑个人资料' },
  'settings.security': { en: 'Security & Privacy', zh: '安全与隐私' },
  'settings.language': { en: 'Language', zh: '语言' },
  'settings.preferences': { en: 'Preferences', zh: '偏好设置' },
  'settings.notifications': { en: 'Notifications', zh: '通知设置' },
  'settings.support': { en: 'Support', zh: '支持' },
  'settings.helpCenter': { en: 'Help Center', zh: '帮助中心' },
  'settings.clearCache': { en: 'Clear Cache', zh: '清除缓存' },
  'settings.version': { en: 'Version', zh: '版本' },

  // Feedback
  'feedback.title': { en: 'Feedback', zh: '意见反馈' },
  'feedback.placeholder': { en: 'Please describe your problem or suggestion...', zh: '请描述您的问题或建议...' },
  'feedback.contact': { en: 'Contact Information (Optional)', zh: '联系方式 (选填)' },
  'feedback.submit': { en: 'Submit Feedback', zh: '提交反馈' },
  'feedback.success': { en: 'Feedback submitted successfully!', zh: '反馈提交成功！' },

  // Home
  'home.discover': { en: 'Discover', zh: '发现' },
  'home.premium': { en: 'Premium', zh: '精品' },
  'home.dramas': { en: 'Dramas', zh: '短剧' },
  'home.editorsChoice': { en: "Editor's Choice", zh: '编辑精选' },
  'home.trending1': { en: 'Trending #1', zh: '热门榜单 #1' },
  'home.startWatching': { en: 'Start Watching', zh: '立即观看' },
  'home.curated': { en: 'Curated', zh: '精选' },
  'home.trendingNow': { en: 'Trending Now', zh: '正在流行' },
  'home.seeAll': { en: 'See All', zh: '查看全部' },
  'home.liveTrending': { en: 'Live Trending', zh: '实时热门' },
  'home.rating': { en: 'Rating', zh: '评分' },
  'home.resume': { en: 'Resume', zh: '继续观看' },
  'home.continueWatching': { en: 'Continue Watching', zh: '最近观看' },
  'home.episode': { en: 'Episode', zh: '第' },
  'home.left': { en: 'left', zh: '剩余' },

  // Titbits
  'titbits.exclusive': { en: 'Exclusive', zh: '独家内容' },
  'titbits.title': { en: 'Titbits & Behind Scenes', zh: '精彩花絮 & 幕后' },
  'titbits.spotlight': { en: 'Spotlight', zh: '焦点' },
  'titbits.interactive': { en: 'Interactive', zh: '互动体验' },
  'titbits.explore': { en: 'Explore', zh: '探索' },
  'titbits.exclusiveClip': { en: 'Exclusive Clip', zh: '独家片段' },
  'titbits.actorLife': { en: 'Actor Life', zh: '演员生活' },
  'titbits.dailyVlog': { en: 'Daily Vlog', zh: '日常Vlog' },
  'titbits.new': { en: 'New', zh: '上新' },

  // Video Player
  'player.speed': { en: 'Playback Speed', zh: '播放速度' },
  'player.settings': { en: 'Settings', zh: '设置' },
  'player.episodes': { en: 'Episodes', zh: '选集' },
  'player.share': { en: 'Share', zh: '分享' },
  'player.hot': { en: 'Hot', zh: '热门' },
  'player.intro': { en: 'Drama Introduction', zh: '剧集简介' },
  'player.director': { en: 'Director', zh: '导演' },
  'player.release': { en: 'Release', zh: '上映时间' },
  'player.gotIt': { en: 'Got it', zh: '知道了' },
  'player.quality': { en: 'Quality', zh: '清晰度' },
  'player.subtitle': { en: 'Subtitle', zh: '字幕' },
  'player.audio': { en: 'Audio', zh: '音轨' },
  'player.autoPlay': { en: 'Auto Play', zh: '自动播放' },
  'player.selectEpisode': { en: 'Select Episode', zh: '选择剧集' },
  'player.updatedTo': { en: 'Updated to', zh: '已更新至' },
  'player.unlockAll': { en: 'Unlock All Episodes', zh: '解锁全部剧集' },
  'player.joinVip': { en: 'Join VIP to watch premium content', zh: '加入VIP观看精品内容' },
  'player.joinNow': { en: 'Join Now', zh: '立即加入' },

  // Drama Detail
  'detail.notified': { en: 'Notified', zh: '已提醒' },
  'detail.synopsis': { en: 'Synopsis', zh: '剧情简介' },
  'detail.cast': { en: 'Cast & Crew', zh: '演职人员' },
  'detail.actor': { en: 'Actor', zh: '演员' },
  'detail.recommendations': { en: 'Recommendations', zh: '相关推荐' },
  'detail.continueWatching': { en: 'Continue Watching', zh: '继续观看' },

  'feedback.contactPlaceholder': { en: 'Email / Phone', zh: '邮箱 / 手机号' },

  // My List
  'mylist.title': { en: 'My List', zh: '我的列表' },
  'mylist.following': { en: 'Following', zh: '关注' },
  'mylist.history': { en: 'History', zh: '历史' },
  'mylist.notify': { en: 'Notify me', zh: '提醒我' },

  // Search
  'search.placeholder': { en: 'Search dramas, actors...', zh: '搜索剧集、演员...' },
  'search.popular': { en: 'Popular Searches', zh: '热门搜索' },
  'search.action': { en: 'Action', zh: '动作' },
  'search.romance': { en: 'Romance', zh: '浪漫' },
  'search.thriller': { en: 'Thriller', zh: '惊悚' },
  'search.comedy': { en: 'Comedy', zh: '喜剧' },
  'search.trending': { en: 'Trending', zh: '趋势' },

  // Subscribe
  'subscribe.title': { en: 'Subscribe', zh: '订阅' },
  'subscribe.redeem': { en: 'Redeem Code', zh: '兑换码' },
  'subscribe.watchMore': { en: 'Watch more episodes', zh: '观看更多剧集' },
  'subscribe.weekly': { en: 'Weekly Pass Pro', zh: '周卡专业版' },
  'subscribe.monthly': { en: 'Monthly Pass Pro', zh: '月卡专业版' },
  'subscribe.yearly': { en: 'Yearly Pass Pro', zh: '年卡专业版' },
  'subscribe.days': { en: 'days', zh: '天' },
  'subscribe.bonus': { en: 'bonus points', zh: '奖励积分' },
  'subscribe.unlockAll': { en: 'Unlock all series for', zh: '解锁全部系列，有效期' },
  'subscribe.unlockReceive': { en: 'Unlock and receive', zh: '解锁并获得' },
  'subscribe.privileges': { en: 'Privileges', zh: '特权' },
  'subscribe.unlimited': { en: 'Unlimited viewing', zh: '无限观看' },
  'subscribe.quality': { en: '1080p quality', zh: '1080p画质' },
  'subscribe.dailyReward': { en: 'Daily points reward', zh: '每日积分奖励' },
  'subscribe.adFree': { en: 'AD-free', zh: '无广告' },
  'subscribe.tips': { en: 'Tips', zh: '温馨提示' },
  'subscribe.vipPrivileges': { en: 'VIP Privileges', zh: 'VIP特权' },
  'subscribe.adFreeDesc': { en: 'Ad-free streaming — Watch without interruptions', zh: '无广告播放 — 观看无干扰' },
  'subscribe.earlyAccess': { en: 'Early access — New episodes 1 week before free users', zh: '抢先看 — 比普通用户提前1周观看新剧集' },
  'subscribe.exclusive': { en: 'Exclusive content — Members-only short films & behind-the-scenes', zh: '独家内容 — 仅限会员观看的短片和幕后花絮' },
  'subscribe.hdStreaming': { en: 'HD/4K streaming — Enhanced video quality', zh: '高清/4K播放 — 增强的视频质量' },
  'subscribe.offline': { en: 'Download offline — Save videos without WiFi', zh: '离线下载 — 无需WiFi即可保存视频' },
  'subscribe.now': { en: 'Subscribe now', zh: '立即订阅' },

  'general.seeAll': { en: 'See All', zh: '查看全部' },

  'category.all': { en: 'ALL', zh: '全部' },
  'category.drama': { en: 'Drama', zh: '剧情' },
  'category.comedy': { en: 'Comedy', zh: '喜剧' },
  'category.action': { en: 'Action', zh: '动作' },
  'category.romance': { en: 'Romance', zh: '言情' },

  // Drama Card
  'card.featured': { en: 'Featured', zh: '精选' },
  'card.trending': { en: 'Trending', zh: '趋势' },
  'card.views': { en: 'Views', zh: '播放量' },

  // General
  'general.back': { en: 'Back', zh: '返回' },
  'general.on': { en: 'On', zh: '开启' },
  'general.off': { en: 'Off', zh: '关闭' },
  'general.search': { en: 'Search', zh: '搜索' },
  'general.episodes': { en: 'Episodes', zh: '选集' },
  'general.share': { en: 'Share', zh: '分享' },
  'general.favorite': { en: 'Favorite', zh: '收藏' },
  'general.vip': { en: 'VIP', zh: '会员' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
