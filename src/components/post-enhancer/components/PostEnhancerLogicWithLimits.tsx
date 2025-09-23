import React, { useState, useEffect } from 'react';
import { PostEnhancerLogic } from './PostEnhancerLogic';
import { UpgradeNotification } from '@/components/ui/UpgradeNotification';
import { usePostEnhancer } from '../hooks/usePostEnhancer';
import { useAuth } from '@/hooks/useAuth';

interface PostEnhancerLogicWithLimitsProps {
  post: string;
  setPost: (post: string) => void;
  category: string;
  setCategory: (category: string) => void;
  styleTone: string;
  setStyleTone: (styleTone: string) => void;
}

export const PostEnhancerLogicWithLimits: React.FC<PostEnhancerLogicWithLimitsProps> = (props) => {
  const { user } = useAuth();
  const { checkUsageLimit } = usePostEnhancer();
  const [usageData, setUsageData] = useState<{
    currentUsage: number;
    monthlyLimit: number;
    planName: string;
    canUse: boolean;
  } | null>(null);
  const [showUpgradeNotification, setShowUpgradeNotification] = useState(false);

  useEffect(() => {
    const fetchUsageData = async () => {
      if (!user) return;
      
      try {
        const data = await checkUsageLimit();
        setUsageData({
          currentUsage: data.currentUsage || 0,
          monthlyLimit: data.monthlyLimit || 5,
          planName: data.planName || 'Free Plan',
          canUse: data.canUse
        });
        
        // Show upgrade notification if near or at limit
        const isNearLimit = data.currentUsage >= (data.monthlyLimit * 0.8);
        if (isNearLimit && data.monthlyLimit !== -1 && !data.isAdmin) {
          setShowUpgradeNotification(true);
        }
      } catch (error) {
        console.error('Error fetching usage data:', error);
      }
    };

    fetchUsageData();
  }, [user, checkUsageLimit]);

  return (
    <div className="space-y-4">
      {showUpgradeNotification && usageData && (
        <UpgradeNotification
          currentUsage={usageData.currentUsage}
          monthlyLimit={usageData.monthlyLimit}
          planName={usageData.planName}
          onClose={() => setShowUpgradeNotification(false)}
        />
      )}
      
      <PostEnhancerLogic {...props} />
    </div>
  );
};