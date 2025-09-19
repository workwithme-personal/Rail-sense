import { useState } from "react";
import { Train, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LoginPageProps {
  onLogin: (role: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    {
      value: "chief_controller",
      title: "Chief Controller",
      description: "Divisional Control Office - Manages entire division traffic",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      value: "section_controller", 
      title: "Section Controller",
      description: "Controls train movements in section with 10-30 stations",
      icon: Train,
      color: "text-green-600"
    },
    {
      value: "station_master",
      title: "Station Master", 
      description: "Manages individual station operations and platforms",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const handleLogin = () => {
    if (selectedRole && username && password) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <Train className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">RailSync AI</h1>
              <p className="text-sm text-muted-foreground">Railway Traffic Control System</p>
            </div>
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-card/95 border-border shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Login to Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Select Your Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your position" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center gap-2">
                        <role.icon className={`h-4 w-4 ${role.color}`} />
                        <span>{role.title}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Role Description */}
            {selectedRole && (
              <div className="p-3 bg-muted/50 rounded-lg border">
                <div className="flex items-center gap-2 mb-1">
                  {(() => {
                    const role = roles.find(r => r.value === selectedRole);
                    const Icon = role?.icon || Train;
                    return <Icon className={`h-4 w-4 ${role?.color}`} />;
                  })()}
                  <span className="font-medium text-sm">
                    {roles.find(r => r.value === selectedRole)?.title}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {roles.find(r => r.value === selectedRole)?.description}
                </p>
              </div>
            )}

            {/* Login Fields */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full" 
              disabled={!selectedRole || !username || !password}
            >
              Access Dashboard
            </Button>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials:</p>
              <div className="text-xs space-y-1">
                <div>Chief Controller: admin/admin123</div>
                <div>Section Controller: controller/ctrl123</div>
                <div>Station Master: station/stn123</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;