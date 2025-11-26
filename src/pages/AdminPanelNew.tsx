import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, RefreshCw, Database, HardDrive, Send, Phone, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getBookingsFromLocalStorage } from "@/services/bookingService";

interface BookingOrder {
  id: string | number;
  bookingId?: string;
  tourName: string;
  customerName: string;
  phone: string;
  email: string;
  telegramUsername?: string;
  telegramId?: string;
  date: string;
  adults: number;
  children: number;
  totalPrice: number;
  currency: string;
  hotelName?: string;
  specialRequests?: string;
  source?: string;
  createdAt: string;
  status: 'новый' | 'new' | 'подтвержден' | 'confirmed' | 'отменен' | 'cancelled';
  dataSource: 'supabase' | 'localStorage';
}

export const AdminPanelNew = () => {
  const [orders, setOrders] = useState<BookingOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<BookingOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'all' | 'supabase' | 'localStorage'>('all');
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  // Загрузка заказов из обоих источников
  const loadOrders = async () => {
    setLoading(true);
    const allOrders: BookingOrder[] = [];

    // 1. Загружаем из Supabase
    try {
      const { data: supabaseData, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && supabaseData) {
        setSupabaseConnected(true);
        supabaseData.forEach(booking => {
          // Парсим special_requests для извлечения дополнительных данных
          const specialReqs = booking.special_requests || '';
          const bookingIdMatch = specialReqs.match(/Booking: (PH-[A-Z0-9-]+)/);
          const sourceMatch = specialReqs.match(/Source: (\w+)/);
          const tgMatch = specialReqs.match(/TG: (@\w+)/);
          const tgIdMatch = specialReqs.match(/TG_ID: (\d+)/);
          const hotelMatch = specialReqs.match(/Hotel: ([^|]+)/);

          allOrders.push({
            id: booking.id,
            bookingId: bookingIdMatch ? bookingIdMatch[1] : undefined,
            tourName: booking.tour_id || 'Тур',
            customerName: booking.customer_name,
            phone: booking.customer_phone,
            email: booking.customer_email,
            telegramUsername: tgMatch ? tgMatch[1] : undefined,
            telegramId: tgIdMatch ? tgIdMatch[1] : undefined,
            date: booking.booking_date,
            adults: booking.adults_count,
            children: booking.children_count || 0,
            totalPrice: booking.total_price,
            currency: booking.currency || '฿',
            hotelName: hotelMatch ? hotelMatch[1].trim() : undefined,
            specialRequests: booking.special_requests,
            source: sourceMatch ? sourceMatch[1] : 'website',
            createdAt: booking.created_at ? new Date(booking.created_at).toLocaleString('ru-RU') : '',
            status: (booking.status as any) || 'новый',
            dataSource: 'supabase'
          });
        });
      } else {
        setSupabaseConnected(false);
        console.log('⚠️ Supabase недоступен:', error);
      }
    } catch (err) {
      setSupabaseConnected(false);
      console.error('❌ Ошибка подключения к Supabase:', err);
    }

    // 2. Загружаем из localStorage
    const localOrders = getBookingsFromLocalStorage();
    localOrders.forEach((order: any) => {
      // Проверяем, нет ли дубликата из Supabase
      const isDuplicate = allOrders.some(o => 
        o.bookingId === order.bookingId || 
        (o.phone === order.phone && o.date === order.date)
      );
      
      if (!isDuplicate) {
        allOrders.push({
          ...order,
          dataSource: 'localStorage'
        });
      }
    });

    // Сортируем по дате создания (новые сверху)
    allOrders.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    setOrders(allOrders);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
    
    // Автообновление каждые 30 секунд
    const interval = setInterval(loadOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  // Фильтрация по источнику
  const filteredOrders = orders.filter(order => {
    if (dataSource === 'all') return true;
    return order.dataSource === dataSource;
  });

  // Удаление заказа
  const deleteOrder = async (order: BookingOrder) => {
    if (!confirm('Удалить этот заказ?')) return;

    if (order.dataSource === 'supabase') {
      await supabase.from('bookings').delete().eq('id', String(order.id));
    } else {
      const localOrders = getBookingsFromLocalStorage().filter((o: any) => o.id !== order.id);
      localStorage.setItem('bookingOrders', JSON.stringify(localOrders));
    }
    
    loadOrders();
  };

  // Изменение статуса
  const updateStatus = async (order: BookingOrder, newStatus: string) => {
    if (order.dataSource === 'supabase') {
      await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', String(order.id));
    } else {
      const localOrders = getBookingsFromLocalStorage().map((o: any) => 
        o.id === order.id ? { ...o, status: newStatus } : o
      );
      localStorage.setItem('bookingOrders', JSON.stringify(localOrders));
    }
    
    loadOrders();
  };

  // Открыть Telegram чат с клиентом
  const openTelegramChat = (order: BookingOrder) => {
    if (order.telegramUsername) {
      window.open(`https://t.me/${order.telegramUsername.replace('@', '')}`, '_blank');
    } else if (order.telegramId) {
      // Если есть только ID, можно отправить через бота
      window.open(`https://t.me/Phuketga`, '_blank');
    }
  };

  // Позвонить клиенту
  const callCustomer = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
  };

  // Отправить сообщение в WhatsApp
  const sendWhatsApp = (phone: string, tourName: string) => {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const message = `Здравствуйте! По вашей заявке на тур "${tourName}"...`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'новый':
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'подтвержден':
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'отменен':
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'telegram_webapp': return '📱';
      case 'telegram_bot': return '🤖';
      default: return '🌐';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Заголовок */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🏠 Админ-панель</h1>
            <p className="text-gray-600">Управление заказами туров</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Статус подключения */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              supabaseConnected ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              <Database className="w-4 h-4" />
              {supabaseConnected ? 'Supabase ✓' : 'Только localStorage'}
            </div>
            <Button onClick={loadOrders} variant="outline" disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Обновить
            </Button>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Всего заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">🆕 Новые</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'новый' || o.status === 'new').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">✅ Подтверждены</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {orders.filter(o => o.status === 'подтвержден' || o.status === 'confirmed').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">💰 Общий доход</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {orders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString()} ฿
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">📱 Из Telegram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {orders.filter(o => o.telegramUsername || o.telegramId).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Фильтр по источнику данных */}
        <div className="flex gap-2 mb-6">
          <Button 
            variant={dataSource === 'all' ? 'default' : 'outline'}
            onClick={() => setDataSource('all')}
            size="sm"
          >
            Все ({orders.length})
          </Button>
          <Button 
            variant={dataSource === 'supabase' ? 'default' : 'outline'}
            onClick={() => setDataSource('supabase')}
            size="sm"
          >
            <Database className="w-4 h-4 mr-1" />
            Supabase ({orders.filter(o => o.dataSource === 'supabase').length})
          </Button>
          <Button 
            variant={dataSource === 'localStorage' ? 'default' : 'outline'}
            onClick={() => setDataSource('localStorage')}
            size="sm"
          >
            <HardDrive className="w-4 h-4 mr-1" />
            Local ({orders.filter(o => o.dataSource === 'localStorage').length})
          </Button>
        </div>

        {/* Таблица заказов */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Список заказов
              {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-lg">Пока нет заказов</p>
                <p className="text-sm mt-2">Заказы появятся здесь автоматически после бронирования на сайте</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3 font-semibold">ID</th>
                      <th className="text-left p-3 font-semibold">Клиент</th>
                      <th className="text-left p-3 font-semibold">Тур</th>
                      <th className="text-left p-3 font-semibold">Дата</th>
                      <th className="text-left p-3 font-semibold">Гости</th>
                      <th className="text-left p-3 font-semibold">Сумма</th>
                      <th className="text-left p-3 font-semibold">Статус</th>
                      <th className="text-left p-3 font-semibold">Связь</th>
                      <th className="text-left p-3 font-semibold">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={`${order.dataSource}-${order.id}`} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${order.dataSource === 'supabase' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                            <span className="font-mono text-sm text-blue-600">
                              {order.bookingId || `#${String(order.id).slice(-6)}`}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {getSourceIcon(order.source || 'website')} {order.source || 'website'}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.phone}</div>
                          {order.telegramUsername && (
                            <div className="text-sm text-blue-500">{order.telegramUsername}</div>
                          )}
                        </td>
                        <td className="p-3 max-w-[200px]">
                          <div className="truncate" title={order.tourName}>
                            {order.tourName}
                          </div>
                        </td>
                        <td className="p-3">
                          {new Date(order.date).toLocaleDateString('ru-RU')}
                        </td>
                        <td className="p-3">
                          <span className="whitespace-nowrap">
                            👥 {order.adults}{order.children > 0 ? ` + 👶 ${order.children}` : ''}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-green-600 whitespace-nowrap">
                            {order.totalPrice.toLocaleString()} {order.currency}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(order, e.target.value)}
                            className={`px-2 py-1 rounded-full text-xs font-medium border-none cursor-pointer ${getStatusColor(order.status)}`}
                          >
                            <option value="новый">🆕 новый</option>
                            <option value="подтвержден">✅ подтвержден</option>
                            <option value="отменен">❌ отменен</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => callCustomer(order.phone)}
                              title="Позвонить"
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-green-600"
                              onClick={() => sendWhatsApp(order.phone, order.tourName)}
                              title="WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            {(order.telegramUsername || order.telegramId) && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 text-blue-600"
                                onClick={() => openTelegramChat(order)}
                                title="Telegram"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => setSelectedOrder(order)}
                              title="Подробнее"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 w-8 p-0"
                              onClick={() => deleteOrder(order)}
                              title="Удалить"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Модальное окно детали заказа */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Заказ {selectedOrder.bookingId || `#${String(selectedOrder.id).slice(-6)}`}</h3>
                    <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>✕</Button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">🏝️ Тур</h4>
                    <p>{selectedOrder.tourName}</p>
                    <p className="text-sm text-gray-500 mt-1">📅 {new Date(selectedOrder.date).toLocaleDateString('ru-RU')}</p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">👤 Клиент</h4>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>📞 {selectedOrder.phone}</p>
                      {selectedOrder.email && <p>📧 {selectedOrder.email}</p>}
                      {selectedOrder.telegramUsername && <p>💬 {selectedOrder.telegramUsername}</p>}
                      {selectedOrder.telegramId && <p>🆔 TG ID: {selectedOrder.telegramId}</p>}
                      {selectedOrder.hotelName && <p>🏨 {selectedOrder.hotelName}</p>}
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">💰 Детали заказа</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>Взрослые: {selectedOrder.adults}</p>
                      <p>Дети: {selectedOrder.children}</p>
                    </div>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {selectedOrder.totalPrice.toLocaleString()} {selectedOrder.currency}
                    </p>
                  </div>

                  {selectedOrder.specialRequests && (
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <h4 className="font-semibold mb-2">📝 Пожелания</h4>
                      <p className="text-sm">{selectedOrder.specialRequests}</p>
                    </div>
                  )}

                  <div className="text-xs text-gray-400 text-center pt-4">
                    Создан: {selectedOrder.createdAt} | 
                    Источник: {selectedOrder.source || 'website'} | 
                    Хранилище: {selectedOrder.dataSource}
                  </div>

                  {/* Кнопки связи */}
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1" onClick={() => callCustomer(selectedOrder.phone)}>
                      <Phone className="w-4 h-4 mr-2" /> Позвонить
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => sendWhatsApp(selectedOrder.phone, selectedOrder.tourName)}>
                      <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                    </Button>
                    {(selectedOrder.telegramUsername || selectedOrder.telegramId) && (
                      <Button className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={() => openTelegramChat(selectedOrder)}>
                        <Send className="w-4 h-4 mr-2" /> Telegram
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminPanelNew;
