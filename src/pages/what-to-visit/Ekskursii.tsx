import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Ekskursii: React.FC = () => (
  <>
    <Helmet>
      <title>Экскурсии на Пхукете — морские, островные, джунгли, водопады</title>
      <meta name="description" content="Лучшие экскурсии по Пхукету и соседним островам: морские туры, поездки на Пхи-Пхи, Рача, Симиланские острова, сафари, джунгли, водопады." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Экскурсии на Пхукете</h1>
        <p className="mb-6 text-lg text-gray-700">Откройте для себя лучшие экскурсии: морские туры, поездки на острова, сафари, джунгли, водопады и многое другое. Выберите свой идеальный маршрут!</p>
        {/* Здесь будет список экскурсий, фото, советы, карта */}
      </main>
      <Footer />
    </div>
  </>
);

export default Ekskursii;
