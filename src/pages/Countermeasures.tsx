
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Shield, Radio, Zap, Upload, Lock } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function Countermeasures() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jammingActive, setJammingActive] = useState(false);
  const [gpsActive, setGpsActive] = useState(false);
  const [rfActive, setRfActive] = useState(false);
  
  const toggleJamming = () => {
    setJammingActive(!jammingActive);
    toast(jammingActive ? "RF Jamming deactivated" : "RF Jamming activated", {
      description: jammingActive ? "Countermeasure disabled" : "Countermeasure enabled for all zones",
    });
  };
  
  const toggleGps = () => {
    setGpsActive(!gpsActive);
    toast(gpsActive ? "GPS Spoofing deactivated" : "GPS Spoofing activated", {
      description: gpsActive ? "Countermeasure disabled" : "Countermeasure enabled for all zones",
    });
  };
  
  const toggleRf = () => {
    setRfActive(!rfActive);
    toast(rfActive ? "RF Takeover deactivated" : "RF Takeover activated", {
      description: rfActive ? "Countermeasure disabled" : "Countermeasure enabled for all zones",
    });
  };
  
  return (
    <div className="flex min-h-screen bg-dome-dark">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block">
        <Sidebar activePage="countermeasures" />
      </div>
      
      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 border-dome-purple/10 bg-dome-darker">
          <Sidebar activePage="countermeasures" />
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Countermeasures</h1>
              <Badge variant="outline" className="bg-dome-red/10 text-dome-red border-dome-red/30">
                Restricted Access
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <Radio className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">RF Jamming</CardTitle>
                  </div>
                  <CardDescription>Disrupt drone control signals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-sm font-medium text-white mt-1">
                        {jammingActive ? "Active" : "Standby"}
                      </p>
                    </div>
                    <Switch 
                      checked={jammingActive} 
                      onCheckedChange={toggleJamming}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground mt-4">
                    <p>Coverage: 1.5km radius</p>
                    <p>Frequencies: 2.4GHz, 5.8GHz</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-dome-darker text-dome-purple-light border border-dome-purple/30 hover:bg-dome-purple/10"
                  >
                    Configure Parameters
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <Upload className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">GPS Spoofing</CardTitle>
                  </div>
                  <CardDescription>Redirect drone flight path</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-sm font-medium text-white mt-1">
                        {gpsActive ? "Active" : "Standby"}
                      </p>
                    </div>
                    <Switch 
                      checked={gpsActive} 
                      onCheckedChange={toggleGps}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground mt-4">
                    <p>Target: Safe landing zone</p>
                    <p>Compatible: DJI, Yuneec, Parrot</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-dome-darker text-dome-purple-light border border-dome-purple/30 hover:bg-dome-purple/10"
                  >
                    Set Landing Zone
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <Zap className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">RF Takeover</CardTitle>
                  </div>
                  <CardDescription>Assume drone control</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-sm font-medium text-white mt-1">
                        {rfActive ? "Active" : "Standby"}
                      </p>
                    </div>
                    <Switch 
                      checked={rfActive}
                      onCheckedChange={toggleRf}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground mt-4">
                    <p>Protocol: DroneBridge, MAVLink</p>
                    <p>Success rate: 78% of known models</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-dome-darker text-dome-purple-light border border-dome-purple/30 hover:bg-dome-purple/10"
                  >
                    Manual Override Mode
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="bg-dome-darker border-dome-purple/10 mt-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-dome-purple/10">
                    <Shield className="h-5 w-5 text-dome-purple-light" />
                  </div>
                  <CardTitle className="text-white">Emergency Protocols</CardTitle>
                </div>
                <CardDescription>Last resort countermeasures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Button 
                    className="bg-dome-red hover:bg-dome-red/90 text-white"
                    onClick={() => toast.warning("Level 1 Protocol Activated", {
                      description: "All countermeasures engaged at maximum power. Duration: 30 seconds",
                    })}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Level 1 Protocol
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-dome-red text-dome-red hover:bg-dome-red/10"
                    onClick={() => toast.error("This action requires Director authorization", {
                      description: "Please contact security command for emergency override",
                    })}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Level 2 Protocol
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>DomeWatch v2.4.0 • All countermeasure activations are logged and reported</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
