import { TourPageTemplate } from '@/components/TourPageTemplate';
import { similanIslandsEarlyTourData } from '@/data/tours/similan-islands-early';
import { similanIslandsEarlyRoute } from '@/data/routes/similan-islands-early-route';

const SimilanIslandsEarlyNew = () => {
  return (
    <TourPageTemplate
      tourData={similanIslandsEarlyTourData}
      routePoints={similanIslandsEarlyRoute}
    />
  );
};

export default SimilanIslandsEarlyNew;
