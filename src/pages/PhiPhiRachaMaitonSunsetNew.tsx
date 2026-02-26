import { TourPageTemplate } from "@/components/TourPageTemplate";
import { phiPhiRachaMaitonSunsetTourData } from "@/data/tours/phi-phi-racha-maiton-sunset";
import type { RoutePoint } from "@/types/Tour";

const routePoints: RoutePoint[] = [
  {
    name: "Пхукет (пирс)",
    coordinates: [7.7956, 98.3426],
    type: "start",
    time: "08:30",
    description: "Завтрак в лаундже, выход на катамаране",
  },
  {
    name: "Рача Яй",
    coordinates: [7.6083, 98.3667],
    type: "stop",
    time: "09:00",
    description: "Утренний снорклинг и пляжный релакс",
  },
  {
    name: "Пхи-Пхи Дон",
    coordinates: [7.7406, 98.7744],
    type: "stop",
    time: "12:00",
    description: "Обед, обзорная площадка, прогулка",
  },
  {
    name: "Пляж обезьян",
    coordinates: [7.6797, 98.7658],
    type: "stop",
    time: "14:15",
    description: "Наблюдение за обезьянами с лодки",
  },
  {
    name: "Пещера Викингов",
    coordinates: [7.6772, 98.7647],
    type: "stop",
    time: "14:30",
    description: "Древние рисунки и ласточкины гнёзда",
  },
  {
    name: "Лагуна Пиле",
    coordinates: [7.6800, 98.7600],
    type: "stop",
    time: "15:00",
    description: "Изумрудная вода среди скал, купание",
  },
  {
    name: "Майя Бэй",
    coordinates: [7.6778, 98.7656],
    type: "destination",
    time: "16:00",
    description: "Культовая бухта без толп — уходите последними",
  },
  {
    name: "Остров Майтон (на воде)",
    coordinates: [7.7650, 98.4883],
    type: "stop",
    time: "17:45",
    description: "Закатная чилл-вечеринка: горка, бассейн, коктейли, DJ",
  },
  {
    name: "Пхукет (пирс)",
    coordinates: [7.7956, 98.3426],
    type: "start",
    time: "19:00",
    description: "Возвращение, мороженое на пирсе",
  },
];

const PhiPhiRachaMaitonSunsetNew = () => (
  <TourPageTemplate
    tourData={phiPhiRachaMaitonSunsetTourData}
    routePoints={routePoints}
  />
);

export default PhiPhiRachaMaitonSunsetNew;
