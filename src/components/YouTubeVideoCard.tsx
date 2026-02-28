import React from 'react';
import { Play } from 'lucide-react';

interface YouTubeVideoCardProps {
  videoId: string;
  thumbnail?: string;
  title?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Компонент для отображения YouTube видео в галерее
 * Мировой стандарт: как у GetYourGuide + Booking.com
 */
export const YouTubeVideoCard: React.FC<YouTubeVideoCardProps> = ({
  videoId,
  thumbnail,
  title = 'Видео',
  onClick,
  className = ''
}) => {
  // YouTube Shorts ID из ссылки: https://youtube.com/shorts/Ocdcwb1Kxrc
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div 
      className={`relative group cursor-pointer overflow-hidden rounded-lg ${className}`}
      onClick={onClick}
    >
      {/* Превью видео */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Оверлей с градиентом */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Play кнопка - большая и заметная */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-red-600 rounded-full p-4 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700">
          <Play className="w-8 h-8 text-white fill-white" />
        </div>
      </div>
      
      {/* Badge "ВИДЕО" в углу */}
      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
        <Play className="w-3 h-3 fill-white" />
        ВИДЕО
      </div>
      
      {/* Продолжительность (опционально) */}
      <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
        0:45
      </div>
    </div>
  );
};
