
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSubscription } from '@/hooks/useSubscription';
import { PostEnhancerLogic } from './PostEnhancerLogic';
import { AutoShare } from './AutoShare';
import type { PostEnhancerProps, ScheduleData } from '@/types/postEnhancer';

const PostEnhancer: React.FC<PostEnhancerProps> = ({
  post,
  setPost,
  category,
  setCategory,
  styleTone,
  setStyleTone,
}) => {
  const { usageStats } = useSubscription();

  const handleSchedule = async (scheduleData: ScheduleData) => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('scheduled_shares')
        .insert({
          user_id: user.id,
          content: scheduleData.post,
          platforms: scheduleData.platforms,
          scheduled_time: scheduleData.scheduledTime.toISOString(),
          status: 'pending'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error scheduling post:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-8 w-full px-4 sm:px-0">
      <div className="max-w-4xl mx-auto space-y-8">
        <PostEnhancerLogic
          post={post}
          setPost={setPost}
          category={category}
          setCategory={setCategory}
          styleTone={styleTone}
          setStyleTone={setStyleTone}
        />
        
        {/* Auto-share section */}
        {usageStats?.userPlan && (
          <div className="mt-8 pt-8 border-t">
            <AutoShare
              post={post}
              onSchedule={handleSchedule}
              userPlan={usageStats.userPlan}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostEnhancer;
};
          setCategory={setCategory}
          styleTone={styleTone}
          setStyleTone={setStyleTone}
        />

        <PaymentTrustBadges />
      </div>
    </div>
  );
};

export default PostEnhancer;
