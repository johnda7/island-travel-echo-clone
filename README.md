# 🏝️ Island Travel Echo Clone - Обновленная система бронирования

**Живой сайт**: https://johnda7.github.io/island-travel-echo-clone/  
**Lovable проект**: https://lovable.dev/projects/3875c40a-aaeb-47ea-bedc-679166dacdea

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
Создание системы переноса туров с оригинального WordPress сайта https://phuketgo.aaddaa.com на наш React-клон https://johnda7.github.io/island-travel-echo-clone с сохранением всех фотографий, данных и функциональности.

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
1. **Рача-Корал** - 12 фото, https://johnda7.github.io/island-travel-echo-clone/tours/racha-coral
2. **4 Жемчужины Андаманского моря** - 8 фото, https://johnda7.github.io/island-travel-echo-clone/tours/four-pearls-andaman
3. **Пхи-Пхи 2 дня** - 17 фото, https://johnda7.github.io/island-travel-echo-clone/tours/phi-phi-2-days-1-night

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
npm run build  # Проверка на ошибки
git add -A && git commit -m "✨ Add James Bond Island from WordPress"
git push       # Автоматический деплой на GitHub Pages
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

**ЭТАЛОН:** https://johnda7.github.io/island-travel-echo-clone/excursion/phi-phi-2-days-1-night

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

### GitHub Pages деплой:
- Автоматический при push в main
- URL: https://johnda7.github.io/island-travel-echo-clone/

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

Simply open [Lovable](https://lovable.dev/projects/3875c40a-aaeb-47ea-bedc-679166dacdea) and click on Share -> Publish.

### Step-by-step on Lovable

1) Open your project: https://lovable.dev/projects/3875c40a-aaeb-47ea-bedc-679166dacdea
2) Click Share → Publish
3) Build settings:
	- Build command: `npm run build`
	- Output directory: `dist`
	- Install command (optional): `npm ci` or `npm i`
4) SPA routing: already handled (we copy `index.html` to `404.html` in `postbuild`). No extra config needed.
5) Preview/Dev server:
	- Local dev: `npm run dev` (Vite)
	- Fixed port used for local preview of built assets: `npm run serve:dist` serves `dist` on `http://localhost:8081`
6) Enable Auto Publish (optional): Project → Settings → Publish → Auto publish on push to `main`.

If the publish fails, open the Build Logs in Lovable and ensure Node/npm versions are compatible. This project uses Vite 5 and Node 18+.

### Deploy via GitHub Pages (no Lovable)

1) In GitHub repo: Settings → Pages → Build and deployment → Source: GitHub Actions.
2) Commit is already configured to trigger `.github/workflows/deploy.yml` on push to `main`.
3) If you publish as Project Page (i.e. `https://<user>.github.io/<repo>/`), set env `BASE_PATH=/island-travel-echo-clone/` in the build step or in repo secrets. For User/Org Page (`https://<user>.github.io/`), `BASE_PATH` can be omitted.
4) After first successful deploy, you’ll see the public URL in the Actions logs and in Settings → Pages.

### Quick guide: enable GitHub Pages + permissions (required)

If your Actions deployment fails with errors like "Get Pages site failed" or "Resource not accessible by integration", you must enable Pages and grant write permissions to workflows.

1) Enable Pages source:
	- Open Settings → Pages: `https://github.com/<user>/island-travel-echo-clone/settings/pages`
	- In "Build and deployment" set Source = "GitHub Actions"
	- Click Save

2) Grant workflow write permissions (once per repo):
	- Open Settings → Actions → General: `https://github.com/<user>/island-travel-echo-clone/settings/actions`
	- Scroll to "Workflow permissions"
	- Select "Read and write permissions" and Save

3) Re-run deployment:
	- Go to Actions, open the latest failed run, click "Re-run all jobs"
	- Or push any commit to main to trigger a new deployment

URL will be: `https://<user>.github.io/island-travel-echo-clone/`

### Alternatives: Vercel / Netlify (optional)

This is a static SPA built with Vite/React. You can deploy on Vercel or Netlify in minutes:

- Vercel
  - Import repo in Vercel dashboard → Framework: Vite → Build: `npm run build` → Output: `dist/`
- Netlify
  - New site from Git → Build command: `npm run build` → Publish directory: `dist`

No extra routing config needed (SPA fallback is provided by copying `index.html` to `404.html` during postbuild).


## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
