# 📘 ГАЙД: Перенос туров в Supabase

## 🎯 Цель
Безопасный перенос данных туров из TypeScript файлов в Supabase базу данных без поломки работающего сайта.

## 🚨 КРИТИЧЕСКИЕ ПРАВИЛА БЕЗОПАСНОСТИ

### ❌ ЗАПРЕЩЕНО:
1. **НЕ удалять** существующие туры из базы
2. **НЕ менять** slug существующих туров (поломаются ссылки!)
3. **НЕ менять** структуру таблиц без миграции
4. **НЕ делать** deploy без тестирования на localhost
5. **НЕ трогать** TypeScript файлы туров (они остаются как источник данных)

### ✅ РАЗРЕШЕНО:
1. **Добавлять** новые туры в базу
2. **Обновлять** данные существующих туров
3. **Тестировать** на localhost перед deploy
4. **Спрашивать** пользователя перед критическими изменениями

---

## 📊 СТРУКТУРА БАЗЫ ДАННЫХ

### Таблица `tours` (основная)
```sql
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,                    -- Название тура
  subtitle TEXT,                           -- Подзаголовок
  slug TEXT NOT NULL UNIQUE,               -- URL-идентификатор (ВАЖНО!)
  description TEXT,                        -- Полное описание
  short_description TEXT,                  -- Краткое описание
  category_id UUID,                        -- Ссылка на категорию
  price_adult INTEGER NOT NULL,            -- Цена для взрослых
  price_child INTEGER NOT NULL,            -- Цена для детей
  currency TEXT DEFAULT 'THB',             -- Валюта
  duration TEXT NOT NULL,                  -- Длительность
  group_size TEXT NOT NULL,                -- Размер группы
  difficulty_level TEXT,                   -- Уровень сложности
  highlights TEXT[],                       -- Основные моменты
  included TEXT[],                         -- Включено в стоимость
  excluded TEXT[],                         -- Не включено
  requirements TEXT[],                     -- Что взять с собой
  important_info TEXT[],                   -- Важная информация
  meta_title TEXT,                         -- SEO title
  meta_description TEXT,                   -- SEO description
  tags TEXT[],                             -- Теги для поиска
  is_active BOOLEAN DEFAULT true,          -- Активен ли тур
  is_featured BOOLEAN DEFAULT false,       -- Показывать на главной
  sort_order INTEGER,                      -- Порядок сортировки
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Таблица `tour_gallery` (фотографии)
```sql
CREATE TABLE tour_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,                 -- URL или путь к изображению
  sort_order INTEGER,                      -- Порядок отображения
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Таблица `tour_itinerary` (программа тура)
```sql
CREATE TABLE tour_itinerary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  day TEXT NOT NULL,                       -- День программы ("1-й день")
  title TEXT NOT NULL,                     -- Заголовок этапа
  description TEXT,                        -- Описание этапа
  time TEXT,                               -- Время (опционально)
  sort_order INTEGER,                      -- Порядок этапов
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🔄 ПРОЦЕСС ПЕРЕНОСА ТУРА

### ШАГ 1: Подготовка данных
1. Открой TypeScript файл тура (например, `src/data/jamesBondIslandTour.ts`)
2. Найди объект `TourData` с данными
3. Проверь наличие всех обязательных полей:
   - title
   - slug (КРИТИЧНО - должен совпадать с id в toursRegistry!)
   - price_adult
   - price_child
   - duration
   - group_size

### ШАГ 2: Создание SQL INSERT для основной таблицы
```sql
-- ШАБЛОН вставки тура
INSERT INTO tours (
  slug,                    -- ИЗ toursRegistry.id
  title,                   -- ИЗ tourData.title
  subtitle,                -- ИЗ tourData.subtitle
  description,             -- ИЗ tourData.description
  price_adult,             -- ИЗ tourData.priceAdult
  price_child,             -- ИЗ tourData.priceChild
  currency,                -- ИЗ tourData.currency
  duration,                -- ИЗ tourData.duration
  group_size,              -- ИЗ tourData.groupSize
  highlights,              -- ИЗ tourData.highlights
  included,                -- ИЗ tourData.included
  excluded,                -- ИЗ tourData.excluded
  requirements,            -- ИЗ tourData.requirements
  important_info,          -- ИЗ tourData.importantInfo
  tags,                    -- ИЗ toursRegistry.tags
  is_active,               -- ИЗ toursRegistry.isActive
  is_featured,             -- ИЗ toursRegistry.isFeatured
  sort_order               -- ИЗ toursRegistry.priority
) VALUES (
  'tour-slug',             -- ВАЖНО: должен совпадать с toursRegistry.id!
  'Название тура',
  'Подзаголовок',
  'Полное описание...',
  2000,                    -- цена взрослый
  1700,                    -- цена детский
  '฿',                     -- валюта
  '1 день (9 часов)',
  'до 40 человек',
  ARRAY['Пункт 1', 'Пункт 2'],           -- highlights
  ARRAY['Трансфер', 'Обед'],             -- included
  ARRAY['Алкоголь', 'Сувениры'],         -- excluded
  ARRAY['Купальник', 'Полотенце'],       -- requirements
  ARRAY['Погода может измениться'],      -- important_info
  ARRAY['активный', 'джунгли'],          -- tags
  true,                    -- is_active
  false,                   -- is_featured
  5                        -- sort_order
) RETURNING id;
```

### ШАГ 3: Добавление фотографий
```sql
-- ПОЛУЧИ tour_id из предыдущего запроса
-- Добавь фотографии в порядке из gallery массива
INSERT INTO tour_gallery (tour_id, image_url, sort_order) VALUES
  ('TOUR_ID_HERE', '/assets/tour/photo1.jpg', 1),
  ('TOUR_ID_HERE', '/assets/tour/photo2.jpg', 2),
  ('TOUR_ID_HERE', '/assets/tour/photo3.jpg', 3);
```

### ШАГ 4: Добавление программы тура
```sql
-- Добавь этапы программы
INSERT INTO tour_itinerary (tour_id, day, title, description, time, sort_order) VALUES
  ('TOUR_ID_HERE', '1-й день', 'Встреча', 'Сбор в отеле...', '08:00', 1),
  ('TOUR_ID_HERE', '1-й день', 'Переезд', 'Дорога к месту...', '09:00', 2);
```

---

## 📋 ЧЕКЛИСТ ПЕРЕД МИГРАЦИЕЙ

### ✅ Обязательные проверки:
- [ ] Прочитал AI_PROMPT_INSTRUCTIONS.md полностью
- [ ] Проверил что slug уникален
- [ ] Проверил что slug совпадает с toursRegistry.id
- [ ] Все обязательные поля заполнены
- [ ] Массивы правильно форматированы (ARRAY[])
- [ ] Цены корректны (числа, не строки)
- [ ] Теги на русском языке
- [ ] Есть резервная копия базы (если возможно)

### ✅ После миграции:
- [ ] Запустил `npm run dev`
- [ ] Проверил тур на localhost
- [ ] Проверил что существующие туры работают
- [ ] Получил одобрение пользователя
- [ ] Только после одобрения делаю deploy

---

## 🔍 ЧАСТЫЕ ОШИБКИ И РЕШЕНИЯ

### ❌ Ошибка: "duplicate key value violates unique constraint"
**Причина:** slug уже существует в базе  
**Решение:** Проверь существующие slug командой:
```sql
SELECT slug FROM tours;
```

### ❌ Ошибка: "malformed array literal"
**Причина:** Неправильный формат массива  
**Решение:** Используй синтаксис PostgreSQL:
```sql
-- ❌ НЕПРАВИЛЬНО
tags: ['тег1', 'тег2']

-- ✅ ПРАВИЛЬНО
tags: ARRAY['тег1', 'тег2']
```

### ❌ Ошибка: "null value in column violates not-null constraint"
**Причина:** Пропущено обязательное поле  
**Решение:** Проверь что все поля с NOT NULL заполнены

---

## 🎯 ПРИМЕР ПОЛНОЙ МИГРАЦИИ

```sql
-- ШАГ 1: Вставка основных данных
INSERT INTO tours (
  slug, title, subtitle, description,
  price_adult, price_child, currency,
  duration, group_size,
  highlights, included, excluded, requirements, important_info,
  tags, is_active, is_featured, sort_order
) VALUES (
  'rafting-spa-atv-1-day',
  'РАФТИНГ + СЛОНОВЬЕ СПА + ATV 1 день',
  'Активное приключение: сплав по реке, слоновье СПА и катание на квадроциклах',
  'Незабываемое приключение в один день: сплав по горной реке...',
  2000, 1700, '฿',
  '1 день (9 часов)', 'до 40 человек',
  ARRAY['Рафтинг 5 км', 'Слоновье СПА', 'ATV квадроциклы'],
  ARRAY['Трансфер', 'Обед', 'Страховка'],
  ARRAY['Алкоголь', 'Сувениры'],
  ARRAY['Купальник', 'Сменная одежда', 'Полотенце'],
  ARRAY['Возможна отмена из-за погоды', 'Дети от 4 лет'],
  ARRAY['рафтинг', 'слоны', 'spa', 'atv', 'приключения', '1 день'],
  true, false, 5
) RETURNING id;

-- ШАГ 2: Вставка фотографий (используй полученный id)
INSERT INTO tour_gallery (tour_id, image_url, sort_order) VALUES
  ('ПОЛУЧЕННЫЙ_ID', '/assets/rafting-spa-atv/rafting21-scaled.jpg', 1),
  ('ПОЛУЧЕННЫЙ_ID', '/assets/rafting-spa-atv/rafting-scaled.jpg', 2);

-- ШАГ 3: Вставка программы
INSERT INTO tour_itinerary (tour_id, day, title, description, time, sort_order) VALUES
  ('ПОЛУЧЕННЫЙ_ID', '1-й день', 'Встреча', 'Трансфер из отеля', '08:00-09:00', 1),
  ('ПОЛУЧЕННЫЙ_ID', '1-й день', 'Рафтинг', 'Сплав по реке 5км', '11:00-12:30', 2);
```

---

## 🎓 ПОЛЕЗНЫЕ SQL КОМАНДЫ

### Проверка существующих туров:
```sql
SELECT id, slug, title, is_active FROM tours ORDER BY sort_order;
```

### Поиск тура по slug:
```sql
SELECT * FROM tours WHERE slug = 'your-tour-slug';
```

### Получение всех фото тура:
```sql
SELECT * FROM tour_gallery WHERE tour_id = 'TOUR_ID' ORDER BY sort_order;
```

### Получение программы тура:
```sql
SELECT * FROM tour_itinerary WHERE tour_id = 'TOUR_ID' ORDER BY sort_order;
```

### Удаление тура (ОСТОРОЖНО!):
```sql
-- Удаляет тур и автоматически все связанные записи из gallery и itinerary
DELETE FROM tours WHERE slug = 'tour-to-delete';
```

### Обновление данных тура:
```sql
UPDATE tours 
SET 
  price_adult = 2200,
  price_child = 1900,
  updated_at = NOW()
WHERE slug = 'tour-slug';
```

---

## 💡 BEST PRACTICES

### 1. Работа с транзакциями
Используй транзакции для безопасности:
```sql
BEGIN;
  -- Твои INSERT/UPDATE запросы
  INSERT INTO tours (...) VALUES (...);
  INSERT INTO tour_gallery (...) VALUES (...);
COMMIT;  -- Или ROLLBACK если что-то пошло не так
```

### 2. Сохрани tour_id для дальнейшего использования
```sql
-- Сохрани результат в переменную
WITH new_tour AS (
  INSERT INTO tours (...) VALUES (...) RETURNING id
)
INSERT INTO tour_gallery (tour_id, image_url, sort_order)
SELECT id, '/path/to/image1.jpg', 1 FROM new_tour
UNION ALL
SELECT id, '/path/to/image2.jpg', 2 FROM new_tour;
```

### 3. Всегда проверяй результат
```sql
-- После вставки проверь данные
SELECT * FROM tours WHERE slug = 'новый-тур-slug';
```

---

## 🚀 WORKFLOW: От TypeScript к Supabase

```
1. Открыть TypeScript файл тура
   ↓
2. Скопировать данные из tourData
   ↓
3. Создать SQL INSERT с RETURNING id
   ↓
4. Выполнить INSERT в tours таблицу
   ↓
5. Получить tour_id из результата
   ↓
6. Вставить фотографии в tour_gallery
   ↓
7. Вставить программу в tour_itinerary
   ↓
8. Проверить данные SELECT запросом
   ↓
9. Тестировать на localhost
   ↓
10. Получить одобрение пользователя
   ↓
11. Deploy на production
```

---

## 📞 ПОМОЩЬ И ВОПРОСЫ

**Если что-то непонятно:**
1. Прочитай AI_PROMPT_INSTRUCTIONS.md заново
2. Проверь примеры в этом гайде
3. Спроси пользователя ПЕРЕД изменениями
4. Не угадывай - лучше спроси!

**Контакты:**
- Telegram: @Phuketga
- Сайт: https://phukeo.com

---

## ✅ ФИНАЛЬНЫЙ ЧЕКЛИСТ

Перед deploy проверь:
- [ ] Все 7 туров добавлены в базу
- [ ] Slug каждого тура уникален
- [ ] Slug совпадает с toursRegistry.id
- [ ] Фотографии загружены для каждого тура
- [ ] Программа добавлена для каждого тура
- [ ] Проверил на localhost - все работает
- [ ] Существующие туры не сломались
- [ ] Получил одобрение от пользователя
- [ ] Создал коммит с понятным описанием

**🎯 ГЛАВНОЕ ПРАВИЛО: Лучше спросить лишний раз, чем сломать работающий сайт!**
