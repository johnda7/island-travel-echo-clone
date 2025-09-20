import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Star, Users, Clock, Waves, Car, Info, Camera, 
  X, ChevronLeft, ChevronRight, ArrowLeft, Umbrella,
  Wifi, Car as CarIcon, Coffee, ShoppingBag
} from "lucide-react";
import { getBeachById, Beach } from "@/data/beachesData";

const BeachDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [beach, setBeach] = useState<Beach | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const beachData = getBeachById(id);
      setBeach(beachData || null);
      setLoading(false);
    }
  }, [id]);

  // Функции для галереи
  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (beach) {
      const nextIndex = (selectedImageIndex + 1) % beach.images.length;
      setSelectedImageIndex(nextIndex);
      setSelectedImage(beach.images[nextIndex]);
    }
  };

  const prevImage = () => {
    if (beach) {
      const prevIndex = selectedImageIndex === 0 ? beach.images.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(prevIndex);
      setSelectedImage(beach.images[prevIndex]);
    }
  };

  // Обработка клавиш для галереи
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, selectedImageIndex, beach]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Загружаем информацию о пляже...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!beach) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Пляж не найден</h1>
              <p className="text-gray-600 mb-8">Извините, такой пляж не существует.</p>
              <Link to="/category/plyazhi">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Вернуться к списку пляжей
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Навигация назад */}
          <div className="mb-6">
            <Link 
              to="/category/plyazhi" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к пляжам
            </Link>
          </div>

          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{beach.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{beach.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-gray-900">{beach.rating}</span>
                <span className="text-gray-500">({beach.reviewsCount} отзывов)</span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5" />
                <span>{beach.waterConditions}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Основной контент */}
            <div className="lg:col-span-2 space-y-8">
              {/* Галерея */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Фотографии</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {beach.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openModal(image, index)}
                    >
                      <img
                        src={image}
                        alt={`${beach.title} ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Описание */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Описание</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {beach.fullDescription}
                  </p>
                </div>
              </div>

              {/* Особенности */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Особенности пляжа</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {beach.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Активности */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Чем заняться</h2>
                <div className="flex flex-wrap gap-2">
                  {beach.activities.map((activity, index) => (
                    <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Удобства */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Удобства и инфраструктура</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {beach.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Что рядом */}
              {beach.nearby && beach.nearby.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Что рядом</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {beach.nearby.map((place, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{place}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Боковая панель */}
            <div className="space-y-6">
              {/* Краткая информация */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Краткая информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Рейтинг:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{beach.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Загруженность:</span>
                    <span className="font-semibold">{beach.crowdLevel}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Лучшее время:</span>
                    <span className="font-semibold">{beach.bestTime}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Доступность:</span>
                    <span className="font-semibold">{beach.accessibility}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Теги */}
              <Card>
                <CardHeader>
                  <CardTitle>Категории</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {beach.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Карта (заглушка) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Расположение
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Карта будет добавлена</p>
                      {beach.coordinates && (
                        <p className="text-xs mt-1">
                          {beach.coordinates.lat}, {beach.coordinates.lng}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Отзывы (заглушка) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Отзывы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500">
                    <p className="mb-2">{beach.reviewsCount} отзывов</p>
                    <p className="text-sm">Отзывы будут добавлены</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно для просмотра изображений */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt={`${beach.title} галерея`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Кнопки управления */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            {beach.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
            
            {/* Индикатор изображения */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImageIndex + 1} / {beach.images.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BeachDetail;