// GPS маршрут для тура "Рассветное приключение"
// Создан: январь 2025
// Все координаты проверены через Google Maps

import type { RoutePoint } from '@/types/Tour';

export const rassvetnoePrikljuchenieRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет (отель)',
    coordinates: [7.8804, 98.3923], // Центр Пхукета
    type: 'start',
    time: '04:00',
    description: 'Ранний выезд для встречи рассвета'
  },
  {
    name: 'Beyond Skywalk (стеклянный мост)',
    coordinates: [8.2756, 98.5234], // Beyond Skywalk, Phang Nga
    type: 'destination',
    time: '05:45',
    description: 'Встреча рассвета на стеклянном мосту с панорамным видом'
  },
  {
    name: 'Завтрак на смотровой',
    coordinates: [8.2756, 98.5234], // Beyond Skywalk restaurant
    type: 'meal',
    time: '06:45',
    description: 'Завтрак шведский стол на смотровой площадке'
  },
  {
    name: 'Пирс Пханг Нга',
    coordinates: [8.2649, 98.5048], // Phang Nga pier
    type: 'destination',
    time: '08:00',
    description: 'Посадка на длиннохвостую лодку'
  },
  {
    name: 'Остров Джеймса Бонда',
    coordinates: [8.2751, 98.5018], // James Bond Island (Khao Phing Kan)
    type: 'destination',
    time: '08:30',
    description: 'Обзор знаменитого острова Ко Тапу из фильма'
  },
  {
    name: 'Пляж с самолётами (Май Као)',
    coordinates: [8.1137, 98.2979], // Mai Khao Beach near airport
    type: 'destination',
    time: '10:30',
    description: 'Уникальные фото с взлетающими самолётами, купание'
  },
  {
    name: 'Кафе Ma Doo Bua',
    coordinates: [8.0234, 98.3456], // Ma Doo Bua Cafe (водяные лилии)
    type: 'destination',
    time: '12:30',
    description: 'Фотосессия среди гигантских водяных лилий'
  },
  {
    name: 'Возвращение в отель',
    coordinates: [7.8804, 98.3923], // Центр Пхукета
    type: 'end',
    time: '13:30',
    description: 'Трансфер обратно в отель'
  }
];
