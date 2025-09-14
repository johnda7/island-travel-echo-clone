import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";

// Import images for James Bond Island tour
import { 
  jamesBondImages, 
  jamesBondImageDescriptions 
} from "@/assets/james-bond-island/images";

const excursion = {
  title: "Остров Джеймса Бонда",
  subtitle: "Легендарное место съемок фильма в заливе Пханг Нга",
  priceAdult: 2590,
  priceChild: 1800,
  currency: "฿",
  duration: "1 день (8 часов)",
  groupSize: "до 35 человек", 
  rating: 4.9,
  reviewsCount: 287,
  mainImage: jamesBondImages.main,
  gallery: jamesBondImages.gallery,
  description: `
Погружайтесь в мир Джеймса Бонда на легендарном острове Ко Тапу в заливе Пханг Нга! Именно здесь снимали знаменитые сцены из фильма "Человек с золотым пистолетом". Наша экскурсия — это не просто осмотр достопримечательностей, а настоящее приключение среди изумрудных вод и известняковых скал-великанов.

Вы проплывете на каноэ через тайные пещеры и лагуны, недоступные большим лодкам, откроете для себя удивительный мир мангровых зарослей. В плавучей деревне мусульман познакомитесь с традиционным образом жизни местных рыбаков, которые живут на воде уже много поколений.

Гарантируем аутентичный опыт: русскоговорящий гид расскажет захватывающие истории съемок, местные легенды и секреты залива Пханг Нга. Обед из свежайших морепродуктов в ресторане на воде — это кулинарное путешествие, которое запомнится надолго.
`,
  highlights: [
    "Знаменитая скала Ко Тапу из фильма о Джеймсе Бонде",
    "Каноэ по секретным пещерам и лагунам залива Пханг Нга",  
    "Плавучая деревня мусульман с традиционным укладом жизни",
    "Обед из морепродуктов в аутентичном ресторане на воде",
    "Мангровые заросли и уникальная экосистема залива",
    "Русскоговорящий гид-эксперт по истории съемок"
  ],
  included: [
    "Трансфер из отелей Пхукета и обратно",
    "Русскоговорящий гид",
    "Лодочная экскурсия в залив Пханг Нга", 
    "Каноэ с инструктором",
    "Обед из морепродуктов",
    "Входные билеты в национальный парк",
    "Страховка",
    "Спасательные жилеты"
  ],
  notIncluded: [
    "Личные расходы",
    "Напитки во время обеда", 
    "Чаевые гиду и персоналу (по желанию)",
    "Дополнительные экскурсии"
  ],
  schedule: [
    { day: "1-й день", time: "07:00-08:30", activity: "Трансфер из отелей Пхукета (время зависит от локации отеля)" },
    { day: "1-й день", time: "09:00-09:30", activity: "Прибытие на пристань, инструктаж по безопасности, посадка на лодку" },
    { day: "1-й день", time: "10:00-11:30", activity: "Переход в залив Пханг Нга, осмотр известняковых скал" },
    { day: "1-й день", time: "11:30-12:30", activity: "Остров Джеймса Бонда (Ко Тапу) — фотосессия у знаменитой скалы" },
    { day: "1-й день", time: "12:30-14:00", activity: "Каноэ по пещерам и мангровым зарослям острова Пханг Нга" },
    { day: "1-й день", time: "14:00-15:30", activity: "Обед из морепродуктов в ресторане плавучей деревни" },
    { day: "1-й день", time: "15:30-16:30", activity: "Посещение плавучей деревни мусульман, знакомство с бытом" },
    { day: "1-й день", time: "16:30-17:30", activity: "Обратный переход к пристани, отдых на лодке" },
    { day: "1-й день", time: "17:30-19:00", activity: "Трансфер в отели Пхукета" }
  ]
};

const JamesBondIsland = () => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [showGallery, setShowGallery] = useState<boolean>(false);

  useEffect(() => {
    if (showGallery) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showGallery]);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % excursion.gallery.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + excursion.gallery.length) % excursion.gallery.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <span className="mx-2">›</span>
          <Link to="/tours" className="hover:text-blue-600">Туры</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Морские экскурсии</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{excursion.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={excursion.mainImage} 
          alt={excursion.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-4">{excursion.title}</h1>
            <p className="text-xl mb-6">{excursion.subtitle}</p>
            <div className="flex justify-center items-center space-x-6 text-lg">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {excursion.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {excursion.groupSize}
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
                {excursion.rating}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {excursion.priceAdult} {excursion.currency}
              </div>
              <div className="text-sm text-gray-600">Взрослый</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {excursion.priceChild} {excursion.currency}
              </div>
              <div className="text-sm text-gray-600">Ребенок</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-2xl font-bold ml-2">{excursion.rating}</span>
              </div>
              <div className="text-sm text-gray-600">{excursion.reviewsCount} отзывов</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-sm text-gray-600">{excursion.duration}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Description */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Описание экскурсии</h2>
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  {excursion.description.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4">
                        {paragraph.trim()}
                      </p>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Особенности тура</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {excursion.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Программа тура</h2>
                <div className="space-y-4">
                  {excursion.schedule.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="font-semibold text-blue-600">{item.time}</div>
                        <div className="text-gray-700">{item.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Included/Not Included */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-600">Включено в стоимость</h3>
                  <ul className="space-y-2">
                    {excursion.included.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-600">Не включено</h3>
                  <ul className="space-y-2">
                    {excursion.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">✗</span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Booking Card */}
            <Card className="sticky top-4 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Забронировать тур</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {excursion.priceAdult} {excursion.currency}
                  </div>
                  <div className="text-gray-600">за взрослого</div>
                  <div className="text-lg text-gray-600">
                    Дети: {excursion.priceChild} {excursion.currency}
                  </div>
                </div>
                
                <Button 
                  className="w-full mb-4 bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                  onClick={() => {
                    const message = `🏝️ НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ

ТУР: ${excursion.title}
ДАТА: 
КОЛ-ВО: взрослых + детей
ОТЕЛЬ/ПИКАП: 
КОНТАКТ: [имя, телефон]

ЦЕНЫ:
- Взрослые: ${excursion.priceAdult} ฿
- Дети (4-11 лет): ${excursion.priceChild} ฿

Готов к бронированию!`;
                    
                    window.open(`https://wa.me/66934740231?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                >
                  📱 Забронировать в WhatsApp
                </Button>
                
                <div className="text-xs text-gray-500 text-center">
                  Ответим в течение 2 минут
                </div>
              </CardContent>
            </Card>

            {/* Gallery Preview */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Фотографии</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {excursion.gallery.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={jamesBondImageDescriptions[index]}
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setSelectedImage(index);
                        setShowGallery(true);
                      }}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowGallery(true)}
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Посмотреть все фото ({excursion.gallery.length})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center p-4">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
            
            <img
              src={excursion.gallery[selectedImage]}
              alt={jamesBondImageDescriptions[selectedImage]}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {selectedImage + 1} / {excursion.gallery.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default JamesBondIsland;