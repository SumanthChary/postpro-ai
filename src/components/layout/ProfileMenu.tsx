import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { 
  User, 
  Settings, 
  LogOut, 
  CreditCard,
  Zap,
  Crown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ProfileMenu = memo(() => {
  const { user } = useAuthContext();
  const { subscription } = useSubscription();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!user) return null;

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const avatarUrl = user.user_metadata?.avatar_url;
  const isUnlimited = subscription?.subscription_limits?.monthly_post_limit === -1;
  const isAdmin = user.email === 'enjoywithpandu@gmail.com';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full hover:bg-muted/80 transition-colors"
        >
          <Avatar className="h-10 w-10 border-2 border-primary/10">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isUnlimited && (
            <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-sm">{displayName}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              {isAdmin ? (
                <Badge variant="default" className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500">
                  <Crown className="w-3 h-3 mr-1" />
                  Admin
                </Badge>
              ) : isUnlimited ? (
                <Badge variant="default" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  {subscription?.plan_name || 'Free'}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/subscription" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Subscription
          </Link>
        </DropdownMenuItem>
        
        {!isUnlimited && (
          <DropdownMenuItem asChild>
            <Link to="/pricing" className="cursor-pointer text-primary">
              <CreditCard className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ProfileMenu.displayName = 'ProfileMenu';

export default ProfileMenu;