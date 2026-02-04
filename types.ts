
export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}
