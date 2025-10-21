import type { RoutePoint } from "@/types/Tour";

// 🗺️ GPS МАРШРУТ: СИМИЛАНСКИЕ ОСТРОВА
// Маршрут: Пхукет → Порт Tablemu → Острова Симилан → обратно
export const similanIslandsRoutePoints: RoutePoint[] = [
  {
    name: "Пхукет",
    coordinates: [7.8804, 98.3923],
    type: "start",
    time: "05:30-06:30",
    description: "Трансфер из отеля (1.5 часа до порта Tablemu)"
  },
  {
    name: "Порт Tablemu (Khao Lak)",
    coordinates: [8.7624, 98.2494],
    type: "stop",
    time: "07:30",
    description: "Завтрак на лодке, инструктаж, отплытие к островам"
  },
  {
    name: "Остров №9 - Ко Банг",
    coordinates: [8.6425, 97.6442],
    type: "stop",
    time: "09:00",
    description: "Первый снорклинг - коралловые рифы и тропические рыбы"
  },
  {
    name: "Остров №8 - Симилан",
    coordinates: [8.6267, 97.6383],
    type: "stop",
    time: "10:00",
    description: "Смотровая площадка Sail Rock - потрясающие виды на архипелаг"
  },
  {
    name: "Остров №8 - Пляж",
    coordinates: [8.6267, 97.6383],
    type: "stop",
    time: "11:00",
    description: "Свободное время на белоснежном пляже"
  },
  {
    name: "Обед на лодке",
    coordinates: [8.6200, 97.6350],
    type: "stop",
    time: "12:30",
    description: "Тайский шведский стол, вода, кофе, фрукты"
  },
  {
    name: "Остров №7 - Ко Паю",
    coordinates: [8.5950, 97.6258],
    type: "stop",
    time: "13:30",
    description: "Второй снорклинг - богатая морская жизнь"
  },
  {
    name: "Остров №4 - Ко Мианг",
    coordinates: [8.5300, 97.5950],
    type: "stop",
    time: "14:30",
    description: "Пляж, купание, фотографии"
  },
  {
    name: "Порт Tablemu",
    coordinates: [8.7624, 98.2494],
    type: "stop",
    time: "16:00",
    description: "Возвращение в порт (1.5 часа)"
  },
  {
    name: "Пхукет",
    coordinates: [7.8804, 98.3923],
    type: "stop",
    time: "18:00",
    description: "Трансфер в отель"
  }
];
