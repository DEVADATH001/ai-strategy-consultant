export interface UserInput {
  leadName: string;
  companyName: string;
  websiteData: string;
  userChallenge: string;
  industry: string;
}

export interface AnalysisSolution {
  title: string;
  description: string;
  funnelStage: string;
  kpi: string;
  roi: string;
  integration: string;
}

export interface BusinessIntelligence {
  whatTheyDo: string;
  targetAudience: string;
  salesMotion: string;
  pricePoint: string;
  keyAssumptions: string[];
}

export interface Gap {
  title: string;
  description: string;
  businessImpact: string;
}

export interface AnalysisReport {
  executiveSummary: string;
  businessIntelligence: BusinessIntelligence;
  gapAnalysis: Gap[]; 
  solutionEfficiency: AnalysisSolution;
  solutionRevenue: AnalysisSolution;
  fitScore: number;
  dealPotential: string;
  fitJustification: string;
  iceBreaker: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}