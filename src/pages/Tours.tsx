import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tours as ToursComponent } from "@/components/Tours";
import { useTours, TourWithMeta } from "@/hooks/useTours";
import { useAutoMenu } from "@/hooks/useAutoMenu";

// Категории с эмодзи
const CATEGORIES = [
  { id: 'all', label: 'Все', icon: '✨' },
  { id: 'islands', label: 'Острова', icon: '🏝️' },
  { id: 'adventure', label: 'Природа', icon: '🌿' },
  { id: 'cultural', label: 'Обзорные', icon: '🏛️' },
  { id: 'diving', label: 'Дайвинг', icon: '🤿' },
  { id: 'fishing', label: 'Рыбалка', icon: '🎣' },
];

// Популярные теги — только самые полезные для пользователя
const QUICK_TAGS = [
  { tag: 'семейный', icon: '👨‍👩‍👧' },
  { tag: 'снорклинг', icon: '🐠' },
  { tag: 'пхи-пхи', icon: '🏝️' },
  { tag: 'джеймс бонд', icon: '🎬' },
  { tag: 'краби', icon: '⛵' },
  { tag: 'пханг нга', icon: '🪸' },
  { tag: 'симиланы', icon: '🐢' },
  { tag: 'слоны', icon: '🐘' },
  { tag: 'каякинг', icon: '🛶' },
  { tag: 'spa', icon: '💆' },
  { tag: 'рассвет', icon: '🌅' },
  { tag: 'премиум', icon: '💎' },
];

const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { allTours, tags, loading } = useTours();
  const { tourCollections } = useAutoMenu();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  // Получение фильтров из URL
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    const categoryFromUrl = searchParams.get('category');
    const collectionFromUrl = searchParams.get('collection');
    setActiveTag(tagFromUrl);
    setActiveCategory(categoryFromUrl || 'all');
    setActiveCollection(collectionFromUrl);
  }, [searchParams]);

  // Фильтрация
  const filteredTours = useMemo(() => {
    if (loading) return [];
    let filtered = allTours;

    // Коллекция (приоритет)
    if (activeCollection && tourCollections) {
      const collectionKey = activeCollection as keyof typeof tourCollections;
      const collectionTours = tourCollections[collectionKey];
      if (collectionTours && collectionTours.length > 0) {
        const collectionIds = collectionTours.map(t => t.id);
        filtered = filtered.filter(t => collectionIds.includes(t.id));
      }
    } else if (activeCategory && activeCategory !== 'all') {
      filtered = filtered.filter(t => t.category === activeCategory);
    }

    // Тег
    if (activeTag) {
      filtered = filtered.filter(t =>
        t.tags?.some(tag => tag.toLowerCase() === activeTag.toLowerCase())
      );
    }

    return filtered;
  }, [loading, allTours, activeTag, activeCategory, activeCollection, tourCollections]);

  // Количество туров в каждой категории
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allTours.length };
    CATEGORIES.forEach(c => {
      if (c.id !== 'all') {
        counts[c.id] = allTours.filter(t => t.category === c.id).length;
      }
    });
    return counts;
  }, [allTours]);

  const handleCategoryClick = (categoryId: string) => {
    const params: Record<string, string> = {};
    if (categoryId !== 'all') params.category = categoryId;
    if (activeTag) params.tag = activeTag;
    setSearchParams(params);
  };

  const handleTagClick = (tag: string) => {
    const params: Record<string, string> = {};
    if (activeCategory && activeCategory !== 'all') params.category = activeCategory;
    if (activeTag === tag) {
      // Снять тег
      setSearchParams(params);
    } else {
      params.tag = tag;
      setSearchParams(params);
    }
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const hasFilters = activeCategory !== 'all' || activeTag || activeCollection;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F5F7FA 0%, #E8ECF1 100%)' }}>
      <Header />
      <main className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          {/* Заголовок + сброс */}
          <div className="flex items-center justify-between mb-3">
            <h1
              className="text-2xl font-bold"
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
            {hasFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm font-medium px-3 py-1.5 rounded-full transition-all active:scale-95"
                style={{
                  color: '#FF3B30',
                  background: 'rgba(255, 59, 48, 0.1)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                }}
              >
                Сбросить
              </button>
            )}
          </div>

          {/* Категории — горизонтальный скролл пиллов */}
          <div className="mb-3 -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 500,
                      letterSpacing: '-0.01em',
                      background: isActive
                        ? 'linear-gradient(135deg, #007AFF 0%, #0055D4 100%)'
                        : 'rgba(255, 255, 255, 0.9)',
                      color: isActive ? '#fff' : '#3C3C43',
                      border: isActive ? 'none' : '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: isActive
                        ? '0 4px 12px rgba(0, 122, 255, 0.35)'
                        : '0 1px 4px rgba(0, 0, 0, 0.04)',
                      backdropFilter: 'blur(20px)',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    {count > 0 && cat.id !== 'all' && (
                      <span
                        className="ml-0.5 text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center"
                        style={{
                          background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 122, 255, 0.1)',
                          color: isActive ? '#fff' : '#007AFF',
                          fontSize: '11px',
                          fontWeight: 700,
                        }}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Быстрые теги — горизонтальный скролл компактных чипов */}
          <div className="mb-4 -mx-4 px-4">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
              {QUICK_TAGS.map(({ tag, icon }) => {
                const isActive = activeTag === tag;
                // Проверяем, есть ли туры с этим тегом в текущей категории
                const relevantTours = activeCategory !== 'all'
                  ? allTours.filter(t => t.category === activeCategory && t.tags?.some(tt => tt.toLowerCase() === tag.toLowerCase()))
                  : allTours.filter(t => t.tags?.some(tt => tt.toLowerCase() === tag.toLowerCase()));
                if (relevantTours.length === 0) return null;

                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150 active:scale-95 shrink-0"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      background: isActive
                        ? 'rgba(0, 122, 255, 0.12)'
                        : 'rgba(0, 0, 0, 0.03)',
                      color: isActive ? '#007AFF' : '#6C6C70',
                      border: isActive ? '1.5px solid rgba(0, 122, 255, 0.3)' : '1px solid transparent',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    <span style={{ fontSize: '12px' }}>{icon}</span>
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Счётчик результатов */}
          {hasFilters && (
            <div
              className="mb-3 text-sm"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                color: '#8E8E93',
              }}
            >
              Найдено: <span style={{ color: '#007AFF', fontWeight: 600 }}>{filteredTours.length}</span> {
                filteredTours.length === 1 ? 'тур' :
                filteredTours.length >= 2 && filteredTours.length <= 4 ? 'тура' : 'туров'
              }
            </div>
          )}
        </div>

        {/* Компонент с турами */}
        {loading ? (
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="aspect-[16/10] bg-gradient-to-b from-gray-200 to-gray-100" />
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
