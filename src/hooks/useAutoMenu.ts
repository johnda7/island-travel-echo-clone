import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { TOURS_REGISTRY } from '@/data/toursRegistry';

export const useAutoMenu = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Получаем активные туры для анализа
  const activeTours = useMemo(() => 
    TOURS_REGISTRY.filter(tour => tour.isActive), []
  );

  // Автоматически генерируем категории из существующих туров
  const categories = useMemo(() => {
    const allCategories = activeTours.flatMap(tour => 
      tour.category ? [tour.category] : []
    );
    
    const uniqueCategories = [...new Set(allCategories)];
    
    return uniqueCategories.map(category => ({
      name: getCategoryName(category),
      slug: category,
      count: activeTours.filter(tour => tour.category === category).length,
      href: `/tours?category=${category}`
    }));
  }, [activeTours]);

  // Автоматически генерируем популярные теги
  const popularTags = useMemo(() => {
    const allTags = activeTours.flatMap(tour => tour.tags || []);
    
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 12)
      .map(([tag, count]) => ({ 
        tag, 
        count,
        href: `/tours?tag=${encodeURIComponent(tag)}`
      }));
  }, [activeTours]);

  // 🎯 СПЕЦИАЛЬНЫЕ КОЛЛЕКЦИИ НА БАЗЕ РЕАЛЬНЫХ ТУРОВ (все 22 тура включены!)
  const tourCollections = useMemo(() => {
    const collections = {
      // 🆕 Для новичков на Пхукете (3 тура) - легкие и не очень длинные
      beginners: activeTours.filter(tour => 
        ['dostoprimechatelnosti-phuketa', 'phi-phi-2days', 'james-bond-island-phang-nga'].includes(tour.id)
      ),
      
      // 👨‍👩‍👧‍👦 Семейные туры (безопасные, подходящие детям)
      family: activeTours.filter(tour => 
        ['dostoprimechatelnosti-phuketa', 'phi-phi-2days', 'pearls-andaman-sea', 'james-bond-island-phang-nga', 'racha-coral-islands-speedboat', 'kao-lak-safari-1-day', 'phang-nga-skywalk'].includes(tour.id)
      ),
      
      // 🏃‍♂️ Активные туры (все adventure категории)  
      active: activeTours.filter(tour => 
        ['rafting-spa-atv-1-day', 'kao-lak-safari-1-day', 'avatar-plus-hangdong', 'phang-nga-skywalk', 'cheow-lan-lake'].includes(tour.id)
      ),
      
      // ⭐ Премиум туры (повышенный комфорт)
      premium: activeTours.filter(tour => 
        ['eleven-islands-mega', 'pearls-andaman-sea', 'phang-nga-skywalk'].includes(tour.id)
      ),
      
      // 🌙 Многодневные туры (с ночевкой)
      multiday: activeTours.filter(tour => 
        ['phi-phi-2days', 'pearls-andaman-sea'].includes(tour.id)
      ),
      
      // 🏝️ Морские туры (все острова)
      islands: activeTours.filter(tour => 
        tour.category === 'islands'
      ),
      
      // 🌿 Природа и приключения (джунгли, водопады, горы)
      nature: activeTours.filter(tour => 
        tour.category === 'adventure'
      ),
      
      // 🏛️ Культурные туры
      cultural: activeTours.filter(tour => 
        tour.category === 'cultural'
      )
    };

    return collections;
  }, [activeTours]);

  // 🎯 СОЗДАЕМ ГЛАВНОЕ МЕНЮ НА БАЗЕ РЕАЛЬНЫХ ТУРОВ (iOS 26 Design)
  const mainMenuItems = useMemo(() => [
    { 
      name: "🏝️ Морские туры", 
      href: "/tours?category=islands",
      description: `${tourCollections.islands.length} туров по островам Андаманского моря`,
      subItems: [
        { 
          name: "🌊 Все морские туры", 
          href: "/tours?category=islands",
          count: tourCollections.islands.length,
          description: "Острова, пляжи, снорклинг"
        },
        { 
          name: "🏖️ Пхи-Пхи острова", 
          href: "/tours?tag=пхи-пхи",
          count: activeTours.filter(t => t.tags.includes('пхи-пхи')).length,
          description: "Легендарные острова из фильмов"
        },
        { 
          name: "🎬 Джеймс Бонд", 
          href: "/tours?tag=джеймс бонд",
          count: activeTours.filter(t => t.tags.includes('джеймс бонд')).length,
          description: "Знаменитая скала из фильма 007"
        },
        { 
          name: "🐠 Рача и Корал", 
          href: "/tours?tag=рача",
          count: activeTours.filter(t => t.tags.includes('рача')).length,
          description: "Снорклинг и водные развлечения"
        },
        { 
          name: "💎 Премиум туры", 
          href: "/tours?collection=premium",
          count: tourCollections.premium.length,
          description: "Повышенный комфорт и сервис"
        },
        { 
          name: "🌙 Многодневные", 
          href: "/tours?collection=multiday",
          count: tourCollections.multiday.length,
          description: "С ночевкой на островах"
        }
      ]
    },
    {
      name: "🎯 Приключения",
      href: "/tours?category=adventure", 
      description: `${tourCollections.nature.length} приключенческих туров`,
      subItems: [
        { 
          name: "⚡ Все активные туры", 
          href: "/tours?category=adventure",
          count: tourCollections.nature.length,
          description: "Джунгли, горы, водопады"
        },
        { 
          name: "🚣 Рафтинг + SPA + ATV", 
          href: "/tours?tag=рафтинг",
          count: activeTours.filter(t => t.tags.includes('рафтинг')).length,
          description: "Сплав по реке и квадроциклы"
        },
        { 
          name: "🦁 Као Лак Сафари", 
          href: "/tours?tag=сафари",
          count: activeTours.filter(t => t.tags.includes('сафари')).length,
          description: "Джунгли, водопады, слоны"
        },
        { 
          name: "🌿 Аватар + Хангдонг", 
          href: "/tours?tag=аватар",
          count: activeTours.filter(t => t.tags.includes('аватар')).length,
          description: "Зиплайн и горячие источники"
        },
        { 
          name: "🌉 Пхангнга + Стеклянный мост", 
          href: "/tours?tag=стеклянный мост",
          count: activeTours.filter(t => t.tags.includes('стеклянный мост')).length,
          description: "Храмы и смотровая площадка"
        },
        { 
          name: "🏞️ Чео Лан озеро", 
          href: "/tours?tag=чео лан",
          count: activeTours.filter(t => t.tags.includes('чео лан')).length,
          description: "Национальный парк Као Сок"
        }
      ]
    },
    {
      name: "🏛️ Культурные туры", 
      href: "/tours?category=cultural",
      description: `${activeTours.filter(t => t.category === 'cultural').length} обзорный тур`,
      subItems: [
        { 
          name: "🗺️ Достопримечательности Пхукета", 
          href: "/tours/dostoprimechatelnosti-phuketa",
          count: 1,
          description: "Обзорная экскурсия без шопинга"
        },
        { 
          name: "🛕 Храмы и святыни", 
          href: "/tours?tag=храмы",
          count: activeTours.filter(t => t.tags.includes('храмы')).length,
          description: "Большой Будда, Ват Чалонг"
        },
        { 
          name: "🗿 Большой Будда", 
          href: "/tours?tag=большой будда",
          count: activeTours.filter(t => t.tags.includes('большой будда')).length,
          description: "45-метровая статуя с видом на остров"
        },
        { 
          name: "🏘️ Старый город", 
          href: "/tours?tag=старый город",
          count: activeTours.filter(t => t.tags.includes('старый город')).length,
          description: "Сино-португальская архитектура"
        }
      ]
    },
    {
      name: "� Подборки",
      href: "/collections",
      description: "Туры для разных путешественников",
      subItems: [
        { 
          name: "✨ Для новичков", 
          href: "/tours?collection=beginners",
          count: tourCollections.beginners.length,
          description: "Первый раз на Пхукете?"
        },
        { 
          name: "👨‍👩‍👧‍👦 Семейные туры", 
          href: "/tours?collection=family",
          count: tourCollections.family.length,
          description: "Безопасные и интересные детям" 
        },
        { 
          name: "🏃 Активный отдых", 
          href: "/tours?collection=active",
          count: tourCollections.active.length,
          description: "Для любителей адреналина"
        },
        { 
          name: "💎 Премиум класс", 
          href: "/tours?collection=premium",
          count: tourCollections.premium.length,
          description: "Максимальный комфорт"
        },
        { 
          name: "🌙 Многодневные", 
          href: "/tours?collection=multiday",
          count: tourCollections.multiday.length,
          description: "Туры с ночевкой"
        }
      ]
    },
    {
      name: "ℹ️ Информация",
      href: "/info",
      description: "Всё о бронировании и оплате",
      subItems: [
        { 
          name: "💬 Частые вопросы", 
          href: "/help/faq",
          description: "Ответы на популярные вопросы"
        },
        { 
          name: "� Как забронировать", 
          href: "/help/booking",
          description: "Простая инструкция по бронированию"
        },
        { 
          name: "💳 Оплата и возврат", 
          href: "/help/payment",
          description: "Способы оплаты и условия возврата"
        },
        { 
          name: "⭐ Отзывы", 
          href: "/reviews",
          description: "Отзывы наших клиентов"
        },
        { 
          name: "📞 Контакты", 
          href: "/help/contacts",
          description: "Как с нами связаться"
        },
        { 
          name: "🏢 О компании", 
          href: "/about",
          description: "Наша история и команда"
        }
      ]
    }
  ], [activeTours, tourCollections]);

  return { 
    categories, 
    popularTags, 
    mainMenuItems,
    tourCollections,
    activeTours
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