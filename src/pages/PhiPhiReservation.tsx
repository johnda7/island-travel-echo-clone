import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Users, MapPin, Phone, Mail, User, Clock, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const PhiPhiReservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    adults: 2,
    children: 0
  });

  // Цены (как маркетолог - показываем цену сразу!)
  const pricing = {
    adultPrice: 4900, // цена за взрослого
    childPrice: 3500  // цена за ребенка
  };

  const [totalPrice, setTotalPrice] = useState(0);

  // Автоматический расчет цены при изменении количества
  useEffect(() => {
    const total = (formData.adults * pricing.adultPrice) + (formData.children * pricing.childPrice);
    setTotalPrice(total);
  }, [formData.adults, formData.children]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    // Маркетинговый подход - готовая заявка с ценой!
    const message = `🏝️ ЗАЯВКА НА БРОНИРОВАНИЕ

🎯 ТУР: Пхи-Пхи 2 дня/1 ночь (Стандарт)
📅 ДАТА: ${formatDate(formData.date)}

👥 УЧАСТНИКИ:
• Взрослые: ${formData.adults} чел. × ${pricing.adultPrice.toLocaleString('ru')} ₽ = ${(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽
${formData.children > 0 ? `• Дети: ${formData.children} чел. × ${pricing.childPrice.toLocaleString('ru')} ₽ = ${(formData.children * pricing.childPrice).toLocaleString('ru')} ₽` : ''}

💰 ИТОГО: ${totalPrice.toLocaleString('ru')} ₽

👤 КОНТАКТ: ${formData.name}
� ТЕЛЕФОН: ${formData.phone}

✅ Клиент готов к бронированию!
🚀 Обработать заявку в приоритете`;

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
                  
                  {/* Контактная информация - ТОЛЬКО НЕОБХОДИМОЕ */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                      <User className="w-5 h-5 mr-2 text-green-600" />
                      Ваши контакты
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Как вас зовут? *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                          placeholder="Ваше имя"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Телефон для связи *
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

                  {/* Маркетинговое преимущество - показываем что включено */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Все уже включено в стоимость:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-green-700">
                      <div>✓ Трансфер туда-обратно</div>
                      <div>✓ Проживание в бунгало</div>
                      <div>✓ Лодка + бензин</div>
                      <div>✓ Завтрак, обед, ужин</div>
                      <div>✓ Экскурсионная программа</div>
                      <div>✓ Снаряжение для снорклинга</div>
                      <div>✓ Русскоговорящий гид</div>
                      <div>✓ Страховка</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!formData.name || !formData.phone || !formData.date}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
                  >
                    <Phone className="w-6 h-6" />
                    <span>
                      {totalPrice > 0 
                        ? `Забронировать за ${totalPrice.toLocaleString('ru')} ₽` 
                        : 'Отправить заявку'
                      }
                    </span>
                  </button>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    📱 Заявка отправится в Telegram • ⚡ Ответим в течение 5 минут
                  </p>
                  
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
                      {formData.adults > 0 && (
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex justify-between">
                            <span>Взрослые ({formData.adults} чел.)</span>
                            <span>{(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽</span>
                          </div>
                          {formData.children > 0 && (
                            <div className="flex justify-between">
                              <span>Дети ({formData.children} чел.)</span>
                              <span>{(formData.children * pricing.childPrice).toLocaleString('ru')} ₽</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-lg font-semibold text-green-700">Итого к доплате</span>
                        <span className="text-3xl font-bold text-green-700">{totalPrice.toLocaleString('ru')} ₽</span>
                      </div>
                      <p className="text-sm text-green-600 mt-2">
                        💳 Предоплата 30% • 💰 Доплата на месте
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
