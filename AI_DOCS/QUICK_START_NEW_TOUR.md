# ⚡ БЫСТРЫЙ СТАРТ - Централизованная система туров

## 🎯 Создать новый тур за 5 минут

### Шаг 1: Создать данные тура (2 минуты)

**Файл**: `src/data/tours/your-tour.ts`

```typescript
import type { TourData } from "@/types/Tour";

export const yourTourData: TourData = {
  id: "your-tour",
  title: "Название тура на русском",
  subtitle: "Краткое описание локации",
  
  gallery: [
    "/src/assets/your-tour/1.jpg",
    "/src/assets/your-tour/2.jpg",
    "/src/assets/your-tour/3.jpg",
    "/src/assets/your-tour/4.jpg",
    "/src/assets/your-tour/5.jpg",
  ],
  
  priceAdult: 2500,
  priceChild: 2000,
  currency: "฿",
  
  duration: "12 часов",
  groupSize: "до 15 человек",
  rating: 4.9,
  reviewsCount: 234,
  
  highlights: [
    "✓ Трансфер из отеля",
    "✓ Русскоговорящий гид",
    "✓ Обед включен",
    "✓ Страховка",
  ],
};
```

---

### Шаг 2: Создать маршрут (1 минута, опционально)

**Файл**: `src/data/routes/your-tour-route.ts`

```typescript
import type { RoutePoint } from "@/types/Tour";

export const yourTourRoute: RoutePoint[] = [
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '06:00',
    description: 'Трансфер из отеля'
  },
  {
    name: 'Финиш',
    coordinates: [8.7500, 98.7000],
    type: 'destination',
    time: '18:00',
    description: 'Возврат в отель'
  }
];
```

**Где найти координаты:**
- Google Maps → Правый клик → Копировать координаты
- Формат: `[широта, долгота]`

---

### Шаг 3: Создать страницу тура (1 минута)

**Файл**: `src/pages/YourTour.tsx`

```typescript
import { TourPageTemplate } from "@/components/TourPageTemplate";
import { yourTourData } from "@/data/tours/your-tour";
import { yourTourRoute } from "@/data/routes/your-tour-route";

const YourTour = () => {
  return (
    <TourPageTemplate 
      tourData={yourTourData}
      routePoints={yourTourRoute}
      breadcrumbCategory="Туры"
      breadcrumbCategoryLink="/tours?category=adventure"
    />
  );
};

export default YourTour;
```

**Без карты:**
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
