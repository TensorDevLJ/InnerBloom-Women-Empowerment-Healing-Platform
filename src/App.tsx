import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={
              <ProtectedRoute>
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
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
