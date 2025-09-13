export type Beach = {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  tags: string[];
  price?: number;
  popularity?: number;
  gallery?: string[];
  services?: string[];
  reviews?: { user: string; text: string; rating: number }[];
  map?: string;
  info?: {
    length?: string;
    sand?: string;
    infrastructure?: string;
    bestTime?: string;
    transport?: string;
  };
};

// Единый источник данных пляжей (объединяет то, что уже было на страницах)
export const beaches: Beach[] = [
  // Минимум — те, что уже используются в Beaches.tsx: banana-beach, kata, karon, naiharn, patong, surin, kamala, bangtao, mai-khao, naiyang, freedom
  {
    id: "banana-beach",
    title: "Banana Beach (Ко Хе)",
    description: "Уникальный пляж на острове Ко Хе с белым песком и прозрачной водой.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    location: "Остров Ко Хе (Coral Island)",
    rating: 4.9,
    tags: ["Остров", "Снорклинг", "SUP", "Ресторан", "Тропики", "Уединённый"],
    price: 0,
    popularity: 5,
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Снорклинг", "SUP и каяки", "Пляжный ресторан", "Прокат лежаков", "Трансфер на лодке", "Фотозоны"],
    reviews: [
      { user: "Андрей", text: "Очень красивый пляж, мало людей, отличная еда!", rating: 5 },
      { user: "Елена", text: "Вода прозрачная, рыбки прямо у берега. Супер для детей!", rating: 4.9 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "kata",
    title: "Пляж Ката",
    description: "Один из самых популярных пляжей Пхукета. Идеален для семейного отдыха.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    location: "Западное побережье",
    rating: 4.8,
    tags: ["Семейный", "Сёрфинг", "Рестораны"],
    price: 0,
    popularity: 5,
    gallery: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Сёрфинг", "Рестораны", "Прокат лежаков", "Детские площадки"],
    reviews: [
      { user: "Иван", text: "Отличный пляж для всей семьи!", rating: 5 },
      { user: "Мария", text: "Чисто, красиво, много кафе.", rating: 4.5 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "karon",
    title: "Пляж Карон",
    description: "Протяжённый пляж с мягким песком и развитой инфраструктурой.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    location: "Западное побережье",
    rating: 4.6,
    tags: ["Длинный", "Активный отдых", "Бары"],
    price: 0,
    popularity: 4,
    gallery: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Пляжный волейбол", "Бары", "Прокат скутеров"],
    reviews: [
      { user: "Олег", text: "Очень длинный пляж, удобно гулять!", rating: 4.7 },
      { user: "Светлана", text: "Много развлечений и кафе.", rating: 4.3 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "naiharn",
    title: "Пляж Най Харн",
    description: "Уединённый пляж с чистой водой и живописными видами.",
    image: "https://images.unsplash.com/photo-1465378552550-1caf2b7b2a45?auto=format&fit=crop&w=800&q=80",
    location: "Южное побережье",
    rating: 4.7,
    tags: ["Уединённый", "Красивый", "Для пар"],
    price: 0,
    popularity: 3,
    gallery: [
      "https://images.unsplash.com/photo-1465378552550-1caf2b7b2a45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Йога", "Прокат сапбордов", "Кафе"],
    reviews: [
      { user: "Анна", text: "Очень спокойное место, мало людей.", rating: 4.8 },
      { user: "Денис", text: "Красивые виды и чистая вода!", rating: 4.6 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "patong",
    title: "Пляж Патонг",
    description: "Самый оживлённый пляж Пхукета: бары, клубы, развлечения и набережная.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
    location: "Западное побережье, центр туристической жизни",
    rating: 4.2,
    tags: ["Ночная жизнь", "Бары", "Развлечения", "Активный отдых", "Магазины", "Вечеринки"],
    price: 0,
    popularity: 5,
    gallery: [
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      "Ночные клубы и бары (Bangla Road)",
      "Прокат скутеров и водных мотоциклов",
      "Пляжные развлечения: банан, парасейлинг, SUP",
      "Массажные салоны и SPA",
      "Магазины, рынки, торговые центры",
      "Рестораны и кафе"
    ],
    reviews: [
      { user: "Максим", text: "Шумно, но весело! Лучшее место для тусовок.", rating: 4.2 },
      { user: "Екатерина", text: "Вечером всё сверкает, много баров и клубов.", rating: 4.5 }
    ],
    map: "https://www.google.com/maps",
    info: {
      length: "~3 км",
      sand: "Светлый, мягкий",
      infrastructure: "Максимальная: бары, клубы, магазины, массаж, водные развлечения",
      bestTime: "Ноябрь — апрель",
      transport: "Такси, тук-тук, автобусы, аренда скутера"
    }
  },
  {
    id: "surin",
    title: "Пляж Сурин",
    description: "Элитный пляж с белым песком и чистой водой.",
    image: "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80",
    location: "Северо-западное побережье",
    rating: 4.5,
    tags: ["Элитный", "Кафе", "Рестораны"],
    price: 0,
    popularity: 4,
    gallery: [
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465378552550-1caf2b7b2a45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Кафе", "Рестораны", "Пляжные вечеринки"],
    reviews: [
      { user: "Виктория", text: "Очень красиво и уютно!", rating: 4.7 },
      { user: "Артём", text: "Лучшие рестораны на побережье.", rating: 4.6 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "kamala",
    title: "Пляж Камала",
    description: "Спокойный пляж для семей с детьми. Рядом парк Phuket Fantasea.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    location: "Западное побережье",
    rating: 4.4,
    tags: ["Семейный", "Дети", "Парк развлечений"],
    price: 0,
    popularity: 3,
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Парк развлечений", "Детские площадки", "Кафе"],
    reviews: [
      { user: "Ольга", text: "Дети в восторге от парка!", rating: 4.5 },
      { user: "Игорь", text: "Очень спокойный пляж.", rating: 4.3 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "bangtao",
    title: "Пляж Банг Тао",
    description: "Один из самых длинных пляжей острова. Лучшие отели и виллы.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    location: "Северо-западное побережье",
    rating: 4.6,
    tags: ["Длинный", "Отели", "Виллы"],
    price: 0,
    popularity: 4,
    gallery: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Отели", "Виллы", "Пляжные бары"],
    reviews: [
      { user: "Сергей", text: "Очень длинный пляж, много места!", rating: 4.6 },
      { user: "Елена", text: "Красивые виллы и отличный сервис.", rating: 4.7 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "mai-khao",
    title: "Пляж Май Кхао",
    description: "Дикий и малолюдный пляж, рядом аэропорт — вид на посадку самолётов.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    location: "Северное побережье",
    rating: 4.3,
    tags: ["Дикий", "Аэропорт", "Уединённый"],
    price: 0,
    popularity: 2,
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Аэропорт", "Уединённый отдых", "Пикники"],
    reviews: [
      { user: "Владимир", text: "Интересно наблюдать за самолётами!", rating: 4.3 },
      { user: "Татьяна", text: "Мало людей, тихо.", rating: 4.5 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "naiyang",
    title: "Пляж Най Янг",
    description: "Пляж в национальном парке, идеален для пикников и снорклинга.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
    location: "Северное побережье",
    rating: 4.4,
    tags: ["Парк", "Снорклинг", "Пикник"],
    price: 0,
    popularity: 3,
    gallery: [
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Пикники", "Снорклинг", "Прокат лежаков"],
    reviews: [
      { user: "Алексей", text: "Отличное место для снорклинга!", rating: 4.4 },
      { user: "Марина", text: "Понравился национальный парк.", rating: 4.5 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "freedom",
    title: "Пляж Фридом",
    description: "Маленький уединённый пляж с белым песком и лазурной водой.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    location: "Западное побережье",
    rating: 4.7,
    tags: ["Уединённый", "Лодка", "Красивый"],
    price: 0,
    popularity: 2,
    gallery: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Лодка", "Уединённый отдых", "Красивые виды"],
    reviews: [
      { user: "Дмитрий", text: "Очень красивый пляж, мало людей.", rating: 4.8 },
      { user: "Евгения", text: "Добраться только на лодке, но стоит!", rating: 4.7 }
    ],
    map: "https://www.google.com/maps"
  }
];

export const getBeachById = (id: string) => beaches.find(b => b.id === id);
