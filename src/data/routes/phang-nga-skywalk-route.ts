// GPS маршрут для тура "Пханг Нга Скайволк"
// Создан: январь 2025

import type { RoutePoint } from '@/types/Tour';

export const phangNgaSkywalkRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет (отель)',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '07:30',
    description: 'Встреча в отеле, трансфер на минивэне'
  },
  {
    name: 'Храм Суван Куха (Пещерный храм)',
    coordinates: [8.1156, 98.5297],
    type: 'destination',
    time: '09:00',
    description: 'Пещерный храм с лежащим Буддой'
  },
  {
    name: 'Водопад Тон Парива',
    coordinates: [8.4523, 98.5891],
    type: 'destination',
    time: '10:00',
    description: 'Живописный водопад в джунглях'
  },
  {
    name: 'Обед в ресторане',
    coordinates: [8.4456, 98.5234],
    type: 'meal',
    time: '12:00',
    description: 'Традиционная тайская кухня'
  },
  {
    name: 'Смотровая площадка Samet Nangshe',
    coordinates: [8.2756, 98.5634],
    type: 'destination',
    time: '13:30',
    description: 'Панорамный вид на залив Пханг Нга'
  },
  {
    name: 'Skywalk на горе Табак Корани',
    coordinates: [8.4589, 98.5312],
    type: 'destination',
    time: '15:00',
    description: 'Стеклянная смотровая площадка на высоте 550м'
  },
  {
    name: 'Дракон-парк (Dragon Crest Mountain)',
    coordinates: [8.4623, 98.5289],
    type: 'destination',
    time: '16:00',
    description: 'Гигантская статуя дракона и смотровая площадка'
  },
  {
    name: 'Возвращение в отель',
    coordinates: [7.8804, 98.3923],
    type: 'end',
    time: '18:30',
    description: 'Трансфер обратно в отель'
  }
];
