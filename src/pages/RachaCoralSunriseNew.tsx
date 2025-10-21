import { TourPageTemplate } from '@/components/TourPageTemplate';
import { rachaCoralSunriseTourData } from '@/data/tours/racha-coral-sunrise';
import { rachaCoralSunriseRoutePoints } from '@/data/routes/racha-coral-sunrise-route';

const RachaCoralSunriseNew = () => {
  return (
    <TourPageTemplate
      tourData={rachaCoralSunriseTourData}
      routePoints={rachaCoralSunriseRoutePoints}
    />
  );
};

export default RachaCoralSunriseNew;
