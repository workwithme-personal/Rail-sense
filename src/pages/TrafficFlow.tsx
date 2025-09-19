import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChiefControllerSidebar } from "@/components/layout/ChiefControllerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Train, 
  MapPin, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Activity,
  LogOut,
  RefreshCw
} from "lucide-react";

const trafficData = [
  {
    route: "Mumbai → Pune",
    section: "SEC-01",
    activeTrains: 23,
    capacity: 30,
    congestion: 77,
    avgSpeed: 65,
    delays: 2,
    status: "heavy"
  },
  {
    route: "Pune → Solapur", 
    section: "SEC-02",
    activeTrains: 18,
    capacity: 25,
    congestion: 72,
    avgSpeed: 58,
    delays: 4,
    status: "moderate"
  },
  {
    route: "Solapur → Hyderabad",
    section: "SEC-03", 
    activeTrains: 15,
    capacity: 28,
    congestion: 54,
    avgSpeed: 72,
    delays: 1,
    status: "light"
  },
  {
    route: "Hyderabad → Vijayawada",
    section: "SEC-04",
    activeTrains: 21,
    capacity: 24,
    congestion: 88,
    avgSpeed: 45,
    delays: 6,
    status: "critical"
  }
];

const liveUpdates = [
  {
    id: 1,
    message: "Express 12627 cleared Mumbai Central - Normal operations resumed",
    type: "success",
    time: "2 mins ago"
  },
  {
    id: 2,
    message: "Traffic congestion detected on SEC-04 near Hyderabad",
    type: "warning", 
    time: "5 mins ago"
  },
  {
    id: 3,
    message: "3 freight trains diverted via alternate route SEC-02",
    type: "info",
    time: "8 mins ago"
  }
];

const TrafficFlow = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    window.location.reload();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'light': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'heavy': return 'text-destructive';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'light': return 'secondary';
      case 'moderate': return 'outline';
      case 'heavy': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ChiefControllerSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                  Traffic Flow Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  Monitor and optimize railway traffic across division
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30 hidden sm:flex">
                <Activity className="h-3 w-3 mr-1" />
                Live Traffic
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto">
            
            {/* Traffic Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {trafficData.map((route, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">{route.route}</CardTitle>
                      <Badge variant={getStatusBadge(route.status) as any}>
                        {route.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{route.section}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Train className="h-3 w-3 text-muted-foreground" />
                        <span>{route.activeTrains}/{route.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                        <span>{route.avgSpeed} km/h</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Congestion Level</span>
                        <span className={getStatusColor(route.status)}>{route.congestion}%</span>
                      </div>
                      <Progress value={route.congestion} className="h-2" />
                    </div>
                    
                    {route.delays > 0 && (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{route.delays} delays reported</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Live Traffic Updates */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Live Traffic Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {liveUpdates.map((update) => (
                    <div 
                      key={update.id} 
                      className={`p-3 rounded-lg border-l-4 ${
                        update.type === 'success' ? 'border-success bg-success/5' :
                        update.type === 'warning' ? 'border-warning bg-warning/5' :
                        'border-primary bg-primary/5'
                      }`}
                    >
                      <p className="text-sm font-medium">{update.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{update.time}</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-4">
                    View All Updates
                  </Button>
                </CardContent>
              </Card>

              {/* Division Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Division Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Active Trains</span>
                      <span className="font-semibold">
                        {trafficData.reduce((sum, route) => sum + route.activeTrains, 0)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Network Capacity</span>
                      <span className="font-semibold">
                        {Math.round((trafficData.reduce((sum, route) => sum + route.activeTrains, 0) / 
                         trafficData.reduce((sum, route) => sum + route.capacity, 0)) * 100)}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg Speed</span>
                      <span className="font-semibold">
                        {Math.round(trafficData.reduce((sum, route) => sum + route.avgSpeed, 0) / trafficData.length)} km/h
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Delays</span>
                      <span className="font-semibold text-destructive">
                        {trafficData.reduce((sum, route) => sum + route.delays, 0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <Button className="w-full">
                      Optimize Traffic Flow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Traffic Flow Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Route Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {trafficData.map((route, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${
                          route.status === 'light' ? 'bg-success' :
                          route.status === 'moderate' ? 'bg-warning' :
                          route.status === 'heavy' ? 'bg-destructive' :
                          'bg-destructive animate-pulse'
                        }`} />
                        <span className="text-sm font-medium">{route.section}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {route.route.split(' → ')[0]}
                      </p>
                      {index < trafficData.length - 1 && (
                        <ArrowRight className="h-4 w-4 mx-auto text-muted-foreground" />
                      )}
                      {index < trafficData.length - 1 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {route.route.split(' → ')[1]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TrafficFlow;