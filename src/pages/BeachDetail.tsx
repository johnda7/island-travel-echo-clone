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
  const getEmbedMapUrl = (title: string, raw?: string, location?: string) => {
    if (raw && /\/maps\/embed|output=embed/.test(raw)) return raw;
    // Простой и надёжный вариант без API: query + output=embed
    const q = encodeURIComponent(`${title}, ${location ?? "Phuket"}, Phuket, Thailand`);
    return `https://www.google.com/maps?q=${q}&output=embed`;
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

          {/* Галерея */}
          <div id="gallery" className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {beach.gallery.map((img, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-xl shadow-lg">
                <img src={img} alt={beach.title + idx} loading="lazy" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Описание и инфраструктура */}
          <div id="overview" className="mb-8 bg-blue-50 rounded-xl p-6 shadow text-gray-700">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">Описание пляжа</h2>
            <p className="mb-4 text-lg">{beach.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {beach.tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">#{tag}</span>
              ))}
            </div>
            <h3 className="font-semibold mb-2 text-blue-700">Инфраструктура и услуги:</h3>
            <ul className="list-disc pl-5 mb-2">
              {beach.services.map(service => (
                <li key={service} className="mb-1">{service}</li>
              ))}
            </ul>
            {/* Факты */}
            {beach.info && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                {beach.info.length && (
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-blue-600 font-semibold">Длина пляжа</div>
                    <div>{beach.info.length}</div>
                  </div>
                )}
                {beach.info.sand && (
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-blue-600 font-semibold">Песок</div>
                    <div>{beach.info.sand}</div>
                  </div>
                )}
                {beach.info.bestTime && (
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-blue-600 font-semibold">Лучшее время</div>
                    <div>{beach.info.bestTime}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Карта */}
          <div className="mb-8" id="map">
            <h3 className="font-semibold mb-2 text-blue-700">Расположение на карте</h3>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={getEmbedMapUrl(beach.title, beach.map, beach.location)}
                title="Карта пляжа"
                width="100%"
                height="300"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                loading="lazy"
              ></iframe>
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

          {/* Отзывы */}
          <div id="reviews" className="mb-8">
            <h2 className="font-semibold mb-2 text-blue-700">Отзывы: {beach.title}</h2>
            <div className="space-y-4">
              {beach.reviews.map((review, idx) => (
                <Card key={idx} className="p-4 bg-blue-50 rounded-xl shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-blue-700">{review.user}</span>
                    <span className="text-yellow-500">★ {review.rating}</span>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Похожие пляжи */}
          {related.length > 0 && (
            <div id="related" className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Похожие пляжи</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Card key={r.id} className="overflow-hidden rounded-xl border shadow-sm">
                    <Link to={`/beach/${r.id}`} className="block">
                      <img src={r.image} alt={r.title} loading="lazy" className="w-full h-40 object-cover" />
                    </Link>
                    <div className="p-4">
                      <h4 className="font-semibold text-blue-700 mb-1">{r.title}</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {r.tags?.slice(0,3).map((t) => (
                          <span key={t} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full border border-blue-100">#{t}</span>
                        ))}
                      </div>
                      <Link to={`/beach/${r.id}`} className="inline-block">
                        <Button size="sm">Подробнее</Button>
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

