export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      feedback: {
        Row: {
          created_at: string
          feature_used: string
          feedback_text: string | null
          id: string
          rating: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feature_used?: string
          feedback_text?: string | null
          id?: string
          rating: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feature_used?: string
          feedback_text?: string | null
          id?: string
          rating?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          payment_method: string
          status: string
          subscription_tier: string
          transaction_id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          payment_method: string
          status: string
          subscription_tier: string
          transaction_id: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string
          status?: string
          subscription_tier?: string
          transaction_id?: string
          user_id?: string
        }
        Relationships: []
      }
      post_enhancements: {
        Row: {
          category: string
          created_at: string
          engagement_metrics: Json
          enhanced_platforms: Json
          highlights: Json
          id: string
          insights: Json
          original_post: string
          quick_wins: Json
          style_tone: string
          user_id: string
          view_reasons: Json
          virality_score: number | null
        }
        Insert: {
          category: string
          created_at?: string
          engagement_metrics?: Json
          enhanced_platforms?: Json
          highlights?: Json
          id?: string
          insights?: Json
          original_post: string
          quick_wins?: Json
          style_tone: string
          user_id: string
          view_reasons?: Json
          virality_score?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          engagement_metrics?: Json
          enhanced_platforms?: Json
          highlights?: Json
          id?: string
          insights?: Json
          original_post?: string
          quick_wins?: Json
          style_tone?: string
          user_id?: string
          view_reasons?: Json
          virality_score?: number | null
        }
        Relationships: []
      }
      public_post_analyses: {
        Row: {
          author_avatar_url: string | null
          author_followers: number | null
          author_handle: string | null
          author_name: string | null
          created_at: string
          email: string | null
          id: string
          metrics: Json
          platform: string | null
          post_text: string | null
          post_url: string | null
          posted_at: string | null
          replicate_tips: Json
          slug: string
          source: string | null
          virality_score: number
          why_it_worked: Json
        }
        Insert: {
          author_avatar_url?: string | null
          author_followers?: number | null
          author_handle?: string | null
          author_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          metrics?: Json
          platform?: string | null
          post_text?: string | null
          post_url?: string | null
          posted_at?: string | null
          replicate_tips: Json
          slug: string
          source?: string | null
          virality_score: number
          why_it_worked: Json
        }
        Update: {
          author_avatar_url?: string | null
          author_followers?: number | null
          author_handle?: string | null
          author_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          metrics?: Json
          platform?: string | null
          post_text?: string | null
          post_url?: string | null
          posted_at?: string | null
          replicate_tips?: Json
          slug?: string
          source?: string | null
          virality_score?: number
          why_it_worked?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          free_enhancements: number | null
          id: string
          plan_upgraded_via_referral: boolean | null
          updated_at: string | null
          username: string | null
          whop_access_token: string | null
          whop_refresh_token: string | null
          whop_user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          free_enhancements?: number | null
          id: string
          plan_upgraded_via_referral?: boolean | null
          updated_at?: string | null
          username?: string | null
          whop_access_token?: string | null
          whop_refresh_token?: string | null
          whop_user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          free_enhancements?: number | null
          id?: string
          plan_upgraded_via_referral?: boolean | null
          updated_at?: string | null
          username?: string | null
          whop_access_token?: string | null
          whop_refresh_token?: string | null
          whop_user_id?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_user_id: string
          referred_user_plan: string
          referrer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_user_id: string
          referred_user_plan: string
          referrer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_user_id?: string
          referred_user_plan?: string
          referrer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      scheduled_shares: {
        Row: {
          content: string
          created_at: string | null
          id: number
          time: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          time: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          time?: string
        }
        Relationships: []
      }
      streak_rewards: {
        Row: {
          created_at: string
          id: string
          reward_description: string | null
          reward_title: string
          reward_type: string
          reward_value: Json
          streak_milestone: number
        }
        Insert: {
          created_at?: string
          id?: string
          reward_description?: string | null
          reward_title: string
          reward_type: string
          reward_value: Json
          streak_milestone: number
        }
        Update: {
          created_at?: string
          id?: string
          reward_description?: string | null
          reward_title?: string
          reward_type?: string
          reward_value?: Json
          streak_milestone?: number
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          monthly_post_count: number | null
          monthly_reset_date: string | null
          plan_name: string | null
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
          whop_community_id: string | null
          whop_payment_id: string | null
          whop_subscription_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          monthly_post_count?: number | null
          monthly_reset_date?: string | null
          plan_name?: string | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
          whop_community_id?: string | null
          whop_payment_id?: string | null
          whop_subscription_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          monthly_post_count?: number | null
          monthly_reset_date?: string | null
          plan_name?: string | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
          whop_community_id?: string | null
          whop_payment_id?: string | null
          whop_subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_subscribers_plan_name"
            columns: ["plan_name"]
            isOneToOne: false
            referencedRelation: "subscription_limits"
            referencedColumns: ["plan_name"]
          },
        ]
      }
      subscription_limits: {
        Row: {
          created_at: string
          credits_included: number | null
          has_ab_testing: boolean | null
          has_advanced_ai: boolean | null
          has_premium_templates: boolean | null
          has_priority_support: boolean | null
          has_virality_score: boolean | null
          id: string
          monthly_post_limit: number | null
          plan_name: string
        }
        Insert: {
          created_at?: string
          credits_included?: number | null
          has_ab_testing?: boolean | null
          has_advanced_ai?: boolean | null
          has_premium_templates?: boolean | null
          has_priority_support?: boolean | null
          has_virality_score?: boolean | null
          id?: string
          monthly_post_limit?: number | null
          plan_name: string
        }
        Update: {
          created_at?: string
          credits_included?: number | null
          has_ab_testing?: boolean | null
          has_advanced_ai?: boolean | null
          has_premium_templates?: boolean | null
          has_priority_support?: boolean | null
          has_virality_score?: boolean | null
          id?: string
          monthly_post_limit?: number | null
          plan_name?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          balance: number
          created_at: string
          expires_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          expires_at: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          expires_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_streak_rewards: {
        Row: {
          claimed_at: string
          id: string
          streak_reward_id: string
          user_id: string
        }
        Insert: {
          claimed_at?: string
          id?: string
          streak_reward_id: string
          user_id: string
        }
        Update: {
          claimed_at?: string
          id?: string
          streak_reward_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_streak_rewards_streak_reward_id_fkey"
            columns: ["streak_reward_id"]
            isOneToOne: false
            referencedRelation: "streak_rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      user_streaks: {
        Row: {
          created_at: string
          current_streak: number
          id: string
          last_activity_date: string | null
          longest_streak: number
          streak_freeze_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number
          id?: string
          last_activity_date?: string | null
          longest_streak?: number
          streak_freeze_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number
          id?: string
          last_activity_date?: string | null
          longest_streak?: number
          streak_freeze_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_usage: {
        Row: {
          action_type: string
          created_at: string
          credits_used: number | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          credits_used?: number | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          credits_used?: number | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      whop_installations: {
        Row: {
          app_id: string
          community_id: string
          created_at: string
          id: string
          installed_by: string
          settings: Json | null
          status: string | null
          updated_at: string
        }
        Insert: {
          app_id: string
          community_id: string
          created_at?: string
          id?: string
          installed_by: string
          settings?: Json | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          app_id?: string
          community_id?: string
          created_at?: string
          id?: string
          installed_by?: string
          settings?: Json | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_owns_profile: {
        Args: { profile_id: string }
        Returns: boolean
      }
      reset_monthly_usage: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_streak: {
        Args: { user_id_param: string }
        Returns: {
          current_streak: number
          is_new_record: boolean
          longest_streak: number
          rewards_earned: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
