import { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AlertTriangle, Clock, Shield, MapPin, Info, Mail } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function Alerts() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  
  const alerts = [
    {
      id: 1,
      severity: "critical",
      title: "Unauthorized Drone in Zone A",
      description: "Large quadcopter detected near northern perimeter",
      time: "2 minutes ago",
      location: "Zone A - Northern Perimeter",
      status: "active"
    },
    {
      id: 2,
      severity: "warning",
      title: "RF Signal Detected",
      description: "Unknown frequency pattern matching drone controller",
      time: "15 minutes ago",
      location: "Zone C - Eastern Approach",
      status: "investigating"
    },
    {
      id: 3,
      severity: "info",
      title: "System Update Available",
      description: "New threat detection model ready for installation",
      time: "1 hour ago",
      location: "System-wide",
      status: "pending"
    },
    {
      id: 4,
      severity: "critical",
      title: "Jamming Attempt Detected",
      description: "Possible signal interference affecting sensors in Zone B",
      time: "2 hours ago",
      location: "Zone B - Communications Tower",
      status: "resolved"
    },
    {
      id: 5,
      severity: "warning",
      title: "Battery Backup Activated",
      description: "Power fluctuation detected in perimeter sensors",
      time: "3 hours ago",
      location: "Zone D - Perimeter Sensors",
      status: "resolved"
    }
  ];
  
  const sendEmailAlert = async (alert: any) => {
    try {
      const response = await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: emailAddress,
          alert_title: alert.title,
          alert_description: alert.description,
          alert_location: alert.location,
          alert_time: alert.time
        },
        'YOUR_PUBLIC_KEY'
      );
      
      if (response.status === 200) {
        toast({
          title: "Email Alert Sent",
          description: "Alert notification has been sent to your email.",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to Send Email",
        description: "Could not send email notification. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAlertAction = async (alert: any, action: 'resolve' | 'respond' | 'details') => {
    if (emailEnabled && (action === 'resolve' || action === 'respond')) {
      await sendEmailAlert(alert);
    }
  };

  return (
    <div className="flex min-h-screen bg-dome-dark">
      <div className="hidden lg:block">
        <Sidebar activePage="alerts" />
      </div>
      
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 border-dome-purple/10 bg-dome-darker">
          <Sidebar activePage="alerts" />
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">{t('alerts.title')}</h1>
              <Badge variant="outline" className="bg-dome-purple/10 text-dome-purple-light border-dome-purple/30">
                {alerts.filter(a => a.status === "active" || a.status === "investigating").length} {t('alerts.active')}
              </Badge>
            </div>

            <div className="bg-dome-darker border border-dome-purple/30 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-white mb-4">{t('alerts.email.settings')}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">{t('alerts.email.enable')}</label>
                  <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                </div>
                {emailEnabled && (
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder={t('alerts.email.address')}
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="bg-dome-dark border-dome-purple/30"
                    />
                    <Button 
                      variant="outline" 
                      className="w-full border-dome-purple/30 text-dome-purple-light hover:bg-dome-purple/10"
                      onClick={() => {
                        toast({
                          title: "Settings Saved",
                          description: "Email notification settings have been updated.",
                        });
                      }}
                    >
                      {t('alerts.email.save')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`bg-dome-darker border rounded-lg p-4 ${
                    alert.severity === "critical" 
                      ? "border-dome-red/30" 
                      : alert.severity === "warning"
                        ? "border-yellow-600/30"
                        : "border-dome-purple/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full shrink-0 ${
                        alert.severity === "critical" 
                          ? "bg-dome-red/10" 
                          : alert.severity === "warning"
                            ? "bg-yellow-600/10"
                            : "bg-dome-purple/10"
                      }`}>
                        {alert.severity === "critical" ? (
                          <AlertTriangle className={`h-5 w-5 text-dome-red`} />
                        ) : alert.severity === "warning" ? (
                          <AlertTriangle className={`h-5 w-5 text-yellow-500`} />
                        ) : (
                          <Info className={`h-5 w-5 text-dome-purple-light`} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{alert.title}</h3>
                          <Badge className={`text-xs ${
                            alert.status === "active" 
                              ? "bg-dome-red/10 text-dome-red" 
                              : alert.status === "investigating"
                                ? "bg-yellow-600/10 text-yellow-500"
                                : alert.status === "pending"
                                  ? "bg-dome-purple/10 text-dome-purple-light"
                                  : "bg-green-700/10 text-green-500"
                          }`}>
                            {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{alert.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{alert.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {(alert.status === "active" || alert.status === "investigating") && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-dome-purple/30 text-dome-purple-light hover:bg-dome-purple/10"
                          onClick={() => handleAlertAction(alert, 'resolve')}
                        >
                          {t('alerts.actions.resolve')}
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant={alert.severity === "critical" ? "default" : "outline"}
                        className={
                          alert.severity === "critical" 
                            ? "bg-dome-red hover:bg-dome-red/90 text-white" 
                            : "border-dome-purple/30 text-dome-purple-light hover:bg-dome-purple/10"
                        }
                        onClick={() => handleAlertAction(alert, alert.severity === "critical" ? 'respond' : 'details')}
                      >
                        {t(alert.severity === "critical" ? 'alerts.actions.respond' : 'alerts.actions.details')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-4">
              <Button variant="outline" className="border-dome-purple/30 text-dome-purple-light hover:bg-dome-purple/10">
                {t('alerts.resolved')}
              </Button>
              <Button variant="outline" className="border-dome-purple/30 text-dome-purple-light hover:bg-dome-purple/10">
                {t('alerts.export')}
              </Button>
            </div>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>{t('alerts.footer')}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
