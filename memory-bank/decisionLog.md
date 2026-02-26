# Decision Log

## Technical Decisions

### Initial Project Structure (2025-12-19)
Initialized vite_react_shadcn_ts with a modular architecture using Node.js

**Status:** accepted
**Impact:** Project-wide

Rationale:
Established foundation for scalable and maintainable development




### Framework Selection (2025-12-19)
Selected React as primary framework(s)

**Status:** accepted
**Impact:** Technical architecture

Rationale:
Chosen based on project requirements and team expertise




### Development Workflow (2025-12-19)
Established initial development workflow and practices

**Status:** accepted
**Impact:** Development process

Rationale:
Ensure consistent development process and code quality

Alternatives Considered:
- Ad-hoc development process
- Waterfall methodology



### Documentation Strategy (2025-12-19)
Implemented automated documentation with memory bank

**Status:** accepted
**Impact:** Project documentation

Rationale:
Maintain up-to-date project context and decision history

### Деплой только через deploy-canonical.yml (2025-12-19)
Использовать ТОЛЬКО .github/workflows/deploy-canonical.yml для деплоя. Другие workflow файлы отключены или для особых случаев.

**Status:** accepted
**Impact:** CI/CD, деплой на GitHub Pages

Rationale:
deploy-canonical.yml содержит правильную логику: npm config set legacy-peer-deps true + npm ci. Это решает конфликт React 18 vs react-leaflet@5 (требует React 19).

Alternatives Considered:
- deploy-on-command.yml - отключен
- Ручной деплой - не рекомендуется

### React 18 + legacy-peer-deps для react-leaflet (2025-12-19)
Проект использует React 18.3.1. Библиотека react-leaflet@5.0.0 требует React 19. Решение: всегда использовать --legacy-peer-deps при npm install.

**Status:** accepted
**Impact:** npm install, CI/CD, все зависимости

Rationale:
Обновление до React 19 сломает другие зависимости. legacy-peer-deps позволяет игнорировать конфликт peer dependencies.

Alternatives Considered:
- Обновить до React 19 - сломает проект
- Даунгрейд react-leaflet до v4 - потеря функционала

### Защита критических файлов от удаления (2025-12-19)
Агентам ЗАПРЕЩЕНО удалять: src/, public/, package.json, package-lock.json, index.html, vite.config.ts, tsconfig.json, .github/workflows/. Перед коммитом проверять: git ls-files | wc -l должно быть ~1000+ файлов.

**Status:** accepted
**Impact:** Весь проект, деплой, CI/CD

Rationale:
19.12.2025 агент случайно удалил 1140 файлов в коммите 56ff611. Деплой падал с exit code 254 потому что не было исходников. Решение: откат до be6cb12.

Alternatives Considered:

### Обновление туров: 4 Жемчужины и Джеймс Бонд (2025-12-19)
Обновлён тур "4 Жемчужины Андаманского моря": новое описание от пользователя + добавлены Comfort+ features. Убран русскоговорящий гид из тура "Остров Джеймса Бонда". Добавлено поле comfortPlusFeatures в TourData.

**Status:** accepted
**Impact:** src/data/tours/pearls-andaman-sea/static.ts, src/data/tours/james-bond-island/static.ts, src/types/Tour.ts

Rationale:
Пользователь запросил обновление описания тура и удаление информации про русскоговорящего гида. Comfort+ features добавлены для отображения преимуществ пакета.

Alternatives Considered:

### Отключён deploy-on-command.yml - только deploy-canonical.yml активен (2025-12-19)
Отключён workflow deploy-on-command.yml. Теперь ТОЛЬКО deploy-canonical.yml срабатывает на push в main. Все остальные workflow отключены (deploy.yml, deploy-to-pages-root.yml, deploy-release.yml, deploy-on-command.yml).

**Status:** accepted
**Impact:** .github/workflows/deploy-on-command.yml - отключен

Rationale:
Пользователь запросил оставить только правильный деплой. deploy-canonical.yml - единственный рабочий workflow с правильной логикой (npm config set legacy-peer-deps true + npm ci --legacy-peer-deps).

Alternatives Considered:

### Удалён маршрут (itinerary) из тура 4 Жемчужины (2025-12-19)
Удалён весь массив itinerary (30 строк) из тура "4 Жемчужины Андаманского моря". Описание тура оставлено без изменений. На сайте больше не отображается таблица маршрута для этого тура.

**Status:** accepted
**Impact:** src/data/tours/pearls-andaman-sea/static.ts - удалён массив itinerary

Rationale:
Пользователь запросил удалить таблицу маршрута после карты, оставив только описание тура.

Alternatives Considered:

### Удалён маршрут (routePoints) из тура 4 Жемчужины (2025-12-19)
Удалён весь массив routePoints (101 строка) из файла src/data/routes/pearls-andaman-sea-route.ts. Массив очищен до пустого массива []. На сайте больше не отображается секция "Маршрут тура" с картой и таблицей маршрута для этого тура.

**Status:** accepted
**Impact:** src/data/routes/pearls-andaman-sea-route.ts - массив routePoints очищен

Rationale:
Пользователь запросил удалить именно таблицу маршрута (routePoints), которая отображалась на странице тура. Это отдельный файл от itinerary в static.ts.

Alternatives Considered:

### Главные AI промпты и оптимизированные файлы проекта (2025-12-19)
Проект использует несколько ключевых AI промптов и оптимизированных файлов для работы агентов: 1) .github/copilot-instructions.md - основной промпт для агентов (66 строк), содержит правила деплоя, архитектуру, iOS 26 дизайн; 2) AI_DOCS/AI_PROMPT_OPTIMIZED.md - оптимизированный промпт (1807 строк), содержит CEO-мышление, 10 принципов Perplexity, iOS 26 дизайн, быстрые референсы; 3) AI_DOCS/AI_CORE_PROMPTS_COMPACT.md - компактная версия (300 строк), содержит основные принципы и быстрые команды; 4) AI_DOCS/AI_PROMPT_INSTRUCTIONS.md - полная инструкция (4907 строк), содержит полную архитектуру, Telegram стратегию, все детали проекта; 5) AI_DOCS/DEPLOY_RULES.md - критические правила деплоя, React 18/19 конфликт, защищенные файлы.

**Status:** accepted
**Impact:** AI агенты должны использовать эти файлы как основные источники информации. Все изменения в проекте должны соответствовать принципам, описанным в этих файлах.

Rationale:
Эти файлы являются основными источниками знаний для AI агентов. Они содержат всю необходимую информацию о проекте, архитектуре, деплое и философии. Агенты должны читать эти файлы перед началом работы.

Alternatives Considered:
- Создать один большой файл
- Разделить на больше файлов

Related Decisions:
- Философия проекта и 10 принципов Perplexity
- Правила деплоя и React 18/19 конфликт

### Философия проекта: CEO-мышление и 10 принципов Perplexity AI (2025-12-19)
Проект следует философии основателя Perplexity AI (Aravind Srinivas), который вырастил компанию с $0 до $20B за 3 года. Ключевые принципы: 1) СКОРОСТЬ = ЕДИНСТВЕННОЕ ПРЕИМУЩЕСТВО - идея→деплой за 48ч; 2) ПРАВДА > КОМФОРТ - честность вместо вежливости; 3) МИНИМАЛИЗМ = СИЛА - удалять функции даже если жалуются; 4) < 2 СЕК ЗАГРУЗКА = STANDARD; 5) ПОЛЬЗОВАТЕЛЬ НИКОГДА НЕ ОШИБАЕТСЯ - плохой UX = вина продукта; 6) BOOKING ENGINE, НЕ КАТАЛОГ - топ-3 за 2 клика; 7) НЕПОБЕДИМАЯ ЛОВУШКА - 0% комиссия vs Booking.com 20%; 8) 1% УЛУЧШЕНИЕ КАЖДЫЙ ДЕНЬ - магия компаундинга; 9) КОМАНДЫ 2-3 ЧЕЛОВЕКА - минимум координации; 10) ЗДОРОВАЯ ПАРАНОЙЯ - конкуренты скопируют завтра. AI агент работает как CEO с 70% долей в прибыли, думает как владелец, а не наемник.

**Status:** accepted
**Impact:** Все решения в проекте должны соответствовать этой философии. Агенты должны думать как CEO с долей в бизнесе, предлагать улучшения для роста продаж, фокусироваться на конверсии и скорости.

Rationale:
Эта философия определяет подход к разработке, скорость итераций, качество продукта и бизнес-решения. Она помогает принимать правильные решения и фокусироваться на росте бизнеса.

Alternatives Considered:
- Традиционный подход к разработке
- Медленные итерации

Related Decisions:
- iOS 26 Design System
- Telegram Web App стратегия

### iOS 26 Design System и архитектура проекта (2025-12-19)
Проект использует iOS 26 Design System для создания ощущения нативного iOS приложения. Ключевые элементы: 1) ONE BLUE RULE - #007AFF для всех интерактивных элементов; 2) Glassmorphism - backdrop blur(20px) saturate(180%), полупрозрачность, блики; 3) SF Pro шрифты; 4) Footer #1C1C1E (темный iOS); 5) 27 критериев проверки туров. Архитектура: WordPress-like CMS на React - каждый тур = отдельная папка в src/data/tours/<slug>/, централизованный TourPageTemplate для всех 22 туров (11 строк вместо 900+), централизованный toursRegistry.ts как база данных. Структура: React 18.3 + TypeScript + Vite, Tailwind CSS, HashRouter для GitHub Pages, Leaflet для карт.

**Status:** accepted
**Impact:** Все компоненты должны следовать iOS 26 стандартам. Все туры используют TourPageTemplate. Изменения дизайна делаются в одном месте и применяются ко всем турам.

Rationale:
iOS 26 дизайн создает премиум ощущение и доверие клиентов. Централизованная архитектура позволяет обновлять все туры одним изменением, экономит тысячи строк кода.

Alternatives Considered:
- Традиционный веб-дизайн
- Дублирование кода для каждого тура

Related Decisions:
- Централизованная система туров
- Философия проекта

### Правила деплоя: deploy-canonical.yml и React 18/19 конфликт (2025-12-19)
ЕДИНСТВЕННЫЙ ПРАВИЛЬНЫЙ ДЕПЛОЙ: .github/workflows/deploy-canonical.yml. Автоматически запускается при push в main. ОТКЛЮЧЕННЫЕ workflow: deploy-on-command.yml, deploy.yml, deploy-to-pages-root.yml, deploy-release.yml - НЕ ИСПОЛЬЗОВАТЬ! Критическая проблема: React 18 vs React 19 конфликт - проект использует React 18.3.1, но react-leaflet@5.0.0 требует React 19. Решение: deploy-canonical.yml использует npm config set legacy-peer-deps true + npm ci --legacy-peer-deps. НЕ обновлять react-leaflet без проверки совместимости. Правильный способ деплоя: git add && git commit && git push origin main → деплой запустится автоматически. Защищенные файлы: src/, public/, package.json, package-lock.json, index.html, vite.config.ts, tsconfig.json, .github/workflows/ - НИКОГДА не удалять.

**Status:** accepted
**Impact:** Все деплои должны идти через deploy-canonical.yml. Агенты НЕ должны использовать другие workflow. При установке зависимостей всегда использовать --legacy-peer-deps. НЕ удалять критические файлы.

Rationale:
deploy-canonical.yml - единственный рабочий деплой, проверен на успешных деплоях #98, #97, #95. React 18/19 конфликт решается через legacy-peer-deps. Защита критических файлов предотвращает случайное удаление исходников.

Alternatives Considered:
- Использовать другие workflow
- Обновить React до 19
- Удалить legacy-peer-deps

Related Decisions:
- Восстановление после удаления файлов
- Защита критических файлов

## Pending Decisions

### MCP серверы Context7 + Memory (2026-02-26)
Настроены MCP серверы в `.vscode/mcp.json`: Context7 (`@upstash/context7-mcp`) для документации библиотек, Memory (`@modelcontextprotocol/server-memory`) для персистентной памяти AI агентов.

**Status:** accepted
**Impact:** AI агенты получают доступ к актуальной документации и памяти между сессиями

Rationale:
Context7 позволяет агентам получать свежую документацию по React, Vite, Tailwind и др. Memory сохраняет контекст между сессиями для continuity.

### Добавление тура phi-phi-racha-maiton-sunset (2026-02-26)
Добавлен новый тур "Пхи-Пхи, Рача Яй и закатная вечеринка у Майтон". Файлы: static.ts (данные + 13 фото), index.ts (реэкспорт), PhiPhiRachaMaitonSunsetNew.tsx (страница с 9 RoutePoints). Зарегистрирован в toursRegistry.ts (priority: 25, islands, featured). Маршруты добавлены в App.tsx.

**Status:** accepted
**Impact:** src/data/tours/phi-phi-racha-maiton-sunset/, src/pages/, toursRegistry.ts, App.tsx

Rationale:
Новый премиум тур на катамаране. Цена: 2800/2500 ฿. Comfort+ only. Маршрут: Пхукет → Рача Яй → Пхи-Пхи → Майтон → Пхукет.
