import { PostgrestError } from '@supabase/supabase-js';

export interface PostEnhancerProps {
  post: string;
  setPost: (post: string) => void;
  category: string;
  setCategory: (category: string) => void;
  styleTone: string;
  setStyleTone: (tone: string) => void;
}

export interface AutoShareProps {
  post: string;
  onSchedule: (scheduleData: ScheduleData) => Promise<void>;
  userPlan: 'free' | 'plus' | 'pro' | 'enterprise';
}

export interface ScheduleData {
  post: string;
  platforms: string[];
  scheduledTime: Date;
}

export interface ScheduledPost {
  id: string;
  user_id: string;
  content: string;
  platforms: string[];
  scheduled_time: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}
