'use client';

import { useState, useRef } from 'react';
import { useConversation } from '@11labs/react';
import { ConversationStatus } from '../../components/ConversationStatus';
import { ConversationControls } from '../../components/ConversationControls';
import { unbounded } from '../fonts';

export default function EnglishPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected');
      setIsConnected(true);
    },
    onDisconnect: () => {
      console.log('Disconnected');
      setIsConnected(false);
      setIsSpeaking(false);
      setMicrophoneStream(null);
    },
    onError: (error: string) => {
      console.error('Error:', error);
    },
    onAudioStream: (stream: MediaStream) => {
      console.log('Received audio stream');
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
        audioRef.current.play().catch(console.error);
      }
    }
  });

  const handleStart = async () => {
    try {
      if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
      }
      
      const micStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      setMicrophoneStream(micStream);
      
      await conversation.startSession({
        agentId: '5MXOKiURgOvOvsm4BvL3'
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
        setMicrophoneStream(null);
      }
    }
  };

  const handleStop = async () => {
    if (microphoneStream) {
      microphoneStream.getTracks().forEach(track => track.stop());
      setMicrophoneStream(null);
    }
    await conversation.endSession();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] gap-8">
        <div className="text-center space-y-4">
          <h1 className={`text-4xl sm:text-5xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-blue-500 to-violet-500 ${unbounded.className}`}>
            AI-Powered Real Estate Caller
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the future of real estate communication with our intelligent calling assistant
          </p>
        </div>

        <ConversationStatus 
          status={isConnected ? "Connected" : "Ready to connect"} 
          isSpeaking={isSpeaking} 
        />

        <ConversationControls 
          onStart={handleStart}
          onStop={handleStop}
          isConnected={isConnected}
          unboundedFont={unbounded.className}
        />

        <audio ref={audioRef} autoPlay playsInline className="hidden" />
      </div>
    </main>
  );
} 