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

  // 🎯 СПЕЦИАЛЬНЫЕ КОЛЛЕКЦИИ НА БАЗЕ РЕАЛЬНЫХ ТУРОВ (все 10 туров включены!)
  const tourCollections = useMemo(() => {
    const collections = {
      // 🆕 Для новичков на Пхукете (4 тура)
      beginners: activeTours.filter(tour => 
        ['dostoprimechatelnosti-phuketa', 'phi-phi-2days', 'james-bond-island-phang-nga', 'eleven-islands-mega'].includes(tour.id)
      ),
      
      // 👨‍👩‍👧‍👦 Семейные туры (7 туров - безопасные, подходящие детям)
      family: activeTours.filter(tour => 
        ['dostoprimechatelnosti-phuketa', 'phi-phi-2days', 'pearls-andaman-sea', 'james-bond-island-phang-nga', 'eleven-islands-standard-speedboat', 'kao-lak-safari-1-day', 'avatar-plus-hangdong'].includes(tour.id)
      ),
      
      // 🏃‍♂️ Активные туры (3 тура - все adventure категории)  
      active: activeTours.filter(tour => 
        ['rafting-spa-atv-1-day', 'kao-lak-safari-1-day', 'avatar-plus-hangdong'].includes(tour.id)
      ),
      
      // ⭐ Премиум туры (2 тура - повышенный комфорт)
      premium: activeTours.filter(tour => 
        ['eleven-islands-mega', 'pearls-andaman-sea'].includes(tour.id)
      ),
      
      // 🌙 Многодневные туры (2 тура - с ночевкой)
      multiday: activeTours.filter(tour => 
        ['phi-phi-2days', 'pearls-andaman-sea'].includes(tour.id)
      ),
      
      // ️ Морские туры (5 туров - все острова)
      islands: activeTours.filter(tour => 
        ['phi-phi-2days', 'pearls-andaman-sea', 'james-bond-island-phang-nga', 'eleven-islands-standard-speedboat', 'eleven-islands-mega'].includes(tour.id)
      ),
      
      // 🌿 Природа и материк (3 тура - джунгли, водопады, слоны)
      nature: activeTours.filter(tour => 
        ['kao-lak-safari-1-day', 'avatar-plus-hangdong', 'rafting-spa-atv-1-day'].includes(tour.id)
      ),
      
      // 🏛️ Культурные туры (1 тур)
      cultural: activeTours.filter(tour => 
        tour.id === 'dostoprimechatelnosti-phuketa'
      )
    };

    return collections;
  }, [activeTours]);

  // 🎯 СОЗДАЕМ ГЛАВНОЕ МЕНЮ НА БАЗЕ РЕАЛЬНЫХ ТУРОВ (как tisland.travel)
  const mainMenuItems = useMemo(() => [
    { 
      name: "🏝️ Морские туры", 
      href: "/tours?category=islands",
      description: `${tourCollections.islands.length} туров по островам`,
      subItems: [
        { 
          name: "Все морские туры", 
          href: "/tours?category=islands",
          count: tourCollections.islands.length 
        },
        { 
          name: "Пхи-Пхи острова", 
          href: "/tours?tag=пхи-пхи",
          count: activeTours.filter(t => t.tags.includes('пхи-пхи')).length 
        },
        { 
          name: "Джеймс Бонд", 
          href: "/tours?tag=джеймс бонд",
          count: activeTours.filter(t => t.tags.includes('джеймс бонд')).length 
        },
        { 
          name: "11 островов", 
          href: "/tours?tag=11 островов",
          count: activeTours.filter(t => t.tags.includes('11 островов')).length 
        },
        { 
          name: "Премиум туры", 
          href: "/tours?collection=premium",
          count: tourCollections.premium.length 
        },
        { 
          name: "Многодневные", 
          href: "/tours?collection=multiday",
          count: tourCollections.multiday.length 
        }
      ]
    },
    {
      name: "🎯 Активные туры",
      href: "/tours?category=adventure", 
      description: `${tourCollections.active.length} приключенческих туров`,
      subItems: [
        { 
          name: "Все активные туры", 
          href: "/tours?category=adventure",
          count: tourCollections.active.length 
        },
        { 
          name: "Рафтинг + ATV", 
          href: "/tours?tag=рафтинг",
          count: activeTours.filter(t => t.tags.includes('рафтинг')).length 
        },
        { 
          name: "Слоны и природа", 
          href: "/tours?tag=слоны",
          count: activeTours.filter(t => t.tags.includes('слоны')).length 
        },
        { 
          name: "Као Лак сафари", 
          href: "/tours?tag=сафари",
          count: activeTours.filter(t => t.tags.includes('сафари')).length 
        }
      ]
    },
    {
      name: "🏛️ Культурные туры", 
      href: "/tours?category=cultural",
      description: `${activeTours.filter(t => t.category === 'cultural').length} культурный тур`,
      subItems: [
        { 
          name: "Достопримечательности Пхукета", 
          href: "/tours/dostoprimechatelnosti-phuketa",
          count: 1 
        },
        { 
          name: "Храмы и обзорные", 
          href: "/tours?tag=храмы",
          count: activeTours.filter(t => t.tags.includes('храмы')).length 
        },
        { 
          name: "Большой Будда", 
          href: "/tours?tag=большой будда",
          count: activeTours.filter(t => t.tags.includes('большой будда')).length 
        },
        { 
          name: "Старый город", 
          href: "/tours?tag=старый город",
          count: activeTours.filter(t => t.tags.includes('старый город')).length 
        }
      ]
    },
    {
      name: "👨‍👩‍👧‍👦 По аудитории",
      href: "/collections",
      description: "Подборки для разных путешественников",
      subItems: [
        { 
          name: "🆕 Для новичков", 
          href: "/tours?collection=beginners",
          count: tourCollections.beginners.length,
          description: "Первый раз на Пхукете"
        },
        { 
          name: "👨‍👩‍👧‍👦 Семейные туры", 
          href: "/tours?collection=family",
          count: tourCollections.family.length,
          description: "Подходят детям" 
        },
        { 
          name: "🏃‍♂️ Активный отдых", 
          href: "/tours?collection=active",
          count: tourCollections.active.length,
          description: "Для любителей адреналина"
        },
        { 
          name: "⭐ Премиум класс", 
          href: "/tours?collection=premium",
          count: tourCollections.premium.length,
          description: "Повышенный комфорт"
        },
        { 
          name: "🌙 Многодневные", 
          href: "/tours?collection=multiday",
          count: tourCollections.multiday.length,
          description: "С ночевкой"
        }
      ]
    },
    {
      name: "ℹ️ Информация",
      href: "/info",
      description: "Полезная информация о турах",
      subItems: [
        { name: "❓ Частые вопросы", href: "/help/faq" },
        { name: "📋 Как забронировать", href: "/help/booking" },
        { name: "💳 Оплата и возврат", href: "/help/payment" },
        { name: "⭐ Отзывы", href: "/reviews" },
        { name: "📞 Контакты", href: "/help/contacts" },
        { name: "🏢 О компании", href: "/about" }
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