import React from 'react';

const WhopBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/20">
      <div className="container mx-auto px-4 py-3">
        <div className="text-center">
          <p className="text-sm text-foreground font-medium">
            Now available on Whop Marketplace • 
            <span className="text-primary font-semibold"> Professional AI content tools for creators</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhopBanner;