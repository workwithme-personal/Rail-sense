import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Train, 
  AlertCircle, 
  Clock, 
  TrendingUp,
  MapPin,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface StationData {
  id: string;
  name: string;
  code: string;
  trafficLevel: 'high' | 'medium' | 'normal';
  activePlatforms: number;
  totalPlatforms: number;
  trainsInStation: number;
  pendingConflicts: number;
  averageDelay: number;
  throughput: number;
  lastUpdate: string;
}

interface StationCardProps {
  station: StationData;
  onClick: (stationId: string) => void;
  isSelected?: boolean;
}

const trafficLevelConfig = {
  high: {
    color: 'traffic-high',
    bgColor: 'bg-traffic-high/10',
    borderColor: 'border-traffic-high/30',
    label: 'Critical Traffic',
    pulse: true,
  },
  medium: {
    color: 'traffic-medium',
    bgColor: 'bg-traffic-medium/10',
    borderColor: 'border-traffic-medium/30',
    label: 'Medium Traffic',
    pulse: false,
  },
  normal: {
    color: 'traffic-normal',
    bgColor: 'bg-traffic-normal/10',
    borderColor: 'border-traffic-normal/30',
    label: 'Normal Traffic',
    pulse: false,
  },
};

export function StationCard({ station, onClick, isSelected }: StationCardProps) {
  const config = trafficLevelConfig[station.trafficLevel];

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={cn(
          "cursor-pointer transition-all duration-300 hover:shadow-lg border-2",
          config.borderColor,
          config.bgColor,
          isSelected && "ring-2 ring-primary shadow-lg scale-105",
          config.pulse && "animate-pulse-glow"
        )}
        onClick={() => onClick(station.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  {station.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Station Code: {station.code}
              </p>
            </div>
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs font-medium",
                `bg-${config.color}/20 text-${config.color} border-${config.color}/30`
              )}
            >
              {config.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Platform Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-success rounded-full" />
              <span className="text-sm text-muted-foreground">Platform Status</span>
            </div>
            <span className="text-sm font-medium">
              {station.activePlatforms}/{station.totalPlatforms} Active
            </span>
          </div>

          {/* Current Trains */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Train className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Active Trains</span>
            </div>
            <span className="text-sm font-medium">{station.trainsInStation}</span>
          </div>

          {/* Conflicts */}
          {station.pendingConflicts > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                <span className="text-sm text-warning">Pending Conflicts</span>
              </div>
              <Badge variant="outline" className="text-xs border-warning text-warning">
                {station.pendingConflicts}
              </Badge>
            </div>
          )}

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Avg Delay</span>
              </div>
              <p className={cn(
                "text-sm font-semibold mt-1",
                station.averageDelay > 5 ? "text-warning" : "text-success"
              )}>
                {station.averageDelay}m
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Throughput</span>
              </div>
              <p className="text-sm font-semibold mt-1 text-primary">
                {station.throughput}/hr
              </p>
            </div>
          </div>

          {/* Last Update */}
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            Last update: {station.lastUpdate}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}