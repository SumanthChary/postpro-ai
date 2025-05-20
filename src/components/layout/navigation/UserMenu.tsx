
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOutIcon, ChevronDownIcon } from "lucide-react";

interface UserMenuProps {
  session: any;
  username: string;
  avatarUrl: string;
  handleSignOut: () => Promise<void>;
}

const UserMenu = ({ session, username, avatarUrl, handleSignOut }: UserMenuProps) => {
  const navigate = useNavigate();

  if (!session) {
    return (
      <Button
        className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white font-opensans"
        onClick={() => navigate("/auth")}
      >
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-opensans">
          <Avatar className="w-6 h-6 mr-2">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>
          {username}
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <Avatar className="w-4 h-4 mr-2">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
