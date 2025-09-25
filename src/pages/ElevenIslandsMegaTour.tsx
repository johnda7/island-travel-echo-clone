import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, MapPin, Plane, Ship, Camera, Utensils } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ModalPortal } from "@/components/ModalPortal";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { elevenIslandsMegaTourData } from "@/data/elevenIslandsMegaTour";

export default function ElevenIslandsMegaTour() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tourData = elevenIslandsMegaTourData;

  const handleBookingClick = () => {
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tourData.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tourData.gallery.length) % tourData.gallery.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600">
          <span>Главная</span>
          <span className="mx-2">→</span>
          <span>Острова</span>
          <span className="mx-2">→</span>
          <span className="text-blue-600 font-medium">{tourData.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Острова
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Популярное
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {tourData.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {tourData.subtitle}
          </p>

          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{tourData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{tourData.groupSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{tourData.rating} ({tourData.reviewsCount} отзывов)</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={tourData.gallery[currentImageIndex]}
                  alt={`${tourData.title} - изображение ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                  aria-label="Предыдущее изображение"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                  aria-label="Следующее изображение"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {tourData.gallery.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {tourData.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative aspect-video rounded overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Миниатюра ${index + 1}`}
                      className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                    />
                  </button>
                ))}
              </div>

              {/* Mobile Gallery Controls */}
              <div className="md:hidden">
                <div className="flex justify-center space-x-2">
                  {tourData.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Описание тура</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {tourData.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            {tourData.highlights && tourData.highlights.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Основные моменты
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tourData.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Itinerary */}
            {tourData.itinerary && tourData.itinerary.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Программа тура
                  </h3>
                  <div className="space-y-3">
                    {tourData.itinerary.map((item, index) => (
                      <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <span className="inline-block w-16 px-2 py-1 bg-blue-600 text-white text-sm font-medium rounded text-center">
                            {item.time}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What's Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tourData.included && tourData.included.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-700 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Включено в стоимость
                    </h3>
                    <ul className="space-y-2">
                      {tourData.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {tourData.excluded && tourData.excluded.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-red-700 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Дополнительно оплачивается
                    </h3>
                    <ul className="space-y-2">
                      {tourData.excluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Requirements & Important Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tourData.requirements && tourData.requirements.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      Что взять с собой
                    </h3>
                    <ul className="space-y-2">
                      {tourData.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {tourData.importantInfo && tourData.importantInfo.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-yellow-700 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Важная информация
                    </h3>
                    <ul className="space-y-2">
                      {tourData.importantInfo.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {tourData.priceAdult.toLocaleString()} {tourData.currency}
                    </div>
                    <div className="text-gray-600">за взрослого</div>
                    {tourData.priceChild && (
                      <div className="text-lg text-gray-500 mt-1">
                        {tourData.priceChild.toLocaleString()} {tourData.currency} за ребенка
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{tourData.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Users className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{tourData.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Plane className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">Трансфер включен</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Utensils className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">Питание включено</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBookingClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold mb-4"
                  >
                    Забронировать тур
                  </Button>

                  {/* Telegram Buttons */}
                  <div className="space-y-2">
                    <a
                      href="https://t.me/Phuket_life_ru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.377 2.548-1.406 2.997-2.913 1.857l-2.036-1.503-1.089.837c-.129.098-.238.182-.486.182-.317 0-.264-.15-.371-.531L9.916 13.5l-2.362-.756c-.51-.159-.522-.511.113-.764l9.374-3.614c.426-.19.8.096.663.794z"/>
                      </svg>
                      Написать в Telegram
                    </a>
                    
                    <a
                      href="https://t.me/IslandTravelPhuket"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.377 2.548-1.406 2.997-2.913 1.857l-2.036-1.503-1.089.837c-.129.098-.238.182-.486.182-.317 0-.264-.15-.371-.531L9.916 13.5l-2.362-.756c-.51-.159-.522-.511.113-.764l9.374-3.614c.426-.19.8.096.663.794z"/>
                      </svg>
                      Island Travel Phuket
                    </a>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      {tourData.rating} из 5 • {tourData.reviewsCount} отзывов
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Booking Modal */}
      <ModalPortal>
        <UniversalBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tourData={tourData}
        />
      </ModalPortal>
    </div>
  );
}