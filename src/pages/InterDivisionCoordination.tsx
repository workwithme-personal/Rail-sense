import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChiefControllerSidebar } from "@/components/layout/ChiefControllerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Globe, 
  ArrowLeftRight, 
  Clock, 
  Train, 
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Activity,
  LogOut,
  RefreshCw
} from "lucide-react";

const adjacentDivisions = [
  {
    id: "WRD",
    name: "Western Railway Division",
    chiefController: "Mr. Suresh Gupta",
    contact: "+91-9876543220",
    status: "online",
    sharedRoutes: 3,
    crossingTrains: 12,
    coordination: "active"
  },
  {
    id: "SRD", 
    name: "Southern Railway Division",
    chiefController: "Ms. Kavitha Nair",
    contact: "+91-9876543221",
    status: "online",
    sharedRoutes: 2,
    crossingTrains: 8,
    coordination: "active"
  },
  {
    id: "ERD",
    name: "Eastern Railway Division", 
    chiefController: "Mr. Rajesh Mohan",
    contact: "+91-9876543222",
    status: "offline",
    sharedRoutes: 1,
    crossingTrains: 4,
    coordination: "pending"
  },
  {
    id: "NRD",
    name: "Northern Railway Division",
    chiefController: "Ms. Priya Singh",
    contact: "+91-9876543223", 
    status: "online",
    sharedRoutes: 4,
    crossingTrains: 15,
    coordination: "active"
  }
];

const crossingTrains = [
  {
    id: "T-001",
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani Express",
    from: "Mumbai Central (CRD)",
    to: "New Delhi (NRD)",
    currentLocation: "Approaching division boundary",
    eta: "14:30",
    status: "on-time",
    priority: "HIGH",
    coordinatingWith: "NRD"
  },
  {
    id: "T-002", 
    trainNumber: "17320",
    trainName: "Humsafar Express",
    from: "Hyderabad (SRD)",
    to: "Tirupati (SRD)",
    currentLocation: "Division boundary crossed",
    eta: "15:45",
    status: "delayed",
    priority: "MEDIUM",
    coordinatingWith: "SRD"
  },
  {
    id: "T-003",
    trainNumber: "11013", 
    trainName: "Coimbatore Express",
    from: "Mumbai LTT (WRD)",
    to: "Coimbatore (SRD)",
    currentLocation: "En route in division",
    eta: "16:20",
    status: "on-time", 
    priority: "MEDIUM",
    coordinatingWith: "WRD"
  }
];

const coordinationMessages = [
  {
    id: 1,
    from: "WRD",
    message: "Train 12951 cleared from our division - ETA at boundary: 14:25",
    time: "5 mins ago",
    type: "incoming"
  },
  {
    id: 2,
    from: "SRD", 
    message: "Please confirm receipt of Train 17320 - running 15 mins late",
    time: "12 mins ago",
    type: "outgoing"
  },
  {
    id: 3,
    from: "NRD",
    message: "Track maintenance completed - normal operations resumed",
    time: "25 mins ago", 
    type: "incoming"
  }
];

const InterDivisionCoordination = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    window.location.reload();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
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
                  Inter-Division Coordination
                </h1>
                <p className="text-sm text-muted-foreground">
                  Coordinate train movements across division boundaries
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
                Live Coordination
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto">
            
            {/* Adjacent Divisions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {adjacentDivisions.map((division) => (
                <Card 
                  key={division.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedDivision === division.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedDivision(division.id === selectedDivision ? null : division.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10">
                            {division.id}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{division.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{division.chiefController}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={division.status === 'online' ? 'default' : 'destructive'}>
                          {division.status}
                        </Badge>
                        <Badge variant={division.coordination === 'active' ? 'secondary' : 'outline'}>
                          {division.coordination}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold">{division.sharedRoutes}</div>
                        <p className="text-xs text-muted-foreground">Shared Routes</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{division.crossingTrains}</div>
                        <p className="text-xs text-muted-foreground">Crossing Trains</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-success">●</div>
                        <p className="text-xs text-muted-foreground">Status</p>
                      </div>
                    </div>

                    {selectedDivision === division.id && (
                      <div className="pt-4 border-t space-y-3 animate-fade-in">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{division.contact}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Crossing Trains */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowLeftRight className="h-5 w-5" />
                    Inter-Division Trains
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {crossingTrains.map((train) => (
                    <div key={train.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{train.trainName}</p>
                          <p className="text-xs text-muted-foreground">#{train.trainNumber}</p>
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
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          }
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{train.from} → {train.to}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>ETA: {train.eta}</span>
                        </div>
                        <p>Status: {train.currentLocation}</p>
                        <p>Coordinating with: {train.coordinatingWith}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Coordination Messages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Coordination Messages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {coordinationMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={`p-3 rounded-lg ${
                        message.type === 'incoming' 
                          ? 'bg-primary/5 border-l-4 border-primary' 
                          : 'bg-secondary/5 border-l-4 border-secondary'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{message.from}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-4">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Connected Divisions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adjacentDivisions.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {adjacentDivisions.filter(d => d.status === 'online').length} Online
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Crossing Trains
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{crossingTrains.length}</div>
                  <p className="text-xs text-muted-foreground">Currently active</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Coordination
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {adjacentDivisions.filter(d => d.coordination === 'active').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Real-time sync</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Messages Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">Coordination messages</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default InterDivisionCoordination;