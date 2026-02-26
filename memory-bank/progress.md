# Progress Log

## Current Phase
**Production & Active Development** (24 папки туров, добавляются новые)

## Latest Update (2026-02-26)
**Session:** Adding New Tours  
**Status:** Добавлен тур "Пхи-Пхи + Рача Яй + Майтон Sunset Party"

### Completed Today (2026-02-26)
- ✅ **copilot-instructions.md** полностью переписан (чистый Markdown, без дублей)
- ✅ Изучена архитектура: туры в файлах, Supabase только для бронирований
- ✅ Добавлен тур phi-phi-racha-maiton-sunset (static.ts, index.ts, page, registry, routes)
- ✅ 13 реальных фото загружены и подключены
- ✅ Деплой выполнен (push 6858c99)
- ✅ Fix: удалён битый git ref "main 2", resolved merge conflict

### Completed (2026-02-21)
- ✅ **copilot-instructions.md** восстановлен — был повреждён
- ✅ Memory-bank обновлён
- ✅ MCP Memory Bank настроен

## Project Status

### Tours (24 папки в src/data/tours/)
- avatar-plus-hangdong, cheow-lan-lake, dostoprimechatelnosti-phuketa
- eleven-islands-mega, eleven-islands-standard, fishing-sunrise
- five-pearls-2days, james-bond-island, kao-lak-safari
- krabi-secrets, pearls-andaman-sea, phang-nga-samet
- phang-nga-skywalk, phi-phi-2days, phi-phi-sunrise
- **phi-phi-racha-maiton-sunset** (NEW 2026-02-26)
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
