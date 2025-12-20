# Active Context

## Current Session
**Date:** 2025-12-19  
**Mode:** Documentation and Memory Bank Update  
**Task:** Обновление всех файлов memory bank на актуальность, добавление главных AI промптов, философии проекта, правил деплоя

## Current Status
- ✅ Деплой #102 выполняется (коммит 2876b40)
- ✅ Удалён маршрут (routePoints) из тура 4 Жемчужины Андаманского моря
- ✅ Все файлы memory bank обновлены с актуальной информацией
- ✅ Добавлены главные AI промпты и оптимизированные файлы
- ✅ Добавлена философия проекта (10 принципов Perplexity)
- ✅ Добавлены правила деплоя и React 18/19 конфликт

## Repository Status
- **Total files:** 1196 файлов
- **Last commit:** 2876b40 - "Удалён маршрут (routePoints) из тура 4 Жемчужины Андаманского моря"
- **Deploy workflow:** deploy-canonical.yml (единственный активный)
- **Deploy status:** Run #102 in progress

## Key Files for AI Agents
1. **.github/copilot-instructions.md** - основной промпт (66 строк)
2. **AI_DOCS/AI_PROMPT_OPTIMIZED.md** - оптимизированный промпт (1807 строк)
3. **AI_DOCS/AI_CORE_PROMPTS_COMPACT.md** - компактная версия (300 строк)
4. **AI_DOCS/AI_PROMPT_INSTRUCTIONS.md** - полная инструкция (4907 строк)
5. **AI_DOCS/DEPLOY_RULES.md** - критические правила деплоя

## Project Philosophy
- **CEO-мышление:** AI агент работает как CEO с 70% долей в прибыли
- **10 принципов Perplexity AI:** Скорость, правда, минимализм, <2 сек загрузка, пользователь никогда не ошибается, booking engine не каталог, непобедимая ловушка, 1% улучшение каждый день, команды 2-3 человека, здоровая паранойя
- **iOS 26 Design System:** ONE BLUE #007AFF, glassmorphism, SF Pro шрифты
- **WordPress-like CMS на React:** Централизованный TourPageTemplate для всех 22 туров

## Deployment Rules
- **ЕДИНСТВЕННЫЙ деплой:** deploy-canonical.yml
- **React 18/19 конфликт:** Используется --legacy-peer-deps
- **Защищенные файлы:** src/, public/, package.json, package-lock.json, .github/workflows/ - НИКОГДА не удалять
- **Проверка перед коммитом:** git ls-files | wc -l должно быть ~1000+ файлов

## Recent Updates
- 2025-12-19: Удалён маршрут (routePoints) из тура 4 Жемчужины
- 2025-12-19: Обновлены все файлы memory bank с актуальной информацией
- 2025-12-19: Добавлены главные AI промпты, философия проекта, правила деплоя в memory bank
- 2025-12-19: Удалён маршрут (itinerary) из тура 4 Жемчужины
- 2025-12-19: Отключён deploy-on-command.yml, только deploy-canonical.yml активен
- 2025-12-19: Обновлены туры: 4 Жемчужины (новое описание + Comfort+), Джеймс Бонд (убрал русскоговорящего гида)

## Session History
- 2025-12-19: Восстановление репозитория из be6cb12 после случайного удаления 1140 файлов
- 2025-12-19: Создание AI_DOCS/DEPLOY_RULES.md с правилами для агентов
- 2025-12-19: Документирование проблемы React 18 vs react-leaflet@5

## Session Update (2025-12-19)
- Mode: memory_bank_full_update
- Task: Обновление всех файлов memory bank на актуальность: projectContext.md полностью переписан, activeContext.md обновлён, progress.md обновлён, все файлы проверены и синхронизированы с текущим состоянием проекта