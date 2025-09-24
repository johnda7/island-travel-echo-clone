import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tours as ToursComponent } from "@/components/Tours";
import { Helmet } from "react-helmet";

const Tours = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Туры и экскурсии на Пхукете | Phuket Go</title>
        <meta
          name="description"
          content="Все туры и экскурсии на Пхукете: морские прогулки, острова, достопримечательности. Выберите свое приключение!"
        />
      </Helmet>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Туры и экскурсии на Пхукете
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Выберите лучшее приключение для незабываемого отдыха в Таиланде
            </p>
          </div>
          <ToursComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tours;
