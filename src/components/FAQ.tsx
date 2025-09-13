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
    question: "Можно ли отменить или перенести тур?",
    answer: "Да, вы можете отменить или перенести тур за 24 часа до начала без штрафов."
  },
  {
    question: "Есть ли страховка для участников?",
    answer: "Да, все участники туров застрахованы на время экскурсии."
  }
];

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="py-16 bg-gradient-to-b from-cyan-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Часто задаваемые вопросы
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Всё, что нужно знать о турах, пляжах и сервисе
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="mb-4">
              <button
                className="w-full flex justify-between items-center bg-white rounded-lg shadow px-6 py-4 text-left font-medium text-blue-700 hover:bg-blue-50 transition-all"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                {faq.question}
                <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === idx && (
                <div className="px-6 py-4 text-gray-700 bg-blue-50 rounded-b-lg">
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
