import { ChatContainer } from '@/components/ChatContainer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AI Chatbot - Your Intelligent Assistant</title>
        <meta name="description" content="Chat with our AI assistant powered by OpenRouter. Get instant answers to your questions." />
      </Helmet>
      <ChatContainer />
    </>
  );
};

export default Index;
