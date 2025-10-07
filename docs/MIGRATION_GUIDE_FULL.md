# Полное руководство по миграции туров в Supabase CMS

## 📋 Оглавление
1. [Архитектура системы](#архитектура-системы)
2. [Пошаговый процесс миграции](#пошаговый-процесс-миграции)
3. [API и инструменты](#api-и-инструменты)
4. [Проверка и валидация](#проверка-и-валидация)
5. [Best Practices для Claude Sonnet 4.5](#best-practices-для-claude-sonnet-45)

---

## Архитектура системы

### Текущая структура данных

```
TypeScript файлы (src/data/tours/*.ts)
    ↓
toursRegistry.ts (регистрация всех туров)
    ↓
useTours.ts (гибридный подход: TS + CMS)
    ↓
useCMSTours.ts (работа с Supabase)
    ↓
Supabase Database (tours, tour_gallery, tour_itinerary)
```

### Таблицы Supabase

#### 1. `tours` (основная информация)
- **id**: UUID, primary key
- **title**: название тура
- **slug**: URL-слаг (уникальный!)
- **description**: полное описание
- **short_description**: краткое для карточек
- **price_adult**: цена взрослый (integer)
- **price_child**: цена ребёнок (integer)
- **currency**: валюта (по умолчанию THB)
- **duration**: длительность
- **group_size**: размер группы
- **highlights**: ARRAY текстов
- **included**: ARRAY (что включено)
- **excluded**: ARRAY (что не включено)
- **requirements**: ARRAY (что взять)
- **important_info**: ARRAY (важная информация)
- **tags**: ARRAY (теги для поиска)
- **is_active**: boolean
- **is_featured**: boolean
- **sort_order**: integer

#### 2. `tour_gallery` (фотографии)
- **id**: UUID
- **tour_id**: UUID (связь с tours)
- **image_url**: полный URL изображения
- **alt_text**: alt текст для SEO
- **caption**: подпись к фото
- **is_main**: главное фото (boolean)
- **sort_order**: порядок отображения

#### 3. `tour_itinerary` (программа тура)
- **id**: UUID
- **tour_id**: UUID (связь с tours)
- **day_number**: номер дня
- **title**: название дня
- **description**: описание программы
- **activities**: ARRAY активностей
- **sort_order**: порядок отображения

---

## Пошаговый процесс миграции

### ШАГ 1: Проверка существующих данных

**Цель**: Убедиться, что тур еще не мигрирован

**Инструменты Lovable**:
```javascript
// Используем supabase--read-query
SELECT slug, title FROM public.tours WHERE slug = 'tour-slug-here';
```

**Критические моменты**:
- ❌ Если тур уже существует - НЕ МИГРАЦИРОВАТЬ повторно
- ✅ Если тур отсутствует - продолжаем миграцию
- ⚠️ Никогда не удаляйте существующие туры без явного указания пользователя

### ШАГ 2: Извлечение данных из TypeScript

**Откуда брать данные**:
```
src/data/tours/[tour-name].ts  ← Основные данные
src/data/toursRegistry.ts       ← Метаданные (tags, priority, featured)
```

**Что извлекать**:
1. **Основная информация**:
   - title, subtitle, slug
   - description, shortDescription
   - pricing (adult, child)
   - duration, groupSize
   
2. **Массивы**:
   - highlights (ключевые особенности)
   - included (что включено)
   - excluded (что не включено)
   - requirements (требования)
   - importantInfo (важная информация)
   
3. **Галерея**:
   - images[] - массив объектов с url, alt, caption
   - Обязательно отметить is_main для главного фото
   
4. **Программа**:
   - itinerary[] - массив дней с title и description

### ШАГ 3: Подготовка SQL миграции

**Структура миграции**:

```sql
-- Используем CTE (Common Table Expressions) для связи данных
WITH new_tour AS (
  INSERT INTO public.tours (
    title,
    subtitle,
    slug,
    description,
    short_description,
    price_adult,
    price_child,
    currency,
    duration,
    group_size,
    difficulty_level,
    highlights,
    included,
    excluded,
    requirements,
    important_info,
    meta_title,
    meta_description,
    tags,
    is_active,
    is_featured,
    sort_order
  ) VALUES (
    'Название тура',
    'Подзаголовок',
    'tour-slug',
    'Полное описание...',
    'Краткое описание',
    2900,  -- цена взрослый
    1900,  -- цена ребёнок
    'THB',
    '1 день (08:00-17:00)',
    'до 30 человек',
    'легкий',
    ARRAY['Особенность 1', 'Особенность 2'],  -- highlights
    ARRAY['Включено 1', 'Включено 2'],        -- included
    ARRAY['Не включено 1'],                    -- excluded
    ARRAY['Требование 1', 'Требование 2'],     -- requirements
    ARRAY['Важная инфо 1', 'Важная инфо 2'],  -- important_info
    'SEO заголовок для тура',
    'SEO описание для тура',
    ARRAY['тег1', 'тег2', 'тег3'],           -- tags
    true,   -- is_active
    false,  -- is_featured
    100     -- sort_order
  )
  RETURNING id
)

-- Добавляем фотографии
INSERT INTO public.tour_gallery (tour_id, image_url, alt_text, caption, is_main, sort_order)
SELECT 
  new_tour.id,
  unnest(ARRAY[
    'https://domain.com/image1.jpg',
    'https://domain.com/image2.jpg',
    'https://domain.com/image3.jpg'
  ]) as image_url,
  unnest(ARRAY[
    'Alt текст для фото 1',
    'Alt текст для фото 2', 
    'Alt текст для фото 3'
  ]) as alt_text,
  unnest(ARRAY[
    'Подпись к фото 1',
    'Подпись к фото 2',
    'Подпись к фото 3'
  ]) as caption,
  unnest(ARRAY[true, false, false]) as is_main,  -- только первое главное
  unnest(ARRAY[1, 2, 3]) as sort_order
FROM new_tour;

-- Добавляем программу тура
INSERT INTO public.tour_itinerary (tour_id, day_number, title, description, sort_order)
SELECT 
  new_tour.id,
  unnest(ARRAY[1, 2, 3]) as day_number,
  unnest(ARRAY[
    'Точка 1: Название',
    'Точка 2: Название',
    'Точка 3: Название'
  ]) as title,
  unnest(ARRAY[
    'Описание точки 1...',
    'Описание точки 2...',
    'Описание точки 3...'
  ]) as description,
  unnest(ARRAY[1, 2, 3]) as sort_order
FROM new_tour;
```

### ШАГ 4: Выполнение миграции

**Инструмент Lovable**: `supabase--migration`

```javascript
// Lovable автоматически запросит подтверждение у пользователя
await lovable.tools.supabase_migration({
  query: "SQL миграция выше"
});
```

**Важно**:
- ✅ Lovable показывает SQL пользователю
- ✅ Пользователь должен одобрить миграцию
- ✅ После одобрения миграция выполняется автоматически
- ❌ НЕ выполняется без одобрения

### ШАГ 5: Проверка результата

**После миграции проверяем**:

```sql
-- 1. Проверяем создание тура
SELECT * FROM public.tours WHERE slug = 'tour-slug';

-- 2. Проверяем галерею (должно быть минимум 6-8 фото)
SELECT COUNT(*), tour_id FROM public.tour_gallery 
WHERE tour_id = (SELECT id FROM public.tours WHERE slug = 'tour-slug')
GROUP BY tour_id;

-- 3. Проверяем программу тура
SELECT COUNT(*), tour_id FROM public.tour_itinerary
WHERE tour_id = (SELECT id FROM public.tours WHERE slug = 'tour-slug')
GROUP BY tour_id;
```

---

## API и инструменты

### Lovable Tools для работы с Supabase

#### 1. `supabase--read-query` 
**Назначение**: Чтение данных из БД

**Использование**:
```javascript
// Проверка существующих туров
SELECT slug, title, id FROM public.tours WHERE is_active = true;

// Получение всех фото конкретного тура
SELECT * FROM public.tour_gallery 
WHERE tour_id = 'uuid-here' 
ORDER BY sort_order;

// Статистика по турам
SELECT 
  COUNT(*) as total_tours,
  COUNT(*) FILTER (WHERE is_featured = true) as featured_tours
FROM public.tours 
WHERE is_active = true;
```

#### 2. `supabase--migration`
**Назначение**: Изменение структуры или данных БД

**Когда использовать**:
- ✅ Создание/изменение таблиц
- ✅ Добавление данных (INSERT)
- ✅ Обновление данных (UPDATE)
- ✅ Создание функций/триггеров
- ✅ Настройка RLS политик

**Процесс**:
1. AI подготавливает SQL
2. AI вызывает `supabase--migration`
3. Lovable показывает SQL пользователю
4. Пользователь одобряет
5. Миграция выполняется

#### 3. `supabase--linter`
**Назначение**: Проверка безопасности БД

**Использование**:
```javascript
// Проверяем RLS политики и настройки безопасности
await lovable.tools.supabase_linter();
```

**Критические проверки**:
- RLS включен на всех таблицах?
- Политики настроены правильно?
- Нет ли утечек данных?

#### 4. `lov-view`
**Назначение**: Чтение файлов проекта

**Использование**:
```javascript
// Читаем тур из TypeScript
await lovable.tools.lov_view({
  file_path: "src/data/tours/phuket-sightseeing.ts"
});

// Читаем реестр туров
await lovable.tools.lov_view({
  file_path: "src/data/toursRegistry.ts",
  lines: "50-150"  // можно указать диапазон строк
});
```

### Supabase Client (в коде React)

```typescript
import { supabase } from "@/integrations/supabase/client";

// 1. Получение всех активных туров
const { data: tours, error } = await supabase
  .from('tours')
  .select(`
    *,
    tour_gallery (*),
    tour_itinerary (*)
  `)
  .eq('is_active', true)
  .order('sort_order');

// 2. Получение тура по slug
const { data: tour } = await supabase
  .from('tours')
  .select(`
    *,
    tour_gallery (*),
    tour_itinerary (*)
  `)
  .eq('slug', 'tour-slug')
  .eq('is_active', true)
  .single();

// 3. Поиск туров по тегам
const { data: tours } = await supabase
  .from('tours')
  .select('*')
  .contains('tags', ['водопады', 'природа'])
  .eq('is_active', true);
```

### Database Functions (готовые)

```sql
-- 1. get_tour_with_gallery(tour_slug text)
-- Возвращает тур со всей информацией
SELECT * FROM get_tour_with_gallery('phuket-sightseeing');

-- 2. get_all_tours()
-- Возвращает все активные туры с главным фото
SELECT * FROM get_all_tours();
```

---

## Проверка и валидация

### Чек-лист перед миграцией

- [ ] Тур еще НЕ существует в Supabase
- [ ] Извлечены ВСЕ данные из TypeScript файла
- [ ] Собраны ВСЕ фотографии (минимум 6-8)
- [ ] Подготовлена полная программа тура
- [ ] Slug совпадает с существующим маршрутом
- [ ] Массивы заполнены корректно
- [ ] Цены указаны как числа
- [ ] SQL проверен на синтаксис

### Чек-лист после миграции

- [ ] Тур появился в таблице tours
- [ ] Все фотографии добавлены в tour_gallery
- [ ] Программа добавлена в tour_itinerary
- [ ] Главное фото отмечено (is_main = true)
- [ ] Тур отображается на сайте
- [ ] Страница тура открывается по slug
- [ ] Все изображения загружаются
- [ ] Форма бронирования работает

### Типичные ошибки

#### Ошибка 1: Duplicate key
```
ERROR: duplicate key value violates unique constraint "tours_slug_key"
```

**Причина**: Тур с таким slug уже существует

**Решение**: 
1. Проверить существующие туры
2. Использовать другой slug
3. Или обновить существующий тур

#### Ошибка 2: Malformed array literal
```
ERROR: malformed array literal
```

**Причина**: Неправильный синтаксис массива

**Решение**:
```sql
-- ❌ Неправильно
ARRAY["текст с 'апострофом'"]

-- ✅ Правильно
ARRAY['текст с ''апострофом''']
-- или
ARRAY[E'текст с \'апострофом\'']
```

#### Ошибка 3: Нет фотографий
```
WARNING: Tour has no images in gallery
```

**Решение**: Обязательно добавить минимум 6-8 фотографий

---

## Best Practices для Claude Sonnet 4.5

### 1. Планирование миграции

```markdown
1. ANALYZE: Прочитать файл тура из src/data/tours/
2. CHECK: Проверить наличие в Supabase
3. EXTRACT: Извлечь все данные (основные + массивы + галерея + программа)
4. PREPARE: Подготовить SQL с CTE
5. EXECUTE: Вызвать supabase--migration
6. VERIFY: Проверить результат
```

### 2. Работа с массивами

**Правильный формат**:
```sql
-- Для текстовых массивов
highlights = ARRAY[
  'Особенность 1',
  'Особенность 2',
  'Особенность 3'
]

-- Для обработки апострофов
ARRAY[
  'Текст с ''апострофом''',
  'Еще текст с ''апострофом'''
]
```

### 3. Работа с галереей

**Обязательные правила**:
- Минимум 6-8 фотографий
- Первое фото is_main = true
- Все остальные is_main = false
- sort_order от 1 до N
- alt_text для каждого фото (SEO!)

**SQL паттерн**:
```sql
INSERT INTO public.tour_gallery (tour_id, image_url, alt_text, caption, is_main, sort_order)
SELECT 
  new_tour.id,
  unnest(ARRAY[...]) as image_url,
  unnest(ARRAY[...]) as alt_text,
  unnest(ARRAY[...]) as caption,
  unnest(ARRAY[true, false, false, false]) as is_main,
  unnest(ARRAY[1, 2, 3, 4]) as sort_order
FROM new_tour;
```

### 4. Работа с программой тура

**Для однодневных туров**:
- Используйте day_number для точек маршрута (1, 2, 3...)
- title = название точки
- description = полное описание

**SQL паттерн**:
```sql
INSERT INTO public.tour_itinerary (tour_id, day_number, title, description, sort_order)
SELECT 
  new_tour.id,
  unnest(ARRAY[1, 2, 3, 4, 5]) as day_number,
  unnest(ARRAY[
    'Точка 1: Название',
    'Точка 2: Название',
    -- ...
  ]) as title,
  unnest(ARRAY[
    'Описание точки 1...',
    'Описание точки 2...',
    -- ...
  ]) as description,
  unnest(ARRAY[1, 2, 3, 4, 5]) as sort_order
FROM new_tour;
```

### 5. SEO оптимизация

**При миграции обязательно**:
```sql
meta_title = 'Ключевые слова | Название тура | Phuket Go',
meta_description = 'Описание тура с ключевыми словами, до 160 символов',
tags = ARRAY['тег1', 'тег2', 'тег3']  -- для поиска
```

### 6. Транзакционность

**CTE обеспечивает**:
- Атомарность: либо все, либо ничего
- Связность: tour_id автоматически
- Откат при ошибке

**Структура**:
```sql
WITH new_tour AS (
  INSERT INTO tours (...) VALUES (...) RETURNING id
)
INSERT INTO tour_gallery (tour_id, ...) SELECT new_tour.id, ...;
INSERT INTO tour_itinerary (tour_id, ...) SELECT new_tour.id, ...;
```

### 7. Эффективность работы

**Один запрос vs множество**:
```sql
-- ✅ ПРАВИЛЬНО: Один транзакционный запрос
WITH new_tour AS (...)
INSERT INTO tour_gallery ...,
INSERT INTO tour_itinerary ...;

-- ❌ НЕПРАВИЛЬНО: Три отдельных запроса
INSERT INTO tours ...;
-- получить id
INSERT INTO tour_gallery ...;
INSERT INTO tour_itinerary ...;
```

### 8. Алгоритм работы Claude Sonnet 4.5

```
STEP 1: Понять запрос пользователя
  ↓
STEP 2: Проверить существующие данные (supabase--read-query)
  ↓
STEP 3: Прочитать исходные данные (lov-view)
  ↓
STEP 4: Извлечь и валидировать данные
  ↓
STEP 5: Подготовить SQL миграцию с CTE
  ↓
STEP 6: Вызвать supabase--migration
  ↓
STEP 7: Дождаться одобрения пользователя
  ↓
STEP 8: После выполнения проверить результат
  ↓
STEP 9: Сообщить пользователю о завершении
```

### 9. Отладка и траблшутинг

**Проверка данных**:
```sql
-- Подсчет туров
SELECT COUNT(*) FROM public.tours WHERE is_active = true;

-- Туры без фотографий
SELECT t.slug, t.title 
FROM public.tours t
LEFT JOIN public.tour_gallery g ON t.id = g.tour_id
WHERE g.id IS NULL;

-- Туры без программы
SELECT t.slug, t.title
FROM public.tours t
LEFT JOIN public.tour_itinerary i ON t.id = i.tour_id
WHERE i.id IS NULL;

-- Дубликаты slug
SELECT slug, COUNT(*) 
FROM public.tours 
GROUP BY slug 
HAVING COUNT(*) > 1;
```

### 10. Безопасность и RLS

**Текущие политики**:
- tours: Чтение для всех активных туров
- tour_gallery: Чтение для всех
- tour_itinerary: Чтение для всех
- bookings: Создание для всех, чтение своих

**Важно**: Не изменять RLS без явного запроса!

---

## Примеры успешных миграций

### Пример 1: Простой тур без программы

```sql
WITH new_tour AS (
  INSERT INTO public.tours (
    title, slug, description, price_adult, price_child, 
    currency, duration, group_size, is_active
  ) VALUES (
    'Простой тур',
    'simple-tour',
    'Описание тура',
    2000, 1000,
    'THB', '1 день', 'до 20 человек', true
  ) RETURNING id
)
INSERT INTO public.tour_gallery (tour_id, image_url, alt_text, is_main, sort_order)
SELECT new_tour.id, unnest(ARRAY['url1', 'url2']), 
       unnest(ARRAY['alt1', 'alt2']),
       unnest(ARRAY[true, false]),
       unnest(ARRAY[1, 2])
FROM new_tour;
```

### Пример 2: Тур с полной программой

```sql
WITH new_tour AS (
  INSERT INTO public.tours (
    -- все поля...
  ) VALUES (...) RETURNING id
)
-- галерея
INSERT INTO tour_gallery (...) SELECT ...,
-- программа
INSERT INTO tour_itinerary (
  tour_id, day_number, title, description, sort_order
) SELECT 
  new_tour.id,
  unnest(ARRAY[1, 2, 3, 4, 5, 6, 7, 8]),
  unnest(ARRAY['День 1', 'День 2', ...]),
  unnest(ARRAY['Описание 1', 'Описание 2', ...]),
  unnest(ARRAY[1, 2, 3, 4, 5, 6, 7, 8])
FROM new_tour;
```

---

## Заключение

### Ключевые принципы миграции

1. **Полнота данных**: Все фото, вся программа, все массивы
2. **Атомарность**: Используем CTE для транзакционности
3. **Валидация**: Проверяем до и после миграции
4. **Безопасность**: Не удаляем существующие данные без подтверждения
5. **SEO**: Всегда заполняем meta_title, meta_description, alt_text
6. **Качество**: Минимум 6-8 фотографий для каждого тура

### Контрольные вопросы перед миграцией

- [ ] Понимаю ли я структуру всех трех таблиц?
- [ ] Проверил ли я наличие тура в БД?
- [ ] Извлек ли я ВСЕ данные из TypeScript?
- [ ] Подготовил ли я ВСЕ фотографии?
- [ ] Корректно ли экранированы апострофы?
- [ ] Использую ли я CTE для связи данных?
- [ ] Готов ли SQL к выполнению?

### Поддержка

При возникновении проблем:
1. Проверьте SQL синтаксис
2. Используйте `supabase--linter` для проверки
3. Проверьте логи миграции
4. Валидируйте данные после миграции

---

**Дата создания**: 2025-10-07  
**Версия**: 1.0  
**Для**: Claude Sonnet 4.5 и других AI агентов
