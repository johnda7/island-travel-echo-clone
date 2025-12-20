-- Создаем новый тур "Экскурсия на остров Джеймса Бонда"
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
    'Экскурсия на остров Джеймса Бонда',
    'ДЖЕЙМС БОНД КЛАССИК БОЛЬШАЯ ЛОДКА',
    'james-bond-island-phang-nga',
    'Экскурсия по островам Джеймса Бонда на большой лодке в Таиланде — это сочетание удивительной природы, путешествия по национальному парку и катание на каноэ в закрытой лагуне. Подарите себе незабываемое путешествие в самое сердце Пхукета!

В 1974 году "Человек с золотым пистолетом" свел с ума всех фанатов агента 007. С тех пор вышло по меньшей мере 16 фильмов о легендарном спец агенте, а люди все никак не могут забыть потрясающую сцену дуэли главных героев, снятую в Таиланде.

С тех пор мало примечательная известняковая скала Ко Тапу стала символом страны и одним из самых популярных в мире объектов для фотосъемки.

Путешествие начинается с пирса Ао По. После небольшого чаепития и знакомства с гидом все туристы займут свои места на большой лодке, и она отправится в направлении залива Пханг Нга.',
    'Посетите знаменитый остров Джеймса Бонда, каноэ в пещерах острова Панак, обед в деревне на сваях и купание на острове Лава.',
    1900,
    1600,
    'THB',
    '1 день (9:00-17:00)',
    'до 35 человек',
    'легкий',
    ARRAY[
        'Посещение легендарного острова Джеймса Бонда (Ко Тапу)',
        'Каноэ в пещерах острова Панак с сталактитами',
        'Остров Кхао Пинг Кан - место съемок фильма',
        'Обед в деревне Паний на сваях',
        'Купание на острове Лава с чистым пляжем',
        'Путешествие на большой комфортной лодке',
        'Фотосессия на фоне знаменитых скал'
    ],
    ARRAY[
        'Трансфер из отеля и обратно',
        'Обед в деревне на сваях',
        'Страховка от несчастных случаев',
        'Профессиональный гид',
        'Вода, газировка, чай, кофе без ограничения',
        'Морской транспорт на большой лодке',
        'Каноэ для прогулки по пещерам'
    ],
    ARRAY[
        'Личные расходы и сувениры',
        'Дополнительные напитки и алкоголь',
        'Чаевые гидам и команде',
        'Фото и видео услуги'
    ],
    ARRAY[
        'Купальник и сменная одежда',
        'Головной убор и солнцезащитные очки',
        'Солнцезащитный крем (водостойкий)',
        'Пляжное полотенце',
        'Фото/видео камера в водонепроницаемом чехле',
        'Удобная обувь для прогулок'
    ],
    ARRAY[
        'Малыши от 0 до 3 лет проходят бесплатно',
        'Тайминг программы носит ориентировочный характер',
        'Экскурсия может быть отменена из-за погодных условий',
        'Остров Ко Тапу закрыт для высадки - осмотр с лодки',
        'Возможны изменения маршрута по решению капитана'
    ],
    'Экскурсия на остров Джеймса Бонда - классический тур на большой лодке | PhuketGo',
    'Посетите легендарный остров Джеймса Бонда, каноэ в пещерах, обед в деревне на сваях. Цена от 1900 THB. Трансфер включен.',
    ARRAY['морские', 'популярные', 'острова', 'джеймс бонд', 'каноэ', 'пещеры', 'классика'],
    true,
    true,
    5
);

-- Добавляем галерею изображений для тура Джеймса Бонда
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
    'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/img_7909.jpeg',
    'Остров Джеймса Бонда - главное фото',
    'Остров Джеймса Бонда',
    true,
    1
FROM public.tours t 
WHERE t.slug = 'james-bond-island-phang-nga'

UNION ALL

SELECT 
    t.id,
    'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/img_7908-1024x683.jpeg',
    'Залив Пханг Нга с известняковыми скалами',
    'Залив Пханг Нга',
    false,
    2
FROM public.tours t 
WHERE t.slug = 'james-bond-island-phang-nga'

UNION ALL

SELECT 
    t.id,
    'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/img_7904-1024x1022.webp',
    'Каноэ в пещерах острова Панак',
    'Каякинг в пещерах',
    false,
    3
FROM public.tours t 
WHERE t.slug = 'james-bond-island-phang-nga'

UNION ALL

SELECT 
    t.id,
    'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/img_7903-1015x1024.webp',
    'Известняковые скалы и изумрудная вода',
    'Известняковые скалы',
    false,
    4
FROM public.tours t 
WHERE t.slug = 'james-bond-island-phang-nga'

UNION ALL

SELECT 
    t.id,
    'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/img_7902-1024x1018.webp',
    'Большая лодка для экскурсии',
    'Экскурсионная лодка',
    false,
    5
FROM public.tours t 
WHERE t.slug = 'james-bond-island-phang-nga'

UNION ALL

SELECT 
    t.id,
    'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/img_7901-1024x1012.webp',
    'Туристы на острове Кхао Пинг Кан',
    'Остров Кхао Пинг Кан',
    false,
    6
FROM public.tours t 
WHERE t.slug = 'james-bond-island-phang-nga'

UNION ALL

SELECT 
    t.id,
    'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/img_7900-1017x1024.webp',
    'Деревня Паний на сваях',
    'Деревня на сваях',
    false,
    7
FROM public.tours t 
WHERE t.slug = 'james-bond-island-phang-nga'

UNION ALL

SELECT 
    t.id,
    'https://phuketgo.aaddaa.com/wp-content/uploads/2025/07/img_7899-1024x1021.jpg',
    'Пляж острова Лава для купания',
    'Остров Лава',
    false,
    8
FROM public.tours t 
WHERE t.slug = 'james-bond-island-phang-nga';

-- Добавляем итинерарий тура
INSERT INTO public.tour_itinerary (
    tour_id,
    day_number,
    title,
    description,
    sort_order
)
SELECT 
    t.id,
    1,
    'ЭКСКУРСИЯ НА ОСТРОВ ДЖЕЙМСА БОНДА',
    'Полная программа с посещением островов Панак, Джеймса Бонда, Кхао Пинг Кан и Лава с каноэ и купанием',
    1
FROM public.tours t 
WHERE t.slug = 'james-bond-island-phang-nga';