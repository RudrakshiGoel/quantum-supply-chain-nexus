
import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";

export default function Technology() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-black via-[#101b2d] to-slate-900">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-6 py-20 max-w-3xl mx-auto z-10 text-white">
        <h1 className="font-display text-4xl mb-6">Our Technology</h1>
        <p className="mb-8 text-blue-100 text-lg">
          Quantum computing brings a new era of supply chain optimization by solving complex logistical challenges that stump even today’s supercomputers.
        </p>
        <article className="bg-blue-950/70 border border-blue-800 rounded-xl p-7 text-blue-100 shadow-lg">
          <h2 className="font-display text-2xl mb-4 text-blue-300">What is Quantum Computing?</h2>
          <ul className="text-lg list-inside list-disc ml-3 pb-6 marker:text-blue-400">
            <li>Processes information in fundamentally new ways using quantum bits (qubits) — not just 0s and 1s, but many states at once.</li>
            <li>Finds optimal solutions fast in giant, tangled networks like global supply chains.</li>
            <li>Solves problems where classical computers get stuck guessing for days or years.</li>
          </ul>
          <h2 className="font-display text-2xl mb-4 text-blue-300">Quantum in the Supply Chain</h2>
          <ol className="list-decimal ml-4 text-blue-100 marker:text-blue-400 font-semibold mb-4">
            <li>Inventory Optimization</li>
            <li>Demand Forecasting</li>
            <li>Delivery Route Planning</li>
            <li>Supplier Network Analysis</li>
          </ol>
          <p>
            Quantum algorithms <span className="text-blue-300 font-bold">exponentially accelerate</span> crucial decision making for enterprises — shrinking costs, shortening lead times, and boosting adaptability, all with provable results.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
