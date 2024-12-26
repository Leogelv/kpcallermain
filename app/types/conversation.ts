export interface Message {
  id?: string;
  text: string;
  sender: string;
  timestamp: Date;
}

export interface IncomingMessage {
  message?: string;
  text?: string;
  role?: string;
  source?: string;
} 