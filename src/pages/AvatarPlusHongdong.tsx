import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, Star, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { avatarPlusTourData } from "@/data/avatarPlusTour";

const AvatarPlusHongdong = () => {
  const excursion = avatarPlusTourData;
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // Состояние для галереи
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  
  return (
    <>
      <Helmet>
        <title>{excursion.title} | Экскурсии на Пхукете</title>
        <meta name="description" content={excursion.description} />
      </Helmet>
      
      <div className="bg-white">
        {/* Хлебные крошки */}
        <div className="container mx-auto px-4 py-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Link to="/" className="hover:text-green-600">Главная</Link>
            <span>/</span>
            <Link to="/tours" className="hover:text-green-600">Экскурсии</Link>
            <span>/</span>
            <span className="text-gray-700">{excursion.title}</span>
          </div>
        </div>
        
        {/* Галерея фотографий */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Главное фото */}
            <div 
              className="lg:col-span-3 rounded-lg overflow-hidden h-80 lg:h-[500px] cursor-pointer"
              onClick={() => {
                setCurrentImageIndex(0);
                setShowFullGallery(true);
              }}
            >
              <img 
                src={excursion.gallery[0]} 
                alt={excursion.title}
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Дополнительные фото */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {excursion.gallery.slice(1, 5).map((img, index) => (
                <div 
                  key={index} 
                  className="rounded-lg overflow-hidden h-36 lg:h-[242px] cursor-pointer"
                  onClick={() => {
                    setCurrentImageIndex(index + 1);
                    setShowFullGallery(true);
                  }}
                >
                  <img 
                    src={img} 
                    alt={`${excursion.title} - изображение ${index + 2}`}
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Кнопка "Показать все фото" */}
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowFullGallery(true)}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              Показать все фото ({excursion.gallery.length})
            </Button>
          </div>
        </div>
        
        {/* Основной контент */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Левая колонка с информацией */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {excursion.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-4">
                {excursion.subtitle}
              </p>
              
              {/* Характеристики тура */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-1 text-green-600" />
                  <span>{excursion.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-1 text-green-600" />
                  <span>{excursion.groupSize}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-1 text-green-600" />
                  <span>Ежедневно</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 text-yellow-400 fill-current" />
                  <span>{excursion.rating} ({excursion.reviewsCount} отзывов)</span>
                </div>
              </div>
              
              {/* Описание */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Описание экскурсии
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {excursion.description}
                </p>
              </div>
              
              {/* Что вас ждет */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Что вас ждет
                </h2>
                <ul className="space-y-2">
                  {excursion.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 font-bold">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Программа */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Программа экскурсии
                </h2>
                <div className="space-y-6">
                  {excursion.itinerary.map((item, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <p className="font-semibold text-green-600">{item.time}</p>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Что включено */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  В стоимость включено
                </h2>
                <ul className="space-y-2">
                  {excursion.included.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Что не включено */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  В стоимость не включено
                </h2>
                <ul className="space-y-2">
                  {excursion.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Что взять с собой */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Что взять с собой
                </h2>
                <ul className="space-y-2">
                  {excursion.requirements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Важная информация */}
              <div className="mb-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-4">
                  <Info className="w-6 h-6 text-yellow-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Важная информация
                  </h2>
                </div>
                <ul className="space-y-2">
                  {excursion.importantInfo.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-600 mr-2">!</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Правая колонка с бронированием */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 sticky top-20">
                <div className="mb-4">
                  <p className="text-lg text-gray-500">Цена:</p>
                  <div className="flex items-baseline mb-2">
                    <span className="text-3xl font-bold text-green-600">
                      {excursion.priceAdult.toLocaleString()} {excursion.currency}
                    </span>
                    <span className="text-gray-500 ml-2">/ взрослый</span>
                  </div>
                  <div className="text-gray-600 mb-4">
                    Дети (до 12 лет): {excursion.priceChild.toLocaleString()} {excursion.currency}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full py-3 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
                    size="lg"
                  >
                    Забронировать тур
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full py-3 border-gray-300">
                    <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
                      Задать вопрос в Telegram
                    </a>
                  </Button>
                </div>
                
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Бесплатная отмена за 24 часа до начала
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Модальное окно бронирования */}
      <ModalPortal>
        <UniversalBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          tourData={excursion}
        />
      </ModalPortal>
      
      {/* Полноэкранная галерея */}
      {showFullGallery && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col">
            <div className="absolute top-4 right-4 z-10">
              <Button 
                variant="outline" 
                className="bg-white bg-opacity-10 text-white border-none hover:bg-white hover:bg-opacity-20"
                onClick={() => setShowFullGallery(false)}
              >
                Закрыть
              </Button>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-8">
              <img 
                src={excursion.gallery[currentImageIndex]} 
                alt={excursion.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <div className="p-4 flex justify-center">
              <div className="flex space-x-2 overflow-auto py-2 px-4 bg-white bg-opacity-10 rounded-lg">
                {excursion.gallery.map((img, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer ${
                      index === currentImageIndex ? 'ring-2 ring-white' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={img} 
                      alt={`Миниатюра ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarPlusHongdong;
