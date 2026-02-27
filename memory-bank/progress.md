# Progress Log

## Current Phase
**Production & Active Development** (27 папок туров, 29 в реестре)

## Latest Update (2026-02-27, ночь)
**Session:** SEO-оптимизация + Google Search Console API  
**Status:** GSC подключен, sitemap обновлён и отправлен, JSON-LD исправлен (commit 12e5dae)

### Completed — SEO + GSC (2026-02-27, ночь)
- ✅ **Sitemap.xml обновлён** — 27 туров (было 22), даты → 2026-02-27
- ✅ **Удалён дубликат** kata-noi из sitemap
- ✅ **Исправлены slug'и** — james-bond-island→james-bond-island-phang-nga, racha-coral-islands→racha-coral-islands-speedboat, kao-lak-safari→kao-lak-safari-1-day
- ✅ **Добавлены 5 туров** в sitemap — phi-phi-racha-maiton-sunset, elephant-beach-samet-mantra-spa, coral-islands-rawai, diving-andaman, rafting-spa-atv-1-day
- ✅ **JSON-LD** — телефон-заглушка `+66-XX-XXX-XXXX` → ContactPoint с Telegram URL (3 языка)
- ✅ **Google Search Console** — верифицирован (HTML file + meta tag)
- ✅ **GSC API** — подключен через Service Account (`phuketda-s-arch-console@...`, Full access)
- ✅ **Sitemap отправлен в GSC** через API — 0 ошибок
- ✅ **4 GSC-скрипта** — gsc-test-connection, gsc-analytics, gsc-submit-indexing, lib/gsc-client
- ✅ **`.google/` в .gitignore** — ключ не коммитится
- ✅ **Деплой** — commits 10e80bf, 12e5dae
- ⚠️ **Indexing API не работает** — нужен Owner-уровень, есть только Full

### Completed — Фикс бронирования (2026-02-27, вечер)
- ✅ **Восстановлен оригинальный redirect** — `window.location.href` с `?text=` (из 35c55b3)
- ✅ **Убран clipboard-подход** — `window.location.href` работает и без него
- ✅ **Защита от изменений** — 5 строк запрета в UniversalBookingModal.tsx
- ✅ **Правило в copilot-instructions** — "BOOKING REDIRECT — НЕ ТРОГАТЬ!"
- ✅ **Автозаполнение телефона** из Telegram WebApp
- ✅ **Viewport fix** — `100dvh` для модалки
- ✅ **Туры переупорядочены** по популярности
- ✅ **Деплой** — commit 071f1ea

### Completed — Аудит-сессия (2026-02-27, утро)
- ✅ **Комплексный аудит сайта** — найдено 18 проблем, 12 исправлено
- ✅ **React.lazy() + Suspense** — code splitting для всех туров
- ✅ **Динамические бейджи и хлебные крошки**
- ✅ **Футер переписан** — 3 колонки с контактами
- ✅ **Дата бронирования** — min={today}
- ✅ **console.log удалены**, priority fix, Telegram SDK defer
- ✅ **Деплой** — commit 35c55b3

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
