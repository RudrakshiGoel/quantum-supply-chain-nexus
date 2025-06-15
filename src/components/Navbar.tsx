
import { Link, useLocation } from "react-router-dom";
import { Users, FileText, Search, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Technology", to: "/technology" },
  { label: "Solutions", to: "/solutions" },
  { label: "Success Stories", to: "/success-stories" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
  { label: "Your Profile", to: "/profile" }
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="sticky top-0 z-50 bg-black/95 shadow-lg px-8 py-2 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <span className="font-display text-2xl text-white tracking-tight">Q-OptiChain</span>
        <span className="ml-1 rounded px-2 py-0.5 bg-blue-700 text-xs text-white font-mono">Quantum</span>
      </Link>
      <ul className="flex gap-8 font-sans text-sm">
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
      </ul>
    </nav>
  );
}
