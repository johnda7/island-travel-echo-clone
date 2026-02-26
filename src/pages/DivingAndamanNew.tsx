import { TourPageTemplate } from "@/components/TourPageTemplate";
import { divingAndamanTourData } from "@/data/tours/diving-andaman";
import type { RoutePoint } from "@/types/Tour";

const routePoints: RoutePoint[] = [
  { name: 'Отели Пхукета', coordinates: [7.8804, 98.3923], type: 'start', time: '07:00', description: 'Трансфер от отеля до пирса' },
  { name: 'Пирс Чалонг', coordinates: [7.8275, 98.3580], type: 'stop', time: '08:30', description: 'Отправление на дайв-боте. Завтрак на борту' },
  { name: 'Дайв-сайт 1', coordinates: [7.7200, 98.3750], type: 'stop', time: '09:30', description: 'Первое погружение — 30–40 минут' },
  { name: 'Дайв-сайт 2', coordinates: [7.7100, 98.3700], type: 'stop', time: '11:30', description: 'Второе погружение — 30–40 минут' },
  { name: 'Отели Пхукета', coordinates: [7.8804, 98.3923], type: 'destination', time: '17:00', description: 'Возвращение в отель' },
];

export default () => <TourPageTemplate tourData={divingAndamanTourData} routePoints={routePoints} />;
