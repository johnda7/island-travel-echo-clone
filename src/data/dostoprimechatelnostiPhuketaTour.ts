// Данные для тура "Достопримечательности Пхукета" - созданы по эталону PhiPhi
// 🏛️ ВАЖНО: Все данные взяты с WordPress сайта. Цены актуальные.

import type { TourData } from '@/types/Tour';
import bigBuddhaMain from '@/assets/dostoprimechatelnosti-phuketa/big-buddha-viewpoint.jpg';

export const dostoprimechatelnostiPhuketaTourData: TourData = {
  // Основные идентификаторы
  id: 'dostoprimechatelnosti-phuketa',
  title: 'Достопримечательности Пхукета',
  subtitle: 'Обзорная экскурсия без шопинга (1 день)',
  description: `Познакомьтесь с главными достопримечательностями Пхукета за один день! Эта обзорная экскурсия без навязчивого шопинга покажет вам самые красивые и значимые места острова.

Вы увидите величественного Большого Будду высотой 45 метров, посетите самый почитаемый храм Ват Чалонг, прогуляетесь по историческому старому городу с его уникальной сино-португальской архитектурой и полюбуетесь панорамными видами с лучших смотровых площадок острова.

Программа идеально подходит для семей с детьми, людей любого возраста и тех, кто хочет получить полное представление о культуре и красоте Пхукета за один день.`,
  route: '/excursion/dostoprimechatelnosti-phuketa',

  // Ценообразование (данные из WordPress)
  priceAdult: 1900,
  priceChild: 1400,
  currency: '฿',

  // Характеристики тура
  duration: '1 день (8 часов)',
  groupSize: 'до 30 человек',
  rating: 4.8,
  reviewsCount: 243,

  // Медиа контент (все РЕАЛЬНЫЕ фото из WordPress)
  mainImage: bigBuddhaMain,
  gallery: [
    '/src/assets/dostoprimechatelnosti-phuketa/big-buddha-viewpoint.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/wat-chalong-main.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/wat-chalong-1.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/wat-chalong-2.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/old-town-main.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/old-town-1.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/promthep-cape-main.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/promthep-cape-1.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/karon-viewpoint-main.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/karon-viewpoint-1.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/karon-viewpoint-2.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/rang-hill-main.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/rang-hill-1.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/windmill-viewpoint-main.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/windmill-viewpoint-1.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/windmill-viewpoint-2.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/elephant-feeding-main.jpg',
    '/src/assets/dostoprimechatelnosti-phuketa/elephant-feeding-1.jpg'
  ],

  // Основные достопримечательности
  highlights: [
    'Большой Будда - символ Пхукета высотой 45 метров',
    'Храм Ват Чалонг - самый почитаемый храм острова',
    'Прогулка по историческому старому городу',
    'Мыс Промтеп - лучшая смотровая площадка для заката',
    'Фабрика кешью с дегустацией местных продуктов',
    'Панорамные виды на весь остров с высоты птичьего полёта'
  ],

  // Программа тура
  itinerary: [
    { day: '1-й день', time: '08:00', activity: 'Трансфер из отеля, начало обзорной экскурсии' },
    { day: '1-й день', time: '09:00', activity: 'Посещение Большого Будды - главной достопримечательности Пхукета' },
    { day: '1-й день', time: '10:30', activity: 'Храм Ват Чалонг - самый важный буддийский храм острова' },
    { day: '1-й день', time: '12:00', activity: 'Обед в местном ресторане тайской кухни' },
    { day: '1-й день', time: '13:30', activity: 'Прогулка по старому городу Пхукета - сино-португальская архитектура' },
    { day: '1-й день', time: '15:00', activity: 'Посещение фабрики кешью с дегустацией местных продуктов' },
    { day: '1-й день', time: '16:30', activity: 'Мыс Промтеп - лучшая смотровая площадка на острове' },
    { day: '1-й день', time: '17:30', activity: 'Трансфер обратно в отель' }
  ],

  // Включено в стоимость
  included: [
    'Трансфер из районов Равай, Найхарн, Ката, Карон, Патонг',
    'Русскоговорящий гид',
    'Обед в местном ресторане тайской кухни',
    'Входные билеты на фабрику кешью',
    'Дегустация местных продуктов',
    'Прохладительные напитки в автобусе',
    'Медицинская страховка'
  ],

  // Не включено в стоимость
  excluded: [
    'Личные расходы на сувениры',
    'Алкогольные напитки',
    'Чаевые гиду (по желанию)',
    'Трансфер из отдаленных районов (Камала, Сурин, Бангтао) - 300 бат с человека'
  ],

  // Что взять с собой
  requirements: [
    'Удобная обувь для прогулок',
    'Защита от солнца: крем с SPF 50+, солнцезащитные очки, головной убор',
    'Легкая одежда, закрывающая плечи и колени для посещения храмов',
    'Телефон, камера для фотографий',
    'Копия паспорта или фото в телефоне',
    'Деньги на личные расходы и сувениры'
  ],

  // Важная информация
  importantInfo: [
    'Детский билет 4-11 лет включительно. До 3-х лет включительно бесплатно',
    'Программа тура может изменяться в зависимости от дорожной ситуации',
    'При посещении храмов необходима закрытая одежда (плечи и колени)',
    'Рекомендуем взять с собой головной убор и солнцезащитный крем',
    'Программа подходит для людей любого возраста'
  ],

  // Категория и теги
  category: 'cultural',
  tags: ['культурные', 'достопримечательности', 'храмы', 'обзорные', '1 день', 'семейный'],
  isPopular: true,

  // Информация о трансфере
  pickupInfo: 'Трансфер включен из районов Равай, Найхарн, Ката, Карон, Патонг. Из отдаленных районов доплата 300 бат с человека.',
  
  // Политика отмены
  cancellationPolicy: 'Бесплатная отмена за 24 часа до начала тура'
};