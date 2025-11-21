import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Trophy, 
  User, 
  Gamepad2, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface SidebarProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: SidebarProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Trophy, label: 'Rankings', href: '/ranking' },
    { icon: User, label: 'Meu Perfil', href: '/perfil' },
    { icon: Gamepad2, label: 'Filas & Jogos', href: '/filas' },
    { icon: Settings, label: 'Configurações', href: '/config' },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-2">
        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
          Z
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">BOT ZEUS</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={18} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut size={18} />
          Sair
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-border bg-card/50 backdrop-blur-xl fixed h-full z-30">
        <NavContent />
      </aside>

      {/* Mobile Sheet */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-background/50 backdrop-blur">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r border-border bg-card">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}
