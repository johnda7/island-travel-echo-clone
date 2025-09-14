import React, { useState, useEffect } from 'react';
import { Calendar, Users, Phone, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface Order {
  id: number;
  tour: string;
  name: string;
  phone: string;
  date: string;
  adults: number;
  children: number;
  totalPrice: number;
  timestamp: string;
  status: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'confirmed'>('all');

  useEffect(() => {
    // Загружаем заказы из localStorage
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem('phiPhiOrders') || '[]';
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders.reverse()); // Новые сверху
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
      }
    };

    loadOrders();
    
    // Обновляем каждые 10 секунд
    const interval = setInterval(loadOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    try {
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      
      localStorage.setItem('phiPhiOrders', JSON.stringify(updatedOrders.reverse()));
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Ошибка обновления заказа:', error);
    }
  };

  const clearAllOrders = () => {
    if (confirm('Удалить ВСЕ заказы? Это действие необратимо!')) {
      localStorage.removeItem('phiPhiOrders');
      setOrders([]);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU');
  };

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* Заголовок */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Админ панель заказов
                </h1>
                <p className="text-gray-600">
                  Всего заказов: {orders.length} | Новых: {orders.filter(o => o.status === 'new').length}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Фильтр */}
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">Все заказы</option>
                  <option value="new">Новые</option>
                  <option value="confirmed">Подтвержденные</option>
                </select>
                
                {/* Очистить все */}
                <button
                  onClick={clearAllOrders}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Очистить все
                </button>
              </div>
            </div>
          </div>

          {/* Список заказов */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg border p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Заказов нет</h3>
              <p className="text-gray-600">
                {filter === 'all' ? 'Пока что никто не оставил заказов' : `Нет заказов со статусом "${filter}"`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
                  
                  {/* Статус и время */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'new' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'confirmed'
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status === 'new' ? '🆕 Новый' : order.status === 'confirmed' ? '✅ Подтвержден' : order.status}
                      </span>
                      
                      <span className="text-sm text-gray-500">
                        Заказ №{order.id}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTimestamp(order.timestamp)}
                    </div>
                  </div>

                  {/* Основная информация */}
                  <div className="grid md:grid-cols-3 gap-6">
                    
                    {/* Тур и дата */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">{order.tour}</h3>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{order.date ? formatDate(order.date) : 'Дата не указана'}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          <span>
                            {order.adults} взр.
                            {order.children > 0 && `, ${order.children} дет.`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Контакты */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Контакты</h4>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Имя: </span>
                          <span className="font-medium">
                            {order.name || 'Не указано'}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium">
                            {order.phone || 'Не указан'}
                          </span>
                          
                          {order.phone && (
                            <a 
                              href={`tel:${order.phone}`}
                              className="ml-2 text-green-600 hover:text-green-700 text-xs"
                            >
                              Позвонить
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Цена и действия */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Стоимость</h4>
                      
                      <div className="text-2xl font-bold text-green-600 mb-4">
                        {order.totalPrice.toLocaleString('ru')} ₽
                      </div>
                      
                      <div className="space-y-2">
                        {order.status === 'new' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Подтвердить
                          </button>
                        )}
                        
                        {/* Telegram ссылка */}
                        <a
                          href={`https://t.me/phuketGoo?text=Здравствуйте! По заказу №${order.id} (${order.tour})`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm text-center block"
                        >
                          📱 Написать в Telegram
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
}