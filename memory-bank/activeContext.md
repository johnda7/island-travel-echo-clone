# Active Context

## Current Session
**Date:** 2026-02-21  
**Mode:** Maintenance & MCP Setup  
**Task:** Обновление memory-bank, настройка MCP сервера, восстановление copilot-instructions.md

## Current Status
- ✅ **copilot-instructions.md** восстановлен (был повреждён — склеенные секции)
- ✅ Memory-bank обновлён до актуального состояния (февраль 2026)
- ✅ MCP Memory Bank настроен в .vscode/settings.json
- ✅ 23 папки туров в src/data/tours/ (включая eleven-islands-standard)
- ✅ Все туры на TourPageTemplate
- ✅ Безопасность: токены только в Koyeb env vars

## Repository Status
- **Ветка:** main
- **Деплой:** deploy-canonical.yml (единственный активный)
- **Сайт:** https://phukeo.com (GitHub Pages)
- **Бот:** @phukeo_bot (Koyeb: small-robinia-phukeo-8b5e1e16.koyeb.app)

## Telegram Bot
- **Бот:** @phukeo_bot (создан 20.12.2025)
- **Токен:** В Koyeb env vars (НЕ в коде!)
- **Manager Chat ID:** 1217592929
- **API Endpoint:** /api/notify (уведомления с сайта через Koyeb proxy)
- **Команды:** только /start

## Key Files for AI Agents
1. `.github/copilot-instructions.md` — основной промпт (~75 строк)
2. `AI_DOCS/AI_PROMPT_OPTIMIZED.md` — оптимизированный промпт
3. `AI_DOCS/DEPLOY_RULES.md` — критические правила деплоя
4. `memory-bank/` — контекст проекта для AI агентов

## Known Issues
- **Mini App 404:** При первом открытии — обновить URL в BotFather на https://phukeo.com/#/
- **HashRouter:** Используется для GitHub Pages совместимости
- **React 18 vs 19:** react-leaflet@5.0.0 требует React 19, решается --legacy-peer-deps
