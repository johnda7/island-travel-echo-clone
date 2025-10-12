import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tours as ToursComponent } from "@/components/Tours";
import { useTours, TourWithMeta } from "@/hooks/useTours";

const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { allTours, tags, loading } = useTours();
  const [filteredTours, setFilteredTours] = useState<TourWithMeta[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Получение тега из URL
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    setActiveTag(tagFromUrl);
    // Теги из централизованного хука
    setAvailableTags(tags);
  }, [searchParams, tags]);

  // Централизованная фильтрация: используем уже загруженные туры с данными
  useEffect(() => {
    if (loading) {
      setFilteredTours([]);
      return;
    }
    if (activeTag) {
      setFilteredTours(allTours.filter(t => t.tags?.some(tag => tag.toLowerCase() === activeTag.toLowerCase())));
    } else {
      setFilteredTours(allTours);
    }
  }, [loading, allTours, activeTag]);

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
            className="text-4xl font-bold mb-6"
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
          
          {/* 🎨 iOS 26 ФИЛЬТРЫ */}
          <div className="mb-8">
            <div 
              className="overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                borderRadius: '20px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              {/* Заголовок фильтров */}
              <div 
                className="p-4 border-b"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(88, 86, 214, 0.05) 100%)',
                  borderColor: 'rgba(0, 0, 0, 0.06)'
                }}
              >
                <h3 
                  className="text-lg font-bold flex items-center gap-2"
                  style={{
                    color: '#1C1C1E',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    letterSpacing: '-0.02em'
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="#007AFF" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  Фильтры туров
                </h3>
              </div>
              
              {/* Активный фильтр */}
              {activeTag && (
                <div 
                  className="mx-4 mt-4 p-3 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.08) 0%, rgba(88, 86, 214, 0.08) 100%)',
                    border: '1px solid rgba(0, 122, 255, 0.2)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-sm font-medium"
                      style={{
                        color: '#1C1C1E',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                      }}
                    >
                      Показаны туры: 
                      <span 
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ml-2"
                        style={{
                          background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                          color: 'white',
                          boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)'
                        }}
                      >
                        {activeTag}
                      </span>
                    </span>
                    <button
                      onClick={clearFilter}
                      className="px-3 py-1.5 text-sm font-semibold text-white rounded-lg transition-all duration-150"
                      style={{
                        background: 'linear-gradient(135deg, #FF3B30 0%, #FF2D55 100%)',
                        boxShadow: '0 2px 8px rgba(255, 59, 48, 0.3)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                      }}
                    >
                      ✕ Сбросить
                    </button>
                  </div>
                </div>
              )}
              
              {/* Горизонтальный скролл с фильтрами */}
              <div className="p-4">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2 pb-2">
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
                          className={`px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-150 ${colorClasses}`}
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
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto" />
              <p className="mt-4 text-gray-600">Загружаем туры...</p>
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
