# Phuket Tours Platform — Copilot Instructions

React 18 + TypeScript + Vite. WordPress-style CMS on React: one universal template (`TourPageTemplate`) renders all tours; a central registry (`toursRegistry.ts`) is the "DB". Design: iOS 26 (glassmorphism, SF Pro, `#007AFF`). Live: https://phukeo.com. Uses HashRouter.

## Architecture

- **Universal renderer**: `src/components/TourPageTemplate.tsx` (PROTECTED — backup before editing: `npm run backup-template`).
- **Central registry**: `src/data/toursRegistry.ts` (PROTECTED). Drives search, menu, cards, filters. NEVER change existing `id` values; only append new tours at the end.
- **Tour data**: `src/data/tours/<slug>/static.ts` exports `tourData: TourData`. `index.ts` re-exports from `static.ts`.
- **Tour pages**: `src/pages/<TourName>New.tsx` — thin wrappers importing data + routePoints, rendering `TourPageTemplate`.
- **Routing**: `src/App.tsx` — each tour needs `/excursion/<slug>` and `/tours/<slug>` routes. Fallback: `DynamicTourPage` for `/tours/:slug`.
- **Types**: `src/types/Tour.ts` — `TourData`, `RoutePoint`, `BookingFormData`, `PriceCalculation`.

## Add a new tour (step-by-step)

### CRITICAL RULES (from real bugs)
- **index.ts** must have EXACTLY 1 export line. Duplicate exports → build crash "Multiple exports with the same name".
- **RoutePoint coordinates** are REQUIRED `[lat, lng]`. Missing → runtime TypeError crash.
- **Images** MUST use `@/assets/...` import path. Never `../../assets` or bare URLs.
- **Routes** MUST be ABOVE the `/:slug` catch-all in App.tsx.
- **priority** in registry MUST be next sequential number (currently last is 28, next is 29).

### Step 1: Create photos folder
Create `src/assets/<slug>/` with photos named `photo-1.jpg`, `photo-2.jpg`, etc. Use Unsplash URLs as placeholders if real photos aren't ready yet.

### Step 2: Create data — `src/data/tours/<slug>/static.ts`
Export `<name>TourData: TourData` (reference: `elephant-beach-samet-mantra-spa/static.ts`).
- Images: import via `@/assets/<slug>/...` (Vite alias `@` → `src/`).
- Required fields: `id`, `title`, `subtitle`, `description`, `route`, `mainImage`, `gallery`, `priceAdult`, `priceChild`, `currency` (`"฿"`), `duration`, `groupSize`, `rating`, `highlights`, `itinerary`, `included`, `excluded`, `importantInfo`, `category`, `tags`, `isPopular`.

### Step 3: Create index — `src/data/tours/<slug>/index.ts`
**EXACTLY ONE LINE:**
```typescript
export { <name>TourData } from './static';
```
⚠️ NEVER duplicate this line! Build will crash.

### Step 4: Create page — `src/pages/<TourName>New.tsx`
```tsx
import { TourPageTemplate } from "@/components/TourPageTemplate";
import { myTourData } from "@/data/tours/<slug>";
import type { RoutePoint } from "@/types/Tour";

const routePoints: RoutePoint[] = [
  { name: 'Отели Пхукета', coordinates: [7.8804, 98.3923], type: 'start', time: '08:00', description: 'Сбор гостей' },
  // ⚠️ EVERY RoutePoint MUST have coordinates!
];

export default () => <TourPageTemplate tourData={myTourData} routePoints={routePoints} />;
```

### Step 5: Register — `src/data/toursRegistry.ts` + `src/App.tsx`

**Registry:** Add import at top. Append entry to `TOURS_REGISTRY` array BEFORE the `// ➕ ДОБАВЛЯЯ СЮДА` comment:
```typescript
{
  id: '<slug>',
  name: 'Tour Name',
  category: 'adventure', // islands|mainland|adventure|cultural|diving|fishing
  tags: ['tag1', 'tag2'],
  isPopular: true,
  isActive: true,
  isFeatured: true,
  priority: 29, // NEXT sequential number!
  data: () => Promise.resolve(tourData)
},
```

**Routes in App.tsx:** Add import + 2 routes ABOVE `/:slug` catch-all:
```tsx
<Route path="/excursion/<slug>" element={<TourPage />} />
<Route path="/tours/<slug>" element={<TourPage />} />
```

### Post-creation checklist
1. ✅ `index.ts` has exactly 1 export line
2. ✅ Every RoutePoint has `coordinates: [lat, lng]`
3. ✅ `priority` is next number after last
4. ✅ Routes are above catch-all in App.tsx
5. ✅ All image imports use `@/assets/...`
6. ✅ Deploy and visually verify at `https://phukeo.com/#/tours/<slug>`

## Golden rules

- **PROTECTED files** — never modify without backup: `TourPageTemplate.tsx`, `UniversalBookingModal.tsx`, `toursRegistry.ts`.
- **NEVER append to `index.html`** with echo/cat — breaks HTML parsing.
- **React 18 + react-leaflet 5 conflict**: project uses `--legacy-peer-deps`. Do NOT upgrade react-leaflet without testing.
- **ALWAYS visually check** the page in browser before reporting completion.

## Dev & Build

- `npm run dev` — Vite dev server on port 8080.
- `npm run build` — production build + postbuild. Output: `dist/`.
- `npm run backup-template` / `npm run restore-template` — protect `TourPageTemplate.tsx`.
- `npm install --legacy-peer-deps` — ALWAYS use this flag.

## Deployment

- **ONLY** `.github/workflows/deploy-canonical.yml` — auto-deploys on push to `main`.
- Deploy: `git add -A && git commit -m "msg" && git push origin main`.
- CDN cache: 1–5 min delay after deploy.
- Rollback: `git reset --hard <commit> && git push origin main --force`.

## iOS 26 design

- Interactive elements: `#007AFF`. Glassmorphism: `backdrop-filter: blur(20px) saturate(180%)`. Font: SF Pro. Footer: `#1C1C1E`. Rating: "⭐ 4.9".

## Telegram Mini App

- Detected via `window.Telegram?.WebApp?.initData`. Header hidden; `TelegramBottomNav.tsx` shows bottom nav.
- Bot code: `bot/`. Tokens in Koyeb env vars — never commit `.env`.

## Troubleshooting

- Tour missing in UI → check `isActive: true` and `tags` in registry.
- All tours broken → restore template: `npm run restore-template`.
- Deploy fails → check `index.html` ends with `</html>`, check index.ts for duplicate exports.
- Build hangs → check for circular imports or corrupted files.
- TypeError "Cannot read 'lat'" → RoutePoint missing `coordinates`.

## Key files

- `src/components/TourPageTemplate.tsx` — universal tour renderer (1067 lines)
- `src/components/UniversalBookingModal.tsx` — booking dialog
- `src/data/toursRegistry.ts` — central tour registry (28 entries, last priority: 28)
- `src/types/Tour.ts` — TypeScript interfaces
- `src/App.tsx` — routing (HashRouter)
- `memory-bank/agentReference.md` — full AI agent reference with GPS coords, design specs
- `AI_DOCS/` — detailed guides
