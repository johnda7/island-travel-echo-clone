import React, { useEffect, useRef } from "react";
import { UniversalBookingModal as CoreUniversalBookingModal } from "@/components/UniversalBookingModal";
import type { TourData } from "@/types/Tour";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  tourData?: TourData | null;
};

/**
 * Обёртка вокруг защищённого UniversalBookingModal.
 * - Блокирует скролл фона при открытии (мягко — без position:fixed, чтобы не ломать window.location.href)
 * - Скрывает Telegram MainButton/SecondaryButton и BottomNav пока модалка открыта
 * - Никаких scale(), fontSize override — оригинальная модалка рендерится как есть
 */
export function UniversalBookingModal({ isOpen, onClose, tourData }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Блокируем скролл фона при открытии
  // ⚠️ НЕ ИСПОЛЬЗОВАТЬ position:fixed на body — ломает window.location.href редирект в Telegram WebView!
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY || window.pageYOffset;
    document.body.setAttribute("data-scroll-lock", String(scrollY));

    // Мягкая блокировка: overflow:hidden на body + html
    // НЕ ломает window.location.href (критично для редиректа в Telegram!)
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // iOS: предотвращаем фоновый скролл через touchmove
    const preventBgScroll = (e: TouchEvent) => {
      // Разрешаем скролл ВНУТРИ модалки (overflow-y:auto на карточке)
      const target = e.target as HTMLElement;
      const scrollableModal = target.closest('.overflow-y-auto, [data-booking-wrapper]');
      if (scrollableModal) return; // не мешаем скроллу модалки
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventBgScroll, { passive: false });

    return () => {
      const prev = Number(document.body.getAttribute("data-scroll-lock") || 0);
      document.body.removeAttribute("data-scroll-lock");

      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";

      document.removeEventListener("touchmove", preventBgScroll);

      window.scrollTo(0, prev);
    };
  }, [isOpen]);

  // Скрываем Telegram MainButton, SecondaryButton и нашу BottomNav
  useEffect(() => {
    if (!isOpen) return;

    // Сигнал для TelegramBottomNav — скрыть навбар
    document.body.setAttribute("data-booking-open", "true");

    // Скрываем нативные Telegram кнопки
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      try { tg.MainButton.hide(); } catch {}
      try { tg.SecondaryButton?.hide(); } catch {}
    }

    return () => {
      document.body.removeAttribute("data-booking-open");

      // Восстанавливаем нативные Telegram кнопки
      if (tg) {
        try { tg.MainButton.show(); } catch {}
        try { tg.SecondaryButton?.show(); } catch {}
      }
    };
  }, [isOpen]);

  return (
    <div ref={wrapRef} data-booking-wrapper>
      {/* Если данные уже есть — рендерим оригинальную модалку */}
      {isOpen && tourData ? (
        <CoreUniversalBookingModal isOpen={isOpen} onClose={onClose} tourData={tourData} />
      ) : null}

      {/* Если модалка открыта, но данные ещё грузятся — показываем лоадер */}
      {isOpen && !tourData ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 flex items-center gap-3" style={{background: 'rgb(242, 242, 247)'}}>
              <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" aria-hidden="true" />
              <div className="text-sm font-semibold" style={{fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'}}>Загружаем тур…</div>
            </div>
            <div className="p-4 text-sm text-gray-600" style={{fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'}}>
              Пожалуйста, подождите пару секунд.
            </div>
            <div className="px-4 pb-4">
              <button onClick={onClose} className="w-full px-4 py-3 rounded-xl font-semibold text-sm" style={{background: 'rgba(0,0,0,0.06)'}}>Отменить</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UniversalBookingModal;