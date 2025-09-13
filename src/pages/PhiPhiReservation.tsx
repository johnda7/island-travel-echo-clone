import React, { useState } from 'react';
import { Calendar, Users, Clock, MapPin, Phone, Mail, User } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Пхи-Пхи 2 дня / 1 ночь</h1>
              <p className="text-gray-600">Стандартная программа</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Форма бронирования */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                Форма бронирования
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Контактная информация */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Контактная информация
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* Детали тура */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Детали тура
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Дата тура *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Взрослые
                        </label>
                        <select
                          name="adults"
                          value={formData.adults}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Дети
                        </label>
                        <select
                          name="children"
                          value={formData.children}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          {[0,1,2,3,4,5].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Размещение */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Размещение
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Отель
                      </label>
                      <input
                        type="text"
                        name="hotel"
                        value={formData.hotel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Название отеля"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Номер комнаты
                      </label>
                      <input
                        type="text"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Номер"
                      />
                    </div>
                  </div>
                </div>

                {/* Комментарии */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дополнительные пожелания
                  </label>
                  <textarea
                    name="comments"
                    rows={4}
                    value={formData.comments}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Ваши пожелания или вопросы..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Отправить заявку в Telegram</span>
                </button>
                
              </form>
            </div>
          </div>

          {/* Сводка заказа */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Сводка заказа</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Пхи-Пхи 2 дня / 1 ночь</p>
                    <p className="text-sm text-gray-600">Стандартная программа</p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Взрослые: {formData.adults}</span>
                  </div>
                  {formData.children > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Дети: {formData.children}</span>
                    </div>
                  )}
                  {formData.date && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(formData.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-700">Итого</span>
                      <span className="text-lg font-bold text-green-700">Уточняется</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Финальная стоимость будет рассчитана после подтверждения
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Что включено:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Трансфер из отеля и обратно</li>
                    <li>• Лодка туда и обратно</li>
                    <li>• Размещение в бунгало</li>
                    <li>• Питание (завтрак, обед, ужин)</li>
                    <li>• Экскурсионная программа</li>
                    <li>• Снаряжение для снорклинга</li>
                    <li>• Страховка</li>
                    <li>• Русскоговорящий гид</li>
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <div>
                      <p className="font-medium">Есть вопросы?</p>
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
  );
};

export default PhiPhiReservation;