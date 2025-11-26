import { Link } from "react-router-dom";
import { Star, TrendingUp } from "lucide-react";

interface CircleTourCardProps {
  id: string;
  name: string;
  priceFrom: number;
  rating: number;
  image: string;
  detailPath: string;
  isFirst?: boolean;
}

export const CircleTourCard = ({ 
  id, 
  name, 
  priceFrom, 
  rating, 
  image, 
  detailPath,
  isFirst = false
}: CircleTourCardProps) => {
  return (
    <Link 
      to={detailPath}
      className="flex flex-col items-center flex-shrink-0 w-[120px] group snap-start"
    >
      {/* Image Container with Liquid Glass */}
      <div className="relative w-[108px] h-[108px] mb-2.5">
        {/* Main Image */}
        <div 
          className="absolute inset-0 rounded-[24px] bg-cover bg-center transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
          style={{ 
            backgroundImage: `url('${image}')`,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
          }}
        />
        
        {/* iOS 26 Gradient Overlay */}
        <div 
          className="absolute inset-0 rounded-[24px] transition-opacity duration-300"
          style={{ 
            background: 'linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.4) 100%)'
          }}
        />
        
        {/* Rating Badge - Liquid Glass */}
        <div 
          className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 px-2 py-1 rounded-full"
          style={{ 
            background: 'rgba(255, 204, 0, 0.95)', 
            backdropFilter: 'blur(12px)',
            boxShadow: '0 2px 8px rgba(255, 204, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        >
          <Star className="w-3 h-3 fill-white text-white" />
          <span 
            className="text-[11px] font-bold text-white"
            style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
          >
            {rating}
          </span>
        </div>
        
        {/* #1 Badge for first item */}
        {isFirst && (
          <div 
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full"
            style={{ 
              background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
              boxShadow: '0 2px 8px rgba(0, 122, 255, 0.4)'
            }}
          >
            <TrendingUp className="w-2.5 h-2.5 text-white" />
            <span 
              className="text-[9px] font-bold text-white"
              style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
            >
              ТОП-1
            </span>
          </div>
        )}
        
        {/* Border Glow */}
        <div 
          className="absolute inset-0 rounded-[24px] pointer-events-none"
          style={{ 
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)'
          }}
        />
      </div>
      
      {/* Title */}
      <h3 
        className="text-[12px] font-semibold text-center leading-tight mb-1.5 line-clamp-2 px-1 h-[32px] flex items-center"
        style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif", color: '#1C1C1E' }}
      >
        {name}
      </h3>
      
      {/* Price */}
      <div 
        className="text-[14px] font-bold"
        style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif", color: '#007AFF' }}
      >
        от ฿{priceFrom.toLocaleString()}
      </div>
    </Link>
  );
};
