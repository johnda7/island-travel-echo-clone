// 🚨🚨🚨 КРИТИЧЕСКАЯ ЗАЩИТА - ОСТОРОЖНО С ИЗМЕНЕНИЯМИ! 🚨🚨🚨
// 🔒 ЭТОТ ФАЙЛ СОДЕРЖИТ ССЫЛКИ НА ВСЕ ЗАЩИЩЕННЫЕ ТУРЫ
// ❌ ЗАПРЕЩЕНО: удалять существующие туры (phi-phi-2days, pearls-andaman-sea, dostoprimechatelnosti-phuketa)
// ❌ ЗАПРЕЩЕНО: менять ID существующих туров - поломаются все ссылки!
// ✅ РАЗРЕШЕНО: добавлять новые туры в конец списка
// 🚨 ПРИ ИЗМЕНЕНИИ СУЩЕСТВУЮЩИХ ТУРОВ - СПРОСИТЬ ПОЛЬЗОВАТЕЛЯ!
//
// 🚨 ЦЕНТРАЛЬНЫЙ РЕЕСТР ВСЕХ ТУРОВ - СЕРДЦЕ WORDPRESS-АРХИТЕКТУРЫ!
// ВНИМАНИЕ: Любые изменения здесь отражаются во всем сайте. Добавляя/меняя тур,
// убедитесь, что поля корректны. Не удаляйте существующие ID без миграции ссылок.
// 🎯 ПРИНЦИП: "ДОБАВИЛ СЮДА - ПОЯВИЛОСЬ ВЕЗДЕ АВТОМАТИЧЕСКИ!"

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
    isPopular: true,
    isActive: true,
    isFeatured: true,
    priority: 1,
    data: () => import('./tours/phi-phi-2days').then(m => m.phiPhi2DaysTourData)
  },

  // 🧪 НОВЫЙ ТУР - ТЕПЕРЬ АКТИВЕН!
  {
    id: 'pearls-andaman-sea',
    name: 'Жемчужины Андаманского моря',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'снорклинг', 'пляж', 'семейный', 'бамбу', 'кай', 'пхи-пхи'],
    isPopular: true,
    isActive: true,
    isFeatured: true,
    priority: 2,
    data: () => import('./tours/pearls-andaman-sea').then(m => m.pearlsAndamanSeaTourData)
  },

  // 🏛️ ДОСТОПРИМЕЧАТЕЛЬНОСТИ ПХУКЕТА
    {
    id: 'dostoprimechatelnosti-phuketa',
    name: 'Достопримечательности Пхукета',
    category: 'adventure',
    tags: ['пхукет', 'достопримечательности', 'обзорная', 'биг-будда', 'ват-чалонг', 'панорамная', 'культура', 'храмы', '1 день'],
    isPopular: false,
    isActive: true,
    isFeatured: false,
    priority: 3,
    data: () => import('./tours/dostoprimechatelnosti-phuketa').then(m => m.dostoprimechatelnostiPhuketaTourData)
  },
  
  // 🚀 НОВЫЕ 6 ТУРОВ - ПОЛНАЯ КОЛЛЕКЦИЯ!
  
  // 5. Рафтинг + SPA + ATV (1 день)
  {
    id: 'rafting-spa-atv-1-day',
    name: 'Рафтинг + СПА + ATV 1 день',
    category: 'adventure',
    tags: ['рафтинг', 'спа', 'atv', 'квадроциклы', 'приключения', 'экстрим', 'природа', 'активный', '1 день'],
    isPopular: false,
    isActive: true,
    isFeatured: false,
    priority: 4,
    data: () => import('./tours/rafting-spa-atv').then(m => m.raftingSpaAtvTourData)
  },

  // 6. Као Лак Сафари (1 день)
  {
    id: 'kao-lak-safari-1-day',
    name: 'Као Лак Сафари 1 день',
    category: 'adventure',
    tags: ['као-лак', 'сафари', 'слоны', 'джунгли', 'каноэ', 'черепахи', 'природа', 'приключения', '1 день'],
    isPopular: false,
    isActive: true,
    isFeatured: false,
    priority: 5,
    data: () => import('./tours/kao-lak-safari').then(m => m.kaoLakSafariTourData)
  },


  // 7. 11 ОСТРОВОВ МЕГА-ТУР (Джеймс Бонд + Хонг + Пхи-Пхи)
  {
    id: 'eleven-islands-mega',
    name: '11 островов + МЕГА спидбот',
    category: 'islands',
    tags: ['море', 'морские', 'острова', 'спидбот', 'снорклинг', 'пхи-пхи', 'бамбу', 'майя-бей', 'экстрим', '1 день'],
    isPopular: false,
    isActive: true,
    isFeatured: false,
    priority: 6,
    data: () => import('./tours/eleven-islands-mega').then(m => m.elevenIslandsMegaTourData)
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
    data: () => import('./tours/james-bond-island').then(m => m.jamesBondIslandTourData)
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
    data: () => import('./tours/racha-coral-islands').then(m => m.rachaCoralIslandsTourData)
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
    data: () => import('./tours/phang-nga-skywalk').then(m => m.phangNgaSkywalkTourData)
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
    data: () => import('./tours/cheow-lan-lake').then(m => m.cheoLanLakeTourData)
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