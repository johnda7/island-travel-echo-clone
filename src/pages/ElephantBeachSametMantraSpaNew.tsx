import { TourPageTemplate } from "@/components/TourPageTemplate";
import { elephantBeachSametMantraSpaTourData } from "@/data/tours/elephant-beach-samet-mantra-spa";
import type { RoutePoint } from "@/types/Tour";

const routePoints: RoutePoint[] = [
  {
    name: "Отели Пхукета (сбор)",
    coordinates: [7.8804, 98.3923],
    type: "start",
    time: "07:00–08:00",
    description: "Трансфер от отелей",
  },
  {
    name: "Белый храм",
    coordinates: [8.3450, 98.4130],
    type: "stop",
    time: "09:30",
    description: "Белоснежный храм — архитектура и спокойствие",
  },
  {
    name: "Пляж с самолётами (Mai Khao)",
    coordinates: [8.1750, 98.3030],
    type: "stop",
    time: "11:00",
    description: "Самолёты пролетают над пляжем — адреналин и кадры",
  },
  {
    name: "Пляж слонов",
    coordinates: [8.3900, 98.4800],
    type: "stop",
    time: "12:20",
    description: "Кормление и купание со слонами на пляже",
  },
  {
    name: "Самет Нангше (смотровая)",
    coordinates: [8.3717, 98.4986],
    type: "stop",
    time: "13:30",
    description: "Панорама залива Пханг Нга + обед с видом",
  },
  {
    name: "Mantra Spa",
    coordinates: [8.4200, 98.5100],
    type: "destination",
    time: "15:00",
    description: "Минеральные бассейны, травяные ванны, грязевые процедуры",
  },
  {
    name: "Отели Пхукета (возврат)",
    coordinates: [7.8804, 98.3923],
    type: "destination",
    time: "18:00",
    description: "Возвращение в отель",
  },
];

const ElephantBeachSametMantraSpaNew = () => (
  <TourPageTemplate
    tourData={elephantBeachSametMantraSpaTourData}
    routePoints={routePoints}
  />
);

export default ElephantBeachSametMantraSpaNew;
