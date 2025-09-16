// Telegram Bot API configuration
const TELEGRAM_BOT_TOKEN = '8445717266:AAHEDA4SJPUL48gpV-Q9qc-V98GSuyPFn08';
const TELEGRAM_CHAT_ID = '@Phuketga'; // Используем @username для публичного канала

// Функция для отправки уведомления в Telegram
export interface BookingData {
  tourTitle: string;
  adults: number;
  children: number;
  selectedDate: string;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    comment: string;
  };
  totalPrice: number;
  currency: string;
}

export const sendTelegramNotification = async (bookingData: BookingData): Promise<boolean> => {
  try {
    const message = formatBookingMessage(bookingData);
    
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return false;
    }

    console.log('Notification sent to Telegram successfully');
    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
};

const formatBookingMessage = (data: BookingData): string => {
  const { tourTitle, adults, children, selectedDate, contactInfo, totalPrice, currency } = data;
  
  return `
🆕 <b>НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ</b>

🏝️ <b>Тур:</b> ${tourTitle}
📅 <b>Дата:</b> ${selectedDate || 'Не указана'}

👥 <b>Участники:</b>
• Взрослые: ${adults} чел.
• Дети: ${children} чел.
• <b>Всего:</b> ${adults + children} чел.

💰 <b>Стоимость:</b> ${totalPrice.toLocaleString()} ${currency}

👤 <b>Контактная информация:</b>
• <b>Имя:</b> ${contactInfo.name || 'Не указано'}
• <b>Телефон:</b> ${contactInfo.phone || 'Не указан'}
• <b>Email:</b> ${contactInfo.email || 'Не указан'}

${contactInfo.comment ? `💬 <b>Комментарий:</b>\n${contactInfo.comment}` : ''}

⏰ <b>Время заявки:</b> ${new Date().toLocaleString('ru-RU', { 
  timeZone: 'Asia/Bangkok',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})} (Bangkok)
`.trim();
};

// Альтернативный способ через WhatsApp (как запасной вариант)
export const sendWhatsAppMessage = (bookingData: BookingData): void => {
  const { tourTitle, adults, children, selectedDate, contactInfo, totalPrice, currency } = bookingData;
  
  const message = `🏝️ НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ

🎯 ТУР: ${tourTitle}
📅 ДАТА: ${selectedDate || 'Не указана'}
👥 УЧАСТНИКИ: ${adults} взр. + ${children} дет.
💰 ИТОГО: ${totalPrice.toLocaleString()} ${currency}

👤 КОНТАКТЫ:
Имя: ${contactInfo.name}
Телефон: ${contactInfo.phone}
Email: ${contactInfo.email}
${contactInfo.comment ? `Комментарий: ${contactInfo.comment}` : ''}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/66934740231?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};