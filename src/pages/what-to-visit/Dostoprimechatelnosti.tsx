import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Dostoprimechatelnosti: React.FC = () => (
  <>
    <Helmet>
      <title>Достопримечательности Пхукета — что посмотреть, лучшие места</title>
      <meta name="description" content="Храмы, смотровые площадки, исторические здания, природные чудеса, музеи, рынки, парки и другие достопримечательности Пхукета." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Достопримечательности Пхукета</h1>
        <p className="mb-6 text-lg text-gray-700">Пхукет богат на интересные места: храмы, смотровые площадки, исторические здания, природные чудеса, музеи, рынки, парки и многое другое. Откройте для себя лучшие достопримечательности острова!</p>
        {/* Здесь будет список достопримечательностей, фото, карта, советы */}
      </main>
      <Footer />
    </div>
  </>
);

export default Dostoprimechatelnosti;
