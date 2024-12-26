import { Role } from './conversation';

export interface ConversationMessage {
  message: string;
  source: Role;
}

export interface ConversationCallbacks {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessage?: (props: ConversationMessage) => void;
  onError?: (error: any) => void;
  onAudioStream?: (stream: MediaStream) => void;
} 