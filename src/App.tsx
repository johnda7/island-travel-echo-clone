
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
          <Route path="/excursion/11-islands-standard" element={<ElevenIslandsStandard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
