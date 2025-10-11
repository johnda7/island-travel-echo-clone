// ТИПИЗАЦИЯ ДЛЯ УНИВЕРСАЛЬНОЙ СИСТЕМЫ ТУРОВ

export interface TourData {
  // Основные идентификаторы
  id: string;
  title: string;
  subtitle: string;
  description: string;
  route: string;

  // Ценообразование
  priceAdult: number;
  priceChild: number;
  priceInfant?: number; // для будущих туров
  currency: string;

  // Характеристики тура
  duration: string;
  groupSize: string;
  rating: number;
  reviewsCount: number;

  // Медиа контент
  mainImage: string;
  gallery: string[];
  videoId?: string; // YouTube video ID для галереи (опционально)

  // Описание тура
  highlights: string[];
  itinerary?: {
    day: string;
    time: string;
    activity: string;
  }[];

  // Дополнительная информация
  included?: string[];
  excluded?: string[];
  requirements?: string[];
  importantInfo?: string[];
  pickupInfo?: string;
  cancellationPolicy?: string;
  
  // Для совместимости с компонентами
  schedule?: {
    day: string;
    time: string;
    title: string;
    description: string;
  }[];
  notIncluded?: string[];
  whatToBring?: string[];

  // Категория и теги
  category?: string;
  tags?: string[];
  isPopular?: boolean;

  // Особенности для бронирования
  bookingNotes?: string;
  specialRequirements?: boolean;
}

// Интерфейс для пропсов BookingModal
export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourData: TourData;
}

// Интерфейс для данных формы бронирования
export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  adults: number;
  children: number;
  // infants убрано - младенцы бесплатно, считать не нужно
  specialRequests?: string;
  hotelName?: string;
}

// Интерфейс для расчета цены
export interface PriceCalculation {
  adults: number;
  children: number;
  infants: number;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  totalPrice: number;
  currency: string;
}