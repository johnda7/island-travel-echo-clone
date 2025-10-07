// 🎯 ЦЕНТРАЛЬНЫЙ ХУК ДЛЯ WORDPRESS-ПОДОБНОЙ СИСТЕМЫ ТУРОВ
// Принцип: "Один источник правды для всех туров" - СТАТИЧЕСКИЕ + CMS
// 🔄 ГИБРИДНАЯ СИСТЕМА: Старые туры из файлов + Новые туры из CMS

import { useState, useEffect, useMemo } from 'react';
import { TOURS_REGISTRY, getToursByCategory, getToursByTag, searchTours } from '@/data/toursRegistry';
import { useCMSTours, CMSTour } from '@/hooks/useCMSTours';
import type { TourData } from '@/types/Tour';

export interface TourWithMeta {
  id: string;
  name: string;
  category: string;
  tags: string[];
  isPopular: boolean;
  isFeatured: boolean;
  priority: number;
  data?: TourData;
}

export interface ToursState {
  // 📊 ДАННЫЕ
  allTours: TourWithMeta[];
  popularTours: TourWithMeta[];
  featuredTours: TourWithMeta[];
  
  // 🔍 ФИЛЬТРАЦИЯ
  filteredTours: TourWithMeta[];
  categories: string[];
  tags: string[];
  
  // 🔄 СОСТОЯНИЕ
  loading: boolean;
  selectedCategory: string;
  searchQuery: string;
}

export const useTours = () => {
  // 🔄 ГИБРИДНАЯ СИСТЕМА: Загружаем туры из CMS
  const { tours: cmsTours, loading: cmsLoading } = useCMSTours();
  
  const [state, setState] = useState<ToursState>({
    allTours: [],
    popularTours: [],
    featuredTours: [],
    filteredTours: [],
    categories: [],
    tags: [],
    loading: true,
    selectedCategory: 'all',
    searchQuery: ''
  });

  // 🎯 ЗАГРУЗКА ГИБРИДНЫХ ДАННЫХ: СТАТИЧЕСКИЕ + CMS
  useEffect(() => {
    const loadTours = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        
        // 📦 СТАТИЧЕСКИЕ ТУРЫ из файлов
        const staticToursWithMeta: TourWithMeta[] = await Promise.all(
          TOURS_REGISTRY
            .filter(tour => tour.isActive)
            .map(async (tour) => {
              try {
                const data = await tour.data();
                return {
                  id: tour.id,
                  name: tour.name,
                  category: tour.category,
                  tags: tour.tags,
                  isPopular: tour.isPopular,
                  isFeatured: tour.isFeatured,
                  priority: tour.priority,
                  data
                };
              } catch (error) {
                console.warn(`Failed to load static tour ${tour.id}:`, error);
                return {
                  id: tour.id,
                  name: tour.name,
                  category: tour.category,
                  tags: tour.tags,
                  isPopular: tour.isPopular,
                  isFeatured: tour.isFeatured,
                  priority: tour.priority
                };
              }
            })
        );

        // 🎯 CMS ТУРЫ из Supabase
        const cmsToursWithMeta: TourWithMeta[] = cmsTours.map((cmsTour: CMSTour, index: number) => ({
          id: cmsTour.slug,
          name: cmsTour.title,
          category: 'islands', // по умолчанию, можно расширить
          tags: cmsTour.tags || [],
          isPopular: cmsTour.is_featured || false,
          isFeatured: cmsTour.is_featured || false,
          priority: 100 + index, // CMS туры после статических
          data: {
            id: cmsTour.slug,
            route: `/tours/${cmsTour.slug}`,
            title: cmsTour.title,
            subtitle: cmsTour.subtitle,
            description: cmsTour.description,
            mainImage: cmsTour.gallery[0]?.image_url || '',
            gallery: cmsTour.gallery.map(g => g.image_url),
            priceAdult: cmsTour.price_adult,
            priceChild: cmsTour.price_child,
            currency: cmsTour.currency,
            duration: cmsTour.duration,
            groupSize: cmsTour.group_size,
            rating: 4.8,
            reviewsCount: 127,
            highlights: cmsTour.highlights || [],
            included: cmsTour.included || [],
            excluded: cmsTour.excluded || [],
            requirements: cmsTour.requirements || [],
            importantInfo: cmsTour.important_info || [],
            tags: cmsTour.tags || [],
            category: 'islands'
          } as TourData
        }));

        // 🔄 ОБЪЕДИНЕНИЕ ВСЕХ ТУРОВ - СТАТИЧЕСКИЕ ИМЕЮТ ПРИОРИТЕТ НАД CMS
        const cmsIds = new Set(cmsToursWithMeta.map(tour => tour.id));
        const filteredStaticTours = staticToursWithMeta; // Берем все статические туры
        const filteredCmsTours = cmsToursWithMeta.filter(tour => !staticToursWithMeta.some(st => st.id === tour.id)); // CMS туры только если нет статических
        const allToursWithMeta = [...filteredStaticTours, ...filteredCmsTours];

        // Сортировка по приоритету
        allToursWithMeta.sort((a, b) => a.priority - b.priority);

        const categories = Array.from(new Set(allToursWithMeta.map(t => t.category)));
        const tags = Array.from(new Set(allToursWithMeta.flatMap(t => t.tags)));

        setState(prev => ({
          ...prev,
          allTours: allToursWithMeta,
          popularTours: allToursWithMeta.filter(t => t.isPopular),
          featuredTours: allToursWithMeta.filter(t => t.isFeatured),
          filteredTours: allToursWithMeta,
          categories,
          tags,
          loading: false
        }));
      } catch (error) {
        console.error('Failed to load tours:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    // Загружаем только когда CMS данные готовы
    if (!cmsLoading) {
      loadTours();
    }
  }, [cmsLoading, cmsTours]);

  // 🔍 ФИЛЬТРАЦИЯ ПО КАТЕГОРИИ И ПОИСКУ
  const filteredTours = useMemo(() => {
    let filtered = state.allTours;

    // Фильтр по категории
    if (state.selectedCategory && state.selectedCategory !== 'all') {
      filtered = filtered.filter(tour => 
        tour.category === state.selectedCategory ||
        tour.tags.includes(state.selectedCategory)
      );
    }

    // Поиск
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(tour =>
        tour.name.toLowerCase().includes(query) ||
        tour.tags.some(tag => tag.toLowerCase().includes(query)) ||
        tour.data?.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [state.allTours, state.selectedCategory, state.searchQuery]);

  // 🔄 МЕТОДЫ УПРАВЛЕНИЯ
  const setCategory = (category: string) => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  };

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const getTourById = (id: string) => {
    return state.allTours.find(tour => tour.id === id);
  };

  const getToursByTag = (tag: string) => {
    return state.allTours.filter(tour => tour.tags.includes(tag));
  };

  return {
    ...state,
    filteredTours,
    
    // Методы
    setCategory,
    setSearchQuery,
    getTourById,
    getToursByTag,
    
    // Удобные флаги
    hasResults: filteredTours.length > 0,
    totalCount: state.allTours.length,
    filteredCount: filteredTours.length
  };
};