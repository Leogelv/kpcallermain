'use client';

import { useCallback, useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useConversation } from '@11labs/react';
import { MessageList } from './MessageList';
import { AudioVisualizer } from './AudioVisualizer';
import { Message } from '../types/conversation';
import { Inter_Tight, Unbounded } from 'next/font/google';
import { ConversationControls } from './ConversationControls';

const interTight = Inter_Tight({ subsets: ['latin'] });
const unbounded = Unbounded({ subsets: ['latin'] });

type ConversationWithAudio = ReturnType<typeof useConversation> & {
  getOutputByteFrequencyData?: () => Uint8Array;
  getOutputVolume?: () => number;
};

interface ConversationProps {
  onStatusChange?: (isConnected: boolean) => void;
}

export interface ConversationHandle {
  startCall: () => Promise<void>;
  endCall: () => Promise<void>;
}

export const Conversation = forwardRef<ConversationHandle, ConversationProps>(
  ({ onStatusChange }, ref) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const conversation = useConversation({
      onConnect: () => {
        console.log('Connected');
        onStatusChange?.(true);
      },
      onDisconnect: () => {
        console.log('Disconnected');
        setMicrophoneStream(null);
        onStatusChange?.(false);
      },
      onMessage: (props: { message: string; source: string }) => {
        console.log('Received message:', props);
        setMessages(prev => [...prev, {
          text: props.message || '',
          sender: props.source as any,
          timestamp: new Date()
        }]);
      },
      onError: (error) => console.error('Error:', error),
      onAudioStream: (stream: MediaStream) => {
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
          audioRef.current.play().catch(console.error);
        }
      }
    }) as ConversationWithAudio;

    const startCall = useCallback(async () => {
      setMessages([]);
      
      try {
        if (microphoneStream) {
          console.log('Stopping previous microphone stream...');
          microphoneStream.getTracks().forEach(track => track.stop());
        }
        
        console.log('Requesting microphone access...');
        const micStream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          } 
        }).catch(err => {
          console.error('Microphone access error:', err.name, err.message);
          throw err;
        });
        
        console.log('Microphone access granted');
        setMicrophoneStream(micStream);
        
        console.log('Starting conversation session...');
        await conversation.startSession({
          agentId: '5MXOKiURgOvOvsm4BvL3',
        }).catch(err => {
          console.error('Session start error:', err);
          throw err;
        });
        
        console.log('Conversation session started successfully');
        
      } catch (error: any) {
        console.error('Failed to start conversation:', {
          name: error?.name,
          message: error?.message,
          stack: error?.stack,
          details: error
        });
        
        if (microphoneStream) {
          microphoneStream.getTracks().forEach(track => track.stop());
          setMicrophoneStream(null);
        }
        
        onStatusChange?.(false);
        throw error;
      }
    }, [conversation, microphoneStream, onStatusChange]);

    const endCall = useCallback(async () => {
      if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
        setMicrophoneStream(null);
      }
      await conversation.endSession();
    }, [conversation, microphoneStream]);

    useImperativeHandle(ref, () => ({
      startCall,
      endCall
    }));

    useEffect(() => {
      return () => {
        if (microphoneStream) {
          microphoneStream.getTracks().forEach(track => track.stop());
        }
      };
    }, [microphoneStream]);

    return (
      <div className={`flex flex-col w-full h-full ${interTight.className}`}>
        {/* Messages Section */}
        <div className="flex-1 min-h-0 px-4 py-2">
          <MessageList messages={messages} />
        </div>
        
        {/* Audio Visualizer */}
        <div className="relative mt-4 pb-2 px-4">
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-t from-white/50 to-transparent -z-10" />
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-[300px]">
              <AudioVisualizer 
                isListening={conversation.status === 'connected'} 
                isSpeaking={conversation.isSpeaking}
                microphoneStream={microphoneStream}
                conversation={conversation}
              />
            </div>
            <ConversationControls
              onStart={startCall}
              onStop={endCall}
              isConnected={conversation.status === 'connected'}
              unboundedFont={unbounded.className}
            />
          </div>
        </div>
        
        <audio ref={audioRef} autoPlay playsInline className="hidden" />
      </div>
    );
  }
); 