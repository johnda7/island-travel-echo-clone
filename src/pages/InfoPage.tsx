import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const InfoPage = () => {
  const infoSections = [
    {
      icon: "❓",
      title: "Частые вопросы",
      description: "Ответы на популярные вопросы о турах, бронировании и экскурсиях",
      href: "/help/faq",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "📋",
      title: "Как забронировать",
      description: "Пошаговая инструкция по бронированию туров онлайн",
      href: "/help/booking",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "💳",
      title: "Оплата и возврат",
      description: "Способы оплаты, политика возврата и гарантии",
      href: "/help/payment",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "⭐",
      title: "Отзывы",
      description: "Реальные отзывы туристов о наших турах",
      href: "/reviews",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "📞",
      title: "Контакты",
      description: "Свяжитесь с нами через WhatsApp, Telegram или электронную почту",
      href: "/help/contacts",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: "🏢",
      title: "О компании",
      description: "Информация о нашей компании и команде",
      href: "/about",
      color: "from-gray-600 to-gray-700"
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F5F7FA 0%, #E8ECF1 100%)' }}>
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #1C1C1E 0%, #3C3C43 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              ℹ️ Информация
            </h1>
            <p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}
            >
              Полезная информация о турах, бронировании и наших услугах
            </p>
          </div>

          {/* Сетка с разделами */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {infoSections.map((section, index) => (
              <Link
                key={index}
                to={section.href}
                className="group block"
              >
                <div
                  className="h-full p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  {/* Иконка с градиентом */}
                  <div className="mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} text-white text-3xl shadow-lg`}
                      style={{
                        transform: 'translateZ(0)',
                      }}
                    >
                      {section.icon}
                    </div>
                  </div>

                  {/* Заголовок */}
                  <h2
                    className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      letterSpacing: '-0.02em',
                      color: '#1C1C1E'
                    }}
                  >
                    {section.title}
                  </h2>

                  {/* Описание */}
                  <p
                    className="text-gray-600 leading-relaxed"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '15px'
                    }}
                  >
                    {section.description}
                  </p>

                  {/* Стрелка */}
                  <div className="mt-4 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                      Перейти
                    </span>
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Дополнительная информация */}
          <div className="mt-12 text-center">
            <div
              className="inline-block p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
              }}
            >
              <p
                className="text-gray-700 mb-4"
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '15px'
                }}
              >
                Не нашли нужную информацию?
              </p>
              <Link
                to="/help/contacts"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}
              >
                <span>💬</span>
                <span>Свяжитесь с нами</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InfoPage;
