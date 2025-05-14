
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface AffiliateCTAProps {
  session: any;
  copyToClipboard: () => void;
}

const AffiliateCTA = ({ session, copyToClipboard }: AffiliateCTAProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Join our affiliate program today and start earning passive income by sharing PostPro AI with your network.
      </p>
      {!session ? (
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white"
          onClick={() => navigate("/auth")}
        >
          Sign Up Now
        </Button>
      ) : (
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white"
          onClick={copyToClipboard}
        >
          Copy Your Affiliate Link
        </Button>
      )}
    </div>
  );
};

export default AffiliateCTA;
