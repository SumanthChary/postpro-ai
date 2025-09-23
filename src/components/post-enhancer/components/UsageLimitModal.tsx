import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Zap, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UsageLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsage: number;
  monthlyLimit: number;
  planName: string;
}

export const UsageLimitModal: React.FC<UsageLimitModalProps> = ({
  isOpen,
  onClose,
  currentUsage,
  monthlyLimit,
  planName
}) => {
  const navigate = useNavigate();
  const progressPercentage = (currentUsage / monthlyLimit) * 100;
  const isAtLimit = currentUsage >= monthlyLimit;

  const handleUpgrade = () => {
    navigate('/pricing');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center">
            {isAtLimit ? (
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            ) : (
              <Zap className="h-5 w-5 text-amber-500" />
            )}
            {isAtLimit ? 'Usage Limit Reached' : 'Approaching Limit'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center space-y-3">
            <div className="text-sm text-muted-foreground">
              Current Plan: <span className="font-semibold">{planName}</span>
            </div>
            
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between text-sm">
                <span>{currentUsage} / {monthlyLimit} used</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Crown className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Upgrade Benefits</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Unlimited post enhancements</li>
                  <li>• Advanced AI tone options</li>
                  <li>• Virality prediction score</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleUpgrade} className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              Upgrade Now - Unlimited Access
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Continue with Current Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};