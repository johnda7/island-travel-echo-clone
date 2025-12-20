// 🎨 ПЕСОЧНИЦА ДЛЯ ЭКСПЕРИМЕНТОВ СО СТИЛЯМИ
// Здесь можно свободно менять дизайн, потом скопируем в TourPageTemplate.tsx

import { TourPageTemplate } from "@/components/TourPageTemplate";
import { cheoLanLakeTourData } from "@/data/tours/cheow-lan-lake";
import type { RoutePoint } from "@/types/Tour";

// Тестовые точки маршрута
const testRoutePoints: RoutePoint[] = [
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

// 🎯 ЗДЕСЬ ИСПОЛЬЗУЕМ ОБЫЧНЫЙ ШАБЛОН
// Все изменения делаем в TourPageTemplate.tsx
const TemplateSandbox = () => {
  return (
    <TourPageTemplate 
      tourData={cheoLanLakeTourData}
      routePoints={testRoutePoints}
      breadcrumbCategory="🧪 Тест"
      breadcrumbCategoryLink="/sandbox"
    />
  );
};

export default TemplateSandbox;
