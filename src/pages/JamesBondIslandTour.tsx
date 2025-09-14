import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";

// Import images for James Bond Island tour
import { jamesBondIslandImages, jamesBondIslandImageDescriptions } from "@/assets/james-bond-island/images";

const excursion = {
  title: "Остров Джеймса Бонда",
  subtitle: "Экскурсия в залив Пханг Нга с посещением знаменитого острова Ко Тапу",
  priceAdult: 2500,
  priceChild: 2000,
  currency: "฿",
  duration: "1 день (10 часов)",
  groupSize: "до 35 человек",
  rating: 4.9,
  reviewsCount: 127,
  mainImage: jamesBondIslandImages.main,
  gallery: jamesBondIslandImages.gallery,
  
  description: `Незабываемое путешествие в залив Пханг Нга к легендарному острову Джеймса Бонда (Ко Тапу) - месту съёмок знаменитого фильма "Человек с золотым пистолетом". 

Вас ждут потрясающие известняковые скалы, изумрудные воды Андаманского моря, увлекательная экскурсия по мангровым лесам на каноэ и посещение уникальной плавучей деревни мусульман Ко Паньи.`,

  highlights: [
    "Остров Джеймса Бонда (Ко Тапу) - место съёмок фильма 007",
    "Залив Пханг Нга с потрясающими известняковыми скалами",
    "Каноэ-экскурсия по мангровым лесам и пещерам",
    "Плавучая деревня мусульман Ко Паньи на сваях",
    "Обед из свежих морепродуктов в плавучем ресторане",
    "Экосистема мангровых лесов и тропическая природа",
    "Трансфер из отеля и обратно включён"
  ],

  included: [
    "Трансфер из отеля на комфортабельном автобусе", 
    "Лодочная экскурсия по заливу Пханг Нга",
    "Каноэ-тур по мангровым лесам с гидом",
    "Обед из морепродуктов в плавучем ресторане",
    "Посещение плавучей деревни Ко Паньи",
    "Русскоговорящий гид-экскурсовод",
    "Страховка на время экскурсии",
    "Безлимитная питьевая вода"
  ],

  notIncluded: [
    "Дополнительные напитки и закуски",
    "Чаевые гиду и персоналу (по желанию)",
    "Сувениры и личные покупки"
  ],

  schedule: [
    { time: "07:00 - 08:30", activity: "Трансфер из отелей, сбор группы" },
    { time: "09:00 - 09:30", activity: "Прибытие в порт, инструктаж по безопасности" },
    { time: "09:30 - 11:00", activity: "Лодочная экскурсия к острову Джеймса Бонда" },
    { time: "11:00 - 12:00", activity: "Фотосессия у знаменитой скалы Ко Тапу" },
    { time: "12:00 - 13:30", activity: "Каноэ-экскурсия по мангровым лесам и пещерам" },
    { time: "13:30 - 14:30", activity: "Обед из морепродуктов в плавучем ресторане" },
    { time: "14:30 - 15:30", activity: "Посещение плавучей деревни Ко Паньи" },
    { time: "15:30 - 16:30", activity: "Возвращение в порт" },
    { time: "16:30 - 18:00", activity: "Трансфер в отели" }
  ],

  importantInfo: [
    "Возьмите с собой купальные принадлежности, полотенце и солнцезащитный крем",
    "Рекомендуется надеть удобную обувь для каноэ-экскурсии",
    "Экскурсия не рекомендуется беременным женщинам и людям с проблемами спины",
    "В случае плохих погодных условий маршрут может быть изменён",
    "Трансфер из отдалённых районов может оплачиваться дополнительно",
    "Детям до 4 лет экскурсия предоставляется бесплатно"
  ]
};

export const JamesBondIslandTour = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex]);

  const openGallery = (index: number = 0) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setSelectedImageIndex(null);
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % excursion.gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? excursion.gallery.length - 1 : selectedImageIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeGallery();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={excursion.mainImage} 
          alt={excursion.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <div className="text-white max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{excursion.title}</h1>
              <p className="text-xl md:text-2xl text-blue-200 mb-6">{excursion.subtitle}</p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{excursion.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{excursion.groupSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>{excursion.rating} ({excursion.reviewsCount} отзывов)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-3xl font-bold">
                  от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Забронировать
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Описание экскурсии</h2>
              <div className="prose prose-lg max-w-none">
                {excursion.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Что входит в экскурсию</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {excursion.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Photo Gallery */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Фотогалерея</h2>
              
              {/* Desktop gallery */}
              <div className="hidden md:block">
                <div className="grid grid-cols-4 gap-4 h-96">
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg col-span-2 row-span-2"
                  onClick={() => openGallery(0)}
                >
                  <img 
                    src={excursion.gallery[0]} 
                    alt="Gallery 1"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openGallery(1)}
                >
                  <img 
                    src={excursion.gallery[1]} 
                    alt="Gallery 2"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openGallery(2)}
                >
                  <img 
                    src={excursion.gallery[2]} 
                    alt="Gallery 3"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openGallery(3)}
                >
                  <img 
                    src={excursion.gallery[3]} 
                    alt="Gallery 4"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={openGallery}
                >
                  <img 
                    src={excursion.gallery[4]} 
                    alt="Gallery 5"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">+{excursion.gallery.length - 5}</div>
                      <div className="text-sm">фото</div>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Mobile gallery */}
              <div className="md:hidden">
                <div 
                  className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={openGallery}
                >
                  <img 
                    src={excursion.gallery[0]} 
                    alt="Фотогалерея"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Grid3X3 className="w-12 h-12 mx-auto mb-2" />
                      <div className="text-lg font-semibold">Смотреть все фото</div>
                      <div className="text-sm">{excursion.gallery.length} фотографий</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Schedule */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Программа экскурсии</h2>
              <div className="space-y-4">
                {excursion.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-20 text-blue-600 font-semibold">
                      {item.time}
                    </div>
                    <div className="text-gray-700">
                      {item.activity}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Important Info */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Важная информация</h2>
              <div className="space-y-3">
                {excursion.importantInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{info}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 p-6">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                  </div>
                  <div className="text-sm text-gray-500">за взрослого</div>
                  <div className="text-lg text-gray-600 mt-1">
                    дети: {excursion.priceChild.toLocaleString()} {excursion.currency}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Продолжительность:</span>
                    <span className="font-semibold">{excursion.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Группа:</span>
                    <span className="font-semibold">{excursion.groupSize}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Рейтинг:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{excursion.rating}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 mb-4">
                  Забронировать тур
                </Button>

                <div className="text-center">
                  <Link to="/tours" className="text-blue-600 hover:underline">
                    ← Вернуться к турам
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            
            {/* Close button */}
            <button 
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <img 
              src={excursion.gallery[selectedImageIndex]} 
              alt={jamesBondIslandImageDescriptions[selectedImageIndex]}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              {selectedImageIndex + 1} / {excursion.gallery.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};