// 🚀 АВТОМАТИЧЕСКИЕ МАРШРУТЫ ИЗ TOURS_REGISTRY
// 🎯 ПРИНЦИП WORDPRESS: "ДОБАВИЛ ТУР → МАРШРУТ СОЗДАЛСЯ САМ!"

import { useMemo } from 'react';
import { TOURS_REGISTRY } from '@/data/toursRegistry';

// Динамические импорты компонентов туров
const TOUR_COMPONENTS = {
  'phi-phi-2days': () => import('../tours/phi-phi-2days').then(m => m.PhiPhiTourPage),
  'pearls-andaman-sea': () => import('../tours/pearls-andaman-sea').then(m => m.PearlsAndamanSeaPage),
  // 🎯 Новые туры добавляются ТОЛЬКО ЗДЕСЬ!
} as const;

export interface AutoRoute {
  path: string;
  component: React.ComponentType;
  tourId: string;
  name: string;
  isActive: boolean;
}

export const useAutoRoutes = () => {
  const routes = useMemo(() => {
    return TOURS_REGISTRY
      .filter(tour => tour.isActive) // Только активные туры
      .map(tour => ({
        path: `/${tour.id}`,
        tourId: tour.id,
        name: tour.name,
        isActive: tour.isActive,
        // Ленивая загрузка компонента
        component: TOUR_COMPONENTS[tour.id as keyof typeof TOUR_COMPONENTS]
      }))
      .filter(route => route.component); // Только если компонент найден
  }, []);

  // Все активные пути туров
  const tourPaths = routes.map(route => route.path);
  
  // Все доступные туры для роутинга
  const availableTours = routes.map(route => ({
    id: route.tourId,
    path: route.path,
    name: route.name
  }));

  return {
    routes,
    tourPaths,
    availableTours
  };
};