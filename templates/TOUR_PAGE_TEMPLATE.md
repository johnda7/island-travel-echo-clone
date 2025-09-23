# Полный шаблон страницы тура

Этот шаблон описывает полную структуру страницы тура с галереей, бронированием и мобильной адаптацией.

## Создание новой страницы тура

1. Скопируйте этот шаблон в `src/pages/<PascalCaseName>.tsx`
2. Замените все `<PascalCase>` на имя компонента
3. Замените `<camelCaseSlug>TourData` на имя данных тура
4. Обновите breadcrumbs и заголовки

```tsx
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { <camelCaseSlug>TourData as excursion } from "@/data/<camelCaseSlug>Tour";

const <PascalCase> = () => {
  // Состояния для галереи
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Состояние для модального окна бронирования
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Функции для галереи
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

  // Touch handlers для свайпов
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

  // Навигация клавиатурой
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showFullGallery) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextImage();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullGallery, nextImage, prevImage, closeModal]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <span>/</span>
          <Link to="/tours" className="hover:text-blue-600">Экскурсии</Link>
          <span>/</span>
          <span className="text-gray-900">{excursion.title}</span>
        </div>
      </div>

      {/* Основной контент - Галерея + Боковая панель бронирования */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          
          {/* Мобильная галерея */}
          <div className="md:hidden mb-6">
            <div className="grid grid-cols-4 gap-2 h-64">
              {/* Главное большое фото */}
              <div 
                className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-lg"
                onClick={() => openModal(excursion.gallery[0], 0)}
              >
                <img 
                  src={excursion.gallery[0]} 
                  alt={excursion.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Миниатюры справа */}
              {excursion.gallery.slice(1, 5).map((image, index) => (
                <div 
                  key={index + 1}
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => index === 3 ? openGallery() : openModal(image, index + 1)}
                >
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {index === 3 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg font-semibold mb-1">+{excursion.gallery.length - 5}</div>
                        <div className="text-sm">фото</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Кнопка "Показать все фото" для мобильных */}
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

          {/* Десктопная компоновка - Галерея + Боковая панель */}
          <div className="hidden md:grid lg:grid-cols-3 gap-8">
            
            {/* Галерея - Левая сторона */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-4 gap-2 h-96">
                {/* Главное большое фото */}
                <div 
                  className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[0], 0)}
                >
                  <img 
                    src={excursion.gallery[0]} 
                    alt={excursion.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Миниатюры справа */}
                {excursion.gallery.slice(1, 5).map((image, index) => (
                  <div 
                    key={index + 1}
                    className="cursor-pointer group relative overflow-hidden rounded-lg"
                    onClick={() => index === 3 ? openGallery() : openModal(image, index + 1)}
                  >
                    <img 
                      src={image} 
                      alt={`Gallery ${index + 2}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {index === 3 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-lg font-semibold mb-1">+{excursion.gallery.length - 5}</div>
                          <div className="text-sm">фото</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Кнопка "Показать все фото" */}
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

              {/* Теги под галереей */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {excursion.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Боковая панель бронирования - Правая сторона */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{excursion.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{excursion.subtitle}</p>
                  
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
                  
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-green-600">
                      от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                    </div>
                    <div className="text-sm text-gray-500">за взрослого</div>
                  </div>
                  
                  <Button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                  >
                    Забронировать тур
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Мобильные теги - под галереей на мобильных */}
          <div className="md:hidden mt-6">
            <div className="flex flex-wrap gap-2">
              {excursion.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Мобильная карточка бронирования */}
          <div className="md:hidden mt-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{excursion.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{excursion.subtitle}</p>
            
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
            
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-green-600">
                от {excursion.priceAdult.toLocaleString()} {excursion.currency}
              </div>
              <div className="text-sm text-gray-500">за взрослого</div>
            </div>
            
            <Button 
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
            >
              Забронировать тур
            </Button>
          </div>
        </div>
      </section>

      {/* ЗДЕСЬ ДОБАВЬТЕ ОСТАЛЬНОЙ КОНТЕНТ СТРАНИЦЫ */}
      {/* - Описание тура */}
      {/* - Маршрут/программа */}
      {/* - Что включено/не включено */}
      {/* - Важная информация */}
      {/* - Отзывы */}
      {/* - FAQ */}

      {/* Полноэкранная галерея (копируйте из существующей страницы) */}
      {selectedImage && showFullGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          {/* Код полноэкранной галереи - скопируйте из RaftingSpaAtvTour.tsx строки ~420-660 */}
        </div>
      )}

      {/* Мобильная панель бронирования - фиксированная внизу */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-lg font-bold text-green-600">
              от {excursion.priceAdult.toLocaleString()} {excursion.currency}
            </div>
            <div className="text-xs text-gray-600">взрослый / {excursion.priceChild.toLocaleString()} {excursion.currency} детский</div>
          </div>
          <Button 
            onClick={() => setShowBookingModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            Забронировать
          </Button>
        </div>
      </div>

      {/* Отступ снизу чтобы контент не скрывался за фиксированной кнопкой */}
      <div className="h-20 lg:hidden" />

      {/* Модальное окно бронирования — ОБЯЗАТЕЛЬНО через портал */}
      <ModalPortal>
        <UniversalBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          tourData={excursion}
        />
      </ModalPortal>

      <Footer />
    </div>
  );
};

export default <PascalCase>;
```

## Структура страницы тура

### 1. **Header и Breadcrumbs**
- Стандартный header
- Навигационные хлебные крошки с активным элементом

### 2. **Галерея + Боковая панель (Десктоп)**
- **Галерея (2/3 ширины)**:
  - Сетка 4 колонки, главное фото занимает 2x2
  - 4 миниатюры справа
  - Последняя миниатюра показывает "+N фото"
  - Кнопка "Показать все фото" под галереей
  - Теги тура под галереей

- **Боковая панель бронирования (1/3 ширины)**:
  - Липкое позиционирование (sticky top-4)
  - Заголовок и подзаголовок тура
  - Информация о туре (время, группа, расписание, трансфер)
  - Цена с выделением
  - Кнопка "Забронировать тур"

### 3. **Мобильная версия**
- Упрощенная галерея 4x2
- Теги под галереей
- Отдельная карточка бронирования под тегами
- Фиксированная панель бронирования внизу экрана

### 4. **Основной контент** (добавьте по необходимости)
- Подробное описание
- Программа тура/маршрут
- Что включено/исключено
- Требования и важная информация
- Отзывы
- FAQ

### 5. **Полноэкранная галерея**
- Модальное окно с навигацией
- Поддержка свайпов и клавиатуры
- Миниатюры внизу

### 6. **Модальное окно бронирования**
- UniversalBookingModal через ModalPortal
- Калькулятор цены
- Форма бронирования
- Интеграция с Telegram

## Важные правила

1. **НЕ используйте локальные калькуляторы** - только UniversalBookingModal
2. **Всегда оборачивайте модалку в ModalPortal**
3. **Объект excursion должен соответствовать типу TourData**
4. **Обязательные состояния для галереи** - все useState как в примере
5. **Мобильная фиксированная панель** - обязательно z-40 и выше
6. **Footer в самом конце** после всех модалок

## Файлы данных тура

Создайте файл `src/data/<camelCaseSlug>Tour.ts` с объектом типа TourData, включающим:
- title, subtitle, description
- gallery (массив URL изображений)
- priceAdult, priceChild, currency
- duration, groupSize, tags
- highlights, itinerary, included, excluded
- requirements, importantInfo