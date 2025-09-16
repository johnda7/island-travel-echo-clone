import { Toaster } from "@/components/ui/toaster";
import PhiPhiBooking from "@/pages/PhiPhiBooking";
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
import CityTours from "./pages/CityTours";
import BeachTours from "./pages/BeachTours";
import AdventureTours from "./pages/AdventureTours";
import GroupTours from "./pages/GroupTours";
import ExcursionDetail from "./pages/ExcursionDetail";
import CoralIslandParasailing from "./pages/CoralIslandParasailing";
import RachaYaiIsland from "./pages/RachaYaiIsland";
import MayaBaySunrise from "./pages/MayaBaySunrise";
import KohPhiPhiLehLagoon from "./pages/KohPhiPhiLehLagoon";
import WhaleWatchingTour from "./pages/WhaleWatchingTour";
import PhiPhiIslands from "./pages/PhiPhiIslands";
import PhiPhi2Days1Night from "./pages/PhiPhi2Days1Night";
import BookPhiPhi2Days from "./pages/BookPhiPhi2Days";
import BookPhiPhi2Days1Night from "./pages/BookPhiPhi2Days1Night";
import PhiPhiReservation from "./pages/PhiPhiReservation";

// NEW UNIFIED TOUR SYSTEM - WordPress-like centralized tours
import PhiPhi2Days1NightNew from "./pages/PhiPhi2Days1NightNew";
import BookPhiPhi2Days1NightNew from "./pages/BookPhiPhi2Days1NightNew";

import AdminOrders from "./pages/AdminOrders";
import NotFound from "./pages/NotFound";

// New marine excursions from phuketgo
import ElevenIslands from "./pages/ElevenIslands";
import FourPearlsAndaman from "./pages/FourPearlsAndaman"; 
import RachaCoral from "./pages/RachaCoral";
import SimilanIslands from "./pages/SimilanIslands";

// Universal tour template
import { TourPage } from "./components/tours/TourPage";

import BeachesPage from "./pages/Beaches";
import BeachDetail from "./pages/BeachDetail";
import WhatToVisit from "./pages/WhatToVisit";
import Attractions from "./pages/Attractions";
import Plyazhi from "./pages/attractions/Plyazhi";
import Dostoprimechatelnosti from "./pages/attractions/Dostoprimechatelnosti";
import Ekskursii from "./pages/attractions/Ekskursii";
import Slony from "./pages/attractions/Slony";
import Akvaparki from "./pages/attractions/Akvaparki";
import ParikiRazvlechenij from "./pages/attractions/ParikiRazvlechenij";
import SmotrovyePloshchadki from "./pages/attractions/SmotrovyePloshchadki";
import Hramy from "./pages/attractions/Hramy";
import Muzei from "./pages/attractions/Muzei";
import NochnyeRynki from "./pages/attractions/NochnyeRynki";
import PhuketSightseeingNoShopping from "./pages/PhuketSightseeingNoShopping";

// What-to-visit components
import WhatToVisitDostoprimechatelnosti from "./pages/what-to-visit/Dostoprimechatelnosti";
import WhatToVisitEkskursii from "./pages/what-to-visit/Ekskursii";
import WhatToVisitRazvlecheniya from "./pages/what-to-visit/Razvlecheniya";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Use basename so routes work under GitHub Pages subpath (Vite's base -> import.meta.env.BASE_URL) */}
      <HashRouter>
        <ErrorBoundary>
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
          <Route path="/category/plyazhi" element={<BeachesPage />} />
          <Route path="/beaches" element={<BeachesPage />} />
          <Route path="/beach/:id" element={<BeachDetail />} />
          <Route path="/excursion/:slug" element={<ExcursionDetail />} />
          {/* Unified tours route uses the new universal TourPage template */}
          <Route path="/tours/:slug" element={<TourPage />} />
          <Route path="/what-to-visit" element={<WhatToVisit />} />
          <Route path="/what-to-visit/dostoprimechatelnosti" element={<WhatToVisitDostoprimechatelnosti />} />
          <Route path="/what-to-visit/ekskursii" element={<WhatToVisitEkskursii />} />
          <Route path="/what-to-visit/razvlecheniya" element={<WhatToVisitRazvlecheniya />} />
          <Route path="/dostoprimechatelnosti" element={<Attractions />} />
          <Route path="/attractions/plyazhi" element={<Plyazhi />} />
          <Route path="/attractions/dostoprimechatelnosti" element={<Dostoprimechatelnosti />} />
          <Route path="/attractions/ekskursii" element={<Ekskursii />} />
          <Route path="/attractions/slony" element={<Slony />} />
          <Route path="/attractions/akvaparki" element={<Akvaparki />} />
          <Route path="/attractions/parki-razvlechenij" element={<ParikiRazvlechenij />} />
          <Route path="/attractions/smotrovye-ploshchadki" element={<SmotrovyePloshchadki />} />
          <Route path="/attractions/hramy" element={<Hramy />} />
          <Route path="/attractions/muzei" element={<Muzei />} />
          <Route path="/attractions/nochnye-rynki" element={<NochnyeRynki />} />
          
          {/* Specific excursion routes */}

          <Route path="/excursion/coral-island-parasailing" element={<CoralIslandParasailing />} />
          <Route path="/excursion/racha-yai-island" element={<RachaYaiIsland />} />
          <Route path="/excursion/maya-bay-sunrise" element={<MayaBaySunrise />} />
          <Route path="/excursion/koh-phi-phi-leh-lagoon" element={<KohPhiPhiLehLagoon />} />
          <Route path="/excursion/whale-watching-tour" element={<WhaleWatchingTour />} />
          <Route path="/excursion/phi-phi-2-days-1-night" element={<PhiPhi2Days1Night />} />
          <Route path="/book/phi-phi-2-days-1-night" element={<BookPhiPhi2Days />} />
          <Route path="/book/phi-phi-treasure-2d-1n-standard/reserv" element={<BookPhiPhi2Days1Night />} />
          <Route path="/excursion/dostoprimechatelnosti-phuketa-1-den-obzornaja-jekskursija-bez-shopinga" element={<PhuketSightseeingNoShopping />} />
          
          {/* New marine excursions from phuketgo */}
          <Route path="/excursion/eleven-islands" element={<TourPage tourSlug="11-ostrovov" />} />
          <Route path="/excursion/11-ostrovov" element={<TourPage tourSlug="11-ostrovov" />} />
          <Route path="/excursion/11-islands" element={<TourPage tourSlug="11-ostrovov" />} />
          <Route path="/excursion/four-pearls-andaman" element={<TourPage tourSlug="four-pearls-andaman" />} />
          <Route path="/excursion/four-pearls" element={<TourPage tourSlug="four-pearls-andaman" />} />
          <Route path="/excursion/racha-coral" element={<TourPage tourSlug="racha-coral" />} />
          <Route path="/excursion/similan-islands" element={<SimilanIslands />} />
          <Route path="/excursion/james-bond-island" element={<TourPage tourSlug="james-bond-island" />} />
          
          {/* NEW UNIFIED TOUR SYSTEM - Centralized WordPress-like tours */}
          <Route path="/tours-new/phi-phi-2-days-1-night" element={<PhiPhi2Days1NightNew />} />
          <Route path="/book-new/phi-phi-2-days-1-night" element={<BookPhiPhi2Days1NightNew />} />
          
          {/* Tours routes - новый формат для централизованных данных */}
          <Route path="/tours/eleven-islands" element={<TourPage tourSlug="11-ostrovov" />} />
          <Route path="/tours/11-ostrovov" element={<TourPage tourSlug="11-ostrovov" />} />
          <Route path="/tours/11-islands" element={<TourPage tourSlug="11-ostrovov" />} />
          <Route path="/tours/four-pearls-andaman" element={<TourPage tourSlug="four-pearls-andaman" />} />
          <Route path="/tours/four-pearls" element={<TourPage tourSlug="four-pearls-andaman" />} />
          <Route path="/tours/racha-coral" element={<TourPage tourSlug="racha-coral" />} />
          <Route path="/tours/similan-islands" element={<SimilanIslands />} />
          <Route path="/tours/james-bond-island" element={<TourPage tourSlug="james-bond-island" />} />
          <Route path="/tours/phi-phi-2-days-1-night" element={<PhiPhi2Days1Night />} />
          
          {/* Reservation routes */}
          <Route path="/tours/phi-phi-2-days-1-night/reservation" element={<PhiPhiReservation />} />
          <Route path="/reserv/phi-phi-2-days-1-night" element={<PhiPhiReservation />} />
          
          {/* Booking routes for marine excursions */}
          <Route path="/book/four-pearls-andaman/reserv" element={<PhiPhiBooking />} />
          <Route path="/book/racha-coral-islands/reserv" element={<PhiPhiBooking />} />
          
          {/* Admin Panel */}
          <Route path="/admin/orders" element={<AdminOrders />} />
          
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
        </ErrorBoundary>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
