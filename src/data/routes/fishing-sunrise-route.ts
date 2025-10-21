import type { RoutePoint } from "@/types/Tour";

// 🗺️ GPS МАРШРУТ: МОРСКАЯ РЫБАЛКА НА РАССВЕТЕ
// Маршрут: Пхукет → Точки рыбалки → Остров Рача Яй → обратно
export const fishingSunriseRoutePoints: RoutePoint[] = [
  {
    name: "Пирс Chalong",
    coordinates: [7.8161, 98.3747],
    type: "start",
    time: "07:00",
    description: "Отправление на рыбалку в лучшие утренние часы",
  },
  {
    name: "Точка троллинга",
    coordinates: [7.7500, 98.3500],
    type: "stop",
    time: "07:30-09:30",
    description: "Троллинг - ловля тунца, барракуды, махи-махи",
  },
  {
    name: "Глубоководная точка",
    coordinates: [7.6800, 98.3300],
    type: "stop",
    time: "09:30-11:00",
    description: "Донная рыбалка + проверка крабовых ловушек + подводная охота",
  },
  {
    name: "Остров Рача Яй",
    coordinates: [7.6033, 98.3703],
    type: "stop",
    time: "11:00-13:00",
    description: "Снорклинг, купание, обед на борту из свежего улова",
  },
  {
    name: "Обратный путь",
    coordinates: [7.7000, 98.3600],
    type: "stop",
    time: "13:00-15:00",
    description: "Рыбалка по пути обратно",
  },
];

export default fishingSunriseRoutePoints;
