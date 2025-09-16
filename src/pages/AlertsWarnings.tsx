import { useState } from "react";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  MapPin,
  Train,
  Zap,
  Bell,
  Filter,
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  category: 'safety' | 'operational' | 'technical' | 'weather' | 'security';
  title: string;
  message: string;
  station?: string;
  trainId?: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    category: 'safety',
    title: 'Signal Failure - Track 3',
    message: 'Automatic signal system failure detected at Central Junction Track 3. Manual control activated.',
    station: 'Central Junction',
    trainId: 'MGS EXP 123',
    timestamp: '2 minutes ago',
    status: 'active',
    priority: 'high',
    actionRequired: true
  },
  {
    id: '2',
    type: 'warning',
    category: 'operational',
    title: 'Train Delay Detected',
    message: 'Rajdhani Express running 15 minutes behind schedule. Impact on 3 connecting trains expected.',
    station: 'Metro Hub',
    trainId: 'RAJ EXP 456',
    timestamp: '5 minutes ago',
    status: 'acknowledged',
    priority: 'medium',
    actionRequired: true,
    acknowledgedBy: 'Rajesh Kumar',
    acknowledgedAt: '3 minutes ago'
  },
  {
    id: '3',
    type: 'warning',
    category: 'weather',
    title: 'Heavy Rain Alert',
    message: 'Weather department issued heavy rain warning. Reduce speed limits to 40 km/h on all sections.',
    timestamp: '10 minutes ago',
    status: 'active',
    priority: 'medium',
    actionRequired: true
  },
  {
    id: '4',
    type: 'info',
    category: 'technical',
    title: 'Maintenance Schedule',
    message: 'Scheduled maintenance on Platform 5 from 02:00 to 04:00 AM. Route trains accordingly.',
    station: 'Express Terminal',
    timestamp: '1 hour ago',
    status: 'acknowledged',
    priority: 'low',
    actionRequired: false,
    acknowledgedBy: 'Priya Sharma',
    acknowledgedAt: '45 minutes ago'
  },
  {
    id: '5',
    type: 'critical',
    category: 'security',
    title: 'Unauthorized Access',
    message: 'Security breach detected at control room. Immediate verification required.',
    station: 'Regional Station',
    timestamp: '30 minutes ago',
    status: 'resolved',
    priority: 'high',
    actionRequired: false,
    acknowledgedBy: 'Arun Patel',
    acknowledgedAt: '25 minutes ago'
  },
  {
    id: '6',
    type: 'success',
    category: 'operational',
    title: 'Conflict Resolved',
    message: 'Track conflict between DFC 321 and Express Train successfully resolved using AI recommendation.',
    station: 'Central Junction',
    timestamp: '45 minutes ago',
    status: 'resolved',
    priority: 'low',
    actionRequired: false,
    acknowledgedBy: 'Rajesh Kumar',
    acknowledgedAt: '40 minutes ago'
  }
];

const alertTypeConfig = {
  critical: { 
    icon: AlertTriangle, 
    color: 'text-destructive', 
    bg: 'bg-destructive/10 border-destructive/20',
    badge: 'destructive' as const
  },
  warning: { 
    icon: AlertCircle, 
    color: 'text-warning', 
    bg: 'bg-warning/10 border-warning/20',
    badge: 'default' as const
  },
  info: { 
    icon: Info, 
    color: 'text-primary', 
    bg: 'bg-primary/10 border-primary/20',
    badge: 'secondary' as const
  },
  success: { 
    icon: CheckCircle, 
    color: 'text-success', 
    bg: 'bg-success/10 border-success/20',
    badge: 'outline' as const
  }
};

const categoryConfig = {
  safety: { label: 'Safety', color: 'bg-destructive' },
  operational: { label: 'Operational', color: 'bg-warning' },
  technical: { label: 'Technical', color: 'bg-primary' },
  weather: { label: 'Weather', color: 'bg-info' },
  security: { label: 'Security', color: 'bg-destructive' }
};

const statusConfig = {
  active: { label: 'Active', color: 'text-destructive', bg: 'bg-destructive/10' },
  acknowledged: { label: 'Acknowledged', color: 'text-warning', bg: 'bg-warning/10' },
  resolved: { label: 'Resolved', color: 'text-success', bg: 'bg-success/10' }
};

const AlertsWarnings = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAlerts = alerts.filter(alert => {
    return (filterType === 'all' || alert.type === filterType) &&
           (filterCategory === 'all' || alert.category === filterCategory) &&
           (filterStatus === 'all' || alert.status === filterStatus);
  });

  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;
  const criticalAlertsCount = alerts.filter(a => a.type === 'critical' && a.status === 'active').length;
  const actionRequiredCount = alerts.filter(a => a.actionRequired && a.status === 'active').length;

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            status: 'acknowledged' as const,
            acknowledgedBy: 'Current User',
            acknowledgedAt: 'Just now'
          }
        : alert
    ));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            status: 'resolved' as const,
            acknowledgedBy: 'Current User',
            acknowledgedAt: 'Just now'
          }
        : alert
    ));
  };

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
                  <AlertTriangle className="h-6 w-6 text-warning" />
                  Alerts & Warnings
                </h1>
                <p className="text-sm text-muted-foreground">
                  System alerts, warnings, and notifications
                </p>
              </div>
            </div>
            
            {/* Alert Stats */}
            <div className="flex items-center gap-4">
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {criticalAlertsCount} Critical
              </Badge>
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                <Bell className="h-3 w-3 mr-1" />
                {activeAlertsCount} Active
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                <Zap className="h-3 w-3 mr-1" />
                {actionRequiredCount} Action Required
              </Badge>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Filters */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type</label>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="safety">Safety</SelectItem>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="weather">Weather</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="acknowledged">Acknowledged</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setFilterType('all');
                          setFilterCategory('all');
                          setFilterStatus('all');
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts List */}
              <div className="space-y-4">
                {filteredAlerts.map((alert) => {
                  const typeConfig = alertTypeConfig[alert.type];
                  const statusConf = statusConfig[alert.status];
                  const Icon = typeConfig.icon;
                  
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "p-4 rounded-lg border-l-4",
                        typeConfig.bg,
                        alert.status === 'active' && alert.type === 'critical' && "animate-pulse"
                      )}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <Icon className={cn("h-5 w-5 mt-0.5", typeConfig.color)} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className="font-semibold text-foreground">{alert.title}</h3>
                                <Badge variant={typeConfig.badge} className="text-xs">
                                  {alert.type.toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {categoryConfig[alert.category].label}
                                </Badge>
                                <Badge 
                                  variant="secondary" 
                                  className={cn("text-xs", statusConf.bg, statusConf.color)}
                                >
                                  {statusConf.label}
                                </Badge>
                                {alert.priority === 'high' && (
                                  <Badge variant="destructive" className="text-xs">
                                    HIGH PRIORITY
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-sm text-foreground mb-3">{alert.message}</p>
                              
                              <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {alert.timestamp}
                                </div>
                                {alert.station && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {alert.station}
                                  </div>
                                )}
                                {alert.trainId && (
                                  <div className="flex items-center gap-1">
                                    <Train className="h-3 w-3" />
                                    {alert.trainId}
                                  </div>
                                )}
                                {alert.acknowledgedBy && (
                                  <div className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    Ack. by {alert.acknowledgedBy} {alert.acknowledgedAt}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2">
                          {alert.status === 'active' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => acknowledgeAlert(alert.id)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Acknowledge
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => resolveAlert(alert.id)}
                                className="bg-success hover:bg-success/90"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resolve
                              </Button>
                            </>
                          )}
                          {alert.status === 'acknowledged' && (
                            <Button
                              size="sm"
                              onClick={() => resolveAlert(alert.id)}
                              className="bg-success hover:bg-success/90"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Resolved
                            </Button>
                          )}
                          {alert.status === 'resolved' && (
                            <Badge variant="outline" className="text-success">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolved
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {filteredAlerts.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Alerts Found</h3>
                    <p className="text-muted-foreground">
                      No alerts match your current filter criteria.
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AlertsWarnings;