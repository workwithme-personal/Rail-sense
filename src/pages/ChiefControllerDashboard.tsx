import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChiefControllerSidebar } from "@/components/layout/ChiefControllerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Train, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Users,
  BarChart3,
  CheckCircle,
  XCircle,
  Zap,
  LogOut
} from "lucide-react";

// Mock data for Chief Controller
const divisionData = {
  name: "Central Railway Division",
  code: "CRD-01",
  totalStations: 180,
  totalSections: 12,
  totalControllers: 24,
  coverageArea: "320 km"
};

const liveMetrics = [
  { title: "Active Trains", value: "847", change: "+12", trend: "up", icon: Train },
  { title: "On-Time Performance", value: "94.2%", change: "+2.1%", trend: "up", icon: Clock },
  { title: "Section Controllers", value: "24/24", change: "100%", trend: "stable", icon: Users },
  { title: "Critical Alerts", value: "3", change: "-2", trend: "down", icon: AlertTriangle }
];

const sectionStatus = [
  { id: "SEC-01", name: "Mumbai-Pune Section", stations: 15, onTime: 96, delays: 2, status: "good" },
  { id: "SEC-02", name: "Pune-Solapur Section", stations: 18, onTime: 92, delays: 5, status: "warning" },
  { id: "SEC-03", name: "Solapur-Hyderabad Section", stations: 22, onTime: 98, delays: 1, status: "excellent" },
  { id: "SEC-04", name: "Hyderabad-Vijayawada Section", stations: 20, onTime: 89, delays: 8, status: "critical" }
];

const priorities = [
  { id: 1, train: "Rajdhani Express", priority: "HIGH", eta: "14:30", section: "SEC-01", status: "on-time" },
  { id: 2, train: "Freight 2847", priority: "LOW", eta: "15:45", section: "SEC-02", status: "delayed" },
  { id: 3, train: "Shatabdi Express", priority: "HIGH", eta: "16:20", section: "SEC-03", status: "on-time" },
  { id: 4, train: "Local Passenger", priority: "MEDIUM", eta: "17:10", section: "SEC-04", status: "on-time" }
];

const ChiefControllerDashboard = () => {
  const [activeAlerts] = useState([
    {
      id: 1,
      message: "Track maintenance required on SEC-02 between KM 45-48",
      severity: "high",
      time: "10 mins ago"
    },
    {
      id: 2, 
      message: "Weather alert: Heavy rain expected in SEC-04 region",
      severity: "medium",
      time: "25 mins ago"
    }
  ]);

  const handleLogout = () => {
    window.location.reload();
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
                  Chief Controller Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  {divisionData.name} - Division Command Center
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/30 hidden sm:flex">
                <Activity className="h-3 w-3 mr-1" />
                Live Control
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto">
            
            {/* Division Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Stations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{divisionData.totalStations}</div>
                  <p className="text-xs text-muted-foreground">Across {divisionData.coverageArea}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Section Controllers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{divisionData.totalControllers}</div>
                  <p className="text-xs text-muted-foreground">{divisionData.totalSections} Sections</p>
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Division Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="font-semibold">Operational</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">All systems functioning normally</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {liveMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </CardTitle>
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center gap-1 text-xs">
                      <TrendingUp className={`h-3 w-3 ${
                        metric.trend === 'up' ? 'text-success' : 
                        metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                      }`} />
                      <span className={
                        metric.trend === 'up' ? 'text-success' : 
                        metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                      }>
                        {metric.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Section Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Section Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sectionStatus.map((section) => (
                    <div key={section.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{section.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {section.stations} stations • {section.delays} delays
                          </p>
                        </div>
                        <Badge variant={
                          section.status === 'excellent' ? 'default' :
                          section.status === 'good' ? 'secondary' :
                          section.status === 'warning' ? 'outline' : 'destructive'
                        }>
                          {section.status}
                        </Badge>
                      </div>
                      <Progress value={section.onTime} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">
                        {section.onTime}% on-time
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Train Priorities & Alerts */}
              <div className="space-y-6">
                {/* Priority Trains */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Priority Coordination
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {priorities.map((train) => (
                      <div key={train.id} className="flex items-center justify-between p-2 rounded border">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{train.train}</p>
                          <p className="text-xs text-muted-foreground">
                            ETA: {train.eta} • Section: {train.section}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            train.priority === 'HIGH' ? 'destructive' :
                            train.priority === 'MEDIUM' ? 'outline' : 'secondary'
                          }>
                            {train.priority}
                          </Badge>
                          {train.status === 'on-time' ? 
                            <CheckCircle className="h-4 w-4 text-success" /> :
                            <XCircle className="h-4 w-4 text-destructive" />
                          }
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Active Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Division Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {activeAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 rounded border border-destructive/20 bg-destructive/5">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{alert.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                          </div>
                          <Badge variant="destructive">
                            {alert.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ChiefControllerDashboard;