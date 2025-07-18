import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MagicBox from "./pages/MagicBox";
import SafetyHub from "./pages/SafetyHub";
import AnonymousReporter from "./pages/AnonymousReporter";
import KnowYourRights from "./pages/KnowYourRights";
import WellnessCorner from "./pages/WellnessCorner";
import EmpowermentZone from "./pages/EmpowermentZone";
import CampaignWall from "./pages/CampaignWall";
import CommunityBoard from "./pages/CommunityBoard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/magic-box" element={<MagicBox />} />
            <Route path="/safety-hub" element={<SafetyHub />} />
            <Route path="/report" element={<AnonymousReporter />} />
            <Route path="/rights" element={<KnowYourRights />} />
            <Route path="/wellness" element={<WellnessCorner />} />
            <Route path="/empowerment" element={<EmpowermentZone />} />
            <Route path="/campaigns" element={<CampaignWall />} />
            <Route path="/community" element={<CommunityBoard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
