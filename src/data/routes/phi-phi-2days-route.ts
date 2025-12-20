import type { RoutePoint } from "@/types/Tour";

// Маршрутные точки для тура "Пхи-Пхи 2 дня / 1 ночь"
export const phiPhi2DaysRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '06:50',
    description: 'Выезд из отеля, трансфер к причалу'
  },
  {
    name: 'Бухта Майя',
    coordinates: [7.6781, 98.7668],
    type: 'stop',
    time: '09:50',
    description: 'Место съемок фильма "Пляж" с Леонардо ДиКаприо'
  },
  {
    name: 'Лагуна Пиле',
    coordinates: [7.6850, 98.7600],
    type: 'stop',
    time: '10:50',
    description: 'Плавание в лагуне с бирюзовой водой'
  },
  {
    name: 'Пещера Викингов',
    coordinates: [7.6730, 98.7720],
    type: 'stop',
    time: '11:30',
    description: 'Осмотр пещеры с гнёздами ласточек'
  },
  {
    name: 'Остров Бамбу',
    coordinates: [7.7789, 98.7750],
    type: 'stop',
    time: '12:50',
    description: 'Отдых на белоснежном пляже'
  },
  {
    name: 'Пхи-Пхи Дон',
    coordinates: [7.7407, 98.7784],
    type: 'destination',
    time: '14:20',
    description: 'Обед, заселение в отель, огненное шоу'
  },
  {
    name: 'Остров Ранг Яй (День 2)',
    coordinates: [7.8333, 98.4167],
    type: 'stop',
    time: '11:00',
    description: 'Знакомство с жемчужной фермой'
  }
];
