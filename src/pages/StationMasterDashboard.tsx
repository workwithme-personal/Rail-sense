import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { StationMasterSidebar } from "@/components/layout/StationMasterSidebar";
import { StationVisualization } from "@/components/station/StationVisualization";
import { TrainSchedule } from "@/components/station/TrainSchedule";
import { PlatformStatus } from "@/components/station/PlatformStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import { 
  Activity, 
  Train, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Users,
  MapPin,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StationData {
  id: string;
  name: string;
  code: string;
  totalPlatforms: number;
  activePlatforms: number;
  occupiedPlatforms: number;
  trainsInStation: number;
  upcomingArrivals: number;
  departuresNext30Min: number;
  avgDwellTime: number;
  lastUpdate: string;
}

interface TrainInfo {
  id: string;
  name: string;
  number: string;
  type: 'express' | 'passenger' | 'freight' | 'local';
  platform: number;
  scheduledTime: string;
  actualTime: string;
  status: 'on_time' | 'delayed' | 'arrived' | 'departed' | 'approaching';
  delay: number;
  direction: 'arrival' | 'departure';
}

interface PlatformInfo {
  number: number;
  status: 'occupied' | 'free' | 'maintenance' | 'reserved';
  trainId?: string;
  trainName?: string;
  estimatedClearTime?: string;
  nextTrain?: string;
}

const mockStationData: StationData = {
  id: "stn001",
  name: "Central Junction Station",
  code: "CJN",
  totalPlatforms: 8,
  activePlatforms: 8,
  occupiedPlatforms: 5,
  trainsInStation: 7,
  upcomingArrivals: 12,
  departuresNext30Min: 8,
  avgDwellTime: 4.5,
  lastUpdate: "30 sec ago"
};

const mockTrains: TrainInfo[] = [
  {
    id: "trn001",
    name: "Rajdhani Express",
    number: "12301",
    type: "express",
    platform: 1,
    scheduledTime: "14:30",
    actualTime: "14:33",
    status: "delayed",
    delay: 3,
    direction: "arrival"
  },
  {
    id: "trn002",
    name: "Mumbai Local",
    number: "12002",
    type: "local",
    platform: 3,
    scheduledTime: "14:35",
    actualTime: "14:35",
    status: "on_time",
    delay: 0,
    direction: "departure"
  },
  {
    id: "trn003",
    name: "Goods Special",
    number: "52103",
    type: "freight",
    platform: 7,
    scheduledTime: "14:40",
    actualTime: "14:45",
    status: "approaching",
    delay: 5,
    direction: "arrival"
  },
  {
    id: "trn004",
    name: "Shatabdi Express",
    number: "12005",
    type: "express",
    platform: 2,
    scheduledTime: "14:20",
    actualTime: "14:20",
    status: "departed",
    delay: 0,
    direction: "departure"
  }
];

const mockPlatforms: PlatformInfo[] = [
  { number: 1, status: 'occupied', trainId: 'trn001', trainName: 'Rajdhani Express', estimatedClearTime: '14:45' },
  { number: 2, status: 'free', nextTrain: 'Express at 15:00' },
  { number: 3, status: 'occupied', trainId: 'trn002', trainName: 'Mumbai Local', estimatedClearTime: '14:38' },
  { number: 4, status: 'reserved', nextTrain: 'Freight at 15:15' },
  { number: 5, status: 'occupied', trainId: 'trn005', trainName: 'Chennai Express', estimatedClearTime: '14:50' },
  { number: 6, status: 'maintenance' },
  { number: 7, status: 'free', nextTrain: 'Goods at 14:45' },
  { number: 8, status: 'occupied', trainId: 'trn006', trainName: 'Delhi Express', estimatedClearTime: '15:10' }
];

const StationMasterDashboard = () => {
  const [stationData] = useState<StationData>(mockStationData);
  const [trains] = useState<TrainInfo[]>(mockTrains);
  const [platforms] = useState<PlatformInfo[]>(mockPlatforms);
  const [aiAlerts, setAiAlerts] = useState<string[]>([
    "Platform 3 requires priority departure in 5 minutes",
    "Incoming freight train needs rerouting to Platform 7"
  ]);

  const metrics = [
    {
      label: "Trains in Station",
      value: stationData.trainsInStation,
      icon: Train,
      color: "text-primary"
    },
    {
      label: "Occupied Platforms",
      value: `${stationData.occupiedPlatforms}/${stationData.totalPlatforms}`,
      icon: MapPin,
      color: "text-warning"
    },
    {
      label: "Upcoming Arrivals",
      value: stationData.upcomingArrivals,
      icon: TrendingUp,
      color: "text-success"
    },
    {
      label: "Departures (30m)",
      value: stationData.departuresNext30Min,
      icon: Clock,
      color: "text-info"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StationMasterSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-foreground">
                  Station Master Dashboard
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {stationData.name} ({stationData.code})
                </p>
              </div>
            </div>
            
            {/* System Status */}
            <div className="flex items-center gap-2 md:gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs md:text-sm">
                <Activity className="h-3 w-3 mr-1" />
                Station Online
              </Badge>
              <div className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                Last sync: {stationData.lastUpdate}
              </div>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-6 space-y-6">
            {/* System Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="h-8 w-8 md:h-10 md:w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <metric.icon className={cn("h-4 w-4 md:h-5 md:w-5", metric.color)} />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-lg md:text-2xl font-bold text-foreground">{metric.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Station Visualization */}
              <div className="xl:col-span-2 space-y-6">
                <StationVisualization 
                  platforms={platforms}
                  trains={trains}
                  stationData={stationData}
                />
                
                {/* AI Alerts */}
                {aiAlerts.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-warning" />
                        AI Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {aiAlerts.map((alert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-warning/10 border border-warning/30 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            <span className="text-sm text-foreground">{alert}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setAiAlerts(prev => prev.filter((_, i) => i !== index))}
                            >
                              Dismiss
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => setAiAlerts(prev => prev.filter((_, i) => i !== index))}
                            >
                              Apply
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                <PlatformStatus platforms={platforms} />
                <TrainSchedule trains={trains} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StationMasterDashboard;