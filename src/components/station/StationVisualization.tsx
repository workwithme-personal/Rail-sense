import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Train, Clock, AlertTriangle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrainInfo {
  id: string;
  name: string;
  number: string;
  type: 'express' | 'passenger' | 'freight' | 'local';
  platform: number;
  scheduledTime: string;
  actualTime: string;
  status: 'on_time' | 'delayed' | 'arrived' | 'departed' | 'approaching';
  delay: number;
  direction: 'arrival' | 'departure';
}

interface PlatformInfo {
  number: number;
  status: 'occupied' | 'free' | 'maintenance' | 'reserved';
  trainId?: string;
  trainName?: string;
  estimatedClearTime?: string;
  nextTrain?: string;
}

interface StationData {
  id: string;
  name: string;
  code: string;
  totalPlatforms: number;
  activePlatforms: number;
  occupiedPlatforms: number;
  trainsInStation: number;
  upcomingArrivals: number;
  departuresNext30Min: number;
  avgDwellTime: number;
  lastUpdate: string;
}

interface StationVisualizationProps {
  platforms: PlatformInfo[];
  trains: TrainInfo[];
  stationData: StationData;
}

export const StationVisualization = ({ platforms, trains, stationData }: StationVisualizationProps) => {
  const [animatingTrains, setAnimatingTrains] = useState<Set<string>>(new Set());

  const getStatusColor = (status: PlatformInfo['status']) => {
    switch (status) {
      case 'occupied': return 'bg-danger/20 border-danger text-danger';
      case 'free': return 'bg-success/20 border-success text-success';
      case 'maintenance': return 'bg-warning/20 border-warning text-warning';
      case 'reserved': return 'bg-info/20 border-info text-info';
      default: return 'bg-muted/20 border-muted text-muted-foreground';
    }
  };

  const getTrainTypeColor = (type: TrainInfo['type']) => {
    switch (type) {
      case 'express': return 'bg-primary';
      case 'passenger': return 'bg-success';
      case 'freight': return 'bg-warning';
      case 'local': return 'bg-info';
      default: return 'bg-muted';
    }
  };

  const getTrainOnPlatform = (platformNumber: number) => {
    return trains.find(train => train.platform === platformNumber && 
      (train.status === 'arrived' || train.status === 'delayed'));
  };

  // Simulate train animations
  useEffect(() => {
    const interval = setInterval(() => {
      const approachingTrains = trains.filter(train => train.status === 'approaching');
      if (approachingTrains.length > 0) {
        const trainToAnimate = approachingTrains[Math.floor(Math.random() * approachingTrains.length)];
        setAnimatingTrains(prev => new Set(prev).add(trainToAnimate.id));
        
        setTimeout(() => {
          setAnimatingTrains(prev => {
            const newSet = new Set(prev);
            newSet.delete(trainToAnimate.id);
            return newSet;
          });
        }, 3000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [trains]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Station Layout - {stationData.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Station Overview */}
          <div className="relative bg-gradient-to-r from-railway-primary/5 to-railway-secondary/5 rounded-lg p-6 border border-railway-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
              {platforms.map((platform) => {
                const trainOnPlatform = getTrainOnPlatform(platform.number);
                const isAnimating = trainOnPlatform && animatingTrains.has(trainOnPlatform.id);

                return (
                  <div key={platform.number} className="space-y-2">
                    {/* Platform Label */}
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        Platform {platform.number}
                      </Badge>
                    </div>

                    {/* Platform Track */}
                    <div className={cn(
                      "relative h-16 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
                      getStatusColor(platform.status)
                    )}>
                      {/* Train on Platform */}
                      {trainOnPlatform && (
                        <motion.div
                          initial={isAnimating ? { x: -100, opacity: 0 } : { x: 0, opacity: 1 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          className={cn(
                            "absolute inset-1 rounded flex items-center justify-center text-white text-xs font-medium",
                            getTrainTypeColor(trainOnPlatform.type)
                          )}
                        >
                          <Train className="h-4 w-4 mr-1" />
                          {trainOnPlatform.number}
                        </motion.div>
                      )}

                      {/* Empty Platform */}
                      {!trainOnPlatform && platform.status === 'free' && (
                        <div className="text-xs text-muted-foreground">Available</div>
                      )}

                      {/* Maintenance */}
                      {platform.status === 'maintenance' && (
                        <div className="text-xs text-warning">Maintenance</div>
                      )}

                      {/* Reserved */}
                      {platform.status === 'reserved' && (
                        <div className="text-xs text-info">Reserved</div>
                      )}
                    </div>

                    {/* Platform Info */}
                    <div className="text-center">
                      {platform.status === 'occupied' && platform.estimatedClearTime && (
                        <div className="text-xs text-muted-foreground">
                          Clear: {platform.estimatedClearTime}
                        </div>
                      )}
                      {platform.status === 'free' && platform.nextTrain && (
                        <div className="text-xs text-muted-foreground">
                          Next: {platform.nextTrain}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Approaching Trains Animation */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Train className="h-4 w-4" />
              Approaching Trains
            </h4>
            <div className="space-y-2">
              {trains.filter(train => train.status === 'approaching').map((train) => (
                <motion.div
                  key={train.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-white text-xs",
                      getTrainTypeColor(train.type)
                    )}>
                      <Train className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{train.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Platform {train.platform} • {train.scheduledTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {train.delay > 0 && (
                      <Badge variant="outline" className="text-xs text-warning border-warning">
                        <Clock className="h-3 w-3 mr-1" />
                        +{train.delay}m
                      </Badge>
                    )}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="h-2 w-2 bg-primary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Station Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{platforms.filter(p => p.status === 'free').length}</div>
              <div className="text-xs text-muted-foreground">Free Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-danger">{platforms.filter(p => p.status === 'occupied').length}</div>
              <div className="text-xs text-muted-foreground">Occupied</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{platforms.filter(p => p.status === 'maintenance').length}</div>
              <div className="text-xs text-muted-foreground">Maintenance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">{trains.filter(t => t.status === 'approaching').length}</div>
              <div className="text-xs text-muted-foreground">Approaching</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};