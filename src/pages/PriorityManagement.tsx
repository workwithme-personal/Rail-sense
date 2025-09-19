import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChiefControllerSidebar } from "@/components/layout/ChiefControllerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Train, 
  Clock, 
  MapPin, 
  ArrowUp, 
  ArrowDown,
  CheckCircle,
  AlertTriangle,
  Activity,
  LogOut,
  Settings,
  Star
} from "lucide-react";

const priorityTrains = [
  {
    id: "P-001",
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani Express",
    currentLocation: "Mumbai Central",
    destination: "New Delhi",
    priority: "CRITICAL",
    eta: "14:30",
    delay: 0,
    passengers: 1200,
    type: "Express",
    section: "SEC-01",
    status: "on-time"
  },
  {
    id: "P-002", 
    trainNumber: "12627",
    trainName: "Karnataka Express",
    currentLocation: "Pune Junction",
    destination: "Bangalore",
    priority: "HIGH",
    eta: "15:45",
    delay: 12,
    passengers: 950,
    type: "Express",
    section: "SEC-02",
    status: "delayed"
  },
  {
    id: "P-003",
    trainNumber: "22691",
    trainName: "Rajdhani Express",
    currentLocation: "Solapur",
    destination: "Delhi",
    priority: "CRITICAL",
    eta: "16:20",
    delay: 0,
    passengers: 1150,
    type: "Rajdhani",
    section: "SEC-03",
    status: "on-time"
  },
  {
    id: "P-004",
    trainNumber: "17320",
    trainName: "Humsafar Express", 
    currentLocation: "Hyderabad",
    destination: "Tirupati",
    priority: "MEDIUM",
    eta: "17:10",
    delay: 8,
    passengers: 680,
    type: "Express",
    section: "SEC-04",
    status: "delayed"
  }
];

const conflictResolutions = [
  {
    id: "CR-001",
    issue: "Path conflict between Express 12951 and Freight 45621",
    resolution: "Express given priority - Freight diverted to Loop Line",
    time: "10 mins ago",
    status: "resolved"
  },
  {
    id: "CR-002",
    issue: "Platform availability conflict at Mumbai Central",
    resolution: "Platform 3 allocated to Rajdhani - Local moved to Platform 5",
    time: "25 mins ago", 
    status: "resolved"
  },
  {
    id: "CR-003",
    issue: "Speed restriction due to track maintenance on SEC-02",
    resolution: "High priority trains maintaining schedule - Others delayed",
    time: "45 mins ago",
    status: "ongoing"
  }
];

const priorityRules = [
  { type: "Rajdhani Express", priority: "CRITICAL", color: "destructive" },
  { type: "Shatabdi Express", priority: "CRITICAL", color: "destructive" },
  { type: "Duronto Express", priority: "HIGH", color: "warning" },
  { type: "Superfast Express", priority: "HIGH", color: "warning" },
  { type: "Mail/Express", priority: "MEDIUM", color: "secondary" },
  { type: "Passenger", priority: "LOW", color: "outline" },
  { type: "Freight", priority: "LOW", color: "outline" }
];

const PriorityManagement = () => {
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);

  const handleLogout = () => {
    window.location.reload();
  };

  const handlePriorityChange = (trainId: string, direction: 'up' | 'down') => {
    // Handle priority adjustment logic
    console.log(`Adjusting priority ${direction} for train ${trainId}`);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return 'destructive';
      case 'HIGH': return 'default';
      case 'MEDIUM': return 'secondary';
      case 'LOW': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return <Star className="h-4 w-4 fill-current" />;
      case 'HIGH': return <Zap className="h-4 w-4" />;
      default: return null;
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
                  Priority Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage train priorities and resolve conflicts
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Rules</span>
              </Button>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30 hidden sm:flex">
                <Activity className="h-3 w-3 mr-1" />
                Live Priority
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto">
            
            {/* Priority Trains */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  High Priority Trains
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {priorityTrains.map((train) => (
                  <div 
                    key={train.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedTrain === train.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedTrain(train.id === selectedTrain ? null : train.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPriorityIcon(train.priority)}
                          <h3 className="font-semibold">{train.trainName}</h3>
                          <Badge variant={getPriorityColor(train.priority) as any}>
                            {train.priority}
                          </Badge>
                          {train.status === 'on-time' ? 
                            <CheckCircle className="h-4 w-4 text-success" /> :
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          }
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Train className="h-3 w-3" />
                            <span>#{train.trainNumber}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{train.currentLocation}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>ETA: {train.eta}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{train.passengers} passengers</span>
                          </div>
                        </div>

                        {train.delay > 0 && (
                          <div className="flex items-center gap-1 text-sm text-destructive mb-2">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Delayed by {train.delay} minutes</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePriorityChange(train.id, 'up');
                          }}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePriorityChange(train.id, 'down');
                          }}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {selectedTrain === train.id && (
                      <div className="pt-3 border-t mt-3 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Destination</p>
                            <p className="font-medium">{train.destination}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Section</p>
                            <p className="font-medium">{train.section}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Train Type</p>
                            <p className="font-medium">{train.type}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <p className="font-medium capitalize">{train.status}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <Button size="sm">Track Train</Button>
                          <Button size="sm" variant="outline">Send Alert</Button>
                          <Button size="sm" variant="outline">Override Priority</Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Conflict Resolutions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Recent Conflict Resolutions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {conflictResolutions.map((conflict) => (
                    <div 
                      key={conflict.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        conflict.status === 'resolved' 
                          ? 'border-success bg-success/5' 
                          : 'border-warning bg-warning/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={conflict.status === 'resolved' ? 'secondary' : 'outline'}>
                          {conflict.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{conflict.time}</span>
                      </div>
                      <p className="text-sm font-medium mb-1">{conflict.issue}</p>
                      <p className="text-xs text-muted-foreground">{conflict.resolution}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Priority Rules */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Priority Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {priorityRules.map((rule, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded border">
                      <div className="flex items-center gap-2">
                        {rule.priority === 'CRITICAL' && <Star className="h-4 w-4 fill-current text-destructive" />}
                        {rule.priority === 'HIGH' && <Zap className="h-4 w-4 text-warning" />}
                        <span className="font-medium">{rule.type}</span>
                      </div>
                      <Badge variant={rule.color as any}>
                        {rule.priority}
                      </Badge>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-4">
                    <Settings className="h-4 w-4 mr-2" />
                    Modify Rules
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Critical Priority
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">
                    {priorityTrains.filter(t => t.priority === 'CRITICAL').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Active trains</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    High Priority
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">
                    {priorityTrains.filter(t => t.priority === 'HIGH').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Active trains</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Conflicts Resolved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">
                    {conflictResolutions.filter(c => c.status === 'resolved').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Avg Resolution Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.5</div>
                  <p className="text-xs text-muted-foreground">Minutes</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PriorityManagement;