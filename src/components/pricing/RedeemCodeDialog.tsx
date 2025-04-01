
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import RedeemCodeForm from "./RedeemCodeForm";
import { useState } from "react";

const RedeemCodeDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="group text-electric-purple border-electric-purple hover:text-white hover:bg-electric-purple"
        >
          <Ticket className="w-5 h-5 mr-2" />
          Redeem Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <RedeemCodeForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default RedeemCodeDialog;
