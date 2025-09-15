// Централизованные данные туров - единый источник истины как в WordPress CMS
import phiPhiMayaBay from "@/assets/phi-phi-maya-bay.jpg";
import mayaBay1 from "@/assets/phi-phi-2days/maya-bay-1.jpg";
import pilehLagoon from "@/assets/phi-phi-2days/pileh-lagoon.jpg";
import { rachaCoralImages } from "@/assets/racha-coral/images";
import { fourPearlsImages } from "@/assets/four-pearls-andaman/images";
import { jamesBondIslandImages } from "@/assets/james-bond-island/images";
import karonBeach from "@/assets/karon-beach.jpg";
import kataBeach from "@/assets/kata-beach.jpg";
import patongBeach from "@/assets/patong-beach.jpg";
import kamalaBeach from "@/assets/kamala-beach.jpg";

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
    id: 12,
    title: "Рафтинг + Слоновье СПА + ATV 1 день",
    location: "Джунгли Пхукета",
    duration: "1 день",
    group: "Групповая экскурсия",
    dates: "Ежедневно",
    price: "2800 ฿",
    originalPrice: "3100 ฿",
    rating: 4.8,
    reviews: 167,
    image: "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/rafting1-scaled.jpg",
    gallery: [
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/rafting1-scaled.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/rafting2-scaled.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/atv1-scaled.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/atv2-scaled.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/bangkaew-elephant-park1-scaled.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/bangkaew-elephant-park2-scaled.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/zipline-scaled.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/waterfall-1.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/monkeys-at-suwan-khuha-temple-1.webp"
    ],
    highlights: [
      "Сплав на рафтах 5 км по горной реке",
      "Катание на мощных квадроциклах 250 СС",
      "Слоновье СПА: купание и грязевые процедуры со слоном",
      "Катание на тарзанке (ZIP Line)",
      "Посещение храма с обезьянами Суван Куха",
      "Купание у живописного водопада",
      "Обед традиционной тайской кухни",
      "Шоу слонёнка и катание на слоне"
    ],
    description: "Один день в джунглях без спешки: купание со слоном, рафтинг по реке, храм с обезьянами, водопад в лесу. Захватывающее приключение на мощных квадроциклах по трассе с преградами, уникальное слоновье СПА и незабываемый сплав по горной реке.",
    featured: true,
    category: "adventure",
    slug: "rafting-slonove-spa-atv-1-den",
    bookingsToday: 8,
    popular: true
  },
  {
    id: 11,
    title: "Рассветное приключение: Стеклянный мост Beyond Skywalk",
    location: "Пханг Нга, о. Джеймса Бонда",
    duration: "1 день",
    group: "Групповая экскурсия",
    dates: "Ежедневно",
    price: "2900 ฿",
    originalPrice: "3200 ฿",
    rating: 4.9,
    reviews: 124,
    image: "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/sky-walk-bridge-1.webp",
    gallery: [
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/sky-walk-bridge-1.webp",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/sky-walk-bridge_-1.webp",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/airplane-beach_-1-scaled.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/suwan-khuha-temple-1.webp",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/the-sea-gypsies-floating-village-2-scaled.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/elephant-show-1-scaled.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/baby-elephant-show-1.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/waterfall-2.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/hong-island1.jpg"
    ],
    highlights: [
      "Встреча рассвета на стеклянном мосту Beyond Skywalk",
      "Завтрак на смотровой с панорамными видами",
      "Прогулка на длиннохвостой лодке по заливу Пханг Нга",
      "Посещение острова Джеймса Бонда",
      "Пляж с самолетами - уникальное место для фото",
      "Кафе с кувшинками Ma Doo Bua",
      "Храм с лежащим Буддой Suwan Khuha",
      "Шоу слонов и купание со слонятами"
    ],
    description: "Погрузитесь в утреннюю тишину и красоту Таиланда: рассвет на смотровой площадке, лодочная прогулка по таинственным пещерам, пляж с самолётами и уютное кафе среди кувшинок — всё это за один незабываемый день. Ранний выезд в 3:45 утра гарантирует встречу рассвета в самых живописных местах региона.",
    featured: true,
    category: "adventure",
    slug: "rassvetnoe-priklyuchenie-steklyannyj-most-beyond-skywalk",
    bookingsToday: 12,
    popular: true
  },
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
  },
  {
    id: 8,
    title: "Достопримечательности Пхукета (без шопинга)",
    location: "Пхукет",
    duration: "8–9 часов",
    group: "До 18 человек",
    dates: "Круглый год",
    price: "2,190 ₽",
    rating: 4.9,
    reviews: 168,
    image: "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/cape-promthep.jpg",
    gallery: [
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/cape-promthep.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/temple-wat-chalong.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/view-point-near-big-buddha-statue.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/karon-view-point.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/phuket-old-town.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/viewpoint-windmill.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/6798780e8ebf0-17645-1200-800.jpg",
      "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/elephant-feeding.jpg"
    ],
    highlights: ["Большой Будда", "Ват Чалонг", "Старый город", "Karon Viewpoint", "Мыс Промтеп"],
    description: "Классическая обзорная экскурсия по Пхукету без посещения магазинов — топ‑локации за 1 день.",
    featured: true,
    category: "city",
    slug: "dostoprimechatelnosti-phuketa-1-den-obzornaja-jekskursija-bez-shopinga",
    bookingsToday: 7
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