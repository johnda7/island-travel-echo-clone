// Тестирование Telegram Bot API
export async function testTelegramBot() {
  const BOT_TOKEN = '8445717266:AAHEDA4SJPUL48gpV-Q9qc-V98GSuyPFn08';
  
  console.log('🔧 Тестирование Telegram Bot API...');
  
  try {
    // 1. Проверяем статус бота
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
    const botInfo = await botInfoResponse.json();
    
    if (botInfo.ok) {
      console.log('✅ Бот активен:', botInfo.result.username);
    } else {
      console.error('❌ Ошибка бота:', botInfo.description);
      return false;
    }
    
    // 2. Пробуем отправить тестовое сообщение
    const testMessage = `🧪 ТЕСТ БОТА
    
Это тестовое сообщение для проверки работы бронирования.
Время: ${new Date().toLocaleString('ru-RU')}

Если вы получили это сообщение - интеграция работает! ✅`;

    const sendResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: '@Phuketga',
        text: testMessage
      })
    });
    
    const sendResult = await sendResponse.json();
    
    if (sendResult.ok) {
      console.log('✅ Тестовое сообщение отправлено успешно!');
      return true;
    } else {
      console.error('❌ Ошибка отправки:', sendResult.description);
      
      // Попробуем через прямую ссылку
      const telegramUrl = `https://t.me/Phuketga?text=${encodeURIComponent(testMessage)}`;
      console.log('🔄 Fallback: открытие Telegram чата');
      window.open(telegramUrl, '_blank');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Ошибка сети:', error);
    return false;
  }
}

// Функция для получения chat_id (если понадобится)
export async function getChatId() {
  const BOT_TOKEN = '8445717266:AAHEDA4SJPUL48gpV-Q9qc-V98GSuyPFn08';
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
    const data = await response.json();
    
    if (data.ok && data.result.length > 0) {
      console.log('💬 Последние сообщения:', data.result);
      return data.result;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Ошибка получения сообщений:', error);
    return null;
  }
}

// Отправка реального бронирования
export async function sendBookingToTelegram(bookingData: any) {
  const BOT_TOKEN = '8445717266:AAHEDA4SJPUL48gpV-Q9qc-V98GSuyPFn08';
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: '@Phuketga',
        text: bookingData.message,
        parse_mode: 'HTML'
      })
    });
    
    const result = await response.json();
    
    if (result.ok) {
      return { success: true, data: result };
    } else {
      return { success: false, error: result.description };
    }
    
  } catch (error) {
    return { success: false, error: error.message };
  }
}