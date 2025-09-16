import { 
  Tour, 
  TourFilters, 
  ValidationResult, 
  BookingParams, 
  PriceBreakdown,
  BookingParticipants,
  BreadcrumbItem
} from '../types/tour';

// Генерация цены в удобочитаемом формате
export const formatPrice = (price: number, currency: string = 'THB'): string => {
  const locale = currency === 'THB' ? 'th-TH' : 'ru-RU';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Генерация слага из названия
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Валидация данных тура
export const validateTour = (tour: Tour): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Обязательные поля
  if (!tour.title || tour.title.length < 10) {
    errors.push('Название тура должно содержать минимум 10 символов');
  }
  
  if (!tour.subtitle || tour.subtitle.length < 20) {
    errors.push('Подзаголовок должен содержать минимум 20 символов');
  }
  
  if (!tour.description || tour.description.length < 100) {
    errors.push('Описание должно содержать минимум 100 символов');
  }
  
  if (!tour.location || !tour.location.island) {
    errors.push('Не указана локация тура');
  }
  
  if (!tour.pricing.base.adult || tour.pricing.base.adult <= 0) {
    errors.push('Не указана цена для взрослых');
  }
  
  if (!tour.images || tour.images.length < 3) {
    errors.push('Нужно минимум 3 изображения');
  }
  
  if (!tour.itinerary || tour.itinerary.length === 0) {
    errors.push('Программа тура обязательна');
  }
  
  // Предупреждения
  if (tour.images && tour.images.length < 5) {
    warnings.push('Рекомендуется добавить больше изображений (минимум 5)');
  }
  
  if (!tour.reviews || tour.reviews.totalReviews === 0) {
    warnings.push('Отсутствуют отзывы о туре');
  }
  
  if (tour.seo.metaTitle.length > 60) {
    warnings.push('Meta title превышает рекомендуемую длину (60 символов)');
  }
  
  if (tour.seo.metaDescription.length > 160) {
    warnings.push('Meta description превышает рекомендуемую длину (160 символов)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Поиск и фильтрация туров
export const searchTours = (tours: Tour[], filters: TourFilters): Tour[] => {
  return tours.filter(tour => {
    // Фильтр по статусу (только активные)
    if (tour.status !== 'active') return false;
    
    // Фильтр по локации
    if (filters.location) {
      const locationMatch = 
        tour.location.island.toLowerCase().includes(filters.location.toLowerCase()) ||
        tour.location.region.toLowerCase().includes(filters.location.toLowerCase());
      if (!locationMatch) return false;
    }
    
    // Фильтр по категории
    if (filters.category && !tour.categories.includes(filters.category)) {
      return false;
    }
    
    // Фильтр по максимальной цене
    if (filters.maxPrice && tour.pricing.base.adult > filters.maxPrice) {
      return false;
    }
    
    // Фильтр по длительности
    if (filters.duration && tour.duration.days !== filters.duration) {
      return false;
    }
    
    // Фильтр по тегам
    if (filters.tags && filters.tags.length > 0) {
      const hasTag = filters.tags.some(tag => tour.tags.includes(tag));
      if (!hasTag) return false;
    }
    
    // Фильтр по сложности
    if (filters.difficulty && tour.difficulty !== filters.difficulty) {
      return false;
    }
    
    // Фильтр по датам (проверка доступности)
    if (filters.dateFrom && filters.dateTo) {
      // Здесь можно добавить логику проверки доступности в указанные даты
      // Пока просто проверяем, что тур доступен в принципе
      const requestDate = new Date(filters.dateFrom);
      const dayOfWeek = requestDate.getDay();
      if (!tour.availability.daysOfWeek.includes(dayOfWeek)) {
        return false;
      }
    }
    
    return true;
  });
};

// Расчёт стоимости тура с учётом всех факторов
export const calculateTotalPrice = (tour: Tour, booking: BookingParams): PriceBreakdown => {
  const { participants, date, selectedOptions } = booking;
  
  // Базовая стоимость
  const baseAdultPrice = tour.pricing.base.adult * participants.adults;
  const baseChildPrice = tour.pricing.base.child * participants.children;
  const baseInfantPrice = tour.pricing.base.infant * participants.infants;
  const basePrice = baseAdultPrice + baseChildPrice + baseInfantPrice;
  
  // Сезонные корректировки
  let seasonalAdjustment = 0;
  if (tour.pricing.seasonal && date) {
    const bookingDate = new Date(date);
    const seasonal = tour.pricing.seasonal.find(season => {
      const from = new Date(season.from);
      const to = new Date(season.to);
      return bookingDate >= from && bookingDate <= to;
    });
    
    if (seasonal) {
      seasonalAdjustment = basePrice * (seasonal.modifier - 1);
    }
  }
  
  // Корректировка варианта (если есть)
  let variantAdjustment = 0;
  if (booking.variant && tour.bookingOptions) {
    const variant = tour.bookingOptions.find(opt => opt.id === booking.variant);
    if (variant) {
      variantAdjustment = basePrice * (variant.priceModifier - 1);
    }
  }
  
  // Дополнительные услуги
  let additionalServices = 0;
  if (selectedOptions.length > 0 && tour.additionalServices) {
    additionalServices = selectedOptions.reduce((sum, optionId) => {
      const service = tour.additionalServices?.find(service => service.id === optionId);
      return sum + (service ? service.price : 0);
    }, 0);
  }
  
  const subtotal = basePrice + seasonalAdjustment + variantAdjustment + additionalServices;
  
  // Депозит
  let deposit = 0;
  if (tour.pricing.deposit?.enabled) {
    if (tour.pricing.deposit.percentage) {
      deposit = subtotal * (tour.pricing.deposit.percentage / 100);
    } else if (tour.pricing.deposit.amount) {
      deposit = tour.pricing.deposit.amount;
    }
  }
  
  return {
    basePrice,
    seasonalAdjustment,
    variantAdjustment,
    additionalServices,
    subtotal,
    deposit,
    total: subtotal,
    currency: tour.pricing.currency
  };
};

// Генерация хлебных крошек
export const generateBreadcrumbs = (
  tourSlug?: string, 
  variant?: string, 
  tours: Tour[] = []
): BreadcrumbItem[] => {
  const base: BreadcrumbItem[] = [
    { label: "Главная", href: "/" },
    { label: "Туры", href: "/tours" }
  ];
  
  if (tourSlug) {
    const tour = tours.find(t => t.slug === tourSlug);
    if (tour) {
      base.push({ 
        label: tour.title, 
        href: `/tours/${tourSlug}` 
      });
      
      if (variant) {
        base.push({ 
          label: "Бронирование", 
          href: `/book/${tourSlug}/${variant}`,
          current: true
        });
      } else {
        base[base.length - 1].current = true;
      }
    }
  }
  
  return base;
};

// Проверка доступности тура на определённую дату
export const checkTourAvailability = (tour: Tour, date: string): boolean => {
  const requestDate = new Date(date);
  const today = new Date();
  
  // Проверка минимального времени бронирования
  const daysDiff = Math.ceil((requestDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff < tour.availability.advanceBooking) {
    return false;
  }
  
  // Проверка дня недели
  const dayOfWeek = requestDate.getDay();
  if (!tour.availability.daysOfWeek.includes(dayOfWeek)) {
    return false;
  }
  
  // Проверка исключённых дат
  const dateString = date.split('T')[0]; // Получаем только дату без времени
  if (tour.availability.excludeDates?.includes(dateString)) {
    return false;
  }
  
  return true;
};

// Получение рейтинга в виде звёзд
export const getStarRating = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
};

// Форматирование длительности
export const formatDuration = (days: number, nights: number): string => {
  if (nights === 0) {
    return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`;
  }
  
  return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'} / ${nights} ${nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}`;
};

// Генерация SEO-дружественного URL
export const generateTourUrl = (tour: Tour): string => {
  return `/tours/${tour.slug}`;
};

export const generateBookingUrl = (tour: Tour, variant?: string): string => {
  return variant ? `/book/${tour.slug}/${variant}` : `/book/${tour.slug}`;
};