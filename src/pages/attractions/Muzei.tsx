import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Muzei: React.FC = () => (
  <>
    <Helmet>
      <title>Музеи Пхукета — история, искусство, культура</title>
      <meta name="description" content="Все музеи Пхукета: исторические, художественные, культурные, фото, советы, карта. Лучшие места для познавательного отдыха." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Музеи Пхукета</h1>
        <p className="mb-6 text-lg text-gray-700">На острове есть интересные музеи: истории, культуры, искусства, природы. Отличный вариант для познавательного досуга!</p>
        {/* Здесь будет список музеев, фото, карта, советы */}
      </main>
      <Footer />
    </div>
  </>
);

export default Muzei;
