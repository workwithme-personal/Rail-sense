import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrainData {
  id: string;
  name: string;
  type: 'passenger' | 'freight' | 'express' | 'local';
  currentTrack: number;
  targetTrack: number;
  speed: number;
  priority: number;
  position: number; // 0-100 percentage
  delay: number;
  status: 'moving' | 'waiting' | 'conflict' | 'stopped';
}

export interface AISuggestion {
  id: string;
  type: 'hold' | 'proceed' | 'reroute';
  trainId: string;
  message: string;
  duration?: number;
  alternativeTrack?: number;
  priority: 'high' | 'medium' | 'low';
}

interface LiveTrackSimulationProps {
  stationId: string;
  trains: TrainData[];
  suggestions: AISuggestion[];
  onAcceptSuggestion: (suggestionId: string) => void;
  onRejectSuggestion: (suggestionId: string) => void;
}

const trainTypeConfig = {
  passenger: { color: 'train-passenger', label: 'Passenger' },
  freight: { color: 'train-freight', label: 'Freight' },
  express: { color: 'train-express', label: 'Express' },
  local: { color: 'train-local', label: 'Local' },
};

export function LiveTrackSimulation({ 
  stationId, 
  trains, 
  suggestions,
  onAcceptSuggestion,
  onRejectSuggestion 
}: LiveTrackSimulationProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const simulationRef = useRef<HTMLDivElement>(null);

  const tracks = [1, 2, 3, 4, 5]; // Up to 5 tracks for simulation

  const getTrainOnTrack = (trackNumber: number) => 
    trains.filter(train => train.currentTrack === trackNumber);

  const getSuggestionForTrain = (trainId: string) =>
    suggestions.find(suggestion => suggestion.trainId === trainId);

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Live Track Simulation - Station {stationId}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Track Layout */}
        <div ref={simulationRef} className="relative bg-muted/20 rounded-lg p-6 mb-6">
          <div className="space-y-6">
            {tracks.map((trackNumber) => {
              const trainsOnTrack = getTrainOnTrack(trackNumber);
              
              return (
                <div key={trackNumber} className="relative">
                  {/* Track Line */}
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="min-w-16 text-center">
                      Track {trackNumber}
                    </Badge>
                    
                    {/* Track Rail */}
                    <div className="flex-1 relative">
                      <div className="h-2 bg-track-main rounded-full relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-track-main via-track-loop to-track-main opacity-50" />
                      </div>
                      
                      {/* Trains on this track */}
                      <AnimatePresence>
                        {trainsOnTrack.map((train) => {
                          const suggestion = getSuggestionForTrain(train.id);
                          const config = trainTypeConfig[train.type];
                          
                          return (
                            <motion.div
                              key={train.id}
                              initial={{ x: 0, opacity: 0 }}
                              animate={{ 
                                x: `${train.position}%`, 
                                opacity: 1 
                              }}
                              exit={{ opacity: 0 }}
                              transition={{ 
                                duration: isPlaying ? 2 : 0,
                                ease: "linear"
                              }}
                              className={cn(
                                "absolute -top-3 w-12 h-6 rounded cursor-pointer transition-all",
                                `bg-${config.color}`,
                                train.status === 'conflict' && "animate-pulse-glow",
                                train.status === 'stopped' && "opacity-75",
                                selectedTrain === train.id && "ring-2 ring-primary scale-110 z-10"
                              )}
                              onClick={() => setSelectedTrain(train.id)}
                              whileHover={{ scale: 1.1 }}
                            >
                              <div className="flex items-center justify-center h-full">
                                <span className="text-xs font-bold text-white truncate px-1">
                                  {train.name}
                                </span>
                              </div>
                              
                              {/* Status indicator */}
                              <div className={cn(
                                "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                                train.status === 'moving' && "bg-success",
                                train.status === 'waiting' && "bg-warning",
                                train.status === 'conflict' && "bg-destructive animate-signal-blink",
                                train.status === 'stopped' && "bg-muted-foreground"
                              )} />
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                    
                    {/* Platform indicator */}
                    <div className="w-16 h-8 bg-secondary rounded border flex items-center justify-center">
                      <span className="text-xs font-medium">P{trackNumber}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Suggestions Panel */}
        {suggestions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              AI Recommendations
            </h3>
            
            <div className="grid gap-3">
              {suggestions.map((suggestion) => {
                const train = trains.find(t => t.id === suggestion.trainId);
                if (!train) return null;
                
                return (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "p-4 rounded-lg border-l-4 bg-card",
                      suggestion.priority === 'high' && "border-l-destructive bg-destructive/5",
                      suggestion.priority === 'medium' && "border-l-warning bg-warning/5",
                      suggestion.priority === 'low' && "border-l-primary bg-primary/5"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {train.name}
                          </Badge>
                          <Badge 
                            variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {suggestion.priority.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground mb-2">
                          {suggestion.message}
                        </p>
                        {suggestion.duration && (
                          <p className="text-xs text-muted-foreground">
                            Duration: {suggestion.duration} minutes
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => onAcceptSuggestion(suggestion.id)}
                          className="bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onRejectSuggestion(suggestion.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Override
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Train Details Panel */}
        {selectedTrain && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-card border rounded-lg"
          >
            {(() => {
              const train = trains.find(t => t.id === selectedTrain);
              if (!train) return null;
              
              const config = trainTypeConfig[train.type];
              
              return (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full", `bg-${config.color}`)} />
                    {train.name} - {config.label}
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Current Track:</span>
                      <p className="font-medium">Track {train.currentTrack}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target Track:</span>
                      <p className="font-medium">Track {train.targetTrack}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Speed:</span>
                      <p className="font-medium">{train.speed} km/h</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Delay:</span>
                      <p className={cn(
                        "font-medium",
                        train.delay > 0 ? "text-warning" : "text-success"
                      )}>
                        {train.delay}m
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}