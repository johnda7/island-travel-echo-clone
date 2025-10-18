import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { TelegramProvider } from "@/contexts/TelegramContext";

// Существующие страницы
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import AdminPanel from "./pages/AdminPanel";
import BookingPage from "./pages/BookingPage";
import NotFound from "./pages/NotFound";
import FAQPage from "./pages/FAQPage";

// Существующие туры
import PearlsAndamanSeaNew from "./pages/PearlsAndamanSeaNew";
import DostoprimechatelnostiPhuketaNew from "./pages/DostoprimechatelnostiPhuketaNew";
import JamesBondIslandTourNew from "./pages/JamesBondIslandTourNew";
import RachaCoralIslandsTourNew from "./pages/RachaCoralIslandsTourNew";
import RaftingSpaAtvTourNew from "./pages/RaftingSpaAtvTourNew";
import KaoLakSafariTourNew from "./pages/KaoLakSafariTourNew";
import AvatarPlusHangdongNew from "./pages/AvatarPlusHangdongNew";
import ElevenIslandsMegaTourNew from "./pages/ElevenIslandsMegaTourNew";
import PhangNgaSkywalkNew from "./pages/PhangNgaSkywalkNew";
import CheoLanLakeNew from "./pages/CheoLanLakeNew";
import PhiPhi2Days1NightNew from "./pages/PhiPhi2Days1NightNew";

// Динамический компонент для CMS туров
import DynamicTourPage from "./components/DynamicTourPage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/help/faq" element={<FAQPage />} />
              
              {/* Статические туры */}
              <Route path="/excursion/phi-phi-2-days-1-night" element={<PhiPhi2Days1NightNew />} />
              <Route path="/tours/phi-phi-2-days-1-night" element={<PhiPhi2Days1NightNew />} />
              <Route path="/tours/phi-phi-2days" element={<PhiPhi2Days1NightNew />} />
              
              <Route path="/excursion/pearls-andaman-sea" element={<PearlsAndamanSeaNew />} />
              <Route path="/tours/pearls-andaman-sea" element={<PearlsAndamanSeaNew />} />
              
              <Route path="/excursion/dostoprimechatelnosti-phuketa" element={<DostoprimechatelnostiPhuketaNew />} />
              <Route path="/tours/dostoprimechatelnosti-phuketa" element={<DostoprimechatelnostiPhuketaNew />} />

              <Route path="/excursion/james-bond-island-phang-nga" element={<JamesBondIslandTourNew />} />
              <Route path="/tours/james-bond-island-phang-nga" element={<JamesBondIslandTourNew />} />
              
              <Route path="/excursion/racha-coral-islands-speedboat" element={<RachaCoralIslandsTourNew />} />
              <Route path="/tours/racha-coral-islands-speedboat" element={<RachaCoralIslandsTourNew />} />
              
              <Route path="/excursion/rafting-spa-atv-1-day" element={<RaftingSpaAtvTourNew />} />
              <Route path="/tours/rafting-spa-atv-1-day" element={<RaftingSpaAtvTourNew />} />
              <Route path="/excursion/rafting-spa-atv" element={<RaftingSpaAtvTourNew />} />
              <Route path="/tours/rafting-spa-atv" element={<RaftingSpaAtvTourNew />} />
              
              <Route path="/excursion/kao-lak-safari-1-day" element={<KaoLakSafariTourNew />} />
              <Route path="/tours/kao-lak-safari-1-day" element={<KaoLakSafariTourNew />} />
              
              <Route path="/excursion/avatar-plus-hangdong" element={<AvatarPlusHangdongNew />} />
              <Route path="/tours/avatar-plus-hangdong" element={<AvatarPlusHangdongNew />} />
              {/* Редирект для старого URL - ВЫШЕ динамического роута */}
              <Route path="/tours/avatar-plus-hangdong-adventure" element={<AvatarPlusHangdongNew />} />
              
              <Route path="/excursion/eleven-islands-mega" element={<ElevenIslandsMegaTourNew />} />
              <Route path="/tours/eleven-islands-mega" element={<ElevenIslandsMegaTourNew />} />
              
              <Route path="/excursion/phang-nga-skywalk" element={<PhangNgaSkywalkNew />} />
              <Route path="/tours/phang-nga-skywalk" element={<PhangNgaSkywalkNew />} />
              
              <Route path="/excursion/cheow-lan-lake" element={<CheoLanLakeNew />} />
              <Route path="/tours/cheow-lan-lake" element={<CheoLanLakeNew />} />
              
              {/* ТЕСТОВЫЕ новые версии на template */}
              <Route path="/tours/cheow-lan-lake-new" element={<CheoLanLakeNew />} />
              
              {/* Динамические туры из CMS - ПОСЛЕДНИЕ */}
              <Route path="/tours/:slug" element={<DynamicTourPage />} />
              
              {/* 404 страница */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </HashRouter>
      </TooltipProvider>
    </TelegramProvider>
    </QueryClientProvider>
  );
}

export default App;
