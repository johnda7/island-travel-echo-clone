import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";

// Import unified image system for Racha Coral tour
import { rachaCoralImages, rachaCoralImageDescriptions } from "@/assets/racha-coral/images";

const excursion = {
  title: "Острова Рача и Корал",
  subtitle: "Экскурсия на острова Рача 1 день",  
  price: "1300 ฿ взр. / 1200 ฿ дети 4-11 лет",
  currency: "฿", 
  duration: "1 день (7.5 часов)",
  groupSize: "до 40 человек", 
  rating: 4.7,
  reviewsCount: 356,
  mainImage: rachaCoralImages.main,
  gallery: rachaCoralImages.gallery,
  description: `
Острова Рача - одно из самых красивых мест для отдыха на море недалеко от Пхукета. Кристально чистая вода, белоснежные пляжи и удивительный подводный мир делают эту экскурсию незабываемой.

Остров Рача Яй славится своими великолепными пляжами Паток Бэй и Бунгало Бэй с мягким белым песком и спокойными водами цвета аквамарин. Здесь можно позагорать, искупаться в теплом море или заняться снорклингом.

Остров Корал (Хай) - рай для любителей водных развлечений. Богатый подводный мир, коралловые рифы и тропические рыбы создают идеальные условия для снорклинга и дайвинга. На острове также доступны водные виды спорта: парасейлинг, катание на банане и водных мотоциклах.
`,
  highlights: [
    "Пляжи Паток Бэй и Бунгало Бэй на Рача Яй",
    "Снорклинг среди коралловых рифов",
    "Кристально чистая вода цвета аквамарин", 
    "Водные развлечения: парасейлинг, банан",
    "Богатый подводный мир и тропические рыбы",
    "Близко к Пхукету - всего 30 минут на катере",
    "Идеально для семей с детьми"
  ],
  included: [
    "Русско и англоговорящий гид и команда",
    "Страховка",
    "Сбор за посещение национального парка", 
    "Трансферы из отеля в оба конца на автобусе с кондиционером",
    "Кофе и чай на пирсе",
    "Обед - шведский стол с блюдами тайской кухни",
    "Прохладительные и безалкогольные напитки",
    "Спасательные жилеты",
    "Маски для снорклинга"
  ],
  notIncluded: [
    "Дополнительные водные развлечения на Корал Айленд",
    "Алкогольные напитки",
    "Личные расходы",
    "Чаевые"
  ],
  schedule: [
    { day: "Утро", time: "08:30", activity: "Добро пожаловать на пирс на пляже Раваи. Кофе и чай перед началом путешествия" },
    { day: "Утро", time: "09:00", activity: "Отправление с пирса Раваи на остров Рача" },
    { day: "Утро", time: "10:00", activity: "Прибытие на остров Рача. Снорклинг, отдых на пляже, солнечные ванны" },
    { day: "День", time: "11:30", activity: "Отправление с острова Рача в пляжный клуб Coral Beach Club" },
    { day: "День", time: "12:30", activity: "Прибытие на остров Корал. Обед «шведский стол» с блюдами тайской кухни" },
    { day: "День", time: "13:30", activity: "Время на пляже: снорклинг, отдых, плавание или водные развлечения" },
    { day: "Вечер", time: "15:45", activity: "Отправление с острова Корал на пирс" },
    { day: "Вечер", time: "16:00", activity: "Прибытие на пирс Раваи и трансфер обратно в отель" }
  ],
  whatToBring: [
    "Купальники", 
    "Шорты",
    "Рубашки",
    "Солнцезащитный крем",
    "Солнцезащитные очки", 
    "Шляпы",
    "Наличные на личные расходы"
  ],
  importantInfo: [
    "Дети от 0 до 3 лет - бесплатно",
    "Водные развлечения на острове Корал не включены в стоимость",
    "Тайминг программы носит ориентировочный характер",
    "Экскурсия/Расписание/Время/Маршрут могут быть изменены из-за погодных условий",
    "Изменения возможны без предварительного уведомления",
    "Отправление с пирса Раваи (не Чалонг)",
    "Время в пути до острова Рача - 30 минут"
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
              <Link to="/tours?category=marine" className="hover:text-green-600 transition-colors">Морские экскурсии</Link>
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
                    alt={rachaCoralImageDescriptions[0]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[1], 1)}
                >
                  <img 
                    src={excursion.gallery[1]} 
                    alt={rachaCoralImageDescriptions[1]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[2], 2)}
                >
                  <img 
                    src={excursion.gallery[2]} 
                    alt={rachaCoralImageDescriptions[2]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[3], 3)}
                >
                  <img 
                    src={excursion.gallery[3]} 
                    alt={rachaCoralImageDescriptions[3]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={openGallery}
                >
                  <img 
                    src={excursion.gallery[4]} 
                    alt={rachaCoralImageDescriptions[4]}
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
                        alt={rachaCoralImageDescriptions[index]}
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

                  {/* Pricing Table - точная копия с оригинального сайта */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Выберите количество гостей</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        {/* Взрослые */}
                        <tr className="border-b border-gray-100">
                          <td className="p-4">
                            <div className="font-medium text-gray-900">Взрослые</div>
                            <div className="text-sm text-gray-500">от 12 лет</div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="font-bold text-lg text-gray-900">1,300 ฿</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center border border-gray-300 rounded w-24">
                              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                              <input type="number" value="1" min="1" max="40" className="w-8 text-center border-0 text-sm" />
                              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                          </td>
                        </tr>
                        {/* Дети */}
                        <tr className="border-b border-gray-100">
                          <td className="p-4">
                            <div className="font-medium text-gray-900">Дети</div>
                            <div className="text-sm text-gray-500">от 4 до 11 лет</div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="font-bold text-lg text-gray-900">1,200 ฿</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center border border-gray-300 rounded w-24">
                              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                              <input type="number" value="0" min="0" max="20" className="w-8 text-center border-0 text-sm" />
                              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                          </td>
                        </tr>
                        {/* Малыши */}
                        <tr>
                          <td className="p-4">
                            <div className="font-medium text-gray-900">Малыши</div>
                            <div className="text-sm text-gray-500">от 0 до 3 лет</div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="font-bold text-lg text-green-600">Бесплатно</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center border border-gray-300 rounded w-24">
                              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                              <input type="number" value="0" min="0" max="5" className="w-8 text-center border-0 text-sm" />
                              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    {/* Общая сумма */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Итого:</span>
                        <span className="text-xl font-bold text-green-600">1,300 ฿</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">за 1 взрослого</div>
                    </div>
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
            <div className="text-sm font-medium text-gray-700">от 1,300 ฿</div>
            <div className="text-xs text-gray-500">взрослый / от 1,200 ฿ дети</div>
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-6">
            <Link to="/book/racha-coral-islands/reserv">Выбрать</Link>
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