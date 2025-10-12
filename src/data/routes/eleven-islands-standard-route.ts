// GPS маршрут для тура "11 островов Стандарт"
// Создан: январь 2025

import type { RoutePoint } from '@/types/Tour';

export const elevenIslandsStandardRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет (отель)',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '08:00',
    description: 'Встреча в отеле, трансфер на пристань'
  },
  {
    name: 'Остров Кай (Khai Island)',
    coordinates: [7.9123, 98.4234],
    type: 'destination',
    time: '09:00',
    description: 'Снорклинг, пляжный отдых'
  },
  {
    name: 'Остров Рача Яй',
    coordinates: [7.6012, 98.3689],
    type: 'destination',
    time: '10:30',
    description: 'Снорклинг в прозрачной воде'
  },
  {
    name: 'Коралловый остров',
    coordinates: [7.7456, 98.3512],
    type: 'destination',
    time: '11:30',
    description: 'Коралловые рифы, тропические рыбы'
  },
  {
    name: 'Обед на острове',
    coordinates: [7.7456, 98.3512],
    type: 'meal',
    time: '12:30',
    description: 'Морепродукты и тайская кухня'
  },
  {
    name: 'Остров Мэй (Mai Thon Island)',
    coordinates: [7.6523, 98.3123],
    type: 'destination',
    time: '14:00',
    description: 'Уединённый пляж, снорклинг'
  },
  {
    name: 'Панорама 11 островов',
    coordinates: [7.7089, 98.3445],
    type: 'destination',
    time: '15:00',
    description: 'Смотровая площадка с видом на архипелаг'
  },
  {
    name: 'Возвращение в Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'end',
    time: '17:00',
    description: 'Трансфер обратно в отель'
  }
];
