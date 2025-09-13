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
    let sorted = [...filteredBeaches];
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

        {/* Горизонтальное меню-якоря + выпадающее меню для мобильных */}
        <div className="mb-8 flex flex-col gap-3 items-center sticky top-0 z-30 bg-white/90 py-4 rounded-xl shadow">
          <div className="hidden sm:flex flex-wrap gap-3 justify-center w-full">
            {beaches.map((beach) => (
              <a
                key={beach.id}
                href={`#${beach.id}`}
                className="px-5 py-2 rounded-full font-medium border transition-all duration-200 shadow-sm bg-white text-blue-600 border-blue-300 hover:bg-blue-100 hover:text-blue-700"
              >
                {beach.title}
              </a>
            ))}
          </div>
          <div className="sm:hidden w-full flex justify-center">
            <select
              className="px-4 py-2 rounded-full border border-blue-300 text-blue-700 font-medium shadow-sm bg-white"
              onChange={e => {
                const id = e.target.value;
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <option value="">Выбрать пляж...</option>
              {beaches.map(beach => (
                <option key={beach.id} value={beach.id}>{beach.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Сортировка */}
        <div className="flex items-center gap-2 mb-8 justify-end">
          <label className="font-medium text-gray-600">Сортировать:</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBeaches.slice(0, visibleCount).map((beach, idx) => (
            <div id={beach.id} key={beach.id}>
              <Card
                className="overflow-hidden shadow-xl rounded-2xl bg-white flex flex-col hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="h-56 w-full overflow-hidden relative">
                  <img
                    src={beach.image}
                    alt={beach.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 rounded-full px-4 py-1 text-sm font-semibold text-yellow-600 shadow">
                    ★ {beach.rating}
                  </div>
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <h2 className="text-2xl font-bold mb-2 text-blue-700 group-hover:text-cyan-700 transition-colors">{beach.title}</h2>
                  <p className="text-gray-600 mb-3 text-base line-clamp-3">{beach.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {beach.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm border border-blue-100"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {/* Дополнительные подробности только для Патонга */}
                  {beach.id === "patong" && (
                    <>
                      {/* Галерея */}
                      <div className="mb-4">
                        <div className="font-semibold text-blue-700 mb-2">Галерея:</div>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {beach.gallery.map((img, i) => (
                            <img key={i} src={img} alt={beach.title + ' фото ' + (i+1)} className="h-20 w-32 object-cover rounded-lg shadow" />
                          ))}
                        </div>
                      </div>
                      {/* Услуги */}
                      <div className="mb-4">
                        <div className="font-semibold text-blue-700 mb-2">Услуги и развлечения:</div>
                        <ul className="list-disc pl-5 text-gray-700 text-sm">
                          {beach.services.map((srv, i) => (
                            <li key={i}>{srv}</li>
                          ))}
                        </ul>
                      </div>
                      {/* Информация */}
                      {beach.info && (
                        <div className="mb-4">
                          <div className="font-semibold text-blue-700 mb-2">Информация о пляже:</div>
                          <ul className="list-none pl-0 text-gray-700 text-sm">
                            <li><b>Длина:</b> {beach.info.length}</li>
                            <li><b>Песок:</b> {beach.info.sand}</li>
                            <li><b>Инфраструктура:</b> {beach.info.infrastructure}</li>
                            <li><b>Лучшее время:</b> {beach.info.bestTime}</li>
                            <li><b>Транспорт:</b> {beach.info.transport}</li>
                          </ul>
                        </div>
                      )}
                      {/* Отзывы */}
                      <div className="mb-4">
                        <div className="font-semibold text-blue-700 mb-2">Отзывы:</div>
                        <ul className="list-none pl-0 text-gray-700 text-sm">
                          {beach.reviews.map((rev, i) => (
                            <li key={i} className="mb-2"><b>{rev.user}:</b> {rev.text} <span className="text-yellow-600">★ {rev.rating}</span></li>
                          ))}
                        </ul>
                      </div>
                      {/* Карта */}
                      <div className="mb-4">
                        <div className="font-semibold text-blue-700 mb-2">Карта:</div>
                        <iframe src={beach.map} title="Карта Патонга" className="w-full h-40 rounded-lg border" loading="lazy"></iframe>
                      </div>
                    </>
                  )}
                  <Button
                    variant="default"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md mt-auto"
                    onClick={() => navigate(`/beach/${beach.id}`)}
                  >
                    Подробнее
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
