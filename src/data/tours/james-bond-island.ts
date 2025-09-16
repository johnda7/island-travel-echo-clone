import { Tour } from '../../types/tour';
import { jamesBondIslandImages } from '../../assets/james-bond-island/images';

export const jamesBondIsland: Tour = {
  // Основная информация
  id: "james-bond-island-standard",
  slug: "james-bond-island",
  title: "Остров Джеймса Бонда",
  subtitle: "Легендарная скала Ко Тапу, каноэ по пещерам и плавучая деревня",
  description: "Посетите знаменитый остров Ко Тапу из фильма 'Человек с золотым пистолетом' о Джеймсе Бонде. Экскурсия в национальный парк залива Пханг Нга включает каноэ по мангровым лесам, посещение плавучей деревни мусульман Ко Паньи и незабываемые виды известняковых скал, поднимающихся прямо из изумрудных вод.",
  
  // Локация и география
  location: {
    country: "Thailand",
    region: "Phang Nga Province",
    island: "James Bond Island (Ko Tapu)",
    coordinates: { lat: 8.2750, lng: 98.5015 }
  },
  
  // Временные характеристики
  duration: { days: 1, nights: 0 },
  
  // Категоризация
  categories: ["island-hopping", "adventure", "day-trip"],
  tags: ["longtail", "beach", "island", "lunch", "photography", "family"],
  difficulty: "easy",
  
  // Групповые характеристики
  groupSize: { min: 2, max: 35 },
  ageRestrictions: { minAge: 4, maxAge: 70 },
  
  // Ценообразование
  pricing: {
    currency: "THB",
    base: { adult: 1900, child: 1600, infant: 0 },
    seasonal: [
      {
        from: "2025-12-20",
        to: "2026-01-10", 
        modifier: 1.2,
        reason: "Новогодние праздники"
      },
      {
        from: "2025-07-01",
        to: "2025-08-31",
        modifier: 1.1,
        reason: "Высокий сезон"
      }
    ],
    deposit: { enabled: true, amount: 500, percentage: 25 }
  },
  
  // Медиа контент
  images: [
    {
      url: jamesBondIslandImages.main,
      alt: "Остров Джеймса Бонда Ко Тапу - знаменитая скала из фильма 007",
      category: "hero",
      caption: "Знаменитая скала Ко Тапу из фильма о Джеймсе Бонде"
    },
    {
      url: jamesBondIslandImages.gallery[1],
      alt: "Залив Пханг Нга - панорамный вид на известняковые скалы",
      category: "highlight",
      caption: "Панорамные виды залива Пханг Нга"
    },
    {
      url: jamesBondIslandImages.gallery[2],
      alt: "Каноэ экскурсия по мангровым лесам и пещерам",
      category: "activity",
      caption: "Каноэ по мангровым лесам и пещерам"
    },
    {
      url: jamesBondIslandImages.gallery[3],
      alt: "Плавучая деревня мусульман Ко Паньи на сваях",
      category: "highlight",
      caption: "Плавучая деревня Ко Паньи"
    },
    {
      url: jamesBondIslandImages.gallery[4],
      alt: "Лодочный тур на традиционном лонгтейле",
      category: "activity",
      caption: "Лодочные экскурсии по заливу"
    }
  ],
  
  // Программа тура
  itinerary: [
    {
      day: 1,
      title: "Экскурсия в залив Пханг Нга и остров Джеймса Бонда",
      description: "Полный день в заливе Пханг Нга с посещением острова Ко Тапу, каноэ и плавучей деревни",
      schedule: [
        { time: "08:00", activity: "Трансфер из отеля", location: "Пхукет" },
        { time: "09:30", activity: "Прибытие к пирсу Као Лак", location: "Пирс Као Лак" },
        { time: "10:00", activity: "Отправление на лонгтейле", location: "Залив Пханг Нга" },
        { time: "10:30", activity: "Остров Джеймса Бонда - фотосессия", location: "Ко Тапу" },
        { time: "11:30", activity: "Каноэ по пещерам и лагунам", location: "Мангровые леса" },
        { time: "12:30", activity: "Плавучая деревня Ко Паньи", location: "Ко Паньи" },
        { time: "13:00", activity: "Обед из морепродуктов", location: "Плавучий ресторан" },
        { time: "14:30", activity: "Свободное время и покупки", location: "Ко Паньи" },
        { time: "15:30", activity: "Возвращение к пирсу", location: "Залив Пханг Нга" },
        { time: "16:30", activity: "Трансфер в отель", location: "Пхукет" }
      ]
    }
  ],
  
  // Что включено/исключено
  included: [
    "Трансфер из отеля и обратно",
    "Лодочные переезды на традиционном лонгтейле",
    "Обед из морепродуктов в плавучем ресторане",
    "Каноэ и снаряжение для гребли",
    "Страховка и спасательные жилеты",
    "Русскоговорящий гид-экскурсовод",
    "Входные билеты в национальный парк",
    "Питьевая вода в течение дня"
  ],
  
  excluded: [
    "Напитки (кроме воды)",
    "Дополнительные экскурсии на островах", 
    "Сувениры и личные покупки",
    "Подводная фотосъемка",
    "Чаевые гиду и команде лодки"
  ],
  
  // Дополнительная информация
  notes: [
    "Возьмите с собой солнцезащитный крем, головной убор и солнечные очки",
    "Рекомендуется взять сменную одежду",
    "Камера или телефон в водонепроницаемом чехле для подводных фото",
    "Небольшая сумма наличными для покупок на острове"
  ],
  
  // Варианты бронирования
  bookingOptions: [
    {
      id: "standard",
      name: "Стандартный",
      description: "Размещение в отеле 3*, групповой тур",
      priceModifier: 1.0,
      maxParticipants: 25
    },
    {
      id: "comfort", 
      name: "Комфорт",
      description: "Размещение в отеле 4*, малая группа до 15 человек",
      priceModifier: 1.4,
      maxParticipants: 15
    },
    {
      id: "vip",
      name: "VIP",
      description: "Частная яхта, отель 5*, персональный гид",
      priceModifier: 3.0,
      maxParticipants: 8
    }
  ],
  
  // Дополнительные услуги
  additionalServices: [
    {
      id: "underwater_photos",
      name: "Подводная фотосессия",
      description: "Профессиональные фото под водой",
      price: 800,
      currency: "THB"
    },
    {
      id: "drone_video",
      name: "Аэросъёмка дроном", 
      description: "Видео с высоты птичьего полета",
      price: 1200,
      currency: "THB"
    }
  ],
  
  // Доступность
  availability: {
    daysOfWeek: [1, 2, 3, 4, 5, 6, 7], // Ежедневно
    excludeDates: ["2025-12-25", "2026-01-01"], // Исключённые даты
    advanceBooking: 1 // Минимум 1 день заранее
  },
  
  // Отзывы
  reviews: {
    averageRating: 4.8,
    totalReviews: 53,
    distribution: {
      5: 42,
      4: 8, 
      3: 2,
      2: 1,
      1: 0
    }
  },
  
  // SEO данные
  seo: {
    metaTitle: "Пхи-Пхи 2 дня с ночёвкой | Майя Бэй тур из Пхукета",
    metaDescription: "Уникальный тур на острова Пхи-Пхи с ночёвкой ✓ Майя Бэй ✓ Снорклинг ✓ Огненное шоу ✓ Лучшие цены ✓ Русский гид",
    keywords: ["пхи-пхи", "майя бэй", "тур с ночёвкой", "снорклинг", "огненное шоу"],
    openGraph: {
      title: "Пхи-Пхи: 2 дня с ночёвкой на острове",
      description: "Майя Бэй, снорклинг, огненное шоу и закат с пляжа Лонг Бич",
      image: "/src/assets/phi-phi-maya-bay.jpg"
    }
  },
  
  // Метаданные
  status: "active",
  featured: true,
  createdAt: "2025-01-15T00:00:00Z",
  updatedAt: "2025-09-16T00:00:00Z"
};