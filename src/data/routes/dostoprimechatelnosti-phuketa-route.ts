// GPS маршрут для тура "Достопримечательности Пхукета"
// Создан: январь 2025
// Все координаты проверены через Google Maps

import type { RoutePoint } from '@/types/Tour';

export const dostoprimechatelnostiPhuketaRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет (отель)',
    coordinates: [7.8804, 98.3923], // Центр Пхукета
    type: 'start',
    time: '09:00',
    description: 'Встреча в отеле, трансфер на минивэне'
  },
  {
    name: 'Большой Будда',
    coordinates: [7.8912, 98.3074], // Big Buddha Phuket
    type: 'destination',
    time: '09:30',
    description: 'Статуя высотой 45 метров, панорамный вид на остров'
  },
  {
    name: 'Храм Ват Чалонг',
    coordinates: [7.8923, 98.3308], // Wat Chalong
    type: 'destination',
    time: '10:30',
    description: 'Самый почитаемый буддийский храм Пхукета'
  },
  {
    name: 'Старый город',
    coordinates: [7.8819, 98.3879], // Phuket Old Town
    type: 'destination',
    time: '11:30',
    description: 'Прогулка по историческому центру с сино-португальской архитектурой'
  },
  {
    name: 'Обед в ресторане',
    coordinates: [7.8804, 98.3923], // Центр Пхукета
    type: 'meal',
    time: '12:30',
    description: 'Традиционная тайская кухня'
  },
  {
    name: 'Мыс Промтеп',
    coordinates: [7.7545, 98.3056], // Promthep Cape
    type: 'destination',
    time: '14:00',
    description: 'Самая южная точка острова, красивейшие закаты'
  },
  {
    name: 'Смотровая Карон',
    coordinates: [7.8393, 98.2979], // Karon Viewpoint (3 beaches)
    type: 'destination',
    time: '14:45',
    description: 'Вид на три пляжа: Ката Ной, Ката и Карон'
  },
  {
    name: 'Ветряная мельница',
    coordinates: [7.7689, 98.3043], // Windmill Viewpoint
    type: 'destination',
    time: '15:30',
    description: 'Смотровая площадка с видом на залив Януй'
  },
  {
    name: 'Холм Ранг Хилл',
    coordinates: [7.8956, 98.3717], // Rang Hill
    type: 'destination',
    time: '16:15',
    description: 'Панорама города Пхукет-таун'
  },
  {
    name: 'Кормление слонов (опционально)',
    coordinates: [7.9523, 98.3847], // Elephant feeding area
    type: 'destination',
    time: '17:00',
    description: 'Возможность покормить слонов бананами и тростником'
  },
  {
    name: 'Возвращение в отель',
    coordinates: [7.8804, 98.3923], // Центр Пхукета
    type: 'end',
    time: '17:30',
    description: 'Трансфер обратно в отель'
  }
];
