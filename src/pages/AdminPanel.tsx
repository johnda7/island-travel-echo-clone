import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";

interface BookingOrder {
  id: number;
  tourName: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  adults: number;
  children: number;
  totalPrice: number;
  currency: string;
  createdAt: string;
  status: 'новый' | 'подтвержден' | 'отменен';
}

export const AdminPanel = () => {
  const [orders, setOrders] = useState<BookingOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<BookingOrder | null>(null);

  // Загружаем заказы из localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('bookingOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Сохраняем заказы в localStorage
  const saveOrders = (newOrders: BookingOrder[]) => {
    setOrders(newOrders);
    localStorage.setItem('bookingOrders', JSON.stringify(newOrders));
  };

  // Добавляем тестовые заказы для демонстрации
  const addTestOrders = () => {
    const testOrders: BookingOrder[] = [
      {
        id: 1,
        tourName: "Пхи-Пхи 2 дня / 1 ночь",
        customerName: "Иван Петров",
        phone: "+7 123 456-78-90",
        email: "ivan@example.com",
        date: "2025-09-25",
        adults: 2,
        children: 1,
        totalPrice: 11500,
        currency: "฿",
        createdAt: new Date().toLocaleString('ru-RU'),
        status: 'новый'
      },
      {
        id: 2,
        tourName: "Пхи-Пхи 2 дня / 1 ночь", 
        customerName: "Мария Сидорова",
        phone: "+7 987 654-32-10",
        email: "maria@example.com",
        date: "2025-09-28",
        adults: 2,
        children: 0,
        totalPrice: 8000,
        currency: "฿",
        createdAt: new Date(Date.now() - 3600000).toLocaleString('ru-RU'),
        status: 'подтвержден'
      },
      {
        id: 3,
        tourName: "Пхи-Пхи 2 дня / 1 ночь",
        customerName: "Алексей Козлов", 
        phone: "+7 555 123-45-67",
        email: "",
        date: "2025-10-02",
        adults: 4,
        children: 2,
        totalPrice: 23000,
        currency: "฿",
        createdAt: new Date(Date.now() - 7200000).toLocaleString('ru-RU'),
        status: 'новый'
      }
    ];
    
    saveOrders(testOrders);
  };

  // Удаление заказа
  const deleteOrder = (id: number) => {
    if (confirm('Удалить этот заказ?')) {
      const newOrders = orders.filter(order => order.id !== id);
      saveOrders(newOrders);
    }
  };

  // Изменение статуса
  const updateStatus = (id: number, newStatus: BookingOrder['status']) => {
    const newOrders = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    saveOrders(newOrders);
  };

  // Очистка всех заказов
  const clearAllOrders = () => {
    if (confirm('Удалить ВСЕ заказы? Это действие нельзя отменить!')) {
      saveOrders([]);
    }
  };

  const getStatusColor = (status: BookingOrder['status']) => {
    switch (status) {
      case 'новый': return 'bg-blue-100 text-blue-800';
      case 'подтвержден': return 'bg-green-100 text-green-800';
      case 'отменен': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🏠 Админ-панель</h1>
          <p className="text-gray-600">Управление заказами туров</p>
        </div>

        {/* Статистика */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Всего заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Новые</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'новый').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Подтверждены</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'подтвержден').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Общий доход</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {orders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString()} ฿
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Действия */}
        <div className="flex gap-4 mb-6">
          <Button onClick={addTestOrders} variant="outline">
            ➕ Добавить тестовые заказы
          </Button>
          <Button onClick={clearAllOrders} variant="destructive">
            🗑️ Очистить все заказы
          </Button>
        </div>

        {/* Таблица заказов */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Список заказов</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Пока нет заказов</p>
                <Button onClick={addTestOrders} className="mt-4">
                  Добавить тестовые данные
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">#</th>
                      <th className="text-left p-2">Клиент</th>
                      <th className="text-left p-2">Тур</th>
                      <th className="text-left p-2">Дата</th>
                      <th className="text-left p-2">Гости</th>
                      <th className="text-left p-2">Сумма</th>
                      <th className="text-left p-2">Статус</th>
                      <th className="text-left p-2">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-bold text-blue-600">#{order.id}</td>
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{order.customerName}</div>
                            <div className="text-sm text-gray-500">{order.phone}</div>
                            {order.email && (
                              <div className="text-sm text-gray-500">{order.email}</div>
                            )}
                          </div>
                        </td>
                        <td className="p-2">{order.tourName}</td>
                        <td className="p-2">{new Date(order.date).toLocaleDateString('ru-RU')}</td>
                        <td className="p-2">
                          👥 {order.adults} + 👶 {order.children}
                        </td>
                        <td className="p-2">
                          <span className="font-bold text-green-600">
                            {order.totalPrice.toLocaleString()} {order.currency}
                          </span>
                        </td>
                        <td className="p-2">
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value as BookingOrder['status'])}
                            className={`px-2 py-1 rounded-full text-xs font-medium border-none ${getStatusColor(order.status)}`}
                          >
                            <option value="новый">новый</option>
                            <option value="подтвержден">подтвержден</option>
                            <option value="отменен">отменен</option>
                          </select>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteOrder(order.id)}
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
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Заказ #{selectedOrder.id}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOrder(null)}
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <strong>Тур:</strong> {selectedOrder.tourName}
                  </div>
                  <div>
                    <strong>Клиент:</strong> {selectedOrder.customerName}
                  </div>
                  <div>
                    <strong>Телефон:</strong> {selectedOrder.phone}
                  </div>
                  {selectedOrder.email && (
                    <div>
                      <strong>Email:</strong> {selectedOrder.email}
                    </div>
                  )}
                  <div>
                    <strong>Дата тура:</strong> {new Date(selectedOrder.date).toLocaleDateString('ru-RU')}
                  </div>
                  <div>
                    <strong>Взрослые:</strong> {selectedOrder.adults}
                  </div>
                  <div>
                    <strong>Дети:</strong> {selectedOrder.children}
                  </div>
                  <div>
                    <strong>Сумма:</strong> {selectedOrder.totalPrice.toLocaleString()} {selectedOrder.currency}
                  </div>
                  <div>
                    <strong>Статус:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <strong>Создан:</strong> {selectedOrder.createdAt}
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

export default AdminPanel;