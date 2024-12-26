import { Conversation, ConversationHandle } from '../../../components/Conversation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Unbounded } from 'next/font/google';
import { useState, useRef } from 'react';

const unbounded = Unbounded({ subsets: ['latin'] });

export default function HeroSection() {
  const [isConnected, setIsConnected] = useState(false);
  const conversationRef = useRef<ConversationHandle>(null);

  const startConversation = async () => {
    if (!isConnected && conversationRef.current?.startCall) {
      try {
        await conversationRef.current.startCall();
      } catch (error) {
        console.error('Failed to start conversation in HeroSection:', error);
        setIsConnected(false);
      }
    }
  };

  const stopConversation = async () => {
    if (isConnected && conversationRef.current?.endCall) {
      await conversationRef.current.endCall();
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full min-h-[80vh] max-w-[1200px] rounded-[1.5rem] 
          bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
          border border-white/50 overflow-hidden"
      >
        <div className="w-full h-full flex flex-col lg:flex-row">
          {/* Left side - Voice Agent */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-1/2 lg:min-h-[90vh] p-6 lg:p-8 flex flex-col"
          >
            {/* Title Section */}
            <div className="mb-6 lg:mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`${unbounded.className} text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold`}
              >
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Автоматизируйте
                </span>
                <br />
                <span className="text-gray-800">ваш кол-центр с помощью ИИ</span>
              </motion.h1>

            
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-600 mt-3 text-sm sm:text-lg"
              >
                Наше решение уже меняет индустрию — узнайте как
              </motion.p>
            </div>

            {/* Conversation Section - Hidden on mobile, shown on desktop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-0 relative hidden lg:block"
            >
              <Conversation ref={conversationRef} onStatusChange={setIsConnected} />
            </motion.div>
          </motion.div>

          {/* Right side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full lg:w-1/2 lg:min-h-[90vh] p-6 lg:p-8 lg:border-l border-t lg:border-t-0 border-white/50
              bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm"
          >
            <div className="h-full flex flex-col">
              {/* Image Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="relative w-full aspect-square max-w-[400px] mx-auto mb-6 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 
                  rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full rounded-2xl overflow-hidden 
                  shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] border border-white/50"
                >
                  <Image
                    src="/generated-images/aicaller.png"
                    alt="AI Call Center"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </motion.div>

              {/* Features Section */}
              <div className="flex-1">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center mb-4"
                >
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-violet-600 rounded-full mr-3"></div>
                  <h2 className={`${unbounded.className} text-lg sm:text-2xl font-semibold text-gray-800`}>Что вы получите:</h2>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="space-y-3"
                >
                  {keyPoints.map((point, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                      className="group bg-white/50 p-4 rounded-xl backdrop-blur-sm 
                        border border-white/50 hover:border-blue-300/50
                        shadow-[0_4px_16px_0_rgba(31,38,135,0.07)]
                        transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]
                        hover:bg-white/70"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 
                          mt-2 group-hover:scale-125 transition-transform"></div>
                        <div>
                          <span className={`${unbounded.className} font-semibold text-gray-800 block mb-1 text-xs sm:text-base`}>
                            {point.title}
                          </span>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mobile Conversation Section */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-8 min-h-[300px] relative lg:hidden"
                >
                  <Conversation ref={conversationRef} onStatusChange={setIsConnected} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

const keyPoints = [
  {
    title: "Интеллектуальный подход к звонкам",
    description: "Умная система анализирует и обрабатывает каждый звонок индивидуально"
  },
  {
    title: "Экономия ресурсов и времен��",
    description: "Сокращение затрат на обработку звонков до 70%"
  },
  {
    title: "Мгновенные ответы",
    description: "Клиенты получают ответы моментально, без ожидания в очереди"
  }
];