import { ShieldCheck, ThumbsUp, DollarSign, Users, Sparkles } from "lucide-react";

const advantages = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-emerald-400" />,
    title: "Безопасность и поддержка",
    description: "Круглосуточная поддержка и страховка для всех клиентов.",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    icon: <ThumbsUp className="w-10 h-10 text-cyan-400" />,
    title: "Лучшие цены",
    description: "Гарантия лучшей цены на туры и экскурсии.",
    gradient: "from-cyan-500/20 to-blue-500/20"
  },
  {
    icon: <DollarSign className="w-10 h-10 text-yellow-400" />,
    title: "Прозрачная оплата",
    description: "Удобные и безопасные способы оплаты без скрытых комиссий.",
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    icon: <Users className="w-10 h-10 text-violet-400" />,
    title: "Проверенные гиды",
    description: "Только опытные и сертифицированные гиды.",
    gradient: "from-violet-500/20 to-purple-500/20"
  }
];

export const Advantages = () => (
  <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
    {/* Animated Background Effects */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-300 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-violet-300 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-4000"></div>
      </div>
    </div>

    <div className="relative z-10 container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-yellow-400 mr-3 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
            Наши преимущества
          </h2>
          <Sparkles className="w-8 h-8 text-yellow-400 ml-3 animate-pulse delay-500" />
        </div>
        <p className="text-xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
          Почему выбирают нас для <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent font-semibold">путешествий и экскурсий</span> по Пхукету
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {advantages.map((adv, idx) => (
          <div 
            key={idx} 
            className={`group relative flex flex-col items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 animate-fade-in`}
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${adv.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            {/* Icon Container */}
            <div className="relative z-10 mb-6 p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
              {adv.icon}
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-white transition-colors duration-300">
                {adv.title}
              </h3>
              <p className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {adv.description}
              </p>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-indigo-500/0 group-hover:from-cyan-500/20 group-hover:via-blue-500/20 group-hover:to-indigo-500/20 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute top-10 left-10 opacity-10">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 animate-pulse"></div>
    </div>
    <div className="absolute bottom-20 right-10 opacity-10">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 animate-pulse delay-1000"></div>
    </div>
  </section>
);
