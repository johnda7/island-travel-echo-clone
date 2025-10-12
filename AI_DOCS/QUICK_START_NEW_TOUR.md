# ⚡ БЫСТРЫЙ СТАРТ - Централизованная система туров (2025)

> **НОВАЯ АРХИТЕКТУРА**: Все туры используют единый шаблон `TourPageTemplate` с iOS 26 дизайном, GPS картами и централизованными данными.

## 🎯 Создать новый тур за 5 минут

### Шаг 1: Создать маршрут с GPS координатами (2 минуты)

**Файл**: `src/data/routes/your-tour-route.ts`

```typescript
import type { RoutePoint } from "@/types/Tour";

export const yourTourRoute: RoutePoint[] = [
  {
    name: 'Пхукет',                    // Название точки
    coordinates: [7.8804, 98.3923],    // ⚡ ОБЯЗАТЕЛЬНО: GPS координаты [lat, lng]
    type: 'start',                     // Тип: 'start' | 'stop' | 'destination'
    time: '06:00',                     // Время прибытия
    description: 'Трансфер из отеля'   // Описание для тултипа
  },
  {
    name: 'Остров Джеймса Бонда',
    coordinates: [8.2751, 98.5014],    // ⚡ БЕЗ КООРДИНАТ = ОШИБКА НА САЙТЕ!
    type: 'stop',
    time: '10:00',
    description: 'Фотосессия на острове'
  },
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'destination',               // Конечная точка
    time: '18:00',
    description: 'Возврат в отель'
  }
];
```

**🔍 Где найти GPS координаты:**
- Google Maps → Правый клик на месте → "Копировать координаты"
- Формат: `[широта, долгота]` (lat, lng)
- Проверка: широта для Таиланда 7-9, долгота 98-100

**⚠️ КРИТИЧЕСКИ ВАЖНО:**
- ❌ **БЕЗ `coordinates`** = TypeError на сайте (Cannot read properties of undefined)
- ❌ **Старый формат** `{icon, location}` больше НЕ РАБОТАЕТ
- ✅ **Новый формат** `{name, coordinates, type}` - ОБЯЗАТЕЛЕН

---

### Шаг 2: Создать данные тура (2 минуты)

**Файл**: `src/data/tours/your-tour/static.ts`

```typescript
import type { TourData } from "@/types/Tour";
import img1 from "@/assets/your-tour/gallery-01.jpg";
import img2 from "@/assets/your-tour/gallery-02.jpg";

export const yourTourData: TourData = {
  id: "your-tour-id",                   // URL-friendly ID
  title: "Название тура на русском",
  subtitle: "КРАТКОЕ ОПИСАНИЕ",
  description: "Полное описание тура...",
  
  // 💰 ЦЕНЫ
  priceAdult: 2500,
  priceChild: 2000,
  priceInfant: 0,                       // Бесплатно для младенцев
  currency: "฿",
  
  // 📊 МЕТАДАННЫЕ
  duration: "1 день (12 часов)",
  groupSize: "до 15 человек",
  rating: 4.9,                          // ⚡ БЕЗ СКОБОК (143) - только число!
  reviewsCount: 143,
  
  // 🖼️ ГАЛЕРЕЯ
  mainImage: img1,
  gallery: [img1, img2, img3, img4, img5],  // Минимум 5-7 фото
  
  // ✨ ЧТО ВКЛЮЧЕНО
  highlights: [
    "Трансфер из отеля и обратно",
    "Русскоговорящий гид",
    "Обед и напитки",
    "Страховка",
  ],
  
  included: [
    "Транспорт (автобус и лодка)",
    "Входные билеты",
    "Оборудование для снорклинга",
  ],
  
  excluded: [
    "Личные расходы",
    "Алкогольные напитки",
  ],
};
```

**Файл**: `src/data/tours/your-tour/index.ts`
```typescript
export * from './static';
```

---

### Шаг 3: Создать страницу тура (30 секунд)

**Файл**: `src/pages/YourTourNew.tsx`

```typescript
import { TourPageTemplate } from "@/components/TourPageTemplate";
import { yourTourData } from "@/data/tours/your-tour";
import { yourTourRoute } from "@/data/routes/your-tour-route";

const YourTourNew = () => {
  return (
    <TourPageTemplate 
      tourData={yourTourData}
      routePoints={yourTourRoute}        // ⚡ С GPS картой
    />
  );
};

export default YourTourNew;
```

**Без карты (если нет маршрута):**
```typescript
<TourPageTemplate 
  tourData={yourTourData}
  breadcrumbCategory="Туры"
/>
```

---

### Шаг 4: Добавить роутинг (30 секунд)

**Файл**: `src/App.tsx`

```typescript
import YourTour from "./pages/YourTour";

// В Routes:
<Route path="/tours/your-tour" element={<YourTour />} />
```

---

### Шаг 5: Проверить (30 секунд)

```bash
npm run dev
```

Открой: `http://localhost:8080/#/tours/your-tour`

**✅ Проверь:**
- Gallery swipe работает
- Booking modal открывается
- Карта отображается (если есть routePoints)
- Цена синяя (#007AFF)

---

## 🎨 Что автоматически получаешь

✅ iOS 26 Gallery (swipe, wheel, keyboard)  
✅ Compact Header (breadcrumbs + title)  
✅ Horizontal Scroll Tags  
✅ Route Map (если routePoints)  
✅ Booking Modal  
✅ Mobile Booking Bar  
✅ Все iOS 26 стили  

---

## 📝 Шпаргалка типов

### TourData (обязательные поля)

```typescript
{
  id: string;           // "phi-phi-islands"
  title: string;        // "Пхи-Пхи острова"
  subtitle: string;     // "Краткое описание"
  gallery: string[];    // минимум 5 фото
  priceAdult: number;   // 2500
  priceChild: number;   // 2000
  currency: string;     // "฿"
  duration: string;     // "12 часов"
  groupSize: string;    // "до 15 человек"
  rating: number;       // 4.9
  reviewsCount: number; // 234
  highlights: string[]; // ["✓ Трансфер", ...]
}
```

### RoutePoint (для карты)

```typescript
{
  name: string;               // "Пхукет"
  coordinates: [number, number]; // [7.88, 98.39]
  type: 'start' | 'stop' | 'destination';
  time?: string;              // "06:00"
  description?: string;       // "Трансфер"
}
```

---

## 🔄 Обновить ВСЕ туры сразу

**Один раз изменил → везде работает!**

**Файл**: `src/components/TourPageTemplate.tsx`

```typescript
// Например, изменить текст кнопки:

// БЫЛО:
<Button>Забронировать тур</Button>

// СТАЛО:
<Button>Забронировать сейчас</Button>

// ✅ Автоматически обновится на ВСЕХ 30+ турах!
```

---

## 🚨 Важные правила

### ❌ НЕ делай:
- Не копируй код из TourPageTemplate в страницы туров
- Не дублируй стили
- Не изменяй iOS 26 цвета (#007AFF, #34C759)

### ✅ ДЕЛАЙ:
- Все изменения ТОЛЬКО в TourPageTemplate.tsx
- Данные туров в src/data/tours/
- Маршруты в src/data/routes/
- Следуй структуре CheoLanLake

---

## 📚 Полная документация

- **iOS 26 Design System**: `AI_DOCS/IOS26_DESIGN_PROMPT.md`
- **Централизованная система**: `AI_DOCS/CENTRALIZED_TOUR_SYSTEM.md`
- **Эталон**: `src/pages/CheoLanLakeNew.tsx` (11 строк)

---

## 🎯 Примеры

### Простой тур (без карты)
```typescript
<TourPageTemplate tourData={simpleTourData} />
```

### Тур с картой
```typescript
<TourPageTemplate 
  tourData={tourData}
  routePoints={routePoints}
/>
```

### Тур с кастомными breadcrumbs
```typescript
<TourPageTemplate 
  tourData={tourData}
  breadcrumbCategory="Экскурсии"
  breadcrumbCategoryLink="/tours?category=sightseeing"
/>
```

---

## 💡 Золотое правило

**CheoLanLake = Эталон!** 🏆

Сомневаешься как сделать? Смотри на CheoLanLake.

---

**Время создания нового тура: 5 минут** ⚡
