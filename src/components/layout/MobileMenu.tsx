import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ href: string; label: string }>;
}

const MobileMenu = memo(({ isOpen, onClose, navItems }: MobileMenuProps) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="text-2xl font-bold text-primary" onClick={onClose}>
            PostPro AI
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex flex-col gap-4 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                location.pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;