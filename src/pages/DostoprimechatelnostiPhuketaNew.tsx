import { TourPageTemplate } from '@/components/TourPageTemplate';
import { dostoprimechatelnostiPhuketaTourData } from '@/data/tours/dostoprimechatelnosti-phuketa';
import { dostoprimechatelnostiPhuketaRoutePoints } from '@/data/routes/dostoprimechatelnosti-phuketa-route';

const DostoprimechatelnostiPhuketaNew = () => {
  return (
    <TourPageTemplate
      tourData={dostoprimechatelnostiPhuketaTourData}
      routePoints={dostoprimechatelnostiPhuketaRoutePoints}
    />
  );
};

export default DostoprimechatelnostiPhuketaNew;
