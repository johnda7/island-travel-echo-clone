# 📁 СТРУКТУРА ДАННЫХ ТУРОВ - "ОДИН ТУР = ОДНА ПАПКА"

## 🎯 ФИЛОСОФИЯ ОРГАНИЗАЦИИ:
**Принцип:** Каждый тур имеет свою папку с централизованными данными

## 📂 СТРУКТУРА ДИРЕКТОРИЙ:

```
src/data/
├── tours/
│   ├── phi-phi-2days/               # Пхи-Пхи 2 дня/1 ночь
│   │   ├── index.ts                 # Экспорт всех источников данных
│   │   ├── static.ts                # ✅ Статические данные (основной источник)
│   │   └── supabase.ts              # 🔄 Supabase данные (опционально)
│   │
│   ├── pearls-andaman-sea/          # 4 жемчужины Андаманского моря
│   │   ├── index.ts
│   │   └── static.ts
│   │
│   ├── dostoprimechatelnosti-phuketa/  # Достопримечательности Пхукета
│   │   ├── index.ts
│   │   └── static.ts
│   │
│   ├── james-bond-island/           # Остров Джеймса Бонда
│   │   ├── index.ts
│   │   └── static.ts
│   │
│   ├── eleven-islands-standard/     # 11 островов Стандарт
│   │   ├── index.ts
│   │   └── static.ts
│   │
│   ├── eleven-islands-mega/         # 11 островов Мега
│   │   ├── index.ts
│   │   └── static.ts
│   │
│   ├── racha-coral-islands/         # Рача + Коралловый остров
│   │   ├── index.ts
│   │   └── static.ts
│   │
│   ├── rafting-spa-atv/             # Рафтинг + СПА + ATV
│   │   ├── index.ts
│   │   └── static.ts
│   │
│   ├── kao-lak-safari/              # Као Лак сафари
│   │   ├── index.ts
│   │   └── static.ts
│   │
│   └── avatar-plus-hangdong/        # Аватар + Хангдонг
│       ├── index.ts
│       └── static.ts
│
└── toursRegistry.ts                 # Центральный реестр всех туров
```

## 📝 ТИПЫ ФАЙЛОВ В ПАПКЕ ТУРА:

### 1️⃣ `index.ts` - Главный экспорт
```typescript
// Экспортирует все источники данных тура
export { tourNameTourData } from './static';
// export { tourNameSupabaseData } from './supabase'; // Если есть Supabase версия
```

### 2️⃣ `static.ts` - Статические данные (основной источник)
```typescript
import { TourData } from "@/types/Tour";

export const tourNameTourData: TourData = {
  id: 'tour-slug',
  title: 'Название тура',
  // ... все поля TourData
};
```

### 3️⃣ `supabase.ts` - Supabase данные (опционально)
```typescript
// Для туров которые могут иметь динамические данные из Supabase
import { TourData } from "@/types/Tour";

export const tourNameSupabaseData: TourData = {
  // Данные из Supabase CMS
};
```

## 🔄 КАК ИСПОЛЬЗОВАТЬ:

### Импорт в toursRegistry.ts:
```typescript
import { phiPhi2DaysTourData } from './tours/phi-phi-2days';
import { pearlsAndamanSeaTourData } from './tours/pearls-andaman-sea';
// ... остальные туры
```

### Импорт в компонентах:
```typescript
import { phiPhi2DaysTourData } from '@/data/tours/phi-phi-2days';
```

## ✅ ПРЕИМУЩЕСТВА НОВОЙ СТРУКТУРЫ:

1. **Организованность** - каждый тур в своей папке
2. **Масштабируемость** - легко добавлять новые источники данных (static, supabase, api)
3. **Читаемость** - понятная структура "один тур = одна папка"
4. **Гибкость** - можно иметь несколько источников для одного тура
5. **Миграция** - легко переключаться между static и Supabase

## 🚀 КАК ДОБАВИТЬ НОВЫЙ ТУР:

1. Создай папку в `src/data/tours/new-tour-name/`
2. Создай `static.ts` с данными тура
3. Создай `index.ts` с экспортом:
   ```typescript
   export { newTourData } from './static';
   ```
4. Добавь импорт в `toursRegistry.ts`:
   ```typescript
   import { newTourData } from './tours/new-tour-name';
   ```
5. Зарегистрируй тур в `TOURS_REGISTRY` массиве

## 📊 ТЕКУЩИЙ СТАТУС (10.10.2025):

✅ **22 тура** организованы по новой структуре
✅ Все импорты обновлены
✅ Старые дублирующие файлы удалены
✅ Система готова к добавлению Supabase интеграции

## 🔮 БУДУЩИЕ ВОЗМОЖНОСТИ:

- [ ] Добавить `supabase.ts` для динамических туров
- [ ] Добавить `api.ts` для внешних API
- [ ] Добавить `translations/` для мультиязычности
- [ ] Добавить `assets/` для специфичных изображений тура
- [ ] Добавить `reviews/` для отзывов тура
