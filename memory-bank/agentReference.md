# AI Agent Quick Reference

> Полная справка для AI агентов. Обновлено: 2026-02-26.

## 1. Архитектура

**Стек:** React 18.3.1 + TypeScript + Vite 5.4.1 + Tailwind 3.4.11  
**Роутинг:** HashRouter (для GitHub Pages)  
**Сайт:** https://phukeo.com  
**Репозиторий:** johnda7/island-travel-echo-clone

**Модульная CMS на React:**
```
src/data/tours/<slug>/static.ts   → данные тура (TourData)
src/data/tours/<slug>/index.ts    → re-export
src/pages/<TourName>New.tsx       → тонкая обёртка (import data + routePoints → TourPageTemplate)
src/App.tsx                       → маршруты (/excursion/<slug> + /tours/<slug>)
src/data/toursRegistry.ts         → центральный реестр (23 записи)
```

---

## 2. Добавление нового тура — 5 шагов

### Шаг 1: Данные — `src/data/tours/<slug>/static.ts`
```typescript
import type { TourData } from "@/types/Tour";
import img1 from "@/assets/<slug>/photo-1.jpg";  // ВСЕГДА @/assets!

export const myTourData: TourData = {
  id: "<slug>", title: "...", subtitle: "...", description: "...",
  priceAdult: 2500, priceChild: 2000, currency: "฿",
  duration: "1 день", groupSize: "до 15 человек", rating: 4.9,
  mainImage: img1, gallery: [img1, ...],
  highlights: [...], itinerary: [{day:'', time:'06:00', activity:'...'}],
  included: [...], excluded: [...], importantInfo: [...]
};
```

### Шаг 2: Индекс — `src/data/tours/<slug>/index.ts`
```typescript
export { myTourData } from './static';
```

### Шаг 3: Страница — `src/pages/<TourName>New.tsx`
```tsx
import { TourPageTemplate } from "@/components/TourPageTemplate";
import { myTourData } from "@/data/tours/<slug>";
import type { RoutePoint } from "@/types/Tour";

const routePoints: RoutePoint[] = [
  { name: 'Пхукет', coordinates: [7.88, 98.39], type: 'start', time: '08:00', description: '...' },
  { name: 'Точка 2', coordinates: [7.74, 98.78], type: 'stop', time: '10:00', description: '...' },
  { name: 'Финиш', coordinates: [7.88, 98.39], type: 'destination', time: '18:00', description: '...' },
];

export default () => <TourPageTemplate tourData={myTourData} routePoints={routePoints} />;
```

### Шаг 4: Реестр — `src/data/toursRegistry.ts`
```typescript
// GOLDEN RULE: НЕ import tourData наверху! Только import().then()
{
  id: '<slug>',
  name: 'Название тура',
  category: 'islands', // islands|mainland|adventure|cultural|diving|fishing
  tags: ['острова', 'катамаран'],
  isPopular: true,
  isActive: true,
  isFeatured: true,
  priority: 26, // следующий номер
  data: () => import('./tours/<slug>').then(m => m.myTourData)
  // ❌ НЕЛЬЗЯ: data: () => Promise.resolve(tourData) — сломает модалку!
}
```

### Шаг 5: Маршруты — `src/App.tsx`
```tsx
<Route path="/excursion/<slug>" element={<MyTourPage />} />
<Route path="/tours/<slug>" element={<MyTourPage />} />
// ВЫШЕ catch-all /:slug!
```

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

## 9. Текущее состояние (2026-02-26)

- **Туров в папках:** 24 (1 сирота: eleven-islands-standard)
- **В реестре:** 23 активных
- **Категории:** islands(9), adventure(7), diving(3), cultural(1), fishing(1)
- **Последний добавлен:** phi-phi-racha-maiton-sunset (2800/2500 ฿)
- **Последний коммит:** 1c30d83
