// 🚨🚨🚨 КРИТИЧЕСКАЯ ЗАЩИТА - ОСТОРОЖНО С ИЗМЕНЕНИЯМИ! 🚨🚨🚨
// 🔒 ЭТОТ ФАЙЛ СОДЕРЖИТ ССЫЛКИ НА ВСЕ ЗАЩИЩЕННЫЕ ТУРЫ
// ❌ ЗАПРЕЩЕНО: менять ID существующих туров - поломаются все ссылки!
// ✅ РАЗРЕШЕНО: добавлять новые туры в конец списка
// 🚨 ПРИ ИЗМЕНЕНИИ СУЩЕСТВУЮЩИХ ТУРОВ - СПРОСИТЬ ПОЛЬЗОВАТЕЛЯ!
//
// 🚨 ЦЕНТРАЛЬНЫЙ РЕЕСТР ВСЕХ ТУРОВ - СЕРДЦЕ WORDPRESS-АРХИТЕКТУРЫ!
// ВНИМАНИЕ: Любые изменения здесь отражаются во всем сайте. Добавляя/меняя тур,
// убедитесь, что поля корректны. Не удаляйте существующие ID без миграции ссылок.
// 🎯 ПРИНЦИП: "ДОБАВИЛ СЮДА - ПОЯВИЛОСЬ ВЕЗДЕ АВТОМАТИЧЕСКИ!"

import { phiPhi2DaysTourData } from './tours/phi-phi-2days';
import { pearlsAndamanSeaTourData } from './tours/pearls-andaman-sea';
import { dostoprimechatelnostiPhuketaTourData } from './tours/dostoprimechatelnosti-phuketa';
// НОВЫЕ 6 ТУРОВ

import { jamesBondIslandTourData } from './tours/james-bond-island';
import { elevenIslandsMegaTourData } from './tours/eleven-islands-mega';
import { raftingSpaAtvTourData } from './tours/rafting-spa-atv';
import { kaoLakSafariTourData } from './tours/kao-lak-safari';
import { rachaCoralIslandsTourData } from './tours/racha-coral-islands';
import { phangNgaSkywalkTourData } from './tours/phang-nga-skywalk';
import { cheoLanLakeTourData } from './tours/cheow-lan-lake';
import { similanIslandsTourData } from './tours/similan-islands';
import { similanIslandsEarlyTourData } from './tours/similan-islands-early';
import { similanIslandsSpeedboatTourData } from './tours/similan-islands-speedboat';
import { fishingSunriseTourData } from './tours/fishing-sunrise';
import { rachaCoralSunriseTourData } from './tours/racha-coral-sunrise';
import { rachaCoralRawaiTourData } from './tours/racha-coral-rawai';
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
    tags: ['море', 'морские', 'острова', 'снорклинг', 'пляж', '2 дня', 'семейный', 'многодневные', 'пхи-пхи', 'ночевка'],
    isPopular: true,     // ✅ будет в популярных турах
    isActive: true,      // ✅ будет в поиске и меню
    isFeatured: true,    // ✅ будет на главной
    priority: 1,         // 🥇 первый в списке
    data: () => Promise.resolve(phiPhi2DaysTourData)
  },

  // 🧪 НОВЫЙ ТУР - ТЕПЕРЬ АКТИВЕН!
  {
    id: 'pearls-andaman-sea',
    name: '4 жемчужины Андаманского моря',
    category: 'islands',
    tags: ['море', 'морские', 'острова', '2 дня', 'многодневные', 'джеймс бонд', 'краби', 'комбо', 'пхи-пхи', 'ночевка', 'премиум'],
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


  // 7. 11 ОСТРОВОВ МЕГА-ТУР (Джеймс Бонд + Хонг + Пхи-Пхи)
  {
    id: 'eleven-islands-mega',
    name: '11 ОСТРОВОВ МЕГА-ТУР',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'джеймс бонд', 'пхи-пхи', 'хонг', 'майя бэй', 'снорклинг', 'каякинг', '1 день', 'мега', 'комбо', 'премиум'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: true,    // ✅ показываем на главной (МЕГА ТУР!)
    priority: 7,
    data: () => Promise.resolve(elevenIslandsMegaTourData)
  },

  // 8. Остров Джеймса Бонда (залив Пханг Нга)
  {
    id: 'james-bond-island-phang-nga',
    name: 'Остров Джеймса Бонда (залив Пханг Нга)',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'джеймс бонд', 'пханг нга', 'каякинг', 'пещеры', 'плавучая деревня', 'лонгтейл', '1 день'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: true,    // ✅ показываем на главной (популярный тур!)
    priority: 8,
    data: () => Promise.resolve(jamesBondIslandTourData)
  },

  // 9. Аватар Плюс + Хангдонг
  {
    id: 'avatar-plus-hangdong',
    name: 'Аватар Плюс + Хангдонг',
    category: 'adventure',
    tags: ['аватар', 'зиплайн', 'слоны', 'каноэ', 'горы', 'хангдонг', 'приключения', 'природа', 'джунгли', 'экстрим', '1 день'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: false,   // ❌ не на главной (пока)
    priority: 9,
    data: () => import('./tours/avatar-plus-hangdong').then(m => m.avatarPlusHangdongTour)
  },

  // 10. Острова Рача и Корал на спидботе
  {
    id: 'racha-coral-islands-speedboat',
    name: 'Острова Рача и Корал на спидботе',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'рача', 'корал', 'спидбот', 'пляжи', 'снорклинг', 'парасейлинг', 'белый песок', '1 день'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: false,   // ❌ не на главной (пока)
    priority: 12,
    data: () => Promise.resolve(rachaCoralIslandsTourData)
  },

  // 13. Удивительная Пхангнга + Стеклянный мост (НОВЫЙ!)
  {
    id: 'phang-nga-skywalk',
    name: 'УДИВИТЕЛЬНАЯ ПХАНГНГА + СТЕКЛЯННЫЙ МОСТ',
    category: 'adventure',
    tags: ['пхангнга', 'стеклянный мост', 'природа', 'храмы', 'слоны', 'spa', 'морские цыгане', 'водопад', 'активный', 'культурный', 'комбо', 'skywalk', '1 день'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: true,    // ✅ показываем на главной (уникальный тур!)
    priority: 13,
    data: () => Promise.resolve(phangNgaSkywalkTourData)
  },
  
  {
    id: 'cheow-lan-lake',
    name: 'Чео Лан + Самет Нангше',
    category: 'adventure',
    tags: ['озеро', 'чео лан', 'природа', 'смотровая', 'самет нангше', 'джунгли', 'храм', 'банг тонг', '1 день', 'сафари', 'као сок', 'гуйлинь', 'национальный парк'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: true,    // ✅ показываем на главной (уникальное озеро!)
    priority: 14,
    data: () => Promise.resolve(cheoLanLakeTourData)
  },

  // 15. СИМИЛАНСКИЕ ОСТРОВА (НОВЫЙ!)
  {
    id: 'similan-islands',
    name: 'Симиланские острова',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'симиланы', 'снорклинг', 'пляжи', 'национальный парк', 'подводный мир', 'кораллы', 'белый песок', 'тропики', 'большая лодка', '1 день', 'премиум'],
    isPopular: true,     // ✅ показываем в популярных (топ направление!)
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: true,    // ✅ показываем на главной (мировая достопримечательность!)
    priority: 15,
    data: () => Promise.resolve(similanIslandsTourData)
  },

  // 16. СИМИЛАНСКИЕ ОСТРОВА РАННИЙ ВЫЕЗД (НОВЫЙ!)
  {
    id: 'similan-islands-early',
    name: 'Симиланские острова Ранний выезд',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'симиланы', 'ранний-выезд', 'снорклинг', 'без-толп', 'комфорт+', 'wi-fi', 'премиум', 'малая группа', 'спидбот', '1 день', 'рассвет'],
    isPopular: true,     // ✅ показываем в популярных (VIP вариант!)
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: true,    // ✅ показываем на главной (уникальное предложение!)
    priority: 16,
    data: () => Promise.resolve(similanIslandsEarlyTourData)
  },

  // 17. СИМИЛАНСКИЕ ОСТРОВА НА СПИДБОТЕ (НОВЫЙ!)
  {
    id: 'similan-islands-speedboat',
    name: 'Симиланские острова на спидботе',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'симиланы', 'спидбот', 'снорклинг', 'черепахи', 'sail-rock', 'быстро', 'малая группа', '1 день', 'активный отдых'],
    isPopular: true,     // ✅ показываем в популярных
    isActive: true,      // ✅ АКТИВИРОВАН
    isFeatured: true,    // ✅ показываем на главной
    priority: 17,
    data: () => Promise.resolve(similanIslandsSpeedboatTourData)
  },

  // 18. МОРСКАЯ РЫБАЛКА НА РАССВЕТЕ (НОВЫЙ!)
  {
    id: 'fishing-sunrise',
    name: 'Морская рыбалка на рассвете',
    category: 'adventure',
    tags: ['рыбалка', 'море', 'троллинг', 'крабы', 'подводная-охота', 'рассвет', 'comfort+', 'активный отдых', '1 день', 'снорклинг', 'остров-рача'],
    isPopular: true,
    isActive: true,
    isFeatured: true,
    priority: 18,
    data: () => Promise.resolve(fishingSunriseTourData)
  },

  // 19. РАЧА ЯЙ + КОРАЛЛОВЫЙ ОСТРОВ НА РАССВЕТЕ (НОВЫЙ!)
  {
    id: 'racha-coral-sunrise',
    name: 'Рача Яй + Коралловый остров на рассвете',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'рача-яй', 'коралловый-остров', 'рассвет', 'рыбалка', 'снорклинг', 'comfort+', 'wi-fi', 'пляж', 'каякинг', 'паддлборд', '1 день', 'спидбот'],
    isPopular: true,
    isActive: true,
    isFeatured: true,
    priority: 19,
    data: () => Promise.resolve(rachaCoralSunriseTourData)
  },

  // 20. РАЧА + КОРАЛЛОВЫЙ ОСТРОВ С ПИРСА RAWAI (НОВЫЙ!)
  {
    id: 'racha-coral-rawai',
    name: 'Рача + Коралловый остров с пирса Rawai',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'рача', 'коралловый-остров', 'rawai', 'снорклинг', 'обед', 'шведский-стол', 'пляж', '1 день', 'стандарт'],
    isPopular: true,
    isActive: true,
    isFeatured: true,
    priority: 20,
    data: () => Promise.resolve(rachaCoralRawaiTourData)
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