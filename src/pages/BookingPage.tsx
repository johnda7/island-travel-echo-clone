import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { phiPhi2DaysTourData as phiPhiTourData } from '@/data/tours/phi-phi-2days';
import { ChevronLeft, Calendar, Users, Phone, Mail, User, MapPin } from 'lucide-react';

export const BookingPageNew: React.FC = () => {
  const { tourId } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    adults: 2,
    children: 0,
    infants: 0,
    name: '',
    phone: '',
    email: '',
    hotelName: '',
    specialRequests: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // Многошаговая форма

  // Функция расчета цены
  const calculateTotal = () => {
    return (formData.adults * phiPhiTourData.priceAdult) + 
           (formData.children * phiPhiTourData.priceChild);
  };

  // Валидация формы
  const isStep1Valid = formData.date && formData.adults >= 1;
  const isStep2Valid = formData.name.trim() && formData.phone.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const totalPrice = calculateTotal();
    const bookingId = 'PH' + Date.now().toString().slice(-6);

    const message = `🏝️ НОВОЕ БРОНИРОВАНИЕ #${bookingId}

📋 ТУР: ${phiPhiTourData.title}
📅 Дата: ${new Date(formData.date).toLocaleDateString('ru-RU', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}

👥 ГОСТИ:
• Взрослые: ${formData.adults} чел. × ${phiPhiTourData.priceAdult}฿ = ${formData.adults * phiPhiTourData.priceAdult}฿
• Дети: ${formData.children} чел. × ${phiPhiTourData.priceChild}฿ = ${formData.children * phiPhiTourData.priceChild}฿
• Младенцы: ${formData.infants} чел. (бесплатно)

💰 ИТОГО К ОПЛАТЕ: ${totalPrice}฿

👤 КОНТАКТЫ:
• Имя: ${formData.name}
• Телефон: ${formData.phone}
• Email: ${formData.email || 'не указан'}
• Отель: ${formData.hotelName || 'не указан'}

📝 Пожелания: ${formData.specialRequests || 'нет'}

⏰ Заявка от: ${new Date().toLocaleString('ru-RU')}
🆔 ID бронирования: ${bookingId}`;

    try {
      // Попытка отправки через Telegram Bot API
      console.log('🚀 Отправка через Telegram Bot API...');
      const response = await fetch(`https://api.telegram.org/bot8445717266:AAHEDA4SJPUL48gpV-Q9qc-V98GSuyPFn08/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '@Phuketga',
          text: message
        })
      });

      const result = await response.json();
      console.log('📋 Telegram API response:', result);

      if (response.ok && result.ok) {
        // Успешная отправка через API
        alert(`✅ Бронирование #${bookingId} успешно отправлено!\n\nМы свяжемся с вами в течение 1 часа для подтверждения деталей.`);
        
        // Очистить форму
        setFormData({
          date: '',
          adults: 2,
          children: 0,
          infants: 0,
          name: '',
          phone: '',
          email: '',
          hotelName: '',
          specialRequests: ''
        });
        setStep(1);
      } else {
        throw new Error(`API Error: ${result.description || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Telegram API failed:', error);
      
      // Fallback - открыть Telegram чат
      const telegramUrl = `https://t.me/Phuketga?text=${encodeURIComponent(message)}`;
      window.open(telegramUrl, '_blank');
      
      alert(`⚠️ Бронирование #${bookingId} готово к отправке!\n\nОткроется Telegram для завершения заказа.`);
    }

    setIsLoading(false);
  };

  // Компонент шага 1: Выбор даты и гостей
  const Step1 = () => (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Выберите дату и количество гостей</h2>
        <p className="text-sm text-gray-600 mt-1">Шаг 1 из 2</p>
      </div>

      {/* Прогресс бар */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full w-1/2 transition-all duration-300"></div>
      </div>

      {/* Дата поездки */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          Дата поездки
        </label>
        <input
          type="date"
          className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Количество гостей */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
          <Users className="w-4 h-4 mr-2 text-blue-500" />
          Количество гостей
        </label>
        
        <div className="space-y-4">
          {/* Взрослые */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div>
              <div className="font-medium text-gray-800">Взрослые</div>
              <div className="text-sm text-gray-600">от 12 лет • {phiPhiTourData.priceAdult}฿</div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-xl font-bold text-blue-600 hover:bg-blue-50 active:scale-95 transition-all"
                onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})}
              >−</button>
              <span className="w-8 text-center font-bold text-lg text-gray-800">{formData.adults}</span>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold hover:bg-blue-600 active:scale-95 transition-all"
                onClick={() => setFormData({...formData, adults: formData.adults + 1})}
              >+</button>
            </div>
          </div>

          {/* Дети */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
            <div>
              <div className="font-medium text-gray-800">Дети</div>
              <div className="text-sm text-gray-600">1-11 лет • {phiPhiTourData.priceChild}฿</div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white border-2 border-green-200 flex items-center justify-center text-xl font-bold text-green-600 hover:bg-green-50 active:scale-95 transition-all"
                onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})}
              >−</button>
              <span className="w-8 text-center font-bold text-lg text-gray-800">{formData.children}</span>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold hover:bg-green-600 active:scale-95 transition-all"
                onClick={() => setFormData({...formData, children: formData.children + 1})}
              >+</button>
            </div>
          </div>

          {/* Младенцы */}
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div>
              <div className="font-medium text-gray-800">Младенцы</div>
              <div className="text-sm text-gray-600">0-12 месяцев • Бесплатно</div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-xl font-bold text-purple-600 hover:bg-purple-50 active:scale-95 transition-all"
                onClick={() => setFormData({...formData, infants: Math.max(0, formData.infants - 1)})}
              >−</button>
              <span className="w-8 text-center font-bold text-lg text-gray-800">{formData.infants}</span>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold hover:bg-purple-600 active:scale-95 transition-all"
                onClick={() => setFormData({...formData, infants: formData.infants + 1})}
              >+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Итого */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-sm opacity-90">Итоговая стоимость</div>
          <div className="text-3xl font-bold mt-1">{calculateTotal()}฿</div>
          <div className="text-xs opacity-75 mt-1">
            {formData.adults > 0 && `${formData.adults} взр.`}
            {formData.children > 0 && ` + ${formData.children} дет.`}
            {formData.infants > 0 && ` + ${formData.infants} мл.`}
          </div>
        </div>
      </div>

      {/* Кнопка далее */}
      <button
        type="button"
        onClick={() => setStep(2)}
        disabled={!isStep1Valid}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 active:scale-98"
      >
        Далее: Контактная информация →
      </button>
    </div>
  );

  // Компонент шага 2: Контактная информация
  const Step2 = () => (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Контактная информация</h2>
        <p className="text-sm text-gray-600 mt-1">Шаг 2 из 2</p>
      </div>

      {/* Прогресс бар */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full w-full transition-all duration-300"></div>
      </div>

      {/* Сводка заказа */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-medium text-blue-800 mb-2">📋 Ваше бронирование</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <div>📅 {new Date(formData.date).toLocaleDateString('ru-RU')}</div>
          <div>👥 {formData.adults + formData.children + formData.infants} гостей</div>
          <div className="font-bold">💰 {calculateTotal()}฿</div>
        </div>
      </div>

      {/* Форма контактов */}
      <div className="space-y-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 mr-2 text-blue-500" />
            Ваше имя *
          </label>
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Иван Петров"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 mr-2 text-blue-500" />
            Телефон *
          </label>
          <input
            type="tel"
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+66 XX XXX XXXX"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            Email (необязательно)
          </label>
          <input
            type="email"
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            Название отеля (необязательно)
          </label>
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Для организации трансфера"
            value={formData.hotelName}
            onChange={(e) => setFormData({...formData, hotelName: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Особые пожелания (необязательно)
          </label>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20 resize-none"
            placeholder="Аллергии, диетические ограничения, особые просьбы..."
            value={formData.specialRequests}
            onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
          />
        </div>
      </div>

      {/* Кнопки */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-200"
        >
          ← Назад
        </button>

        <button
          type="submit"
          disabled={!isStep2Valid || isLoading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 active:scale-98 shadow-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Отправка бронирования...
            </span>
          ) : (
            '🏝️ ЗАБРОНИРОВАТЬ ТУР'
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link 
              to="/" 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div className="flex-1">
              <h1 className="font-bold text-gray-800 truncate">{phiPhiTourData.title}</h1>
              <p className="text-xs text-gray-500">Бронирование тура</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <form onSubmit={handleSubmit}>
          {step === 1 ? <Step1 /> : <Step2 />}
        </form>
      </div>

      {/* Footer info */}
      <div className="max-w-lg mx-auto px-4 pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-center text-sm text-gray-600">
            <p className="font-medium">📞 Нужна помощь?</p>
            <p className="mt-1">
              <a href="https://t.me/Phuketga" className="text-blue-500 hover:underline">
                Напишите в Telegram
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookingPage = BookingPageNew;
export default BookingPageNew;