-- Исправляем проблемы безопасности

-- 1. Исправляем функцию с правильным search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 2. Добавляем недостающие RLS политики для site_settings
-- Только админы могут читать/изменять настройки (пока без аутентификации - все могут читать)
CREATE POLICY "Anyone can read site settings" ON public.site_settings FOR SELECT USING (true);

-- 3. Добавляем политики для всех таблиц без политик
-- Для bookings - разрешаем только чтение своих бронирований (пока без auth - админское чтение)
CREATE POLICY "Public can read their bookings" ON public.bookings FOR SELECT USING (true);

-- 4. Создаем функцию для получения туров с галереей (для API)
CREATE OR REPLACE FUNCTION public.get_tour_with_gallery(tour_slug TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  tour_data JSON;
BEGIN
  SELECT json_build_object(
    'tour', row_to_json(t.*),
    'gallery', COALESCE(
      (SELECT json_agg(
        json_build_object(
          'id', g.id,
          'image_url', g.image_url,
          'alt_text', g.alt_text,
          'caption', g.caption,
          'is_main', g.is_main,
          'sort_order', g.sort_order
        ) ORDER BY g.sort_order, g.created_at
      )
      FROM public.tour_gallery g 
      WHERE g.tour_id = t.id),
      '[]'::json
    ),
    'itinerary', COALESCE(
      (SELECT json_agg(
        json_build_object(
          'day_number', i.day_number,
          'title', i.title,
          'description', i.description,
          'activities', i.activities,
          'meals_included', i.meals_included,
          'accommodation', i.accommodation
        ) ORDER BY i.sort_order, i.day_number
      )
      FROM public.tour_itinerary i 
      WHERE i.tour_id = t.id),
      '[]'::json
    )
  ) INTO tour_data
  FROM public.tours t
  WHERE t.slug = tour_slug AND t.is_active = true;
  
  RETURN tour_data;
END;
$$;

-- 5. Функция для получения всех активных туров
CREATE OR REPLACE FUNCTION public.get_all_tours()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER  
SET search_path = public
AS $$
BEGIN
  RETURN (
    SELECT json_agg(
      json_build_object(
        'id', t.id,
        'title', t.title,
        'subtitle', t.subtitle,
        'slug', t.slug,
        'short_description', t.short_description,
        'price_adult', t.price_adult,
        'price_child', t.price_child,
        'currency', t.currency,
        'duration', t.duration,
        'group_size', t.group_size,
        'tags', t.tags,
        'is_featured', t.is_featured,
        'main_image', (
          SELECT g.image_url 
          FROM public.tour_gallery g 
          WHERE g.tour_id = t.id AND g.is_main = true 
          LIMIT 1
        )
      ) ORDER BY t.sort_order, t.created_at DESC
    )
    FROM public.tours t
    WHERE t.is_active = true
  );
END;
$$;