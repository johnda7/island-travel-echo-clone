// Данные для тура "Достопримечательности Пхукета" - созданы по эталону PhiPhi
// 🏛️ ВАЖНО: Все данные взяты с WordPress сайта. Цены актуальные.

import type { TourData } from '@/types/Tour';

// Import images from WordPress - ALL REAL PHOTOS
import bigBuddhaMain from '@/assets/dostoprimechatelnosti-phuketa/big-buddha-viewpoint.jpg';
import watChalongMain from '@/assets/dostoprimechatelnosti-phuketa/wat-chalong-main.jpg';
import watChalong1 from '@/assets/dostoprimechatelnosti-phuketa/wat-chalong-1.jpg';
import watChalong2 from '@/assets/dostoprimechatelnosti-phuketa/wat-chalong-2.jpg';
import oldTownMain from '@/assets/dostoprimechatelnosti-phuketa/old-town-main.jpg';
import oldTown1 from '@/assets/dostoprimechatelnosti-phuketa/old-town-1.jpg';
import promthepMain from '@/assets/dostoprimechatelnosti-phuketa/promthep-cape-main.jpg';
import karonViewpointMain from '@/assets/dostoprimechatelnosti-phuketa/karon-viewpoint-main.jpg';
import karonViewpoint1 from '@/assets/dostoprimechatelnosti-phuketa/karon-viewpoint-1.jpg';
import karonViewpoint2 from '@/assets/dostoprimechatelnosti-phuketa/karon-viewpoint-2.jpg';
import rangHillMain from '@/assets/dostoprimechatelnosti-phuketa/rang-hill-main.jpg';
import rangHill1 from '@/assets/dostoprimechatelnosti-phuketa/rang-hill-1.jpg';
import windmillMain from '@/assets/dostoprimechatelnosti-phuketa/windmill-viewpoint-main.jpg';
import windmill1 from '@/assets/dostoprimechatelnosti-phuketa/windmill-viewpoint-1.jpg';
import windmill2 from '@/assets/dostoprimechatelnosti-phuketa/windmill-viewpoint-2.jpg';
import elephantMain from '@/assets/dostoprimechatelnosti-phuketa/elephant-feeding-main.jpg';
import elephant1 from '@/assets/dostoprimechatelnosti-phuketa/elephant-feeding-1.jpg';

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
  priceAdult: 1000,
  priceChild: 800,
  currency: '฿',

  // Характеристики тура
  duration: '1 день (8 часов)',
  groupSize: 'до 30 человек',
  rating: 4.8,
  reviewsCount: 243,

  // Медиа контент (все РЕАЛЬНЫЕ фото из WordPress)
  mainImage: bigBuddhaMain,
  gallery: [
    bigBuddhaMain,
    watChalongMain,
    watChalong1,
    watChalong2,
    oldTownMain,
    oldTown1,
    promthepMain,
    karonViewpointMain,
    karonViewpoint1,
    karonViewpoint2,
    rangHillMain,
    rangHill1,
    windmillMain,
    windmill1,
    windmill2,
    elephantMain,
    elephant1
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
  schedule: [
    {
      day: "День 1",
      time: "08:00-09:00",
      title: "Трансфер из отеля",
      description: "Встреча в отеле и трансфер в комфортабельном автобусе с кондиционером."
    },
    {
      day: "День 1",
      time: "09:00-10:30",
      title: "Большой Будда",
      description: "Посещение статуи Большого Будды высотой 45 метров. Панорамный вид на остров."
    },
    {
      day: "День 1",
      time: "10:30-12:00",
      title: "Храм Ват Чалонг",
      description: "Самый важный и почитаемый буддийский храм Пхукета. История и архитектура."
    },
    {
      day: "День 1", 
      time: "12:00-13:30",
      title: "Обед",
      description: "Обед в местном ресторане с традиционной тайской кухней."
    },
    {
      day: "День 1",
      time: "13:30-15:00",
      title: "Старый город Пхукета",
      description: "Прогулка по историческому центру с сино-португальской архитектурой."
    },
    {
      day: "День 1",
      time: "15:00-15:30",
      title: "Фабрика кешью",
      description: "Посещение фабрики кешью с дегустацией местных продуктов и орехов."
    },
    {
      day: "День 1",
      time: "15:30-16:30",
      title: "Мыс Промтеп",
      description: "Самая южная точка Пхукета с потрясающим видом на Андаманское море."
    },
    {
      day: "День 1",
      time: "16:30-18:00",
      title: "Возвращение",
      description: "Трансфер обратно в отели. Завершение экскурсии."
    }
  ],
  importantInfo: [
    'В храмах необходимо снимать обувь и соблюдать дресс-код (плечи и колени должны быть закрыты)',
    'Детский билет для детей 4-11 лет. До 3-х лет бесплатно без места в автобусе',
    'Программа может изменяться в зависимости от погодных условий или пробок',
    'В автобусе работает кондиционер - рекомендуется взять легкую куртку',
    'Экскурсия проходит в любую погоду, кроме экстремальных условий',
    'Подходит для людей всех возрастов и физической подготовки',
    'Время посещения достопримечательностей может корректироваться гидом для лучшего освещения'
  ],

  // Не включено в стоимость
  notIncluded: [
    'Трансфер из отдаленных районов (Камала, Сурин, Бангтао) - 300 ฿ с человека',
    'Личные расходы на сувениры и покупки на фабрике кешью',
    'Алкогольные напитки за обедом',
    'Чаевые гиду (по желанию)',
    'Дополнительные экскурсии или активности'
  ],

  // Что взять с собой (как у конкурентов tisland.travel)
  whatToBring: [
    'Удобную обувь для ходьбы (кроссовки или сандалии)',
    'Головной убор и солнцезащитные очки',
    'Солнцезащитный крем SPF 30+',
    'Фотоаппарат или телефон для фото',
    'Небольшую бутылку воды',
    'Легкую куртку или кардиган (в храмах и автобусе кондиционер)',
    'Деньги на личные расходы и покупки',
    'Паспорт или копию паспорта'
  ],
};