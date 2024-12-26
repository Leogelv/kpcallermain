import { motion } from 'framer-motion';

interface ConversationControlsProps {
  onStart: () => void;
  onStop: () => void;
  isConnected: boolean;
  unboundedFont: string;
}

export function ConversationControls({ onStart, onStop, isConnected, unboundedFont }: ConversationControlsProps) {
  return (
    <div className="flex gap-3 w-full max-w-[400px]">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={!isConnected ? onStart : undefined}
        className={`flex-1 h-12 rounded-xl font-medium text-sm flex items-center justify-center gap-2 
          transition-all duration-300 ${unboundedFont}
          ${!isConnected ? 
            'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30' : 
            'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
      >
        <svg 
          viewBox="0 0 24 24" 
          className={`w-5 h-5 ${!isConnected ? 'fill-current' : 'fill-gray-400'}`}
        >
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
        </svg>
        Начать Звонок
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={isConnected ? onStop : undefined}
        className={`flex-1 h-12 rounded-xl font-medium text-sm flex items-center justify-center gap-2
          border transition-all duration-300 ${unboundedFont}
          ${isConnected ? 
            'border-red-200 bg-white/80 backdrop-blur-sm text-red-500 hover:bg-red-50' : 
            'border-gray-200 bg-white/50 text-gray-400 cursor-not-allowed'}`}
      >
        <svg 
          viewBox="0 0 24 24" 
          className={`w-5 h-5 ${isConnected ? 'fill-red-500' : 'fill-gray-400'}`}
        >
          <path d="M12,9C10.4,9 8.85,9.25 7.4,9.72V12.82C7.4,13.22 7.17,13.56 6.84,13.72C5.86,14.21 4.97,14.84 4.17,15.57C4,15.75 3.75,15.86 3.5,15.86C3.2,15.86 2.95,15.74 2.77,15.56L0.29,13.08C0.11,12.9 0,12.65 0,12.38C0,12.1 0.11,11.85 0.29,11.67C3.34,8.77 7.46,7 12,7C16.54,7 20.66,8.77 23.71,11.67C23.89,11.85 24,12.1 24,12.38C24,12.65 23.89,12.9 23.71,13.09L21.23,15.56C21.05,15.74 20.8,15.86 20.5,15.86C20.25,15.86 20,15.75 19.82,15.57C19.03,14.84 18.14,14.21 17.16,13.72C16.83,13.56 16.6,13.22 16.6,12.82V9.72C15.15,9.25 13.6,9 12,9Z" />
        </svg>
        Положить трубку
      </motion.button>
    </div>
  );
} 