import { Link } from "react-router-dom";
import { MessageCircle, Users, Send } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [isTelegramMiniApp, setIsTelegramMiniApp] = useState(false);
  
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initData) {
      setIsTelegramMiniApp(true);
    }
  }, []);
  
  return (
    <footer 
      style={{ 
        background: '#1C1C1E',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: isTelegramMiniApp ? '80px' : '0'
      }} 
      className="text-white"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Company Info */}
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-2.5 mb-2 group">
              <div 
                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-black text-base transition-all duration-150"
                style={{ 
                  background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                  boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.18)'
                }}
              >
                <span className="text-white">GO</span>
              </div>
              <span className="text-xl font-bold" style={{ 
                background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Пхукет Go
              </span>
            </Link>
            <p className="text-gray-400 leading-snug max-w-sm mx-auto md:mx-0 text-xs">
              Создаем незабываемые путешествия к самым красивым местам Пхукета и Таиланда.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-sm font-semibold mb-3 text-white">Навигация</h3>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
              <Link to="/tours" className="text-gray-400 hover:text-[#007AFF] text-xs transition-colors">Все туры</Link>
              <Link to="/reviews" className="text-gray-400 hover:text-[#007AFF] text-xs transition-colors">Отзывы</Link>
              <Link to="/help/faq" className="text-gray-400 hover:text-[#007AFF] text-xs transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Contacts & Social */}
          <div className="text-center md:text-right">
            <h3 className="text-sm font-semibold mb-3 text-white">Мы на связи</h3>
            <div className="flex flex-col items-center md:items-end gap-2">
              <a 
                href="https://t.me/phuketGa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#007AFF] text-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Менеджер Telegram
              </a>
              <a 
                href="https://t.me/phuketGoo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#007AFF] text-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Telegram — канал
              </a>
              <a 
                href="https://max.ru/join/_A5GgMrHZDCZ2ulCH0RDz7e9SfDlA8lTDrO7Xxxz240" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#007AFF] text-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                МАХ — канал
              </a>
              <a 
                href="https://max.ru/u/f9LHodD0cOLHcCKSsvaoi8e6b1B143PNGeRnZTzh3d00SMVo2frD_ty8YSU" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#007AFF] text-xs transition-colors"
              >
                <Users className="w-3.5 h-3.5" />
                МАХ — менеджер
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-5 pt-4 text-center" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <p className="text-gray-500 text-[11px]">© 2026 ПхукетGO. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
