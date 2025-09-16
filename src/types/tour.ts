// Типы данных для унифицированной системы туров
// Согласно MASTER_PROMPT_TOUR_UNIFICATION.md

export interface Location {
  country: string;
  region: string; 
  island: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Duration {
  days: number;
  nights: number;
}

export interface TourImage {
  url: string;
  alt: string;
  category: 'hero' | 'highlight' | 'activity' | 'accommodation' | 'food';
  caption?: string;
  sizes?: {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    hero: string;
  };
}

export interface Activity {
  time: string;
  activity: string;
  location: string;
  duration?: string;
}

export interface DayProgram {
  day: number;
  title: string;
  description: string;
  schedule: Activity[];
  highlights?: string[];
}

export interface PricingTier {
  adult: number;
  child: number;
  infant: number;
}

export interface SeasonalPricing {
  from: string; // ISO date
  to: string; // ISO date
  modifier: number; // 1.2 = +20%, 0.8 = -20%
  reason: string;
}

export interface TourPricing {
  currency: 'THB' | 'USD' | 'EUR';
  base: PricingTier;
  seasonal?: SeasonalPricing[];
  deposit?: {
    enabled: boolean;
    amount?: number;
    percentage?: number;
  };
}

export interface BookingOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number; // 1.0 = base price, 1.5 = +50%
  maxParticipants: number;
}

export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  required?: boolean;
}

export interface TourAvailability {
  daysOfWeek: number[]; // 0-6, где 0 = воскресенье
  excludeDates?: string[]; // ISO dates
  advanceBooking: number; // минимум дней заранее
}

export interface TourReviews {
  averageRating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
  };
}

export type TourCategory = 
  | 'island-hopping'
  | 'city-tours'
  | 'beach-tours'
  | 'adventure'
  | 'cultural'
  | 'overnight'
  | 'day-trip'
  | 'romantic'
  | 'family'
  | 'group';

export type TourTag = 
  | 'speedboat' | 'longtail' | 'catamaran'    // Транспорт
  | 'snorkeling' | 'diving' | 'swimming'      // Водные активности  
  | 'beach' | 'island' | 'lagoon'             // Локации
  | 'sunset' | 'sunrise' | 'fireshow'         // Время/события
  | 'lunch' | 'breakfast' | 'dinner'          // Питание
  | 'photography' | 'instagram'               // Фото
  | 'family' | 'romantic' | 'group';          // Аудитория

export type TourDifficulty = 'easy' | 'moderate' | 'challenging';

export type TourStatus = 'active' | 'inactive' | 'seasonal' | 'coming-soon';

export interface Tour {
  // Основная информация
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  
  // Локация и география
  location: Location;
  
  // Временные характеристики
  duration: Duration;
  
  // Категоризация
  categories: TourCategory[];
  tags: TourTag[];
  difficulty: TourDifficulty;
  
  // Групповые характеристики
  groupSize: {
    min: number;
    max: number;
  };
  ageRestrictions?: {
    minAge?: number;
    maxAge?: number;
  };
  
  // Ценообразование
  pricing: TourPricing;
  
  // Медиа контент
  images: TourImage[];
  
  // Программа тура
  itinerary: DayProgram[];
  
  // Что включено/исключено
  included: string[];
  excluded: string[];
  
  // Дополнительная информация
  notes?: string[];
  
  // Варианты бронирования
  bookingOptions?: BookingOption[];
  
  // Дополнительные услуги
  additionalServices?: AdditionalService[];
  
  // Доступность
  availability: TourAvailability;
  
  // Отзывы
  reviews?: TourReviews;
  
  // SEO данные
  seo: SEOData;
  
  // Метаданные
  status: TourStatus;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Интерфейсы для фильтрации и поиска
export interface TourFilters {
  location?: string;
  category?: TourCategory;
  maxPrice?: number;
  duration?: number;
  tags?: TourTag[];
  difficulty?: TourDifficulty;
  dateFrom?: string;
  dateTo?: string;
}

// Интерфейс для валидации
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

// Интерфейсы для бронирования
export interface BookingParticipants {
  adults: number;
  children: number;
  infants: number;
}

export interface BookingParams {
  tourId: string;
  variant?: string;
  date: string;
  participants: BookingParticipants;
  selectedOptions: string[];
  specialRequests?: string;
}

export interface PriceBreakdown {
  basePrice: number;
  seasonalAdjustment: number;
  variantAdjustment: number;
  additionalServices: number;
  subtotal: number;
  deposit?: number;
  total: number;
  currency: string;
}

// Интерфейс для хлебных крошек
export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}