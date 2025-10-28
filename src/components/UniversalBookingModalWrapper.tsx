import React, { useEffect, useLayoutEffect, useRef } from "react";
import { UniversalBookingModal as CoreUniversalBookingModal } from "@/components/UniversalBookingModal";
import type { TourData } from "@/types/Tour";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  tourData: TourData;
};

/**
 * Обёртка вокруг защищённого UniversalBookingModal без изменения его логики.
 * Только UI-улучшения:
 * - Блокируем скролл фона при открытии (iOS-friendly)
 * - Добавляем более плотный непрозрачный фон, чтобы не просвечивал контент позади
 * - Делаем модалку визуально компактнее (ограничиваем max-height, центрируем)
 */
export function UniversalBookingModal({ isOpen, onClose, tourData }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Блокируем скролл фона (включая iOS фиксацию) при открытии
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY || window.pageYOffset;

    // Сохраним текущую прокрутку
    document.body.setAttribute("data-scroll-lock", String(scrollY));

    // Блокируем прокрутку тела страницы (вариант, совместимый с iOS)
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

      // Возвращаем стили
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

      // Восстанавливаем прокрутку
      window.scrollTo(0, prev);
    };
  }, [isOpen]);

  // Подкручиваем стили уже отрисованного модального DOM (без изменения исходного файла)
  useLayoutEffect(() => {
    if (!isOpen) return;
    const root = wrapRef.current;
    if (!root) return;

    // Небольшая задержка, чтобы дочерний модал гарантированно появился в DOM
    const id = requestAnimationFrame(() => {
      try {
        // Находим оверлей модалки (он имеет классы fixed inset-0 z-50 ...)
        const overlay = root.querySelector<HTMLElement>("div.fixed.inset-0.z-50");
        if (overlay) {
          overlay.style.background = "rgba(0,0,0,0.85)"; // затемняем фон сильнее
          overlay.style.backdropFilter = "blur(6px)";
          (overlay.style as any).WebkitBackdropFilter = "blur(6px)";
          overlay.style.alignItems = "center"; // центрируем (вместо items-end)
          overlay.style.padding = "16px"; // небольшой внутренний отступ
          overlay.style.overscrollBehaviorY = "contain"; // исключаем "ездение"
        }

        // Находим белую карточку внутри оверлея и ограничиваем высоту
        const panel = overlay?.querySelector<HTMLElement>("div.bg-white");
        if (panel) {
          panel.style.maxHeight = "80vh"; // было 95vh в исходнике
          panel.style.overflowY = "auto";
          panel.style.webkitOverflowScrolling = "touch" as any; // iOS плавный скролл
        }
      } catch {}
    });

    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  return (
    <div ref={wrapRef} data-booking-wrapper>
      {/* Дополнительный плотный оверлей под модалкой, чтобы фон точно не просвечивал */}
      {isOpen && (
        <div className="fixed inset-0 z-[49] bg-black/80" aria-hidden="true" />
      )}

      {/* Оригинальный защищённый модуль без изменений логики */}
      <CoreUniversalBookingModal isOpen={isOpen} onClose={onClose} tourData={tourData} />
    </div>
  );
}

export default UniversalBookingModal;