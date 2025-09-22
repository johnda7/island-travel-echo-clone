// 🚨🚨🚨 КРИТИЧЕСКАЯ ЗАЩИТА - ЗАПРЕЩЕНО ЛЮБОЕ ИЗМЕНЕНИЕ! 🚨🚨🚨
// 🔒 ЭТОТ ФАЙЛ ЗАЩИЩЕН ОТ ИЗМЕНЕНИЙ AI АГЕНТАМИ
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: менять калькуляторы, формы бронирования, handleBooking
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: трогать useState adults/children, totalPrice
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: изменять кнопки +/-, модальные окна
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: заменять на UniversalBookingModal
// ✅ ЭТОТ ФАЙЛ - ЭТАЛОН! ТОЛЬКО ДЛЯ КОПИРОВАНИЯ В НОВЫЕ ТУРЫ
// 🚨 ПРИ ПОПЫТКЕ ИЗМЕНИТЬ - НЕМЕДЛЕННО ОСТАНОВИТЬСЯ И СПРОСИТЬ ПОЛЬЗОВАТЕЛЯ!
// 
// 🚨 ВАЖНО: Этот файл восстановлен из истории и считается защищенным.
// Не менять структуру/контент без явного согласования. Канонический путь:
// /excursion/phi-phi-2-days-1-night и /tours/phi-phi-2-days-1-night
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import TourTags from "@/components/TourTags";

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
  id: "phi-phi-2-days-1-night",
  route: "/tours/phi-phi-2-days-1-night",
  title: "Пхи-Пхи 2 дня / 1 ночь",
  subtitle: "Экскурсия с ночёвкой на островах Пхи-Пхи",
  priceAdult: 4000,
  priceChild: 3500,
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
  ],
  
  tags: [
    "морские экскурсии",
    "острова", 
    "снорклинг",
    "пляжи",
    "пхи пхи",
    "ночёвка",
    "майя бэй",
    "приключения"
  ]
};

const PhiPhi2Days1Night = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState<number>(0);
  
  // Универсальное модальное окно бронирования
  const [showBookingModal, setShowBookingModal] = useState(false);

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

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setShowThumbnails(false);
    setShowFullGallery(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const nextIndex = (prev + 1) % excursion.gallery.length;
      setSelectedImage(excursion.gallery[nextIndex]);
      return nextIndex;
    });
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const prevIndex = prev === 0 ? excursion.gallery.length - 1 : prev - 1;
      setSelectedImage(excursion.gallery[prevIndex]);
      return prevIndex;
    });
  }, []);

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
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModal();
  }, [selectedImage, nextImage, prevImage, closeModal]);

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
      
      {/* Breadcrumbs - как на tisland.travel */}
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
              <span className="text-gray-700">Пхи-Пхи 2 дня / 1 ночь</span>
            </div>
          </nav>
        </div>
      </section>



      {/* Gallery section - сразу после хлебных крошек */}
      <section className="pb-2">
        {/* Мобильная карусель - во всю ширину экрана как на tisland.travel */}
        <div className="md:hidden">
          <div className="relative">
            {/* Карусель с свайпом */}
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

            {/* Точки индикации */}
            <div className="flex justify-center mt-4 space-x-2">
              {excursion.gallery.slice(0, 6).map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === mobileGalleryIndex ? 'bg-green-600 scale-110' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                    setMobileGalleryIndex(index);
                    // Программный скролл к нужному слайду
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
            
            {/* Кнопка показать все фото - только для мобильных */}
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
        
        {/* Десктопная версия */}
        <div className="container mx-auto px-4 hidden md:block">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Галерея - левая часть на десктопе */}
            <div className="lg:col-span-2">
              {/* Десктопная галерея как на tisland.travel */}
              <div className="hidden md:block">
                <div className="grid grid-cols-4 gap-2 h-96">
                {/* Большое главное фото */}
                <div 
                  className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[0], 0)}
                >
                  <img 
                    src={excursion.gallery[0]} 
                    alt="Maya Bay"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Два средних фото справа сверху */}
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[1], 1)}
                >
                  <img 
                    src={excursion.gallery[1]} 
                    alt="Gallery 2"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[2], 2)}
                >
                  <img 
                    src={excursion.gallery[2]} 
                    alt="Gallery 3"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Два средних фото справа снизу */}
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[3], 3)}
                >
                  <img 
                    src={excursion.gallery[3]} 
                    alt="Gallery 4"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={openGallery}
                >
                  <img 
                    src={excursion.gallery[4]} 
                    alt="Gallery 5"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-lg font-semibold mb-1">+{excursion.gallery.length - 5}</div>
                      <div className="text-sm">фото</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              {/* Кнопка показать все фото */}
              <div className="mt-4">
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

            {/* Desktop Booking Sidebar - справа от фото */}
            <div className="hidden lg:block">
              <div className="sticky top-4">
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="space-y-3 mb-6 text-sm text-left">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Продолжительность: {excursion.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>Группа: {excursion.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Ежедневно</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>Трансфер включен</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        onClick={() => setShowBookingModal(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                      >
                        Забронировать тур
                      </Button>
                      <Button variant="outline" asChild className="w-full py-3 border-gray-300">
                        <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
                          Задать вопрос в Telegram
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tags section - компактно под фото как на tisland.travel */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <TourTags tags={excursion.tags || []} showLabel={false} />
        </div>
      </section>

      {/* Title and meta info - после тегов */}
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
          <div className="text-2xl font-bold text-green-600 mb-4 md:hidden">
            от {excursion.priceAdult} {excursion.currency} <span className="text-base font-normal text-gray-500">за взрослого</span>
          </div>
        </div>
      </section>

      {/* Booking section - только для мобильных, на десктопе в сайдбаре */}
      <section className="py-6 bg-gray-50 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Забронировать экскурсию</h3>
                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Продолжительность: {excursion.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>Группа: {excursion.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Ежедневно</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>Трансфер включен</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      от {excursion.priceAdult} {excursion.currency}
                    </div>
                    <div className="text-gray-500 mb-6">за взрослого</div>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => setShowBookingModal(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                      >
                        Забронировать сейчас
                      </Button>
                      <Button variant="outline" asChild className="w-full py-3 border-gray-300">
                        <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
                          Задать вопрос в Telegram
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              {/* Описание и highlights одним блоком */}
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Описание экскурсии</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {excursion.description}
                </p>
                <ul className="mb-12 space-y-2 text-gray-700">
                  {excursion.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Программа тура — компактная таблица */}
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Программа тура</h2>
              <div className="overflow-x-auto mb-12 bg-white rounded-lg shadow-sm border">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">День</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Время</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Активность</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excursion.schedule.map((item, idx) => (
                      <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium text-gray-600">{item.day}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{item.time}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{item.activity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Включено / Не включено / Взять с собой / Важно знать — простые списки */}
              <div className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-green-600">Включено в стоимость</h3>
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



      {/* Mobile booking bar - фиксированная кнопка внизу */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-lg font-bold text-green-600">
              от {excursion.priceAdult} {excursion.currency}
            </div>
            <div className="text-xs text-gray-600">взрослый / {excursion.priceChild} {excursion.currency} детский</div>
          </div>
          <Button 
            onClick={() => setShowBookingModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            Забронировать
          </Button>
        </div>
      </div>

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
                      className="w-full h-full object-cover object-center"
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

      {/* Universal Booking Modal */}
      <UniversalBookingModal
        tourData={excursion}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />

      <Footer />
    </div>
  );
};

export default PhiPhi2Days1Night;