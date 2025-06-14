
export interface PlatformContent {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
}

export interface ApiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export interface GenerationResult {
  success: boolean;
  content?: string;
  error?: string;
}

export type Platform = 'linkedin' | 'twitter' | 'instagram' | 'facebook';
export type StyleTone = 'professional' | 'casual' | 'friendly' | 'authoritative' | 'conversational';
export type Category = 'business' | 'technology' | 'lifestyle' | 'education' | 'entertainment';
