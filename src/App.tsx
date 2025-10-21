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
import ContactPage from "./pages/ContactPage";
import AdminPanel from "./pages/AdminPanel";
import BookingPage from "./pages/BookingPage";
import ReviewsPage from "./pages/ReviewsPage";
import NotFound from "./pages/NotFound";
import FAQPage from "./pages/FAQPage";
import BookingHelpPage from "./pages/BookingHelpPage";
import PaymentHelpPage from "./pages/PaymentHelpPage";
import InfoPage from "./pages/InfoPage";

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
import SimilanIslandsNew from "./pages/SimilanIslandsNew";
import SimilanIslandsEarlyNew from "./pages/SimilanIslandsEarlyNew";
import SimilanIslandsSpeedboatNew from "./pages/SimilanIslandsSpeedboatNew";
import FishingSunriseNew from "./pages/FishingSunriseNew";
import RachaCoralSunriseNew from "./pages/RachaCoralSunriseNew";
import RachaCoralRawaiNew from "./pages/RachaCoralRawaiNew";
import PhiPhiSunriseNew from "./pages/PhiPhiSunriseNew";
import FivePearls2DaysNew from "./pages/FivePearls2DaysNew";

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
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/about" element={<ContactPage />} />
                
                {/* Info & Help pages */}
                <Route path="/info" element={<InfoPage />} />
                <Route path="/help/faq" element={<FAQPage />} />
                <Route path="/help/booking" element={<BookingHelpPage />} />
                <Route path="/help/payment" element={<PaymentHelpPage />} />
                <Route path="/help/contacts" element={<ContactPage />} />
                
                {/* Старые URL - редиректы */}
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/booking-help" element={<BookingHelpPage />} />
                <Route path="/payment-help" element={<PaymentHelpPage />} />
              
              {/* Статические туры */}
              <Route path="/excursion/phi-phi-2-days-1-night" element={<PhiPhi2Days1NightNew />} />
              <Route path="/tours/phi-phi-2-days-1-night" element={<PhiPhi2Days1NightNew />} />
              <Route path="/tours/phi-phi-2days" element={<PhiPhi2Days1NightNew />} /> {/* Альтернативный URL без дефисов */}
              
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
              
              <Route path="/excursion/similan-islands" element={<SimilanIslandsNew />} />
              <Route path="/tours/similan-islands" element={<SimilanIslandsNew />} />
              
              <Route path="/excursion/similan-islands-early" element={<SimilanIslandsEarlyNew />} />
              <Route path="/tours/similan-islands-early" element={<SimilanIslandsEarlyNew />} />
              
              <Route path="/excursion/similan-islands-speedboat" element={<SimilanIslandsSpeedboatNew />} />
              <Route path="/tours/similan-islands-speedboat" element={<SimilanIslandsSpeedboatNew />} />
              
              <Route path="/excursion/fishing-sunrise" element={<FishingSunriseNew />} />
              <Route path="/tours/fishing-sunrise" element={<FishingSunriseNew />} />
              
              <Route path="/excursion/racha-coral-sunrise" element={<RachaCoralSunriseNew />} />
              <Route path="/tours/racha-coral-sunrise" element={<RachaCoralSunriseNew />} />
              
              <Route path="/excursion/racha-coral-rawai" element={<RachaCoralRawaiNew />} />
              <Route path="/tours/racha-coral-rawai" element={<RachaCoralRawaiNew />} />
              
              <Route path="/excursion/phi-phi-sunrise" element={<PhiPhiSunriseNew />} />
              <Route path="/tours/phi-phi-sunrise" element={<PhiPhiSunriseNew />} />
              
              <Route path="/excursion/five-pearls-2days" element={<FivePearls2DaysNew />} />
              <Route path="/tours/five-pearls-2days" element={<FivePearls2DaysNew />} />
              
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
