import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3, Minus, Plus } from "lucide-react";
import { Tour } from "@/data/tours";

interface TourTemplateProps {
  tour: Tour;
}

export function TourTemplate({ tour }: TourTemplateProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: ""
  });

  const totalPrice = (adults * tour.adultPrice) + (children * tour.childPrice);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length);
  };

  const adjustGuests = (type: 'adults' | 'children', direction: 'plus' | 'minus') => {
    if (type === 'adults') {
      setAdults(prev => direction === 'plus' ? prev + 1 : Math.max(1, prev - 1));
    } else {
      setChildren(prev => direction === 'plus' ? prev + 1 : Math.max(0, prev - 1));
    }
  };

  const handleBooking = async () => {
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const message = `🏝️ Новая бронь тура!

📋 Тур: ${tour.title}
💰 Цена: ${totalPrice.toLocaleString()} ฿
👥 Гости: ${adults} взрослых, ${children} детей
📅 Дата: ${formData.date}

👤 Контактная информация:
• Имя: ${formData.name}
• Телефон: ${formData.phone}
• Email: ${formData.email || 'не указан'}

⏰ Заявка подана: ${new Date().toLocaleString('ru-RU')}`;

    try {
      // ПРЯМАЯ отправка в Telegram бот через API
      const botToken = '8445717266:AAHEDA4SJPUL48gpV-Q9qc-V98GSuyPFn08';
      const chatId = '@PhuketBookBot';
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (response.ok) {
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: "", phone: "", email: "", date: "" });
        setAdults(1);
        setChildren(0);
        setShowBookingForm(false);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showGallery) {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') setShowGallery(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGallery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumbs */}
      <section className="py-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Главная</Link>
            <span>/</span>
            <Link to="/tours" className="hover:text-blue-600 transition-colors">Туры</Link>
            <span>/</span>
            <span className="text-gray-900">{tour.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-6">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={tour.gallery[currentImageIndex]}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                
                {tour.gallery.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-4 right-4 bg-black/50 text-white hover:bg-black/70"
                      onClick={() => setShowGallery(true)}
                    >
                      <Grid3X3 className="w-4 h-4 mr-2" />
                      Все фото ({tour.gallery.length})
                    </Button>

                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      {currentImageIndex + 1} / {tour.gallery.length}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tour Info */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{tour.title}</h1>
              <p className="text-gray-600 mb-6">{tour.description}</p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  <span>до 30 человек</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>4.8 (53 отзыва)</span>
                </div>
              </div>

              {/* Программа тура */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Программа тура:</h3>
                <div className="space-y-3">
                  {tour.schedule.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium mr-4 min-w-[60px] text-center">
                        {item.time}
                      </div>
                      <div className="text-gray-700">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Включено / Не включено */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-green-600">Включено в стоимость</h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-red-600">Не включено</h3>
                  <ul className="space-y-2">
                    {tour.excludes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Calculator */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Калькулятор стоимости</h3>
                    <div className="text-sm text-gray-600">
                      <span>Взрослые: {tour.adultPrice.toLocaleString()} ฿</span>
                      <span className="mx-2">•</span>
                      <span>Дети: {tour.childPrice.toLocaleString()} ฿</span>
                    </div>
                  </div>

                  {/* Adults Counter */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Взрослые</div>
                      <div className="text-sm text-gray-500">{tour.adultPrice.toLocaleString()} ฿ за человека</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustGuests('adults', 'minus')}
                        disabled={adults <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold w-8 text-center">{adults}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustGuests('adults', 'plus')}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Дети (4-11 лет)</div>
                      <div className="text-sm text-gray-500">{tour.childPrice.toLocaleString()} ฿ за ребенка</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustGuests('children', 'minus')}
                        disabled={children <= 0}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold w-8 text-center">{children}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustGuests('children', 'plus')}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Итого:</span>
                      <span className="text-2xl font-bold text-blue-600">{totalPrice.toLocaleString()} ฿</span>
                    </div>
                  </div>

                  {/* Booking Button */}
                  <Button 
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Забронировать сейчас
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

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setShowGallery(false)}
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="relative max-w-5xl max-h-full p-4">
            <img
              src={tour.gallery[currentImageIndex]}
              alt={`${tour.title} - фото ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {tour.gallery.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded">
                  {currentImageIndex + 1} / {tour.gallery.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Бронирование тура</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBookingForm(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-lg">{tour.title}</h4>
                <p className="text-gray-600">{tour.description}</p>
              </div>

              {/* Calculator */}
              <div className="mb-6 space-y-4">
                <h5 className="font-medium">Количество гостей:</h5>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Взрослые</div>
                    <div className="text-sm text-gray-500">{tour.adultPrice.toLocaleString()} ฿ за человека</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustGuests('adults', 'minus')}
                      disabled={adults <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold w-8 text-center">{adults}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustGuests('adults', 'plus')}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Дети (4-11 лет)</div>
                    <div className="text-sm text-gray-500">{tour.childPrice.toLocaleString()} ฿ за ребенка</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustGuests('children', 'minus')}
                      disabled={children <= 0}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold w-8 text-center">{children}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustGuests('children', 'plus')}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-green-600">{totalPrice.toLocaleString()} ฿</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Ваше имя *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Телефон *</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Дата поездки *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
              </div>

              <Button 
                onClick={handleBooking}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Отправить заявку
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Бесплатная отмена за 24 часа
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}