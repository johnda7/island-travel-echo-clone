import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Plyazhi: React.FC = () => (
  <>
    <Helmet>
      <title>Пляжи Пхукета — лучшие пляжи для отдыха, купания и спорта</title>
      <meta name="description" content="Все пляжи Пхукета: описание, фото, инфраструктура, советы, карта. Лучшие места для купания, релакса, водных видов спорта и фотосессий." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Пляжи Пхукета</h1>
        <p className="mb-6 text-lg text-gray-700">На Пхукете десятки пляжей: от шумных и тусовочных до уединённых и семейных. Здесь вы найдёте пляжи для сёрфинга, романтики, активного отдыха и релакса. Выберите свой идеальный пляж по фильтрам и сортировке ниже.</p>
        {/* Здесь будет список пляжей, фильтры, карта и галерея */}
      </main>
      <Footer />
    </div>
  </>
);

export default Plyazhi;
