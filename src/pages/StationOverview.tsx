import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { StationOverview as StationOverviewComponent } from "@/components/overview/StationOverview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity } from "lucide-react";

const StationOverview = () => {
  const { stationId } = useParams();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Station Overview
                </h1>
                <p className="text-sm text-muted-foreground">
                  Detailed station information and analytics
                </p>
              </div>
            </div>
            
            {/* System Status */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <Activity className="h-3 w-3 mr-1" />
                Station Online
              </Badge>
              <div className="text-sm text-muted-foreground">
                Station ID: {stationId}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StationOverviewComponent stationId={stationId || 'stn001'} />
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StationOverview;