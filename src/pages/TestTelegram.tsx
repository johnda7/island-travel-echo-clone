import React from 'react';
import { testTelegramBot, getChatId } from '../utils/telegramTest';

export const TestTelegram: React.FC = () => {
  const handleTest = async () => {
    console.log('🚀 Запуск теста Telegram...');
    const result = await testTelegramBot();
    
    if (result) {
      alert('✅ Telegram интеграция работает! Проверьте @Phuketga');
    } else {
      alert('❌ Проблема с Telegram API. Проверьте консоль для деталей.');
    }
  };

  const handleGetChatId = async () => {
    const updates = await getChatId();
    console.log('Chat updates:', updates);
    alert('💬 Данные чата выведены в консоль (F12)');
  };

  const handleTestBooking = async () => {
    const testBooking = {
      message: `🧪 ТЕСТ БРОНИРОВАНИЯ

📋 ТУР: Пхи-Пхи 2 дня/1 ночь
📅 Дата: ${new Date().toLocaleDateString('ru-RU')}
👥 Гости: 2 взрослых
💰 ИТОГО: 8000฿

👤 КОНТАКТЫ:
• Имя: Тест Пользователь
• Телефон: +66 XXX XXX XXX

⏰ Время теста: ${new Date().toLocaleString('ru-RU')}
🆔 ID: TEST${Date.now()}`
    };

    try {
      const response = await fetch(`https://api.telegram.org/bot8445717266:AAHEDA4SJPUL48gpV-Q9qc-V98GSuyPFn08/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '@Phuketga',
          text: testBooking.message
        })
      });

      const result = await response.json();
      
      if (result.ok) {
        alert('✅ Тестовое бронирование отправлено!');
      } else {
        alert(`❌ Ошибка: ${result.description}`);
      }
    } catch (error) {
      alert(`❌ Ошибка сети: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold mb-4">🧪 Тест Telegram Bot</h1>
        
        <div className="space-y-4">
          <button
            onClick={handleTest}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg"
          >
            🔧 Тестировать отправку сообщения
          </button>
          
          <button
            onClick={handleTestBooking}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg"
          >
            🏝️ Тестовое бронирование
          </button>
          
          <button
            onClick={handleGetChatId}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg"
          >
            📱 Получить Chat ID
          </button>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <p><strong>Бот:</strong> PhuketBookBot</p>
            <p><strong>Канал:</strong> @Phuketga</p>
            <p><strong>Токен:</strong> 8445717266:AAH...</p>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>📋 Откройте консоль (F12) для подробных логов</p>
          </div>
        </div>
      </div>
    </div>
  );
};