# Active Context

## Current Session
**Date:** 2025-12-21  
**Mode:** Security Fix & Bot Update  
**Task:** Исправление критической уязвимости (токены в публичном репо), пересоздание бота, настройка Koyeb API proxy

## Current Status
- ✅ **КРИТИЧЕСКАЯ УЯЗВИМОСТЬ ИСПРАВЛЕНА** - токены удалены из кода
- ✅ Старый бот @phuketgos_bot УДАЛЁН (случайно при revoke токена)
- ✅ Новый бот @phukeo_bot создан (20.12.2025)
- ✅ Koyeb обновлён с новым BOT_TOKEN
- ✅ Добавлен /api/notify endpoint для безопасных уведомлений
- ✅ bookingService.ts использует Koyeb API (не прямой Telegram API)
- ✅ Команды бота сокращены до только /start (убраны /tours, /help)
- ⏳ Ожидается автодеплой Koyeb с новым кодом бота

## Repository Status
- **Total files:** ~1197 файлов
- **Last commit:** 59f4878 - "fix: только /start команда"
- **Deploy workflow:** deploy-canonical.yml (единственный активный)
- **Koyeb:** Автодеплой бота при изменениях в bot/

## Telegram Bot (ОБНОВЛЕНО 2025-12-21)
- **Старый бот:** @phuketgos_bot - УДАЛЁН (revoke в BotFather)
- **Новый бот:** @phukeo_bot
- **Новый токен:** 8285085708:AAGTwOOM2pkgomdqz9SwYtyy44HrMgETFxs
- **Manager Chat ID:** 1217592929
- **Koyeb URL:** small-robinia-phukeo-8b5e1e16.koyeb.app
- **API Endpoint:** /api/notify (для уведомлений с сайта)
- **Команды:** только /start (убраны /tours, /help)

## Security Fix (2025-12-20/21)
- ❌ **БЫЛО:** Токены бота в публичном коде (КРИТИЧЕСКАЯ УЯЗВИМОСТЬ)
- ✅ **СТАЛО:** Токены только в Koyeb env vars
- ✅ **bookingService.ts:** Использует KOYEB_API_URL вместо прямого Telegram API
- ✅ **UniversalBookingModal.tsx:** Уведомления через Koyeb /api/notify

## Key Files for AI Agents
1. **.github/copilot-instructions.md** - основной промпт (66 строк)
2. **AI_DOCS/AI_PROMPT_OPTIMIZED.md** - оптимизированный промпт
3. **AI_DOCS/DEPLOY_RULES.md** - критические правила деплоя

## Recent Updates
- 2025-12-21: Убраны команды /tours и /help из бота (commit 59f4878)
- 2025-12-21: Добавлен /api/notify endpoint в бот
- 2025-12-20: Создан новый бот @phukeo_bot
- 2025-12-20: Удалены токены из публичного кода
- 2025-12-20: Обновлён bookingService.ts на Koyeb API
- 2025-12-19: Удалён маршрут из тура 4 Жемчужины

## Known Issues
- **Mini App 404:** При первом открытии показывает 404. Нужно в BotFather обновить URL на https://phukeo.com/#/
- **HashRouter:** Используется для GitHub Pages совместимости
