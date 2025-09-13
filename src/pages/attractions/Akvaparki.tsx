import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Akvaparki: React.FC = () => (
  <>
    <Helmet>
      <title>Аквапарки Пхукета — лучшие водные развлечения</title>
      <meta name="description" content="Все аквапарки Пхукета: описание, фото, инфраструктура, советы, карта. Лучшие места для водных развлечений и семейного отдыха." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Аквапарки Пхукета</h1>
        <p className="mb-6 text-lg text-gray-700">На Пхукете есть современные аквапарки для детей и взрослых: горки, бассейны, зоны отдыха, кафе и анимация. Отличный вариант для семейного досуга!</p>
        {/* Здесь будет список аквапарков, фото, карта, советы */}
      </main>
      <Footer />
    </div>
  </>
);

export default Akvaparki;
