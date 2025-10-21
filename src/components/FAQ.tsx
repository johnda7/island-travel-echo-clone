import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Как забронировать тур?",
    answer: "Выберите интересующий тур, нажмите 'Забронировать' и заполните форму. Наш менеджер свяжется с вами для подтверждения."
  },
  {
    question: "Какие способы оплаты доступны?",
    answer: "Вы можете оплатить тур онлайн, банковской картой или наличными при встрече с гидом."
  },
  {
    question: "Есть ли страховка для участников?",
    answer: "Да, все участники туров застрахованы на время экскурсии."
  }
];

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="relative py-24 bg-gradient-to-b from-cyan-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-indigo-300 rounded-full animate-pulse delay-2500"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent" style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}>
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}>
            Всё, что нужно знать о турах, пляжах и сервисе
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="mb-4 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <button
                className={`w-full flex justify-between items-center backdrop-blur-[20px] saturate-[180%] ${openIdx === idx ? 'bg-[#007AFF]/90' : 'bg-white/90'} rounded-lg shadow-lg px-6 py-4 text-left font-semibold ${openIdx === idx ? 'text-white' : 'text-gray-900'} hover:shadow-xl transition-all duration-300 border border-white/30`}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}
              >
                {faq.question}
                <ChevronDown className={`w-5 h-5 ml-2 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === idx && (
                <div className="px-6 py-4 text-gray-700 backdrop-blur-[20px] saturate-[180%] bg-white/80 rounded-b-lg border-x border-b border-white/30 animate-slideDown" style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
