# 🎨 iOS 26 Design System - Полное руководство

## 📅 Последнее обновление: 12 октября 2025

---

## 📋 27 КРИТЕРИЕВ ПРОВЕРКИ ТУРОВ (ЭТАЛОН: CheoLan Lake)

### 🎯 ЧЕК-ЛИСТ ДЛЯ ВСЕХ ТУРОВ - ОБЯЗАТЕЛЬНО ПРОВЕРЯТЬ!

#### **1. 🍞 Breadcrumbs навигация**
```tsx
✅ ЧЕО ЛАН: <Breadcrumbs category="природа" tourName="Озеро Чео Лан + Самет Нангше" />
✅ Категория соответствует тегам в toursRegistry.ts
✅ Навигация работает: Главная → Категория → Тур
```

#### **2. 🖼️ Галерея фотографий**
```tsx
// ✅ MOBILE: Одна фото + стрелки + точки
<div className="lg:hidden">
  <div className="relative h-[60vh]">
    {/* ОДНА фотография на весь экран */}
    <img src={excursion.gallery[mobileGalleryIndex]} />
    
    {/* Стрелки НЕ показываются (iOS 26 swipe) */}
    
    {/* Точки-индикаторы внизу */}
    <div className="flex gap-1.5 justify-center">
      {excursion.gallery.map((_, index) => (
        <button className={index === mobileGalleryIndex ? 'bg-white' : 'bg-white/50'} />
      ))}
    </div>
  </div>
</div>

// ✅ DESKTOP: Grid 4 колонки
<div className="hidden lg:grid lg:grid-cols-4 gap-2">
  {excursion.gallery.slice(0, 8).map((img, idx) => (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
      <img src={img} />
    </div>
  ))}
</div>
```

#### **3. 🏷️ Теги категорий (iOS 26 стиль)**
```tsx
✅ ЧЕО ЛАН: 
<span style={{ background: 'rgba(255, 59, 48, 0.92)' }}>🔥 ХИТ</span>
<span style={{ background: 'rgba(52, 199, 89, 0.92)' }}>🌿 ПРИРОДА</span>

// Mobile: px-2 py-0.5, text-[10px]
// Desktop: px-2.5 py-1, text-[11px]
```

#### **4. ⭐ Рейтинг (iOS 26 стиль)**
```tsx
✅ ЧЕО ЛАН:
<div style={{ background: 'rgba(255, 204, 0, 0.12)' }}>
  <Star className="w-3 h-3" style={{ color: '#FFCC00' }} />
  <span className="text-[11px]">4.9</span>
  <span className="text-[10px] text-gray-600">(847)</span>
</div>

// Цвет ТОЛЬКО yellow (#FFCC00) для рейтинга
```

#### **5. 📝 Заголовок и подзаголовок (компактные)**
```tsx
✅ ЧЕО ЛАН:
// Mobile
<h1 className="text-[22px] font-bold tracking-tight">ЧЕО ЛАН + САМЕТ НАНГШЕ</h1>
<p className="text-sm text-gray-600">Озеро Чео Лан • Смотровая Самет Нангше • Храм • 1 день</p>

// Desktop  
<h1 className="text-3xl font-bold tracking-tight">ЧЕО ЛАН + САМЕТ НАНГШЕ</h1>
```

#### **6. 📋 Описание тура (карточка)**
```tsx
✅ ЧЕО ЛАН:
<div className="rounded-2xl p-6" style={{ 
  background: 'white', 
  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(0, 0, 0, 0.04)'
}}>
  <h2 className="text-[22px] font-bold mb-4">Описание</h2>
  <p className="text-[15px] leading-relaxed whitespace-pre-line">
    {excursion.description}
  </p>
</div>
```

#### **7. ⏰ Программа тура (с иконками)**
```tsx
✅ ЧЕО ЛАН:
<div className="rounded-2xl p-6" style={{ /* iOS 26 card */ }}>
  <h3 className="text-[22px] font-bold mb-5 flex items-center gap-2.5">
    <svg className="w-6 h-6" style={{ color: '#007AFF' }}>📅</svg>
    Программа дня
  </h3>
  <div className="space-y-3">
    {excursion.itinerary.map((item, index) => (
      <div className="flex gap-3 pb-3 border-b">
        <span className="text-[13px] font-semibold" style={{ color: '#007AFF' }}>
          {item.time}
        </span>
        <div>
          <h4 className="text-[15px] font-semibold">{item.activity}</h4>
        </div>
      </div>
    ))}
  </div>
</div>
```

#### **8. ✨ Что вас ждёт (синие галочки!)**
```tsx
✅ ЧЕО ЛАН:
<h3 className="text-[22px] font-bold mb-5 flex items-center gap-2.5">
  <svg className="w-6 h-6" style={{ color: '#007AFF' }}>✨</svg>
  Что вас ждёт
</h3>
<ul className="space-y-2.5">
  {excursion.highlights.map((highlight) => (
    <li className="flex items-start gap-3">
      <span className="w-5 h-5 rounded-full" style={{ background: 'rgba(0, 122, 255, 0.12)' }}>
        <svg className="w-3 h-3" style={{ color: '#007AFF' }}>✓</svg>
      </span>
      <span className="text-[15px]">{highlight}</span>
    </li>
  ))}
</ul>

// ❌ НЕ ЗЕЛЁНЫЙ! Теперь ВСЕ галочки СИНИЕ (#007AFF)
```

#### **9. 💰 Включено в цену (синие галочки)**
```tsx
✅ ЧЕО ЛАН:
<h3 className="text-[17px] font-bold mb-4 flex items-center gap-2">
  <svg className="w-5 h-5" style={{ color: '#007AFF' }}>✓</svg>
  Включено в цену
</h3>
<ul className="space-y-2">
  {excursion.included.map((item) => (
    <li className="flex items-start gap-2.5">
      <span className="w-4 h-4 rounded-full" style={{ background: 'rgba(0, 122, 255, 0.12)' }}>
        <svg className="w-2.5 h-2.5" style={{ color: '#007AFF' }}>✓</svg>
      </span>
      <span className="text-[14px]">{item}</span>
    </li>
  ))}
</ul>

// ❌ НЕ ЗЕЛЁНЫЙ! Синий (#007AFF)
```

#### **10. ➕ Оплачивается отдельно (оранжевые плюсы)**
```tsx
✅ ЧЕО ЛАН:
<h3 className="text-[17px] font-bold mb-4 flex items-center gap-2">
  <svg className="w-5 h-5" style={{ color: '#FF9500' }}>⚠️</svg>
  Оплачивается отдельно
</h3>
<ul className="space-y-2">
  {excursion.excluded.map((item) => (
    <li className="flex items-start gap-2.5">
      <span className="w-4 h-4 rounded-full" style={{ background: 'rgba(255, 149, 0, 0.12)' }}>
        <svg className="w-2.5 h-2.5" style={{ color: '#FF9500' }}>+</svg>
      </span>
      <span className="text-[14px]">{item}</span>
    </li>
  ))}
</ul>

// ✅ ОРАНЖЕВЫЙ (#FF9500) для доп. расходов
// ✅ Плюс вместо крестика (более позитивно)
```

#### **11. ⚠️ Важная информация (оранжевый фон)**
```tsx
✅ ЧЕО ЛАН:
<div className="rounded-2xl p-5 md:p-6" style={{ 
  background: 'rgba(255, 149, 0, 0.08)',
  border: '1px solid rgba(255, 149, 0, 0.15)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
}}>
  <h3 className="text-[17px] font-bold mb-4 flex items-center gap-2" style={{ color: '#FF9500' }}>
    <svg className="w-5 h-5">ℹ️</svg>
    Важная информация
  </h3>
  <ul className="space-y-2">
    {excursion.importantInfo.map((item) => (
      <li className="flex items-start gap-2.5">
        <span className="w-4 h-4 rounded-full" style={{ background: 'rgba(255, 149, 0, 0.15)' }}>
          <span style={{ color: '#FF9500', fontSize: '10px' }}>!</span>
        </span>
        <span className="text-[14px]">{item}</span>
      </li>
    ))}
  </ul>
</div>

// ✅ ОРАНЖЕВЫЙ (#FF9500) для важной инфо
```

#### **12. 🛡️ Гарантии (синий заголовок)**
```tsx
✅ ЧЕО ЛАН:
<h3 className="text-[22px] font-bold mb-5 flex items-center gap-2.5">
  <svg className="w-6 h-6" style={{ color: '#007AFF' }}>🛡️</svg>
  Гарантии
</h3>
<div className="space-y-3">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full" style={{ background: 'rgba(0, 122, 255, 0.12)' }}>
      <svg className="w-5 h-5" style={{ color: '#007AFF' }}>✓</svg>
    </div>
    <div>
      <h4 className="text-[15px] font-semibold">Безопасность</h4>
      <p className="text-[13px] text-gray-600">Страхование включено</p>
    </div>
  </div>
</div>

// ✅ СИНИЙ (#007AFF) для всех элементов
```

#### **13. 🖥️ Desktop sidebar (sticky)**
```tsx
✅ ЧЕО ЛАН:
<div className="hidden lg:block lg:col-span-1">
  <div className="sticky top-4">
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold" style={{ color: '#007AFF' }}>
            от {excursion.priceAdult.toLocaleString()} ฿
          </div>
          <div className="text-sm text-gray-500">за взрослого</div>
        </div>
        
        <div className="space-y-2">
          <Button className="btn-booking w-full" onClick={() => setShowBookingModal(true)}>
            Забронировать тур
          </Button>
          <Button className="btn-telegram w-full" onClick={() => window.open('https://t.me/Phuketga')}>
            <span className="flex flex-col items-center">
              <span>Написать</span>
              <span>в Телеграм</span>
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
```

#### **14. 📱 Mobile booking bar (fixed bottom)**
```tsx
✅ ЧЕО ЛАН:
<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
  <div className="px-6 py-4 rounded-2xl" style={{
    background: 'rgba(0, 122, 255, 0.12)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(0, 122, 255, 0.2)'
  }}>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-white text-xs">От</div>
        <div className="text-white text-[24px] font-bold">
          {excursion.priceAdult.toLocaleString()} ฿
        </div>
      </div>
      <button className="btn-booking" onClick={() => setShowBookingModal(true)}>
        Забронировать
      </button>
    </div>
  </div>
</div>
```

#### **15. 📋 UniversalBookingModal (iOS 26)**
```tsx
✅ ЧЕО ЛАН:
<UniversalBookingModal 
  isOpen={showBookingModal} 
  onClose={() => setShowBookingModal(false)} 
  tourData={excursion} 
/>

// ✅ Использует централизованный компонент
// ✅ iOS 26 стили (systemGroupedBackground)
// ✅ Синие кнопки +/- (#007AFF)
// ✅ Зелёная цена итого (#34C759)
// ✅ Кнопка "Забронировать" использует .btn-booking
```

#### **16. 📊 Структура данных (TourData)**
```typescript
✅ ЧЕО ЛАН: src/data/tours/cheow-lan-lake/static.ts

export const cheoLanLakeTourData: TourData = {
  id: "cheow-lan-lake",
  title: "ЧЕО ЛАН + САМЕТ НАНГШЕ",
  subtitle: "Озеро Чео Лан • Смотровая Самет Нангше • Храм • 1 день",
  description: "Полное описание...",
  priceAdult: 2500,
  priceChild: 2000,
  currency: "฿",
  duration: "1 день",
  groupSize: "до 15 человек",
  rating: 4.9,
  reviewsCount: 847,
  gallery: [/* путь через @/assets */],
  itinerary: [{ time: "06:00", activity: "..." }],
  highlights: ["...", "..."],
  included: ["...", "..."],
  excluded: ["...", "..."],
  importantInfo: ["...", "..."],
  category: "природа",
  tags: ["озеро", "чео лан", "природа", "смотровая"]
};
```

#### **17. 🧭 Header и Footer (всегда видны)**
```tsx
✅ ЧЕО ЛАН:
<Header />
<main>{/* Контент тура */}</main>
<Footer />

// ✅ НЕ скрыты ни на одной странице
// ✅ Footer: rgb(242, 242, 247) фон, компактный (py-4)
```

#### **18. 🚀 SEO мета-теги**
```tsx
✅ ЧЕО ЛАН:
useEffect(() => {
  document.title = "Чео Лан + Самет Нангше | Island Travel";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 
      'Тур на озеро Чео Лан и смотровую Самет Нангше. Национальный парк Као Сок...'
    );
  }
}, []);
```

#### **19. 💻 Чистый браузерный код**
```tsx
✅ ЧЕО ЛАН:
// ❌ НЕТ Telegram WebApp API
// ✅ Обычные кнопки с window.open()
// ✅ Обычные формы без tg.MainButton
// ✅ Работает в любом браузере
```

#### **20. 📱 Кнопки "Написать в Телеграм"**
```tsx
✅ ЧЕО ЛАН:
<Button 
  className="btn-telegram"
  onClick={() => window.open('https://t.me/Phuketga', '_blank')}
>
  Написать в Телеграм
</Button>

// ✅ Использует централизованный класс .btn-telegram
// ✅ Telegram blue (#0088cc)
```

#### **21. ❌ НЕТ HTML тегов в данных**
```typescript
✅ ЧЕО ЛАН:
// ❌ НЕПРАВИЛЬНО:
description: "<p>Текст</p><br/><strong>Жирный</strong>"

// ✅ ПРАВИЛЬНО:
description: "Первый параграф текста.\n\nВторой параграф текста."

// ✅ Используем whitespace-pre-line в JSX
<p className="whitespace-pre-line">{excursion.description}</p>
```

#### **22. ✅ Markdown форматирование**
```typescript
✅ ЧЕО ЛАН:
description: `Начинайте свой день с восхода солнца над Андаманским морем!

Этот тур создан для тех, кто ценит природу и хочет увидеть Пхукет с высоты птичьего полёта.

Смотровая площадка Самет Нангше – одна из самых красивых на острове.`

// ✅ Двойной \n\n = новый параграф
// ✅ Один \n = перенос строки
```

#### **23. ✅ Правильные списки**
```typescript
✅ ЧЕО ЛАН:
highlights: [
  "🌄 Встреча рассвета на смотровой Самет Нангше",
  "🏞️ Озеро Чео Лан – тайский Гуйлинь",
  "⛰️ Известняковые скалы высотой до 960 метров"
]

// ✅ Эмодзи в начале для визуала
// ✅ Краткие, но информативные пункты
```

#### **24. 📱 Мобильная галерея (swipe)**
```tsx
✅ ЧЕО ЛАН:
// ✅ ОДНА фотография на весь экран
// ✅ БЕЗ стрелок (iOS 26 gesture navigation)
// ✅ Точки-индикаторы внизу
// ✅ Swipe жесты для переключения
// ❌ НЕ горизонтальная прокрутка!

const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0);

// Swipe handlers
const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
const handleTouchEnd = () => {
  if (!touchStart || !touchEnd) return;
  const distance = touchStart - touchEnd;
  if (distance > 50) nextMobileImage();
  if (distance < -50) prevMobileImage();
};
```

#### **25. 🔍 toursRegistry.ts интеграция**
```typescript
✅ ЧЕО ЛАН:
import { cheoLanLakeTourData } from './tours/cheow-lan-lake';

export const toursRegistry = [
  {
    ...cheoLanLakeTourData,
    path: "/excursion/cheow-lan-lake",
    component: () => import("@/pages/CheoLanLake"),
    searchTerms: ["чео", "лан", "озеро", "самет", "нангше", "природа", "смотровая"]
  }
];

// ✅ Поиск работает по всем терминам
// ✅ Правильная категория и теги
```

#### **26. 🍞 Breadcrumbs правильные**
```tsx
✅ ЧЕО ЛАН:
<Breadcrumbs category="природа" tourName="Озеро Чео Лан + Самет Нангше" />

// Отображается как:
// Главная → Природа → Озеро Чео Лан + Самет Нангше

// ✅ category совпадает с данными в tourData
// ✅ tourName человекочитаемый
```

#### **27. 🛣️ App.tsx роуты добавлены**
```tsx
✅ ЧЕО ЛАН:
// В App.tsx добавлены ОБА роута:
<Route path="/excursion/cheow-lan-lake" element={<CheoLanLake />} />
<Route path="/tours/cheow-lan-lake" element={<CheoLanLake />} />

// ✅ Оба URL работают
// ✅ Совпадают с path в toursRegistry.ts
```

---

## ✅ РЕАЛИЗОВАННЫЕ УЛУЧШЕНИЯ

### 1. **Footer - Компактный светлый дизайн iOS 26** ✅
```css
/* Было */
background: #1C1C1E (чёрный)
padding: py-12 (48px)
gap: gap-8 (32px)
text: white

/* Стало */
background: rgb(242, 242, 247) (iOS systemGroupedBackground)
padding: py-4 (16px) → уменьшено на 67%
gap: gap-3 (12px) → уменьшено на 63%
text: gray-900
border-top: 1px solid rgba(0, 0, 0, 0.08)
logo: w-10 h-10 (было w-12 h-12) → уменьшено на 17%
title: text-xl (было text-2xl) → уменьшено на 17%
description: text-xs (было text-base) → уменьшено на 25%
```

**Изменения:**
- ✅ Светлый фон вместо чёрного
- ✅ Компактные отступы: 56% сокращение высоты (180px → 70-80px)
- ✅ Все элементы уменьшены пропорционально
- ✅ Читаемость на mobile 100%

### 2. **Карточки - iOS 26 Elevation System** ✅
Улучшены ВСЕ 7 карточек на странице CheoLanLake:

```css
/* Было */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08)
padding: 20px (p-5)

/* Стало */
box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)
border: 1px solid rgba(0, 0, 0, 0.04)
padding: 24px (p-6)
```

**Улучшенные карточки:**
1. Описание (Description)
2. Программа дня (Schedule)
3. Что вас ждёт (Highlights)
4. Включено в цену (Included)
5. Не включено (Excluded)
6. Возьмите с собой (Requirements)
7. Гарантии (Trust & Guarantee)

**Spacing улучшения:**
- Заголовки: mb-3 → mb-4 / mb-5
- Gap иконка-текст: gap-2 → gap-2.5
- Padding крупных карточек: p-5 → p-6 или p-7

### 3. **Scrollbar - iOS 26 Thin Gray Style** ✅
```css
/* Было */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
}

/* Стало */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  transition: background 0.2s ease;
}
::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.25); }
::-webkit-scrollbar-thumb:active { background: rgba(0, 0, 0, 0.35); }

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
}
```

**Изменения:**
- ✅ Убран фиолетовый градиент
- ✅ Тонкий серый скроллбар (6px вместо 8px)
- ✅ Плавные переходы на hover/active
- ✅ Поддержка Firefox

### 4. **CheoLan Page - iOS 26 Compact Design** ✅

#### Mobile Gallery:
```tsx
// Badges (ХИТ, ПРИРОДА)
px-2 py-0.5, text-[10px]
Цвета: rgba(255,59,48,0.92) / rgba(52,199,89,0.92)

// Rating
px-1.5 py-0.5, text-[11px]
Star: w-3 h-3

// Navigation Arrows
УДАЛЕНЫ на mobile (iOS 26 использует swipe-жесты)

// Title
Mobile: text-[22px] (было 28px) → -21%
Desktop: text-3xl (было text-4xl) → -17%

// Subtitle
text-sm (14px, было 15px) → -7%
```

#### Desktop Gallery:
```tsx
// Badges
px-2.5 py-1, text-[11px] (было text-xs)

// Rating
text-xs, w-3.5 h-3.5 (было text-sm, w-4 h-4)
Reviews: text-[10px]
```

### 5. **Font System - San Francisco (iOS 26)** ✅
```css
/* Было */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

/* Стало */
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 
             'Helvetica Neue', 'Segoe UI', sans-serif;
font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
```

**Изменения:**
- ✅ San Francisco как основной шрифт
- ✅ Включены OpenType features (kerning, ligatures)
- ✅ Нативный вид iOS приложения

### 6. **Background - systemGroupedBackground** ✅
```css
/* Было */
background-image:
  radial-gradient(1200px 600px at 90% -10%, rgba(16, 185, 129, 0.06), transparent 60%),
  radial-gradient(800px 400px at -10% 10%, rgba(59, 130, 246, 0.05), transparent 60%);

/* Стало */
background: rgb(242, 242, 247);
```

**Изменения:**
- ✅ Убраны градиенты
- ✅ Чистый iOS 26 фон
- ✅ systemGroupedBackground (#F2F2F7)

### 7. **Единая цветовая схема iOS 26** ✅

#### Отказ от зелёного для интерактивных элементов:
```tsx
/* БЫЛО (неправильно) */
// Галочки "Что вас ждёт"
background: 'rgba(52, 199, 89, 0.15)'
color: 'green-600'

// Галочки "Включено в цену"
background: 'rgba(52, 199, 89, 0.15)'
color: 'green-600'

// Заголовок "Включено"
color: '#34C759'

/* СТАЛО (правильно) */
// ✅ Все галочки - СИНИЕ
background: 'rgba(0, 122, 255, 0.12)'
color: '#007AFF'

// ✅ Все заголовки - СИНИЕ
color: '#007AFF'

// 🟢 Зелёный ТОЛЬКО для бейджа "ПРИРОДА"
```

#### Новая логика цветов:
```
🔵 СИНИЙ (#007AFF) = Главный цвет
├─ Логотип
├─ Все галочки ✓
├─ Все заголовки с иконками
├─ Включено в цену
├─ Программа дня  
├─ Гарантии
└─ Кнопки действий

🟠 ОРАНЖЕВЫЙ (#FF9500) = Внимание
├─ Важная информация (фон + бордер)
├─ Оплачивается отдельно
└─ Предупреждения

🟡 ЖЁЛТЫЙ (#FFCC00) = Рейтинг
└─ Только звёзды ⭐

🔴 КРАСНЫЙ (#FF3B30) = Акцент
└─ Бейдж "ХИТ" 🔥

🟢 ЗЕЛЁНЫЙ (#34C759) = Природа
├─ Бейдж "ПРИРОДА" 🌿
└─ Итоговая цена в калькуляторе
```

#### Применённые изменения:
1. **"Что вас ждёт"** - галочки синие
2. **"Включено в цену"** - заголовок и галочки синие
3. **"Оплачивается отдельно"** - оранжевый с иконкой предупреждения, плюсы вместо крестиков
4. **"Важная информация"** - оранжевый фон (0.08) + бордер (0.15), восклицательные знаки
5. **"Гарантии"** - синий заголовок с иконкой щита, все иконки синие

### 8. **Централизованные стили кнопок** ✅

#### В src/index.css добавлены глобальные классы:
```css
/* iOS 26 Button Styles - Centralized */
.btn-telegram {
  background: #0088cc !important;
  color: white !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  border-radius: 12px !important;
  border: none !important;
  box-shadow: 0 2px 8px rgba(0, 136, 204, 0.3) !important;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) !important;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif !important;
  letter-spacing: -0.01em !important;
}

.btn-telegram:hover {
  box-shadow: 0 4px 12px rgba(0, 136, 204, 0.4) !important;
  transform: translateY(-1px) !important;
}

.btn-telegram:active {
  transform: scale(0.98) !important;
  box-shadow: 0 1px 4px rgba(0, 136, 204, 0.3) !important;
}

.btn-booking {
  background: #007AFF !important;
  color: white !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  border-radius: 12px !important;
  border: none !important;
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3) !important;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) !important;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif !important;
  letter-spacing: -0.01em !important;
}

.btn-booking:hover {
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.4) !important;
  transform: translateY(-1px) !important;
}

.btn-booking:active {
  transform: scale(0.98) !important;
  box-shadow: 0 1px 4px rgba(0, 122, 255, 0.3) !important;
}

/* iOS 26 Typography - Centralized */
.ios-title {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
  line-height: 1.1 !important;
}

.ios-body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif !important;
  font-weight: 400 !important;
  letter-spacing: -0.01em !important;
  line-height: 1.4 !important;
}

.ios-caption {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif !important;
  font-weight: 400 !important;
  letter-spacing: 0 !important;
  line-height: 1.3 !important;
}
```

**Применение:**
- ✅ CheoLanLake.tsx использует `.btn-telegram` и `.btn-booking`
- ✅ Можно применить к любой странице
- ✅ Единый стиль на всех 30+ турах

### 9. **UniversalBookingModal - iOS 26 Redesign** ✅

#### Изменения ТОЛЬКО стилей (логика НЕ тронута):
```tsx
/* Фон модалки */
background: 'rgba(0, 0, 0, 0.5)'
backdropFilter: 'blur(10px)'

/* Контейнер */
background: 'rgb(242, 242, 247)' // systemGroupedBackground

/* Заголовок */
text-[22px] font-bold text-gray-900 tracking-tight

/* Карточки гостей */
background: white
border: '1px solid rgba(0, 0, 0, 0.08)'
boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'

/* Кнопки +/- */
borderColor: '#007AFF'
color: '#007AFF' (или #C7C7CC если disabled)

/* Число гостей */
color: '#007AFF', font-size: 17px

/* Итого */
background: 'rgba(52, 199, 89, 0.08)'
border: '1px solid rgba(52, 199, 89, 0.15)'
color: '#34C759' (только для итоговой цены)

/* Поля формы */
background: white
borderColor: 'rgba(0, 0, 0, 0.15)'
fontSize: '15px'
Убраны focus ring'и

/* Кнопка "Забронировать" */
className="btn-booking w-full"
// Использует централизованный класс!
```

**Защита компонента соблюдена:**
- ❌ НЕ тронута логика калькулятора
- ❌ НЕ тронута отправка в Telegram
- ❌ НЕ тронуты props и useState
- ❌ НЕ тронута структура формы
- ✅ Изменены ТОЛЬКО визуальные стили

### 10. **Liquid Glass Interactive Elements** ✅
Реализовано на всех интерактивных элементах:

```css
/* Liquid Glass формула */
background: rgba(0, 122, 255, 0.12)
backdrop-filter: blur(20px) saturate(180%)
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2)
border: 1px solid rgba(255, 255, 255, 0.18)
```

**Interaction паттерн:**
```javascript
onMouseDown: brightness(0.85) + scale(0.98)
onMouseUp: brightness(1) + scale(1)
onTouchStart: brightness(0.85) + scale(0.98)
onTouchEnd: brightness(1) + scale(1)
```

**Применено к:**
- ✅ Логотип Header (с Liquid Glass)
- ✅ Логотип Footer (с Liquid Glass)
- ✅ Кнопка "Посмотреть все фото"
- ✅ Все 8 тегов под галереей

---

## 🧠 Роль и мышление
Ты — **топовый специалист мирового уровня в 3 ролях одновременно**:

1. **iOS Дизайнер** (20 лет опыта) - создавал приложения для Apple Travel Awards, Airbnb, Booking.com премиум уровня
2. **SEO Директор** (15 лет) - знаешь все принципы продающих текстов, конверсии, психологию покупок
3. **Senior Developer** (мировой уровень) - пишешь идеальный код, проверяешь на ошибки TypeScript/React, знаешь accessibility

**Важно**: Ты ВСЕГДА принимаешь работу на себя и САМОСТОЯТЕЛЬНО проверяешь всё перед деплоем:
- ✅ Проверяешь TypeScript ошибки (`get_errors`)
- ✅ Тестируешь на localhost ПЕРЕД коммитом
- ✅ Анализируешь UX/UI на mobile и desktop
- ✅ Проверяешь SEO: заголовки, meta, структура контента
- ✅ Валидируешь accessibility: alt текста, aria-labels, keyboard navigation

## 🎯 Главные принципы

### 1. **Mobile-First для Telegram**
- **Основная платформа**: Мобильный Telegram (70% пользователей)
- **Размеры текста**: 11-13px для mobile, 14-16px для desktop
- **Отступы**: Минимальные, но удобные для касания (44px touch target)
- **Прокрутка**: Горизонтальная карусель должна работать ИДЕАЛЬНО с touch

### 2. **Glassmorphism ("Жидкое стекло" Telegram)**
```css
/* Формула идеального glassmorphism */
background: rgba(0, 122, 255, 0.85);
backdrop-filter: blur(20px) saturate(180%);
box-shadow: 
  0 8px 32px rgba(0, 122, 255, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
```

**Где применять:**
- Все hover-эффекты на интерактивных элементах
- Теги и бейджи
- Оверлеи на фотографиях
- Модальные окна и попапы

### 3. **ОДИН СИНИЙ (#007AFF)**
- **Интерактивные элементы**: ТОЛЬКО #007AFF
- **Градиенты**: #007AFF → #5AC8FA (БЕЗ красного, оранжевого, фиолетового)
- **Семантические цвета** ТОЛЬКО для значков:
  - ✅ Зеленый (#34C759) - только для галочек/успеха
  - ⚠️ Оранжевый (#FF9500) - только для предупреждений
  - ❌ Красный (#FF3B30) - только для ошибок/важности
- **Никогда не используй** красный/розовый (#FF2D55, #AF52DE) в дизайне интерфейса

### 4. **Плотная типографика**
```
Мобильные размеры (< 768px):
- H1: 20px (text-xl)
- H2/H3: 18px (text-lg)
- Body: 14px (text-sm)
- Small: 12px (text-xs)
- Tiny: 11px (text-[11px])

Desktop (≥ 768px):
- H1: 36px (text-4xl)
- H2/H3: 20px (text-xl)
- Body: 16px (text-base)
```

### 5. **Компактные отступы**
```
Секции между: py-3 (12px)
Карточки внутри: p-4 (16px)
Заголовки снизу: mb-2.5 (10px)
Элементы списка: space-y-2 (8px)
Гапы в grid: gap-3 (12px) mobile, gap-6 (24px) desktop
```

### 6. **Идеальные тени (многослойные)**
```css
/* Карточки */
box-shadow: 
  0 2px 8px rgba(0, 0, 0, 0.06),
  0 1px 3px rgba(0, 0, 0, 0.04);

/* Hover состояние */
box-shadow: 
  0 8px 16px rgba(0, 0, 0, 0.12),
  0 2px 4px rgba(0, 0, 0, 0.08);

/* Glassmorphism элементы */
box-shadow: 
  0 8px 32px rgba(0, 122, 255, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
```

### 7. **Плавные переходы**
```css
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* Hover */
hover:scale-105 hover:shadow-xl

/* Active */
active:scale-95 active:opacity-90

/* Продолжительность */
duration-150 (быстро для touch)
duration-200 (стандарт)
```

## 🔧 Технические требования

### Touch Scroll (КРИТИЧНО!)
```tsx
<div 
  className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
  style={{
    WebkitOverflowScrolling: 'touch',
    touchAction: 'pan-x',
    scrollBehavior: 'smooth',
    overflowY: 'hidden',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none'
  }}
>
  <div className="flex gap-3 px-4 pb-4" style={{ width: 'max-content', minWidth: '100%' }}>
    {/* Cards здесь */}
  </div>
</div>
```

### Кнопки
```tsx
/* Primary - iOS Blue */
<button 
  className="px-4 py-2.5 text-sm font-semibold rounded-xl 
             active:scale-95 transition-all duration-150"
  style={{
    background: '#007AFF',
    color: 'white',
    boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)'
  }}
>
  Текст
</button>

/* Secondary - Glassmorphism */
<button 
  className="px-4 py-2.5 text-sm font-semibold rounded-xl 
             active:scale-95 transition-all duration-150"
  style={{
    background: 'rgba(142, 142, 147, 0.12)',
    backdropFilter: 'blur(20px) saturate(180%)',
    color: '#007AFF'
  }}
>
  Текст
</button>
```

### Теги с Glassmorphism
```tsx
<span
  className="px-3 py-1.5 text-xs font-medium text-gray-700 rounded-lg 
             cursor-pointer will-change-transform
             hover:scale-105 active:scale-95 
             transition-all duration-150"
  style={{
    background: 'rgba(142, 142, 147, 0.12)',
    backdropFilter: 'blur(20px) saturate(180%)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  }}
>
  {tag}
</span>
```

## 📱 Структура страницы тура (Шаблон)

```tsx
// 1. Breadcrumbs - Compact
<section className="pt-20 md:pt-20 pb-2 px-4 md:px-0">
  <nav className="flex items-center space-x-1.5 text-xs">
    {/* Links */}
  </nav>
</section>

// 2. Gallery - iOS 26 Mobile carousel
<section className="pb-0">
  {/* aspect-[16/10], borderRadius: '20px' */}
</section>

// 3. Tags section - Glassmorphism
<section className="py-3">
  {/* Теги с hover эффектами */}
</section>

// 4. Title + Meta
<section className="py-3 pt-14 md:pt-3">
  <h1 className="text-xl md:text-4xl font-bold mb-1.5">
  <p className="text-sm mb-2.5">
  {/* Clock, Users, Calendar icons - text-xs */}
</section>

// 5. Main content - Grid
<section className="py-3">
  <div className="grid lg:grid-cols-4 gap-6">
    <div className="lg:col-span-3 space-y-3">
      {/* Карточки p-4, mb-2.5 */}
    </div>
  </div>
</section>

// 6. Similar tours - Touch scroll
<section className="py-3">
  {/* Горизонтальная прокрутка */}
</section>
```

## ✅ Чеклист перед коммитом

### Самопроверка (ОБЯЗАТЕЛЬНО!)

**Ты как топовый программист ВСЕГДА делаешь:**

1. **TypeScript**:
   ```bash
   # Проверь ошибки через tool
   get_errors()
   # Должно быть: "No errors found"
   ```

2. **Localhost тест**:
   ```bash
   # Запусти dev сервер
   npm run dev
   # Открой страницу в браузере
   open_simple_browser("http://localhost:8080/#/excursion/...")
   ```

3. **Mobile проверка**:
   - Открой DevTools → Toggle device (Cmd+Shift+M)
   - Проверь iPhone 14 Pro (390px)
   - Проверь touch scroll на "Похожих турах"
   - Убедись что текст помещается

4. **Desktop проверка**:
   - Проверь 1920px ширину
   - Sidebar должен быть sticky
   - Все hover эффекты работают

5. **Контент проверка**:
   - ✅ Описание минимум 2-3 параграфа (150+ слов)
   - ✅ Schedule с детальными описаниями
   - ✅ Highlights (минимум 5-7 пунктов)
   - ✅ Included/NotIncluded секции заполнены
   - ✅ WhatToBring и ImportantInfo есть

6. **SEO проверка**:
   - ✅ H1 один на странице (title)
   - ✅ H2 для основных секций (Описание, Программа и т.д.)
   - ✅ H3 для подсекций
   - ✅ Alt текст у всех изображений
   - ✅ Meta description в данных тура

### Визуал
- [ ] Все интерактивные элементы ТОЛЬКО #007AFF
- [ ] Нет красного/оранжевого/фиолетового в UI (только в семантике)
- [ ] Все hover-эффекты с glassmorphism
- [ ] Все кнопки с active:scale-95
- [ ] Тени многослойные (двойные box-shadow)

### Типографика
- [ ] Текст на mobile помещается (11-14px)
- [ ] Заголовки text-lg md:text-xl (18px/20px)
- [ ] Описания text-sm md:text-base (14px/16px)

### Spacing
- [ ] Секции py-3 (12px вертикально)
- [ ] Карточки p-4 (16px внутри)
- [ ] Заголовки mb-2.5 (10px снизу)
- [ ] Списки space-y-2 (8px между)
- [ ] Gaps gap-3 mobile, gap-6 desktop

### Touch & Mobile
- [ ] Touch scroll работает (проверить на телефоне!)
- [ ] Все кнопки 44px минимум (py-2.5 + borders)
- [ ] Breadcrumbs text-xs (12px)
- [ ] Нет горизонтального скролла на странице

### Transitions
- [ ] Все переходы duration-150 или duration-200
- [ ] cubic-bezier(0.4, 0, 0.2, 1) для плавности
- [ ] will-change-transform на анимируемых элементах

## 🚀 Команды для проверки

```bash
# 1. Проверить localhost
npm run dev
# Открыть: http://localhost:8080/#/excursion/cheow-lan-lake

# 2. Проверить на мобильном
# DevTools → Toggle device toolbar → iPhone 14 Pro
# Проверить touch scroll вручную

# 3. Билд
npm run build

# 4. Проверить ошибки TypeScript
# VSCode должен показывать 0 errors
```

## 🎨 Цветовая палитра iOS 26

```typescript
// Primary (ГЛАВНЫЙ ЦВЕТ ДЛЯ ВСЕХ ИНТЕРАКТИВНЫХ ЭЛЕМЕНТОВ)
const blue = '#007AFF'; // iOS Blue
const blueBackground = 'rgba(0, 122, 255, 0.12)'; // Фон иконок/кнопок

// Telegram
const telegram = '#0088cc'; // Только для кнопки "Написать в Телеграм"

// Semantic Colors (ТОЛЬКО для специфичных целей)
const green = '#34C759';   // ✅ Бейдж "ПРИРОДА" + итоговая цена
const orange = '#FF9500';  // ⚠️ Важная информация, оплачивается отдельно
const red = '#FF3B30';     // 🔥 Бейдж "ХИТ"
const yellow = '#FFCC00';  // ⭐ Только звёзды рейтинга

// Neutrals (iOS 26)
const systemGroupedBackground = 'rgb(242, 242, 247)'; // #F2F2F7
const gray100 = '#E5E5EA';  // Borders
const gray400 = '#8E8E93';  // Secondary text
const gray600 = '#636366';  // Tertiary text
const gray900 = '#1C1C1E';  // Primary text/headers

// Glassmorphism overlays
const glassLight = 'rgba(0, 122, 255, 0.12)'; // Синий с прозрачностью
const glassDark = 'rgba(28, 28, 30, 0.85)';   // Тёмный overlay
```

### 🎯 ПРАВИЛА ИСПОЛЬЗОВАНИЯ ЦВЕТОВ

#### ✅ DO (Делать):
1. **Blue (#007AFF)** для ВСЕХ интерактивных элементов:
   - ✓ Галочки (чекмарки)
   - 🔗 Ссылки
   - 🔵 Кнопки действий
   - 📱 Иконки заголовков
   - ➕ Кнопки +/-
   - 🎯 Все интерактивные элементы

2. **Orange (#FF9500)** для информационных блоков:
   - ⚠️ "Важная информация"
   - ➕ "Оплачивается отдельно"
   - ℹ️ Предупреждения

3. **Yellow (#FFCC00)** ТОЛЬКО для рейтинга:
   - ⭐ Звёзды рейтинга

4. **Red (#FF3B30)** ТОЛЬКО для акцентов:
   - 🔥 Бейдж "ХИТ"

5. **Green (#34C759)** ТОЛЬКО для природы:
   - 🌿 Бейдж "ПРИРОДА"
   - 💰 Итоговая цена в калькуляторе

#### ❌ DON'T (Не делать):
1. ❌ **НЕ использовать Green для галочек** — теперь это Blue!
2. ❌ **НЕ использовать градиенты** для UI элементов (только лого)
3. ❌ **НЕ смешивать более 2 цветов** в одной карточке
4. ❌ **НЕ использовать Yellow** для чего-либо кроме звёзд
5. ❌ **НЕ использовать свои оттенки** — только из палитры iOS 26

### 📊 Семантика цветов

| Цвет | Использование | Примеры |
|------|---------------|---------|
| 🔵 Blue | Основной интерактив | Галочки, кнопки, ссылки, заголовки |
| 🟠 Orange | Информация | Важная информация, доп. расходы |
| 🟡 Yellow | Рейтинг | Звёзды ⭐⭐⭐⭐⭐ |
| 🔴 Red | Акцент | Бейдж "ХИТ", срочные действия |
| 🟢 Green | Природа/Цена | Бейдж "ПРИРОДА", итоговая сумма |
| ⚫ Gray | Текст/Фон | Описания, подзаголовки, фон |

### 🎨 Примеры применения

#### Карточка "Что вас ждёт"
```tsx
// Заголовок
<h3>
  <svg className="w-6 h-6" style={{ color: '#007AFF' }}>✨</svg>
  Что вас ждёт
</h3>

// Галочки
<span style={{ background: 'rgba(0, 122, 255, 0.12)' }}>
  <svg style={{ color: '#007AFF' }}>✓</svg>
</span>
```

#### Карточка "Включено в цену"
```tsx
// Заголовок
<h3>
  <svg style={{ color: '#007AFF' }}>✓</svg>
  Включено в цену
</h3>

// Список
<span style={{ background: 'rgba(0, 122, 255, 0.12)' }}>
  <svg style={{ color: '#007AFF' }}>✓</svg>
</span>
```

#### Карточка "Важная информация"
```tsx
// Фон
style={{
  background: 'rgba(255, 149, 0, 0.08)',
  border: '1px solid rgba(255, 149, 0, 0.15)'
}}

// Заголовок
<h3 style={{ color: '#FF9500' }}>
  <svg>ℹ️</svg>
  Важная информация
</h3>
```

## 💡 Принятие решений как iOS дизайнер

### Когда уменьшить spacing?
- Если видишь "много воздуха" между элементами
- Если на mobile не помещается контент
- Если пользователь скроллит больше 2-3 экранов

### Когда добавить glassmorphism?
- Все hover-эффекты
- Все теги
- Все оверлеи на фото
- Все модальные окна

### Когда использовать не-синий цвет?
- ✅ Зеленая галочка для "включено"
- ⚠️ Оранжевый бейдж "ХИТ" или "НОВИНКА"
- ❌ Красный для "Срочно" или "Последние места"
- **НИКОГДА** для обычных кнопок/ссылок

### Размер текста
- Если текст обрезается → уменьши font-size
- Если помещается с запасом → можно оставить
- На mobile ВСЕГДА начинай с меньшего размера

## 🎯 Философия "Every Pixel Matters"

> "Хороший дизайн незаметен. Отличный дизайн заставляет забыть о том, что ты используешь приложение."

- **Не добавляй элементы "для красоты"** — каждый элемент должен иметь цель
- **Белое пространство ценно, но не бесконечно** — на mobile места мало
- **Консистентность > Креативность** — если используешь 12px gap, используй везде 12px
- **Touch-first всегда** — если не работает пальцем, не работает вообще

## 📖 Эталонная страница - Достопримечательности Пхукета

**Файл**: `/src/pages/DostoprimechatelnostiPhuketa.tsx`

### Почему это эталон?

1. **Правильная структура контента** (как у tisland.travel):
   - Описание тура (1-2 параграфа)
   - Программа по времени (schedule с time + title + description)
   - Особенности тура (highlights)
   - В цену включено / Дополнительные расходы (included / notIncluded)
   - Взять с собой (whatToBring)
   - Важно знать (importantInfo)

2. **Логичное расположение цены**:
   - ❌ НЕ опускается вниз до секции "Похожие туры"
   - ✅ Цена в боковой панели (desktop) - sticky top-4
   - ✅ Цена в мобильной панели внизу (mobile) - fixed bottom

3. **Правильная типографика**:
   - H2 (Описание): text-3xl (30px)
   - H3 (Программа, Особенности): text-2xl (24px)
   - Body text: text-lg (18px) для описания
   - Schedule: text-sm (14px) для описаний пунктов

4. **Хорошее SEO**:
   - Структурированные H2/H3 заголовки
   - Длинное описание (2-3 параграфа)
   - Все секции заполнены контентом
   - Ключевые слова в тексте естественно

### Что применить к CheoLan:

```tsx
// 1. Убрать лишнее между ценой и похожими турами
// 2. Добавить больше текста в описание (сейчас слишком короткое)
// 3. Структурировать highlights лучше
// 4. Добавить included/notIncluded/whatToBring/importantInfo секции
// 5. Сделать schedule более детальным с описаниями
```

---

## 📖 Ресурсы для изучения

1. **Apple HIG iOS 26**: https://developer.apple.com/design/human-interface-guidelines/ios
2. **Telegram Design**: https://core.telegram.org/themes
3. **Glassmorphism**: https://glassmorphism.com/
4. **iOS Fonts**: San Francisco (system-ui)
5. **Touch Targets**: Минимум 44x44pt

---

## ⚡ Быстрая памятка

```
ЦВЕТ: #007AFF для ВСЕГО интерактивного
ТЕКСТ: 11-14px mobile, 14-16px desktop  
SPACING: py-3, p-4, mb-2.5, space-y-2, gap-3
ТЕНИ: Двойные (0 2px 8px + 0 1px 3px)
TRANSITIONS: 150-200ms cubic-bezier
GLASSMORPHISM: blur(20px) saturate(180%)
TOUCH: 44px минимум, WebkitOverflowScrolling
```

---

**Помни**: Ты не просто верстаешь страницу. Ты создаешь **премиум опыт путешествий** для пользователей Telegram. Эта страница будет шаблоном для всех 30+ туров. Сделай её идеальной. 🎨✨
