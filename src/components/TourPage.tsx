import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookingModal } from "@/components/BookingModal";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3, Plus, Minus } from "lucide-react";
import { Tour } from "@/data/tours";

interface TourPageProps {
  tour: Tour;
}

export const TourPage = ({ tour }: TourPageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const totalPrice = (adults * tour.adultPrice) + (children * tour.childPrice);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length);
  };

  const adjustGuests = (type: 'adults' | 'children', direction: 'plus' | 'minus') => {
    if (type === 'adults') {
      setAdults(prev => direction === 'plus' ? prev + 1 : Math.max(1, prev - 1));
    } else {
      setChildren(prev => direction === 'plus' ? prev + 1 : Math.max(0, prev - 1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showGallery) {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') setShowGallery(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGallery]);

  const toggleGallery = () => {
    setShowGallery(!showGallery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-6">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={tour.gallery[currentImageIndex]}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Gallery Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-4 right-4 bg-black/50 text-white hover:bg-black/70"
                  onClick={toggleGallery}
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Все фото ({tour.gallery.length})
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {tour.gallery.length}
                </div>
              </div>
            </div>

            {/* Tour Info */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{tour.title}</h1>
              <p className="text-gray-600 mb-6">{tour.description}</p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  <span>до 30 человек</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>4.8 (53 отзыва)</span>
                </div>
              </div>

              {/* Что включено */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Что включено в тур:</h3>
                <ul className="space-y-2">
                  {tour.includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Что не включено */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Что не включено:</h3>
                <ul className="space-y-2">
                  {tour.excludes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Программа тура */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Программа тура:</h3>
                <div className="space-y-3">
                  {tour.schedule.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium mr-4 min-w-[60px] text-center">
                        {item.time}
                      </div>
                      <div className="text-gray-700">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Calculator */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Калькулятор стоимости</h3>
                    <div className="text-sm text-gray-600">
                      <span>Взрослые: {tour.adultPrice.toLocaleString()} ฿</span>
                      <span className="mx-2">•</span>
                      <span>Дети: {tour.childPrice.toLocaleString()} ฿</span>
                    </div>
                  </div>

                  {/* Adults Counter */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Взрослые</div>
                      <div className="text-sm text-gray-500">{tour.adultPrice.toLocaleString()} ฿ за человека</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustGuests('adults', 'minus')}
                        disabled={adults <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold w-8 text-center">{adults}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustGuests('adults', 'plus')}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Дети (4-11 лет)</div>
                      <div className="text-sm text-gray-500">{tour.childPrice.toLocaleString()} ฿ за ребенка</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustGuests('children', 'minus')}
                        disabled={children <= 0}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold w-8 text-center">{children}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustGuests('children', 'plus')}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Итого:</span>
                      <span className="text-2xl font-bold text-blue-600">{totalPrice.toLocaleString()} ฿</span>
                    </div>
                  </div>

                  {/* Booking Button */}
                  <BookingModal 
                    tourTitle={tour.title}
                    adultPrice={tour.adultPrice}
                    childPrice={tour.childPrice}
                  >
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      Забронировать сейчас
                    </Button>
                  </BookingModal>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Бесплатная отмена за 24 часа
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={toggleGallery}
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="relative max-w-5xl max-h-full p-4">
            <img
              src={tour.gallery[currentImageIndex]}
              alt={`${tour.title} - фото ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded">
              {currentImageIndex + 1} / {tour.gallery.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};