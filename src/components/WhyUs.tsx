import { MapPin, Shield, Clock, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const benefits = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Местные гиды",
    description: "Русскоговорящие гиды, знающие все секретные места",
    color: "#007AFF"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Честные цены",
    description: "Без скрытых доплат и посредников",
    color: "#34C759"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Поддержка 24/7",
    description: "Всегда на связи в Telegram и WhatsApp",
    color: "#FF9500"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Забота о вас",
    description: "Индивидуальный подход к каждому гостю",
    color: "#FF2D55"
  }
];

export const WhyUs = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();
  
  return (
    <section className="py-10 relative overflow-hidden">
      {/* iOS 26 Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-6 scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 
            className="text-xl md:text-2xl font-bold mb-2"
            style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif", color: '#1C1C1E' }}
          >
            Почему выбирают нас
          </h2>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
          >
            Более 5000 довольных туристов
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div 
          ref={gridRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 scroll-reveal-stagger ${gridVisible ? 'is-visible' : ''}`}
        >
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl text-center transition-all duration-300 active:scale-[0.98]"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ 
                  background: `${benefit.color}15`,
                  color: benefit.color
                }}
              >
                {benefit.icon}
              </div>
              
              {/* Title */}
              <h3 
                className="text-[14px] font-semibold mb-1"
                style={{ 
                  fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif",
                  color: '#1C1C1E'
                }}
              >
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p 
                className="text-[12px] leading-relaxed"
                style={{ 
                  fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif",
                  color: '#8E8E93'
                }}
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
