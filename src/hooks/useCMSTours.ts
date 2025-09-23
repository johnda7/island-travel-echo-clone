import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CMSTour {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  short_description: string;
  price_adult: number;
  price_child: number;
  currency: string;
  duration: string;
  group_size: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  requirements: string[];
  important_info: string[];
  tags: string[];
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  gallery: {
    id: string;
    image_url: string;
    alt_text: string;
    caption: string;
    is_main: boolean;
    sort_order: number;
  }[];
  itinerary: {
    day_number: number;
    title: string;
    description: string;
    activities: string[];
    meals_included: string[];
    accommodation: string;
  }[];
}

export const useCMSTours = () => {
  const [tours, setTours] = useState<CMSTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = async () => {
    try {
      setLoading(true);
      console.log('🔄 Загружаем туры из CMS...');
      
      // Загружаем туры с полной информацией включая itinerary
      const { data, error } = await supabase
        .from('tours')
        .select(`
          *,
          tour_gallery (
            id, image_url, alt_text, caption, is_main, sort_order
          ),
          tour_itinerary (
            day_number, title, description, activities, meals_included, accommodation, sort_order
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      console.log('🔍 RAW DATA from DB:', data?.length, data?.map(t => ({ slug: t.slug, title: t.title })));
      
      const transformedTours: CMSTour[] = data?.map(tour => {
        const gallery = tour.tour_gallery?.sort((a, b) => a.sort_order - b.sort_order) || [];
        console.log(`🖼️ Gallery for ${tour.slug}:`, gallery.map(g => g.image_url));
        
        return {
          ...tour,
          gallery,
          itinerary: tour.tour_itinerary?.sort((a, b) => a.sort_order - b.sort_order) || []
        };
      }) || [];
      
      console.log('✅ Загружено туров:', transformedTours.length);
      console.log('📋 Слаги туров:', transformedTours.map(t => t.slug));
      console.log('🎯 Есть ли eleven-islands-mega:', transformedTours.find(t => t.slug === 'eleven-islands-mega')?.title);
      
      setTours(transformedTours);
    } catch (err) {
      console.error('❌ Ошибка загрузки туров:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const getTourBySlug = async (slug: string): Promise<CMSTour | null> => {
    try {
      console.log('Fetching tour by slug:', slug);
      const { data, error } = await supabase
        .from('tours')
        .select(`
          *,
          tour_gallery (
            id, image_url, alt_text, caption, is_main, sort_order
          ),
          tour_itinerary (
            day_number, title, description, activities, meals_included, accommodation
          )
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (!data) {
        console.log('No tour found for slug:', slug);
        return null;
      }

      console.log('Tour found:', data.title);
      return {
        ...data,
        gallery: data.tour_gallery || [],
        itinerary: data.tour_itinerary || []
      };
    } catch (err) {
      console.error('Error fetching tour:', err);
      return null;
    }
  };

  const searchTours = async (query: string): Promise<CMSTour[]> => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select(`
          *,
          tour_gallery (
            id, image_url, alt_text, caption, is_main, sort_order
          )
        `)
        .or(`title.ilike.%${query}%, tags.cs.{${query}}`)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data?.map(tour => ({
        ...tour,
        gallery: tour.tour_gallery || [],
        itinerary: []
      })) || [];
    } catch (err) {
      console.error('Error searching tours:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return {
    tours,
    loading,
    error,
    fetchTours,
    getTourBySlug,
    searchTours,
  };
};

export const useCMSBookings = () => {
  const createBooking = async (booking: {
    tour_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    booking_date: string;
    adults_count: number;
    children_count: number;
    total_price: number;
    currency: string;
    special_requests?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();

      if (error) throw error;
      
      return { data, error: null };
    } catch (err) {
      console.error('Error creating booking:', err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : 'Failed to create booking' 
      };
    }
  };

  const getBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          tours (title, slug)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error('Error fetching bookings:', err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : 'Failed to fetch bookings' 
      };
    }
  };

  return {
    createBooking,
    getBookings,
  };
};