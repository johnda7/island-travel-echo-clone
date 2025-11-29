// 📱 Telegram WebApp API Hook
// Haptic feedback, Back Button, Main Button, User Data

import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  
  // Haptic Feedback
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  
  // Back Button
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  
  // Main Button
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    setParams: (params: { text?: string; color?: string; text_color?: string; is_active?: boolean; is_visible?: boolean }) => void;
  };
  
  // Secondary Button (опционально - новая функция Telegram)
  SecondaryButton?: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    setParams: (params: { text?: string; color?: string; text_color?: string; is_active?: boolean; is_visible?: boolean }) => void;
  };
  
  // Methods
  ready: () => void;
  expand: () => void;
  close: () => void;
  openTelegramLink: (url: string) => void;
  openLink: (url: string) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export function useTelegramWebApp() {
  const [isTelegram, setIsTelegram] = useState(false);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;
  
  useEffect(() => {
    if (tg && tg.initData) {
      setIsTelegram(true);
      setUser(tg.initDataUnsafe?.user || null);
      
      // Сообщаем Telegram что приложение готово
      tg.ready();
      
      // Разворачиваем на весь экран
      tg.expand();
    }
  }, [tg]);
  
  // === HAPTIC FEEDBACK ===
  const hapticImpact = useCallback((style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred(style);
    }
  }, [tg]);
  
  const hapticNotification = useCallback((type: 'error' | 'success' | 'warning') => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.notificationOccurred(type);
    }
  }, [tg]);
  
  const hapticSelection = useCallback(() => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.selectionChanged();
    }
  }, [tg]);
  
  // === BACK BUTTON ===
  useEffect(() => {
    if (!tg || !isTelegram) return;
    
    const isHomePage = location.pathname === '/';
    
    if (isHomePage) {
      tg.BackButton.hide();
    } else {
      tg.BackButton.show();
    }
    
    const handleBack = () => {
      hapticImpact('light');
      navigate(-1);
    };
    
    tg.BackButton.onClick(handleBack);
    
    return () => {
      tg.BackButton.offClick(handleBack);
    };
  }, [tg, isTelegram, location.pathname, navigate, hapticImpact]);
  
  // === MAIN BUTTON ===
  const showMainButton = useCallback((text: string, onClick: () => void) => {
    if (!tg) return;
    
    tg.MainButton.setText(text);
    tg.MainButton.setParams({
      color: '#007AFF',
      text_color: '#FFFFFF',
      is_active: true,
      is_visible: true
    });
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      hapticImpact('medium');
      onClick();
    });
  }, [tg, hapticImpact]);
  
  const hideMainButton = useCallback(() => {
    if (!tg) return;
    tg.MainButton.hide();
  }, [tg]);
  
  const setMainButtonLoading = useCallback((loading: boolean) => {
    if (!tg) return;
    if (loading) {
      tg.MainButton.showProgress(true);
    } else {
      tg.MainButton.hideProgress();
    }
  }, [tg]);
  
  // === OPEN TELEGRAM LINK ===
  const openTelegramLink = useCallback((url: string) => {
    if (tg) {
      tg.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  }, [tg]);
  
  return {
    isTelegram,
    user,
    tg,
    // Haptic
    hapticImpact,
    hapticNotification,
    hapticSelection,
    // Main Button
    showMainButton,
    hideMainButton,
    setMainButtonLoading,
    // Utils
    openTelegramLink
  };
}
