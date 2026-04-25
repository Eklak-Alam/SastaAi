import { FiSend, FiCornerUpLeft } from 'react-icons/fi';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function ChatInput({ input, setInput, handleSubmit, isLoading }: ChatInputProps) {
  return (
    <footer className="fixed bottom-0 w-full z-40 p-6 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent flex justify-center pointer-events-none">
      {/* Pointer events none on the footer, but auto on the form so you can click through the gradient */}
      <form onSubmit={handleSubmit} className="w-full max-w-4xl relative flex items-center pointer-events-auto group">
        
        {/* The Glowing Animated Border Wrapper */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 rounded-full opacity-20 group-hover:opacity-50 blur-sm transition-opacity duration-500"></div>
        
        <div className="relative flex items-center w-full bg-white/90 backdrop-blur-xl border border-white rounded-full shadow-2xl shadow-slate-300/50">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Command the agent..."
            className="w-full bg-transparent pl-8 pr-40 py-5 text-slate-800 font-medium placeholder-slate-400 focus:outline-none text-[15px]"
            disabled={isLoading}
          />
          
          <div className="absolute right-2 flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-400 font-bold mr-2">
              <FiCornerUpLeft /> Execute
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-4 text-white bg-violet-600 rounded-full hover:bg-violet-700 shadow-lg shadow-violet-500/30 transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FiSend className="text-xl translate-x-[1px] translate-y-[1px]" />
              )}
            </button>
          </div>
        </div>
      </form>
    </footer>
  );
}