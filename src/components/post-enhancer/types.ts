
export interface PostEnhancerProps {
  post: string;
  setPost: (post: string) => void;
  category: string;
  setCategory: (category: string) => void;
  styleTone: string;
  setStyleTone: (tone: string) => void;
}

export interface EnhancePostResponse {
  platforms: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  diagnostics?: {
    viralityScore: number;
    insights: string[];
    viewReasons: string[];
    quickWins: string[];
    highlights: string[];
    engagementMetrics: {
      comments: number;
      likes: number;
      shares: number;
      views: number;
      timeSpent: number;
      clickThrough: number;
      saveRate: number;
      viralCoefficient: number;
    };
  };
}

export interface EnhancerFormProps {
  post: string;
  category: string;
  styleTone: string;
  isEnhancing: boolean;
  onPostChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStyleToneChange: (value: string) => void;
  onReset: () => void;
  onEnhance: () => void;
  isEnhanced?: boolean;
}
