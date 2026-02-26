# Project Context

## Overview
**Project Name:** Island Travel Echo Clone - Phuket Tours  
**Live Site:** https://phukeo.com  
**Repository:** johnda7/island-travel-echo-clone  
**Version:** Production (24 тура, добавляются новые)  
**License:** Not specified

## Project Description
React SPA сайт туров по Пхукету с iOS 26 дизайном. WordPress-like CMS архитектура на React. Telegram Mini App интеграция. Централизованная система: 24 папки туров, 23 зарегистрированы в `toursRegistry.ts`, все рендерятся через единый `TourPageTemplate.tsx` (1067 строк).

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
| Пакет | Версия | Заметка |
|------|--------|--------|
| react | ^18.3.1 | НЕ обновлять до 19 без тестирования |
| react-dom | ^18.3.1 | |
| react-router-dom | ^6.30.1 | HashRouter для GitHub Pages |
| react-leaflet | ^5.0.0 | Требует React 19 → `--legacy-peer-deps` |
| leaflet | ^1.9.4 | Карты маршрутов |
| @supabase/supabase-js | ^2.57.4 | Только для бронирований, НЕ для туров |
| @tanstack/react-query | ^5.87.4 | |
| vite | ^5.4.1 | Сборка |
| tailwindcss | ^3.4.11 | Стили |
| typescript | ^5.5.3 | |
| zod | ^3.23.8 | Валидация форм |
| react-helmet-async | ^2.0.5 | SEO мета-теги |
| lucide-react | ^0.462.0 | Иконки |
| Radix UI | разные | dialog, accordion, tabs, select и др. |

## Architecture

### WordPress-like CMS на React
- **Централизованная база данных:** `src/data/toursRegistry.ts` (как WordPress database)
- **Структура туров:** Каждый тур = отдельная папка `src/data/tours/<slug>/`
  - `static.ts` - данные тура (TourData)
  - `index.ts` - реэкспорт
- **Единый шаблон:** `src/components/TourPageTemplate.tsx` для всех 24 туров
- **Маршруты:** `src/data/routes/<tour>-route.ts` с GPS координатами

### iOS 26 Design System
- **ONE BLUE RULE:** #007AFF для всех интерактивных элементов
- **Glassmorphism:** backdrop blur(20px) saturate(180%), полупрозрачность, блики
- **Шрифты:** SF Pro stack (системные шрифты iOS)
- **Footer:** #1C1C1E (темный iOS)
- **27 критериев проверки** туров

### Централизованная система
- **TourPageTemplate:** 1067 строк — единый рендерер для всех туров
- **Каждый тур — ~11 строк** в страничном компоненте: import data + routePoints + render
- **Одно изменение в шаблоне → все 23 тура обновлены**
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

## Key Metrics (2026-02-26)
- **Папок туров:** 24 (в src/data/tours/)
- **В реестре:** 23 активных (все isActive: true)
- **Маршрутов в App.tsx:** ~52 туровых + ~15 системных
- **Категории:** islands(9), adventure(7), diving(3), cultural(1), fishing(1)
- **Конверсия через Telegram:** 15-25% (vs Booking.com 2-3%)
- **Средний чек:** ฿4,500

## Documentation for AI Agents
1. `.github/copilot-instructions.md` — основной промпт (~75 строк)
2. `AI_DOCS/AI_PROMPT_OPTIMIZED.md` — оптимизированный
3. `AI_DOCS/AI_CORE_PROMPTS_COMPACT.md` — компактная версия
4. `AI_DOCS/DEPLOY_RULES.md` — критические правила деплоя
5. `memory-bank/` — контекст проекта (4 файла)
6. `.vscode/mcp.json` — MCP сервера (Context7 + Memory)

## Recent Changes
- 2026-02-26: Добавлен тур phi-phi-racha-maiton-sunset, copilot-instructions.md переписан, MCP настроен
- 2026-02-21: Восстановлен copilot-instructions.md, обновлён memory-bank
- 2025-12-21: Security fix — токены удалены, бот @phukeo_bot создан
- 2025-12-19: Восстановление репозитория из be6cb12 после случайного удаления 1140 файлов

## Аномалии / TODO
- **eleven-islands-standard** — папка в tours/ но НЕ в реестре (сирота)
- **Priority 25 conflict** — rafting-spa-1day и phi-phi-racha-maiton-sunset
- **ID ≠ slug** для 4 туров: rafting-spa-atv-1-day, kao-lak-safari-1-day, james-bond-island-phang-nga, racha-coral-islands-speedboat
- **Google Analytics** — placeholder G-XXXXXXXXXX, не подключён
- **Google Search Console** — не настроен