import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title?: string;
}

/**
 * Модальное окно для просмотра YouTube видео
 * Полноэкранный режим с YouTube iframe
 */
export const YouTubeModal: React.FC<YouTubeModalProps> = ({
  isOpen,
  onClose,
  videoId,
  title = 'Видео'
}) => {
  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Блокируем скролл body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // YouTube embed URL БЕЗ брендинга и логотипов
  // Параметры для скрытия всего лишнего:
  // - controls=1 (показать только базовые контролы)
  // - modestbranding=1 (убрать логотип YouTube)
  // - rel=0 (не показывать похожие видео)
  // - showinfo=0 (убрать информацию о видео)
  // - iv_load_policy=3 (убрать аннотации)
  // - cc_load_policy=0 (убрать субтитры)
  // - fs=1 (разрешить полноэкранный режим)
  // - playsinline=1 (проигрывать встроенно на iOS)
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1`;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Контейнер видео */}
      <div 
        className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          aria-label="Закрыть видео"
        >
          <X className="w-6 h-6" />
        </button>

        {/* YouTube iframe БЕЗ лишнего брендинга */}
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>

      {/* Подсказка внизу */}
      <div className="absolute bottom-8 text-white/60 text-sm">
        Нажмите ESC или кликните вне видео для закрытия
      </div>
    </div>
  );
};
