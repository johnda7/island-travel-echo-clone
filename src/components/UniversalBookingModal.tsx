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
  // 🔍 Автоматическое определение Telegram username при открытии из Telegram
  const getTelegramUserData = () => {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;
      
      if (user) {
        console.log('🔍 Telegram User Data:', user); // Для отладки
        return {
          telegramUsername: user.username ? `@${user.username}` : '',
          telegramFirstName: user.first_name || '',
          telegramLastName: user.last_name || '',
          telegramId: user.id || ''
        };
      }
    }
    console.log('⚠️ Telegram WebApp не доступен или нет данных пользователя');
    return { telegramUsername: '', telegramFirstName: '', telegramLastName: '', telegramId: '' };
  };

  const initialTgData = getTelegramUserData();

  const [formData, setFormData] = useState<BookingFormData>({
    name: initialTgData.telegramFirstName || "",
    phone: "",
    email: "",
    date: "",
    adults: 1,
    children: 0,
    specialRequests: "",
    hotelName: ""
  });

  // ✅ STATE для показа сообщения ВНУТРИ модалки (как было раньше)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState('');

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

  // ✅ Универсальный открыватель Telegram чата с менеджером (с подстановкой текста)
  // Цепочка fallback'ов: openTelegramLink → tg://resolve deep link → window.location.href
  const openTelegramChat = (messageText: string) => {
    const encoded = encodeURIComponent(messageText);
    const httpsUrl = `https://t.me/Phuketga?text=${encoded}`;
    const tgUrl = `tg://resolve?domain=Phuketga&text=${encoded}`;

    // Копируем сообщение в буфер обмена как резерв
    try { navigator.clipboard.writeText(messageText).catch(() => {}); } catch {}

    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      // Внутри Telegram Mini App
      try {
        if (typeof tg.openTelegramLink === 'function') {
          // Способ 1: openTelegramLink — документировано для ?text=
          // Закрывает Mini App и открывает чат внутри Telegram
          tg.openTelegramLink(httpsUrl);
          return;
        }
      } catch (e) { console.warn('openTelegramLink failed:', e); }

      try {
        // Способ 2: tg:// deep link — нативный обработчик Telegram
        // Обходит WebApp SDK, идёт напрямую в клиент
        window.location.href = tgUrl;
        return;
      } catch (e) { console.warn('tg:// scheme failed:', e); }

      // Способ 3: https fallback через location
      window.location.href = httpsUrl;
    } else {
      // Обычный браузер
      window.open(httpsUrl, '_blank') || (window.location.href = httpsUrl);
    }
  };

  const handleBooking = async () => {
    // ✅ ВАЛИДАЦИЯ ПОЛЕЙ
    if (!formData.name.trim() || !formData.phone.trim() || !formData.date) {
      alert('Пожалуйста, заполните все обязательные поля (Имя, Телефон, Дата)');
      return;
    }

    // ✅ ВАЛИДАЦИЯ ДАТЫ — нельзя выбрать прошедшую дату
    const today = new Date().toISOString().split('T')[0];
    if (formData.date < today) {
      alert('❌ Нельзя выбрать прошедшую дату. Выберите сегодняшнюю или будущую дату.');
      return;
    }

    // ✅ ВАЛИДАЦИЯ ИМЕНИ (минимум 2 символа, только буквы)
    if (formData.name.trim().length < 2) {
      alert('❌ Имя должно содержать минимум 2 символа');
      return;
    }

    // ✅ ВАЛИДАЦИЯ ТЕЛЕФОНА (международный формат)
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
    const cleanPhone = formData.phone.replace(/\s/g, ''); // Убираем пробелы для проверки
    
    if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
      alert('❌ Неправильный формат телефона\n\nПримеры правильных форматов:\n• +7 999 123 4567\n• +66 81 234 5678\n• 8 999 123 4567\n\nМинимум 10 цифр');
      return;
    }

    // ✅ Получаем актуальные Telegram данные прямо перед отправкой
    const telegramData = getTelegramUserData();
    console.log('📤 Отправка заказа с Telegram данными:', telegramData);

    const message = `🏝️ Новая бронь тура!

📋 Тур: ${tourData.title}
💰 Цена: ${priceCalc.totalPrice.toLocaleString()} ${priceCalc.currency}
👥 Гости: ${priceCalc.adults} взрослых, ${priceCalc.children} детей
📅 Дата: ${formData.date}

👤 Контактная информация:
• Имя: ${formData.name}
• Телефон: ${formData.phone}
• Email: ${formData.email || 'не указан'}${telegramData.telegramUsername ? `\n• Telegram: ${telegramData.telegramUsername}` : ''}

⏰ Заявка подана: ${new Date().toLocaleString('ru-RU')}`;

    try {
      // Сохраняем заказ в localStorage для истории
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

      // ✅ ОТПРАВКА В TELEGRAM через безопасный Koyeb API
      const KOYEB_API_URL = 'https://small-robinia-phukeo-8b5e1e16.koyeb.app/api/notify';
      const MANAGER_TELEGRAM_ID = '1217592929';

      try {
        console.log('📤 Отправляем заявку через Koyeb API...');
        
        const response = await fetch(KOYEB_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatId: MANAGER_TELEGRAM_ID,
            message: message
          })
        });

        const result = await response.json();
        
        if (result.success) {
          // ✅ УСПЕШНО ОТПРАВЛЕНО - показываем сообщение и редиректим
          setSuccessMessageText('✅ Заявка принята! Текст заказа скопирован. Открываем чат с менеджером...');
          setShowSuccessMessage(true);
          console.log('✅ Сообщение отправлено в Telegram:', result);
          
          // ✅ РЕДИРЕКТ В TELEGRAM с готовым сообщением (3 секунды)
          setTimeout(() => {
            openTelegramChat(message);
          }, 3000);
          
          return; // Не закрываем модал, т.к. переходим в Telegram
        } else {
          throw new Error(result.error || 'API returned error');
        }
      } catch (error) {
        console.error('❌ Ошибка отправки через Koyeb API:', error);
        
        // Fallback - открываем Telegram как запасной вариант
        setSuccessMessageText('✅ Заявка готова! Текст скопирован. Открываем чат с менеджером...');
        setShowSuccessMessage(true);
        
        setTimeout(() => {
          openTelegramChat(message);
        }, 3000);
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
      console.error('❌ Критическая ошибка:', error);
      alert('❌ Произошла ошибка. Попробуйте ещё раз или свяжитесь с нами напрямую.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ 
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }}>
      {/* ✅ MOBILE ULTRA: max-h-[80vh] → max-h-[75vh] (-5%) */}
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[75vh] overflow-y-auto mx-4" style={{ 
        boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.2), 0 20px 60px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        {/* ✅ MOBILE ULTRA: p-1 остается минимальным */}
        <div className="p-0.5 sm:p-4" style={{ background: 'rgb(242, 242, 247)' }}>
          {/* ✅ MOBILE ULTRA: убираем mb полностью */}
          <div className="flex items-center justify-between">
            {/* ✅ MOBILE ULTRA: text-[13px] для минимального заголовка */}
            <h3 className="text-[13px] sm:text-[19px] font-bold text-gray-900 tracking-tight flex items-center gap-2">
              🏝️ Бронирование
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full h-8 w-8 p-0 transition-all duration-150"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* ✅ MOBILE ULTRA: убрали блок с названием тура - экономия места */}
          
          {/* Калькулятор - ✅ MOBILE ULTRA: убрали mb, space-y-0.5 → минимум */}
          <div className="space-y-0.5">
            <h5 className="font-semibold text-[10px] sm:text-[15px] text-gray-900">Количество гостей:</h5>
            
            {/* ✅ MOBILE ULTRA: p-1 → p-0.5 для минимальных карточек */}
            <div className="flex items-center justify-between p-0.5 sm:p-3 bg-white rounded-xl" style={{ 
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
            }}>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[9px] sm:text-[14px] text-gray-900">Взрослые</div>
                <div className="text-[8px] sm:text-[12px] text-gray-600">{priceCalc.adultPrice.toLocaleString()} {priceCalc.currency}</div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('adults', 'minus')}
                  disabled={formData.adults <= 1}
                  className="h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full transition-all duration-150"
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
                  className="h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full transition-all duration-150"
                  style={{ 
                    borderColor: '#007AFF',
                    color: '#007AFF'
                  }}
                >
                  <Plus className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            {/* ✅ MOBILE ULTRA: p-1 → p-0.5 */}
            <div className="flex items-center justify-between p-0.5 sm:p-3 bg-white rounded-xl" style={{ 
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
            }}>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[9px] sm:text-[14px] text-gray-900">Дети (4-11 лет)</div>
                <div className="text-[8px] sm:text-[12px] text-gray-600">{priceCalc.childPrice.toLocaleString()} {priceCalc.currency}</div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('children', 'minus')}
                  disabled={formData.children <= 0}
                  className="h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full transition-all duration-150"
                  style={{ 
                    borderColor: '#007AFF',
                    color: formData.children <= 0 ? '#C7C7CC' : '#007AFF'
                  }}
                >
                  <Minus className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                </Button>
                <span className="font-bold w-5 sm:w-8 text-center text-[13px] sm:text-[17px]" style={{ color: '#007AFF' }}>{formData.children}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustGuests('children', 'plus')}
                  className="h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full transition-all duration-150"
                  style={{ 
                    borderColor: '#007AFF',
                    color: '#007AFF'
                  }}
                >
                  <Plus className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            {/* ✅ MOBILE ULTRA: убрали "Младенцы" блок - экономия места */}

            {/* ✅ MOBILE ULTRA: p-1 → p-0.5 для минимального итого */}
            <div className="p-0.5 sm:p-3 rounded-xl" style={{ 
              background: 'rgba(0, 122, 255, 0.08)',
              border: '1px solid rgba(0, 122, 255, 0.15)'
            }}>
              <div className="flex justify-between items-center">
                <span className="text-[9px] sm:text-[15px] font-semibold text-gray-900">Итого:</span>
                <span className="text-[12px] sm:text-[20px] font-bold" style={{ color: '#007AFF' }}>
                  {priceCalc.totalPrice.toLocaleString()} {priceCalc.currency}
                </span>
              </div>
            </div>
          </div>

          {/* ✅ MOBILE ULTRA: space-y-0.5 минимальные отступы между полями */}
          <div className="space-y-0.5 sm:space-y-2.5">
            <div>
              <label className="block text-[10px] sm:text-[14px] font-semibold mb-0 sm:mb-1 text-gray-900">Ваше имя *</label>
              {/* ✅ MOBILE ULTRA: py-1 → py-0.5, px-2 → px-1.5 */}
              <input
                type="text"
                className="w-full px-1.5 sm:px-3 py-0.5 sm:py-2.5 border rounded-xl focus:outline-none transition-all duration-150 bg-white text-[11px] sm:text-[15px]"
                style={{ 
                  borderColor: 'rgba(0, 0, 0, 0.15)'
                }}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-[10px] sm:text-[14px] font-semibold mb-0 sm:mb-1 text-gray-900">Телефон *</label>
              <input
                type="tel"
                className="w-full px-1.5 sm:px-3 py-0.5 sm:py-2.5 border rounded-xl focus:outline-none transition-all duration-150 bg-white text-[11px] sm:text-[15px]"
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
              <label className="block text-[10px] sm:text-[14px] font-semibold mb-0 sm:mb-1 text-gray-900">Email</label>
              <input
                type="email"
                className="w-full px-1.5 sm:px-3 py-0.5 sm:py-2.5 border rounded-xl focus:outline-none transition-all duration-150 bg-white text-[11px] sm:text-[15px]"
                style={{ 
                  borderColor: 'rgba(0, 0, 0, 0.15)'
                }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-[10px] sm:text-[14px] font-semibold mb-0 sm:mb-1 text-gray-900">Дата поездки *</label>
              <input
                type="date"
                className="w-full px-1.5 sm:px-3 py-0.5 sm:py-2.5 border rounded-xl focus:outline-none transition-all duration-150 bg-white text-[11px] sm:text-[15px]"
                style={{ 
                  borderColor: 'rgba(0, 0, 0, 0.15)'
                }}
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
          </div>

          {/* ✅ MOBILE ULTRA: button py-1 → py-0.5, text-[11px] */}
          <Button 
            onClick={handleBooking}
            disabled={!formData.name.trim() || !formData.phone.trim() || !formData.date}
            className="btn-booking w-full py-0.5 sm:py-3 text-[11px] sm:text-[15px]"
          >
            <Calendar className="w-2.5 h-2.5 sm:w-4 sm:h-4 mr-0.5 sm:mr-2" />
            {(!formData.name.trim() || !formData.phone.trim() || !formData.date) 
              ? 'Заполните все поля' 
              : '🏝️ ЗАБРОНИРОВАТЬ'
            }
          </Button>
        </div>
      </div>

      {/* ✅ СООБЩЕНИЕ ОБ УСПЕХЕ (как было раньше) */}
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