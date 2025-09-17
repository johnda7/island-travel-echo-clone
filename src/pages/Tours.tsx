import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Tours = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Наши туры</h1>
          <p>Страница туров - только отдельные файлы</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tours;
