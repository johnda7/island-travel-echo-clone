import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "pliazhy",
    title: "Пляжи",
    description: "Лучшие пляжи Пхукета для купания, отдыха, водных видов спорта и фотосессий.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    path: "/beaches"
  },
  {
    id: "dostoprimechatelnosti",
    title: "Достопримечательности",
    description: "Главные места, которые стоит увидеть на Пхукете: храмы, смотровые площадки, исторические районы.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    path: "/what-to-visit/dostoprimechatelnosti"
  },
  {
    id: "razvlecheniya",
    title: "Развлечения",
    description: "Парки, шоу, сафари, аквапарки, развлечения для всей семьи и взрослых.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    path: "/what-to-visit/razvlecheniya"
  },
  {
    id: "ekskursii",
    title: "Экскурсии",
    description: "Лучшие экскурсии по острову и окрестностям: морские, наземные, индивидуальные и групповые.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    path: "/what-to-visit/ekskursii"
  },
  {
    id: "restorany",
    title: "Рестораны",
    description: "Где вкусно поесть: лучшие рестораны, кафе, бары и уличная еда Пхукета.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    path: "/what-to-visit/restorany"
  },
  {
    id: "sport",
    title: "Спорт",
    description: "Водные виды спорта, йога, фитнес, гольф, теннис и другие активности.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    path: "/what-to-visit/sport"
  },
  {
    id: "medicina",
    title: "Медицина",
    description: "Медицинские центры, клиники, аптеки, стоматология и страхование.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd2e?auto=format&fit=crop&w=800&q=80",
    path: "/what-to-visit/medicina"
  },
  {
    id: "shopping",
    title: "Шоппинг",
    description: "Торговые центры, рынки, бутики, сувениры и покупки на Пхукете.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    path: "/what-to-visit/shopping"
  },
  {
    id: "spa",
    title: "SPA и массаж",
    description: "Лучшие SPA-центры, массажные салоны, уход за телом и релакс.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    path: "/what-to-visit/spa"
  },
  {
    id: "nightlife",
    title: "Ночная жизнь",
    description: "Бары, клубы, вечеринки, шоу и развлечения ночью.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    path: "/what-to-visit/nightlife"
  },
  {
    id: "deti",
    title: "Отдых с детьми",
    description: "Лучшие места и развлечения для семей с детьми на Пхукете.",
    image: "https://images.unsplash.com/photo-1503457574465-494bba5c7c1b?auto=format&fit=crop&w=800&q=80",
    path: "/what-to-visit/deti"
  }
];

const WhatToVisit: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Что посетить на Пхукете — все разделы, достопримечательности, отдых, развлечения</title>
        <meta name="description" content="Все разделы: достопримечательности, экскурсии, развлечения, рестораны, спорт, медицина, шоппинг, SPA, ночная жизнь, отдых с детьми." />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-white pt-16">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-blue-900">Что посетить на Пхукете</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map(section => (
              <Link to={section.path} key={section.id} className="group bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow border border-gray-100 hover:border-blue-200">
                <div className="h-40 w-full overflow-hidden">
                  <img src={section.image} alt={section.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <h2 className="text-2xl font-semibold mb-2 text-blue-700 group-hover:text-cyan-700 transition-colors">{section.title}</h2>
                  <p className="text-gray-600 mb-4 text-base">{section.description}</p>
                  <span className="mt-auto text-blue-600 underline font-medium group-hover:text-cyan-700 transition-colors">Подробнее</span>
                </div>
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WhatToVisit;
