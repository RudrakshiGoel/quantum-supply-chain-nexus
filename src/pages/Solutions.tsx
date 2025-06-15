
import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";

const solutions = [
  {
    title: "Inventory Management",
    desc: "Quantum-powered models identify optimal inventory levels across dynamic, distributed warehouses. Minimize waste while maximizing fill rates.",
  },
  {
    title: "Last-Mile Delivery",
    desc: "Solve the hardest routing puzzles instantly. Quantum logistics reduces travel time and costs, even with shifting addresses and time windows.",
  },
  {
    title: "Demand Forecasting",
    desc: "Quantum-enhanced forecasting detects subtle patterns and adapts instantly — improving demand prediction for all your SKUs.",
  },
  {
    title: "Supplier Optimization",
    desc: "Analyze thousands of supplier networks and scenarios. Achieve robust, cost-effective sourcing, even when markets shift abruptly.",
  },
];

export default function Solutions() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#122148] via-[#072854] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-2 py-20 max-w-5xl mx-auto z-10">
        <h1 className="font-display text-4xl mb-6 text-white">Enterprise Solutions</h1>
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {solutions.map((sol) => (
            <div key={sol.title} className="bg-blue-950/70 border border-blue-800 rounded-2xl p-7 shadow-lg hover:scale-105 transition-transform">
              <h2 className="font-display text-2xl text-blue-300 mb-2">{sol.title}</h2>
              <p className="text-blue-100">{sol.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
