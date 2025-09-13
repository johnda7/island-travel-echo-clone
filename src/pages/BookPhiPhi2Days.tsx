import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, MapPin, Star, ArrowLeft, Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const BookPhiPhi2Days = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adults: "2",
    children: "0",
    date: "",
    hotel: "",
    room: "",
    comments: ""
  });

  const excursion = {
    title: "Пхи-Пхи 2 дня / 1 ночь",
    price: "от 8 900",
    currency: "฿",
    duration: "2 дня / 1 ночь",
    groupSize: "до 30 человек",
    rating: 4.8,
    reviewsCount: 53
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Отправка формы в Telegram
    const message = `
🏝️ БРОНИРОВАНИЕ: Пхи-Пхи 2 дня / 1 ночь

👤 Контакты:
Имя: ${formData.name}
Email: ${formData.email}
Телефон: ${formData.phone}

👥 Группа:
Взрослых: ${formData.adults}
Детей: ${formData.children}

📅 Детали:
Дата: ${formData.date}
Отель: ${formData.hotel}
Номер: ${formData.room}

💬 Комментарии:
${formData.comments}
    `;
    
    const telegramUrl = `https://t.me/Phuketga?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumbs */}
      <section className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Link to="/" className="hover:text-green-600 transition-colors">Главная</Link>
              <span>›</span>
              <Link to="/tours" className="hover:text-green-600 transition-colors">Туры</Link>
              <span>›</span>
              <Link to="/excursion/phi-phi-2-days-1-night" className="hover:text-green-600 transition-colors">Пхи-Пхи 2 дня / 1 ночь</Link>
              <span>›</span>
              <span className="text-gray-700">Бронирование</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Back button */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <Link 
            to="/excursion/phi-phi-2-days-1-night" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться к описанию тура
          </Link>
        </div>
      </section>

      {/* Booking form */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Забронировать экскурсию
                  </CardTitle>
                  <p className="text-gray-600">
                    Заполните форму ниже, и мы свяжемся с вами для подтверждения бронирования
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Контактная информация</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Имя и фамилия *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Введите ваше имя"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Телефон *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="+7 (XXX) XXX-XX-XX"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Group size */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Количество участников</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="adults">Взрослые (от 12 лет) *</Label>
                          <Select value={formData.adults} onValueChange={(value) => setFormData({...formData, adults: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                <SelectItem key={num} value={num.toString()}>{num} взрослый{num > 1 ? (num < 5 ? 'а' : 'ых') : ''}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="children">Дети (4-11 лет)</Label>
                          <Select value={formData.children} onValueChange={(value) => setFormData({...formData, children: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[0,1,2,3,4,5].map(num => (
                                <SelectItem key={num} value={num.toString()}>{num} {num === 0 ? 'детей' : `ребенок${num > 1 ? (num < 5 ? 'а' : '') : ''}`}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Tour details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Детали тура</h3>
                      <div>
                        <Label htmlFor="date">Желаемая дата *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="hotel">Отель для трансфера</Label>
                          <Input
                            id="hotel"
                            value={formData.hotel}
                            onChange={(e) => setFormData({...formData, hotel: e.target.value})}
                            placeholder="Название отеля"
                          />
                        </div>
                        <div>
                          <Label htmlFor="room">Номер комнаты</Label>
                          <Input
                            id="room"
                            value={formData.room}
                            onChange={(e) => setFormData({...formData, room: e.target.value})}
                            placeholder="Номер"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Comments */}
                    <div>
                      <Label htmlFor="comments">Дополнительные пожелания</Label>
                      <Textarea
                        id="comments"
                        value={formData.comments}
                        onChange={(e) => setFormData({...formData, comments: e.target.value})}
                        placeholder="Особые пожелания, вопросы, диетические ограничения..."
                        rows={4}
                      />
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold">
                      Отправить заявку
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      * Обязательные поля. После отправки заявки мы свяжемся с вами для подтверждения.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              {/* Tour summary */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Ваш заказ</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-gray-900 mb-2">{excursion.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{excursion.rating} ({excursion.reviewsCount} отзывов)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{excursion.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{excursion.groupSize}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Цена:</span>
                      <span className="text-2xl font-bold text-green-600">
                        {excursion.price} {excursion.currency}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">за человека</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Нужна помощь?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Telegram</p>
                      <a 
                        href="https://t.me/Phuketga" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        @Phuketga
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-gray-600 text-sm">+66 XXX XXX XXX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600 text-sm">info@phuketgo.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookPhiPhi2Days;