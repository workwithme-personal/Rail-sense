import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { KPIDashboard } from "@/components/analytics/KPIDashboard";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

const Analytics = () => {
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
                  Analytics & KPI Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Performance metrics and system analytics
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <KPIDashboard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;