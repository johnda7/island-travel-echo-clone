// GPS маршрут для тура "Сафари в Као Лак"
// Создан: январь 2025

import type { RoutePoint } from '@/types/Tour';

export const kaoLakSafariRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет (отель)',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '07:00',
    description: 'Встреча в отеле, трансфер в Као Лак'
  },
  {
    name: 'Слоновья ферма',
    coordinates: [8.6234, 98.2456],
    type: 'destination',
    time: '09:00',
    description: 'Кормление и купание слонов'
  },
  {
    name: 'Бамбуковый рафтинг',
    coordinates: [8.6389, 98.2578],
    type: 'activity',
    time: '10:30',
    description: 'Сплав на бамбуковых плотах'
  },
  {
    name: 'Обед',
    coordinates: [8.6423, 98.2612],
    type: 'meal',
    time: '12:00',
    description: 'Тайская кухня'
  },
  {
    name: 'Черепашья ферма',
    coordinates: [8.6512, 98.2689],
    type: 'destination',
    time: '13:30',
    description: 'Центр спасения морских черепах'
  },
  {
    name: 'Водопады Као Лак',
    coordinates: [8.6645, 98.2834],
    type: 'destination',
    time: '14:30',
    description: 'Купание в водопадах'
  },
  {
    name: 'Смотровая площадка Sai Rung',
    coordinates: [8.6712, 98.2923],
    type: 'destination',
    time: '15:30',
    description: 'Панорамный вид на побережье'
  },
  {
    name: 'Возвращение в Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'end',
    time: '18:00',
    description: 'Трансфер обратно в отель'
  }
];
