import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@/components/ui/button';

interface MobileBookingBarProps {
  priceAdult: number;
  priceChild: number;
  currency: string;
  onBookingClick: () => void;
}

export const MobileBookingBar: React.FC<MobileBookingBarProps> = ({
  priceAdult,
  priceChild,
  currency,
  onBookingClick
}) => {
  const handleTelegramClick = () => {
    window.location.href = 'https://t.me/Phuketga';
  };

  const barContent = (
    <>
      {/* Mobile booking bar - фиксированная панель внизу с размытием фона */}
      <div 
        className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-lg"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0, 0, 0)',
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        <div className="flex items-center gap-2 max-w-7xl mx-auto">
          <div className="text-left flex-shrink-0">
            <div className="text-sm font-bold" style={{ color: '#007AFF' }}>
              от {priceAdult.toLocaleString()} {currency}
            </div>
            <div className="text-xs text-gray-600">за взрослого</div>
          </div>
          <div className="flex gap-2 flex-1">
            <Button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleTelegramClick();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleTelegramClick();
              }}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 text-xs font-medium active:scale-95"
            >
              <span className="flex flex-col items-center leading-tight">
                <span>Написать в</span>
                <span>Телеграм</span>
              </span>
            </Button>
            <Button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBookingClick();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBookingClick();
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 text-sm font-medium active:scale-95"
            >
              Забронировать
            </Button>
          </div>
        </div>
      </div>

      {/* Отступ снизу для панели - уменьшен */}
      <div 
        className="h-[72px] lg:hidden" 
        style={{ 
          height: 'calc(72px + env(safe-area-inset-bottom))' 
        }}
      />
    </>
  );

  // Рендерим через портал прямо в body
  return typeof document !== 'undefined' 
    ? ReactDOM.createPortal(barContent, document.body)
    : null;
};