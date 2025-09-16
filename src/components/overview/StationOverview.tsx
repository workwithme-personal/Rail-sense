import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin,
  Train,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  Activity,
  BarChart3,
  Calendar,
  Wrench,
  Signal
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StationOverviewData {
  id: string;
  name: string;
  code: string;
  location: string;
  coordinates: { lat: number; lng: number };
  trafficLevel: 'high' | 'medium' | 'normal';
  
  // Infrastructure
  totalPlatforms: number;
  activePlatforms: number;
  totalTracks: number;
  activeTracks: number;
  
  // Current Operations
  trainsInStation: number;
  pendingArrivals: number;
  pendingDepartures: number;
  passengerCount: number;
  
  // Performance Metrics
  averageDelay: number;
  throughput: number;
  utilizationRate: number;
  punctualityRate: number;
  
  // Issues & Maintenance
  pendingConflicts: number;
  maintenanceScheduled: number;
  signalStatus: 'operational' | 'warning' | 'error';
  
  // Historical Data
  dailyTrainCount: number;
  monthlyThroughput: number;
  
  lastUpdate: string;
}

interface StationOverviewProps {
  stationId?: string;
  className?: string;
}

interface Station {
  id: string;
  name: string;
  code: string;
  location: string;
  trafficLevel: 'high' | 'medium' | 'normal';
  platforms: number;
  activeTrains: number;
  conflicts: number;
  efficiency: number;
}

const mockStationData: StationOverviewData = {
  id: "stn001",
  name: "Central Junction",
  code: "CJN",
  location: "New Delhi, Delhi",
  coordinates: { lat: 28.6139, lng: 77.2090 },
  trafficLevel: "high",
  
  totalPlatforms: 8,
  activePlatforms: 6,
  totalTracks: 12,
  activeTracks: 10,
  
  trainsInStation: 12,
  pendingArrivals: 8,
  pendingDepartures: 5,
  passengerCount: 3250,
  
  averageDelay: 8,
  throughput: 45,
  utilizationRate: 78,
  punctualityRate: 85,
  
  pendingConflicts: 2,
  maintenanceScheduled: 1,
  signalStatus: 'operational',
  
  dailyTrainCount: 145,
  monthlyThroughput: 4350,
  
  lastUpdate: "2 min ago"
};

const trafficLevelConfig = {
  high: { color: 'traffic-high', label: 'Critical Traffic', variant: 'destructive' as const },
  medium: { color: 'traffic-medium', label: 'Medium Traffic', variant: 'default' as const },
  normal: { color: 'traffic-normal', label: 'Normal Traffic', variant: 'secondary' as const },
};

const mockStations: Station[] = [
  { id: 'stn001', name: 'Central Junction', code: 'CJN', location: 'New Delhi', trafficLevel: 'high', platforms: 8, activeTrains: 12, conflicts: 2, efficiency: 78 },
  { id: 'stn002', name: 'Metro Hub', code: 'MHB', location: 'Mumbai', trafficLevel: 'medium', platforms: 6, activeTrains: 8, conflicts: 1, efficiency: 85 },
  { id: 'stn003', name: 'Express Terminal', code: 'EXT', location: 'Bangalore', trafficLevel: 'high', platforms: 10, activeTrains: 15, conflicts: 3, efficiency: 72 },
  { id: 'stn004', name: 'Freight Hub', code: 'FHB', location: 'Chennai', trafficLevel: 'medium', platforms: 5, activeTrains: 6, conflicts: 0, efficiency: 92 },
  { id: 'stn005', name: 'Regional Station', code: 'RST', location: 'Hyderabad', trafficLevel: 'normal', platforms: 4, activeTrains: 4, conflicts: 0, efficiency: 88 },
];

export function StationOverview({ stationId, className }: StationOverviewProps) {
  const [selectedStation, setSelectedStation] = useState<string | null>(stationId || null);
  const [station] = useState<StationOverviewData>(mockStationData);

  if (!selectedStation) {
    // Show station list
    return (
      <div className={cn("space-y-6", className)}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Station Management</h1>
          <Badge variant="outline" className="text-sm">
            {mockStations.length} Stations Under Control
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockStations.map((stn) => {
            const config = trafficLevelConfig[stn.trafficLevel];
            return (
              <motion.div
                key={stn.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200"
                  onClick={() => setSelectedStation(stn.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{stn.name}</h3>
                        <p className="text-sm text-muted-foreground">{stn.code} • {stn.location}</p>
                      </div>
                      <Badge variant={config.variant} className="text-xs">
                        {config.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Platforms:</span>
                        <p className="font-medium">{stn.platforms}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active Trains:</span>
                        <p className="font-medium">{stn.activeTrains}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Conflicts:</span>
                        <p className={cn("font-medium", stn.conflicts > 0 ? "text-destructive" : "text-success")}>
                          {stn.conflicts}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Efficiency:</span>
                        <p className="font-medium">{stn.efficiency}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  const config = trafficLevelConfig[station.trafficLevel];

  return (
    <div className={cn("space-y-6", className)}>
      <Button 
        variant="outline" 
        onClick={() => setSelectedStation(null)}
        className="mb-4"
      >
        ← Back to Station List
      </Button>
      {/* Station Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">{station.name}</h1>
                <Badge variant="outline" className="text-sm">
                  {station.code}
                </Badge>
              </div>
              <p className="text-muted-foreground">{station.location}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Coordinates: {station.coordinates.lat}, {station.coordinates.lng}
              </p>
            </div>
            
            <div className="text-right space-y-2">
              <Badge variant={config.variant} className="text-sm">
                {config.label}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span>Last updated: {station.lastUpdate}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Train className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trains in Station</p>
                <p className="text-2xl font-bold">{station.trainsInStation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Passengers</p>
                <p className="text-2xl font-bold">{station.passengerCount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Delay</p>
                <p className="text-2xl font-bold text-warning">{station.averageDelay}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold text-primary">{station.utilizationRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="operations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="h-5 w-5" />
                  Train Operations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Trains in Station</span>
                  <span className="font-semibold">{station.trainsInStation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Arrivals</span>
                  <span className="font-semibold">{station.pendingArrivals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Departures</span>
                  <span className="font-semibold">{station.pendingDepartures}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Daily Train Count</span>
                  <span className="font-semibold">{station.dailyTrainCount}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Active Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {station.pendingConflicts > 0 ? (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="font-medium text-destructive">
                        {station.pendingConflicts} Active Conflicts
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Immediate attention required for track conflicts
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-success" />
                      <span className="font-medium text-success">No Active Conflicts</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Signal Status</span>
                    <Badge 
                      variant={station.signalStatus === 'operational' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {station.signalStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Infrastructure Tab */}
        <TabsContent value="infrastructure" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Utilization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Active Platforms</span>
                    <span className="font-semibold">{station.activePlatforms}/{station.totalPlatforms}</span>
                  </div>
                  <Progress 
                    value={(station.activePlatforms / station.totalPlatforms) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Active Tracks</span>
                    <span className="font-semibold">{station.activeTracks}/{station.totalTracks}</span>
                  </div>
                  <Progress 
                    value={(station.activeTracks / station.totalTracks) * 100} 
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Overall Utilization</span>
                    <span className="font-semibold">{station.utilizationRate}%</span>
                  </div>
                  <Progress value={station.utilizationRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Signal className="h-5 w-5" />
                  Infrastructure Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{station.totalPlatforms}</div>
                    <div className="text-xs text-muted-foreground">Total Platforms</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{station.totalTracks}</div>
                    <div className="text-xs text-muted-foreground">Total Tracks</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Signaling System</span>
                    <Badge variant="default" className="text-xs">Modern</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Electrification</span>
                    <Badge variant="default" className="text-xs">Complete</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Safety Systems</span>
                    <Badge variant="default" className="text-xs">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Punctuality Rate</span>
                    <span className="font-semibold">{station.punctualityRate}%</span>
                  </div>
                  <Progress value={station.punctualityRate} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Utilization Rate</span>
                    <span className="font-semibold">{station.utilizationRate}%</span>
                  </div>
                  <Progress value={station.utilizationRate} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-primary">{station.throughput}/hr</div>
                    <div className="text-xs text-muted-foreground">Hourly Throughput</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-warning">{station.averageDelay}m</div>
                    <div className="text-xs text-muted-foreground">Average Delay</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Historical Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Today's Train Count</span>
                    <span className="font-semibold">{station.dailyTrainCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Monthly Throughput</span>
                    <span className="font-semibold">{station.monthlyThroughput.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Passenger Footfall</span>
                    <span className="font-semibold">{station.passengerCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">Performance Trend</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Station efficiency has improved by 12% over the last month
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Scheduled Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {station.maintenanceScheduled > 0 ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Wrench className="h-4 w-4 text-warning" />
                        <span className="font-medium text-warning">
                          {station.maintenanceScheduled} Scheduled Activities
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Track maintenance scheduled for Platform 3
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Scheduled: Tomorrow 02:00 - 05:00
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-success" />
                      <span className="font-medium text-success">No Scheduled Maintenance</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">Last Maintenance Activities</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Signal System Check</span>
                      <span>2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Track Inspection</span>
                      <span>1 week ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform Cleaning</span>
                      <span>Yesterday</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Overall Health</span>
                    <Badge variant="default" className="text-xs">Excellent</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Signal Systems</span>
                    <Badge variant="default" className="text-xs">Operational</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Track Condition</span>
                    <Badge variant="default" className="text-xs">Good</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Platform Status</span>
                    <Badge variant="default" className="text-xs">Operational</Badge>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">System Uptime</h4>
                  <div className="mb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Uptime</span>
                      <span className="font-semibold">99.8%</span>
                    </div>
                    <Progress value={99.8} className="h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}