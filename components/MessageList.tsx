import { motion } from 'framer-motion';
import { Message } from '../types/conversation';
import { useRef, useEffect } from 'react';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const isUserMessage = (sender?: string) => sender === 'user' || sender === 'human';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [messages]);
  
  return (
    <div 
      ref={scrollRef}
      className="w-full h-[200px] overflow-x-auto overflow-y-hidden relative
        scrollbar-thin scrollbar-track-white/20 scrollbar-thumb-gray-300/50 scroll-smooth"
    >
      <div className="absolute top-0 left-0 bottom-0 flex items-center gap-4 px-4 min-w-max">
        {messages.length === 0 ? (
          <div className="h-[150px] w-[300px] flex items-center justify-center bg-white/40 rounded-2xl">
            <p className="text-gray-500 text-sm">Начните разговор...</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-[300px] h-[150px] shrink-0"
            >
              <div className={`relative group h-full bg-white/70 backdrop-blur-sm p-4 rounded-2xl
                shadow-[0_4px_16px_0_rgba(31,38,135,0.07)] border border-white/50
                ${isUserMessage(message.sender) 
                  ? 'bg-gradient-to-br from-blue-600/10 to-violet-600/10' 
                  : ''}`}
              >
                {/* Sender Icon */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center
                    ${isUserMessage(message.sender)
                      ? 'bg-blue-600/10' 
                      : 'bg-violet-600/10'}`}
                  >
                    <span className="text-sm">
                      {isUserMessage(message.sender) ? '👤' : '🤖'}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {isUserMessage(message.sender) ? 'Вы' : 'ЛеонИИд'}
                  </span>
                </div>

                {/* Message Text */}
                <div className="h-[80px] overflow-y-auto scrollbar-thin scrollbar-track-white/20 scrollbar-thumb-gray-300/50">
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                </div>

                {/* Timestamp */}
                <div className="absolute bottom-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-gray-400">
                    {message.timestamp?.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
} 