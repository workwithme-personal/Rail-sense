import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Train, 
  Target,
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  target?: number;
  unit?: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

const mockKPIs: KPIMetric[] = [
  {
    id: 'punctuality',
    title: 'On-Time Performance',
    value: 87.2,
    change: 3.2,
    changeType: 'increase',
    target: 90,
    unit: '%',
    status: 'good'
  },
  {
    id: 'throughput',
    title: 'Hourly Throughput',
    value: 156,
    change: -5.8,
    changeType: 'decrease',
    target: 180,
    unit: 'trains/hr',
    status: 'warning'
  },
  {
    id: 'delays',
    title: 'Average Delay',
    value: 4.2,
    change: -1.2,
    changeType: 'decrease',
    unit: 'min',
    status: 'excellent'
  },
  {
    id: 'conflicts',
    title: 'Resolved Conflicts',
    value: 23,
    change: 8,
    changeType: 'increase',
    unit: 'today',
    status: 'good'
  },
  {
    id: 'efficiency',
    title: 'System Efficiency',
    value: 82.5,
    change: 2.1,
    changeType: 'increase',
    target: 85,
    unit: '%',
    status: 'good'
  },
  {
    id: 'utilization',
    title: 'Platform Utilization',
    value: 78.3,
    change: -0.5,
    changeType: 'decrease',
    target: 80,
    unit: '%',
    status: 'warning'
  }
];

const statusConfig = {
  excellent: { 
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
    icon: CheckCircle
  },
  good: { 
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
    icon: Activity
  },
  warning: { 
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
    icon: AlertTriangle
  },
  critical: { 
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/30',
    icon: AlertTriangle
  }
};

export function KPIDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Key Performance Indicators
        </h2>
        <p className="text-muted-foreground">
          Real-time system performance metrics and analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockKPIs.map((kpi) => {
          const config = statusConfig[kpi.status];
          const IconComponent = config.icon;
          
          return (
            <Card key={kpi.id} className={cn("border-l-4", config.borderColor)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", config.bgColor)}>
                      <IconComponent className={cn("h-4 w-4", config.color)} />
                    </div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {kpi.title}
                    </CardTitle>
                  </div>
                  
                  <Badge 
                    variant={kpi.status === 'critical' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {kpi.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    {typeof kpi.value === 'number' ? kpi.value.toFixed(1) : kpi.value}
                  </span>
                  {kpi.unit && (
                    <span className="text-sm text-muted-foreground mb-1">
                      {kpi.unit}
                    </span>
                  )}
                </div>

                {/* Change Indicator */}
                <div className="flex items-center gap-1">
                  {kpi.changeType === 'increase' ? (
                    <TrendingUp className={cn(
                      "h-4 w-4",
                      kpi.title.includes('Delay') || kpi.title.includes('Conflict') 
                        ? "text-warning" : "text-success"
                    )} />
                  ) : (
                    <TrendingDown className={cn(
                      "h-4 w-4",
                      kpi.title.includes('Delay') ? "text-success" : "text-warning"
                    )} />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    kpi.changeType === 'increase'
                      ? (kpi.title.includes('Delay') || kpi.title.includes('Conflict') 
                          ? "text-warning" : "text-success")
                      : (kpi.title.includes('Delay') ? "text-success" : "text-warning")
                  )}>
                    {Math.abs(kpi.change)}%
                  </span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>

                {/* Progress Bar for Targets */}
                {kpi.target && typeof kpi.value === 'number' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress to Target</span>
                      <span>{kpi.target}{kpi.unit}</span>
                    </div>
                    <Progress 
                      value={(kpi.value / kpi.target) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Performance Trends (Last 24 Hours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Peak Hour Performance</span>
                <Badge variant="outline">08:00 - 10:00</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Best Efficiency Period</span>
                <Badge variant="outline">14:00 - 16:00</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Trains Processed</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">AI Suggestions Accepted</span>
                <span className="font-medium text-success">89%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Daily Targets & Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Daily Punctuality Goal</span>
                  <span className="font-medium">87.2% / 90%</span>
                </div>
                <Progress value={97} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Throughput Target</span>
                  <span className="font-medium">3,744 / 4,320 trains</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Zero Conflicts Goal</span>
                  <span className="font-medium">6 conflicts today</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}