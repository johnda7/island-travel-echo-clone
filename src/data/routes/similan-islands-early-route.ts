import type { RoutePoint } from '@/types/Tour';

export const similanIslandsEarlyRoute: RoutePoint[] = [
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '04:00-05:00',
    description: 'Ранний выезд из отеля, прибытие на пирс в 05:30'
  },
  {
    name: 'Порт Tablemu (Khao Lak)',
    coordinates: [8.7624, 98.2494],
    type: 'stop',
    time: '05:30',
    description: 'Завтрак шведский стол, пиво, встреча с гидом'
  },
  {
    name: 'Остров Мианг (№4)',
    coordinates: [8.6400, 97.6500],
    type: 'stop',
    time: '08:00',
    description: 'Пустынные пляжи, белоснежный песок, прогулка по джунглям'
  },
  {
    name: 'Острова Ко Паю (№7) и Ко Ба Нгу (№9)',
    coordinates: [8.6700, 97.6300],
    type: 'stop',
    time: '10:10',
    description: 'Снорклинг в открытом море, морские черепахи'
  },
  {
    name: 'Остров Симилан (№8) - Парусная скала',
    coordinates: [8.6800, 97.6400],
    type: 'stop',
    time: '11:30',
    description: 'Обед ланч-бокс, подъем на Парусную скалу, панорамные виды'
  },
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'destination',
    time: '16:00-17:00',
    description: 'Возвращение на пирс, ужин, трансфер в отель'
  }
];
