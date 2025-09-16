import { Tour } from '../../types/tour';
import { rachaCoralImages } from '../../assets/racha-coral/images';

export const rachaCoral: Tour = {
  // Основная информация
  id: "racha-coral-standard",
  slug: "racha-coral",
  title: "Острова Рача и Корал",
  subtitle: "Кристально чистые воды, белоснежные пляжи и снорклинг",
  description: "Посетите один из самых красивых островов недалеко от Пхукета - остров Рача с его кристально чистыми водами и белоснежными пляжами. Насладитесь снорклингом, отдохните на Coral Beach Club и испытайте адреналин от парасейлинга над Андаманским морем.",
  
  // Локация и география
  location: {
    country: "Thailand",
    region: "Phuket Province",
    island: "Racha Yai Island",
    coordinates: { lat: 7.6167, lng: 98.3667 }
  },
  
  // Временные характеристики
  duration: { days: 1, nights: 0 },
  
  // Категоризация
  categories: ["island-hopping", "beach-tours", "day-trip"],
  tags: ["speedboat", "snorkeling", "beach", "lunch", "photography", "family"],
  difficulty: "easy",
  
  // Групповые характеристики
  groupSize: { min: 2, max: 30 },
  ageRestrictions: { minAge: 3, maxAge: 70 },
  
  // Ценообразование
  pricing: {
    currency: "THB",
    base: { adult: 1200, child: 600, infant: 0 },
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
    deposit: { enabled: true, amount: 300, percentage: 25 }
  },
  
  // Медиа контент
  images: [
    {
      url: rachaCoralImages.main,
      alt: "Остров Рача - белоснежный пляж и кристально чистая вода",
      category: "hero",
      caption: "Остров Рача - жемчужина Андаманского моря"
    },
    {
      url: rachaCoralImages.gallery[1],
      alt: "Снорклинг у острова Рача с морскими обитателями",
      category: "activity",
      caption: "Снорклинг в кристально чистых водах"
    },
    {
      url: rachaCoralImages.gallery[2],
      alt: "Coral Beach Club на острове Рача",
      category: "highlight",
      caption: "Coral Beach Club - премиальный отдых"
    },
    {
      url: rachaCoralImages.gallery[3],
      alt: "Парасейлинг над Андаманским морем",
      category: "activity",
      caption: "Парасейлинг - полет над морем"
    },
    {
      url: rachaCoralImages.gallery[4],
      alt: "Спидбот у берегов острова Рача",
      category: "activity",
      caption: "Комфортное путешествие на спидботе"
    }
  ],
  
  // Программа тура
  itinerary: [
    {
      day: 1,
      title: "Экскурсия на острова Рача и Корал",
      description: "Полный день на одном из самых красивых островов недалеко от Пхукета",
      schedule: [
        { time: "08:00", activity: "Трансфер из отеля", location: "Пхукет" },
        { time: "09:00", activity: "Прибытие к пирсу Чалонг", location: "Пирс Чалонг" },
        { time: "09:30", activity: "Отправление на спидботе", location: "Андаманское море" },
        { time: "10:30", activity: "Прибытие на остров Рача", location: "Остров Рача" },
        { time: "11:00", activity: "Снорклинг и плавание", location: "Пляж Паток" },
        { time: "12:30", activity: "Обед в ресторане", location: "Coral Beach Club" },
        { time: "14:00", activity: "Отдых на пляже и парасейлинг", location: "Главный пляж" },
        { time: "15:30", activity: "Свободное время", location: "Остров Рача" },
        { time: "16:00", activity: "Возвращение в Пхукет", location: "Андаманское море" },
        { time: "17:00", activity: "Трансфер в отель", location: "Пхукет" }
      ]
    }
  ],
  
  // Что включено/исключено
  included: [
    "Трансфер из отеля и обратно",
    "Транспорт на спидботе",
    "Обед в ресторане на острове",
    "Снаряжение для снорклинга",
    "Спасательные жилеты",
    "Страховка",
    "Русскоговорящий гид",
    "Входные билеты на остров",
    "Питьевая вода на лодке"
  ],
  
  excluded: [
    "Парасейлинг (доплата 1500 ฿)",
    "Напитки в ресторане", 
    "Дополнительные водные развлечения",
    "Массаж на пляже",
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