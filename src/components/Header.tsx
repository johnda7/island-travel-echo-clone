
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
  const [searchDropdownLeft, setSearchDropdownLeft] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const desktopListboxId = "search-results-desktop";
  
  // Используем централизованную систему туров
  const { allTours, loading } = useTours();
  const { mainMenuItems, categories } = useAutoMenu();

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


  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - ЦВЕТНОЙ с градиентом */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-black text-lg" style={{
              background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 50%, #FF2D55 80%, #FF9500 100%)',
              boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)'
            }}>
              <span className="text-white">GO</span>
            </div>
            <span className="text-xl md:text-2xl font-bold whitespace-nowrap" style={{ 
              background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 50%, #FF2D55 80%, #FF9500 100%)',
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
                    className="block text-gray-700 hover:text-[#007AFF] transition-colors duration-300 py-1 font-medium"
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
                          className="block text-gray-600 hover:text-[#007AFF] transition-colors duration-300 py-0.5 text-sm"
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


      </div>
    </header>
  );
};
