
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to main page
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/");
    });
    // eslint-disable-next-line
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (mode === "signup") {
      // Sign Up
      const redirectUrl = `${window.location.origin}/auth?mode=confirmed`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { full_name: fullName }
        }
      });
      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }
      // Send confirmation email through edge function (simulate welcome)
      try {
        await fetch(
          `https://gwdxcabvqhhyvqkgcshf.functions.supabase.co/send-confirmation`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: fullName || email,
              email
            })
          }
        );
      } catch {
        // ignore email errors for now
      }
      setConfirmationSent(true);
      toast({
        title: "Confirm your email",
        description: "A confirmation email has been sent. Check your inbox.",
      });
      setLoading(false);
    } else {
      // Login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate("/");
      }
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#161d31] to-black px-3">
      <div className="w-full max-w-md bg-blue-950/80 border border-blue-800 rounded-2xl shadow-lg p-10 z-10">
        <h1 className="font-display text-2xl mb-6 text-blue-100 text-center">
          {mode === "login" ? "Login to Your Account" : "Create Your Account"}
        </h1>
        {confirmationSent ? (
          <div className="text-center text-blue-200 mb-4">
            Please check your email to confirm your account!
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleAuth}>
            {mode === "signup" && (
              <>
                <Label htmlFor="fullname" className="text-blue-100">
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  disabled={loading}
                />
              </>
            )}
            <Label htmlFor="email" className="text-blue-100">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              autoComplete="email"
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Label htmlFor="password" className="text-blue-100">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            {errorMessage && (
              <div className="text-red-400 text-sm text-center">{errorMessage}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 rounded-full py-3 font-semibold text-white mt-2 hover:bg-blue-900 transition"
            >
              {loading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
        )}
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={loading}
            className="text-blue-400 hover:underline"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setErrorMessage("");
              setConfirmationSent(false);
            }}
          >
            {mode === "login"
              ? "New here? Sign Up"
              : "Have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
