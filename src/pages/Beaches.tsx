import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { beaches as beachesData } from "@/data/beaches";
const beaches = beachesData;
 


const sortOptions = [
  { value: "popularity", label: "Популярности" },
  { value: "rating", label: "Рейтингу" },
  { value: "price", label: "Цене" },
];


const filterCategories = ['Все', 'Семейный', 'Сёрфинг', 'Для пар', 'Уединённый', 'Ночная жизнь', 'Длинный', 'Парк', 'Элитный'];

const BeachesPage: React.FC = () => {
  const [sortBy, setSortBy] = useState("popularity");
  const [activeCategory, setActiveCategory] = useState('Все');
  const [filteredBeaches, setFilteredBeaches] = useState(beaches);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    setSortBy(sort);
  const sorted = [...filteredBeaches];
    if (sort === "popularity") {
      sorted.sort((a, b) => b.popularity - a.popularity);
    } else if (sort === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sort === "price") {
      sorted.sort((a, b) => a.price - b.price);
    }
    setFilteredBeaches(sorted);
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
    if (cat === 'Все') setFilteredBeaches(beaches);
    else setFilteredBeaches(beaches.filter(b => b.tags.includes(cat)));
  };

  return (
    <>
      <Helmet>
        <title>Пляжи Пхукета — лучшие пляжи, фото, описание, отзывы</title>
        <meta name="description" content="Обзор лучших пляжей Пхукета: фото, описание, рейтинг, отзывы, расположение. Выберите идеальный пляж для отдыха!" />
        <meta name="keywords" content="Пхукет, пляжи, отдых, рейтинг, отзывы, фото, карта" />
        <link rel="canonical" href={`https://johnda7.github.io/island-travel-echo-clone/beaches`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Пляжи Пхукета — лучшие пляжи, фото, описание, отзывы" />
        <meta property="og:description" content="Обзор лучших пляжей Пхукета: фото, описание, рейтинг, отзывы, расположение." />
        <meta property="og:url" content="https://johnda7.github.io/island-travel-echo-clone/beaches" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Пляжи Пхукета — лучшие пляжи, фото, описание, отзывы" />
        <meta name="twitter:description" content="Обзор лучших пляжей Пхукета: фото, описание, рейтинг, отзывы, расположение." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">
      <main className="container mx-auto px-4 py-8">
        {/* Баннер */}
        <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Пляжи Пхукета" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow">Пляжи Пхукета</h1>
            <p className="text-lg text-blue-100 max-w-2xl">Лучшие пляжи острова: фото, описание, рейтинг, отзывы и советы для идеального отдыха на море.</p>
          </div>
        </div>

        {/* SEO-блок/описание категории */}
        <div className="mb-6 bg-blue-50 rounded-xl p-6 shadow text-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">Все пляжи Пхукета</h2>
          <p className="mb-2">Пхукет славится своими пляжами: от шумных и тусовочных до уединённых и семейных. Здесь вы найдёте пляжи для сёрфинга, романтики, активного отдыха и релакса. Выберите свой идеальный пляж по фильтрам и сортировке ниже.</p>
          <ul className="list-disc pl-5 text-sm text-blue-800">
            <li>Семейные пляжи с инфраструктурой</li>
            <li>Пляжи для сёрфинга и активного отдыха</li>
            <li>Уединённые и романтические места</li>
            <li>Пляжи с барами, клубами и ночной жизнью</li>
            <li>Дикие и природные локации</li>
            <li>Чат Пхукет Da: <a href="https://t.me/+FAswrtvXpLY2YzY9" target="_blank" rel="noopener" className="text-blue-600 underline">Перейти в Telegram</a></li>
          </ul>
        </div>

        {/* Горизонтальное меню категорий-фильтров + sticky навигация */}
        <div className="mb-8 flex flex-col gap-4 items-center sticky top-16 z-30 bg-white/95 backdrop-blur-sm py-6 rounded-xl shadow-lg border">
          {/* Категории фильтров */}
          <div className="flex flex-wrap gap-2 justify-center w-full px-4">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-sm text-sm ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md transform scale-105'
                    : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:scale-102'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Быстрые якоря к пляжам - только для десктопа */}
          <div className="hidden lg:flex flex-wrap gap-2 justify-center w-full max-w-5xl">
            {filteredBeaches.slice(0, 8).map((beach) => (
              <a
                key={beach.id}
                href={`#${beach.id}`}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
              >
                {beach.title}
              </a>
            ))}
          </div>
        </div>

        {/* Сортировка и статистика */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Найдено пляжей: <span className="font-semibold text-blue-700">{filteredBeaches.length}</span>
            </div>
            {activeCategory !== 'Все' && (
              <div className="text-sm text-gray-500">
                Категория: <span className="font-medium text-blue-600">{activeCategory}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-700 text-sm">Сортировать по:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm bg-white shadow-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBeaches.slice(0, visibleCount).map((beach, idx) => (
            <div id={beach.id} key={beach.id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <Card className="group overflow-hidden shadow-lg hover:shadow-2xl rounded-2xl bg-white flex flex-col transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:scale-[1.02] transform">
                <div className="h-64 w-full overflow-hidden relative">
                  <img
                    src={beach.image}
                    alt={beach.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-amber-600 shadow-lg">
                    ★ {beach.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      {beach.location}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {beach.title}
                  </h2>
                  <p className="text-gray-600 mb-4 text-base line-clamp-3 leading-relaxed">
                    {beach.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {beach.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm border border-blue-100 hover:from-blue-100 hover:to-cyan-100 transition-colors cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                    {beach.tags.length > 3 && (
                      <span className="text-gray-400 text-xs px-2 py-1">
                        +{beach.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <Button
                    variant="default"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mt-auto transform hover:scale-[1.02]"
                    onClick={() => navigate(`/beach/${beach.id}`)}
                  >
                    Подробнее →
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
        {visibleCount < filteredBeaches.length && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="px-8 py-3 text-lg rounded-full border-blue-500 text-blue-600 hover:bg-blue-100 transition-all"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              Показать ещё
            </Button>
          </div>
        )}
      {/* SEO-блок внизу страницы */}
      <div className="mt-16 mb-8 bg-white rounded-xl p-6 shadow text-gray-700 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Пляжи Пхукета — отдых на любой вкус</h2>
        <p>На Пхукете каждый найдёт свой идеальный пляж: для семей, романтики, активного спорта или уединения. Мы собрали лучшие пляжи с фото, рейтингом, отзывами и подробным описанием. Используйте фильтры и сортировку, чтобы выбрать место для идеального отпуска!</p>
      </div>
    </main>
    <Footer />
  </div>
    </>
  );
};

export default BeachesPage;
