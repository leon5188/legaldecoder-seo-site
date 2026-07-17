export interface Clause {
  id: string;
  tab: 'redflags' | 'rights' | 'summary';
  title: string;
  risk: 'critical' | 'high' | 'medium' | 'low';
  riskScore: string;
  text: string;
  explanation: string;
  recommendation: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  badge?: string;
}

export interface SegmentData {
  docName: string;
  riskScore: number;
  riskLabel: string;
  riskColorClass: string;
  riskGlowColor: string;
  clauses: Clause[];
  chatHistory: Message[];
  suggestions: string[];
  aiResponses: Record<string, string>;
}
