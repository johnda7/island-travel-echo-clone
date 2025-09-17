import { useParams } from "react-router-dom";
import { tours } from "@/data/tours";
import NotFound from "@/pages/NotFound";
import { TourTemplate } from "./TourTemplate";

export function TourPage() {
  const { tourId } = useParams<{ tourId: string }>();
  
  const tour = tours.find(t => t.id === tourId);
  
  if (!tour) {
    return <NotFound />;
  }

  return <TourTemplate tour={tour} />;
}