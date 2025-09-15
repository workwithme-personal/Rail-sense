import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TrainingModule } from "@/components/training/TrainingModule";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

const Training = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Training & Learning Center
                </h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive training modules for traffic control operators
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                <BookOpen className="h-3 w-3 mr-1" />
                Learning Mode
              </Badge>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <TrainingModule />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Training;