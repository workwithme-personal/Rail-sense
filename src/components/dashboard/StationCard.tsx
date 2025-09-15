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

  // Only show critical and medium traffic stations in compact view
  if (station.trafficLevel === 'normal') return null;

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card 
        className={cn(
          "cursor-pointer transition-all duration-300 hover:shadow-lg border-2 h-full",
          config.borderColor,
          config.bgColor,
          isSelected && "ring-2 ring-primary shadow-lg scale-105",
          config.pulse && "animate-pulse-glow"
        )}
        onClick={() => onClick(station.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <h3 className="text-base font-semibold text-foreground truncate">
                  {station.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {station.code}
              </p>
            </div>
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs font-medium flex-shrink-0",
                `bg-${config.color}/20 text-${config.color} border-${config.color}/30`
              )}
            >
              {config.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Active Trains & Conflicts */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Train className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Trains</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{station.trainsInStation}</span>
              {station.pendingConflicts > 0 && (
                <Badge variant="outline" className="text-xs border-warning text-warning">
                  {station.pendingConflicts} conflicts
                </Badge>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-muted/30 rounded">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Delay</span>
              </div>
              <p className={cn(
                "text-sm font-semibold",
                station.averageDelay > 5 ? "text-warning" : "text-success"
              )}>
                {station.averageDelay}m
              </p>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Platforms</span>
              </div>
              <p className="text-sm font-semibold text-primary">
                {station.activePlatforms}/{station.totalPlatforms}
              </p>
            </div>
          </div>

          {/* Last Update */}
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            Updated: {station.lastUpdate}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}