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
import PhiPhi2Days1Night from "./pages/PhiPhi2Days1Night";
import AdminPanel from "./pages/AdminPanel";
import PearlsAndamanSea from "./pages/PearlsAndamanSea";

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
              
              {/* ЕДИНСТВЕННЫЙ реальный тур Phi Phi */}
              <Route path="/phi-phi-2days" element={<PhiPhi2Days1Night />} />
              
              {/* Новый тур 4 жемчужины */}
              <Route path="/pearls-andaman-sea" element={<PearlsAndamanSea />} />
              
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
