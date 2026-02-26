# AI Agent Quick Reference

> Полная справка для AI агентов. Обновлено: 2026-02-27.

## 1. Архитектура

**Стек:** React 18.3.1 + TypeScript + Vite 5.4.1 + Tailwind 3.4.11  
**Роутинг:** HashRouter (для GitHub Pages)  
**Сайт:** https://phukeo.com  
**Репозиторий:** johnda7/island-travel-echo-clone

**Модульная CMS на React:**
```
src/data/tours/<slug>/static.ts   → данные тура (TourData)
src/data/tours/<slug>/index.ts    → re-export (РОВНО 1 СТРОКА! Никаких дублей!)
src/pages/<TourName>New.tsx       → тонкая обёртка (import data + routePoints → TourPageTemplate)
src/App.tsx                       → маршруты (/excursion/<slug> + /tours/<slug>)
src/data/toursRegistry.ts         → центральный реестр (26 записей)
```

---

## 2. Добавление нового тура — ТОЧНАЯ ПРОЦЕДУРА (5 шагов)

> ⚠️ **КРИТИЧЕСКИ ВАЖНО**: Следуй каждому шагу ТОЧНО. Ошибки ломают билд!

### ❌ Типичные ошибки (ЗАПОМНИ!)
1. **Дублирование экспорта в index.ts** — файл ДОЛЖЕН содержать РОВНО 1 строку. НИКОГДА не дублируй.
2. **Забыть coordinates в RoutePoint** — без координат → crash.
3. **Путь картинок `../../assets/`** — ВСЕГДА используй `@/assets/`.
4. **Маршруты ниже catch-all** — ВСЕГДА добавляй ВЫШЕ `/:slug`.
5. **Неправильный priority** — проверь последний номер в реестре, используй +1.

### Шаг 1: Фото — `src/assets/<slug>/`
- Создай папку `src/assets/<slug>/`
- Если фото ещё нет — используй Unsplash заглушки (URL), потом заменишь
- Если фото есть — скопируй, переименуй в `photo-1.jpg`, `photo-2.jpg` и т.д.

### Шаг 2: Данные — `src/data/tours/<slug>/static.ts`
```typescript
import type { TourData } from "@/types/Tour";
// Фото: ВСЕГДА через @/assets/ (Vite alias @ → src/)
import photo1 from "@/assets/<slug>/photo-1.jpg";
import photo2 from "@/assets/<slug>/photo-2.jpg";

export const mySlugTourData: TourData = {
  id: "<slug>",
  title: "НАЗВАНИЕ ТУРА CAPS",
  subtitle: "Краткое описание • ключевые точки • 1 день",
  description: `Полное описание тура...`,
  route: "/tours/<slug>",
  mainImage: photo1,
  gallery: [photo1, photo2],
  priceAdult: 2500,
  priceChild: 2000,
  currency: "฿",
  duration: "1 день (07:00–18:00)",
  groupSize: "до 15 человек",
  rating: 4.9,
  highlights: ["🏝 Описание 1", "🐘 Описание 2"],
  itinerary: [
    { day: "", time: "07:00", activity: "Сбор гостей..." },
    { day: "", time: "10:00", activity: "Основная программа..." },
  ],
  included: ["Трансфер от отеля и обратно", "Гид", "Страховка", "Обед"],
  excluded: ["Личные расходы"],
  importantInfo: ["⏰ Время сбора 07:00–08:00"],
  whatToBring: ["Купальник", "Крем от солнца", "Полотенце"],
  category: "adventure", // islands|mainland|adventure|cultural|diving|fishing
  tags: ["тег1", "тег2", "1 день"],
  isPopular: true,
  bookingNotes: "Бронирование минимум за 24 часа.",
};
```

### Шаг 3: Индекс — `src/data/tours/<slug>/index.ts`
```typescript
export { mySlugTourData } from './static';
```
> ⚠️ **РОВНО 1 СТРОКА!** Дублирование → билд крашится с "Multiple exports with the same name"!

### Шаг 4: Страница — `src/pages/<TourName>New.tsx`
```tsx
import { TourPageTemplate } from "@/components/TourPageTemplate";
import { mySlugTourData } from "@/data/tours/<slug>";
import type { RoutePoint } from "@/types/Tour";

const routePoints: RoutePoint[] = [
  { name: 'Отели Пхукета', coordinates: [7.8804, 98.3923], type: 'start', time: '07:00', description: 'Сбор гостей' },
  { name: 'Точка 2', coordinates: [8.27, 98.50], type: 'stop', time: '10:00', description: 'Описание...' },
  { name: 'Отели Пхукета', coordinates: [7.8804, 98.3923], type: 'destination', time: '18:00', description: 'Возвращение' },
];
// ⚠️ КАЖДЫЙ RoutePoint ОБЯЗАН иметь coordinates: [lat, lng]! Без них → TypeError crash!

export default () => <TourPageTemplate tourData={mySlugTourData} routePoints={routePoints} />;
```

### Шаг 5: Реестр + Роуты

**5a. Реестр `src/data/toursRegistry.ts`:**
1. Добавь import ВВЕРХУ файла (к остальным import`ам):
   ```typescript
   import { mySlugTourData } from './tours/<slug>';
   ```
2. Добавь запись в массив `TOURS_REGISTRY` ПЕРЕД комментарием `// ➕ ДОБАВЛЯЯ СЮДА НОВЫЙ ТУР`:
   ```typescript
   {
     id: '<slug>',
     name: 'Название тура',
     category: 'adventure',
     tags: ['тег1', 'тег2'],
     isPopular: true,
     isActive: true,
     isFeatured: true,
     priority: 27,  // ← СЛЕДУЮЩИЙ после последнего! Проверь!
     data: () => Promise.resolve(mySlugTourData)
   },
   ```

**5b. Маршруты `src/App.tsx`:**
1. Добавь import ВВЕРХУ:
   ```typescript
   import MyTourPage from "@/pages/MyTourNew";
   ```
2. Добавь 2 Route'а ВЫШЕ catch-all `/:slug`:
   ```tsx
   <Route path="/excursion/<slug>" element={<MyTourPage />} />
   <Route path="/tours/<slug>" element={<MyTourPage />} />
   ```

### После создания — ОБЯЗАТЕЛЬНО:
1. **Проверь `index.ts`** — ровно 1 строка экспорта, без дублей
2. **Проверь coordinates** — каждый RoutePoint имеет `[lat, lng]`
3. **Проверь priority** — следующий номер после последнего
4. **Проверь маршруты** — выше catch-all в App.tsx
5. **Деплой**: `git add -A && git commit -m "feat: add <tour-name> tour" && git push origin main`
6. **Подожди 1-5 мин** (CDN кеш), проверь: `https://phukeo.com/#/tours/<slug>`

---

## 3. Правила деплоя

**Деплой:**
```bash
git add -A && git commit -m "описание" && git push origin main
```
Автоматически → `deploy-canonical.yml` → GitHub Pages. CDN задержка 1-5 мин.

**Установка зависимостей:**
```bash
npm install --legacy-peer-deps  # ВСЕГДА! React 18 vs react-leaflet@5
```

**ЗАПРЕЩЕНО:**
- Использовать отключённые workflow (deploy-on-command.yml и др.)
- Удалять `public/CNAME`, `package.json`, `index.html`, `src/`, `.github/workflows/`
- `git reset --hard` без понимания последствий
- Коммитить `dist/`, пушить в `gh-pages`
- Менять HashRouter на BrowserRouter
- Append в `index.html` через echo/cat

**Откат:** `git reset --hard <commit> && git push origin main --force`

---

## 4. GPS координаты

**RoutePoint: coordinates ОБЯЗАТЕЛЬНЫ!** Без них → TypeError crash.

| Место | Координаты |
|-------|------------|
| Пхукет (центр/пирс) | `[7.8804, 98.3923]` |
| Остров Джеймса Бонда | `[8.2751, 98.5014]` |
| Пхи-Пхи Дон | `[7.7407, 98.7784]` |
| Майя Бэй | `[7.6781, 98.7668]` |
| Бамбу Айленд | `[7.7621, 98.7567]` |
| Рача Яй | `[7.5980, 98.3635]` |
| Краби Прананг | `[8.0120, 98.8395]` |
| Чеов Лан | `[8.8876, 98.8396]` |
| Симиланские острова | `[8.6509, 97.6370]` |
| Панг Нга Бэй | `[8.2751, 98.5000]` |

Координаты Таиланда: lat 5-20 (Пхукет 7-9), lng 97-106 (Пхукет 98-100).

---

## 5. iOS 26 Design

**Цвета:**
| Назначение | Цвет |
|-----------|------|
| Все интерактивные элементы, кнопки | `#007AFF` |
| Основной фон | `#F2F2F7` |
| Карточки | `#FFFFFF` |
| Footer | `#1C1C1E` |
| Галочки успеха | `#007AFF` (НЕ зелёные!) |
| Предупреждения, "Оплачивается отдельно" | `#FF9500` |
| Ошибки | `#FF3B30` |
| Звёзды рейтинга | `#FFCC00` → "⭐ 4.9" |

**Glassmorphism:**
```css
background: rgba(0, 122, 255, 0.85);
backdrop-filter: blur(20px) saturate(180%);
box-shadow: 0 8px 32px rgba(0, 122, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
border: 1px solid rgba(255, 255, 255, 0.18);
border-radius: 12px;
```

**Правила:** Шрифт: SF Pro. Заголовки: `text-gray-900`. Scrollbar: 6px серый.

---

## 6. Protected Files

| Файл | Защита |
|------|--------|
| `TourPageTemplate.tsx` | `npm run backup-template` / `npm run restore-template` |
| `UniversalBookingModal.tsx` | Не менять логику, только стили |
| `toursRegistry.ts` | Не менять id, только добавлять |
| `index.html` | Никогда echo/cat |
| `deploy-canonical.yml` | Не менять без запроса |

---

## 7. Telegram

- **Бот:** @phukeo_bot
- **Детекция Mini App:** `window.Telegram?.WebApp?.initData`
- **В Telegram:** Header скрыт, `TelegramBottomNav.tsx` показывает bottom nav
- **Bot code:** `bot/`, токены в Koyeb env vars
- **Bot deploy:** изменить `BUILD_DATE` в `bot/Dockerfile`, push → Koyeb auto-deploy 2-3 мин
- **Health:** `curl https://small-robinia-phukeo-8b5e1e16.koyeb.app/health`

---

## 8. Troubleshooting

| Проблема | Решение |
|----------|---------|
| Тур не виден в UI | `isActive: true` + `tags` в реестре |
| Все туры сломаны | `npm run restore-template` |
| Деплой падает | `index.html` → `</html>` в конце |
| `TypeError: Cannot read 'lat'` | RoutePoint без `coordinates` |
| Модалка с 2-го раза | `Promise.resolve()` → `import().then()` |
| Фото не грузятся | `@/assets/...` (не `../../assets`) |

---

## 9. Текущее состояние (2026-02-27)

- **Туров в папках:** 25
- **В реестре:** 26 записей (включая elephant-beach-samet-mantra-spa)
- **Категории:** islands(9), adventure(8), diving(3), cultural(1), fishing(1)
- **Последний добавлен:** elephant-beach-samet-mantra-spa (3100/2800 ฿)
- **Следующий priority:** 27
- **Последний коммит:** 5c3be50
