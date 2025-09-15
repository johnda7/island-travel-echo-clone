
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { useParams } from "react-router-dom";
import { getTourBySlug } from "@/data/tours";
import { Helmet } from "react-helmet";

const ExcursionDetail = () => {
  const { slug } = useParams();
  
  // State для модального окна галереи
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Состояния для калькулятора цен
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Пытаемся получить тур из централизованных данных по slug
  const tour = slug ? getTourBySlug(slug) : undefined;

  // Фолбэк-данные (как раньше), чтобы не ломать существующие страницы
  const fallback = {
    title: "Discovery South Phuket",
    subtitle: "Откройте для себя южную часть Пхукета",
    price: "1,890 ₽",
    currency: "",
    duration: "8 часов",
    groupSize: "до 15 человек",
    rating: 4.9,
    reviewsCount: 127,
    mainImage:
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Погрузитесь в красоту южной части Пхукета с нашей увлекательной экскурсией. Вы посетите самые живописные пляжи, познакомитесь с местной культурой и попробуете аутентичную тайскую кухню.",
    highlights: [
      "Посещение пляжа Ката и Карон",
      "Смотровая площадка Big Buddha",
      "Храм Ват Чалонг",
      "Обед в аутентичном тайском ресторане",
      "Мыс Промтеп - лучший закат на острове",
      "Шопинг на местных рынках",
    ],
    included: [
      "Транспорт",
      "Русскоговорящий гид",
      "Обед",
      "Входные билеты",
      "Страховка",
    ],
    notIncluded: ["Личные расходы", "Напитки", "Сувениры"],
    schedule: [
      { time: "08:00", activity: "Трансфер из отеля" },
      { time: "10:00", activity: "Достопримечательности и фотостопы" },
      { time: "13:00", activity: "Обед и свободное время" },
      { time: "17:00", activity: "Возвращение в отель" },
    ],
  } as const;

  // Преобразуем Tour -> представление Excursion с безопасными дефолтами
  const excursion = tour
    ? {
        title: tour.title,
        subtitle: tour.location ? `${tour.location}` : "",
        price: tour.price, // Уже может содержать валюту
        priceAdult: tour.priceAdult || 2490, // Дефолтная цена
        priceChild: tour.priceChild || 1990, // Дефолтная цена
        currency: tour.currency || "₽",
        duration: tour.duration,
        groupSize: tour.group,
        rating: tour.rating,
        reviewsCount: tour.reviews,
        mainImage: tour.image,
        gallery: tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image],
        description: tour.description,
        highlights: tour.highlights || [],
        included: [
          "Трансфер",
          "Русскоговорящий гид",
          "Страховка",
        ],
        notIncluded: ["Личные расходы", "Напитки"],
        schedule: [
          { time: "08:00", activity: "Трансфер из отеля" },
          { time: "10:00", activity: "Основные локации тура" },
          { time: "13:00", activity: "Обед / свободное время" },
          { time: "17:00", activity: "Возвращение в отель" },
        ],
      }
    : {
        ...fallback,
        priceAdult: 2490,
        priceChild: 1990,
        currency: "₽",
      };

  // Расчёт общей стоимости
  const totalPrice = excursion.priceAdult * adults + excursion.priceChild * children;

  // Функции для управления галереей
  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    const gallery = excursion.gallery;
    if (gallery && gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
      setSelectedImage(gallery[(currentImageIndex + 1) % gallery.length]);
    }
  };

  const prevImage = () => {
    const gallery = excursion.gallery;
    if (gallery && gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
      setSelectedImage(gallery[(currentImageIndex - 1 + gallery.length) % gallery.length]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{tour ? `${tour.title} — Island Travel` : "Экскурсия — Island Travel"}</title>
        <meta
          name="description"
          content={tour ? tour.description : "Экскурсионная программа на Пхукете: описание, программа и бронирование."}
        />
        {slug ? (
          <link
            rel="canonical"
            href={`${window.location?.origin || "https://example.com"}/#${`/excursion/${slug}`}`}
          />
        ) : null}
        {tour ? (
          <meta property="og:title" content={tour.title} />
        ) : null}
        {tour ? (
          <meta property="og:description" content={tour.description} />
        ) : null}
        {excursion.mainImage ? (
          <meta property="og:image" content={excursion.mainImage} />
        ) : null}
      </Helmet>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/tours">Туры</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/tours">Морские экскурсии</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{excursion.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="pb-8">{/* убрал pt-20 так как он теперь в breadcrumbs */}
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4">
                <span className="text-blue-600 font-medium">Экскурсии • Пхукет</span>
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
                <div className="text-3xl font-bold text-blue-600">
                  {excursion.price} {excursion.currency}
                </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
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

      {/* Gallery */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Desktop Gallery */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-4">
              {excursion.gallery.slice(0, 4).map((image, index) => (
                <div 
                  key={index} 
                  className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openModal(image, index)}
                >
                  <img 
                    src={image} 
                    alt={`Галерея ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {index === 3 && excursion.gallery.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Grid3X3 className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-lg font-semibold">+{excursion.gallery.length - 4}</div>
                        <div className="text-sm">фото</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Gallery */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-2">
              {excursion.gallery.slice(0, 4).map((image, index) => (
                <div 
                  key={index} 
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openModal(image, index)}
                >
                  <img 
                    src={image} 
                    alt={`Галерея ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && excursion.gallery.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg font-semibold">+{excursion.gallery.length - 4}</div>
                        <div className="text-sm">фото</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Description */}
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
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Программа тура</h2>
                  <div className="space-y-4">
                    {excursion.schedule.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-blue-600 font-semibold min-w-[60px]">
                          {item.time}
                        </div>
                        <div className="text-gray-700">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Included/Not Included */}
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
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24 shadow-lg border-0">
                <CardContent className="p-6">
                  {/* Калькулятор стоимости */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Рассчитать стоимость</h3>
                    
                    <div className="space-y-4">
                      {/* Взрослые */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-700 font-medium">Взрослые</span>
                          <div className="text-sm text-gray-500">{excursion.priceAdult} {excursion.currency}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            disabled={adults <= 1}
                          >
                            -
                          </button>
                          <span className="font-semibold min-w-[20px] text-center">{adults}</span>
                          <button
                            onClick={() => setAdults(adults + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Дети */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-700 font-medium">Дети (4-11 лет)</span>
                          <div className="text-sm text-gray-500">{excursion.priceChild} {excursion.currency}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            disabled={children <= 0}
                          >
                            -
                          </button>
                          <span className="font-semibold min-w-[20px] text-center">{children}</span>
                          <button
                            onClick={() => setChildren(children + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 text-center">
                        До 3 лет бесплатно
                      </div>

                      {/* Итоговая стоимость */}
                      <div className="border-t pt-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">Итого:</div>
                          <div className="text-3xl font-bold text-green-600">
                            {totalPrice.toLocaleString()} {excursion.currency}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            за {adults + children} чел.
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6 text-sm text-left mt-6">
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
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold">
                        Забронировать за {totalPrice.toLocaleString()} {excursion.currency}
                      </Button>
                      <Button variant="outline" className="w-full py-3 border-gray-300">
                        Задать вопрос в Telegram
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Modal для просмотра фотографий */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-60"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-60"
            >
              <ChevronLeft size={32} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-60"
            >
              <ChevronRight size={32} />
            </button>
            
            <img
              src={selectedImage}
              alt={`Галерея ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} из {excursion.gallery.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ExcursionDetail;
