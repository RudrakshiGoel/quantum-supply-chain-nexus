
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Send email using the resend edge function
    try {
      const res = await fetch("/functions/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        throw new Error("Sending email failed");
      }
      toast({ title: "Request submitted! We'll be in touch." });
      setEmail("");
      setName("");
      setMessage("");
    } catch (e: any) {
      toast({ title: "Error", description: e.message });
    }

    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Request a Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="rounded border px-3 py-2 bg-background"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="rounded border px-3 py-2 bg-background"
              required
            />
            <textarea
              placeholder="Anything specific you'd like to discuss?"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="rounded border px-3 py-2 min-h-[80px] bg-background"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Request Demo"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
