import { TourPageTemplate } from '@/components/TourPageTemplate';
import { avatarPlusHangdongTour } from '@/data/tours/avatar-plus-hangdong';
import { avatarPlusHangdongRoutePoints } from '@/data/routes/avatar-plus-hangdong-route';

const AvatarPlusHangdongNew = () => {
  return (
    <TourPageTemplate
      tourData={avatarPlusHangdongTour}
      routePoints={avatarPlusHangdongRoutePoints}
    />
  );
};

export default AvatarPlusHangdongNew;
