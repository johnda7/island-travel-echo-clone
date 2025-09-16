import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logoImage from "@/assets/logo.jpg";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg ring-2 ring-white/20">
                <img 
                  src={logoImage} 
                  alt="Phuket Go Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Пхукет Go
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Создаем незабываемые путешествия к самым красивым местам Пхукета и Таиланда. 
              Ваша мечта о райском отдыхе станет реальностью с нами.
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/phuketGoo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400/50">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.61 7.591c-.12.539-.437.67-.887.417l-2.456-1.81-1.185 1.14c-.131.131-.242.242-.495.242l.177-2.517 4.589-4.147c.199-.177-.043-.275-.309-.098l-5.674 3.573L7.784 13.5c-.542-.169-.551-.542.113-.802l10.057-3.875c.451-.179.847.106.703.637z"/>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-green-400/50">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400/50">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400/50">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Быстрые ссылки</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Главная</Link></li>
              <li><Link to="/tours" className="text-gray-300 hover:text-white transition-colors">Туры</Link></li>
              <li><Link to="/destinations" className="text-gray-300 hover:text-white transition-colors">Направления</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">О нас</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              <div className="w-8 h-8 rounded-full overflow-hidden shadow ring-2 ring-green-400/40">
                <img src={logoImage} alt="Phuket Go Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-green-400">Пхукет Go</span>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 items-center">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
              <a href="#" className="hover:text-white transition-colors">Карта сайта</a>
              <span className="hidden md:inline-block ml-6">&copy; 2025 Пхукет Go. Все права защищены.</span>
            </div>
            <span className="md:hidden block mt-2">&copy; 2025 Пхукет Go. Все права защищены.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
