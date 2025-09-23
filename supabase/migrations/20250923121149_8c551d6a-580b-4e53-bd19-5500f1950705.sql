-- Создаем тур "Острова Рача и Корал" с правильными данными из оригинального сайта
INSERT INTO public.tours (
  slug,
  title,
  subtitle,
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
  tags,
  category_id,
  is_featured,
  is_active,
  sort_order,
  meta_title,
  meta_description
) VALUES (
  'racha-coral-islands-speedboat',
  'Острова Рача и Корал',
  'Экскурсия на острова Рача за 1 день с обедом',
  'Рача — Коралловые острова с пирса Раваи — 1 день

МАРШРУТ:

08:30 Добро пожаловать на пирс на пляже Раваи. Насладитесь кофе и чаем перед началом путешествия на остров.

09:00 Отправление с пирса Раваи на остров Рача.

10:00 Прибытие на остров Рача. Наслаждайтесь занятиями сноркелингом, разнообразной рыбой и отдыхом на пляже или принятием солнечных ванн.

11:30 Отправление с острова Рача в пляжный клуб Coral Beach Club (остров Кора).

12:30 Прибытие на остров Корал. Обед по системе «шведский стол» с блюдами тайской кухни.

13:30 Проведите время на пляже. Сноркелинг, отдых, солнечные ванны, плавание или водные развлечения (не включено в стоимость) на острове Корал.

15:45 Отправление с острова Корал на пирс.

16:00 Прибытие на пирс Раваи и трансфер обратно в отель.',
  'Посетите два красивейших острова за один день: остров Рача с белоснежными пляжами и остров Корал с водными развлечениями.',
  1300,
  1200,
  'THB',
  '8 часов (08:30-16:00)',
  'До 20 человек',
  'Легкий',
  ARRAY[
    'Два райских острова за один день',
    'Остров Рача с белоснежными пляжами',
    'Сноркелинг среди коралловых рифов',
    'Обед шведский стол на острове Корал',
    'Coral Beach Club на острове Корал',
    'Отправление с пирса Раваи'
  ],
  ARRAY[
    'Трансферы из отеля в оба конца на автобусе с кондиционером',
    'Русско и англоговорящий гид и команда',
    'Страховка',
    'Сбор за посещение национального парка',
    'Кофе и чай на пирсе',
    'Обед шведский стол с блюдами тайской кухни',
    'Прохладительные и безалкогольные напитки',
    'Спасательные жилеты',
    'Маски для сноркелинга'
  ],
  ARRAY[
    'Водные развлечения на острове Корал',
    'Личные расходы',
    'Алкогольные напитки',
    'Чаевые'
  ],
  ARRAY[
    'Купальники и шорты',
    'Рубашки для защиты от солнца',
    'Солнцезащитный крем',
    'Солнцезащитные очки',
    'Шляпы',
    'Наличные на личные расходы',
    'Полотенце'
  ],
  ARRAY[
    'Малыши от 0 до 3 лет путешествуют бесплатно',
    'Тайминг программы носит ориентировочный характер',
    'Экскурсия/Расписание/Время/Маршрут могут быть изменены из-за погодных условий',
    'Водные развлечения оплачиваются отдельно на острове Корал',
    'Отправление с пирса Раваи, а не из порта Чалонг'
  ],
  ARRAY['Острова', 'Сноркелинг', 'Пляжный отдых', 'Однодневный тур', 'Рача', 'Корал'],
  (SELECT id FROM public.tour_categories WHERE slug = 'island-tours'),
  true,
  true,
  3,
  'Острова Рача и Корал - экскурсия на 1 день с обедом | PhuketGo',
  'Посетите острова Рача и Корал за один день. Сноркелинг, пляжный отдых, обед на острове. Цена от 1300 THB. Трансфер включен.'
);

-- Добавляем детализированную программу тура в tour_itinerary
INSERT INTO public.tour_itinerary (
  tour_id,
  day_number,
  title,
  description,
  activities,
  sort_order
) VALUES 
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  1,
  'Встреча на пирсе Раваи',
  'Добро пожаловать на пирс на пляже Раваи. Насладитесь кофе и чаем перед началом путешествия на остров.',
  ARRAY['Встреча с гидом', 'Кофе и чай', 'Инструктаж'],
  1
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  1,
  'Отправление на остров Рача',
  'Отправление с пирса Раваи на остров Рача на комфортабельном катере.',
  ARRAY['Поездка на катере', 'Морские виды'],
  2
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  1,
  'Остров Рача - пляжный отдых',
  'Прибытие на остров Рача. Наслаждайтесь занятиями сноркелингом, разнообразной рыбой и отдыхом на пляже или принятием солнечных ванн.',
  ARRAY['Сноркелинг', 'Пляжный отдых', 'Солнечные ванны', 'Плавание'],
  3
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  1,
  'Переезд на остров Корал',
  'Отправление с острова Рача в пляжный клуб Coral Beach Club на острове Корал.',
  ARRAY['Поездка на катере'],
  4
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  1,
  'Обед на острове Корал',
  'Прибытие на остров Корал. Обед по системе «шведский стол» с блюдами тайской кухни в Coral Beach Club.',
  ARRAY['Обед шведский стол', 'Тайская кухня'],
  5
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  1,
  'Развлечения на острове Корал',
  'Проведите время на пляже. Сноркелинг, отдых, солнечные ванны, плавание или водные развлечения (не включено в стоимость) на острове Корал.',
  ARRAY['Сноркелинг', 'Пляжный отдых', 'Водные развлечения', 'Coral Beach Club'],
  6
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  1,
  'Возвращение',
  'Отправление с острова Корал на пирс Раваи и трансфер обратно в отель.',
  ARRAY['Поездка на катере', 'Трансфер в отель'],
  7
);

-- Добавляем галерею изображений (используем изображения с оригинального сайта)
INSERT INTO public.tour_gallery (
  tour_id,
  image_url,
  alt_text,
  caption,
  is_main,
  sort_order
) VALUES
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/the-coral-beach-club-koh-hey1-scaled.jpg',
  'Coral Beach Club на острове Корал',
  'Главный пляж Coral Beach Club',
  true,
  1
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/the-coral-beach-club-koh-hey2-522x1024.jpg',
  'Пляж на острове Корал',
  'Кристально чистая вода у острова Корал',
  false,
  2
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/the-coral-beach-club-koh-hey4-828x1024.jpg',
  'Обед в ресторане на острове',
  'Ресторан с видом на море',
  false,
  3
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/the-coral-beach-club-koh-hey6-522x1024.jpg',
  'Отдых на пляже острова Корал',
  'Тропический рай с белым песком',
  false,
  4
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/the-coral-beach-club-koh-hey7-519x1024.jpg',
  'Водные развлечения',
  'Водные активности на острове Корал',
  false,
  5
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/the-coral-beach-club-koh-hey8-1024x989.jpg',
  'Панорама острова Корал',
  'Вид с высоты на остров Корал',
  false,
  6
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/the-coral-beach-club-koh-hey9-587x1024.jpg',
  'Пляжные кресла на острове',
  'Комфортный отдых на пляже',
  false,
  7
),
(
  (SELECT id FROM public.tours WHERE slug = 'racha-coral-islands-speedboat'),
  'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/the-coral-beach-club-koh-hey10-520x1024.jpg',
  'Сноркелинг у острова Рача',
  'Подводный мир у острова Рача',
  false,
  8
);