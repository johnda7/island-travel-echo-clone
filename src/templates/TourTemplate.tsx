// 🎨 УНИВЕРСАЛЬНЫЙ ШАБЛОН ТУРА - ОДИН ДИЗАЙН ДЛЯ ВСЕХ ТУРОВ!
// 🎯 WORDPRESS-ПРИНЦИП: Один шаблон, все туры выглядят одинаково

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getTourById } from '@/data/toursRegistry';
import type { TourData } from '@/types/Tour';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface TourTemplateProps {
  tourId?: string; // можно передать ID напрямую
}

export const TourTemplate = ({ tourId: propTourId }: TourTemplateProps) => {
  const { tourId: paramTourId } = useParams();
  const tourId = propTourId || paramTourId;
  
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTourData = async () => {
      if (!tourId) {
        setError('ID тура не указан');
        setIsLoading(false);
        return;
      }

      try {
        const tourRegistry = getTourById(tourId);
        if (!tourRegistry) {
          setError('Тур не найден');
          setIsLoading(false);
          return;
        }

        const data = await tourRegistry.data();
        setTourData(data);
      } catch (err) {
        console.error('Ошибка загрузки тура:', err);
        setError('Ошибка загрузки данных тура');
      } finally {
        setIsLoading(false);
      }
    };

    loadTourData();
  }, [tourId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка тура...</p>
        </div>
      </div>
    );
  }

  if (error || !tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Тур не найден</h1>
          <p className="text-gray-600 mb-6">{error || 'Запрашиваемый тур не существует'}</p>
          <a 
            href="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            На главную
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 🔍 SEO мета-теги */}
      <Helmet>
        <title>{tourData.title} - Island Travel</title>
        <meta name="description" content={tourData.description} />
        <meta name="keywords" content={`${tourData.title}, туры Пхукет, ${tourData.description}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* 🏗️ КОНТЕНТ ТУРА */}
        <main className="container mx-auto px-4 py-8">
          
          {/* 🗺️ Хлебные крошки */}
          <nav className="text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-blue-600">Главная</a>
            <span className="mx-2">›</span>
            <a href="/tours" className="hover:text-blue-600">Туры</a>
            <span className="mx-2">›</span>
            <span className="text-gray-800">{tourData.title}</span>
          </nav>

          {/* 🖼️ Главное изображение */}
          <div className="relative rounded-2xl overflow-hidden mb-8 h-96">
            <img
              src={tourData.gallery?.[0] || '/src/assets/phi-phi-2days/maya-bay-1.jpg'}
              alt={tourData.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
              <div className="p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">{tourData.title}</h1>
                <p className="text-xl opacity-90">{tourData.subtitle || tourData.description}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* 📝 Основная информация */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* 📋 Основные характеристики */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">О туре</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="text-sm text-gray-600">Продолжительность</p>
                      <p className="font-semibold">{tourData.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="text-sm text-gray-600">Размер группы</p>
                      <p className="font-semibold">{tourData.groupSize || 'До 45 человек'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <p className="text-sm text-gray-600">Рейтинг</p>
                      <p className="font-semibold">{tourData.rating}/5 ({tourData.reviewsCount} отзывов)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🗺️</span>
                    <div>
                      <p className="text-sm text-gray-600">Маршрут</p>
                      <p className="font-semibold">{tourData.route}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{tourData.description}</p>
              </div>

              {/* ✨ Основные моменты */}
              {tourData.highlights && tourData.highlights.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Основные моменты</h3>
                  <ul className="space-y-2">
                    {tourData.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 text-lg mt-0.5">✓</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 🖼️ Галерея фотографий */}
              {tourData.gallery && tourData.gallery.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Фотографии</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tourData.gallery.slice(0, 6).map((image, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden h-48">
                        <img
                          src={image}
                          alt={`${tourData.title} - фото ${index + 1}`}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 💰 Боковая панель с ценами и бронированием */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    от {tourData.priceAdult.toLocaleString()} {tourData.currency}
                  </div>
                  <p className="text-gray-600">за взрослого</p>
                </div>

                {/* 💰 Таблица цен */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between py-2 border-b">
                    <span>Взрослый:</span>
                    <span className="font-semibold">{tourData.priceAdult.toLocaleString()} {tourData.currency}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Ребенок (1-11 лет):</span>
                    <span className="font-semibold">{tourData.priceChild.toLocaleString()} {tourData.currency}</span>
                  </div>
                  {tourData.priceInfant !== undefined && (
                    <div className="flex justify-between py-2 border-b">
                      <span>Младенец (0-12 мес):</span>
                      <span className="font-semibold">
                        {tourData.priceInfant === 0 ? 'Бесплатно' : `${tourData.priceInfant.toLocaleString()} ${tourData.currency}`}
                      </span>
                    </div>
                  )}
                </div>

                {/* 🎯 Кнопка бронирования */}
                <a
                  href={`#/book/${tourId}`}
                  className="w-full bg-blue-600 text-white text-center py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors block"
                >
                  🏝️ Забронировать тур
                </a>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Бесплатная отмена за 24 часа
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TourTemplate;