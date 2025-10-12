import { TourPageTemplate } from "@/components/TourPageTemplate";
import { cheoLanLakeTourData } from "@/data/tours/cheow-lan-lake";
import type { RoutePoint } from "@/types/Tour";

// Маршрутные точки для карты (можно вынести в отдельный файл)
const cheoLanRoutePoints: RoutePoint[] = [
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923],
    type: 'start',
    time: '06:00',
    description: 'Трансфер из отеля'
  },
  {
    name: 'Самет Нангше',
    coordinates: [8.2847, 98.6094],
    type: 'stop',
    time: '08:00',
    description: 'Смотровая площадка с видом на залив'
  },
  {
    name: 'Озеро Чео Лан',
    coordinates: [8.9167, 98.8333],
    type: 'stop',
    time: '11:20',
    description: 'Сафари на лодке, рыбалка, обед'
  },
  {
    name: 'Храм Банг Тонг',
    coordinates: [8.7500, 98.7000],
    type: 'destination',
    time: '16:20',
    description: 'Храм с монахом-художником'
  }
];

const CheoLanLake = () => {
  return (
    <TourPageTemplate 
      tourData={cheoLanLakeTourData}
      routePoints={cheoLanRoutePoints}
      breadcrumbCategory="Туры"
      breadcrumbCategoryLink="/tours?category=adventure"
    />
  );
};

export default CheoLanLake;
