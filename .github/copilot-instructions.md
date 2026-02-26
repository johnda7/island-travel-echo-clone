# Phuket Tours Platform — AI Agent Instructions

React 18 + TypeScript + Vite. WordPress-style CMS on React: one universal template (`TourPageTemplate`) renders all tours; a central registry (`toursRegistry.ts`) is the "DB". Design: iOS 26 (glassmorphism, SF Pro, `#007AFF`). Live: https://phukeo.com. Uses HashRouter.

## Architecture

- **Universal renderer**: `src/components/TourPageTemplate.tsx` (PROTECTED — backup before editing: `npm run backup-template`).
- **Central registry**: `src/data/toursRegistry.ts` (PROTECTED). Drives search, menu, cards, filters. NEVER change existing `id` values; only append new tours at the end.
- **Tour data**: `src/data/tours/<slug>/static.ts` exports `tourData: TourData`. `index.ts` re-exports from `static.ts`.
- **Tour pages**: `src/pages/<TourName>New.tsx` — thin wrappers importing data + routePoints, rendering `TourPageTemplate`.
- **Routing**: `src/App.tsx` — each tour needs `/excursion/<slug>` and `/tours/<slug>` routes. Fallback: `DynamicTourPage` for `/tours/:slug`.
- **Types**: `src/types/Tour.ts` — `TourData`, `RoutePoint`, `BookingFormData`, `PriceCalculation`.

## Add a new tour (step-by-step)

1. **Create data**: `src/data/tours/<slug>/static.ts` — export `<name>TourData: TourData` (reference: `cheow-lan-lake/static.ts`).
   - Images: import via `@/assets/<slug>/...` (Vite alias `@` → `src/`). Never use deep relative paths.
   - Required fields: `id`, `title`, `subtitle`, `description`, `route`, `mainImage`, `gallery`, `priceAdult`, `priceChild`, `currency` (`"฿"`), `duration`, `groupSize`, `rating`, `highlights`, `itinerary`.
2. **Create index**: `src/data/tours/<slug>/index.ts` → `export { <name>TourData } from './static';`
3. **Create page**: `src/pages/<TourName>New.tsx`:
   ```tsx
   import { TourPageTemplate } from "@/components/TourPageTemplate";
   import { myTourData } from "@/data/tours/<slug>";
   import type { RoutePoint } from "@/types/Tour";
   const routePoints: RoutePoint[] = [
     { name: 'Start', coordinates: [7.88, 98.39], type: 'start', time: '08:00', description: '...' },
   ];
   export default () => <TourPageTemplate tourData={myTourData} routePoints={routePoints} />;
   ```
4. **Register**: Append to `TOURS_REGISTRY` array in `src/data/toursRegistry.ts`:
   - Import tourData at top. Append object: `{ id, name, category ('islands'|'mainland'|'adventure'|'cultural'|'diving'|'fishing'), tags, isPopular, isActive: true, isFeatured, priority (next number), data: () => Promise.resolve(tourData) }`.
5. **Add routes**: In `src/App.tsx`, import page, add `<Route path="/excursion/<slug>">` and `<Route path="/tours/<slug>">` ABOVE the dynamic `/:slug` catch-all.

## Golden rules

- **RoutePoint coordinates**: every `RoutePoint` MUST include `coordinates: [lat, lng]`. Missing → runtime "reading 'lat'" crash.
- **Images**: always `@/assets/...`. No `../../assets` or bare URLs.
- **PROTECTED files** — never modify without backup: `TourPageTemplate.tsx`, `UniversalBookingModal.tsx`, `toursRegistry.ts`.
- **NEVER append to `index.html`** with echo/cat — breaks HTML parsing.
- **React 18 + react-leaflet 5 conflict**: project uses `--legacy-peer-deps`. Do NOT upgrade react-leaflet without testing.

## Dev & Build

- `npm run dev` — Vite dev server on port 8080.
- `npm run build` — production build + postbuild (`scripts/postbuild.cjs`, `scripts/generate-og-pages.mjs`). Output: `dist/`.
- `npm run backup-template` / `npm run restore-template` — protect `TourPageTemplate.tsx`.

## Deployment

- **ONLY** `.github/workflows/deploy-canonical.yml` — auto-deploys on push to `main` or `v*` tags. Uses `npm ci --legacy-peer-deps`.
- `deploy-on-command.yml` is DISABLED — never use it.
- Deploy: `git add . && git commit -m "msg" && git push origin main`.
- CDN cache: 1–5 min delay after deploy.

## iOS 26 design

- Interactive elements: `#007AFF`. Glassmorphism: `backdrop-filter: blur(20px) saturate(180%)`. Font: SF Pro. Footer: `#1C1C1E`. Rating format: "⭐ 4.9".

## Telegram Mini App

- Detected via `window.Telegram?.WebApp?.initData`. Header hidden; `TelegramBottomNav.tsx` shows bottom nav.
- Bot code: `bot/`. Tokens in Koyeb env vars — never commit `.env`.

## Troubleshooting

- Tour missing in UI → check `isActive: true` and `tags` in registry.
- All tours broken → `TourPageTemplate.tsx` was modified; restore: `npm run restore-template`.
- Deploy fails → check `index.html` ends with clean `</html>`.

## Key files

- `src/components/TourPageTemplate.tsx` — universal tour renderer
- `src/components/UniversalBookingModal.tsx` — booking dialog
- `src/data/toursRegistry.ts` — central tour registry (23 tours)
- `src/types/Tour.ts` — TypeScript interfaces
- `src/App.tsx` — routing (HashRouter)
- `AI_DOCS/` — detailed guides (GPS routes, deploy rules, design specs)
