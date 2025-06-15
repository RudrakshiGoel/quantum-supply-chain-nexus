
import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Contact() {
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5500);
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#161d31] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-6 py-20 max-w-lg mx-auto z-10">
        <h1 className="font-display text-4xl mb-7 text-white">Contact Us</h1>
        <p className="text-blue-200 mb-7 text-lg">
          Ready to unlock quantum possibilities? Fill out the form below — our team will be in touch within 1 business day to schedule your personalized demo.
        </p>
        <form onSubmit={handleSubmit} className="bg-blue-950/70 rounded-2xl shadow-lg border border-blue-800 p-8 flex flex-col gap-5">
          <input required name="name" className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300" placeholder="Name" />
          <input required name="company" className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300" placeholder="Company" />
          <input required name="email" type="email" className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300" placeholder="Work Email" />
          <textarea required name="message" rows={5} className="rounded px-4 py-3 bg-blue-900/70 border border-blue-600 text-white outline-none focus:ring-2 focus:ring-blue-300" placeholder="Describe your needs or interests"></textarea>
          <button type="submit" className="bg-blue-700 px-7 py-3 rounded-full text-white shadow font-semibold hover:bg-blue-900 transition mt-1">
            Schedule a Demo
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
              Thank you! Your request was received. We’ll reach out soon.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
