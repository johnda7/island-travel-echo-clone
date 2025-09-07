
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Главная", href: "/" },
    { 
      name: "Туры", 
      href: "/tours",
      subItems: [
        { name: "Все туры", href: "/tours" },
        { name: "Острова Пхи-Пхи", href: "/phi-phi-islands" },
        { name: "Городские туры", href: "/category/city-tours" },
        { name: "Пляжные туры", href: "/category/beach-tours" },
        { name: "Приключенческие туры", href: "/category/adventure-tours" },
        { name: "Групповые туры", href: "/category/group-tours" }
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
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Пхукет Go
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.subItems ? (
                <NavigationMenu key={item.name}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium bg-transparent">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-48 gap-2 p-4">
                          {item.subItems.map((subItem) => (
                            <NavigationMenuLink key={subItem.name} asChild>
                              <Link
                                to={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600"
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
                  className={`text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium ${
                    location.pathname === item.href ? 'text-blue-600 border-b-2 border-blue-600' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+7 (495) 123-45-67</span>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              Заказать звонок
            </Button>
          </div>

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
                    className="block text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 font-medium"
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
                          className="block text-gray-600 hover:text-blue-600 transition-colors duration-300 py-1 text-sm"
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
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <Phone className="w-4 h-4" />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
                  Заказать звонок
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
