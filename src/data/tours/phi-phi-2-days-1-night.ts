import { Tour } from '../../types/tour';

export const phiPhi2Days1Night: Tour = {
  // Основная информация
  id: "phi-phi-2d1n-standard",
  slug: "phi-phi-2-days-1-night",
  title: "Пхи-Пхи: 2 дня с ночёвкой на острове",
  subtitle: "Майя Бэй, снорклинг, огненное шоу и закат с пляжа Лонг Бич",
  description: "Уникальная возможность остаться на ночь на легендарных островах Пхи-Пхи. Посетите знаменитую бухту Майя Бэй, где снимался фильм 'Пляж', понаблюдайте за обезьянами на Monkey Beach, насладитесь снорклингом в кристально чистых водах и встретьте незабываемый закат.",
  
  // Локация и география
  location: {
    country: "Thailand",
    region: "Krabi Province",
    island: "Phi Phi Islands",
    coordinates: { lat: 7.7407, lng: 98.7784 }
  },
  
  // Временные характеристики
  duration: { days: 2, nights: 1 },
  
  // Категоризация
  categories: ["island-hopping", "overnight", "adventure"],
  tags: ["speedboat", "snorkeling", "beach", "sunset", "fireshow", "photography", "romantic"],
  difficulty: "easy",
  
  // Групповые характеристики
  groupSize: { min: 2, max: 30 },
  ageRestrictions: { minAge: 3, maxAge: 70 },
  
  // Ценообразование
  pricing: {
    currency: "THB",
    base: { adult: 4000, child: 3500, infant: 0 },
    seasonal: [
      {
        from: "2025-12-20",
        to: "2026-01-10", 
        modifier: 1.3,
        reason: "Новогодние праздники"
      },
      {
        from: "2025-07-01",
        to: "2025-08-31",
        modifier: 1.2,
        reason: "Высокий сезон"
      }
    ],
    deposit: { enabled: true, amount: 1000, percentage: 25 }
  },
  
  // Медиа контент
  images: [
    {
      url: "/src/assets/phi-phi-maya-bay.jpg",
      alt: "Бухта Майя Бэй на островах Пхи-Пхи",
      category: "hero",
      caption: "Знаменитая бухта Майя Бэй из фильма 'Пляж'"
    },
    {
      url: "/src/assets/phi-phi-sunset.jpg",
      alt: "Закат на островах Пхи-Пхи",
      category: "highlight",
      caption: "Незабываемые закаты с пляжа Лонг Бич"
    },
    {
      url: "/src/assets/phi-phi-snorkeling.jpg",
      alt: "Снорклинг у островов Пхи-Пхи",
      category: "activity",
      caption: "Снорклинг в кристально чистых водах"
    },
    {
      url: "/src/assets/phi-phi-monkey-beach.jpg",
      alt: "Пляж обезьян на Пхи-Пхи",
      category: "highlight",
      caption: "Monkey Beach - встреча с обезьянами"
    },
    {
      url: "/src/assets/phi-phi-speedboat.jpg",
      alt: "Спидбот на фоне островов Пхи-Пхи",
      category: "activity",
      caption: "Комфортное путешествие на спидботе"
    }
  ],
  
  // Программа тура
  itinerary: [
    {
      day: 1,
      title: "Прибытие на Пхи-Пхи и исследование островов",
      description: "Отправление из Пхукета, посещение Майя Бэй, обед на пляже, снорклинг",
      schedule: [
        { time: "07:00", activity: "Трансфер из отеля", location: "Пхукет" },
        { time: "08:30", activity: "Отправление на спидботе", location: "Пирс Чалонг" },
        { time: "10:00", activity: "Прибытие на Пхи-Пхи Дон", location: "Тон Сай Бэй" },
        { time: "10:30", activity: "Исследование Майя Бэй", location: "Пхи-Пхи Лей" },
        { time: "12:00", activity: "Обед на пляже", location: "Лонг Бич" },
        { time: "14:00", activity: "Снорклинг", location: "Shark Point" },
        { time: "16:00", activity: "Заселение в отель", location: "Пхи-Пхи Дон" },
        { time: "19:00", activity: "Ужин и огненное шоу", location: "Тон Сай Бэй" }
      ]
    },
    {
      day: 2,
      title: "Monkey Beach и возвращение в Пхукет",
      description: "Посещение пляжа обезьян, последний снорклинг, обед и возвращение",
      schedule: [
        { time: "08:00", activity: "Завтрак в отеле", location: "Пхи-Пхи Дон" },
        { time: "09:30", activity: "Посещение Monkey Beach", location: "Пхи-Пхи Дон" },
        { time: "11:00", activity: "Снорклинг в лагуне", location: "Pileh Lagoon" },
        { time: "12:30", activity: "Обед", location: "Bamboo Island" },
        { time: "14:00", activity: "Отправление в Пхукет", location: "Пхи-Пхи Дон" },
        { time: "16:00", activity: "Прибытие в Пхукет", location: "Пирс Чалонг" },
        { time: "17:30", activity: "Трансфер в отель", location: "Пхукет" }
      ]
    }
  ],
  
  // Что включено/исключено
  included: [
    "Трансфер из отеля и обратно",
    "Транспорт на спидботе",
    "Размещение в отеле 3* на Пхи-Пхи",
    "2 завтрака, 2 обеда, 1 ужин",
    "Снаряжение для снорклинга",
    "Спасательные жилеты",
    "Страховка",
    "Русскоговорящий гид",
    "Входные билеты в национальные парки"
  ],
  
  excluded: [
    "Напитки (кроме воды)",
    "Дополнительные развлечения на острове", 
    "Массаж и СПА процедуры",
    "Сувениры и личные покупки",
    "Чаевые гиду и персоналу"
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