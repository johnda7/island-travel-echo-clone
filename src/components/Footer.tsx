import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logoImage from "@/assets/logo.jpg";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-1 gap-8 justify-center">
          {/* Company Info */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
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
              {/* Скрытая ссылка на админку */}
              <Link to="/admin" className="text-gray-700 hover:text-gray-500 transition-colors text-xs">
                •
              </Link>
              <span className="hidden md:inline-block ml-6">&copy; 2025 Пхукет Go. Все права защищены.</span>
            </div>
            <span className="md:hidden block mt-2">&copy; 2025 Пхукет Go. Все права защищены.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
