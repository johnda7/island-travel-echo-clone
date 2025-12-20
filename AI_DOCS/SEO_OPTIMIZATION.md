# 🔍 SEO Оптимизация и Telegram Sharing

## ⚠️ ГЛАВНАЯ ПРОБЛЕМА

**Telegram и социальные сети НЕ ВЫПОЛНЯЮТ JavaScript!**

Наше приложение — SPA (Single Page Application) с HashRouter. Когда Telegram-бот пытается получить превью ссылки `https://phukeo.com/#/tours/phi-phi-2days`:
1. Он загружает `index.html`
2. Видит только OG теги главной страницы
3. Не выполняет React/JavaScript
4. Показывает **одинаковую карточку для всех туров**

## ✅ РЕШЕНИЯ

### 1️⃣ Статические HTML для туров (РЕКОМЕНДУЕТСЯ)

Создать статические `.html` файлы для каждого тура в `public/tours/`:

```
public/
  tours/
    phi-phi-2days.html
    james-bond-island-phang-nga.html
    racha-coral-islands-speedboat.html
    ...
```

Каждый файл содержит правильные OG теги и редирект на SPA:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Пхи-Пхи 2 дня — ПхукетGO</title>
  <meta property="og:title" content="🏝️ Пхи-Пхи 2 дня / 1 ночь — от ฿4,400" />
  <meta property="og:description" content="Двухдневная экскурсия с ночёвкой на островах. Бухта Майя, огненное шоу, снорклинг!" />
  <meta property="og:image" content="https://phukeo.com/assets/tours/phi-phi-2days-og.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://phukeo.com/tours/phi-phi-2days" />
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="ПхукетGO" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="🏝️ Пхи-Пхи 2 дня / 1 ночь" />
  <meta name="twitter:image" content="https://phukeo.com/assets/tours/phi-phi-2days-og.jpg" />
  
  <!-- Редирект на SPA -->
  <script>window.location.replace('/#/tours/phi-phi-2days');</script>
</head>
<body>
  <p>Перенаправление...</p>
</body>
</html>
```

### 2️⃣ OG-изображения для туров

**Размер:** 1200×630 px (оптимально для Telegram/Facebook)

**Что включить:**
- 🖼️ Красивое фото тура
- 📝 Название тура крупно
- 💰 Цена (от ฿X,XXX)
- ⭐ Рейтинг (4.9)
- 🏷️ Логотип ПхукетGO

**Инструменты:**
- Canva (шаблон 1200×630)
- Figma
- Автоматизация через Sharp/Canvas

### 3️⃣ Проверка превью

После создания проверить через:
- https://developers.facebook.com/tools/debug/
- https://cards-dev.twitter.com/validator
- Отправить ссылку себе в Telegram

---

## 📈 SEO РЕКОМЕНДАЦИИ

### ✅ Что уже хорошо:
- ✓ JSON-LD структурированные данные
- ✓ Open Graph теги в компоненте SEO
- ✓ robots.txt настроен
- ✓ Canonical URL
- ✓ Meta description

### ❌ Что нужно исправить:

#### 1. Sitemap.xml — УСТАРЕЛ!
Нет ни одного тура! Добавить все туры:

```xml
<!-- Туры -->
<url>
  <loc>https://phukeo.com/tours/phi-phi-2days</loc>
  <lastmod>2025-11-28</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```

#### 2. Добавить больше ключевых слов
В `index.html` и страницы туров:
- "экскурсии пхукет 2025"
- "туры на острова пхукет"
- "пхи пхи тур цена"
- "снорклинг пхукет"

#### 3. Структурированные данные для туров
Каждый тур должен иметь JSON-LD типа `TouristTrip`:

```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Пхи-Пхи 2 дня / 1 ночь",
  "description": "Двухдневная экскурсия с ночёвкой...",
  "itinerary": {
    "@type": "ItemList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Бухта Майя"},
      {"@type": "ListItem", "position": 2, "name": "Лагуна Пиле"}
    ]
  },
  "offers": {
    "@type": "Offer",
    "price": "4400",
    "priceCurrency": "THB",
    "availability": "https://schema.org/InStock"
  },
  "provider": {
    "@type": "TravelAgency",
    "name": "ПхукетGO"
  }
}
```

#### 4. Мета-теги для локального SEO
```html
<meta name="geo.region" content="TH-83" />
<meta name="geo.placename" content="Phuket, Thailand" />
<meta name="geo.position" content="7.8804;98.3923" />
```

#### 5. Hreflang для мультиязычности (будущее)
```html
<link rel="alternate" hreflang="ru" href="https://phukeo.com/" />
<link rel="alternate" hreflang="en" href="https://phukeo.com/en/" />
```

---

## 🚀 ПРИОРИТЕТЫ

| # | Задача | Влияние на SEO | Сложность |
|---|--------|----------------|-----------|
| 1 | Статические HTML для туров + OG | 🔥🔥🔥 Высокое | Средняя |
| 2 | Обновить sitemap.xml | 🔥🔥🔥 Высокое | Лёгкая |
| 3 | OG-изображения 1200×630 | 🔥🔥 Среднее | Средняя |
| 4 | JSON-LD TouristTrip | 🔥🔥 Среднее | Лёгкая |
| 5 | Локальное SEO теги | 🔥 Низкое | Лёгкая |

---

## 📋 ЧЕКЛИСТ ПЕРЕД ЗАПУСКОМ

- [ ] Создать статические HTML для топ-10 туров
- [ ] Создать OG-изображения 1200×630 для каждого тура
- [ ] Обновить sitemap.xml со всеми турами
- [ ] Проверить превью через Facebook Debug Tool
- [ ] Отправить sitemap в Google Search Console
- [ ] Отправить sitemap в Яндекс Вебмастер

---

## 🔗 ПОЛЕЗНЫЕ ССЫЛКИ

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org TouristTrip](https://schema.org/TouristTrip)

