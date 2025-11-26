// 📱 Telegram Mini App Bottom Navigation
// iOS 26 Liquid Glass style - показывается только в Telegram
// Паттерн Ex24: Чат посередине (крупная кнопка)

import { Home, Ship, Search, MessageCircle, User, MapPin } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useTours } from "@/hooks/useTours";
import { getTourDetailPath } from "@/lib/paths";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  isCenter?: boolean;
}

// Популярные запросы для быстрого поиска
const POPULAR_SEARCHES = [
  "Острова Пхи-Пхи",
  "Джеймс Бонд",
  "Симиланы",
  "Морские туры",
  "Као Лак"
];

export const TelegramBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTelegram, setIsTelegram] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Используем туры для поиска
  const { allTours, loading } = useTours();
  
  useEffect(() => {
    // Проверяем, открыто ли в Telegram
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initData) {
      setIsTelegram(true);
      console.log('📱 Telegram Mini App detected - showing bottom nav');
    }
  }, []);
  
  // Debounce для поиска
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 150);
    return () => clearTimeout(id);
  }, [searchQuery]);
  
  // Фильтрация туров
  const filteredTours = useMemo(() => {
    const q = (debouncedQuery || '').toLowerCase();
    if (!q) return [];
    
    return allTours.filter(tour => {
      const nameMatch = tour.name.toLowerCase().includes(q);
      const tagsMatch = tour.tags.some(tag => tag.toLowerCase().includes(q));
      
      let dataMatch = false;
      if (tour.data) {
        dataMatch = 
          tour.data.title?.toLowerCase().includes(q) ||
          tour.data.subtitle?.toLowerCase().includes(q) ||
          tour.data.description?.toLowerCase().includes(q) ||
          false;
      }
      
      return nameMatch || tagsMatch || dataMatch;
    }).slice(0, 5); // Максимум 5 результатов
  }, [allTours, debouncedQuery]);
  
  // Подсветка совпадений
  const highlightMatches = (text: string | undefined, q: string) => {
    if (!text) return null;
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length);
    return (
      <>
        {before}
        <mark className="bg-yellow-200/60 text-inherit rounded px-0.5">{match}</mark>
        {after}
      </>
    );
  };
  
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
  
  const handleSelectTour = (tourId: string) => {
    navigate(getTourDetailPath(tourId));
    setShowSearch(false);
    setSearchQuery('');
  };
  
  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      {/* Поиск - модальное окно с живыми подсказками */}
      {showSearch && (
        <div 
          className="fixed inset-0 z-[60] flex flex-col"
          onClick={() => setShowSearch(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          
          {/* Поисковая панель сверху */}
          <div 
            className="relative w-full p-4 pt-12"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px) saturate(180%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрыть */}
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-3 right-4 text-gray-500 text-sm font-medium"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
            >
              Отмена
            </button>
            
            {/* Поле ввода */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск туров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-0 outline-none text-[17px]"
                style={{
                  background: 'rgba(0, 0, 0, 0.06)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}
              />
            </div>
            
            {/* Быстрые запросы - показываем когда нет ввода */}
            {!searchQuery && (
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-2 font-medium">Популярные запросы</div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((query) => (
                    <button
                      key={query}
                      onClick={() => handleQuickSearch(query)}
                      className="px-3 py-1.5 rounded-full text-sm"
                      style={{
                        background: 'rgba(0, 122, 255, 0.1)',
                        color: '#007AFF',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                      }}
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Результаты поиска */}
          {searchQuery && (
            <div 
              className="relative flex-1 overflow-y-auto"
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-3"></div>
                  <div className="text-gray-500 text-sm">Поиск туров...</div>
                </div>
              ) : filteredTours.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredTours.map((tour) => (
                    <button
                      key={tour.id}
                      onClick={() => handleSelectTour(tour.id)}
                      className="w-full p-4 flex items-start gap-3 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      {/* Иконка тура */}
                      <div 
                        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(0, 122, 255, 0.1)' }}
                      >
                        <MapPin className="w-5 h-5" style={{ color: '#007AFF' }} />
                      </div>
                      
                      {/* Информация о туре */}
                      <div className="flex-1 min-w-0">
                        <div 
                          className="font-medium text-gray-900 text-[15px] leading-5"
                          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
                        >
                          {highlightMatches(tour.data?.title || tour.name, debouncedQuery)}
                        </div>
                        {tour.data?.subtitle && (
                          <div 
                            className="text-[13px] text-gray-500 mt-0.5 line-clamp-1"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
                          >
                            {highlightMatches(tour.data.subtitle, debouncedQuery)}
                          </div>
                        )}
                        {tour.data?.price && (
                          <div 
                            className="text-[13px] mt-1 font-medium"
                            style={{ 
                              color: '#007AFF',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' 
                            }}
                          >
                            от {tour.data.price}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : debouncedQuery.length > 0 ? (
                <div className="p-6 text-center">
                  <div className="text-gray-400 text-4xl mb-3">🔍</div>
                  <div className="text-gray-600 font-medium">Ничего не найдено</div>
                  <div className="text-gray-400 text-sm mt-1">Попробуйте другой запрос</div>
                </div>
              ) : null}
            </div>
          )}
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
