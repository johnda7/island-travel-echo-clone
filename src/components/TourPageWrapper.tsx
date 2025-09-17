import { useLocation } from "react-router-dom";
import { TourPage } from "@/components/TourPage";
import { getTourById } from "@/data/tours";
import NotFound from "@/pages/NotFound";

export const TourPageWrapper = () => {
  const location = useLocation();
  
  // Извлекаем ID тура из pathname
  const tourId = location.pathname.split('/tours/')[1];
  
  if (!tourId) {
    return <NotFound />;
  }

  const tour = getTourById(tourId);
  
  if (!tour) {
    return <NotFound />;
  }

  return <TourPage tour={tour} />;
};