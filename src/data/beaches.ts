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

export const beaches: Beach[] = [
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
    gallery: [phiPhiImg, phiPhiLagoonImg, phiPhiSunsetImg, phiPhiSpeedboatImg],
    services: ["Снорклинг", "SUP и каяки", "Пляжный ресторан", "Прокат лежаков", "Трансфер на лодке"],
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
      transport: "Лодкой с Пирса Чалонг/Равай 15–25 мин"
    },
    faq: [
      { q: "Как добраться?", a: "Лодкой с пирса Чалонг/Равай, ~15–25 минут." },
      { q: "Подходит для детей?", a: "Да, но следите за посадкой/высадкой на понтоне." }
    ]
  },
  {
    id: "naiyang",
    title: "Най Янг (Nai Yang)",
    description: "Спокойный пляж на севере Пхукета в пределах Национального парка Сиринат — тень от казуаринов, мелководье, атмосфера 'как раньше'.",
    image: naiYangImg,
    location: "Север Пхукета, рядом с аэропортом",
    rating: 4.4,
    tags: ["Спокойный", "Семейный", "Север", "Нац.парк"],
    price: 0,
    popularity: 3,
    gallery: [naiYangImg, maiKhaoImg, surinImg],
    services: ["Лежаки", "Кафе", "Массаж", "Сапборды"],
    reviews: [
      { user: "Мария", text: "Тихо и спокойно, идеально для отдыха с детьми", rating: 4.5 },
      { user: "Сергей", text: "Близко к аэропорту, удобно в первый день", rating: 4.3 }
    ],
    info: {
      length: "~3 км",
      sand: "Мягкий, светлый",
      infrastructure: "Кафе и шейки в тени деревьев, прокат лежаков",
      bestTime: "Ноябрь — апрель",
      transport: "Такси из аэропорта 10–15 мин"
    },
    faq: [
      { q: "Подходит ли для детей?", a: "Да, пологий вход и много тени от деревьев." },
      { q: "Есть ли лежаки?", a: "Да, можно арендовать или располагаться под деревьями." }
    ]
  },
  {
    id: "freedom",
    title: "Фридом Бич (Freedom Beach)",
    description: "Живописная бухта с белоснежным песком и бирюзовой водой к югу от Патонга. Сюда добираются по тропе или на лодке — уединённо и очень красиво.",
    image: freedomImg,
    location: "К югу от Патонга",
    rating: 4.7,
    tags: ["Уединённый", "Живописный", "Бухта", "Снорклинг"],
    price: 0,
    popularity: 4,
    gallery: [freedomImg, phiPhiLagoonImg, phiPhiSunsetImg],
    services: ["Небольшое кафе", "Лежаки", "Снорклинг"],
    reviews: [
      { user: "Алексей", text: "Потрясающе красивое место, стоит похода по тропе!", rating: 5 },
      { user: "Наталья", text: "Вода чистейшая, почти никого нет", rating: 4.8 }
    ],
    info: {
      length: "~200 м",
      sand: "Белый, мелкий",
      infrastructure: "Минимальная - небольшое кафе",
      bestTime: "Утром до 11:00, меньше людей",
      transport: "Пешком по тропе 20 мин или на лодке"
    },
    faq: [
      { q: "Сложно ли добраться?", a: "Тропа довольно крутая, нужна удобная обувь." },
      { q: "Есть ли туалеты?", a: "Есть, но лучше воспользоваться в отеле перед походом." }
    ]
  },
  {
    id: "kata",
    title: "Пляж Ката",
    description: "Один из самых популярных пляжей Пхукета. Идеален для семейного отдыха с развитой инфраструктурой и множеством развлечений.",
    image: kataImg,
    location: "Западное побережье",
    rating: 4.8,
    tags: ["Семейный", "Сёрфинг", "Рестораны", "Популярный"],
    price: 0,
    popularity: 5,
    gallery: [kataImg, karonImg, naiharnImg],
    services: ["Рестораны", "Массаж", "Водные виды спорта", "Прокат оборудования", "Школа сёрфинга"],
    reviews: [
      { user: "Дмитрий", text: "Отличное место для обучения сёрфингу, волны идеальные!", rating: 4.9 },
      { user: "Светлана", text: "Много кафе и ресторанов, удобно с детьми", rating: 4.7 }
    ],
    info: {
      length: "~1.5 км",
      sand: "Мягкий, желтоватый",
      infrastructure: "Полная - отели, рестораны, магазины",
      bestTime: "Сёрфинг: май-октябрь, купание: ноябрь-апрель",
      transport: "Тук-тук, такси, автобус из Патонга"
    },
    faq: [
      { q: "Хорошо ли для сёрфинга?", a: "Да, особенно в низкий сезон (май-октябрь)." },
      { q: "Безопасно ли для детей?", a: "В высокий сезон да, в низкий - осторожно с волнами." }
    ]
  },
  {
    id: "karon",
    title: "Пляж Карон",
    description: "Протяжённый пляж с мягким песком и развитой инфраструктурой. Один из самых длинных пляжей на острове.",
    image: karonImg,
    location: "Западное побережье, между Ката и Патонгом",
    rating: 4.6,
    tags: ["Длинный", "Активный отдых", "Бары", "Семейный"],
    price: 0,
    popularity: 4,
    gallery: [karonImg, kataImg, patongImg],
    services: ["Множество ресторанов", "Бары", "Массаж", "Водные развлечения", "Торговый центр"],
    reviews: [
      { user: "Олег", text: "Длинный пляж, есть где погулять, хорошие рестораны", rating: 4.6 },
      { user: "Анна", text: "Песок скрипит под ногами - забавно!", rating: 4.5 }
    ],
    info: {
      length: "~3.5 км",
      sand: "Мягкий, скрипучий",
      infrastructure: "Очень развитая",
      bestTime: "Ноябрь — апрель",
      transport: "Автобус, тук-тук, такси"
    },
    faq: [
      { q: "Чем заняться вечером?", a: "Много баров и ресторанов вдоль пляжа." },
      { q: "Есть ли торговые центры?", a: "Да, Plaza Karon рядом с пляжем." }
    ]
  },
  {
    id: "naiharn",
    title: "Пляж Най Харн",
    description: "Уединённый пляж с чистой водой и живописными видами на юге острова. Считается одним из самых красивых.",
    image: naiharnImg,
    location: "Юг Пхукета",
    rating: 4.7,
    tags: ["Уединённый", "Красивый", "Для пар", "Закаты"],
    price: 0,
    popularity: 3,
    gallery: [naiharnImg, freedomImg, phiPhiSunsetImg],
    services: ["Рестораны", "Лежаки", "Массаж", "Каяки"],
    reviews: [
      { user: "Игорь", text: "Потрясающие закаты! Очень романтично", rating: 5 },
      { user: "Екатерина", text: "Чистая вода, не так многолюдно как Патонг", rating: 4.6 }
    ],
    info: {
      length: "~1 км",
      sand: "Белый, мелкий",
      infrastructure: "Умеренная - несколько ресторанов",
      bestTime: "Ноябрь — апрель, закаты круглый год",
      transport: "Такси, аренда транспорта"
    },
    faq: [
      { q: "Лучшее время для закатов?", a: "Круглый год около 18:30, особенно красиво в ясную погоду." },
      { q: "Есть ли парковка?", a: "Да, бесплатная парковка рядом с пляжем." }
    ]
  },
  {
    id: "patong",
    title: "Пляж Патонг",
    description: "Самый оживлённый пляж Пхукета: бары, клубы, развлечения и набережная. Центр туристической жизни острова.",
    image: patongImg,
    location: "Западное побережье, центр",
    rating: 4.2,
    tags: ["Ночная жизнь", "Бары", "Развлечения", "Активный отдых", "Магазины"],
    price: 0,
    popularity: 5,
    gallery: [patongImg, karonImg, phiPhiSpeedboatImg],
    services: ["Бангла роуд", "Множество ресторанов", "Ночные клубы", "Торговые центры", "Водные развлечения"],
    reviews: [
      { user: "Максим", text: "Отличная ночная жизнь, но днём многолюдно", rating: 4.3 },
      { user: "Юлия", text: "Много развлечений, но вода не очень чистая", rating: 4.0 }
    ],
    info: {
      length: "~3 км",
      sand: "Желтоватый",
      infrastructure: "Максимальная - всё есть",
      bestTime: "Вечером для развлечений",
      transport: "Центр - легко добраться отовсюду"
    },
    faq: [
      { q: "Безопасно ли гулять ночью?", a: "В туристических зонах да, но будьте внимательны." },
      { q: "Подходит ли для семей?", a: "Днём да, но шумно. Вечером больше для взрослых." }
    ]
  },
  {
    id: "surin",
    title: "Пляж Сурин",
    description: "Элитный пляж с роскошными отелями и ресторанами. Популярен среди состоятельных туристов.",
    image: surinImg,
    location: "Западное побережье, север от Патонга",
    rating: 4.5,
    tags: ["Элитный", "Рестораны", "Отели", "Спокойный"],
    price: 0,
    popularity: 3,
    gallery: [surinImg, kamalaImg, bangtaoImg],
    services: ["Элитные рестораны", "Пляжные клубы", "Массаж", "Водные виды спорта"],
    reviews: [
      { user: "Владимир", text: "Дорого, но очень качественно и красиво", rating: 4.7 },
      { user: "Татьяна", text: "Отличные рестораны прямо на пляже", rating: 4.4 }
    ],
    info: {
      length: "~1 км",
      sand: "Мягкий, светлый",
      infrastructure: "Элитная",
      bestTime: "Ноябрь — апрель",
      transport: "Такси, тук-тук"
    },
    faq: [
      { q: "Дорого ли?", a: "Да, один из самых дорогих пляжей на острове." },
      { q: "Стоит ли посетить?", a: "Определенно, если бюджет позволяет - очень красиво." }
    ]
  },
  {
    id: "kamala",
    title: "Пляж Камала",
    description: "Спокойный семейный пляж с размеренной атмосферой и хорошими отелями.",
    image: kamalaImg,
    location: "Западное побережье",
    rating: 4.4,
    tags: ["Семейный", "Спокойный", "Отели", "Рестораны"],
    price: 0,
    popularity: 3,
    gallery: [kamalaImg, surinImg, bangtaoImg],
    services: ["Отели", "Рестораны", "Массаж", "Водные развлечения"],
    reviews: [
      { user: "Андрей", text: "Тихо и спокойно, идеально для семейного отдыха", rating: 4.5 },
      { user: "Ольга", text: "Хорошие отели, приятная атмосфера", rating: 4.3 }
    ],
    info: {
      length: "~2 км",
      sand: "Мягкий, желтоватый",
      infrastructure: "Хорошая",
      bestTime: "Ноябрь — апрель",
      transport: "Такси, тук-тук"
    },
    faq: [
      { q: "Подходит для детей?", a: "Да, спокойно и безопасно." },
      { q: "Много ли туристов?", a: "Умеренно, не так многолюдно как Патонг." }
    ]
  },
  {
    id: "bangtao",
    title: "Пляж Банг Тао",
    description: "Длинный пляж с лагуной и элитными отелями. Популярен для водных видов спорта.",
    image: bangtaoImg,
    location: "Западное побережье, север",
    rating: 4.3,
    tags: ["Длинный", "Элитный", "Водные виды спорта", "Лагуна"],
    price: 0,
    popularity: 3,
    gallery: [bangtaoImg, surinImg, maiKhaoImg],
    services: ["Элитные отели", "Водные виды спорта", "Рестораны", "Гольф"],
    reviews: [
      { user: "Михаил", text: "Отличное место для кайтсёрфинга", rating: 4.4 },
      { user: "Валерия", text: "Длинный пляж, есть где погулять", rating: 4.2 }
    ],
    info: {
      length: "~6 км",
      sand: "Мягкий, светлый",
      infrastructure: "Элитная в части отелей",
      bestTime: "Ноябрь — апрель",
      transport: "Такси, аренда транспорта"
    },
    faq: [
      { q: "Хорошо для водных видов спорта?", a: "Да, особенно кайтсёрфинг и виндсёрфинг." },
      { q: "Есть ли бюджетные варианты?", a: "Ограниченно, пляж ориентирован на элитный отдых." }
    ]
  },
  {
    id: "mai-khao",
    title: "Пляж Май Кхао",
    description: "Самый длинный пляж Пхукета в национальном парке. Здесь откладывают яйца морские черепахи.",
    image: maiKhaoImg,
    location: "Север Пхукета, национальный парк",
    rating: 4.2,
    tags: ["Длинный", "Национальный парк", "Черепахи", "Природа"],
    price: 0,
    popularity: 2,
    gallery: [maiKhaoImg, naiYangImg, bangtaoImg],
    services: ["Отели", "Рестораны", "Природные тропы"],
    reviews: [
      { user: "Петр", text: "Дикий пляж, почти никого нет - супер!", rating: 4.3 },
      { user: "Марина", text: "Видели черепах! Незабываемо", rating: 4.8 }
    ],
    info: {
      length: "~11 км",
      sand: "Мягкий, светлый",
      infrastructure: "Минимальная",
      bestTime: "Ноябрь — апрель, черепахи: ноябрь-февраль",
      transport: "Такси, аренда транспорта"
    },
    faq: [
      { q: "Можно ли увидеть черепах?", a: "Да, с ноября по февраль ночью откладывают яйца." },
      { q: "Безопасно ли купаться?", a: "Да, но следите за флагами - иногда бывают течения." }
    ]
  },
  // Additional beaches to expand the collection
  {
    id: "kata-noi",
    title: "Пляж Ката Ной",
    description: "Небольшой уютный пляж рядом с Ката. Более тихий и спокойный, чем основной пляж Ката.",
    image: kataImg,
    location: "Западное побережье, рядом с Ката",
    rating: 4.6,
    tags: ["Уединённый", "Семейный", "Спокойный", "Красивый"],
    price: 0,
    popularity: 3,
    gallery: [kataImg, naiharnImg, freedomImg],
    services: ["Рестораны", "Лежаки", "Массаж"],
    reviews: [
      { user: "Иван", text: "Тише чем Ката, но такой же красивый", rating: 4.7 },
      { user: "Алена", text: "Небольшой, но очень уютный пляж", rating: 4.5 }
    ],
    info: {
      length: "~300 м",
      sand: "Мягкий, светлый",
      infrastructure: "Умеренная",
      bestTime: "Ноябрь — апрель",
      transport: "Пешком от Ката или на тук-туке"
    },
    faq: [
      { q: "Чем отличается от Ката?", a: "Меньше людей, тише, но меньше ресторанов." },
      { q: "Подходит для детей?", a: "Да, спокойнее чем основной Ката." }
    ]
  },
  {
    id: "rawai",
    title: "Пляж Равай",
    description: "Пляж рыбацких лодок и морепродуктов, отличная набережная и кафе. Не для купания, но для прогулок идеально.",
    image: naiharnImg,
    location: "Юг Пхукета",
    rating: 4.1,
    tags: ["Прогулки", "Морепродукты", "Лодки", "Набережная"],
    price: 0,
    popularity: 3,
    gallery: [naiharnImg, phiPhiSpeedboatImg, freedomImg],
    services: ["Рестораны морепродуктов", "Прокат лодок", "Массаж", "Рынки"],
    reviews: [
      { user: "Роман", text: "Лучшие морепродукты на острове!", rating: 4.2 },
      { user: "Людмила", text: "Красивая набережная для прогулок", rating: 4.0 }
    ],
    info: {
      length: "~2 км",
      sand: "Каменистый, для купания не подходит",
      infrastructure: "Развитая - рестораны, рынки",
      bestTime: "Вечером на закате",
      transport: "Автобус, тук-тук, такси"
    },
    faq: [
      { q: "Можно ли купаться?", a: "Не рекомендуется, много лодок и мелко." },
      { q: "За чем сюда ехать?", a: "За морепродуктами, прогулками и лодочными турами." }
    ]
  }
];

// Helper function to get beach by ID
export const getBeachById = (id: string): Beach | undefined => {
  return beaches.find(beach => beach.id === id);
};