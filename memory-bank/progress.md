# Progress Log

## Current Phase
**Production & Maintenance** (22 активных тура на сайте)

## Latest Update (2025-12-21)
**Session:** Security Fix & Bot Migration  
**Status:** ✅ Критическая уязвимость исправлена, бот пересоздан

### Completed Today (2025-12-21)
- ✅ **SECURITY FIX:** Токены удалены из публичного кода
- ✅ Создан новый бот @phukeo_bot (старый @phuketgos_bot удалён)
- ✅ Koyeb обновлён с новым BOT_TOKEN
- ✅ Добавлен /api/notify endpoint в бот для безопасных уведомлений
- ✅ bookingService.ts переведён на Koyeb API
- ✅ UniversalBookingModal.tsx использует Koyeb для уведомлений
- ✅ Убраны команды /tours и /help (только /start)
- ✅ Коммит 59f4878 запушен

### In Progress
- 🔄 Koyeb автодеплой бота с новым кодом
- ⏳ Обновить URL Mini App в BotFather на https://phukeo.com/#/

## Security Incident (2025-12-20)
**Проблема:** Telegram bot tokens были в публичном GitHub репо
**Решение:**
1. Репо временно закрыли (сломало GitHub Pages)
2. Revoke токена в BotFather случайно удалил бота @phuketgos_bot
3. Создан новый бот @phukeo_bot
4. Токены перемещены в Koyeb env vars
5. Код переписан на использование Koyeb API proxy
6. Репо снова публичное (для GitHub Pages)

## Recent Completed Tasks

### 2025-12-21
- ✅ Убраны команды /tours и /help из бота
- ✅ Обновлён memory-bank

### 2025-12-20
- ✅ Создан @phukeo_bot взамен удалённого @phuketgos_bot
- ✅ Koyeb обновлён: BOT_TOKEN=8285085708:AAGTwOOM...
- ✅ /api/notify endpoint добавлен в bot/smart-ai-bot.js
- ✅ bookingService.ts: KOYEB_API_URL вместо прямого API
- ✅ Удалены хардкоженные токены из кода

### 2025-12-19
- ✅ Удалён маршрут из тура 4 Жемчужины
- ✅ Отключён deploy-on-command.yml
- ✅ Memory bank обновлён

## Project Status

### Telegram Bot
- **Бот:** @phukeo_bot (создан 20.12.2025)
- **Токен:** В Koyeb env vars (НЕ в коде!)
- **API:** /api/notify для уведомлений с сайта
- **Команды:** /start only

### Tours
- **Активных туров:** 22
- **На TourPageTemplate:** 22/22 (100%)

### Deployment
- **Frontend:** deploy-canonical.yml → GitHub Pages
- **Bot:** Koyeb auto-deploy from GitHub
- **React:** 18.3.1 (--legacy-peer-deps)
