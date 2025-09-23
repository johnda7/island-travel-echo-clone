-- Обновляем пути к изображениям на оригинальные URL с сайта
UPDATE public.tour_gallery 
SET image_url = CASE 
  WHEN image_url = '/assets/eleven-islands-mega/james-bond-island.jpg' 
    THEN 'https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/james-bond-island-768x1024.jpg'
  WHEN image_url = '/assets/eleven-islands-mega/hong-island.jpg' 
    THEN 'https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/hong-island.jpg'
  WHEN image_url = '/assets/eleven-islands-mega/maya-bay1.jpg' 
    THEN 'https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/maya-bay1-768x1024.jpg'
  WHEN image_url = '/assets/eleven-islands-mega/pileh-lagoon.jpg' 
    THEN 'https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/pileh-lagoon.jpg'
  ELSE image_url
END
WHERE tour_id IN (
  SELECT id FROM public.tours WHERE slug = 'eleven-islands-mega'
);

-- Добавляем остальные изображения с оригинального сайта
INSERT INTO public.tour_gallery (
  tour_id,
  image_url,
  alt_text,
  caption,
  is_main,
  sort_order
)
SELECT 
  t.id,
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/viking-cave.jpg',
  'Пещера викингов с древними наскальными рисунками',
  'Пещера викингов',
  false,
  5
FROM public.tours t 
WHERE t.slug = 'eleven-islands-mega'

UNION ALL

SELECT 
  t.id,
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/koh-panyi-768x1024.jpg',
  'Плавучая деревня морских цыган Паньи',
  'Деревня Паньи',
  false,
  6
FROM public.tours t 
WHERE t.slug = 'eleven-islands-mega'

UNION ALL

SELECT 
  t.id,
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/canoeing-talu-island-576x1024.jpg',
  'Каякинг в мангровых зарослях острова Талу',
  'Каякинг на острове Талу',
  false,
  7
FROM public.tours t 
WHERE t.slug = 'eleven-islands-mega'

UNION ALL

SELECT 
  t.id,
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/phi-phi-don.jpg',
  'Остров Пхи-Пхи-Дон с его живописными бухтами',
  'Остров Пхи-Пхи-Дон',
  false,
  8
FROM public.tours t 
WHERE t.slug = 'eleven-islands-mega';