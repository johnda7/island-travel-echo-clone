import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Razvlecheniya: React.FC = () => (
  <>
    <Helmet>
      <title>Развлечения на Пхукете — парки, шоу, аквапарки, сафари</title>
      <meta name="description" content="Парки, шоу, аквапарки, сафари, тематические вечеринки и другие активности для всей семьи на Пхукете." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Развлечения на Пхукете</h1>
        <p className="mb-6 text-lg text-gray-700">Парки, шоу, аквапарки, сафари, тематические вечеринки и другие активности для всей семьи. Выберите лучшие развлечения для вашего отдыха!</p>
        {/* Здесь будет список развлечений, фото, советы, карта */}
      </main>
      <Footer />
    </div>
  </>
);

export default Razvlecheniya;
