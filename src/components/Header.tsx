
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X, Search, Home, Ship, Palmtree, Info, Phone, Send } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTours } from "@/hooks/useTours";
import { useAutoMenu } from "@/hooks/useAutoMenu";
import { getTourDetailPath } from "@/lib/paths";
import logoImage from "@/assets/logo.jpg";

// iOS 26 Menu Icons - Lucide React Icons
const getMenuIcon = (menuName: string): JSX.Element => {
  const iconProps = { 
    className: "w-5 h-5",
    strokeWidth: 2.5,
    style: { 
      color: '#007AFF',
      filter: 'drop-shadow(0 0 8px rgba(0, 122, 255, 0.3))'
    }
  };
  
  const icons: Record<string, JSX.Element> = {
    'Главная': <Home {...iconProps} />,
    'Туры и экскурсии': <Ship {...iconProps} />,
    'Острова': <Palmtree {...iconProps} />,
    'О нас': <Info {...iconProps} />,
    'Контакты': <Phone {...iconProps} />
  };
  return icons[menuName] || <Home {...iconProps} />;
};

// Helper: get gradient colors for sub-item icons
const getSubItemGradient = (sectionIndex: number, itemIndex: number): [string, string] => {
  const gradients: [string, string][][] = [
    // Морские туры — синие оттенки
    [['#007AFF','#5AC8FA'], ['#34AADC','#5AC8FA'], ['#007AFF','#34AADC'], ['#0A84FF','#64D2FF'], ['#AF52DE','#DA8FFF'], ['#5856D6','#AF52DE']],
    // Приключения — зелёные/оранжевые
    [['#34C759','#30D158'], ['#FF9500','#FFCC00'], ['#FF6B35','#FF9500'], ['#30D158','#A8E06C'], ['#FF3B30','#FF6961'], ['#007AFF','#5AC8FA']],
    // Культурные — красные/пурпурные
    [['#FF2D55','#FF6482'], ['#AF52DE','#DA8FFF'], ['#FF9500','#FFCC00'], ['#5856D6','#AF52DE']],
    // Подборки — разноцветные
    [['#FFD60A','#FF9F0A'], ['#FF375F','#FF6482'], ['#FF9500','#FFCC00'], ['#AF52DE','#DA8FFF'], ['#5856D6','#AF52DE']],
    // Информация — серо-голубые
    [['#007AFF','#5AC8FA'], ['#34C759','#30D158'], ['#FF9500','#FFCC00'], ['#FFD60A','#FF9F0A'], ['#5856D6','#AF52DE'], ['#8E8E93','#AEAEB2']],
  ];
  const section = gradients[sectionIndex] || gradients[0];
  return section[itemIndex % section.length];
};

// Helper: extract emoji from text
const getSubItemEmoji = (name: string): string => {
  const match = name.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u);
  return match ? match[0] : '•';
};

// Helper: strip emoji from text  
const stripEmoji = (name: string): string => {
  return name.replace(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s*/u, '');
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchDropdownLeft, setSearchDropdownLeft] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTelegramMiniApp, setIsTelegramMiniApp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const desktopListboxId = "search-results-desktop";
  
  // Используем централизованную систему туров
  const { allTours, loading } = useTours();
  const { mainMenuItems, categories } = useAutoMenu();

  // Проверяем, открыто ли в Telegram Mini App
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initData) {
      setIsTelegramMiniApp(true);
    }
  }, []);

  // Scroll effect for Liquid Glass header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounce for mobile performance
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 180);
    return () => clearTimeout(id);
  }, [searchQuery]);
  
  // Debug logging removed

  // Filter tours based on (debounced) search query
  const filteredTours = useMemo(() => {
    const q = (debouncedQuery || '').toLowerCase();
    if (!q) return [];
    
    return allTours.filter(tour => {
      // Поиск по базовым полям (всегда доступны)
      const nameMatch = tour.name.toLowerCase().includes(q);
      const tagsMatch = tour.tags.some(tag => tag.toLowerCase().includes(q));
      
      // Поиск по данным тура (если загружены)
      let dataMatch = false;
      if (tour.data) {
        dataMatch = 
          tour.data.title?.toLowerCase().includes(q) ||
          tour.data.subtitle?.toLowerCase().includes(q) ||
          tour.data.description?.toLowerCase().includes(q) ||
          false;
      }
      
      return nameMatch || tagsMatch || dataMatch;
    });
  }, [allTours, debouncedQuery]);

  // Helper: highlight matches in a text
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
        <mark className="bg-yellow-200 text-inherit rounded px-0.5">{match}</mark>
        {after}
      </>
    );
  };

  // Debug logging removed in production

  // Calculate desktop search dropdown position
  useEffect(() => {
    if (showSearchResults && desktopSearchRef.current) {
      const rect = desktopSearchRef.current.getBoundingClientRect();
      setSearchDropdownLeft(rect.left);
    }
  }, [showSearchResults]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Close search - check both desktop and mobile search refs
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(target) &&
          searchRef.current && !searchRef.current.contains(target)) {
        setShowSearchResults(false);
      }
    };

    if (showSearchResults) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showSearchResults]);

  // Close search when location changes (separate useEffect)
  useEffect(() => {
    setShowSearchResults(false);
    setSearchQuery('');
  }, [location.pathname]);

  // Handle Enter key: go to the first result
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowSearchResults(false);
      setSearchQuery('');
      return;
    }
    if (e.key === 'Enter' && filteredTours.length > 0) {
      const first = filteredTours[0];
      navigate(getTourDetailPath(first.id));
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };


  // В Telegram Mini App полностью скрываем Header - у Telegram свой UI сверху
  if (isTelegramMiniApp) {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 liquid-glass-header z-50 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - iOS 26 Liquid Glass */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div 
              className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-black text-lg transition-all duration-150"
              style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.filter = 'brightness(0.85)';
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.filter = 'brightness(0.85)';
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span className="text-white">GO</span>
            </div>
            <span className="text-xl md:text-2xl font-bold whitespace-nowrap transition-all duration-150" style={{ 
              background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Пхукет Go
            </span>
          </Link>
          {/* Search */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block relative" ref={desktopSearchRef}>
              <input
                type="text"
                placeholder="Поиск туров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                onKeyDown={handleSearchKeyDown}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                role="combobox"
                aria-expanded={showSearchResults && searchQuery.length > 0}
                aria-controls={desktopListboxId}
                aria-autocomplete="list"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              
              {/* Search Results Dropdown - УЛУЧШЕННЫЙ ДИЗАЙН */}
              {showSearchResults && searchQuery.length > 0 && (
                <div 
                  className="fixed top-[4.5rem] w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-[calc(100vh-5rem)] overflow-y-auto" 
                  style={{ left: `${searchDropdownLeft}px` }}
                  role="listbox" 
                  id={desktopListboxId}
                >
                  {/* Stats Header */}
                  <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                    <span className="text-sm text-gray-600">
                      {loading ? 'Поиск туров...' : `Найдено: ${filteredTours.length} туров`}
                    </span>
                  </div>
                  
                  <span className="sr-only" aria-live="polite">
                    {loading ? 'Идёт загрузка' : `Найдено: ${filteredTours.length}`}
                  </span>
                  {loading ? (
                    <div className="p-6 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-3"></div>
                      <div className="text-gray-500 text-sm">Поиск туров...</div>
                    </div>
                  ) : filteredTours.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {filteredTours.map((tour) => (
                        <Link
                          key={tour.id}
                          to={getTourDetailPath(tour.id)}
                          className="block p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(getTourDetailPath(tour.id));
                            setSearchQuery('');
                            setShowSearchResults(false);
                          }}
                          role="option"
                        >
                          <div className="flex items-start space-x-3">
                            {/* Tour Icon */}
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            
                            {/* Tour Info */}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm leading-5">
                                {highlightMatches(tour.data?.title || tour.name, debouncedQuery)}
                              </div>
                              <div className="text-xs text-gray-600 mt-1 line-clamp-1 leading-4">
                                {highlightMatches(tour.data?.subtitle || tour.data?.description, debouncedQuery)}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {tour.tags.slice(0, 2).map((tag, index) => (
                                  <span key={index} className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">
                                    {highlightMatches(tag, debouncedQuery as string)}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Price */}
                            {tour.data?.priceAdult && (
                              <div className="flex-shrink-0 text-right">
                                <div className="text-xs font-semibold text-[#007AFF]">от {tour.data.priceAdult} ฿</div>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="text-gray-900 font-medium mb-1 text-sm">Туры не найдены</div>
                      <div className="text-gray-500 text-xs">
                        Попробуйте изменить поисковый запрос
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Search - Same as Desktop */}
            <div className="md:hidden relative w-full max-w-xs" ref={searchRef}>
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                onKeyDown={handleSearchKeyDown}
                className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                role="combobox"
                aria-expanded={showSearchResults && searchQuery.length > 0}
                aria-controls={desktopListboxId}
                aria-autocomplete="list"
              />
              <svg className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              
              {/* Mobile Search Results Dropdown - Centered & Responsive */}
              {showSearchResults && searchQuery.length > 0 && (
                <div className="fixed top-[4.5rem] left-1/2 -translate-x-1/2 w-72 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-[calc(100vh-5rem)] overflow-y-auto" role="listbox" id="mobile-search-results">
                  {/* Stats Header */}
                  <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                    <span className="text-sm text-gray-600">
                      {loading ? 'Поиск туров...' : `Найдено: ${filteredTours.length} туров`}
                    </span>
                  </div>
                  
                  <span className="sr-only" aria-live="polite">
                    {loading ? 'Идёт загрузка' : `Найдено: ${filteredTours.length}`}
                  </span>
                  {loading ? (
                    <div className="p-6 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-3"></div>
                      <div className="text-gray-500 text-sm">Поиск туров...</div>
                    </div>
                  ) : filteredTours.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {filteredTours.map((tour) => (
                        <Link
                          key={tour.id}
                          to={getTourDetailPath(tour.id)}
                          className="block p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(getTourDetailPath(tour.id));
                            setSearchQuery('');
                            setShowSearchResults(false);
                          }}
                          role="option"
                        >
                          <div className="flex items-start space-x-3">
                            {/* Tour Icon */}
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            
                            {/* Tour Info */}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm leading-5">
                                {highlightMatches(tour.data?.title || tour.name, debouncedQuery)}
                              </div>
                              <div className="text-xs text-gray-600 mt-1 line-clamp-1 leading-4">
                                {highlightMatches(tour.data?.subtitle || tour.data?.description, debouncedQuery)}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {tour.tags.slice(0, 2).map((tag, index) => (
                                  <span key={index} className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">
                                    {highlightMatches(tag, debouncedQuery as string)}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Price */}
                            {tour.data?.priceAdult && (
                              <div className="flex-shrink-0 text-right">
                                <div className="text-xs font-semibold text-[#007AFF]">от {tour.data.priceAdult} ฿</div>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                      </div>
                      <div className="text-gray-900 font-medium mb-2">Туры не найдены</div>
                      <div className="text-gray-500 text-sm">
                        Попробуйте изменить поисковый запрос
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Menu button for all devices */}
          <button
            className="p-2 ml-4 hover:bg-gray-100 rounded-full transition-all duration-150"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            style={{
              color: '#007AFF'
            }}
          >
            {isOpen ? (
              <X className="w-6 h-6" style={{ color: '#007AFF' }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: '#007AFF' }} />
            )}
          </button>
        </div>

        {/* Navigation Menu - iOS 26 Liquid Glass */}
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <div 
              className="fixed inset-0 z-30"
              style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
              onClick={() => setIsOpen(false)}
            />
            <div 
              className="fixed top-16 left-0 right-0 z-40 overflow-hidden"
              style={{
                background: 'rgba(248, 248, 250, 0.97)',
                backdropFilter: 'blur(60px) saturate(200%)',
                WebkitBackdropFilter: 'blur(60px) saturate(200%)',
                borderTop: '0.5px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                maxHeight: 'calc(100vh - 4rem)',
                overflowY: 'auto',
                animation: 'slideDown 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <nav className="px-4 py-5 max-w-lg mx-auto">
                {mainMenuItems.map((item, index) => (
                  <div 
                    key={item.name}
                    className="mb-5"
                    style={{
                      animation: `fadeIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.04}s both`
                    }}
                  >
                    {/* Section Header */}
                    <Link
                      to={item.href}
                      className="flex items-center gap-2.5 px-3 py-1.5 mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-[15px] font-semibold tracking-tight" style={{
                        color: '#8E8E93',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        fontSize: '12px',
                      }}>
                        {item.name}
                      </span>
                    </Link>
                    
                    {/* Sub Items Card */}
                    {item.subItems && (
                      <div 
                        className="rounded-2xl overflow-hidden"
                        style={{
                          background: 'rgba(255, 255, 255, 0.85)',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(0, 0, 0, 0.04)',
                        }}
                      >
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="flex items-center gap-3.5 px-4 py-3.5 active:bg-gray-100/80 transition-colors duration-100 min-h-[52px]"
                            style={{
                              borderBottom: subIndex < (item.subItems?.length || 0) - 1 ? '0.5px solid rgba(0, 0, 0, 0.06)' : 'none',
                              animation: `fadeIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) ${(index * 0.04) + (subIndex * 0.02)}s both`
                            }}
                            onClick={() => setIsOpen(false)}
                          >
                            {/* Icon Circle */}
                            <div 
                              className="flex-shrink-0 w-10 h-10 rounded-[12px] flex items-center justify-center text-base"
                              style={{
                                background: `linear-gradient(135deg, ${getSubItemGradient(index, subIndex)[0]}, ${getSubItemGradient(index, subIndex)[1]})`,
                                boxShadow: `0 2px 8px ${getSubItemGradient(index, subIndex)[0]}33`,
                              }}
                            >
                              <span className="text-white text-[16px]">{getSubItemEmoji(subItem.name)}</span>
                            </div>
                            
                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <div className="text-[15px] font-medium text-gray-900 leading-tight" style={{
                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                              }}>
                                {stripEmoji(subItem.name)}
                              </div>
                              {'description' in subItem && (subItem as any).description && (
                                <div className="text-[12px] text-gray-500 mt-0.5 leading-tight" style={{
                                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                                }}>
                                  {(subItem as any).description}
                                </div>
                              )}
                            </div>
                            
                            {/* Count badge + chevron */}
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              {'count' in subItem && (subItem as any).count > 0 && (
                                <span className="text-[12px] font-medium px-1.5 py-0.5 rounded-md" style={{
                                  background: 'rgba(0, 122, 255, 0.08)',
                                  color: '#007AFF',
                                }}>
                                  {(subItem as any).count}
                                </span>
                              )}
                              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* CTA Button */}
                <div 
                    className="mt-6 mb-3"
                  style={{
                    animation: `fadeIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) ${mainMenuItems.length * 0.04 + 0.1}s both`
                  }}
                >
                  <button 
                    onClick={() => {
                      const tg = (window as any).Telegram?.WebApp;
                      if (tg?.HapticFeedback) {
                        tg.HapticFeedback.impactOccurred('medium');
                      }
                      if (tg) {
                        tg.openTelegramLink('https://t.me/Phuketga');
                      } else {
                        window.open('https://t.me/Phuketga', '_blank');
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-semibold text-[15px] active:scale-[0.98] transition-all duration-150"
                    style={{
                      background: 'linear-gradient(135deg, #2AABEE 0%, #229ED9 100%)',
                      color: '#fff',
                      boxShadow: '0 4px 14px rgba(42, 171, 238, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    Написать в Telegram
                  </button>
                </div>
              </nav>
            </div>
          </>
        )}


      </div>
    </header>
  );
};
