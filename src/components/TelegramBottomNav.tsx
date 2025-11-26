// 📱 Telegram Mini App Bottom Navigation
// iOS 26 Liquid Glass style - показывается только в Telegram

import { Home, Ship, Phone, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export const TelegramBottomNav = () => {
  const location = useLocation();
  const [isTelegram, setIsTelegram] = useState(false);
  
  useEffect(() => {
    // Проверяем, открыто ли в Telegram
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initData) {
      setIsTelegram(true);
      console.log('📱 Telegram Mini App detected - showing bottom nav');
    }
  }, []);
  
  // Не показываем в обычном браузере
  if (!isTelegram) return null;
  
  const navItems: NavItem[] = [
    {
      icon: <Home className="w-6 h-6" />,
      label: "Главная",
      path: "/"
    },
    {
      icon: <Ship className="w-6 h-6" />,
      label: "Туры",
      path: "/tours"
    },
    {
      icon: <Star className="w-6 h-6" />,
      label: "Топ",
      path: "/#popular"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Контакты",
      path: "/contact"
    }
  ];
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path.replace("/#", ""));
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
      style={{
        // iOS 26 Liquid Glass effect
        background: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '0.5px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 -1px 20px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 py-2 transition-all duration-200"
              style={{
                color: active ? '#007AFF' : '#8E8E93',
                transform: active ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div 
                className="relative"
                style={{
                  filter: active ? 'drop-shadow(0 0 8px rgba(0, 122, 255, 0.4))' : 'none'
                }}
              >
                {item.icon}
                {active && (
                  <div 
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#007AFF' }}
                  />
                )}
              </div>
              <span 
                className="text-[10px] mt-1 font-medium"
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
