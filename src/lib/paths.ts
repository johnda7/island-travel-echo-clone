// Централизованный маппинг ID тура -> канонический путь страницы
// Используется в карточках, поиске, меню и т.п.

export const getTourDetailPath = (id: string): string => {
  switch (id) {
    case 'phi-phi-2days':
      return '/excursion/phi-phi-2-days-1-night';
    case 'pearls-andaman-sea':
      return '/tours/four-pearls-andaman';
    default:
      return `/${id}`;
  }
};

// Хелпер на будущее, если потребуется хэш- или базовый префикс
export const resolveAppPath = (path: string) => path;
