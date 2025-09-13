import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Slony: React.FC = () => (
  <>
    <Helmet>
      <title>Слоны на Пхукете — экскурсии, парки, уход</title>
      <meta name="description" content="Экскурсии к слонам, парки, уход, этичный туризм, фото, советы. Где увидеть и пообщаться со слонами на Пхукете." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Слоны на Пхукете</h1>
        <p className="mb-6 text-lg text-gray-700">Слоны — символ Таиланда. На Пхукете есть этичные парки, где можно пообщаться с животными, узнать об уходе и поддержать сохранение популяции.</p>
        {/* Здесь будет список парков, советы, фото, карта */}
      </main>
      <Footer />
    </div>
  </>
);

export default Slony;
