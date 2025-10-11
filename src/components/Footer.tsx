import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logoImage from "@/assets/logo.jpg";

export const Footer = () => {
  return (
    <footer 
      style={{ 
        background: 'rgb(242, 242, 247)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)'
      }} 
      className="text-gray-900"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="grid md:grid-cols-1 gap-3 justify-center">
          {/* Company Info */}
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2.5 mb-2 group">
              <div 
                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-black text-base transition-all duration-150"
                style={{ 
                  background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.18)'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.filter = 'brightness(0.85)';
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.filter = 'brightness(0.85)';
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span className="text-white">GO</span>
              </div>
              <span className="text-xl font-bold transition-all duration-150" style={{ 
                background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Пхукет Go
              </span>
            </Link>
            <p className="text-gray-600 mb-0 leading-snug max-w-lg mx-auto text-xs">
              Создаем незабываемые путешествия к самым красивым местам Пхукета и Таиланда. 
              Ваша мечта о райском отдыхе станет реальностью с нами.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
