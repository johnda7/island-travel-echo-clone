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
import DynamicTourPage from "@/components/DynamicTourPage";
// ТОЛЬКО ЗАЩИЩЕННЫЕ СТРАНИЦЫ ТУРОВ (эталоны PhiPhi и Pearls)
import PhiPhi2Days1Night from "./pages/PhiPhi2Days1Night";
import PearlsAndamanSea from "./pages/PearlsAndamanSea";
import DostoprimechatelnostiPhuketa from "./pages/DostoprimechatelnostiPhuketa";
import RassvetnoePrikljuchenie from "./pages/RassvetnoePrikljuchenie";
// НОВЫЕ 6 ТУРОВ
import RaftingSpaAtvTour from "./pages/RaftingSpaAtvTour";
import KaoLakSafariTour from "./pages/KaoLakSafariTour";
import RachaCoralIslandsTour from "./pages/RachaCoralIslandsTour";
import JamesBondIslandTour from "./pages/JamesBondIslandTour";
import AvatarPlusHangdongTour from "./pages/AvatarPlusHangdongTour";
import ElevenIslandsStandardTour from "./pages/ElevenIslandsStandardTour";

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
              
              {/* Динамический роутинг для новых туров из CMS */}
              <Route path="/tours/:slug" element={<DynamicTourPage />} />
              
              {/* ЗАЩИЩЕННЫЕ ПОЛНЫЕ СТРАНИЦЫ ТУРОВ (эталоны) */}
              {/* Phi Phi 2 days / 1 night */}
              <Route path="/excursion/phi-phi-2-days-1-night" element={<PhiPhi2Days1Night />} />
              <Route path="/tours/phi-phi-2-days-1-night" element={<PhiPhi2Days1Night />} />
              {/* 4 Pearls of the Andaman Sea */}
              <Route path="/excursion/pearls-andaman-sea" element={<PearlsAndamanSea />} />
              <Route path="/tours/pearls-andaman-sea" element={<PearlsAndamanSea />} />
              {/* OLD URLS FOR BACKWARD COMPATIBILITY */}
              <Route path="/excursion/four-pearls-andaman" element={<PearlsAndamanSea />} />
              <Route path="/tours/four-pearls-andaman" element={<PearlsAndamanSea />} />
              {/* Достопримечательности Пхукета */}
              <Route path="/excursion/dostoprimechatelnosti-phuketa" element={<DostoprimechatelnostiPhuketa />} />
              <Route path="/tours/dostoprimechatelnosti-phuketa" element={<DostoprimechatelnostiPhuketa />} />
              {/* Рассветное приключение - 4-Й ТУР ВОССТАНОВЛЕН! */}
              <Route path="/excursion/rassvetnoe-prikljuchenie" element={<RassvetnoePrikljuchenie />} />
              <Route path="/tours/rassvetnoe-prikljuchenie" element={<RassvetnoePrikljuchenie />} />
              
              {/* НОВЫЕ 6 ТУРОВ - ПОЛНЫЙ СПИСОК */}
              {/* 1. Рафтинг + SPA + ATV */}
              <Route path="/excursion/rafting-spa-atv-1-day" element={<RaftingSpaAtvTour />} />
              <Route path="/tours/rafting-spa-atv-1-day" element={<RaftingSpaAtvTour />} />
              
              {/* 2. Као Лак Сафари */}
              <Route path="/excursion/kao-lak-safari-1-day" element={<KaoLakSafariTour />} />
              <Route path="/tours/kao-lak-safari-1-day" element={<KaoLakSafariTour />} />
              
              {/* 3. Острова Рача и Корал */}
              <Route path="/excursion/racha-coral-islands-speedboat" element={<RachaCoralIslandsTour />} />
              <Route path="/tours/racha-coral-islands-speedboat" element={<RachaCoralIslandsTour />} />
              
              {/* 4. Остров Джеймса Бонда */}
              <Route path="/excursion/james-bond-island-phang-nga" element={<JamesBondIslandTour />} />
              <Route path="/tours/james-bond-island-phang-nga" element={<JamesBondIslandTour />} />
              
              {/* 5. Аватар Плюс + Хангдонг */}
              <Route path="/excursion/avatar-plus-hangdong-adventure" element={<AvatarPlusHangdongTour />} />
              <Route path="/tours/avatar-plus-hangdong-adventure" element={<AvatarPlusHangdongTour />} />
              
              {/* 6. 11 островов Стандарт */}
              <Route path="/excursion/eleven-islands-standard-speedboat" element={<ElevenIslandsStandardTour />} />
              <Route path="/tours/eleven-islands-standard-speedboat" element={<ElevenIslandsStandardTour />} />
              
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
