import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Train, Clock, ArrowUp, ArrowDown } from "lucide-react";
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

interface TrainScheduleProps {
  trains: TrainInfo[];
}

export const TrainSchedule = ({ trains }: TrainScheduleProps) => {
  const getStatusColor = (status: TrainInfo['status']) => {
    switch (status) {
      case 'on_time': return 'bg-success/10 text-success border-success/30';
      case 'delayed': return 'bg-warning/10 text-warning border-warning/30';
      case 'arrived': return 'bg-info/10 text-info border-info/30';
      case 'departed': return 'bg-muted/10 text-muted-foreground border-muted/30';
      case 'approaching': return 'bg-primary/10 text-primary border-primary/30';
      default: return 'bg-muted/10 text-muted-foreground border-muted/30';
    }
  };

  const getTypeColor = (type: TrainInfo['type']) => {
    switch (type) {
      case 'express': return 'bg-primary/10 text-primary border-primary/30';
      case 'passenger': return 'bg-success/10 text-success border-success/30';
      case 'freight': return 'bg-warning/10 text-warning border-warning/30';
      case 'local': return 'bg-info/10 text-info border-info/30';
      default: return 'bg-muted/10 text-muted-foreground border-muted/30';
    }
  };

  const sortedTrains = [...trains].sort((a, b) => {
    // Sort by scheduled time
    return a.scheduledTime.localeCompare(b.scheduledTime);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Train Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {sortedTrains.map((train) => (
              <div
                key={train.id}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {train.direction === 'arrival' ? (
                      <ArrowDown className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-info" />
                    )}
                    <Train className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{train.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {train.number} • Platform {train.platform}
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn("text-xs", getTypeColor(train.type))}>
                      {train.type.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(train.status))}>
                      {train.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-mono">{train.scheduledTime}</div>
                    {train.delay > 0 && (
                      <div className="text-xs text-warning">
                        Delayed +{train.delay}m
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};