import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Send, 
  Brain, 
  Lightbulb, 
  AlertCircle,
  TrendingUp,
  Clock,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: string;
  confidence?: number;
  actionType?: 'suggestion' | 'warning' | 'info' | 'optimization';
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  type: 'efficiency' | 'delay' | 'conflict' | 'optimization';
  value: string;
}

interface AIAssistantProps {
  className?: string;
  onSuggestionApply?: (suggestion: any) => void;
}

const mockInsights: AIInsight[] = [
  {
    id: '1',
    title: 'Delay Optimization',
    description: 'Rerouting freight trains can reduce overall delays by 12 minutes',
    impact: 'high',
    type: 'optimization',
    value: '12m saved'
  },
  {
    id: '2',
    title: 'Throughput Increase',
    description: 'Platform 3 utilization can be improved by 25%',
    impact: 'medium',
    type: 'efficiency',
    value: '+25% utilization'
  },
  {
    id: '3',
    title: 'Conflict Prediction',
    description: 'Potential conflict detected between MGS EXP and DFC goods at 14:30',
    impact: 'high',
    type: 'conflict',
    value: 'In 15 minutes'
  }
];

const mockMessages: AIMessage[] = [
  {
    id: '1',
    type: 'system',
    content: 'AI Traffic Control Assistant is online. Monitoring 10 stations and 24 active trains.',
    timestamp: '09:30',
  },
  {
    id: '2',
    type: 'ai',
    content: 'Detected potential conflict: Train MGS EXP (Track 3) and DFC 321 (Track 4) approaching Track 5 simultaneously. Recommend holding DFC 321 for 3 minutes.',
    timestamp: '09:32',
    confidence: 95,
    actionType: 'suggestion'
  },
  {
    id: '3',
    type: 'ai',
    content: 'Platform utilization analysis complete. Current efficiency: 78%. Recommended actions to improve throughput by 15%.',
    timestamp: '09:35',
    confidence: 88,
    actionType: 'optimization'
  }
];

export function AIAssistant({ className, onSuggestionApply }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIMessage[]>(mockMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [insights] = useState<AIInsight[]>(mockInsights);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: Math.floor(Math.random() * 20) + 80,
        actionType: 'info'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "Analyzing current traffic patterns. Based on the data, I recommend prioritizing express trains during peak hours.",
      "Current system efficiency is at 82%. I've identified 3 optimization opportunities for your consideration.",
      "Station congestion detected at Platform 2. Suggest rerouting next 2 local trains to Platform 4.",
      "Predictive analysis shows potential 15-minute delay for Rajdhani Express. Recommend clearing Track 1 immediately."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getMessageIcon = (message: AIMessage) => {
    switch (message.actionType) {
      case 'suggestion': return <Lightbulb className="h-4 w-4 text-warning" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'optimization': return <TrendingUp className="h-4 w-4 text-success" />;
      default: return <Brain className="h-4 w-4 text-primary" />;
    }
  };

  const getInsightColor = (impact: string, type: string) => {
    if (impact === 'high') return 'border-destructive bg-destructive/5';
    if (impact === 'medium') return 'border-warning bg-warning/5';
    return 'border-primary bg-primary/5';
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* AI Insights Panel */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-primary" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "p-3 rounded-lg border-l-4",
                getInsightColor(insight.impact, insight.type)
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <Badge 
                      variant={insight.impact === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {insight.impact.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {insight.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {insight.value}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5 text-primary" />
            AI Assistant Chat
          </CardTitle>
        </CardHeader>
        
        {/* Messages */}
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 space-y-3 mb-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-3",
                  message.type === 'user' && "flex-row-reverse"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  message.type === 'user' ? "bg-primary" : "bg-secondary"
                )}>
                  {message.type === 'user' ? (
                    <span className="text-xs font-bold text-primary-foreground">U</span>
                  ) : (
                    <Bot className="h-4 w-4 text-secondary-foreground" />
                  )}
                </div>
                
                <div className={cn(
                  "flex-1 space-y-1",
                  message.type === 'user' && "text-right"
                )}>
                  <div className={cn(
                    "inline-block p-3 rounded-lg max-w-xs",
                    message.type === 'user' 
                      ? "bg-primary text-primary-foreground ml-auto" 
                      : "bg-muted"
                  )}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.type !== 'user' && getMessageIcon(message)}
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                      {message.confidence && (
                        <Badge variant="outline" className="text-xs">
                          {message.confidence}% confident
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Separator className="mb-4" />

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask AI about train routing, conflicts, or optimizations..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => setInputMessage("What's the current system efficiency?")}
            >
              <Zap className="h-3 w-3 mr-1" />
              System Status
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => setInputMessage("Predict conflicts for next 30 minutes")}
            >
              <Clock className="h-3 w-3 mr-1" />
              Predict Conflicts
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => setInputMessage("Optimize platform utilization")}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Optimize Routes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}