import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";

// Import images from phuketgo
import mayaBay1 from "@/assets/phi-phi-2days/maya-bay-1.jpg";
import mayaBay2 from "@/assets/phi-phi-2days/maya-bay-2.jpg";
import mayaBay3 from "@/assets/phi-phi-2days/maya-bay-3.jpg";
import mayaBay4 from "@/assets/phi-phi-2days/maya-bay-4.jpg";
import mayaBay5 from "@/assets/phi-phi-2days/mayabay-1.jpg";
import mayaBay6 from "@/assets/phi-phi-2days/mayabay-2.jpg";
import mayaBay7 from "@/assets/phi-phi-2days/mayabay-3.jpg";
import mayaBay8 from "@/assets/phi-phi-2days/mayabay-5.jpg";
import mayaBay9 from "@/assets/phi-phi-2days/mayabay-6.jpg";
import pilehLagoon from "@/assets/phi-phi-2days/pileh-lagoon.jpg";
import vikingCave from "@/assets/phi-phi-2days/viking-cave.jpg";
import bambooIsland from "@/assets/phi-phi-2days/bamboo-island.webp";
import fireShow1 from "@/assets/phi-phi-2days/fire-show-1.jpg";
import fireShow2 from "@/assets/phi-phi-2days/fire-show-2.jpg";
import fireShow3 from "@/assets/phi-phi-2days/fire-show-3.jpg";
import rangYai1 from "@/assets/phi-phi-2days/rang-yai-1.jpg";
import rangYai2 from "@/assets/phi-phi-2days/rang-yai-2.jpg";

const excursion = {
  title: "Пхи-Пхи 2 дня / 1 ночь",
  subtitle: "Экскурсия с ночёвкой на островах Пхи-Пхи",
  price: "от 8 900",
  currency: "฿",
  duration: "2 дня / 1 ночь",
  groupSize: "до 30 человек",
  rating: 4.8,
  reviewsCount: 53,
  mainImage: mayaBay1,
  gallery: [
    mayaBay1,
    mayaBay2,
    mayaBay3,
    mayaBay4,
    mayaBay5,
    mayaBay6,
    mayaBay7,
    mayaBay8,
    mayaBay9,
    pilehLagoon,
    vikingCave,
    bambooIsland,
    fireShow1,
    fireShow2,
    fireShow3,
    rangYai1,
    rangYai2
  ],
  description: `
Авторская программа, идеально подходящая для семей с детьми, беременных женщин и лиц пожилого возраста. Экскурсия также подойдет для друзей и тех, кто хочет провести больше времени на Пхи-Пхи.

Это путешествие в небольшой группе по таинственным бухтам Пхи-Пхи сочетает блаженство и спокойствие с вечеринками и огненным шоу. Включает посещение смотровой площадки и встречу заката в море. Проживание в отеле на острове Пхи-Пхи Дон.
`,
  highlights: [
    "Бухта Майя Бэй и лагуна Пиле",
    "Пляж обезьян и пещера викингов", 
    "Встреча заката в море",
    "Смотровая площадка Пхи-Пхи Дон",
    "Пляжная вечеринка с огненным шоу",
    "Снорклинг в кристально чистой воде"
  ],
  included: [
    "Трансфер из районов Равай, Найхарн, Ката, Карон, Патонг",
    "Русскоговорящий гид",
    "Питание по программе (завтрак, обед, ужин)",
    "Проживание в отеле 3*, стандартный номер",
    "Входные билеты в Национальный парк",
    "Билет на смотровую площадку Пхи-Пхи Дон",
    "Универсальные маски для снорклинга",
    "Спасательные жилеты на лонгтейле",
    "Медицинская страховка"
  ],
  notIncluded: [
    "Обед на второй день не включен в программу",
    "За одноместное размещение - 1 500 бат",
    "Трансфер из отдаленных районов (Камала, Сурин, Бангтао) - 2 000 бат",
    "Личные расходы и чаевые"
  ],
  schedule: [
    { day: "1-й день", time: "07:00-07:30", activity: "Сбор гостей из отелей" },
    { day: "1-й день", time: "08:00-08:30", activity: "Прибытие на пирс и встреча с гидом" },
    { day: "1-й день", time: "08:30-09:00", activity: "Отправление на острова Пхи-Пхи на большом тихоходном пароме" },
    { day: "1-й день", time: "10:30-11:00", activity: "Прибытие на остров, заселение в отель, отдых в отеле и у бассейна" },
    { day: "1-й день", time: "12:30", activity: "Обед в ресторане отеля" },
    { day: "1-й день", time: "15:00", activity: "Прогулка по близлежащим островам на традиционной тайской лодке-лонгтейле: бухта Майя Бей, бухта Ло Самах, лагуна Пиле, пляж обезьян. Снорклинг" },
    { day: "1-й день", time: "18:00", activity: "Встреча заката в море" },
    { day: "1-й день", time: "19:30", activity: "Ужин в ресторане отеля" },
    { day: "1-й день", time: "20:30", activity: "Вечеринка на пляже с огненным шоу и дискотекой" },
    { day: "2-й день", time: "07:00-08:00", activity: "Завтрак в отеле" },
    { day: "2-й день", time: "08:00", activity: "Посещение смотровой площадки на острове Пхи-Пхи Дон (по желанию)" },
    { day: "2-й день", time: "11:00", activity: "Выселение из отеля. Свободное время для прогулок, купания в море или бассейне, шоппинга" },
    { day: "2-й день", time: "14:30", activity: "Отправление на Пхукет" },
    { day: "2-й день", time: "16:00", activity: "Прибытие на Пхукет и отправление в отели" }
  ],
  
  whatToBring: [
    "Купальные принадлежности (надеть сразу на себя)",
    "Полотенце",
    "Защита от солнца: крем с SPF 50+, солнцезащитные очки, головной убор",
    "Пляжная обувь: шлепки, сандалии, кроксы",
    "Коралловые тапочки (если есть)",
    "Комплект сухой сменной одежды",
    "Предметы личной гигиены",
    "Средства от комаров",
    "Телефон, камера, по желанию — непромокаемые чехлы",
    "Копия паспорта или фото в телефоне",
    "Деньги на личные расходы и чаевые"
  ],
  
  importantInfo: [
    "Детский билет 4-11 лет включительно. До 3-х лет включительно бесплатно без места в минивэне",
    "Программа тура может изменяться в зависимости от погодных условий, приливов и отливов", 
    "Бухта Майя Бэй закрыта для посещения с 1 августа по 30 сентября",
    "Программа подходит для беременных, детей до года, людей любого возраста и веса"
  ]
};

const PhiPhi2Days1Night = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setShowFullGallery(true);
  };

  const openGallery = () => {
    setShowFullGallery(true);
    setSelectedImage(excursion.gallery[0]);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowThumbnails(false);
    setShowFullGallery(false);
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

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(excursion.gallery[index]);
    setShowThumbnails(false);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
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

    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  // Keyboard navigation
  const handleKeyPress = (e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModal();
  };

  // Add keyboard event listener
  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4">
                <span className="text-green-600 font-medium">Экскурсии • Пхи-Пхи</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                {excursion.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {excursion.subtitle}
              </p>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{excursion.rating}</span>
                  <span className="text-gray-600">({excursion.reviewsCount} отзывов)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{excursion.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{excursion.groupSize}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-green-600">
                  {excursion.price} {excursion.currency}
                </div>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                  Забронировать
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={excursion.mainImage} 
                alt={excursion.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1">Фотографии</h2>
            <p className="text-gray-600 text-sm">{excursion.gallery.length} фото</p>
          </div>
          
          {/* Mobile-first Gallery Layout */}
          <div className="relative">
            {/* Mobile: 2 photos + show more button */}
            <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden sm:hidden">
              <div 
                className="aspect-square cursor-pointer relative overflow-hidden"
                onClick={() => openModal(excursion.gallery[0], 0)}
              >
                <img 
                  src={excursion.gallery[0]} 
                  alt="Maya Bay"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div 
                className="aspect-square cursor-pointer relative overflow-hidden"
                onClick={openGallery}
              >
                <img 
                  src={excursion.gallery[1]} 
                  alt="Gallery preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-lg font-semibold">+{excursion.gallery.length - 2}</div>
                    <div className="text-xs">фото</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: 3 photos layout */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-2 rounded-lg overflow-hidden max-w-4xl">
              {/* First large photo */}
              <div 
                className="col-span-2 aspect-[4/3] cursor-pointer group relative overflow-hidden"
                onClick={() => openModal(excursion.gallery[0], 0)}
              >
                <img 
                  src={excursion.gallery[0]} 
                  alt="Maya Bay"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              {/* Two smaller photos */}
              <div className="flex flex-col gap-2">
                <div 
                  className="aspect-[4/3] cursor-pointer group relative overflow-hidden"
                  onClick={() => openModal(excursion.gallery[1], 1)}
                >
                  <img 
                    src={excursion.gallery[1]} 
                    alt="Gallery 2"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                
                <div 
                  className="aspect-[4/3] cursor-pointer group relative overflow-hidden"
                  onClick={openGallery}
                >
                  <img 
                    src={excursion.gallery[2]} 
                    alt="Gallery 3"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-lg font-semibold mb-1">+{excursion.gallery.length - 3}</div>
                      <div className="text-sm">больше фото</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Show all photos button */}
            <div className="mt-3 sm:hidden">
              <button
                onClick={openGallery}
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Посмотреть все {excursion.gallery.length} фото
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Описание экскурсии</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {excursion.description}
                  </p>
                  <h3 className="text-xl font-semibold mb-4">Что вас ждет:</h3>
                  <ul className="space-y-2">
                    {excursion.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Программа тура</h2>
                  <div className="space-y-6">
                    {(() => {
                      const day1Items = excursion.schedule.filter(item => item.day === "1-й день");
                      const day2Items = excursion.schedule.filter(item => item.day === "2-й день");
                      
                      return (
                        <>
                          <div>
                            <h3 className="text-xl font-semibold mb-4 text-green-600 border-b border-green-200 pb-2">
                              1-й день
                            </h3>
                            <div className="space-y-3">
                              {day1Items.map((item, index) => (
                                <div key={index} className="flex gap-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                                  <div className="text-green-700 font-semibold min-w-[80px] text-sm">
                                    {item.time}
                                  </div>
                                  <div className="text-gray-700 text-sm">{item.activity}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-semibold mb-4 text-emerald-600 border-b border-emerald-200 pb-2">
                              2-й день
                            </h3>
                            <div className="space-y-3">
                              {day2Items.map((item, index) => (
                                <div key={index} className="flex gap-4 p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-400">
                                  <div className="text-emerald-700 font-semibold min-w-[80px] text-sm">
                                    {item.time}
                                  </div>
                                  <div className="text-gray-700 text-sm">{item.activity}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-green-600">Включено в стоимость</h3>
                    <ul className="space-y-2">
                      {excursion.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-red-600">Не включено</h3>
                    <ul className="space-y-2">
                      {excursion.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* What to Bring */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Взять с собой</h3>
                  <ul className="space-y-2">
                    {excursion.whatToBring.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Important Info */}
              <Card className="mb-8 bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-700">Важно знать</h3>
                  <ul className="space-y-2">
                    {excursion.importantInfo.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {excursion.price} {excursion.currency}
                    </div>
                    <div className="text-gray-600">за человека</div>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>Продолжительность: {excursion.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span>Группа: {excursion.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>Ежедневно</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>Трансфер включен</span>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-4">
                    Забронировать сейчас
                  </Button>
                  <Button variant="outline" className="w-full">
                    Задать вопрос
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-first Gallery Modal */}
      {selectedImage && showFullGallery && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Mobile-optimized Header */}
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

          {/* Mobile-optimized Image Area */}
          <div 
            className="flex-1 flex items-center justify-center relative px-2 py-4 gallery-modal"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 z-10 bg-black bg-opacity-60 rounded-full hidden sm:block transition-all duration-200 hover:bg-opacity-80"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image - Mobile optimized */}
            <img
              src={selectedImage}
              alt={`Галерея ${currentImageIndex + 1}`}
              className="max-w-full gallery-image object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            />

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 z-10 bg-black bg-opacity-60 rounded-full hidden sm:block transition-all duration-200 hover:bg-opacity-80"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Mobile Navigation Dots - только первые несколько для компактности */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:hidden">
              {excursion.gallery.slice(0, Math.min(8, excursion.gallery.length)).map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-40'
                  }`}
                />
              ))}
              {excursion.gallery.length > 8 && (
                <span className="text-white text-xs opacity-60 ml-2">
                  +{excursion.gallery.length - 8}
                </span>
              )}
            </div>

            {/* Touch hint for mobile - показывается только первые несколько секунд */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-50 sm:hidden animate-pulse">
              ← Свайп для навигации →
            </div>
          </div>

          {/* Thumbnails */}
          {showThumbnails && (
            <div className="bg-black bg-opacity-90 p-4 max-h-32 overflow-hidden">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {excursion.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-white' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Миниатюра ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Navigation Bottom Bar */}
          <div className="flex justify-between items-center p-3 bg-black bg-opacity-90 sm:hidden safe-area-bottom">
            <button
              onClick={prevImage}
              className="flex-1 flex items-center justify-center p-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="text-sm">Назад</span>
            </button>
            
            <div className="flex-1 text-center">
              <span className="text-white text-sm font-medium">
                {currentImageIndex + 1} из {excursion.gallery.length}
              </span>
            </div>
            
            <button
              onClick={nextImage}
              className="flex-1 flex items-center justify-center p-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            >
              <span className="text-sm">Далее</span>
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PhiPhi2Days1Night;