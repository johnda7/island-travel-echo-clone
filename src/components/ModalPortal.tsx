// 🚨 КРИТИЧЕСКАЯ ИНФРАСТРУКТУРА МОДАЛОК — НЕ МЕНЯТЬ БЕЗ СОГЛАСОВАНИЯ!
// Этот портал гарантирует корректный рендер модальных окон поверх всей верстки
// и устраняет проблемы с overflow/z-index у родительских контейнеров.
//
// ОБЯЗАТЕЛЬНО для всех модалок бронирования и калькулятора:
// - Всегда оборачивайте <UniversalBookingModal /> в <ModalPortal>...
// - Не меняйте id, стиль и поведение корневого контейнера без причины
// - Не удаляйте pointer-events wrapper — он включает интерактивность внутри модала
//
// Пример использования:
// <ModalPortal>
//   <UniversalBookingModal isOpen={state} onClose={...} tourData={...} />
// </ModalPortal>
//
// Любые правки согласовывать, иначе возможны регрессии (модал не кликается/не виден).
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

// Простая обертка для модальных окон, чтобы гарантировать рендер вне потока и поверх всего
export const ModalPortal = ({ children }: ModalPortalProps) => {
  const modalRootId = 'app-modal-root';

  useEffect(() => {
    let root = document.getElementById(modalRootId);
    if (!root) {
      root = document.createElement('div');
      root.id = modalRootId;
      root.style.position = 'fixed';
      root.style.inset = '0';
      root.style.zIndex = '9999';
      root.style.pointerEvents = 'none'; // по умолчанию не блокируем клики по сайту
      document.body.appendChild(root);
    } else {
      // Нормализуем стили на случай старых значений из предыдущих версий
      root.style.position = 'fixed';
      root.style.inset = '0';
      root.style.zIndex = '9999';
      root.style.pointerEvents = 'none';
    }
    return () => {
      // Не удаляем корень, чтобы переиспользовать между страницами
    };
  }, []);

  const container = typeof document !== 'undefined' ? document.getElementById(modalRootId) : null;
  if (!container) return null;

  return createPortal(
    <div style={{ pointerEvents: 'auto' }}>
      {children}
    </div>,
    container
  );
};