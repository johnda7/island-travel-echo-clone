// 📱 Telegram Mini App Bottom Navigation
// iOS 26 Liquid Glass style - показывается только в Telegram
// Паттерн Ex24: Чат посередине (крупная кнопка)

import { Home, Ship, Search, MessageCircle, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  isCenter?: boolean;
}

export const TelegramBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTelegram, setIsTelegram] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
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
      icon: <MessageCircle className="w-7 h-7" />,
      label: "Чат",
      path: "#chat",
      isCenter: true
    },
    {
      icon: <Search className="w-6 h-6" />,
      label: "Поиск",
      path: "#search"
    },
    {
      icon: <User className="w-6 h-6" />,
      label: "Профиль",
      path: "/contact"
    }
  ];
  
  const isActive = (path: string) => {
    if (path.startsWith("#")) return false;
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.path === "#chat") {
      e.preventDefault();
      // Открываем чат с ботом в Telegram
      const tg = (window as any).Telegram?.WebApp;
      if (tg) {
        // Закрываем Mini App и переходим в чат с ботом
        tg.close();
      }
    } else if (item.path === "#search") {
      e.preventDefault();
      setShowSearch(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tours?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Поиск - модальное окно */}
      {showSearch && (
        <div 
          className="fixed inset-0 z-[60] flex items-end justify-center"
          onClick={() => setShowSearch(false)}
        >
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />
          <div 
            className="relative w-full max-w-lg mx-4 mb-20 p-4 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Найти тур..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 px-4 py-3 rounded-xl border-0 outline-none text-lg"
                style={{
                  background: 'rgba(0, 0, 0, 0.05)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-white font-medium"
                style={{
                  background: '#007AFF',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}
              >
                Найти
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
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
            
            // Центральная кнопка Чат - крупная и выделенная
            if (item.isCenter) {
              return (
                <button
                  key={item.path}
                  onClick={(e) => handleNavClick(item, e)}
                  className="flex flex-col items-center justify-center flex-1 -mt-4"
                >
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                      boxShadow: '0 4px 16px rgba(0, 122, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    }}
                  >
                    {item.icon}
                  </div>
                  <span 
                    className="text-[10px] mt-1 font-medium"
                    style={{
                      color: '#007AFF',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            }
            
            // Обычные пункты меню
            return item.path.startsWith("#") ? (
              <button
                key={item.path}
                onClick={(e) => handleNavClick(item, e)}
                className="flex flex-col items-center justify-center flex-1 py-2 transition-all duration-200"
                style={{
                  color: '#8E8E93',
                }}
              >
                <div className="relative">
                  {item.icon}
                </div>
                <span 
                  className="text-[10px] mt-1 font-medium"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}
                >
                  {item.label}
                </span>
              </button>
            ) : (
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
    </>
  );
};
