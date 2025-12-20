import type { RoutePoint } from "@/types/Tour";

export const rachaCoralSunriseRoutePoints: RoutePoint[] = [
  {
    name: "Пирс Chalong",
    coordinates: [7.8161, 98.3747],
    type: "start",
    time: "06:00",
    description: "Отправление на спидботе под музыку и с кофе",
  },
  {
    name: "Рассвет в открытом море",
    coordinates: [7.6500, 98.3500],
    type: "stop",
    time: "06:30",
    description: "Волшебный восход солнца в море",
  },
  {
    name: "Остров Рача Яй",
    coordinates: [7.6033, 98.3703],
    type: "stop",
    time: "06:40-10:30",
    description: "Первыми на райском острове: пляж, снорклинг, рыбалка, каякинг",
  },
  {
    name: "Снорклинг точка",
    coordinates: [7.7500, 98.4000],
    type: "stop",
    time: "10:40-11:30",
    description: "Коралловые рифы и морские жители",
  },
  {
    name: "Коралловый остров",
    coordinates: [7.7361, 98.4089],
    type: "stop",
    time: "11:40-14:50",
    description: "Обед на пляже и свободное время",
  },
];

export default rachaCoralSunriseRoutePoints;
