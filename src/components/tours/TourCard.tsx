import React from 'react';
import { Tour } from '../../types/tour';
import { formatPrice, formatDuration, getStarRating } from '../../lib/tours';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, Clock, Users, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TourCardProps {
  tour: Tour;
  variant?: 'default' | 'compact' | 'featured';
  showBookingButton?: boolean;
}

export const TourCard: React.FC<TourCardProps> = ({ 
  tour, 
  variant = 'default',
  showBookingButton = true 
}) => {
  const heroImage = tour.images.find(img => img.category === 'hero') || tour.images[0];
  const priceText = formatPrice(tour.pricing.base.adult, tour.pricing.currency);
  const durationText = formatDuration(tour.duration.days, tour.duration.nights);

  const cardClasses = {
    default: "h-full",
    compact: "h-full max-w-sm",
    featured: "h-full border-2 border-blue-200 shadow-lg"
  };

  return (
    <Card className={cardClasses[variant]}>
      <div className="relative">
        {/* Изображение тура */}
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={heroImage.url}
            alt={heroImage.alt}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {/* Бейджи */}
        <div className="absolute top-2 left-2 flex gap-2">
          {tour.featured && (
            <Badge variant="destructive" className="text-xs">
              🔥 Популярный
            </Badge>
          )}
          {tour.tags.includes('romantic') && (
            <Badge variant="secondary" className="text-xs">
              💕 Романтик
            </Badge>
          )}
          {tour.tags.includes('family') && (
            <Badge variant="default" className="text-xs">
              👨‍👩‍👧‍👦 Семейный
            </Badge>
          )}
        </div>
        
        {/* Рейтинг */}
        {tour.reviews && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{tour.reviews.averageRating}</span>
              <span className="text-gray-500">({tour.reviews.totalReviews})</span>
            </div>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        {/* Заголовок и локация */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {tour.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">
            {tour.subtitle}
          </p>
        </div>
        
        {/* Основная информация */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{tour.location.island}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{durationText}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>до {tour.groupSize.max} человек</span>
          </div>
        </div>
        
        {/* Теги */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tour.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tour.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tour.tags.length - 3}
            </Badge>
          )}
        </div>
        
        {/* Цена и кнопки */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {priceText}
            </p>
            <p className="text-xs text-gray-500">
              за взрослого
            </p>
          </div>
          
          <div className="flex gap-2">
            <Link to={`/tours/${tour.slug}`}>
              <Button variant="outline" size="sm">
                Подробнее
              </Button>
            </Link>
            
            {showBookingButton && (
              <Link to={`/book/${tour.slug}`}>
                <Button size="sm">
                  Забронировать
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};