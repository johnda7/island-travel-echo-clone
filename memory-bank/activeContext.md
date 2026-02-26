# Active Context

## Current Session
**Date:** 2026-02-26  
**Mode:** Adding New Tours  
**Task:** Добавление новых экскурсий в проект

## Current Status
- ✅ 24 папки туров в `src/data/tours/`, 23 зарегистрированы в реестре
- ✅ Последний добавлен: **phi-phi-racha-maiton-sunset** (2026-02-26)
- ✅ Деплой: push 6858c99 → deploy-canonical.yml → GitHub Pages
- ✅ copilot-instructions.md переписан (чистый, ~75 строк)
- ✅ MCP настроен: Context7 + Memory (`.vscode/mcp.json`)
- ✅ Безопасность: токены только в Koyeb env vars

## Последний добавленный тур
- **Пхи-Пхи, Рача Яй и закатная вечеринка у Майтон** (`phi-phi-racha-maiton-sunset`)
- Категория: islands, Comfort+ only, 2800/2500 ฿
- 13 реальных фото, 9 RoutePoints (GPS)
- Маршрут: Пхукет → Рача Яй → Пхи-Пхи Дон → Обезьяны → Викинги → Пиле → Майя Бэй → Майтон → Пхукет

## Реестр туров (23 активных в toursRegistry.ts)
| Категория | Кол-во | Туры |
|-----------|--------|------|
| islands | 9 | phi-phi-2days, pearls-andaman-sea, eleven-islands-mega, james-bond-island-phang-nga, racha-coral-islands-speedboat, racha-coral-sunrise, racha-coral-rawai, phi-phi-sunrise, five-pearls-2days, phi-phi-racha-maiton-sunset |
| adventure | 7 | rafting-spa-atv-1-day, rafting-spa-1day, kao-lak-safari-1-day, avatar-plus-hangdong, phang-nga-skywalk, cheow-lan-lake, phang-nga-samet, krabi-secrets |
| diving | 3 | similan-islands, similan-islands-early, similan-islands-speedboat |
| cultural | 1 | dostoprimechatelnosti-phuketa |
| fishing | 1 | fishing-sunrise |

## Repository
- **Ветка:** main
- **Деплой:** deploy-canonical.yml (единственный активный из 5 workflows)
- **Сайт:** https://phukeo.com (GitHub Pages, HashRouter)
- **Бот:** @phukeo_bot (Koyeb: small-robinia-phukeo-8b5e1e16.koyeb.app)

## Telegram Bot
- **Бот:** @phukeo_bot (создан 20.12.2025)
- **Токен:** В Koyeb env vars (НЕ в коде!)
- **Manager Chat ID:** 1217592929
- **API Endpoint:** /api/notify
- **Команды:** только /start

## Key Files
| Файл | Строк | Роль |
|------|-------|------|
| `TourPageTemplate.tsx` | 1067 | Единый рендерер туров (PROTECTED) |
| `UniversalBookingModal.tsx` | 467 | Форма бронирования (PROTECTED) |
| `toursRegistry.ts` | ~250 | Центральный реестр (PROTECTED) |
| `Tour.ts` | 104 | TypeScript интерфейсы |
| `App.tsx` | 189 | Роутинг (~52 маршрутов) |
| `copilot-instructions.md` | ~75 | AI промпт |

## Known Issues
- **eleven-islands-standard** — папка-сирота: есть в `src/data/tours/` но НЕ в реестре
- **Priority conflict:** `rafting-spa-1day` и `phi-phi-racha-maiton-sunset` оба priority: 25
- **SEO:** GA placeholder `G-XXXXXXXXXX` (не подключён), Google Search Console не настроен
- **HashRouter:** Нужен для GitHub Pages, но мешает SEO
- **Supabase CMS:** Таблицы существуют, но НЕ используются — данные в TS файлах
- **react-leaflet@5.0.0:** Требует React 19, решается `--legacy-peer-deps`
