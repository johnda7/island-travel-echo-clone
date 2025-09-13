import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SmotrovyePloshchadki: React.FC = () => (
  <>
    <Helmet>
      <title>Смотровые площадки Пхукета — лучшие виды и фото</title>
      <meta name="description" content="Все смотровые площадки Пхукета: описание, фото, советы, карта. Лучшие места для панорамных видов и фотосессий." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Смотровые площадки Пхукета</h1>
        <p className="mb-6 text-lg text-gray-700">Панорамные виды на море, закаты, джунгли и город. Лучшие точки для фото и наслаждения природой!</p>
        {/* Здесь будет список площадок, фото, карта, советы */}
      </main>
      <Footer />
    </div>
  </>
);

export default SmotrovyePloshchadki;
