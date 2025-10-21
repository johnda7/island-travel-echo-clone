import { TourPageTemplate } from '@/components/TourPageTemplate';
import { raftingSpa1DayTourData } from '@/data/tours/rafting-spa-1day';

export function RaftingSpa1DayNew() {
  return <TourPageTemplate tourData={raftingSpa1DayTourData} />;
}
