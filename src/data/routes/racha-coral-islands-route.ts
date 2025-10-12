// GPS маршрут для тура "Остров Рача + Коралловый остров"
// Создан: январь 2025

import type { RoutePoint } from '@/types/Tour';

export const rachaCoralIslandsRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет (отель)',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '07:30',
    description: 'Встреча в отеле, трансфер на пирс'
  },
  {
    name: 'Пирс Чалонг',
    coordinates: [7.8167, 98.3834],
    type: 'destination',
    time: '08:00',
    description: 'Отправление на катере'
  },
  {
    name: 'Остров Рача Яй',
    coordinates: [7.6012, 98.3654],
    type: 'destination',
    time: '09:30',
    description: 'Пляж Pakarang Beach - снорклинг'
  },
  {
    name: 'Залив Siam Bay',
    coordinates: [7.5978, 98.3712],
    type: 'destination',
    time: '11:00',
    description: 'Снорклинг, изучение кораллов'
  },
  {
    name: 'Обед на острове Рача',
    coordinates: [7.6023, 98.3689],
    type: 'meal',
    time: '12:30',
    description: 'Ресторан с видом на море'
  },
  {
    name: 'Коралловый остров (Хе)',
    coordinates: [7.7523, 98.3567],
    type: 'destination',
    time: '14:00',
    description: 'Пляж, снорклинг, водные развлечения'
  },
  {
    name: 'Banana Beach',
    coordinates: [7.7489, 98.3589],
    type: 'destination',
    time: '15:30',
    description: 'Спокойный пляж для отдыха'
  },
  {
    name: 'Возвращение на пирс',
    coordinates: [7.8167, 98.3834],
    type: 'destination',
    time: '16:30',
    description: 'Возвращение на катере'
  },
  {
    name: 'Пхукет (отель)',
    coordinates: [7.8804, 98.3923],
    type: 'end',
    time: '17:30',
    description: 'Трансфер в отель'
  }
];
