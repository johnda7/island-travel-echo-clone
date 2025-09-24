// 🚨🚨🚨 КРИТИЧЕСКАЯ ЗАЩИТА - ОСТОРОЖНО С ИЗМЕНЕНИЯМИ! 🚨🚨🚨
// 🔒 ЭТОТ ФАЙЛ СОДЕРЖИТ ССЫЛКИ НА ВСЕ ЗАЩИЩЕННЫЕ ТУРЫ
// ❌ ЗАПРЕЩЕНО: удалять существующие туры (phi-phi-2days, pearls-andaman-sea, dostoprimechatelnosti-phuketa, rassvetnoe-prikljuchenie)
// ❌ ЗАПРЕЩЕНО: менять ID существующих туров - поломаются все ссылки!
// ✅ РАЗРЕШЕНО: добавлять новые туры в конец списка
// 🚨 ПРИ ИЗМЕНЕНИИ СУЩЕСТВУЮЩИХ ТУРОВ - СПРОСИТЬ ПОЛЬЗОВАТЕЛЯ!
//
// 🚨 ЦЕНТРАЛЬНЫЙ РЕЕСТР ВСЕХ ТУРОВ - СЕРДЦЕ WORDPRESS-АРХИТЕКТУРЫ!
// ВНИМАНИЕ: Любые изменения здесь отражаются во всем сайте. Добавляя/меняя тур,
// убедитесь, что поля корректны. Не удаляйте существующие ID без миграции ссылок.
// 🎯 ПРИНЦИП: "ДОБАВИЛ СЮДА - ПОЯВИЛОСЬ ВЕЗДЕ АВТОМАТИЧЕСКИ!"

import { phiPhiTourData } from '../data/phiPhiTour.ts';
import { pearlsAndamanSeaTourData } from '../data/pearlsTour.ts';
import { dostoprimechatelnostiPhuketaTourData } from '../data/dostoprimechatelnostiPhuketaTour.ts';
import { rassvetnoePrikljuchenieTourData } from '../data/rassvetnoePrikljuchenieTour.ts';
// НОВЫЕ 6 ТУРОВ

import { jamesBondIslandTourData } from '../data/jamesBondIslandTour.ts';
import { elevenIslandsStandardTourData } from '../data/elevenIslandsStandardTour.ts';
import { elevenIslandsMegaTourData } from '../data/elevenIslandsMegaTour.ts';
import { raftingSpaAtvTourData } from '../data/raftingSpaAtvTour.ts';
import { kaoLakSafariTourData } from '../data/kaoLakSafariTour.ts';
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

  // 🏛️ ДОСТОПРИМЕЧАТЕЛЬНОСТИ ПХУКЕТА
  {
    id: 'dostoprimechatelnosti-phuketa',
    name: 'Достопримечательности Пхукета',
    category: 'cultural',
    tags: ['культурные', 'достопримечательности', 'храмы', 'обзорные', '1 день', 'семейный', 'большой будда', 'старый город'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН - показывается в поиске/меню
    isFeatured: true,    // ✅ показываем на главной
    priority: 3,         // 🥉 третий приоритет
    data: () => Promise.resolve(dostoprimechatelnostiPhuketaTourData)
  },

  // 🌅 РАССВЕТНОЕ ПРИКЛЮЧЕНИЕ - 4-Й ТУР ВОССТАНОВЛЕН!
  {
    id: 'rassvetnoe-prikljuchenie',
    name: 'Рассветное приключение',
    category: 'adventure',
    tags: ['рассвет', 'приключения', 'джеймс бонд', 'стеклянный мост', 'beyond skywalk', '1 день', 'утро', 'эксклюзив'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН - показывается в поиске/меню
    isFeatured: true,    // ✅ показываем на главной
    priority: 4,         // 🎯 четвертый приоритет
    data: () => Promise.resolve(rassvetnoePrikljuchenieTourData)
  },
  
  // 🚀 НОВЫЕ 6 ТУРОВ - ПОЛНАЯ КОЛЛЕКЦИЯ!
  
  // 5. Рафтинг + SPA + ATV (1 день)
  {
    id: 'rafting-spa-atv-1-day',
    name: 'РАФТИНГ + СЛОНОВЬЕ СПА + ATV 1 день',
    category: 'adventure',
    tags: ['рафтинг', 'слоны', 'spa', 'atv', 'приключения', '1 день', 'активный', 'комбо'],
    isPopular: true,     // ✅ АКТИВИРОВАН - показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН - показывается в поиске/меню
    isFeatured: false,   // ❌ не на главной (пока)
    priority: 5,
    data: () => Promise.resolve(raftingSpaAtvTourData)
  },

  // 6. Као Лак Сафари (1 день)
  {
    id: 'kao-lak-safari-1-day',
    name: 'Као Лак Сафари (1 день)',
    category: 'adventure',
    tags: ['сафари', 'слоны', 'водопады', 'джунгли', '1 день', 'природа', 'као лак'],
    isPopular: true,     // ✅ АКТИВИРОВАН - показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН - показывается в поиске/меню
    isFeatured: false,   // ❌ не на главной (пока)
    priority: 6,
    data: () => Promise.resolve(kaoLakSafariTourData)
  },


  // 8. Остров Джеймса Бонда (залив Пханг Нга)
  {
    id: 'james-bond-island-phang-nga',
    name: 'Остров Джеймса Бонда (залив Пханг Нга)',
    category: 'islands',
    tags: ['джеймс бонд', 'пханг нга', 'каякинг', 'пещеры', 'плавучая деревня', 'лонгтейл', '1 день'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: true,    // ✅ показываем на главной (популярный тур!)
    priority: 8,
    data: () => Promise.resolve(jamesBondIslandTourData)
  },

  // 9. Аватар Плюс + Хангдонг - УДАЛЕН

  // 10. 11 островов Стандарт на спидботе
  {
    id: 'eleven-islands-standard-speedboat',
    name: '11 островов Стандарт на спидботе',
    category: 'islands',
    tags: ['11 островов', 'спидбот', 'хоппинг', 'снорклинг', 'пхи-пхи', 'бамбу', 'лагуны', '1 день'],
    isPopular: false,    // ❌ не в популярных (очень длинный тур)
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: false,   // ❌ не на главной
    priority: 10,
    data: () => Promise.resolve(elevenIslandsStandardTourData)
  },

  // 11. 11 островов МЕГА-ТУР (премиум версия)
  {
    id: 'eleven-islands-mega',
    name: '11 ОСТРОВОВ МЕГА-ТУР',
    category: 'islands',
    tags: ['мега-тур', '11 островов', 'джеймс бонд', 'пхи-пхи', 'хонг', 'премиум', 'комфорт+', '1 день'],
    isPopular: true,     // ✅ показываем в популярных (премиум версия!)
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: true,    // ✅ показываем на главной
    priority: 11,
    data: () => Promise.resolve(elevenIslandsMegaTourData)
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

// 🏷️ ФУНКЦИИ ДЛЯ РАБОТЫ С ТЕГАМИ - как в WordPress

/**
 * Получить все уникальные теги из всех туров
 */
export const getAllTags = (): string[] => {
  const allTags = new Set<string>();
  
  TOURS_REGISTRY.forEach(tour => {
    if (tour.isActive && tour.tags) {
      tour.tags.forEach(tag => allTags.add(tag));
    }
  });
  
  return Array.from(allTags).sort();
};

/**
 * Найти туры по тегу - как WordPress tag filtering
 */
export const getToursByTag = (tag: string): TourRegistryItem[] => {
  return TOURS_REGISTRY.filter(tour => 
    tour.isActive && 
    tour.tags.some(tourTag => 
      tourTag.toLowerCase().includes(tag.toLowerCase()) ||
      tag.toLowerCase().includes(tourTag.toLowerCase())
    )
  );
};

/**
 * Получить похожие туры по тегам
 */
export const getSimilarTours = (currentTourId: string, limit: number = 3): TourRegistryItem[] => {
  const currentTour = TOURS_REGISTRY.find(tour => tour.id === currentTourId);
  if (!currentTour || !currentTour.tags) return [];
  
  const similarTours = TOURS_REGISTRY
    .filter(tour => 
      tour.id !== currentTourId && 
      tour.isActive &&
      tour.tags.some(tag => currentTour.tags.includes(tag))
    )
    .sort((a, b) => {
      // Сортировка по количеству общих тегов
      const aCommonTags = a.tags.filter(tag => currentTour.tags.includes(tag)).length;
      const bCommonTags = b.tags.filter(tag => currentTour.tags.includes(tag)).length;
      return bCommonTags - aCommonTags;
    });
    
  return similarTours.slice(0, limit);
};

/**
 * Создать slug для тега - как в WordPress
 */
export const createTagSlug = (tag: string): string => {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};