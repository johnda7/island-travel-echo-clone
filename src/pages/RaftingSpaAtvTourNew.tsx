import { TourPageTemplate } from '@/components/TourPageTemplate';
import { raftingSpaAtvTourData } from '@/data/tours/rafting-spa-atv';
import { raftingSpaAtvRoutePoints } from '@/data/routes/rafting-spa-atv-route';

const RaftingSpaAtvTourNew = () => {
  return (
    <TourPageTemplate
      tourData={raftingSpaAtvTourData}
      routePoints={raftingSpaAtvRoutePoints}
    />
  );
};

export default RaftingSpaAtvTourNew;
