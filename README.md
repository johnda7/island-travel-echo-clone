# 🏝️ Island Travel Echo Clone - Обновленная система бронирования

**Живой сайт**: https://phukeo.com  
**Примечание по деплою**: Публикация ТОЛЬКО через GitHub Actions `deploy-canonical` (теги v* или ручной ref)

## 🚀 ОБНОВЛЕНИЯ (20.09.2025)
- ✅ Добавлен динамический маршрут шаблона туров: `/tour/:tourId` (универсальный шаблон TourTemplate)
- ✅ Централизованный калькулятор/бронь через `UniversalBookingModal` подключён в шаблоне — работает во всех турах по умолчанию
- ✅ Два полноценных защищённых тура остаются на собственных страницах/маршрутах: 
	- `/excursion/phi-phi-2-days-1-night` и `/tours/phi-phi-2-days-1-night` (Phi Phi 2 days / 1 night)
	- `/excursion/four-pearls-andaman` и `/tours/four-pearls-andaman` (4 Pearls of the Andaman Sea)
- ✅ Все ссылки на страницы туров должны строиться через `getTourDetailPath(id)` — он возвращает канонический путь (для защищённых туров — SEO-дружественные URL, для остальных — `/tour/:id`)
- ✅ Поиск и карточки туров используют канонические пути, поддержаны хэш-маршруты для GitHub Pages

## 📌 История обновлений (18.09.2025)
- ✅ Создана отдельная страница бронирования `/book/:tourId`
- ✅ Интеграция с Telegram API для отправки заказов на @Phuketga  
- ✅ Убраны красные бейджи "Забронировали сегодня X"
- ✅ Центрированы все фотографии в карточках туров
- ✅ Создана CMS-архитектура с единым источником данных

# 📋 Полная инструкция по переносу туров с WordPress на React-сайт

## 🎯 Цель инструкции
Создание системы переноса туров с оригинального WordPress сайта https://phuketgo.aaddaa.com на наш коммерческий сайт https://phukeo.com с сохранением всех фотографий, данных и функциональности.

---

## 📈 Результат переноса

После переноса тур будет:
- ✅ Отображаться в общем каталоге туров
- ✅ Иметь собственную страницу с галереей
- ✅ Поддерживать бронирование через WhatsApp
- ✅ Быть частью централизованной системы данных
- ✅ Автоматически попадать в поиск и фильтры
- ✅ Работать на всех устройствах (responsive design)

---

## 🏗️ Концепция: React сайт как WordPress CMS

### 🎯 Философия проекта

**Мы НЕ создаем статичный сайт!** Мы создаем **многостраничный динамический сайт**, который работает как полноценная **WordPress CMS**, но на React.

**Ключевые принципы:**
- ✅ **Каждый тур = отдельная страница** (как WordPress posts)
- ✅ **Централизованная база данных туров** (`/src/data/tours.ts` = WordPress database)
- ✅ **Структурированные медиа-файлы** (папки по турам = WordPress Media Library)
- ✅ **Единообразные карточки туров** (как WordPress post cards)
- ✅ **SEO-дружественные URL** (`/tours/tour-slug` = WordPress permalinks)

---

## 🚀 Примеры успешных переносов

### ✅ Готовые туры (100% с WordPress):
1. **Рача-Корал** - 12 фото, https://phukeo.com/tours/racha-coral
2. **4 Жемчужины Андаманского моря** - 8 фото, https://phukeo.com/tours/four-pearls-andaman
3. **Пхи-Пхи 2 дня** - 17 фото, https://phukeo.com/tours/phi-phi-2-days-1-night

**Итого: 37 фото (~35MB) - все с оригинального WordPress сайта**

---

## ⚡ Быстрый старт для нового тура

### 1. 📋 Анализ WordPress (5 минут)
```bash
# Откройте оригинальную страницу тура на WordPress
# Например: https://phuketgo.aaddaa.com/excursion/james-bond-phang-nga/
# Изучите фото, цены, описания, программу
```

### 2. 📥 Скачивание фото (15 минут)
```bash
# Создайте папку для тура
mkdir src/assets/james-bond-island

# Скачайте ВСЕ фото с WordPress (правый клик → сохранить как)
# Переименуйте в логичные имена: james-1.jpg, james-2.jpg...
# Выберите главное фото для карточки (квадратная композиция)
```

### 3. 🖼️ Создание images.ts (10 минут)
```typescript
// src/assets/james-bond-island/images.ts
import james1 from './james-1.jpg'
import james2 from './james-2.jpg'
// ... остальные импорты

export const jamesBondImages = {
  main: james1,                    // Главное фото
  gallery: [james1, james2, ...],  // Все фото для галереи
  thumbnail: james1                // Для каталога
}
```

### 4. 📄 Создание компонента (20 минут)
```bash
# Скопируйте эталонную структуру
cp src/pages/PhiPhi2Days1Night.tsx src/pages/JamesBondIsland.tsx

# Замените фото импорты и тексты из WordPress
# ВАЖНО: сохраните точную структуру дизайна!
```

### 5. 🔗 Настройка роутинга (5 минут)
```typescript
// В src/App.tsx добавьте:
import JamesBondIsland from './pages/JamesBondIsland'

<Route path="/tours/james-bond-island" element={<JamesBondIsland />} />
```

### 6. 📊 Добавление в каталог (10 минут)
```typescript
// В src/data/tours.ts добавьте объект тура со всеми данными из WordPress
```

### 7. ✅ Тестирование и деплой (10 минут)
```bash
npm run build  # Проверка на ошибки локально
git add -A && git commit -m "✨ Add James Bond Island from WordPress"

# Продакшн-деплой ТОЛЬКО через GitHub Actions (канонический workflow)
# Вариант A (рекомендуется): тэг-релиз
git tag vX.Y.Z -m "Release X.Y.Z"
git push origin vX.Y.Z

# Вариант B: вручную запустить workflow deploy-canonical с ref=HEAD
# После деплоя проверьте маркер версии: https://phukeo.com/__build.txt
```

**⏰ Общее время: ~80 минут на полный перенос**

---

## 📁 Структура проекта

```
src/
├── assets/                    # Фото с WordPress по турам
│   ├── racha-coral/          # 12 фото + images.ts
│   ├── four-pearls-andaman/  # 8 фото + images.ts  
│   └── phi-phi-2days/        # 17 фото + images.ts
├── data/
│   └── tours.ts              # Централизованные данные (как WordPress database)
├── pages/                    # Страницы туров (как WordPress templates)
│   ├── PhiPhi2Days1Night.tsx # ЭТАЛОН дизайна для всех туров
│   ├── RachaCoral.tsx        
│   └── FourPearlsAndaman.tsx 
└── components/
    └── Tours.tsx             # Карточки туров на главной
```

---

## 🎨 Дизайн-стандарт

**ЭТАЛОН:** https://phukeo.com/excursion/phi-phi-2-days-1-night

**ВСЕ туры должны выглядеть единообразно!**

### Обязательная структура:
1. **Hero секция** - полноэкранное фото с заголовком
2. **Краткая информация** - цена, длительность, рейтинг, иконки
3. **Описание тура** - 2-3 абзаца о туре
4. **Программа тура** - детальная программа по пунктам
5. **Галерея фотографий** - сетка с возможностью просмотра
6. **Форма бронирования** - WhatsApp интеграция

---

## 🎯 Следующие туры для переноса

### 🥇 Приоритетные:
1. **James Bond Island** - `/excursion/james-bond-phang-nga/`
2. **Similan Islands** - `/excursion/similan-islands-snorkeling/`
3. **Coral Island + Parasailing** - `/excursion/coral-island-parasailing/`

### 🥈 Дополнительные:
4. **Big Buddha + Wat Chalong** - `/excursion/big-buddha-wat-chalong/`
5. **Elephant Sanctuary** - `/excursion/phuket-elephant-sanctuary/`

**Цель: 10+ туров к концу 2025 года**

---

## 💾 Сохранность данных

### 🚨 КРИТИЧЕСКИ ВАЖНО!
- Все фото скачиваются с WordPress в оригинальном качестве
- Каждый тур = отдельный Git коммит с полной информацией
- WordPress может исчезнуть - создаем полные локальные бэкапы

---

## ⚙️ Технические детали

### Требования к фотографиям:
- ✅ Минимум 1200x800 пикселей
- ✅ Размер файла: 200KB - 3MB
- ✅ Только с оригинального WordPress сайта
- ✅ Дескриптивные имена файлов

### WhatsApp бронирование:
- Автоматически генерируются сообщения
- Номер: +66934740231
- Интеграция во всех турах

### GitHub Pages деплой (канонический):
- Используйте workflow `.github/workflows/deploy-canonical.yml`
- Триггеры: тег `v*` или ручной запуск с `ref` (ветка/тег/SHA)
- Проверка после деплоя: `https://phukeo.com/__build.txt`
- Прод-URL: https://phukeo.com

---

## 📞 Поддержка

Полная документация находится в файле `TOUR_MIGRATION_GUIDE.md`

---

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3875c40a-aaeb-47ea-bedc-679166dacdea) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Production deploy is handled ONLY via GitHub Actions canonical workflow (`.github/workflows/deploy-canonical.yml`). Use one of:

- Tag-based release (recommended): create tag `vX.Y.Z` and push it. The workflow builds, runs sanity checks, publishes to `gh-pages`, and verifies `https://phukeo.com/__build.txt`.
- Manual run: in GitHub → Actions → deploy-canonical → Run workflow with `ref` (branch/tag/SHA). Useful for hotfixes to a specific commit.

Notes:
- Do not deploy production from arbitrary branch pushes. Legacy workflows are disabled.
- Keep HashRouter and SPA fallback as-is. CNAME/robots/sitemap are included automatically.

### Lovable (preview only)

You can still use Lovable to preview builds, but do NOT use it for production publishing. Production is Actions-only.

1) Open the project: https://lovable.dev/projects/3875c40a-aaeb-47ea-bedc-679166dacdea
2) Build settings: `npm run build` → output `dist/`
3) Local dev: `npm run dev`, preview built assets: `npm run serve:dist`
4) Disable any “Auto publish to main” for production; it must not affect prod.

### GitHub Pages setup and permissions (one-time)

If Actions deployment fails (e.g., Pages disabled or lacking permissions):

1) Enable Pages source:
	- Settings → Pages → Source = GitHub Actions
2) Grant workflow write permissions:
	- Settings → Actions → General → Workflow permissions = Read and write permissions
3) Re-run deploy-canonical in Actions.

Production URL: https://phukeo.com


## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
# Calculator debug build - Mon Sep 22 14:54:59 UTC 2025
cache-bust: Mon Sep 29 17:53:48 +07 2025
