import React, { createContext, useContext, useEffect, useState } from 'react';

// Типы для Telegram Web App API
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    chat_instance?: string;
    chat_type?: string;
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
    hint_color: string;
    bg_color: string;
    text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    setParams: (params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  sendData: (data: string) => void;
  openLink: (url: string) => void;
  openTelegramLink: (url: string) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
  showPopup: (params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id?: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
  }, callback?: (buttonId: string) => void) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramContextType {
  webApp: TelegramWebApp | null;
  user: TelegramUser | null;
  isWebApp: boolean;
  isMobile: boolean;
  colorScheme: 'light' | 'dark';
  ready: () => void;
  expand: () => void;
  close: () => void;
  hapticFeedback: (type: 'light' | 'medium' | 'heavy') => void;
  showMainButton: (text: string, onClick: () => void) => void;
  hideMainButton: () => void;
  showBackButton: (onClick: () => void) => void;
  hideBackButton: () => void;
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  user: null,
  isWebApp: false,
  isMobile: false,
  colorScheme: 'light',
  ready: () => {},
  expand: () => {},
  close: () => {},
  hapticFeedback: () => {},
  showMainButton: () => {},
  hideMainButton: () => {},
  showBackButton: () => {},
  hideBackButton: () => {},
});

export const useTelegram = () => useContext(TelegramContext);

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isWebApp, setIsWebApp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Проверяем наличие Telegram Web App API
    const tgWebApp = window.Telegram?.WebApp;
    
    // Также проверяем URL параметр для тестирования: ?telegram=true
    const urlParams = new URLSearchParams(window.location.search);
    const isTestMode = urlParams.get('telegram') === 'true';
    
    if (tgWebApp || isTestMode) {
      setWebApp(tgWebApp || null);
      setIsWebApp(true);
      
      if (tgWebApp) {
        setUser(tgWebApp.initDataUnsafe?.user || null);
        setColorScheme(tgWebApp.colorScheme || 'light');
        
        // Инициализируем Web App
        tgWebApp.ready();
        
        // Разворачиваем на весь экран (Main App mode)
        tgWebApp.expand();
        
        // Устанавливаем цвета интерфейса Telegram
        if (tgWebApp.setHeaderColor) {
          tgWebApp.setHeaderColor('#007AFF');
        }
        if (tgWebApp.setBackgroundColor) {
          tgWebApp.setBackgroundColor('#FFFFFF');
        }
        
        // Применяем тему Telegram к сайту
        const themeParams = tgWebApp.themeParams;
        if (themeParams.bg_color) {
          document.documentElement.style.setProperty('--tg-bg-color', themeParams.bg_color);
        }
        if (themeParams.text_color) {
          document.documentElement.style.setProperty('--tg-text-color', themeParams.text_color);
        }
        
        console.log('✅ Telegram Mini App initialized:', {
          platform: tgWebApp.platform,
          version: tgWebApp.version,
          isExpanded: tgWebApp.isExpanded,
          user: tgWebApp.initDataUnsafe?.user
        });
      } else if (isTestMode) {
        // Мок данные для тестирования
        setUser({
          id: 123456789,
          first_name: 'Test',
          last_name: 'User',
          username: 'testuser',
          language_code: 'ru'
        });
      }
    }

    // Определяем мобильное устройство
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    setIsMobile(checkMobile());

    // Добавляем класс для стилей
    if (isWebApp || isTestMode) {
      document.body.classList.add('telegram-app');
    } else {
      document.body.classList.add('web-browser');
    }

    return () => {
      document.body.classList.remove('telegram-app', 'web-browser');
    };
  }, []);

  const ready = () => {
    webApp?.ready();
  };

  const expand = () => {
    webApp?.expand();
  };

  const close = () => {
    webApp?.close();
  };

  const hapticFeedback = (type: 'light' | 'medium' | 'heavy') => {
    if (webApp?.HapticFeedback) {
      webApp.HapticFeedback.impactOccurred(type);
    }
  };

  const showMainButton = (text: string, onClick: () => void) => {
    if (webApp?.MainButton) {
      webApp.MainButton.setText(text);
      webApp.MainButton.onClick(onClick);
      webApp.MainButton.show();
    }
  };

  const hideMainButton = () => {
    webApp?.MainButton?.hide();
  };

  const showBackButton = (onClick: () => void) => {
    if (webApp?.BackButton) {
      webApp.BackButton.onClick(onClick);
      webApp.BackButton.show();
    }
  };

  const hideBackButton = () => {
    webApp?.BackButton?.hide();
  };

  const contextValue: TelegramContextType = {
    webApp,
    user,
    isWebApp,
    isMobile,
    colorScheme,
    ready,
    expand,
    close,
    hapticFeedback,
    showMainButton,
    hideMainButton,
    showBackButton,
    hideBackButton,
  };

  return (
    <TelegramContext.Provider value={contextValue}>
      {children}
    </TelegramContext.Provider>
  );
};