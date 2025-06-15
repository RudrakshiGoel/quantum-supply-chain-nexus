
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function AIChat() {
  const [user, setUser] = useState<any>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: "user", text: input }]);
    setLoading(true);
    try {
      // Call AI edge function
      const r = await fetch("/functions/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await r.json();
      const reply = data.generatedText || "I couldn't come up with a reply!";
      setMessages(msgs => [...msgs, { sender: "ai", text: reply }]);
    } catch (err: any) {
      toast({ title: "AI error", description: "Error contacting the AI service." });
    }
    setInput("");
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex flex-col gap-6 items-center mt-8">
        <Card className="p-6 text-center">
          <CardTitle>AI Chat</CardTitle>
          <CardContent>
            <p>You must be logged in to access the AI Chat.</p>
            <Button className="mt-3" onClick={() => navigate("/auth")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Chat Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-56 overflow-y-auto flex flex-col gap-2 mb-2 border rounded p-2 bg-background" style={{ minHeight: 160 }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
                <span className={msg.sender === "user" ? "text-blue-700" : "text-pink-700"}>
                  {msg.sender === "user" ? "You: " : "AI: "}
                </span>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="flex gap-2" onSubmit={handleSend}>
            <input
              placeholder="Type your message"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 rounded border p-2 bg-background"
              required
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Sending…" : "Send"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
