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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Все туры</h1>
            
            {/* Система фильтров как у tisland.travel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  Фильтры
                </h3>
              </div>
              
              {/* Активный фильтр */}
              {activeTag && (
                <div className="mx-4 mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700 font-medium">
                      Показаны туры: <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">{activeTag}</span>
                    </span>
                    <button
                      onClick={clearFilter}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                    >
                      Сбросить
                    </button>
                  </div>
                </div>
              )}
              
              {/* Теги в стиле tisland.travel - компактно и красиво */}
              <div className="p-4 space-y-3">
                {/* Тип тура */}
                {availableTags.filter(tag => ['острова', 'морские', 'море', 'приключения', 'культурные', 'достопримечательности', 'обзорные'].includes(tag)).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {availableTags.filter(tag => ['острова', 'морские', 'море', 'приключения', 'культурные', 'достопримечательности', 'обзорные'].includes(tag)).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border cursor-pointer ${
                          activeTag === tag
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}

                {/* Длительность */}
                {availableTags.filter(tag => ['1 день', '2 дня', 'многодневные'].includes(tag)).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {availableTags.filter(tag => ['1 день', '2 дня', 'многодневные'].includes(tag)).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border cursor-pointer ${
                          activeTag === tag
                            ? 'bg-green-600 text-white border-green-600 shadow-sm'
                            : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}

                {/* Активности */}
                {availableTags.filter(tag => ['снорклинг', 'каякинг', 'рафтинг', 'слоны', 'водопады', 'храмы', 'пляж', 'spa', 'atv', 'сафари', 'хоппинг', 'спидбот', 'лонгтейл'].includes(tag)).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {availableTags.filter(tag => ['снорклинг', 'каякинг', 'рафтинг', 'слоны', 'водопады', 'храмы', 'пляж', 'spa', 'atv', 'сафари', 'хоппинг', 'спидбот', 'лонгтейл'].includes(tag)).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border cursor-pointer ${
                          activeTag === tag
                            ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                            : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}

                {/* Места */}
                {availableTags.filter(tag => ['джеймс бонд', 'пхи-пхи', 'краби', 'као лак', 'пханг нга', 'бамбу', 'хонг', '11 островов', 'лагуны', 'пещеры', 'плавучая деревня', 'джунгли'].includes(tag)).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {availableTags.filter(tag => ['джеймс бонд', 'пхи-пхи', 'краби', 'као лак', 'пханг нга', 'бамбу', 'хонг', '11 островов', 'лагуны', 'пещеры', 'плавучая деревня', 'джунгли'].includes(tag)).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border cursor-pointer ${
                          activeTag === tag
                            ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                            : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 hover:border-orange-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}

                {/* Особенности */}
                {availableTags.filter(tag => ['семейный', 'активный', 'комбо', 'эксклюзив', 'премиум', 'комфорт+', 'мега-тур', 'рассвет', 'утро', 'природа'].includes(tag)).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {availableTags.filter(tag => ['семейный', 'активный', 'комбо', 'эксклюзив', 'премиум', 'комфорт+', 'мега-тур', 'рассвет', 'утро', 'природа'].includes(tag)).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border cursor-pointer ${
                          activeTag === tag
                            ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                            : 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100 hover:border-pink-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}

                {/* Остальные теги */}
                {availableTags.filter(tag => 
                  !['острова', 'морские', 'море', 'приключения', 'культурные', 'достопримечательности', 'обзорные',
                    '1 день', '2 дня', 'многодневные',
                    'снорклинг', 'каякинг', 'рафтинг', 'слоны', 'водопады', 'храмы', 'пляж', 'spa', 'atv', 'сафари', 'хоппинг', 'спидбот', 'лонгтейл',
                    'джеймс бонд', 'пхи-пхи', 'краби', 'као лак', 'пханг нга', 'бамбу', 'хонг', '11 островов', 'лагуны', 'пещеры', 'плавучая деревня', 'джунгли',
                    'семейный', 'активный', 'комбо', 'эксклюзив', 'премиум', 'комфорт+', 'мега-тур', 'рассвет', 'утро', 'природа'].includes(tag)
                ).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {availableTags.filter(tag => 
                      !['острова', 'морские', 'море', 'приключения', 'культурные', 'достопримечательности', 'обзорные',
                        '1 день', '2 дня', 'многодневные',
                        'снорклинг', 'каякинг', 'рафтинг', 'слоны', 'водопады', 'храмы', 'пляж', 'spa', 'atv', 'сафари', 'хоппинг', 'спидбот', 'лонгтейл',
                        'джеймс бонд', 'пхи-пхи', 'краби', 'као лак', 'пханг нга', 'бамбу', 'хонг', '11 островов', 'лагуны', 'пещеры', 'плавучая деревня', 'джунгли',
                        'семейный', 'активный', 'комбо', 'эксклюзив', 'премиум', 'комфорт+', 'мега-тур', 'рассвет', 'утро', 'природа'].includes(tag)
                    ).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border cursor-pointer ${
                          activeTag === tag
                            ? 'bg-gray-600 text-white border-gray-600 shadow-sm'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Компонент с турами */}
        {loading ? (
          <div className="container mx-auto px-4 py-12">
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
