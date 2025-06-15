
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

type Announcement = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth state for allowing post
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    setLoading(true);
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load announcements" });
      setAnnouncements([]);
    } else {
      setAnnouncements(data as Announcement[]);
    }
    setLoading(false);
  }

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setPosting(true);
    const { data: myProfile } = await supabase.auth.getUser();
    if (!myProfile?.user) {
      toast({ title: "Please log in to post." });
      setPosting(false);
      return navigate("/auth");
    }
    const { data, error } = await supabase
      .from("announcements")
      .insert([{ content: input, user_id: myProfile.user.id }])
      .select();
    if (error) {
      toast({ title: "Error posting", description: error.message });
    } else {
      toast({ title: "Announcement posted!" });
      setAnnouncements([...(data as Announcement[]), ...announcements]);
      setInput("");
    }
    setPosting(false);
  }

  return (
    <div className="max-w-lg mx-auto mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Announcements Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2 mb-4" onSubmit={handlePost}>
            <input
              type="text"
              placeholder="Share an announcement..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 p-2 border rounded bg-background"
              disabled={!user}
              required
            />
            <Button type="submit" disabled={!user || posting}>
              Post
            </Button>
          </form>
          {loading ? (
            <p>Loading announcements…</p>
          ) : (
            <ul>
              {announcements.map((a) => (
                <li key={a.id} className="mb-4 border-b pb-2">
                  <span className="block text-md">{a.content}</span>
                  <span className="block text-xs text-gray-400">
                    Posted at {new Date(a.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
              {announcements.length === 0 && (
                <li className="text-gray-400">No announcements yet.</li>
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
