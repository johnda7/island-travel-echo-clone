import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MessageCircle, Clock, Send } from "lucide-react";

const ContactPage = () => {
  return (
    <div 
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #F5F7FA 0%, #E8ECF1 100%)"
      }}
    >
      <Header />
      
      {/* Hero Section - iOS 26 */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Свяжитесь с нами
            </h1>
            <p 
              className="text-lg text-gray-600 mb-6"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Мы на Пхукете и всегда на связи! Ответим на любые вопросы о турах, 
              ценах и бронировании ⚡
            </p>
          </div>
        </div>
      </section>

      {/* Telegram Contact Card - iOS 26 Glass */}
      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <a
            href="https://t.me/Phuketga"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div
              className="p-8 rounded-3xl transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                boxShadow: "0 8px 32px rgba(0, 122, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
                border: "2px solid rgba(0, 122, 255, 0.3)"
              }}
            >
              <div className="flex items-center gap-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)",
                    boxShadow: "0 8px 24px rgba(0, 122, 255, 0.4)"
                  }}
                >
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 
                    className="text-2xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Telegram (основной контакт)
                  </h2>
                  <p 
                    className="text-3xl font-semibold mb-2"
                    style={{ 
                      color: "#007AFF",
                      fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    @Phuketga
                  </p>
                  <p 
                    className="text-base text-gray-600"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    💬 Быстрое бронирование • Вся информация о турах • Ответы на все вопросы
                  </p>
                </div>
                <Send className="w-6 h-6 text-blue-500 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Working Hours - iOS 26 */}
      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div
            className="p-8 rounded-3xl"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(0, 0, 0, 0.08)"
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)",
                  boxShadow: "0 4px 16px rgba(0, 122, 255, 0.3)"
                }}
              >
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                Часы работы
              </h2>
            </div>
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(0, 122, 255, 0.1)",
                border: "1px solid rgba(0, 122, 255, 0.2)"
              }}
            >
              <p 
                className="text-lg text-gray-800 text-center font-semibold"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                ⚡ Работаем ежедневно с 9:00 до 21:00
              </p>
              <p 
                className="text-sm text-gray-600 text-center mt-2"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                Пишите в любое время — ответим при первой возможности!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div 
            className="text-center p-10 rounded-3xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(0, 198, 255, 0.1) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow: "0 8px 32px rgba(0, 122, 255, 0.15)",
              border: "2px solid rgba(0, 122, 255, 0.2)"
            }}
          >
            <h3 
              className="text-3xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Готовы забронировать тур?
            </h3>
            <p 
              className="text-lg text-gray-600 mb-6 max-w-xl mx-auto"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Напишите нам в Telegram! Расскажем о турах и поможем с бронированием.
            </p>
            <a
              href="https://t.me/Phuketga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-200 hover:shadow-2xl hover:scale-110 group"
              style={{
                background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)",
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                boxShadow: "0 4px 16px rgba(0, 122, 255, 0.3)"
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 group-hover:scale-125 transition-all duration-300" />
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
