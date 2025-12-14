export interface RepoMetric {
  name: string;
  score: number; // 0-100 or 0-10
  fullMark: number;
}

export interface RoadmapStep {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Source {
  title: string;
  uri: string;
}

export interface RepoAnalysis {
  score: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  summary: string;
  metrics: RepoMetric[];
  roadmap: RoadmapStep[];
  techStack: string[];
  strengths: string[];
  weaknesses: string[];
  sources?: Source[];
}

export interface AnalysisState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: RepoAnalysis | null;
  error: string | null;
}