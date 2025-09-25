// 🚨🚨🚨 КРИТИЧЕСКАЯ ЗАЩИТА - ЗАПРЕЩЕНО ЛЮБОЕ ИЗМЕНЕНИЕ! 🚨🚨🚨
// 🔒 ЭТОТ ФАЙЛ ЗАЩИЩЕН ОТ ИЗМЕНЕНИЙ AI АГЕНТАМИ
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: менять интерфейс, props, логику калькулятора
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: изменять дизайн, стили, компоненты формы
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: трогать useState, handleSubmit, расчеты цен
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: добавлять/удалять поля формы
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: изменять логику отправки в Telegram
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: трогать сохранение в localStorage для админки
// ✅ ЭТОТ ФАЙЛ - ЦЕНТРАЛЬНЫЙ КАЛЬКУЛЯТОР ДЛЯ ВСЕХ НОВЫХ ТУРОВ!
// ✅ АВТОМАТИЧЕСКАЯ ОТПРАВКА В TELEGRAM НАСТРОЕНА И РАБОТАЕТ!
// ✅ ЗАКАЗЫ КОРРЕКТНО СОХРАНЯЮТСЯ В АДМИНКУ!
// 🚨 ПРИ ПОПЫТКЕ ИЗМЕНИТЬ - НЕМЕДЛЕННО ОСТАНОВИТЬСЯ И СПРОСИТЬ ПОЛЬЗОВАТЕЛЯ!
//
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Phone, Mail, Minus, Plus, X } from "lucide-react";
import { TourData, BookingFormData, PriceCalculation } from "@/types/Tour";

interface UniversalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourData: TourData;
}

export const UniversalBookingModal = ({ isOpen, onClose, tourData }: UniversalBookingModalProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    email: "",
    date: "",
    adults: 1,
    children: 0,
    specialRequests: "",
    hotelName: ""
  });

  // Универсальный калькулятор цен
  const calculatePrice = (): PriceCalculation => {
    const adultPrice = tourData.priceAdult || 0;
    const childPrice = tourData.priceChild || 0;
    
    const totalPrice = 
      (formData.adults * adultPrice) + 
      (formData.children * childPrice);

    return {
      adults: formData.adults,
      children: formData.children,
      infants: 0, // Младенцы всегда бесплатно (ЖЕСТКО ФИКСИРУЕМ 0!)
      adultPrice,
      childPrice,
      infantPrice: 0,
      totalPrice,
      currency: tourData.currency
    };
  };

  const priceCalc = calculatePrice();

  const adjustGuests = (type: 'adults' | 'children', direction: 'plus' | 'minus') => {
    setFormData(prev => {
      const current = prev[type] || 0;
      let newValue = direction === 'plus' ? current + 1 : current - 1;
      
      // Ограничения
      if (type === 'adults') newValue = Math.max(1, newValue);
      else newValue = Math.max(0, newValue);
      
      return { ...prev, [type]: newValue };
    });
  };

  const handleBooking = async () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.date) {
      alert('Пожалуйста, заполните все обязательные поля (Имя, Телефон, Дата)');
      return;
    }

    const message = `🏝️ Новая бронь тура!

📋 Тур: ${tourData.title}
💰 Цена: ${priceCalc.totalPrice.toLocaleString()} ${priceCalc.currency}
👥 Гости: ${priceCalc.adults} взрослых, ${priceCalc.children} детей
📅 Дата: ${formData.date}

👤 Контактная информация:
• Имя: ${formData.name}
• Телефон: ${formData.phone}
• Email: ${formData.email || 'не указан'}

⏰ Заявка подана: ${new Date().toLocaleString('ru-RU')}`;

    // Определяем, мобильное ли это устройство
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    try {
      // Сохраняем заказ в localStorage для админки
      const newOrder = {
        id: Date.now(), // Используем timestamp как ID
        tourName: tourData.title,
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        adults: formData.adults,
        children: formData.children,
        totalPrice: priceCalc.totalPrice,
        currency: priceCalc.currency,
        createdAt: new Date().toLocaleString('ru-RU'),
        status: 'новый' as const
      };

      // Получаем существующие заказы
      const existingOrders = JSON.parse(localStorage.getItem('bookingOrders') || '[]');
      
      // Добавляем новый заказ
      existingOrders.push(newOrder);
      
      // Сохраняем обратно
      localStorage.setItem('bookingOrders', JSON.stringify(existingOrders));

      // На мобильных устройствах сразу используем прямой редирект в Telegram
      if (isMobile) {
        const telegramUrl = `https://t.me/Phuketga?text=${encodeURIComponent(message)}`;
        window.location.href = telegramUrl;
        alert('✅ Заявка подготовлена! Переходим в Telegram для отправки.');
        
        // Очищаем форму и закрываем модал
        setFormData({
          name: "",
          phone: "",
          email: "",
          date: "",
          adults: 1,
          children: 0,
          specialRequests: "",
          hotelName: ""
        });
        onClose();
        return;
      }

      // На десктопе пробуем Bot API
      const BOT_TOKEN = '8445717266:AAHEDA4SJPUL48gpV-Q9qc-V98GSuyPFn08';
      
      const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '@Phuketga',
          text: message,
          parse_mode: 'HTML'
        })
      });
      
      const telegramResult = await telegramResponse.json();
      
      if (telegramResult.ok) {
        alert('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        console.log('✅ Сообщение отправлено в Telegram');
      } else {
        console.error('❌ Ошибка Telegram API:', telegramResult.description);
        // Fallback - открываем Telegram с готовым сообщением (мобильно-совместимый метод)
        const telegramUrl = `https://t.me/Phuketga?text=${encodeURIComponent(message)}`;
        window.location.href = telegramUrl;
        alert('⚠️ Заявка подготовлена! Переходим в Telegram для отправки.');
      }
      
      // Очищаем форму и закрываем модал
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        adults: 1,
        children: 0,
        specialRequests: "",
        hotelName: ""
      });
      onClose();
      
    } catch (error) {
      console.error('❌ Ошибка при отправке:', error);
      
      // Fallback - открываем Telegram с готовым сообщением (мобильно-совместимый метод)
      const telegramUrl = `https://t.me/Phuketga?text=${encodeURIComponent(message)}`;
      window.location.href = telegramUrl;
      alert('⚠️ Заявка подготовлена! Переходим в Telegram для отправки.');
      
      // Очищаем форму и закрываем модал даже при ошибке
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        adults: 1,
        children: 0,
        specialRequests: "",
        hotelName: ""
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="p-6 bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">🏝️ Бронирование тура</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full h-8 w-8 p-0 transition-all duration-200 hover:scale-110"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
            <h4 className="font-semibold text-lg text-gray-800">{tourData.title}</h4>
            <p className="text-gray-600">{tourData.subtitle}</p>
          </div>

          {/* Калькулятор */}
          <div className="mb-6 space-y-4">
            <h5 className="font-semibold text-gray-800">Количество гостей:</h5>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div>
                <div className="font-medium text-gray-800">Взрослые</div>
                <div className="text-sm text-gray-600">{priceCalc.adultPrice.toLocaleString()} {priceCalc.currency} за человека</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('adults', 'minus')}
                  disabled={formData.adults <= 1}
                  className="h-8 w-8 p-0 rounded-full border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-bold w-8 text-center text-lg text-cyan-600">{formData.adults}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('adults', 'plus')}
                  className="h-8 w-8 p-0 rounded-full border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div>
                <div className="font-medium text-gray-800">Дети (4-11 лет)</div>
                <div className="text-sm text-gray-600">{priceCalc.childPrice.toLocaleString()} {priceCalc.currency} за ребенка</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('children', 'minus')}
                  disabled={formData.children <= 0}
                  className="h-8 w-8 p-0 rounded-full border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-bold w-8 text-center text-lg text-cyan-600">{formData.children}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('children', 'plus')}
                  className="h-8 w-8 p-0 rounded-full border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Информация о младенцах */}
            <div className="text-center py-2">
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">👶 Младенцы до 3 лет - бесплатно</span>
            </div>

            <div className="border-t pt-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Итого:</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {priceCalc.totalPrice.toLocaleString()} {priceCalc.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Форма */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Ваше имя *</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Телефон *</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Email (необязательно)</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Дата поездки *</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
          </div>

          <Button 
            onClick={handleBooking}
            disabled={!formData.name.trim() || !formData.phone.trim() || !formData.date}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none text-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            {(!formData.name.trim() || !formData.phone.trim() || !formData.date) 
              ? 'Заполните все поля' 
              : '🏝️ ЗАБРОНИРОВАТЬ ТУР'
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

// Экспорт старого компонента для совместимости (временно)
export const BookingModal = UniversalBookingModal;