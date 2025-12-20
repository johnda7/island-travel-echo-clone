import { TourPageTemplate } from '@/components/TourPageTemplate';
import { fishingSunriseTourData } from '@/data/tours/fishing-sunrise';
import { fishingSunriseRoutePoints } from '@/data/routes/fishing-sunrise-route';

const FishingSunriseNew = () => {
  return (
    <TourPageTemplate
      tourData={fishingSunriseTourData}
      routePoints={fishingSunriseRoutePoints}
    />
  );
};

export default FishingSunriseNew;
