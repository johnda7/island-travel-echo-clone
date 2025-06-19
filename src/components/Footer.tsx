import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-bold">Пхукет Go</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Создаем незабываемые путешествия к самым красивым местам Пхукета и Таиланда. 
              Ваша мечта о райском отдыхе станет реальностью с нами.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
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

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Услуги</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Индивидуальные туры</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Групповые поездки</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Свадебные туры</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Корпоративный отдых</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">VIP обслуживание</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Контакты</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Москва, ул. Тверская, 1<br />БЦ "Островский", офис 504</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">info@phuketgo.travel</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-600/20 rounded-lg">
              <p className="text-sm font-semibold mb-1">Время работы:</p>
              <p className="text-sm text-gray-300">Пн-Пт: 9:00 - 20:00</p>
              <p className="text-sm text-gray-300">Сб-Вс: 10:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 Пхукет Go. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
              <a href="#" className="hover:text-white transition-colors">Карта сайта</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
