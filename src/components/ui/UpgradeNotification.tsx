import React from 'react';
import { AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface UpgradeNotificationProps {
  currentUsage: number;
  monthlyLimit: number;
  planName: string;
  onClose?: () => void;
}

export const UpgradeNotification: React.FC<UpgradeNotificationProps> = ({
  currentUsage,
  monthlyLimit,
  planName,
  onClose
}) => {
  const navigate = useNavigate();

  const isAtLimit = currentUsage >= monthlyLimit;
  const isNearLimit = currentUsage >= monthlyLimit * 0.8; // 80% of limit
  
  if (!isNearLimit && !isAtLimit) return null;

  const handleUpgrade = () => {
    navigate('/pricing');
    onClose?.();
  };

  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {isAtLimit ? (
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            ) : (
              <Zap className="h-5 w-5 text-amber-600 mt-0.5" />
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div>
              <h4 className="font-semibold text-gray-900">
                {isAtLimit ? 'Monthly Limit Reached' : 'Approaching Limit'}
              </h4>
              <p className="text-sm text-gray-600">
                {isAtLimit 
                  ? `You've used all ${monthlyLimit} enhancements in your ${planName}. Upgrade for unlimited access.`
                  : `You've used ${currentUsage} of ${monthlyLimit} enhancements. Upgrade now to avoid interruptions.`
                }
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleUpgrade}
                size="sm"
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white"
              >
                <Zap className="h-4 w-4 mr-1" />
                Upgrade Now
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              
              {onClose && (
                <Button 
                  onClick={onClose}
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Later
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};