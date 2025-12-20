import { TourPageTemplate } from "@/components/TourPageTemplate";
import { phiPhi2DaysTourData } from "@/data/tours/phi-phi-2days";
import { phiPhi2DaysRoutePoints } from "@/data/routes/phi-phi-2days-route";

// Новая версия страницы Пхи-Пхи с использованием централизованного шаблона
const PhiPhi2Days1NightNew = () => {
  return (
    <TourPageTemplate 
      tourData={phiPhi2DaysTourData}
      routePoints={phiPhi2DaysRoutePoints}
      breadcrumbCategory="Туры"
      breadcrumbCategoryLink="/tours?category=island"
    />
  );
};

export default PhiPhi2Days1NightNew;
