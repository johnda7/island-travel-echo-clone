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
 * Минимальное вмешательство: только блокировка скролла фона при открытии.
 * Никаких scale(), fontSize override, padding override — оригинальная модалка
 * уже имеет свой адаптивный дизайн (sm: breakpoints).
 */
export function UniversalBookingModal({ isOpen, onClose, tourData }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Блокируем скролл фона при открытии (iOS-friendly)
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY || window.pageYOffset;
    document.body.setAttribute("data-scroll-lock", String(scrollY));

    Object.assign(document.documentElement.style, {
      overscrollBehaviorY: "contain",
    } as CSSStyleDeclaration);

    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      width: "100%",
      overflow: "hidden",
      touchAction: "none",
    } as CSSStyleDeclaration);

    return () => {
      const prev = Number(document.body.getAttribute("data-scroll-lock") || 0);
      document.body.removeAttribute("data-scroll-lock");

      Object.assign(document.body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
        overflow: "",
        touchAction: "",
      } as CSSStyleDeclaration);
      document.documentElement.style.overscrollBehaviorY = "";

      window.scrollTo(0, prev);
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