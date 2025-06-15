
import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";
import { useState } from "react";
import SolutionDialog from "@/components/SolutionDialog";

const solutions = [
  {
    title: "Inventory Management",
    desc: "Quantum-powered models identify optimal stock levels in dynamic, distributed warehouses.",
    example: "Warehouse A reduced stockouts by 34% using real-time quantum inventory balancing based on live sales and weather events."
  },
  {
    title: "Last-Mile Delivery",
    desc: "Solve the hardest routing puzzles instantly. Reduce travel time and costs, even with shifting addresses.",
    example: "In NYC, dynamic quantum routing saved 15% travel distance and beat classical algorithms during traffic surges."
  },
  {
    title: "Demand Forecasting",
    desc: "Quantum-enhanced forecasting detects subtle demand patterns — better predictions for all SKUs.",
    example: "SKU ABC's forecast error dropped from 17% to 5.8% in a live pilot, improving fulfilment and cutting waste."
  },
  {
    title: "Supplier Optimization",
    desc: "Analyze thousands of supplier networks and scenarios in seconds.",
    example: "After a supplier disruption, quantum-optimized reallocation reduced raw material costs by 8% for a manufacturer."
  },
  {
    title: "Production Scheduling",
    desc: "Sequence jobs and lines at scale, factoring constraints classical models struggle with.",
    example: "A chemicals plant improved throughput by 21% after quantum-based schedule optimization."
  },
  {
    title: "Network Design",
    desc: "Design resilient, cost-effective logistics networks quickly — even for volatile global environments.",
    example: "A global retailer cut logistics spend by \$2.5M using quantum simulations for facility placement."
  },
  {
    title: "Risk Mitigation",
    desc: "Run thousands of 'what-if' scenarios to proactively spot and manage supply chain risks.",
    example: "In a test, quantum optimization helped avoid \$700K of loss during a simulated port closure event."
  },
  {
    title: "Sustainability Analytics",
    desc: "Optimize for emissions, costs, or both — quantifiably improving ESG performance.",
    example: "Carbon output in a food distributor's network was reduced by 12% via quantum-powered transport rebalancing."
  }
];

export default function Solutions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#122148] via-[#072854] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-2 py-20 max-w-6xl mx-auto z-10">
        <h1 className="font-display text-4xl mb-6 text-white">Enterprise Solutions</h1>
        <p className="mb-6 text-blue-200 text-lg text-center max-w-3xl mx-auto">
          Explore diverse use cases powered by quantum logistics. Click a solution to test an interactive example.
        </p>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 mt-8">
          {solutions.map((sol, i) => (
            <button
              key={sol.title}
              onClick={() => setOpenIndex(i)}
              className="bg-blue-950/70 border border-blue-800 rounded-2xl p-7 shadow-lg hover:scale-105 hover:shadow-2xl hover:border-blue-600 transition-transform transition-shadow focus:outline-none text-left group"
            >
              <h2 className="font-display text-xl text-blue-200 mb-2 group-hover:text-blue-400 transition">{sol.title}</h2>
              <p className="text-blue-100 mb-2">{sol.desc}</p>
              <span className="inline-block mt-2 text-sm text-blue-400 underline underline-offset-2 group-hover:text-white">
                Test Example
              </span>
              <SolutionDialog
                open={openIndex === i}
                setOpen={open => setOpenIndex(open ? i : null)}
                title={sol.title}
                example={sol.example}
              />
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
