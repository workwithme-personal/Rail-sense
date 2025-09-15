import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Train, 
  Search, 
  Filter,
  Navigation,
  Clock,
  AlertTriangle,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TrainLocation {
  id: string;
  name: string;
  number: string;
  type: 'passenger' | 'freight' | 'express' | 'local';
  currentStation: string;
  nextStation: string;
  latitude: number;
  longitude: number;
  speed: number;
  delay: number;
  status: 'on-time' | 'delayed' | 'stopped' | 'approaching';
  direction: 'north' | 'south' | 'east' | 'west';
  lastUpdate: string;
}

interface TrainTrackingProps {
  className?: string;
}

const mockTrainData: TrainLocation[] = [
  {
    id: 'T001',
    name: 'Rajdhani Express',
    number: '12001',
    type: 'express',
    currentStation: 'New Delhi',
    nextStation: 'Kanpur Central',
    latitude: 28.6139,
    longitude: 77.2090,
    speed: 95,
    delay: -5,
    status: 'on-time',
    direction: 'east',
    lastUpdate: '2 min ago'
  },
  {
    id: 'T002',
    name: 'Mumbai Local',
    number: '90123',
    type: 'local',
    currentStation: 'Andheri',
    nextStation: 'Bandra',
    latitude: 19.1197,
    longitude: 72.8464,
    speed: 65,
    delay: 3,
    status: 'delayed',
    direction: 'south',
    lastUpdate: '1 min ago'
  },
  {
    id: 'T003',
    name: 'Goods Special',
    number: 'DFC321',
    type: 'freight',
    currentStation: 'Jhansi Jn',
    nextStation: 'Gwalior',
    latitude: 25.4484,
    longitude: 78.5685,
    speed: 0,
    delay: 15,
    status: 'stopped',
    direction: 'north',
    lastUpdate: '30 sec ago'
  },
  {
    id: 'T004',
    name: 'Shatabdi Express',
    number: '12002',
    type: 'express',
    currentStation: 'Approaching Agra',
    nextStation: 'Agra Cantt',
    latitude: 27.1767,
    longitude: 78.0081,
    speed: 85,
    delay: 0,
    status: 'approaching',
    direction: 'south',
    lastUpdate: '45 sec ago'
  },
  {
    id: 'T005',
    name: 'Chennai Express',
    number: '12615',
    type: 'passenger',
    currentStation: 'Vijayawada',
    nextStation: 'Chennai Central',
    latitude: 16.5062,
    longitude: 80.6480,
    speed: 78,
    delay: 8,
    status: 'delayed',
    direction: 'south',
    lastUpdate: '1 min ago'
  }
];

const statusConfig = {
  'on-time': { color: 'bg-success', label: 'On Time', textColor: 'text-success' },
  'delayed': { color: 'bg-warning', label: 'Delayed', textColor: 'text-warning' },
  'stopped': { color: 'bg-destructive', label: 'Stopped', textColor: 'text-destructive' },
  'approaching': { color: 'bg-primary', label: 'Approaching', textColor: 'text-primary' }
};

const typeConfig = {
  passenger: { color: 'bg-blue-500', label: 'Passenger' },
  freight: { color: 'bg-amber-500', label: 'Freight' },
  express: { color: 'bg-red-500', label: 'Express' },
  local: { color: 'bg-purple-500', label: 'Local' }
};

export function TrainTracking({ className }: TrainTrackingProps) {
  const [trains, setTrains] = useState<TrainLocation[]>(mockTrainData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);

  // Filter trains based on search and filters
  const filteredTrains = trains.filter(train => {
    const matchesSearch = train.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         train.number.includes(searchTerm) ||
                         train.currentStation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || train.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || train.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrains(prev => prev.map(train => ({
        ...train,
        speed: train.status === 'stopped' ? 0 : Math.max(0, train.speed + (Math.random() - 0.5) * 10),
        delay: train.delay + (Math.random() - 0.7) * 2,
        lastUpdate: 'Just now'
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Live Train Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by train name, number, or station..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Train Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="passenger">Passenger</SelectItem>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="freight">Freight</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="on-time">On Time</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="stopped">Stopped</SelectItem>
                <SelectItem value="approaching">Approaching</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Live Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Live Train Map
            <Badge variant="outline" className="ml-auto">
              {filteredTrains.length} trains visible
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
            {/* Map placeholder with train markers */}
            <div className="absolute inset-4 bg-muted/20 rounded-lg overflow-hidden">
              {/* Railway network lines */}
              <svg className="absolute inset-0 w-full h-full">
                <path d="M50 50 Q 200 100, 350 50" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                <path d="M50 150 L 350 150" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                <path d="M50 250 Q 200 200, 350 250" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeDasharray="5,5" />
              </svg>
              
              {/* Train markers */}
              {filteredTrains.map((train, index) => {
                const x = 50 + (index * 60) % 300;
                const y = 80 + (index * 80) % 200;
                const config = statusConfig[train.status];
                
                return (
                  <div
                    key={train.id}
                    className={cn(
                      "absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all hover:scale-125",
                      config.color,
                      selectedTrain === train.id && "scale-150 ring-2 ring-primary"
                    )}
                    style={{ left: x, top: y }}
                    onClick={() => setSelectedTrain(selectedTrain === train.id ? null : train.id)}
                  >
                    <Train className="w-3 h-3 text-white m-0.5" />
                  </div>
                );
              })}
            </div>
            
            <div className="text-center z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Interactive map with real-time train locations
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Integration with mapping service required
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Train List */}
      <div className="grid gap-4">
        {filteredTrains.map((train) => {
          const statusCfg = statusConfig[train.status];
          const typeCfg = typeConfig[train.type];
          const isSelected = selectedTrain === train.id;
          
          return (
            <Card 
              key={train.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-primary shadow-lg"
              )}
              onClick={() => setSelectedTrain(isSelected ? null : train.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn("w-3 h-3 rounded-full", typeCfg.color)} />
                      <h3 className="font-semibold text-lg">{train.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        #{train.number}
                      </Badge>
                      <Badge 
                        variant="secondary"
                        className={cn("text-xs", statusCfg.textColor)}
                      >
                        {statusCfg.label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{train.currentStation}</p>
                          <p className="text-muted-foreground text-xs">Current Location</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{train.nextStation}</p>
                          <p className="text-muted-foreground text-xs">Next Station</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{train.speed} km/h</p>
                          <p className="text-muted-foreground text-xs">Current Speed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className={cn(
                        "text-sm font-medium",
                        train.delay > 0 ? "text-warning" : train.delay < 0 ? "text-success" : "text-muted-foreground"
                      )}>
                        {train.delay > 0 ? `+${train.delay}m` : train.delay < 0 ? `${train.delay}m` : 'On time'}
                      </span>
                    </div>
                    
                    {train.delay > 10 && (
                      <div className="flex items-center gap-1 text-warning">
                        <AlertTriangle className="h-3 w-3" />
                        <span className="text-xs">High Delay</span>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Updated: {train.lastUpdate}
                    </p>
                  </div>
                </div>
                
                {/* Expanded Details */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Train Type</p>
                        <p className="font-medium capitalize">{train.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Direction</p>
                        <p className="font-medium capitalize">{train.direction}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Coordinates</p>
                        <p className="font-medium">{train.latitude.toFixed(4)}, {train.longitude.toFixed(4)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className={cn("font-medium capitalize", statusCfg.textColor)}>
                          {train.status.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {filteredTrains.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Train className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No trains found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}