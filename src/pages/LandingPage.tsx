import { useState } from "react";
import { motion } from "framer-motion";
import { Train, Shield, Users, Brain, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface LandingPageProps {
  onLogin: (role: string) => void;
}

const LandingPage = ({ onLogin }: LandingPageProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleLogin = () => {
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  const roles = [
    { 
      value: "admin", 
      label: "Chief Controller", 
      description: "Full system access and oversight",
      icon: Shield 
    },
    { 
      value: "section_controller", 
      label: "Section Controller", 
      description: "Manage railway section operations",
      icon: Train 
    },
    { 
      value: "station_master", 
      label: "Station Master", 
      description: "Station operations and platform management",
      icon: Users 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-primary via-railway-secondary to-railway-accent">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-48 h-48 bg-white/3 rounded-full blur-2xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-16 w-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                  <Train className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                    Railway<span className="text-primary-glow"> AI</span>
                  </h1>
                  <p className="text-white/80 text-lg">Traffic Control System</p>
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Maximizing Section Throughput Using{" "}
              <span className="text-primary-glow font-semibold">AI-Powered</span>{" "}
              Precise Train Traffic Control
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/70 mb-12 max-w-3xl mx-auto"
            >
              Intelligent decision-support system that assists controllers in making optimized, 
              real-time decisions for train precedence and crossings.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => setShowLogin(true)}
                className="bg-white text-railway-primary hover:bg-white/90 text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300"
              >
                Access Control System
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
              >
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {[
              {
                icon: Brain,
                title: "AI-Powered Decisions",
                description: "Intelligent recommendations for optimal train routing and conflict resolution"
              },
              {
                icon: Train,
                title: "Real-Time Tracking",
                description: "Live train monitoring with precise location and movement prediction"
              },
              {
                icon: Shield,
                title: "Safety First",
                description: "Advanced safety protocols with automated conflict detection and prevention"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="bg-white shadow-2xl">
              <CardHeader className="text-center pb-6">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Train className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-foreground">System Access</CardTitle>
                <p className="text-muted-foreground">Select your role to continue</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="role">Access Level</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center gap-3">
                            <role.icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{role.label}</div>
                              <div className="text-xs text-muted-foreground">{role.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter your username" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowLogin(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLogin}
                    disabled={!selectedRole}
                    className="flex-1"
                  >
                    Access System
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;