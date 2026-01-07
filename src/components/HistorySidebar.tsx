import { MessageSquare, Plus, Clock } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  isActive: boolean;
}

interface HistorySidebarProps {
  sessions: ChatSession[];
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
}

export function HistorySidebar({ sessions, onNewChat, onSelectSession }: HistorySidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-3">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <span className="text-sm font-semibold text-foreground">History</span>
          )}
          <SidebarTrigger className="h-8 w-8" />
        </div>
        <Button
          onClick={onNewChat}
          size="sm"
          className="w-full mt-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Recent Chats
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {sessions.length === 0 ? (
                <div className="px-3 py-6 text-center text-muted-foreground text-xs">
                  {!isCollapsed && "No chat history yet"}
                </div>
              ) : (
                sessions.map((session) => (
                  <SidebarMenuItem key={session.id}>
                    <SidebarMenuButton
                      onClick={() => onSelectSession(session.id)}
                      className={`w-full justify-start ${
                        session.isActive 
                          ? 'bg-accent text-accent-foreground' 
                          : 'hover:bg-muted/50'
                      }`}
                      tooltip={session.title}
                    >
                      <MessageSquare className="h-4 w-4 shrink-0" />
                      {!isCollapsed && (
                        <span className="ml-2 truncate text-sm">{session.title}</span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
