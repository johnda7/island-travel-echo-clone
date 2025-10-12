# 🗺️ GPS МАРШРУТЫ - Полное руководство (2025)

> **КРИТИЧЕСКИ ВАЖНО**: Все маршруты ОБЯЗАТЕЛЬНО должны содержать GPS координаты. Без них сайт падает с ошибкой!

## ⚠️ Проблема, которую мы решили (январь 2025)

### ❌ Старый формат (НЕ РАБОТАЕТ):

```typescript
export const oldRoute = [
  {
    time: '07:00',
    location: 'Выезд из отеля',      // ❌ Нет в RoutePoint type
    description: 'Трансфер',
    icon: 'hotel'                     // ❌ Нет в RoutePoint type
  }
];
```

**Результат**: `TypeError: Cannot read properties of undefined (reading 'lat')`

---

### ✅ Новый формат (ПРАВИЛЬНО):

```typescript
import type { RoutePoint } from '@/types/Tour';

export const newRoute: RoutePoint[] = [
  {
    name: 'Пхукет',                   // ✅ Название точки
    coordinates: [7.8804, 98.3923],   // ✅ GPS [lat, lng]
    type: 'start',                    // ✅ Тип точки
    time: '07:00',                    // ✅ Время
    description: 'Выезд из отеля'     // ✅ Описание
  }
];
```

**Результат**: Красивая интерактивная карта с маршрутом! 🎉

---

## 📍 Структура RoutePoint

```typescript
interface RoutePoint {
  name: string;                      // Название точки (для popup)
  coordinates: [number, number];     // [широта, долгота]
  type: 'start' | 'stop' | 'destination';
  time?: string;                     // Опционально: время прибытия
  description?: string;              // Опционально: описание для tooltip
}
```

### Типы точек:

- **`start`** - Начало маршрута (зеленая иконка 🟢)
- **`stop`** - Промежуточная остановка (синяя иконка 🔵)
- **`destination`** - Конечная точка (красная иконка 🔴)

---

## 🔍 Как найти GPS координаты

### Способ 1: Google Maps (рекомендуется)

1. Откройте [Google Maps](https://www.google.com/maps)
2. Найдите нужное место
3. **Правый клик** на месте → **"Копировать координаты"**
4. Получите: `7.8804, 98.3923`
5. Используйте в формате: `[7.8804, 98.3923]`

### Способ 2: Google Maps через поиск

1. Введите название места в поиске
2. Координаты появятся в адресной строке или в информации о месте
3. Формат: `7.8804, 98.3923`

### Способ 3: Leaflet Map (в нашем приложении)

1. Откройте карту в любом туре
2. Кликните на нужное место
3. Координаты отобразятся в консоли браузера (F12)

---

## 📊 Проверка координат

### Диапазоны для Таиланда:

- **Широта (Latitude)**: `5.0` - `20.0` (обычно 7-9 для Пхукета)
- **Долгота (Longitude)**: `97.0` - `106.0` (обычно 98-100 для Пхукета)

### Популярные места:

| Место | Координаты | Описание |
|-------|------------|----------|
| Пхукет (центр) | `[7.8804, 98.3923]` | Старт большинства туров |
| Остров Джеймса Бонда | `[8.2751, 98.5014]` | Ко Тапу |
| Пхи-Пхи Дон | `[7.7407, 98.7784]` | Главный остров |
| Майя Бэй | `[7.6781, 98.7668]` | Легендарная бухта |
| Бамбу Айленд | `[7.7621, 98.7567]` | Белый пляж |
| Лагуна Пиле | `[7.6850, 98.7600]` | Изумрудная вода |
| Краби Прананг | `[8.0120, 98.8395]` | Райлей пляж |
| Чеов Лан | `[8.8876, 98.8396]` | Национальный парк |

---

## 🎯 Примеры реальных маршрутов

### Пример 1: Phi-Phi 2 дня (7 точек)

```typescript
import type { RoutePoint } from "@/types/Tour";

export const phiPhi2DaysRoute: RoutePoint[] = [
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '06:50',
    description: 'Выезд из отеля, трансфер к причалу'
  },
  {
    name: 'Бухта Майя',
    coordinates: [7.6781, 98.7668],
    type: 'stop',
    time: '09:50',
    description: 'Место съемок фильма "Пляж"'
  },
  {
    name: 'Лагуна Пиле',
    coordinates: [7.6850, 98.7600],
    type: 'stop',
    time: '10:50',
    description: 'Плавание в лагуне'
  },
  {
    name: 'Остров Бамбу',
    coordinates: [7.7621, 98.7567],
    type: 'stop',
    time: '12:50',
    description: 'Белоснежный пляж'
  },
  {
    name: 'Пхи-Пхи Дон',
    coordinates: [7.7407, 98.7784],
    type: 'destination',
    time: '14:20',
    description: 'Обед, заселение, огненное шоу'
  },
  {
    name: 'Остров Ранг Яй',
    coordinates: [7.8333, 98.4167],
    type: 'stop',
    time: '11:00',
    description: 'Жемчужная ферма (День 2)'
  },
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'destination',
    time: '18:00',
    description: 'Возврат в отель'
  }
];
```

---

### Пример 2: James Bond Island (8 точек)

```typescript
import type { RoutePoint } from '@/types/Tour';

export const jamesBondRoute: RoutePoint[] = [
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '07:30'
  },
  {
    name: 'Пристань Ао По',
    coordinates: [8.0294, 98.4227],
    type: 'stop',
    time: '08:30'
  },
  {
    name: 'Остров Панак',
    coordinates: [8.2694, 98.5017],
    type: 'stop',
    time: '09:30'
  },
  {
    name: 'Остров Джеймса Бонда',
    coordinates: [8.2753, 98.4997],
    type: 'stop',
    time: '11:00'
  },
  {
    name: 'Деревня Панья',
    coordinates: [8.2817, 98.5067],
    type: 'stop',
    time: '12:00'
  },
  {
    name: 'Каякинг',
    coordinates: [8.2700, 98.5150],
    type: 'stop',
    time: '13:30'
  },
  {
    name: 'Пещера Лод',
    coordinates: [8.2747, 98.5108],
    type: 'stop',
    time: '14:30'
  },
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'destination',
    time: '17:00'
  }
];
```

---

### Пример 3: Pearls of Andaman Sea (14 точек, 2 дня)

```typescript
import type { RoutePoint } from '@/types/Tour';

export const pearlsRoute: RoutePoint[] = [
  // ДЕНЬ 1
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '07:00',
    description: 'Трансфер на пирс'
  },
  {
    name: 'Пирс Royal Marina',
    coordinates: [7.8850, 98.3950],
    type: 'stop',
    time: '08:30',
    description: 'Регистрация, завтрак'
  },
  {
    name: 'Остров Панак',
    coordinates: [8.2750, 98.5200],
    type: 'stop',
    time: '10:30',
    description: 'Каякинг в пещерах'
  },
  {
    name: 'Остров Джеймса Бонда',
    coordinates: [8.2751, 98.5014],
    type: 'stop',
    time: '12:00',
    description: 'Фотосессия на Ко Тапу'
  },
  {
    name: 'Деревня Панья',
    coordinates: [8.2800, 98.5100],
    type: 'stop',
    time: '13:00',
    description: 'Обед в плавучей деревне'
  },
  {
    name: 'Пляж Прананг',
    coordinates: [8.0120, 98.8395],
    type: 'stop',
    time: '15:30',
    description: 'Пляжный отдых в Краби'
  },
  {
    name: 'Остров Хонг',
    coordinates: [8.0200, 98.8500],
    type: 'stop',
    time: '16:30',
    description: 'Снорклинг в лагуне'
  },
  {
    name: 'Пхи-Пхи Дон',
    coordinates: [7.7407, 98.7784],
    type: 'destination',
    time: '17:30',
    description: 'Заселение в отель'
  },
  
  // ДЕНЬ 2
  {
    name: 'Майя Бэй',
    coordinates: [7.6781, 98.7668],
    type: 'stop',
    time: '08:30',
    description: 'Легендарная бухта'
  },
  {
    name: 'Лагуна Пиле',
    coordinates: [7.6850, 98.7600],
    type: 'stop',
    time: '09:30',
    description: 'Плавание'
  },
  {
    name: 'Пляж с обезьянами',
    coordinates: [7.6910, 98.7700],
    type: 'stop',
    time: '10:30',
    description: 'Знакомство с обезьянами'
  },
  {
    name: 'Остров Бамбу',
    coordinates: [7.7621, 98.7567],
    type: 'stop',
    time: '11:30',
    description: 'Снорклинг'
  },
  {
    name: 'Остров Кай',
    coordinates: [7.7300, 98.7700],
    type: 'stop',
    time: '14:00',
    description: 'Финальный снорклинг'
  },
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'destination',
    time: '18:00',
    description: 'Возврат в отель'
  }
];
```

---

## 🛠️ Использование в компонентах

### Вариант 1: С маршрутом (рекомендуется)

```typescript
import { TourPageTemplate } from '@/components/TourPageTemplate';
import { tourData } from '@/data/tours/your-tour';
import { routePoints } from '@/data/routes/your-tour-route';

const YourTour = () => (
  <TourPageTemplate 
    tourData={tourData}
    routePoints={routePoints}  // ⚡ Карта появится автоматически
  />
);
```

### Вариант 2: Без маршрута

```typescript
import { TourPageTemplate } from '@/components/TourPageTemplate';
import { tourData } from '@/data/tours/your-tour';

const YourTour = () => (
  <TourPageTemplate 
    tourData={tourData}
    // routePoints не передаем - карты не будет
  />
);
```

---

## 🚨 Типичные ошибки

### Ошибка 1: Отсутствие координат

```typescript
// ❌ НЕПРАВИЛЬНО
{
  name: 'Пхукет',
  type: 'start',
  time: '07:00'
  // coordinates отсутствуют!
}
```

**Результат**: `TypeError: Cannot read properties of undefined (reading 'lat')`

**Исправление**:
```typescript
// ✅ ПРАВИЛЬНО
{
  name: 'Пхукет',
  coordinates: [7.8804, 98.3923],  // Добавили координаты
  type: 'start',
  time: '07:00'
}
```

---

### Ошибка 2: Неверный формат координат

```typescript
// ❌ НЕПРАВИЛЬНО
coordinates: "7.8804, 98.3923"  // Строка вместо массива
```

**Исправление**:
```typescript
// ✅ ПРАВИЛЬНО
coordinates: [7.8804, 98.3923]  // Массив чисел
```

---

### Ошибка 3: Перепутаны широта и долгота

```typescript
// ❌ НЕПРАВИЛЬНО (долгота, широта)
coordinates: [98.3923, 7.8804]
```

**Исправление**:
```typescript
// ✅ ПРАВИЛЬНО (широта, долгота)
coordinates: [7.8804, 98.3923]  // [lat, lng]
```

---

### Ошибка 4: Неверный тип точки

```typescript
// ❌ НЕПРАВИЛЬНО
type: 'hotel'  // Нет такого типа
```

**Исправление**:
```typescript
// ✅ ПРАВИЛЬНО
type: 'destination'  // Только: 'start' | 'stop' | 'destination'
```

---

## 📝 Чек-лист перед commit

Перед тем как закоммитить маршрут, проверь:

- [ ] ✅ Все точки имеют `coordinates: [lat, lng]`
- [ ] ✅ Координаты в правильном формате (массив чисел)
- [ ] ✅ Широта 5-20, Долгота 97-106 (для Таиланда)
- [ ] ✅ Первая точка имеет `type: 'start'`
- [ ] ✅ Последняя точка имеет `type: 'destination'`
- [ ] ✅ Промежуточные точки имеют `type: 'stop'`
- [ ] ✅ Импортирован тип `RoutePoint` из `@/types/Tour`
- [ ] ✅ Файл экспортирует массив `RoutePoint[]`
- [ ] ✅ Локально протестировано (`npm run dev`)

---

## 🎯 Тестирование

```bash
# 1. Запустить dev сервер
npm run dev

# 2. Открыть тур в браузере
http://localhost:8080/#/tours/your-tour

# 3. Проверить:
# - Карта загрузилась без ошибок
# - Все точки отображаются
# - Линия маршрута соединяет точки
# - Popup показывает информацию
# - Консоль без ошибок (F12)
```

---

## 📊 Статистика

**Мигрированные туры с GPS (январь 2025):**

1. ✅ Phi-Phi 2 дня (7 точек)
2. ✅ James Bond Island (8 точек)
3. ✅ Pearls of Andaman Sea (14 точек)
4. ✅ Cheow Lan Lake (маршрут готов)

**Результат:**
- 0 ошибок на production
- Красивые интерактивные карты
- Русские названия на картах
- Адаптивность под мобильные

---

## 🔗 Связанные документы

- **Быстрый старт**: `QUICK_START_NEW_TOUR.md`
- **iOS 26 дизайн**: `IOS26_DESIGN_PROMPT.md`
- **Миграция туров**: `TOUR_MIGRATION_GUIDE.md`
- **Типы данных**: `src/types/Tour.ts`

---

**⚡ GPS координаты = ОБЯЗАТЕЛЬНО для всех новых туров!**  
**🗺️ Без координат = ошибка на сайте!**  
**✅ С координатами = красивая интерактивная карта!**
