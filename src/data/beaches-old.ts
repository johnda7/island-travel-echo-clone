import patongImg from "@/assets/patong-beach.jpg";
import kataImg from "@/assets/kata-beach.jpg";
import karonImg from "@/assets/karon-beach.jpg";
import naiharnImg from "@/assets/naiharn-beach.jpg";
import surinImg from "@/assets/surin-beach.jpg";
import kamalaImg from "@/assets/kamala-beach.jpg";
import bangtaoImg from "@/assets/bangtao-beach.jpg";
import maiKhaoImg from "@/assets/mai-khao-beach.jpg";
import naiYangImg from "@/assets/naiyang-beach.jpg";
import freedomImg from "@/assets/freedom-beach.jpg";

// Additional beach images (using available assets as fallbacks for missing beaches)
import phiPhiImg from "@/assets/phi-phi-maya-bay.jpg";
import phiPhiLagoonImg from "@/assets/phi-phi-lagoon.jpg";
import phiPhiSunsetImg from "@/assets/phi-phi-sunset.jpg";
import phiPhiSpeedboatImg from "@/assets/phi-phi-speedboat.jpg";
import phiPhiSnorkelingImg from "@/assets/phi-phi-snorkeling.jpg";
import phiPhiMonkeyImg from "@/assets/phi-phi-monkey-beach.jpg";
import mayaBayImg from "@/assets/maya-bay-sunrise.jpg";

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
  tips?: string[];
  faq?: { q: string; a: string }[];
  info?: {
    length?: string;
    sand?: string;
    infrastructure?: string;
    bestTime?: string;
    transport?: string;
  };
  pros?: string[];
  cons?: string[];
  zones?: { name: string; desc: string }[];
  safetyTips?: string[];
  prices?: {
    sunbed?: string;
    umbrella?: string;
    jetSki?: string;
    banana?: string;
    parasailing?: string;
    sup?: string;
    kayak?: string;
  };
  hotels?: { name: string; url?: string; rating?: number; distance?: string }[];
};

// Единый источник данных пляжей (объединяет то, что уже было на страницах)
export const beaches: Beach[] = [
  // Минимум — те, что уже используются в Beaches.tsx: banana-beach, kata, karon, naiharn, patong, surin, kamala, bangtao, mai-khao, naiyang, freedom
  {
    id: "banana-beach",
    title: "Banana Beach (Ко Хе)",
    description: "Уникальный пляж на острове Ко Хе с белым песком и прозрачной водой.",
    image: phiPhiImg,
    location: "Остров Ко Хе (Coral Island)",
    rating: 4.9,
    tags: ["Остров", "Снорклинг", "SUP", "Ресторан", "Тропики", "Уединённый"],
    price: 0,
    popularity: 5,
    gallery: [
      phiPhiImg,
      phiPhiLagoonImg,
      phiPhiSunsetImg,
      phiPhiSpeedboatImg,
      phiPhiSnorkelingImg
    ],
    services: ["Снорклинг", "SUP и каяки", "Пляжный ресторан", "Прокат лежаков", "Трансфер на лодке", "Фотозоны"],
    reviews: [
      { user: "Андрей", text: "Очень красивый пляж, мало людей, отличная еда!", rating: 5 },
      { user: "Елена", text: "Вода прозрачная, рыбки прямо у берега. Супер для детей!", rating: 4.9 }
    ],
  map: "https://www.google.com/maps?q=Banana%20Beach%20Koh%20Hey%2C%20Phuket%2C%20Thailand&z=14&hl=ru&iwloc=near&output=embed",
    info: {
      length: "~300 м",
      sand: "Белый, мелкий",
      infrastructure: "Пляжные рестораны, прокаты, понтон для высадки",
      bestTime: "Ноябрь — апрель (штиль, лучшая видимость)",
      transport: "Лодкой с Пирса Чалонг/Равай 15–25 мин; туры на полдня/день"
    },
    pros: [
      "Прозрачная вода и белый песок",
      "Отличный снорклинг прямо у берега",
      "Есть рестораны и комфортная инфраструктура"
    ],
    cons: [
      "Доступ только по воде",
      "В высокий сезон много тургрупп в полдень"
    ],
    zones: [
      { name: "Центр", desc: "Понтон, рестораны, лежаки — самая оживлённая часть" },
      { name: "Левый край", desc: "Спокойнее, хороший снорклинг у камней" },
      { name: "Правый край", desc: "Чуть глубже, меньше людей, фотозоны" }
    ],
    safetyTips: [
      "Следите за лодками у понтона",
      "Во время прибоя будьте внимательны на понтоне",
      "Используйте крем от солнца, рифы обгорают"
    ],
    prices: {
      sunbed: "200–300฿/комплект",
      sup: "300–400฿/час",
      kayak: "300–400฿/час"
    },
    hotels: [
      { name: "Coral Island Resort", rating: 4.0, distance: "на острове Ко Хе" }
    ],
    tips: [
      "Лучше приезжать утром — меньше людей и спокойнее море",
      "Берите маску: рыбки прямо у камней с обеих сторон",
      "Волнорез/понтон может качать на волне — держитесь за поручни"
    ],
    faq: [
      { q: "Как добраться?", a: "Лодкой с пирса Чалонг/Равай (частная лодка или тур), ~15–25 минут." },
      { q: "Подходит для детей?", a: "Да, но следите за посадкой/высадкой на понтоне и за лодками." },
      { q: "Есть ли лежаки и еда?", a: "Да, есть рестораны и аренда лежаков на пляже." }
    ]
  },
  {
    id: "naiyang",
    title: "Най Янг (Nai Yang)",
    description:
      "Спокойный пляж на севере Пхукета в пределах Национального парка Сиринат — тень от казуаринов, мелководье, атмосфера ‘как раньше’. Отличный выбор для семей и тех, кто любит тишину рядом с аэропортом.",
    image: naiYangImg,
    location: "Север Пхукета, рядом с аэропортом HKT",
    rating: 4.4,
    tags: ["Спокойный", "Семейный", "Север", "Нац.парк"],
    price: 0,
    popularity: 3,
    gallery: [naiYangImg],
    services: ["Лежаки", "Кафе", "Массаж", "Сапборды"],
    info: {
      length: "~3 км",
      sand: "Мягкий, светлый",
      infrastructure: "Кафе и шейки в тени деревьев, прокат лежаков и сапбордов",
      bestTime: "Ноябрь — апрель (тихое море)",
      transport: "Такси/Grab из аэропорта 10–15 мин; аренда авто/скутера"
    },
    tips: [
      "Идеален в первый/последний день отдыха — близко к аэропорту",
      "Тени много — можно обойтись без зонта",
      "Южнее иногда видны взлетающие самолёты — эффектные фото"
    ],
    faq: [
      { q: "Подходит ли для детей?", a: "Да, пологий вход и тень удобны для семей." },
      { q: "Бывают ли волны?", a: "В низкий сезон возможны волны и течение; следите за флагами." },
      { q: "Есть ли лежаки?", a: "Да, на выделенных участках; также можно располагаться в тени деревьев." }
    ],
    pros: ["Тихо", "Много тени", "Рядом аэропорт"],
    cons: ["Мало развлечений", "Возможны волны летом"],
    zones: [
      { name: "Центр", desc: "Кафе, шейки, лежаки" },
      { name: "Юг", desc: "Виды на самолёты, больше лодок" },
      { name: "Север", desc: "Спокойнее и малолюдно" }
    ],
    safetyTips: [
      "Следите за флагами в низкий сезон",
      "Осторожно у лодок на юге",
      "Остерегайтесь медуз в низкий сезон"
    ],
    prices: { sunbed: "150–200฿/комплект", sup: "200–300฿/час", kayak: "200–300฿/час" },
    hotels: [
      { name: "The Slate", rating: 4.7, distance: "5–10 мин пешком" },
      { name: "Nai Yang Beach Resort", rating: 4.3, distance: "2–5 мин" }
    ]
  },
  {
    id: "freedom",
    title: "Фридом Бич (Freedom Beach)",
    description:
      "Живописная бухта с белоснежным песком и бирюзовой водой к югу от Патонга. Сюда добираются по тропе или на лодке — уединённо и очень красиво.",
    image: freedomImg,
    location: "Юго-запад Пхукета, между Патонгом и Кароном",
    rating: 4.7,
    tags: ["Уединённый", "Живописный", "Бухта", "Снорклинг"],
    price: 0,
    popularity: 4,
    gallery: [freedomImg],
    services: ["Небольшие кафе (сезон)", "Туалеты", "Лодки-такси с Патонга"],
    info: {
      length: "~300 м",
      sand: "Очень белый, мелкий",
      infrastructure: "Минимальная, сезонная",
      bestTime: "Ноябрь — апрель (штиль и лучшая видимость)",
      transport: "Лодка с Патонга 10–15 мин или пешком по тропе 20–30 мин"
    },
    tips: [
      "Нужна удобная обувь для тропы",
      "Приходите утром — меньше людей и мягкий свет",
      "Возьмите воду и перекус вне высокого сезона"
    ],
    faq: [
      { q: "Как проще добраться?", a: "В сезон быстрее на лодке; пешком — дешевле, но тяжелее." },
      { q: "Подходит ли для детей?", a: "Младшим детям сложен доступ — лучше выбрать Карон/Кату." },
      { q: "Есть ли лежаки?", a: "Постоянных рядов обычно нет, инфраструктура минимальна." }
    ],
    pros: ["Вау-виды", "Чистая вода", "Снорклинг у камней"],
    cons: ["Сложный доступ", "В сезон людно в полдень", "Мало тени"],
    zones: [
      { name: "Левый край", desc: "Камни и снорклинг" },
      { name: "Центр", desc: "Самая широкая песчаная часть" },
      { name: "Правый край", desc: "Чуть глубже, под водой камни" }
    ],
    safetyTips: [
      "В жару следите за гидратацией",
      "Будьте осторожны у камней на волне",
      "Тропа скользкая после дождя"
    ],
    prices: {
      sunbed: "200–300฿/комплект (сезон)",
      kayak: "300–400฿/час"
    },
    hotels: [
      { name: "Avista Hideaway Phuket Patong - MGallery", rating: 4.6, distance: "5–10 мин на тук-туке" }
    ],
    map: ""
  },
  {
    id: "kata",
    title: "Пляж Ката",
    description: "Один из самых популярных пляжей Пхукета. Идеален для семейного отдыха.",
    image: kataImg,
    location: "Западное побережье",
    rating: 4.8,
    tags: ["Семейный", "Сёрфинг", "Рестораны"],
    price: 0,
    popularity: 5,
    gallery: [
      kataImg,
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Сёрфинг", "Рестораны", "Прокат лежаков", "Детские площадки"],
    reviews: [
      { user: "Иван", text: "Отличный пляж для всей семьи!", rating: 5 },
      { user: "Мария", text: "Чисто, красиво, много кафе.", rating: 4.5 }
    ],
    map: "",
    info: {
      length: "~1.5 км",
      sand: "Светлый, мягкий",
      infrastructure: "Сёрф-школы, кафе, набережная",
      bestTime: "Ноябрь — апрель (купание), май—октябрь (сёрфинг)",
      transport: "Тук-тук, такси, автобус из Пхукет-тауна, аренда скутера"
    },
    tips: [
      "Для сёрфинга удобнее южная часть пляжа",
      "Утром меньше людей и чище вода",
      "При сильной волне пригодятся рифовые тапочки",
      "Загляните на смотровую Karon Viewpoint неподалёку"
    ],
    faq: [
      { q: "Есть ли спасатели?", a: "Да, в высокий сезон на Кате дежурят спасатели." },
      { q: "Можно ли арендовать доску для сёрфинга?", a: "Да, рядом с пляжем работают сёрф-станции и школы." },
      { q: "Подходит ли для детей?", a: "Да, вне сезона волн море спокойное; следите за флагами безопасности." },
      { q: "Есть парковка?", a: "Есть бесплатные и платные места у дороги и у кафе." },
      { q: "Где лежаки?", a: "Лежаки и зонты доступны на выделенных участках, оплата на месте." }
    ],
    pros: [
      "Подходит для семей и новичков в сёрфинге",
      "Развитая набережная и кафе",
      "Красивая бухта и закаты"
    ],
    cons: [
      "В высокий сезон людно",
      "Летом бывают сильные волны и течения"
    ],
    zones: [
      { name: "Север", desc: "Спокойнее, чуть глубже, хорошие места для купания" },
      { name: "Центр", desc: "Больше людей, прокаты и кафе рядом" },
      { name: "Юг", desc: "Сёрф-школы, волны летом, красивый вид на остров Ката Ной" }
    ],
    safetyTips: [
      "Следите за флагами безопасности, особенно летом",
      "Не заплывайте за буйки и избегайте зон гидроциклов",
      "Волна может быть сильной у камней — будьте осторожны"
    ],
    prices: {
      sunbed: "150–200฿/комплект",
      umbrella: "входит с лежаком",
      sup: "200–300฿/час",
      kayak: "200–300฿/час"
    },
    hotels: [
      { name: "Katathani Phuket Beach Resort", rating: 4.6, distance: "Ката Ной, 5–10 мин" },
      { name: "Novotel Phuket Kata Avista", rating: 4.4, distance: "10–15 мин пешком" }
    ]
  },
  {
    id: "karon",
    title: "Пляж Карон",
    description: "Протяжённый пляж с мягким песком и развитой инфраструктурой.",
    image: karonImg,
    location: "Западное побережье",
    rating: 4.6,
    tags: ["Длинный", "Активный отдых", "Бары"],
    price: 0,
    popularity: 4,
    gallery: [
      karonImg,
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Пляжный волейбол", "Бары", "Прокат скутеров"],
    reviews: [
      { user: "Олег", text: "Очень длинный пляж, удобно гулять!", rating: 4.7 },
      { user: "Светлана", text: "Много развлечений и кафе.", rating: 4.3 }
    ],
    map: "",
    info: {
      length: "~3 км",
      sand: "Золотистый, 'поющий' песок",
      infrastructure: "Кафе, бары, массаж, спортплощадки",
      bestTime: "Ноябрь — апрель",
      transport: "Тук-тук, такси, автобус, аренда скутера"
    },
    tips: [
      "В сезон волн следите за красными флагами — течение может быть сильным",
      "Закаты на Кароне особенно красивые — приходите к 18:00",
      "Южная часть ближе к Ката обычно спокойнее",
      "Удобно бегать и гулять по длинной кромке воды"
    ],
    faq: [
      { q: "Есть ли спасатели?", a: "Да, на популярных участках работают спасатели." },
      { q: "Подходит ли для детей?", a: "Да, но при волне будьте внимательны — выход в воду местами резкий." },
      { q: "Есть ли сёрфинг?", a: "Летом часто бывают волны, возможен сёрфинг для начинающих." },
      { q: "Где меньше людей?", a: "Ближе к северному краю и утром народу меньше." }
    ],
    pros: [
      "Очень длинный пляж — места хватает всем",
      "Красивая набережная и закаты",
      "Хорошо для пробежек и прогулок"
    ],
    cons: [
      "Летом бывают опасные течения",
      "В центре может быть шумно возле дороги"
    ],
    zones: [
      { name: "Север", desc: "Тише, реже волна, ближе к Ката Ной" },
      { name: "Центр", desc: "Инфраструктура, бары и активность" },
      { name: "Юг", desc: "Ближе к Ката, положе вход, чуть спокойнее" }
    ],
    safetyTips: [
      "Соблюдайте указания спасателей и флаги",
      "Остерегайтесь прибоя и обратных течений летом",
      "Детям — только на мелководье и под присмотром"
    ],
    prices: {
      sunbed: "100–150฿/комплект",
      umbrella: "входит с лежаком",
      jetSki: "1500–2500฿/30 мин",
      banana: "400–600฿/чел",
      sup: "200–300฿/час",
      kayak: "200–300฿/час"
    },
    hotels: [
      { name: "Mandarava Resort and Spa", rating: 4.6, distance: "5–10 мин на тук-туке" },
      { name: "Centara Grand Beach Resort", rating: 4.5, distance: "1-я линия" }
    ]
  },
  {
    id: "naiharn",
    title: "Пляж Най Харн",
    description: "Уединённый пляж с чистой водой и живописными видами.",
    image: naiharnImg,
    location: "Южное побережье",
    rating: 4.7,
    tags: ["Уединённый", "Красивый", "Для пар"],
    price: 0,
    popularity: 3,
    gallery: [
      naiharnImg,
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Йога", "Прокат сапбордов", "Кафе"],
    reviews: [
      { user: "Анна", text: "Очень спокойное место, мало людей.", rating: 4.8 },
      { user: "Денис", text: "Красивые виды и чистая вода!", rating: 4.6 }
    ],
    map: "",
    info: {
      length: "~700 м",
      sand: "Светлый, мягкий",
      infrastructure: "Немного кафе и аренда сапбордов",
      bestTime: "Ноябрь — апрель",
      transport: "Скутер, такси; автобус до Равая, дальше недалеко"
    },
    tips: [
      "Приходите утром — тише и вода прозрачнее",
      "Возьмите маску: у камней справа встречаются рыбы",
      "Закат здесь красивый — отличный спот для фото",
      "Проверьте доступ к смотровой Windmill — лучшие виды рядом",
      "Снорклинг у скал слева/справа лучше утром при штиле"
    ],
    faq: [
      { q: "Подходит для детей?", a: "Да, вход пологий, но следите за волной в низкий сезон." },
      { q: "Есть ли тень?", a: "Частично от деревьев, лучше взять зонт." },
      { q: "Есть парковка?", a: "Есть у дороги, в сезон может быть занято." },
      { q: "Где поесть?", a: "Над пляжем и у озера Най Харн есть кафе и рынки." }
    ]
  },
  {
    id: "patong",
    title: "Пляж Патонг",
    description: "Самый оживлённый пляж Пхукета: бары, клубы, развлечения и набережная.",
    image: patongImg,
    location: "Западное побережье, центр туристической жизни",
    rating: 4.2,
    tags: ["Ночная жизнь", "Бары", "Развлечения", "Активный отдых", "Магазины", "Вечеринки"],
    price: 0,
    popularity: 5,
    gallery: [
      patongImg,
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"
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
    },
    pros: [
      "Лучшая инфраструктура на острове",
      "Множество кафе, баров, клубов и магазинов",
      "Длинная набережная для прогулок",
      "Простой доступ транспортом из любой точки"
    ],
    cons: [
      "Многолюдно в высокий сезон",
      "Шумно вечером (особенно у Bangla Road)",
      "Летом бывают сильные волны и течения"
    ],
    zones: [
      { name: "Северная часть", desc: "Спокойнее, чище вода, меньше шума и людей." },
      { name: "Центр (Bangla Road)", desc: "Самая оживлённая зона: бары, клубы, ночная жизнь." },
      { name: "Южная часть", desc: "Ближе к Три Трангу и Paradise, умеренно людно, удобный вход." }
    ],
    safetyTips: [
      "Следите за цветом флагов: красный — купание запрещено",
      "Во время волн купайтесь на мелководье и не заплывайте за буйки",
      "Держитесь подальше от гидроциклов и зон старта парасейлинга"
    ],
    prices: {
      sunbed: "от 100–150 бат/день",
      umbrella: "включён с лежаком или ~50 бат",
      jetSki: "1500–2500 бат/30 мин (торг уместен)",
      banana: "400–600 бат/чел",
      parasailing: "1500–2000 бат/полет",
      sup: "200–300 бат/час",
      kayak: "200–300 бат/час"
    },
    hotels: [
      { name: "Holiday Inn Resort Phuket", url: "https://www.holidayinn.com/", rating: 4.4, distance: "у пляжа" },
      { name: "Baan Laimai Beach Resort", rating: 4.3, distance: "1-я линия" },
      { name: "The Kee Resort & Spa", rating: 4.3, distance: "рядом с Bangla Road" }
    ],
    tips: [
      "Лучшее время — ноябрь–апрель (сухой сезон)",
      "За тусовкой — Bangla Road; за спокойствием — северная часть пляжа",
      "Берите солнцезащиту и головной убор: днём жарко",
      "Прокат лежаков и зонтов — ориентир от 100 бат/день",
      "Вечером пройдитесь по набережной и ночным рынкам"
    ],
    faq: [
      { q: "Есть ли спасатели на пляже?", a: "Да, в дневное время на Патонге дежурят спасатели." },
      { q: "Можно ли арендовать скутер или велосипед?", a: "Да, прокат доступен рядом с пляжем и в отелях." },
      { q: "Есть ли туалеты и душевые?", a: "Да, инфраструктура развита: есть туалеты, душевые и камеры хранения." },
      { q: "Подходит ли Патонг для детей?", a: "Днём — да (спокойные участки на севере), ночью в центре шумно." },
      { q: "Где лучше купаться?", a: "Чище и спокойнее вода обычно в северной части пляжа." }
    ]
  },
  {
    id: "surin",
    title: "Пляж Сурин",
    description: "Элитный пляж с белым песком и чистой водой.",
    image: surinImg,
    location: "Северо-западное побережье",
    rating: 4.5,
    tags: ["Элитный", "Кафе", "Рестораны"],
    price: 0,
    popularity: 4,
    gallery: [
      surinImg,
      "https://images.unsplash.com/photo-1465378552550-1caf2b7b2a45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Кафе", "Рестораны", "Пляжные вечеринки"],
    reviews: [
      { user: "Виктория", text: "Очень красиво и уютно!", rating: 4.7 },
      { user: "Артём", text: "Лучшие рестораны на побережье.", rating: 4.6 }
    ],
    map: "",
    info: {
      length: "~800 м",
      sand: "Белый, мягкий",
      infrastructure: "Рестораны, пляжные бары, немного активностей",
      bestTime: "Ноябрь — апрель",
      transport: "Такси, скутер; автобус до Банг Тао и пешком"
    },
    tips: [
      "Возьмите коврик — стационарных лежаков немного",
      "Утром море спокойнее и меньше людей",
      "В высокий сезон вода очень прозрачная — берите маску",
      "Приходите к закату: мягкий свет и красивые кадры",
      "В праздники возможны мероприятия на пляже"
    ],
    faq: [
      { q: "Подойдёт ли для детей?", a: "Да, но следите за волной в низкий сезон — вход иногда резче." },
      { q: "Есть ли парковка?", a: "Да, у входов есть небольшие парковки." },
      { q: "Много ли людей?", a: "Умеренно; в высокий сезон больше, чем обычно, но не как на Патонге." },
      { q: "Есть лежаки?", a: "На выделенных участках, оплата на месте." }
    ]
  },
  {
    id: "kamala",
    title: "Пляж Камала",
    description: "Спокойный пляж для семей с детьми. Рядом парк Phuket Fantasea.",
    image: kamalaImg,
    location: "Западное побережье",
    rating: 4.4,
    tags: ["Семейный", "Дети", "Парк развлечений"],
    price: 0,
    popularity: 3,
    gallery: [
      kamalaImg,
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Парк развлечений", "Детские площадки", "Кафе"],
    reviews: [
      { user: "Ольга", text: "Дети в восторге от парка!", rating: 4.5 },
      { user: "Игорь", text: "Очень спокойный пляж.", rating: 4.3 }
    ],
    map: "",
    info: {
      length: "~2 км",
      sand: "Мелкий, мягкий",
      infrastructure: "Семейные кафе и отели, рядом Phuket Fantasea",
      bestTime: "Ноябрь — апрель",
      transport: "Тук-тук, такси, местный автобус, скутер"
    },
    tips: [
      "Северная часть пляжа обычно спокойнее",
      "Много тени от деревьев — удобно с детьми",
      "Вечером работает рынок и стритфуд у дороги",
      "Шоу-парк Phuket Fantasea расположен рядом"
    ],
    faq: [
      { q: "Есть ли тень?", a: "Да, вдоль пляжа растут деревья, много естественной тени." },
      { q: "Где перекусить?", a: "На набережной много семейных кафе и ресторанов." },
      { q: "Безопасно ли купаться детям?", a: "Как правило да, следите за флагами и волной в низкий сезон." },
      { q: "Есть парковка?", a: "Есть у дороги и у кафе, в высокий сезон может быть занято." }
    ],
    pros: [
      "Спокойно и удобно для семей",
      "Много тени от деревьев",
      "Развитая инфраструктура рядом"
    ],
    cons: [
      "В высокий сезон людей больше в центре",
      "Летом возможны волны"
    ],
    zones: [
      { name: "Север", desc: "Тише, рядом деревья и естественная тень" },
      { name: "Центр", desc: "Больше кафе и прокатов, оживлённее" },
      { name: "Юг", desc: "Ближе к наклонной косе, просторнее" }
    ],
    safetyTips: [
      "Следите за флагами и предупреждениями спасателей",
      "В низкий сезон возможны течения",
      "Детям — жилет при играх у кромки воды"
    ],
    prices: {
      sunbed: "100–150฿/комплект",
      umbrella: "входит с лежаком",
      sup: "200–300฿/час",
      kayak: "200–300฿/час"
    },
    hotels: [
      { name: "InterContinental Phuket Resort", rating: 4.7, distance: "север Камалы" },
      { name: "Swissôtel Resort Phuket Kamala Beach", rating: 4.3, distance: "рядом с Fantasea" }
    ]
  },
  {
    id: "bangtao",
    title: "Пляж Банг Тао",
    description: "Один из самых длинных пляжей острова. Лучшие отели и виллы.",
    image: bangtaoImg,
    location: "Северо-западное побережье",
    rating: 4.6,
    tags: ["Длинный", "Отели", "Виллы"],
    price: 0,
    popularity: 4,
    gallery: [
      bangtaoImg,
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Отели", "Виллы", "Пляжные бары"],
    reviews: [
      { user: "Сергей", text: "Очень длинный пляж, много места!", rating: 4.6 },
      { user: "Елена", text: "Красивые виллы и отличный сервис.", rating: 4.7 }
    ],
    map: "",
    info: {
      length: "~6 км",
      sand: "Светлый, мягкий",
      infrastructure: "Зона Laguna: отели, рестораны, пляжные бары, Boat Avenue",
      bestTime: "Ноябрь — апрель",
      transport: "Такси, аренда авто/скутера, местные автобусы"
    },
    tips: [
      "Юг пляжа оживлённее (Boat Avenue, рестораны), север — тише и уединённее",
      "Протяжённость большая — удобнее иметь транспорт",
      "Кайтсерфинг возможен в ветреные дни",
      "Закаты на Банг Тао очень живописные — приходите к 18:00"
    ],
    faq: [
      { q: "Есть ли лежаки и зонты?", a: "Да, на выделенных участках пляжа, оплата на месте." },
      { q: "Где поесть?", a: "Много ресторанов в зоне Laguna и на Boat Avenue." },
      { q: "Подходит ли для детей?", a: "Да, особенно в спокойную погоду; глубина нарастает постепенно." },
      { q: "Есть водные развлечения?", a: "Да, каяки, SUP, иногда кайтсерфинг; предложения у отелей и прокатов." }
    ],
    pros: [
      "Очень длинный и просторный пляж",
      "Отличные отели и рестораны",
      "Уютные зоны на севере для уединения"
    ],
    cons: [
      "Большие расстояния — без транспорта длинные прогулки",
      "В сезон — больше людей у Laguna"
    ],
    zones: [
      { name: "Юг (Laguna)", desc: "Рестораны, бары, активности, оживлённо" },
      { name: "Центр", desc: "Сбалансировано: и инфраструктура, и пространство" },
      { name: "Север", desc: "Спокойно, меньше людей, уединение" }
    ],
    safetyTips: [
      "Следите за флагами безопасности",
      "В ветреные дни береговой прибой сильнее",
      "Держитесь подальше от зон гидроциклов"
    ],
    prices: {
      sunbed: "150–200฿/комплект",
      umbrella: "входит с лежаком",
      jetSki: "1500–2500฿/30 мин",
      sup: "200–300฿/час",
      kayak: "200–300฿/час"
    },
    hotels: [
      { name: "Banyan Tree Phuket", rating: 4.7, distance: "зона Laguna" },
      { name: "Angsana Laguna Phuket", rating: 4.5, distance: "зона Laguna" }
    ]
  },
  {
    id: "mai-khao",
    title: "Пляж Май Кхао",
    description: "Дикий и малолюдный пляж, рядом аэропорт — вид на посадку самолётов.",
    image: maiKhaoImg,
    location: "Северное побережье",
    rating: 4.3,
    tags: ["Дикий", "Аэропорт", "Уединённый"],
    price: 0,
    popularity: 2,
    gallery: [
      maiKhaoImg,
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Аэропорт", "Уединённый отдых", "Пикники"],
    reviews: [
      { user: "Владимир", text: "Интересно наблюдать за самолётами!", rating: 4.3 },
      { user: "Татьяна", text: "Мало людей, тихо.", rating: 4.5 }
    ],
    map: "https://www.google.com/maps"
  },
  
  {
    id: "kata-noi",
    title: "Пляж Ката Ной",
    description: "Небольшой уютный пляж рядом с Ката, спокойное море и мягкий песок.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    location: "Западное побережье",
    rating: 4.8,
    tags: ["Семейный", "Уютный", "Купание"],
    price: 0,
    popularity: 4,
    gallery: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Прокат лежаков", "Кафе", "Массаж"],
    reviews: [
      { user: "Роман", text: "Очень уютно и спокойно", rating: 4.8 }
    ],
    map: "",
    info: {
      length: "~700 м",
      sand: "Белый, мягкий",
      infrastructure: "Небольшие кафе, прокат лежаков",
      bestTime: "Ноябрь — апрель",
      transport: "Такси/туктук из Ката, пешком 10–20 мин"
    },
    tips: [
      "Приходите утром для тишины",
      "С маской у краёв бухты видно рыб",
      "Закаты очень красивые на правом краю"
    ],
    faq: [
      { q: "Подходит для детей?", a: "Да, вход пологий в спокойную погоду." },
      { q: "Есть ли лежаки?", a: "Да, на выделенных участках, оплата на месте." }
    ],
    pros: ["Уютный и спокойный", "Чистая вода", "Хорош для семей"],
    cons: ["Мало парковки", "В сезон людно днём"],
    zones: [
      { name: "Левый край", desc: "Снорклинг, камни, меньше людей" },
      { name: "Центр", desc: "Песок, лежаки, кафе" },
      { name: "Правый край", desc: "Закатные виды, немного глубже" }
    ],
    safetyTips: [
      "Следите за флагами в низкий сезон",
      "Осторожно у камней на волне"
    ],
    prices: { sunbed: "150–200฿/комплект" },
    hotels: [
      { name: "Katathani Phuket Beach Resort", rating: 4.6, distance: "1-я линия" }
    ]
  },
  {
    id: "rawai",
    title: "Пляж Равай",
    description: "Пляж рыбацких лодок и морепродуктов, отличная набережная и кафе.",
    image: "https://images.unsplash.com/photo-1465378552550-1caf2b7b2a45?auto=format&fit=crop&w=800&q=80",
    location: "Южное побережье",
    rating: 4.3,
    tags: ["Кафе", "Рыбный рынок", "Набережная"],
    price: 0,
    popularity: 3,
    gallery: [
      "https://images.unsplash.com/photo-1465378552550-1caf2b7b2a45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Рестораны морепродуктов", "Рынок", "Пирс"],
    reviews: [
      { user: "Ирина", text: "Лучшие морепродукты на Пхукете!", rating: 4.6 }
    ],
    map: "",
    info: {
      length: "~1.5 км (набережная)",
      sand: "Смешанный (лодки у берега)",
      infrastructure: "Рыбный рынок, рестораны, пирс",
      bestTime: "Круглый год (купание не основное)",
      transport: "Такси/авто, автобус из Пхукет-тауна"
    },
    tips: [
      "Приходите вечером — рынок и рестораны оживают",
      "Лучшее купание — на ближайших пляжах (Я Нуй, Най Харн)",
      "Отсюда удобно ехать на мыс Промтеп на закат"
    ],
    faq: [
      { q: "Можно ли купаться?", a: "Не лучший пляж для купания — лодки и мели; лучше Я Нуй/Най Харн." },
      { q: "Где поесть морепродукты?", a: "На рыбном рынке Равай — свежий выбор и рестораны рядом." }
    ],
    pros: ["Лучшие морепродукты", "Красивая набережная", "Удобная локация для выездов"],
    cons: ["Не пляж для купания", "Много лодок"],
    zones: [
      { name: "Рынок", desc: "Свежие морепродукты и рестораны" },
      { name: "Пирс", desc: "Отправление лодок, прогулки" },
      { name: "Восток", desc: "Спокойные виды, меньше людей" }
    ],
    safetyTips: ["Будьте внимательны у пирса и лодок"],
    hotels: [ { name: "Rawai Palm Beach Resort", rating: 4.3, distance: "5–10 мин" } ]
  },
  {
    id: "ya-nui",
    title: "Пляж Я Нуй",
    description: "Маленькая бухта между Раваем и мысом Промтеп, отличен для снорклинга.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
    location: "Южное побережье",
    rating: 4.7,
    tags: ["Снорклинг", "Уединённый", "Живописный"],
    price: 0,
    popularity: 3,
    gallery: [
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Снорклинг", "Каяки", "Кафе"],
    reviews: [
      { user: "Павел", text: "Отличное место для маски!", rating: 4.7 }
    ],
    map: "",
    info: {
      length: "~200 м",
      sand: "Светлый, местами камни",
      infrastructure: "Прокат каяков/масок, кафе",
      bestTime: "Ноябрь — апрель",
      transport: "Такси/скутер, рядом мыс Промтеп"
    },
    tips: [
      "Снорклинг у островка напротив",
      "Лучше приходить утром — спокойнее",
      "Можно совместить с закатом на мысе Промтеп"
    ],
    faq: [
      { q: "Подходит для детей?", a: "Да, но следите за камнями и волной." },
      { q: "Есть ли прокат?", a: "Да, каяки и маски доступны на пляже." }
    ],
    pros: ["Отличный снорклинг", "Живописная бухта", "Небольшой и уютный"],
    cons: ["Мало парковки", "В сезон многолюдно днём"],
    zones: [
      { name: "Левый край", desc: "Камни и снорклинг" },
      { name: "Центр", desc: "Песок, прокаты" },
      { name: "Правый край", desc: "Ближе к тропе на Промтеп" }
    ],
    safetyTips: ["Осторожно у камней", "Следите за флагами"],
    prices: { kayak: "200–300฿/час", sup: "200–300฿/час" }
  },
  {
    id: "ao-sane",
    title: "Пляж Ао Сане",
    description: "Каменистая уютная бухта рядом с Най Харном, чистая вода, снорклинг.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    location: "Южное побережье",
    rating: 4.5,
    tags: ["Снорклинг", "Уединённый", "Каменистый"],
    price: 0,
    popularity: 2,
    gallery: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Кафе", "Лежаки", "Снорклинг"],
    reviews: [
      { user: "Николай", text: "Чистая вода и рыбы у берега", rating: 4.6 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "tri-trang",
    title: "Пляж Три Транг",
    description: "Спокойная альтернатива Патонгу рядом, меньше людей и чище вода.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    location: "Западное побережье",
    rating: 4.4,
    tags: ["Рядом с Патонг", "Спокойный", "Кафе"],
    price: 0,
    popularity: 3,
    gallery: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Кафе", "Лежаки", "Прокат каяков"],
    reviews: [
      { user: "Саша", text: "Тихо и спокойно", rating: 4.5 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "paradise-beach",
    title: "Paradise Beach",
    description: "Небольшая бухта с прозрачной водой, клубы и мероприятия в высокий сезон.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    location: "Западное побережье",
    rating: 4.4,
    tags: ["Клубы", "Прозрачная вода", "Снорклинг"],
    price: 0,
    popularity: 3,
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Пляжный клуб", "Бар", "Снорклинг"],
    reviews: [
      { user: "Алёна", text: "Красиво и атмосферно", rating: 4.5 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "kalim",
    title: "Пляж Калим",
    description: "Продолжение Патонга на севере, каменистые участки и волнорезы, стритфуд.",
    image: "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80",
    location: "Западное побережье",
    rating: 4.2,
    tags: ["Стритфуд", "Набережная", "Сёрфинг (сезон)"],
    price: 0,
    popularity: 3,
    gallery: [
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Стритфуд", "Парковка", "Кафе"],
    reviews: [
      { user: "Григорий", text: "Вкусные ночные рынки у дороги", rating: 4.2 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "nai-thon",
    title: "Пляж Най Тхон",
    description: "Спокойный пляж к северу от Най Янга, чистый песок и мало людей.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    location: "Северо-запад",
    rating: 4.5,
    tags: ["Спокойный", "Семейный", "Чистый"],
    price: 0,
    popularity: 2,
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Лежаки", "Кафе"],
    reviews: [
      { user: "Катя", text: "Очень спокойно и красиво", rating: 4.6 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "pansea",
    title: "Пляж Пансеа",
    description: "Маленький пляж между Сурином и Банг Тао, доступ чаще через отели.",
    image: "https://images.unsplash.com/photo-1465378552550-1caf2b7b2a45?auto=format&fit=crop&w=800&q=80",
    location: "Северо-запад",
    rating: 4.3,
    tags: ["Уединённый", "Отели", "Красивый"],
    price: 0,
    popularity: 2,
    gallery: [
      "https://images.unsplash.com/photo-1465378552550-1caf2b7b2a45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Кафе (отели)", "Лежаки"],
    reviews: [
      { user: "Оксана", text: "Очень красиво, но доступ ограничен", rating: 4.2 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "panwa",
    title: "Пляж Панва",
    description: "Уютные бухты на мысе Панва, красивые виды на залив.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
    location: "Юго-восток",
    rating: 4.3,
    tags: ["Спокойный", "Виды", "Отели"],
    price: 0,
    popularity: 2,
    gallery: [
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Кафе", "Отели", "Пирс"],
    reviews: [
      { user: "Станислав", text: "Красивые рассветы", rating: 4.4 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "ao-yon",
    title: "Пляж Ао Йон",
    description: "Тихая бухта на мысе Панва, спокойная вода круглый год.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    location: "Юго-восток",
    rating: 4.5,
    tags: ["Спокойный", "Купание", "Семейный"],
    price: 0,
    popularity: 2,
    gallery: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Кафе", "Отели"],
    reviews: [
      { user: "Тимур", text: "Без волн — идеален для детей", rating: 4.6 }
    ],
    map: "https://www.google.com/maps"
  },
  {
    id: "laem-singh",
    title: "Пляж Лаем Синг (ограниченный доступ)",
    description: "Живописная бухта между Сурином и Камалой, доступ иногда ограничен.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    location: "Северо-запад",
    rating: 4.4,
    tags: ["Живописный", "Уединённый", "Доступ ограничен"],
    price: 0,
    popularity: 2,
    gallery: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Смотровые точки", "Лодка"],
    reviews: [
      { user: "Жанна", text: "Очень красиво, но с доступом бывает сложно", rating: 4.3 }
    ],
    map: "https://www.google.com/maps"
  }
];

export const getBeachById = (id: string) => beaches.find(b => b.id === id);
