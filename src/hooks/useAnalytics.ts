// 📊 Analytics Hook для Telegram Mini App
// Отслеживание действий пользователей

import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Типы событий
export type AnalyticsEvent = 
  | 'page_view'
  | 'tour_view'
  | 'gallery_open'
  | 'gallery_swipe'
  | 'booking_start'
  | 'booking_complete'
  | 'share_click'
  | 'contact_click'
  | 'search'
  | 'filter_apply'
  | 'favorite_add'
  | 'favorite_remove';

interface EventData {
  tourId?: string;
  tourName?: string;
  price?: number;
  category?: string;
  source?: string;
  query?: string;
  imageIndex?: number;
  [key: string]: any;
}

interface AnalyticsPayload {
  event: AnalyticsEvent;
  data: EventData;
  timestamp: number;
  userId?: number;
  platform?: string;
  version?: string;
  sessionId: string;
  pageUrl: string;
}

// Генерация session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Получение Telegram данных
const getTelegramData = () => {
  const tg = (window as any).Telegram?.WebApp;
  if (tg) {
    return {
      userId: tg.initDataUnsafe?.user?.id,
      platform: tg.platform,
      version: tg.version,
    };
  }
  return {};
};

// Буфер для батчинга событий
let eventBuffer: AnalyticsPayload[] = [];
let flushTimeout: ReturnType<typeof setTimeout> | null = null;

// Отправка событий на сервер (batch)
const flushEvents = async () => {
  if (eventBuffer.length === 0) return;
  
  const eventsToSend = [...eventBuffer];
  eventBuffer = [];
  
  // Логируем в консоль (для дебага)
  console.log('📊 Analytics batch:', eventsToSend);
  
  // TODO: Отправка на сервер когда будет API
  // try {
  //   await fetch('/api/analytics', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ events: eventsToSend })
  //   });
  // } catch (error) {
  //   console.error('Analytics send error:', error);
  //   // Возвращаем события в буфер при ошибке
  //   eventBuffer = [...eventsToSend, ...eventBuffer];
  // }
  
  // Сохраняем в localStorage для локальной аналитики
  try {
    const stored = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const combined = [...stored, ...eventsToSend].slice(-100); // Последние 100 событий
    localStorage.setItem('analytics_events', JSON.stringify(combined));
  } catch (e) {}
};

export function useAnalytics() {
  const location = useLocation();
  const lastPageRef = useRef<string>('');
  
  // Track page views автоматически
  useEffect(() => {
    if (location.pathname !== lastPageRef.current) {
      lastPageRef.current = location.pathname;
      
      // Определяем тип страницы
      const isTourPage = location.pathname.includes('/tours/') || location.pathname.includes('/excursion/');
      const tourId = isTourPage ? location.pathname.split('/').pop() : undefined;
      
      trackEvent('page_view', {
        tourId,
        source: document.referrer || 'direct',
      });
    }
  }, [location.pathname]);
  
  // Основная функция трекинга
  const trackEvent = useCallback((event: AnalyticsEvent, data: EventData = {}) => {
    const payload: AnalyticsPayload = {
      event,
      data,
      timestamp: Date.now(),
      ...getTelegramData(),
      sessionId: getSessionId(),
      pageUrl: window.location.href,
    };
    
    // Добавляем в буфер
    eventBuffer.push(payload);
    
    // Debounce flush (отправляем через 2 секунды или при 10 событиях)
    if (eventBuffer.length >= 10) {
      flushEvents();
    } else {
      if (flushTimeout) clearTimeout(flushTimeout);
      flushTimeout = setTimeout(flushEvents, 2000);
    }
    
    // Haptic feedback для важных событий
    try {
      const tg = (window as any).Telegram?.WebApp;
      if (tg?.HapticFeedback) {
        if (event === 'booking_complete') {
          tg.HapticFeedback.notificationOccurred('success');
        }
      }
    } catch (e) {}
    
  }, []);
  
  // Специализированные функции для удобства
  const trackTourView = useCallback((tourId: string, tourName: string, price: number) => {
    trackEvent('tour_view', { tourId, tourName, price });
  }, [trackEvent]);
  
  const trackBookingStart = useCallback((tourId: string, tourName: string, price: number) => {
    trackEvent('booking_start', { tourId, tourName, price });
  }, [trackEvent]);
  
  const trackBookingComplete = useCallback((tourId: string, tourName: string, price: number, guests: number) => {
    trackEvent('booking_complete', { tourId, tourName, price, guests, totalPrice: price * guests });
  }, [trackEvent]);
  
  const trackShare = useCallback((tourId: string, method: 'telegram' | 'web' | 'clipboard') => {
    trackEvent('share_click', { tourId, method });
  }, [trackEvent]);
  
  const trackSearch = useCallback((query: string, resultsCount: number) => {
    trackEvent('search', { query, resultsCount });
  }, [trackEvent]);
  
  const trackGallery = useCallback((tourId: string, imageIndex: number, action: 'open' | 'swipe') => {
    trackEvent(action === 'open' ? 'gallery_open' : 'gallery_swipe', { tourId, imageIndex });
  }, [trackEvent]);
  
  // Получение локальной статистики
  const getLocalStats = useCallback(() => {
    try {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      const tourViews: Record<string, number> = {};
      let totalViews = 0;
      let bookings = 0;
      let shares = 0;
      
      events.forEach((e: AnalyticsPayload) => {
        if (e.event === 'tour_view' && e.data.tourId) {
          tourViews[e.data.tourId] = (tourViews[e.data.tourId] || 0) + 1;
          totalViews++;
        }
        if (e.event === 'booking_complete') bookings++;
        if (e.event === 'share_click') shares++;
      });
      
      // Топ туров
      const topTours = Object.entries(tourViews)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      return {
        totalViews,
        bookings,
        shares,
        topTours,
        conversionRate: totalViews > 0 ? (bookings / totalViews * 100).toFixed(1) : 0,
      };
    } catch (e) {
      return null;
    }
  }, []);
  
  return {
    trackEvent,
    trackTourView,
    trackBookingStart,
    trackBookingComplete,
    trackShare,
    trackSearch,
    trackGallery,
    getLocalStats,
  };
}

// Экспорт для использования без хука (в боте и т.д.)
export const analytics = {
  track: (event: AnalyticsEvent, data: EventData = {}) => {
    const payload: AnalyticsPayload = {
      event,
      data,
      timestamp: Date.now(),
      ...getTelegramData(),
      sessionId: getSessionId(),
      pageUrl: window.location.href,
    };
    eventBuffer.push(payload);
    if (eventBuffer.length >= 10) flushEvents();
  },
};

