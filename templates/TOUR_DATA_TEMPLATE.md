# Шаблон создания тура в CMS

Теперь мы используем Supabase CMS для создания туров вместо файлов .ts.

## Процесс создания тура:

1. **Получение данных с сайта**:
   - Используйте `lov-fetch-website` для получения данных с phuketgo.aaddaa.com
   - Изучите полный контент: название, описание, цены, галерею

2. **Создание тура в CMS**:
   ```sql
   INSERT INTO public.tours (
     title,              -- "Название тура"
     subtitle,           -- "Короткий подзаголовок тура"
     slug,               -- "tour-slug" (для URL)
     description,        -- Полное описание из сайта
     short_description,  -- Краткое описание для карточек
     price_adult,        -- Цена взрослый (число)
     price_child,        -- Цена ребёнок (число) 
     currency,           -- "THB"
     duration,           -- "1 день (9:00-17:00)"
     group_size,         -- "до 30 человек"
     difficulty_level,   -- "легкий"/"средний"/"сложный"
     highlights,         -- ARRAY[...] главные особенности
     included,           -- ARRAY[...] что включено
     excluded,           -- ARRAY[...] что не включено  
     requirements,       -- ARRAY[...] что взять с собой
     important_info,     -- ARRAY[...] важная информация
     meta_title,         -- SEO заголовок
     meta_description,   -- SEO описание
     tags,               -- ARRAY[...] теги для поиска
     is_active,          -- true
     is_featured,        -- true/false
     sort_order          -- число для сортировки
   ) VALUES (...);
   ```

3. **Добавление галереи**:
   ```sql
   INSERT INTO public.tour_gallery (
     tour_id, image_url, alt_text, caption, is_main, sort_order
   ) SELECT t.id, 'https://...', '...', '...', true, 1
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
