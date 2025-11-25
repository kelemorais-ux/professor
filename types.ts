export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  LIBRARY = 'LIBRARY',
  LESSON_PLANS = 'LESSON_PLANS',
  ACTIVITIES = 'ACTIVITIES',
  MOLDS = 'MOLDS',
  REPORTS = 'REPORTS',
  INCLUSIVE = 'INCLUSIVE'
}

export interface LessonPlan {
  theme: string;
  ageGroup: string;
  bnccCodes: string[];
  objectives: string[];
  resources: string[];
  steps: string[];
  evaluation: string;
}

export interface StudentReport {
  studentName: string;
  highlights: string;
  challenges: string;
  socialization: string;
  generatedText: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  content?: string; // For AI generated stories
}
