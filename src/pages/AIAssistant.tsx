import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AIAssistant as AIAssistantComponent } from "@/components/ai/AIAssistant";
import { Badge } from "@/components/ui/badge";
import { Brain, Bot, Activity } from "lucide-react";

const AIAssistant = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card px-4 lg:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Brain className="h-6 w-6 text-primary" />
                  AI Assistant
                </h1>
                <p className="text-sm text-muted-foreground">
                  Intelligent railway traffic control recommendations
                </p>
              </div>
            </div>
            
            {/* AI Status */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <Bot className="h-3 w-3 mr-1" />
                AI Online
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                <Activity className="h-3 w-3 mr-1" />
                Monitoring 24 Trains
              </Badge>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <AIAssistantComponent className="h-full" />
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AIAssistant;