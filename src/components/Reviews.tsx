import { Star } from "lucide-react";

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
    avatar: "https://randomuser.me/api/portraits/men/65.jpg"
  }
];

export const Reviews = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Отзывы клиентов
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Реальные впечатления наших гостей о турах и пляжах Пхукета
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300">
            <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full mb-4 border-4 border-white shadow" />
            <h3 className="text-lg font-semibold mb-2 text-blue-700">{review.name}</h3>
            <p className="text-gray-700 mb-3">{review.text}</p>
            <div className="flex items-center gap-1">
              {[...Array(Math.round(review.rating))].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-blue-600 font-bold">{review.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
