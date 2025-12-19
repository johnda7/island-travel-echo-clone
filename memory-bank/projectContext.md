# Project Context

## Overview
**Project Name:** Island Travel Echo Clone - Phuket Tours  
**Live Site:** https://phukeo.com  
**Repository:** johnda7/island-travel-echo-clone  
**Version:** Production (22 активных тура)  
**License:** Not specified

## Project Description
React SPA сайт туров по Пхукету с iOS 26 дизайном. WordPress-like CMS архитектура на React. Telegram Mini App интеграция. Централизованная система туров с единым TourPageTemplate для всех 22 туров.

## Technical Stack
**Runtime:** Node.js  
**Languages:** TypeScript, JavaScript  
**Frameworks:** React 18.3.1, Vite  
**UI Framework:** Tailwind CSS, shadcn/ui, Radix UI  
**Routing:** React Router (HashRouter для GitHub Pages)  
**Maps:** Leaflet, react-leaflet@5.0.0  
**CMS:** Supabase (опционально), централизованный toursRegistry.ts  
**Build Tool:** Vite  
**Deployment:** GitHub Pages через GitHub Actions

## Key Dependencies
**Core:**
- react: 18.3.1
- react-dom: 18.3.1
- react-router-dom: HashRouter для GitHub Pages
- react-leaflet: 5.0.0 (требует React 19, но проект на React 18 - используется --legacy-peer-deps)
- leaflet: для карт маршрутов
- @supabase/supabase-js: опциональная CMS интеграция
- @tanstack/react-query: для данных
- react-helmet-async: SEO мета-теги
- embla-carousel-react: галереи
- date-fns: работа с датами
- zod: валидация форм
- react-hook-form: формы бронирования

**UI Components (Radix UI):**
- @radix-ui/react-dialog, @radix-ui/react-accordion, @radix-ui/react-tabs и др.

**Styling:**
- tailwindcss: основной CSS фреймворк
- tailwindcss-animate: анимации
- @tailwindcss/typography: типографика

## Architecture

### WordPress-like CMS на React
- **Централизованная база данных:** `src/data/toursRegistry.ts` (как WordPress database)
- **Структура туров:** Каждый тур = отдельная папка `src/data/tours/<slug>/`
  - `static.ts` - данные тура (TourData)
  - `index.ts` - реэкспорт
- **Единый шаблон:** `src/components/TourPageTemplate.tsx` для всех 22 туров
- **Маршруты:** `src/data/routes/<tour>-route.ts` с GPS координатами

### iOS 26 Design System
- **ONE BLUE RULE:** #007AFF для всех интерактивных элементов
- **Glassmorphism:** backdrop blur(20px) saturate(180%), полупрозрачность, блики
- **Шрифты:** SF Pro stack (системные шрифты iOS)
- **Footer:** #1C1C1E (темный iOS)
- **27 критериев проверки** туров

### Централизованная система
- **TourPageTemplate:** 11 строк кода вместо 900+ для каждого тура
- **Одно изменение → все 22 тура обновлены**
- **Экономия:** ~9,100 строк кода удалено при миграции

## Project Structure
```
src/
├── assets/                    # Фото туров по папкам
│   ├── pearls-andaman-sea/
│   ├── james-bond-island/
│   └── ...
├── components/
│   ├── TourPageTemplate.tsx   # ГЛАВНЫЙ шаблон (защищён)
│   ├── UniversalBookingModal.tsx  # Форма бронирования (защищён)
│   ├── TourRouteMap.tsx       # Карта маршрута
│   └── ...
├── data/
│   ├── tours/                 # Данные туров (один тур = одна папка)
│   │   ├── pearls-andaman-sea/
│   │   │   ├── static.ts
│   │   │   └── index.ts
│   │   └── ...
│   ├── routes/                # GPS маршруты туров
│   │   ├── pearls-andaman-sea-route.ts
│   │   └── ...
│   └── toursRegistry.ts       # Центральный реестр (защищён)
├── pages/                     # Страницы туров (3 строки кода каждая)
│   ├── PearlsAndamanSeaNew.tsx
│   └── ...
├── types/
│   └── Tour.ts                # TypeScript типы
└── App.tsx                     # Роутинг

.github/
└── workflows/
    ├── deploy-canonical.yml   # ЕДИНСТВЕННЫЙ активный деплой
    ├── deploy-on-command.yml  # ОТКЛЮЧЁН
    └── ...                    # Другие отключены

AI_DOCS/                        # Документация для AI агентов
├── AI_PROMPT_INSTRUCTIONS.md  # Полная инструкция (4907 строк)
├── AI_PROMPT_OPTIMIZED.md     # Оптимизированный (1807 строк)
├── AI_CORE_PROMPTS_COMPACT.md # Компактная версия (300 строк)
├── DEPLOY_RULES.md            # Критические правила деплоя
└── ...
```

## Configuration Files
- `package.json` - зависимости проекта
- `package-lock.json` - lock-файл (КРИТИЧЕСКИ ВАЖЕН!)
- `vite.config.ts` - конфиг Vite
- `tsconfig.json` - конфиг TypeScript
- `tailwind.config.ts` - конфиг Tailwind
- `postcss.config.js` - конфиг PostCSS
- `eslint.config.js` - конфиг ESLint
- `.github/copilot-instructions.md` - основной AI промпт

## Deployment
**ЕДИНСТВЕННЫЙ правильный деплой:** `.github/workflows/deploy-canonical.yml`
- Автоматически запускается при `push` в `main`
- Использует `npm config set legacy-peer-deps true` + `npm ci --legacy-peer-deps`
- Решает конфликт React 18 vs react-leaflet@5 (требует React 19)
- Деплоит на GitHub Pages

**ОТКЛЮЧЁННЫЕ workflow (НЕ ИСПОЛЬЗОВАТЬ!):**
- deploy-on-command.yml
- deploy.yml
- deploy-to-pages-root.yml
- deploy-release.yml

## Critical Issues & Solutions

### React 18 vs React 19 Conflict
**Проблема:** Проект использует React 18.3.1, но react-leaflet@5.0.0 требует React 19  
**Решение:** Всегда использовать `--legacy-peer-deps` при установке зависимостей  
**В workflow:** `npm config set legacy-peer-deps true` + `npm ci --legacy-peer-deps`

### Protected Files (НИКОГДА не удалять!)
- `src/` - исходный код
- `public/` - статические файлы
- `package.json` - зависимости
- `package-lock.json` - lock-файл
- `index.html` - точка входа
- `vite.config.ts` - конфиг сборки
- `tsconfig.json` - конфиг TypeScript
- `.github/workflows/` - CI/CD пайплайны

**Проверка перед коммитом:** `git ls-files | wc -l` должно быть ~1000+ файлов

## Project Philosophy
**CEO-мышление:** AI агент работает как CEO с 70% долей в прибыли

**10 принципов Perplexity AI:**
1. СКОРОСТЬ = ЕДИНСТВЕННОЕ ПРЕИМУЩЕСТВО (идея→деплой за 48ч)
2. ПРАВДА > КОМФОРТ (честность вместо вежливости)
3. МИНИМАЛИЗМ = СИЛА (удалять функции даже если жалуются)
4. < 2 СЕК ЗАГРУЗКА = STANDARD
5. ПОЛЬЗОВАТЕЛЬ НИКОГДА НЕ ОШИБАЕТСЯ (плохой UX = вина продукта)
6. BOOKING ENGINE, НЕ КАТАЛОГ (топ-3 за 2 клика)
7. НЕПОБЕДИМАЯ ЛОВУШКА (0% комиссия vs Booking.com 20%)
8. 1% УЛУЧШЕНИЕ КАЖДЫЙ ДЕНЬ (магия компаундинга)
9. КОМАНДЫ 2-3 ЧЕЛОВЕКА (минимум координации)
10. ЗДОРОВАЯ ПАРАНОЙЯ (конкуренты скопируют завтра)

## Key Metrics
- **Активных туров:** 22
- **Файлов в репозитории:** 1196
- **Строк кода удалено при миграции:** ~9,100
- **Конверсия через Telegram:** 15-25% (vs Booking.com 2-3%)
- **Средний чек:** ฿4,500

## Documentation for AI Agents
**Главные файлы:**
1. `.github/copilot-instructions.md` - основной промпт (66 строк)
2. `AI_DOCS/AI_PROMPT_OPTIMIZED.md` - оптимизированный (1807 строк)
3. `AI_DOCS/AI_CORE_PROMPTS_COMPACT.md` - компактная версия (300 строк)
4. `AI_DOCS/AI_PROMPT_INSTRUCTIONS.md` - полная инструкция (4907 строк)
5. `AI_DOCS/DEPLOY_RULES.md` - критические правила деплоя

**Всего документации:** ~7000+ строк для AI агентов

## Recent Changes
- 2025-12-19: Удалён маршрут (routePoints) из тура 4 Жемчужины
- 2025-12-19: Удалён маршрут (itinerary) из тура 4 Жемчужины
- 2025-12-19: Отключён deploy-on-command.yml, только deploy-canonical.yml активен
- 2025-12-19: Обновлены туры: 4 Жемчужины (новое описание + Comfort+), Джеймс Бонд (убрал русскоговорящего гида)
- 2025-12-19: Восстановление репозитория из be6cb12 после случайного удаления 1140 файлов
- 2025-12-19: Создание AI_DOCS/DEPLOY_RULES.md с правилами для агентов