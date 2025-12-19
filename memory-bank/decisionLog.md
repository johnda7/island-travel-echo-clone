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

### Удалён маршрут из тура 4 Жемчужины (2025-12-19)
Удалён весь массив itinerary (30 строк) из тура "4 Жемчужины Андаманского моря". Описание тура оставлено без изменений. На сайте больше не отображается таблица маршрута для этого тура.

**Status:** accepted
**Impact:** src/data/tours/pearls-andaman-sea/static.ts - удалён массив itinerary

Rationale:
Пользователь запросил удалить таблицу маршрута после карты, оставив только описание тура.

Alternatives Considered:


## Pending Decisions
