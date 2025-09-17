import { Tour } from "../../types/tour";
import maya1 from "../../assets/phi-phi-2days/maya-bay-1.jpg";
import maya2 from "../../assets/phi-phi-2days/maya-bay-2.jpg";
import phiPhi1 from "../../assets/phi-phi-maya-bay.jpg";
import phiPhi2 from "../../assets/phi-phi-lagoon.jpg";
import hong1 from "../../assets/phi-phi-2days/pileh-lagoon.jpg";
import bamboo from "../../assets/phi-phi-2days/bamboo-island.webp";
import speedboat from "../../assets/phi-phi-speedboat.jpg";
import snorkeling from "../../assets/phi-phi-snorkeling.jpg";

export const elevenIslands: Tour = {
  id: "eleven-islands-daytour",
  slug: "11-ostrovov",
  title: "11 ОСТРОВОВ МЕГА-ТУР",
  subtitle: "Один эпичный день: Джеймс Бонд + Хонг + Пхи-Пхи",
  description:
    "Грандиозный тур за один день: Джеймс Бонд, Хонг и Пхи‑Пхи. Каноэ по пещерам, скрытые лагуны, Майя Бэй и снорклинг на Бамбу айленд. Максимум впечатлений за короткое время.",

  location: {
    country: "Thailand",
    region: "Phang Nga / Krabi / Phi Phi",
    island: "Andaman Sea",
  },

  duration: { days: 1, nights: 0 },

  categories: ["island-hopping", "day-trip", "group"],
  tags: ["speedboat", "snorkeling", "island", "lagoon", "lunch", "photography", "family"],
  difficulty: "easy",

  groupSize: { min: 2, max: 35 },

  pricing: {
    currency: "THB",
    base: { adult: 3900, child: 1950, infant: 0 },
    seasonal: [
      { from: "2025-12-20", to: "2026-01-10", modifier: 1.2, reason: "Новогодние праздники" },
      { from: "2025-07-01", to: "2025-08-31", modifier: 1.1, reason: "Высокий сезон" },
    ],
    deposit: { enabled: true, amount: 800, percentage: 20 },
  },

  images: [
    { url: maya1, alt: "Остров Джеймса Бонда — главное фото", category: "hero", caption: "Ко Тапу и известняковые скалы" },
    { url: maya2, alt: "Скрытые лагуны и пещеры", category: "highlight" },
    { url: phiPhi1, alt: "Майя Бэй — пляж из фильма", category: "highlight" },
    { url: phiPhi2, alt: "Lagoon у Пхи‑Пхи", category: "activity" },
    { url: hong1, alt: "Остров Хонг — лагуна", category: "highlight" },
    { url: bamboo, alt: "Бамбу айленд — снорклинг", category: "activity" },
    { url: speedboat, alt: "Скоростной катер", category: "activity" },
    { url: snorkeling, alt: "Снорклинг в кристальной воде", category: "activity" },
  ],

  itinerary: [
    {
      day: 1,
      title: "11 островов за один день",
      description: "Джеймс Бонд, Хонг, Пхи‑Пхи, Майя Бэй и лучший снорклинг",
      schedule: [
        { time: "06:30", activity: "Сбор из отелей", location: "Пхукет" },
        { time: "08:00", activity: "Завтрак на пирсе", location: "Пирс" },
        { time: "09:30", activity: "Ко Тапу — фотостоп", location: "Джеймс Бонд остров" },
        { time: "10:30", activity: "Каноэ в пещерах", location: "Залив Пханг Нга" },
        { time: "12:30", activity: "Обед на пляже", location: "Хонг" },
        { time: "14:30", activity: "Майя Бэй — фотостоп", location: "Пхи‑Пхи" },
        { time: "16:00", activity: "Снорклинг", location: "Бамбу айленд" },
        { time: "17:30", activity: "Возвращение на Пхукет", location: "Пирс" },
      ],
      highlights: ["Ко Тапу", "Каноэ по пещерам", "Майя Бэй", "Снорклинг на Бамбу"],
    },
  ],

  included: [
    "Трансфер из отеля и обратно",
    "Скоростной катер, спасжилеты",
    "Русскоговорящий гид",
    "Завтрак и обед",
    "Входные билеты в парки",
    "Снаряжение для снорклинга",
    "Каноэ в заливе Пханг Нга",
    "Питьевая вода и фрукты",
    "Страховка",
  ],
  excluded: [
    "Алкогольные напитки",
    "Личные расходы и сувениры",
    "Подводная фотосъёмка",
    "Чаевые гиду",
  ],

  notes: [
    "Дети до 4 лет бесплатно, 4–11 — скидка 50%",
    "При плохой погоде возможны изменения",
    "Майя Бэй может быть закрыта по решению нац. парка",
  ],

  bookingOptions: [
    { id: "standard", name: "Стандарт", description: "Групповая программа", priceModifier: 1.0, maxParticipants: 35 },
    { id: "comfort", name: "Комфорт", description: "Малая группа до 18 чел.", priceModifier: 1.3, maxParticipants: 18 },
    { id: "vip", name: "VIP", description: "Частная лодка", priceModifier: 2.5, maxParticipants: 10 },
  ],

  availability: { daysOfWeek: [1,2,3,4,5,6,7], advanceBooking: 1 },

  reviews: {
    averageRating: 4.9,
    totalReviews: 124,
    distribution: { 5: 100, 4: 20, 3: 3, 2: 1, 1: 0 },
  },

  seo: {
    metaTitle: "11 островов — мегатур за 1 день",
    metaDescription: "Джеймс Бонд + Хонг + Пхи‑Пхи за один день. Каноэ, лагуны и снорклинг. Русский гид.",
    keywords: ["11 островов", "Джеймс Бонд", "Хонг", "Пхи‑Пхи", "снорклинг"],
    openGraph: { title: "11 островов — мегатур", description: "Один эпичный день", image: maya1 },
  },

  status: "active",
  featured: true,
  createdAt: "2025-09-16T00:00:00Z",
  updatedAt: "2025-09-16T00:00:00Z",
};
