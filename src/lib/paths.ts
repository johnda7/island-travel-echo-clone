// 🎯 ЦЕНТРАЛИЗОВАННАЯ СИСТЕМА ПУТЕЙ ТУРОВ
// 🔒 ЗАЩИЩЕННЫЙ ФАЙЛ - КРИТИЧЕСКАЯ ИНФРАСТРУКТУРА НАВИГАЦИИ
// ✅ ПРИНЦИП: "Один источник правды для всех ссылок на туры"

/**
 * 🎯 ЦЕНТРАЛЬНАЯ ФУНКЦИЯ ДЛЯ ПОСТРОЕНИЯ ПУТЕЙ К ТУРАМ
 * 
 * ЛОГИКА:
 * - Защищенные туры → SEO-дружественные URL (/excursion/tour-name)
 * - Обычные туры → стандартные пути (/tours/tour-id)
 * - Все переходы ДОЛЖНЫ использовать эту функцию
 * 
 * @param tourId - ID тура из TOURS_REGISTRY
 * @returns канонический путь к туру
 */
export const getTourDetailPath = (tourId: string): string => {
  // 🔒 ЗАЩИЩЕННЫЕ ТУРЫ С SEO-URL
  const protectedTours: Record<string, string> = {
    'phi-phi-2days': '/excursion/phi-phi-2-days-1-night',
    'pearls-andaman-sea': '/excursion/pearls-andaman-sea',
    'dostoprimechatelnosti-phuketa': '/excursion/dostoprimechatelnosti-phuketa',
    'james-bond-island-phang-nga': '/excursion/james-bond-island-phang-nga',
    'eleven-islands-standard-speedboat': '/excursion/eleven-islands-standard',
    'eleven-islands-mega-speedboat': '/excursion/eleven-islands-mega',
    'racha-coral-islands': '/excursion/racha-coral-islands',
    'rafting-spa-atv-1-day': '/excursion/rafting-spa-atv',
    'kao-lak-safari-1-day': '/excursion/kao-lak-safari',
    'avatar-plus-hangdong': '/excursion/avatar-plus-hangdong',
    'phang-nga-skywalk': '/excursion/phang-nga-skywalk',
    'cheow-lan-lake': '/excursion/cheow-lan-lake',
  };

  // Если тур защищен - возвращаем SEO-путь
  if (protectedTours[tourId]) {
    return protectedTours[tourId];
  }

  // Для остальных туров - стандартный путь
  return `/tours/${tourId}`;
};

/**
 * 🔄 ОБРАТНАЯ ФУНКЦИЯ: получить ID тура по пути
 * Используется для определения активного тура в навигации
 */
export const getTourIdFromPath = (path: string): string | null => {
  // Убираем hash и query параметры
  const cleanPath = path.split('?')[0].split('#')[0];
  
  // Защищенные туры
  const pathToId: Record<string, string> = {
    '/excursion/phi-phi-2-days-1-night': 'phi-phi-2days',
    '/excursion/pearls-andaman-sea': 'pearls-andaman-sea',
    '/excursion/dostoprimechatelnosti-phuketa': 'dostoprimechatelnosti-phuketa',
    '/excursion/james-bond-island-phang-nga': 'james-bond-island-phang-nga',
    '/excursion/eleven-islands-standard': 'eleven-islands-standard-speedboat',
    '/excursion/eleven-islands-mega': 'eleven-islands-mega-speedboat',
    '/excursion/racha-coral-islands': 'racha-coral-islands',
    '/excursion/rafting-spa-atv': 'rafting-spa-atv-1-day',
    '/excursion/kao-lak-safari': 'kao-lak-safari-1-day',
    '/excursion/avatar-plus-hangdong': 'avatar-plus-hangdong',
    '/excursion/phang-nga-skywalk': 'phang-nga-skywalk',
    '/excursion/cheow-lan-lake': 'cheow-lan-lake',
  };
  
  if (pathToId[cleanPath]) {
    return pathToId[cleanPath];
  }
  
  // Стандартные пути /tours/:id
  const match = cleanPath.match(/^\/tours\/(.+)$/);
  return match ? match[1] : null;
};