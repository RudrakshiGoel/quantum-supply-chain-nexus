
import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"profile" | "demo" | null>(null); // Option: create profile OR request demo

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
    highlights: "",
    about: ""
  });

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== "demo2025") {
      setShowPassword(true);
      return;
    }
    if (mode === "profile") {
      // Save profile to localstorage
      window.localStorage.setItem("profileData", JSON.stringify(form));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/profile");
      }, 1200);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/confirmation");
      }, 1200);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#161d31] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-6 py-20 max-w-lg mx-auto z-10">
        <h1 className="font-display text-4xl mb-7 text-white">Contact Us</h1>
        <p className="text-blue-200 mb-7 text-lg">
          Ready to unlock quantum possibilities? Fill out the form below — our team will be in touch within 1 business day to schedule your personalized demo or create a quantum supply chain portfolio.
        </p>
        <div className="flex justify-center gap-2 mb-7">
          <button
            type="button"
            className={`px-4 py-2 rounded-l-full bg-blue-800 text-white font-semibold ${mode === "profile" ? "bg-blue-600" : ""}`}
            onClick={() => setMode("profile")}
          >
            Create Your Profile
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-r-full bg-blue-800 text-white font-semibold ${mode === "demo" ? "bg-blue-600" : ""}`}
            onClick={() => setMode("demo")}
          >
            Request a Demo
          </button>
        </div>
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
            name="message"
            rows={3}
            disabled={success}
            className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Describe your needs or interests"
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          />
          {mode === "profile" && (
            <>
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
              <textarea
                required
                name="highlights"
                rows={2}
                disabled={success}
                className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Portfolio Highlights (awards, skills, projects)"
                value={form.highlights}
                onChange={e => setForm(f => ({ ...f, highlights: e.target.value }))}
              />
            </>
          )}
          <input
            type="password"
            required
            disabled={success}
            className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter access password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {showPassword && password !== "demo2025" && (
            <div className="text-sm text-red-300 animate-fade-in">
              Incorrect password. Try <b>demo2025</b> for demo access.
            </div>
          )}
          <button
            type="submit"
            disabled={!mode || success}
            className={`bg-blue-700 px-7 py-3 rounded-full text-white shadow font-semibold hover:bg-blue-900 transition mt-1 ${!mode ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {mode === "profile" ? "Create My Portfolio" : "Schedule a Demo"}
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
              Thank you! {mode === "profile" ? "Your profile was created." : "Your request was received."} Redirecting...
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
