import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tours as ToursComponent } from "@/components/Tours";

const Tours = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
        </div>
        
        {/* Компонент с турами */}
        <ToursComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Tours;
