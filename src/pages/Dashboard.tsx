
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { ThreatLevel } from "@/components/dashboard/ThreatLevel";
import { DetectionMap } from "@/components/dashboard/DetectionMap";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { AlertTimeline } from "@/components/dashboard/AlertTimeline";
import { Shield, Cpu, Radio, Database, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dome-dark">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 border-dome-purple/10 bg-dome-darker">
          <Sidebar />
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-6">
            {/* Top row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <StatusCard 
                title="Total Detections" 
                value="24"
                description="Last 24 hours"
                icon={<Cpu />}
                color="default"
              />
              <StatusCard 
                title="RF Signals" 
                value="7"
                description="Active signatures"
                icon={<Radio />}
                color="info"
              />
              <StatusCard 
                title="Alerts" 
                value="2"
                description="Requiring attention"
                icon={<AlertTriangle />}
                color="warning"
              />
              <StatusCard 
                title="Countermeasures" 
                value="1"
                description="Currently active"
                icon={<Shield />}
                color="success"
              />
            </div>
            
            {/* Middle row */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <ThreatLevel level="moderate" />
              </div>
              <div className="lg:col-span-2">
                <DetectionMap />
              </div>
            </div>
            
            {/* Bottom row */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <SystemStatus />
              </div>
              <div className="lg:col-span-2">
                <AlertTimeline />
              </div>
            </div>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>DomeWatch v2.4.0 • All activity is logged and monitored</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
