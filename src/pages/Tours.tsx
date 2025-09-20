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
            
            {/* Фильтр по тегам - как в WordPress */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Фильтр по тегам</h3>
              
              {/* Активный фильтр */}
              {activeTag && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">
                      Показаны туры с тегом: <strong>#{activeTag}</strong>
                    </span>
                    <button
                      onClick={clearFilter}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      Очистить фильтр
                    </button>
                  </div>
                </div>
              )}
              
              {/* Облако тегов */}
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      activeTag === tag
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
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
