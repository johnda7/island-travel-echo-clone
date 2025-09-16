import React, { useState, useMemo } from 'react';
import { Tour, BookingParams, BookingParticipants } from '../../types/tour';
import { 
  calculateTotalPrice, 
  generateBreadcrumbs, 
  formatPrice, 
  formatDuration,
  checkTourAvailability 
} from '../../lib/tours';
import { sendTelegramNotification, sendWhatsAppMessage, type BookingData } from '../../lib/telegram';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Minus,
  Plus,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface BookingTemplateProps {
  tour: Tour;
  variant?: string;
}

export const BookingTemplate: React.FC<BookingTemplateProps> = ({ tour, variant = 'standard' }) => {
  const breadcrumbs = generateBreadcrumbs(tour.slug, variant);
  
  // Состояния формы
  const [participants, setParticipants] = useState<BookingParticipants>({
    adults: 2,
    children: 0,
    infants: 0
  });
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(variant);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  // Расчёт стоимости
  const bookingParams: BookingParams = {
    tourId: tour.id,
    variant: selectedVariant,
    date: selectedDate,
    participants,
    selectedOptions,
    specialRequests: contactInfo.comment
  };

  const priceBreakdown = useMemo(() => {
    return calculateTotalPrice(tour, bookingParams);
  }, [tour, bookingParams]);

  // Функции для изменения участников
  const updateParticipants = (type: keyof BookingParticipants, change: number) => {
    setParticipants(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + change)
    }));
  };

  // Получение выбранного варианта тура
  const selectedTourVariant = tour.bookingOptions?.find(opt => opt.id === selectedVariant);

  // Проверка доступности
  const isDateAvailable = selectedDate ? checkTourAvailability(tour, selectedDate) : true;

  // Валидация формы
  const isFormValid = useMemo(() => {
    return (
      contactInfo.name.trim() !== '' &&
      contactInfo.phone.trim() !== '' &&
      selectedDate !== '' &&
      participants.adults > 0 &&
      isDateAvailable
    );
  }, [contactInfo, selectedDate, participants.adults, isDateAvailable]);

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setIsSubmitting(true);

    // Подготовка данных для Telegram
    const bookingData: BookingData = {
      tourTitle: tour.title,
      adults: participants.adults,
      children: participants.children,
      selectedDate,
      contactInfo,
      totalPrice: priceBreakdown.total,
      currency: tour.pricing.currency
    };

    try {
      const telegramSent = await sendTelegramNotification(bookingData);
      
      if (telegramSent) {
        alert('✅ Бронирование отправлено! Мы свяжемся с вами в ближайшее время.');
      } else {
        sendWhatsAppMessage(bookingData);
        alert('Бронирование отправлено! Мы свяжемся с вами в ближайшее время.');
      }
      
      // Сброс формы
      setContactInfo({ name: '', phone: '', email: '', comment: '' });
      setSelectedDate('');
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Произошла ошибка при отправке бронирования. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Бронирование: {tour.title} — Island Travel</title>
        <meta name="description" content={`Забронировать ${tour.title}. Калькулятор стоимости, выбор даты, контактная информация.`} />
      </Helmet>

      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Хлебные крошки */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {crumb.current ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная форма */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Бронирование тура</CardTitle>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900">{tour.title}</h2>
                  <p className="text-gray-600">{tour.subtitle}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{tour.location.island}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(tour.duration.days, tour.duration.nights)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>до {tour.groupSize.max} человек</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Вариант тура */}
                  {tour.bookingOptions && tour.bookingOptions.length > 1 && (
                    <div>
                      <Label htmlFor="variant">Вариант тура</Label>
                      <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите вариант" />
                        </SelectTrigger>
                        <SelectContent>
                          {tour.bookingOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              <div>
                                <div className="font-medium">{option.name}</div>
                                <div className="text-sm text-gray-500">{option.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Дата тура */}
                  <div>
                    <Label htmlFor="date">Дата тура *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date(Date.now() + tour.availability.advanceBooking * 24 * 60 * 60 * 1000)
                        .toISOString().split('T')[0]}
                      required
                    />
                    {selectedDate && !isDateAvailable && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>Тур недоступен в выбранную дату</span>
                      </div>
                    )}
                  </div>

                  {/* Количество участников */}
                  <div>
                    <Label>Количество участников *</Label>
                    <div className="space-y-3 mt-2">
                      {/* Взрослые */}
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Взрослые</div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(tour.pricing.base.adult, tour.pricing.currency)} за человека
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateParticipants('adults', -1)}
                            disabled={participants.adults <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{participants.adults}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateParticipants('adults', 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Дети */}
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Дети (3-11 лет)</div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(tour.pricing.base.child, tour.pricing.currency)} за ребёнка
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateParticipants('children', -1)}
                            disabled={participants.children <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{participants.children}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateParticipants('children', 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Младенцы */}
                      {tour.pricing.base.infant === 0 && (
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Младенцы (до 3 лет)</div>
                            <div className="text-sm text-gray-500">Бесплатно</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateParticipants('infants', -1)}
                              disabled={participants.infants <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{participants.infants}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateParticipants('infants', 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Дополнительные услуги */}
                  {tour.additionalServices && tour.additionalServices.length > 0 && (
                    <div>
                      <Label>Дополнительные услуги</Label>
                      <div className="space-y-2 mt-2">
                        {tour.additionalServices.map((service) => (
                          <div key={service.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={service.id}
                              checked={selectedOptions.includes(service.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedOptions([...selectedOptions, service.id]);
                                } else {
                                  setSelectedOptions(selectedOptions.filter(id => id !== service.id));
                                }
                              }}
                            />
                            <Label htmlFor={service.id} className="flex-1">
                              <div>{service.name}</div>
                              <div className="text-sm text-gray-500">{service.description}</div>
                              <div className="text-sm font-medium">
                                {formatPrice(service.price, service.currency)}
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Контактная информация */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Контактная информация</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Имя *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="Ваше имя"
                            value={contactInfo.name}
                            onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Телефон *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+7 (999) 123-45-67"
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="comment">Комментарий</Label>
                      <Textarea
                        id="comment"
                        placeholder="Особые пожелания или вопросы..."
                        value={contactInfo.comment}
                        onChange={(e) => setContactInfo({...contactInfo, comment: e.target.value})}
                        rows={3}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Сводка заказа */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle>Сводка заказа</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Детали тура */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Взрослые ({participants.adults}):</span>
                      <span>{formatPrice(priceBreakdown.basePrice - (tour.pricing.base.child * participants.children), tour.pricing.currency)}</span>
                    </div>
                    
                    {participants.children > 0 && (
                      <div className="flex justify-between">
                        <span>Дети ({participants.children}):</span>
                        <span>{formatPrice(tour.pricing.base.child * participants.children, tour.pricing.currency)}</span>
                      </div>
                    )}
                    
                    {priceBreakdown.seasonalAdjustment !== 0 && (
                      <div className="flex justify-between text-orange-600">
                        <span>Сезонная надбавка:</span>
                        <span>+{formatPrice(priceBreakdown.seasonalAdjustment, tour.pricing.currency)}</span>
                      </div>
                    )}
                    
                    {priceBreakdown.variantAdjustment !== 0 && selectedTourVariant && (
                      <div className="flex justify-between text-blue-600">
                        <span>{selectedTourVariant.name}:</span>
                        <span>+{formatPrice(priceBreakdown.variantAdjustment, tour.pricing.currency)}</span>
                      </div>
                    )}
                    
                    {priceBreakdown.additionalServices > 0 && (
                      <div className="flex justify-between">
                        <span>Доп. услуги:</span>
                        <span>+{formatPrice(priceBreakdown.additionalServices, tour.pricing.currency)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Итого:</span>
                      <span className="text-blue-600">
                        {formatPrice(priceBreakdown.total, tour.pricing.currency)}
                      </span>
                    </div>
                    
                    {tour.pricing.deposit?.enabled && priceBreakdown.deposit && (
                      <div className="text-sm text-gray-600 mt-1">
                        Предоплата: {formatPrice(priceBreakdown.deposit, tour.pricing.currency)}
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleSubmit}
                    className="w-full" 
                    size="lg"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? 'Отправляем...' : 'Забронировать тур'}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Нажимая "Забронировать", вы соглашаетесь с условиями бронирования. 
                    Оплата производится наличными в день тура.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};