import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import type { Message } from '@/hooks/useChat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-accent text-accent-foreground'
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div
        className={cn(
          'flex max-w-[75%] flex-col gap-1 rounded-2xl px-4 py-3',
          isUser 
            ? 'bg-primary text-primary-foreground rounded-br-sm' 
            : 'bg-card text-card-foreground border border-border rounded-bl-sm'
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
}
