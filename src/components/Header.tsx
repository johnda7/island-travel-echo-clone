
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
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[60] max-h-80 overflow-y-auto" role="listbox" id={desktopListboxId}>
                  <span className="sr-only" aria-live="polite">
                    {loading ? 'Идёт загрузка' : `Найдено: ${filteredTours.length}`}
                  </span>
                  {loading ? (
                    <div className="px-4 py-3 text-gray-500 text-sm">Идёт загрузка…</div>
                  ) : filteredTours.length > 0 ? (
                    filteredTours.map((tour) => (
                      <Link
                        key={tour.id}
                        to={getTourDetailPath(tour.id)}
                        className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery('');
                          setShowSearchResults(false);
                        }}
                        role="option"
                      >
                        <div className="font-medium text-gray-900">{highlightMatches(tour.data?.title || tour.name, debouncedQuery)}</div>
                        <div className="text-sm text-gray-500">{highlightMatches(tour.data?.subtitle || tour.data?.description, debouncedQuery)}</div>
                        <div className="flex gap-1 mt-1">
                          {tour.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{highlightMatches(tag, debouncedQuery as string)}</span>
                          ))}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      Туры не найдены. Попробуйте изменить запрос.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Search */}
            <div className="md:hidden relative">
              {!showMobileSearch ? (
                <button 
                  className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setShowMobileSearch(true)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
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

        {/* Mobile Search Modal */}
        {showMobileSearch && (
          <div className="md:hidden fixed top-16 left-0 right-0 z-[60] bg-white border-b shadow-lg" ref={mobileSearchRef}>
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Поиск туров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchResults(true)}
                  onKeyDown={handleSearchKeyDown}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                  autoFocus
                  role="combobox"
                  aria-expanded={showSearchResults && searchQuery.length > 0}
                  aria-controls={mobileListboxId}
                  aria-autocomplete="list"
                />
                <button
                  onClick={() => {
                    setShowMobileSearch(false);
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {/* Mobile Search Results */}
              {showSearchResults && searchQuery.length > 0 && (
                <div className="mt-3 max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg" role="listbox" id={mobileListboxId}>
                  <span className="sr-only" aria-live="polite">
                    {loading ? 'Идёт загрузка' : `Найдено: ${filteredTours.length}`}
                  </span>
                  {loading ? (
                    <div className="px-4 py-3 text-gray-500 text-sm">Идёт загрузка…</div>
                  ) : filteredTours.length > 0 ? (
                    filteredTours.map((tour) => (
                      <Link
                        key={tour.id}
                        to={getTourDetailPath(tour.id)}
                        className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors active:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery('');
                          setShowSearchResults(false);
                          setShowMobileSearch(false);
                        }}
                        role="option"
                      >
                        <div className="font-medium text-gray-900">{highlightMatches(tour.data?.title || tour.name, debouncedQuery)}</div>
                        <div className="text-sm text-gray-500 mt-1">{highlightMatches(tour.data?.subtitle || tour.data?.description, debouncedQuery)}</div>
                        <div className="flex gap-1 mt-1">
                          {tour.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{highlightMatches(tag, debouncedQuery as string)}</span>
                          ))}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      Ничего не найдено. Попробуйте другой запрос.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
