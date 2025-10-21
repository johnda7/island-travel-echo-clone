import type { RoutePoint } from '@/types/Tour';

export const raftingSpa1DayRoute: RoutePoint[] = [
  {
    name: 'Отель (трансфер)',
    time: '06:50',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    description: 'Выезд из отеля, начало приключения'
  },
  {
    name: 'Пещерный храм Суван Куха',
    time: '09:00',
    coordinates: [8.4379, 98.5187],
    type: 'destination',
    description: 'Посещение храма с лежащим Буддой и обезьянами'
  },
  {
    name: 'Парк у озера',
    time: '10:00',
    coordinates: [8.4410, 98.5150],
    type: 'destination',
    description: 'Прогулка по парку с пещерами'
  },
  {
    name: 'Zip Line (Тарзанка)',
    time: '11:00',
    coordinates: [8.4450, 98.5200],
    type: 'destination',
    description: 'Прыжки с тарзанки для разогрева'
  },
  {
    name: 'Начало рафтинга',
    time: '11:30',
    coordinates: [8.4500, 98.5300],
    type: 'destination',
    description: 'Инструктаж и старт сплава по реке 5 км'
  },
  {
    name: 'Финиш рафтинга',
    time: '13:00',
    coordinates: [8.4600, 98.5450],
    type: 'destination',
    description: 'Завершение сплава по джунглям'
  },
  {
    name: 'Обед',
    time: '13:40',
    coordinates: [8.4620, 98.5480],
    type: 'stop',
    description: 'Традиционная тайская кухня'
  },
  {
    name: 'Деревня слонов',
    time: '14:10',
    coordinates: [8.4700, 98.5600],
    type: 'destination',
    description: 'Слоновье СПА: купание и грязевые процедуры'
  },
  {
    name: 'Водопад',
    time: '16:00',
    coordinates: [8.4650, 98.5550],
    type: 'destination',
    description: 'Остановка у живописного водопада'
  },
  {
    name: 'Возвращение в отель',
    time: '16:30',
    coordinates: [7.8804, 98.3923],
    type: 'stop',
    description: 'Отправление обратно в отель'
  }
];
