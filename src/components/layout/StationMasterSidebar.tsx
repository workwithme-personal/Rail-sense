import { useState } from "react";
import { 
  MapPin, 
  Activity, 
  Train, 
  BarChart3, 
  Users, 
  Settings, 
  BookOpen, 
  AlertTriangle,
  Calendar,
  Radio,
  Zap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Station Overview", url: "/", icon: Activity },
  { title: "Train Schedule", url: "/schedule", icon: Calendar },
  { title: "Platform Management", url: "/platforms", icon: MapPin },
  { title: "Analytics & Reports", url: "/analytics", icon: BarChart3 },
];

const systemItems = [
  { title: "Alerts & Warnings", url: "/alerts", icon: AlertTriangle },
  { title: "Learning Center", url: "/training", icon: BookOpen },
  { title: "Communication", url: "/communication", icon: Radio },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function StationMasterSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (active: boolean) =>
    cn(
      "relative transition-all duration-200",
      active
        ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium shadow-sm"
        : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
    );

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground">
                  Station Master
                </h2>
                <p className="text-xs text-sidebar-foreground/70">
                  Platform Control System
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            Station Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(isActive(item.url))}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            System Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(isActive(item.url))}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Assistant Quick Access */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-sidebar-foreground">
                  Smart Assistance
                </span>
              </div>
              <p className="text-xs text-sidebar-foreground/70 mb-3">
                Get AI-powered recommendations for platform optimization and train scheduling.
              </p>
              <button className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-glow transition-colors">
                <Train className="h-3 w-3" />
                Ask Station AI
              </button>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}