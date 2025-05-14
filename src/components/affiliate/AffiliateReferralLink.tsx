
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2Icon, CopyIcon, CheckIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ReferralLinkProps {
  referralLink: string;
}

const AffiliateReferralLink: React.FC<ReferralLinkProps> = ({ referralLink }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Your affiliate link is copied to clipboard",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Card className="p-6 shadow-lg mb-8">
      <h3 className="text-xl font-bold mb-4 text-electric-purple flex items-center gap-2">
        <Link2Icon className="w-5 h-5" /> Your Affiliate Link
      </h3>
      <p className="mb-4 text-sm text-custom-text">
        Share this unique link to earn 25% commission on all purchases made by your referrals.
      </p>
      <div className="flex gap-2">
        <Input 
          value={referralLink} 
          readOnly 
          className="font-mono text-sm bg-gray-50"
        />
        <Button 
          variant="outline" 
          size="icon" 
          onClick={copyToClipboard}
          className="shrink-0"
        >
          {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  );
};

export default AffiliateReferralLink;
