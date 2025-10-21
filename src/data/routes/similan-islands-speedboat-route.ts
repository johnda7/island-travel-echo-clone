import type { RoutePoint } from "@/types/Tour";

// 🗺️ GPS МАРШРУТ: СИМИЛАНСКИЕ ОСТРОВА НА СПИДБОТЕ
// Маршрут: Пхукет → Порт Tab Lamu → 4 острова Симилан → обратно
export const similanIslandsSpeedboatRoutePoints: RoutePoint[] = [
  {
    name: "Пристань Tab Lamu",
    coordinates: [7.8804, 98.3923],
    type: "start",
    time: "06:30-08:30",
    description: "Трансфер из отеля и отправление на спидботе",
  },
  {
    name: "Остров №9 (Ко Банг)",
    coordinates: [8.6667, 97.6433],
    type: "stop",
    time: "10:00-11:00",
    description: "Снорклинг в лагуне Christmas Point среди коралловых садов",
  },
  {
    name: "Остров №8 (Симилан)",
    coordinates: [8.6453, 97.6389],
    type: "stop",
    time: "11:30-12:30",
    description: "Sail Rock - подъём на знаменитую скалу с панорамным видом",
  },
  {
    name: "Остров №7",
    coordinates: [8.6289, 97.6378],
    type: "stop",
    time: "13:00-14:00",
    description: "Тайский обед на пляже и отдых на белоснежном песке",
  },
  {
    name: "Остров №4 (Ко Миенг)",
    coordinates: [8.5967, 97.6511],
    type: "stop",
    time: "14:30-15:30",
    description: "Снорклинг с морскими черепахами в заповедной зоне",
  },
];

export default similanIslandsSpeedboatRoutePoints;
