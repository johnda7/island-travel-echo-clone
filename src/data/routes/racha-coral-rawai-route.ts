import { RoutePoint } from '@/types/Tour';

export const rachaCoralRawaiRoutePoints: RoutePoint[] = [
  {
    name: "Пирс Rawai Beach",
    coordinates: [7.7750, 98.3250],
    type: "start",
    time: "09:00",
    description: "Отправление на лодке с пляжа Раваи"
  },
  {
    name: "Остров Рача Яй",
    coordinates: [7.6033, 98.3703],
    type: "stop",
    time: "10:00-11:30",
    description: "Снорклинг, отдых на пляже, плавание среди рыб"
  },
  {
    name: "Coral Beach Club (остров Кора)",
    coordinates: [7.7361, 98.4089],
    type: "stop",
    time: "12:30-15:45",
    description: "Обед «шведский стол», пляж, снорклинг, водные развлечения"
  },
  {
    name: "Пирс Rawai Beach",
    coordinates: [7.7750, 98.3250],
    type: "destination",
    time: "16:00",
    description: "Прибытие на пирс и трансфер в отель"
  },
];
