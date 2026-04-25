import { useState } from 'react';
import toast from 'react-hot-toast';
import { Message } from '../types/chat';

export const useChatStream = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      if (!response.body) throw new Error('No stream available');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.replace('data: ', ''));
                if (data.error) {
                  toast.error(data.error);
                  break;
                }
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastIndex = updated.length - 1;
                  updated[lastIndex] = {
                    ...updated[lastIndex],
                    content: updated[lastIndex].content + data.text,
                  };
                  return updated;
                });
              } catch (e) {}
            }
          }
        }
      }
      
      // TRIGGER THE SUCCESS TOAST WHEN STREAM FINISHES
      toast.success('Execution Complete', {
        style: { borderRadius: '100px', background: '#fff', color: '#7c3aed', fontWeight: 'bold' }
      });

    } catch (error) {
      console.error('Stream error:', error);
      toast.error('System failure.');
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
};