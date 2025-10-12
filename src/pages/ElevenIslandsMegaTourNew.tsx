import { TourPageTemplate } from '@/components/TourPageTemplate';
import { elevenIslandsMegaTourData } from '@/data/tours/eleven-islands-mega';
import { elevenIslandsMegaRoutePoints } from '@/data/routes/eleven-islands-mega-route';

const ElevenIslandsMegaTourNew = () => {
  return (
    <TourPageTemplate
      tourData={elevenIslandsMegaTourData}
      routePoints={elevenIslandsMegaRoutePoints}
    />
  );
};

export default ElevenIslandsMegaTourNew;
