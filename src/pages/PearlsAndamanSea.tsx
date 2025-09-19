import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Star, Calendar, CheckCircle, XCircle } from "lucide-react";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { pearlsTourData } from "@/data/pearlsTour";

// Импорт оригинальных фотографий с сайта
import railayBeach from '../assets/pearls-andaman-sea/railay-beach.jpg';
import railayVertical from '../assets/pearls-andaman-sea/railay-vertical.jpg';
import railayBeach2 from '../assets/pearls-andaman-sea/railay-beach-2.jpg';

export const PearlsAndamanSea = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const tourData = pearlsTourData;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-blue-600 to-teal-600">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${railayBeach})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="flex gap-2 mb-4">
              <Badge variant="secondary" className="bg-green-500 text-white">
                ⭐ {tourData.rating}
              </Badge>
              <Badge variant="secondary" className="bg-blue-500 text-white">
                {tourData.duration}
              </Badge>
              <Badge variant="secondary" className="bg-purple-500 text-white">
                {tourData.groupSize}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {tourData.title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              {tourData.subtitle}
            </p>
            <p className="text-lg mb-8 opacity-80">
              {tourData.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                onClick={() => setShowBookingModal(true)}
              >
                Забронировать сейчас
              </Button>
              <div className="text-white">
                <div className="text-sm opacity-80">Цена от</div>
                <div className="text-2xl font-bold">
                  {tourData.priceAdult} {tourData.currency}
                </div>
                <div className="text-sm opacity-80">за взрослого</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Highlights */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Основные достопримечательности
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {tourData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Фотогалерея</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tourData.gallery.slice(0, 6).map((image, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`${tourData.title} фото ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-500" />
                  Программа тура
                </h2>
                <div className="space-y-4">
                  {tourData.itinerary.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-600 min-w-[60px]">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 mb-1">{item.day}</div>
                        <div className="text-gray-600">{item.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Included/Excluded */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Включено в стоимость
                  </h3>
                  <ul className="space-y-2">
                    {tourData.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Дополнительно оплачивается
                  </h3>
                  <ul className="space-y-2">
                    {tourData.excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Requirements */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Что взять с собой</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {tourData.requirements.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Important Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">⚠️ Важная информация</h2>
                <div className="space-y-3">
                  {tourData.importantInfo.map((info, index) => (
                    <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <p className="text-gray-700">{info}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      от {tourData.priceAdult} {tourData.currency}
                    </div>
                    <div className="text-sm text-gray-600">за взрослого</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{tourData.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{tourData.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Пхукет, Краби, Пхи-Пхи</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-700">
                        {tourData.rating} ({tourData.reviewsCount || 'Новый тур'})
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                    onClick={() => setShowBookingModal(true)}
                  >
                    Забронировать тур
                  </Button>

                  <div className="mt-4 text-center">
                    <div className="text-sm text-gray-600 mb-2">Цены:</div>
                    <div className="text-sm space-y-1">
                      <div>Взрослый: <span className="font-medium">{tourData.priceAdult} {tourData.currency}</span></div>
                      <div>Ребенок (4-11): <span className="font-medium">{tourData.priceChild} {tourData.currency}</span></div>
                      <div>Младенец (0-3): <span className="font-medium text-green-600">Бесплатно</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Готовы к незабываемому приключению?</h2>
              <p className="text-xl mb-6 opacity-90">
                Забронируйте тур "4 жемчужины Андаманского моря" прямо сейчас!
              </p>
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
                onClick={() => setShowBookingModal(true)}
              >
                Забронировать сейчас
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      <UniversalBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tourData={tourData}
      />
    </div>
  );
};