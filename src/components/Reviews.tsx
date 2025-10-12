import { Star } from "lucide-react";
import igorAvatar from "@/assets/igor-avatar.jpg";

const reviews = [
  {
    name: "Алексей П.",
    text: "Отличная организация тура! Всё было четко, интересно и безопасно. Рекомендую!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Мария К.",
    text: "Пляжи просто супер, гиды профессионалы, сервис на высоте!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Игорь С.",
    text: "Очень понравился тур на Пхи-Пхи, всё удобно и красиво!",
    rating: 4.8,
    avatar: igorAvatar
  }
];

export const Reviews = () => (
  <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-40 h-40 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
    </div>
    
    <div className="relative z-10 container mx-auto px-4">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent" style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}>
          Отзывы клиентов
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}>
          Реальные впечатления наших гостей о турах и пляжах Пхукета
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <div 
            key={idx} 
            className="relative backdrop-blur-[20px] saturate-[180%] bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/30 animate-fade-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <img src={review.avatar} alt={review.name} className="w-20 h-20 rounded-full mb-4 border-4 border-white shadow-lg" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900" style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}>{review.name}</h3>
            <p className="text-gray-700 mb-4" style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}>{review.text}</p>
            <div className="flex items-center gap-1">
              {[...Array(Math.round(review.rating))].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-blue-600 font-bold">{review.rating}</span>
            </div>
            
            {/* Liquid Glass highlight */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
