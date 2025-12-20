import { TourPageTemplate } from '@/components/TourPageTemplate';
import { phangNgaSametTourData } from '@/data/tours/phang-nga-samet';
import { phangNgaSametRoutePoints } from '@/data/routes/phang-nga-samet-route';

export default function PhangNgaSametNew() {
  return (
    <TourPageTemplate
      tourData={phangNgaSametTourData}
      routePoints={phangNgaSametRoutePoints}
    />
  );
}
