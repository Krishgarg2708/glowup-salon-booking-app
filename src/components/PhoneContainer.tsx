import React from 'react';
import { AppScreen, NavigationTab } from '../types';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Smartphone, 
  Compass, 
  Home as HomeIcon, 
  Calendar, 
  User,
  RotateCcw
} from 'lucide-react';

interface PhoneContainerProps {
  children: React.ReactNode;
  activeScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  activeTab: NavigationTab;
  setTab: (tab: NavigationTab) => void;
  onReset: () => void;
}

export default function PhoneContainer({
  children,
  activeScreen,
  setScreen,
  activeTab,
  setTab,
  onReset,
}: PhoneContainerProps) {
  // Navigation helper reflecting screen routing based on bottom tabs
  const handleTabClick = (tab: NavigationTab) => {
    setTab(tab);
    if (tab === 'home') {
      setScreen('home');
    } else if (tab === 'explore') {
      setScreen('home'); // Home handles search/categories or explore trigger
    } else if (tab === 'bookings') {
      setScreen('history');
    } else if (tab === 'profile') {
      setScreen('profile');
    }
  };

  const screensInfoList: { id: AppScreen; label: string }[] = [
    { id: 'splash', label: '1. Splash' },
    { id: 'onboarding', label: '2. Onboarding' },
    { id: 'login', label: '3. Authentication' },
    { id: 'home', label: '4. Home Dashboard' },
    { id: 'booking_flow', label: '5. Date & Time Selection' },
    { id: 'summary', label: '6. Summary & Promo' },
    { id: 'confirmation', label: '7. Confirmation Success' },
    { id: 'history', label: '8. Booking History' },
    { id: 'profile', label: '9. User Profile' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-8">
      
      {/* LEFT PANEL: Professional Walkthrough & Screen-Jump Selector for Testing */}
      <div className="w-full md:w-80 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-stone-500 font-semibold">GlowUp Salon</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-950 mb-2">Interactive Showcase</h1>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            Experience the design prototype. You can navigate the booking flow organically, or use the shortcuts below to evaluate specific screens immediately.
          </p>

          <div className="space-y-1.5">
            <h2 className="text-xs uppercase font-bold text-stone-400 tracking-wider mb-2">Jump to Screen</h2>
            {screensInfoList.map((sc) => {
              const isSelected = activeScreen === sc.id || 
                (sc.id === 'home' && (activeScreen === 'service_detail' || activeScreen === 'specialist_detail'));
              return (
                <button
                  key={sc.id}
                  id={`jump-btn-${sc.id}`}
                  onClick={() => {
                    setScreen(sc.id);
                    if (sc.id === 'home') setTab('home');
                    if (sc.id === 'history') setTab('bookings');
                    if (sc.id === 'profile') setTab('profile');
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-between ${
                    isSelected 
                      ? 'bg-stone-950 text-white shadow-sm' 
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{sc.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-rose-300"></span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-stone-100">
          <button
            id="reset-simulation-btn"
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 hover:text-stone-950 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Prototype Flow
          </button>
          <div className="mt-3 text-[10px] text-stone-400 font-mono text-center">
            Designed for iPhone 14 / Safely stored
          </div>
        </div>
      </div>

      {/* CENTER: Simulated iPhone 14 Frame */}
      <div className="relative">
        {/* Subtle accent shadow rings underneath */}
        <div className="absolute -inset-1.5 bg-gradient-to-tr from-stone-200 to-rose-100 rounded-[56px] blur-xl opacity-30 pointer-events-none" />
        
        {/* Outer Phone Frame */}
        <div className="relative w-[375px] h-[780px] bg-stone-950 rounded-[48px] p-2.5 shadow-2xl border-[3px] border-stone-800 flex flex-col justify-between overflow-hidden">
          
          {/* Dynamic Inner Shell */}
          <div className="relative w-full h-full bg-stone-50 rounded-[38px] overflow-hidden flex flex-col select-none border border-stone-900/10">
            
            {/* STATUS BAR */}
            <div className="h-10 px-6 pt-2 flex items-center justify-between z-40 bg-transparent text-stone-950 relative">
              <span className="text-[12px] font-bold tracking-tight font-mono">12:03</span>
              
              {/* Dynamic Island / Camera pill */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-5.5 bg-black rounded-full z-50 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-900/40 border border-stone-805/10 ml-auto mr-1.5" />
              </div>

              <div className="flex items-center gap-1.5">
                <Signal className="w-3.5 h-3.5" strokeWidth={2.5} />
                <Wifi className="w-3.5 h-3.5" strokeWidth={2.5} />
                <Battery className="w-4 h-4" strokeWidth={2} />
              </div>
            </div>

            {/* MAIN CONTAINER FOR RENDERING ACTIVE VIEW */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
              {children}
            </div>

            {/* OPTIONAL BOTTOM NAVIGATION BAR FOR SECURE SYSTEMS (Home, Bookings, Explore, Profile) */}
            {activeScreen !== 'splash' && activeScreen !== 'onboarding' && activeScreen !== 'login' && (
              <div className="bg-white border-t border-stone-100 px-6 py-2 pb-5 flex items-center justify-between z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                <button
                  id="nav-tab-home"
                  onClick={() => handleTabClick('home')}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'home' ? 'text-rose-500' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <HomeIcon className="w-5 h-5" strokeWidth={activeTab === 'home' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold tracking-tight">Home</span>
                </button>

                <button
                  id="nav-tab-explore"
                  onClick={() => handleTabClick('explore')}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'explore' ? 'text-rose-500' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <Compass className="w-5 h-5" strokeWidth={activeTab === 'explore' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold tracking-tight">Explore</span>
                </button>

                <button
                  id="nav-tab-bookings"
                  onClick={() => handleTabClick('bookings')}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'bookings' ? 'text-rose-500' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <Calendar className="w-5 h-5" strokeWidth={activeTab === 'bookings' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold tracking-tight">Bookings</span>
                </button>

                <button
                  id="nav-tab-profile"
                  onClick={() => handleTabClick('profile')}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'profile' ? 'text-rose-500' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <User className="w-5 h-5" strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold tracking-tight">Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
