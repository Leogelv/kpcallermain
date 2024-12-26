interface ConversationStatusProps {
  status: string;
  isSpeaking: boolean;
}

export function ConversationStatus({ status, isSpeaking }: ConversationStatusProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6 text-white/90 
      backdrop-blur-md bg-white/5 p-4 sm:p-6 rounded-2xl w-full
      border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
      <div className="flex items-center gap-3">
        <span className="text-xl sm:text-2xl animate-pulse">⚡</span>
        <span className="font-medium text-sm sm:text-base">Status: {status}</span>
      </div>
      <div className="hidden sm:block w-px h-6 bg-white/20"></div>
      <div className="flex items-center gap-3">
        <span className="text-xl sm:text-2xl animate-bounce">
          {isSpeaking ? '🗣️' : '👂'}
        </span>
        <span className="font-medium text-sm sm:text-base">
          Agent is {isSpeaking ? 'speaking' : 'listening'}
        </span>
      </div>
    </div>
  );
} 