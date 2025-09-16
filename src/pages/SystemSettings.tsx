import { useState } from "react";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Bell, 
  Brain, 
  Shield, 
  Database, 
  Wifi, 
  Monitor,
  Save,
  RotateCcw,
  User,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemSettings {
  notifications: {
    criticalAlerts: boolean;
    trainDelays: boolean;
    systemUpdates: boolean;
    maintenanceReminders: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  ai: {
    autoAcceptLowRisk: boolean;
    suggestionTimeout: number;
    confidenceThreshold: number;
    learningMode: boolean;
  };
  security: {
    sessionTimeout: number;
    twoFactorAuth: boolean;
    autoLogout: boolean;
    auditLogging: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    refreshRate: number;
    animationsEnabled: boolean;
    compactMode: boolean;
  };
  system: {
    dataRetentionDays: number;
    backupFrequency: string;
    maintenanceWindow: string;
  };
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  role: string;
  joinDate: string;
}

const defaultSettings: SystemSettings = {
  notifications: {
    criticalAlerts: true,
    trainDelays: true,
    systemUpdates: false,
    maintenanceReminders: true,
    emailNotifications: true,
    smsNotifications: false,
  },
  ai: {
    autoAcceptLowRisk: false,
    suggestionTimeout: 30,
    confidenceThreshold: 85,
    learningMode: true,
  },
  security: {
    sessionTimeout: 480,
    twoFactorAuth: false,
    autoLogout: true,
    auditLogging: true,
  },
  display: {
    theme: 'system',
    refreshRate: 5,
    animationsEnabled: true,
    compactMode: false,
  },
  system: {
    dataRetentionDays: 90,
    backupFrequency: 'daily',
    maintenanceWindow: '02:00-04:00',
  }
};

const mockUserProfile: UserProfile = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@railway.gov.in',
  phone: '+91 98765 43210',
  employeeId: 'RC001',
  department: 'Traffic Control',
  role: 'Section Controller',
  joinDate: '2016-03-15'
};

const SystemSettings = () => {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateSetting = (section: keyof SystemSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = () => {
    // Simulate API call
    console.log('Saving settings:', settings);
    setHasUnsavedChanges(false);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
  };

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
                  <Settings className="h-6 w-6 text-primary" />
                  System Settings
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configure system preferences and user settings
                </p>
              </div>
            </div>
            
            {/* Save Actions */}
            <div className="flex items-center gap-4">
              {hasUnsavedChanges && (
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                  Unsaved Changes
                </Badge>
              )}
              <Button variant="outline" onClick={resetSettings}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="ai">AI Settings</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="display">Display</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        User Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={userProfile.name}
                            onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employeeId">Employee ID</Label>
                          <Input 
                            id="employeeId" 
                            value={userProfile.employeeId}
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            value={userProfile.email}
                            onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            value={userProfile.phone}
                            onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input 
                            id="department" 
                            value={userProfile.department}
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input 
                            id="role" 
                            value={userProfile.role}
                            disabled
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Change Password</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div className="relative">
                              <Input 
                                id="currentPassword" 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter current password"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input 
                              id="newPassword" 
                              type="password"
                              placeholder="Enter new password"
                            />
                          </div>
                        </div>
                        <Button variant="outline">
                          <Lock className="h-4 w-4 mr-2" />
                          Update Password
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Alert Types</h3>
                        <div className="space-y-4">
                          {Object.entries(settings.notifications).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <div>
                                <label className="text-sm font-medium capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <p className="text-xs text-muted-foreground">
                                  {key === 'criticalAlerts' && 'Receive notifications for critical system alerts'}
                                  {key === 'trainDelays' && 'Get notified about train delays and schedule changes'}
                                  {key === 'systemUpdates' && 'Notifications about system updates and maintenance'}
                                  {key === 'maintenanceReminders' && 'Reminders for scheduled maintenance tasks'}
                                </p>
                              </div>
                              <Switch
                                checked={value}
                                onCheckedChange={(checked) => updateSetting('notifications', key, checked)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Delivery Methods</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <div>
                                <label className="text-sm font-medium">Email Notifications</label>
                                <p className="text-xs text-muted-foreground">Send alerts to your email address</p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.notifications.emailNotifications}
                              onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <div>
                                <label className="text-sm font-medium">SMS Notifications</label>
                                <p className="text-xs text-muted-foreground">Send critical alerts via SMS</p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.notifications.smsNotifications}
                              onCheckedChange={(checked) => updateSetting('notifications', 'smsNotifications', checked)}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* AI Settings */}
                <TabsContent value="ai" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        AI Assistant Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium">Auto-accept Low Risk Suggestions</label>
                            <p className="text-xs text-muted-foreground">
                              Automatically accept AI suggestions with low risk and high confidence
                            </p>
                          </div>
                          <Switch
                            checked={settings.ai.autoAcceptLowRisk}
                            onCheckedChange={(checked) => updateSetting('ai', 'autoAcceptLowRisk', checked)}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Suggestion Timeout (seconds)</label>
                          <Input
                            type="number"
                            value={settings.ai.suggestionTimeout}
                            onChange={(e) => updateSetting('ai', 'suggestionTimeout', Number(e.target.value))}
                            className="w-32"
                          />
                          <p className="text-xs text-muted-foreground">
                            Time before AI suggestions expire automatically
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Confidence Threshold (%)</label>
                          <Input
                            type="number"
                            min="50"
                            max="100"
                            value={settings.ai.confidenceThreshold}
                            onChange={(e) => updateSetting('ai', 'confidenceThreshold', Number(e.target.value))}
                            className="w-32"
                          />
                          <p className="text-xs text-muted-foreground">
                            Minimum confidence level required for AI suggestions
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium">Learning Mode</label>
                            <p className="text-xs text-muted-foreground">
                              Allow AI to learn from controller decisions
                            </p>
                          </div>
                          <Switch
                            checked={settings.ai.learningMode}
                            onCheckedChange={(checked) => updateSetting('ai', 'learningMode', checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security & Privacy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Session Timeout (minutes)</label>
                          <Select 
                            value={settings.security.sessionTimeout.toString()}
                            onValueChange={(value) => updateSetting('security', 'sessionTimeout', Number(value))}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="240">4 hours</SelectItem>
                              <SelectItem value="480">8 hours</SelectItem>
                              <SelectItem value="720">12 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium">Two-Factor Authentication</label>
                            <p className="text-xs text-muted-foreground">
                              Add extra security with 2FA verification
                            </p>
                          </div>
                          <Switch
                            checked={settings.security.twoFactorAuth}
                            onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium">Auto Logout on Inactivity</label>
                            <p className="text-xs text-muted-foreground">
                              Automatically log out after session timeout
                            </p>
                          </div>
                          <Switch
                            checked={settings.security.autoLogout}
                            onCheckedChange={(checked) => updateSetting('security', 'autoLogout', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium">Audit Logging</label>
                            <p className="text-xs text-muted-foreground">
                              Log all user actions for security audit
                            </p>
                          </div>
                          <Switch
                            checked={settings.security.auditLogging}
                            onCheckedChange={(checked) => updateSetting('security', 'auditLogging', checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Display */}
                <TabsContent value="display" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Monitor className="h-5 w-5" />
                        Display & Interface
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Theme</label>
                          <Select 
                            value={settings.display.theme}
                            onValueChange={(value) => updateSetting('display', 'theme', value)}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Data Refresh Rate (seconds)</label>
                          <Select 
                            value={settings.display.refreshRate.toString()}
                            onValueChange={(value) => updateSetting('display', 'refreshRate', Number(value))}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 second</SelectItem>
                              <SelectItem value="5">5 seconds</SelectItem>
                              <SelectItem value="10">10 seconds</SelectItem>
                              <SelectItem value="30">30 seconds</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium">Animations</label>
                            <p className="text-xs text-muted-foreground">
                              Enable smooth animations and transitions
                            </p>
                          </div>
                          <Switch
                            checked={settings.display.animationsEnabled}
                            onCheckedChange={(checked) => updateSetting('display', 'animationsEnabled', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium">Compact Mode</label>
                            <p className="text-xs text-muted-foreground">
                              Use compact layout for better space utilization
                            </p>
                          </div>
                          <Switch
                            checked={settings.display.compactMode}
                            onCheckedChange={(checked) => updateSetting('display', 'compactMode', checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* System */}
                <TabsContent value="system" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        System Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Data Retention (days)</label>
                          <Input
                            type="number"
                            min="30"
                            max="365"
                            value={settings.system.dataRetentionDays}
                            onChange={(e) => updateSetting('system', 'dataRetentionDays', Number(e.target.value))}
                            className="w-32"
                          />
                          <p className="text-xs text-muted-foreground">
                            Number of days to keep historical data
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Backup Frequency</label>
                          <Select 
                            value={settings.system.backupFrequency}
                            onValueChange={(value) => updateSetting('system', 'backupFrequency', value)}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Maintenance Window</label>
                          <Input
                            value={settings.system.maintenanceWindow}
                            onChange={(e) => updateSetting('system', 'maintenanceWindow', e.target.value)}
                            placeholder="HH:MM-HH:MM"
                            className="w-48"
                          />
                          <p className="text-xs text-muted-foreground">
                            Daily maintenance window (24-hour format)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SystemSettings;