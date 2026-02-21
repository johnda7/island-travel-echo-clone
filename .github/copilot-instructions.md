# 🏝️ Phuket Tours Platform - AI Agent Guide

React 18 + TypeScript + Vite. WordPress‑style CMS on React: one universal template renders all tours; a central registry is the "DB". Design: iOS 26 (glass, SF Pro, single blue #007AFF). Live: https://phukeo.com

## Core Architecture
- **Universal Template System**: `src/components/TourPageTemplate.tsx` (protected) renders all tours. Tour pages are 3 lines:
  ```tsx
  import { TourPageTemplate } from '@/components/TourPageTemplate';
  import { tourData, routePoints } from '@/data/tours/<slug>';
  export default () => <TourPageTemplate tourData={tourData} routePoints={routePoints} />;
  ```
- **Central Registry**: `src/data/toursRegistry.ts` (protected) is the "database" driving search/menu/cards. Rules: never change existing `id`; append new tours at end.
- **Tour Data Structure**: Each tour lives in `src/data/tours/<slug>/{index.ts,static.ts}`. `index.ts` re‑exports from `static.ts`.

## Golden Rules (Breaking These Causes Errors)
- **GPS Routes**: Every `RoutePoint` must include `coordinates: [lat, lng]`. Missing → "reading 'lat'" error. See `AI_DOCS/GPS_ROUTES_GUIDE.md`.
- **Images**: Always import via `@/assets/...` (Vite alias to `src`). No deep relative paths.
- **Protected Files**: `TourPageTemplate.tsx`, `UniversalBookingModal.tsx`, `toursRegistry.ts`. Back up template before edits: `npm run backup-template` (restore: `npm run restore-template`).

## Development Workflow
- **Dev**: `npm run dev` (Vite on port 8080)
- **Build**: `npm run build` (runs postbuild scripts: `scripts/postbuild.cjs`, `scripts/generate-og-pages.mjs`)
- **Template Backup**: `npm run backup-template` before editing `TourPageTemplate.tsx`

## Deployment (Critical - Only One Way)
- **ONLY CORRECT DEPLOY**: `.github/workflows/deploy-canonical.yml`
- Auto‑deploy on push to `main` and tags `v*`
- Manual: Actions → "Deploy (canonical)" → Run workflow, ref `main`
- **⚠️ CRITICAL**: `deploy-on-command.yml` is DISABLED. DO NOT USE!
- **React 18 vs React 19 conflict**: Project uses React 18.3.1, but `react-leaflet@5.0.0` requires React 19. Solution: `deploy-canonical.yml` uses `--legacy-peer-deps`.
- **Correct deploy**: `git add <files> && git commit -m "desc" && git push origin main` → auto-deploy

## Add New Tour (Quick Path)
1. Create `src/data/tours/<slug>/static.ts` exporting `tourData: TourData` and `routePoints: RoutePoint[]` (with coordinates)
2. Create `src/data/tours/<slug>/index.ts` → `export * from './static';`
3. Append to `toursRegistry.ts` (keep `isActive: true`, add appropriate tags)
4. Add route in `src/App.tsx` if needed for SEO-friendly URLs

## iOS 26 Design Constraints
- Use ONLY `#007AFF` for interactive elements
- Glassmorphism: `backdrop-blur(20px)/saturate(180%)`
- Font stack: SF Pro
- Footer: `#1C1C1E`
- Rating format: "⭐ 4.9"
- Reference: `CheoLanLake` tour as visual standard

## Telegram Mini App Integration
- Dual-purpose: standalone site + Telegram Mini App (@PhuketgaBot)
- **In Telegram**: Header hidden (`src/components/Header.tsx` returns null), `src/components/TelegramBottomNav.tsx` shows
- Detection: `window.Telegram?.WebApp?.initData` exists
- Bottom nav: Главная, Туры, Чат (center → closes app), Поиск, Профиль
- Bot code in `bot/`. Tokens in hosting env vars (Koyeb). Never commit `bot/.env`

## Common Issues & Fixes
- **Tour missing in UI**: Check registry `isActive: true`, correct tags
- **All tours broken**: Likely `TourPageTemplate.tsx` issue → restore from backup
- **Deploy succeeds but site unchanged**: Wait 1-5 min for CDN cache, clear browser cache
- **GPS route errors**: Ensure all `RoutePoint` objects have `coordinates: [lat, lng]`
- **Image load failures**: Use `@/assets/...` imports, not relative paths

## Key File References
- `src/components/TourPageTemplate.tsx` - Universal tour renderer (protected)
- `src/components/UniversalBookingModal.tsx` - Booking modal (protected)
- `src/data/toursRegistry.ts` - Tours database (protected)
- `src/types/Tour.ts` - Tour data types
- `AI_DOCS/` - Detailed guides and references

## Tech Stack Notes
- React 18.3.1 + TypeScript + Vite
- Routing: React Router with HashRouter (GitHub Pages compatibility)
- UI: Radix UI + Tailwind CSS + shadcn/ui components
- Maps: Leaflet (react-leaflet@5.0.0 with legacy-peer-deps)
- Deployment: GitHub Pages via GitHub Actions

**When editing, maintain consistency with existing patterns and verify changes by reading the file after edits.**