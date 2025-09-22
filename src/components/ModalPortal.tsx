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
      root.style.pointerEvents = 'none';
      document.body.appendChild(root);
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