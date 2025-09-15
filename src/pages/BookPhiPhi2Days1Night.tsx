import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Calendar, Clock, Users, MapPin, Star, Phone, Mail, User } from "lucide-react";
import { Helmet } from "react-helmet";

const BookPhiPhi2Days1Night = () => {
  // Состояния для формы бронирования
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
    comment: ""
  });

  // Данные тура
  const excursion = {
    title: "Пхи-Пхи 2 дня / 1 ночь",
    subtitle: "Экскурсия с ночёвкой на островах Пхи-Пхи",
    priceAdult: 4000,
    priceChild: 3500,
    currency: "฿",
    duration: "2 дня / 1 ночь",
    groupSize: "до 30 человек",
    rating: 4.8,
    reviewsCount: 53,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
  };

  // Расчёт общей стоимости
  const totalPrice = excursion.priceAdult * adults + excursion.priceChild * children;

  // Обработчики форм
  const handleContactChange = (field: string, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log("Booking data:", {
      adults,
      children,
      selectedDate,
      contactInfo,
      totalPrice
    });
    alert("Бронирование отправлено! Мы свяжемся с вами в ближайшее время.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Бронирование: {excursion.title} — Island Travel</title>
        <meta name="description" content={`Забронировать ${excursion.title}. Калькулятор стоимости, выбор даты, контактная информация.`} />
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
                <BreadcrumbLink href="/phi-phi-2-days-1-night">Пхи-Пхи 2 дня</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Бронирование</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Бронирование тура
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {excursion.title}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold">{excursion.rating}</span>
                <span>({excursion.reviewsCount} отзывов)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{excursion.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{excursion.groupSize}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Левая колонка - форма */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Количество участников */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        Количество участников
                      </h3>
                      
                      <div className="space-y-4">
                        {/* Взрослые */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-gray-700 font-medium">Взрослые (12+ лет)</span>
                            <div className="text-sm text-gray-500">{excursion.priceAdult} {excursion.currency} за человека</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-semibold"
                              disabled={adults <= 1}
                            >
                              -
                            </button>
                            <span className="font-semibold min-w-[30px] text-center text-lg">{adults}</span>
                            <button
                              type="button"
                              onClick={() => setAdults(adults + 1)}
                              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-semibold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Дети */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-gray-700 font-medium">Дети (4-11 лет)</span>
                            <div className="text-sm text-gray-500">{excursion.priceChild} {excursion.currency} за ребёнка</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-semibold"
                              disabled={children <= 0}
                            >
                              -
                            </button>
                            <span className="font-semibold min-w-[30px] text-center text-lg">{children}</span>
                            <button
                              type="button"
                              onClick={() => setChildren(children + 1)}
                              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-semibold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 text-center bg-gray-50 p-2 rounded">
                          До 3 лет бесплатно
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Выбор даты */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Выберите дату
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="date">Дата начала тура</Label>
                          <Input
                            id="date"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="mt-2"
                            required
                          />
                        </div>
                        <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded">
                          <strong>Внимание:</strong> Туры проводятся ежедневно. Отправление в 08:00 с вашего отеля.
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Контактная информация */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Контактная информация
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Ваше имя *</Label>
                          <Input
                            id="name"
                            type="text"
                            value={contactInfo.name}
                            onChange={(e) => handleContactChange('name', e.target.value)}
                            placeholder="Введите ваше имя"
                            className="mt-2"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Телефон *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={contactInfo.phone}
                            onChange={(e) => handleContactChange('phone', e.target.value)}
                            placeholder="+7 (xxx) xxx-xx-xx"
                            className="mt-2"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) => handleContactChange('email', e.target.value)}
                            placeholder="example@email.com"
                            className="mt-2"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="comment">Комментарий</Label>
                          <textarea
                            id="comment"
                            value={contactInfo.comment}
                            onChange={(e) => handleContactChange('comment', e.target.value)}
                            placeholder="Дополнительные пожелания или вопросы..."
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Правая колонка - итого */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Детали бронирования</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Взрослые ({adults} чел.)</span>
                          <span className="font-semibold">{(excursion.priceAdult * adults).toLocaleString()} {excursion.currency}</span>
                        </div>
                        
                        {children > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Дети ({children} чел.)</span>
                            <span className="font-semibold">{(excursion.priceChild * children).toLocaleString()} {excursion.currency}</span>
                          </div>
                        )}
                        
                        <div className="border-t pt-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Итого:</span>
                            <span className="text-green-600">{totalPrice.toLocaleString()} {excursion.currency}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            за {adults + children} чел.
                          </div>
                        </div>
                      </div>

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

                      <div className="space-y-3">
                        <Button 
                          type="submit"
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                        >
                          Забронировать за {totalPrice.toLocaleString()} {excursion.currency}
                        </Button>
                        
                        <Button variant="outline" asChild className="w-full py-3 border-gray-300">
                          <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
                            Задать вопрос в Telegram
                          </a>
                        </Button>
                      </div>

                      <div className="mt-6 text-xs text-gray-500 text-center">
                        <p>Нажимая "Забронировать", вы соглашаетесь с условиями бронирования.</p>
                        <p className="mt-2">Оплата производится наличными в день тура.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookPhiPhi2Days1Night;