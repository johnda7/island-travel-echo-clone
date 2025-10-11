# 🔧 План улучшений страницы Чео Лан

## 📊 Анализ текущего состояния

### ✅ Что уже хорошо:
- iOS 26 дизайн применён
- Glassmorphism на тегах и элементах
- Компактные отступы
- Логотип с hover эффектом
- Touch scroll настроен (хотя может не работать)
- Breadcrumbs сделаны маленькими
- Нет красного цвета в UI

### ❌ Проблемы (от пользователя):

1. **"Всё лишнее, не нужно"** - слишком много воздуха, мало контента
2. **"Цена опускается вниз до туров"** - sidebar должен быть sticky, не терять цену
3. **"Описание не помещается"** - текст слишком длинный в одном параграфе
4. **"Не логично"** - структура не как у конкурентов

---

## 🎯 Эталон: Достопримечательности Пхукета

### Структура контента (как должно быть):

```
1. Breadcrumbs ✅
2. Gallery + Sidebar ✅
3. Tags ✅
4. Title + Meta ✅
5. CONTENT (ОСНОВНОЕ ОТЛИЧИЕ):
   ├── Описание (2-3 параграфа, text-lg)
   ├── Программа дня (schedule с временем и описаниями)
   ├── Особенности тура (highlights - список с bullets)
   ├── В цену включено ✅ (included)
   ├── Дополнительные расходы ❌ (notIncluded - НЕТ!)
   ├── Взять с собой ❌ (whatToBring - НЕТ, есть requirements но не показывается!)
   └── Важно знать ✅ (importantInfo)
6. Похожие туры ✅
7. Footer ✅
```

---

## 🛠️ План исправлений

### 1. Добавить недостающие секции в данные тура

**Файл**: `/src/data/tours/cheow-lan-lake/static.ts`

Добавить:

```typescript
notIncluded: [
  "Личные расходы",
  "Напитки и алкоголь",
  "Дополнительные услуги"
],

whatToBring: [
  "Купальные принадлежности",
  "Полотенце", 
  "Солнцезащитный крем",
  "Головной убор",
  "Фотоаппарат/камера",
  "Закрытая одежда для храма"
],
```

Переименовать `requirements` → `whatToBring` или сделать отдельно.

### 2. Расширить описание

**Проблема**: 1 большой параграф сложно читать.

**Решение**: Разбить на 2-3 параграфа как у Достопримечательностей:

```tsx
<div className="prose prose-lg max-w-none mb-6">
  <p className="text-gray-700 leading-relaxed text-lg mb-4">
    {/* Первый параграф - вступление */}
  </p>
  <p className="text-gray-700 leading-relaxed text-lg mb-4">
    {/* Второй параграф - детали */}
  </p>
  <p className="text-gray-700 leading-relaxed text-lg">
    {/* Третий параграф - итоги */}
  </p>
</div>
```

### 3. Улучшить структуру страницы

**Текущий layout CheoLan** (упрощённо):

```
<section> Breadcrumbs </section>
<section> Gallery Mobile </section>
<section> Gallery Desktop + Sidebar (sticky) </section>
<section> Tags </section>
<section> Title + Meta + Price (mobile) </section>
<section> Content:
  - Description card
  - Schedule card
  - Highlights card
  - Included/NotIncluded/ImportantInfo cards ← ТУТ ПРОБЛЕМА
</section>
<section> Похожие туры </section>
```

**Должно быть** (как у Достопримечательностей):

```
<section> Breadcrumbs </section>
<section> Gallery + Sidebar в одной секции </section>
<section> Tags + Title + Meta в одной секции </section>
<section> Content в GRID:
  <div className="grid lg:grid-cols-4 gap-8">
    <div className="lg:col-span-3">
      <!-- Основной контент -->
    </div>
    <div className="lg:col-span-1">
      <!-- Sidebar sticky (desktop) -->
      <!-- НА MOBILE - fixed bottom bar -->
    </div>
  </div>
</section>
<section> Похожие туры </section>
```

### 4. Sidebar должен быть ВСЕГДА видим

**Проблема**: Sidebar в desktop grid, но теряется при скролле вниз.

**Решение**: 

```tsx
<div className="lg:col-span-1">
  <div className="sticky top-4">
    {/* Sidebar content */}
    {/* Цена ВСЕГДА видна при скролле */}
  </div>
</div>
```

**На mobile**: Fixed bottom bar с ценой (MobileBookingBar) ✅ уже есть

### 5. Убрать дублирование цены

**Текущая проблема**: Цена показывается 3 раза:
1. В sidebar (desktop)
2. В title section (mobile) 
3. В fixed bottom bar (mobile)

Пункт 2 и 3 дублируются на mobile!

**Решение**: Убрать цену из title section на mobile, оставить только fixed bar.

---

## 📝 Конкретные изменения

### Изменение 1: Структура content section

**До**:
```tsx
<section className="py-3">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-3">
        {/* cards */}
      </div>
    </div>
  </div>
</section>
```

**После**:
```tsx
<section className="py-3">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        {/* Основной контент - без sidebar внутри */}
        <h2>Описание</h2>
        <h3>Программа</h3>
        <h3>Особенности</h3>
        <div className="grid md:grid-cols-2">
          <div>Включено</div>
          <div>Не включено</div>
        </div>
        <div>Взять с собой</div>
        <div>Важно знать</div>
      </div>
      <div className="lg:col-span-1">
        <div className="sticky top-4 hidden lg:block">
          {/* Sidebar с ценой */}
        </div>
      </div>
    </div>
  </div>
</section>
```

### Изменение 2: Убрать цену из Title section на mobile

**До**:
```tsx
<section className="py-3 pt-14 md:pt-3">
  {/* title */}
  {/* meta */}
  <div className="...md:hidden">
    {/* Цена */}  ← УБРАТЬ
  </div>
</section>
```

**После**:
```tsx
<section className="py-3 pt-14 md:pt-3">
  {/* title */}
  {/* meta */}
  {/* Цена УДАЛЕНА - будет только в fixed bar внизу */}
</section>
```

### Изменение 3: Добавить секции как у Достопримечательностей

Скопировать структуру:
- H2 text-3xl для основных заголовков
- H3 text-2xl для подзаголовков
- Grid md:grid-cols-2 для Включено/Не включено
- Цветные bullets (зелёный ✓, красный ✗, синий •, оранжевый ⚠️)

---

## ✅ Итоговый чеклист

- [ ] Добавить `notIncluded` в данные тура
- [ ] Переименовать/добавить `whatToBring` 
- [ ] Расширить description (разбить на 2-3 параграфа)
- [ ] Переструктурировать layout (убрать sidebar из отдельного места)
- [ ] Сделать sidebar sticky на всю высоту контента
- [ ] Убрать дублирование цены на mobile (оставить только fixed bar)
- [ ] Добавить секции как у Достопримечательностей:
  - [ ] Описание (h2 text-3xl)
  - [ ] Программа (h3 text-2xl)
  - [ ] Особенности (h3 text-2xl)
  - [ ] В цену включено / Дополнительные расходы (grid md:grid-cols-2)
  - [ ] Взять с собой
  - [ ] Важно знать
- [ ] Проверить на localhost
- [ ] Проверить TypeScript ошибки
- [ ] Проверить на mobile (390px)
- [ ] Проверить на desktop (1920px)
- [ ] Проверить что цена ВСЕГДА видна

---

## 🎨 Референс код из Достопримечательностей

```tsx
// Структура content section
<section className="py-4">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        
        {/* Описание */}
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Описание</h2>
        <div className="prose prose-lg max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            {excursion.description}
          </p>
        </div>

        {/* Программа */}
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Программа:</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          {/* schedule */}
        </div>

        {/* Особенности */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Особенности тура</h3>
          {/* highlights */}
        </div>

        {/* Включено / Не включено */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-green-600">В цену включено</h3>
            {/* included */}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-red-600">Дополнительные расходы</h3>
            {/* notIncluded */}
          </div>
        </div>

        {/* Взять с собой */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-blue-600">Взять с собой</h3>
          {/* whatToBring */}
        </div>

        {/* Важно знать */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-amber-600">Важно знать</h3>
          {/* importantInfo */}
        </div>

      </div>

      {/* SIDEBAR - sticky */}
      <div className="lg:col-span-1">
        <div className="sticky top-4 hidden lg:block">
          <Card>
            {/* Sidebar content with price */}
          </Card>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

**Приоритет**: ВЫСОКИЙ  
**Время**: ~2-3 часа работы  
**Сложность**: Средняя (переструктурирование layout)
