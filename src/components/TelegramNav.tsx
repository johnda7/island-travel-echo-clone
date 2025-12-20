import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTelegram } from '@/contexts/TelegramContext';
import { useNavigate } from 'react-router-dom';

interface TelegramNavProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

export const TelegramNav: React.FC<TelegramNavProps> = ({
  title,
  showBackButton = true,
  onBack,
  className = ''
}) => {
  const { isWebApp, close, hapticFeedback } = useTelegram();
  const navigate = useNavigate();

  // Показываем только в Telegram Web App
  if (!isWebApp) {
    return null;
  }

  const handleBack = () => {
    hapticFeedback('light');
    
    if (onBack) {
      onBack();
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Если нет истории браузера, закрываем Web App
      close();
    }
  };

  return (
    <div className={`telegram-nav ${className}`}>
      {showBackButton && (
        <button
          onClick={handleBack}
          className="telegram-nav-back"
          aria-label="Назад"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      <h1 className="telegram-nav-title">{title}</h1>
    </div>
  );
};