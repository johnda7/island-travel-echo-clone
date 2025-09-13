
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from "@/assets/logo.jpg";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
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
    }
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
          {/* Right: Social + Menu icon */}
          <div className="flex items-center space-x-4">
            <a href="https://t.me/phuketGoo" target="_blank" rel="noopener" className="flex items-center group">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" className="mr-2 text-blue-500 group-hover:text-cyan-500 transition-colors">
                <path d="M14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0ZM20.944 8.944L18.944 19.944C18.75 20.944 18.194 21.194 17.444 20.744L13.444 17.744L11.444 19.744C11.222 19.966 11.028 20.16 10.666 20.16L10.694 17.094L17.194 10.944C17.5 10.666 17.111 10.5 16.694 10.778L9.694 15.278L6.694 14.278C5.722 13.944 5.722 13.278 6.944 12.778L19.444 8.278C20.222 8.028 20.806 8.472 20.944 8.944Z" fill="currentColor"/>
              </svg>
              <span className="text-blue-700 group-hover:text-cyan-600 font-medium text-sm">Канал Пхукет Go</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.subItems ? (
                <NavigationMenu key={item.name}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-gray-700 hover:text-green-600 transition-colors duration-300 font-medium bg-transparent">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-48 gap-2 p-4">
                          {item.subItems.map((subItem) => (
                            <NavigationMenuLink key={subItem.name} asChild>
                              <Link
                                to={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-50 hover:text-green-600"
                              >
                                <div className="text-sm font-medium leading-none">{subItem.name}</div>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-700 hover:text-green-600 transition-colors duration-300 font-medium ${
                    location.pathname === item.href ? 'text-green-600 border-b-2 border-green-600' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <button className="p-2 text-gray-700 hover:text-green-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
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
              <div className="pt-4 border-t">
                <button className="w-full flex items-center justify-center p-3 text-gray-700 hover:text-green-600 transition-colors border border-gray-300 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  Поиск
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
