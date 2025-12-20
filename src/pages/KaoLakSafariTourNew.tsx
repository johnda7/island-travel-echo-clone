import { TourPageTemplate } from '@/components/TourPageTemplate';
import { kaoLakSafariTourData } from '@/data/tours/kao-lak-safari';
import { kaoLakSafariRoutePoints } from '@/data/routes/kao-lak-safari-route';

const KaoLakSafariTourNew = () => {
  return (
    <TourPageTemplate
      tourData={kaoLakSafariTourData}
      routePoints={kaoLakSafariRoutePoints}
    />
  );
};

export default KaoLakSafariTourNew;
