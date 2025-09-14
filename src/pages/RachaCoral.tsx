import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";

// Import images - временные из существующих
import racha1 from "@/assets/phi-phi-2days/maya-bay-1.jpg";
import racha2 from "@/assets/phi-phi-2days/rang-yai-1.jpg";
import coral1 from "@/assets/phi-phi-2days/bamboo-island.webp";
import coral2 from "@/assets/phi-phi-snorkeling.jpg";
import beach1 from "@/assets/phi-phi-2days/maya-bay-1.jpg";
import beach2 from "@/assets/phi-phi-2days/maya-bay-2.jpg";
import snorkel1 from "@/assets/phi-phi-snorkeling.jpg";
import snorkel2 from "@/assets/phi-phi-2days/pileh-lagoon.jpg";

const excursion = {
  title: "Острова Рача и Корал",
  subtitle: "Экскурсия на острова Рача 1 день",
  price: "от 2 400",
  currency: "฿", 
  duration: "1 день (9 часов)",
  groupSize: "до 40 человек",
  rating: 4.7,
  reviewsCount: 156,
  mainImage: racha1,
  gallery: [
    racha1,
    racha2,
    coral1,
    coral2,
    beach1,
    beach2,
    snorkel1,
    snorkel2,
  ],
  description: `
ОСТРОВА РАЧА И КОРАЛ - идеальное сочетание релакса на белоснежных пляжах и активного подводного отдыха. Рача Яй известен своими кристально чистыми водами и пляжами с мягким белым песком, а Корал Айленд предлагает лучший снорклинг недалеко от Пхукета.

Эта экскурсия подходит для всех возрастов и особенно популярна среди семей с детьми благодаря спокойным водам и безопасным пляжам.
`,
  highlights: [
    "Остров Рача Яй - белоснежные пляжи",
    "Korал Айленд - лучший снорклинг",
    "Кристально чистые воды", 
    "Пляжи с мягким белым песком",
    "Подводный мир с тропическими рыбами",
    "Водные развлечения и релакс",
    "Близко к Пхукету - короткий переезд"
  ],
  included: [
    "Трансфер из отеля на комфортабельном транспорте",
    "Русскоговорящий гид-сопровождающий",
    "Завтрак и обед (шведский стол)",
    "Катер с удобными сиденьями",
    "Входные билеты в национальный парк",
    "Маски и трубки для снорклинга",
    "Спасательные жилеты",
    "Питьевая вода и прохладительные напитки",
    "Медицинская страховка",
    "Фрукты и легкие закуски"
  ],
  notIncluded: [
    "Алкогольные напитки",
    "Дополнительные водные развлечения",
    "Личные расходы и сувениры",
    "Чаевые персоналу (по желанию)",
    "Подводная фото/видеосъемка (можно заказать)"
  ],
  schedule: [
    { day: "Утро", time: "07:00-08:00", activity: "Сбор туристов из отелей" },
    { day: "Утро", time: "08:30", activity: "Прибытие на пирс Шалонг, завтрак" },
    { day: "Утро", time: "09:00", activity: "Инструктаж по безопасности, отправление на Рача Яй" },
    { day: "Утро", time: "10:00", activity: "Прибытие на остров Рача Яй" },
    { day: "Утро", time: "10:15", activity: "Отдых на пляже Патак, купание в море" },
    { day: "Утро", time: "11:30", activity: "Снорклинг у коралловых рифов" },
    { day: "День", time: "12:30", activity: "Обед на острове (морепродукты и тайская кухня)" },
    { day: "День", time: "14:00", activity: "Переезд на Корал Айленд (Ко Хе)" },
    { day: "День", time: "14:30", activity: "Снорклинг среди кораллов Корал Айленда" },
    { day: "День", time: "15:30", activity: "Свободное время на пляже, купание" },
    { day: "Вечер", time: "16:30", activity: "Отправление обратно на Пхукет" },
    { day: "Вечер", time: "17:30", activity: "Возвращение в отели" }
  ],
  whatToBring: [
    "Купальник и полотенце",
    "Солнцезащитный крем водостойкий",
    "Головной убор и солнечные очки",
    "Легкая сменная одежда", 
    "Шлепанцы или аквашузы",
    "Водонепроницаемый чехол для телефона",
    "Наличные деньги для покупок",
    "Документы (паспорт или ксерокопия)"
  ],
  importantInfo: [
    "Подходит для всех возрастов, включая детей",
    "Дети до 4 лет бесплатно, 4-11 лет скидка",
    "При морской болезни рекомендуются таблетки",
    "Возможны изменения маршрута из-за погоды",
    "Лучший сезон: октябрь - апрель",
    "На островах есть туалеты и кафе",
    "Возможна аренда дополнительного снаряжения"
  ]
};

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setShowFullGallery(true);
    document.body.style.overflow = 'hidden';
  };

  const openGallery = () => {
    setSelectedImage(excursion.gallery[4]);
    setCurrentImageIndex(4);
    setShowFullGallery(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowFullGallery(false);
    setShowThumbnails(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % excursion.gallery.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(excursion.gallery[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? excursion.gallery.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(excursion.gallery[prevIndex]);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeModal();
  };

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedImage]);

  const handleMobileGalleryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    setMobileGalleryIndex(newIndex);
  };

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
              <span className="text-gray-700">Острова Рача и Корал</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Gallery section */}
      <section className="pb-2">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Desktop gallery */}
              <div className="hidden md:block">
                <div className="grid grid-cols-4 gap-2 h-96">
                <div 
                  className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[0], 0)}
                >
                  <img 
                    src={excursion.gallery[0]} 
                    alt="Racha Island"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[1], 1)}
                >
                  <img 
                    src={excursion.gallery[1]} 
                    alt="Gallery 2"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[2], 2)}
                >
                  <img 
                    src={excursion.gallery[2]} 
                    alt="Gallery 3"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[3], 3)}
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
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                  onScroll={handleMobileGalleryScroll}
                >
                  {excursion.gallery.map((image, index) => (
                    <div 
                      key={index}
                      className="min-w-full snap-start cursor-pointer"
                      onClick={() => openModal(image, index)}
                    >
                      <img 
                        src={image} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-2 space-x-1">
                  {excursion.gallery.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === mobileGalleryIndex ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Info panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{excursion.title}</h1>
                  <p className="text-gray-600 mb-4">{excursion.subtitle}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{excursion.rating}</span>
                      <span className="text-gray-600 text-sm">({excursion.reviewsCount} отзывов)</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span>{excursion.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Users className="w-4 h-4 text-green-600" />
                      <span>{excursion.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>Рача • Корал</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {excursion.price} {excursion.currency}
                    </div>
                    <div className="text-gray-600 text-sm">за человека</div>
                  </div>

                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Link to="/book/racha-coral-islands/reserv">Забронировать тур</Link>
                  </Button>

                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Семейный тур • Бесплатная отмена за 24 часа
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Описание тура</h2>
                  <div className="prose prose-lg text-gray-700">
                    {excursion.description.split('\n').map((paragraph, index) => (
                      paragraph.trim() && <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 text-green-600">Особенности тура</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {excursion.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6 text-blue-600">Программа тура</h3>
                  <div className="space-y-4">
                    {excursion.schedule.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-right min-w-[100px]">
                          <div className="text-sm font-semibold text-blue-600">{item.day}</div>
                          <div className="text-xs text-gray-600">{item.time}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-gray-800">{item.activity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-green-600">Включено</h3>
                    <ul className="space-y-2 text-gray-700">
                      {excursion.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-red-600">Не включено</h3>
                    <ul className="space-y-2 text-gray-700">
                      {excursion.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-red-600 font-bold">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-600">Взять с собой</h3>
                    <ul className="space-y-2 text-gray-700">
                      {excursion.whatToBring.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-amber-600">Важно знать</h3>
                    <ul className="space-y-2 text-gray-700">
                      {excursion.importantInfo.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-amber-600 font-bold">!</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile booking bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-xl font-bold text-green-600">
              {excursion.price} {excursion.currency}
            </div>
            <div className="text-xs text-gray-600">за человека</div>
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-6">
            <Link to="/book/racha-coral-islands/reserv">Забронировать</Link>
          </Button>
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedImage && showFullGallery && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex items-center justify-between p-3 bg-black bg-opacity-90 safe-area-top">
            <div className="flex items-center space-x-3">
              <span className="text-white text-sm font-medium">
                {currentImageIndex + 1} из {excursion.gallery.length}
              </span>
              <button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="text-white hover:text-gray-300 p-1.5 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors sm:hidden"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={closeModal}
              className="text-white hover:text-gray-300 p-1.5 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div 
            className="flex-1 flex items-center justify-center relative px-2 py-4 gallery-modal"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 z-10 bg-black bg-opacity-60 rounded-full hidden sm:block transition-all duration-200 hover:bg-opacity-80"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-full object-contain"
            />

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 z-10 bg-black bg-opacity-60 rounded-full hidden sm:block transition-all duration-200 hover:bg-opacity-80"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {showThumbnails && (
            <div className="bg-black bg-opacity-90 p-4 sm:hidden">
              <div className="flex space-x-2 overflow-x-auto">
                {excursion.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setSelectedImage(image);
                      setShowThumbnails(false);
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-green-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="hidden sm:block bg-black bg-opacity-90 p-4">
            <div className="flex justify-center space-x-2">
              {excursion.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setSelectedImage(image);
                  }}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? 'border-green-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PhotoGallery;