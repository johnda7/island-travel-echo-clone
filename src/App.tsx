import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import PhiPhi2Days1Night from "./pages/PhiPhi2Days1Night";
import { TourPage } from "./components/TourPage";

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
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Специальный тур Phi Phi с оригинальным дизайном */}
              <Route path="/tours/phi-phi-2-days-1-night" element={<PhiPhi2Days1Night />} />
              
              {/* Универсальный роут для всех остальных туров */}
              <Route path="/tours/:tourId" element={<TourPage />} />
              
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
