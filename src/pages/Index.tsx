import { ChatContainer } from '@/components/ChatContainer';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    document.title = 'AI Chatbot - Your Intelligent Assistant';
  }, []);

  return <ChatContainer />;
};

export default Index;
