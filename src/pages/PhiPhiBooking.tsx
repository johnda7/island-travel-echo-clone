import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';

const PhiPhiBooking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link 
          to="/excursion/phi-phi-2-days-1-night" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к экскурсии
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Бронирование тура Пхи-Пхи
          </h1>
          
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-600">
              Для бронирования данной экскурсии свяжитесь с нами через Telegram
            </p>
            
            <a 
              href="https://t.me/phuketGoo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Связаться в Telegram
            </a>
            
            <p className="text-sm text-gray-500 mt-4">
              Наши менеджеры ответят в течение нескольких минут
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PhiPhiBooking;