import { TourPageTemplate } from '@/components/TourPageTemplate';
import { fivePearls2DaysTourData } from '@/data/tours/five-pearls-2days';
import { fivePearls2DaysRoutePoints } from '@/data/routes/five-pearls-2days-route';

export default function FivePearls2DaysNew() {
  return (
    <TourPageTemplate
      tourData={fivePearls2DaysTourData}
      routePoints={fivePearls2DaysRoutePoints}
    />
  );
}
