
import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";

export default function Confirmation() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#161d31] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-6 py-32 max-w-lg mx-auto z-10">
        <div className="bg-blue-950/80 rounded-2xl shadow-lg border border-blue-800 p-10 text-center animate-fade-in">
          <h1 className="font-display text-3xl mb-4 text-green-300">Email Confirmation</h1>
          <div className="text-blue-100 text-lg mb-2">
            Thank you for reaching out! We’ve received your request, and an email confirmation has been sent.
          </div>
          <div className="text-blue-400 mt-2">
            Our team will contact you to schedule your demo within 1 business day.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
