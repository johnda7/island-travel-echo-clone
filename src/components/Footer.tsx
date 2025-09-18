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
    </footer>
  );
};
