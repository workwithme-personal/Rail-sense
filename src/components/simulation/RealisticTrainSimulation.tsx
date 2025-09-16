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

export interface RealisticTrainData {
  id: string;
  name: string;
  type: 'passenger' | 'freight' | 'express' | 'local';
  currentTrack: number;
  targetTrack: number;
  speed: number;
  priority: number;
  position: number; // 0-100 percentage along track
  delay: number;
  status: 'moving' | 'waiting' | 'conflict' | 'stopped' | 'at_platform';
  platform?: number;
  route: number[]; // Array of track numbers for the route
}

export interface RealisticAISuggestion {
  id: string;
  type: 'hold' | 'proceed' | 'reroute' | 'platform_change';
  trainId: string;
  affectedTrainId?: string; // For conflicts involving two trains
  message: string;
  duration?: number;
  alternativeTrack?: number;
  alternativePlatform?: number;
  priority: 'high' | 'medium' | 'low';
  scenario: 'track_conflict' | 'platform_conflict' | 'optimization';
}

interface RealisticTrainSimulationProps {
  stationId: string;
  onAcceptSuggestion: (suggestionId: string) => void;
  onRejectSuggestion: (suggestionId: string) => void;
}

const trainTypeConfig = {
  passenger: { color: 'hsl(142, 71%, 45%)', label: 'Passenger', icon: '🚃' },
  freight: { color: 'hsl(38, 92%, 50%)', label: 'Freight', icon: '🚚' },
  express: { color: 'hsl(0, 84%, 60%)', label: 'Express', icon: '🚄' },
  local: { color: 'hsl(262, 83%, 58%)', label: 'Local', icon: '🚇' },
};

// Realistic scenarios
const scenarios = {
  trackConflict: {
    trains: [
      {
        id: 'goods1',
        name: 'DFC 321',
        type: 'freight' as const,
        currentTrack: 3,
        targetTrack: 1,
        speed: 45,
        priority: 2,
        position: 20,
        delay: 0,
        status: 'moving' as const,
        route: [3, 1]
      },
      {
        id: 'express1',
        name: 'MGS EXP',
        type: 'express' as const,
        currentTrack: 4,
        targetTrack: 1,
        speed: 80,
        priority: 9,
        position: 25,
        delay: 5,
        status: 'moving' as const,
        route: [4, 1]
      }
    ],
    suggestions: [
      {
        id: 'sug1',
        type: 'hold' as const,
        trainId: 'goods1',
        affectedTrainId: 'express1',
        message: 'Hold DFC 321 (Goods) for 3 minutes on Track 3. Allow MGS Express to proceed first to Track 1. This prevents collision and maintains express train priority.',
        duration: 3,
        priority: 'high' as const,
        scenario: 'track_conflict' as const
      }
    ]
  },
  platformConflict: {
    trains: [
      {
        id: 'local1',
        name: 'Local 456',
        type: 'local' as const,
        currentTrack: 2,
        targetTrack: 2,
        speed: 60,
        priority: 5,
        position: 80,
        delay: 0,
        status: 'moving' as const,
        platform: 2,
        route: [2]
      },
      {
        id: 'passenger1',
        name: 'Chennai EXP',
        type: 'passenger' as const,
        currentTrack: 5,
        targetTrack: 2,
        speed: 70,
        priority: 7,
        position: 70,
        delay: 2,
        status: 'moving' as const,
        platform: 2,
        route: [5, 2]
      }
    ],
    suggestions: [
      {
        id: 'sug2',
        type: 'reroute' as const,
        trainId: 'passenger1',
        message: 'Reroute Chennai Express to Platform 3 instead of Platform 2. Local train already approaching Platform 2. This saves 8 minutes total delay.',
        alternativeTrack: 3,
        alternativePlatform: 3,
        priority: 'medium' as const,
        scenario: 'platform_conflict' as const
      }
    ]
  }
};

const TrainSVG = ({ 
  type, 
  name, 
  isMoving, 
  status 
}: { 
  type: keyof typeof trainTypeConfig;
  name: string;
  isMoving: boolean;
  status: string;
}) => {
  const config = trainTypeConfig[type];
  
  return (
    <motion.div
      className="relative"
      animate={isMoving ? { x: [0, 3, 0, -3, 0] } : {}}
      transition={{ duration: 0.8, repeat: isMoving ? Infinity : 0 }}
    >
      <svg width="60" height="32" viewBox="0 0 60 32" className="drop-shadow-md">
        {/* Train Body */}
        <rect 
          x="6" y="8" width="48" height="16" 
          rx="8" 
          fill={config.color}
          stroke="#ffffff"
          strokeWidth="2"
        />
        {/* Windows */}
        <rect x="12" y="12" width="8" height="8" rx="2" fill="#ffffff" opacity="0.9" />
        <rect x="22" y="12" width="8" height="8" rx="2" fill="#ffffff" opacity="0.9" />
        <rect x="32" y="12" width="8" height="8" rx="2" fill="#ffffff" opacity="0.9" />
        <rect x="42" y="12" width="8" height="8" rx="2" fill="#ffffff" opacity="0.9" />
        
        {/* Wheels */}
        <circle cx="16" cy="26" r="4" fill="#374151" />
        <circle cx="26" cy="26" r="4" fill="#374151" />
        <circle cx="36" cy="26" r="4" fill="#374151" />
        <circle cx="46" cy="26" r="4" fill="#374151" />
        
        {/* Wheel centers */}
        <circle cx="16" cy="26" r="1.5" fill="#9CA3AF" />
        <circle cx="26" cy="26" r="1.5" fill="#9CA3AF" />
        <circle cx="36" cy="26" r="1.5" fill="#9CA3AF" />
        <circle cx="46" cy="26" r="1.5" fill="#9CA3AF" />
        
        {/* Front light */}
        <circle cx="54" cy="16" r="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        
        {/* Status indicator light */}
        {status === 'conflict' && (
          <circle cx="10" cy="10" r="3" fill="#EF4444" className="animate-pulse" />
        )}
        {status === 'waiting' && (
          <circle cx="10" cy="10" r="3" fill="#F59E0B" className="animate-pulse" />
        )}
      </svg>
      
      {/* Train Name */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <Badge variant="secondary" className="text-xs px-2 py-1 bg-white/90">
          {name}
        </Badge>
      </div>
    </motion.div>
  );
};

export function RealisticTrainSimulation({ 
  stationId,
  onAcceptSuggestion,
  onRejectSuggestion 
}: RealisticTrainSimulationProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [currentScenario, setCurrentScenario] = useState<'trackConflict' | 'platformConflict'>('trackConflict');
  const [simulationTrains, setSimulationTrains] = useState<RealisticTrainData[]>(scenarios.trackConflict.trains);
  const [suggestions, setSuggestions] = useState<RealisticAISuggestion[]>(scenarios.trackConflict.suggestions);
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<RealisticAISuggestion | null>(null);
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());

  const tracks = [1, 2, 3, 4, 5];

  // Simulate realistic train movement
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSimulationTrains(prev => prev.map(train => {
        if (train.status === 'waiting' || train.status === 'stopped') {
          return train;
        }

        let newPosition = train.position;
        
        // Different movement speeds based on train type and status
        const speedMultiplier = train.type === 'express' ? 1.5 : train.type === 'freight' ? 0.7 : 1;
        const increment = speedMultiplier * (train.status === 'moving' ? 1.2 : 0.5);
        
        newPosition = Math.min(train.position + increment, 95);

        // Simulate track switching
        let currentTrack = train.currentTrack;
        if (train.route.length > 1 && newPosition > 60) {
          currentTrack = train.route[1];
        }

        return {
          ...train,
          position: newPosition,
          currentTrack
        };
      }));
    }, 300);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const getTrainOnTrack = (trackNumber: number) => 
    simulationTrains.filter(train => train.currentTrack === trackNumber);

  const handleAcceptSuggestion = (suggestionId: string) => {
    const suggestion = suggestions.find(s => s.id === suggestionId);
    if (!suggestion || appliedSuggestions.has(suggestionId)) return;

    setAppliedSuggestions(prev => new Set([...prev, suggestionId]));

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
          ? { 
              ...train, 
              targetTrack: suggestion.alternativeTrack || train.targetTrack,
              route: suggestion.alternativeTrack ? [train.currentTrack, suggestion.alternativeTrack] : train.route
            }
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
      if (choice === 'manual') {
        // Simulate manual intervention - stop both trains
        setSimulationTrains(prev => prev.map(train => 
          train.id === currentSuggestion.trainId || train.id === currentSuggestion.affectedTrainId
            ? { ...train, status: 'stopped' as const }
            : train
        ));
      } else if (choice === 'auto') {
        // Apply alternative solution - continue with conflict
        setSimulationTrains(prev => prev.map(train => ({
          ...train,
          status: train.status === 'moving' ? 'conflict' as const : train.status
        })));
      }
      onRejectSuggestion(currentSuggestion.id);
    }
    setShowOverrideDialog(false);
    setCurrentSuggestion(null);
  };

  const switchScenario = (scenario: 'trackConflict' | 'platformConflict') => {
    setCurrentScenario(scenario);
    setSimulationTrains(scenarios[scenario].trains);
    setSuggestions(scenarios[scenario].suggestions);
    setAppliedSuggestions(new Set());
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Realistic Train Simulation - Station {stationId}
          </CardTitle>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={currentScenario === 'trackConflict' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchScenario('trackConflict')}
            >
              Track Conflict
            </Button>
            <Button
              variant={currentScenario === 'platformConflict' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchScenario('platformConflict')}
            >
              Platform Conflict
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSimulationTrains(scenarios[currentScenario].trains);
                setSuggestions(scenarios[currentScenario].suggestions);
                setAppliedSuggestions(new Set());
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 lg:p-6">
        {/* Track Layout */}
        <div className="relative bg-gradient-to-r from-railway-primary/5 to-railway-accent/5 rounded-lg p-4 lg:p-8 mb-6 overflow-x-auto">
          <div className="space-y-6 lg:space-y-8 min-w-[600px]">
            {tracks.map((trackNumber) => {
              const trainsOnTrack = getTrainOnTrack(trackNumber);
              
              return (
                <div key={trackNumber} className="relative">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="min-w-20 text-center font-mono text-xs lg:text-sm">
                      Track {trackNumber}
                    </Badge>
                    
                    {/* Track Rail */}
                    <div className="flex-1 relative">
                      <div className="h-6 relative">
                        {/* Rail lines */}
                        <div className="absolute top-1 left-0 right-0 h-1.5 bg-railway-primary rounded-full" />
                        <div className="absolute bottom-1 left-0 right-0 h-1.5 bg-railway-primary rounded-full" />
                        
                        {/* Railway sleepers */}
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div 
                            key={i}
                            className="absolute top-0 bottom-0 w-1 bg-railway-accent/60"
                            style={{ left: `${i * 4}%` }}
                          />
                        ))}
                      </div>
                      
                      {/* Trains on this track */}
                      <div className="absolute -top-12 left-0 right-0 h-20">
                        <AnimatePresence>
                          {trainsOnTrack.map((train) => {
                            const suggestion = suggestions.find(s => s.trainId === train.id);
                            
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
                                  duration: isPlaying ? 1.2 : 0,
                                  ease: "linear"
                                }}
                                className={cn(
                                  "absolute top-4 cursor-pointer transition-all transform-gpu",
                                  train.status === 'conflict' && "animate-pulse",
                                  selectedTrain === train.id && "scale-110 z-10"
                                )}
                                onClick={() => setSelectedTrain(train.id)}
                                whileHover={{ scale: 1.05 }}
                              >
                                <TrainSVG 
                                  type={train.type} 
                                  name={train.name}
                                  isMoving={train.status === 'moving' && isPlaying}
                                  status={train.status}
                                />
                                
                                {/* Status indicator */}
                                <div className={cn(
                                  "absolute -top-3 -right-3 w-4 h-4 rounded-full border-2 border-white shadow-lg",
                                  train.status === 'moving' && "bg-success",
                                  train.status === 'waiting' && "bg-warning animate-pulse",
                                  train.status === 'conflict' && "bg-destructive animate-ping",
                                  train.status === 'stopped' && "bg-muted-foreground"
                                )} />

                                {/* AI Suggestion indicator */}
                                {suggestion && !appliedSuggestions.has(suggestion.id) && (
                                  <div className="absolute -top-8 -left-3 w-8 h-8 bg-warning rounded-full flex items-center justify-center animate-bounce shadow-lg">
                                    <AlertTriangle className="h-4 w-4 text-warning-foreground" />
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {/* Platform indicator */}
                    <div className="w-16 lg:w-20 h-10 lg:h-12 bg-secondary/80 rounded border-2 border-secondary flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs font-medium">Platform</div>
                        <div className="text-sm lg:text-lg font-bold">{trackNumber}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Suggestions Panel */}
        {suggestions.some(s => !appliedSuggestions.has(s.id)) && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              AI Recommendations - {currentScenario === 'trackConflict' ? 'Track Conflict Scenario' : 'Platform Conflict Scenario'}
            </h3>
            
            <div className="grid gap-3">
              {suggestions.filter(s => !appliedSuggestions.has(s.id)).map((suggestion) => (
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
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          <TrainIcon className="h-3 w-3 mr-1" />
                          Scenario: {suggestion.scenario.replace('_', ' ')}
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
                    
                    <div className="flex gap-2">
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
              ))}
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
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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
                        {train.status.replace('_', ' ')}
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
        <DialogContent className="sm:max-w-md">
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
                Manual Control - Stop both trains immediately
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleOverrideChoice('auto')}
              >
                <Zap className="h-4 w-4 mr-2" />
                Continue - Allow conflict to demonstrate consequences
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