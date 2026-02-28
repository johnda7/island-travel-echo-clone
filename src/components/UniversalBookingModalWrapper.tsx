import React, { useEffect, useLayoutEffect, useRef } from "react";
import { UniversalBookingModal as CoreUniversalBookingModal } from "@/components/UniversalBookingModal";
import type { TourData } from "@/types/Tour";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /**
   * Может быть временно null в момент первого открытия,
   * когда данные ещё подгружаются. В этом случае показываем лоадер.
   */
  tourData?: TourData | null;
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

    // 🔒 Фиксируем начальную высоту viewport при открытии модалки.
    // Когда открывается нативный date-picker / клавиатура на мобильном,
    // window.innerHeight уменьшается → без этого фикса fitToViewport
    // пересчитывает scale и модалка «прыгает».
    const lockedViewportH = window.innerHeight;

    // Небольшая задержка, чтобы дочерний модал гарантированно появился в DOM
    const id = requestAnimationFrame(() => {
      try {
        // Находим оверлей модалки (он имеет классы fixed inset-0 z-50 ...)
        const overlay = root.querySelector<HTMLElement>("div.fixed.inset-0.z-50");
        if (overlay) {
          overlay.style.background = "rgba(0,0,0,0.88)"; // ещё темнее
          overlay.style.backdropFilter = "blur(6px)";
          (overlay.style as any).WebkitBackdropFilter = "blur(6px)";
          overlay.style.alignItems = "center"; // центрируем (вместо items-end)
          overlay.style.padding = "6px"; // ещё компактнее
          overlay.style.overscrollBehaviorY = "contain"; // исключаем "ездение"
          // 🔒 Фиксируем высоту оверлея — не позволяем dvh/vh прыгать
          overlay.style.height = `${lockedViewportH}px`;
          overlay.style.minHeight = `${lockedViewportH}px`;
          overlay.style.maxHeight = `${lockedViewportH}px`;
        }

        // Находим белую карточку внутри оверлея и ограничиваем высоту
        const panel = overlay?.querySelector<HTMLElement>("div.bg-white");
        if (panel) {
          // Базовые компактные стили
          panel.style.maxHeight = "100vh"; // разрешим полную высоту
          panel.style.overflowY = "auto"; // 🔒 разрешаем скролл внутри панели вместо overflow:visible
          (panel.style as any).webkitOverflowScrolling = "touch"; // iOS плавный скролл
          panel.style.margin = "0 auto";
          panel.style.width = "100%";
          panel.style.maxWidth = "520px"; // ограничим ширину на десктопе
          panel.style.borderRadius = "16px";

          // Ужимаем базовый размер шрифта внутри панели на ~6%
          (panel.style as any).fontSize = "0.92rem";

          // Компенсируем слишком большие внутренние отступы в первом блоке (шапка)
          const headerBlock = panel.querySelector<HTMLElement>("div[style*='rgb(242, 242, 247)']");
          if (headerBlock) {
            headerBlock.style.padding = "6px"; // ещё компактнее шапка
          }

          // Титульная карточка (сразу после шапки): ужмём отступы и межблочные расстояния
          const titleCard = headerBlock?.nextElementSibling as HTMLElement | null;
          if (titleCard) {
            titleCard.style.padding = "8px 10px";
            titleCard.style.marginBottom = "8px";
          }

          // Урежем слишком большие нижние отступы между секциями
          panel.querySelectorAll<HTMLElement>("[class*='mb-3']").forEach(el => {
            el.style.marginBottom = "8px";
          });

          // Кнопка внизу: делаем чуть ниже по высоте, но сохраняем удобство нажатия
          const bookingBtn = panel.querySelector<HTMLButtonElement>(".btn-booking");
          if (bookingBtn) {
            bookingBtn.style.padding = "10px 14px";
            bookingBtn.style.minHeight = "44px"; // iOS tap target
            bookingBtn.style.borderRadius = "12px";
          }

          // 👉 Автомасштаб: панель должна целиком помещаться в зафиксированной области
          const fitToViewport = () => {
            // 🔒 Используем зафиксированную высоту, а не текущую window.innerHeight
            const available = lockedViewportH - 12;
            // временно сбросим трансформацию, чтобы измерить реальную высоту
            panel.style.transform = "";
            panel.style.transformOrigin = "top center";
            const fullH = panel.scrollHeight;
            const scale = Math.min(1, Math.max(0.62, available / fullH));
            if (scale < 1) {
              panel.style.transform = `scale(${scale})`;
            } else {
              panel.style.transform = "";
            }
          };

          fitToViewport();
          // Пересчёт ТОЛЬКО при ориентации (не при resize — date picker/keyboard)
          const onOrientationChange = () => {
            // При смене ориентации пересчитываем с новым реальным viewport
            const newH = window.innerHeight;
            const available = newH - 12;
            panel.style.transform = "";
            panel.style.transformOrigin = "top center";
            const fullH = panel.scrollHeight;
            const scale = Math.min(1, Math.max(0.62, available / fullH));
            if (scale < 1) {
              panel.style.transform = `scale(${scale})`;
            }
            // Обновляем размеры оверлея
            if (overlay) {
              overlay.style.height = `${newH}px`;
              overlay.style.minHeight = `${newH}px`;
              overlay.style.maxHeight = `${newH}px`;
            }
          };
          window.addEventListener('orientationchange', onOrientationChange);
          // Сохранить очистку
          (panel as any).__fitCleanup = () => {
            window.removeEventListener('orientationchange', onOrientationChange);
          };
        }
      } catch {}
    });

    return () => {
      cancelAnimationFrame(id);
      try {
        const panel = wrapRef.current?.querySelector<HTMLElement>("div.fixed.inset-0.z-50 div.bg-white");
        (panel as any)?.__fitCleanup?.();
      } catch {}
    };
  }, [isOpen]);

  return (
    <div ref={wrapRef} data-booking-wrapper>
      {/* Дополнительный плотный оверлей под модалкой, чтобы фон точно не просвечивал */}
      {isOpen && (
        <div className="fixed inset-0 z-[49] bg-black/80" aria-hidden="true" />
      )}

      {/* Если данные уже есть — рендерим оригинальную модалку */}
      {isOpen && tourData ? (
        <CoreUniversalBookingModal isOpen={isOpen} onClose={onClose} tourData={tourData} />
      ) : null}

      {/* Если модалка открыта, но данные ещё грузятся — показываем компактный лоадер */}
      {isOpen && !tourData ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
          <div className="bg-white w-full max-w-[520px] max-h-[66vh] overflow-hidden rounded-2xl shadow-xl">
            <div className="p-4 flex items-center gap-3" style={{background: 'rgb(242, 242, 247)'}}>
              <div className="w-5 h-5 rounded-full border-2 border-green-500 border-t-transparent animate-spin" aria-hidden="true" />
              <div className="text-sm font-semibold" style={{fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'}}>Загружаем тур…</div>
            </div>
            <div className="p-4 text-sm text-gray-600" style={{fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'}}>
              Пожалуйста, подождите пару секунд. Первый запуск подгружает данные тура.
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