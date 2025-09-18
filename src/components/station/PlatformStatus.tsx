import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Train, Clock, Wrench, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlatformInfo {
  number: number;
  status: 'occupied' | 'free' | 'maintenance' | 'reserved';
  trainId?: string;
  trainName?: string;
  estimatedClearTime?: string;
  nextTrain?: string;
}

interface PlatformStatusProps {
  platforms: PlatformInfo[];
}

export const PlatformStatus = ({ platforms }: PlatformStatusProps) => {
  const getStatusIcon = (status: PlatformInfo['status']) => {
    switch (status) {
      case 'occupied': return Train;
      case 'free': return MapPin;
      case 'maintenance': return Wrench;
      case 'reserved': return BookOpen;
      default: return MapPin;
    }
  };

  const getStatusColor = (status: PlatformInfo['status']) => {
    switch (status) {
      case 'occupied': return 'bg-danger/10 text-danger border-danger/30';
      case 'free': return 'bg-success/10 text-success border-success/30';
      case 'maintenance': return 'bg-warning/10 text-warning border-warning/30';
      case 'reserved': return 'bg-info/10 text-info border-info/30';
      default: return 'bg-muted/10 text-muted-foreground border-muted/30';
    }
  };

  const getStatusText = (status: PlatformInfo['status']) => {
    switch (status) {
      case 'occupied': return 'OCCUPIED';
      case 'free': return 'AVAILABLE';
      case 'maintenance': return 'MAINTENANCE';
      case 'reserved': return 'RESERVED';
      default: return 'UNKNOWN';
    }
  };

  const sortedPlatforms = [...platforms].sort((a, b) => a.number - b.number);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Platform Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {sortedPlatforms.map((platform) => {
              const StatusIcon = getStatusIcon(platform.status);
              
              return (
                <div
                  key={platform.number}
                  className="p-4 bg-card border border-border rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <StatusIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Platform {platform.number}</div>
                        <Badge variant="outline" className={cn("text-xs mt-1", getStatusColor(platform.status))}>
                          {getStatusText(platform.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Platform Details */}
                  <div className="space-y-2 pl-13">
                    {platform.status === 'occupied' && platform.trainName && (
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-foreground">
                          Current Train: {platform.trainName}
                        </div>
                        {platform.estimatedClearTime && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            Est. Clear: {platform.estimatedClearTime}
                          </div>
                        )}
                      </div>
                    )}

                    {platform.status === 'free' && platform.nextTrain && (
                      <div className="text-sm text-muted-foreground">
                        Next: {platform.nextTrain}
                      </div>
                    )}

                    {platform.status === 'maintenance' && (
                      <div className="text-sm text-warning">
                        Under maintenance - unavailable
                      </div>
                    )}

                    {platform.status === 'reserved' && platform.nextTrain && (
                      <div className="text-sm text-info">
                        Reserved for: {platform.nextTrain}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Platform Summary */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-success">
                {platforms.filter(p => p.status === 'free').length}
              </div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
            <div>
              <div className="text-lg font-bold text-danger">
                {platforms.filter(p => p.status === 'occupied').length}
              </div>
              <div className="text-xs text-muted-foreground">Occupied</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};