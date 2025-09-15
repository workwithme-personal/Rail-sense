import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { StationCard, type StationData } from "@/components/dashboard/StationCard";
import { LiveTrackSimulation, type TrainData, type AISuggestion } from "@/components/simulation/LiveTrackSimulation";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Train, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  Users,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockStations: StationData[] = [
  {
    id: "stn001",
    name: "Central Junction",
    code: "CJN",
    trafficLevel: "high",
    activePlatforms: 6,
    totalPlatforms: 8,
    trainsInStation: 12,
    pendingConflicts: 2,
    averageDelay: 8,
    throughput: 45,
    lastUpdate: "2 min ago"
  },
  {
    id: "stn002", 
    name: "Metro Terminal",
    code: "MTR",
    trafficLevel: "medium",
    activePlatforms: 4,
    totalPlatforms: 6,
    trainsInStation: 8,
    pendingConflicts: 1,
    averageDelay: 3,
    throughput: 32,
    lastUpdate: "1 min ago"
  },
  {
    id: "stn003",
    name: "Freight Yard",
    code: "FYD", 
    trafficLevel: "normal",
    activePlatforms: 3,
    totalPlatforms: 5,
    trainsInStation: 5,
    pendingConflicts: 0,
    averageDelay: 2,
    throughput: 18,
    lastUpdate: "30 sec ago"
  },
  {
    id: "stn004",
    name: "Express Hub",
    code: "EXH",
    trafficLevel: "high",
    activePlatforms: 5,
    totalPlatforms: 6,
    trainsInStation: 9,
    pendingConflicts: 3,
    averageDelay: 12,
    throughput: 38,
    lastUpdate: "45 sec ago"
  }
];

const mockTrains: TrainData[] = [
  {
    id: "trn001",
    name: "MGS EXP",
    type: "express",
    currentTrack: 3,
    targetTrack: 5,
    speed: 65,
    priority: 9,
    position: 35,
    delay: 5,
    status: "moving"
  },
  {
    id: "trn002", 
    name: "DFC 321",
    type: "freight",
    currentTrack: 4,
    targetTrack: 5,
    speed: 45,
    priority: 3,
    position: 40,
    delay: 0,
    status: "conflict"
  },
  {
    id: "trn003",
    name: "RAJ EXP",
    type: "passenger", 
    currentTrack: 2,
    targetTrack: 1,
    speed: 80,
    priority: 10,
    position: 65,
    delay: 3,
    status: "moving"
  }
];

const mockSuggestions: AISuggestion[] = [
  {
    id: "sug001",
    type: "hold", 
    trainId: "trn002",
    message: "Hold DFC 321 (freight) for 3 minutes to allow MGS Express to proceed first. This will reduce overall passenger delay by 8 minutes.",
    duration: 3,
    priority: "high"
  },
  {
    id: "sug002",
    type: "reroute",
    trainId: "trn003", 
    message: "Reroute RAJ Express to Platform 2 instead of Platform 1 to optimize platform utilization.",
    alternativeTrack: 2,
    priority: "medium"
  }
];

const Index = () => {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [stations] = useState<StationData[]>(mockStations);
  const [trains] = useState<TrainData[]>(mockTrains);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>(mockSuggestions);
  const [systemMetrics, setSystemMetrics] = useState({
    totalTrains: 24,
    activeConflicts: 6,
    avgSystemDelay: 5.2,
    throughputEfficiency: 82
  });

  // Sort stations by traffic priority
  const sortedStations = [...stations].sort((a, b) => {
    const priority = { high: 3, medium: 2, normal: 1 };
    return priority[b.trafficLevel] - priority[a.trafficLevel];
  });

  const handleStationClick = (stationId: string) => {
    setSelectedStation(selectedStation === stationId ? null : stationId);
  };

  const handleAcceptSuggestion = (suggestionId: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    // In real implementation, this would apply the AI suggestion
  };

  const handleRejectSuggestion = (suggestionId: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    // In real implementation, this would log the override
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Section Controller Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time railway traffic management system
                </p>
              </div>
            </div>
            
            {/* System Status */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <Activity className="h-3 w-3 mr-1" />
                System Online
              </Badge>
              <div className="text-sm text-muted-foreground">
                Last sync: 30 sec ago
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-6 space-y-6">
            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Train className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Trains</p>
                      <p className="text-2xl font-bold text-foreground">{systemMetrics.totalTrains}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Conflicts</p>
                      <p className="text-2xl font-bold text-warning">{systemMetrics.activeConflicts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Delay</p>
                      <p className="text-2xl font-bold text-foreground">{systemMetrics.avgSystemDelay}m</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Efficiency</p>
                      <p className="text-2xl font-bold text-primary">{systemMetrics.throughputEfficiency}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Station Cards */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Controlled Stations ({stations.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sortedStations.map((station) => (
                        <StationCard
                          key={station.id}
                          station={station}
                          onClick={handleStationClick}
                          isSelected={selectedStation === station.id}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Live Track Simulation */}
                {selectedStation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LiveTrackSimulation
                      stationId={selectedStation}
                      trains={trains}
                      suggestions={suggestions}
                      onAcceptSuggestion={handleAcceptSuggestion}
                      onRejectSuggestion={handleRejectSuggestion}
                    />
                  </motion.div>
                )}
              </div>

              {/* AI Assistant */}
              <div className="space-y-6">
                <AIAssistant />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
