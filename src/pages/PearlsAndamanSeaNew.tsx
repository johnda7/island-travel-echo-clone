import { TourPageTemplate } from '@/components/TourPageTemplate';
import { pearlsAndamanSeaTourData } from '@/data/tours/pearls-andaman-sea';
import { pearlsAndamanSeaRoute } from '@/data/routes/pearls-andaman-sea-route';

const PearlsAndamanSeaNew = () => {
  return (
    <TourPageTemplate
      tourData={pearlsAndamanSeaTourData}
      routePoints={pearlsAndamanSeaRoute}
    />
  );
};

export default PearlsAndamanSeaNew;
