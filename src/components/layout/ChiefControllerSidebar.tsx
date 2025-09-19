import { useState } from "react";
import { 
  Shield, 
  Activity, 
  BarChart3, 
  Users, 
  Settings, 
  BookOpen, 
  AlertTriangle,
  MapPin,
  Radio,
  Zap,
  Globe,
  TrendingUp,
  User
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
  { title: "Division Overview", url: "/", icon: Activity },
  { title: "Section Controllers", url: "/sections", icon: Users },
  { title: "Traffic Flow", url: "/traffic", icon: TrendingUp },
  { title: "Inter-Division Coord", url: "/coordination", icon: Globe },
  { title: "Priority Management", url: "/priorities", icon: Zap },
  { title: "Analytics & Reports", url: "/analytics", icon: BarChart3 },
];

const systemItems = [
  { title: "AI Assistant", url: "/ai-assistant", icon: Radio },
  { title: "Alerts & Warnings", url: "/alerts", icon: AlertTriangle },
  { title: "Training Center", url: "/training", icon: BookOpen },
  { title: "Profile", url: "/profile", icon: User },
  { title: "System Settings", url: "/settings", icon: Settings },
];

export function ChiefControllerSidebar() {
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
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground">
                  Chief Controller
                </h2>
                <p className="text-xs text-sidebar-foreground/70">
                  Divisional Control Office
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            Division Control
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

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-sidebar-foreground">
                  Division Stats
                </span>
              </div>
              <div className="space-y-1 text-xs text-sidebar-foreground/70">
                <div className="flex justify-between">
                  <span>Active Trains:</span>
                  <span className="font-medium">847</span>
                </div>
                <div className="flex justify-between">
                  <span>On-Time Performance:</span>
                  <span className="font-medium text-success">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Controllers Online:</span>
                  <span className="font-medium">24/24</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}