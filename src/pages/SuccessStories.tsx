
import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";

const simulations = [
  {
    scenario: "Global Route Planning",
    classical: "8 hrs (optimal route calculation)",
    quantum: "3.2 seconds",
    savings: "~99.99% computation time",
  },
  {
    scenario: "Regional Demand Allocation",
    classical: "4,700 ms",
    quantum: "58 ms",
    savings: "81x faster",
  },
  {
    scenario: "Supplier Mix Optimization",
    classical: "1 hr 9 min",
    quantum: "15 seconds",
    savings: "277x faster",
  },
  {
    scenario: "Last-Mile Delivery (NYC)",
    classical: "2.5 min",
    quantum: "0.5 sec",
    savings: "300x faster",
  },
];

export default function SuccessStories() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-blue-950 via-[#181c2d] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-2 py-20 max-w-4xl mx-auto z-10">
        <h1 className="font-display text-4xl mb-7 text-white">Quantum Success Stories</h1>
        <p className="mb-10 text-blue-100 text-lg">
          Real-world scenarios and simulations demonstrate our quantum advantage.
        </p>
        <table className="w-full table-auto border-collapse rounded-xl overflow-hidden text-left shadow-xl mb-10">
          <thead>
            <tr className="bg-blue-900 text-blue-200 uppercase text-xs">
              <th className="p-4">Scenario</th>
              <th className="p-4">Classical<br /> Time</th>
              <th className="p-4">Quantum<br /> Time</th>
              <th className="p-4 text-green-300">Performance Gain</th>
            </tr>
          </thead>
          <tbody>
            {simulations.map((sim, i) => (
              <tr key={sim.scenario} className="even:bg-blue-950/60 odd:bg-blue-950/30 border-b border-blue-900 hover:bg-blue-800/40 transition">
                <td className="p-4 font-semibold">{sim.scenario}</td>
                <td className="p-4">{sim.classical}</td>
                <td className="p-4 text-blue-300 font-semibold">{sim.quantum}</td>
                <td className="p-4 text-green-300">{sim.savings}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-blue-950/70 border border-blue-800 rounded-xl p-8 text-blue-100 text-center">
          <div className="font-bold text-blue-300 mb-3">See our clients’ stories & in-depth technical results on demand.</div>
          <a href="/contact" className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-900 transition">Request Detailed Case Studies</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
