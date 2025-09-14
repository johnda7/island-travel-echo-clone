import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, MapPin, Phone, CheckCircle } from 'lucide-react';

const PhiPhiReservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    adults: 2,
    children: 0
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const pricing = {
    adultPrice: 4000,
    childPrice: 3500
  };

  useEffect(() => {
    const total = (formData.adults * pricing.adultPrice) + (formData.children * pricing.childPrice);
    setTotalPrice(total);
  }, [formData.adults, formData.children]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'adults' || name === 'children' ? parseInt(value) : value
    }));
  };

  const handleWhatsAppSubmit = () => {
    if (!formData.name || !formData.phone) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const message = `🏝️ НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ

🎯 ТУР: Пхи-Пхи 2 дня/1 ночь (Стандарт)
👤 ИМЯ: ${formData.name}
📱 ТЕЛЕФОН: ${formData.phone}
👥 КОЛИЧЕСТВО: ${formData.adults} взр. + ${formData.children} дет.
💰 ИТОГО: ${totalPrice.toLocaleString()} ฿

📅 Готов к бронированию!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/66934740231?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link 
          to="/excursion/phi-phi-2-days-1-night" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к туру
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Бронирование тура
            </h1>
            <p className="text-lg text-gray-600">
              Пхи-Пхи 2 дня / 1 ночь - Стандарт
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Детали тура</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>2 дня / 1 ночь</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>До 30 человек</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Острова Пхи-Пхи</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Круглый год</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Форма бронирования</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+7 (xxx) xxx-xx-xx"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Взрослые
                  </label>
                  <select
                    name="adults"
                    value={formData.adults}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дети (3-11 лет)
                  </label>
                  <select
                    name="children"
                    value={formData.children}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Расчет стоимости</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Взрослые ({formData.adults} x {pricing.adultPrice.toLocaleString()} ฿)</span>
                  <span>{(formData.adults * pricing.adultPrice).toLocaleString()} ฿</span>
                </div>
                {formData.children > 0 && (
                  <div className="flex justify-between">
                    <span>Дети ({formData.children} x {pricing.childPrice.toLocaleString()} ฿)</span>
                    <span>{(formData.children * pricing.childPrice).toLocaleString()} ฿</span>
                  </div>
                )}
                <div className="border-t pt-2 font-semibold text-lg flex justify-between">
                  <span>Итого:</span>
                  <span className="text-blue-600">{totalPrice.toLocaleString()} ฿</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleWhatsAppSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Забронировать через WhatsApp
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              * Обязательные поля для заполнения
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PhiPhiReservation;