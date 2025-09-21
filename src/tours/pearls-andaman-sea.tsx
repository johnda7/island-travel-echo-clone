/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { TourData } from "@/types/Tour";

// 📸 ОРИГИНАЛЬНЫЕ ФОТОГРАФИИ С САЙТА
import railayMain from "../assets/pearls-andaman-sea/gallery-01-railay-main.jpg";
import railayBeach from "../assets/pearls-andaman-sea/gallery-02-railay-beach.jpg";
import railayVertical from "../assets/pearls-andaman-sea/gallery-03-railay-vertical.jpg";
import railayBoats from "../assets/pearls-andaman-sea/gallery-04-railay-boats.jpg";
import railayCliffs from "../assets/pearls-andaman-sea/gallery-05-railay-cliffs.jpg";
import hongIsland from "../assets/pearls-andaman-sea/gallery-06-hong-island.jpg";
import bambooIsland from "../assets/pearls-andaman-sea/gallery-07-bamboo-island.webp";

// 🎯 ЕДИНЫЙ ИСТОЧНИК ДАННЫХ В ОДНОМ ФАЙЛЕ - как WordPress пост
export const pearlsAndamanSeaTourData: TourData = {
  id: "pearls-andaman-sea",
  title: "4 жемчужины Андаманского моря",
  subtitle: "Экскурсия с ночёвкой в Краби",
  description: "Незабываемое путешествие к четырем жемчужинам Андаманского моря: пляж Рейли, остров Хонг, остров Джеймса Бонда и изумрудная лагуна!",
  
  // Ценообразование
  priceAdult: 4500,
  priceChild: 3800,
  currency: "฿",
  
  // Характеристики
  duration: "2 дня / 1 ночь",
  groupSize: "до 25 человек",
  rating: 4.9,
  reviewsCount: 156,
  route: "Пхукет → Пхи-Пхи → Джеймс Бонд → Краби → Пхукет",
  
  mainImage: railayMain,
  highlights: [
    "Четыре жемчужины Андаманского моря за одно путешествие",
    "Остров Джеймса Бонда из знаменитого фильма",
    "Девственные пляжи Краби и национальные парки",
    "Ночёвка в комфортабельном отеле с завтраком",
    "Снорклинг в кристально чистых водах"
  ],
  gallery: [
    railayMain,
    railayBeach, 
    railayVertical,
    railayBoats,
    railayCliffs,
    hongIsland,
    bambooIsland
  ],
  
  // Программа тура
  itinerary: [
    {
      day: "1",
      time: "07:00",
      activity: "Трансфер из отеля, переезд в Краби, посадка на скоростной катер"
    },
    {
      day: "1",
      time: "10:30", 
      activity: "Исследование главного острова архипелага, обед в местном ресторане"
    },
    {
      day: "1",
      time: "14:00",
      activity: "Посещение знаменитой бухты из фильма 'Пляж', снорклинг"
    },
    {
      day: "1",
      time: "18:00",
      activity: "Заселение в отель, свободное время, ужин"
    },
    {
      day: "2",
      time: "08:00",
      activity: "Завтрак, переезд в залив Пханг Нга"
    },
    {
      day: "2",
      time: "10:00",
      activity: "Посещение знаменитого острова Ко Тапу из фильма о Джеймсе Бонде"
    },
    {
      day: "2",
      time: "16:00",
      activity: "Трансфер обратно в отель в Пхукете"
    }
  ],
  
  // Что включено
  included: [
    "Трансфер туда-обратно",
    "Размещение в отеле Краби (1 ночь)",
    "Завтрак и обед",
    "Экскурсионная программа",
    "Входные билеты в национальные парки",
    "Оборудование для снорклинга",
    "Страховка",
    "Русскоговорящий гид"
  ],
  
  // Что НЕ включено  
  excluded: [
    "Ужины",
    "Личные расходы",
    "Алкогольные напитки",
    "Чаевые гиду и персоналу"
  ],
  
  // Важная информация
  importantInfo: [
    "Детский билет 4-11 лет включительно. До 3-х лет включительно бесплатно без места в минивэне",
    "Программа тура может изменяться в зависимости от погодных условий, приливов и отливов",
    "Некоторые пляжи могут быть закрыты в сезон дождей",
    "Программа подходит для беременных, детей до года, людей любого возраста и веса"
  ],
  
  isPopular: true,
  
  // 🏷️ ЦЕНТРАЛИЗОВАННЫЕ ТЕГИ - автоматически появятся везде
  tags: [
    "морские экскурсии",
    "острова", 
    "снорклинг",
    "пляжи",
    "краби",
    "ночёвка",
    "природа",
    "приключения"
  ],
};

// 🎨 КОМПОНЕНТ СТРАНИЦЫ В ТОМ ЖЕ ФАЙЛЕ - максимальная компактность
export const PearlsAndamanSeaPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Используем данные из этого же файла
  const excursion = pearlsAndamanSeaTourData;
  const galleryRef = useRef(excursion.gallery);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) => {
      const len = galleryRef.current.length;
      const nextIndex = (prev + 1) % len;
      setSelectedImage(galleryRef.current[nextIndex]);
      return nextIndex;
    });
  }, []);

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => {
      const len = galleryRef.current.length;
      const prevIndex = prev === 0 ? len - 1 : prev - 1;
      setSelectedImage(galleryRef.current[prevIndex]);
      return prevIndex;
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(excursion.gallery.length / 6));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? Math.ceil(excursion.gallery.length / 6) - 1 : prev - 1);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!selectedImage) return;
    if (event.key === 'ArrowLeft') {
      prevImage();
    } else if (event.key === 'ArrowRight') {
      nextImage();
    } else if (event.key === 'Escape') {
      closeModal();
    }
  }, [selectedImage, prevImage, nextImage, closeModal]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      <Header />
      
      {/* Breadcrumbs */}
      <section className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Link to="/" className="hover:text-green-600 transition-colors">Главная</Link>
              <span>›</span>
              <Link to="/tours" className="hover:text-green-600 transition-colors">Туры</Link>
              <span>›</span>
              <Link to="/tours?category=marine" className="hover:text-green-600 transition-colors">Морские экскурсии</Link>
              <span>›</span>
              <span className="text-gray-700">4 жемчужины Андаманского моря</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Hero Gallery - как на tisland.travel */}
      <section className="relative">
        <div className="container mx-auto px-4">
          {/* Mobile Gallery Slider */}
          <div className="block lg:hidden mb-4">
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {excursion.gallery.slice(0, 6).map((image, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-full snap-center"
                    onClick={() => openModal(image, index)}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Overlay с количеством фото на последнем слайде */}
                      {index === 5 && excursion.gallery.length > 6 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-2xl font-bold mb-1">+{excursion.gallery.length - 6}</div>
                            <div className="text-sm">фото</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {Array.from({ length: Math.ceil(excursion.gallery.length / 6) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${
                      currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Gallery Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-2 lg:h-96">
            {/* Main large image */}
            <div 
              className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openModal(excursion.gallery[0], 0)}
            >
              <img 
                src={excursion.gallery[0]} 
                alt="Main tour image" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Smaller images */}
            {excursion.gallery.slice(1, 5).map((image, index) => (
              <div 
                key={index + 1}
                className="relative overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => openModal(image, index + 1)}
              >
                <img 
                  src={image} 
                  alt={`Gallery ${index + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Show all photos overlay on last image */}
                {index === 3 && excursion.gallery.length > 5 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Grid3X3 className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-sm font-medium">Все {excursion.gallery.length} фото</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ ЦЕНТРАЛИЗОВАННЫЕ ТЕГИ из данных тура */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {excursion.tags?.map((tag, index) => (
              <Link
                key={index}
                to={`/tours?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Title and meta info */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            {excursion.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {excursion.subtitle}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">{excursion.rating}</span>
              <span className="text-gray-500 text-sm">({excursion.reviewsCount} отзывов)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{excursion.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Users className="w-4 h-4" />
              <span>{excursion.groupSize}</span>
            </div>
          </div>
          {/* Mobile price */}
          <div className="lg:hidden bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{excursion.currency}{excursion.priceAdult.toLocaleString()}</div>
                <div className="text-sm text-gray-500">за взрослого</div>
              </div>
              <Button 
                onClick={() => setShowBookingModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Забронировать
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Content */}
            <div className="lg:col-span-2">
              
              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Описание тура</h2>
                <p className="text-gray-600 leading-relaxed">
                  {excursion.description}
                </p>
              </div>

              {/* Route */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Маршрут тура
                </h3>
                <p className="text-gray-600">{excursion.route}</p>
              </div>

              {/* Itinerary */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  Программа тура
                </h3>
                <div className="space-y-4">
                  {excursion.itinerary.map((item, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-green-600">День {item.day}</span>
                        <span className="text-sm text-gray-500">{item.time}</span>
                      </div>
                       <h4 className="font-semibold text-gray-800 mb-1">День {item.day} - {item.time}</h4>
                       <p className="text-sm text-gray-600">{item.activity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included/Not Included */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-green-600 mb-3">✅ Включено в стоимость</h3>
                  <ul className="space-y-2">
                    {excursion.included.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-3">❌ Дополнительно оплачивается</h3>
                  <ul className="space-y-2">
                    {excursion.excluded?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">✗</span>
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Important Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">ℹ️ Важная информация</h3>
                <ul className="space-y-2">
                  {excursion.importantInfo.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Sidebar - КАРТОЧКА БРОНИРОВАНИЯ */}
            <div className="lg:col-span-1">
              
              {/* Booking Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Забронировать тур</h3>
                
                {/* Price Display */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Цена от</div>
                    <div className="text-3xl font-bold text-green-600">
                      {excursion.currency}{excursion.priceAdult.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">за взрослого</div>
                  </div>
                </div>

                {/* Price Table */}
                <div className="border rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-3 text-gray-700">Стоимость тура:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Взрослый:</span>
                      <span className="font-semibold text-gray-800">{excursion.currency}{excursion.priceAdult.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ребенок (4-11 лет):</span>
                      <span className="font-semibold text-gray-800">{excursion.currency}{excursion.priceChild.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Младенец (0-3 года):</span>
                      <span className="font-semibold text-green-600">Бесплатно</span>
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <Button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  🏝️ Забронировать сейчас
                </Button>

                {/* Additional Info */}
                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p>✓ Бесплатная отмена за 24 часа</p>
                  <p>✓ Подтверждение в течение 2 часов</p>
                </div>
              </div>

              {/* Tour Features */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Детали тура</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-3">⏱️</span>
                      <span className="text-sm text-gray-600">Продолжительность</span>
                    </div>
                    <span className="text-sm font-medium">{excursion.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-3">👥</span>
                      <span className="text-sm text-gray-600">Размер группы</span>
                    </div>
                    <span className="text-sm font-medium">{excursion.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-3">⭐</span>
                      <span className="text-sm text-gray-600">Рейтинг</span>
                    </div>
                    <span className="text-sm font-medium">{excursion.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Booking Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowBookingModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              🏝️ Забронировать тур "{excursion.title}"
            </Button>
          </div>
        </div>
      </section>

      {/* Rest of the component stays the same... */}
      
      <Footer />
      
      {/* Modals */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImageIndex + 1} / {excursion.gallery.length}
            </div>
          </div>
        </div>
      )}

      <UniversalBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tourData={excursion}
      />
    </div>
  );
};