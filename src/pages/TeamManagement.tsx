import { useState } from "react";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  UserPlus, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  role: 'Section Controller' | 'Station Master' | 'Assistant Controller' | 'Signal Operator';
  email: string;
  phone: string;
  avatar?: string;
  status: 'online' | 'offline' | 'on-duty' | 'break';
  stationsAssigned: string[];
  shift: 'Morning' | 'Evening' | 'Night';
  experience: string;
  lastActive: string;
  permissions: string[];
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Section Controller',
    email: 'rajesh.kumar@railway.gov.in',
    phone: '+91 98765 43210',
    status: 'on-duty',
    stationsAssigned: ['Central Junction', 'Metro Hub', 'Express Terminal'],
    shift: 'Morning',
    experience: '8 years',
    lastActive: '2 minutes ago',
    permissions: ['train_control', 'override_ai', 'emergency_stop', 'route_planning']
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Station Master',
    email: 'priya.sharma@railway.gov.in',
    phone: '+91 98765 43211',
    status: 'online',
    stationsAssigned: ['Central Junction'],
    shift: 'Morning',
    experience: '5 years',
    lastActive: '5 minutes ago',
    permissions: ['platform_control', 'passenger_info', 'coordination']
  },
  {
    id: '3',
    name: 'Arun Patel',
    role: 'Assistant Controller',
    email: 'arun.patel@railway.gov.in',
    phone: '+91 98765 43212',
    status: 'on-duty',
    stationsAssigned: ['Metro Hub', 'Regional Station'],
    shift: 'Evening',
    experience: '3 years',
    lastActive: '1 hour ago',
    permissions: ['train_tracking', 'report_generation', 'coordination']
  },
  {
    id: '4',
    name: 'Suresh Reddy',
    role: 'Signal Operator',
    email: 'suresh.reddy@railway.gov.in',
    phone: '+91 98765 43213',
    status: 'offline',
    stationsAssigned: ['Freight Hub'],
    shift: 'Night',
    experience: '12 years',
    lastActive: '8 hours ago',
    permissions: ['signal_control', 'maintenance_coord', 'safety_protocols']
  }
];

const roleConfig = {
  'Section Controller': { color: 'bg-primary', variant: 'default' as const },
  'Station Master': { color: 'bg-success', variant: 'secondary' as const },
  'Assistant Controller': { color: 'bg-warning', variant: 'outline' as const },
  'Signal Operator': { color: 'bg-muted', variant: 'secondary' as const },
};

const statusConfig = {
  'online': { color: 'text-success', bg: 'bg-success/10', label: 'Online' },
  'offline': { color: 'text-muted-foreground', bg: 'bg-muted/10', label: 'Offline' },
  'on-duty': { color: 'text-primary', bg: 'bg-primary/10', label: 'On Duty' },
  'break': { color: 'text-warning', bg: 'bg-warning/10', label: 'On Break' },
};

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const onDutyCount = teamMembers.filter(m => m.status === 'on-duty').length;
  const onlineCount = teamMembers.filter(m => m.status === 'online' || m.status === 'on-duty').length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card px-4 lg:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Team Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage railway control team and permissions
                </p>
              </div>
            </div>
            
            {/* Team Stats */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <CheckCircle className="h-3 w-3 mr-1" />
                {onDutyCount} On Duty
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                <Activity className="h-3 w-3 mr-1" />
                {onlineCount} Online
              </Badge>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="section-controller">Section Controller</SelectItem>
                            <SelectItem value="station-master">Station Master</SelectItem>
                            <SelectItem value="assistant-controller">Assistant Controller</SelectItem>
                            <SelectItem value="signal-operator">Signal Operator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@railway.gov.in" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+91 98765 43210" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setIsAddDialogOpen(false)}>Add Member</Button>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Team Overview</TabsTrigger>
                  <TabsTrigger value="shifts">Shift Management</TabsTrigger>
                  <TabsTrigger value="permissions">Permissions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Team</p>
                            <p className="text-2xl font-bold">{teamMembers.length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-success" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">On Duty</p>
                            <p className="text-2xl font-bold text-success">{onDutyCount}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Activity className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Active</p>
                            <p className="text-2xl font-bold text-primary">{onlineCount}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                            <Shield className="h-5 w-5 text-warning" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Controllers</p>
                            <p className="text-2xl font-bold text-warning">
                              {teamMembers.filter(m => m.role.includes('Controller')).length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Team Members Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamMembers.map((member) => {
                      const statusConf = statusConfig[member.status];
                      const roleConf = roleConfig[member.role];
                      
                      return (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback className={roleConf.color}>
                                      {getInitials(member.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-semibold">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Badge 
                                  className={cn("text-xs", statusConf.bg, statusConf.color)}
                                  variant="secondary"
                                >
                                  <div className="w-2 h-2 rounded-full bg-current mr-2" />
                                  {statusConf.label}
                                </Badge>
                                <Badge variant={roleConf.variant} className="text-xs">
                                  {member.shift} Shift
                                </Badge>
                              </div>

                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground truncate">{member.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">{member.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    {member.stationsAssigned.length} stations
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">{member.experience} exp</span>
                                </div>
                              </div>

                              <div className="pt-2 border-t">
                                <p className="text-xs text-muted-foreground">
                                  Last active: {member.lastActive}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="shifts" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shift Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {['Morning', 'Evening', 'Night'].map((shift) => {
                          const shiftMembers = teamMembers.filter(m => m.shift === shift);
                          return (
                            <div key={shift} className="border rounded-lg p-4">
                              <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {shift} Shift ({shiftMembers.length} members)
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {shiftMembers.map(member => (
                                  <div key={member.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="text-xs">
                                        {getInitials(member.name)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{member.name}</span>
                                    <Badge variant="outline" className="text-xs ml-auto">
                                      {member.role}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="permissions" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Role-Based Permissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {Object.keys(roleConfig).map((role) => {
                          const roleMembers = teamMembers.filter(m => m.role === role);
                          const allPermissions = [...new Set(roleMembers.flatMap(m => m.permissions))];
                          
                          return (
                            <div key={role} className="border rounded-lg p-4">
                              <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                {role} ({roleMembers.length} members)
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {allPermissions.map(permission => (
                                  <Badge key={permission} variant="secondary" className="text-xs">
                                    {permission.replace('_', ' ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TeamManagement;