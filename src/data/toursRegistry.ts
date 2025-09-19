// 🚨 ЦЕНТРАЛЬНЫЙ РЕЕСТР ВСЕХ ТУРОВ - СЕРДЦЕ WORDPRESS-АРХИТЕКТУРЫ!
// 🎯 ПРИНЦИП: "ДОБАВИЛ СЮДА - ПОЯВИЛОСЬ ВЕЗДЕ АВТОМАТИЧЕСКИ!"

import { phiPhiTourData } from './phiPhiTour';
import { pearlsAndamanSeaTourData } from './pearlsTour';
import type { TourData } from '@/types/Tour';

export interface TourRegistryItem {
  // 🆔 ОСНОВНАЯ ИНФОРМАЦИЯ
  id: string;
  name: string;
  
  // 🏷️ КАТЕГОРИЗАЦИЯ
  category: 'islands' | 'mainland' | 'adventure' | 'cultural' | 'diving' | 'fishing';
  tags: string[];
  
  // 🎯 УПРАВЛЕНИЕ ОТОБРАЖЕНИЕМ
  isPopular: boolean;    // показывать в "Популярные туры"
  isActive: boolean;     // показывать в поиске и меню
  isFeatured: boolean;   // показывать на главной
  priority: number;      // порядок сортировки в меню
  
  // 📊 ДАННЫЕ
  data: () => Promise<TourData>;
}

// 🎯 ГЛАВНЫЙ РЕЕСТР ВСЕХ ТУРОВ САЙТА
export const TOURS_REGISTRY: TourRegistryItem[] = [
  {
    id: 'phi-phi-2days',
    name: 'Пхи-Пхи 2 дня/1 ночь',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'снорклинг', 'пляж', '2 дня', 'семейный', 'многодневные'],
    isPopular: true,     // ✅ будет в популярных турах
    isActive: true,      // ✅ будет в поиске и меню
    isFeatured: true,    // ✅ будет на главной
    priority: 1,         // 🥇 первый в списке
    data: () => Promise.resolve(phiPhiTourData)
  },

  // 🧪 НОВЫЙ ТУР - ТЕПЕРЬ АКТИВЕН!
  {
    id: 'pearls-andaman-sea',
    name: '4 жемчужины Андаманского моря',
    category: 'islands',
    tags: ['море', 'морские', 'острова', '2 дня', 'многодневные', 'джеймс бонд', 'краби', 'комбо'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН - показывается в поиске/меню
    isFeatured: false,   // ❌ не на главной (пока)
    priority: 2,         // 🥈 второй приоритет
    data: () => Promise.resolve(pearlsAndamanSeaTourData)
  },
  
  // ➕ ДОБАВЛЯЯ СЮДА НОВЫЙ ТУР - ОН АВТОМАТИЧЕСКИ ПОЯВЛЯЕТСЯ:
  //   ✅ В популярных турах на главной
  //   ✅ В поиске по сайту
  //   ✅ В категориях (морские/сухопутные)
  //   ✅ В навигационном меню
  //   ✅ В фильтрах по тегам
  //   ✅ В SEO мета-тегах
  
  // 💡 ПРИМЕР НОВОГО ТУРА:
  // {
  //   id: 'james-bond',
  //   name: 'Залив Джеймса Бонда',
  //   category: 'islands',
  //   tags: ['море', 'острова', 'каяки', 'пещеры'],
  //   isPopular: true,
  //   isActive: true,
  //   isFeatured: false,
  //   priority: 2,
  //   data: () => import('./jamesBondTour').then(m => m.jamesBondTourData)
  // },
];

// 🔄 АВТОМАТИЧЕСКИЕ КОЛЛЕКЦИИ (генерируются из реестра):
export const getPopularTours = () => 
  TOURS_REGISTRY.filter(t => t.isPopular && t.isActive);

export const getFeaturedTours = () => 
  TOURS_REGISTRY.filter(t => t.isFeatured && t.isActive);

export const getIslandTours = () => 
  TOURS_REGISTRY.filter(t => t.category === 'islands' && t.isActive);

export const getMainlandTours = () => 
  TOURS_REGISTRY.filter(t => t.category === 'mainland' && t.isActive);

export const getActiveTours = () => 
  TOURS_REGISTRY.filter(t => t.isActive);

export const getToursByCategory = (category: string) =>
  TOURS_REGISTRY.filter(t => t.category === category && t.isActive);

export const getToursByTag = (tag: string) =>
  TOURS_REGISTRY.filter(t => t.tags.includes(tag) && t.isActive);

export const searchTours = (query: string) =>
  TOURS_REGISTRY.filter(t => 
    t.isActive && (
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
  );

// 🎯 ПОЛУЧИТЬ ТУР ПО ID
export const getTourById = (id: string) => 
  TOURS_REGISTRY.find(t => t.id === id);

// 🏷️ ПРЕДОПРЕДЕЛЕННЫЕ КАТЕГОРИИ
export const TOUR_CATEGORIES = {
  'islands': 'Туры на острова',
  'mainland': 'Материковые туры', 
  'adventure': 'Приключенческие туры',
  'cultural': 'Культурные туры',
  'diving': 'Дайвинг туры',
  'fishing': 'Рыбалка'
} as const;

// 🏷️ ПРЕДОПРЕДЕЛЕННЫЕ ТЕГИ
export const TOUR_TAGS = {
  location: ['море', 'горы', 'джунгли', 'пляж', 'острова', 'лагуны'],
  activity: ['снорклинг', 'дайвинг', 'треккинг', 'каяки', 'рафтинг', 'рыбалка'],
  duration: ['полдня', 'целый день', '2 дня', 'многодневный'],
  difficulty: ['легкий', 'средний', 'сложный'],
  audience: ['семейный', 'романтический', 'экстрим', 'спокойный', 'VIP'],
  transport: ['speedboat', 'longtail', 'катамаран', 'автобус', 'джип']
} as const;