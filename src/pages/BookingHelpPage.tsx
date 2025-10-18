import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, MessageCircle, CreditCard, CheckCircle, Users, Clock, MapPin, Phone } from "lucide-react";

const BookingHelpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#007AFF] to-[#00C6FF] bg-clip-text text-transparent"
              style={{ 
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Как забронировать тур
            </h1>
            <p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Простая и быстрая инструкция по бронированию экскурсий на Пхукете
            </p>
          </div>

          {/* Main Content */}
          <div 
            className="mb-8 p-8 rounded-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.3)"
            }}
          >
            <p 
              className="text-gray-700 leading-relaxed mb-6"
              style={{ 
                fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "17px",
                lineHeight: "1.6"
              }}
            >
              Забронировать экскурсию у нас очень просто! Мы предлагаем два удобных способа бронирования — через сайт или через Telegram. Выберите понравившийся тур, укажите дату и количество человек, и мы подтвердим вашу бронь.
            </p>
          </div>

          {/* Booking Methods */}
          <div className="space-y-6 mb-12">
            {/* Method 1: Website */}
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(0, 122, 255, 0.05)",
                border: "2px solid rgba(0, 122, 255, 0.1)"
              }}
            >
              <div className="flex items-start mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)"
                  }}
                >
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 
                    className="text-2xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Способ 1: Через сайт
                  </h3>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Самый быстрый способ — прямо на странице тура
                  </p>
                </div>
              </div>

              <ol className="space-y-3 ml-16">
                <li 
                  className="text-gray-700"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px"
                  }}
                >
                  <strong className="text-[#007AFF]">1.</strong> Выберите экскурсию из каталога
                </li>
                <li 
                  className="text-gray-700"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px"
                  }}
                >
                  <strong className="text-[#007AFF]">2.</strong> Нажмите кнопку "Забронировать тур"
                </li>
                <li 
                  className="text-gray-700"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px"
                  }}
                >
                  <strong className="text-[#007AFF]">3.</strong> Укажите дату экскурсии и количество человек
                </li>
                <li 
                  className="text-gray-700"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px"
                  }}
                >
                  <strong className="text-[#007AFF]">4.</strong> Введите ваше имя и контакты (Telegram или WhatsApp)
                </li>
                <li 
                  className="text-gray-700"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px"
                  }}
                >
                  <strong className="text-[#007AFF]">5.</strong> Нажмите "Отправить заявку"
                </li>
              </ol>
            </div>

            {/* Method 2: Telegram */}
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(0, 198, 255, 0.05)",
                border: "2px solid rgba(0, 198, 255, 0.1)"
              }}
            >
              <div className="flex items-start mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #00C6FF 0%, #007AFF 100%)"
                  }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 
                    className="text-2xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Способ 2: Через Telegram
                  </h3>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Напишите нам напрямую и получите консультацию
                  </p>
                </div>
              </div>

              <ol className="space-y-3 ml-16 mb-4">
                <li 
                  className="text-gray-700"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px"
                  }}
                >
                  <strong className="text-[#00C6FF]">1.</strong> Нажмите на кнопку "Написать в Telegram" на любой странице
                </li>
                <li 
                  className="text-gray-700"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px"
                  }}
                >
                  <strong className="text-[#00C6FF]">2.</strong> Напишите какой тур вас интересует
                </li>
                <li 
                  className="text-gray-700"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px"
                  }}
                >
                  <strong className="text-[#00C6FF]">3.</strong> Укажите дату и количество человек
                </li>
                <li 
                  className="text-gray-700"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px"
                  }}
                >
                  <strong className="text-[#00C6FF]">4.</strong> Мы ответим и подтвердим бронирование
                </li>
              </ol>

              <a
                href="https://t.me/islandtravelth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-105 ml-16"
                style={{
                  background: "linear-gradient(135deg, #00C6FF 0%, #007AFF 100%)",
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                Написать в Telegram
              </a>
            </div>
          </div>

          {/* What Happens Next */}
          <div 
            className="mb-8 p-8 rounded-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.3)"
            }}
          >
            <h2 
              className="text-3xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Что происходит после бронирования?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-[#007AFF] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 
                    className="font-semibold text-gray-900 mb-1"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Подтверждение брони
                  </h4>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Мы свяжемся с вами в Telegram и подтвердим все детали экскурсии
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CreditCard className="w-6 h-6 text-[#007AFF] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 
                    className="font-semibold text-gray-900 mb-1"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Оплата
                  </h4>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Требуется полная предоплата. Принимаем наличные (THB, USD, EUR, RUB), карты Visa/MasterCard, переводы на тайский банк
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-[#007AFF] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 
                    className="font-semibold text-gray-900 mb-1"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    За день до тура
                  </h4>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Мы отправим точное время трансфера и контакты гида в Telegram
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-[#007AFF] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 
                    className="font-semibold text-gray-900 mb-1"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    В день тура
                  </h4>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Водитель заберет вас от отеля в указанное время. Просто ждите у входа!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div 
            className="mb-8 p-8 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(0, 198, 255, 0.1) 100%)",
              border: "2px solid rgba(0, 122, 255, 0.2)"
            }}
          >
            <h2 
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              💡 Важная информация
            </h2>

            <ul className="space-y-3">
              <li 
                className="flex items-start text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <span className="text-[#007AFF] mr-2 font-bold">•</span>
                <span>Бронирование подтверждается после полной предоплаты</span>
              </li>
              <li 
                className="flex items-start text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <span className="text-[#007AFF] mr-2 font-bold">•</span>
                <span>Бесплатная отмена за 24 часа до начала тура</span>
              </li>
              <li 
                className="flex items-start text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <span className="text-[#007AFF] mr-2 font-bold">•</span>
                <span>Трансфер от вашего отеля включен в стоимость</span>
              </li>
              <li 
                className="flex items-start text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <span className="text-[#007AFF] mr-2 font-bold">•</span>
                <span>Страховка включена во все туры</span>
              </li>
              <li 
                className="flex items-start text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <span className="text-[#007AFF] mr-2 font-bold">•</span>
                <span>Русскоговорящие гиды на многих экскурсиях</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div 
            className="text-center p-8 rounded-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.3)"
            }}
          >
            <h3 
              className="text-2xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Готовы забронировать тур?
            </h3>
            <p 
              className="text-gray-600 mb-6"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Выберите понравившуюся экскурсию или напишите нам для консультации
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#/tours"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)",
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                Выбрать экскурсию
              </a>
              <a
                href="https://t.me/islandtravelth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
                style={{
                  background: "rgba(0, 122, 255, 0.1)",
                  color: "#007AFF",
                  border: "2px solid #007AFF",
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Получить консультацию
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingHelpPage;
