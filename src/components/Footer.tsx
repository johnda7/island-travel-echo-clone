import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logoImage from "@/assets/logo.jpg";

export const Footer = () => {
  return (
    <footer style={{ background: '#1C1C1E' }} className="text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-1 gap-8 justify-center">
          {/* Company Info */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden" style={{ 
                background: 'linear-gradient(135deg, #8E8E93 0%, #636366 100%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}>
                <img 
                  src={logoImage} 
                  alt="Phuket Go Logo" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-40"
                />
              </div>
              <span className="text-2xl font-bold" style={{ 
                background: 'linear-gradient(135deg, #8E8E93 0%, #636366 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Пхукет Go
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Создаем незабываемые путешествия к самым красивым местам Пхукета и Таиланда. 
              Ваша мечта о райском отдыхе станет реальностью с нами.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
