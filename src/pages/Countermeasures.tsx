
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ShieldAlert, 
  ShieldOff, 
  Radar, 
  AlertTriangle, 
  PlayCircle, 
  PauseCircle 
} from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

const countermeasureTypes = [
  {
    id: 1,
    name: "Drone Jamming",
    description: "Electromagnetic interference to disable unauthorized drones",
    status: "active",
    icon: ShieldOff
  },
  {
    id: 2,
    name: "Geofencing",
    description: "Create virtual boundaries to prevent drone entry",
    status: "inactive",
    icon: Radar
  },
  {
    id: 3,
    name: "Aerial Interception",
    description: "Deploy counter-drone systems to neutralize threats",
    status: "standby",
    icon: AlertTriangle
  }
];

const Countermeasures: React.FC = () => {
  const [activeMeasures, setActiveMeasures] = useState(
    countermeasureTypes.map(measure => ({
      ...measure,
      isActive: measure.status === "active"
    }))
  );

  const toggleCountermeasure = (id: number) => {
    const updatedMeasures = activeMeasures.map(measure => 
      measure.id === id 
        ? { ...measure, isActive: !measure.isActive } 
        : measure
    );
    
    setActiveMeasures(updatedMeasures);
    
    const toggledMeasure = updatedMeasures.find(m => m.id === id);
    toast.info(`${toggledMeasure?.name} ${toggledMeasure?.isActive ? 'Activated' : 'Deactivated'}`, {
      description: `Countermeasure set to ${toggledMeasure?.isActive ? 'active' : 'inactive'} state`
    });
  };

  const activateAllCountermeasures = () => {
    const allActivated = activeMeasures.map(measure => ({
      ...measure, 
      isActive: true
    }));
    
    setActiveMeasures(allActivated);
    
    toast.success("All Countermeasures Activated", {
      description: "Comprehensive drone defense system engaged"
    });
  };

  const deactivateAllCountermeasures = () => {
    const allDeactivated = activeMeasures.map(measure => ({
      ...measure, 
      isActive: false
    }));
    
    setActiveMeasures(allDeactivated);
    
    toast.warning("All Countermeasures Deactivated", {
      description: "Drone defense system disengaged"
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar activePage="countermeasures" />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-dome-dark overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-dome-purple" /> 
              Countermeasures
            </h1>
            <div className="space-x-2">
              <Button 
                variant="default" 
                onClick={activateAllCountermeasures}
                className="bg-dome-green hover:bg-dome-green/80"
              >
                <PlayCircle className="mr-2" /> Activate All
              </Button>
              <Button 
                variant="destructive" 
                onClick={deactivateAllCountermeasures}
                className="bg-dome-red hover:bg-dome-red/80"
              >
                <PauseCircle className="mr-2" /> Deactivate All
              </Button>
            </div>
          </div>
          
          <Separator className="mb-6 bg-dome-purple/20" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeMeasures.map((measure) => (
              <Card 
                key={measure.id} 
                className={`
                  bg-dome-darker border-dome-purple/20 
                  ${measure.isActive ? 'border-dome-green/50' : 'border-dome-red/30'}
                `}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <measure.icon 
                      className={`
                        h-5 w-5 
                        ${measure.isActive ? 'text-dome-green' : 'text-dome-red'}
                      `} 
                    />
                    {measure.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground mb-2">
                    {measure.description}
                  </div>
                  <Button 
                    onClick={() => toggleCountermeasure(measure.id)}
                    variant={measure.isActive ? "destructive" : "default"}
                    size="sm"
                    className="w-full"
                  >
                    {measure.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Countermeasures;

