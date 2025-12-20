import { RoutePoint } from '@/types/Tour';

export const krabiSecretsRoutePoints: RoutePoint[] = [
  {
    name: 'Отель',
    coordinates: [7.8804, 98.3923] as [number, number],
    type: 'start' as const,
    time: '05:00-06:00',
    description: 'Выезд из отеля'
  },
  {
    name: 'Лесной парк Банг Кхрам',
    coordinates: [7.9242, 99.2716] as [number, number],
    type: 'stop' as const,
    time: '09:00',
    description: 'Прибытие в уникальный лесной парк с древними тропическими деревьями'
  },
  {
    name: 'Изумрудное озеро (Sa Morakot)',
    coordinates: [7.9254, 99.2728] as [number, number],
    type: 'stop' as const,
    time: '09:30',
    description: 'Купание в знаменитом Изумрудном озере с теплой минеральной водой'
  },
  {
    name: 'Голубое озеро (Blue Pool)',
    coordinates: [7.9267, 99.2741] as [number, number],
    type: 'stop' as const,
    time: '10:10',
    description: 'Фотопауза у мистического Голубого озера с бирюзовой водой'
  },
  {
    name: 'Горячий водопад и термальные источники',
    coordinates: [7.9198, 99.2656] as [number, number],
    type: 'stop' as const,
    time: '10:50',
    description: 'Природный SPA: горячий водопад и термальные ванны посреди джунглей'
  },
  {
    name: 'Обед',
    coordinates: [8.0856, 98.9089] as [number, number],
    type: 'stop' as const,
    time: '11:40',
    description: 'Обед в уютном местном кафе с традиционной тайской кухней'
  },
  {
    name: 'Храм Пещера Тигра (Tiger Cave Temple)',
    coordinates: [8.1216, 98.9187] as [number, number],
    type: 'stop' as const,
    time: '13:20',
    description: '1260 ступеней к вершине или прогулка по пещерному монастырю внизу'
  },
  {
    name: 'Встреча со слоником',
    coordinates: [8.0624, 98.9156] as [number, number],
    type: 'stop' as const,
    time: '16:00',
    description: 'Кормление слоника и трогательная встреча'
  },
  {
    name: 'Поющая пещера Klong Cave',
    coordinates: [8.0489, 98.9234] as [number, number],
    type: 'stop' as const,
    time: '17:00',
    description: 'Самая большая пещера Краби с музыкальными сталактитами'
  },
  {
    name: 'Отель',
    coordinates: [7.8804, 98.3923] as [number, number],
    type: 'destination' as const,
    time: '17:40',
    description: 'Возвращение в отель'
  }
];
