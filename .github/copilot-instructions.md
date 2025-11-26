# 🏝️ Phuket Tours Platform — AI Working Notes (concise)

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
- Auto‑deploy on push to `main` and on tags `v*` via `.github/workflows/deploy-canonical.yml`.
- Manual run also available (Actions → “Deploy (canonical)” → Run workflow, ref `main`).
- GitHub Pages must be set to “GitHub Actions”.

## Add a tour (quick path)
1) Create `src/data/tours/<slug>/static.ts` exporting `tourData: TourData` and `routePoints: RoutePoint[]` (with coordinates). 2) `index.ts` → `export * from './static';` 3) Append to `toursRegistry.ts` (keep `isActive: true`, tags). 4) Add route in `src/App.tsx` if needed.

## iOS 26 design constraints
- Use only `#007AFF` for interactive elements; glassmorphism backdrop blur(20px)/saturate(180%); SF Pro stack; footer `#1C1C1E`; rating format “⭐ 4.9”. Use `CheoLanLake` as visual reference.

## Telegram integration
- Bot lives in `bot/`. Tokens are stored in hosting env vars (Koyeb). Never commit `bot/.env`. Booking flows pipe to Telegram; share falls back from Telegram WebApp → Web Share → clipboard.

## Common fixes
- Tour missing in UI: check registry `isActive`, tags.
- All tours broken after edit → likely `TourPageTemplate.tsx`; restore from backup.

## Key refs
`src/components/TourPageTemplate.tsx` • `src/components/UniversalBookingModal.tsx` • `src/data/toursRegistry.ts` • `src/types/Tour.ts` • `AI_DOCS/` (quick refs and deep dives)

When editing, keep consistency with existing patterns; verify changes by reading the file after edits.
