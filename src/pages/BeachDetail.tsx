import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBeachById } from "@/data/beaches";

function BeachDetail() {
  const { id } = useParams();
  const beach = id ? getBeachById(id) : undefined;

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
      </Helmet>
      <Header />
      <div className="min-h-screen bg-white pt-16">
        <main className="container mx-auto px-4 py-8">
          {/* Баннер */}
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
            <img src={beach.image} alt={beach.title} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex flex-col justify-end p-8">
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow">{beach.title}</h1>
              <p className="text-lg text-blue-100 max-w-2xl">{beach.location} • Рейтинг: <span className="text-yellow-300 font-bold">★ {beach.rating}</span></p>
            </div>
          </div>

          {/* Галерея */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {beach.gallery.map((img, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-xl shadow-lg">
                <img src={img} alt={beach.title + idx} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Описание и инфраструктура */}
          <div className="mb-8 bg-blue-50 rounded-xl p-6 shadow text-gray-700">
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
          </div>

          {/* Карта */}
          <div className="mb-8">
            <h3 className="font-semibold mb-2 text-blue-700">Расположение на карте</h3>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={beach.map}
                title="Карта пляжа"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Советы и FAQ */}
          <div className="mb-8 bg-white rounded-xl p-6 shadow text-gray-700">
            <h3 className="font-semibold mb-2 text-blue-700">Советы для отдыха на Патонге</h3>
            <ul className="list-disc pl-5 mb-2">
              <li>Лучшее время для посещения — ноябрь-апрель (сухой сезон).</li>
              <li>Для тусовок — Bangla Road, для спокойного отдыха — северная часть пляжа.</li>
              <li>Рекомендуем взять солнцезащитный крем и головной убор.</li>
              <li>Вечером обязательно прогуляйтесь по набережной и рынкам.</li>
              <li>Прокат лежаков и зонтов — от 100 бат/день.</li>
            </ul>
            <h4 className="font-semibold mb-2 text-blue-700">Часто задаваемые вопросы</h4>
            <div className="space-y-2">
              <div className="bg-blue-100 rounded-lg p-3">
                <span className="font-medium">Есть ли спасатели на пляже?</span>
                <div className="text-sm text-gray-700">Да, на Патонге работают спасатели в дневное время.</div>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <span className="font-medium">Можно ли арендовать скутер или велосипед?</span>
                <div className="text-sm text-gray-700">Да, прокат есть рядом с пляжем и в отелях.</div>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <span className="font-medium">Есть ли туалеты и душевые?</span>
                <div className="text-sm text-gray-700">Да, инфраструктура хорошо развита, есть всё необходимое.</div>
              </div>
            </div>
          </div>

          {/* Отзывы */}
          <div className="mb-8">
            <h2 className="font-semibold mb-2 text-blue-700">Отзывы о пляже Патонг</h2>
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

