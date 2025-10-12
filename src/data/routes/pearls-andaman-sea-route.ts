import type { RoutePoint } from '@/types/Tour';

export const pearlsAndamanSeaRoute: RoutePoint[] = [
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '07:00',
    description: 'Трансфер из вашего отеля на пирс Royal Marina в Пхукете'
  },
  {
    name: 'Пирс Royal Marina',
    coordinates: [7.8850, 98.3950],
    type: 'stop',
    time: '08:30',
    description: 'Регистрация, легкий завтрак, инструктаж по безопасности'
  },
  {
    name: 'Остров Панак',
    coordinates: [8.2750, 98.5200],
    type: 'stop',
    time: '10:30',
    description: 'Каякинг среди скал и мангровых лесов, исследование пещер и лагун'
  },
  {
    name: 'Остров Джеймса Бонда',
    coordinates: [8.2751, 98.5014],
    type: 'stop',
    time: '12:00',
    description: 'Посещение знаменитой скалы Ко Тапу из фильма о Джеймсе Бонде'
  },
  {
    name: 'Деревня Панья',
    coordinates: [8.2800, 98.5100],
    type: 'stop',
    time: '13:00',
    description: 'Традиционный тайский обед в ресторане плавучей деревни'
  },
  {
    name: 'Пляж Прананг (Райлей)',
    coordinates: [8.0120, 98.8395],
    type: 'stop',
    time: '15:30',
    description: 'Отдых на одном из красивейших пляжей Таиланда с белым песком'
  },
  {
    name: 'Остров Хонг',
    coordinates: [8.0200, 98.8500],
    type: 'stop',
    time: '16:30',
    description: 'Снорклинг в изумрудной лагуне, окруженной отвесными скалами'
  },
  {
    name: 'Пхи-Пхи Дон',
    coordinates: [7.7407, 98.7784],
    type: 'destination',
    time: '17:30',
    description: 'Размещение в отеле на острове Пхи-Пхи, свободное время'
  },
  // ДЕНЬ 2
  {
    name: 'Бухта Майя Бэй',
    coordinates: [7.6781, 98.7668],
    type: 'stop',
    time: '08:30',
    description: 'Посещение легендарной бухты из фильма "Пляж" с Леонардо ДиКаприо'
  },
  {
    name: 'Лагуна Пиле',
    coordinates: [7.6850, 98.7600],
    type: 'stop',
    time: '09:30',
    description: 'Плавание в изумрудной лагуне с кристально чистой водой'
  },
  {
    name: 'Пляж с обезьянами',
    coordinates: [7.6910, 98.7700],
    type: 'stop',
    time: '10:30',
    description: 'Знакомство с дикими обезьянами на их пляже'
  },
  {
    name: 'Остров Бамбу',
    coordinates: [7.7621, 98.7567],
    type: 'stop',
    time: '11:30',
    description: 'Снорклинг и отдых на белоснежном пляже острова Бамбу'
  },
  {
    name: 'Остров Кай',
    coordinates: [7.7300, 98.7700],
    type: 'stop',
    time: '14:00',
    description: 'Последний снорклинг среди разноцветных рыб и кораллов'
  },
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'destination',
    time: '18:00',
    description: 'Возвращение в отель'
  }
];
