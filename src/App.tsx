import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
// Импорты новых компактных туров
import { PhiPhiTourPage } from "./tours/phi-phi-2days";
import { PearlsAndamanSeaPage } from "./tours/pearls-andaman-sea";
// Импорты восстановленных полноценных страниц (защищенные файлы)
import PhiPhi2Days1Night from "./pages/PhiPhi2Days1Night";
import PearlsAndamanSea from "./pages/PearlsAndamanSea";
import { TourTemplate } from "./templates/TourTemplate";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              {/* Главная страница */}
              <Route path="/" element={<Index />} />
              
              {/* Основные страницы */}
              <Route path="/tours" element={<Tours />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Компактные туры - новая архитектура "1 тур = 1 файл" */}
              <Route path="/phi-phi-2days" element={<PhiPhiTourPage />} />
              <Route path="/pearls-andaman-sea" element={<PearlsAndamanSeaPage />} />

              {/* ВОССТАНОВЛЕННЫЕ ПОЛНЫЕ СТРАНИЦЫ ТУРОВ (эти пути можно давать клиентам/SEO) */}
              {/* Phi Phi 2 days / 1 night */}
              <Route path="/excursion/phi-phi-2-days-1-night" element={<PhiPhi2Days1Night />} />
              <Route path="/tours/phi-phi-2-days-1-night" element={<PhiPhi2Days1Night />} />
              {/* 4 Pearls of the Andaman Sea */}
              <Route path="/excursion/four-pearls-andaman" element={<PearlsAndamanSea />} />
              <Route path="/tours/four-pearls-andaman" element={<PearlsAndamanSea />} />

              {/* ДИНАМИЧЕСКИЙ ШАБЛОН ТУРА: централизованный маршрут для всех остальных туров */}
              <Route path="/tour/:tourId" element={<TourTemplate />} />
              
              {/* Админ-панель */}
              <Route path="/admin" element={<AdminPanel />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
