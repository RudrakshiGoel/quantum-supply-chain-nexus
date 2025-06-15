import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

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

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const [demoNote, setDemoNote] = useState("");
  const [mode, setMode] = useState<"profile" | "demo" | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const navigate = useNavigate();

  // Load saved profile on mount
  useEffect(() => {
    const profileString = window.localStorage.getItem("profileData");
    if (profileString) {
      setProfile(JSON.parse(profileString));
    }
    // Set initial mode from URL if present (ex: /contact?mode=demo)
    if (window.location.search.includes("mode=demo")) {
      setMode("demo");
    }
  }, []);

  function handleRequestDemo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(true);
    toast({
      title: "Demo Booked!",
      description:
        profile && profile.email
          ? `Your demo is booked. We will contact you at ${profile.email} (simulation only).`
          : "Your demo is booked. We will reach out soon.",
    });
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
        <h1 className="font-display text-4xl mb-7 text-white">Contact Us</h1>
        <p className="text-blue-200 mb-7 text-lg">
          Ready to unlock quantum possibilities? Choose to request a personalized demo or create your quantum supply chain portfolio.
        </p>
        <div className="flex justify-center gap-2 mb-7">
          <button
            type="button"
            className={`px-4 py-2 rounded-l-full bg-blue-800 text-white font-semibold`}
            onClick={() => navigate("/create-profile")}
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
        {mode === "demo" && (
          <form onSubmit={handleRequestDemo} className="bg-blue-950/70 rounded-2xl shadow-lg border border-blue-800 p-8 flex flex-col gap-5">
            {profile ? (
              <>
                <div className="text-blue-200 mb-3">
                  We will use your saved profile info for your demo booking:
                </div>
                <div className="bg-blue-900/30 rounded p-3 mb-2">
                  <div>
                    <span className="font-semibold">Name:</span> {profile.name}
                  </div>
                  <div>
                    <span className="font-semibold">Company:</span> {profile.company}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {profile.email}
                  </div>
                </div>
                <textarea
                  className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Any additional notes or requests for your demo?"
                  value={demoNote}
                  onChange={e => setDemoNote(e.target.value)}
                  rows={3}
                />
              </>
            ) : (
              <>
                <div className="text-blue-200 mb-3">
                  Please fill in your contact info so we can schedule your demo.
                </div>
                <input
                  required
                  name="name"
                  className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Name"
                />
                <input
                  required
                  name="company"
                  className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Company"
                />
                <input
                  required
                  name="email"
                  type="email"
                  className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Work Email"
                />
                <textarea
                  className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Any additional notes or requests for your demo?"
                  value={demoNote}
                  onChange={e => setDemoNote(e.target.value)}
                  rows={3}
                />
              </>
            )}
            <button
              type="submit"
              disabled={success}
              className="bg-blue-700 px-7 py-3 rounded-full text-white shadow font-semibold hover:bg-blue-900 transition mt-1"
            >
              Schedule Demo
            </button>
            <div className="text-xs opacity-60 mt-2">We respect your privacy. Your info is never shared.</div>
            {success && (
              <div className="mt-4 py-3 px-6 rounded-xl bg-green-900/80 text-green-200 shadow animate-fade-in">
                Thank you! Your request was received. Redirecting...
              </div>
            )}
          </form>
        )}
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
