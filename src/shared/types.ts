// Shared TypeScript types across the RepoReel pipeline

export interface RepoContext {
  path: string;
  name: string;
  description: string;
  techStack: string[];
  mainLanguage: string;
  stars?: number;
  features: string[];
  recentCommits: string[];
  contributors: string[];
  websiteUrl?: string;
  installCommand?: string;
  license?: string;
  createdAt?: string;
  lastUpdated?: string;
}

export interface StoryArc {
  format: VideoFormat;
  durationSeconds: number;
  hook: string;          // opening line — grabs attention in first 3s
  problem: string;       // what pain this solves
  solution: string;      // how this repo solves it
  demoPoints: string[];  // 2-3 key features to show
  cta: string;           // call to action (star, install, visit)
}

export interface VideoScript {
  segments: ScriptSegment[];
  totalDurationSeconds: number;
  voiceStyle: string;
}

export interface ScriptSegment {
  startSeconds: number;
  endSeconds: number;
  voiceover: string;
  onScreenText?: string;
  visualPrompt: string;  // prompt for AI video generation
}

export interface GeneratedFootage {
  segmentIndex: number;
  localPath: string;
  durationSeconds: number;
  provider: string;
  cost: number;
}

export interface CreditEstimate {
  llmCost: number;
  videoCost: number;
  ttsCost: number;
  totalCost: number;
  provider: string;
  breakdown: Record<string, number>;
}

export interface VideoGenerateOptions {
  type: VideoFormat;
  output: string;
  aiVideo: boolean;
  resolution: '480p' | '720p' | '1080p';
  dryRun: boolean;
}

export type VideoFormat = 'product-hunt' | 'explainer' | 'twitter-demo' | 'release-notes' | 'readme-video';

export interface Config {
  OPENAI_API_KEY?: string;
  RUNWAY_API_KEY?: string;
  HF_API_KEY?: string;
  ELEVENLABS_API_KEY?: string;
  GEMINI_API_KEY?: string;
  defaultVoice?: string;
  watermark?: boolean;
}
