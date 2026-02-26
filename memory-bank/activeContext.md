# Active Context

## Current Session
**Date:** 2026-02-27  
**Mode:** Adding New Tours + Bug Fix + Documentation  
**Task:** Исправление билда, обновление документации, добавление 3 новых туров

## Current Status
- ✅ 27 папок туров в `src/data/tours/`, 28 зарегистрированы в реестре
- ✅ Fix: дубликат экспорта в elephant-beach index.ts (commit 5c3be50)
- ✅ agentReference.md и copilot-instructions.md переписаны с "Critical Rules"
- ✅ Добавлены 3 тура: elephant-beach-samet-mantra-spa, coral-islands-rawai, diving-andaman
- ✅ Деплой: push 036de16 → deploy-canonical.yml → GitHub Pages
- ✅ Все 4 тура проверены на сайте + в меню

## Последние добавленные туры (сессия 2026-02-27)
1. **Слоны, пляж Самет и Мантра Спа** (`elephant-beach-samet-mantra-spa`) — adventure, 3100/2800 ฿, priority 26
2. **Коралловые острова с пирса Раваи** (`coral-islands-rawai`) — islands, 1300/1200 ฿, priority 27, 10 фото
3. **Дайвинг в Андаманском море** (`diving-andaman`) — diving, 4100/3900 ฿, priority 28, 9 фото

## Реестр туров (28 в toursRegistry.ts)
| Категория | Кол-во | Туры |
|-----------|--------|------|
| islands | 10 | phi-phi-2days, pearls-andaman-sea, eleven-islands-mega, james-bond-island-phang-nga, racha-coral-islands-speedboat, racha-coral-sunrise, racha-coral-rawai, phi-phi-sunrise, five-pearls-2days, phi-phi-racha-maiton-sunset, **coral-islands-rawai** |
| adventure | 8 | rafting-spa-atv-1-day, rafting-spa-1day, kao-lak-safari-1-day, avatar-plus-hangdong, phang-nga-skywalk, cheow-lan-lake, phang-nga-samet, krabi-secrets, **elephant-beach-samet-mantra-spa** |
| diving | 4 | similan-islands, similan-islands-early, similan-islands-speedboat, **diving-andaman** |
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
