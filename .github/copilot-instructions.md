# 🏝️ Phuket Tours Plat## Deployment (curren## iOS 26 design constraints
- Use only `#007AFF` for interactive elements; glassmorphism backdrop blur(20px)/saturate(180%); SF Pro stack; footer `#1C1C1E`; rating format "⭐ 4.9". Use `CheoLanLake` as visual reference.nonical)
- Auto‑deploy on push to `main` via `.github/workflows/deploy-canonical.yml`.
- CDN cache takes 1-5 minutes to update after deploy.
- GitHub Pages must be set to "GitHub Actions".
- **Troubleshooting**: If deploy succeeds but site unchanged → just wait or clear browser cache.
- **NEVER append to index.html** with echo/cat commands — this breaks HTML parsing.

## Telegram Mini App
- Site works as Telegram Mini App when opened from @PhuketgaBot.
- **In Telegram**: Header is hidden (`src/components/Header.tsx` returns null), bottom nav shows (`src/components/TelegramBottomNav.tsx`).
- Detection: `window.Telegram?.WebApp?.initData` exists.
- Bottom nav: Главная, Туры, Чат (center button → closes app), Поиск, Профиль.
- Bot token: stored in Koyeb env vars, never commit to repo.
- Manager Telegram ID: `1217592929`. — AI Working Notes (concise)

React 18 + TypeScript + Vite. WordPress‑style CMS on React: one universal template renders all tours; a central registry is the “DB”. Design: iOS 26 (glass, SF Pro, single blue #007AFF). Live: https://phukeo.com

## Core architecture
- Universal renderer `src/components/TourPageTemplate.tsx` (protected). All tour pages are 3 lines:
  ```tsx
  import { TourPageTemplate } from '@/components/TourPageTemplate';
  import { tourData, routePoints } from '@/data/tours/<slug>';
  export default () => <TourPageTemplate tourData={tourData} routePoints={routePoints} />;
  ```
- Central registry `src/data/toursRegistry.ts` (protected) drives search/menu/cards. Rules: do not change existing `id`; append new tours at end.
- Tour files live in `src/data/tours/<slug>/{index.ts,static.ts}`. `index.ts` re‑exports from `static.ts`.

## Golden rules (breakers to avoid)
- GPS routes: every `RoutePoint` must include `coordinates: [lat, lng]`. Missing → “reading 'lat'” error. See `AI_DOCS/GPS_ROUTES_GUIDE.md`.
- Images: always import via `@/assets/...` (Vite alias to `src`). No deep relative paths.
- Protected: `TourPageTemplate.tsx`, `UniversalBookingModal.tsx`, `toursRegistry.ts`. Back up template before edits: `npm run backup-template` (restore: `npm run restore-template`).

## Dev and build
- Dev: `npm run dev` (Vite on 8080).
- Build: `npm run build` (runs postbuild scripts: `scripts/postbuild.cjs`, `scripts/generate-og-pages.mjs`). Output in `dist/`.

## Deployment (current, canonical)
- **ЕДИНСТВЕННЫЙ ПРАВИЛЬНЫЙ ДЕПЛОЙ**: `.github/workflows/deploy-canonical.yml`
- Auto‑deploy on push to `main` and on tags `v*` via `deploy-canonical.yml`.
- Manual run also available (Actions → “Deploy (canonical)” → Run workflow, ref `main`).
- GitHub Pages must be set to “GitHub Actions”.
- **⚠️ КРИТИЧНО**: `deploy-on-command.yml` ОТКЛЮЧЁН. НЕ используй его!
- **React 18 vs React 19 конфликт**: Проект использует React 18.3.1, но `react-leaflet@5.0.0` требует React 19. Решение: `deploy-canonical.yml` использует `npm config set legacy-peer-deps true` + `npm ci --legacy-peer-deps`. НЕ обновляй react-leaflet без проверки совместимости!
- **Правильный способ деплоя**: `git add <файлы> && git commit -m "описание" && git push origin main` → деплой запустится автоматически.
- Подробные правила: см. `AI_DOCS/DEPLOY_RULES.md`

## Add a tour (quick path)
1) Create `src/data/tours/<slug>/static.ts` exporting `tourData: TourData` and `routePoints: RoutePoint[]` (with coordinates). 2) `index.ts` → `export * from './static';` 3) Append to `toursRegistry.ts` (keep `isActive: true`, tags). 4) Add route in `src/App.tsx` if needed.

## iOS 26 design constraints
- Use only `#007AFF` for interactive elements; glassmorphism backdrop blur(20px)/saturate(180%); SF Pro stack; footer `#1C1C1E`; rating format “⭐ 4.9”. Use `CheoLanLake` as visual reference.

## Telegram integration
- Bot lives in `bot/`. Tokens are stored in hosting env vars (Koyeb). Never commit `bot/.env`. Booking flows pipe to Telegram; share falls back from Telegram WebApp → Web Share → clipboard.

## Common fixes
- Tour missing in UI: check registry `isActive`, tags.
- All tours broken after edit → likely `TourPageTemplate.tsx`; restore from backup.
- Deploy failed → check index.html for malformed HTML, ensure clean `</html>` ending.

## Key refs
`src/components/TourPageTemplate.tsx` • `src/components/UniversalBookingModal.tsx` • `src/data/toursRegistry.ts` • `src/types/Tour.ts` • `src/components/TelegramBottomNav.tsx` • `AI_DOCS/` (quick refs and deep dives)

When editing, keep consistency with existing patterns; verify changes by reading the file after edits.
