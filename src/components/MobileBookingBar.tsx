import React from 'react';
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

  return (
    <>
      {/* Mobile booking bar - фиксированная панель внизу */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex items-center gap-3">
          <div className="text-left flex-shrink-0">
            <div className="text-sm font-bold text-green-600">
              от {priceAdult.toLocaleString()} {currency}
            </div>
            <div className="text-xs text-gray-600">за взрослого</div>
          </div>
          <div className="flex gap-2 flex-1">
            <Button 
              onClick={handleTelegramClick}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 text-xs font-medium"
            >
              <span className="flex flex-col items-center leading-tight">
                <span>Написать в</span>
                <span>Телеграм</span>
              </span>
            </Button>
            <Button 
              onClick={onBookingClick}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-sm font-medium"
            >
              Забронировать
            </Button>
          </div>
        </div>
      </div>

      {/* Отступ снизу для панели */}
      <div className="h-20 lg:hidden" />
    </>
  );
};