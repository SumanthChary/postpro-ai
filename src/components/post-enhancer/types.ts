
export interface PostEnhancerProps {
  post: string;
  setPost: (post: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

export interface EnhancePostResponse {
  platforms: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}
