import { useState } from "react";
import { 
  Train, 
  Activity, 
  Brain, 
  BarChart3, 
  Users, 
  Settings, 
  BookOpen, 
  AlertTriangle,
  Radio,
  Map,
  Bot
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Control Dashboard", url: "/", icon: Activity },
  { title: "Train Tracking", url: "/train-tracking", icon: Train },
  { title: "Station Overview", url: "/station/stn001", icon: Map },
  { title: "AI Assistant", url: "/ai-assistant", icon: Bot },
  { title: "Analytics & KPI", url: "/analytics", icon: BarChart3 },
];

const systemItems = [
  { title: "Alerts & Warnings", url: "/alerts", icon: AlertTriangle },
  { title: "Learn & Train", url: "/training", icon: BookOpen },
  { title: "Team Management", url: "/team", icon: Users },
  { title: "System Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
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
              <Train className="h-5 w-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground">
                  Railway Control
                </h2>
                <p className="text-xs text-sidebar-foreground/70">
                  Traffic Management System
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            Control Center
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
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-sidebar-foreground">
                  AI Assistant
                </span>
              </div>
              <p className="text-xs text-sidebar-foreground/70 mb-3">
                Get intelligent recommendations for train routing and conflict resolution.
              </p>
              <NavLink 
                to="/ai-assistant" 
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-glow transition-colors"
              >
                <Bot className="h-3 w-3" />
                Ask AI
              </NavLink>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}