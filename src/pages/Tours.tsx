import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tours as ToursComponent } from "@/components/Tours";
import { useTours, TourWithMeta } from "@/hooks/useTours";
import { useAutoMenu } from "@/hooks/useAutoMenu";

const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { allTours, tags, loading } = useTours();
  const { tourCollections } = useAutoMenu();
  const [filteredTours, setFilteredTours] = useState<TourWithMeta[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  // Получение тега, категории и коллекции из URL
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    const categoryFromUrl = searchParams.get('category');
    const collectionFromUrl = searchParams.get('collection');
    setActiveTag(tagFromUrl);
    setActiveCategory(categoryFromUrl);
    setActiveCollection(collectionFromUrl);
    // Теги из централизованного хука
    setAvailableTags(tags);
  }, [searchParams, tags]);

  // Централизованная фильтрация: по тегам, категориям И коллекциям
  useEffect(() => {
    if (loading) {
      setFilteredTours([]);
      return;
    }
    
    let filtered = allTours;
    
    // Фильтр по коллекции (приоритет!)
    if (activeCollection && tourCollections) {
      const collectionKey = activeCollection as keyof typeof tourCollections;
      const collectionTours = tourCollections[collectionKey];
      
      if (collectionTours && collectionTours.length > 0) {
        const collectionIds = collectionTours.map(t => t.id);
        filtered = filtered.filter(t => collectionIds.includes(t.id));
      }
    } 
    // Фильтр по категории (если нет коллекции)
    else if (activeCategory) {
      filtered = filtered.filter(t => t.category === activeCategory);
    }
    
    // Фильтр по тегу (дополнительный фильтр)
    if (activeTag) {
      filtered = filtered.filter(t => t.tags?.some(tag => tag.toLowerCase() === activeTag.toLowerCase()));
    }
    
    setFilteredTours(filtered);
  }, [loading, allTours, activeTag, activeCategory, activeCollection, tourCollections]);

  // Обработка клика по тегу
  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      // Убрать фильтр
      setSearchParams({});
    } else {
      // Установить фильтр
      setSearchParams({ tag });
    }
  };

  // Убрать фильтр
  const clearFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F5F7FA 0%, #E8ECF1 100%)' }}>
      <Header />
      <main className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <h1 
            className="text-2xl font-bold mb-4"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #1C1C1E 0%, #3C3C43 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Все туры
          </h1>
          
          {/* 🎨 iOS 26 ФИЛЬТРЫ - КОМПАКТНЫЕ */}
          <div className="mb-4">
            <div 
              className="overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              {/* Компактный заголовок */}
              <div className="px-4 py-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="#007AFF" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
                <span 
                  className="text-sm font-semibold"
                  style={{
                    color: '#3C3C43',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}
                >
                  Фильтры
                </span>
                {activeTag && (
                  <button
                    onClick={clearFilter}
                    className="ml-auto px-2 py-1 text-xs font-semibold rounded-md transition-all"
                    style={{
                      background: 'rgba(255, 59, 48, 0.1)',
                      color: '#FF3B30'
                    }}
                  >
                    ✕ Сбросить
                  </button>
                )}
              </div>
              
              {/* Горизонтальный скролл с фильтрами */}
              <div className="px-4 pb-2">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2">
                    {availableTags.map((tag) => {
                      const isActive = activeTag === tag;
                      let colorClasses = '';
                      
                      // Определяем цвет по категории
                      if (['острова', 'морские', 'море', 'приключения', 'культурные', 'достопримечательности', 'обзорные'].includes(tag)) {
                        colorClasses = isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50' 
                          : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100';
                      } else if (['1 день', '2 дня', 'многодневные'].includes(tag)) {
                        colorClasses = isActive 
                          ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/50' 
                          : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100';
                      } else if (['снорклинг', 'каякинг', 'рафтинг', 'слоны', 'водопады', 'храмы', 'пляж', 'spa', 'atv', 'сафари', 'хоппинг', 'спидбот', 'лонгтейл'].includes(tag)) {
                        colorClasses = isActive 
                          ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50' 
                          : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100';
                      } else if (['джеймс бонд', 'пхи-пхи', 'краби', 'као лак', 'пханг нга', 'бамбу', 'хонг', '11 островов', 'лагуны', 'пещеры', 'плавучая деревня', 'джунгли'].includes(tag)) {
                        colorClasses = isActive 
                          ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/50' 
                          : 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100';
                      } else if (['семейный', 'активный', 'комбо', 'эксклюзив', 'премиум', 'комфорт+', 'мега-тур', 'рассвет', 'утро', 'природа'].includes(tag)) {
                        colorClasses = isActive 
                          ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg shadow-pink-500/50' 
                          : 'bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100';
                      } else {
                        colorClasses = isActive 
                          ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-lg shadow-gray-500/50' 
                          : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100';
                      }
                      
                      return (
                        <button
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className={`px-3 py-1.5 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-150 ${colorClasses}`}
                          style={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                            letterSpacing: '-0.01em',
                            ...(isActive && {
                              transform: 'scale(1.05)',
                              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                            })
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Компонент с турами */}
        {loading ? (
          <div className="container mx-auto px-4 py-6">
            {/* Skeleton loader - пульсирующие карточки */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  {/* Изображение */}
                  <div className="h-48 bg-gray-200" />
                  {/* Контент */}
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-6 bg-gray-200 rounded w-24" />
                      <div className="h-8 bg-gray-200 rounded w-28" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ToursComponent filteredTours={filteredTours} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Tours;
