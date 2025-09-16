import React from 'react';
import { Tour } from '../../types/tour';
import { generateBreadcrumbs, formatPrice, formatDuration, getStarRating } from '../../lib/tours';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Star, 
  Check, 
  X,
  Camera,
  Utensils,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BookingModal } from '../BookingModal';

interface TourTemplateProps {
  tour: Tour;
}

export const TourTemplate: React.FC<TourTemplateProps> = ({ tour }) => {
  const breadcrumbs = generateBreadcrumbs(tour.slug);
  const heroImage = tour.images.find(img => img.category === 'hero') || tour.images[0];
  const priceText = formatPrice(tour.pricing.base.adult, tour.pricing.currency);
  const childPriceText = formatPrice(tour.pricing.base.child, tour.pricing.currency);
  const durationText = formatDuration(tour.duration.days, tour.duration.nights);
  const isDaily = tour.availability?.daysOfWeek?.length === 7;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{tour.seo.metaTitle}</title>
        <meta name="description" content={tour.seo.metaDescription} />
        <meta name="keywords" content={tour.seo.keywords.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={tour.seo.openGraph.title} />
        <meta property="og:description" content={tour.seo.openGraph.description} />
        <meta property="og:image" content={tour.seo.openGraph.image} />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": tour.title,
            "description": tour.description,
            "image": heroImage.url,
            "offers": {
              "@type": "Offer",
              "price": tour.pricing.base.adult,
              "priceCurrency": tour.pricing.currency
            },
            "provider": {
              "@type": "Organization",
              "name": "Island Travel"
            }
          })}
        </script>
      </Helmet>

      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Хлебные крошки */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {crumb.current ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Главная секция */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Основная информация */}
          <div className="lg:col-span-2">
            {/* Заголовок */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-2">
                {tour.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
                {tour.featured && (
                  <Badge variant="destructive">Рекомендуем</Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {tour.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-4">
                {tour.subtitle}
              </p>
              
              {/* Рейтинг и отзывы */}
              {tour.reviews && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{tour.reviews.averageRating}</span>
                  </div>
                  <span className="text-gray-500">
                    ({tour.reviews.totalReviews} отзывов)
                  </span>
                </div>
              )}
              
              {/* Основные характеристики (как в каталоге) */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{tour.location.island}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{durationText}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>до {tour.groupSize.max} чел.</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{isDaily ? 'Ежедневно' : 'По расписанию'}</span>
                </div>
              </div>
            </div>

            {/* Главное изображение с бейджами как в каталоге */}
            <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
              <img src={heroImage.url} alt={heroImage.alt} className="w-full h-full object-cover" />
              {tour.featured && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  Рекомендуем
                </div>
              )}
              {tour.reviews && (
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{tour.reviews.averageRating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* Описание */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Описание тура</h2>
              <p className="text-gray-700 leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* Программа тура */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Программа тура</h2>
              <div className="space-y-6">
                {tour.itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        День {day.day}: {day.title}
                      </CardTitle>
                      <p className="text-gray-600">{day.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {day.schedule.map((activity, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="flex-shrink-0 w-16 text-sm font-medium text-blue-600">
                              {activity.time}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{activity.activity}</p>
                              <p className="text-sm text-gray-500">{activity.location}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Что включено/исключено */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">
                    <Check className="h-5 w-5 inline mr-2" />
                    Включено в стоимость
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-700">
                    <X className="h-5 w-5 inline mr-2" />
                    Не включено в стоимость
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tour.excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Галерея изображений */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                <Camera className="h-6 w-6 inline mr-2" />
                Фотогалерея
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tour.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Боковая панель с бронированием */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle>Забронировать тур</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Цены */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Взрослый:</span>
                      <span className="text-xl font-bold text-blue-600">{priceText}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span>Ребёнок:</span>
                      <span className="text-lg font-semibold text-blue-500">{childPriceText}</span>
                    </div>
                  </div>

                  {/* Варианты бронирования */}
                  {tour.bookingOptions && tour.bookingOptions.length > 1 && (
                    <div>
                      <h4 className="font-semibold mb-2">Варианты тура:</h4>
                      <div className="space-y-2">
                        {tour.bookingOptions.map((option) => (
                          <div key={option.id} className="p-3 border rounded-lg">
                            <div className="font-medium">{option.name}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                            <div className="text-sm font-semibold text-blue-600">
                              {formatPrice(
                                tour.pricing.base.adult * option.priceModifier,
                                tour.pricing.currency
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Кнопки действий — стиль как в каталоге (оранжевая кнопка, BookingModal) */}
                  <div className="space-y-2">
                    <BookingModal tourTitle={tour.title} tourPrice={priceText}>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
                        <Calendar className="h-4 w-4 mr-2" />
                        Забронировать
                      </Button>
                    </BookingModal>

                    <Button variant="outline" className="w-full">
                      Задать вопрос
                    </Button>
                  </div>

                  {/* Подпись как в карточках */}
                  <div className="text-xs text-gray-500 text-center">Бесплатная отмена за 24 часа</div>

                  {/* Дополнительная информация */}
                  {tour.notes && (
                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-2">Важная информация:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {tour.notes.map((note, index) => (
                          <li key={index}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};