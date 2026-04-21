export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at?: string;
}

export interface PromptPayload {
  title: string;
  content: string;
  category: string;
}

export interface RefinePayload {
  prompt: string;
  category?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export type Category = 'Tech' | 'Creative' | 'Business' | 'Education' | 'Other';
