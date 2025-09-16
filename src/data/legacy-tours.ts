// Временные legacy данные для обратной совместимости
// Будут удалены после полной миграции на новую систему

export interface LegacyTour {
  id: number;
  title: string;
  location: string;
  duration: string;
  group: string;
  dates: string;
  price: string;
  originalPrice?: string;
  priceAdult?: number;
  priceChild?: number;
  currency?: string;
  rating: number;
  reviews: number;
  image: string;
  gallery?: string[];
  highlights: string[];
  description: string;
  featured: boolean;
  category: string;
  slug: string;
  bookingsToday?: number;
  popular?: boolean;
}

// Минимальный набор данных для совместимости
export const legacyToursData: LegacyTour[] = [
  {
    id: 4,
    title: "Пхи-Пхи 2 дня / 1 ночь",
    location: "Острова Пхи-Пхи",
    duration: "2 дня",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "4,000 ฿ взр. / 3,500 ฿ дети",
    priceAdult: 4000,
    priceChild: 3500,
    currency: "฿",
    rating: 4.8,
    reviews: 53,
    image: "/src/assets/phi-phi-maya-bay.jpg",
    highlights: ["Майя Бэй", "Огненное шоу", "Ночь на острове"],
    description: "Двухдневное приключение на островах Пхи-Пхи с ночёвкой на острове.",
    featured: true,
    category: "overnight",
    slug: "phi-phi-2-days-1-night"
  }
];

// Legacy функции
export const getLegacyTourBySlug = (slug: string): LegacyTour | undefined => {
  return legacyToursData.find(tour => tour.slug === slug);
};