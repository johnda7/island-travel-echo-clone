import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3, Minus, Plus } from "lucide-react";

// Импортируем изображения из нашей папки
import airplaneBeach from "@/assets/rassvetnoe-prikljuchenie/airplane-beach.jpg";
import beyondSkywalk from "@/assets/rassvetnoe-prikljuchenie/beyond-skywalk.jpg";
import babyElephantShow from "@/assets/rassvetnoe-prikljuchenie/baby-elephant-show.jpg";
import elephantShow from "@/assets/rassvetnoe-prikljuchenie/elephant-show.jpg";
import elephantSpa from "@/assets/rassvetnoe-prikljuchenie/elephant-spa.jpg";
import showeringElephant from "@/assets/rassvetnoe-prikljuchenie/showering-elephant.jpg";
import blackMonkStatue from "@/assets/rassvetnoe-prikljuchenie/black-monk-statue.jpg";

const excursion = {
  title: "РАССВЕТНОЕ ПРИКЛЮЧЕНИЕ",
  subtitle: "Стеклянный мост Beyond Skywalk, о.Джеймса Бонда, пляж с самолётами и кувшинки Ma Doo Bua",
  priceAdult: 2500,
  priceChild: 2198,
  currency: "฿",
  duration: "1 день (7.5 часов)",
  groupSize: "до 12 человек",
  rating: 4.9,
  reviewsCount: 47,
  mainImage: airplaneBeach,
  gallery: [
    airplaneBeach,
    beyondSkywalk,
    babyElephantShow,
    elephantShow,
    elephantSpa,
    showeringElephant,
    blackMonkStatue
  ],
  highlights: [
    "Встреча рассвета на стеклянном мосту Beyond Skywalk",
    "Завтрак на смотровой с панорамным видом",
    "Прогулка на длиннохвостой лодке к острову Джеймса Бонда",
    "Уникальный пляж с взлетающими самолетами",
    "Фотосессия в кафе с гигантскими кувшинками Ma Doo Bua",
    "Осмотр необитаемых островов по пути"
  ],
  included: [
    "Трансфер из отеля и обратно",
    "Экскурсионный гид",
    "Страховка на время тура",
    "Посещение стеклянного моста Beyond Skywalk",
    "Завтрак на смотровой в формате шведского стола",
    "Напиток в кафе Ma Doo Bua",
    "Прогулка на традиционной длиннохвостой лодке"
  ],
  excluded: [
    "Дополнительные напитки и еда",
    "Сувениры и личные расходы",
    "Чаевые гиду",
    "Входные билеты в дополнительные локации"
  ],
  schedule: [
    { time: "05:45", activity: "Прибытие на уникальный мост Beyond Skywalk: сделайте шаг на прозрачный стеклянный пол и насладитесь захватывающими видами" },
    { time: "06:15", activity: "Встреча рассвета — магия первых лучей солнца, освещающих бескрайние воды и живописные горы" },
    { time: "06:45", activity: "Завтрак на смотровой: утренний прием пищи в ресторане в формате шведского стола на высоте с панорамными видами" },
    { time: "08:00", activity: "Прогулка на традиционной длиннохвостой лодке — водная прогулка по живописным бухтам к острову Джеймса Бонда" },
    { time: "09:30", activity: "Возвращение на Пхукет. После прогулки отправление к пляжам Пхукета" },
    { time: "10:30", activity: "Пляж с самолетами. Возможность сделать незабываемые кадры на фоне взлетающих прямо над головой самолетов" },
    { time: "12:30", activity: "Визит в кафе с кувшинками. Остановка в знаменитом кафе с гигантскими кувшинками Ma Doo Bua для фотосессии и отдыха" },
    { time: "13:00-13:30", activity: "Отправление обратно в отель. После посещения Ma Doo Bua Café отправление прямо в отель для отдыха после насыщенного утра" }
  ],
  requirements: [
    "Полотенце для пляжа",
    "Купальные принадлежности",
    "Солнцезащитный крем",
    "Головной убор для защиты от солнца",
    "Сменную одежду",
    "Фото/видео камеру для запечатления ярких моментов",
    "Деньги на сувениры и личные расходы",
    "Дождевики на случай плохой погоды"
  ],
  importantInfo: [
    "Программа может меняться в связи с погодными условиями или другими непредвиденными обстоятельствами",
    "Программа может быть организована индивидуально с изменением таймингов и последовательности этапов экскурсии",
    "Рекомендуется ранний подъем для полного наслаждения рассветом",
    "Детский билет 4-11 лет включительно. До 3-х лет включительно бесплатно"
  ]
};

// 🚨 Компонент бронирования - ВНИМАНИЕ: следует точно PhiPhi шаблону!
interface UniversalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  excursion: {
    title: string;
    priceAdult: number;
    priceChild: number;
    currency: string;
  };
}

function UniversalBookingModal({ isOpen, onClose, excursion }: UniversalBookingModalProps) {
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
    comment: ""
  });

  const totalPrice = (adultCount * excursion.priceAdult) + (childCount * excursion.priceChild);

  const handleBooking = () => {
    const message = `🌅 Бронирование тура: ${excursion.title}

👥 Количество участников:
• Взрослые: ${adultCount} чел.
• Дети (4-11 лет): ${childCount} чел.
• Младенцы (до 3 лет): ${infantCount} чел.

📅 Дата тура: ${selectedDate}

💰 Общая стоимость: ${totalPrice.toLocaleString()} ${excursion.currency}

👤 Контактная информация:
• Имя: ${contactInfo.name}
• Телефон: ${contactInfo.phone}
• Email: ${contactInfo.email}
• Комментарий: ${contactInfo.comment}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/Phuketga?text=${encodedMessage}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Бронирование тура</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <h3 className="font-semibold mb-4">{excursion.title}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Количество участников</label>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Взрослые ({excursion.priceAdult.toLocaleString()} {excursion.currency})</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{adultCount}</span>
                    <button 
                      onClick={() => setAdultCount(adultCount + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Дети 4-11 лет ({excursion.priceChild.toLocaleString()} {excursion.currency})</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setChildCount(Math.max(0, childCount - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{childCount}</span>
                    <button 
                      onClick={() => setChildCount(childCount + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Младенцы до 3 лет (бесплатно)</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setInfantCount(Math.max(0, infantCount - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{infantCount}</span>
                    <button 
                      onClick={() => setInfantCount(infantCount + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Дата тура</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ваше имя"
                value={contactInfo.name}
                onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <textarea
                placeholder="Комментарий (необязательно)"
                value={contactInfo.comment}
                onChange={(e) => setContactInfo({...contactInfo, comment: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 resize-none"
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Итого:</span>
                <span>{totalPrice.toLocaleString()} {excursion.currency}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleBooking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!selectedDate || !contactInfo.name || !contactInfo.phone}
            >
              Забронировать за {totalPrice.toLocaleString()} {excursion.currency}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RassvetnoePrikljuchenie() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openGallery = useCallback((index: number) => {
    setSelectedImage(index);
    setCurrentImageIndex(index);
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? excursion.gallery.length - 1 : prev - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === excursion.gallery.length - 1 ? 0 : prev + 1
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'Escape') closeGallery();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, goToPrevious, goToNext, closeGallery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={excursion.mainImage} 
          alt={excursion.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{excursion.title}</h1>
            <p className="text-lg md:text-xl">{excursion.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Главная</Link>
            <span className="mx-2">/</span>
            <Link to="/tours" className="hover:text-blue-600">Туры</Link>
            <span className="mx-2">/</span>
            <span>{excursion.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Фотогалерея тура</h2>
                
                {/* Mobile Gallery - Single Column */}
                <div className="block md:hidden">
                  <div className="grid grid-cols-1 gap-4">
                    {excursion.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-video overflow-hidden rounded-lg cursor-pointer" onClick={() => openGallery(index)}>
                        <img 
                          src={image} 
                          alt={`Фото ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Gallery - Grid Layout */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-4 gap-4">
                    {excursion.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-lg cursor-pointer" onClick={() => openGallery(index)}>
                        <img 
                          src={image} 
                          alt={`Фото ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Описание тура</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6">
                    Раннее утро, встреча рассвета на стеклянном мосту, завтрак на смотровой, остров Джеймса Бонда, 
                    уникальный пляж с самолётами и знаменитое кафе с гигантскими кувшинками — всё в одном насыщенном дне!
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Основные моменты тура:</h3>
                  <ul className="space-y-2">
                    {excursion.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-700">В стоимость включено:</h4>
                      <ul className="space-y-1 text-sm">
                        {excursion.included.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 text-red-700">Дополнительно оплачивается:</h4>
                      <ul className="space-y-1 text-sm">
                        {excursion.excluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-600">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{excursion.rating}</span>
                  <span className="text-gray-600">({excursion.reviewsCount} отзывов)</span>
                </div>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                  </div>
                  <div className="text-gray-600">за взрослого</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Дети 4-11 лет: {excursion.priceChild.toLocaleString()} {excursion.currency}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span>{excursion.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-4 h-4" />
                    <span>{excursion.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4" />
                    <span>Трансфер включен</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  Забронировать за {excursion.priceAdult.toLocaleString()} {excursion.currency}
                </Button>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  Бронирование без предоплаты
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Itinerary Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Программа тура</h2>
            <div className="space-y-4">
              {excursion.schedule.map((item, index) => (
                <div key={index} className="flex gap-4 border-l-2 border-blue-200 pl-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="font-semibold text-blue-600 whitespace-nowrap">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Что взять с собой:</h3>
                <ul className="space-y-1 text-sm">
                  {excursion.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Важная информация:</h3>
                <ul className="space-y-1 text-sm">
                  {excursion.importantInfo.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600">⚠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Gallery Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button 
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-4xl max-h-full p-4">
            <img 
              src={excursion.gallery[currentImageIndex]} 
              alt={`Фото ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {excursion.gallery.length}
          </div>
        </div>
      )}

      <UniversalBookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        excursion={excursion}
      />

      <Footer />
    </div>
  );
}