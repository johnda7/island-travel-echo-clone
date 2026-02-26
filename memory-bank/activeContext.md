# Active Context

## Current Session
**Date:** 2026-02-27  
**Mode:** Аудит + баг-фиксы + оптимизация + деплой  
**Task:** Комплексный аудит сайта, исправление 12 багов/улучшений, деплой

## Current Status
- ✅ 27 папок туров в `src/data/tours/`, 29 записей в реестре (toursRegistry.ts)
- ✅ Комплексный аудит: найдено 18 проблем, исправлено 12
- ✅ React.lazy() + Suspense для всех 28+ страниц туров (code splitting)
- ✅ Динамические бейджи и хлебные крошки (по категории тура)
- ✅ Полноценный футер с контактами (Telegram @Phuketga, MAX канал/чат)
- ✅ Блокировка прошедших дат в форме бронирования
- ✅ Удалены тройные обработчики на кнопке бронирования → один onClick
- ✅ Удалены console.log из продакшн-кода
- ✅ Исправлен дубликат priority 25 → phi-phi-racha-maiton-sunset теперь 29
- ✅ Отложенная загрузка Telegram SDK (defer)
- ✅ Удалён нерабочий preload для main.tsx
- ✅ Обновлён год в мета-описании (2025 → 2026)
- ✅ Деплой: commit 35c55b3, 9 файлов, 163+ / 129−
- ✅ Бронирование проверено в браузере — работает

## Исправления аудита (сессия 2026-02-27)
| # | Тип | Описание | Статус |
|---|-----|----------|--------|
| 1 | bug | Дубликат priority: 25 в реестре | ✅ → 29 |
| 2 | bug | Хардкод бейджи "ХИТ"/"ПРИРОДА" | ✅ динамические |
| 3 | bug | Хардкод хлебные крошки "Приключения" | ✅ динамические |
| 4 | bug | Можно выбрать прошедшую дату бронирования | ✅ min=today |
| 5 | bug | Тройной обработчик на кнопке бронирования | ✅ один onClick |
| 6 | bug | Пустой футер без контактов | ✅ полный футер |
| 7 | bug | Форма закрывается при ошибке | ❌ не исправлено |
| 8 | bug | RaftingSpa1DayNew не передаёт routePoints | ❌ |
| 9 | bug | PhiPhiRachaMaiton последняя точка type:"start" | ❌ |
| 10 | seo | Устаревший год 2025 в мета-описании | ✅ → 2026 |
| 11 | seo | Телефон-заглушка в JSON-LD | ❌ |
| 13 | code | Мёртвые ссылки в paths.ts | ❌ |
| 14 | code | eleven-islands-standard не зарегистрирован | ❌ |
| 15 | perf | Нет lazy loading страниц | ✅ React.lazy |
| 16 | perf | Блокирующий Telegram SDK | ✅ defer |
| 17 | clean | console.log в продакшне | ✅ удалены |
| 18 | track | GA/Yandex аналитика не подключена | ❌ нужны ID |

## Реестр туров (29 записей в toursRegistry.ts)
| Категория | Кол-во | Туры |
|-----------|--------|------|
| islands | 11 | phi-phi-2days, pearls-andaman-sea, eleven-islands-mega, james-bond-island-phang-nga, racha-coral-islands-speedboat, racha-coral-sunrise, racha-coral-rawai, phi-phi-sunrise, five-pearls-2days, phi-phi-racha-maiton-sunset, coral-islands-rawai |
| adventure | 8 | rafting-spa-atv-1-day, rafting-spa-1day, kao-lak-safari-1-day, avatar-plus-hangdong, phang-nga-skywalk, cheow-lan-lake, phang-nga-samet, krabi-secrets, elephant-beach-samet-mantra-spa |
| diving | 4 | similan-islands, similan-islands-early, similan-islands-speedboat, diving-andaman |
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
| `TourPageTemplate.tsx` | 1096 | Единый рендерер туров (PROTECTED) + CATEGORY_LABELS + динамические бейджи |
| `UniversalBookingModal.tsx` | 468 | Форма бронирования (PROTECTED) + min date |
| `toursRegistry.ts` | 536 | Центральный реестр (PROTECTED), 29 записей |
| `Tour.ts` | 104 | TypeScript интерфейсы |
| `App.tsx` | 206 | Роутинг, React.lazy для всех туров |
| `Footer.tsx` | 107 | Футер с Telegram/MAX контактами |
| `Tours.tsx` | — | Карточки туров, один onClick на бронирование |
| `copilot-instructions.md` | 130 | AI промпт |

## Known Issues (оставшиеся)
- **eleven-islands-standard** — папка-сирота: есть в `src/data/tours/` но НЕ в реестре
- **rafting-spa-1day** — не передаёт routePoints в TourPageTemplate
- **phi-phi-racha-maiton-sunset** — последний RoutePoint type:"start" (должен быть "destination")
- **phone placeholder** — "+66-XX-XXX-XXXX" в JSON-LD (index.html)
- **GA/Yandex** — аналитика закомментирована, нужны реальные ID
- **SEO:** GA placeholder `G-XXXXXXXXXX` (не подключён), Google Search Console не настроен
- **HashRouter:** Нужен для GitHub Pages, но мешает SEO
- **Supabase CMS:** Таблицы существуют, но НЕ используются — данные в TS файлах
- **react-leaflet@5.0.0:** Требует React 19, решается `--legacy-peer-deps`
