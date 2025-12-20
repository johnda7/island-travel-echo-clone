import { useTours } from "@/hooks/useTours";
import { CircleTourCard } from "./CircleTourCard";
import { Flame, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section className="py-8 relative overflow-hidden">
      {/* iOS 26 Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50/50"></div>
      
      <div className="relative container mx-auto px-4">
        {/* Header with Liquid Glass */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF3B30 100%)',
                boxShadow: '0 4px 12px rgba(255, 59, 48, 0.35)'
              }}
            >
              <Flame className="w-4 h-4 text-white" />
            </div>
            <h2 
              className="text-xl md:text-2xl font-bold"
              style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif", color: '#1C1C1E' }}
            >
              Хит продаж
            </h2>
          </div>
          <Link 
            to="/tours"
            className="flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ 
              color: '#007AFF',
              fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" 
            }}
          >
            <span>Все туры</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div 
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {topTours.map((tour, index) => (
            <CircleTourCard
              key={tour.id}
              id={tour.id}
              name={tour.name}
              priceFrom={tour.data?.priceAdult || 0}
              rating={tour.data?.rating || 4.8}
              image={tour.data?.mainImage || tour.data?.gallery?.[0] || ''}
              detailPath={`/tours/${tour.id}`}
              isFirst={index === 0}
            />
          ))}
        </div>
        
        {/* Scroll Indicator Dots */}
        <div className="flex justify-center mt-3 md:hidden">
          <div className="flex gap-1.5">
            {topTours.map((_, index) => (
              <div 
                key={index} 
                className="w-1.5 h-1.5 rounded-full transition-colors"
                style={{ background: index === 0 ? '#007AFF' : 'rgba(0, 0, 0, 0.15)' }}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{".scrollbar-hide::-webkit-scrollbar { display: none; }"}</style>
    </section>
  );
};
