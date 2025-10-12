# 🎯 ШПАРГАЛКА: Где редактировать шаблон туров

## 📍 ГЛАВНЫЙ ФАЙЛ ШАБЛОНА

**Путь**: `/src/components/TourPageTemplate.tsx`  
**Размер**: 686 строк  
**Применяется**: КО ВСЕМ 30+ турам сразу!

---

## 🗺️ КАРТА ФАЙЛА (что где находится)

### 1️⃣ BREADCRUMBS - Строки 128-147
```tsx
// ЗДЕСЬ можно изменить стиль breadcrumbs
<nav className="flex items-center space-x-1.5 text-[13px]">
  <Link to="/" className="hover:text-[#007AFF]">Главная</Link>
  <span>›</span>
  <Link to="/tours">Туры</Link>
</nav>
```

### 2️⃣ GALLERY - Строки 149-362
```tsx
// ЗДЕСЬ можно изменить галерею
<div className="relative aspect-[16/10]">  // ← Высота галереи
  <img src={tourData.gallery[index]} />
</div>

// Badges (ХИТ, НОВИНКА) - строка ~180
<span style={{ background: 'rgba(255, 59, 48, 0.92)' }}>ХИТ</span>
```

### 3️⃣ ЗАГОЛОВОК И ЦЕНА - Строки 364-435
```tsx
// ЗДЕСЬ можно изменить заголовок тура
<h1 className="text-2xl md:text-4xl font-bold">
  {tourData.title}
</h1>

// Цена - строка ~420
<div className="text-2xl font-bold" style={{ color: '#007AFF' }}>
  от {tourData.priceAdult} {tourData.currency}
</div>
```

### 4️⃣ ОПИСАНИЕ - Строки 440-448
```tsx
// ЗДЕСЬ можно изменить секцию "Описание"
{tourData.description && (
  <Card>
    <CardContent className="p-6">
      <h2 className="text-2xl font-bold mb-4">Описание</h2>  // ← Заголовок
      <p className="text-gray-700">{tourData.description}</p>
    </CardContent>
  </Card>
)}
```

### 5️⃣ ЧТО ВХОДИТ - Строки 450-465
```tsx
// ЗДЕСЬ можно изменить секцию "Что входит в тур"
<h2 className="text-2xl font-bold mb-4">Что входит в тур</h2>
<div className="grid md:grid-cols-2 gap-4">
  {tourData.highlights.map((highlight, index) => (
    <div className="flex items-start gap-2">
      <span className="text-green-500 mt-1">✓</span>  // ← Иконка
      <span>{highlight}</span>
    </div>
  ))}
</div>
```

### 6️⃣ ПРОГРАММА ТУРА - Строки 468-486
```tsx
// ЗДЕСЬ можно изменить секцию "Программа тура"
<h2 className="text-2xl font-bold mb-4">Программа тура</h2>
<div className="border-l-2 border-blue-500 pl-4">  // ← Цвет полоски
  <div className="text-sm font-semibold text-blue-600">{item.time}</div>
  <h3 className="font-semibold">{item.title}</h3>
</div>
```

### 7️⃣ ВКЛЮЧЕНО/НЕ ВКЛЮЧЕНО - Строки 489-519
```tsx
// ЗДЕСЬ можно изменить секцию "Включено в стоимость"
<h3 className="font-semibold text-green-600">Включено</h3>  // ← Цвет
<li className="flex items-start gap-2">
  <span className="text-green-500 mt-1">✓</span>
  <span>{item}</span>
</li>

<h3 className="font-semibold text-red-600">Не включено</h3>  // ← Цвет
<li className="flex items-start gap-2">
  <span className="text-red-500 mt-1">✗</span>
  <span>{item}</span>
</li>
```

### 8️⃣ ЧТО ВЗЯТЬ - Строки 522-534
```tsx
// ЗДЕСЬ можно изменить секцию "Что взять с собой"
<h2 className="text-2xl font-bold mb-4">Что взять с собой</h2>
<li className="flex items-center gap-2">
  <span className="text-blue-500">•</span>  // ← Цвет маркера
  <span>{item}</span>
</li>
```

### 9️⃣ ВАЖНАЯ ИНФОРМАЦИЯ - Строки 537-549
```tsx
// ЗДЕСЬ можно изменить секцию "Важная информация"
<h2 className="text-2xl font-bold mb-4">Важная информация</h2>
<li className="flex items-start gap-2">
  <span className="text-orange-500 mt-1">⚠</span>  // ← Иконка
  <span>{info}</span>
</li>
```

### 🔟 КАРТА МАРШРУТА - Строки 563-572
```tsx
// ЗДЕСЬ подключается компонент карты
{routePoints && routePoints.length > 0 && (
  <TourRouteMap 
    tourTitle={tourData.title}
    routePoints={routePoints}
  />
)}
```

---

## 🎨 ЧАСТЫЕ ИЗМЕНЕНИЯ

### Изменить цвет всех заголовков секций
**Найти**: `className="text-2xl font-bold mb-4"`  
**Заменить на**: `className="text-2xl font-bold mb-4 text-blue-600"`

### Изменить размер галереи на мобильном
**Найти**: `aspect-[16/10]` (строка 151)  
**Заменить на**: `aspect-[16/12]` (выше) или `aspect-[16/9]` (ниже)

### Изменить цвет кнопки "Забронировать"
**Найти**: `bg-green-600 hover:bg-green-700`  
**Заменить на**: `bg-blue-600 hover:bg-blue-700`

### Добавить новый badge (например, "TOP")
**Строка ~180** (после badge "ХИТ"):
```tsx
<span className="px-2 py-0.5 text-white text-[10px]" style={{
  background: 'rgba(52, 199, 89, 0.92)',
}}>
  TOP
</span>
```

---

## ⚡ КАК ПРОТЕСТИРОВАТЬ

1. **Открой файл**: `src/components/TourPageTemplate.tsx`
2. **Внеси изменения** (например, измени цвет заголовка)
3. **Запусти**: `npm run dev`
4. **Открой в браузере**:
   - http://localhost:8080/#/tours/cheow-lan-lake-new
   - http://localhost:8080/#/tours/phi-phi-2-days-1-night-new
5. **Проверь** что изменения видны на ОБЕИХ страницах!

---

## 🚨 КРИТИЧЕСКИ ВАЖНО

### ❌ НЕ ДЕЛАЙ:
- Изменения в отдельных файлах туров (PhiPhi2Days1Night.tsx)
- Копирование кода из TourPageTemplate
- Дублирование стилей

### ✅ ДЕЛАЙ:
- **ВСЕ изменения ТОЛЬКО в TourPageTemplate.tsx**
- Данные туров в `src/data/tours/`
- Тестируй на нескольких турах
- 1 изменение → все 30+ туров обновлены! 🚀

---

## 📚 СВЯЗАННЫЕ ФАЙЛЫ

- **Шаблон**: `src/components/TourPageTemplate.tsx` ← ТЫ ЗДЕСЬ
- **Карта**: `src/components/TourRouteMap.tsx` (стили карты)
- **Типы**: `src/types/Tour.ts` (структура данных)
- **Пример данных**: `src/data/tours/cheow-lan-lake.ts`
- **Пример страницы**: `src/pages/CheoLanLakeNew.tsx` (11 строк!)

---

**💡 Золотое правило**: CheoLanLake = Эталон для всех туров! 🏆
