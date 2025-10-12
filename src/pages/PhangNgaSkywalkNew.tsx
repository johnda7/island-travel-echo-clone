import { TourPageTemplate } from '@/components/TourPageTemplate';
import { phangNgaSkywalkTourData } from '@/data/tours/phang-nga-skywalk';
import { phangNgaSkywalkRoutePoints } from '@/data/routes/phang-nga-skywalk-route';

const PhangNgaSkywalkNew = () => {
  return (
    <TourPageTemplate
      tourData={phangNgaSkywalkTourData}
      routePoints={phangNgaSkywalkRoutePoints}
    />
  );
};

export default PhangNgaSkywalkNew;
