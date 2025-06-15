import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FuturisticBackground from "@/components/FuturisticBackground";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ProfileData = {
  name: string;
  company: string;
  email: string;
  message: string;
  highlights: string[]; // changed to array of string
  about: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load from localStorage if present
    const stringData = window.localStorage.getItem("profileData");
    if (stringData) {
      setProfile(JSON.parse(stringData));
    }
  }, []);

  if (!profile) {
    return (
      <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#191f2e] via-[#0d1833] to-black">
        <FuturisticBackground />
        <Navbar />
        <main className="flex-1 px-4 py-32 flex flex-col items-center justify-center">
          <div className="bg-blue-950/80 rounded-2xl shadow-lg border border-blue-800 p-10 text-center w-full max-w-xl">
            <div className="text-blue-200 text-xl mb-4">No profile found.</div>
            <button
              className="bg-blue-700 text-white rounded-full px-8 py-3 font-semibold mt-2 hover:bg-blue-900"
              onClick={() => navigate("/contact")}
            >
              Create Your Profile
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#191f2e] via-[#0d1833] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-4 py-16 flex flex-col items-center">
        <section className="w-full max-w-2xl bg-blue-950/80 border border-blue-800 rounded-xl px-10 py-12 mb-8 shadow-lg">
          <h1 className="font-display text-3xl text-blue-200 mb-2">Your Quantum Supply Chain Portfolio</h1>
          <h2 className="text-lg text-blue-400 mb-6 italic">{profile.company}</h2>
          <div className="mb-3">
            <span className="block text-blue-100 font-semibold">Name:</span>
            <span className="block text-blue-200">{profile.name}</span>
          </div>
          <div className="mb-3">
            <span className="block text-blue-100 font-semibold">Work Email:</span>
            <span className="block text-blue-200">{profile.email}</span>
          </div>
          <div className="mb-3">
            <span className="block text-blue-100 font-semibold">About:</span>
            <span className="block text-blue-200">{profile.about}</span>
          </div>
          <div className="mb-4">
            <span className="block text-blue-100 font-semibold">Portfolio Highlights:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {(profile.highlights && profile.highlights.length > 0) ? (
                profile.highlights.map((item, i) => (
                  <span key={i} className="bg-blue-700/80 px-3 py-1 rounded-full text-blue-50 text-xs font-semibold shadow border border-blue-600">{item}</span>
                ))
              ) : (
                <span className="block text-blue-300">No highlights selected.</span>
              )}
            </div>
          </div>
          <div>
            <span className="block text-blue-100 font-semibold">Message (Interests):</span>
            <span className="block text-blue-200">{profile.message}</span>
          </div>
        </section>
        <div className="flex gap-4">
          <button
            className="bg-blue-700 text-white rounded-full px-8 py-3 font-semibold hover:bg-blue-900"
            onClick={() => navigate("/contact?mode=demo")}
          >
            Request Demo
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
