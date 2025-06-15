
import Navbar from "@/components/Navbar";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";

const articles = [
  {
    title: "Demystifying Quantum Supply Chain Algorithms",
    excerpt: "A deep dive into how quantum algorithms tackle complex supply chain challenges beyond classical limits.",
    author: "Dr. Alice Quantum",
    date: "2025-06-01"
  },
  {
    title: "Simulation Results: Quantum vs. Traditional Routing",
    excerpt: "Early results show up to 35% faster delivery route calculations with quantum-enhanced methods.",
    author: "Ben Optimizer",
    date: "2025-05-28"
  },
  {
    title: "Real-World Quantum Deployments",
    excerpt: "How leading manufacturers tested and validated quantum-powered optimization, and what’s next.",
    author: "Clara Chains",
    date: "2025-05-15"
  }
];

export default function Blog() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#191f2e] via-[#0d1833] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1 px-6 py-14 max-w-5xl mx-auto z-10">
        <h1 className="font-display text-4xl text-white mb-6">Quantum Supply Chain Blog</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((a, idx) => (
            <div key={idx} className="bg-blue-950/80 border border-blue-800 rounded-xl shadow-lg px-6 py-7 flex flex-col hover:scale-105 transition-transform cursor-pointer">
              <h2 className="font-display text-lg text-blue-300 mb-2">{a.title}</h2>
              <p className="text-blue-100 text-sm mb-3">{a.excerpt}</p>
              <div className="flex justify-between text-xs text-blue-400 mb-2">
                <span>{a.author}</span>
                <span>{a.date}</span>
              </div>
              <a className="mt-4 text-blue-500 underline text-xs self-end hover:text-blue-200" href="#">
                Read full article
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
