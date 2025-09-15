import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Award,
  FileText,
  Video,
  Headphones
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'interactive' | 'audio';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  progress?: number;
  topics: string[];
}

const trainingModules: TrainingModule[] = [
  {
    id: 'basics-001',
    title: 'Railway Traffic Control Fundamentals',
    description: 'Introduction to basic concepts of railway traffic management, signaling systems, and safety protocols.',
    type: 'video',
    duration: '45 min',
    difficulty: 'beginner',
    completed: true,
    progress: 100,
    topics: ['Signal Systems', 'Basic Safety', 'Traffic Rules', 'Communication Protocols']
  },
  {
    id: 'intermediate-001',
    title: 'Conflict Resolution Strategies',
    description: 'Advanced techniques for resolving train conflicts, priority management, and optimization strategies.',
    type: 'interactive',
    duration: '1.2 hrs',
    difficulty: 'intermediate',
    completed: false,
    progress: 65,
    topics: ['Priority Systems', 'Conflict Detection', 'Route Optimization', 'Decision Making']
  },
  {
    id: 'ai-001',
    title: 'AI-Assisted Traffic Control',
    description: 'Learn how to effectively use AI recommendations and override systems for optimal traffic management.',
    type: 'document',
    duration: '30 min',
    difficulty: 'intermediate',
    completed: false,
    progress: 20,
    topics: ['AI Systems', 'Override Protocols', 'Trust Calibration', 'Human-AI Collaboration']
  },
  {
    id: 'emergency-001',
    title: 'Emergency Response Procedures',
    description: 'Comprehensive guide to handling emergency situations, system failures, and crisis management.',
    type: 'video',
    duration: '55 min',
    difficulty: 'advanced',
    completed: false,
    progress: 0,
    topics: ['Emergency Protocols', 'Crisis Management', 'Communication', 'Recovery Procedures']
  },
  {
    id: 'case-studies-001',
    title: 'Real-World Case Studies',
    description: 'Analysis of actual traffic control scenarios, successful interventions, and lessons learned.',
    type: 'audio',
    duration: '2 hrs',
    difficulty: 'advanced',
    completed: false,
    progress: 0,
    topics: ['Case Analysis', 'Best Practices', 'Lessons Learned', 'Decision Analysis']
  }
];

const typeIcons = {
  video: Video,
  document: FileText,
  interactive: PlayCircle,
  audio: Headphones
};

const difficultyColors = {
  beginner: 'bg-success/10 text-success border-success/30',
  intermediate: 'bg-warning/10 text-warning border-warning/30',
  advanced: 'bg-destructive/10 text-destructive border-destructive/30'
};

export function TrainingModule() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  
  const completedModules = trainingModules.filter(m => m.completed).length;
  const totalProgress = trainingModules.reduce((sum, m) => sum + (m.progress || 0), 0) / trainingModules.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Training & Learning Center
        </h2>
        <p className="text-muted-foreground">
          Comprehensive training modules for railway traffic control operators
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Modules</p>
                <p className="text-2xl font-bold text-foreground">
                  {completedModules}/{trainingModules.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold text-foreground">{Math.round(totalProgress)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Certification Level</p>
                <p className="text-lg font-bold text-foreground">Intermediate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Training Modules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingModules.map((module) => {
              const TypeIcon = typeIcons[module.type];
              
              return (
                <div
                  key={module.id}
                  className={cn(
                    "border rounded-lg p-4 transition-all duration-200 cursor-pointer",
                    selectedModule === module.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground/30"
                  )}
                  onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                        <TypeIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{module.title}</h3>
                          {module.completed && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {module.description}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {module.duration}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs", difficultyColors[module.difficulty])}
                          >
                            {module.difficulty.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {module.progress !== undefined && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{module.progress}%</span>
                        </div>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant={module.completed ? "outline" : "default"}
                      >
                        {module.completed ? 'Review' : module.progress ? 'Continue' : 'Start'}
                      </Button>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {selectedModule === module.id && (
                    <div className="border-t pt-4 mt-4 animate-fade-in">
                      <h4 className="font-medium text-foreground mb-2">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {module.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex items-center gap-1">
                          <PlayCircle className="h-4 w-4" />
                          Start Learning
                        </Button>
                        <Button size="sm" variant="outline">
                          Download Materials
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Quick Reference Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="signals">
              <AccordionTrigger>Signal Systems & Meanings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-success rounded-full" />
                      <span className="text-sm">Green - Proceed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-warning rounded-full" />
                      <span className="text-sm">Yellow - Caution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-destructive rounded-full" />
                      <span className="text-sm">Red - Stop</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded-full animate-signal-blink" />
                      <span className="text-sm">Blue - Maintenance</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="priorities">
              <AccordionTrigger>Train Priority Guidelines</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Express Passenger Trains</span>
                    <Badge variant="destructive">Priority 10</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Regular Passenger Trains</span>
                    <Badge variant="outline">Priority 8</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Suburban Local Trains</span>
                    <Badge variant="outline">Priority 6</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Freight Trains</span>
                    <Badge variant="secondary">Priority 3</Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="emergency">
              <AccordionTrigger>Emergency Procedures</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Immediately stop all conflicting train movements</li>
                  <li>Notify emergency services and railway operations center</li>
                  <li>Implement emergency communication protocols</li>
                  <li>Coordinate with AI system for alternative routing</li>
                  <li>Document all actions taken for post-incident analysis</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}