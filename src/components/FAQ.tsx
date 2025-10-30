import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
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
  }
];

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="relative py-12 bg-white overflow-hidden">
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#007AFF]" style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}>
            Часто задаваемые вопросы
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}>
            Ответы на самые популярные вопросы о наших турах и экскурсиях на Пхукете
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="mb-3 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <button
                className={`w-full flex justify-between items-center ${openIdx === idx ? 'bg-[#007AFF]' : 'bg-white'} rounded-2xl shadow-md px-5 py-4 text-left font-semibold ${openIdx === idx ? 'text-white' : 'text-gray-900'} hover:shadow-lg transition-all duration-300 border ${openIdx === idx ? 'border-[#007AFF]' : 'border-gray-200'}`}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}
              >
                {faq.question}
                <ChevronDown className={`w-5 h-5 ml-2 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === idx && (
                <div className="px-5 py-4 text-gray-700 bg-[#007AFF] text-white rounded-b-2xl animate-slideDown" style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}>
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
