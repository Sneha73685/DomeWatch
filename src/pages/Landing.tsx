
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, Radio, ShieldAlert, Lock, Zap, Target, Bell, Activity, Users, ChevronRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-dome-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dome-purple/20 to-transparent" />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center">
            <Shield className="h-20 w-20 text-dome-purple mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              DomeWatch
            </h1>
            <p className="text-xl md:text-2xl text-dome-purple-light max-w-2xl mb-10">
              Securing the sky, one drone at a time
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-dome-purple hover:bg-dome-purple-dark text-white"
                onClick={() => navigate("/login")}
              >
                Access System <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-20 bg-dome-darker">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Comprehensive Defense Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Radio />}
              title="Advanced Detection"
              description="Multi-sensor detection system using radar, RF analysis, and computer vision"
            />
            <FeatureCard
              icon={<Target />}
              title="Precision Tracking"
              description="Real-time drone tracking with advanced trajectory prediction"
            />
            <FeatureCard
              icon={<Zap />}
              title="Rapid Response"
              description="Automated countermeasure deployment with minimal latency"
            />
            <FeatureCard
              icon={<Bell />}
              title="Alert System"
              description="Instant notifications and threat classification"
            />
            <FeatureCard
              icon={<Activity />}
              title="Analytics Dashboard"
              description="Comprehensive threat analysis and system performance metrics"
            />
            <FeatureCard
              icon={<Users />}
              title="Multi-User Access"
              description="Role-based access control for operators and personnel"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-dome-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="99.9%" label="Detection Rate" />
            <StatCard number="<0.5s" label="Response Time" />
            <StatCard number="24/7" label="Active Protection" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dome-darker">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Secure Your Airspace?
          </h2>
          <p className="text-dome-purple-light mb-8 max-w-2xl mx-auto">
            Join the leading organizations already protected by DomeWatch
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg"
              className="bg-dome-purple hover:bg-dome-purple-dark text-white"
              onClick={() => navigate("/login")}
            >
              <Lock className="mr-2" />
              Access System
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dome-dark border-t border-dome-purple/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="h-6 w-6 text-dome-purple" />
              <span className="text-white font-bold">DomeWatch</span>
            </div>
            <p className="text-dome-purple-light text-sm">
              © 2025 DomeWatch Security Systems
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-dome-dark border-dome-purple/10 hover:border-dome-purple/30 transition-all">
      <CardContent className="p-6">
        <div className="h-12 w-12 rounded-lg bg-dome-purple/10 flex items-center justify-center mb-4">
          <div className="text-dome-purple">{icon}</div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-dome-purple-light">{description}</p>
      </CardContent>
    </Card>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <Card className="bg-dome-darker border-dome-purple/10">
      <CardContent className="p-6 text-center">
        <div className="text-4xl font-bold text-dome-purple mb-2">{number}</div>
        <div className="text-dome-purple-light">{label}</div>
      </CardContent>
    </Card>
  );
}
