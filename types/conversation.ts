export type Role = 'user' | 'human' | 'assistant' | 'agent' | 'ai';

export interface Message {
  id?: string;
  text: string;
  timestamp?: Date;
  sender?: Role;
  status?: 'sending' | 'sent' | 'error';
}

export interface IncomingMessage {
  message?: string;
  text?: string;
  role?: Role;
  source?: Role;
} 