# MASTER PROMPT (RU) — Унифицировать ВСЕ туры «как WordPress-шаблон»

**Роль и уровень:** действуй как Principal Frontend Engineer + Product Owner с 20+ годами опыта. Принимай обоснованные решения без микроменеджмента. Фокус на результат, а не процесс. RU-локализация обязательна.

**Цель:** создать единую архитектуру туров с централизованными данными, где один шаблон управляет всеми турами. WordPress-принцип: правка в одном месте → изменения везде. Полное исключение дублирования кода и данных.

**Контекст проекта:** Vite + React 18 + TypeScript + TailwindCSS + shadcn/ui. GitHub Pages деплой. Существующие туры в разных форматах нужно привести к единому стандарту.

---

## 1) Архитектурные требования (технические)

### Единые шаблоны:
1. **`TourTemplate`** — универсальная страница тура с динамическими данными
2. **`BookingTemplate`** — универсальная страница бронирования с калькулятором
3. **`TourCard`** — единая карточка для списков/каталогов
4. **`PriceCalculator`** — переиспользуемый компонент расчёта стоимости

### Маршрутизация (React Router):
```
/tours/:slug                    → TourTemplate
/book/:slug                     → BookingTemplate  
/book/:slug/:variant            → BookingTemplate с вариантом
/tours                          → Каталог туров
/tours/category/:category       → Фильтр по категории
```

### Централизованные данные:
- **Один файл-источник:** `src/data/tours.ts` (TypeScript с типизацией)
- **Валидация схемы:** Zod/Yup для runtime проверки
- **Автогенерация:** sitemap.xml, breadcrumbs, SEO meta
- **Кэширование:** useMemo для тяжёлых вычислений цен

### TypeScript интерфейсы (обязательно):
```typescript
interface Tour {
  // Базовая информация
  id: string
  slug: string  // URL-friendly, уникальный
  title: string
  subtitle?: string
  
  // Классификация
  category: TourCategory
  tags: string[]
  featured: boolean
  
  // Локация и время
  location: Location
  duration: Duration
  
  // Контент
  description: string
  highlights: string[]  // минимум 3
  itinerary: DayProgram[]
  included: string[]
  excluded: string[]
  notes?: string[]
  
  // Медиа
  images: TourImage[]  // минимум 1
  
  // Цены и бронирование
  pricing: TourPricing
  booking: BookingSettings
  
  // SEO и метаданные
  seo: SEOMeta
  breadcrumbs?: BreadcrumbOverride[]
}
```

---

## 2) Схема данных тура (детализированная)

### Базовые интерфейсы:
```typescript
interface Location {
  country: string           // "Thailand"
  region: string            // "Phuket Province"  
  island?: string           // "Phi Phi Islands"
  city?: string             // "Krabi"
  coordinates?: [number, number]  // [lat, lng]
}

interface Duration {
  days: number              // 2
  nights: number            // 1
  hours?: number            // для экскурсий без ночёвки
}

interface TourImage {
  src: string               // URL или путь к изображению
  alt: string               // Описание для accessibility
  title?: string            // Подпись под фото
  featured?: boolean        // Главное изображение тура
}

interface DayProgram {
  day: number               // 1, 2, 3...
  title: string             // "Отправление и переезд на Пхи-Пхи"
  description?: string      // Подробное описание дня
  activities: Activity[]    // Список активностей
}

interface Activity {
  time?: string             // "09:00" или "Утром"
  title: string             // "Завтрак в отеле"
  description?: string      // Дополнительная информация
  duration?: number         // Длительность в минутах
  location?: string         // "Maya Bay"
}

interface TourPricing {
  currency: 'THB' | 'USD' | 'EUR'
  base: {
    adult: number           // Базовая цена взрослого
    child: number           // Базовая цена ребёнка (2-11 лет)
    infant?: number         // Цена инфанта (0-2 года), часто 0
  }
  seasonal?: SeasonalPrice[]
  fees?: Fee[]              // Обязательные доплаты
  options?: PricingOption[] // Дополнительные опции
  deposit?: DepositSettings
}

interface SeasonalPrice {
  name: string              // "Высокий сезон"
  startDate: string         // "2024-12-20"
  endDate: string           // "2025-01-10"
  multiplier?: number       // 1.3 (на 30% дороже)
  override?: {              // Или фиксированные цены
    adult: number
    child: number
    infant?: number
  }
}

interface Fee {
  name: string              // "Национальный парк"
  amount: number            // 400
  required: boolean         // true/false
  perPerson: boolean        // true - с каждого, false - за группу
  description?: string
}

interface PricingOption {
  id: string                // "snorkeling-gear"
  name: string              // "Снаряжение для снорклинга"
  price: number             // 300
  perPerson: boolean        // true
  description?: string
  included?: boolean        // По умолчанию включено
}

interface DepositSettings {
  enabled: boolean
  percentage?: number       // 30 (30% от суммы)
  fixed?: number           // Или фиксированная сумма
  description?: string     // "При бронировании"
}

interface BookingSettings {
  minPax?: number          // Минимум участников
  maxPax?: number          // Максимум участников  
  advanceDays?: number     // За сколько дней минимум бронировать
  variants?: TourVariant[] // Варианты тура (Standard, VIP)
  availabilityCalendar?: AvailabilityRule[]
}

interface TourVariant {
  id: string               // "standard", "vip"
  name: string             // "Стандарт", "VIP"
  description?: string
  priceModifier?: number   // Множитель цены (1.5 для VIP)
  included?: string[]      // Дополнительные включения
  excluded?: string[]      // Исключения
}

interface SEOMeta {
  metaTitle?: string       // Если отличается от title
  metaDescription: string  // 150-160 символов
  keywords: string[]       // ["пхи-пхи", "майя-бей", "экскурсия"]
  ogImage?: string         // Open Graph изображение
  canonical?: string       // Канонический URL
}
```

### Категории и теги:
```typescript
type TourCategory = 
  | 'marine'              // Морские экскурсии
  | 'cultural'            // Культурные туры
  | 'adventure'           // Приключенческие
  | 'sightseeing'         // Обзорные
  | 'overnight'           // С ночёвкой
  | 'multiday'            // Многодневные

type TourTag = 
  | 'speedboat' | 'longtail' | 'catamaran'    // Транспорт
  | 'snorkeling' | 'diving' | 'swimming'      // Водные активности  
  | 'beach' | 'island' | 'lagoon'             // Локации
  | 'sunset' | 'sunrise' | 'fireshow'         // Время/события
  | 'lunch' | 'breakfast' | 'dinner'          // Питание
  | 'photography' | 'instagram'               // Фото
  | 'family' | 'romantic' | 'group'           // Аудитория
```

---

## 3) Компоненты и поведение (детализированно)

### TourTemplate (универсальная страница тура):

**Структура компонента:**
```jsx
<TourTemplate tour={tour}>
  <TourHero tour={tour} />
  <TourBreadcrumbs tour={tour} />
  <TourGallery images={tour.images} />
  <TourHighlights highlights={tour.highlights} />
  <TourItinerary days={tour.itinerary} />
  <TourInclusions included={tour.included} excluded={tour.excluded} />
  <TourPricing pricing={tour.pricing} />
  <TourBookingCTA tour={tour} />
  <TourNotes notes={tour.notes} />
</TourTemplate>
```

**Функциональность:**
- **Responsive галерея:** мобильный свайп, десктоп lightbox
- **Динамические хлебные крошки:** из `tour.location` или `tour.breadcrumbs`
- **Умная кнопка бронирования:** 
  - Если варианты → показать выбор
  - Если один вариант → прямая ссылка `/book/:slug`
- **Ленивая загрузка:** изображения и тяжёлый контент
- **SEO оптимизация:** JSON-LD, Open Graph, правильные заголовки

### BookingTemplate (универсальная страница бронирования):

**Калькулятор цены (ключевой компонент):**
```jsx
<PriceCalculator 
  tour={tour}
  variant={selectedVariant}
  selectedDate={date}
  participants={{ adults, children, infants }}
  selectedOptions={options}
  onPriceChange={setPricing}
/>
```

**Логика расчёта:**
1. Базовая цена: `adults × adultPrice + children × childPrice + infants × infantPrice`
2. Сезонные корректировки: проверить дату против `seasonal[]`
3. Обязательные сборы: добавить `required fees`
4. Выбранные опции: добавить отмеченные в UI
5. Вариант тура: применить `variant.priceModifier`
6. Депозит: рассчитать если `deposit.enabled`

**UI компоненты бронирования:**
- **DatePicker:** с блокировкой недоступных дат
- **ParticipantSelector:** +/- кнопки с валидацией min/max
- **VariantSelector:** радио-кнопки для выбора варианта
- **OptionsSelector:** чекбоксы дополнительных услуг
- **PriceSummary:** детализированная разбивка стоимости
- **BookingForm:** контактная информация и подтверждение

### TourCard (для каталогов и списков):

**Стандартный вид карточки:**
```jsx
<TourCard tour={tour}>
  <CardImage src={tour.images[0]} alt={tour.title} />
  <CardBadges tags={tour.tags} featured={tour.featured} />
  <CardTitle>{tour.title}</CardTitle>
  <CardLocation>{tour.location.region}</CardLocation>
  <CardDuration>{tour.duration.days}д/{tour.duration.nights}н</CardDuration>
  <CardPrice from={tour.pricing.base.adult} currency={tour.pricing.currency} />
  <CardRating rating={tour.rating} reviews={tour.reviewCount} />
  <CardCTA href={`/tours/${tour.slug}`}>Подробнее</CardCTA>
</TourCard>
```

### Универсальные утилиты:

**Хуки для работы с турами:**
```typescript
// Получение тура по slug
const useTour = (slug: string) => Tour | null

// Расчёт цены с учётом всех факторов  
const usePriceCalculator = (tour, options) => PriceBreakdown

// Фильтрация и поиск туров
const useToursFilter = (filters) => Tour[]

// Валидация бронирования
const useBookingValidation = (tour, booking) => ValidationResult
```

### Глобальные утилитарные функции:

```typescript
// Генерация цены в удобочитаемом формате
const formatPrice = (price: number, currency: string = 'THB'): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency
  }).format(price);
};

// Генерация слага из названия
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-zа-я0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Валидация данных тура
const validateTour = (tour: Tour): ValidationResult => {
  const errors: string[] = [];
  
  if (!tour.title) errors.push('Отсутствует название тура');
  if (!tour.location) errors.push('Не указана локация');
  if (!tour.pricing.base.adult) errors.push('Не указана цена для взрослых');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Поиск туров с фильтрацией
const searchTours = (tours: Tour[], filters: TourFilters): Tour[] => {
  return tours.filter(tour => {
    if (filters.location && !tour.location.island.includes(filters.location)) return false;
    if (filters.maxPrice && tour.pricing.base.adult > filters.maxPrice) return false;
    if (filters.duration && tour.duration.days !== filters.duration) return false;
    if (filters.category && !tour.categories.includes(filters.category)) return false;
    
    return true;
  });
};
```

---

## 5) Роутинг и навигация

### URL-структура:
- **Каталог туров:** `#/tours` - общий список всех доступных туров
- **Детали тура:** `#/tours/:slug` - подробная информация о конкретном туре  
- **Бронирование:** `#/book/:slug/:variant?` - форма бронирования с опциональным вариантом

### Breadcrumbs навигация:
```typescript
const generateBreadcrumbs = (tourSlug: string, variant?: string): BreadcrumbItem[] => {
  const base = [
    { label: "Главная", href: "/" },
    { label: "Туры", href: "/tours" }
  ];
  
  if (tourSlug) {
    const tour = findTourBySlug(tourSlug);
    base.push({ 
      label: tour?.title || "Тур", 
      href: `/tours/${tourSlug}` 
    });
    
    if (variant) {
      base.push({ 
        label: "Бронирование", 
        href: `/book/${tourSlug}/${variant}` 
      });
    }
  }
  
  return base;
};
```

### SEO-дружественные URL:
- Использовать kebab-case для slug'ов
- Включать ключевые слова локации
- Поддерживать редиректы со старых URL
- Генерировать sitemap.xml автоматически

### Примеры маршрутов:
```
#/tours/phi-phi-2-days-1-night
#/tours/james-bond-island-speedboat  
#/tours/maya-bay-sunrise-tour
#/book/phi-phi-2-days-1-night/standard
#/book/james-bond-island-speedboat/premium
```

---

## 6) Контент-менеджмент и качество данных

### Валидация контента:
```typescript
interface ContentValidationRule {
  field: keyof Tour;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: any) => string | null;
}

const CONTENT_RULES: ContentValidationRule[] = [
  { field: 'title', required: true, minLength: 10, maxLength: 100 },
  { field: 'subtitle', required: true, minLength: 20, maxLength: 150 },
  { field: 'description', required: true, minLength: 100, maxLength: 2000 },
  { field: 'images', required: true, customValidator: (imgs) => imgs.length >= 5 ? null : 'Нужно минимум 5 фото' },
  { field: 'itinerary', required: true, customValidator: (days) => days.length > 0 ? null : 'Программа тура обязательна' }
];
```

### SEO оптимизация:
```typescript
interface SEOData {
  metaTitle: string;        // 30-60 символов
  metaDescription: string;  // 120-160 символов  
  keywords: string[];       // Релевантные ключевые слова
  canonicalUrl: string;     // Канонический URL
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: 'website' | 'article';
  };
  jsonLD: StructuredData;   // JSON-LD для поисковиков
}

// Автогенерация SEO данных
const generateSEO = (tour: Tour): SEOData => {
  return {
    metaTitle: `${tour.title} | Туры в Таиланде`,
    metaDescription: tour.subtitle + ` ✓ Лучшие цены ✓ Гарантия качества`,
    keywords: [tour.location.island, ...tour.tags, 'тур', 'экскурсия'],
    canonicalUrl: `/tours/${tour.slug}`,
    openGraph: {
      title: tour.title,
      description: tour.subtitle,
      image: tour.images[0].url,
      type: 'website'
    },
    jsonLD: generateTourStructuredData(tour)
  };
};
```

### Система ревизий и аудита:
- Логирование всех изменений в данных туров
- Система одобрения изменений (approval workflow)
- Автоматические уведомления о проблемах в контенте
- Бэкапы и возможность отката изменений

---

## 7) Интеграции и внешние сервисы

### Telegram уведомления:
```typescript
// Уже реализовано в src/lib/telegram.ts
interface TelegramNotification {
  tourTitle: string;
  customerName: string;
  phone: string;
  date: string;
  participants: { adults: number; children: number; infants: number };
  totalPrice: string;
  specialRequests?: string;
}

const sendBookingNotification = async (booking: TelegramNotification): Promise<boolean> => {
  // Форматированное сообщение с эмодзи и структурой
  // Отправка в @Phuketga канал через @PhuketBookBot
  // Обработка ошибок и fallback на WhatsApp
};
```

### Платёжные системы (будущее):
```typescript
interface PaymentProvider {
  id: string;
  name: string;
  currencies: string[];
  fees: number;
  processingTime: string;
  methods: ('card' | 'bank_transfer' | 'wallet' | 'cash')[];
}

const PAYMENT_PROVIDERS: PaymentProvider[] = [
  {
    id: 'thai_qr',
    name: 'Thai QR Payment',
    currencies: ['THB'],
    fees: 0,
    processingTime: 'instant',
    methods: ['wallet']
  },
  {
    id: 'stripe',
    name: 'Stripe',
    currencies: ['THB', 'USD', 'EUR'],
    fees: 3.4,
    processingTime: '1-3 business days',
    methods: ['card']
  }
];
```

### CRM интеграция:
- Автоматическое создание лидов в CRM системе
- Синхронизация статусов бронирований
- Трекинг источников трафика и конверсий
- Интеграция с email-маркетингом

---

## 8) Производительность и техническая оптимизация

### Оптимизация изображений:
```typescript
interface ImageOptimization {
  original: string;     // Оригинальное изображение
  webp: string;        // WebP формат для современных браузеров
  avif?: string;       // AVIF для максимального сжатия
  sizes: {
    thumbnail: string; // 150x100
    small: string;     // 400x300
    medium: string;    // 800x600
    large: string;     // 1200x900
    hero: string;      // 1920x1080
  };
  alt: string;         // Обязательный alt текст
  blurDataUrl?: string; // Base64 blur placeholder
}

// Адаптивные изображения с lazy loading
const ResponsiveImage: React.FC<{
  image: ImageOptimization;
  className?: string;
}> = ({ image, className }) => (
  <picture className={className}>
    <source srcSet={image.avif} type="image/avif" />
    <source srcSet={image.webp} type="image/webp" />
    <img
      src={image.sizes.medium}
      alt={image.alt}
      loading="lazy"
      placeholder="blur"
      blurDataURL={image.blurDataUrl}
    />
  </picture>
);
```

### Кэширование стратегии:
- **Static Assets:** Агрессивное кэширование CSS/JS (1 год)
- **Images:** Кэширование с версионированием (6 месяцев)  
- **Tour Data:** Кэширование в localStorage с TTL (1 час)
- **API Responses:** Service Worker кэширование (30 минут)

### Bundle optimization:
```typescript
// Ленивая загрузка страниц туров
const TourDetailPage = lazy(() => import('./pages/TourDetail'));
const BookingPage = lazy(() => import('./pages/BookingPage'));

// Предзагрузка критических данных
const preloadTourData = (slug: string) => {
  // Предзагружаем данные тура в фоне
  return import(`./data/tours/${slug}.json`);
};

// Tree shaking неиспользуемых компонентов
export { TourCard, TourTemplate, BookingTemplate } from './components/tours';
```

---

## 9) Пример полной реализации тура

### Файл данных: `src/data/tours/phi-phi-2-days-1-night.ts`
```typescript
import { Tour } from '../types/tour';

export const phiPhi2Days1Night: Tour = {
  id: "phi-phi-2d1n-standard",
  slug: "phi-phi-2-days-1-night",
  title: "Пхи-Пхи: 2 дня с ночёвкой на острове",
  subtitle: "Майя Бэй, снорклинг, огненное шоу и закат с пляжа Лонг Бич",
  description: "Уникальная возможность остаться на ночь на легендарных островах Пхи-Пхи. Посетите знаменитую бухту Майя Бэй, где снимался фильм 'Пляж', понаблюдайте за обезьянами на Monkey Beach, насладитесь снорклингом в кристально чистых водах и встретьте незабываемый закат.",
  
  location: {
    country: "Thailand",
    region: "Krabi Province",
    island: "Phi Phi Islands",
    coordinates: { lat: 7.7407, lng: 98.7784 }
  },
  
  duration: { days: 2, nights: 1 },
  
  categories: ["island-hopping", "overnight", "adventure"],
  tags: ["speedboat", "snorkeling", "beach", "sunset", "fireshow", "photography", "romantic"],
  
  difficulty: "easy",
  groupSize: { min: 2, max: 30 },
  ageRestrictions: { minAge: 3, maxAge: 70 },
  
  pricing: {
    currency: "THB",
    base: { adult: 4000, child: 3500, infant: 0 },
    seasonal: [
      {
        from: "2024-12-20",
        to: "2025-01-10", 
        modifier: 1.3,
        reason: "Новогодние праздники"
      }
    ],
    deposit: { enabled: true, amount: 1000, percentage: 25 }
  },
  
  images: [
    {
      url: "/assets/phi-phi-maya-bay.jpg",
      alt: "Бухта Майя Бэй на островах Пхи-Пхи",
      category: "highlight",
      caption: "Знаменитая бухта Майя Бэй"
    },
    // ... остальные изображения
  ],
  
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
  
  notes: [
    "Возьмите с собой солнцезащитный крем, головной убор и солнечные очки",
    "Рекомендуется взять сменную одежду",
    "Камера или телефон в водонепроницаемом чехле для подводных фото",
    "Небольшая сумма наличными для покупок на острове"
  ],
  
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
  
  availability: {
    daysOfWeek: [1, 2, 3, 4, 5, 6, 7], // Ежедневно
    excludeDates: ["2024-12-25", "2025-01-01"], // Исключённые даты
    advanceBooking: 1 // Минимум 1 день заранее
  },
  
  reviews: {
    averageRating: 4.8,
    totalReviews: 247,
    distribution: {
      5: 189,
      4: 43, 
      3: 12,
      2: 2,
      1: 1
    }
  },
  
  seo: {
    metaTitle: "Пхи-Пхи 2 дня с ночёвкой | Майя Бэй тур из Пхукета",
    metaDescription: "Уникальный тур на острова Пхи-Пхи с ночёвкой ✓ Майя Бэй ✓ Снорклинг ✓ Огненное шоу ✓ Лучшие цены ✓ Русский гид",
    keywords: ["пхи-пхи", "майя бэй", "тур с ночёвкой", "снорклинг", "огненное шоу"],
    openGraph: {
      title: "Пхи-Пхи: 2 дня с ночёвкой на острове",
      description: "Майя Бэй, снорклинг, огненное шоу и закат с пляжа Лонг Бич",
      image: "/assets/phi-phi-maya-bay.jpg"
    }
  },
  
  status: "active",
  featured: true,
  createdAt: "2024-01-15T00:00:00Z",
  updatedAt: "2024-03-20T00:00:00Z"
};
```

### Использование в компонентах:
```tsx
// src/pages/PhiPhi2Days1Night.tsx
import { phiPhi2Days1Night } from '../data/tours/phi-phi-2-days-1-night';
import { TourTemplate } from '../components/tours/TourTemplate';

export const PhiPhi2Days1Night: React.FC = () => {
  return <TourTemplate tour={phiPhi2Days1Night} />;
};

// src/pages/BookPhiPhi2Days1Night.tsx  
import { BookingTemplate } from '../components/tours/BookingTemplate';

export const BookPhiPhi2Days1Night: React.FC = () => {
  return (
    <BookingTemplate 
      tour={phiPhi2Days1Night}
      variant="standard"
    />
  );
};
```
```

**Утилитарные функции:**
```typescript
// Генерация хлебных крошек
generateBreadcrumbs(tour: Tour): Breadcrumb[]

// Форматирование цены по локали
formatPrice(amount: number, currency: string, locale?: string): string

// Проверка доступности даты
isDateAvailable(tour: Tour, date: Date): boolean

// Расчёт финальной цены
calculateTotalPrice(tour: Tour, booking: BookingParams): PriceBreakdown
```

---

## 4) Миграционная стратегия (пошаговый план)

### Фаза 1: Анализ и подготовка
1. **Инвентаризация существующих туров:**
   - Составить полный список туров с их текущими URL
   - Выявить дублирующиеся туры и варианты
   - Проанализировать структуру данных в каждом туре
   - Создать матрицу соответствия "старый формат → новый формат"

2. **Анализ проблем контента:**
   - Неполные данные (отсутствуют цены, фото, описания)
   - Несогласованность в названиях локаций
   - Разные форматы длительности (2д/1н vs 2 дня 1 ночь)
   - Проблемы с ценами (старые курсы, отсутствие детских цен)
   - Несогласованные категории и теги

3. **Создание эталонных примеров:**
   - Выбрать 2-3 "образцовых" тура
   - Привести их к новому формату вручную
   - Создать референсы для контент-менеджеров

### Фаза 2: Создание инфраструктуры
1. **TypeScript интерфейсы и валидация**
2. **Универсальные компоненты**
3. **Утилитарные функции**
4. **CI/CD валидация данных**

### Фаза 3: Миграция контента (по приоритету)
1. **Высокоприоритетные туры** (популярные, приносящие доход)
2. **Среднеприоритетные туры** (сезонные, специализированные)  
3. **Низкоприоритетные туры** (редкие, экспериментальные)

### Фаза 4: Тестирование и оптимизация
1. **Функциональное тестирование** всех маршрутов
2. **Тестирование производительности** (загрузка, рендеринг)
3. **SEO аудит** (мета-теги, структурированные данные)
4. **Accessibility аудит** (WCAG 2.1 AA)

### Маппинг существующих данных:

**Примеры трансформации:**
```typescript
// Старый формат (из текущего кода)
{
  id: 4,
  title: "Пхи-Пхи 2 дня / 1 ночь",
  location: "Острова Пхи-Пхи", 
  duration: "2 дня",
  price: "4,000 ฿ взр. / 3,500 ฿ дети"
}

// Новый формат (целевой)
{
  id: "phi-phi-2d1n-standard",
  slug: "phi-phi-2-days-1-night",
  title: "Пхи-Пхи: 2 дня с ночёвкой на острове",
  subtitle: "Майя Бэй, снорклинг, огненное шоу",
  location: {
    country: "Thailand",
    region: "Krabi Province", 
    island: "Phi Phi Islands"
  },
  duration: { days: 2, nights: 1 },
  pricing: {
    currency: "THB",
    base: { adult: 4000, child: 3500, infant: 0 }
  }
  // ... остальные поля
}
```

### Миграционные скрипты:
Создать автоматизированные скрипты для:
- Извлечения данных из старых компонентов
- Нормализации названий локаций  
- Парсинга и стандартизации цен
- Валидации мигрированных данных
- Генерации отчётов о проблемах

---

## 5) Миграция и исправление текущих ошибок

1. **Инвентаризация:** собрать список всех текущих туров, их slug и где лежат данные сейчас.
2. **Приведение к схеме:** для каждого тура создать централизованную запись с полями из раздела «Централизованные данные» (заполнить пустые места понятными заглушками).
3. **Выявить и исправить типовые ошибки:** неполные цены, пустые галереи, неверные даты сезонов, разнобой в длительности/локациях, дубли полей и т.д.
4. **Сделать отчёт «Проблемные туры»:** список с описанием ошибок и принятыми решениями (чтобы контент-менеджер понимал стандарты).
5. **Удалить/перенести локальные «вшитые» данные из компонентов** — всё в централизованную запись тура.
6. **Включить защиту от регресса:** при сборке и в CI проверять каждую запись тура; при ошибке — сборка/PR падает с понятным сообщением.

---

## 6) Контент-гайд для редакторов (чтобы не плодить ошибки)

• **Обязательные поля тура:** slug, title, duration (days/nights), location (country/region), highlights (≥3), gallery (≥1), itinerary (≥1 день), price.base.adult.
• **Фото:** 1200×800 или лучше; осмысленный alt-текст.
• **Тон:** кратко, по делу; без жаргона; единые правила пунктуации; английские названия мест — как на картах.
• **Программа по дням:** каждое «items» — отдельное действие, 3–8 пунктов на день — оптимально.
• **Цены/валюта:** указать валюту; проверить сезонные окна; сборы помечать как required/non-required.
• **Опции:** чёткие названия, фикс-цены, никакой двусмысленности.
• **SEO:** 1–2 предложения описания, 6–10 ключевых слов; при возможности — ог-картинка.

---

## 7) Качество, доступность, производительность

• Единый внешний вид всех туров и бронирования.
• Адаптив: мобильная/планшет/десктоп.
• Контраст, alt-тексты, клавиатура: соответствовать базовым требованиям доступности.
• Производительность: кэшируй неизменяемые данные; изображения — оптимальные размеры.

---

## 8) Результаты, которые нужно предоставить по завершении

• Туровый шаблон и бронирование работают для каждого тура.
• Все существующие туры мигрированы в единый формат данных; страницы и бронирование открываются по единым маршрутам.
• Отчёт о миграции/ошибках: список, что было и что исправлено.
• Док-гайд для редакторов (1–2 страницы): как добавить новый тур, какие поля обязательны, примеры «как правильно».
• README для разработчиков: как обновлять данные, как проверять ошибки, как запускать проект, где смотреть логи валидации.
• CI-проверка включена: данные валидируются; при несоответствии схеме PR блокируется.

---

## 9) Критерии приёмки (проверяю сам)

• Любой тур открывается по `#/tours/:slug` и выглядит одинаково по структуре.
• Любое бронирование открывается по `#/book/:slug(/:variant)` и считает итоговую цену по тем же правилам для всех туров.
• Хлебные крошки корректны (авто или override из данных тура).
• Цена, сборы, опции и депозит считаются и отображаются одинаково; формат валюты корректен.
• Любая правка в «шаблоне» или калькуляторе сразу видна на всех турах.
• Новый тур добавляется одной записью в централизованные данные и без правок кода появляется в списке/поиске/маршрутах.
• В CI нет «тихих» ошибок: если тур невалиден — PR/сборка падает с читабельным отчётом.

### Использование в компонентах:
```tsx
// src/pages/PhiPhi2Days1Night.tsx
import { phiPhi2Days1Night } from '../data/tours/phi-phi-2-days-1-night';
import { TourTemplate } from '../components/tours/TourTemplate';

export const PhiPhi2Days1Night: React.FC = () => {
  return <TourTemplate tour={phiPhi2Days1Night} />;
};

// src/pages/BookPhiPhi2Days1Night.tsx  
import { BookingTemplate } from '../components/tours/BookingTemplate';

export const BookPhiPhi2Days1Night: React.FC = () => {
  return (
    <BookingTemplate 
      tour={phiPhi2Days1Night}
      variant="standard"
    />
  );
};
```

---

## 10) Заключение и следующие шаги

### Преимущества унифицированной системы:

✅ **Консистентность данных** - все туры используют одинаковую структуру
✅ **Быстрая разработка** - новые туры создаются по готовому шаблону  
✅ **Лёгкая поддержка** - изменения в одном месте применяются ко всем турам
✅ **SEO оптимизация** - автоматическая генерация мета-тегов и структурированных данных
✅ **Типизация** - TypeScript предотвращает ошибки на этапе разработки
✅ **Производительность** - ленивая загрузка и оптимизация изображений

### Критерии готовности к миграции:

1. ✅ **Telegram интеграция** - уже реализована в `src/lib/telegram.ts`
2. ⏳ **TypeScript интерфейсы** - нужно создать `src/types/tour.ts`
3. ⏳ **Универсальные компоненты** - создать `TourTemplate`, `BookingTemplate`
4. ⏳ **Первый эталонный тур** - преобразовать Phi Phi 2d/1n в новый формат
5. ⏳ **Валидация данных** - создать систему проверки контента
6. ⏳ **Миграционные скрипты** - автоматизация преобразования данных

### Ближайшие действия:

**Приоритет 1 (критично):**
- Создать TypeScript интерфейсы в `src/types/tour.ts`
- Создать первый эталонный тур `phi-phi-2-days-1-night.ts`
- Создать `TourTemplate` компонент для универсального отображения

**Приоритет 2 (важно):**
- Создать `BookingTemplate` с интегрированным калькулятором цен
- Добавить валидацию данных туров в CI/CD pipeline
- Создать утилиты для работы с турами (`formatPrice`, `generateSlug`, etc.)

**Приоритет 3 (желательно):**
- Миграция остальных туров по приоритету популярности
- Оптимизация изображений и производительности
- A/B тестирование новых шаблонов против старых

### Оценка трудозатрат:

- **Создание основной инфраструктуры:** 3-5 дней
- **Миграция первого тура (эталон):** 1-2 дня  
- **Создание универсальных компонентов:** 2-3 дня
- **Миграция остальных туров:** 0.5 дня на тур (автоматизированно)
- **Тестирование и отладка:** 2-3 дня

**Общий срок реализации:** 2-3 недели для полной миграции всех туров.

---

### Контрольные точки (Definition of Done):

**✅ Этап завершён, когда:**
- Все туры используют единую структуру данных
- Работает автоматическая валидация контента
- SEO метрики не ухудшились (или улучшились)
- Время загрузки страниц осталось прежним или улучшилось
- Все существующие URL работают (редиректы настроены)
- Telegram уведомления работают стабильно
- Проведено юзабилити тестирование новых шаблонов

**📊 Метрики успеха:**
- Время разработки новых туров сократилось в 3+ раза
- Количество багов, связанных с несогласованностью данных = 0
- Core Web Vitals не ухудшились
- Конверсия бронирований осталась на том же уровне или выросла
- SEO позиции стабильны или улучшились

### Долгосрочная поддержка:
- Ежемесячный аудит качества контента
- Автоматические уведомления о недостающих данных
- Система ревизий для отслеживания изменений
- Документация для контент-менеджеров
- Регулярные бэкапы данных туров

---

## 11) Принципы и анти-цели

### ✅ Принципы реализации:
• **"Как в WordPress"** - один шаблон управляет всем, контент только в данных
• **Централизация** - все туры в `src/data/tours/` с единой структурой
• **Автоматизация** - любая правка в шаблоне сразу видна на всех турах
• **Валидация** - CI/CD проверяет корректность данных туров
• **Масштабируемость** - новый тур = одна запись, без правок кода
• **Типобезопасность** - TypeScript предотвращает ошибки структуры

### ❌ Анти-цели (запрещено):
• Разные шаблоны для разных туров
• Вшитые данные в компонентах  
• "Ручные" правки каждого тура
• Разнобой в маршрутах, кнопках, подписях
• Игнорировать ошибки данных — всё через валидацию
• Дублирование логики между компонентами

---

**🎯 Финальная цель:** Создать систему, где контент-менеджер может добавить новый тур простым добавлением JSON-файла, а вся остальная функциональность (страница тура, бронирование, SEO, навигация) появляется автоматически через универсальные шаблоны.