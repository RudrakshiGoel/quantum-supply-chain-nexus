
import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";
import { useState } from "react";
import FullArticleDialog from "@/components/FullArticleDialog";

const articles = [
  {
    title: "Demystifying Quantum Supply Chain Algorithms",
    excerpt: "A deep dive into how quantum algorithms tackle complex supply chain challenges beyond classical limits.",
    author: "Dr. Alice Quantum",
    date: "2025-06-01",
    content: `Classical algorithms struggle to optimize hyper-complex networks, especially as supply chains globalize and face real-time disruptions. Quantum algorithms use phenomena like superposition and entanglement to analyze trillions of configurations nearly simultaneously, dramatically reducing the computational cost for routing, scheduling, and matching problems.

In this article, we explore:
- The basics of quantum computing relevant to operations research.
- Recent breakthroughs in quantum-inspired supply chain optimizations.
- Industry benchmarks showing speed-ups in simulation and real-world pilots.

Leaders considering quantum adoption should focus on pilots targeting high-value network design or logistics problems, where modest gains yield significant ROI.`
  },
  {
    title: "Simulation Results: Quantum vs. Traditional Routing",
    excerpt: "Early results show up to 35% faster delivery route calculations with quantum-enhanced methods.",
    author: "Ben Optimizer",
    date: "2025-05-28",
    content: `In a head-to-head simulation of urban delivery, quantum-enhanced combinatorial optimization generated optimal routes 35% faster than baseline commercial solvers.

Methodology:
- Input: 180 live delivery locations, stochastic demand, time constraints.
- Classical solver average time: 11.2s. Quantum-enhanced: 7.2s.
- Constraints such as time-windows and vehicle capacity modeled alongside routine traffic fluctuations.

These results demonstrate real potential for same-day delivery providers and high-frequency logistics operations. Continued R&D is underway, with next steps including integrating weather and custom constraints for full production.`
  },
  {
    title: "Real-World Quantum Deployments",
    excerpt: "How leading manufacturers tested and validated quantum-powered optimization, and what’s next.",
    author: "Clara Chains",
    date: "2025-05-15",
    content: `Pioneering manufacturers in auto and electronics sectors have completed successful pilots with quantum optimization in inventory management and production scheduling.

Key takeaways:
- Reduced overstock by 12% and cut late shipments by 9% in a six-month trial.
- Deployment required integrating quantum APIs with legacy ERP systems.
- Teams needed modest upskilling; best results came from hybrid quantum-classical pipelines.

The next chapter will see increasingly vertical-specific quantum solutions, with rapid vendor innovation and closer integration with supply chain control towers.`
  }
];

export default function Blog() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#191f2e] via-[#0d1833] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-6 py-14 max-w-5xl mx-auto z-10">
        <h1 className="font-display text-4xl text-white mb-6 flex items-center gap-3">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
          Quantum Supply Chain Blog
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((a, idx) => (
            <div key={idx} className="bg-blue-950/80 border border-blue-800 rounded-xl shadow-lg px-6 py-7 flex flex-col hover:scale-105 transition-transform cursor-pointer">
              <h2 className="font-display text-lg text-blue-300 mb-2">{a.title}</h2>
              <p className="text-blue-100 text-sm mb-3">{a.excerpt}</p>
              <div className="flex justify-between text-xs text-blue-400 mb-2">
                <span>{a.author}</span>
                <span>{a.date}</span>
              </div>
              <button
                className="mt-4 text-blue-500 underline text-xs self-end hover:text-blue-200"
                onClick={() => setSelected(idx)}
              >
                Read full article
              </button>
            </div>
          ))}
        </div>
        <FullArticleDialog
          open={selected !== null}
          setOpen={() => setSelected(null)}
          article={selected !== null ? articles[selected] : null}
        />
      </main>
      <Footer />
    </div>
  );
}
