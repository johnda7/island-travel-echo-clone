import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tours as ToursComponent } from "@/components/Tours";

const Tours = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Наши туры</h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Выберите незабываемое приключение из нашей коллекции лучших экскурсий по островам Таиланда
          </p>
        </div>
        
        {/* Компонент с турами */}
        <ToursComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Tours;
