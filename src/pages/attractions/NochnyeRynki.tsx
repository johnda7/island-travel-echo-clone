import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NochnyeRynki: React.FC = () => (
  <>
    <Helmet>
      <title>Ночные рынки Пхукета — шоппинг, еда, атмосфера</title>
      <meta name="description" content="Все ночные рынки Пхукета: шоппинг, еда, сувениры, фото, советы, карта. Лучшие места для вечерних прогулок и покупок." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Ночные рынки Пхукета</h1>
        <p className="mb-6 text-lg text-gray-700">Вечером на Пхукете открываются яркие рынки: еда, сувениры, одежда, музыка и атмосфера праздника. Узнайте, куда сходить вечером!</p>
        {/* Здесь будет список рынков, фото, советы, карта */}
      </main>
      <Footer />
    </div>
  </>
);

export default NochnyeRynki;
