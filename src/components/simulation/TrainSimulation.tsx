import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Train as TrainIcon
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

interface TrainSimulationProps {
  stationId: string;
  trains: TrainData[];
  suggestions: AISuggestion[];
  onAcceptSuggestion: (suggestionId: string) => void;
  onRejectSuggestion: (suggestionId: string) => void;
}

const trainTypeConfig = {
  passenger: { color: '#10B981', label: 'Passenger', icon: '🚃' },
  freight: { color: '#F59E0B', label: 'Freight', icon: '🚚' },
  express: { color: '#EF4444', label: 'Express', icon: '🚄' },
  local: { color: '#8B5CF6', label: 'Local', icon: '🚇' },
};

// SVG Train Component
const TrainSVG = ({ type, name, isMoving }: { type: keyof typeof trainTypeConfig, name: string, isMoving: boolean }) => {
  const config = trainTypeConfig[type];
  
  return (
    <motion.div
      className="relative"
      animate={isMoving ? { x: [0, 2, 0, -2, 0] } : {}}
      transition={{ duration: 0.5, repeat: isMoving ? Infinity : 0 }}
    >
      <svg width="48" height="24" viewBox="0 0 48 24" className="drop-shadow-sm">
        {/* Train Body */}
        <rect 
          x="4" y="6" width="40" height="12" 
          rx="6" 
          fill={config.color}
          stroke="#ffffff"
          strokeWidth="1"
        />
        {/* Windows */}
        <rect x="8" y="9" width="6" height="6" rx="1" fill="#ffffff" opacity="0.8" />
        <rect x="16" y="9" width="6" height="6" rx="1" fill="#ffffff" opacity="0.8" />
        <rect x="24" y="9" width="6" height="6" rx="1" fill="#ffffff" opacity="0.8" />
        <rect x="32" y="9" width="6" height="6" rx="1" fill="#ffffff" opacity="0.8" />
        
        {/* Wheels */}
        <circle cx="12" cy="20" r="3" fill="#374151" />
        <circle cx="20" cy="20" r="3" fill="#374151" />
        <circle cx="28" cy="20" r="3" fill="#374151" />
        <circle cx="36" cy="20" r="3" fill="#374151" />
        
        {/* Wheel centers */}
        <circle cx="12" cy="20" r="1" fill="#9CA3AF" />
        <circle cx="20" cy="20" r="1" fill="#9CA3AF" />
        <circle cx="28" cy="20" r="1" fill="#9CA3AF" />
        <circle cx="36" cy="20" r="1" fill="#9CA3AF" />
        
        {/* Front light */}
        <circle cx="44" cy="12" r="2" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
      </svg>
      
      {/* Train Name */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <Badge variant="secondary" className="text-xs px-1 py-0">
          {name}
        </Badge>
      </div>
    </motion.div>
  );
};

export function TrainSimulation({ 
  stationId, 
  trains, 
  suggestions,
  onAcceptSuggestion,
  onRejectSuggestion 
}: TrainSimulationProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [simulationTrains, setSimulationTrains] = useState<TrainData[]>(trains);
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<AISuggestion | null>(null);
  const simulationRef = useRef<HTMLDivElement>(null);

  const tracks = [1, 2, 3, 4, 5]; // Up to 5 tracks for simulation

  useEffect(() => {
    setSimulationTrains(trains);
  }, [trains]);

  // Simulate train movement
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSimulationTrains(prev => prev.map(train => ({
        ...train,
        position: train.status === 'moving' ? Math.min(train.position + 1, 95) : train.position
      })));
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const getTrainOnTrack = (trackNumber: number) => 
    simulationTrains.filter(train => train.currentTrack === trackNumber);

  const getSuggestionForTrain = (trainId: string) =>
    suggestions.find(suggestion => suggestion.trainId === trainId);

  const handleAcceptSuggestion = (suggestionId: string) => {
    const suggestion = suggestions.find(s => s.id === suggestionId);
    if (!suggestion) return;

    // Apply the suggestion to simulation
    if (suggestion.type === 'hold') {
      setSimulationTrains(prev => prev.map(train => 
        train.id === suggestion.trainId 
          ? { ...train, status: 'waiting' as const }
          : train
      ));
      
      // Resume movement after duration
      setTimeout(() => {
        setSimulationTrains(prev => prev.map(train => 
          train.id === suggestion.trainId 
            ? { ...train, status: 'moving' as const }
            : train
        ));
      }, (suggestion.duration || 3) * 1000);
    }
    
    if (suggestion.type === 'reroute') {
      setSimulationTrains(prev => prev.map(train => 
        train.id === suggestion.trainId 
          ? { ...train, targetTrack: suggestion.alternativeTrack || train.targetTrack }
          : train
      ));
    }

    onAcceptSuggestion(suggestionId);
  };

  const handleRejectSuggestion = (suggestionId: string) => {
    const suggestion = suggestions.find(s => s.id === suggestionId);
    setCurrentSuggestion(suggestion || null);
    setShowOverrideDialog(true);
  };

  const handleOverrideChoice = (choice: 'manual' | 'auto' | 'ignore') => {
    if (currentSuggestion) {
      // Handle different override choices
      if (choice === 'manual') {
        // Allow manual control
        console.log('Manual override selected');
      } else if (choice === 'auto') {
        // Apply automatic alternative
        console.log('Auto alternative selected');
      }
      onRejectSuggestion(currentSuggestion.id);
    }
    setShowOverrideDialog(false);
    setCurrentSuggestion(null);
  };

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
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSimulationTrains(trains)}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Track Layout */}
        <div ref={simulationRef} className="relative bg-gradient-to-r from-track-main/10 to-track-loop/10 rounded-lg p-8 mb-6">
          <div className="space-y-8">
            {tracks.map((trackNumber) => {
              const trainsOnTrack = getTrainOnTrack(trackNumber);
              
              return (
                <div key={trackNumber} className="relative">
                  {/* Track Line */}
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="min-w-20 text-center font-mono">
                      Track {trackNumber}
                    </Badge>
                    
                    {/* Track Rail */}
                    <div className="flex-1 relative">
                      {/* Railway track with sleepers */}
                      <div className="h-4 relative">
                        {/* Rail lines */}
                        <div className="absolute top-1 left-0 right-0 h-1 bg-track-main rounded-full" />
                        <div className="absolute bottom-1 left-0 right-0 h-1 bg-track-main rounded-full" />
                        
                        {/* Railway sleepers */}
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div 
                            key={i}
                            className="absolute top-0 bottom-0 w-1 bg-track-loop/60"
                            style={{ left: `${i * 5}%` }}
                          />
                        ))}
                      </div>
                      
                      {/* Trains on this track */}
                      <div className="absolute -top-8 left-0 right-0 h-16">
                        <AnimatePresence>
                          {trainsOnTrack.map((train) => {
                            const suggestion = getSuggestionForTrain(train.id);
                            
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
                                  duration: isPlaying ? 1 : 0,
                                  ease: "linear"
                                }}
                                className={cn(
                                  "absolute top-4 cursor-pointer transition-all transform-gpu",
                                  train.status === 'conflict' && "animate-pulse",
                                  selectedTrain === train.id && "scale-110 z-10"
                                )}
                                onClick={() => setSelectedTrain(train.id)}
                                whileHover={{ scale: 1.1 }}
                              >
                                <TrainSVG 
                                  type={train.type} 
                                  name={train.name}
                                  isMoving={train.status === 'moving' && isPlaying}
                                />
                                
                                {/* Status indicator */}
                                <div className={cn(
                                  "absolute -top-2 -right-2 w-3 h-3 rounded-full border-2 border-white",
                                  train.status === 'moving' && "bg-success",
                                  train.status === 'waiting' && "bg-warning animate-pulse",
                                  train.status === 'conflict' && "bg-destructive animate-ping",
                                  train.status === 'stopped' && "bg-muted-foreground"
                                )} />

                                {/* Suggestion indicator */}
                                {suggestion && (
                                  <div className="absolute -top-6 -left-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center animate-bounce">
                                    <AlertTriangle className="h-3 w-3 text-warning-foreground" />
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {/* Platform indicator */}
                    <div className="w-20 h-12 bg-secondary/80 rounded border-2 border-secondary flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs font-medium">Platform</div>
                        <div className="text-lg font-bold">{trackNumber}</div>
                      </div>
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
                const train = simulationTrains.find(t => t.id === suggestion.trainId);
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
                            <TrainIcon className="h-3 w-3 mr-1" />
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
                          onClick={() => handleAcceptSuggestion(suggestion.id)}
                          className="bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectSuggestion(suggestion.id)}
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
              const train = simulationTrains.find(t => t.id === selectedTrain);
              if (!train) return null;
              
              const config = trainTypeConfig[train.type];
              
              return (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: config.color }}
                    />
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
                      <span className="text-muted-foreground">Status:</span>
                      <p className={cn(
                        "font-medium capitalize",
                        train.status === 'moving' && "text-success",
                        train.status === 'waiting' && "text-warning",
                        train.status === 'conflict' && "text-destructive",
                        train.status === 'stopped' && "text-muted-foreground"
                      )}>
                        {train.status}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </CardContent>

      {/* Override Dialog */}
      <Dialog open={showOverrideDialog} onOpenChange={setShowOverrideDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Override AI Suggestion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You're about to override the AI suggestion. How would you like to proceed?
            </p>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleOverrideChoice('manual')}
              >
                <TrainIcon className="h-4 w-4 mr-2" />
                Manual Control - I'll handle this manually
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleOverrideChoice('auto')}
              >
                <Zap className="h-4 w-4 mr-2" />
                Auto Alternative - Use alternative AI suggestion
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleOverrideChoice('ignore')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Ignore - Continue with current plan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}