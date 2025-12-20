// 🎯 СЕРВИС БРОНИРОВАНИЯ - ЕДИНАЯ ТОЧКА ОБРАБОТКИ ЗАЯВОК
// Все заявки проходят через этот сервис:
// 1. Сохранение в Supabase (надёжное хранилище)
// 2. Отправка менеджеру в Telegram
// 3. Создание диалога с клиентом через бота

import { supabase } from '@/integrations/supabase/client';

export interface BookingData {
  tourId: string;
  tourName: string;
  customerName: string;
  phone: string;
  email?: string;
  telegramUsername?: string;
  telegramId?: string;
  date: string;
  adults: number;
  children: number;
  totalPrice: number;
  currency: string;
  specialRequests?: string;
  hotelName?: string;
  source: 'website' | 'telegram_bot' | 'telegram_webapp';
}

export interface BookingResult {
  success: boolean;
  bookingId: string;
  telegramSent: boolean;
  supabaseSaved: boolean;
  error?: string;
}

// ID менеджера для уведомлений
const MANAGER_TELEGRAM_ID = '1217592929';

// Koyeb webhook для отправки уведомлений (токен хранится на сервере)
const KOYEB_WEBHOOK_URL = 'https://small-robinia-phukeo-8b5e1e16.koyeb.app/api/notify';

// Генерация уникального ID заказа
function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PH-${timestamp}-${random}`;
}

// Форматирование сообщения для Telegram
function formatTelegramMessage(booking: BookingData, bookingId: string): string {
  const lines = [
    `🏝️ НОВАЯ ЗАЯВКА #${bookingId}`,
    ``,
    `📋 Тур: ${booking.tourName}`,
    `💰 Сумма: ${booking.totalPrice.toLocaleString()} ${booking.currency}`,
    `👥 Гости: ${booking.adults} взр.${booking.children > 0 ? ` + ${booking.children} дет.` : ''}`,
    `📅 Дата: ${booking.date}`,
    ``,
    `👤 Клиент:`,
    `• Имя: ${booking.customerName}`,
    `• Тел: ${booking.phone}`,
  ];
  
  if (booking.email) {
    lines.push(`• Email: ${booking.email}`);
  }
  
  if (booking.telegramUsername) {
    lines.push(`• Telegram: ${booking.telegramUsername}`);
  }
  
  if (booking.telegramId) {
    lines.push(`• TG ID: ${booking.telegramId} (можно написать первым!)`);
  }
  
  if (booking.hotelName) {
    lines.push(`• Отель: ${booking.hotelName}`);
  }
  
  if (booking.specialRequests) {
    lines.push(`• Пожелания: ${booking.specialRequests}`);
  }
  
  lines.push(``);
  lines.push(`📍 Источник: ${booking.source === 'telegram_webapp' ? 'Telegram Mini App' : booking.source === 'telegram_bot' ? 'Telegram Bot' : 'Сайт'}`);
  lines.push(`⏰ ${new Date().toLocaleString('ru-RU')}`);
  
  return lines.join('\n');
}

// Отправка сообщения в Telegram через Koyeb сервер (токен безопасно на сервере)
async function sendTelegramMessage(chatId: string, text: string, keyboard?: any): Promise<boolean> {
  try {
    const response = await fetch(KOYEB_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        reply_markup: keyboard
      })
    });
    
    const result = await response.json();
    
    if (!result.ok && !result.success) {
      console.error('❌ Koyeb notify error:', result);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Telegram send error:', error);
    return false;
  }
}

// Сохранение заказа в Supabase
async function saveToSupabase(booking: BookingData, bookingId: string): Promise<boolean> {
  try {
    // Используем структуру таблицы из Supabase types
    const { error } = await supabase
      .from('bookings')
      .insert({
        tour_id: booking.tourId,
        customer_name: booking.customerName,
        customer_phone: booking.phone,
        customer_email: booking.email || 'not_provided@temp.com', // Required field
        booking_date: booking.date,
        adults_count: booking.adults,
        children_count: booking.children,
        total_price: booking.totalPrice,
        currency: booking.currency,
        special_requests: booking.specialRequests ? 
          `${booking.specialRequests}${booking.telegramUsername ? ` | TG: ${booking.telegramUsername}` : ''}${booking.telegramId ? ` | TG_ID: ${booking.telegramId}` : ''}${booking.hotelName ? ` | Hotel: ${booking.hotelName}` : ''} | Booking: ${bookingId} | Source: ${booking.source}` 
          : `Booking: ${bookingId} | Source: ${booking.source}${booking.telegramUsername ? ` | TG: ${booking.telegramUsername}` : ''}${booking.telegramId ? ` | TG_ID: ${booking.telegramId}` : ''}${booking.hotelName ? ` | Hotel: ${booking.hotelName}` : ''}`,
        status: 'new',
        telegram_message_sent: false
      });
    
    if (error) {
      console.error('❌ Supabase error:', error);
      // Если таблица не существует, логируем но не падаем
      if (error.code === '42P01') {
        console.warn('⚠️ Таблица bookings не существует в Supabase. Заказ сохранён только в localStorage.');
        return false;
      }
      return false;
    }
    
    console.log('✅ Заказ сохранён в Supabase:', bookingId);
    return true;
  } catch (error) {
    console.error('❌ Supabase save error:', error);
    return false;
  }
}

// Сохранение в localStorage (резервное)
function saveToLocalStorage(booking: BookingData, bookingId: string): void {
  try {
    const order = {
      id: Date.now(),
      bookingId,
      tourName: booking.tourName,
      customerName: booking.customerName,
      phone: booking.phone,
      email: booking.email,
      telegramUsername: booking.telegramUsername,
      telegramId: booking.telegramId,
      date: booking.date,
      adults: booking.adults,
      children: booking.children,
      totalPrice: booking.totalPrice,
      currency: booking.currency,
      hotelName: booking.hotelName,
      specialRequests: booking.specialRequests,
      source: booking.source,
      createdAt: new Date().toLocaleString('ru-RU'),
      status: 'новый' as const
    };

    const existingOrders = JSON.parse(localStorage.getItem('bookingOrders') || '[]');
    existingOrders.unshift(order); // Новые сверху
    localStorage.setItem('bookingOrders', JSON.stringify(existingOrders));
    
    console.log('✅ Заказ сохранён в localStorage:', bookingId);
  } catch (error) {
    console.error('❌ localStorage save error:', error);
  }
}

// 🎯 ГЛАВНАЯ ФУНКЦИЯ - СОЗДАНИЕ ЗАКАЗА
export async function createBooking(data: BookingData): Promise<BookingResult> {
  const bookingId = generateBookingId();
  
  console.log('🚀 Создание заказа:', bookingId);
  
  // 1. Формируем сообщение для менеджера
  const managerMessage = formatTelegramMessage(data, bookingId);
  
  // 2. Отправляем менеджеру в Telegram
  const telegramSent = await sendTelegramMessage(MANAGER_TELEGRAM_ID, managerMessage);
  
  // 3. Сохраняем в Supabase
  const supabaseSaved = await saveToSupabase(data, bookingId);
  
  // 4. Резервное сохранение в localStorage
  saveToLocalStorage(data, bookingId);
  
  // 5. Если есть Telegram ID клиента - отправляем подтверждение ему
  if (data.telegramId) {
    const clientMessage = `✅ Заявка #${bookingId} принята!\n\n` +
      `🏝️ Тур: ${data.tourName}\n` +
      `📅 Дата: ${data.date}\n` +
      `💰 Сумма: ${data.totalPrice.toLocaleString()} ${data.currency}\n\n` +
      `Менеджер свяжется с вами в ближайшее время прямо здесь, в этом чате! 💬`;
    
    await sendTelegramMessage(data.telegramId, clientMessage);
  }
  
  return {
    success: telegramSent || supabaseSaved,
    bookingId,
    telegramSent,
    supabaseSaved,
    error: (!telegramSent && !supabaseSaved) ? 'Не удалось отправить заявку' : undefined
  };
}

// Получение всех заказов из Supabase
export async function getBookingsFromSupabase(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ Supabase fetch error:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('❌ Supabase fetch error:', error);
    return [];
  }
}

// Получение заказов из localStorage
export function getBookingsFromLocalStorage(): any[] {
  try {
    return JSON.parse(localStorage.getItem('bookingOrders') || '[]');
  } catch {
    return [];
  }
}

// Обновление статуса заказа
export async function updateBookingStatus(bookingId: string, newStatus: string): Promise<boolean> {
  try {
    // Ищем заказ по special_requests где содержится bookingId
    const { data: bookings } = await supabase
      .from('bookings')
      .select('id, special_requests')
      .like('special_requests', `%${bookingId}%`);
    
    if (!bookings || bookings.length === 0) {
      console.error('❌ Booking not found:', bookingId);
      return false;
    }
    
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookings[0].id);
    
    if (error) {
      console.error('❌ Status update error:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Status update error:', error);
    return false;
  }
}
