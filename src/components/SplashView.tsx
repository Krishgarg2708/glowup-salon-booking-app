import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface SplashViewProps {
  onComplete: () => void;
}

export default function SplashView({ onComplete }: SplashViewProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex-1 bg-stone-950 text-white flex flex-col items-center justify-between p-8 relative overflow-hidden h-full">
      {/* Visual Ambient Light glow effect */}
      <div className="absolute top-1/4 -left-12 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Logo Icon with micro-bezel styling */}
        <div className="w-18 h-18 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative backdrop-blur-sm animate-pulse">
          <Sparkles className="w-8 h-8 text-rose-300" />
        </div>

        {/* Brand typography */}
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          GlowUp
        </h1>
        <p className="text-xs uppercase tracking-widest text-stone-400 font-medium">
          Couture Salon & Spa
        </p>
      </div>

      {/* Loading bar State */}
      <div className="w-full max-w-[140px] flex flex-col items-center gap-3 pb-8">
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-rose-400 rounded-full animate-[loading_2.5s_ease-in-out_infinite]" />
        </div>
        <span className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">
          Refining Elegance
        </span>
      </div>

      {/* Adding a dynamic CSS style injected block specifically for loading animation keyframes */}
      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(0%); }
          50% { width: 50%; }
          100% { width: 100%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
