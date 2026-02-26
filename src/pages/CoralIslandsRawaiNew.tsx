import { TourPageTemplate } from "@/components/TourPageTemplate";
import { coralIslandsRawaiTourData } from "@/data/tours/coral-islands-rawai";
import type { RoutePoint } from "@/types/Tour";

const routePoints: RoutePoint[] = [
  { name: 'Пирс Раваи', coordinates: [7.7677, 98.3253], type: 'start', time: '08:30', description: 'Встреча на пирсе. Кофе и чай перед отправлением' },
  { name: 'Коралловый остров (Coral Beach)', coordinates: [7.7200, 98.3750], type: 'stop', time: '09:30', description: 'Отдых на белоснежном пляже, купание, водные активности' },
  { name: 'Залив Хин Дам', coordinates: [7.7150, 98.3800], type: 'stop', time: '13:00', description: 'Снорклинг среди кораллов и тропических рыб' },
  { name: 'Пирс Раваи', coordinates: [7.7677, 98.3253], type: 'destination', time: '14:00', description: 'Возвращение на пирс. Трансфер в отель' },
];

export default () => <TourPageTemplate tourData={coralIslandsRawaiTourData} routePoints={routePoints} />;
