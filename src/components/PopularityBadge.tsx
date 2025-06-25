
import { TrendingUp, Fire } from "lucide-react";

interface PopularityBadgeProps {
  bookingsToday: number;
}

export const PopularityBadge = ({ bookingsToday }: PopularityBadgeProps) => {
  return (
    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 animate-pulse">
      <Fire className="w-3 h-3" />
      <span>Забронировали сегодня: {bookingsToday}</span>
    </div>
  );
};
