import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllBeaches, getBeachesByTag, getAllTags, Beach } from "@/data/beachesData";

const Beaches = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredBeaches, setFilteredBeaches] = useState<Beach[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("rating");

  // Получение тега из URL
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    const sortFromUrl = searchParams.get('sort') || "rating";
    setActiveTag(tagFromUrl);
    setSortBy(sortFromUrl);
    
    // Загрузка доступных тегов
    setAvailableTags(getAllTags());
    
    // Фильтрация пляжей
    let beaches = tagFromUrl ? getBeachesByTag(tagFromUrl) : getAllBeaches();
    
    // Сортировка
    beaches = sortBeaches(beaches, sortFromUrl);
    
    setFilteredBeaches(beaches);
  }, [searchParams]);

  // Функция сортировки
  const sortBeaches = (beaches: Beach[], sortOption: string): Beach[] => {
    switch (sortOption) {
      case "rating":
        return [...beaches].sort((a, b) => b.rating - a.rating);
      case "popularity":
        return [...beaches].sort((a, b) => b.reviewsCount - a.reviewsCount);
      case "name":
        return [...beaches].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return beaches;
    }
  };

  // Обработка клика по тегу
  const handleTagClick = (tag: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (activeTag === tag) {
      // Убрать фильтр
      newParams.delete('tag');
    } else {
      // Установить фильтр
      newParams.set('tag', tag);
    }
    
    setSearchParams(newParams);
  };

  // Обработка изменения сортировки
  const handleSortChange = (sort: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', sort);
    setSearchParams(newParams);
  };

  // Убрать фильтр
  const clearFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('tag');
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Заголовок страницы */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              Пляжи Пхукета
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              Откройте для себя лучшие пляжи Пхукета - от оживленных Патонга и Кароны до уединенных 
              бухт Найхарна и Фридом Бич. Каждый пляж имеет свой неповторимый характер и особенности.
            </p>
          </div>

          {/* Фильтры и сортировка */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Фильтр по тегам */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Фильтр по типу</h3>
                
                {/* Активный фильтр */}
                {activeTag && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">
                        Показаны пляжи: <strong>#{activeTag}</strong>
                      </span>
                      <button
                        onClick={clearFilter}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Сортировка */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Сортировка</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "rating", label: "По рейтингу" },
                    { value: "popularity", label: "По популярности" },
                    { value: "name", label: "По названию" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                        sortBy === option.value
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className="mb-8">
            <p className="text-gray-600 text-center">
              Найдено пляжей: <strong>{filteredBeaches.length}</strong>
              {activeTag && ` с тегом "${activeTag}"`}
            </p>
          </div>

          {/* Сетка пляжей */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBeaches.map((beach) => (
              <Card key={beach.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Изображение пляжа */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-cyan-600 overflow-hidden">
                  <img 
                    src={beach.image} 
                    alt={beach.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback если изображение не загружается
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold text-center px-4">
                      {beach.title}
                    </h3>
                  </div>
                  {/* Рейтинг бейдж */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {beach.rating}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Локация и краткое описание */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{beach.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {beach.description}
                    </p>
                  </div>

                  {/* Метрики */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{beach.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{beach.reviewsCount} отзывов</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Waves className="w-4 h-4" />
                      <span>{beach.crowdLevel}</span>
                    </div>
                  </div>

                  {/* Теги */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {beach.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Кнопка подробнее */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {beach.bestTime}
                    </span>
                    <Link to={`/beach/${beach.id}`}>
                      <Button variant="outline" size="sm">
                        Подробнее
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Пустое состояние */}
          {filteredBeaches.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MapPin className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Пляжи не найдены
              </h3>
              <p className="text-gray-500 mb-4">
                Попробуйте изменить фильтры или очистить поиск
              </p>
              <Button onClick={clearFilter} variant="outline">
                Показать все пляжи
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Beaches;