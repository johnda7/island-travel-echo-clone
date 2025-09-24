import { ShieldCheck, ThumbsUp, DollarSign, Users } from "lucide-react";

const advantages = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    title: "Безопасность и поддержка",
    description: "Круглосуточная поддержка и страховка для всех клиентов."
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-cyan-600" />,
    title: "Лучшие цены",
    description: "Гарантия лучшей цены на туры и экскурсии."
  },
  {
    icon: <DollarSign className="w-8 h-8 text-green-600" />,
    title: "Прозрачная оплата",
    description: "Удобные и безопасные способы оплаты без скрытых комиссий."
  },
  {
    icon: <Users className="w-8 h-8 text-blue-400" />,
    title: "Проверенные гиды",
    description: "Только опытные и сертифицированные гиды."
  }
];

export const Advantages = () => (
  <section className="py-16 bg-gradient-to-b from-blue-50 to-cyan-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Наши преимущества
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Почему выбирают нас для путешествий и экскурсий по Пхукету
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {advantages.map((adv, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
            <div className="mb-4">{adv.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-700">{adv.title}</h3>
            <p className="text-gray-600 text-base">{adv.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
