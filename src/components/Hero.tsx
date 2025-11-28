
import { Button } from "@/components/ui/button";
import { ArrowDown, Waves, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Get the base path for proper asset loading
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return base + 'assets/' + path;
};

// Haptic Feedback helper
const haptic = (style: 'light' | 'medium' | 'heavy' = 'light') => {
  try {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred(style);
    }
  } catch (e) {}
};

export const Hero = () => {
  const [isTelegram, setIsTelegram] = useState(false);
  
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initData) {
      setIsTelegram(true);
    }
  }, []);
  
  return (
    // В Telegram - компактный 40vh, в браузере - больше
    <section className={`relative ${isTelegram ? 'h-[40vh]' : 'h-[55vh] md:h-[60vh]'} flex items-center justify-center overflow-hidden`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Main Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('${getAssetPath("phi-phi-lagoon.jpg")}')`
          }}
        />
        
        {/* iOS 26 Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Subtle blue tint for iOS feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20"></div>
      </div>
      
      {/* Floating Liquid Glass Card - Main Content */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center h-full">
        
        {/* Hero Card - iOS 26 Liquid Glass - Компактнее в Telegram */}
        <div 
          className={`text-center ${isTelegram ? 'px-6 py-6' : 'px-8 py-10'} rounded-[32px] max-w-md mx-auto animate-fade-in`}
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Badge - скрываем в Telegram для экономии места */}
          {!isTelegram && (
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
              style={{
                background: 'rgba(0, 122, 255, 0.25)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 122, 255, 0.3)'
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span 
                className="text-[11px] font-semibold text-white/90"
                style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
              >
                Лучшие туры Пхукета
              </span>
            </div>
          )}
          
          {/* Title - Компактнее в Telegram */}
          <h1 
            className={`${isTelegram ? 'text-4xl mb-2' : 'text-5xl md:text-6xl mb-3'} font-black tracking-tight`}
            style={{ 
              fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif",
              background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 24px rgba(0,0,0,0.3)'
            }}
          >
            ПХУКЕТ
          </h1>
          
          {/* Subtitle - Компактнее в Telegram */}
          <p 
            className={`text-white/80 ${isTelegram ? 'text-sm mb-4' : 'text-base md:text-lg mb-6'} font-medium`}
            style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
          >
            Тропический рай ждёт вас
          </p>
          
          {/* CTA Button - iOS 26 Style с haptic feedback */}
          <Button 
            size="lg" 
            asChild 
            onClick={() => haptic('medium')} 
            className={`w-full bg-[#007AFF] hover:bg-[#0051D5] text-white ${isTelegram ? 'px-6 py-4 text-base' : 'px-8 py-6 text-lg'} font-semibold rounded-2xl transition-all duration-300 border-none transform hover:scale-[1.02] active:scale-[0.98]`}
            style={{ 
              fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif",
              boxShadow: '0 4px 20px rgba(0, 122, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <Link to="/tours" className="flex items-center justify-center gap-2">
              <span>Выбрать тур</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
        
        {/* Scroll indicator - плавная анимация, по центру */}
        {!isTelegram && (
          <div 
            className="absolute bottom-8 left-0 right-0 flex justify-center"
            style={{ animation: 'float-smooth 2s ease-in-out infinite' }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
              }}
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' })}
            >
              <ArrowDown className="w-5 h-5 text-white" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
