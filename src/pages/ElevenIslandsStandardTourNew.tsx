import { TourPageTemplate } from '@/components/TourPageTemplate';
import { elevenIslandsStandardTourData } from '@/data/tours/eleven-islands-standard';
import { elevenIslandsStandardRoutePoints } from '@/data/routes/eleven-islands-standard-route';

const ElevenIslandsStandardTourNew = () => {
  return (
    <TourPageTemplate
      tourData={elevenIslandsStandardTourData}
      routePoints={elevenIslandsStandardRoutePoints}
    />
  );
};

export default ElevenIslandsStandardTourNew;
