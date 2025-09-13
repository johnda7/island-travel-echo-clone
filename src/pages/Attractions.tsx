import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const categories = [
  { id: "plyazhi", title: "Пляжи" },
  { id: "dostoprimechatelnosti", title: "Достопримечательности" },
  { id: "ekskursii", title: "Экскурсии" },
  { id: "slony", title: "Слоны" },
  { id: "akvaparki", title: "Аквапарки" },
  { id: "parki-razvlechenij", title: "Парки развлечений" },
  { id: "smotrovye-ploshchadki", title: "Смотровые площадки" },
  { id: "hramy", title: "Храмы" },
  { id: "muzei", title: "Музеи" },
  { id: "nochnye-rynki", title: "Ночные рынки" },
  { id: "progulochnye", title: "Прогулочные" },
  { id: "torgovye-czentry", title: "Торговые центры" },
  { id: "lutschie-spa-na-phukete", title: "Лучшие СПА на Пхукете" },
  { id: "massazhnye-salony-po-raionam", title: "Массажные салоны по районам" },
  { id: "bani", title: "Бани" },
  { id: "kafe-i-restorany-po-rajonam", title: "Кафе и рестораны по районам" },
  { id: "vidovye-kafe-i-restorany", title: "Видовые кафе и рестораны" },
  { id: "instagramnye-kafe-i-restorany", title: "Инстаграмные кафе и рестораны" },
  { id: "luchshie-kafe-i-restorany", title: "Лучшие кафе и рестораны" },
  { id: "neobychnye-kafe-i-restorany", title: "Необычные кафе и рестораны" },
  { id: "kafe-i-restorany-po-kuhnyam", title: "Кафе и рестораны по кухням" },
  { id: "romantichnye-kafe-i-restorany", title: "Романтичные кафе и рестораны" },
  { id: "burgernye", title: "Бургерные" },
  { id: "kofejni", title: "Кофейни" }
];

const Attractions: React.FC = () => (
  <>
    <Helmet>
      <title>Достопримечательности Пхукета — что посмотреть, лучшие места</title>
      <meta name="description" content="Все категории: пляжи, экскурсии, слоны, аквапарки, парки, храмы, музеи, рынки, прогулки, торговые центры, СПА, массаж, бани, кафе и рестораны." />
    </Helmet>
    <Header />
    <div className="min-h-screen bg-white pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Достопримечательности Пхукета</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(cat => (
            <div key={cat.id} className="bg-blue-50 rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <h2 className="text-2xl font-semibold mb-2 text-blue-700">{cat.title}</h2>
              <a href={`#${cat.id}`} className="mt-auto text-blue-600 underline font-medium">Подробнее</a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default Attractions;
