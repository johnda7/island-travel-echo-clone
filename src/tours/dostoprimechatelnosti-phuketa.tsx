// 🎯 ТУР: ДОСТОПРИМЕЧАТЕЛЬНОСТИ ПХУКЕТА (1 ДЕНЬ, БЕЗ ШОПИНГА)
// 📄 Перенесён с: https://phuketgo.aaddaa.com/excursion/dostoprimechatelnosti-phuketa-1-den-obzornaja-jekskursija-bez-shopinga/
// 🏷️ КАТЕГОРИЯ: сухопутные туры, культурные, обзорные
// ⚠️ ФАЙЛ ЗАЩИЩЁН: НЕ ТРОГАТЬ без разрешения (WordPress принцип)

/* eslint-disable react-refresh/only-export-components */

import React, { useState, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { TourData } from '@/types/Tour';

// 🖼️ ИМПОРТ ИЗОБРАЖЕНИЙ (с WordPress)
import bigBuddha from '../assets/dostoprimechatelnosti-phuketa/big-buddha.jpg';
import watChalong from '../assets/dostoprimechatelnosti-phuketa/wat-chalong.jpg';
import promthepCape from '../assets/dostoprimechatelnosti-phuketa/promthep-cape.jpg';
import oldTown from '../assets/dostoprimechatelnosti-phuketa/old-town.jpg';
import karonViewpoint from '../assets/dostoprimechatelnosti-phuketa/karon-viewpoint.jpg';
import cashewFactory from '../assets/dostoprimechatelnosti-phuketa/cashew-factory.jpg';

// 📊 ЦЕНТРАЛИЗОВАННЫЕ ДАННЫЕ ТУРА
export const dostoprimechatelnostiPhuketaTourData: TourData = {
  id: 'dostoprimechatelnosti-phuketa',
  title: 'Достопримечательности Пхукета (1 день, без шопинга)',
  subtitle: 'Обзорная экскурсия по главным достопримечательностям острова',
  description: 'Познакомьтесь с культурными и природными достопримечательностями Пхукета за один день. Посетите величественного Большого Будду, священный храм Ват Чалонг, живописный мыс Промтеп и колоритный Старый город. Экскурсия без шопинга - только самые интересные места!',
  
  // 💰 ЦЕНЫ (из WordPress)
  priceAdult: 1900,
  priceChild: 1400,
  priceInfant: 0,
  currency: '฿',
  
  // 📅 ХАРАКТЕРИСТИКИ
  duration: '8 часов (полный день)',
  groupSize: 'до 15 человек',
  rating: 4.7,
  reviewsCount: 234,
  route: 'Пхукет - Большой Будда - Ват Чалонг - Промтеп - Старый город',
  
  // 🏷️ КАТЕГОРИИ И ТЕГИ
  category: 'mainland',
  tags: ['культурные', 'сухопутные', 'храмы', 'обзорные', 'целый день', 'семейный', 'история', 'без шопинга'],
  
  // 🖼️ ГАЛЕРЕЯ
  gallery: [
    bigBuddha,
    watChalong, 
    promthepCape,
    oldTown,
    karonViewpoint,
    cashewFactory
  ],
  
  // ⭐ ОСНОВНЫЕ МОМЕНТЫ
  highlights: [
    'Посещение статуи Большого Будды высотой 45 метров',
    'Священный храм Ват Чалонг - самый важный храм Пхукета',
    'Мыс Промтеп - лучшая смотровая площадка для заката',
    'Прогулка по историческому Старому городу с архитектурой XIX века',
    'Обзорная площадка Карон - панорамный вид на три пляжа',
    'Фабрика кешью с дегустацией местных орехов',
    'Экскурсия БЕЗ принудительного шопинга',
    'Комфортабельный транспорт с кондиционером'
  ],
  
  // 📋 ПРОГРАММА ПО ВРЕМЕНИ
  itinerary: [
    {
      time: '08:00-09:00',
      title: 'Трансфер из отеля',
      description: 'Забираем гостей из отелей. Комфортабельный автобус с кондиционером.'
    },
    {
      time: '09:30-10:30',
      title: 'Большой Будда (Big Buddha)',
      description: 'Посещение величественной 45-метровой статуи Большого Будды. Панорамный вид на остров, священное место для буддистов.'
    },
    {
      time: '11:00-12:00',
      title: 'Храм Ват Чалонг',
      description: 'Самый важный и красивый буддийский храм Пхукета. Узнаете об истории и традициях тайского буддизма.'
    },
    {
      time: '12:30-13:30',
      title: 'Обед в местном ресторане',
      description: 'Традиционная тайская кухня в аутентичном ресторане. Блюда адаптированы для европейских гостей.'
    },
    {
      time: '14:00-15:00',
      title: 'Мыс Промтеп (Promthep Cape)',
      description: 'Самая южная точка Пхукета с потрясающими видами на Андаманское море. Идеальное место для фотографий.'
    },
    {
      time: '15:30-16:30',
      title: 'Старый город Пхукета',
      description: 'Прогулка по историческому центру с колониальной архитектурой XIX века, красочными домами и уютными кафе.'
    },
    {
      time: '17:00-17:30',
      title: 'Фабрика кешью',
      description: 'Посещение местной фабрики с дегустацией различных видов орехов и сухофруктов.'
    },
    {
      time: '18:00-19:00',
      title: 'Возвращение в отели',
      description: 'Комфортный трансфер обратно в ваши отели.'
    }
  ],
  
  // ✅ ЧТО ВКЛЮЧЕНО
  included: [
    'Трансфер от/до отеля на комфортабельном автобусе',
    'Профессиональный русскоговорящий гид',
    'Входные билеты во все храмы и достопримечательности',
    'Обед в местном ресторане (тайская кухня)',
    'Дегустация на фабрике кешью',
    'Прохладительные напитки и вода в автобусе',
    'Страховка',
    'Все налоги и сборы'
  ],
  
  // ❌ ЧТО НЕ ВКЛЮЧЕНО
  notIncluded: [
    'Личные расходы и сувениры',
    'Алкогольные напитки',
    'Чаевые гиду и водителю (по желанию)',
    'Дополнительные закуски и напитки'
  ],
  
  // ⚠️ ВАЖНАЯ ИНФОРМАЦИЯ
  importantInfo: [
    'Экскурсия БЕЗ принудительного шопинга - только достопримечательности!',
    'При посещении храмов необходима закрытая одежда (плечи и колени)',
    'Возьмите удобную обувь для ходьбы',
    'Рекомендуем взять головной убор и солнцезащитный крем',
    'Фотографирование в храмах разрешено, но без вспышки',
    'Время в пути между объектами: 20-40 минут',
    'Экскурсия подходит для всех возрастов',
    'В случае дождя программа сохраняется (храмы крытые)'
  ]
};

// 🎨 КОМПОНЕНТ СТРАНИЦЫ ТУРА
export const DostoprimechatelnostiPhuketaPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // 🖼️ ОБРАБОТЧИКИ ГАЛЕРЕИ (стабилизированы через useCallback)
  const nextImage = useCallback(() => {
    if (selectedImage !== null && dostoprimechatelnostiPhuketaTourData.gallery) {
      setSelectedImage((selectedImage + 1) % dostoprimechatelnostiPhuketaTourData.gallery.length);
    }
  }, [selectedImage]);

  const prevImage = useCallback(() => {
    if (selectedImage !== null && dostoprimechatelnostiPhuketaTourData.gallery) {
      setSelectedImage(selectedImage === 0 ? dostoprimechatelnostiPhuketaTourData.gallery.length - 1 : selectedImage - 1);
    }
  }, [selectedImage]);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // ⌨️ ОБРАБОТЧИК КЛАВИАТУРЫ
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedImage === null) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'Escape':
        closeModal();
        break;
    }
  }, [selectedImage, nextImage, prevImage, closeModal]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* 🔍 SEO МЕТАТЕГИ */}
      <Helmet>
        <title>{dostoprimechatelnostiPhuketaTourData.title} - Island Travel</title>
        <meta name="description" content={dostoprimechatelnostiPhuketaTourData.description} />
        <meta name="keywords" content="достопримечательности пхукета, большой будда, ват чалонг, промтеп кейп, старый город, обзорная экскурсия, без шопинга" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* 🏔️ HERO СЕКЦИЯ */}
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dostoprimechatelnostiPhuketaTourData.gallery[0]})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {dostoprimechatelnostiPhuketaTourData.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                {dostoprimechatelnostiPhuketaTourData.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <span className="flex items-center">
                  <span className="mr-2">⏱️</span>
                  {dostoprimechatelnostiPhuketaTourData.duration}
                </span>
                <span className="flex items-center">
                  <span className="mr-2">👥</span>
                  {dostoprimechatelnostiPhuketaTourData.groupSize}
                </span>
                <span className="flex items-center">
                  <span className="mr-2">⭐</span>
                  {dostoprimechatelnostiPhuketaTourData.rating}/5
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* 📝 ОСНОВНОЙ КОНТЕНТ */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* 📋 ОПИСАНИЕ */}
              <section className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-3xl font-bold mb-6">О туре</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {dostoprimechatelnostiPhuketaTourData.description}
                </p>
              </section>

              {/* ⭐ ОСНОВНЫЕ МОМЕНТЫ */}
              <section className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Основные моменты</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {dostoprimechatelnostiPhuketaTourData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 📅 ПРОГРАММА ТУРА */}
              <section className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Программа тура</h3>
                <div className="space-y-6">
                  {dostoprimechatelnostiPhuketaTourData.itinerary.map((item, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-20 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ✅❌ ЧТО ВКЛЮЧЕНО/НЕ ВКЛЮЧЕНО */}
              <div className="grid md:grid-cols-2 gap-8">
                <section className="bg-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-green-600">✅ Что включено</h3>
                  <ul className="space-y-2">
                    {dostoprimechatelnostiPhuketaTourData.included.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                
                <section className="bg-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-red-600">❌ Что не включено</h3>
                  <ul className="space-y-2">
                    {dostoprimechatelnostiPhuketaTourData.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* ⚠️ ВАЖНАЯ ИНФОРМАЦИЯ */}
              <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-800">⚠️ Важная информация</h3>
                <ul className="space-y-2">
                  {dostoprimechatelnostiPhuketaTourData.importantInfo.map((info, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span className="text-yellow-800">{info}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 🖼️ ГАЛЕРЕЯ ФОТОГРАФИЙ */}
              <section className="bg-white rounded-xl p-8 shadow-sm" ref={galleryRef}>
                <h3 className="text-2xl font-bold mb-6">Галерея фотографий</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dostoprimechatelnostiPhuketaTourData.gallery.map((image, index) => (
                    <div 
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Достопримечательности Пхукета ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          👁️ Просмотр
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* 💰 БОКОВАЯ ПАНЕЛЬ С ЦЕНАМИ */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-8 shadow-sm sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    от {dostoprimechatelnostiPhuketaTourData.priceAdult.toLocaleString()} {dostoprimechatelnostiPhuketaTourData.currency}
                  </div>
                  <p className="text-gray-600">за взрослого</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Взрослый:</span>
                    <span className="font-semibold">{dostoprimechatelnostiPhuketaTourData.priceAdult.toLocaleString()} {dostoprimechatelnostiPhuketaTourData.currency}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Ребенок (1-11 лет):</span>
                    <span className="font-semibold">{dostoprimechatelnostiPhuketaTourData.priceChild.toLocaleString()} {dostoprimechatelnostiPhuketaTourData.currency}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Младенец (0-12 мес):</span>
                    <span className="font-semibold text-green-600">Бесплатно</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-4 mb-4"
                >
                  🏛️ Забронировать тур
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Бесплатная отмена за 24 часа
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🖼️ МОДАЛЬНОЕ ОКНО ГАЛЕРЕИ */}
        {selectedImage !== null && dostoprimechatelnostiPhuketaTourData.gallery && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
              >
                ✕
              </button>
              
              <img 
                src={dostoprimechatelnostiPhuketaTourData.gallery[selectedImage]} 
                alt={`Достопримечательности Пхукета ${selectedImage + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300"
              >
                ←
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300"
              >
                →
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
                {selectedImage + 1} из {dostoprimechatelnostiPhuketaTourData.gallery.length}
              </div>
            </div>
          </div>
        )}

        {/* 🧮 УНИВЕРСАЛЬНАЯ МОДАЛКА БРОНИРОВАНИЯ */}
        <UniversalBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          tourData={dostoprimechatelnostiPhuketaTourData}
        />

        <Footer />
      </div>
    </>
  );
};

export default DostoprimechatelnostiPhuketaPage;