-- Создаем полную CMS структуру для управления турами

-- 1. Таблица категорий туров
CREATE TABLE public.tour_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Основная таблица туров
CREATE TABLE public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  category_id UUID REFERENCES public.tour_categories(id),
  
  -- Pricing
  price_adult INTEGER NOT NULL,
  price_child INTEGER NOT NULL,
  currency TEXT DEFAULT 'THB',
  
  -- Tour details
  duration TEXT NOT NULL,
  group_size TEXT NOT NULL,
  difficulty_level TEXT,
  
  -- Content
  highlights TEXT[], -- массив строк для highlights
  included TEXT[], -- что включено
  excluded TEXT[], -- что не включено
  requirements TEXT[], -- требования
  important_info TEXT[], -- важная информация
  
  -- Metadata
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[], -- теги для поиска
  
  -- Status and ordering
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Галерея изображений для туров
CREATE TABLE public.tour_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  is_main BOOLEAN DEFAULT false, -- главное фото
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Программа/маршрут тура по дням
CREATE TABLE public.tour_itinerary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  activities TEXT[], -- список активностей
  meals_included TEXT[], -- питание
  accommodation TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Бронирования
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id),
  
  -- Customer info
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  
  -- Booking details
  booking_date DATE NOT NULL,
  adults_count INTEGER NOT NULL DEFAULT 1,
  children_count INTEGER DEFAULT 0,
  
  -- Pricing
  total_price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'THB',
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  
  -- Additional info
  special_requests TEXT,
  telegram_message_sent BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Отзывы
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id),
  
  -- Review content
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  photos TEXT[], -- URL фотографий от клиентов
  
  -- Status
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- 7. Настройки сайта
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'number', 'boolean', 'json')),
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включаем RLS для всех таблиц
ALTER TABLE public.tour_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_itinerary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Публичные политики для чтения (для всех пользователей)
CREATE POLICY "Anyone can read active tour categories" ON public.tour_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can read active tours" ON public.tours FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can read tour gallery" ON public.tour_gallery FOR SELECT USING (true);
CREATE POLICY "Anyone can read tour itinerary" ON public.tour_itinerary FOR SELECT USING (true);
CREATE POLICY "Anyone can read approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);

-- Политики для создания бронирований (любой может бронировать)
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Создаем функции для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_tour_categories_updated_at BEFORE UPDATE ON public.tour_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON public.tours FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Создаем индексы для оптимизации
CREATE INDEX idx_tours_slug ON public.tours(slug);
CREATE INDEX idx_tours_category ON public.tours(category_id);
CREATE INDEX idx_tours_active ON public.tours(is_active);
CREATE INDEX idx_tours_featured ON public.tours(is_featured);
CREATE INDEX idx_tour_gallery_tour_id ON public.tour_gallery(tour_id);
CREATE INDEX idx_tour_gallery_main ON public.tour_gallery(tour_id, is_main);
CREATE INDEX idx_bookings_tour_id ON public.bookings(tour_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_reviews_tour_id ON public.reviews(tour_id);
CREATE INDEX idx_reviews_approved ON public.reviews(is_approved);

-- Вставляем базовые настройки сайта
INSERT INTO public.site_settings (key, value, type, description) VALUES
('site_title', 'Пхукет Go', 'text', 'Название сайта'),
('site_description', 'Лучшие экскурсии и туры по Пхукету и Таиланду', 'text', 'Описание сайта'),
('contact_phone', '+66 123 456 789', 'text', 'Телефон для связи'),
('contact_email', 'info@phuket-go.com', 'text', 'Email для связи'),
('telegram_bot_token', '', 'text', 'Токен Telegram бота'),
('telegram_chat_id', '', 'text', 'ID чата для уведомлений'),
('default_currency', 'THB', 'text', 'Валюта по умолчанию');

-- Создаем базовую категорию
INSERT INTO public.tour_categories (name, slug, description) VALUES
('Экскурсии', 'excursions', 'Основные экскурсии и туры по Пхукету');