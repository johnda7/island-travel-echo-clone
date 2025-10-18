import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "Как забронировать тур?",
      answer: "Вы можете забронировать тур прямо на сайте через форму бронирования на странице тура, или связаться с нами через Telegram. Мы ответим быстро и подтвердим вашу бронь."
    },
    {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Мы принимаем оплату наличными (THB, USD, EUR, RUB), банковскими картами Visa/MasterCard, а также переводом на тайский банк. Требуется полная предоплата за экскурсию."
    },
    {
      question: "Можно ли отменить или перенести тур?",
      answer: "Да, вы можете отменить или перенести тур бесплатно за 24 часа до начала. При отмене менее чем за 24 часа возможны штрафные санкции в зависимости от тура."
    },
    {
      question: "Включена ли страховка в стоимость?",
      answer: "Да, базовая туристическая страховка включена во все наши туры. Она покрывает основные риски во время экскурсии. Для дополнительной защиты рекомендуем оформить расширенную страховку самостоятельно."
    },
    {
      question: "Где место встречи? Как вас найти?",
      answer: "Мы предоставляем бесплатный трансфер от вашего отеля или виллы! Вам не нужно никуда ехать — наш водитель заберет вас утром и привезет обратно после тура. Точное время сообщим накануне."
    },
    {
      question: "Во сколько начинается экскурсия?",
      answer: "Время начала зависит от тура и вашего расположения. Обычно забираем туристов с 7:00 до 9:00 утра. Мы составляем расписание так, чтобы избежать толп туристов и показать вам лучшие места в идеальное время."
    },
    {
      question: "Какое питание входит в тур?",
      answer: "В зависимости от тура: завтрак (фрукты, кофе, чай), обед (тайская кухня, морепродукты, мясо, вегетарианские блюда), ужин на некоторых турах. Всегда есть питьевая вода в неограниченном количестве."
    },
    {
      question: "Что если будет дождь или шторм?",
      answer: "Небольшой дождь не отменяет экскурсию — это тропики, и дождь здесь идет 10-20 минут. Мы отменяем туры только при сильных волнах или тропическом шторме по рекомендации береговой охраны. В этом случае вернем 100% стоимости или перенесем на другой день."
    },
    {
      question: "Есть ли ограничения для участия в морских турах?",
      answer: "Да, некоторые ограничения есть для вашей безопасности:\n\n• Беременным женщинам не рекомендуем морские экскурсии на спидботах\n• Дети до 1 года — только после консультации с нами\n• При проблемах со спиной, шеей или сердцем — сообщите заранее, мы подберем более спокойный тур\n• Для рафтинга минимальный возраст 5 лет"
    },
    {
      question: "Что взять с собой на экскурсию?",
      answer: "Рекомендуем взять:\n\n• Купальник и полотенце\n• Солнцезащитный крем (лучше водостойкий)\n• Головной убор и солнцезащитные очки\n• Легкую сменную одежду\n• Деньги на сувениры и личные расходы\n• Водонепроницаемый чехол для телефона (можно купить на месте)\n\nСпасательные жилеты, маски для снорклинга предоставляем мы."
    },
    {
      question: "Как связаться с гидом в день экскурсии?",
      answer: "За день до тура мы отправим вам в Telegram контакты гида и точное время трансфера. У гида всегда работает телефон, он говорит на русском и английском языках. Вы сможете связаться в любой момент."
    }
  ];

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
              Часто задаваемые вопросы
            </h1>
            <p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Ответы на самые популярные вопросы о наших турах и экскурсиях на Пхукете
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl transition-all duration-300"
                style={{
                  background: openIndex === index 
                    ? "rgba(0, 122, 255, 0.9)"
                    : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  boxShadow: openIndex === index
                    ? "0 8px 32px rgba(0, 122, 255, 0.2)"
                    : "0 2px 12px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.3)"
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200"
                  style={{
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  <span
                    className={`text-lg font-semibold transition-colors duration-200 ${
                      openIndex === index ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-all duration-300 flex-shrink-0 ml-4 ${
                      openIndex === index 
                        ? "rotate-180 text-white" 
                        : "text-[#007AFF]"
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index 
                      ? "max-h-[800px] opacity-100" 
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p
                      className="text-white leading-relaxed whitespace-pre-line"
                      style={{ 
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "16px",
                        lineHeight: "1.6"
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div 
            className="mt-12 text-center p-8 rounded-2xl"
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
              Не нашли ответ на свой вопрос?
            </h3>
            <p 
              className="text-gray-600 mb-6"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Напишите нам в Telegram, и мы скоро ответим!
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

export default FAQPage;
