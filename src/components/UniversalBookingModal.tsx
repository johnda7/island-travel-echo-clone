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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Phone, Mail, Minus, Plus, X } from "lucide-react";
import { TourData, BookingFormData, PriceCalculation } from "@/types/Tour";

interface UniversalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourData: TourData;
}

export const UniversalBookingModal = ({ isOpen, onClose, tourData }: UniversalBookingModalProps) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState("");
  
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

  // Блокируем скролл страницы при открытии модалки
  useEffect(() => {
    if (isOpen) {
      // Блокируем скролл простым способом (без position: fixed чтобы не ломать на iOS)
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'relative';
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.height = '';
        document.documentElement.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

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
      setSuccessMessageText('⚠️ Пожалуйста, заполните все обязательные поля');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
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

    try {
      // Сохраняем заказ в localStorage для админки
      const newOrder = {
        id: Date.now(),
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

      const existingOrders = JSON.parse(localStorage.getItem('bookingOrders') || '[]');
      existingOrders.push(newOrder);
      localStorage.setItem('bookingOrders', JSON.stringify(existingOrders));

      // ПОКАЗЫВАЕМ СООБЩЕНИЕ И НЕ ЗАКРЫВАЕМ МОДАЛКУ
      setSuccessMessageText('✅ Заявка принята! Сейчас откроем Telegram для завершения бронирования...');
      setShowSuccessMessage(true);
      
      // Переходим в Telegram через 3 секунды
      setTimeout(() => {
        const telegramUrl = `https://t.me/Phuketga?text=${encodeURIComponent(message)}`;
        window.location.href = telegramUrl;
      }, 3000);
      
    } catch (error) {
      console.error('❌ Ошибка при отправке:', error);
      
      setSuccessMessageText('✅ Заявка готова! Сейчас откроем Telegram для отправки...');
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        const telegramUrl = `https://t.me/Phuketga?text=${encodeURIComponent(message)}`;
        window.location.href = telegramUrl;
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden" 
      onClick={onClose}
      style={{ 
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        touchAction: 'none'
      }}
    >
      <div 
        className="absolute bg-white rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          width: 'min(448px, calc(100vw - 32px))',
          maxHeight: '85vh',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          margin: 0,
          position: 'fixed'
        }}
      >
        <div className="overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="p-2 sm:p-4" style={{ background: 'rgb(242, 242, 247)' }}>
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-[15px] sm:text-[19px] font-bold text-gray-900 tracking-tight flex items-center gap-2">
              🏝️ Бронирование
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full h-6 w-6 sm:h-8 sm:w-8 p-0 transition-all duration-150"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </div>

          <div className="mb-1.5 p-1.5 sm:p-3 bg-white rounded-xl" style={{ 
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
          }}>
            <h4 className="font-semibold text-[12px] sm:text-[15px] text-gray-900">{tourData.title}</h4>
            <p className="text-[10px] sm:text-[13px] text-gray-600 mt-0.5 line-clamp-1">{tourData.subtitle}</p>
          </div>

          {/* Калькулятор */}
          <div className="mb-1.5 space-y-1.5">
            <h5 className="font-semibold text-[12px] sm:text-[15px] text-gray-900">Гости:</h5>
            
            <div className="flex items-center justify-between p-1.5 sm:p-3 bg-white rounded-xl" style={{ 
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
            }}>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[11px] sm:text-[14px] text-gray-900">Взрослые</div>
                <div className="text-[9px] sm:text-[12px] text-gray-600">{priceCalc.adultPrice.toLocaleString()} {priceCalc.currency}</div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('adults', 'minus')}
                  disabled={formData.adults <= 1}
                  className="h-5 w-5 sm:h-8 sm:w-8 p-0 rounded-full transition-all duration-150"
                  style={{ 
                    borderColor: '#007AFF',
                    color: formData.adults <= 1 ? '#C7C7CC' : '#007AFF'
                  }}
                >
                  <Minus className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                </Button>
                <span className="font-bold w-4 sm:w-8 text-center text-[13px] sm:text-[17px]" style={{ color: '#007AFF' }}>{formData.adults}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('adults', 'plus')}
                  className="h-5 w-5 sm:h-8 sm:w-8 p-0 rounded-full transition-all duration-150"
                  style={{ 
                    borderColor: '#007AFF',
                    color: '#007AFF'
                  }}
                >
                  <Plus className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-1.5 sm:p-3 bg-white rounded-xl" style={{ 
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
            }}>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[11px] sm:text-[14px] text-gray-900">Дети (4-11)</div>
                <div className="text-[9px] sm:text-[12px] text-gray-600">{priceCalc.childPrice.toLocaleString()} {priceCalc.currency}</div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('children', 'minus')}
                  disabled={formData.children <= 0}
                  className="h-5 w-5 sm:h-8 sm:w-8 p-0 rounded-full transition-all duration-150"
                  style={{ 
                    borderColor: '#007AFF',
                    color: formData.children <= 0 ? '#C7C7CC' : '#007AFF'
                  }}
                >
                  <Minus className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                </Button>
                <span className="font-bold w-4 sm:w-8 text-center text-[13px] sm:text-[17px]" style={{ color: '#007AFF' }}>{formData.children}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('children', 'plus')}
                  className="h-5 w-5 sm:h-8 sm:w-8 p-0 rounded-full transition-all duration-150"
                  style={{ 
                    borderColor: '#007AFF',
                    color: '#007AFF'
                  }}
                >
                  <Plus className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            {/* Информация о младенцах */}
            <div className="text-center py-0">
              <span className="text-[9px] sm:text-[12px] text-gray-600 px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
                👶 До 3 лет - бесплатно
              </span>
            </div>

            <div className="border-t pt-1 p-1.5 sm:p-3 rounded-xl" style={{ 
              background: 'rgba(0, 122, 255, 0.08)',
              border: '1px solid rgba(0, 122, 255, 0.15)'
            }}>
              <div className="flex justify-between items-center">
                <span className="text-[12px] sm:text-[15px] font-semibold text-gray-900">Итого:</span>
                <span className="text-[16px] sm:text-[20px] font-bold" style={{ color: '#007AFF' }}>
                  {priceCalc.totalPrice.toLocaleString()} {priceCalc.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Форма */}
          <div className="space-y-1.5 mb-2">
            <div>
              <label className="block text-[11px] sm:text-[14px] font-semibold mb-0.5 text-gray-900">Имя *</label>
              <input
                type="text"
                className="w-full px-2 py-1 sm:px-3 sm:py-2.5 border rounded-xl focus:outline-none transition-all duration-150 bg-white text-[12px] sm:text-[15px]"
                style={{ 
                  borderColor: 'rgba(0, 0, 0, 0.15)'
                }}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-[11px] sm:text-[14px] font-semibold mb-0.5 text-gray-900">Телефон *</label>
              <input
                type="tel"
                className="w-full px-2 py-1 sm:px-3 sm:py-2.5 border rounded-xl focus:outline-none transition-all duration-150 bg-white text-[12px] sm:text-[15px]"
                style={{ 
                  borderColor: 'rgba(0, 0, 0, 0.15)'
                }}
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-[11px] sm:text-[14px] font-semibold mb-0.5 text-gray-900">Email</label>
              <input
                type="email"
                className="w-full px-2 py-1 sm:px-3 sm:py-2.5 border rounded-xl focus:outline-none transition-all duration-150 bg-white text-[12px] sm:text-[15px]"
                style={{ 
                  borderColor: 'rgba(0, 0, 0, 0.15)'
                }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-[11px] sm:text-[14px] font-semibold mb-0.5 text-gray-900">Дата *</label>
              <input
                type="date"
                className="w-full px-2 py-1 sm:px-3 sm:py-2.5 border rounded-xl focus:outline-none transition-all duration-150 bg-white text-[12px] sm:text-[15px]"
                style={{ 
                  borderColor: 'rgba(0, 0, 0, 0.15)'
                }}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
          </div>

          <Button 
            onClick={handleBooking}
            disabled={!formData.name.trim() || !formData.phone.trim() || !formData.date}
            className="btn-booking w-full py-1.5 sm:py-3 text-[13px] sm:text-[16px]"
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            {(!formData.name.trim() || !formData.phone.trim() || !formData.date) 
              ? 'Заполните поля' 
              : 'ЗАБРОНИРОВАТЬ'
            }
          </Button>
        </div>
        </div>
      </div>

      {/* Красивое уведомление вместо alert - ВЫНЕСЕНО НАРУЖУ */}
      {showSuccessMessage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full text-center pointer-events-auto"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              animation: 'slideDown 0.3s ease-out'
            }}
          >
            <div className="text-4xl mb-4">
              {successMessageText.includes('✅') ? '✅' : 
               successMessageText.includes('📱') ? '📱' : '⚠️'}
            </div>
            <p className="text-base sm:text-lg font-semibold text-gray-900">
              {successMessageText.replace(/✅|⚠️|📱/g, '').trim()}
            </p>
            {successMessageText.includes('Telegram') && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto" style={{ borderColor: '#007AFF' }}></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Экспорт старого компонента для совместимости (временно)
export const BookingModal = UniversalBookingModal;