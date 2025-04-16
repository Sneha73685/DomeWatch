
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
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DomeWatchBadge } from "./DomeWatchBadge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SidebarProps {
  className?: string;
  activePage?: string;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  alert?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon, label, active, alert, onClick }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        active ? "bg-dome-purple/10 text-dome-purple-light" : "text-muted-foreground hover:bg-dome-purple/5 hover:text-dome-purple-light"
      )}
      onClick={onClick}
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

export function Sidebar({ className, activePage = "dashboard" }: SidebarProps) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast.success("Logged out successfully", {
      description: "Redirecting to login page..."
    });
    setTimeout(() => navigate("/login"), 1500);
  };
  
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-dome-purple/10 bg-dome-darker w-64 p-4",
        className
      )}
    >
      <div className="flex items-center py-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
        <DomeWatchBadge />
      </div>
      
      <Separator className="my-4 bg-dome-purple/10" />
      
      <nav className="space-y-1.5">
        <SidebarItem 
          icon={<BarChart3 className="h-5 w-5" />} 
          label="Dashboard" 
          active={activePage === "dashboard"}
          onClick={() => navigate("/dashboard")}
        />
        <SidebarItem 
          icon={<Radar className="h-5 w-5" />} 
          label="Detection" 
          active={activePage === "detection"}
          onClick={() => navigate("/detection")}
        />
        <SidebarItem 
          icon={<Shield className="h-5 w-5" />} 
          label="Countermeasures" 
          active={activePage === "countermeasures"}
          alert={true}
          onClick={() => navigate("/countermeasures")}
        />
        <SidebarItem 
          icon={<AlertTriangle className="h-5 w-5" />} 
          label="Alerts" 
          active={activePage === "alerts"}
          onClick={() => navigate("/alerts")}
        />
        <SidebarItem 
          icon={<Database className="h-5 w-5" />} 
          label="Analytics" 
          active={activePage === "analytics"}
          onClick={() => {
            toast.info("Access restricted", {
              description: "Analytics module requires additional permissions"
            });
          }}
        />
        <SidebarItem 
          icon={<Users className="h-5 w-5" />} 
          label="Operators" 
          active={activePage === "operators"}
          onClick={() => {
            toast.info("Access restricted", {
              description: "Operators module requires additional permissions"
            });
          }}
        />
        <SidebarItem 
          icon={<Settings className="h-5 w-5" />} 
          label="Settings" 
          active={activePage === "settings"}
          onClick={() => {
            toast.info("Access restricted", {
              description: "Settings module requires additional permissions"
            });
          }}
        />
      </nav>
      
      <div className="mt-auto">
        <Separator className="my-4 bg-dome-purple/10" />
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:bg-dome-red/10 hover:text-dome-red"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Log Out</span>
        </Button>
      </div>
    </aside>
  );
}
