import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FiGrid, FiUser } from 'react-icons/fi';
import { Message } from '../types/chat';

interface ChatMessageProps {
  msg: Message;
}

export default function ChatMessage({ msg }: ChatMessageProps) {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
      className={`flex gap-4 w-full ${isUser ? 'justify-end flex-row-reverse' : 'justify-start'} py-2`}
    >
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr from-slate-800 to-slate-600 shadow-lg shadow-slate-300">
            <FiUser className="text-base" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-200">
            <FiGrid className="text-base" />
          </div>
        )}
      </div>

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-3xl`}>
        <div className="font-bold text-[12px] uppercase tracking-wider text-slate-400 mb-2 px-1">
          {isUser ? 'Operator' : 'Sasta Agent'}
        </div>
        
        {isUser ? (
          <div className="px-6 py-4 rounded-3xl rounded-tr-sm bg-white border border-slate-100 shadow-sm text-slate-800 text-[15px] font-medium leading-relaxed">
            {msg.content}
          </div>
        ) : (
          <div className="prose prose-slate prose-sm md:prose-base max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:text-slate-100 prose-pre:rounded-2xl prose-pre:shadow-xl prose-a:text-violet-600 px-2">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}