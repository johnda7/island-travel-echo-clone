
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from "@/assets/logo.jpg";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  // Tours data for search
  const allTours = [
    { name: "Пхи-Пхи 2 дня / 1 ночь", href: "/phi-phi-2-days-1-night", description: "Экскурсия с ночёвкой на островах Пхи-Пхи" },
    { name: "Острова Пхи-Пхи", href: "/phi-phi-islands", description: "Однодневная экскурсия на знаменитые острова" },
    { name: "Майя Бей на рассвете", href: "/maya-bay-sunrise", description: "Встреча рассвета в легендарной бухте" },
    { name: "Остров Джеймса Бонда", href: "/james-bond-island", description: "Экскурсия к острову из фильма о Джеймсе Бонде" },
    { name: "11 островов", href: "/eleven-islands-standard", description: "Большое путешествие по 11 островам" },
    { name: "Коралловый остров + Парасейлинг", href: "/coral-island-parasailing", description: "Водные развлечения и парасейлинг" },
    { name: "Остров Рача Яй", href: "/racha-yai-island", description: "Снорклинг на живописном острове" },
    { name: "Наблюдение за китами", href: "/whale-watching-tour", description: "Уникальная экскурсия для наблюдения за китами" }
  ];

  // Filter tours based on search query
  const filteredTours = allTours.filter(tour =>
    tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigation = [
    {
      name: "Что посетить",
      href: "/what-to-visit"
    },
    { 
      name: "Туры", 
      href: "/tours",
      subItems: [
        { name: "Все туры", href: "/tours" },
        { name: "Острова Пхи-Пхи", href: "/phi-phi-islands" },
        { name: "Городские туры", href: "/city-tours" },
        { name: "Пляжные туры", href: "/beach-tours" },
        { name: "Приключенческие туры", href: "/adventure-tours" },
        { name: "Групповые туры", href: "/group-tours" }
      ]
    },
    { name: "Направления", href: "/destinations" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contact" }
  ];

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
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Пхукет Go
            </span>
          </Link>
          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Поиск туров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery && filteredTours.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {filteredTours.map((tour) => (
                    <Link
                      key={tour.href}
                      to={tour.href}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                    >
                      <div className="font-medium text-gray-900">{tour.name}</div>
                      <div className="text-sm text-gray-500">{tour.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="p-2 ml-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t shadow-lg">
            <nav className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="block text-gray-700 hover:text-green-600 transition-colors duration-300 py-2 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="ml-4 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block text-gray-600 hover:text-green-600 transition-colors duration-300 py-1 text-sm"
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
