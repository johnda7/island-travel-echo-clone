import React, { useState, useEffect } from "react";
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
  description: "Невероятное приключение, объединяющее самые живописные места Андаманского моря. За два дня вы посетите четыре жемчужины региона: таинственные острова Пхи-Пхи с их изумрудными лагунами, знаменитый остров Джеймса Бонда в заливе Пханг Нга, девственные пляжи Краби и уединённые бухты, доступные только с воды.",
  
  // Ценообразование
  priceAdult: 4500,
  priceChild: 2250,
  currency: "₿",
  
  // Характеристики
  duration: "2 дня / 1 ночь",
  groupSize: "до 15 человек",
  rating: 4.9,
  reviewsCount: 127,
  route: "Пхукет → Пхи-Пхи → Джеймс Бонд → Краби → Пхукет",
  
  // Галерея изображений
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
      day: 1,
      title: "Отправление в Краби и острова Пхи-Пхи",
      time: "07:00",
      description: "Трансфер из отеля, переезд в Краби, посадка на скоростной катер"
    },
    {
      day: 1,
      title: "Остров Пхи-Пхи Дон",
      time: "10:30", 
      description: "Исследование главного острова архипелага, обед в местном ресторане"
    },
    {
      day: 1,
      title: "Бухта Майя Бей",
      time: "14:00",
      description: "Посещение знаменитой бухты из фильма 'Пляж', снорклинг"
    },
    {
      day: 1,
      title: "Размещение в отеле Краби",
      time: "18:00",
      description: "Заселение в отель, свободное время, ужин"
    },
    {
      day: 2,
      title: "Залив Пханг Нга",
      time: "08:00",
      description: "Завтрак, переезд в залив Пханг Нга"
    },
    {
      day: 2,
      title: "Остров Джеймса Бонда",
      time: "10:00",
      description: "Посещение знаменитого острова Ко Тапу из фильма о Джеймсе Бонде"
    },
    {
      day: 2,
      title: "Возвращение в Пхукет",
      time: "16:00",
      description: "Трансфер обратно в отель в Пхукете"
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
  notIncluded: [
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

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % excursion.gallery.length;
    setSelectedImage(excursion.gallery[nextIndex]);
    setSelectedImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = selectedImageIndex === 0 ? excursion.gallery.length - 1 : selectedImageIndex - 1;
    setSelectedImage(excursion.gallery[prevIndex]);
    setSelectedImageIndex(prevIndex);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(excursion.gallery.length / 6));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? Math.ceil(excursion.gallery.length / 6) - 1 : prev - 1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage) {
        if (event.key === 'ArrowLeft') {
          prevImage();
        } else if (event.key === 'ArrowRight') {
          nextImage();
        } else if (event.key === 'Escape') {
          closeModal();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, selectedImageIndex]);

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