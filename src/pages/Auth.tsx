
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      toast({ title: "Login successful!" });
      navigate("/");
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      }
    });
    if (error) {
      setError(error.message);
    } else {
      toast({ title: "Sign up email sent!" });
    }
    setLoading(false);
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setLoading(true);
    setError(null);
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectUrl }
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded border bg-background mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border bg-background mb-2"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              Log In
            </Button>
          </form>
          <form className="space-y-4 mt-3" onSubmit={handleSignUp}>
            <Button type="submit" className="w-full" variant="secondary" disabled={loading}>
              Sign Up
            </Button>
          </form>
          <div className="flex flex-col gap-2 mt-5">
            <Button
              type="button"
              className="w-full"
              onClick={() => handleOAuth("google")}
              variant="outline"
              disabled={loading}
            >
              Sign in with Google
            </Button>
            <Button
              type="button"
              className="w-full"
              onClick={() => handleOAuth("github")}
              variant="outline"
              disabled={loading}
            >
              Sign in with GitHub
            </Button>
          </div>
          {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
