import React from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBeachById, beaches as allBeaches } from "@/data/beaches";

function BeachDetail() {
  const { id } = useParams();
  const beach = id ? getBeachById(id) : undefined;
  const [showMap, setShowMap] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !/\.app\.github\.dev$/.test(window.location.host);
    }
    return true;
  });
  const getEmbedMapUrl = (title: string, raw?: string, location?: string) => {
    if (raw && /\/maps\/embed|output=embed/.test(raw)) return raw;
    // Нормализуем заголовок: уберём скобки и лишние символы
    const normalizedTitle = title.replace(/\(.*?\)/g, "").trim();
    const qString = [normalizedTitle, location ?? "Phuket", "Phuket, Thailand"].filter(Boolean).join(", ");
    const q = encodeURIComponent(qString);
    // Более совместимый вариант: www.google.com + output=embed
    return `https://www.google.com/maps?q=${q}&z=14&hl=ru&iwloc=near&output=embed`;
  };
  const related = beach
    ? allBeaches
        .filter((b) => b.id !== beach.id && b.tags?.some((t) => beach.tags?.includes(t)))
        .slice(0, 3)
    : [];

  if (!beach) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Пляж не найден</h1>
          <Button variant="outline" onClick={() => window.history.back()}>
            Назад к списку пляжей
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{beach.title} — Пляжи Пхукета</title>
        <meta name="description" content={beach.description} />
        <meta name="keywords" content={`Пхукет, пляж, ${beach.title}, отзывы, фото, карта`} />
        <link rel="canonical" href={`https://johnda7.github.io/island-travel-echo-clone/beach/${beach.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${beach.title} — Пляжи Пхукета`} />
        <meta property="og:description" content={beach.description} />
        <meta property="og:url" content={`https://johnda7.github.io/island-travel-echo-clone/beach/${beach.id}`} />
        <meta property="og:image" content={beach.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${beach.title} — Пляжи Пхукета`} />
        <meta name="twitter:description" content={beach.description} />
        <meta name="twitter:image" content={beach.image} />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-white pt-16">
        <main className="container mx-auto px-4 py-8">
          {/* Оглавление */}
          <nav className="mb-6 bg-white/70 backdrop-blur rounded-xl border p-4 shadow-sm sticky top-16 z-10">
            <ul className="flex flex-wrap gap-3 text-sm">
              <li><a href="#overview" className="text-blue-700 hover:underline">Описание</a></li>
              <li><a href="#gallery" className="text-blue-700 hover:underline">Галерея</a></li>
              <li><a href="#pros-cons" className="text-blue-700 hover:underline">Плюсы/Минусы</a></li>
              <li><a href="#zones" className="text-blue-700 hover:underline">Зоны пляжа</a></li>
              <li><a href="#safety" className="text-blue-700 hover:underline">Безопасность</a></li>
              <li><a href="#prices" className="text-blue-700 hover:underline">Цены</a></li>
              <li><a href="#hotels" className="text-blue-700 hover:underline">Отели</a></li>
              <li><a href="#tips-faq" className="text-blue-700 hover:underline">Советы/FAQ</a></li>
              <li><a href="#howto" className="text-blue-700 hover:underline">Как добраться</a></li>
              <li><a href="#reviews" className="text-blue-700 hover:underline">Отзывы</a></li>
              <li><a href="#related" className="text-blue-700 hover:underline">Похожие</a></li>
            </ul>
          </nav>
          {/* Баннер */}
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
            <img src={beach.image} alt={beach.title} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex flex-col justify-end p-8">
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow">{beach.title}</h1>
              <p className="text-lg text-blue-100 max-w-2xl">{beach.location} • Рейтинг: <span className="text-yellow-300 font-bold">★ {beach.rating}</span></p>
            </div>
          </div>

          {/* Enhanced Gallery with Modal Functionality */}
          <div id="gallery" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Галерея</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {beach.gallery.map((img, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
                  <img 
                    src={img} 
                    alt={`${beach.title} фото ${idx + 1}`} 
                    loading="lazy" 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-sm font-medium">Фото {idx + 1}</span>
                  </div>
                  {/* View Icon */}
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Description and Infrastructure */}
          <div id="overview" className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 shadow-lg border border-blue-100">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Описание пляжа</h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">{beach.description}</p>
            
            {/* Tags with Better Styling */}
            <div className="flex flex-wrap gap-3 mb-6">
              {beach.tags.map(tag => (
                <span key={tag} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm px-4 py-2 rounded-full font-medium shadow-md hover:from-blue-600 hover:to-cyan-600 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Services with Icons */}
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
              </svg>
              Инфраструктура и услуги
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {beach.services.map((service, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{service}</span>
                </div>
              ))}
            </div>

            {/* Beach Facts Cards */}
            {beach.info && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {beach.info.length && (
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <div className="text-blue-700 font-semibold">Длина пляжа</div>
                    </div>
                    <div className="text-gray-800 font-medium">{beach.info.length}</div>
                  </div>
                )}
                {beach.info.sand && (
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                      </svg>
                      <div className="text-blue-700 font-semibold">Песок</div>
                    </div>
                    <div className="text-gray-800 font-medium">{beach.info.sand}</div>
                  </div>
                )}
                {beach.info.bestTime && (
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <div className="text-blue-700 font-semibold">Лучшее время</div>
                    </div>
                    <div className="text-gray-800 font-medium">{beach.info.bestTime}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Карта */}
          <div className="mb-8" id="map">
            <h3 className="font-semibold mb-2 text-blue-700">Расположение на карте</h3>
            <div className="rounded-xl overflow-hidden shadow-lg">
              {showMap ? (
                <iframe
                  src={getEmbedMapUrl(beach.title, beach.map, beach.location)}
                  title="Карта пляжа"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  loading="lazy"
                  onError={() => setShowMap(false)}
                ></iframe>
              ) : (
                <div className="p-4 bg-blue-50 text-blue-900">
                  <p className="mb-2">Карта скрыта в текущем превью (возможно, хост блокирует встраивание iframe).</p>
                  <button
                    className="inline-flex items-center px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 mr-3"
                    onClick={() => setShowMap(true)}
                  >
                    Показать карту здесь
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${beach.title}, ${beach.location}, Phuket, Thailand`)}`}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center px-3 py-1.5 rounded bg-white border text-blue-700 hover:bg-blue-100"
                  >
                    Открыть в Google Maps
                  </a>
                </div>
              )}
            </div>
            <div className="mt-2 text-sm">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${beach.title}, ${beach.location}, Phuket, Thailand`)}`}
                target="_blank"
                rel="noopener"
                className="text-blue-700 underline"
              >
                Открыть в Google Maps
              </a>
              <span className="mx-2 text-gray-400">•</span>
              <a
                href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${beach.title}, ${beach.location}, Phuket, Thailand`)}`}
                target="_blank"
                rel="noopener"
                className="text-blue-700 underline"
              >
                Открыть в OpenStreetMap
              </a>
            </div>
          </div>

          {/* Советы и FAQ */}
          <div id="tips-faq" className="mb-8 bg-white rounded-xl p-6 shadow text-gray-700">
            <h3 className="font-semibold mb-2 text-blue-700">Советы для отдыха: {beach.title}</h3>
            {beach.tips?.length ? (
              <ul className="list-disc pl-5 mb-2">
                {beach.tips.map((t, i) => (<li key={i}>{t}</li>))}
              </ul>
            ) : null}
            <h4 className="font-semibold mb-2 text-blue-700">Часто задаваемые вопросы</h4>
            <div className="space-y-2">
              {beach.faq?.length ? (
                beach.faq.map((f, i) => (
                  <div key={i} className="bg-blue-100 rounded-lg p-3">
                    <span className="font-medium">{f.q}</span>
                    <div className="text-sm text-gray-700">{f.a}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-600">Вопросов пока нет — задайте нам в чате Telegram.</div>
              )}
            </div>
          </div>

          {/* Плюсы и минусы */}
          {(beach.pros?.length || beach.cons?.length) && (
            <div id="pros-cons" className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {beach.pros?.length && (
                <div className="bg-green-50 rounded-xl p-6 shadow">
                  <h3 className="font-semibold mb-3 text-green-800">Плюсы</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {beach.pros.map((p, i) => (<li key={i}>{p}</li>))}
                  </ul>
                </div>
              )}
              {beach.cons?.length && (
                <div className="bg-red-50 rounded-xl p-6 shadow">
                  <h3 className="font-semibold mb-3 text-red-800">Минусы</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {beach.cons.map((c, i) => (<li key={i}>{c}</li>))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Зоны пляжа */}
          {beach.zones?.length ? (
            <div id="zones" className="mb-8 bg-white rounded-xl p-6 shadow">
              <h3 className="font-semibold mb-3 text-blue-700">Зоны пляжа</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {beach.zones.map((z, i) => (
                  <Card key={i} className="p-4 bg-blue-50 rounded-xl shadow">
                    <div className="font-semibold text-blue-800 mb-1">{z.name}</div>
                    <div className="text-sm text-gray-700">{z.desc}</div>
                  </Card>
                ))}
              </div>
            </div>
          ) : null}

          {/* Безопасность */}
          {beach.safetyTips?.length ? (
            <div id="safety" className="mb-8 bg-yellow-50 rounded-xl p-6 shadow">
              <h3 className="font-semibold mb-3 text-yellow-800">Безопасность на пляже</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                {beach.safetyTips.map((s, i) => (<li key={i}>{s}</li>))}
              </ul>
            </div>
          ) : null}

          {/* Цены */}
          {beach.prices && (
            <div id="prices" className="mb-8 bg-white rounded-xl p-6 shadow">
              <h3 className="font-semibold mb-3 text-blue-700">Ориентировочные цены</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                {beach.prices.sunbed && (<div className="bg-blue-50 p-3 rounded">Лежак: {beach.prices.sunbed}</div>)}
                {beach.prices.umbrella && (<div className="bg-blue-50 p-3 rounded">Зонт: {beach.prices.umbrella}</div>)}
                {beach.prices.jetSki && (<div className="bg-blue-50 p-3 rounded">Гидроцикл: {beach.prices.jetSki}</div>)}
                {beach.prices.banana && (<div className="bg-blue-50 p-3 rounded">Банан: {beach.prices.banana}</div>)}
                {beach.prices.parasailing && (<div className="bg-blue-50 p-3 rounded">Парасейлинг: {beach.prices.parasailing}</div>)}
                {beach.prices.sup && (<div className="bg-blue-50 p-3 rounded">SUP: {beach.prices.sup}</div>)}
                {beach.prices.kayak && (<div className="bg-blue-50 p-3 rounded">Каяк: {beach.prices.kayak}</div>)}
              </div>
            </div>
          )}

          {/* Отели рядом */}
          {beach.hotels?.length ? (
            <div id="hotels" className="mb-8 bg-white rounded-xl p-6 shadow">
              <h3 className="font-semibold mb-3 text-blue-700">Популярные отели рядом</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {beach.hotels.map((h, i) => (
                  <Card key={i} className="p-4 bg-blue-50 rounded-xl shadow">
                    <div className="font-semibold text-blue-800">{h.name}</div>
                    {h.rating && (<div className="text-sm text-yellow-600">Рейтинг: ★ {h.rating}</div>)}
                    {h.distance && (<div className="text-sm text-gray-700">{h.distance}</div>)}
                    {h.url && (
                      <a href={h.url} target="_blank" rel="noopener" className="text-blue-600 underline text-sm mt-1 inline-block">Сайт</a>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ) : null}

          {/* Как добраться */}
          <div id="howto" className="mb-8 bg-blue-50 rounded-xl p-6 shadow text-gray-700">
            <h3 className="font-semibold mb-2 text-blue-700">Как добраться</h3>
            <ul className="list-disc pl-5 space-y-1">
              {beach.info?.transport ? (
                <li>{beach.info.transport}</li>
              ) : null}
              <li>Тук-туки и такси доступны в туристических районах.</li>
              <li>Аренда скутера — быстрый способ перемещения по острову (будьте осторожны, надевайте шлем).</li>
              <li>Из Пхукет-тауна ходят местные автобусы (songthaew) — недорого, но медленнее.</li>
            </ul>
          </div>

          {/* Enhanced Reviews Section */}
          <div id="reviews" className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Отзывы о пляже {beach.title}
            </h2>
            <div className="space-y-6">
              {beach.reviews.map((review, idx) => (
                <Card key={idx} className="p-6 bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {review.user[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-gray-800 text-lg">{review.user}</span>
                        <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-yellow-700 font-semibold text-sm">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-base">{review.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Related Beaches */}
          {related.length > 0 && (
            <div id="related" className="mb-10">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Похожие пляжи
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Card key={r.id} className="group overflow-hidden rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <Link to={`/beach/${r.id}`} className="block relative">
                      <img src={r.image} alt={r.title} loading="lazy" className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    <div className="p-6">
                      <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{r.title}</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {r.tags?.slice(0,3).map((t) => (
                          <span key={t} className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100 font-medium">#{t}</span>
                        ))}
                      </div>
                      <Link to={`/beach/${r.id}`} className="inline-block">
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all group-hover:scale-105">
                          Подробнее
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Контакты и обратная связь */}
          <div className="mb-8 bg-blue-50 rounded-xl p-6 shadow text-gray-700">
            <h3 className="font-semibold mb-2 text-blue-700">Контакты для бронирования и вопросов</h3>
            <p>Свяжитесь с нами для консультации, бронирования экскурсий или получения советов по отдыху на Патонге:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Телефон: <a href="tel:+74951234567" className="text-blue-600 underline">+7 (495) 123-45-67</a></li>
              <li>Email: <a href="mailto:info@phuketgo.ru" className="text-blue-600 underline">info@phuketgo.ru</a></li>
              <li>Форма обратной связи на сайте</li>
              <li>Чат Пхукет Da: <a href="https://t.me/+FAswrtvXpLY2YzY9" target="_blank" rel="noopener" className="text-blue-600 underline">Перейти в Telegram</a></li>
            </ul>
          </div>

          <Button variant="outline" onClick={() => window.history.back()}>
            Назад к списку пляжей
          </Button>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default BeachDetail;

