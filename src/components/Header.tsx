
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTours } from "@/hooks/useTours";
import { useAutoMenu } from "@/hooks/useAutoMenu";
import { getTourDetailPath } from "@/lib/paths";
import logoImage from "@/assets/logo.jpg";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const desktopListboxId = "search-results-desktop";
  const mobileListboxId = "search-results-mobile";
  
  // Используем централизованную систему туров
  const { allTours, loading } = useTours();
  const { mainMenuItems, categories } = useAutoMenu();

  // Debounce for mobile performance
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 180);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Filter tours based on (debounced) search query
  const filteredTours = useMemo(() => {
    const q = (debouncedQuery || '').toLowerCase();
    if (!q) return [];
    return allTours.filter(tour =>
      tour.data && (
        tour.name.toLowerCase().includes(q) ||
        tour.data.title.toLowerCase().includes(q) ||
        tour.data.subtitle?.toLowerCase().includes(q) ||
        tour.data.description?.toLowerCase().includes(q) ||
        tour.tags.some(tag => tag.toLowerCase().includes(q))
      )
    );
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

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Close desktop search
      if (searchRef.current && !searchRef.current.contains(target)) {
        setShowSearchResults(false);
      }
      
      // Close mobile search
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(target)) {
        setShowMobileSearch(false);
        setSearchQuery('');
        setShowSearchResults(false);
      }
    };

    if (showSearchResults || showMobileSearch) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showSearchResults, showMobileSearch]);

  // Close search when location changes (separate useEffect)
  useEffect(() => {
    setShowSearchResults(false);
    setShowMobileSearch(false);
    setSearchQuery('');
  }, [location.pathname]);

  // Handle Enter key: go to the first result
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowSearchResults(false);
      setShowMobileSearch(false);
      setSearchQuery('');
      return;
    }
    if (e.key === 'Enter' && filteredTours.length > 0) {
      const first = filteredTours[0];
      navigate(getTourDetailPath(first.id));
      setShowSearchResults(false);
      setShowMobileSearch(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    if (showMobileSearch) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [showMobileSearch]);


  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
              <img 
                src={logoImage} 
                alt="Phuket Go Logo" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Пхукет Go
            </span>
          </Link>
          {/* Search */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Поиск туров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                onKeyDown={handleSearchKeyDown}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                <div className="absolute top-full mt-1 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-[60] max-h-96 overflow-y-auto" role="listbox" id={desktopListboxId}>
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
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto mb-3"></div>
                      <div className="text-gray-500 text-sm">Поиск туров...</div>
                    </div>
                  ) : filteredTours.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {filteredTours.map((tour) => (
                        <Link
                          key={tour.id}
                          to={getTourDetailPath(tour.id)}
                          className="block p-4 hover:bg-gray-50 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery('');
                            setShowSearchResults(false);
                          }}
                          role="option"
                        >
                          <div className="flex items-start space-x-3">
                            {/* Tour Icon */}
                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <div className="text-xs font-semibold text-green-600">от {tour.data.priceAdult} ฿</div>
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

            {/* Mobile Search Button */}
            <div className="md:hidden relative">
              {!showMobileSearch ? (
                <button 
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  onClick={() => setShowMobileSearch(true)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <span className="text-sm font-medium">Поиск</span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Menu button for all devices */}
          <button
            className="p-2 ml-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-t shadow-lg max-h-[80vh] overflow-y-auto">
            <nav className="px-4 py-2 space-y-1">
              {mainMenuItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="block text-gray-700 hover:text-green-600 transition-colors duration-300 py-1 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="ml-2 space-y-0.5">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block text-gray-600 hover:text-green-600 transition-colors duration-300 py-0.5 text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}

        {/* Mobile Search Modal - Google/Яндекс Style */}
        {showMobileSearch && (
          <>
            {/* Backdrop Overlay */}
            <div 
              className="md:hidden fixed inset-0 bg-black/20 z-[70] backdrop-blur-sm"
              onClick={() => {
                setShowMobileSearch(false);
                setSearchQuery('');
                setShowSearchResults(false);
              }}
            />
            
            {/* Search Modal */}
            <div className="md:hidden fixed inset-0 z-[80] flex flex-col bg-white" ref={mobileSearchRef}>
              {/* Search Header */}
              <div className="flex-shrink-0 px-4 py-4 border-b bg-white shadow-sm">
                <div className="flex items-center space-x-3">
                  {/* Back Button */}
                  <button
                    onClick={() => {
                      setShowMobileSearch(false);
                      setSearchQuery('');
                      setShowSearchResults(false);
                    }}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Поиск туров на Пхукете..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.length > 0) {
                          setShowSearchResults(true);
                        }
                      }}
                      className="w-full px-4 py-3 text-base bg-gray-50 border-0 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-colors"
                      autoFocus
                      role="combobox"
                      aria-expanded={showSearchResults && searchQuery.length > 0}
                      aria-controls={mobileListboxId}
                      aria-autocomplete="list"
                    />
                    
                    {/* Clear Button */}
                    {searchQuery.length > 0 && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setShowSearchResults(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Search Stats */}
                {searchQuery.length > 0 && (
                  <div className="mt-2 px-2">
                    <span className="text-sm text-gray-500">
                      {loading ? 'Поиск...' : `Найдено: ${filteredTours.length} туров`}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Search Results - ИСПРАВЛЕН СКРОЛЛИНГ */}
              <div className="flex-1 overflow-y-auto min-h-0">
                {searchQuery.length === 0 ? (
                  /* Popular Searches */
                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Популярные запросы</h3>
                      <div className="space-y-2">
                        {['Пхи-Пхи', 'Джеймс Бонд', 'рафтинг', 'слоны', 'рассвет', '11 островов'].map((term) => (
                          <button
                            key={term}
                            onClick={() => {
                              setSearchQuery(term);
                              setShowSearchResults(true);
                            }}
                            className="flex items-center space-x-3 w-full p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <Search className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{term}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Категории</h3>
                      <div className="space-y-2">
                        {['Морские туры', 'Активные туры', 'Культурные туры', 'Семейные туры'].map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setSearchQuery(category);
                              setShowSearchResults(true);
                            }}
                            className="flex items-center space-x-3 w-full p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4l-3 3.5M5 7l3 3.5m6-3.5v8" />
                            </svg>
                            <span className="text-gray-700">{category}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Search Results */
                  <div role="listbox" id={mobileListboxId}>
                    <span className="sr-only" aria-live="polite">
                      {loading ? 'Идёт загрузка' : `Найдено: ${filteredTours.length}`}
                    </span>
                    {loading ? (
                      <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
                        <div className="text-gray-500">Поиск туров...</div>
                      </div>
                    ) : filteredTours.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {filteredTours.map((tour) => (
                          <Link
                            key={tour.id}
                            to={getTourDetailPath(tour.id)}
                            className="block p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchQuery('');
                              setShowSearchResults(false);
                              setShowMobileSearch(false);
                            }}
                            role="option"
                          >
                            <div className="flex items-start space-x-3">
                              {/* Tour Icon */}
                              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              
                              {/* Tour Info */}
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 text-base leading-5">
                                  {highlightMatches(tour.data?.title || tour.name, debouncedQuery)}
                                </div>
                                <div className="text-sm text-gray-600 mt-1 line-clamp-2 leading-5">
                                  {highlightMatches(tour.data?.subtitle || tour.data?.description, debouncedQuery)}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {tour.tags.slice(0, 3).map((tag, index) => (
                                    <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                      {highlightMatches(tag, debouncedQuery as string)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Price */}
                              {tour.data?.priceAdult && (
                                <div className="flex-shrink-0 text-right">
                                  <div className="text-sm font-semibold text-green-600">от {tour.data.priceAdult} ฿</div>
                                  <div className="text-xs text-gray-500">за взрослого</div>
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="text-gray-900 font-medium mb-2">Туры не найдены</div>
                        <div className="text-gray-500 text-sm">
                          Попробуйте изменить поисковый запрос или выберите из популярных категорий
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
