import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Train, Shield, Users, Brain, ArrowRight, ChevronRight, Zap, Globe, BarChart3, Cpu, Clock, MapPin, CheckCircle, Star, Play, Award, TrendingUp, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-railway.jpg";
import controlDashboard from "@/assets/control-dashboard.jpg";
import stationPlatform from "@/assets/station-platform.jpg";
import teamWork from "@/assets/team-work.jpg";

interface LandingPageProps {
  onLogin: (role: string) => void;
}

// Lottie animation data (you can replace with actual Lottie JSON from network)
const trainAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 400,
  h: 400,
  nm: "Train Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Train",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [50, 200], e: [350, 200] },
            { t: 90, s: [350, 200] }
          ]
        },
        a: { a: 0, k: [0, 0] },
        s: { a: 0, k: [100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: "rc",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [60, 20] },
          r: { a: 0, k: 5 }
        }
      ],
      ip: 0,
      op: 90,
      st: 0
    }
  ]
};

const LandingPage = ({ onLogin }: LandingPageProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [activeSection, setActiveSection] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
              <Train className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Railway AI</span>
          </div>
          <Button onClick={() => setShowLogin(true)} className="bg-primary text-primary-foreground">
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section - Section 1 */}
      <section className="section min-h-screen relative overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/70" />
        </div>
        
        {/* Animated Background Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 bg-white/5 rounded-full blur-xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <Badge className="mb-6 px-6 py-2 text-lg bg-white/10 text-white border-white/20">
              🚀 Next Generation Railway Control
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              Railway<span className="text-primary-glow"> AI</span>
            </h1>
            <p className="text-white/80 text-xl mb-4">Traffic Control System</p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-3xl md:text-5xl text-white/90 mb-8 max-w-6xl mx-auto leading-tight"
          >
            Maximizing Section Throughput Using{" "}
            <span className="text-primary-glow font-bold bg-gradient-to-r from-primary-glow to-white bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Precise Train Traffic Control
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-2xl text-white/70 mb-12 max-w-4xl mx-auto"
          >
            Intelligent decision-support system that assists controllers in making optimized, 
            real-time decisions for train precedence and crossings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Button
              size="lg"
              onClick={() => setShowLogin(true)}
              className="bg-white text-primary hover:bg-white/90 text-xl px-10 py-8 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105"
            >
              Access Control System
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-xl px-10 py-8 rounded-2xl backdrop-blur-sm"
            >
              <Play className="mr-3 h-6 w-6" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: "99.9%", label: "System Uptime", icon: Zap },
              { number: "50+", label: "Stations Managed", icon: MapPin },
              { number: "24/7", label: "Real-time Monitoring", icon: Clock }
            ].map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-white mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/70">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRight className="h-8 w-8 text-white/60 rotate-90" />
        </motion.div>
      </section>

      {/* Features Section - Section 2 */}
      <section className="section min-h-screen py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 px-6 py-2 text-lg">🎯 Core Features</Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
              Powerful AI-Driven <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced system combines artificial intelligence with real-time monitoring 
              to provide unprecedented control over railway operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Brain,
                title: "AI-Powered Decision Making",
                description: "Advanced machine learning algorithms analyze traffic patterns and provide optimal routing suggestions in real-time.",
                color: "bg-blue-500"
              },
              {
                icon: Train,
                title: "Real-Time Train Tracking",
                description: "Monitor every train's position, speed, and destination with precision GPS tracking and predictive analytics.",
                color: "bg-green-500"
              },
              {
                icon: Shield,
                title: "Advanced Safety Protocols",
                description: "Automated conflict detection and prevention systems ensure maximum safety with zero tolerance for risks.",
                color: "bg-red-500"
              },
              {
                icon: BarChart3,
                title: "Performance Analytics",
                description: "Comprehensive dashboards and reports to optimize operations and identify improvement opportunities.",
                color: "bg-purple-500"
              },
              {
                icon: Cpu,
                title: "Smart Automation",
                description: "Intelligent automation reduces manual intervention while maintaining full operator control when needed.",
                color: "bg-orange-500"
              },
              {
                icon: Network,
                title: "Integrated Systems",
                description: "Seamless integration with existing railway infrastructure and third-party management systems.",
                color: "bg-teal-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-card hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className={`h-16 w-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology Section - Section 3 */}
      <section className="section min-h-screen py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-6 py-2 text-lg">🤖 AI Technology</Badge>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
                Next-Gen <span className="text-primary">Intelligence</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our proprietary AI engine processes millions of data points every second to 
                make split-second decisions that optimize train movements and prevent conflicts.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { 
                    title: "Predictive Analytics", 
                    description: "Forecast traffic patterns up to 24 hours in advance",
                    icon: TrendingUp
                  },
                  { 
                    title: "Conflict Resolution", 
                    description: "Automatically detect and resolve scheduling conflicts",
                    icon: Shield
                  },
                  { 
                    title: "Resource Optimization", 
                    description: "Maximize track utilization and minimize delays",
                    icon: BarChart3
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-xl">
                Learn More About Our AI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <img 
                  src={controlDashboard} 
                  alt="AI Control Dashboard"
                  className="rounded-3xl shadow-2xl w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl" />
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold">AI Active</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics & Achievements Section - Section 4 */}
      <section className="section min-h-screen py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 px-6 py-2 text-lg">📊 Our Impact</Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
              Proven <span className="text-primary">Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our Railway AI system has transformed operations across multiple railway networks worldwide.
            </p>
          </motion.div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { number: "500+", label: "Trains Managed Daily", icon: Train, color: "text-blue-500" },
              { number: "98%", label: "On-Time Performance", icon: Clock, color: "text-green-500" },
              { number: "50%", label: "Delay Reduction", icon: TrendingUp, color: "text-orange-500" },
              { number: "Zero", label: "Safety Incidents", icon: Shield, color: "text-red-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center bg-card hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-4`} />
                    <div className="text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Platform Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-16"
          >
            <img 
              src={stationPlatform} 
              alt="Railway Station Platform"
              className="w-full h-96 object-cover rounded-3xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-3xl" />
            <div className="absolute inset-0 flex items-center justify-start p-12">
              <div className="text-white max-w-xl">
                <h3 className="text-4xl font-bold mb-4">Smart Platform Management</h3>
                <p className="text-xl text-white/90 mb-6">
                  Real-time platform allocation and passenger flow optimization for maximum efficiency.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: CheckCircle, text: "Real-time Updates" },
                    { icon: Users, text: "Crowd Management" },
                    { icon: Clock, text: "Schedule Sync" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Awards & Recognitions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Best Railway Innovation", year: "2024", org: "Transport Excellence Awards" },
              { title: "AI Safety Champion", year: "2023", org: "Railway Safety Institute" },
              { title: "Digital Transformation Leader", year: "2023", org: "Tech Innovation Summit" }
            ].map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-foreground mb-2">{award.title}</h4>
                    <p className="text-muted-foreground mb-1">{award.org}</p>
                    <p className="text-sm text-primary font-semibold">{award.year}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Company Section - Section 5 */}
      <section className="section min-h-screen py-20 bg-gradient-to-br from-secondary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={teamWork} 
                alt="Railway Control Team"
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-6 py-2 text-lg">👥 Our Team</Badge>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
                Expert <span className="text-primary">Controllers</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our team combines decades of railway experience with cutting-edge AI expertise 
                to deliver the most advanced traffic control system in the industry.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "25+ years average railway experience",
                  "PhD-level AI and machine learning expertise", 
                  "24/7 dedicated support team",
                  "Continuous system monitoring and optimization"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-lg text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" variant="outline" className="px-8 py-6 rounded-xl">
                Meet Our Team
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Company Values */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-foreground mb-12">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  description: "Uncompromising commitment to railway safety and zero-incident operations."
                },
                {
                  icon: Zap,
                  title: "Innovation",
                  description: "Pushing the boundaries of what's possible with AI and railway technology."
                },
                {
                  icon: Users,
                  title: "Collaboration",
                  description: "Working together with railway operators to create the best solutions."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-card hover:shadow-xl transition-all duration-300 border-0">
                    <CardContent className="p-8 text-center">
                      <value.icon className="h-12 w-12 text-primary mx-auto mb-6" />
                      <h4 className="text-2xl font-bold text-foreground mb-4">{value.title}</h4>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer & CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Ready to Transform Your Railway Operations?
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto">
              Join the future of railway traffic control with our AI-powered system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                size="lg"
                onClick={() => setShowLogin(true)}
                className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started Today
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-xl px-12 py-8 rounded-2xl backdrop-blur-sm"
              >
                Schedule Demo
                <ChevronRight className="ml-3 h-6 w-6" />
              </Button>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white/80 text-sm">
              <div>
                <h5 className="font-semibold mb-3">Product</h5>
                <div className="space-y-2">
                  <div>Features</div>
                  <div>Pricing</div>
                  <div>Documentation</div>
                </div>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Company</h5>
                <div className="space-y-2">
                  <div>About</div>
                  <div>Team</div>
                  <div>Careers</div>
                </div>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Resources</h5>
                <div className="space-y-2">
                  <div>Blog</div>
                  <div>Help Center</div>
                  <div>Contact</div>
                </div>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Legal</h5>
                <div className="space-y-2">
                  <div>Privacy</div>
                  <div>Terms</div>
                  <div>Security</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="bg-card shadow-2xl border-0">
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
                    className="flex-1 bg-primary text-primary-foreground"
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