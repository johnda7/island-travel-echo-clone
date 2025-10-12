// GPS маршрут для тура "11 островов Мега"
// Создан: январь 2025

import type { RoutePoint } from '@/types/Tour';

export const elevenIslandsMegaRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет (отель)',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '07:30',
    description: 'Ранняя встреча, трансфер на пристань'
  },
  {
    name: 'Остров Кай Ной',
    coordinates: [7.9045, 98.4156],
    type: 'destination',
    time: '08:30',
    description: 'Первый снорклинг точка'
  },
  {
    name: 'Остров Кай Най',
    coordinates: [7.9189, 98.4289],
    type: 'destination',
    time: '09:15',
    description: 'Белый песок, кристальная вода'
  },
  {
    name: 'Остров Рача Яй - бухта Сиам',
    coordinates: [7.6134, 98.3712],
    type: 'destination',
    time: '10:30',
    description: 'Лучший снорклинг на Рача'
  },
  {
    name: 'Остров Рача Яй - бухта Кон Ка',
    coordinates: [7.5923, 98.3645],
    type: 'destination',
    time: '11:15',
    description: 'Уединённая бухта с коралловыми рифами'
  },
  {
    name: 'Обед на яхте',
    coordinates: [7.6012, 98.3689],
    type: 'meal',
    time: '12:30',
    description: 'Премиум обед с морепродуктами'
  },
  {
    name: 'Коралловый остров - пляж Банана',
    coordinates: [7.7512, 98.3534],
    type: 'destination',
    time: '14:00',
    description: 'Водные развлечения, парасейлинг'
  },
  {
    name: 'Остров Мэй (Mai Thon)',
    coordinates: [7.6523, 98.3123],
    type: 'destination',
    time: '15:00',
    description: 'Частный остров, VIP зона'
  },
  {
    name: 'Панорама 11 островов + закат',
    coordinates: [7.7089, 98.3445],
    type: 'destination',
    time: '16:30',
    description: 'Смотровая площадка, закат над Андаманским морем'
  },
  {
    name: 'Возвращение в отель',
    coordinates: [7.8804, 98.3923],
    type: 'end',
    time: '18:30',
    description: 'Трансфер обратно в отель'
  }
];
