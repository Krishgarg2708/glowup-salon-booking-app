import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, Specialist } from '../types';
import { SPECIALISTS } from '../data';
import { 
  User, 
  Bell, 
  CreditCard, 
  Globe, 
  ShieldCheck, 
  Bookmark, 
  LogOut, 
  ChevronRight, 
  Heart,
  Star,
  Settings,
  Flame,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Send,
  X,
  Edit2,
  Camera,
  Check
} from 'lucide-react';

interface ProfileViewProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  savedSpecialists: string[];
  onSelectSpecialist: (specialist: Specialist) => void;
  onLogout: () => void;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    settingsTitle: "Account Settings",
    savedArtisans: "Saved Artisans",
    pushNotifications: "Push Notifications",
    notificationsDesc: "Enable appointment alerts & updates",
    linkedCards: "Linked Cards",
    cardsDesc: "Default Visa •••• 4821",
    languagePreference: "Language Preference",
    langName: "English (US)",
    securityTitle: "Security & Bio-metrics",
    securityDesc: "FaceID locked • Secure SSL",
    helpTitle: "Help & Support",
    vipMember: "VIP Glow Silver Member",
    appVersion: "Version: v2.14-Production Build",
    hubCenter: "Registered at GlowUp Beverly Hills Hub",
    logoutButton: "Log Out Account",
    noSaved: "No saved stylists. Bookmark them on their portfolios!",
    wasHelpful: "Was this helpful?",
    clickSupportBtn: "Start Support Chat",
    botRole: "Active Support Concierge",
    editProfileText: "Edit Profile Info"
  },
  es: {
    settingsTitle: "Configuraciones de Cuenta",
    savedArtisans: "Artistas Guardados",
    pushNotifications: "Notificaciones Push",
    notificationsDesc: "Habilitar alertas y actualizaciones",
    linkedCards: "Tarjetas Vinculadas",
    cardsDesc: "Predeterminada Visa •••• 4821",
    languagePreference: "Preferencia de Idioma",
    langName: "Español",
    securityTitle: "Seguridad y Biometría",
    securityDesc: "Bloqueo FaceID • SSL Seguro",
    helpTitle: "Ayuda y Soporte",
    vipMember: "Miembro de Plata VIP Glow",
    appVersion: "Versión: v2.14 Build de Producción",
    hubCenter: "Registrado en GlowUp Beverly Hills Hub",
    logoutButton: "Cerrar Sesión de Cuenta",
    noSaved: "Sin estilistas guardados. ¡Márcalos en sus portafolios!",
    wasHelpful: "¿Fue de ayuda?",
    clickSupportBtn: "Iniciar Chat de Soporte",
    botRole: "Servicio de Soporte Activo",
    editProfileText: "Editar Datos de Perfil"
  },
  fr: {
    settingsTitle: "Paramètres du Compte",
    savedArtisans: "Artisans Enregistrés",
    pushNotifications: "Notifications Push",
    notificationsDesc: "Activer les alertes de rendez-vous",
    linkedCards: "Cartes Associées",
    cardsDesc: "Par défaut Visa •••• 4821",
    languagePreference: "Préférence de Langue",
    langName: "Français",
    securityTitle: "Sécurité & Biométrie",
    securityDesc: "FaceID activé • SSL Sécurisé",
    helpTitle: "Aide & Support",
    vipMember: "Membre d'Argent VIP Glow",
    appVersion: "Version : v2.14 Build de Production",
    hubCenter: "Enregistré au GlowUp Beverly Hills Hub",
    logoutButton: "Se Déconnecter",
    noSaved: "Aucun styliste enregistré. Ajoutez-les depuis leur profil !",
    wasHelpful: "Cela a-t-il été utile ?",
    clickSupportBtn: "Lancer le Chat d'Assistance",
    botRole: "Assistant Support Actif",
    editProfileText: "Modifier le Profil"
  },
  de: {
    settingsTitle: "Kontoeinstellungen",
    savedArtisans: "Gespeicherte Künstler",
    pushNotifications: "Push-Benachrichtigungen",
    notificationsDesc: "Terminalarme & Updates aktivieren",
    linkedCards: "Verknüpfte Karten",
    cardsDesc: "Standard Visa •••• 4821",
    languagePreference: "Spracheinstellung",
    langName: "Deutsch",
    securityTitle: "Sicherheit & Biometrie",
    securityDesc: "FaceID-Sperre • Sicheres SSL",
    helpTitle: "Hilfe & Support",
    vipMember: "VIP Glow Silber-Mitglied",
    appVersion: "Version: v2.14 Produktions-Build",
    hubCenter: "Registriert im GlowUp Beverly Hills Hub",
    logoutButton: "Konto Abmelden",
    noSaved: "Keine gespeicherten Stylisten. Lesezeichen im Portfolio hinzufügen!",
    wasHelpful: "War das hilfreich?",
    clickSupportBtn: "Support-Chat Starten",
    botRole: "Aktiver Support-Kontext",
    editProfileText: "Profildaten Bearbeiten"
  },
  ja: {
    settingsTitle: "アカウント設定",
    savedArtisans: "保存されたアーティスト",
    pushNotifications: "プッシュ通知",
    notificationsDesc: "予約通知と更新の有効化",
    linkedCards: "登録済みのカード",
    cardsDesc: "デフォルト Visa •••• 4821",
    languagePreference: "言語設定",
    langName: "日本語",
    securityTitle: "セキュリティと生体認証",
    securityDesc: "FaceID有効 • セキュアSSL",
    helpTitle: "ヘルプとサポート",
    vipMember: "VIPグロウ・シルバーメンバー",
    appVersion: "バージョン: v2.14 プロダクションビルド",
    hubCenter: "GlowUp ビバリーヒルズ・ハブで登録済み",
    logoutButton: "アカウントからログアウト",
    noSaved: "お気に入り登録した担当者はいません。プロフィールから登録してください！",
    wasHelpful: "お役に立ちましたか？",
    clickSupportBtn: "サポートチャットを開始",
    botRole: "サポート・コンシェルジュ受付中",
    editProfileText: "プロフィール編集"
  }
};

export default function ProfileView({
  userProfile,
  setUserProfile,
  savedSpecialists,
  onSelectSpecialist,
  onLogout
}: ProfileViewProps) {
  const [toastMessage, setToastMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqFeedback, setFaqFeedback] = useState<Record<number, 'yes' | 'no'>>({});

  // EDIT PROFILE STATES
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempName, setTempName] = useState(userProfile.name);
  const [tempEmail, setTempEmail] = useState(userProfile.email);
  const [tempAvatar, setTempAvatar] = useState(userProfile.avatar);
  const [editError, setEditError] = useState('');

  // LANGUAGE PREFERENCE STATES
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // SIMULATED SUPPORT CHAT STATES
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ id: number; sender: 'user' | 'agent'; text: string; time: string }>>([
    {
      id: 1,
      sender: 'agent',
      text: 'Hi there! I am Ava, your personal style GlowUp virtual concierge. How can I assist you with your booking, Cancellation policy, or linked cards today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const avatarPresets = [
    { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200', label: 'Amara' },
    { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', label: 'Olivia' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', label: 'Julian' },
    { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', label: 'Chloe' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', label: 'Samantha' },
    { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', label: 'Marcus' }
  ];

  const languages = [
    { key: 'en', name: 'English (US)' },
    { key: 'es', name: 'Español (Spanish)' },
    { key: 'fr', name: 'Français (French)' },
    { key: 'de', name: 'Deutsch (German)' },
    { key: 'ja', name: '日本語 (Japanese)' }
  ];

  const currentLangKey = userProfile.language || 'en';
  const t = translations[currentLangKey] || translations.en;

  const handleHelpfulFeedback = (index: number, answer: 'yes' | 'no') => {
    setFaqFeedback(prev => ({ ...prev, [index]: answer }));
  };

  const triggerAgentReply = (userMsg: string) => {
    setIsAgentTyping(true);
    setTimeout(() => {
      let replyText = "I have noted that report! One of our support concierges will reach out to you directly by email if any actions are required.";
      const query = userMsg.toLowerCase();
      if (query.includes('cancel') || query.includes('policy') || query.includes('reschedule')) {
        replyText = "Our Cancellation Policy allows free cancellations or updates up to 24 hours in advance under your 'Bookings' tab. Cancellations under 24 hours incur a 50% reservation fee.";
      } else if (query.includes('payment') || query.includes('secure') || query.includes('card') || query.includes('ssl') || query.includes('credit')) {
        replyText = "All payments are highly secure! GlowUp routes through end-to-end industry-standard SSL encryption technology. We never store raw numbers on local servers.";
      } else if (query.includes('stylist') || query.includes('artist') || query.includes('where') || query.includes('guarantee')) {
        replyText = "Your assigned master artist is scheduled to arrive at your venue 10 minutes prior to reservation. If anything causes a delay beyond 15 minutes, you receive a full 20% discount coupon.";
      } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        replyText = "Hello! I am Ava, happy to assist! Ask me about cancellation codes, billing lock, or how to contact our priority hotline!";
      } else if (query.includes('offer') || query.includes('promo') || query.includes('discount')) {
        replyText = "GlowUp Silver Members get extra support discounts! Use 'GLOWSILVER10' at your summary card page for immediate 10% reductions.";
      }
      
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsAgentTyping(false);
    }, 1300);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || chatInput).trim();
    if (!text) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    if (!textToSend) {
      setChatInput('');
    }
    
    triggerAgentReply(text);
  };

  // Synchronize state when the user profile changes or modal opens
  const openEditModal = () => {
    setTempName(userProfile.name);
    setTempEmail(userProfile.email);
    setTempAvatar(userProfile.avatar);
    setEditError('');
    setIsEditModalOpen(true);
  };

  const saveProfileUpdates = () => {
    if (!tempName.trim()) {
      setEditError('Profile Name cannot be left blank');
      return;
    }
    if (!tempEmail.trim() || !tempEmail.includes('@')) {
      setEditError('Please enter a valid email address');
      return;
    }
    
    setUserProfile(prev => ({
      ...prev,
      name: tempName.trim(),
      email: tempEmail.trim(),
      avatar: tempAvatar
    }));
    
    setIsEditModalOpen(false);
    displayToast('Profile details updated successfully!');
  };

  const changeLanguagePreference = (langKey: string) => {
    setUserProfile(prev => ({
      ...prev,
      language: langKey
    }));
    setIsLanguageModalOpen(false);
    
    const langObj = languages.find(l => l.key === langKey);
    displayToast(`Language set to ${langObj?.name || langKey}!`);
  };

  const faqs = [
    {
      question: 'Cancellation Policy',
      answer: 'Appointments can be canceled or rescheduled up to 24 hours in advance at no charge. Less than 24 hours notice will incur a 50% fee of the scheduled service.'
    },
    {
      question: 'Payment Security',
      answer: 'All payments are securely processed and end-to-end encrypted with SSL standard. We do not store full credit card details on our servers.'
    },
    {
      question: 'Booking Guarantee',
      answer: 'We guarantee timely service. If a professional artist has to cancel or is delayed by more than 15 minutes, you will receive a 20% discount coupon.'
    },
    {
      question: 'How to Contact Support',
      answer: 'For any immediate on-site assistance, you can email support@glowup.com or call our VIP priority line directly at +1 (800) GLOW-HELP.'
    }
  ];

  const displayToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleToggleNotification = () => {
    const nextVal = !userProfile.notificationsEnabled;
    setUserProfile((prev) => ({
      ...prev,
      notificationsEnabled: nextVal
    }));
    displayToast(nextVal ? 'Push alerts enabled!' : 'Push alerts muted');
  };

  // Resolve true saved specialist structures from data.ts
  const favoriteStylists = SPECIALISTS.filter(s => savedSpecialists.includes(s.id));

  return (
    <div className="flex-1 bg-stone-50 flex flex-col h-full font-sans pb-8 relative">
      
      {/* TOAST NOTIFIER POPUP */}
      {toastMessage && (
        <div className="absolute top-4 left-6 right-6 p-3 bg-stone-900 border border-stone-850 text-white text-[11px] font-bold rounded-xl shadow-lg z-50 flex items-center gap-1.5 justify-center animate-bounce">
          <CheckCircle2 className="w-3.5 h-3.5 text-rose-450 fill-rose-500/20" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER HERO AREA */}
      <div className="bg-white px-6 pt-5 pb-6 border-b border-stone-150 flex flex-col items-center text-center">
        <div className="relative">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-20 h-20 rounded-full object-cover border border-stone-200 ring-4 ring-rose-50"
          />
          <button
            id="trigger-edit-avatar-btn"
            type="button"
            onClick={openEditModal}
            className="absolute -bottom-1 -right-1 w-6.5 h-6.5 bg-stone-900 text-white hover:bg-rose-600 rounded-full flex items-center justify-center border-2 border-white shadow-md active:scale-95 transition-colors cursor-pointer"
            title="Edit Profile"
          >
            <Camera className="w-3 h-3 text-white" />
          </button>
        </div>

        <h3 className="text-base font-black text-stone-950 mt-3 leading-tight">{userProfile.name}</h3>
        <p className="text-[10px] text-stone-400 font-mono tracking-wider font-semibold uppercase mt-0.5">{userProfile.email}</p>
        
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <span className="text-[10px] bg-rose-50 text-rose-600 px-3 py-1 rounded-full font-bold">
            {t.vipMember}
          </span>
          <button
            id="header-edit-profile-btn"
            onClick={openEditModal}
            className="px-3 py-1 bg-stone-100 hover:bg-stone-150 text-stone-700 text-[10px] font-bold rounded-lg transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="w-2.5 h-2.5" />
            <span>{t.editProfileText}</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto no-scrollbar flex-1">
        
        {/* SAVED FAVORITE SPECIALISTS ROW */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-extrabold text-stone-400 tracking-wider">{t.savedArtisans}</h4>
          
          {favoriteStylists.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1 shrink-0">
              {favoriteStylists.map(stylist => (
                <div
                  key={stylist.id}
                  id={`fav-stylist-card-${stylist.id}`}
                  onClick={() => onSelectSpecialist(stylist)}
                  className="bg-white border border-stone-200/60 p-2.5 rounded-2xl flex items-center gap-2.5 shrink-0 hover:border-rose-250 cursor-pointer active:scale-[0.98]"
                >
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-[11px] font-bold text-stone-900 leading-tight">{stylist.name}</h5>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-400" />
                      <span className="text-[9px] text-stone-500 font-bold">{stylist.rating}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3 h-3 text-stone-300 ml-1.5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-white border border-stone-150 rounded-2xl text-center">
              <p className="text-[11px] text-stone-405">
                {t.noSaved}
              </p>
            </div>
          )}
        </div>

        {/* ACCOUNT PREFERENCES LIST CARDS */}
        <div className="bg-white border border-stone-200/60 rounded-3xl p-4 space-y-3.5">
          <h4 className="text-[11px] uppercase font-black text-stone-400 tracking-wider">{t.settingsTitle}</h4>
          
          {/* Push notification toggle row */}
          <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
                <Bell className="w-4 h-4 text-rose-500" />
              </span>
              <div>
                <span className="text-xs font-bold text-stone-900 leading-tight block">{t.pushNotifications}</span>
                <span className="text-[9px] text-stone-400 leading-none">{t.notificationsDesc}</span>
              </div>
            </div>

            {/* Custom styled sliding checkbox input */}
            <button
              id="notifications-toggle-btn"
              type="button"
              onClick={handleToggleNotification}
              className={`w-11 h-6 rounded-full p-1 transition-all flex items-center ${
                userProfile.notificationsEnabled ? 'bg-rose-500 justify-end' : 'bg-stone-200 justify-start'
              }`}
            >
              <span className="w-4 h-4 bg-white rounded-full shadow-sm" />
            </button>
          </div>

          {/* Payment Methods Info row */}
          <div className="flex items-center justify-between py-1.5 border-t border-stone-100">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-stone-655" />
              </span>
              <div>
                <span className="text-xs font-bold text-stone-900 leading-tight block">{t.linkedCards}</span>
                <span className="text-[9px] text-stone-400 leading-none">
                  Default ({userProfile.paymentMethods.find(p => p.isDefault)?.type.toUpperCase()} •••• {userProfile.paymentMethods.find(p => p.isDefault)?.last4})
                </span>
              </div>
            </div>
            <button 
              id="view-cards-btn"
              onClick={() => displayToast('Card registration locked')}
              className="p-1 text-stone-400 hover:text-stone-950"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Language Preference row */}
          <div className="flex items-center justify-between py-1.5 border-t border-stone-100">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center">
                <Globe className="w-4 h-4 text-stone-655" />
              </span>
              <div>
                <span className="text-xs font-bold text-stone-900 leading-tight block">{t.languagePreference}</span>
                <span className="text-[9px] text-rose-500 font-bold">{languages.find(l => l.key === currentLangKey)?.name}</span>
              </div>
            </div>
            <button 
              id="language-btn"
              onClick={() => setIsLanguageModalOpen(true)}
              className="p-1.5 text-stone-400 hover:text-stone-950 hover:bg-stone-50 rounded-lg transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Safety Settings row */}
          <div className="flex items-center justify-between py-1.5 border-t border-stone-100">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-stone-655" />
              </span>
              <div>
                <span className="text-xs font-bold text-stone-900 leading-tight block">{t.securityTitle}</span>
                <span className="text-[9px] text-stone-400 leading-none">{t.securityDesc}</span>
              </div>
            </div>
            <button 
              id="security-btn"
              onClick={() => displayToast('Bio-metrics verified')}
              className="p-1 text-stone-400 hover:text-stone-950"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* HELP & SUPPORT ACCORDION & CHAT */}
        <div id="help-support-section" className="bg-white border border-stone-200/60 rounded-3xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-rose-500" />
              </span>
              <h4 className="text-xs uppercase font-extrabold text-stone-900 tracking-wider">{t.helpTitle}</h4>
            </div>
            
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-stone-405 font-bold">Support Ava Online</span>
            </span>
          </div>

          <div className="space-y-2.5 pt-1.5 border-t border-stone-100">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  id={`faq-item-${index}`}
                  className="border-b border-stone-100 last:border-b-0 pb-2.5 last:pb-0"
                >
                  <button
                    id={`faq-toggle-btn-${index}`}
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left py-1 hover:text-rose-500 transition-colors cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-stone-900 group-hover:text-rose-500 transition-colors">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ 
                        rotate: isOpen ? 180 : 0,
                        color: isOpen ? '#f43f5e' : '#a8a29e'
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="flex items-center justify-center"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.div>
                  </button>
                  <motion.div 
                    id={`faq-content-${index}`}
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0
                    }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100/40 space-y-2">
                        <p className="text-[11px] text-stone-500 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                        
                        <div 
                          id={`faq-feedback-${index}`}
                          className="flex items-center justify-between pt-2 border-t border-stone-200/40 text-[10px]"
                        >
                          {faqFeedback[index] ? (
                            <motion.div 
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-emerald-600 font-semibold flex items-center gap-1.5 py-0.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Thank you for your feedback!</span>
                            </motion.div>
                          ) : (
                            <>
                              <span className="text-stone-400 font-medium">{t.wasHelpful}</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  id={`faq-helpful-[yes]-${index}`}
                                  type="button"
                                  onClick={() => handleHelpfulFeedback(index, 'yes')}
                                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-stone-150 text-stone-600 transition-all cursor-pointer group/btn active:scale-95 text-[10px] font-medium"
                                >
                                  <ThumbsUp className="w-3 h-3 text-stone-400 group-hover/btn:text-rose-500 transition-colors" />
                                  <span>Yes</span>
                                </button>
                                <button
                                  id={`faq-helpful-[no]-${index}`}
                                  type="button"
                                  onClick={() => handleHelpfulFeedback(index, 'no')}
                                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-stone-150 text-stone-600 transition-all cursor-pointer group/btn active:scale-95 text-[10px] font-medium"
                                >
                                  <ThumbsDown className="w-3 h-3 text-stone-400 group-hover/btn:text-stone-650 transition-colors" />
                                  <span>No</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* CHAT FAB CONCIERGE TRIGGER IN HELP & SUPPORT */}
          <div className="pt-2 flex flex-col justify-center items-center">
            <button
              id="start-support-chat-fab-btn"
              type="button"
              onClick={() => setIsChatWindowOpen(true)}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-650 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-white fill-white/20" />
              <span>{t.clickSupportBtn}</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
            </button>
          </div>
        </div>

        {/* LOG OUT BUTTON CONTAINER */}
        <div className="pt-2">
          <button
            id="logout-button"
            onClick={onLogout}
            className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-650 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 text-red-600 transition-all border border-red-100 cursor-pointer active:scale-[0.99]"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logoutButton}</span>
          </button>
        </div>

        {/* App Version Meta */}
        <div className="text-center font-mono text-[9px] text-stone-400 pt-4 leading-normal">
          <p>{t.appVersion}</p>
          <p>{t.hubCenter}</p>
        </div>

      </div>

      {/* LANGUAGE SELECTION DIALOG MODAL */}
      <AnimatePresence>
        {isLanguageModalOpen && (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-rose-500 animate-spin-slow" />
                  <h3 className="text-xs font-black text-stone-900 uppercase tracking-widest">{t.languagePreference}</h3>
                </div>
                <button
                  id="close-lang-modal-btn"
                  onClick={() => setIsLanguageModalOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-100 text-stone-450 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5 pt-1">
                {languages.map(lang => {
                  const isChecked = lang.key === currentLangKey;
                  return (
                    <button
                      key={lang.key}
                      id={`lang-opt-${lang.key}`}
                      type="button"
                      onClick={() => changeLanguagePreference(lang.key)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                        isChecked 
                          ? 'border-rose-500 bg-rose-50/40 text-rose-600'
                          : 'border-stone-150 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span>{lang.name}</span>
                      {isChecked && <Check className="w-4 h-4 text-rose-500 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT PROFILE DIALOG MODAL */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-stone-900/65 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 my-auto relative shrink-0"
            >
              <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-rose-500" />
                  <h3 className="text-xs font-black text-stone-900 uppercase tracking-widest">{t.editProfileText}</h3>
                </div>
                <button
                  id="close-edit-modal-btn"
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-100 text-stone-450 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {editError && (
                <div className="p-2 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold rounded-lg text-center">
                  {editError}
                </div>
              )}

              {/* AVATAR SELECTOR LIST */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block">
                  Select Profile Avatar
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {avatarPresets.map((avatar, idx) => {
                    const isSelected = tempAvatar === avatar.url;
                    return (
                      <button
                        key={idx}
                        id={`avatar-preset-btn-${idx}`}
                        type="button"
                        onClick={() => setTempAvatar(avatar.url)}
                        className={`relative rounded-full aspect-square overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                          isSelected ? 'border-rose-500 ring-4 ring-rose-50 scale-105' : 'border-stone-150 hover:border-stone-300'
                        }`}
                      >
                        <img 
                          src={avatar.url} 
                          alt={avatar.label} 
                          className="w-full h-full rounded-full object-cover" 
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white font-bold stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {/* Custom Avatar URL Field */}
                <div className="mt-2 text-left">
                  <label className="text-[9px] font-extrabold text-stone-400 block mb-1">
                    Or Enter Custom Avatar Image URL:
                  </label>
                  <input
                    type="text"
                    id="custom-avatar-url-input"
                    value={tempAvatar}
                    onChange={(e) => setTempAvatar(e.target.value)}
                    placeholder="https://images.unsplash..."
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>
              </div>

              {/* TEXT FIELD INPUTS */}
              <div className="space-y-3.5 pt-1.5">
                <div className="text-left">
                  <label className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="edit-name-input"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="edit-email-input"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>
              </div>

              {/* SAVE TRIGGER BUTTON */}
              <div className="pt-2 flex gap-3">
                <button
                  id="cancel-edit-btn"
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-xl text-xs font-bold transition-all active:scale-[0.98] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="save-edit-btn"
                  type="button"
                  onClick={saveProfileUpdates}
                  className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all active:scale-[0.98] cursor-pointer"
                >
                  Save Updates
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SIMULATED SUPPORT CHAT WINDOW */}
      <AnimatePresence>
        {isChatWindowOpen && (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 200 }}
              className="bg-white w-full max-w-md h-[85vh] sm:h-[580px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* CHAT HEADER */}
              <div className="px-5 py-3.5 bg-stone-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100"
                      alt="Ava"
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-stone-900" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold leading-none flex items-center gap-1.5">
                      <span>Ava (Support AI Assistant)</span>
                    </h4>
                    <span className="text-[8px] text-emerald-400 font-mono font-semibold uppercase tracking-wider">{t.botRole || "Support Agent Online"}</span>
                  </div>
                </div>

                <button
                  id="close-chat-btn"
                  onClick={() => setIsChatWindowOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* MESSAGES SCROLL */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50 overflow-x-hidden text-left">
                {chatMessages.map((msg) => {
                  const isAgent = msg.sender === 'agent';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isAgent ? 'justify-start' : 'justify-end'} animate-fade-in`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-3 border ${
                        isAgent
                          ? 'bg-white border-stone-200/50 text-stone-800 rounded-tl-none'
                          : 'bg-rose-500 border-rose-600 text-white rounded-tr-none'
                      }`}>
                        <p className="text-xs font-normal leading-relaxed whitespace-pre-line">{msg.text}</p>
                        <span className={`text-[8px] mt-1 block text-right font-semibold ${
                          isAgent ? 'text-stone-400' : 'text-rose-200'
                        }`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* TYPING STATUS */}
                {isAgentTyping && (
                  <div className="flex justify-start items-center gap-2">
                    <div className="bg-white border border-stone-150 text-stone-850 rounded-2xl rounded-tl-none p-3 max-w-[85%]">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SUGGESTION QUICK CHIPS */}
              <div className="p-2 border-t border-stone-100 bg-white flex gap-1.5 overflow-x-auto no-scrollbar py-2">
                <button
                  id="chat-chip-1"
                  type="button"
                  onClick={() => handleSendMessage("Tell me about payment security")}
                  className="px-2.5 py-1.5 rounded-xl border border-stone-200/80 bg-stone-50 hover:bg-stone-100/50 text-stone-700 text-[10px] font-semibold flex-shrink-0 transition-all active:scale-95 cursor-pointer"
                >
                  💳 Payment Security
                </button>
                <button
                  id="chat-chip-2"
                  type="button"
                  onClick={() => handleSendMessage("Can I cancel my slot free?")}
                  className="px-2.5 py-1.5 rounded-xl border border-stone-200/80 bg-stone-50 hover:bg-stone-100/50 text-stone-700 text-[10px] font-semibold flex-shrink-0 transition-all active:scale-95 cursor-pointer"
                >
                  ❌ Cancellation Rules
                </button>
                <button
                  id="chat-chip-3"
                  type="button"
                  onClick={() => handleSendMessage("Where is my scheduled stylist?")}
                  className="px-2.5 py-1.5 rounded-xl border border-stone-200/80 bg-stone-50 hover:bg-stone-100/50 text-stone-700 text-[10px] font-semibold flex-shrink-0 transition-all active:scale-95 cursor-pointer"
                >
                  📅 Stylist Guarantee
                </button>
                <button
                  id="chat-chip-4"
                  type="button"
                  onClick={() => handleSendMessage("List member discounts")}
                  className="px-2.5 py-1.5 rounded-xl border border-stone-200/80 bg-stone-50 hover:bg-stone-100/50 text-stone-700 text-[10px] font-semibold flex-shrink-0 transition-all active:scale-95 cursor-pointer"
                >
                  🎁 VIP Discounts
                </button>
              </div>

              {/* INPUT MESSAGE CHAT BAR */}
              <div className="p-3 bg-white border-t border-stone-100 flex items-center gap-2">
                <input
                  type="text"
                  id="chat-message-input"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="Type message..."
                  className="flex-1 px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                />
                <button
                  id="send-message-btn"
                  onClick={() => handleSendMessage()}
                  disabled={!chatInput.trim()}
                  className="p-2 bg-rose-500 hover:bg-rose-600 disabled:bg-stone-250 text-white rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center font-bold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
