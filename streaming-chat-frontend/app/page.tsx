'use client';

import { useState, useRef, useEffect } from 'react';
import { FiCpu, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';

import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { useChatStream } from '../hooks/useChatStream';

export default function ChatUI() {
  const { messages, sendMessage, isLoading } = useChatStream();
  const [input, setInput] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLElement>(null);
  const isAutoScrollEnabled = useRef(true);

  // TRIGGER THE WELCOME TOAST ON LOAD
  useEffect(() => {
    toast('Welcome back, Operator.', {
      icon: '👋',
      style: { borderRadius: '100px', background: '#0f172a', color: '#fff' }
    });
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    isAutoScrollEnabled.current = isNearBottom;
  };

  useEffect(() => {
    if (isAutoScrollEnabled.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return toast.error('Command sequence empty.');
    if (isLoading) return;
    
    isAutoScrollEnabled.current = true;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 selection:bg-violet-200 selection:text-violet-900">
      <Header />

      <main 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 w-full flex justify-center relative"
      >
        <div className="w-full max-w-4xl flex flex-col pt-12">
          
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20 w-full animate-in zoom-in-95 duration-700">
              <div className="relative mb-8 group">
                {/* Crazy animated glowing orb */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity duration-700 animate-pulse"></div>
                <div className="relative bg-white text-violet-600 w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl border border-violet-100 transform group-hover:scale-105 transition-transform duration-300">
                  <FiCpu className="text-4xl" />
                </div>
              </div>

              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-violet-800 to-slate-900 mb-4">
                Sasta AI Core
              </h2>
              <p className="text-slate-500 text-center max-w-lg mb-12 text-[15px] leading-relaxed font-medium">
                Initialize your agentic AI platform. Enter a command to begin generating scalable operational outputs.
              </p>

              <div className="w-full max-w-2xl bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xl shadow-slate-200/50 mb-6">
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Architect microservices",
                    "Optimize LangGraph agents",
                    "Generate vector schemas"
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(suggestion)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 text-slate-700 rounded-full text-sm font-semibold hover:border-violet-400 hover:text-violet-700 hover:shadow-md hover:shadow-violet-100 transition-all active:scale-95"
                    >
                      <FiZap className="text-violet-500" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-8">
            {messages.map((msg, index) => (
              <ChatMessage key={index} msg={msg} />
            ))}
            <div className="h-40 w-full shrink-0" />
            <div ref={messagesEndRef} />
          </div>

        </div>
      </main>

      <ChatInput 
        input={input} 
        setInput={setInput} 
        handleSubmit={handleSubmit} 
        isLoading={isLoading} 
      />
    </div>
  );
}