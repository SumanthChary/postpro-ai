
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 && 
        !localStorage.getItem('exitPopupShown') && 
        !sessionStorage.getItem('exitPopupShown')
      ) {
        timer = setTimeout(() => {
          setIsOpen(true);
          // Store that we've shown the popup in this session
          sessionStorage.setItem('exitPopupShown', 'true');
        }, 300);
      }
    };
    
    // Set up exit intent detection after 5 seconds on page
    setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);
  
  const handleTryFree = () => {
    setIsOpen(false);
    navigate('/enhance');
  };
  
  const handleClose = () => {
    setIsOpen(false);
    // Remember we've closed it this session
    localStorage.setItem('exitPopupShown', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-light-lavender to-white p-0 overflow-hidden">
        <div className="relative">
          {/* Background effects */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-electric-purple/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-bright-teal/20 rounded-full blur-3xl"></div>
          
          <div className="p-6 relative z-10">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Want to double your reach with better content?
            </h2>
            
            <p className="text-center mb-6">
              Try PostPro AI free for 1 day. No login needed.
            </p>
            
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={handleTryFree} 
                className="bg-electric-purple hover:bg-electric-purple/90 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Try For Free Now
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleClose} 
                className="border-gray-200"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
