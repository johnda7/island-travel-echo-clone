import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Скроллим к верху только при смене СТРАНИЦЫ (pathname), не при смене search params
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      
      // Мгновенный скролл
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Повторяем после рендера для надёжности в Telegram WebView
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
      
      // Третья попытка с задержкой (для медленных WebView)
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    }
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;