import { TourPageTemplate } from '@/components/TourPageTemplate';
import { similanIslandsSpeedboatTourData } from '@/data/tours/similan-islands-speedboat';
import { similanIslandsSpeedboatRoutePoints } from '@/data/routes/similan-islands-speedboat-route';

const SimilanIslandsSpeedboatNew = () => {
  return (
    <TourPageTemplate
      tourData={similanIslandsSpeedboatTourData}
      routePoints={similanIslandsSpeedboatRoutePoints}
    />
  );
};

export default SimilanIslandsSpeedboatNew;
