import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CreditCard, Wallet, Building2, Shield, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

const PaymentHelpPage = () => {
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
              Оплата и возврат
            </h1>
            <p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Все способы оплаты и условия возврата средств
            </p>
          </div>

          {/* Payment Methods Section */}
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
              💳 Способы оплаты
            </h2>

            <div className="space-y-4">
              {/* Payment Method 1 */}
              <div 
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(0, 122, 255, 0.05)",
                  border: "1px solid rgba(0, 122, 255, 0.1)"
                }}
              >
                <div className="flex items-start">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)"
                    }}
                  >
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Банковские карты
                    </h3>
                    <p 
                      className="text-gray-600 mb-2"
                      style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Принимаем карты Visa, MasterCard и Мир
                    </p>
                    <ul className="space-y-1">
                      <li 
                        className="text-gray-600 text-sm flex items-center"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#007AFF] mr-2 flex-shrink-0" />
                        Оплата онлайн при бронировании
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Method 2 */}
              <div 
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(0, 198, 255, 0.05)",
                  border: "1px solid rgba(0, 198, 255, 0.1)"
                }}
              >
                <div className="flex items-start">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #00C6FF 0%, #007AFF 100%)"
                    }}
                  >
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Наличные
                    </h3>
                    <p 
                      className="text-gray-600 mb-2"
                      style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Принимаем несколько валют
                    </p>
                    <ul className="space-y-1">
                      <li 
                        className="text-gray-600 text-sm flex items-center"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00C6FF] mr-2 flex-shrink-0" />
                        THB (тайский бат)
                      </li>
                      <li 
                        className="text-gray-600 text-sm flex items-center"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00C6FF] mr-2 flex-shrink-0" />
                        USD (доллары США)
                      </li>
                      <li 
                        className="text-gray-600 text-sm flex items-center"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00C6FF] mr-2 flex-shrink-0" />
                        EUR (евро)
                      </li>
                      <li 
                        className="text-gray-600 text-sm flex items-center"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00C6FF] mr-2 flex-shrink-0" />
                        RUB (российские рубли)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Method 3 - USDT */}
              <div 
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(0, 122, 255, 0.05)",
                  border: "1px solid rgba(0, 122, 255, 0.1)"
                }}
              >
                <div className="flex items-start">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)"
                    }}
                  >
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      USDT (криптовалюта)
                    </h3>
                    <p 
                      className="text-gray-600 mb-2"
                      style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Принимаем стейблкоин USDT
                    </p>
                    <ul className="space-y-1">
                      <li 
                        className="text-gray-600 text-sm flex items-center"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#007AFF] mr-2 flex-shrink-0" />
                        Адрес кошелька отправим после бронирования
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Method 4 */}
              <div 
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(0, 122, 255, 0.05)",
                  border: "1px solid rgba(0, 122, 255, 0.1)"
                }}
              >
                <div className="flex items-start">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)"
                    }}
                  >
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Банковский перевод
                    </h3>
                    <p 
                      className="text-gray-600 mb-2"
                      style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Перевод на тайский банковский счет
                    </p>
                    <ul className="space-y-1">
                      <li 
                        className="text-gray-600 text-sm flex items-center"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#007AFF] mr-2 flex-shrink-0" />
                        Реквизиты отправим после бронирования
                      </li>
                      <li 
                        className="text-gray-600 text-sm flex items-center"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#007AFF] mr-2 flex-shrink-0" />
                        Без комиссии при переводе из Таиланда
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Conditions */}
          <div 
            className="mb-8 p-8 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(0, 198, 255, 0.1) 100%)",
              border: "2px solid rgba(0, 122, 255, 0.2)"
            }}
          >
            <div className="flex items-start mb-4">
              <Shield className="w-8 h-8 text-[#007AFF] mr-3 flex-shrink-0" />
              <div>
                <h2 
                  className="text-2xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  Условия оплаты
                </h2>
                <ul className="space-y-2">
                  <li 
                    className="text-gray-700"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    <strong className="text-[#007AFF]">•</strong> Требуется полная предоплата для подтверждения бронирования
                  </li>
                  <li 
                    className="text-gray-700"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    <strong className="text-[#007AFF]">•</strong> После оплаты вы получите подтверждение на email или в Telegram
                  </li>
                  <li 
                    className="text-gray-700"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    <strong className="text-[#007AFF]">•</strong> Курс валют при оплате наличными по курсу на день экскурсии
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
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
            <div className="flex items-start mb-6">
              <RefreshCw className="w-8 h-8 text-[#007AFF] mr-3 flex-shrink-0" />
              <h2 
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                Правила отмены и возврата
              </h2>
            </div>

            {/* Refund Rules */}
            <div className="space-y-6">
              {/* Illness */}
              <div 
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(255, 193, 7, 0.1)",
                  border: "2px solid rgba(255, 193, 7, 0.3)"
                }}
              >
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Отмена по болезни
                    </h3>
                    <p 
                      className="text-gray-700 mb-3"
                      style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      При предоставлении справки из госпиталя Пхукета:
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li 
                        className="text-gray-600"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        • Отмена — <strong className="text-green-600">полный возврат</strong>
                      </li>
                      <li 
                        className="text-gray-600"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        • Перенос — <strong className="text-green-600">бесплатно</strong>
                      </li>
                      <li 
                        className="text-gray-600 text-sm mt-2"
                        style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                      >
                        <em>* Перенос возможен только для заболевшего и одного сопровождающего взрослого</em>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
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
              ⚠️ Важная информация
            </h2>
            <ul className="space-y-2">
              <li 
                className="text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <strong className="text-[#007AFF]">•</strong> Возврат средств осуществляется тем же способом, которым была произведена оплата
              </li>
              <li 
                className="text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <strong className="text-[#007AFF]">•</strong> Срок возврата на карту — от 3 до 10 рабочих дней
              </li>
              <li 
                className="text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <strong className="text-[#007AFF]">•</strong> Возврат наличных — в день отмены или в течение 24 часов
              </li>
              <li 
                className="text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <strong className="text-[#007AFF]">•</strong> При отмене экскурсии по погодным условиям — полный возврат 100%
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
              Остались вопросы по оплате?
            </h3>
            <p 
              className="text-gray-600 mb-6"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Напишите нам в Telegram, и мы подробно все расскажем!
            </p>
            <a
              href="https://t.me/Phuketga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)",
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
      </main>

      <Footer />
    </div>
  );
};

export default PaymentHelpPage;
