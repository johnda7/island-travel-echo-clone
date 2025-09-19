import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { TOURS_REGISTRY } from '@/data/toursRegistry';

export const useAutoMenu = () => {
  const location = useLocation();
  const pathname = location.pathname;
  // Автоматически генерируем категории из существующих туров
  const categories = useMemo(() => {
    const allCategories = TOURS_REGISTRY
      .filter(tour => tour.isActive)
      .flatMap(tour => tour.category ? [tour.category] : []);
    
    const uniqueCategories = [...new Set(allCategories)];
    
    return uniqueCategories.map(category => ({
      name: getCategoryName(category),
      slug: category,
      count: TOURS_REGISTRY.filter(tour => 
        tour.isActive && tour.category === category
      ).length,
      href: `/tours?category=${category}`
    }));
  }, []);

  // Автоматически генерируем популярные теги
  const popularTags = useMemo(() => {
    const allTags = TOURS_REGISTRY
      .filter(tour => tour.isActive)
      .flatMap(tour => tour.tags || []);
    
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ 
        tag, 
        count,
        href: `/tours?tag=${encodeURIComponent(tag)}`
      }));
  }, []);

  // Создаем главное меню с подменю для туров
  const mainMenuItems = [
    { 
      name: "Туры", 
      href: "/tours",
      isActive: pathname.startsWith('/tours'),
      subItems: [
        { name: "Все туры", href: "/tours" },
        ...categories.map(category => ({
          name: category.name,
          href: `/tours?category=${encodeURIComponent(category.slug)}`
        }))
      ]
    },
    { 
      name: "О нас", 
      href: "/about",
      isActive: pathname === '/about'
    },
    { 
      name: "Контакты", 
      href: "/contact",
      isActive: pathname === '/contact'
    }
  ];

  return { 
    categories, 
    popularTags, 
    mainMenuItems 
  };
};

// Функция для человекочитаемых названий категорий
function getCategoryName(category: string): string {
  const categoryNames: Record<string, string> = {
    'islands': 'Острова',
    'mainland': 'Материк', 
    'adventure': 'Приключения',
    'cultural': 'Культурные',
    'diving': 'Дайвинг',
    'fishing': 'Рыбалка'
  };
  
  return categoryNames[category] || category;
}