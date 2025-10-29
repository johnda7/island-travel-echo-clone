import { useTours } from "@/hooks/useTours";
import { CircleTourCard } from "./CircleTourCard";

export const FeaturedToursSection = () => {
  const { allTours, loading } = useTours();

  const topTours = allTours
    .filter(tour => tour.isPopular && tour.priority <= 6 && tour.data)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 6);

  if (loading || topTours.length === 0) {
    return null;
  }

  return (
    <section className="py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 
            className="text-[20px] md:text-[24px] font-bold"
            style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif", color: '#1C1C1E' }}
          >
            🔥 ХИТ ПРОДАЖ
          </h2>
          <span 
            className="text-[12px] text-gray-500"
            style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
          >
            Топ-{topTours.length} туров
          </span>
        </div>
        <div 
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {topTours.map((tour) => (
            <CircleTourCard
              key={tour.id}
              id={tour.id}
              name={tour.name}
              priceFrom={tour.data?.priceAdult || 0}
              rating={tour.data?.rating || 4.8}
              image={tour.data?.mainImage || tour.data?.gallery?.[0] || ''}
              detailPath={`/tours/${tour.id}`}
            />
          ))}
        </div>
        <div className="flex justify-center mt-2 md:hidden">
          <div className="flex gap-1.5">
            {topTours.map((_, index) => (
              <div key={index} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>
      </div>
      <style>{\`.scrollbar-hide::-webkit-scrollbar { display: none; }\`}</style>
    </section>
  );
};
