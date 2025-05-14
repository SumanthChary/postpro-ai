
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

interface AffiliateHeroProps {
  session: any;
  copyToClipboard: () => void;
}

const AffiliateHero = ({ session, copyToClipboard }: AffiliateHeroProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-montserrat font-extrabold bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent mb-4">
          PostPro AI Affiliate Program
        </h1>
        <p className="text-xl text-custom-text max-w-3xl mx-auto">
          Earn recurring commissions by sharing PostPro AI with your network. Get 25% on all referrals - for life!
        </p>
      </div>

      {!session ? (
        <Card className="p-8 text-center mb-12 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Join Our Affiliate Program</h3>
          <p className="mb-6">Sign in or create an account to get your unique referral link and start earning.</p>
          <Button 
            className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white"
            onClick={() => navigate("/auth")}
            size="lg"
          >
            Sign In to Get Started
          </Button>
        </Card>
      ) : null}
    </>
  );
};

export default AffiliateHero;
