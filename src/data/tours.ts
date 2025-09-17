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
    title: 'Острова Пхи-Пхи 2 дня / 1 ночь',
    description: 'Незабываемое путешествие на острова Пхи-Пхи с ночевкой на острове. Майя Бэй, снорклинг, пляжи и огненное шоу.',
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
      '/src/assets/phi-phi-maya-bay.jpg',
      '/src/assets/phi-phi-lagoon.jpg',
      '/src/assets/phi-phi-speedboat.jpg',
      '/src/assets/phi-phi-snorkeling.jpg',
      '/src/assets/phi-phi-sunset.jpg'
    ],
    route: '/tours/phi-phi-2-days-1-night'
  },
  {
    id: 'james-bond-island',
    title: 'Остров Джеймса Бонда',
    description: 'Экскурсия к знаменитому острову Джеймса Бонда в заливе Пханг Нга. Каноэ, пещеры и живописные виды.',
    duration: '1 день',
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
      { time: '15:00', activity: 'Деревня на воде' },
      { time: '17:00', activity: 'Возвращение' }
    ],
    gallery: [
      '/src/assets/phi-phi-maya-bay.jpg',
      '/src/assets/phi-phi-lagoon.jpg'
    ],
    route: '/tours/james-bond-island'
  },
  {
    id: 'racha-coral-island',
    title: '4 Жемчужины + Коралловый остров',
    description: 'Посещение 4 островов и кораллового острова с парасейлингом и водными развлечениями.',
    duration: '1 день',
    adultPrice: 3000,
    childPrice: 2500,
    includes: [
      'Трансфер из отеля и обратно',
      'Завтрак, обед',
      'Снорклинг оборудование',
      'Входные билеты',
      'Русскоговорящий гид'
    ],
    excludes: [
      'Парасейлинг (дополнительно)',
      'Алкогольные напитки',
      'Личные расходы'
    ],
    schedule: [
      { time: '08:00', activity: 'Трансфер из отеля' },
      { time: '09:30', activity: 'Первый остров' },
      { time: '11:00', activity: 'Снорклинг' },
      { time: '13:00', activity: 'Обед на корабле' },
      { time: '14:30', activity: 'Коралловый остров' },
      { time: '16:30', activity: 'Возвращение' }
    ],
    gallery: [
      '/src/assets/phi-phi-speedboat.jpg',
      '/src/assets/phi-phi-snorkeling.jpg'
    ],
    route: '/tours/racha-coral-island'
  },
  {
    id: '11-islands-standard',
    title: '11 островов Стандарт',
    description: 'Обзорная экскурсия по 11 островам Краби на традиционной длиннохвостой лодке.',
    duration: '1 день',
    adultPrice: 2800,
    childPrice: 2300,
    includes: [
      'Трансфер из отеля и обратно',
      'Завтрак, обед',
      'Длиннохвостая лодка',
      'Входные билеты',
      'Русскоговорящий гид'
    ],
    excludes: [
      'Алкогольные напитки',
      'Личные расходы',
      'Чаевые'
    ],
    schedule: [
      { time: '08:30', activity: 'Трансфер из отеля' },
      { time: '10:00', activity: 'Посадка на лодку' },
      { time: '10:30', activity: 'Первые острова' },
      { time: '13:00', activity: 'Обед' },
      { time: '15:00', activity: 'Продолжение экскурсии' },
      { time: '17:00', activity: 'Возвращение' }
    ],
    gallery: [
      '/src/assets/phi-phi-lagoon.jpg',
      '/src/assets/phi-phi-sunset.jpg'
    ],
    route: '/tours/11-islands-standard'
  }
];

export const getTourById = (id: string): Tour | undefined => {
  return tours.find(tour => tour.id === id);
};
