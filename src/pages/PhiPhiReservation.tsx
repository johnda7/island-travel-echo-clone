import React, { useState } from 'react';
import { ArrowLeft, Calendar, Users, MapPin, Phone, Mail, User, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const PhiPhiReservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    adults: 2,
    children: 0,
    hotel: '',
    roomNumber: '',
    comments: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `🏝️ БРОНИРОВАНИЕ ТУРА "Пхи-Пхи 2 дня/1 ночь"

👤 Контактная информация:
• Имя: ${formData.name}
• Телефон: ${formData.phone}
• Email: ${formData.email}

📅 Детали бронирования:
• Дата: ${formData.date}
• Взрослые: ${formData.adults} чел.
• Дети: ${formData.children} чел.

🏨 Размещение:
• Отель: ${formData.hotel}
• Номер: ${formData.roomNumber}

💬 Комментарии:
${formData.comments || 'Нет дополнительных пожеланий'}

Ждем вашего подтверждения!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/phuketGoo?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Breadcrumb и кнопка назад */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/excursion/phi-phi-2-days-1-night"
                className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к туру
              </Link>
              
              <nav className="text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Link to="/" className="hover:text-green-600">Главная</Link>
                  <span>›</span>
                  <Link to="/tours" className="hover:text-green-600">Туры</Link>
                  <span>›</span>
                  <span className="text-gray-900">Бронирование</span>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Заголовок тура */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Пхи-Пхи 2 дня / 1 ночь
                </h1>
                <p className="text-lg text-gray-600 mb-3">Стандартная программа</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>2 дня / 1 ночь</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>до 30 человек</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    <span>4.8 (53 отзыва)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Основная форма */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Форма бронирования */}
              <div className="bg-white rounded-2xl shadow-sm border p-8">
                <h2 className="text-2xl font-bold mb-8 text-gray-900">
                  Форма бронирования
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Контактная информация */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                      <User className="w-5 h-5 mr-2 text-green-600" />
                      Контактная информация
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Ваше имя *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                          placeholder="Введите ваше имя"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Телефон *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  {/* Детали тура */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-green-600" />
                      Детали тура
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Дата тура *
                        </label>
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Взрослые
                        </label>
                        <select
                          name="adults"
                          value={formData.adults}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num} чел.</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Дети
                        </label>
                        <select
                          name="children"
                          value={formData.children}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                        >
                          {[0,1,2,3,4,5].map(num => (
                            <option key={num} value={num}>{num === 0 ? 'Нет детей' : `${num} чел.`}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Размещение */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-green-600" />
                      Размещение (опционально)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Отель
                        </label>
                        <input
                          type="text"
                          name="hotel"
                          value={formData.hotel}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                          placeholder="Название отеля"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Номер комнаты
                        </label>
                        <input
                          type="text"
                          name="roomNumber"
                          value={formData.roomNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                          placeholder="Номер"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Комментарии */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Дополнительные пожелания
                    </label>
                    <textarea
                      name="comments"
                      rows={4}
                      value={formData.comments}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-base"
                      placeholder="Ваши пожелания, вопросы или особые требования..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Отправить заявку в Telegram</span>
                  </button>
                  
                </form>
              </div>
            </div>

            {/* Сводка заказа */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border p-8 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Сводка заказа</h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">Пхи-Пхи 2 дня / 1 ночь</p>
                      <p className="text-sm text-gray-600">Стандартная программа</p>
                    </div>
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <div className="flex items-center justify-between text-gray-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Взрослые:</span>
                      </div>
                      <span className="font-medium">{formData.adults} чел.</span>
                    </div>
                    {formData.children > 0 && (
                      <div className="flex items-center justify-between text-gray-600">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          <span>Дети:</span>
                        </div>
                        <span className="font-medium">{formData.children} чел.</span>
                      </div>
                    )}
                    {formData.date && (
                      <div className="flex items-center justify-between text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Дата:</span>
                        </div>
                        <span className="font-medium">{new Date(formData.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-semibold text-green-700">Итого</span>
                        <span className="text-2xl font-bold text-green-700">Уточняется</span>
                      </div>
                      <p className="text-sm text-green-600">
                        Стоимость рассчитывается индивидуально
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Что включено:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Трансфер из отеля и обратно
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Лодка туда и обратно
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Размещение в бунгало
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        3-разовое питание
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Экскурсионная программа
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Снаряжение для снорклинга
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Страховка
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Русскоговорящий гид
                      </li>
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                      <Phone className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Есть вопросы?</p>
                        <p>Telegram: @phuketGoo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PhiPhiReservation;
