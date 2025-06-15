
import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const HIGHLIGHTS_OPTIONS = [
  "Supply Chain Optimization",
  "Quantum Computing Projects",
  "Industry Award",
  "Certified SCM Professional",
  "Experience with Large Datasets",
  "Implementation of AI/ML",
  "Cost Reduction Initiatives",
  "Process Automation",
];

function isValidPassword(password: string): boolean {
  // Exactly 9 characters, at least 1 uppercase, 1 lowercase, and 1 special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[A-Za-z\d\W_]{9}$/;
  return regex.test(password);
}

export default function CreateProfile() {
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
    highlights: [] as string[],
    about: ""
  });

  const navigate = useNavigate();

  function handleHighlightToggle(item: string) {
    setForm(f => ({
      ...f,
      highlights: f.highlights.includes(item)
        ? f.highlights.filter(i => i !== item)
        : [...f.highlights, item]
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidPassword(password)) {
      setShowPassword(true);
      toast({
        title: "Invalid Password",
        description: "Password must be 9 characters, include 1 uppercase, 1 lowercase, and 1 special character.",
        variant: "destructive"
      });
      return;
    }

    if (form.highlights.length === 0) {
      toast({
        title: "Add Highlights",
        description: "Select at least one highlight for your portfolio.",
        variant: "destructive"
      });
      return;
    }

    window.localStorage.setItem("profileData", JSON.stringify(form));

    // Simulate sending an email to the registered address
    toast({
      title: "Portfolio Sent!",
      description: `Your profile was sent to ${form.email} (simulation only).`,
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("/confirmation");
    }, 1200);
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#161d31] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-6 py-20 max-w-lg mx-auto z-10">
        <h1 className="font-display text-4xl mb-7 text-white">Create Your Profile</h1>
        <p className="text-blue-200 mb-7 text-lg">
          Build your quantum supply chain portfolio. Fill out the form, and we will send your profile to the provided work email (simulated).
        </p>
        <form onSubmit={handleSubmit} className="bg-blue-950/70 rounded-2xl shadow-lg border border-blue-800 p-8 flex flex-col gap-5">
          <input
            required
            name="name"
            disabled={success}
            className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
          <input
            required
            name="company"
            disabled={success}
            className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Company"
            value={form.company}
            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
          />
          <input
            required
            name="email"
            type="email"
            disabled={success}
            className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Work Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
          <textarea
            required
            name="about"
            rows={2}
            disabled={success}
            className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Short About You or Company"
            value={form.about}
            onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
          />
          <div>
            <Label className="text-blue-100 mb-2 block font-semibold">Portfolio Highlights</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-2">
              {HIGHLIGHTS_OPTIONS.map(option => (
                <label key={option} className="flex items-center gap-2 bg-blue-900/50 rounded px-2 py-1 hover:bg-blue-900/70 transition cursor-pointer">
                  <Checkbox
                    checked={form.highlights.includes(option)}
                    onCheckedChange={() => handleHighlightToggle(option)}
                    disabled={success}
                    id={option}
                  />
                  <span className="text-blue-50 text-sm">{option}</span>
                </label>
              ))}
            </div>
            {form.highlights.length === 0 && (
              <div className="text-xs text-blue-400">Select at least one highlight to showcase your profile.</div>
            )}
          </div>
          <textarea
            required
            name="message"
            rows={3}
            disabled={success}
            className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Describe your needs or interests"
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          />
          <input
            type="password"
            required
            disabled={success}
            className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter access password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {showPassword && !isValidPassword(password) && (
            <div className="text-sm text-red-300 animate-fade-in">
              Invalid password. Must be 9 characters, including uppercase, lowercase, and a special character.
            </div>
          )}
          <button
            type="submit"
            disabled={success || form.highlights.length === 0}
            className={`bg-blue-700 px-7 py-3 rounded-full text-white shadow font-semibold hover:bg-blue-900 transition mt-1 ${(form.highlights.length === 0) ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            Create My Portfolio & Book Demo
          </button>
          <div className="text-xs opacity-60 mt-2">We respect your privacy. Your info is never shared.</div>
        </form>
        <div className="mt-8 w-full flex flex-col gap-4 items-center">
          <div className="w-full bg-blue-950/70 border border-blue-800 rounded-xl p-5 text-blue-100 text-center">
            <div>
              <span role="img" aria-label="Calendar" className="inline-block mr-1">📅</span>
              <strong>Calendar integration coming soon.</strong>
            </div>
            <div className="text-blue-400 opacity-90 mt-1">
              Book a meeting directly with our quantum supply chain experts.
            </div>
          </div>
          {success && (
            <div className="mt-4 py-3 px-6 rounded-xl bg-green-900/80 text-green-200 shadow animate-fade-in">
              Thank you! Your profile was created and demo booked. Redirecting...
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
