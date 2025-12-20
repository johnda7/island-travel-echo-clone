import { TourPageTemplate } from '@/components/TourPageTemplate';
import { similanIslandsTourData } from '@/data/tours/similan-islands';
import { similanIslandsRoutePoints } from '@/data/routes/similan-islands-route';

const SimilanIslandsNew = () => {
  return (
    <TourPageTemplate
      tourData={similanIslandsTourData}
      routePoints={similanIslandsRoutePoints}
    />
  );
};

export default SimilanIslandsNew;
