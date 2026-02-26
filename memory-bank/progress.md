# Progress Log

## Current Phase
**Production & Active Development** (27 папок туров, 29 в реестре)

## Latest Update (2026-02-27)
**Session:** Комплексный аудит + баг-фиксы + оптимизация + деплой  
**Status:** Найдено 18 проблем, 12 исправлено, задеплоено (commit 35c55b3)

### Completed Today — Аудит-сессия (2026-02-27)
- ✅ **Комплексный аудит сайта** — найдено 18 проблем (critical, medium, low)
- ✅ **React.lazy() + Suspense** — все 28+ страниц туров с code splitting (App.tsx)
- ✅ **Динамические бейджи** — CATEGORY_LABELS + CATEGORY_BADGE_COLORS в TourPageTemplate.tsx
- ✅ **Динамические хлебные крошки** — категория из tourData.category вместо хардкода "Приключения"
- ✅ **Футер переписан** — 3 колонки: лого+описание | навигация | контакты (Telegram, MAX)
- ✅ **Дата бронирования** — min={today} не позволяет выбрать прошедшую дату
- ✅ **Один onClick** на кнопке "Забронировать" (было: onClick + onPointerDown + onTouchEnd)
- ✅ **console.log удалены** — DynamicTourPage.tsx (5 шт), index.html (2 шт)
- ✅ **Priority fix** — phi-phi-racha-maiton-sunset: 25 → 29 (конфликт с rafting-spa-1day)
- ✅ **Telegram SDK defer** — скрипт загружается отложенно
- ✅ **Preload убран** — удалён нерабочий `<link rel="preload" href="/src/main.tsx">`
- ✅ **Год обновлён** — meta description: 2025 → 2026
- ✅ **RaftingSpa1DayNew** — добавлен default export для React.lazy
- ✅ **Деплой** — commit 35c55b3, 9 файлов, 163+/129−, push → deploy-canonical.yml
- ✅ **Визуальная проверка** — карточки туров + модалка бронирования работают

### Completed Earlier (2026-02-27)
- ✅ **Fix duplicate export** в elephant-beach index.ts (commit 5c3be50)
- ✅ **agentReference.md** полностью переписан с "Critical Rules"
- ✅ **copilot-instructions.md** полностью переписан
- ✅ Тур **elephant-beach-samet-mantra-spa** — подключены фото, фикс
- ✅ Тур **coral-islands-rawai** добавлен (1300/1200 ฿, islands, priority 27)
- ✅ Тур **diving-andaman** добавлен (4100/3900 ฿, diving, priority 28)
- ✅ Деплой (commit 036de16, 29 файлов, 508 insertions)

### Completed (2026-02-21)
- ✅ **copilot-instructions.md** восстановлен — был повреждён
- ✅ Memory-bank обновлён
- ✅ MCP Memory Bank настроен

## Project Status

### Tours (27 папок в src/data/tours/, 29 записей в реестре)
- avatar-plus-hangdong, cheow-lan-lake, coral-islands-rawai
- dostoprimechatelnosti-phuketa, diving-andaman
- eleven-islands-mega, eleven-islands-standard (⚠️ не в реестре), elephant-beach-samet-mantra-spa
- fishing-sunrise, five-pearls-2days
- james-bond-island, kao-lak-safari, krabi-secrets
- pearls-andaman-sea, phang-nga-samet, phang-nga-skywalk
- phi-phi-2days, phi-phi-racha-maiton-sunset, phi-phi-sunrise
- racha-coral-islands, racha-coral-rawai, racha-coral-sunrise
- rafting-spa-1day, rafting-spa-atv
- similan-islands, similan-islands-early, similan-islands-speedboat

### Telegram Bot
- **Бот:** @phukeo_bot (создан 20.12.2025)
- **Токен:** В Koyeb env vars (НЕ в коде!)
- **API:** /api/notify для уведомлений с сайта
- **Команды:** /start only

### Deployment
- **Frontend:** deploy-canonical.yml → GitHub Pages
- **Bot:** Koyeb auto-deploy from GitHub
- **React:** 18.3.1 (--legacy-peer-deps)

## History

### 2026-02-21
- ✅ Восстановлен copilot-instructions.md
- ✅ Обновлён memory-bank
- ✅ Настроен MCP в .vscode/settings.json

### 2025-12-21
- ✅ Убраны команды /tours и /help из бота (commit 59f4878)
- ✅ Добавлен /api/notify endpoint в бот

### 2025-12-20
- ✅ Security fix: токены удалены из публичного кода
- ✅ Создан @phukeo_bot взамен удалённого @phuketgos_bot
- ✅ Koyeb обновлён, bookingService.ts на Koyeb API

### 2025-12-19
- ✅ Удалён маршрут из тура 4 Жемчужины
- ✅ Отключён deploy-on-command.yml
- ✅ Восстановление после случайного удаления 1140 файлов (откат к be6cb12)
