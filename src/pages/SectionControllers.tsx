import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChiefControllerSidebar } from "@/components/layout/ChiefControllerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  MapPin, 
  Clock, 
  Train, 
  AlertTriangle,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  LogOut,
  Activity
} from "lucide-react";

const sectionControllers = [
  {
    id: "SC-001",
    name: "Rajesh Kumar",
    section: "Mumbai-Pune Section",
    sectionCode: "SEC-01",
    stations: 15,
    activeTrains: 67,
    onTime: 96,
    alerts: 1,
    status: "online",
    phone: "+91-9876543210",
    email: "rajesh.kumar@railway.gov.in",
    experience: "12 years",
    shift: "Day Shift (06:00-18:00)"
  },
  {
    id: "SC-002", 
    name: "Priya Sharma",
    section: "Pune-Solapur Section",
    sectionCode: "SEC-02",
    stations: 18,
    activeTrains: 52,
    onTime: 92,
    alerts: 3,
    status: "online",
    phone: "+91-9876543211",
    email: "priya.sharma@railway.gov.in",
    experience: "8 years",
    shift: "Day Shift (06:00-18:00)"
  },
  {
    id: "SC-003",
    name: "Amit Patel", 
    section: "Solapur-Hyderabad Section",
    sectionCode: "SEC-03",
    stations: 22,
    activeTrains: 73,
    onTime: 98,
    alerts: 0,
    status: "online",
    phone: "+91-9876543212",
    email: "amit.patel@railway.gov.in",
    experience: "15 years",
    shift: "Night Shift (18:00-06:00)"
  },
  {
    id: "SC-004",
    name: "Sunita Reddy",
    section: "Hyderabad-Vijayawada Section", 
    sectionCode: "SEC-04",
    stations: 20,
    activeTrains: 45,
    onTime: 89,
    alerts: 5,
    status: "offline",
    phone: "+91-9876543213",
    email: "sunita.reddy@railway.gov.in",
    experience: "6 years",
    shift: "Night Shift (18:00-06:00)"
  }
];

const SectionControllers = () => {
  const [selectedController, setSelectedController] = useState<string | null>(null);

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
                  Section Controllers
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage and monitor section controllers across division
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
            
            {/* Section Controllers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sectionControllers.map((controller) => (
                <Card 
                  key={controller.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedController === controller.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedController(controller.id === selectedController ? null : controller.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10">
                            {controller.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{controller.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{controller.section}</p>
                          <p className="text-xs text-muted-foreground">{controller.sectionCode}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={controller.status === 'online' ? 'default' : 'destructive'}>
                          {controller.status}
                        </Badge>
                        {controller.status === 'online' ? 
                          <CheckCircle className="h-4 w-4 text-success" /> :
                          <XCircle className="h-4 w-4 text-destructive" />
                        }
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{controller.stations} Stations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Train className="h-4 w-4 text-muted-foreground" />
                        <span>{controller.activeTrains} Active Trains</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{controller.onTime}% On-Time</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span>{controller.alerts} Alerts</span>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedController === controller.id && (
                      <div className="pt-4 border-t space-y-3 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{controller.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{controller.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{controller.experience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{controller.shift}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3 mr-1" />
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

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Controllers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sectionControllers.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {sectionControllers.filter(c => c.status === 'online').length} Online
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Stations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {sectionControllers.reduce((sum, c) => sum + c.stations, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Across all sections</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Trains
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {sectionControllers.reduce((sum, c) => sum + c.activeTrains, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Currently moving</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Avg Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(sectionControllers.reduce((sum, c) => sum + c.onTime, 0) / sectionControllers.length)}%
                  </div>
                  <p className="text-xs text-muted-foreground">On-time performance</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SectionControllers;