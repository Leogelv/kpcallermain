'use client';

import { useState, useRef, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { ConversationStatus } from '../../components/ConversationStatus';
import { ConversationControls } from '../../components/ConversationControls';
import { unbounded } from '../fonts';

interface Message {
  text: string;
  source: 'user' | 'agent';
  timestamp: Date;
}

type TabType = 'voice' | 'avatar';

export default function PressPage() {
  const [activeTab, setActiveTab] = useState<TabType>('voice');
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [didScriptLoaded, setDidScriptLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Загружаем D-ID скрипт при переключении на вкладку аватара
  useEffect(() => {
    if (activeTab === 'avatar' && !didScriptLoaded) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://agent.d-id.com/v2/index.js';
      script.setAttribute('data-mode', 'full');
      script.setAttribute('data-client-key', 'YXV0aDB8Njg3OGVmYjBhOWEzMjYwNjcyODFkMzJiOjgwellJWjhlVVZJLTdxRXJxU25tZQ==');
      script.setAttribute('data-agent-id', 'v2_agt_Qm0aqISO');
      script.setAttribute('data-name', 'did-agent');
      script.setAttribute('data-monitor', 'true');
      script.setAttribute('data-target-id', 'did-agent-container');
      
      document.head.appendChild(script);
      setDidScriptLoaded(true);

      return () => {
        // Очищаем скрипт при размонтировании
        const existingScript = document.head.querySelector('script[src="https://agent.d-id.com/v2/index.js"]');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [activeTab, didScriptLoaded]);

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
    onMessage: (message: any) => {
      console.log('Message received:', message);
      setMessages(prev => [...prev, {
        text: message.message || message.text || '',
        source: (message.source || message.role || 'agent') as 'user' | 'agent',
        timestamp: new Date()
      }]);
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
      setMessages([]);
      
      await conversation.startSession({
        agentId: 'agent_01jzw8s6czf1zbqzy986tsygq2'
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

  const TabButton = ({ tab, label, isActive, onClick }: { 
    tab: TabType; 
    label: string; 
    isActive: boolean; 
    onClick: () => void; 
  }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg'
          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] gap-8">
        <div className="text-center space-y-4">
          <h1 className={`text-4xl sm:text-5xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-blue-500 to-violet-500 ${unbounded.className}`}>
            ИИ Пресс-атташе МЭ РК
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Официальный ИИ-представитель Министерства энергетики Республики Казахстан
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4 text-sm sm:text-base text-gray-400">
            <span className="flex items-center gap-2">
              <span className="text-blue-500">📢</span> Официальные заявления
            </span>
            <span className="hidden sm:block text-gray-600">•</span>
            <span className="flex items-center gap-2">
              <span className="text-violet-500">📊</span> Актуальная статистика ТЭК
            </span>
            <span className="hidden sm:block text-gray-600">•</span>
            <span className="flex items-center gap-2">
              <span className="text-blue-500">🏛️</span> Проверенная информация
            </span>
          </div>
        </div>

        {/* Вкладки */}
        <div className="flex gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
          <TabButton
            tab="voice"
            label="🎤 Голосовой ИИ"
            isActive={activeTab === 'voice'}
            onClick={() => setActiveTab('voice')}
          />
          <TabButton
            tab="avatar"
            label="👤 ИИ-аватар"
            isActive={activeTab === 'avatar'}
            onClick={() => setActiveTab('avatar')}
          />
        </div>

        {/* Контент голосового ИИ */}
        {activeTab === 'voice' && (
          <>
            <ConversationStatus 
              status={isConnected ? "Подключено" : "Готов к подключению"} 
              isSpeaking={isSpeaking} 
            />

            <ConversationControls 
              onStart={handleStart}
              onStop={handleStop}
              isConnected={isConnected}
              unboundedFont={unbounded.className}
            />

            {/* Messages List */}
            {messages.length > 0 && (
              <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <h3 className="text-lg font-semibold mb-4 text-center">Лента сообщений</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.source === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.source === 'user' 
                          ? 'bg-blue-600 text-white ml-4' 
                          : 'bg-gray-700 text-gray-100 mr-4'
                      }`}>
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('ru-RU', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <audio ref={audioRef} autoPlay playsInline className="hidden" />
          </>
        )}

        {/* Контент ИИ-аватара */}
        {activeTab === 'avatar' && (
          <div className="w-full max-w-2xl">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <h3 className="text-lg font-semibold mb-4 text-center">ИИ-аватар пресс-секретаря</h3>
              <div className="text-center text-gray-300 mb-4">
                Интерактивный визуальный помощник для официального общения
              </div>
              
              {/* Контейнер для D-ID аватара */}
              <div 
                id="did-agent-container" 
                className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-gray-600"
              >
                {!didScriptLoaded ? (
                  <div className="text-gray-400">Загрузка ИИ-аватара...</div>
                ) : (
                  <div className="text-gray-400">ИИ-аватар готов к работе</div>
                )}
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-400">
                Нажмите на аватар для начала беседы
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 