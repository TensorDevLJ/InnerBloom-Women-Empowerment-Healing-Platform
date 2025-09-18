import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Heart, 
  Shield, 
  FileText, 
  Scale, 
  Sparkles, 
  Users, 
  Home, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Phone,
  MessageSquare,
  AlertTriangle,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/magic-box', label: 'Magic Box', icon: Heart },
  { path: '/safety-hub', label: 'Safety Hub', icon: Shield },
  { path: '/report', label: 'Report', icon: FileText },
  { path: '/rights', label: 'Know Your Rights', icon: Scale },
  { path: '/wellness', label: 'Wellness', icon: Sparkles },
  { path: '/empowerment', label: 'Empowerment', icon: Users },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

  const emergencyExit = () => {
    window.location.href = 'https://google.com';
  };

  const sendSOS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const message = `🆘 EMERGENCY ALERT! I need help. My location: https://maps.google.com/?q=${latitude},${longitude}`;
        
        // Open WhatsApp with emergency message
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        
        // Also try to trigger phone call
        setTimeout(() => {
          window.open('tel:112', '_self');
        }, 1000);
      });
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Emergency Bar */}
      <div className="bg-destructive text-destructive-foreground p-2 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-4">
          <span>🆘 Emergency Helpline: 1091 (Women) | 112 (General)</span>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={sendSOS}
            className="h-7 px-3 bg-destructive-foreground text-destructive hover:bg-white/90"
          >
            <Phone className="w-3 h-3 mr-1" />
            Quick SOS
          </Button>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                EmpowerHER
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-soft' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Emergency Exit */}
              <Button
                size="sm"
                variant="ghost"
                onClick={emergencyExit}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                title="Emergency Exit (Redirects to Google)"
              >
                <AlertTriangle className="w-4 h-4" />
              </Button>

              {/* Theme Toggle */}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                size="sm"
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg">EmpowerHER</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Building a world where every woman feels safe, empowered, and heard.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <span className="text-xs text-muted-foreground">
              🌍 Available in multiple languages
            </span>
            <span className="text-xs text-muted-foreground">
              💜 Your voice matters
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;