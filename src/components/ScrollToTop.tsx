import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Прокручиваем к верху при изменении маршрута
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash, location.search]);

  return null;
};

export default ScrollToTop;