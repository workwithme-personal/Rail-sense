import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TrainTracking as TrainTrackingComponent } from "@/components/tracking/TrainTracking";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

const TrainTracking = () => {
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
                  Train Tracking
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time train location and movement tracking
                </p>
              </div>
            </div>
            
            {/* System Status */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <Activity className="h-3 w-3 mr-1" />
                GPS Online
              </Badge>
              <div className="text-sm text-muted-foreground">
                Tracking 24 trains
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <TrainTrackingComponent />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TrainTracking;