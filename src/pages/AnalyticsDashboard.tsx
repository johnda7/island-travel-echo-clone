// 📊 Analytics Dashboard - Панель аналитики
// Доступ: /analytics

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Eye, 
  ShoppingCart, 
  Share2, 
  TrendingUp,
  Users,
  Calendar,
  ArrowLeft,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface AnalyticsEvent {
  event: string;
  data: {
    tourId?: string;
    tourName?: string;
    price?: number;
    method?: string;
    query?: string;
    [key: string]: any;
  };
  timestamp: number;
  sessionId: string;
  pageUrl: string;
}

interface Stats {
  totalViews: number;
  bookings: number;
  shares: number;
  topTours: [string, number][];
  conversionRate: string | number;
  uniqueSessions: number;
  todayViews: number;
  searchQueries: string[];
}

// Названия туров для отображения
const tourNames: Record<string, string> = {
  'phi-phi-2days': 'Пхи-Пхи 2 дня',
  'pearls-andaman-sea': '4 Жемчужины',
  'eleven-islands-mega': '11 Островов',
  'james-bond-island-phang-nga': 'Джеймс Бонд',
  'similan-islands': 'Симиланы',
  'rafting-spa-atv-1-day': 'Рафтинг + ATV',
  'racha-coral-islands-speedboat': 'Рача + Корал',
  'cheow-lan-lake': 'Чео Лан',
  'krabi-secrets': 'Тайны Краби',
  'phi-phi-sunrise': 'Пхи-Пхи Рассвет',
};

export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');

  // Загрузка данных
  const loadData = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      setEvents(stored);
      calculateStats(stored);
    } catch (e) {
      setEvents([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Подсчёт статистики
  const calculateStats = (allEvents: AnalyticsEvent[]) => {
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

    // Фильтр по времени
    let filteredEvents = allEvents;
    if (filter === 'today') {
      filteredEvents = allEvents.filter(e => e.timestamp > dayAgo);
    } else if (filter === 'week') {
      filteredEvents = allEvents.filter(e => e.timestamp > weekAgo);
    }

    const tourViews: Record<string, number> = {};
    const sessions = new Set<string>();
    const searches: string[] = [];
    let totalViews = 0;
    let bookings = 0;
    let shares = 0;
    let todayViews = 0;

    filteredEvents.forEach((e) => {
      sessions.add(e.sessionId);
      
      if (e.event === 'tour_view' && e.data.tourId) {
        tourViews[e.data.tourId] = (tourViews[e.data.tourId] || 0) + 1;
        totalViews++;
        if (e.timestamp > dayAgo) todayViews++;
      }
      if (e.event === 'page_view') totalViews++;
      if (e.event === 'booking_complete' || e.event === 'booking_start') bookings++;
      if (e.event === 'share_click') shares++;
      if (e.event === 'search' && e.data.query) {
        if (!searches.includes(e.data.query)) {
          searches.push(e.data.query);
        }
      }
    });

    const topTours = Object.entries(tourViews)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10) as [string, number][];

    setStats({
      totalViews,
      bookings,
      shares,
      topTours,
      conversionRate: totalViews > 0 ? (bookings / totalViews * 100).toFixed(1) : 0,
      uniqueSessions: sessions.size,
      todayViews,
      searchQueries: searches.slice(0, 10),
    });
  };

  // Очистка данных
  const clearData = () => {
    if (confirm('Очистить все данные аналитики?')) {
      localStorage.removeItem('analytics_events');
      loadData();
    }
  };

  // Обновить при смене фильтра
  useEffect(() => {
    calculateStats(events);
  }, [filter, events]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
        {/* Шапка */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Аналитика
              </h1>
              <p className="text-sm text-gray-500">
                Статистика использования приложения
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={loadData}
              className="gap-1"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearData}
              className="gap-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Фильтры времени */}
        <div className="flex gap-2 mb-6">
          {(['all', 'today', 'week'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Всё время' : f === 'today' ? 'Сегодня' : 'Неделя'}
            </Button>
          ))}
        </div>

        {stats ? (
          <>
            {/* Основные метрики */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.totalViews}
                      </div>
                      <div className="text-xs text-gray-500">Просмотров</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <ShoppingCart className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.bookings}
                      </div>
                      <div className="text-xs text-gray-500">Бронирований</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-xl">
                      <Share2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.shares}
                      </div>
                      <div className="text-xs text-gray-500">Поделились</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.conversionRate}%
                      </div>
                      <div className="text-xs text-gray-500">Конверсия</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Доп метрики */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-100 rounded-xl">
                      <Users className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">
                        {stats.uniqueSessions}
                      </div>
                      <div className="text-xs text-gray-500">Уникальных сессий</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 rounded-xl">
                      <Calendar className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">
                        {stats.todayViews}
                      </div>
                      <div className="text-xs text-gray-500">Просмотров сегодня</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Топ туров */}
            <Card className="bg-white/80 backdrop-blur mb-6">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  🏆 Топ туров по просмотрам
                </h2>
                
                {stats.topTours.length > 0 ? (
                  <div className="space-y-3">
                    {stats.topTours.map(([tourId, count], index) => (
                      <div 
                        key={tourId}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => navigate(`/tours/${tourId}`)}
                      >
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                          ${index === 0 ? 'bg-yellow-400 text-yellow-900' : 
                            index === 1 ? 'bg-gray-300 text-gray-700' : 
                            index === 2 ? 'bg-amber-600 text-white' : 
                            'bg-gray-200 text-gray-600'}
                        `}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {tourNames[tourId] || tourId}
                          </div>
                          <div className="text-xs text-gray-500">
                            {tourId}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          {count}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Нет данных о просмотрах туров
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Последние поисковые запросы */}
            {stats.searchQueries.length > 0 && (
              <Card className="bg-white/80 backdrop-blur mb-6">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    🔍 Поисковые запросы
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {stats.searchQueries.map((query, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {query}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Последние события (лог) */}
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  📋 Последние события
                </h2>
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {events.slice(-20).reverse().map((event, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-3 p-2 text-sm border-b border-gray-100 last:border-0"
                    >
                      <div className={`
                        w-2 h-2 rounded-full
                        ${event.event === 'tour_view' ? 'bg-blue-500' :
                          event.event === 'booking_start' ? 'bg-green-500' :
                          event.event === 'share_click' ? 'bg-purple-500' :
                          'bg-gray-400'}
                      `} />
                      <div className="flex-1">
                        <span className="font-medium">{event.event}</span>
                        {event.data.tourId && (
                          <span className="text-gray-500 ml-2">
                            → {tourNames[event.data.tourId] || event.data.tourId}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(event.timestamp).toLocaleTimeString('ru-RU')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center py-16">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Нет данных аналитики</p>
            <p className="text-sm text-gray-400 mt-2">
              Данные появятся после просмотра туров
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

