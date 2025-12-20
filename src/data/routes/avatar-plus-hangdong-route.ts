// GPS маршрут для тура "Аватар + Хангдонг"
// Создан: январь 2025

import type { RoutePoint } from '@/types/Tour';

export const avatarPlusHangdongRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет (отель)',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '05:30',
    description: 'Ранний выезд'
  },
  {
    name: 'Пещера Khao Sok',
    coordinates: [8.9156, 98.5315],
    type: 'destination',
    time: '08:00',
    description: 'Пещера из фильма Аватар'
  },
  {
    name: 'Водопад Хангдонг',
    coordinates: [8.8976, 98.5423],
    type: 'destination',
    time: '10:30',
    description: 'Купание в изумрудном озере'
  },
  {
    name: 'Обед',
    coordinates: [8.9056, 98.5256],
    type: 'meal',
    time: '12:00',
    description: 'Местная кухня'
  },
  {
    name: 'Возвращение',
    coordinates: [7.8804, 98.3923],
    type: 'end',
    time: '16:00',
    description: 'Трансфер в отель'
  }
];
