// GPS маршрут для тура "Рафтинг + СПА + Квадроциклы"
// Создан: январь 2025

import type { RoutePoint } from '@/types/Tour';

export const raftingSpaAtvRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет (отель)',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '08:00',
    description: 'Встреча в отеле, трансфер'
  },
  {
    name: 'Рафтинг-центр',
    coordinates: [8.0845, 98.4523],
    type: 'destination',
    time: '09:00',
    description: 'Инструктаж по безопасности, выдача снаряжения'
  },
  {
    name: 'Рафтинг 5 км',
    coordinates: [8.0912, 98.4612],
    type: 'activity',
    time: '09:30',
    description: 'Сплав по горной реке (1 час)'
  },
  {
    name: 'Обед',
    coordinates: [8.0845, 98.4523],
    type: 'meal',
    time: '11:30',
    description: 'Тайская кухня в ресторане'
  },
  {
    name: 'Квадроциклы (ATV)',
    coordinates: [8.0756, 98.4389],
    type: 'activity',
    time: '13:00',
    description: 'Поездка на квадроциклах по джунглям (30 минут)'
  },
  {
    name: 'СПА-центр',
    coordinates: [8.0623, 98.4234],
    type: 'destination',
    time: '14:00',
    description: 'Тайский массаж и спа-процедуры (1.5 часа)'
  },
  {
    name: 'Водопад',
    coordinates: [8.0534, 98.4178],
    type: 'destination',
    time: '16:00',
    description: 'Купание в водопаде'
  },
  {
    name: 'Возвращение в отель',
    coordinates: [7.8804, 98.3923],
    type: 'end',
    time: '17:30',
    description: 'Трансфер обратно в отель'
  }
];
