import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

// Существующие страницы
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import AdminPanel from "./pages/AdminPanel";
import BookingPage from "./pages/BookingPage";
import NotFound from "./pages/NotFound";

// Существующие туры
import PhiPhi2Days1Night from "./pages/PhiPhi2Days1Night";
import PearlsAndamanSea from "./pages/PearlsAndamanSea";
import DostoprimechatelnostiPhuketa from "./pages/DostoprimechatelnostiPhuketa";
import RassvetnoePrikljuchenie from "./pages/RassvetnoePrikljuchenie";
import JamesBondIslandTour from "./pages/JamesBondIslandTour";
import ElevenIslandsStandardTour from "./pages/ElevenIslandsStandardTour";
import RachaCoralIslandsTour from "./pages/RachaCoralIslandsTour";
import RaftingSpaAtvTour from "./pages/RaftingSpaAtvTour";
import KaoLakSafariTour from "./pages/KaoLakSafariTour";
import AvatarPlusHangdong from "./pages/AvatarPlusHangdong";
import ElevenIslandsMegaTour from "./pages/ElevenIslandsMegaTour";

// Динамический компонент для CMS туров
import DynamicTourPage from "./components/DynamicTourPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/booking" element={<BookingPage />} />
              
              {/* Статические туры */}
              <Route path="/excursion/phi-phi-2-days-1-night" element={<PhiPhi2Days1Night />} />
              <Route path="/tours/phi-phi-2-days-1-night" element={<PhiPhi2Days1Night />} />
              
              <Route path="/excursion/pearls-andaman-sea" element={<PearlsAndamanSea />} />
              <Route path="/tours/pearls-andaman-sea" element={<PearlsAndamanSea />} />
              
              <Route path="/excursion/dostoprimechatelnosti-phuketa" element={<DostoprimechatelnostiPhuketa />} />
              <Route path="/tours/dostoprimechatelnosti-phuketa" element={<DostoprimechatelnostiPhuketa />} />
              
              <Route path="/excursion/rassvetnoe-prikljuchenie" element={<RassvetnoePrikljuchenie />} />
              <Route path="/tours/rassvetnoe-prikljuchenie" element={<RassvetnoePrikljuchenie />} />

              <Route path="/excursion/james-bond-island" element={<JamesBondIslandTour />} />
              <Route path="/tours/james-bond-island" element={<JamesBondIslandTour />} />
              
              <Route path="/excursion/eleven-islands-standard" element={<ElevenIslandsStandardTour />} />
              <Route path="/tours/eleven-islands-standard" element={<ElevenIslandsStandardTour />} />
              
              <Route path="/excursion/racha-coral-islands" element={<RachaCoralIslandsTour />} />
              <Route path="/tours/racha-coral-islands" element={<RachaCoralIslandsTour />} />
              
              <Route path="/excursion/rafting-spa-atv" element={<RaftingSpaAtvTour />} />
              <Route path="/tours/rafting-spa-atv" element={<RaftingSpaAtvTour />} />
              
              <Route path="/excursion/kao-lak-safari" element={<KaoLakSafariTour />} />
              <Route path="/tours/kao-lak-safari" element={<KaoLakSafariTour />} />
              
              <Route path="/excursion/avatar-plus-hangdong" element={<AvatarPlusHangdong />} />
              <Route path="/tours/avatar-plus-hangdong" element={<AvatarPlusHangdong />} />
              
              <Route path="/excursion/eleven-islands-mega" element={<ElevenIslandsMegaTour />} />
              <Route path="/tours/eleven-islands-mega" element={<ElevenIslandsMegaTour />} />
              
              {/* Динамические туры из CMS */}
              <Route path="/tours/:slug" element={<DynamicTourPage />} />
              
              {/* 404 страница */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
