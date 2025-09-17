import { Tour } from "../../types/tour";
import { fourPearlsImages } from "../../assets/four-pearls-andaman/images";

export const fourPearlsAndaman: Tour = {
  id: "four-pearls-andaman-2d1n",
  slug: "four-pearls-andaman",
  title: "4 жемчужины Андаманского моря",
  subtitle: "2 дня / 1 ночь — эксклюзивное путешествие",
  description:
    "Роскошное двухдневное путешествие по четырём уникальным локациям с ночёвкой на острове. VIP‑сервис, снорклинг в кристально чистых водах, романтический ужин и профессиональная фотосъёмка.",

  location: {
    country: "Thailand",
    region: "Krabi / Phang Nga",
    island: "Andaman Sea",
  },

  duration: { days: 2, nights: 1 },

  categories: ["island-hopping", "overnight", "romantic"],
  tags: [
    "catamaran",
    "snorkeling",
    "beach",
    "sunset",
    "photography",
    "romantic",
    "family",
  ],
  difficulty: "easy",

  groupSize: { min: 2, max: 25 },

  pricing: {
    currency: "THB",
    base: { adult: 4700, child: 4200, infant: 0 },
    seasonal: [
      { from: "2025-12-20", to: "2026-01-10", modifier: 1.25, reason: "Новогодние праздники" },
      { from: "2025-07-01", to: "2025-08-31", modifier: 1.15, reason: "Высокий сезон" },
    ],
    deposit: { enabled: true, amount: 1500, percentage: 30 },
  },

  images: [
    { url: fourPearlsImages.main, alt: "Жемчужины Андаманского моря — главное фото", category: "hero", caption: "Белоснежные пляжи и бирюзовые лагуны" },
    { url: fourPearlsImages.gallery[1], alt: "Тропические скалы и лагуны", category: "highlight" },
    { url: fourPearlsImages.gallery[2], alt: "Купание в бирюзовой воде", category: "activity" },
    { url: fourPearlsImages.gallery[3], alt: "Пейзажи Рейли и Пханг Нга", category: "highlight" },
    { url: fourPearlsImages.gallery[4], alt: "Закат на острове", category: "highlight" },
  ],

  itinerary: [
    {
      day: 1,
      title: "Первая и вторая жемчужины",
      description: "Скрытые лагуны, снорклинг среди кораллов и обед на пляже.",
      schedule: [
        { time: "07:00", activity: "VIP‑трансфер из отеля", location: "Пхукет" },
        { time: "08:30", activity: "Завтрак на пирсе", location: "Пирс" },
        { time: "09:30", activity: "Отправление на катере", location: "Андаманское море" },
        { time: "10:30", activity: "Первая жемчужина — скрытая лагуна", location: "Пханг Нга" },
        { time: "12:00", activity: "Вторая жемчужина — снорклинг", location: "Коралловые сады" },
        { time: "13:30", activity: "Обед на пляже", location: "Приватная бухта" },
        { time: "15:00", activity: "Заселение в отель, отдых", location: "Остров" },
        { time: "18:00", activity: "Закат и романтический ужин", location: "Терасса отеля" },
      ],
      highlights: ["Скрытые лагуны", "Снорклинг у рифов", "Пляжный обед"],
    },
    {
      day: 2,
      title: "Третья и четвёртая жемчужины",
      description: "Лучшие фотолокации и финальный снорклинг.",
      schedule: [
        { time: "08:00", activity: "Завтрак с видом на океан", location: "Остров" },
        { time: "09:30", activity: "Третья жемчужина — лагуна", location: "Хонг/Рейли" },
        { time: "11:00", activity: "Фотосессия и подводная съёмка", location: "Лучшая локация" },
        { time: "13:00", activity: "Прощальный обед", location: "Катер" },
        { time: "15:00", activity: "Возвращение на Пхукет", location: "Пирс" },
      ],
      highlights: ["Завтрак с видом", "Панорамы и фотосессия", "Прощальный обед"],
    },
  ],

  included: [
    "VIP‑трансфер из отеля и обратно",
    "Катер/катамаран, спасжилеты",
    "Русскоговорящий гид",
    "Полный пансион (завтрак, обед, ужин)",
    "Проживание 4* на острове",
    "Входные билеты в национальные парки",
    "Снаряжение для снорклинга",
    "Медицинская страховка",
    "Прохладительные напитки и фрукты",
  ],
  excluded: [
    "Алкогольные напитки премиум‑класса",
    "Спа‑процедуры",
    "Доп. профессиональная фотосъёмка",
    "Личные расходы и сувениры",
    "Чаевые гиду",
  ],

  notes: [
    "Рекомендуется взять солнцезащитный крем и купальные принадлежности",
    "Маршрут может меняться из‑за погоды",
    "Вегетарианское меню по запросу",
  ],

  bookingOptions: [
    { id: "standard", name: "Стандарт", description: "Отель 3*, групповая программа", priceModifier: 1.0, maxParticipants: 25 },
    { id: "comfort", name: "Комфорт", description: "Отель 4*, малая группа до 12 чел.", priceModifier: 1.5, maxParticipants: 12 },
    { id: "vip", name: "VIP", description: "Частная яхта, отель 5*, персональный гид", priceModifier: 3.2, maxParticipants: 8 },
  ],

  additionalServices: [
    { id: "underwater_photos", name: "Подводная фотосъёмка", description: "Пакет 30 фото", price: 1200, currency: "THB" },
    { id: "drone_video", name: "Съёмка дроном", description: "1‑2 минуты монтаж", price: 2000, currency: "THB" },
  ],

  availability: {
    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
    excludeDates: ["2025-12-25", "2026-01-01"],
    advanceBooking: 2,
  },

  reviews: {
    averageRating: 4.8,
    totalReviews: 89,
    distribution: { 5: 70, 4: 15, 3: 3, 2: 1, 1: 0 },
  },

  seo: {
    metaTitle: "4 жемчужины Андаманского моря — 2 дня / 1 ночь",
    metaDescription:
      "Эксклюзивный тур на 2 дня с ночёвкой: 4 жемчужины Андаманского моря, снорклинг, закат и VIP‑сервис. Лучшие фото‑локации.",
    keywords: ["жемчужины", "Андаманское море", "ночёвка", "тур 2 дня", "романтика"],
    openGraph: {
      title: "4 жемчужины Андаманского моря",
      description: "Роскошное 2‑дневное путешествие с ночёвкой и VIP‑сервисом",
      image: fourPearlsImages.main,
    },
  },

  status: "active",
  featured: true,
  createdAt: "2025-09-16T00:00:00Z",
  updatedAt: "2025-09-16T00:00:00Z",
};
