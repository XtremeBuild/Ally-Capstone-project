// Single thread 
export interface Thread {
    threadId: number;
    title: string;
    dateCreated: string;
    status: number;
    priority: boolean;
  }

  // Stakeholder individual sentiment
export interface Sentiment {
  id: number;
  email: string;
  sentiment: string;
  responseTime: string;
  quickAction: string;
}

// Pie chart
export interface PieChartEntry {
  id: number;
  label: string;
  value: number;
}

// Indiviual stakeholder pro/cons
export interface DetailsData {
  positives: string[];
  negatives: string[];
  webLink: string;
  attachments: { filename: string; content: string; attachment: string[]}[]; // New field
}

// Synthesized stakeholder sentiments
export interface GeneralSentimentData {
  positives: string[];
  negatives: string[];
}

// Side nav bar recently accessed
export interface RecentlyAccessedThread {
  threadId: number;    
  title: string; 
}

// Activity log entry
export interface AuditEntry {
  threadId: number;
  actionTaken: string;
  time: string;
  affectedUser: string;
  agent: string;
}

// Summary module response
export interface SummaryResponse {
  action_items: string[];
  sender: string;
  summary: string;
}