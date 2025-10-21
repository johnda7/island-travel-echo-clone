import { TourPageTemplate } from '@/components/TourPageTemplate';
import { phiPhiSunriseTourData } from '@/data/tours/phi-phi-sunrise';
import { phiPhiSunriseRoutePoints } from '@/data/routes/phi-phi-sunrise-route';

const PhiPhiSunriseNew = () => {
  return (
    <TourPageTemplate
      tourData={phiPhiSunriseTourData}
      routePoints={phiPhiSunriseRoutePoints}
    />
  );
};

export default PhiPhiSunriseNew;
