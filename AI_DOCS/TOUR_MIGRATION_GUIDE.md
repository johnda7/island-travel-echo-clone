# 🚀 Гайд по переносу старых туров на централизованный шаблон

## 📋 Что мы делаем
Переносим старые туры (по 700-800 строк каждый) на новый централизованный шаблон → получаем 11-15 строк на тур.

## ✅ Результат переноса
- **Было**: 762 строки кода на тур
- **Стало**: 15 строк кода
- **Экономия**: 98% кода
- **Бонусы**: 
  - Карта с маршрутом появляется автоматически
  - iOS 26 дизайн
  - Все изменения в шаблоне применяются ко всем турам

---

## 🔄 Пошаговая инструкция переноса

### ШАГ 1: Создать файл с данными маршрута

**Файл**: `src/data/routes/[tour-name]-route.ts`

**Пример** (Пхи-Пхи):
```typescript
import { RoutePoint } from '@/types/tour';

export const phiPhi2DaysRoutePoints: RoutePoint[] = [
  { 
    name: 'Пхукет', 
    coordinates: [7.8804, 98.3923], 
    type: 'start', 
    time: '06:50' 
  },
  { 
    name: 'Бухта Майя', 
    coordinates: [7.6781, 98.7668], 
    type: 'stop', 
    time: '09:50' 
  },
  { 
    name: 'Лагуна Пиле', 
    coordinates: [7.6850, 98.7600], 
    type: 'stop', 
    time: '10:50' 
  },
  { 
    name: 'Пещера Викингов', 
    coordinates: [7.6730, 98.7720], 
    type: 'stop', 
    time: '11:30' 
  },
  { 
    name: 'Остров Бамбу', 
    coordinates: [7.7789, 98.7750], 
    type: 'stop', 
    time: '12:50' 
  },
  { 
    name: 'Пхи-Пхи Дон', 
    coordinates: [7.7407, 98.7784], 
    type: 'destination', 
    time: '14:20' 
  },
  { 
    name: 'Остров Ранг Яй (День 2)', 
    coordinates: [7.8333, 98.4167], 
    type: 'stop', 
    time: '11:00' 
  }
];
```

**Типы точек**:
- `'start'` - начало маршрута (зелёный маркер)
- `'stop'` - остановка по пути (синий маркер)
- `'destination'` - финальная точка (красный маркер)

---

### ШАГ 2: Создать новый файл тура (template-based)

**Файл**: `src/pages/[TourName]New.tsx`

**Шаблон**:
```tsx
import { TourPageTemplate } from "@/components/TourPageTemplate";
import { [tourDataName] } from "@/data/tours/[tour-folder]/static";
import { [routePointsName] } from "@/data/routes/[tour-name]-route";

const [TourName]New = () => {
  return (
    <TourPageTemplate 
      tourData={[tourDataName]}
      routePoints={[routePointsName]}
      breadcrumbCategory="Туры"
      breadcrumbCategoryLink="/tours?category=island"
    />
  );
};

export default [TourName]New;
```

**Пример** (Пхи-Пхи):
```tsx
import { TourPageTemplate } from "@/components/TourPageTemplate";
import { phiPhi2DaysTourData } from "@/data/tours/phi-phi-2days/static";
import { phiPhi2DaysRoutePoints } from "@/data/routes/phi-phi-2days-route";

const PhiPhi2Days1NightNew = () => {
  return (
    <TourPageTemplate 
      tourData={phiPhi2DaysTourData}
      routePoints={phiPhi2DaysRoutePoints}
      breadcrumbCategory="Туры"
      breadcrumbCategoryLink="/tours?category=island"
    />
  );
};

export default PhiPhi2Days1NightNew;
```

---

### ШАГ 3: Переключить роуты в App.tsx

**Что делаем**:
1. Импортируем новый компонент
2. Заменяем старый компонент на новый в роутах
3. Удаляем импорт старого компонента

**Пример**:

**БЫЛО**:
```tsx
import PhiPhi2Days1Night from "./pages/PhiPhi2Days1Night"; // Старый
import PhiPhi2Days1NightNew from "./pages/PhiPhi2Days1NightNew"; // Новый

// ...

<Route path="/tours/phi-phi-2-days-1-night" element={<PhiPhi2Days1Night />} />
<Route path="/tours/phi-phi-2-days-1-night-new" element={<PhiPhi2Days1NightNew />} />
```

**СТАЛО**:
```tsx
import PhiPhi2Days1NightNew from "./pages/PhiPhi2Days1NightNew"; // Только новый

// ...

<Route path="/tours/phi-phi-2-days-1-night" element={<PhiPhi2Days1NightNew />} />
```

---

### ШАГ 4: Удалить старый файл тура

```bash
rm src/pages/[OldTourName].tsx
```

**Пример**:
```bash
rm src/pages/PhiPhi2Days1Night.tsx
```

✅ Готово! Тур перенесён на шаблон.

---

## 📍 Как найти координаты для маршрута

### Способ 1: Google Maps
1. Откройте Google Maps
2. Найдите нужное место
3. Кликните правой кнопкой → "Что здесь?"
4. Координаты появятся внизу (формат: `7.8804, 98.3923`)

### Способ 2: Из старого кода
Если в старом туре уже есть координаты:
```tsx
// Ищите в старом файле:
center={[7.8804, 98.3923]} // Координаты
```

### Способ 3: Из существующих данных
Посмотрите в `src/data/tours/[tour-folder]/static.ts` - иногда там уже есть координаты.

---

## 🎯 Чеклист переноса одного тура

- [ ] Создать файл маршрута `src/data/routes/[name]-route.ts`
- [ ] Добавить минимум 3-5 точек маршрута
- [ ] Создать новый файл тура `src/pages/[TourName]New.tsx`
- [ ] Импортировать TourPageTemplate, tourData, routePoints
- [ ] Добавить импорт в `src/App.tsx`
- [ ] Заменить старый компонент на новый в роутах
- [ ] Протестировать тур в браузере (карта, маршрут, контент)
- [ ] Удалить импорт старого компонента
- [ ] Удалить старый файл тура
- [ ] Проверить что всё работает

---

## 🔍 Откуда брать данные для tourData

Данные уже есть в файлах `src/data/tours/[tour-folder]/static.ts`.

**Что нужно проверить**:
- `title` - название тура
- `subtitle` - подзаголовок
- `route` - URL путь (должен совпадать с роутом в App.tsx)
- `gallery` - массив фотографий
- `schedule` - программа по дням
- `included` / `notIncluded` - что входит / не входит
- `whatToBring` - что взять с собой
- `importantInfo` - важная информация

Если чего-то нет - можно взять из старого файла тура.

---

## 🚨 Важные моменты

### 1. Порядок переноса туров
Сначала переносим простые туры (однодневные), потом сложные (многодневные).

### 2. Тестирование
После каждого переноса проверяем:
- Тур открывается
- Карта отображается
- Маршрут показан правильно
- Все секции контента на месте
- Кнопка "Забронировать" работает

### 3. Не трогаем
- `TourPageTemplate.tsx` - это основа для ВСЕХ туров
- `src/index.css` - централизованные стили
- Данные туров в `src/data/tours/` - только читаем оттуда

### 4. Git коммиты
После каждого тура делаем коммит:
```bash
git add -A
git commit -m "feat: Migrate [Tour Name] to template system"
git push origin main
```

---

## 📊 Прогресс миграции

### ✅ Перенесено (2):
1. Cheow Lan Lake (11 строк)
2. Phi-Phi 2 Days 1 Night (15 строк)

### 🔄 В процессе:
- (следующий тур)

### ⏳ Ожидают переноса (~28):
- JamesBondIslandTour
- PearlsAndamanSea
- RachaCoralIslandsTour
- ElevenIslandsStandardTour
- DostoprimechatelnostiPhuketa
- RassvetnoePrikljuchenie
- ... (и другие)

---

## 🎉 Преимущества шаблонной системы

1. **Меньше кода**: 98% сокращение кода на тур
2. **Единообразие**: Все туры выглядят одинаково
3. **Лёгкое обновление**: 1 изменение в шаблоне → применяется ко всем турам
4. **iOS 26 дизайн**: Автоматически применяется
5. **Карта с маршрутом**: Добавляется автоматически
6. **Меньше багов**: Меньше кода = меньше ошибок

---

## 🛠️ Troubleshooting

### Проблема: Тур не открывается
**Решение**: Проверьте роут в App.tsx - должен совпадать с `route` в tourData

### Проблема: Карта не отображается
**Решение**: Проверьте что координаты в правильном формате `[lat, lng]`

### Проблема: Секции контента пустые
**Решение**: Добавьте данные в `src/data/tours/[folder]/static.ts`

### Проблема: Ошибка компиляции после удаления старого файла
**Решение**: Проверьте что удалили импорт старого компонента из App.tsx

---

## 📝 Примечания

- Все маршруты хранятся в `src/data/routes/`
- Старые туры в `src/pages/` удаляются после переноса
- Новые туры называем с суффиксом `New` (потом уберём)
- После переноса всех туров можно удалить суффикс `New`

---

**Автор**: AI Assistant  
**Дата**: 12 октября 2025  
**Версия**: 1.0
