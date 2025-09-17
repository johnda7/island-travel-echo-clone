export interface Tour {
  id: string;
  title: string;
  description: string;
  duration: string;
  adultPrice: number;
  childPrice: number;
  includes: string[];
  excludes: string[];
  schedule: Array<{
    time: string;
    activity: string;
  }>;
  gallery: string[];
  route: string;
}

export const tours: Tour[] = [
  {
    id: 'phi-phi-2-days-1-night',
    title: 'Пхи-Пхи 2 дня / 1 ночь',
    description: 'Путешествие на острова Пхи-Пхи с ночёвкой — это уникальная возможность увидеть самые красивые места Андаманского моря.',
    duration: '2 дня / 1 ночь',
    adultPrice: 4000,
    childPrice: 3500,
    includes: [
      'Трансфер из отеля и обратно',
      'Завтрак, обед, ужин',
      'Размещение в отеле на острове',
      'Снорклинг оборудование',
      'Входные билеты в национальный парк',
      'Русскоговорящий гид'
    ],
    excludes: [
      'Алкогольные напитки',
      'Личные расходы',
      'Чаевые'
    ],
    schedule: [
      { time: '07:00', activity: 'Трансфер из отеля' },
      { time: '08:30', activity: 'Прибытие в порт, посадка на лодку' },
      { time: '10:00', activity: 'Остров Пхи-Пхи Лей - Майя Бэй' },
      { time: '11:30', activity: 'Лагуна Пилех - снорклинг' },
      { time: '13:00', activity: 'Обед на острове' },
      { time: '14:30', activity: 'Пляж Лонг Бич' },
      { time: '16:00', activity: 'Заселение в отель' },
      { time: '19:00', activity: 'Ужин и огненное шоу' }
    ],
    gallery: [
      './assets/phi-phi-maya-bay.jpg',
      './assets/phi-phi-lagoon.jpg',
      './assets/phi-phi-speedboat.jpg',
      './assets/phi-phi-snorkeling.jpg',
      './assets/phi-phi-sunset.jpg'
    ],
    route: '/tours/phi-phi-2-days-1-night'
  },
  {
    id: 'phi-phi-islands-speedboat',
    title: 'Острова Пхи-Пхи на спидботе',
    description: 'Отправляйтесь на скоростной лодке к знаменитым островам Пхи-Пхи. Посетите Майя Бей, Пиле Лагуну и насладитесь снорклингом в кристально чистых водах.',
    duration: '8 часов',
    adultPrice: 2890,
    childPrice: 2300,
    includes: [
      'Трансфер из отеля и обратно',
      'Завтрак и обед',
      'Снорклинг оборудование',
      'Входные билеты',
      'Русскоговорящий гид'
    ],
    excludes: [
      'Алкогольные напитки',
      'Личные расходы',
      'Чаевые'
    ],
    schedule: [
      { time: '07:30', activity: 'Трансфер из отеля' },
      { time: '08:30', activity: 'Прибытие в порт' },
      { time: '09:00', activity: 'Отправление на острова' },
      { time: '10:30', activity: 'Майя Бей' },
      { time: '12:00', activity: 'Пиле Лагуна' },
      { time: '13:00', activity: 'Обед на острове' },
      { time: '14:30', activity: 'Обезьяний пляж' },
      { time: '15:30', activity: 'Снорклинг' },
      { time: '17:00', activity: 'Возвращение' }
    ],
    gallery: [
      './assets/phi-phi-speedboat.jpg',
      './assets/phi-phi-maya-bay.jpg',
      './assets/phi-phi-monkey-beach.jpg',
      './assets/phi-phi-snorkeling.jpg'
    ],
    route: '/tours/phi-phi-islands-speedboat'
  },
  {
    id: 'james-bond-island',
    title: 'Остров Джеймса Бонда',
    description: 'Посетите легендарный остров из фильма о Джеймсе Бонде. Каноэ в мангровых зарослях и знакомство с плавучей деревней.',
    duration: '8 часов',
    adultPrice: 2500,
    childPrice: 2000,
    includes: [
      'Трансфер из отеля и обратно',
      'Завтрак, обед',
      'Каноэ по мангровым зарослям',
      'Входные билеты',
      'Русскоговорящий гид'
    ],
    excludes: [
      'Алкогольные напитки',
      'Личные расходы',
      'Чаевые'
    ],
    schedule: [
      { time: '07:30', activity: 'Трансфер из отеля' },
      { time: '09:00', activity: 'Прибытие в порт' },
      { time: '10:30', activity: 'Остров Джеймса Бонда' },
      { time: '12:00', activity: 'Каноэ в пещерах' },
      { time: '13:30', activity: 'Обед' },
      { time: '15:00', activity: 'Плавучая деревня' },
      { time: '17:00', activity: 'Возвращение' }
    ],
    gallery: [
      './assets/phi-phi-maya-bay.jpg',
      './assets/phi-phi-lagoon.jpg'
    ],
    route: '/tours/james-bond-island'
  },
  {
    id: 'coral-island-parasailing',
    title: 'Коралловый остров + Парасейлинг',
    description: 'Активный день на Коралловом острове: парасейлинг, водные виды спорта и релакс на белоснежных пляжах.',
    duration: '6 часов',
    adultPrice: 2200,
    childPrice: 1800,
    includes: [
      'Трансфер из отеля и обратно',
      'Завтрак и обед',
      'Снорклинг оборудование',
      'Входные билеты',
      'Русскоговорящий гид'
    ],
    excludes: [
      'Парасейлинг (дополнительно 1500 бат)',
      'Водные развлечения',
      'Алкогольные напитки',
      'Личные расходы'
    ],
    schedule: [
      { time: '08:00', activity: 'Трансфер из отеля' },
      { time: '09:00', activity: 'Отправление с пирса' },
      { time: '10:00', activity: 'Прибытие на Коралловый остров' },
      { time: '10:30', activity: 'Снорклинг' },
      { time: '13:00', activity: 'Обед на острове' },
      { time: '14:00', activity: 'Парасейлинг (опционально)' },
      { time: '16:00', activity: 'Возвращение' }
    ],
    gallery: [
      './assets/phi-phi-snorkeling.jpg',
      './assets/phi-phi-speedboat.jpg'
    ],
    route: '/tours/coral-island-parasailing'
  },
  {
    id: 'four-pearls-andaman',
    title: '4 жемчужины Андаманского моря',
    description: 'Роскошное двухдневное путешествие по самым красивым и нетронутым уголкам региона с VIP-сервисом.',
    duration: '2 дня / 1 ночь',
    adultPrice: 4700,
    childPrice: 4200,
    includes: [
      'VIP трансфер из отеля и обратно',
      'Все питание (завтрак, обед, ужин)',
      'Размещение в премиум отеле',
      'Профессиональная фотосъемка',
      'Снорклинг оборудование премиум класса',
      'Персональный гид'
    ],
    excludes: [
      'Алкогольные напитки премиум класса',
      'Личные расходы',
      'Чаевые'
    ],
    schedule: [
      { time: 'День 1 - 07:00', activity: 'VIP трансфер из отеля' },
      { time: '08:30', activity: 'Первая жемчужина - секретная лагуна' },
      { time: '10:30', activity: 'Вторая жемчужина - девственный пляж' },
      { time: '13:00', activity: 'Романтический обед на пляже' },
      { time: '15:00', activity: 'Третья жемчужина - коралловые сады' },
      { time: '18:00', activity: 'Заселение в премиум отель' },
      { time: 'День 2 - 09:00', activity: 'Четвертая жемчужина - закрытый остров' },
      { time: '15:00', activity: 'Возвращение' }
    ],
    gallery: [
      './assets/phi-phi-maya-bay.jpg',
      './assets/phi-phi-lagoon.jpg',
      './assets/phi-phi-sunset.jpg',
      './assets/phi-phi-speedboat.jpg'
    ],
    route: '/tours/four-pearls-andaman'
  },
  {
    id: 'racha-yai-island',
    title: 'Остров Рача Яй',
    description: 'Поездка на живописный остров Рача Яй с кристально чистой водой, идеальный для снорклинга и отдыха.',
    duration: '8 часов',
    adultPrice: 2400,
    childPrice: 1900,
    includes: [
      'Трансфер из отеля и обратно',
      'Завтрак и обед',
      'Снорклинг оборудование',
      'Входные билеты',
      'Русскоговорящий гид'
    ],
    excludes: [
      'Алкогольные напитки',
      'Личные расходы',
      'Чаевые'
    ],
    schedule: [
      { time: '07:30', activity: 'Трансфер из отеля' },
      { time: '08:30', activity: 'Отправление с пирса' },
      { time: '09:30', activity: 'Прибытие на остров Рача Яй' },
      { time: '10:00', activity: 'Отдых на пляже Батон Бэй' },
      { time: '12:00', activity: 'Обед' },
      { time: '14:00', activity: 'Снорклинг в бухте Кон Кре' },
      { time: '16:00', activity: 'Возвращение' }
    ],
    gallery: [
      './assets/phi-phi-lagoon.jpg',
      './assets/phi-phi-snorkeling.jpg'
    ],
    route: '/tours/racha-yai-island'
  },
  {
    id: 'maya-bay-sunrise',
    title: 'Майя Бей на рассвете',
    description: 'Эксклюзивная поездка в Майя Бей на рассвете, когда туристов минимум и можно насладиться красотой в тишине.',
    duration: '6 часов',
    adultPrice: 3500,
    childPrice: 2800,
    includes: [
      'Трансфер из отеля и обратно',
      'Легкий завтрак',
      'Снорклинг оборудование',
      'Входные билеты в национальный парк',
      'Русскоговорящий гид',
      'Профессиональная фотосессия'
    ],
    excludes: [
      'Обед',
      'Алкогольные напитки',
      'Личные расходы'
    ],
    schedule: [
      { time: '05:00', activity: 'Трансфер из отеля' },
      { time: '06:00', activity: 'Посадка на скоростную лодку' },
      { time: '06:45', activity: 'Прибытие в Майя Бэй' },
      { time: '07:00', activity: 'Встреча рассвета и фотосессия' },
      { time: '08:30', activity: 'Снорклинг в лагуне' },
      { time: '09:00', activity: 'Возвращение в порт' }
    ],
    gallery: [
      './assets/maya-bay-sunrise.jpg',
      './assets/phi-phi-maya-bay.jpg',
      './assets/phi-phi-lagoon.jpg'
    ],
    route: '/tours/maya-bay-sunrise'
  },
  {
    id: 'koh-phi-phi-leh-lagoon',
    title: 'Пхи-Пхи Ле и лагуна',
    description: 'Исследование острова Пхи-Пхи Ле с посещением знаменитой Изумрудной лагуны и Викинг пещеры.',
    duration: '7 часов',
    adultPrice: 2800,
    childPrice: 2200,
    includes: [
      'Трансфер из отеля и обратно',
      'Обед',
      'Снорклинг оборудование',
      'Входные билеты',
      'Русскоговорящий гид'
    ],
    excludes: [
      'Завтрак',
      'Алкогольные напитки',
      'Личные расходы'
    ],
    schedule: [
      { time: '09:00', activity: 'Трансфер из отеля' },
      { time: '10:00', activity: 'Отправление с пирса' },
      { time: '11:00', activity: 'Изумрудная лагуна' },
      { time: '12:30', activity: 'Викинг пещера' },
      { time: '13:30', activity: 'Обед' },
      { time: '15:00', activity: 'Возвращение' }
    ],
    gallery: [
      './assets/phi-phi-lagoon.jpg',
      './assets/phi-phi-maya-bay.jpg'
    ],
    route: '/tours/koh-phi-phi-leh-lagoon'
  },
  {
    id: '11-islands-mega-tour',
    title: '11 ОСТРОВОВ МЕГА-ТУР | ОДИН ЭПИЧНЫЙ ДЕНЬ',
    description: 'Грандиозный тур на 11 островов за один день: Джеймс Бонд, Пхи-Пхи, Хонг и другие жемчужины Андаманского моря. Каноэ, пещеры, белоснежные пляжи и невероятные фотолокации.',
    duration: 'Полный день (11 часов)',
    adultPrice: 3900,
    childPrice: 3200,
    includes: [
      'Трансфер из отеля и обратно',
      'Завтрак, обед и напитки',
      'Снорклинг оборудование',
      'Каноэ в пещерах',
      'Входные билеты во все парки',
      'Русскоговорящий гид'
    ],
    excludes: [
      'Ужин',
      'Алкогольные напитки',
      'Личные расходы',
      'Чаевые'
    ],
    schedule: [
      { time: '06:30', activity: 'Трансфер из отеля' },
      { time: '08:00', activity: 'Остров Джеймса Бонда' },
      { time: '09:30', activity: 'Каноэ в пещерах' },
      { time: '11:00', activity: 'Острова Пхи-Пхи' },
      { time: '12:30', activity: 'Майя Бей' },
      { time: '13:30', activity: 'Обед на воде' },
      { time: '15:00', activity: 'Остров Хонг' },
      { time: '16:30', activity: 'Последние острова' },
      { time: '18:00', activity: 'Возвращение' }
    ],
    gallery: [
      './assets/phi-phi-maya-bay.jpg',
      './assets/phi-phi-lagoon.jpg',
      './assets/phi-phi-speedboat.jpg',
      './assets/phi-phi-snorkeling.jpg',
      './assets/phi-phi-sunset.jpg'
    ],
    route: '/tours/11-islands-mega-tour'
  },
  {
    id: 'whale-watching-tour',
    title: 'Наблюдение за китами',
    description: 'Уникальная возможность понаблюдать за китами и дельфинами в их естественной среде обитания.',
    duration: '5 часов',
    adultPrice: 3200,
    childPrice: 2600,
    includes: [
      'Трансфер из отеля и обратно',
      'Легкий завтрак',
      'Профессиональный гид-биолог',
      'Оборудование для наблюдения',
      'Сертификат участника'
    ],
    excludes: [
      'Обед',
      'Алкогольные напитки',
      'Личные расходы'
    ],
    schedule: [
      { time: '06:30', activity: 'Трансфер из отеля' },
      { time: '07:30', activity: 'Брифинг и отправление' },
      { time: '08:00', activity: 'Поиск морских животных' },
      { time: '10:30', activity: 'Наблюдение за китами' },
      { time: '12:00', activity: 'Возвращение в порт' }
    ],
    gallery: [
      './assets/phi-phi-sunset.jpg',
      './assets/phi-phi-speedboat.jpg'
    ],
    route: '/tours/whale-watching-tour'
  }
];

export const getTourById = (id: string): Tour | undefined => {
  return tours.find(tour => tour.id === id);
};