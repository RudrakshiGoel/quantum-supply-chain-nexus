import { Link, useLocation } from "react-router-dom";
import { Users, FileText, Search, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Technology", to: "/technology" },
  { label: "Solutions", to: "/solutions" },
  { label: "Success Stories", to: "/success-stories" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
  { label: "Your Profile", to: "/profile" }
];

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => setUser(session?.user ?? null)
    );

    // Get initial user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="w-full px-6 py-3 flex justify-between items-center bg-blue-950/80 border-b border-blue-800 z-50">
      <Link to="/" className="flex items-center gap-2">
        <span className="font-display text-2xl text-white tracking-tight">Q-OptiChain</span>
        <span className="ml-1 rounded px-2 py-0.5 bg-blue-700 text-xs text-white font-mono">Quantum</span>
      </Link>
      <div className="flex items-center gap-6">
        {navLinks.map(({ label, to }) => (
          <li key={label}>
            <Link
              to={to}
              className={cn(
                "uppercase px-2 py-1 rounded transition text-blue-200 hover:text-blue-400",
                location.pathname === to && "text-white bg-blue-900"
              )}
            >
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/contact" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-base shadow hover:bg-blue-700 transition font-semibold flex items-center gap-2">
            Schedule a Demo
            <ArrowRight size={18} />
          </Link>
        </li>
        {user ? (
          <>
            <span className="text-blue-200 text-sm">
              {user.email}
            </span>
            <button
              className="bg-blue-700 rounded-full px-5 py-2 font-semibold text-white hover:bg-blue-900 transition"
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
                if (location.pathname !== "/") navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-blue-700 rounded-full px-5 py-2 font-semibold text-white hover:bg-blue-900 transition"
            onClick={() => navigate("/auth")}
          >
            Login / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
}
