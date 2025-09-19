import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Training from "./pages/Training";
import TrainTracking from "./pages/TrainTracking";
import StationOverview from "./pages/StationOverview";
import AIAssistant from "./pages/AIAssistant";
import TeamManagement from "./pages/TeamManagement";
import AlertsWarnings from "./pages/AlertsWarnings";
import SystemSettings from "./pages/SystemSettings";
import StationMasterDashboard from "./pages/StationMasterDashboard";
import ChiefControllerDashboard from "./pages/ChiefControllerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LoginPage onLogin={(role) => {
              setUserRole(role);
              setIsAuthenticated(true);
            }} />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Show appropriate dashboard based on user role
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Chief Controller Routes */}
            {userRole === 'chief_controller' && (
              <>
                <Route path="/" element={<ChiefControllerDashboard />} />
                <Route path="/sections" element={<Index />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/train-tracking" element={<TrainTracking />} />
                <Route path="/station/:stationId" element={<StationOverview />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/training" element={<Training />} />
                <Route path="/team" element={<TeamManagement />} />  
                <Route path="/alerts" element={<AlertsWarnings />} />
                <Route path="/settings" element={<SystemSettings />} />
              </>
            )}

            {/* Section Controller Routes */}
            {userRole === 'section_controller' && (
              <>
                <Route path="/" element={<Index />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/train-tracking" element={<TrainTracking />} />
                <Route path="/station/:stationId" element={<StationOverview />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/training" element={<Training />} />
                <Route path="/team" element={<TeamManagement />} />
                <Route path="/alerts" element={<AlertsWarnings />} />
                <Route path="/settings" element={<SystemSettings />} />
              </>
            )}
            
            {/* Station Master Routes */}
            {userRole === 'station_master' && (
              <>
                <Route path="/" element={<StationMasterDashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/training" element={<Training />} />
                <Route path="/alerts" element={<AlertsWarnings />} />
                <Route path="/settings" element={<SystemSettings />} />
              </>
            )}
            
            {/* Admin Routes (keeping for backward compatibility) */}
            {userRole === 'admin' && (
              <>
                <Route path="/" element={<ChiefControllerDashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/train-tracking" element={<TrainTracking />} />
                <Route path="/station/:stationId" element={<StationOverview />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/training" element={<Training />} />
                <Route path="/team" element={<TeamManagement />} />
                <Route path="/alerts" element={<AlertsWarnings />} />
                <Route path="/settings" element={<SystemSettings />} />
                <Route path="/station-master" element={<StationMasterDashboard />} />
              </>
            )}
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
