import { TourPageTemplate } from '@/components/TourPageTemplate';
import { rassvetnoePrikljuchenieTourData } from '@/data/tours/rassvetnoe-prikljuchenie';
import { rassvetnoePrikljuchenieRoutePoints } from '@/data/routes/rassvetnoe-prikljuchenie-route';

const RassvetnoePrikljuchenieNew = () => {
  return (
    <TourPageTemplate
      tourData={rassvetnoePrikljuchenieTourData}
      routePoints={rassvetnoePrikljuchenieRoutePoints}
    />
  );
};

export default RassvetnoePrikljuchenieNew;
