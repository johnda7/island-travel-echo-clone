# 🎯 ЦЕНТРАЛИЗОВАННАЯ СИСТЕМА ШАБЛОНОВ ТУРОВ

## 📋 Концепция

**CheoLanLake** = **Золотой стандарт (эталон)** для всех туров.

Все остальные страницы туров используют **TourPageTemplate** компонент, который реализует весь iOS 26 дизайн централизованно.

---

## 🏗️ Архитектура

```
┌─────────────────────────────────────────┐
│  TourPageTemplate.tsx                   │
│  (Универсальный компонент)              │
│  • iOS 26 галерея                       │
│  • Компактный header                    │
│  • Horizontal scroll теги               │
│  • Route Map интеграция                 │
│  • Booking modal                        │
│  • Все стили централизованы             │
└─────────────────────────────────────────┘
              ▲
              │ Использует
              │
┌─────────────┴─────────────────────┬─────────────────────┬──────────────────┐
│                                   │                     │                  │
│  CheoLanLake.tsx                  │  PhiPhiIslands.tsx  │  JamesBond.tsx   │
│  (Эталон)                         │  (Примеры)          │  (Примеры)       │
│                                   │                     │                  │
│  import TourPageTemplate          │  import ...         │  import ...      │
│  import tourData                  │  import tourData    │  import tourData │
│  import routePoints               │  import routePoints │  import route    │
│                                   │                     │                  │
│  return <TourPageTemplate         │  return <Template   │  return <...>    │
│    tourData={...}                 │    tourData={...}   │  ...             │
│    routePoints={...}              │    route={...}      │                  │
│  />                               │  />                 │                  │
└───────────────────────────────────┴─────────────────────┴──────────────────┘
```

---

## 🚀 Как применить шаблон к новому туру

### Шаг 1: Подготовить данные тура

**Файл**: `src/data/tours/your-tour.ts`

```typescript
import type { TourData } from "@/types/Tour";

export const yourTourData: TourData = {
  id: "your-tour-id",
  title: "Название тура",
  subtitle: "Краткое описание",
  
  // Галерея (ОБЯЗАТЕЛЬНО)
  gallery: [
    "/src/assets/your-tour/image-1.jpg",
    "/src/assets/your-tour/image-2.jpg",
    // ... минимум 5 фото
  ],
  
  // Цены (ОБЯЗАТЕЛЬНО)
  priceAdult: 2500,
  priceChild: 2000,
  currency: "฿",
  
  // Мета-информация (ОБЯЗАТЕЛЬНО)
  duration: "12 часов",
  groupSize: "до 15 человек",
  rating: 4.9,
  reviewsCount: 234,
  
  // Контент (ОБЯЗАТЕЛЬНО)
  highlights: [
    "Трансфер из отеля",
    "Русскоговорящий гид",
    // ...
  ],
  
  // Опционально
  included: ["Обед", "Страховка"],
  excluded: ["Алкоголь"],
  requirements: ["Паспорт", "Купальник"],
  itinerary: [
    { day: "1", time: "06:00", activity: "Выезд из отеля" },
    // ...
  ]
};
```

---

### Шаг 2: Создать маршрут (если нужна карта)

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
    name: 'Точка 2',
    coordinates: [8.1234, 98.5678],
    type: 'stop',
    time: '10:00',
    description: 'Что будет здесь'
  },
  {
    name: 'Финиш',
    coordinates: [8.9999, 98.8888],
    type: 'destination',
    time: '18:00',
    description: 'Возврат в отель'
  }
];
```

**Как найти координаты:**
1. Открой Google Maps
2. Кликни правой кнопкой на точку
3. Скопируй координаты (первое число = latitude, второе = longitude)

---

### Шаг 3: Создать страницу тура (3 СТРОКИ КОДА!)

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

**ВСЕГО 3 СТРОКИ В RETURN!** 🎉

Если карта не нужна - просто убери `routePoints`:

```typescript
<TourPageTemplate 
  tourData={yourTourData}
  breadcrumbCategory="Туры"
  breadcrumbCategoryLink="/tours"
/>
```

---

## 🎨 Что автоматически получает каждый тур

✅ **iOS 26 Gallery**
- Swipe gestures (touch + trackpad)
- Wheel scroll support
- Keyboard navigation (arrows, Escape)
- Safe-area insets
- Page indicators
- No Grid button / No thumbnails

✅ **Compact Header**
- Breadcrumbs (13px, tight spacing)
- iOS 26 App Store title (28px mobile, SF Pro)
- MapPin icon для location
- Horizontal scroll tags (Safari style)

✅ **Pricing**
- Centralized blue color (#007AFF)
- MobileBookingBar
- Desktop booking card

✅ **Route Map** (если routePoints переданы)
- Interactive Leaflet map
- Custom iOS 26 markers
- Animated polyline
- Legend cards
- Zoom controls

✅ **Booking Modal**
- UniversalBookingModal
- Compact form design

---

## 🔄 Как обновить ВСЕ туры одновременно

### Изменения в TourPageTemplate влияют на ВСЕ туры!

**Пример**: Изменить цвет кнопки бронирования

**Файл**: `src/components/TourPageTemplate.tsx`

```typescript
// Найди:
<Button className="btn-booking w-full">
  Забронировать тур
</Button>

// Измени на:
<Button className="btn-booking-new w-full">
  Забронировать сейчас
</Button>
```

**Результат**: Обновится на ВСЕХ 30+ страницах туров автоматически! 🚀

---

## 📊 Текущий статус миграции

### ✅ Готово (эталон):
- **CheoLanLake** - полностью на TourPageTemplate

### 🔄 Нужно мигрировать (~30 туров):
- PhiPhiIslands
- JamesBondIsland
- RaftingSpaAtv
- MayaBaySunrise
- SimilanIslands
- ... и все остальные

### 🎯 Процесс миграции одного тура (5 минут):

1. Открой существующую страницу тура (например `PhiPhiIslands.tsx`)
2. Скопируй данные в файл `src/data/tours/phi-phi-islands.ts`
3. Создай маршрут в `src/data/routes/phi-phi-islands-route.ts` (если нужна карта)
4. Замени содержимое страницы на 3 строки с TourPageTemplate
5. Проверь на localhost:8080
6. Готово! ✅

---

## 🛠️ Кастомизация для специфичных туров

Если какому-то туру нужны **уникальные секции**, есть два варианта:

### Вариант 1: Prop для кастомного контента

```typescript
<TourPageTemplate 
  tourData={yourTourData}
  routePoints={yourTourRoute}
  customSections={[
    <YourCustomSection key="custom1" />,
    <AnotherSection key="custom2" />
  ]}
/>
```

### Вариант 2: Расширение template

Создай `TourPageTemplateExtended.tsx` для специфичных туров:

```typescript
import { TourPageTemplate } from "./TourPageTemplate";

export const TourPageTemplateExtended = ({ tourData, extraFeature }) => {
  return (
    <>
      <TourPageTemplate tourData={tourData} />
      <ExtraFeatureSection feature={extraFeature} />
    </>
  );
};
```

---

## 🎯 Преимущества централизованной системы

### 1. **Один раз исправил - везде работает**
Изменения в TourPageTemplate применяются к ВСЕМ турам сразу.

### 2. **iOS 26 дизайн по умолчанию**
Не нужно копировать стили, всё централизовано.

### 3. **Легко добавлять новые туры**
3 строки кода вместо 900+ строк.

### 4. **Consistency (единообразие)**
Все туры выглядят одинаково профессионально.

### 5. **Легко тестировать**
Исправил баг в template → баг исправлен на всех 30+ страницах.

---

## 📝 Чек-лист миграции одного тура

```
[ ] 1. Создать файл данных в src/data/tours/
[ ] 2. Перенести все данные из старой страницы
[ ] 3. Создать маршрут в src/data/routes/ (если нужна карта)
[ ] 4. Заменить страницу на 3 строки с TourPageTemplate
[ ] 5. Проверить на localhost:8080
[ ] 6. Проверить галерею (swipe, wheel, keyboard)
[ ] 7. Проверить booking modal
[ ] 8. Проверить карту (если есть routePoints)
[ ] 9. Проверить на iPhone (safe-area, touch)
[ ] 10. Commit & Push
```

---

## 🚨 Важные правила

### ❌ НЕ делай:
- Копировать код из TourPageTemplate в отдельные страницы
- Создавать дубликаты стилей
- Изменять iOS 26 цвета (#007AFF, #34C759, etc.)
- Нарушать структуру данных TourData

### ✅ ДЕЛАЙ:
- Все изменения только в TourPageTemplate
- Данные туров в отдельных файлах
- Следуй существующей структуре
- Тестируй на iPhone после изменений

---

## 🎓 Примеры использования

### Простой тур без карты:
```typescript
<TourPageTemplate tourData={simpleTourData} />
```

### Тур с картой маршрута:
```typescript
<TourPageTemplate 
  tourData={tourData}
  routePoints={routePoints}
/>
```

### Тур с кастомными breadcrumbs:
```typescript
<TourPageTemplate 
  tourData={tourData}
  routePoints={routePoints}
  breadcrumbCategory="Экскурсии"
  breadcrumbCategoryLink="/tours?category=sightseeing"
/>
```

---

## 📚 Связанные файлы

### Ключевые компоненты:
- `src/components/TourPageTemplate.tsx` - главный template
- `src/types/Tour.ts` - TypeScript типы
- `src/components/TourRouteMap.tsx` - компонент карты
- `src/components/MobileBookingBar.tsx` - нижний бар с ценой
- `src/components/UniversalBookingModal.tsx` - модальное окно бронирования

### Примеры данных:
- `src/data/tours/cheow-lan-lake.ts` - эталон данных
- `src/data/routes/cheow-lan-lake-route.ts` - эталон маршрута (если создашь)

### Страницы туров:
- `src/pages/CheoLanLake.tsx` - эталон использования template
- `src/pages/CheoLanLakeNew.tsx` - новая упрощённая версия (3 строки)

---

## 🎯 Следующие шаги

1. **Протестировать CheoLanLakeNew** - убедиться что всё работает
2. **Мигрировать 1-2 тура как proof of concept** (PhiPhi, JamesBond)
3. **Если всё ОК - массовая миграция остальных 28 туров**
4. **Удалить старые версии страниц**

---

## 💡 Контакты для вопросов

Если что-то непонятно:
1. Проверь CheoLanLakeNew.tsx - там пример
2. Проверь TourPageTemplate.tsx - там вся логика
3. Проверь types/Tour.ts - там структура данных

**Золотое правило**: CheoLanLake = эталон, всё делаем как там! 🏆
