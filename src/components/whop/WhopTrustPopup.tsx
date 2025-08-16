import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X, ExternalLink } from 'lucide-react';

const WhopTrustPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const popupShown = localStorage.getItem('whop-popup-shown');
    if (!popupShown) {
      // Show popup after 3-8 seconds randomly
      const delay = Math.random() * 5000 + 3000;
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('whop-popup-shown', 'true');
  };

  const handleWhopClick = () => {
    window.open('https://whop.com/postpro-ai/', '_blank');
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <Card className="max-w-md w-full shadow-2xl border-0 bg-white">
        <CardContent className="p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/lovable-uploads/12ef785a-af3d-4cbb-b6d7-0d20e7562e96.png" 
                alt="Whop" 
                className="h-8 w-8 mr-3"
              />
              <h3 className="text-lg font-semibold text-foreground">We're on Whop now!</h3>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              PostPro AI is now available on Whop - the trusted marketplace for digital products. 
              Get secure access to professional AI content tools.
            </p>
            
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleWhopClick}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Visit on Whop
                <ExternalLink className="h-3 w-3" />
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhopTrustPopup;