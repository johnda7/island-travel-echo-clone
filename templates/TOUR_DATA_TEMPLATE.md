# Шаблон создания тура в CMS - СКОРОСТЬ 10X

⚡ **ПРИНЦИП: МАКСИМАЛЬНАЯ СКОРОСТЬ - НЕ ЭКОНОМИТЬ ТОКЕНЫ!**

Теперь мы используем Supabase CMS для создания туров вместо файлов .ts.

## ⚡ ULTRA-FAST процесс создания тура:

1. **БЫСТРОЕ получение данных с сайта**:
   - Используйте `lov-fetch-website` для **МГНОВЕННОГО** получения данных с phuketgo.aaddaa.com
   - **BULK EXTRACT** полный контент: название, описание, цены, галерею **ПАРАЛЛЕЛЬНО**

2. **МАССОВОЕ создание тура в CMS (BULK INSERT)**:
   ```sql
   -- ⚡ SINGLE OPERATION INSERT - НЕ ПО ЧАСТЯМ!
   INSERT INTO public.tours (
     title,              -- "Название тура" **INSTANT**
     subtitle,           -- "Короткий подзаголовок тура" **FAST**
     slug,               -- "tour-slug" (для URL) **AUTO-GENERATED**
     description,        -- Полное описание из сайта **BULK COPY**
     short_description,  -- Краткое описание для карточек **AUTO-EXCERPT**
     price_adult,        -- Цена взрослый (число) **REAL PRICE**
     price_child,        -- Цена ребёнок (число) **REAL PRICE**
     currency,           -- "THB" **CONSTANT**
     duration,           -- "1 день (9:00-17:00)" **FROM SOURCE**
     group_size,         -- "до 30 человек" **FROM SOURCE**
     difficulty_level,   -- "легкий"/"средний"/"сложный" **AUTO-DETECT**
     highlights,         -- ARRAY[...] главные особенности **BULK ARRAY**
     included,           -- ARRAY[...] что включено **MASS INSERT**
     excluded,           -- ARRAY[...] что не включено **BATCH INSERT**
     requirements,       -- ARRAY[...] что взять с собой **INSTANT ARRAY**
     important_info,     -- ARRAY[...] важная информация **FAST ARRAY**
     meta_title,         -- SEO заголовок **AUTO-SEO**
     meta_description,   -- SEO описание **AUTO-META**
     tags,               -- ARRAY[...] теги для поиска **AUTO-TAGS**
     is_active,          -- true **DEFAULT TRUE**
     is_featured,        -- true/false **SMART DEFAULT**
     sort_order          -- число для сортировки **AUTO-INCREMENT**
   ) VALUES (...); -- ⚡ SINGLE MASSIVE INSERT
   ```

3. **ПАРАЛЛЕЛЬНОЕ добавление галереи (BULK GALLERY)**:
   ```sql
   -- 🚀 MASS GALLERY INSERT - ВСЕ ФОТО СРАЗУ
   INSERT INTO public.tour_gallery (
     tour_id, image_url, alt_text, caption, is_main, sort_order
   ) SELECT t.id, unnest(ARRAY['https://img1.jpg', 'https://img2.jpg', ...]), 
            unnest(ARRAY['alt1', 'alt2', ...]), 
            unnest(ARRAY['caption1', 'caption2', ...]),
            unnest(ARRAY[true, false, false, ...]),
            unnest(ARRAY[1, 2, 3, ...])
   FROM public.tours t WHERE t.slug = 'tour-slug';
   ```

4. **Добавление итинерария**:
   ```sql
   INSERT INTO public.tour_itinerary (
     tour_id, day_number, title, description, sort_order
   ) SELECT t.id, 1, 'ДЕНЬ 1', 'Программа дня...', 1
   FROM public.tours t WHERE t.slug = 'tour-slug';
   ```

5. **Удаление старых маршрутов**:
   - Убрать статичные маршруты из App.tsx
   - Тур автоматически использует DynamicTourPage

## Важные моменты:
- **ФОТОГРАФИИ**: ВСЕ фотографии из исходного тура ДОЛЖНЫ быть собраны и добавлены в галерею (минимум 6-8 фото)
- Всегда используйте оригинальные URL изображений с сайта
- Slug должен совпадать с существующими маршрутами
- Цены указывайте как числа (без валюты)
- Все массивы (highlights, included, etc.) заполняйте данными с сайта
- Малыши 0-3 лет обычно бесплатно - указывайте в important_info
