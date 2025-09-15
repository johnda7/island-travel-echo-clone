
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from "@/assets/logo.jpg";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Tours data for search - все 22 тура
  const allTours = [
    { name: "Пхи-Пхи 2 дня / 1 ночь", href: "/phi-phi-2-days-1-night", description: "Экскурсия с ночёвкой на островах Пхи-Пхи" },
    { name: "Острова Пхи-Пхи на спидботе", href: "/phi-phi-islands-speedboat", description: "Скоростная экскурсия на знаменитые острова" },
    { name: "Пхи-Пхи Ле и лагуна", href: "/koh-phi-phi-leh-lagoon", description: "Экскурсия к острову Пхи-Пхи Ле и Изумрудной лагуне" },
    { name: "Майя Бей на рассвете", href: "/maya-bay-sunrise", description: "Встреча рассвета в легендарной бухте" },
    { name: "Остров Джеймса Бонда", href: "/james-bond-island", description: "Экскурсия к острову из фильма о Джеймсе Бонде" },
  { name: "11 ОСТРОВОВ МЕГА-ТУР | ОДИН ЭПИЧНЫЙ ДЕНЬ", href: "/excursion/11-ostrovov", description: "Мега-тур по 11 островам: Пхи-Пхи, Майя Бэй, Джеймс Бонд, Хонг, Панак, Пани и др." },
    { name: "Коралловый остров + Парасейлинг", href: "/excursion/coral-island-parasailing", description: "Водные развлечения и парасейлинг" },
    { name: "Остров Рача Яй", href: "/excursion/racha-yai-island", description: "Снорклинг на живописном острове" },
    { name: "Наблюдение за китами", href: "/excursion/whale-watching-tour", description: "Уникальная экскурсия для наблюдения за китами" },
    { name: "Пляжные туры", href: "/category/beach-tours", description: "Экскурсии по лучшим пляжам Пхукета" },
    { name: "Городские туры", href: "/category/city-tours", description: "Обзорные экскурсии по городу Пхукет" },
    { name: "Приключенческие туры", href: "/category/adventure-tours", description: "Экстремальные и активные туры" },
    { name: "Групповые туры", href: "/category/group-tours", description: "Экскурсии для больших групп" },
  { name: "Достопримечательности Пхукета (без шопинга)", href: "/excursion/dostoprimechatelnosti-phuketa-1-den-obzornaja-jekskursija-bez-shopinga", description: "1 день, обзорная экскурсия без магазинов" },
    { name: "Рассветное приключение: Стеклянный мост Beyond Skywalk", href: "/tours/rassvetnoe-priklyuchenie-steklyannyj-most-beyond-skywalk", description: "Встреча рассвета на стеклянном мосту, о. Джеймса Бонда, пляж с самолетами" },
    { name: "Рафтинг + Слоновье СПА + ATV 1 день", href: "/tours/rafting-slonove-spa-atv-1-den", description: "Сплав по реке, катание на квадроциклах, купание со слонами" },
    { name: "Као Лак SAFARI 1 день", href: "/tours/kao-lak-safari-1-den", description: "Приключение в тропиках: джунгли, водопады, купание со слонами" },
    { name: "Что посетить", href: "/what-to-visit", description: "Главные достопримечательности Пхукета" },
    { name: "Экскурсии", href: "/tours", description: "Все экскурсии и туры" },
    { name: "Направления", href: "/destinations", description: "Популярные направления" },
    { name: "Пляжи", href: "/beaches", description: "Лучшие пляжи Пхукета" },
  { name: "Достопримечательности", href: "/dostoprimechatelnosti", description: "Интересные места для посещения" },
    { name: "Морские экскурсии", href: "/tours", description: "Туры по морю и островам" },
    { name: "Семейные туры", href: "/tours", description: "Экскурсии для всей семьи" },
    { name: "СПА и релакс", href: "/tours", description: "Расслабляющие туры и спа-процедуры" },
    { name: "Шоу программы", href: "/tours", description: "Развлекательные шоу и представления" }
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
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setShowMobileSearch(false);
        setSearchQuery('');
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
        { name: "Морские", href: "/tours#морские" },
        { name: "Сухопутные", href: "/tours#сухопутные" },
        { name: "Обзорные", href: "/tours#обзорные" },
        { name: "Пляжи и острова", href: "/tours#пляжи-и-острова" },
        { name: "Приключения", href: "/tours#приключения" },
        { name: "Городские", href: "/tours#городские" },
        { name: "Шоу", href: "/tours#шоу" },
        { name: "Семейные", href: "/tours#семейные" },
        { name: "СПА и релакс", href: "/tours#спа-и-релакс" }
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
            {/* Desktop Search */}
            <div className="hidden md:block relative" ref={searchRef}>
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
              ) : (
                <div className="absolute right-0 top-0 w-64 z-50" ref={mobileSearchRef}>
                  <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-2">
                    <input
                      type="text"
                      placeholder="Поиск туров..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowSearchResults(true)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      autoFocus
                    />
                    {/* Mobile Search Results */}
                    {showSearchResults && searchQuery && filteredTours.length > 0 && (
                      <div className="mt-2 max-h-60 overflow-y-auto">
                        {filteredTours.map((tour) => (
                          <Link
                            key={tour.href}
                            to={tour.href}
                            className="block px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setSearchQuery('');
                              setShowSearchResults(false);
                              setShowMobileSearch(false);
                            }}
                          >
                            <div className="font-medium text-gray-900 text-sm">{tour.name}</div>
                            <div className="text-xs text-gray-500">{tour.description}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
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
              {navigation.map((item) => (
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
      </div>
    </header>
  );
};
