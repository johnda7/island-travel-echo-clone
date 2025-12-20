import { TourPageTemplate } from '@/components/TourPageTemplate';
import { krabiSecretsTourData } from '@/data/tours/krabi-secrets';
import { krabiSecretsRoutePoints } from '@/data/routes/krabi-secrets-route';

export default function KrabiSecretsNew() {
  return <TourPageTemplate tourData={krabiSecretsTourData} routePoints={krabiSecretsRoutePoints} />;
}
