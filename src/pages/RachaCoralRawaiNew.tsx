import { TourPageTemplate } from '@/components/TourPageTemplate';
import { rachaCoralRawaiTourData } from '@/data/tours/racha-coral-rawai';
import { rachaCoralRawaiRoutePoints } from '@/data/routes/racha-coral-rawai-route';

const RachaCoralRawaiNew = () => {
  return (
    <TourPageTemplate
      tourData={rachaCoralRawaiTourData}
      routePoints={rachaCoralRawaiRoutePoints}
    />
  );
};

export default RachaCoralRawaiNew;
