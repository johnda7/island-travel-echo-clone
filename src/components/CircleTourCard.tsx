import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface CircleTourCardProps {
  id: string;
  name: string;
  priceFrom: number;
  rating: number;
  image: string;
  detailPath: string;
}

export const CircleTourCard = ({ 
  id, 
  name, 
  priceFrom, 
  rating, 
  image, 
  detailPath 
}: CircleTourCardProps) => {
  return (
    <Link 
      to={detailPath}
      className="flex flex-col items-center flex-shrink-0 w-[110px] group"
    >
      <div className="relative w-[100px] h-[100px] mb-2">
        <div 
          className="absolute inset-0 rounded-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div 
          className="absolute inset-0 rounded-full transition-opacity duration-300 group-hover:opacity-70"
          style={{ background: 'linear-gradient(180deg, rgba(0, 122, 255, 0.15) 0%, rgba(0, 122, 255, 0.35) 100%)' }}
        />
        <div 
          className="absolute -top-1 -right-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ background: 'rgba(255, 204, 0, 0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 2px 8px rgba(255, 204, 0, 0.3)' }}
        >
          <Star className="w-2.5 h-2.5 fill-white text-white" />
          <span className="text-white">{rating}</span>
        </div>
        <div 
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 16px rgba(0, 122, 255, 0.2)' }}
        />
      </div>
      <h3 
        className="text-[11px] font-semibold text-center leading-tight mb-1 line-clamp-2 px-1"
        style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif", color: '#1C1C1E' }}
      >
        {name}
      </h3>
      <div 
        className="text-[13px] font-bold"
        style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif", color: '#007AFF' }}
      >
        от ฿{priceFrom.toLocaleString()}
      </div>
    </Link>
  );
};
