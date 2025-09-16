import { Tour } from "../types/tour";
import { phiPhi2Days1Night } from "./tours/phi-phi-2-days-1-night";
import phiPhiMayaBay from "../assets/phi-phi-maya-bay.jpg";

export const tours: Tour[] = [
  phiPhi2Days1Night,
];

export const getTourBySlug = (slug: string): Tour | undefined => {
  return tours.find(tour => tour.slug === slug);
};

export const getFeaturedTours = (): Tour[] => {
  return tours.filter(tour => tour.featured && tour.status === "active");
};

export interface LegacyTour {
  id: number;
  title: string;
  location: string;
  duration: string;
  group: string;
  dates: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  highlights: string[];
  description: string;
  featured: boolean;
  category: string;
  slug: string;
  bookingsToday: number;
  popular?: boolean;
}

export const toursData: LegacyTour[] = [
  {
    id: 1,
    title: "Пхи-Пхи 2 дня / 1 ночь",
    location: "Острова Пхи-Пхи",
    duration: "2 дня",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "4,000 ฿ взр. / 3,500 ฿ дети",
    originalPrice: "4,500 ฿",
    rating: 4.8,
    reviews: 53,
    image: phiPhiMayaBay,
    highlights: ["Майя Бэй", "Ночь на острове", "Огненное шоу"],
    description: "Путешествие на острова Пхи-Пхи с ночёвкой — это уникальная возможность увидеть самые красивые места Андаманского моря.",
    featured: true,
    category: "marine",
    slug: "phi-phi-2-days-1-night",
    bookingsToday: 6,
    popular: true
  },
  {
    id: 2,
    title: "Острова Пхи-Пхи на спидботе",
    location: "Острова Пхи-Пхи",
    duration: "8 часов",
    group: "До 35 человек",
    dates: "Круглый год",
    price: "2,890 ₽",
    originalPrice: "3,200 ₽",
    rating: 4.8,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    highlights: ["Майя Бей", "Пиле Лагуна", "Обезьяний пляж", "Снорклинг"],
    description: "Отправляйтесь на скоростной лодке к знаменитым островам Пхи-Пхи. Посетите Майя Бей, Пиле Лагуну и насладитесь снорклингом в кристально чистых водах.",
    featured: true,
    category: "marine", 
    slug: "phi-phi-islands-speedboat",
    bookingsToday: 15
  },
  {
    id: 3,
    title: "Остров Джеймса Бонда",
    location: "Пханг Нга",
    duration: "8 часов",
    group: "До 40 человек",
    dates: "Круглый год",
    price: "2,500 ₽",
    originalPrice: "2,800 ₽",
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80",
    highlights: ["Остров Джеймса Бонда", "Каноэ", "Мангровые заросли", "Плавучая деревня"],
    description: "Посетите легендарный остров из фильма о Джеймсе Бонде. Каноэ в мангровых зарослях и знакомство с плавучей деревней.",
    featured: true,
    category: "marine",
    slug: "james-bond-island", 
    bookingsToday: 12
  },
  {
    id: 4,
    title: "Коралловый остров + Парасейлинг",
    location: "Коралловый остров",
    duration: "6 часов",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "2,200 ₽",
    originalPrice: "2,500 ₽",
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Парасейлинг", "Водные виды спорта", "Белоснежные пляжи", "Снорклинг"],
    description: "Активный день на Коралловом острове: парасейлинг, водные виды спорта и релакс на белоснежных пляжах.",
    featured: true,
    category: "adventure",
    slug: "coral-island-parasailing",
    bookingsToday: 8
  },
  {
    id: 6,
    title: "4 жемчужины Андаманского моря",
    location: "Андаманское море",
    duration: "2 дня / 1 ночь",
    group: "До 25 человек",
    dates: "Круглый год",
    price: "4,700 ฿ взр. / 4,200 ฿ дети",
    originalPrice: "5,200 ฿",
    rating: 4.8,
    reviews: 289,
    image: phiPhiMayaBay,
    highlights: ["VIP-сервис", "4 эксклюзивные локации", "Романтический ужин", "Профессиональная фотосъемка"],
    description: "Роскошное двухдневное путешествие по самым красивым и нетронутым уголкам региона с VIP-сервисом.",
    featured: true,
    category: "marine",
    slug: "four-pearls-andaman",
    bookingsToday: 12
  },
  {
    id: 7,
    title: "Остров Рача Яй",
    location: "Остров Рача Яй",
    duration: "8 часов",
    group: "До 35 человек",
    dates: "Круглый год",
    price: "2,400 ₽",
    originalPrice: "2,700 ₽",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Кристально чистая вода", "Снорклинг", "Пляж Батон Бэй", "Релакс"],
    description: "Поездка на живописный остров Рача Яй с кристально чистой водой, идеальный для снорклинга и отдыха.",
    featured: true,
    category: "marine",
    slug: "racha-yai-island",
    bookingsToday: 7
  },
  {
    id: 8,
    title: "Майя Бей на рассвете",
    location: "Острова Пхи-Пхи",
    duration: "6 часов",
    group: "До 20 человек",
    dates: "Круглый год",
    price: "3,500 ₽",
    originalPrice: "4,000 ₽",
    rating: 4.9,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Рассвет в Майя Бей", "Минимум туристов", "Профессиональные фото", "Эксклюзивный доступ"],
    description: "Эксклюзивная поездка в Майя Бей на рассвете, когда туристов минимум и можно насладиться красотой в тишине.",
    featured: true,
    category: "marine",
    slug: "maya-bay-sunrise",
    bookingsToday: 5
  },
  {
    id: 9,
    title: "Пхи-Пхи Ле и лагуна",
    location: "Острова Пхи-Пхи",
    duration: "7 часов",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "2,800 ₽",
    originalPrice: "3,100 ₽",
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=800&q=80",
    highlights: ["Пхи-Пхи Ле", "Изумрудная лагуна", "Викинг пещера", "Снорклинг"],
    description: "Исследование острова Пхи-Пхи Ле с посещением знаменитой Изумрудной лагуны и Викинг пещеры.",
    featured: false,
    category: "marine",
    slug: "koh-phi-phi-leh-lagoon",
    bookingsToday: 3
  },
  {
    id: 10,
    title: "11 ОСТРОВОВ МЕГА-ТУР | ОДИН ЭПИЧНЫЙ ДЕНЬ",
    location: "Краби - Пхи-Пхи - Пханг Нга",
    duration: "Полный день (11 часов)",
    group: "До 35 человек",
    dates: "Ноябрь - Апрель",
    price: "от 3,900 ฿",
    originalPrice: "4,500 ฿",
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    highlights: ["Остров Джеймса Бонда", "Остров Хонг", "Острова Пхи-Пхи", "Майя Бей", "Лагуна Пиле", "Каноэ", "Обед на воде"],
    description: "Грандиозный тур на 11 островов за один день: Джеймс Бонд, Пхи-Пхи, Хонг и другие жемчужины Андаманского моря. Каноэ, пещеры, белоснежные пляжи и невероятные фотолокации.",
    featured: true,
    category: "marine",
    slug: "11-islands-mega-tour",
    bookingsToday: 23,
    popular: true
  },
  {
    id: 11,
    title: "Наблюдение за китами",
    location: "Андаманское море",
    duration: "5 часов",
    group: "До 25 человек",
    dates: "Декабрь - Апрель",
    price: "3,200 ₽",
    originalPrice: "3,600 ₽",
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Наблюдение за китами", "Дельфины", "Морские черепахи", "Профессиональный гид"],
    description: "Уникальная возможность понаблюдать за китами и дельфинами в их естественной среде обитания.",
    featured: false,
    category: "wildlife",
    slug: "whale-watching-tour",
    bookingsToday: 2
  }
];

export const getPopularTours = (): LegacyTour[] => {
  return toursData.filter(tour => tour.popular);  
};

export const getLegacyTourBySlug = (slug: string): LegacyTour | undefined => {
  return toursData.find(tour => tour.slug === slug);
};
