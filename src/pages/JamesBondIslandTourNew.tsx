import { TourPageTemplate } from "@/components/TourPageTemplate";
import { jamesBondIslandTourData } from "@/data/tours/james-bond-island/static";
import { jamesBondRoutePoints } from "@/data/routes/james-bond-route";

const JamesBondIslandTourNew = () => {
  return (
    <TourPageTemplate 
      tourData={jamesBondIslandTourData}
      routePoints={jamesBondRoutePoints}
      breadcrumbCategory="Туры"
      breadcrumbCategoryLink="/tours?category=island"
    />
  );
};

export default JamesBondIslandTourNew;
