import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: listRef, isVisible: listVisible } = useScrollReveal();
  
  return (
    <section className="py-6 md:py-10 relative overflow-hidden">
      {/* iOS 26 Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header - iOS 26 Style */}
        <div 
          ref={headerRef}
          className={`flex items-center gap-2 mb-6 scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div 
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
              boxShadow: '0 4px 12px rgba(52, 199, 89, 0.35)'
            }}
          >
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <h2 
            className="text-xl md:text-2xl font-bold"
            style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif", color: '#1C1C1E' }}
          >
            Частые вопросы
          </h2>
        </div>
        
        {/* FAQ Items - Liquid Glass Cards */}
        <div 
          ref={listRef}
          className={`max-w-2xl mx-auto space-y-3 scroll-reveal-stagger ${listVisible ? 'is-visible' : ''}`}
        >
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: openIdx === idx 
                  ? 'rgba(0, 122, 255, 0.08)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: openIdx === idx 
                  ? '1px solid rgba(0, 122, 255, 0.2)'
                  : '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: openIdx === idx 
                  ? '0 4px 20px rgba(0, 122, 255, 0.15)'
                  : '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <button
                className="w-full flex justify-between items-center px-5 py-4 text-left"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span 
                  className="font-semibold text-[15px] pr-4"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif",
                    color: openIdx === idx ? '#007AFF' : '#1C1C1E'
                  }}
                >
                  {faq.question}
                </span>
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: openIdx === idx 
                      ? 'rgba(0, 122, 255, 0.15)'
                      : 'rgba(0, 0, 0, 0.05)',
                    transform: openIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  <ChevronDown 
                    className="w-4 h-4" 
                    style={{ color: openIdx === idx ? '#007AFF' : '#8E8E93' }}
                  />
                </div>
              </button>
              
              {/* Answer - Smooth expand */}
              <div 
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIdx === idx ? '200px' : '0',
                  opacity: openIdx === idx ? 1 : 0
                }}
              >
                <p 
                  className="px-5 pb-4 text-[14px] leading-relaxed"
                  style={{ 
                    fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif",
                    color: '#636366'
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}