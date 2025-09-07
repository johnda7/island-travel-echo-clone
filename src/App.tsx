
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import ContactPage from "./pages/ContactPage";
import CityTours from "./pages/CityTours";
import BeachTours from "./pages/BeachTours";
import AdventureTours from "./pages/AdventureTours";
import GroupTours from "./pages/GroupTours";
import ExcursionDetail from "./pages/ExcursionDetail";
import ElevenIslandsStandard from "./pages/ElevenIslandsStandard";
import PhiPhiIslandsSpeedboat from "./pages/PhiPhiIslandsSpeedboat";
import JamesBondIsland from "./pages/JamesBondIsland";
import CoralIslandParasailing from "./pages/CoralIslandParasailing";
import RachaYaiIsland from "./pages/RachaYaiIsland";
import MayaBaySunrise from "./pages/MayaBaySunrise";
import KohPhiPhiLehLagoon from "./pages/KohPhiPhiLehLagoon";
import WhaleWatchingTour from "./pages/WhaleWatchingTour";
import PhiPhiIslands from "./pages/PhiPhiIslands";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/category/city-tours" element={<CityTours />} />
          <Route path="/category/beach-tours" element={<BeachTours />} />
          <Route path="/category/adventure-tours" element={<AdventureTours />} />
          <Route path="/category/group-tours" element={<GroupTours />} />
          <Route path="/excursion/:slug" element={<ExcursionDetail />} />
          
          {/* Specific excursion routes */}
          <Route path="/excursion/11-islands-standard" element={<ElevenIslandsStandard />} />
          <Route path="/excursion/phi-phi-islands-speedboat" element={<PhiPhiIslandsSpeedboat />} />
          <Route path="/excursion/james-bond-island" element={<JamesBondIsland />} />
          <Route path="/excursion/coral-island-parasailing" element={<CoralIslandParasailing />} />
          <Route path="/excursion/racha-yai-island" element={<RachaYaiIsland />} />
          <Route path="/excursion/maya-bay-sunrise" element={<MayaBaySunrise />} />
          <Route path="/excursion/koh-phi-phi-leh-lagoon" element={<KohPhiPhiLehLagoon />} />
          <Route path="/excursion/whale-watching-tour" element={<WhaleWatchingTour />} />
          
          {/* Phi Phi Islands Category Page */}
          <Route path="/phi-phi-islands" element={<PhiPhiIslands />} />
          
          {/* Остальные 33 морские экскурсии используют общий шаблон ExcursionDetail */}
          <Route path="/excursion/bamboo-island-snorkeling" element={<ExcursionDetail />} />
          <Route path="/excursion/hong-island-krabi" element={<ExcursionDetail />} />
          <Route path="/excursion/koh-yao-noi-exploration" element={<ExcursionDetail />} />
          <Route path="/excursion/sunset-dinner-cruise" element={<ExcursionDetail />} />
          <Route path="/excursion/speedboat-island-hopping" element={<ExcursionDetail />} />
          <Route path="/excursion/sea-canoe-phang-nga" element={<ExcursionDetail />} />
          <Route path="/excursion/big-boat-phi-phi" element={<ExcursionDetail />} />
          <Route path="/excursion/private-longtail-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/fishing-tour-andaman" element={<ExcursionDetail />} />
          <Route path="/excursion/kayak-ao-thalane" element={<ExcursionDetail />} />
          <Route path="/excursion/koh-lanta-snorkeling" element={<ExcursionDetail />} />
          <Route path="/excursion/emerald-cave-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/railay-beach-climbing" element={<ExcursionDetail />} />
          <Route path="/excursion/john-gray-sea-canoe" element={<ExcursionDetail />} />
          <Route path="/excursion/koh-rok-snorkeling" element={<ExcursionDetail />} />
          <Route path="/excursion/night-fishing-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/luxury-yacht-charter" element={<ExcursionDetail />} />
          <Route path="/excursion/snorkeling-safari" element={<ExcursionDetail />} />
          <Route path="/excursion/sea-eagle-watching" element={<ExcursionDetail />} />
          <Route path="/excursion/cave-exploration-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/turtle-sanctuary-visit" element={<ExcursionDetail />} />
          <Route path="/excursion/mangrove-ecosystem-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/sunset-kayaking" element={<ExcursionDetail />} />
          <Route path="/excursion/coral-restoration-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/floating-market-sea-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/dolphin-watching-cruise" element={<ExcursionDetail />} />
          <Route path="/excursion/sea-plane-island-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/underwater-scooter-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/stand-up-paddle-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/glass-bottom-boat-tour" element={<ExcursionDetail />} />
          <Route path="/excursion/multi-day-sailing-adventure" element={<ExcursionDetail />} />
          <Route path="/excursion/similan-islands-diving" element={<ExcursionDetail />} />
          <Route path="/excursion/krabi-four-islands" element={<ExcursionDetail />} />
          <Route path="/excursion/koh-samui-angthong" element={<ExcursionDetail />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
