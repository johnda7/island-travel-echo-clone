// Централизованные данные туров - единый источник истины как в WordPress CMS
import phiPhiMayaBay from "@/assets/phi-phi-maya-bay.jpg";
import mayaBay1 from "@/assets/phi-phi-2days/maya-bay-1.jpg";
import pilehLagoon from "@/assets/phi-phi-2days/pileh-lagoon.jpg";
import { rachaCoralImages } from "@/assets/racha-coral/images";
import { fourPearlsImages } from "@/assets/four-pearls-andaman/images";
import { jamesBondIslandImages } from "@/assets/james-bond-island/images";

export interface Tour {
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
  // Дополнительные изображения галереи (опционально)
  gallery?: string[];
  highlights: string[];
  description: string;
  featured: boolean;
  category: string;
  slug: string;
  bookingsToday?: number;
  popular?: boolean;
}

// Единый массив туров - как база данных в WordPress
export const toursData: Tour[] = [
  {
    id: 1,
    title: "Острова Пхи-Пхи на скоростной лодке",
    location: "Острова Пхи-Пхи",
    duration: "8 часов",
    group: "До 35 человек",
    dates: "Круглый год",
    price: "2,490 ₽",
    originalPrice: "2,800 ₽",
    rating: 4.9,
    reviews: 434,
    image: phiPhiMayaBay,
    highlights: ["Майя Бэй", "Снорклинг", "Обед на пляже"],
    description: "Захватывающее путешествие к легендарным островам Пхи-Пхи с посещением знаменитой бухты Майя Бэй.",
    featured: true,
    category: "marine",
    slug: "phi-phi-islands-speedboat",
    bookingsToday: 12,
    popular: true
  },
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
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Каноэ в пещерах", "Деревня на воде", "Морепродукты"],
    description: "Путешествие к легендарному острову из фильма о Джеймсе Бонде с каноэ по мангровым зарослям.",
    featured: true,
    category: "marine",
    slug: "james-bond-island",
    bookingsToday: 8
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
    image: pilehLagoon,
    highlights: ["Майя Бэй", "Ночь на острове", "Огненное шоу"],
    description: "Путешествие на острова Пхи-Пхи с ночёвкой — это уникальная возможность увидеть самые красивые места Андаманского моря.",
    featured: true,
    category: "marine",
    slug: "phi-phi-2-days-1-night",
    bookingsToday: 6,
    popular: true
  },
  {
    id: 5,
    title: "11 островов Стандарт",
    location: "Краби",
    duration: "9 часов",
    group: "До 40 человек",
    dates: "Ноябрь - Апрель", 
    price: "2,690 ₽",
    originalPrice: "3,200 ₽",
    rating: 4.9,
    reviews: 278,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["11 островов", "Снорклинг", "Обед-барбекю"],
    description: "Захватывающее путешествие к 11 самым красивым островам региона на комфортабельном спидботе.",
    featured: true,
    category: "marine",
    slug: "11-islands-standard", 
    bookingsToday: 15
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
    image: fourPearlsImages.main,
    highlights: ["VIP-сервис", "4 эксклюзивные локации", "Романтический ужин", "Профессиональная фотосъемка"],
    description: "Роскошное двухдневное путешествие по самым красивым и нетронутым уголкам региона с VIP-сервисом.",
    featured: true,
    category: "marine",
    slug: "four-pearls-andaman",
    bookingsToday: 4
  },
  {
    id: 7,
    title: "Остров Джеймса Бонда",
    location: "Залив Пханг Нга",
    duration: "8 часов",
    group: "До 35 человек",
    dates: "Круглый год",
    price: "2,590 ฿ взр. / 1,800 ฿ дет.",
    rating: 4.9,
    reviews: 287,
    image: jamesBondIslandImages.main,
    highlights: [
      "Знаменитая скала Ко Тапу из фильма о Джеймсе Бонде",
      "Каноэ по пещерам и лагунам",
      "Плавучая деревня мусульман",
      "Обед из морепродуктов на воде"
    ],
    description: "Легендарная экскурсия на остров из фильма 'Человек с золотым пистолетом'. Каноэ по пещерам залива Пханг Нга, плавучая деревня и аутентичный обед из морепродуктов.",
    featured: true,
    category: "marine",
    slug: "james-bond-island",
    bookingsToday: 15,
    popular: true
  }
];

// Функции для фильтрации как в WordPress
export const getFeaturedTours = (): Tour[] => {
  return toursData.filter(tour => tour.featured);
};

export const getPopularTours = (): Tour[] => {
  return toursData.filter(tour => tour.popular);  
};

export const getToursByCategory = (category: string): Tour[] => {
  return toursData.filter(tour => tour.category === category);
};

export const getTourBySlug = (slug: string): Tour | undefined => {
  return toursData.find(tour => tour.slug === slug);
};

export const getMarineTours = (): Tour[] => {
  return getToursByCategory('marine');
};