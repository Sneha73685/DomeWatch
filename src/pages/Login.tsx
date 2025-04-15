
import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dome-dark p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 h-[150%] w-[150%] rounded-[50%] bg-dome-purple/5 blur-3xl"></div>
        <div className="absolute -bottom-1/2 left-1/2 h-[150%] w-[150%] rounded-[50%] bg-dome-purple/10 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-center">
          <div className="inline-block px-3 py-1 text-xs font-medium text-dome-purple-light bg-dome-purple/10 rounded-full shadow-sm">
            Secured Connection • 256-bit encrypted
          </div>
        </div>
        
        <LoginForm />
        
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            DomeWatch Security Systems • Authorized Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
