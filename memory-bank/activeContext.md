# Active Context

## Current Session
**Date:** 2026-03-01  
**Mode:** SEO оптимизация — обогащение static HTML, auto-sitemap, Indexing API  
**Last commit:** baa82a8

## Current Status
- ✅ 27 папок туров в `src/data/tours/`, 29 записей в реестре
- ✅ Бронирование работает через `window.location.href` + `?text=` (ПРОВЕРЕНО)
- ✅ Механизм бронирования ЗАЩИЩЁН от изменений AI агентами
- ✅ Booking modal: bottom-sheet на мобильных, scroll lock через overflow:hidden
- ✅ После бронирования: автоматический возврат на /tours (visibilitychange)
- ✅ Фильтры: iOS 26 пиллы категорий + 12 быстрых тегов
- ✅ Футер: Telegram @phuketGa + @phuketGoo, MAX канал + менеджер
- ✅ Telegram Mini App: BottomNav скрывается при модалке, кнопки прячутся
- ✅ **Google Search Console** подключен, SA = **Owner**
- ✅ **Indexing API** РАБОТАЕТ — 64 URL отправлены (0 ошибок)
- ✅ **Sitemap.xml** auto-generated: 64 URLs (26×2 tours + 3 static + 9 beaches)
- ✅ **Static HTML** содержит видимый контент (highlights, included, FAQ, цены)
- ✅ **JSON-LD** TouristTrip + BreadcrumbList + FAQPage (убран fake ratingCount)
- ✅ **hreflang** ru + x-default на каждой странице тура

## Последние изменения (28.02-01.03.2026)

### Telegram Mini App UX
- ✅ Убраны отступы pt-20 (Header скрыт в Telegram)
- ✅ Модалка бронирования → bottom-sheet на мобильных (92dvh)  
- ✅ Input font-size 16px (без авто-зума iOS)
- ✅ BottomNav + нативные Telegram кнопки скрываются при модалке
- ✅ Scroll lock через overflow:hidden (НЕ position:fixed — ломает redirect!)
- ✅ Date picker overflow-x hidden
- ✅ После бронирования → возврат на /tours для конверсии

### Фильтры и UI  
- ✅ Редизайн фильтров: 6 категорий (пиллы) + 12 быстрых тегов
- ✅ Комбинация фильтров: категория + тег работают вместе
- ✅ Теги скрываются если нет туров в текущей категории

### Контакты
- ✅ Футер обновлён: Telegram менеджер + канал, MAX канал + менеджер
- ✅ Убраны старые некорректные ссылки

## Реестр туров (29 записей в toursRegistry.ts)
| Категория | Кол-во | Туры |
|-----------|--------|------|
| islands | 11 | phi-phi-2days, pearls-andaman-sea, eleven-islands-mega, james-bond-island-phang-nga, racha-coral-islands-speedboat, racha-coral-sunrise, racha-coral-rawai, phi-phi-sunrise, five-pearls-2days, phi-phi-racha-maiton-sunset, coral-islands-rawai |
| adventure | 8 | rafting-spa-atv-1-day, rafting-spa-1day, kao-lak-safari-1-day, avatar-plus-hangdong, phang-nga-skywalk, cheow-lan-lake, phang-nga-samet, krabi-secrets, elephant-beach-samet-mantra-spa |
| diving | 4 | similan-islands, similan-islands-early, similan-islands-speedboat, diving-andaman |
| cultural | 1 | dostoprimechatelnosti-phuketa |
| fishing | 1 | fishing-sunrise |

## Repository
- **Ветка:** main
- **Деплой:** deploy-canonical.yml (единственный активный из 5 workflows)
- **Сайт:** https://phukeo.com (GitHub Pages, HashRouter)
- **Бот:** @phukeo_bot (Koyeb: small-robinia-phukeo-8b5e1e16.koyeb.app)

## Telegram Bot
- **Бот:** @phukeo_bot (создан 20.12.2025)
- **Токен:** В Koyeb env vars (НЕ в коде!)
- **Manager Chat ID:** 1217592929
- **API Endpoint:** /api/notify
- **Команды:** только /start

## 🚨 МЕХАНИЗМ БРОНИРОВАНИЯ — ПОДРОБНОЕ ОПИСАНИЕ (НЕ ТРОГАТЬ!)

### Файл: `src/components/UniversalBookingModal.tsx` (475 строк, PROTECTED)

### Поток бронирования (пошагово):

1. **Пользователь нажимает "Забронировать"** на любой странице тура
2. **Открывается модалка** `UniversalBookingModal` с калькулятором цен
3. **Пользователь заполняет форму:**
   - Количество гостей (взрослые/дети) — калькулятор считает итого
   - Имя (минимум 2 символа)
   - Телефон (минимум 10 цифр, международный формат)
   - Email (опционально)
   - Дата поездки (нельзя выбрать прошедшую дату)
4. **Нажимает "ЗАБРОНИРОВАТЬ"** → вызывается `handleBooking()`

### Что происходит в handleBooking():

**Шаг 1 — Валидация:**
- Проверка имени (≥2 символа)
- Проверка телефона (regex + ≥10 цифр)
- Проверка даты (не прошедшая)

**Шаг 2 — Формирование сообщения:**
```
🏝️ Новая бронь тура!
📋 Тур: {название}
💰 Цена: {итого} ฿
👥 Гости: {N} взрослых, {N} детей
📅 Дата: {дата}
👤 Контактная информация:
• Имя: {имя}
• Телефон: {телефон}
• Email: {email}
• Telegram: {username}
⏰ Заявка подана: {время}
```

**Шаг 3 — Сохранение в localStorage:**
- Заказ сохраняется в `bookingOrders` для истории/админки

**Шаг 4 — Отправка через Koyeb API (бот):**
- `POST https://small-robinia-phukeo-8b5e1e16.koyeb.app/api/notify`
- Body: `{ chatId: '1217592929', message: текст }`
- Менеджер (@Phuketga) получает сообщение от бота @phukeo_bot

**Шаг 5 — Редирект в Telegram (через 3 секунды):**
```javascript
setTimeout(() => {
  const telegramUrl = `https://t.me/Phuketga?text=${encodeURIComponent(message)}`;
  window.location.href = telegramUrl;
}, 3000);
```
- Открывается чат с @Phuketga
- Текст заявки УЖЕ В ПОЛЕ ВВОДА — пользователь просто нажимает "Отправить"
- Таким образом менеджер получает заявку ДВАЖДЫ: от бота и от клиента лично

**Шаг 5b — Fallback (если API упал):**
- Тот же `window.location.href` с `?text=` через 3 секунды
- Клиент всё равно попадает в чат с готовым текстом

### 🚨 ЗАПРЕТЫ НА ИЗМЕНЕНИЕ РЕДИРЕКТА:
- ❌ НЕ менять `window.location.href` на `openTelegramLink()`
- ❌ НЕ менять на `tg://resolve`
- ❌ НЕ менять на `clipboard` + инструкцию
- ❌ НЕ менять на `openLink()` или `window.open()`
- ❌ НЕ добавлять `isTelegramMiniApp` проверку для редиректа
- ✅ ТОЛЬКО `window.location.href = 'https://t.me/Phuketga?text=...'`
- ✅ Проверено и работает 27.02.2026

### Автозаполнение из Telegram:
- Имя: `tg.initDataUnsafe.user.first_name`
- Телефон: `tg.initDataUnsafe.user.phone_number`
- Username: `tg.initDataUnsafe.user.username` (добавляется в текст заявки)

## Key Files
| Файл | Строк | Роль |
|------|-------|------|
| `TourPageTemplate.tsx` | 1096 | Единый рендерер туров (PROTECTED) |
| `UniversalBookingModal.tsx` | 475 | Форма бронирования + редирект (PROTECTED, НЕ ТРОГАТЬ!) |
| `toursRegistry.ts` | 536 | Центральный реестр (PROTECTED), 29 записей |
| `Tour.ts` | 104 | TypeScript интерфейсы |
| `App.tsx` | 206 | Роутинг, React.lazy для всех туров |
| `Footer.tsx` | 107 | Футер с Telegram/MAX контактами |
| `copilot-instructions.md` | 131 | AI промпт |

## Google Search Console (настроен 27.02.2026, обновлён 01.03.2026)
- **Верификация:** HTML file (`public/googleec068cee75b8021a.html`) + meta tag в `index.html`
- **GSC Email (owner):** `anotherstoriz@gmail.com`
- **Service Account:** `phuketda-s-arch-console@phuketda-search-console.iam.gserviceaccount.com` — **Owner** (повышен 01.03.2026)
- **Ключ:** `.google/gsc-key.json` (НЕ коммитится, в .gitignore)
- **Sitemap:** 64 URLs, auto-generated, отправлен через API
- **Indexing API:** ✅ РАБОТАЕТ — 64 URL отправлены 01.03.2026 (0 ошибок)

### GSC-скрипты:
```bash
node scripts/gsc-test-connection.cjs       # Тест подключения
node scripts/gsc-analytics.cjs             # Обзор за 7 дней
node scripts/gsc-submit-sitemap.cjs        # Отправка sitemap в GSC
node scripts/gsc-submit-indexing.cjs --from-sitemap 0 200  # Отправка URL на индексацию
```

## SEO-изменения (сессия 01.03.2026)
- ✅ **generate-og-pages.mjs v2** — 52 HTML с видимым контентом (description, highlights, included, FAQ, цены)
- ✅ **JSON-LD TouristTrip** заменил Product schema (лучше для Google Travel)
- ✅ **Удалён fake aggregateRating** (formula 150 + id.length*7)
- ✅ **FAQPage JSON-LD** — 4 вопроса-ответа на каждый тур
- ✅ **BreadcrumbList JSON-LD** — Главная → Категория → Тур
- ✅ **hreflang** ru + x-default на каждой странице
- ✅ **generate-sitemap.mjs** — auto-generated sitemap.xml (64 URLs)
- ✅ **Build pipeline** — vite → postbuild → og-pages → sitemap
- ✅ **gsc-submit-sitemap.cjs** — отправка sitemap в GSC
- ✅ **SA повышен до Owner** — Indexing API работает
- ✅ **64 URL отправлены** на индексацию (0 ошибок)

## Known Issues (оставшиеся)
- **eleven-islands-standard** — папка-сирота: есть в `src/data/tours/` но НЕ в реестре
- **rafting-spa-1day** — не передаёт routePoints в TourPageTemplate
- **phi-phi-racha-maiton-sunset** — последний RoutePoint type:"start" (должен быть "destination")
- **GA/Yandex** — аналитика закомментирована, нужны реальные ID
- **HashRouter:** Нужен для GitHub Pages, но мешает SEO (главный SEO-блокер)
- **Supabase CMS:** Таблицы существуют, но НЕ используются — данные в TS файлах
- **react-leaflet@5.0.0:** Требует React 19, решается `--legacy-peer-deps`
