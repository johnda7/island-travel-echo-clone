import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { phiPhiTourData } from '@/data/phiPhiTour';

export const BookingPage: React.FC = () => {
  const { tourId } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    adults: 1,
    children: 0,
    infants: 0,
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const totalPrice = (formData.adults * phiPhiTourData.priceAdult) + 
                      (formData.children * phiPhiTourData.priceChild);

    const message = `🏝️ НОВЫЙ ЗАКАЗ: ${phiPhiTourData.title}

📅 Дата поездки: ${formData.date}
👥 Взрослых: ${formData.adults} чел. (${phiPhiTourData.priceAdult}฿ × ${formData.adults} = ${formData.adults * phiPhiTourData.priceAdult}฿)
👶 Детей (1-11): ${formData.children} чел. (${phiPhiTourData.priceChild}฿ × ${formData.children} = ${formData.children * phiPhiTourData.priceChild}฿)
🍼 Младенцев (бесплатно): ${formData.infants} чел.

💰 ИТОГО: ${totalPrice}฿

👤 КОНТАКТ КЛИЕНТА:
🏷️ Имя: ${formData.name || 'Не указано'}

⏰ Время заказа: ${new Date().toLocaleString('ru-RU')}`;

    try {
      // Попробуем отправить на канал @Phuketga
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

      if (!response.ok) {
        // Если не получилось отправить на канал, открываем Telegram напрямую
        const telegramUrl = `https://t.me/Phuketga?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
        alert('📱 Заказ готов! Мы открыли Telegram чат - отправьте сообщение для завершения бронирования.');
      } else {
        alert('✅ Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
      }
        
      // Очистить форму
      setFormData({
        date: '',
        adults: 1,
        children: 0,
        infants: 0,
        name: ''
      });
    } catch (error) {
      alert('❌ Ошибка отправки заказа. Попробуйте еще раз или свяжитесь с нами напрямую.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
                <h1 className="text-2xl font-bold">🏝️ Бронирование: {phiPhiTourData.title}</h1>
              </div>
              
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  {/* Дата поездки */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📅 Дата поездки *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Количество человек */}
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {/* Взрослые */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        👥 Взрослые (12+ лет) *
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})}
                          className="px-3"
                        >
                          -
                        </Button>
                        <input
                          type="number"
                          className="flex-1 text-center border-0 focus:ring-0"
                          value={formData.adults}
                          readOnly
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({...formData, adults: formData.adults + 1})}
                          className="px-3"
                        >
                          +
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{phiPhiTourData.priceAdult}฿ за человека</p>
                    </div>

                    {/* Дети */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        👶 Дети (1-11 лет)
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})}
                          className="px-3"
                        >
                          -
                        </Button>
                        <input
                          type="number"
                          className="flex-1 text-center border-0 focus:ring-0"
                          value={formData.children}
                          readOnly
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({...formData, children: formData.children + 1})}
                          className="px-3"
                        >
                          +
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{phiPhiTourData.priceChild}฿ за ребенка</p>
                    </div>

                    {/* Младенцы */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        🍼 Младенцы (0-12 мес)
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({...formData, infants: Math.max(0, formData.infants - 1)})}
                          className="px-3"
                        >
                          -
                        </Button>
                        <input
                          type="number"
                          className="flex-1 text-center border-0 focus:ring-0"
                          value={formData.infants}
                          readOnly
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({...formData, infants: formData.infants + 1})}
                          className="px-3"
                        >
                          +
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Бесплатно</p>
                    </div>
                  </div>

                  {/* Итоговая стоимость */}
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <h3 className="text-lg font-semibold text-blue-800">
                      💰 Итоговая стоимость: {(formData.adults * phiPhiTourData.priceAdult) + (formData.children * phiPhiTourData.priceChild)} ฿
                    </h3>
                  </div>

                  {/* Имя (необязательно) */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      👤 Имя (необязательно)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ваше имя"
                    />
                  </div>

                  {/* Кнопка бронирования */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Отправка заказа...' : '🏝️ ЗАБРОНИРОВАТЬ'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};