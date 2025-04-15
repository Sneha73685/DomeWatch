
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Radar, 
  Shield, 
  Settings, 
  AlertTriangle, 
  Database, 
  Users, 
  LogOut, 
  Hexagon 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DomeWatchBadge } from "./DomeWatchBadge";

interface SidebarProps {
  className?: string;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  alert?: boolean;
}

function SidebarItem({ icon, label, active, alert }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        active ? "bg-dome-purple/10 text-dome-purple-light" : "text-muted-foreground hover:bg-dome-purple/5 hover:text-dome-purple-light"
      )}
    >
      <div className="relative">
        {icon}
        {alert && (
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-dome-red"></span>
        )}
      </div>
      <span className="ml-3">{label}</span>
    </Button>
  );
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-dome-purple/10 bg-dome-darker w-64 p-4",
        className
      )}
    >
      <div className="flex items-center py-2">
        <DomeWatchBadge />
      </div>
      
      <Separator className="my-4 bg-dome-purple/10" />
      
      <nav className="space-y-1.5">
        <SidebarItem icon={<BarChart3 className="h-5 w-5" />} label="Dashboard" active />
        <SidebarItem icon={<Radar className="h-5 w-5" />} label="Detection" />
        <SidebarItem icon={<Shield className="h-5 w-5" />} label="Countermeasures" alert />
        <SidebarItem icon={<AlertTriangle className="h-5 w-5" />} label="Alerts" />
        <SidebarItem icon={<Database className="h-5 w-5" />} label="Analytics" />
        <SidebarItem icon={<Users className="h-5 w-5" />} label="Operators" />
        <SidebarItem icon={<Settings className="h-5 w-5" />} label="Settings" />
      </nav>
      
      <div className="mt-auto">
        <Separator className="my-4 bg-dome-purple/10" />
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-dome-red/10 hover:text-dome-red">
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Log Out</span>
        </Button>
      </div>
    </aside>
  );
}
