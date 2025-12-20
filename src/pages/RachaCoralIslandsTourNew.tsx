import { TourPageTemplate } from '@/components/TourPageTemplate';
import { rachaCoralIslandsTourData } from '@/data/tours/racha-coral-islands';
import { rachaCoralIslandsRoutePoints } from '@/data/routes/racha-coral-islands-route';

const RachaCoralIslandsTourNew = () => {
  return (
    <TourPageTemplate
      tourData={rachaCoralIslandsTourData}
      routePoints={rachaCoralIslandsRoutePoints}
    />
  );
};

export default RachaCoralIslandsTourNew;
