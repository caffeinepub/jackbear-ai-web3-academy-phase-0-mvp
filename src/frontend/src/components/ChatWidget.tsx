import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow-lg hover:shadow-glow-xl transition-all z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-glow-xl z-50 flex flex-col surface-elevated">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-primary/20">
            <div>
              <CardTitle className="text-lg font-display">
                Community Chat
              </CardTitle>
              <CardDescription className="text-xs">
                Connect with fellow learners
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">JACKBEAR.ai</p>
                    <p className="text-sm text-muted-foreground">
                      Welcome to the community! Chat features are coming soon.
                      Stay tuned for updates.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled
                />
                <Button size="icon" onClick={handleSend} disabled>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Chat functionality coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
