import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Hramy: React.FC = () => (
  <>
    <Helmet>
      <title>Храмы Пхукета — буддийские, китайские, фото, советы</title>
      <meta name="description" content="Все храмы Пхукета: буддийские, китайские, фото, советы, карта. Лучшие места для знакомства с культурой и духовностью острова." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Храмы Пхукета</h1>
        <p className="mb-6 text-lg text-gray-700">Пхукет славится своими храмами: буддийские, китайские, индуистские. Это места силы, красоты и духовности. Узнайте, какие храмы стоит посетить!</p>
        {/* Здесь будет список храмов, фото, карта, советы */}
      </main>
      <Footer />
    </div>
  </>
);

export default Hramy;
