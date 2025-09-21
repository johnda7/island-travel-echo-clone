// 🚨 ВАЖНО: Этот файл создан по эталону PhiPhi2Days1Night.tsx
// Структура ТОЧНО копирует защищенный эталон. Канонический путь:
// /excursion/dostoprimechatelnosti-phuketa
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3, Minus, Plus } from "lucide-react";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import TourTags from "@/components/TourTags";

// Import images from WordPress - ALL REAL PHOTOS
import bigBuddhaMain from "@/assets/dostoprimechatelnosti-phuketa/big-buddha-viewpoint.jpg";
import watChalongMain from "@/assets/dostoprimechatelnosti-phuketa/wat-chalong-main.jpg";
import watChalong1 from "@/assets/dostoprimechatelnosti-phuketa/wat-chalong-1.jpg";
import watChalong2 from "@/assets/dostoprimechatelnosti-phuketa/wat-chalong-2.jpg";
import oldTownMain from "@/assets/dostoprimechatelnosti-phuketa/old-town-main.jpg";
import oldTown1 from "@/assets/dostoprimechatelnosti-phuketa/old-town-1.jpg";
import promthepMain from "@/assets/dostoprimechatelnosti-phuketa/promthep-cape-main.jpg";
import promthep1 from "@/assets/dostoprimechatelnosti-phuketa/promthep-cape-1.jpg";
import karonViewpointMain from "@/assets/dostoprimechatelnosti-phuketa/karon-viewpoint-main.jpg";
import karonViewpoint1 from "@/assets/dostoprimechatelnosti-phuketa/karon-viewpoint-1.jpg";
import karonViewpoint2 from "@/assets/dostoprimechatelnosti-phuketa/karon-viewpoint-2.jpg";
import rangHillMain from "@/assets/dostoprimechatelnosti-phuketa/rang-hill-main.jpg";
import rangHill1 from "@/assets/dostoprimechatelnosti-phuketa/rang-hill-1.jpg";
import windmillMain from "@/assets/dostoprimechatelnosti-phuketa/windmill-viewpoint-main.jpg";
import windmill1 from "@/assets/dostoprimechatelnosti-phuketa/windmill-viewpoint-1.jpg";
import windmill2 from "@/assets/dostoprimechatelnosti-phuketa/windmill-viewpoint-2.jpg";
import elephantMain from "@/assets/dostoprimechatelnosti-phuketa/elephant-feeding-main.jpg";
import elephant1 from "@/assets/dostoprimechatelnosti-phuketa/elephant-feeding-1.jpg";

const excursion = {
  id: "dostoprimechatelnosti-phuketa",
  route: "/tours/dostoprimechatelnosti-phuketa",
  title: "Достопримечательности Пхукета",
  subtitle: "Обзорная экскурсия без шопинга (1 день)",
  priceAdult: 1900,
  priceChild: 1400,
  currency: "฿",
  duration: "1 день (8 часов)",
  groupSize: "до 30 человек",
  rating: 4.8,
  reviewsCount: 243,
  mainImage: bigBuddhaMain,
  gallery: [
    bigBuddhaMain,
    watChalongMain,
    watChalong1,
    watChalong2,
    oldTownMain,
    oldTown1,
    promthepMain,
    promthep1,
    karonViewpointMain,
    karonViewpoint1,
    karonViewpoint2,
    rangHillMain,
    rangHill1,
    windmillMain,
    windmill1,
    windmill2,
    elephantMain,
    elephant1
  ],
  description: `
Познакомьтесь с главными достопримечательностями Пхукета за один день! Эта обзорная экскурсия без навязчивого шопинга покажет вам самые красивые и значимые места острова.

Вы увидите величественного Большого Будду высотой 45 метров, посетите самый почитаемый храм Ват Чалонг, прогуляетесь по историческому старому городу с его уникальной сино-португальской архитектурой и полюбуетесь панорамными видами с лучших смотровых площадок острова.

Программа идеально подходит для семей с детьми, людей любого возраста и тех, кто хочет получить полное представление о культуре и красоте Пхукета за один день.
`,
  highlights: [
    "Большой Будда - символ Пхукета высотой 45 метров",
    "Храм Ват Чалонг - самый почитаемый храм острова",
    "Прогулка по историческому старому городу",
    "Мыс Промтеп - лучшая смотровая площадка для заката",
    "Фабрика кешью с дегустацией местных продуктов",
    "Панорамные виды на весь остров с высоты птичьего полёта"
  ],
  included: [
    "Трансфер из районов Равай, Найхарн, Ката, Карон, Патонг",
    "Русскоговорящий гид",
    "Обед в местном ресторане тайской кухни",
    "Входные билеты на фабрику кешью",
    "Дегустация местных продуктов",
    "Прохладительные напитки в автобусе",
    "Медицинская страховка"
  ],
  notIncluded: [
    "Личные расходы на сувениры",
    "Алкогольные напитки", 
    "Чаевые гиду (по желанию)",
    "Трансфер из отдаленных районов (Камала, Сурин, Бангтао) - 300 бат с человека"
  ],
  schedule: [
    { day: "1-й день", time: "08:00", activity: "Трансфер из отеля, начало обзорной экскурсии" },
    { day: "1-й день", time: "09:00", activity: "Посещение Большого Будды - главной достопримечательности Пхукета" },
    { day: "1-й день", time: "10:30", activity: "Храм Ват Чалонг - самый важный буддийский храм острова" },
    { day: "1-й день", time: "12:00", activity: "Обед в местном ресторане тайской кухни" },
    { day: "1-й день", time: "13:30", activity: "Прогулка по старому городу Пхукета - сино-португальская архитектура" },
    { day: "1-й день", time: "15:00", activity: "Посещение фабрики кешью с дегустацией местных продуктов" },
    { day: "1-й день", time: "16:30", activity: "Мыс Промтеп - лучшая смотровая площадка на острове" },
    { day: "1-й день", time: "17:30", activity: "Трансфер обратно в отель" }
  ],
  
  whatToBring: [
    "Удобная обувь для прогулок",
    "Защита от солнца: крем с SPF 50+, солнцезащитные очки, головной убор",
    "Легкая одежда, закрывающая плечи и колени для посещения храмов",
    "Телефон, камера для фотографий",
    "Копия паспорта или фото в телефоне",
    "Деньги на личные расходы и сувениры"
  ],
  
  importantInfo: [
    "Детский билет 4-11 лет включительно. До 3-х лет включительно бесплатно",
    "Программа тура может изменяться в зависимости от дорожной ситуации",
    "При посещении храмов необходима закрытая одежда (плечи и колени)",
    "Рекомендуем взять с собой головной убор и солнцезащитный крем",
    "Программа подходит для людей любого возраста"
  ],
  
  tags: [
    "культурные экскурсии",
    "достопримечательности", 
    "храмы",
    "большой будда",
    "ват чалонг",
    "старый город",
    "смотровые площадки",
    "1 день"
  ]
};

const DostoprimechatelnostiPhuketa = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState<number>(0);
  
  // Универсальное модальное окно бронирования
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Калькулятор цен для sidebar (отдельно от UniversalBookingModal)
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const totalPrice = adults * excursion.priceAdult + children * excursion.priceChild;

  // Gallery functions - EXACT COPY from PhiPhi
  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
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

  const openGallery = () => {
    setShowFullGallery(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setShowFullGallery(false);
    document.body.style.overflow = 'unset';
  };

  // Touch handlers for mobile swipe
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
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModal();
  }, [selectedImage]);

  // Add keyboard event listener
  useEffect(() => {
    if (!selectedImage) return;
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, handleKeyPress]);

  // Handle mobile gallery scroll
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
              <Link to="/tours?category=cultural" className="hover:text-green-600 transition-colors">Культурные экскурсии</Link>
              <span>›</span>
              <span className="text-gray-700">Достопримечательности Пхукета</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Gallery section - EXACT COPY from PhiPhi */}
      <section className="pb-2">
        {/* Mobile gallery */}
        <div className="md:hidden">
          <div className="relative">
            <div 
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              onScroll={handleMobileGalleryScroll}
              style={{ scrollBehavior: 'smooth' }}
              id="mobile-gallery"
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

            {/* Mobile dots indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {excursion.gallery.slice(0, 6).map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === mobileGalleryIndex ? 'bg-green-600 scale-110' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                    setMobileGalleryIndex(index);
                    const carousel = document.getElementById('mobile-gallery');
                    if (carousel) {
                      carousel.scrollTo({
                        left: index * carousel.clientWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                />
              ))}
            </div>
            
            {/* Show all photos button - mobile only */}
            <div className="mt-4 px-4">
              <button
                onClick={openGallery}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Показать все {excursion.gallery.length} фото
              </button>
            </div>
          </div>
        </div>
        
        {/* Desktop gallery */}
        <div className="container mx-auto px-4 hidden md:block">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="hidden md:block">
                <div className="grid grid-cols-4 gap-2 h-96">
                  {/* Main large photo */}
                  <div 
                    className="col-span-2 row-span-2 relative overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => openModal(excursion.mainImage, 0)}
                  >
                    <img 
                      src={excursion.mainImage} 
                      alt="Main tour photo"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Small photos */}
                  {excursion.gallery.slice(1, 5).map((image, index) => (
                    <div 
                      key={index}
                      className="relative overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => openModal(image, index + 1)}
                    >
                      <img 
                        src={image} 
                        alt={`Gallery ${index + 2}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      {index === 3 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-xl font-bold mb-1">+{excursion.gallery.length - 5}</div>
                            <div className="text-sm">фото</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Show all photos button - desktop */}
                <div className="mt-4">
                  <button
                    onClick={openGallery}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Grid3X3 className="w-4 h-4" />
                    Показать все {excursion.gallery.length} фото
                  </button>
                </div>
              </div>
            </div>

            {/* Tags section - компактно под фото как на tisland.travel */}
            <section className="pb-4">
              <div className="container mx-auto px-4">
                <TourTags tags={excursion.tags || []} showLabel={false} />
              </div>
            </section>

            {/* Desktop booking card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-lg border-0 bg-white">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                      </div>
                      <p className="text-gray-600">за взрослого</p>
                    </div>

                    {/* Price calculator */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Взрослые</span>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            disabled={adults <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold w-8 text-center">{adults}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAdults(adults + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Дети (4-11 лет)</span>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            disabled={children <= 0}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold w-8 text-center">{children}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setChildren(children + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Итого:</span>
                          <span className="text-green-600">{totalPrice.toLocaleString()} {excursion.currency}</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => setShowBookingModal(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                    >
                      Забронировать за {totalPrice.toLocaleString()} {excursion.currency}
                    </Button>
                    <Button variant="outline" asChild className="w-full py-3 border-gray-300">
                      <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
                        Задать вопрос в Telegram
                      </a>
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-3">
                      Бесплатная отмена за 24 часа
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Title and basic info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{excursion.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{excursion.subtitle}</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Продолжительность</p>
                    <p className="font-semibold">{excursion.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Размер группы</p>
                    <p className="font-semibold">{excursion.groupSize}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-500">Рейтинг</p>
                    <p className="font-semibold">{excursion.rating}/5 ({excursion.reviewsCount} отзывов)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Тип</p>
                    <p className="font-semibold">Культурная экскурсия</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">Описание тура</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {excursion.description}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Что вас ждёт</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {excursion.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Программа тура</h2>
              <div className="space-y-4">
                {excursion.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-green-600">{item.time}</span>
                      </div>
                      <p className="text-gray-700">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">Включено в стоимость</h3>
                <ul className="space-y-2">
                  {excursion.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-red-600">Не включено в стоимость</h3>
                <ul className="space-y-2">
                  {excursion.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What to bring */}
            <div>
              <h3 className="text-xl font-bold mb-4">Что взять с собой</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {excursion.whatToBring.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-800">Важная информация</h3>
              <ul className="space-y-2">
                {excursion.importantInfo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-yellow-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile booking card */}
          <div className="lg:hidden">
            <Card className="shadow-lg border-0 bg-white sticky bottom-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xl font-bold text-green-600">
                      от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                    </div>
                    <p className="text-sm text-gray-600">за взрослого</p>
                  </div>
                  <Button 
                    onClick={() => setShowBookingModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6"
                  >
                    Забронировать
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Модальное окно бронирования */}
      <UniversalBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tourData={excursion}
      />

      {/* Image modal - EXACT COPY from PhiPhi */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 z-10"
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 text-white hover:bg-white hover:bg-opacity-20 z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <div 
              className="max-w-4xl max-h-full mx-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={selectedImage}
                alt="Tour photo"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 text-white hover:bg-white hover:bg-opacity-20 z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {excursion.gallery.length}
            </div>
          </div>
        </div>
      )}

      {/* Full gallery modal - EXACT COPY from PhiPhi */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto">
          <div className="min-h-full p-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Все фотографии ({excursion.gallery.length})</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeGallery}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {excursion.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => {
                    closeGallery();
                    openModal(image, index);
                  }}
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DostoprimechatelnostiPhuketa;