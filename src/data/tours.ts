import { Tour } from "../types/tour";
import { phiPhi2Days1Night } from "./tours/phi-phi-2-days-1-night";
import { jamesBondIsland } from "./tours/james-bond-island";
import { rachaCoral } from "./tours/racha-coral";
import { fourPearlsAndaman } from "./tours/four-pearls-andaman";
import { elevenIslands } from "./tours/eleven-islands";
import phiPhiMayaBay from "../assets/phi-phi-maya-bay.jpg";
import { rachaCoralImages } from "../assets/racha-coral/images";
import { jamesBondIslandImages } from "../assets/james-bond-island/images";

export const tours: Tour[] = [
  phiPhi2Days1Night,
  jamesBondIsland,
  rachaCoral,
  fourPearlsAndaman,
  elevenIslands,
];

// Алиасы слагов для совместимости со старыми/внешними ссылками
const slugAliases: Record<string, string> = {
  "eleven-islands": "11-островов",
  "11-islands": "11-островов",
  "11-ostrovov": "11-островов",
  "four-pearls": "four-pearls-andaman",
  "four-pearls-andaman": "four-pearls-andaman",
  "james-bond": "james-bond-island",
};

export const getTourBySlug = (slug: string): Tour | undefined => {
  const normalized = slugAliases[slug] || slug;
  return tours.find(tour => tour.slug === normalized);
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
  gallery?: string[];
}

export const toursData: LegacyTour[] = [
  {
    id: 2,
    title: "Остров Джеймса Бонда",
    location: "Залив Пханг Нга",
    duration: "8 часов", 
    group: "До 25 человек",
    dates: "Октябрь - Май",
    price: "2,590 ₽",
    originalPrice: "2,900 ₽",
    rating: 4.8,
    reviews: 289,
    image: jamesBondIslandImages.main,
    gallery: jamesBondIslandImages.gallery,
    highlights: ["Знаменитая скала Ко Тапу из фильма о Джеймсе Бонде", "Каноэ по пещерам и лагунам", "Плавучая деревня мусульман", "Обед из морепродуктов на воде"],
    description: "Легендарная экскурсия на остров из фильма 'Человек с золотым пистолетом'. Каноэ по пещерам залива Пханг Нга, плавучая деревня и аутентичный обед из морепродуктов.",
    featured: true,
    category: "marine",
    slug: "james-bond-island",
    bookingsToday: 8,
    popular: true
  },
  {
    id: 3,
    title: "Острова Рача и Корал",
    location: "Пхукет",
    duration: "8 часов",
    group: "До 30 человек", 
    dates: "Круглый год",
    price: "1,200 ฿ взр. / 600 ฿ дети",
    originalPrice: "1,400 ฿",
    rating: 4.7,
    reviews: 356,
    image: rachaCoralImages.main,
    gallery: rachaCoralImages.gallery,
    highlights: ["Coral Beach Club", "Снорклинг", "Парасейлинг"],
    description: "Острова Рача - кристально чистая вода, белоснежные пляжи и удивительный подводный мир недалеко от Пхукета.",
    featured: true,
    category: "marine", 
    slug: "racha-coral",
    bookingsToday: 9,
    popular: true
  },
  {
    id: 4,
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
    bookingsToday: 4
  },
  {
    id: 14,
    title: "11 ОСТРОВОВ МЕГА-ТУР | ОДИН ЭПИЧНЫЙ ДЕНЬ",
    location: "Пханг-Нга, Пхи-Пхи",
    duration: "1 день",
    group: "Групповая экскурсия",
    dates: "Ежедневно",
    price: "3900 ฿",
    originalPrice: "4200 ฿",
    rating: 4.9,
    reviews: 124,
    image: "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/james-bond-island-768x1024.jpg",
    highlights: ["Остров Джеймса Бонда", "Пхи-Пхи Мая Бэй", "Остров Хонг", "Каноэ в пещерах", "Деревня Паньи", "11 уникальных островов"],
    description: "Грандиозный тур на 11 островов за один день: Джеймс Бонд, Пхи-Пхи, Хонг и другие жемчужины Андаманского моря. Каноэ, пещеры, белоснежные пляжи и невероятные фотолокации.",
    featured: true,
    category: "marine",
    slug: "11-ostrovov",
    bookingsToday: 12,
    popular: true
  }
];

export const getPopularTours = (): LegacyTour[] => {
  return toursData.filter(tour => tour.popular);  
};

export const getLegacyTourBySlug = (slug: string): LegacyTour | undefined => {
  return toursData.find(tour => tour.slug === slug);
};
