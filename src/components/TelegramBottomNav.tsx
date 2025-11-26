// 📱 Telegram Mini App Bottom Navigation
// iOS 26 Liquid Glass style - показывается только в Telegram
// Паттерн Ex24: Чат посередине (крупная кнопка)

import { Home, Ship, Search, MessageCircle, Menu, MapPin, X, Palmtree, Mountain, Compass, ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useTours } from "@/hooks/useTours";
import { useAutoMenu } from "@/hooks/useAutoMenu";
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
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Используем туры для поиска и меню
  const { allTours, loading } = useTours();
  const { categories } = useAutoMenu();
  
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
      icon: <Menu className="w-6 h-6" />,
      label: "Меню",
      path: "#menu"
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
      // Открываем чат с АККАУНТОМ Phuketga (не бот!)
      const tg = (window as any).Telegram?.WebApp;
      if (tg) {
        // Переход в чат с аккаунтом @Phuketga
        tg.openTelegramLink('https://t.me/Phuketga');
      } else {
        window.open('https://t.me/Phuketga', '_blank');
      }
    } else if (item.path === "#search") {
      e.preventDefault();
      setShowSearch(true);
    } else if (item.path === "#menu") {
      e.preventDefault();
      setShowMenu(true);
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
      {/* Модальное меню с категориями */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-[60] flex flex-col justify-end"
          onClick={() => setShowMenu(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          
          {/* Меню панель снизу */}
          <div 
            className="relative w-full max-h-[80vh] overflow-y-auto rounded-t-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px) saturate(180%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Индикатор свайпа */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Заголовок */}
            <div className="flex items-center justify-between px-5 pb-3 border-b border-gray-100">
              <h2 
                className="text-lg font-bold"
                style={{ 
                  color: '#1C1C1E',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' 
                }}
              >
                Меню
              </h2>
              <button
                onClick={() => setShowMenu(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(0, 0, 0, 0.05)' }}
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* Основные разделы */}
            <div className="p-4 space-y-2">
              <Link
                to="/"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 p-3 rounded-xl active:bg-gray-100"
                style={{ background: 'rgba(0, 0, 0, 0.03)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0, 122, 255, 0.1)' }}>
                  <Home className="w-5 h-5" style={{ color: '#007AFF' }} />
                </div>
                <span className="font-medium" style={{ color: '#1C1C1E' }}>Главная</span>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </Link>
              
              <Link
                to="/tours"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 p-3 rounded-xl active:bg-gray-100"
                style={{ background: 'rgba(0, 0, 0, 0.03)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(52, 199, 89, 0.1)' }}>
                  <Ship className="w-5 h-5" style={{ color: '#34C759' }} />
                </div>
                <span className="font-medium" style={{ color: '#1C1C1E' }}>Все туры</span>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </Link>
            </div>
            
            {/* Категории туров */}
            <div className="px-4 pb-2">
              <div 
                className="text-xs font-semibold uppercase tracking-wide mb-2 px-1"
                style={{ color: '#8E8E93' }}
              >
                Категории
              </div>
              
              <div className="space-y-2">
                {categories.slice(0, 5).map((cat, idx) => (
                  <Link
                    key={cat.slug}
                    to={cat.href}
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl active:bg-gray-100"
                    style={{ background: 'rgba(0, 0, 0, 0.03)' }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ 
                        background: idx === 0 ? 'rgba(0, 122, 255, 0.1)' : 
                                   idx === 1 ? 'rgba(255, 149, 0, 0.1)' :
                                   idx === 2 ? 'rgba(175, 82, 222, 0.1)' :
                                   idx === 3 ? 'rgba(255, 59, 48, 0.1)' :
                                   'rgba(90, 200, 250, 0.1)'
                      }}
                    >
                      {idx === 0 ? <Palmtree className="w-5 h-5" style={{ color: '#007AFF' }} /> :
                       idx === 1 ? <Mountain className="w-5 h-5" style={{ color: '#FF9500' }} /> :
                       idx === 2 ? <Compass className="w-5 h-5" style={{ color: '#AF52DE' }} /> :
                       <Ship className="w-5 h-5" style={{ color: '#FF3B30' }} />}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium" style={{ color: '#1C1C1E' }}>{cat.name}</span>
                      <span className="text-xs text-gray-400 ml-2">({cat.count})</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Контакты */}
            <div className="px-4 pt-2 pb-6 border-t border-gray-100 mt-2">
              <div 
                className="text-xs font-semibold uppercase tracking-wide mb-2 px-1"
                style={{ color: '#8E8E93' }}
              >
                Связаться
              </div>
              
              <button
                onClick={() => {
                  const tg = (window as any).Telegram?.WebApp;
                  if (tg) {
                    tg.openTelegramLink('https://t.me/Phuketga');
                  } else {
                    window.open('https://t.me/Phuketga', '_blank');
                  }
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl active:bg-gray-100"
                style={{ background: 'rgba(0, 122, 255, 0.08)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0, 122, 255, 0.15)' }}>
                  <MessageCircle className="w-5 h-5" style={{ color: '#007AFF' }} />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-medium" style={{ color: '#007AFF' }}>Написать менеджеру</span>
                  <div className="text-xs text-gray-500">@Phuketga</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Поиск - модальное окно с живыми подсказками */}
      {showSearch && (
        <div 
          className="fixed inset-0 z-[60] flex flex-col"
          onClick={() => setShowSearch(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          
          {/* Поисковая панель - с отступом для Telegram UI (примерно 90px сверху) */}
          <div 
            className="relative w-full p-4"
            style={{
              paddingTop: '90px', // Увеличенный отступ для Telegram UI
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px) saturate(180%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрыть */}
            <button
              onClick={() => setShowSearch(false)}
              className="absolute right-4 text-gray-500 text-sm font-medium"
              style={{ 
                top: '90px', // Ниже Telegram UI
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' 
              }}
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
                        {tour.data?.priceAdult && (
                          <div 
                            className="text-[13px] mt-1 font-medium"
                            style={{ 
                              color: '#007AFF',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' 
                            }}
                          >
                            от ฿{tour.data.priceAdult.toLocaleString()}
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

      {/* Bottom Navigation - увеличенная высота для кнопки Чат */}
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
        <div className="flex justify-around items-end h-20 max-w-lg mx-auto px-2 pb-1">
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
