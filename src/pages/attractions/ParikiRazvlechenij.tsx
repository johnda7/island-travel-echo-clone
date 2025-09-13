import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ParikiRazvlechenij: React.FC = () => (
  <>
    <Helmet>
      <title>Парки развлечений Пхукета — шоу, аттракционы, отдых</title>
      <meta name="description" content="Все парки развлечений Пхукета: шоу, аттракционы, тематические парки, фото, советы, карта. Лучшие места для активного и семейного отдыха." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Парки развлечений Пхукета</h1>
        <p className="mb-6 text-lg text-gray-700">На острове множество тематических парков, шоу, аттракционов и зон для активного отдыха. Отлично подойдут для семей и компаний!</p>
        {/* Здесь будет список парков, фото, карта, советы */}
      </main>
      <Footer />
    </div>
  </>
);

export default ParikiRazvlechenij;
